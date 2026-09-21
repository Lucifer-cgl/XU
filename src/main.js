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
const hrefFor = (doc) => doc.type === "html" ? doc.path : routeFor(doc.id);

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
        ${course?.documents.length ? `<div class="course-links">${course.documents.map((doc) => `<a href="${hrefFor(doc)}" class="${doc.id === activeId ? "active" : ""}" title="${escapeHtml(doc.title)}"><span class="format-badge">${doc.type === "markdown" ? "MD" : "HTML"}</span><span class="course-link-title">${escapeHtml(doc.title)}</span></a>`).join("")}</div>` : ""}
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
  const results = searchIndex.filter((item) => terms.every((term) => `${item.title} ${item.coursePath} ${item.text}`.toLocaleLowerCase("zh-CN").includes(term))).slice(0, 12);
  target.innerHTML = results.length
    ? results.map((item) => `<a href="${hrefFor(item)}"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.coursePath)} · ${item.type.toUpperCase()}</span><small>${escapeHtml(item.description)}</small></a>`).join("")
    : "<p>没有找到相关内容。</p>";
}

function extractHtmlBody(source) {
  const parsed = new DOMParser().parseFromString(source, "text/html");
  return parsed.body?.innerHTML || source;
}

function enhanceArticle(article) {
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
  tocPanel.innerHTML = headings.length ? `<div class="toc-title">本文目录</div>${headings.map((heading) => `<a class="toc-level-${heading.tagName.slice(1)}" href="${routeFor(currentDocument.id)}" data-section="${encodeURIComponent(heading.id)}" title="${escapeHtml(heading.textContent)}">${escapeHtml(heading.textContent)}</a>`).join("")}` : "";
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
  renderNavigation(id);
  main.innerHTML = '<div class="loading-state">正在读取文章……</div>';
  tocPanel.innerHTML = "";
  sidebar.classList.remove("open");
  try {
    const response = await fetch(doc.path);
    if (!response.ok) throw new Error(`文件读取失败（${response.status}）`);
    currentSource = await response.text();
    const markdownBody = currentSource.replace(/^---\n[\s\S]*?\n---\n/, "");
    const unsafe = doc.type === "markdown" ? marked.parse(markdownBody) : extractHtmlBody(currentSource);
    const safe = DOMPurify.sanitize(unsafe, {
      USE_PROFILES: { html: true, mathMl: true, svg: true },
      FORBID_TAGS: ["script", "iframe", "object", "embed", "form", "foreignObject"],
      FORBID_ATTR: ["onerror", "onclick", "onload"]
    });
    const position = catalog.documents.findIndex((item) => item.id === id);
    const previous = catalog.documents[position - 1];
    const next = catalog.documents[position + 1];
    main.innerHTML = `
      <div class="article-head no-print">
        <div class="breadcrumbs"><a href="#/">首页</a><span>/</span><span>${escapeHtml(doc.coursePath)}</span><span>/</span><strong>${escapeHtml(doc.title)}</strong></div>
        ${articleTools(doc)}
      </div>
      <article id="article" class="article ${doc.type === "html" ? "html-source" : "markdown-source"}">${safe}</article>
      <nav class="article-pagination no-print" aria-label="文章翻页">
        ${previous ? `<a href="${hrefFor(previous)}"><small>上一篇</small>${escapeHtml(previous.title)}</a>` : "<span></span>"}
        ${next ? `<a class="next" href="${hrefFor(next)}"><small>下一篇</small>${escapeHtml(next.title)}</a>` : "<span></span>"}
      </nav>`;
    document.title = `${doc.title} · ${catalog.site.title}`;
    enhanceArticle(document.querySelector("#article"));
    document.querySelector('[data-action="copy"]').addEventListener("click", copySource);
    document.querySelector('[data-action="print"]').addEventListener("click", openPrintPreview);
    main.focus();
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
  const link = event.target.closest("a[data-section]");
  if (!link) return;
  event.preventDefault();
  const target = document.getElementById(decodeURIComponent(link.dataset.section));
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
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

try {
  catalog = await loadJson("/generated/catalog.json");
  renderNavigation();
  route();
} catch (error) {
  renderError(`知识库目录加载失败：${error.message}`);
}
