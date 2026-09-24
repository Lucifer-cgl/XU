import DOMPurify from "dompurify";
import { marked } from "marked";
import markedKatex from "marked-katex-extension";
import "katex/dist/katex.min.css";
import "./styles.css";
import supportMemeUrl from "../支持/支持一下.png";
import wechatQrUrl from "../支持/微信二维码.jpeg";

const main = document.querySelector("#main-content");
const nav = document.querySelector("#course-nav");
const tocPanel = document.querySelector("#toc-panel");
const sidebar = document.querySelector("#sidebar");
const siteLayout = document.querySelector("#site-layout");
const navToggle = document.querySelector("#nav-toggle");
const leftPanelToggle = document.querySelector("#left-panel-toggle");
const rightPanelToggle = document.querySelector("#right-panel-toggle");
const leftPanelResizer = document.querySelector("#left-panel-resizer");
const rightPanelResizer = document.querySelector("#right-panel-resizer");
const themeToggle = document.querySelector("#theme-toggle");
let catalog;
let searchIndex;
let currentSource = "";
let currentDocument;
let currentTocHtml = "";
let tocMode = "toc";
let activeWorkbenchFrame = null;
let activeWorkbenchItem = null;
let activeWorkbenchFile = null;
let workbenchZoom = 1;
let workbenchMode = "edit";
const workbenchTypes = new Set(["word", "powerpoint", "spreadsheet", "pdf", "markdown"]);
const localResources = {
  files: new Map(),
  directories: [],
  urls: new Map(),
  tabs: [],
  handle: null,
  label: ""
};
const officeRuntime = { handle: null, label: "", ready: false, error: "" };
const localFolderDbName = "xu-local-resources";
const localFolderStoreName = "handles";
const localFolderHandleKey = "folder";
const officeRuntimeDbName = "xu-office-runtime";
const officeRuntimeStoreName = "handles";
const officeRuntimeHandleKey = "runtime";
const officeRuntimeFrameUrl = "/__xu_office__/index.html?embedded=1";
const isIsolatedWorkspace = window.location.pathname.startsWith("/workspace");
const bookmarkStorageKey = "xu-bookmarks";
const bookmarkFileSignature = "XU_BOOKMARKS_ONLY_DO_NOT_EDIT";
const bookmarkFileType = "xu-bookmarks";
const openTabsStorageKey = "xu-open-doc-tabs";
const tabScrollStorageKey = "xu-doc-tab-scroll";
let scrollSaveTimer;

const layoutLimits = {
  left: { min: 190, max: 420, default: 260 },
  right: { min: 170, max: 360, default: 220 }
};
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
let layoutState = loadLayoutState();

function loadLayoutState() {
  try {
    const saved = JSON.parse(localStorage.getItem("xu-layout") || "{}");
    return {
      leftWidth: clamp(Number(saved.leftWidth) || layoutLimits.left.default, layoutLimits.left.min, layoutLimits.left.max),
      rightWidth: clamp(Number(saved.rightWidth) || layoutLimits.right.default, layoutLimits.right.min, layoutLimits.right.max),
      leftCollapsed: Boolean(saved.leftCollapsed),
      rightCollapsed: Boolean(saved.rightCollapsed)
    };
  } catch {
    return { leftWidth: 260, rightWidth: 220, leftCollapsed: false, rightCollapsed: false };
  }
}

function saveLayoutState() {
  localStorage.setItem("xu-layout", JSON.stringify(layoutState));
}

function applyLayoutState() {
  siteLayout.style.setProperty("--left-panel-size", `${layoutState.leftWidth}px`);
  siteLayout.style.setProperty("--right-panel-size", `${layoutState.rightWidth}px`);
  siteLayout.dataset.leftCollapsed = String(layoutState.leftCollapsed);
  siteLayout.dataset.rightCollapsed = String(layoutState.rightCollapsed);
  leftPanelToggle.setAttribute("aria-expanded", String(!layoutState.leftCollapsed));
  rightPanelToggle.setAttribute("aria-expanded", String(!layoutState.rightCollapsed));
  leftPanelToggle.title = layoutState.leftCollapsed ? "展开课程目录" : "收起课程目录";
  rightPanelToggle.title = layoutState.rightCollapsed ? "展开本文目录" : "收起本文目录";
  leftPanelResizer.setAttribute("aria-valuenow", String(layoutState.leftWidth));
  rightPanelResizer.setAttribute("aria-valuenow", String(layoutState.rightWidth));
}

function togglePanel(side) {
  const key = `${side}Collapsed`;
  layoutState[key] = !layoutState[key];
  applyLayoutState();
  saveLayoutState();
}

function setupPanelResizer(handle, side) {
  const limits = layoutLimits[side];
  const widthKey = `${side}Width`;
  let startX = 0;
  let startWidth = 0;

  const finishResize = () => {
    document.body.classList.remove("is-resizing");
    saveLayoutState();
    window.removeEventListener("pointermove", resize);
    window.removeEventListener("pointerup", finishResize);
    window.removeEventListener("pointercancel", finishResize);
  };
  const resize = (event) => {
    const movement = event.clientX - startX;
    layoutState[widthKey] = clamp(startWidth + (side === "left" ? movement : -movement), limits.min, limits.max);
    applyLayoutState();
  };

  handle.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    startX = event.clientX;
    startWidth = layoutState[widthKey];
    document.body.classList.add("is-resizing");
    window.addEventListener("pointermove", resize);
    window.addEventListener("pointerup", finishResize);
    window.addEventListener("pointercancel", finishResize);
    event.preventDefault();
  });
  handle.addEventListener("dblclick", () => {
    layoutState[widthKey] = limits.default;
    applyLayoutState();
    saveLayoutState();
  });
  handle.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const direction = event.key === "ArrowRight" ? 1 : -1;
    layoutState[widthKey] = clamp(layoutState[widthKey] + direction * (side === "left" ? 12 : -12), limits.min, limits.max);
    applyLayoutState();
    saveLayoutState();
    event.preventDefault();
  });
}

applyLayoutState();
setupPanelResizer(leftPanelResizer, "left");
setupPanelResizer(rightPanelResizer, "right");

marked.use(
  { gfm: true, breaks: false },
  markedKatex({
    throwOnError: false,
    nonStandard: true,
    output: "htmlAndMathml"
  })
);
const escapeHtml = (value = "") => value.replace(/[&<>'\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
const routeFor = (id) => `#/read/${encodeURIComponent(id)}`;
const localRouteFor = (id) => `#/local/${encodeURIComponent(id)}`;
const hrefFor = (doc) => routeFor(doc.id);
const labelFor = (doc) => doc.displayTitle || doc.title;
const safeId = (value = "") => `b-${Array.from(value).map((char) => char.codePointAt(0).toString(36)).join("-")}`;
const localFileExtensions = new Set(["md", "markdown", "html", "htm", "pdf", "txt", "png", "jpg", "jpeg", "webp", "svg", "gif", "doc", "docx", "odt", "rtf", "ppt", "pptx", "odp", "xls", "xlsx", "ods", "csv"]);

async function loadJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`读取失败（${response.status}）`);
  return response.json();
}

function openLocalFolderDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(localFolderDbName, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(localFolderStoreName);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getStoredLocalFolderHandle() {
  if (!("indexedDB" in window)) return null;
  const db = await openLocalFolderDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(localFolderStoreName, "readonly");
    const request = tx.objectStore(localFolderStoreName).get(localFolderHandleKey);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

async function setStoredLocalFolderHandle(handle) {
  if (!("indexedDB" in window)) return;
  const db = await openLocalFolderDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(localFolderStoreName, "readwrite");
    tx.objectStore(localFolderStoreName).put(handle, localFolderHandleKey);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

async function clearStoredLocalFolderHandle() {
  if (!("indexedDB" in window)) return;
  const db = await openLocalFolderDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(localFolderStoreName, "readwrite");
    tx.objectStore(localFolderStoreName).delete(localFolderHandleKey);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

function openOfficeRuntimeDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(officeRuntimeDbName, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(officeRuntimeStoreName);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getStoredOfficeRuntimeHandle() {
  if (!("indexedDB" in window)) return null;
  const db = await openOfficeRuntimeDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(officeRuntimeStoreName, "readonly").objectStore(officeRuntimeStoreName).get(officeRuntimeHandleKey);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

async function setStoredOfficeRuntimeHandle(handle) {
  const db = await openOfficeRuntimeDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(officeRuntimeStoreName, "readwrite");
    tx.objectStore(officeRuntimeStoreName).put(handle, officeRuntimeHandleKey);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

async function clearStoredOfficeRuntimeHandle() {
  const db = await openOfficeRuntimeDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(officeRuntimeStoreName, "readwrite");
    tx.objectStore(officeRuntimeStoreName).delete(officeRuntimeHandleKey);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

async function registerLocalRuntimeWorker() {
  if (!("serviceWorker" in navigator)) return false;
  await navigator.serviceWorker.register("/xu-local-runtime-sw.js", { scope: "/" });
  await navigator.serviceWorker.ready;
  if (navigator.serviceWorker.controller) return true;
  await new Promise((resolve) => navigator.serviceWorker.addEventListener("controllerchange", resolve, { once: true }));
  return true;
}

async function validateOfficeRuntime(handle) {
  await handle.getFileHandle("index.html");
  const assets = await handle.getDirectoryHandle("assets");
  const zetaoffice = await assets.getDirectoryHandle("zetaoffice");
  const manifestFile = await (await zetaoffice.getFileHandle("runtime-manifest.json")).getFile();
  const manifest = JSON.parse(await manifestFile.text());
  if (!manifest["soffice.wasm"]?.parts?.length || !manifest["soffice.data"]?.parts?.length) throw new Error("运行组件清单不完整");
  await zetaoffice.getFileHandle(manifest["soffice.wasm"].parts[0]);
  await zetaoffice.getFileHandle(manifest["soffice.data"].parts[0]);
  return manifest;
}

async function connectOfficeRuntime(handle, { persist = false } = {}) {
  const permission = await handle.requestPermission?.({ mode: "read" });
  if (permission && permission !== "granted") throw new Error("没有获得运行组件目录的读取权限");
  await validateOfficeRuntime(handle);
  await registerLocalRuntimeWorker();
  officeRuntime.handle = handle;
  officeRuntime.label = handle.name || "XU-Office-Editor";
  officeRuntime.ready = true;
  officeRuntime.error = "";
  if (persist) await setStoredOfficeRuntimeHandle(handle);
  renderNavigation(currentDocument?.id || "");
}

async function chooseOfficeRuntime() {
  if (!("showDirectoryPicker" in window)) {
    alert("请选择最新版 Chrome 或 Edge 来连接本地 Office 运行组件。");
    return;
  }
  try {
    const handle = await window.showDirectoryPicker({ mode: "read", id: "xu-office-runtime" });
    await connectOfficeRuntime(handle, { persist: true });
  } catch (error) {
    if (error?.name !== "AbortError") {
      officeRuntime.ready = false;
      officeRuntime.error = error?.message || "无法读取编辑器文件夹";
      renderNavigation(currentDocument?.id || "");
      alert(`编辑器文件夹连接失败：${officeRuntime.error}`);
    }
  }
}

async function restoreOfficeRuntime() {
  try {
    await registerLocalRuntimeWorker();
    const handle = await getStoredOfficeRuntimeHandle();
    if (!handle) return;
    officeRuntime.handle = handle;
    officeRuntime.label = handle.name || "XU-Office-Editor";
    const permission = await handle.queryPermission?.({ mode: "read" });
    if (permission === "granted") await connectOfficeRuntime(handle);
  } catch (error) {
    officeRuntime.ready = false;
    officeRuntime.error = error?.message || "无法恢复编辑器文件夹授权";
  }
}

async function disconnectOfficeRuntime() {
  officeRuntime.handle = null;
  officeRuntime.label = "";
  officeRuntime.ready = false;
  officeRuntime.error = "";
  await clearStoredOfficeRuntimeHandle();
  renderNavigation(currentDocument?.id || "");
}

function buildCourseTree(courses) {
  const roots = [];
  for (const course of courses) {
    const parts = course.id.split("/");
    let siblings = roots;
    const path = [];
    parts.forEach((part, index) => {
      path.push(part);
      let node = siblings.find((item) => item.segment === part);
      if (!node) {
        node = { segment: part, path: path.join("/"), course: null, children: [] };
        siblings.push(node);
      }
      if (index === parts.length - 1) node.course = course;
      siblings = node.children;
    });
  }
  return roots;
}

function branchDocumentCount(node) {
  return (node.course?.documents.length || 0) + node.children.reduce((total, child) => total + branchDocumentCount(child), 0);
}

function getFileExtension(name = "") {
  return name.includes(".") ? name.split(".").pop().toLowerCase() : "";
}

function localFileType(file) {
  const ext = getFileExtension(file?.name || "");
  if (ext === "md" || ext === "markdown") return "markdown";
  if (ext === "html" || ext === "htm") return "html";
  if (ext === "pdf") return "pdf";
  if (ext === "txt") return "text";
  if (["png", "jpg", "jpeg", "webp", "svg", "gif"].includes(ext)) return "image";
  if (["doc", "docx", "odt", "rtf"].includes(ext)) return "word";
  if (["ppt", "pptx", "odp"].includes(ext)) return "powerpoint";
  if (["xls", "xlsx", "ods", "csv"].includes(ext)) return "spreadsheet";
  return "file";
}

function localFormatLabel(type) {
  return ({
    markdown: "MD",
    html: "HTML",
    pdf: "PDF",
    text: "TXT",
    image: "IMG",
    word: "WORD",
    powerpoint: "PPT",
    spreadsheet: "XLS"
  })[type] || "FILE";
}

function branchContains(node, activeId) {
  return Boolean(activeId) && (node.course?.documents.some((doc) => doc.id === activeId) || node.children.some((child) => branchContains(child, activeId)));
}

function renderCourseNodes(nodes, activeId, depth = 0) {
  return `<ul class="course-tree course-tree-level-${depth}">${nodes.map((node) => {
    const activeBranch = branchContains(node, activeId);
    const course = node.course;
    const label = course?.name || node.segment;
    const groupId = node.path.split("/")[0];
    return `<li class="course-node">
      <details class="course-group ${activeBranch ? "active-branch" : ""}" ${depth === 0 || activeBranch ? "open" : ""}>
        <summary><span class="course-title"><strong>${escapeHtml(label)}</strong></span><span class="course-count">${branchDocumentCount(node)}</span></summary>
        ${course ? `<button type="button" class="course-download-trigger no-print" data-download-group="${encodeURIComponent(groupId)}" data-download-course="${encodeURIComponent(course.id)}" aria-label="下载 ${escapeHtml(course.name)} 所在分类的原始文件" title="下载原始文件">⋯</button>` : ""}
        ${course?.documents.length ? `<div class="course-links">${course.documents.map((doc) => `<a href="${hrefFor(doc)}" class="${doc.id === activeId ? "active" : ""}" title="${escapeHtml(labelFor(doc))}"><span class="format-badge">${doc.type === "markdown" ? "MD" : "HTML"}</span><span class="course-link-title">${escapeHtml(labelFor(doc))}</span></a>`).join("")}</div>` : ""}
        ${node.children.length ? renderCourseNodes(node.children, activeId, depth + 1) : ""}
      </details>
    </li>`;
  }).join("")}</ul>`;
}

function buildLocalTree() {
  const root = { name: "我的资源", path: "", children: new Map(), files: [] };
  const ensureDirectory = (relativePath) => {
    let node = root;
    relativePath.split("/").filter(Boolean).forEach((part) => {
      if (!node.children.has(part)) node.children.set(part, { name: part, path: [node.path, part].filter(Boolean).join("/"), children: new Map(), files: [] });
      node = node.children.get(part);
    });
    return node;
  };
  localResources.directories.forEach(ensureDirectory);
  for (const item of localResources.files.values()) {
    const parts = item.relativePath.split("/").filter(Boolean);
    const fileName = parts.pop() || item.name;
    const node = ensureDirectory(parts.join("/"));
    node.files.push({ ...item, name: fileName });
  }
  return root;
}

function localTreeCount(node) {
  return node.files.length + [...node.children.values()].reduce((total, child) => total + localTreeCount(child), 0);
}

function localBranchContains(node, activeId) {
  return Boolean(activeId) && (node.files.some((file) => file.id === activeId) || [...node.children.values()].some((child) => localBranchContains(child, activeId)));
}

function renderLocalNodes(nodes, activeId, depth = 0) {
  return `<ul class="course-tree course-tree-level-${depth}">${nodes.map((node) => {
    const activeBranch = localBranchContains(node, activeId);
    return `<li class="course-node">
      <details class="course-group local-resource-group ${activeBranch ? "active-branch" : ""}" ${depth === 0 || activeBranch ? "open" : ""}>
        <summary><span class="course-title"><strong>${escapeHtml(node.name)}</strong></span><span class="course-count">${localTreeCount(node)}</span></summary>
        ${node.files.length ? `<div class="course-links">${node.files.sort((a, b) => a.name.localeCompare(b.name, "zh-CN")).map((file) => `<a href="${localRouteFor(file.id)}" class="${file.id === activeId ? "active" : ""}" title="${escapeHtml(file.relativePath)}"><span class="format-badge">${escapeHtml(localFormatLabel(file.type))}</span><span class="course-link-title">${escapeHtml(file.name)}</span></a>`).join("")}</div>` : ""}
        ${node.children.size ? renderLocalNodes([...node.children.values()].sort((a, b) => a.name.localeCompare(b.name, "zh-CN")), activeId, depth + 1) : ""}
      </details>
    </li>`;
  }).join("")}</ul>`;
}

function renderLocalResources(activeId = "") {
  const tree = buildLocalTree();
  const hasFiles = localResources.files.size > 0;
  const hasEntries = hasFiles || localResources.directories.length > 0;
  const hasFolder = Boolean(localResources.handle) || hasEntries;
  return `<section class="local-resources">
    <div class="sidebar-heading local-resource-heading">
      <span>我的资源</span>
      <span class="local-resource-actions">
        ${hasFolder ? '<button type="button" data-local-action="remove-folder">移除</button>' : ""}
        <button type="button" data-local-action="pick-folder">${hasFolder ? "重选" : "选择文件夹"}</button>
      </span>
    </div>
    <p class="local-resource-note">${hasFolder ? `${escapeHtml(localResources.label || "本地文件夹")} · ${localResources.directories.length} 个目录 · ${localResources.files.size} 个文档；内容按点击读取。` : "选择本地文件夹后，会在这里生成私人目录。"}</p>
    ${hasEntries ? renderLocalNodes([{ ...tree, name: localResources.label || "我的资源" }], activeId) : ""}
    <div class="local-runtime-card">
      <strong>本地文档引擎</strong>
      <span>${officeRuntime.ready ? `${escapeHtml(officeRuntime.label)} · 已连接` : officeRuntime.error ? `连接失败：${escapeHtml(officeRuntime.error)}` : officeRuntime.handle ? `${escapeHtml(officeRuntime.label)} · 需要重新授权，请点击重新连接` : "尚未连接；请选择编辑器文件夹"}</span>
      <div>
        <button type="button" data-local-action="pick-runtime">${officeRuntime.handle ? "重新连接编辑器文件夹" : "选择编辑器文件夹"}</button>
        ${officeRuntime.handle ? '<button type="button" data-local-action="remove-runtime">断开</button>' : ""}
      </div>
    </div>
  </section>`;
}

function chooseLocalFolder() {
  if (!officeRuntime.ready) {
    alert("请先连接并成功加载“编辑器文件夹”，再选择个人文档文件夹。");
    return;
  }
  if ("showDirectoryPicker" in window) {
    window.showDirectoryPicker({ mode: "read" })
      .then((handle) => loadLocalFolderHandle(handle, { persist: true }))
      .catch((error) => {
        if (error?.name !== "AbortError") alert(`本地文件夹读取失败：${error.message}`);
      });
    return;
  }
  const input = document.createElement("input");
  input.type = "file";
  input.multiple = true;
  input.webkitdirectory = true;
  input.addEventListener("change", () => {
    const files = [...(input.files || [])].filter((file) => localFileExtensions.has(getFileExtension(file.name)));
    const directories = new Set();
    const entries = files.map((file) => {
      const relativePath = file.webkitRelativePath || file.name;
      const parts = relativePath.split("/");
      parts.pop();
      while (parts.length) {
        directories.add(parts.join("/"));
        parts.pop();
      }
      return { file, name: file.name, relativePath };
    });
    registerLocalIndex({ files: entries, directories: [...directories] }, "本地文件夹");
  }, { once: true });
  input.click();
}

async function localObjectUrl(id, file = null) {
  const item = localResources.files.get(id);
  if (!item) return "";
  if (!localResources.urls.has(id)) localResources.urls.set(id, URL.createObjectURL(file || await resolveLocalFile(item)));
  return localResources.urls.get(id);
}

async function resolveLocalFile(item) {
  if (item.file) return item.file;
  if (item.handle) return item.handle.getFile();
  throw new Error("文件句柄不可用，请重新选择文件夹");
}

function clearLocalResources({ keepHandle = false } = {}) {
  localResources.files.clear();
  localResources.directories = [];
  for (const url of localResources.urls.values()) URL.revokeObjectURL(url);
  localResources.urls.clear();
  localResources.tabs = [];
  if (!keepHandle) {
    localResources.handle = null;
    localResources.label = "";
  }
}

async function collectFilesFromDirectoryHandle(handle, basePath = "") {
  const index = { files: [], directories: [] };
  for await (const [name, child] of handle.entries()) {
    const relativePath = [basePath, name].filter(Boolean).join("/");
    if (child.kind === "directory") {
      index.directories.push(relativePath);
      const nested = await collectFilesFromDirectoryHandle(child, relativePath);
      index.files.push(...nested.files);
      index.directories.push(...nested.directories);
    } else if (child.kind === "file" && localFileExtensions.has(getFileExtension(name))) {
      index.files.push({ handle: child, name, relativePath });
    }
  }
  return index;
}

function registerLocalIndex(index, label = "") {
  clearLocalResources({ keepHandle: true });
  localResources.label = label;
  localResources.directories = index.directories || [];
  for (const entry of index.files) {
    const name = entry.name || entry.file?.name || entry.handle?.name;
    const relativePath = entry.relativePath || entry.file?.webkitRelativePath || name;
    const id = `local:${relativePath}`;
    localResources.files.set(id, {
      id,
      name,
      relativePath,
      size: entry.file?.size ?? null,
      type: localFileType({ name }),
      file: entry.file || null,
      handle: entry.handle || null
    });
  }
  renderNavigation(currentDocument?.id || "");
}

async function loadLocalFolderHandle(handle, { persist = false } = {}) {
  const permission = await handle.requestPermission?.({ mode: "read" });
  if (permission && permission !== "granted") return;
  localResources.handle = handle;
  const index = await collectFilesFromDirectoryHandle(handle);
  registerLocalIndex(index, handle.name || "本地文件夹");
  if (persist) await setStoredLocalFolderHandle(handle);
}

async function restoreLocalFolder() {
  if (!("showDirectoryPicker" in window)) return;
  try {
    const handle = await getStoredLocalFolderHandle();
    if (!handle) return;
    const permission = await handle.queryPermission?.({ mode: "read" });
    if (permission === "granted") await loadLocalFolderHandle(handle);
  } catch {
    // 恢复失败时保持静默，不影响公开知识库。
  }
}

async function removeLocalFolder() {
  clearLocalResources();
  await clearStoredLocalFolderHandle();
  renderNavigation();
  if (currentDocument?.id?.startsWith("local:")) location.hash = "#/";
}

function renderNavigation(activeId = "") {
  nav.innerHTML = `${renderCourseNodes(buildCourseTree(catalog.courses), activeId)}${renderLocalResources(activeId)}`;
}

function renderHome() {
  siteLayout.dataset.localWorkbench = "false";
  siteLayout.dataset.workbenchFullscreen = "false";
  main.classList.remove("workspace-active");
  activeWorkbenchFrame = null;
  activeWorkbenchItem = null;
  activeWorkbenchFile = null;
  currentDocument = null;
  currentTocHtml = "";
  tocMode = "toc";
  tocPanel.innerHTML = "";
  renderNavigation();
  document.title = catalog.site.title;
  main.innerHTML = `
    <section class="hero">
      <p class="eyebrow">墟 · XU · LUCIFER OPEN KNOWLEDGE</p>
      <h1>把知识整理成<br><em>清晰、可靠、可带走</em>的页面。</h1>
      <p class="hero-copy">Markdown 自动完成专业排版；完整 HTML 保留作者原有设计并直接打开。目录层级由文件夹自动生成。</p>
      <label class="search-box"><span>搜索</span><input id="search-input" type="search" placeholder="课程、章节或正文关键词" autocomplete="off" /></label>
      <div id="search-results" class="search-results" aria-live="polite"></div>
    </section>
    <section class="brand-story" aria-labelledby="brand-story-title">
      <div class="brand-glyph" aria-hidden="true">墟</div>
      <div class="brand-story-copy">
        <p class="eyebrow">WHY “墟”</p>
        <h2 id="brand-story-title">知识有所归，也由此再出发。</h2>
        <p>“墟”取意于“归墟”。我们借《山海经》中万物流转、终有所归的意象，表达知识的另一种轮回：它被记录、分享与修订，又在下一颗好奇心中重新生长。</p>
        <p>这里不是知识的终点，而是一处开放的汇流之地。</p>
      </div>
    </section>
    <section class="open-source-section" aria-labelledby="open-source-title">
      <div class="open-source-copy">
        <p class="eyebrow">OPEN SOURCE, OPEN FUTURE</p>
        <h2 id="open-source-title">让有用的内容，抵达更多人。</h2>
        <p>开源即是未来，分享带来进步。你可以把有用的文章放进对应文件夹，让它们成为知识库的一部分，分享给 everybody。</p>
        <p>这个站点保持纯静态，不设置账号、评论服务器或数据库。想交流、提建议、补充文章，可以直接前往 GitHub 仓库。</p>
        <a class="github-link" href="https://github.com/Lucifer-cgl/XU" target="_blank" rel="noopener noreferrer"><span>GitHub</span><strong>Lucifer-cgl / XU</strong><span aria-hidden="true">↗</span></a>
      </div>
      <div class="support-panel">
        <div class="support-copy">
          <p class="eyebrow">SUPPORT THE WORK</p>
          <h2>码字不易，感谢每一次回应。</h2>
          <p>点赞、收藏、加关注，就是最直接的支持。觉得有用的话，随缘支持一下～ 欢迎私信订阅更多有趣内容。</p>
        </div>
        <div class="support-images">
          <figure><img src="${supportMemeUrl}" alt="支持作者的趣味表情图" loading="lazy"><figcaption>喜欢的话，给创作一点鼓励</figcaption></figure>
          <figure><img src="${wechatQrUrl}" alt="作者的微信支持二维码" loading="lazy"><figcaption>随缘支持 · 量力而行</figcaption></figure>
        </div>
      </div>
    </section>
    <section class="course-grid" aria-label="课程列表">
      ${catalog.courses.map((course, index) => `
        <article class="course-card">
          <span class="course-number">${String(index + 1).padStart(2, "0")}</span>
          <h2>${escapeHtml(course.name)}</h2>
          <p>${escapeHtml(course.description || `${course.documents.length} 篇内容`)}</p>
          <a href="${course.documents[0] ? hrefFor(course.documents[0]) : "#/"}">开始阅读 <span aria-hidden="true">→</span></a>
        </article>`).join("")}
    </section>`;
  const input = document.querySelector("#search-input");
  input.addEventListener("focus", ensureSearchIndex, { once: true });
  input.addEventListener("input", handleSearch);
}

async function ensureSearchIndex() {
  if (!searchIndex) searchIndex = await loadJson("/generated/search-index.json");
}

async function handleSearch(event) {
  const target = document.querySelector("#search-results");
  const query = event.target.value.trim().toLocaleLowerCase("zh-CN");
  if (!query) { target.innerHTML = ""; return; }
  await ensureSearchIndex();
  const terms = query.split(/\s+/).filter(Boolean);
  const results = searchIndex.filter((item) => terms.every((term) => `${item.displayTitle || ""} ${item.title} ${item.coursePath} ${item.text}`.toLocaleLowerCase("zh-CN").includes(term))).slice(0, 12);
  target.innerHTML = results.length
    ? results.map((item) => `<a href="${hrefFor(item)}"><strong>${escapeHtml(labelFor(item))}</strong><span>${escapeHtml(item.coursePath)} · ${item.type.toUpperCase()}</span><small>${escapeHtml(item.description)}</small></a>`).join("")
    : "<p>没有找到相关内容。</p>";
}

function buildHtmlPreviewDocument(source) {
  const hasDocumentShell = /<!doctype|<html[\s>]/i.test(source);
  const documentSource = hasDocumentShell
    ? source
    : `<!doctype html><html><head><meta charset="utf-8"></head><body>${source}</body></html>`;
  const parsed = new DOMParser().parseFromString(documentSource, "text/html");
  const style = parsed.createElement("style");
  style.textContent = `
    html, body {
      height: auto !important;
      min-height: 0 !important;
      overflow-y: visible !important;
    }
    :where(.container, .data-container, .methods-container, main, section, article) {
      max-height: none !important;
      height: auto !important;
      overflow-y: visible !important;
    }
    * { scrollbar-width: thin; scrollbar-color: transparent transparent; }
    *::-webkit-scrollbar { width: 6px; height: 6px; }
    *::-webkit-scrollbar-track { background: transparent; }
    *::-webkit-scrollbar-thumb { border-radius: 999px; background: transparent; }
    *:hover { scrollbar-color: rgba(32, 70, 58, .42) transparent; }
    *:hover::-webkit-scrollbar-thumb { background: rgba(32, 70, 58, .42); }
    *:hover::-webkit-scrollbar-thumb:hover { background: rgba(32, 70, 58, .7); }
  `;
  parsed.head.append(style);
  return DOMPurify.sanitize(`<!doctype html>${parsed.documentElement.outerHTML}`, {
    WHOLE_DOCUMENT: true,
    ADD_TAGS: ["style"],
    ADD_ATTR: ["style"],
    FORBID_TAGS: ["script", "iframe", "object", "embed", "form", "foreignObject"],
    FORBID_ATTR: ["onerror", "onclick", "onload"]
  });
}

function loadBookmarks() {
  try {
    const value = JSON.parse(localStorage.getItem(bookmarkStorageKey) || "{}");
    return value && typeof value === "object" ? value : {};
  } catch {
    return {};
  }
}

function saveBookmarks(value) {
  localStorage.setItem(bookmarkStorageKey, JSON.stringify(value));
}

function bookmarksFor(docId = currentDocument?.id) {
  return loadBookmarks()[docId] || [];
}

function loadOpenTabs() {
  try {
    const value = JSON.parse(localStorage.getItem(openTabsStorageKey) || "[]");
    return Array.isArray(value)
      ? value.filter((item) => item?.id && item?.title && (!item.id.startsWith("local:") || localResources.files.has(item.id))).slice(0, 12)
      : [];
  } catch {
    return [];
  }
}

function saveOpenTabs(tabs) {
  localResources.tabs = tabs.filter((tab) => tab.id?.startsWith("local:")).slice(0, 12);
  localStorage.setItem(openTabsStorageKey, JSON.stringify(tabs.slice(0, 12)));
}

function loadTabScrolls() {
  try {
    const value = JSON.parse(localStorage.getItem(tabScrollStorageKey) || "{}");
    return value && typeof value === "object" ? value : {};
  } catch {
    return {};
  }
}

function saveTabScrolls(value) {
  localStorage.setItem(tabScrollStorageKey, JSON.stringify(value));
}

function saveCurrentTabScroll() {
  if (!currentDocument) return;
  const scrolls = loadTabScrolls();
  scrolls[currentDocument.id] = Math.round(window.scrollY);
  saveTabScrolls(scrolls);
}

function addOpenTab(doc) {
  const next = loadOpenTabs().filter((tab) => tab.id !== doc.id);
  next.unshift({ id: doc.id, title: labelFor(doc), type: doc.type });
  saveOpenTabs(next);
}

function closeDocumentTab(docId) {
  const tabs = loadOpenTabs();
  const index = tabs.findIndex((tab) => tab.id === docId);
  const nextTabs = tabs.filter((tab) => tab.id !== docId);
  saveOpenTabs(nextTabs);
  const scrolls = loadTabScrolls();
  delete scrolls[docId];
  saveTabScrolls(scrolls);
  if (currentDocument?.id !== docId) {
    refreshDocumentTabs();
    return;
  }
  const next = nextTabs[Math.max(0, index - 1)] || nextTabs[0];
  currentDocument = null;
  location.hash = next ? (next.id.startsWith("local:") ? localRouteFor(next.id) : routeFor(next.id)) : "#/";
}

function renderDocumentTabs() {
  const tabs = loadOpenTabs();
  if (!tabs.length) return "";
  return `<div class="doc-tab-dock no-print"><div class="doc-tabs" aria-label="已打开文档">${tabs.map((tab) => `<div class="doc-tab ${tab.id === currentDocument?.id ? "active" : ""}">
      <a href="${tab.id.startsWith("local:") ? localRouteFor(tab.id) : routeFor(tab.id)}" title="${escapeHtml(tab.title)}">${escapeHtml(tab.title)}</a>
      <button type="button" data-close-doc-tab="${escapeHtml(tab.id)}" aria-label="关闭 ${escapeHtml(tab.title)}">×</button>
    </div>`).join("")}</div></div>`;
}

function refreshDocumentTabs() {
  const node = document.querySelector(".doc-tab-dock");
  if (!node) return;
  const html = renderDocumentTabs();
  if (html) node.outerHTML = html;
  else node.remove();
}

function scrollToWithHeaderOffset(target, behavior = "smooth") {
  if (!target) return;
  const headerHeight = document.querySelector(".site-header")?.offsetHeight || 76;
  const dockHeight = document.querySelector(".doc-tab-dock")?.offsetHeight || 0;
  const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - dockHeight - 18;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

function restoreTabScroll(docId) {
  const scrollY = loadTabScrolls()[docId];
  if (Number.isFinite(scrollY)) window.scrollTo({ top: Math.max(0, scrollY), behavior: "auto" });
  else window.scrollTo({ top: 0, behavior: "auto" });
}

function sanitizePlainText(value = "", maxLength = 80) {
  return String(value).replace(/[<>{}()[\];`"'\\]/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function sanitizeBookmarkId(value = "") {
  return String(value).replace(/[^a-z0-9_-]/gi, "").slice(0, 64);
}

function sanitizeDocId(value = "") {
  const docId = String(value).replace(/\\/g, "/").trim();
  if (!docId || docId.includes("..") || /[<>{}()[\];`"'\\]/.test(docId)) return "";
  return docId.slice(0, 500);
}

function sanitizeBookmark(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const id = sanitizeBookmarkId(raw.id);
  if (!id) return null;
  return {
    id,
    title: sanitizePlainText(raw.title || "当前位置", 60) || "当前位置",
    headingId: sanitizePlainText(raw.headingId || "", 120),
    lineId: sanitizePlainText(raw.lineId || "", 160),
    lineIndex: Math.max(-1, Math.min(100000, Number(raw.lineIndex) || -1)),
    offset: Math.max(-100000, Math.min(100000, Number(raw.offset) || 0)),
    scrollY: Math.max(0, Math.min(10000000, Number(raw.scrollY) || 0)),
    createdAt: Math.max(0, Math.min(Date.now(), Number(raw.createdAt) || Date.now()))
  };
}

function sanitizeBookmarkCollection(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("书签数据不是对象");
  const output = {};
  for (const [rawDocId, rawItems] of Object.entries(value)) {
    const docId = sanitizeDocId(rawDocId);
    if (!docId || !Array.isArray(rawItems)) continue;
    const items = rawItems.map(sanitizeBookmark).filter(Boolean).slice(0, 50);
    if (items.length) output[docId] = items;
  }
  return output;
}

function findReadingTarget(article) {
  const candidates = [...article.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li, blockquote, table, pre, .answer-space")];
  const anchor = Math.min(window.innerHeight * 0.32, 220);
  return candidates.find((node) => node.getBoundingClientRect().bottom >= anchor) || candidates[0] || article;
}

function nearestHeading(node, article) {
  let current = node;
  while (current && current !== article) {
    if (/^H[1-6]$/.test(current.tagName)) return current;
    current = current.previousElementSibling;
  }
  current = node?.previousElementSibling;
  while (current) {
    if (/^H[1-6]$/.test(current.tagName)) return current;
    current = current.previousElementSibling;
  }
  return article.querySelector("h1, h2, h3, h4, h5, h6");
}

function readableBookmarkTitle(target, heading) {
  const text = target?.textContent?.replace(/\s+/g, " ").trim();
  if (text) return text.slice(0, 28);
  return heading?.textContent?.trim() || "当前位置";
}

function addBookmark() {
  const article = document.querySelector("#article");
  if (!article || !currentDocument) return;
  const target = findReadingTarget(article);
  const heading = nearestHeading(target, article);
  const docBookmarks = bookmarksFor();
  const bookmark = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    title: readableBookmarkTitle(target, heading),
    headingId: heading?.id || "",
    lineId: target.id || "",
    lineIndex: [...article.children].indexOf(target),
    offset: Math.round(target.getBoundingClientRect().top),
    scrollY: Math.round(window.scrollY),
    createdAt: Date.now()
  };
  const all = loadBookmarks();
  all[currentDocument.id] = [bookmark, ...docBookmarks].slice(0, 30);
  saveBookmarks(all);
  tocMode = "bookmarks";
  renderRightPanel();
}

function removeBookmark(id) {
  if (!currentDocument) return;
  const all = loadBookmarks();
  all[currentDocument.id] = bookmarksFor().filter((bookmark) => bookmark.id !== id);
  saveBookmarks(all);
  renderRightPanel();
}

async function exportBookmarks() {
  const data = {
    type: bookmarkFileType,
    xuBookmarkSignature: bookmarkFileSignature,
    version: 1,
    exportedAt: new Date().toISOString(),
    bookmarks: loadBookmarks()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const fileName = `xu-bookmarks-${new Date().toISOString().slice(0, 10)}.json`;
  if ("showSaveFilePicker" in window) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [{ description: "XU 书签备份", accept: { "application/json": [".json"] } }]
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return;
    } catch (error) {
      if (error?.name === "AbortError") return;
    }
  }
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function importBookmarks() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json,application/json";
  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (parsed?.type !== bookmarkFileType || parsed?.xuBookmarkSignature !== bookmarkFileSignature) {
        throw new Error("缺少 XU 书签关键语句，已拒绝导入");
      }
      const incoming = sanitizeBookmarkCollection(parsed.bookmarks);
      const merged = { ...loadBookmarks() };
      for (const [docId, items] of Object.entries(incoming)) {
        const existing = merged[docId] || [];
        const seen = new Set(existing.map((item) => item.id));
        merged[docId] = [...existing, ...items.filter((item) => item.id && !seen.has(item.id))].slice(0, 50);
      }
      saveBookmarks(merged);
      renderRightPanel();
    } catch (error) {
      alert(`书签导入失败：${error.message}`);
    }
  }, { once: true });
  input.click();
}

function jumpToBookmark(bookmark) {
  const article = document.querySelector("#article");
  if (!article) return;
  const target =
    (bookmark.lineId && document.getElementById(bookmark.lineId)) ||
    article.children[bookmark.lineIndex] ||
    (bookmark.headingId && document.getElementById(bookmark.headingId));
  if (target) {
    scrollToWithHeaderOffset(target);
    return;
  }
  window.scrollTo({ top: bookmark.scrollY || 0, behavior: "smooth" });
}

function renderRightPanel() {
  if (!currentDocument) {
    currentTocHtml = "";
    tocPanel.innerHTML = "";
    return;
  }
  const activeToc = tocMode === "toc" ? "active" : "";
  const activeBookmarks = tocMode === "bookmarks" ? "active" : "";
  const body = tocMode === "bookmarks" ? renderBookmarkList() : currentTocHtml;
  tocPanel.innerHTML = `<div class="toc-switch" role="tablist" aria-label="右侧栏切换">
    <button type="button" class="${activeToc}" data-toc-mode="toc">目录</button>
    <button type="button" class="${activeBookmarks}" data-toc-mode="bookmarks">书签</button>
  </div>${body}`;
}

function renderBookmarkList() {
  const items = bookmarksFor();
  return `<div class="bookmark-panel">
    <button type="button" class="bookmark-add" data-bookmark-action="add">+ 添加当前位置</button>
    <div class="bookmark-actions">
      <button type="button" data-bookmark-action="export">导出</button>
      <button type="button" data-bookmark-action="import">导入</button>
    </div>
    ${items.length ? `<div class="bookmark-list">${items.map((bookmark) => `<div class="bookmark-item">
      <button type="button" class="bookmark-jump" data-bookmark-id="${escapeHtml(bookmark.id)}" title="${escapeHtml(bookmark.title)}">${escapeHtml(bookmark.title)}</button>
      <button type="button" class="bookmark-remove" data-bookmark-remove="${escapeHtml(bookmark.id)}" aria-label="删除书签">×</button>
    </div>`).join("")}</div>` : `<p class="bookmark-empty">还没有本地书签。</p>`}
  </div>`;
}

function enhanceArticle(article) {
  if (article.classList.contains("html-source")) {
    currentTocHtml = `<p class="bookmark-empty">HTML 文档已在中间预览区打开。</p>`;
    renderRightPanel();
    return;
  }
  const headings = [...article.querySelectorAll("h2, h3, h4")];
  const used = new Set();
  headings.forEach((heading, index) => {
    const base = heading.textContent.trim().replace(/\s+/g, "-").replace(/[^\p{L}\p{N}-]/gu, "") || `section-${index + 1}`;
    let id = base;
    let suffix = 2;
    while (used.has(id)) id = `${base}-${suffix++}`;
    used.add(id);
    heading.id = id;
  });
  for (const table of article.querySelectorAll("table")) {
    if (table.parentElement?.classList.contains("table-scroll")) continue;
    const wrapper = document.createElement("div");
    wrapper.className = "table-scroll";
    table.replaceWith(wrapper);
    wrapper.append(table);
  }
  for (const link of article.querySelectorAll('a[href^="http"]')) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
  for (const image of article.querySelectorAll("img")) image.loading = "lazy";
  article.querySelectorAll("p, li, blockquote, table, pre, .answer-space").forEach((node, index) => {
    if (!node.id) node.id = `${safeId(currentDocument.id)}-line-${index + 1}`;
  });
  currentTocHtml = headings.length ? `<div class="toc-title">本文目录</div>${headings.map((heading) => `<a class="toc-level-${heading.tagName.slice(1)}" href="${routeFor(currentDocument.id)}" data-section="${encodeURIComponent(heading.id)}" title="${escapeHtml(heading.textContent)}">${escapeHtml(heading.textContent)}</a>`).join("")}` : `<p class="bookmark-empty">本文暂无目录。</p>`;
  renderRightPanel();
}

function articleTools(doc) {
  if (doc.local) {
    const canCopy = doc.type === "local-markdown" || doc.type === "local-text";
    return `<div class="article-tools no-print">
      ${canCopy ? '<button type="button" data-action="copy">复制原文</button>' : ""}
      <button type="button" data-action="html-open-tab">新标签页打开</button>
      <a href="${doc.path}" download="${escapeHtml(doc.title)}">下载原文件</a>
    </div>`;
  }
  return `<div class="article-tools no-print">
    <button type="button" data-action="copy">复制原文</button>
    <a href="${doc.path}" download>下载原文件</a>
    ${doc.type === "html" ? '<button type="button" data-action="html-open-tab">新标签页打开</button>' : ""}
    <button type="button" class="primary" data-action="print">A4 / PDF</button>
  </div>`;
}

function renderLocalUnsupportedCard(item, url) {
  const officeLike = item.type === "word" || item.type === "powerpoint" || item.type === "spreadsheet";
  return `<section class="local-file-card">
    <p class="eyebrow">${escapeHtml(localFormatLabel(item.type))} · 本地文件</p>
    <h1>${escapeHtml(item.name)}</h1>
    <p>${officeLike ? "这类 Office 文件多数浏览器不能原生预览，点击打开时通常会交给浏览器下载或调用本机 Office/WPS。XU 不上传、不转换、不保存文件内容。" : "这类文件通常由浏览器或本机软件处理。XU 不上传、不转换、不保存文件内容，只提供本地入口。"}</p>
    <div class="local-file-meta">
      <span>位置：${escapeHtml(item.relativePath)}</span>
      <span>大小：${(item.size / 1024).toFixed(1)} KB</span>
    </div>
    <div class="article-tools">
      <a href="${url}" target="_blank" rel="noopener noreferrer">${officeLike ? "交给浏览器/本机打开" : "新标签页打开"}</a>
      <a href="${url}" download="${escapeHtml(item.name)}">下载原文件</a>
    </div>
  </section>`;
}

async function renderLocalFile(id) {
  const item = localResources.files.get(id);
  if (!item) return renderError("这个本地文件当前不可用。请重新选择“我的资源”文件夹。", true);
  if (["word", "powerpoint", "spreadsheet"].includes(item.type) && !officeRuntime.ready) {
    return renderError("请先在“我的资源”下连接并成功加载编辑器文件夹，再打开此 Office 文档。", false);
  }
  if (workbenchTypes.has(item.type) && officeRuntime.ready && !isIsolatedWorkspace) {
    window.location.assign(`/workspace/${window.location.hash || localRouteFor(id)}`);
    return;
  }
  const file = await resolveLocalFile(item);
  item.size = file.size;
  const url = await localObjectUrl(id, file);
  const useWorkbench = workbenchTypes.has(item.type) && officeRuntime.ready;
  const doc = {
    id,
    title: item.name,
    displayTitle: item.name,
    type: `local-${item.type}`,
    local: true,
    coursePath: "我的资源",
    path: url
  };
  currentDocument = doc;
  workbenchZoom = 1;
  workbenchMode = "edit";
  addOpenTab(doc);
  renderNavigation(id);
  tocPanel.innerHTML = "";
  sidebar.classList.remove("open");
  currentSource = "";
  let body = "";
  try {
    if (useWorkbench) {
      body = `<div class="local-workbench-shell"><iframe id="local-workbench-frame" class="local-workbench-frame" src="${officeRuntimeFrameUrl}" title="${escapeHtml(item.name)} 文档工作台" allow="cross-origin-isolated; fullscreen" allowfullscreen></iframe></div>`;
    } else if (item.type === "markdown") {
      currentSource = await file.text();
      body = DOMPurify.sanitize(marked.parse(currentSource), {
        USE_PROFILES: { html: true, mathMl: true, svg: true },
        FORBID_TAGS: ["script", "iframe", "object", "embed", "form", "foreignObject"],
        FORBID_ATTR: ["onerror", "onclick", "onload"]
      });
    } else if (item.type === "text") {
      currentSource = await file.text();
      body = `<pre class="local-text-preview">${escapeHtml(currentSource)}</pre>`;
    } else if (item.type === "html") {
      currentSource = await file.text();
      body = `<div class="html-preview-shell"><button type="button" class="html-preview-fullscreen no-print" data-action="html-open-tab">新标签页</button><iframe id="html-preview-frame" class="html-preview-frame" title="${escapeHtml(item.name)}" sandbox="allow-same-origin"></iframe></div>`;
    } else if (item.type === "pdf") {
      body = `<object class="local-file-frame" data="${url}" type="application/pdf" aria-label="${escapeHtml(item.name)}">
        <section class="local-file-card">
          <p class="eyebrow">PDF · 本地文件</p>
          <h1>${escapeHtml(item.name)}</h1>
          <p>当前浏览器没有在页面内打开这个 PDF。你可以用新标签页或本机 PDF 阅读器打开。</p>
          <div class="article-tools">
            <a href="${url}" target="_blank" rel="noopener noreferrer">新标签页打开</a>
            <a href="${url}" download="${escapeHtml(item.name)}">下载原文件</a>
          </div>
        </section>
      </object>`;
    } else if (item.type === "image") {
      body = `<img class="local-image-preview" src="${url}" alt="${escapeHtml(item.name)}">`;
    } else {
      body = renderLocalUnsupportedCard(item, url);
    }
    main.classList.toggle("workspace-active", useWorkbench);
    siteLayout.dataset.localWorkbench = String(useWorkbench);
    main.innerHTML = `
      ${renderDocumentTabs()}
      <div class="article-head no-print">
        <div class="breadcrumbs"><a href="#/">首页</a><span>/</span><span>我的资源</span><span>/</span><strong>${escapeHtml(item.relativePath)}</strong></div>
        ${articleTools(doc)}
      </div>
      <article id="article" class="article local-source ${item.type === "html" ? "html-source" : ""}">${body}</article>`;
    document.title = `${item.name} · 我的资源 · ${catalog.site.title}`;
    const workbenchFrame = document.querySelector("#local-workbench-frame");
    if (workbenchFrame) {
      activeWorkbenchFrame = workbenchFrame;
      activeWorkbenchItem = item;
      activeWorkbenchFile = file;
      currentTocHtml = `<p class="bookmark-empty">正在等待文档工作台提供目录。</p>`;
      renderRightPanel();
    } else {
      activeWorkbenchFrame = null;
      activeWorkbenchItem = null;
      activeWorkbenchFile = null;
    }
    const htmlFrame = document.querySelector("#html-preview-frame");
    if (htmlFrame) {
      resizeHtmlPreviewFrame(htmlFrame);
      htmlFrame.srcdoc = buildHtmlPreviewDocument(currentSource);
    }
    if (item.type === "markdown" && !useWorkbench) enhanceArticle(document.querySelector("#article"));
    else if (!useWorkbench) {
      currentTocHtml = `<p class="bookmark-empty">本地资源已在中间预览区打开。</p>`;
      renderRightPanel();
    }
    document.querySelector('[data-action="copy"]')?.addEventListener("click", copySource);
    document.querySelectorAll('[data-action="html-open-tab"]').forEach((button) => button.addEventListener("click", openHtmlInNewTab));
    main.focus();
    requestAnimationFrame(() => restoreTabScroll(id));
  } catch (error) {
    renderError(`本地文件读取失败：${error.message}`);
  }
}

async function sendFileToWorkbench() {
  if (!activeWorkbenchFrame?.contentWindow || !activeWorkbenchItem) return;
  const file = activeWorkbenchFile || await resolveLocalFile(activeWorkbenchItem);
  const bytes = await file.arrayBuffer();
  activeWorkbenchFrame.contentWindow.postMessage({
    source: "xu-knowledge-base",
    type: "open-file",
    name: activeWorkbenchItem.name,
    relativePath: activeWorkbenchItem.relativePath,
    bytes
  }, window.location.origin, [bytes]);
  sendWorkbenchZoom();
  sendWorkbenchMode();
}

function sendWorkbenchZoom() {
  if (activeWorkbenchFrame?.contentWindow) activeWorkbenchFrame.contentWindow.postMessage({ source: "xu-knowledge-base", type: "viewport-zoom", value: workbenchZoom }, window.location.origin);
}

function sendWorkbenchMode() {
  if (activeWorkbenchFrame?.contentWindow) activeWorkbenchFrame.contentWindow.postMessage({ source: "xu-knowledge-base", type: "viewport-mode", value: workbenchMode }, window.location.origin);
}

async function saveWorkbenchBytes(item, bytes) {
  if (item.handle) {
    const permission = await item.handle.requestPermission?.({ mode: "readwrite" });
    if (permission && permission !== "granted") throw new Error("没有获得原文件写入权限");
    const writable = await item.handle.createWritable();
    await writable.write(bytes);
    await writable.close();
    return;
  }
  const blob = new Blob([bytes], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = item.name;
  link.click();
  URL.revokeObjectURL(url);
}

window.addEventListener("message", async (event) => {
  if (event.origin !== window.location.origin || event.source !== activeWorkbenchFrame?.contentWindow) return;
  const data = event.data;
  if (!data || data.source !== "xu-office-editor") return;
  try {
    if (data.type === "ready") {
      await sendFileToWorkbench();
      return;
    }
    if (data.type === "file-saved" && data.bytes instanceof ArrayBuffer && activeWorkbenchItem) {
      await saveWorkbenchBytes(activeWorkbenchItem, data.bytes);
      return;
    }
    if (data.type === "outline-changed") {
      const items = Array.isArray(data.items) ? data.items : [];
      currentTocHtml = items.length
        ? `<div class="toc-title">文档目录</div>${items.map((item) => `<button type="button" class="bookmark-jump toc-level-${Math.max(1, Math.min(6, Number(item.level) || 1))}" data-workbench-outline="${escapeHtml(item.id || "")}" title="${escapeHtml(item.title || "")}">${escapeHtml(item.title || "未命名")}</button>`).join("")}`
        : `<p class="bookmark-empty">当前文档暂未提供可导航目录。</p>`;
      renderRightPanel();
    }
  } catch (error) {
    renderError(`文档工作台通信失败：${error.message}`);
  }
});

async function renderArticle(id) {
  siteLayout.dataset.localWorkbench = "false";
  siteLayout.dataset.workbenchFullscreen = "false";
  main.classList.remove("workspace-active");
  activeWorkbenchFrame = null;
  activeWorkbenchItem = null;
  activeWorkbenchFile = null;
  const doc = catalog.documents.find((item) => item.id === id);
  if (!doc) return renderError("没有找到这篇文档。", true);
  currentDocument = doc;
  addOpenTab(doc);
  renderNavigation(id);
  main.innerHTML = '<div class="loading-state">正在读取文章……</div>';
  tocPanel.innerHTML = "";
  sidebar.classList.remove("open");
  try {
    const response = await fetch(doc.path);
    if (!response.ok) throw new Error(`文件读取失败（${response.status}）`);
    currentSource = await response.text();
    const markdownBody = currentSource.replace(/^---\n[\s\S]*?\n---\n/, "");
    const unsafe = doc.type === "markdown" ? marked.parse(markdownBody) : "";
    const safe = doc.type === "markdown" ? DOMPurify.sanitize(unsafe, {
      USE_PROFILES: { html: true, mathMl: true, svg: true },
      FORBID_TAGS: ["script", "iframe", "object", "embed", "form", "foreignObject"],
      FORBID_ATTR: ["onerror", "onclick", "onload"]
    }) : "";
    const safeHtmlPreview = doc.type === "html" ? buildHtmlPreviewDocument(currentSource) : "";
    const position = catalog.documents.findIndex((item) => item.id === id);
    const previous = catalog.documents[position - 1];
    const next = catalog.documents[position + 1];
    main.innerHTML = `
      ${renderDocumentTabs()}
      <div class="article-head no-print">
        <div class="breadcrumbs"><a href="#/">首页</a><span>/</span><span>${escapeHtml(doc.coursePath)}</span><span>/</span><strong>${escapeHtml(labelFor(doc))}</strong></div>
        ${articleTools(doc)}
      </div>
      <article id="article" class="article ${doc.type === "html" ? "html-source" : "markdown-source"}">${doc.type === "html" ? `<div class="html-preview-shell"><button type="button" class="html-preview-fullscreen no-print" data-action="html-open-tab">新标签页</button><iframe id="html-preview-frame" class="html-preview-frame" title="${escapeHtml(labelFor(doc))}" sandbox="allow-same-origin"></iframe></div>` : safe}</article>
      <nav class="article-pagination no-print" aria-label="文章翻页">
        ${previous ? `<a href="${hrefFor(previous)}"><small>上一篇</small>${escapeHtml(labelFor(previous))}</a>` : "<span></span>"}
        ${next ? `<a class="next" href="${hrefFor(next)}"><small>下一篇</small>${escapeHtml(labelFor(next))}</a>` : "<span></span>"}
      </nav>`;
    document.title = `${doc.title} · ${catalog.site.title}`;
    const htmlFrame = document.querySelector("#html-preview-frame");
    if (htmlFrame) {
      resizeHtmlPreviewFrame(htmlFrame);
      htmlFrame.srcdoc = safeHtmlPreview;
    }
    enhanceArticle(document.querySelector("#article"));
    document.querySelector('[data-action="copy"]').addEventListener("click", copySource);
    document.querySelector('[data-action="print"]').addEventListener("click", openPrintPreview);
    document.querySelectorAll('[data-action="html-open-tab"]').forEach((button) => button.addEventListener("click", openHtmlInNewTab));
    main.focus();
    requestAnimationFrame(() => restoreTabScroll(doc.id));
  } catch (error) {
    renderError(error.message);
  }
}

function openHtmlInNewTab() {
  if (!currentDocument?.path) return;
  window.open(currentDocument.path, "_blank", "noopener,noreferrer");
}

function resizeHtmlPreviewFrame(frame) {
  if (!frame) return;
  const resize = () => {
    let doc;
    try {
      doc = frame.contentDocument;
    } catch {
      return;
    }
    if (data.type === "toggle-fullscreen") {
      siteLayout.dataset.workbenchFullscreen = String(Boolean(data.active));
      return;
    }
    if (!doc) return;
    const bottom = Math.ceil(Math.max(0, ...[...doc.body.querySelectorAll("*")].map((node) => {
      const rect = node.getBoundingClientRect();
      const style = doc.defaultView.getComputedStyle(node);
      const marginBottom = Number.parseFloat(style.marginBottom) || 0;
      return rect.bottom + marginBottom;
    })));
    const height = Math.max(
      doc.documentElement?.scrollHeight || 0,
      doc.body?.scrollHeight || 0,
      doc.documentElement?.offsetHeight || 0,
      doc.body?.offsetHeight || 0,
      bottom,
      560
    );
    frame.style.height = `${height}px`;
    frame.closest(".html-preview-shell")?.style.setProperty("--html-preview-height", `${height}px`);
  };
  frame.addEventListener("load", () => {
    resize();
    window.setTimeout(resize, 120);
    window.setTimeout(resize, 600);
    window.setTimeout(resize, 1500);
    const observer = new ResizeObserver(resize);
    observer.observe(frame.contentDocument.documentElement);
    if (frame.contentDocument.body) observer.observe(frame.contentDocument.body);
  }, { once: true });
}

async function copySource(event) {
  await navigator.clipboard.writeText(currentSource);
  const button = event.currentTarget;
  const original = button.textContent;
  button.textContent = "已复制";
  setTimeout(() => { button.textContent = original; }, 1500);
}

async function openPrintPreview(event) {
  const button = event.currentTarget;
  button.disabled = true;
  button.textContent = "正在准备……";
  try {
    const { openPdfPreview } = await import("./page.js");
    await openPdfPreview({
      title: currentDocument.title,
      coursePath: currentDocument.coursePath
    });
  } finally {
    button.disabled = false;
    button.textContent = "A4 / PDF";
  }
}

function renderError(message, showHome = false) {
  siteLayout.dataset.localWorkbench = "false";
  siteLayout.dataset.workbenchFullscreen = "false";
  main.classList.remove("workspace-active");
  main.innerHTML = `<section class="error-state"><p class="eyebrow">读取失败</p><h1>${escapeHtml(message)}</h1>${showHome ? '<a href="#/">返回首页</a>' : '<button type="button" onclick="location.reload()">重新加载</button>'}</section>`;
}

function route() {
  saveCurrentTabScroll();
  const localMatch = location.hash.match(/^#\/local\/(.+)$/);
  if (localMatch) {
    renderLocalFile(decodeURIComponent(localMatch[1]));
    return;
  }
  const match = location.hash.match(/^#\/read\/(.+)$/);
  if (match) renderArticle(decodeURIComponent(match[1]));
  else renderHome();
}

navToggle.addEventListener("click", () => {
  const open = sidebar.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
leftPanelToggle.addEventListener("click", () => togglePanel("left"));
rightPanelToggle.addEventListener("click", () => togglePanel("right"));
themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("xu-theme", next);
});
document.documentElement.dataset.theme = localStorage.getItem("xu-theme") || "light";
tocPanel.addEventListener("click", (event) => {
  const outlineButton = event.target.closest("[data-workbench-outline]");
  if (outlineButton && activeWorkbenchFrame?.contentWindow) {
    activeWorkbenchFrame.contentWindow.postMessage({ source: "xu-knowledge-base", type: "outline-jump", id: outlineButton.dataset.workbenchOutline }, window.location.origin);
    return;
  }
  const modeButton = event.target.closest("[data-toc-mode]");
  if (modeButton) {
    tocMode = modeButton.dataset.tocMode;
    renderRightPanel();
    return;
  }
  const addButton = event.target.closest('[data-bookmark-action="add"]');
  if (addButton) {
    addBookmark();
    return;
  }
  const exportButton = event.target.closest('[data-bookmark-action="export"]');
  if (exportButton) {
    exportBookmarks();
    return;
  }
  const importButton = event.target.closest('[data-bookmark-action="import"]');
  if (importButton) {
    importBookmarks();
    return;
  }
  const removeButton = event.target.closest("[data-bookmark-remove]");
  if (removeButton) {
    removeBookmark(removeButton.dataset.bookmarkRemove);
    return;
  }
  const bookmarkButton = event.target.closest("[data-bookmark-id]");
  if (bookmarkButton) {
    const bookmark = bookmarksFor().find((item) => item.id === bookmarkButton.dataset.bookmarkId);
    if (bookmark) jumpToBookmark(bookmark);
    return;
  }
  const link = event.target.closest("a[data-section]");
  if (!link) return;
  event.preventDefault();
  const target = document.getElementById(decodeURIComponent(link.dataset.section));
  scrollToWithHeaderOffset(target);
});
main.addEventListener("click", (event) => {
  const closeButton = event.target.closest("[data-close-doc-tab]");
  if (!closeButton) return;
  event.preventDefault();
  event.stopPropagation();
  closeDocumentTab(closeButton.dataset.closeDocTab);
});
nav.addEventListener("click", async (event) => {
  const localButton = event.target.closest("[data-local-action]");
  if (localButton) {
    event.preventDefault();
    if (localButton.dataset.localAction === "pick-folder") chooseLocalFolder();
    if (localButton.dataset.localAction === "remove-folder") removeLocalFolder();
    if (localButton.dataset.localAction === "pick-runtime") chooseOfficeRuntime();
    if (localButton.dataset.localAction === "remove-runtime") disconnectOfficeRuntime();
    return;
  }
  const button = event.target.closest("[data-download-group]");
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
  button.disabled = true;
  try {
    const { openDownloadManager } = await import("./download.js");
    await openDownloadManager({
      groupId: decodeURIComponent(button.dataset.downloadGroup),
      courseId: decodeURIComponent(button.dataset.downloadCourse)
    });
  } catch (error) {
    renderError(`下载功能加载失败：${error.message}`);
  } finally {
    button.disabled = false;
  }
});
sidebar.addEventListener("click", (event) => {
  const button = event.target.closest("[data-tree-action]");
  if (!button) return;
  const expand = button.dataset.treeAction === "expand";
  nav.querySelectorAll("details.course-group").forEach((details) => { details.open = expand; });
});
window.addEventListener("hashchange", route);
window.addEventListener("pointermove", (event) => {
  const edge = 30;
  const nearRight = window.innerWidth - event.clientX <= edge;
  const nearBottom = window.innerHeight - event.clientY <= edge;
  document.documentElement.classList.toggle("show-page-scrollbar", nearRight || nearBottom);
}, { passive: true });
window.addEventListener("blur", () => {
  document.documentElement.classList.remove("show-page-scrollbar");
});
window.addEventListener("scroll", () => {
  if (!currentDocument) return;
  window.clearTimeout(scrollSaveTimer);
  scrollSaveTimer = window.setTimeout(saveCurrentTabScroll, 180);
}, { passive: true });

try {
  catalog = await loadJson("/generated/catalog.json");
  await Promise.all([restoreLocalFolder(), restoreOfficeRuntime()]);
  renderNavigation();
  route();
} catch (error) {
  renderError(`知识库目录加载失败：${error.message}`);
}
