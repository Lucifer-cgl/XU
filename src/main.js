import DOMPurify from "dompurify";
import { marked } from "marked";
import renderMathInElement from "katex/contrib/auto-render";
import "katex/dist/katex.min.css";
import "./styles.css";

const main = document.querySelector("#main-content");
const nav = document.querySelector("#course-nav");
const tocPanel = document.querySelector("#toc-panel");
const sidebar = document.querySelector("#sidebar");
const navToggle = document.querySelector("#nav-toggle");
const themeToggle = document.querySelector("#theme-toggle");
let catalog;
let searchIndex;
let currentSource = "";
let currentDocument;

marked.setOptions({ gfm: true, breaks: false });
const escapeHtml = (value = "") => value.replace(/[&<>'\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
const routeFor = (id) => `#/read/${encodeURIComponent(id)}`;
const hrefFor = (doc) => doc.type === "html" ? doc.path : routeFor(doc.id);

async function loadJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`读取失败（${response.status}）`);
  return response.json();
}

function renderNavigation(activeId = "") {
  nav.innerHTML = catalog.courses.map((course) => `
    <details class="course-group" open>
      <summary><span class="course-title">${course.id.split("/").map((part, index, parts) => index === parts.length - 1 ? `<strong>${escapeHtml(part)}</strong>` : `<small>${escapeHtml(part)} /</small>`).join("")}</span><span>${course.documents.length}</span></summary>
      <div class="course-links">
        ${course.documents.map((doc) => `<a href="${hrefFor(doc)}" class="${doc.id === activeId ? "active" : ""}"><span class="format-badge">${doc.type === "markdown" ? "MD" : "HTML"}</span>${escapeHtml(doc.title)}</a>`).join("")}
      </div>
    </details>`).join("");
}

function renderHome() {
  currentDocument = null;
  tocPanel.innerHTML = "";
  renderNavigation();
  document.title = catalog.site.title;
  main.innerHTML = `
    <section class="hero">
      <p class="eyebrow">XU · COURSE LIBRARY</p>
      <h1>把知识整理成<br><em>清晰、可靠、可带走</em>的页面。</h1>
      <p class="hero-copy">Markdown 自动完成专业排版；完整 HTML 保留作者原有设计并直接打开。目录层级由文件夹自动生成。</p>
      <label class="search-box"><span>搜索</span><input id="search-input" type="search" placeholder="课程、章节或正文关键词" autocomplete="off" /></label>
      <div id="search-results" class="search-results" aria-live="polite"></div>
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
  renderMathInElement(article, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\[", right: "\\]", display: true },
      { left: "\\(", right: "\\)", display: false }
    ],
    throwOnError: false,
    output: "htmlAndMathml"
  });
  tocPanel.innerHTML = headings.length ? `<div class="toc-title">本文目录</div>${headings.map((heading) => `<a class="toc-level-${heading.tagName.slice(1)}" href="#${encodeURIComponent(heading.id)}">${escapeHtml(heading.textContent)}</a>`).join("")}` : "";
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
      USE_PROFILES: { html: true },
      FORBID_TAGS: ["script", "iframe", "object", "embed", "form"],
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
    await openPdfPreview(currentDocument.title);
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
themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("xu-theme", next);
});
document.documentElement.dataset.theme = localStorage.getItem("xu-theme") || "light";
window.addEventListener("hashchange", route);

try {
  catalog = await loadJson("/generated/catalog.json");
  renderNavigation();
  route();
} catch (error) {
  renderError(`知识库目录加载失败：${error.message}`);
}
