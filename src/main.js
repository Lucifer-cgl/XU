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
const hrefFor = (doc) => routeFor(doc.id);
const labelFor = (doc) => doc.displayTitle || doc.title;
const safeId = (value = "") => `b-${Array.from(value).map((char) => char.codePointAt(0).toString(36)).join("-")}`;

async function loadJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`读取失败（${response.status}）`);
  return response.json();
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

function renderNavigation(activeId = "") {
  nav.innerHTML = renderCourseNodes(buildCourseTree(catalog.courses), activeId);
}

function renderHome() {
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
    return Array.isArray(value) ? value.filter((item) => item?.id && item?.title).slice(0, 12) : [];
  } catch {
    return [];
  }
}

function saveOpenTabs(tabs) {
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
  location.hash = next ? routeFor(next.id) : "#/";
}

function renderDocumentTabs() {
  const tabs = loadOpenTabs();
  if (!tabs.length) return "";
  return `<div class="doc-tab-dock no-print"><div class="doc-tabs" aria-label="已打开文档">${tabs.map((tab) => `<div class="doc-tab ${tab.id === currentDocument?.id ? "active" : ""}">
      <a href="${routeFor(tab.id)}" title="${escapeHtml(tab.title)}">${escapeHtml(tab.title)}</a>
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
  return `<div class="article-tools no-print">
    <button type="button" data-action="copy">复制原文</button>
    <a href="${doc.path}" download>下载原文件</a>
    <button type="button" class="primary" data-action="print">A4 / PDF</button>
  </div>`;
}

async function renderArticle(id) {
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
      <article id="article" class="article ${doc.type === "html" ? "html-source" : "markdown-source"}">${doc.type === "html" ? `<div class="html-preview-shell"><iframe id="html-preview-frame" class="html-preview-frame" title="${escapeHtml(labelFor(doc))}" sandbox=""></iframe></div>` : safe}</article>
      <nav class="article-pagination no-print" aria-label="文章翻页">
        ${previous ? `<a href="${hrefFor(previous)}"><small>上一篇</small>${escapeHtml(labelFor(previous))}</a>` : "<span></span>"}
        ${next ? `<a class="next" href="${hrefFor(next)}"><small>下一篇</small>${escapeHtml(labelFor(next))}</a>` : "<span></span>"}
      </nav>`;
    document.title = `${doc.title} · ${catalog.site.title}`;
    const htmlFrame = document.querySelector("#html-preview-frame");
    if (htmlFrame) htmlFrame.srcdoc = safeHtmlPreview;
    enhanceArticle(document.querySelector("#article"));
    document.querySelector('[data-action="copy"]').addEventListener("click", copySource);
    document.querySelector('[data-action="print"]').addEventListener("click", openPrintPreview);
    main.focus();
    requestAnimationFrame(() => restoreTabScroll(doc.id));
  } catch (error) {
    renderError(error.message);
  }
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
  main.innerHTML = `<section class="error-state"><p class="eyebrow">读取失败</p><h1>${escapeHtml(message)}</h1>${showHome ? '<a href="#/">返回首页</a>' : '<button type="button" onclick="location.reload()">重新加载</button>'}</section>`;
}

function route() {
  saveCurrentTabScroll();
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
  renderNavigation();
  route();
} catch (error) {
  renderError(`知识库目录加载失败：${error.message}`);
}
