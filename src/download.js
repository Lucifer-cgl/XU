const manifestUrl = "/generated/downloads.json";
let manifestPromise;
let activeController;

const escapeHtml = (value = "") => String(value).replace(/[&<>'\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
const formatBytes = (bytes = 0) => {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unit = units[0];
  for (let index = 1; value >= 1024 && index < units.length; index += 1) {
    value /= 1024;
    unit = units[index];
  }
  return `${value >= 10 ? value.toFixed(1) : value.toFixed(2)} ${unit}`;
};

async function loadManifest() {
  manifestPromise ||= fetch(manifestUrl).then((response) => {
    if (!response.ok) throw new Error(`下载清单读取失败（${response.status}）`);
    return response.json();
  });
  return manifestPromise;
}

function splitOversizedCourse(course, limits) {
  const parts = [];
  let files = [];
  let totalBytes = 0;
  const flush = () => {
    if (!files.length) return;
    parts.push({ courseIds: [course.id], labels: [course.name], files, totalBytes });
    files = [];
    totalBytes = 0;
  };
  for (const file of course.files) {
    if (files.length && (files.length + 1 > limits.maxBatchFiles || totalBytes + file.size > limits.maxBatchBytes)) flush();
    files.push(file);
    totalBytes += file.size;
    if (file.size > limits.maxBatchBytes) flush();
  }
  flush();
  return parts.map((part, index, list) => ({
    ...part,
    labels: list.length > 1 ? [`${course.name}（第 ${index + 1} 批）`] : part.labels
  }));
}

export function buildDownloadBatches(courses, limits) {
  const units = courses.flatMap((course) => (
    course.fileCount <= limits.maxBatchFiles && course.totalBytes <= limits.maxBatchBytes
      ? [{ courseIds: [course.id], labels: [course.name], files: course.files, totalBytes: course.totalBytes }]
      : splitOversizedCourse(course, limits)
  ));
  units.sort((left, right) => {
    const leftWeight = Math.max(left.files.length / limits.maxBatchFiles, left.totalBytes / limits.maxBatchBytes);
    const rightWeight = Math.max(right.files.length / limits.maxBatchFiles, right.totalBytes / limits.maxBatchBytes);
    return rightWeight - leftWeight;
  });
  const batches = [];
  for (const unit of units) {
    const target = batches.find((batch) => (
      batch.files.length + unit.files.length <= limits.maxBatchFiles
      && batch.totalBytes + unit.totalBytes <= limits.maxBatchBytes
    ));
    if (target) {
      target.courseIds.push(...unit.courseIds);
      target.labels.push(...unit.labels);
      target.files.push(...unit.files);
      target.totalBytes += unit.totalBytes;
    } else {
      batches.push({ courseIds: [...unit.courseIds], labels: [...unit.labels], files: [...unit.files], totalBytes: unit.totalBytes });
    }
  }
  return batches.map((batch, index) => ({ ...batch, number: index + 1 }));
}

function ensureDialog() {
  let dialog = document.querySelector("#download-dialog");
  if (dialog) return dialog;
  dialog = document.createElement("dialog");
  dialog.id = "download-dialog";
  dialog.className = "download-dialog";
  dialog.addEventListener("cancel", (event) => {
    if (!activeController) return;
    event.preventDefault();
    activeController.abort();
  });
  document.body.append(dialog);
  return dialog;
}

function planMarkup(batches, limits) {
  const totalFiles = batches.reduce((sum, batch) => sum + batch.files.length, 0);
  const totalBytes = batches.reduce((sum, batch) => sum + batch.totalBytes, 0);
  return `<div class="download-plan-summary">共 ${totalFiles} 个文件，${formatBytes(totalBytes)}，自动分为 ${batches.length} 批</div>
    <div class="download-batches">${batches.map((batch) => `<div class="download-batch"><strong>第 ${batch.number} 批</strong><span>${escapeHtml(batch.labels.join("、"))}</span><small>${batch.files.length}/${limits.maxBatchFiles} 个文件 · ${formatBytes(batch.totalBytes)}/${formatBytes(limits.maxBatchBytes)}</small></div>`).join("")}</div>`;
}

function safeSegments(filePath) {
  const segments = filePath.split("/").filter(Boolean);
  if (!segments.length || segments.some((part) => part === "." || part === "..")) throw new Error("文件路径不安全");
  return segments;
}

async function createFileHandle(root, filePath) {
  const segments = safeSegments(filePath);
  let directory = root;
  for (const segment of segments.slice(0, -1)) directory = await directory.getDirectoryHandle(segment, { create: true });
  return directory.getFileHandle(segments.at(-1), { create: true });
}

async function downloadFile(root, file, signal) {
  let lastError;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(file.url, { signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const handle = await createFileHandle(root, file.path);
      const writable = await handle.createWritable();
      try {
        if (response.body) await response.body.pipeTo(writable, { signal });
        else {
          await writable.write(await response.arrayBuffer());
          await writable.close();
        }
      } catch (error) {
        try { await writable.abort(); } catch { /* browser may already have closed it */ }
        throw error;
      }
      return;
    } catch (error) {
      lastError = error;
      if (signal.aborted) throw error;
    }
  }
  throw lastError;
}

async function runPool(files, concurrency, worker) {
  let cursor = 0;
  const runners = Array.from({ length: Math.min(concurrency, files.length) }, async () => {
    while (cursor < files.length) {
      const index = cursor;
      cursor += 1;
      await worker(files[index]);
    }
  });
  await Promise.all(runners);
}

function renderRawLinks(target, batches) {
  const files = batches.flatMap((batch) => batch.files);
  target.innerHTML = `<p>当前浏览器不能直接保存整个文件夹。可以逐个下载原文件；使用最新版 Chrome 或 Edge 可一键保存全部文件。</p>
    <div class="download-raw-links">${files.map((file) => `<a href="${file.url}" download>${escapeHtml(file.path)} <small>${formatBytes(file.size)}</small></a>`).join("")}</div>`;
}

async function startDownload(dialog, batches) {
  const progress = dialog.querySelector("[data-download-progress]");
  if (!("showDirectoryPicker" in window)) {
    renderRawLinks(progress, batches);
    return;
  }
  let root;
  try {
    root = await window.showDirectoryPicker({ id: "xu-course-downloads", mode: "readwrite" });
  } catch (error) {
    if (error.name !== "AbortError") progress.textContent = `无法选择保存位置：${error.message}`;
    return;
  }
  activeController = new AbortController();
  const { signal } = activeController;
  const controls = [...dialog.querySelectorAll("button, input")];
  controls.forEach((control) => { control.disabled = true; });
  dialog.querySelector("[data-download-cancel]").disabled = false;
  const total = batches.reduce((sum, batch) => sum + batch.files.length, 0);
  let completed = 0;
  const failures = [];
  const warnBeforeUnload = (event) => { event.preventDefault(); event.returnValue = ""; };
  window.addEventListener("beforeunload", warnBeforeUnload);
  try {
    for (const batch of batches) {
      if (signal.aborted) break;
      progress.innerHTML = `<strong>正在下载第 ${batch.number}/${batches.length} 批</strong><span>${completed}/${total} 个文件已完成</span><progress max="${total}" value="${completed}"></progress>`;
      const concurrency = matchMedia("(pointer: coarse)").matches ? 2 : 3;
      await runPool(batch.files, concurrency, async (file) => {
        try { await downloadFile(root, file, signal); }
        catch (error) { if (!signal.aborted) failures.push({ file, error }); }
        completed += 1;
        const value = progress.querySelector("progress");
        const label = progress.querySelector("span");
        if (value) value.value = completed;
        if (label) label.textContent = `${completed}/${total} 个文件已完成`;
      });
    }
    if (signal.aborted) progress.innerHTML = `<strong>下载已停止</strong><span>已保存 ${completed}/${total} 个文件。</span>`;
    else if (failures.length) {
      progress.innerHTML = `<strong>下载完成，${failures.length} 个文件失败</strong><span>其余 ${total - failures.length} 个原文件已保存。</span><div class="download-raw-links">${failures.map(({ file }) => `<a href="${file.url}" download>${escapeHtml(file.path)}</a>`).join("")}</div>`;
    } else progress.innerHTML = `<strong>下载完成</strong><span>${total} 个原文件已按目录结构保存。</span>`;
  } finally {
    window.removeEventListener("beforeunload", warnBeforeUnload);
    activeController = null;
    controls.forEach((control) => { control.disabled = false; });
  }
}

export async function openDownloadManager({ groupId, courseId }) {
  const manifest = await loadManifest();
  const group = manifest.groups.find((item) => item.id === groupId);
  if (!group) throw new Error("没有找到这个分类的下载清单");
  const dialog = ensureDialog();
  dialog.innerHTML = `<form method="dialog" class="download-shell">
    <header><div><small>原文件下载</small><h2>${escapeHtml(group.name)}</h2></div><button class="download-close" value="close" aria-label="关闭">×</button></header>
    <p class="download-note">选择课程后，浏览器会按文件数量和总体积自动分批。文件直接从站点流向你的设备，服务器不生成 ZIP。</p>
    <fieldset><legend>选择课程</legend><div class="download-course-list">${group.courses.map((course) => `<label><input type="checkbox" name="course" value="${escapeHtml(course.id)}" ${course.id === courseId ? "checked" : ""}><span><strong>${escapeHtml(course.name)}</strong><small>${course.fileCount} 个文件 · ${formatBytes(course.totalBytes)}</small></span></label>`).join("")}</div></fieldset>
    <section class="download-plan" data-download-plan></section>
    <section class="download-progress" data-download-progress aria-live="polite"></section>
    <footer><button type="button" class="download-secondary" data-download-cancel>停止</button><button type="button" class="download-primary" data-download-start>选择位置并下载</button></footer>
  </form>`;
  const selectedCourses = () => {
    const ids = new Set([...dialog.querySelectorAll('input[name="course"]:checked')].map((input) => input.value));
    return group.courses.filter((course) => ids.has(course.id));
  };
  const refresh = () => {
    const courses = selectedCourses();
    const batches = buildDownloadBatches(courses, manifest.limits);
    dialog.querySelector("[data-download-plan]").innerHTML = courses.length ? planMarkup(batches, manifest.limits) : "<p>请至少选择一门课程。</p>";
    dialog.querySelector("[data-download-start]").disabled = !courses.length;
    return batches;
  };
  dialog.querySelector(".download-course-list").addEventListener("change", refresh);
  dialog.querySelector("[data-download-start]").addEventListener("click", () => startDownload(dialog, refresh()));
  dialog.querySelector("[data-download-cancel]").addEventListener("click", () => activeController?.abort());
  refresh();
  dialog.showModal();
}
