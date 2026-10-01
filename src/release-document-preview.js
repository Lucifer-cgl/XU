import PdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?worker";

let pdfWorker;

const previewError = (stage, message) => {
  stage.replaceChildren();
  const notice = document.createElement("p");
  notice.className = "release-document-message";
  notice.textContent = `${message} 可使用上方“下载原文件”在本地查看。`;
  stage.appendChild(notice);
};

const sha256Hex = async (buffer) => {
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
};

async function readResponseBytes(response, controller, expectedSize) {
  if (!response.body?.getReader) return response.arrayBuffer();
  const reader = response.body.getReader();
  const chunks = [];
  let total = 0;
  let idleTimer;
  const resetIdleTimer = () => {
    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(() => controller.abort(), 15000);
  };
  try {
    resetIdleTimer();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      total += value.byteLength;
      if (expectedSize && total > expectedSize) throw new Error("文件大小不符");
      resetIdleTimer();
    }
  } finally {
    window.clearTimeout(idleTimer);
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes.buffer;
}

async function fetchRelease(urls, signal, expectedSize, expectedSha256, stage) {
  let lastError;
  for (let index = 0; index < urls.length; index += 1) {
    if (signal.aborted) throw new DOMException("Aborted", "AbortError");
    const url = urls[index];
    const controller = new AbortController();
    const abort = () => controller.abort();
    signal.addEventListener("abort", abort, { once: true });
    const connectionTimer = window.setTimeout(() => controller.abort(), 12000);
    try {
      stage.textContent = index ? `上一条线路不可用，正在尝试第 ${index + 1} 条…` : "正在连接国内线路…";
      const response = await fetch(url, { signal: controller.signal, credentials: url.startsWith("/") ? "same-origin" : "omit", referrerPolicy: "no-referrer" });
      window.clearTimeout(connectionTimer);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const bytes = await readResponseBytes(response, controller, expectedSize);
      if (expectedSize && bytes.byteLength !== expectedSize) throw new Error("文件大小不符");
      if (expectedSha256 && await sha256Hex(bytes) !== expectedSha256.toLowerCase()) throw new Error("文件校验失败");
      return bytes;
    } catch (error) {
      if (signal.aborted) throw error;
      lastError = error;
    } finally {
      window.clearTimeout(connectionTimer);
      signal.removeEventListener("abort", abort);
    }
  }
  throw lastError || new Error("没有可用的读取线路");
}

export async function showReleaseText(stage, urls, signal, fileSize = 0, sha256 = "") {
  const bytes = await fetchRelease(urls, signal, fileSize, sha256, stage);
  if (signal.aborted) return;
  let content;
  try {
    content = new TextDecoder("utf-8", { fatal: true }).decode(new Uint8Array(bytes));
  } catch {
    content = new TextDecoder("gb18030").decode(new Uint8Array(bytes));
  }
  const pre = document.createElement("pre");
  pre.className = "release-text-content";
  pre.textContent = content;
  stage.replaceChildren(pre);
}

export async function showReleasePdf(stage, urls, signal, fileSize = 0, sha256 = "") {
  const maxPreviewBytes = 80 * 1024 * 1024;
  if (fileSize > maxPreviewBytes) {
    previewError(stage, "此 PDF 超过 80 MB，暂不适合在浏览器中完整加载。");
    return;
  }
  const pdfjs = await import("pdfjs-dist");
  if (signal.aborted) return;
  pdfWorker ||= new PdfWorker();
  pdfjs.GlobalWorkerOptions.workerPort = pdfWorker;
  stage.textContent = "正在下载 PDF…";
  const bytes = await fetchRelease(urls, signal, fileSize, sha256, stage);
  if (signal.aborted) return;
  if (bytes.byteLength > maxPreviewBytes) {
    previewError(stage, "此 PDF 超过 80 MB，暂不适合在浏览器中完整加载。");
    return;
  }
  stage.textContent = "正在解析 PDF…";
  const task = pdfjs.getDocument({ data: new Uint8Array(bytes), isEvalSupported: false });
  const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        void drawPage(entry.target);
      }
    }
  }, { rootMargin: "800px 0px" }) : null;
  signal.addEventListener("abort", () => {
    observer?.disconnect();
    void task.destroy();
  }, { once: true });

  let pdf;
  const drawPage = async (holder) => {
    if (signal.aborted || holder.dataset.rendered) return;
    holder.dataset.rendered = "true";
    try {
      const page = await pdf.getPage(Number(holder.dataset.page));
      if (signal.aborted) return;
      const base = page.getViewport({ scale: 1 });
      const width = Math.min(Math.max(stage.clientWidth - 36, 320), 1000);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({ scale: width * pixelRatio / base.width });
      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${width}px`;
      canvas.style.height = "auto";
      holder.replaceChildren(canvas);
      await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
      page.cleanup();
    } catch (error) {
      if (!signal.aborted) holder.textContent = `第 ${holder.dataset.page} 页加载失败：${error.message}`;
    }
  };

  try {
    pdf = await task.promise;
    if (signal.aborted) return;
    const info = document.createElement("p");
    info.className = "release-document-count";
    info.textContent = `共 ${pdf.numPages} 页 · 滚动时按需加载`;
    const pages = document.createElement("div");
    pages.className = "release-pdf-pages";
    for (let number = 1; number <= pdf.numPages; number += 1) {
      const holder = document.createElement("div");
      holder.className = "release-pdf-page";
      holder.dataset.page = String(number);
      holder.textContent = `第 ${number} 页正在准备…`;
      pages.appendChild(holder);
      if (number !== 1) observer?.observe(holder);
    }
    stage.replaceChildren(info, pages);
    void drawPage(pages.firstElementChild);
    if (!observer) pages.querySelectorAll(".release-pdf-page").forEach((holder) => void drawPage(holder));
  } catch (error) {
    if (!signal.aborted) previewError(stage, `PDF 预览失败：${error.message}`);
  }
}
