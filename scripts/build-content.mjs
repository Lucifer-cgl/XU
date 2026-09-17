import { access, cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contentRoot = path.join(root, "content");
const publicRoot = path.join(root, "public");
const publishedContent = path.join(publicRoot, "content");
const generatedRoot = path.join(publicRoot, "generated");
const supported = new Set([".md", ".html", ".htm"]);
const downloadLimits = { maxBatchFiles: 50, maxBatchBytes: 100 * 1024 * 1024 };
const slash = (value) => value.split(path.sep).join("/");
const natural = new Intl.Collator("zh-CN", { numeric: true, sensitivity: "base" });

async function exists(file) {
  try { await access(file); return true; } catch { return false; }
}

async function walk(directory) {
  if (!await exists(directory)) return [];
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

function parseFrontMatter(source) {
  if (!source.startsWith("---\n")) return { attributes: {}, body: source };
  const end = source.indexOf("\n---\n", 4);
  if (end < 0) return { attributes: {}, body: source };
  const attributes = {};
  for (const line of source.slice(4, end).split("\n")) {
    const separator = line.indexOf(":");
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^['\"]|['\"]$/g, "");
    attributes[key] = value;
  }
  return { attributes, body: source.slice(end + 5) };
}

function stripMarkup(source, type) {
  const safeText = source.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ");
  if (type === "html") return safeText.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return safeText
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~|$-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleFrom(source, type, fallback) {
  if (type === "markdown") {
    const match = source.match(/^#\s+(.+)$/m);
    if (match) return match[1].trim();
  } else {
    const title = source.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || source.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
    if (title) return title.replace(/<[^>]+>/g, "").trim();
  }
  return fallback.replace(/^\d{2,3}[-_.、\s]*/, "");
}

function validateHtml(file, source) {
  const errors = [];
  const scripts = [...source.matchAll(/<script\b([^>]*)>/gi)];
  for (const script of scripts) {
    if (!/src\s*=\s*["']\/static\/html-tools\.js["']/i.test(script[1])) errors.push("HTML 不允许执行自定义脚本");
  }
  if (/\son[a-z]+\s*=/i.test(source)) errors.push("HTML 不允许使用内联事件属性");
  if (/javascript\s*:/i.test(source)) errors.push("HTML 不允许使用 javascript: 链接");
  if (/<(?:iframe|object|embed|form)\b/i.test(source)) errors.push("HTML 包含禁止的嵌入或表单标签");
  return errors.map((message) => `${slash(path.relative(root, file))}: ${message}`);
}
function validateMarkdown(file, body) {
  const errors = [];
  const headings = [...body.matchAll(/^(#{1,6})\s+(.+)$/gm)];
  const h1Count = headings.filter(([, hashes]) => hashes.length === 1).length;
  if (h1Count !== 1) errors.push(`必须且只能有一个一级标题，当前为 ${h1Count} 个`);
  let previous = 0;
  for (const [, hashes, heading] of headings) {
    const level = hashes.length;
    if (previous && level > previous + 1) errors.push(`标题层级跳跃：${heading.trim()}`);
    previous = level;
  }
  for (const image of body.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
    if (!image[1].trim()) errors.push(`图片缺少替代文本：${image[2]}`);
  }
  for (const link of body.matchAll(/\[[^\]]+\]\((http:\/\/[^)]+)\)/g)) errors.push(`外部链接必须使用 HTTPS：${link[1]}`);
  return errors.map((message) => `${slash(path.relative(root, file))}: ${message}`);
}

await mkdir(contentRoot, { recursive: true });
await mkdir(publicRoot, { recursive: true });
await rm(publishedContent, { recursive: true, force: true });
await rm(generatedRoot, { recursive: true, force: true });
await mkdir(generatedRoot, { recursive: true });
await cp(contentRoot, publishedContent, { recursive: true });

const allFiles = await walk(contentRoot);
const contentFiles = allFiles.filter((file) => supported.has(path.extname(file).toLowerCase()));
const courseConfigs = new Map();
for (const file of allFiles.filter((file) => path.basename(file).toLowerCase() === "course.json")) {
  try {
    courseConfigs.set(slash(path.relative(contentRoot, path.dirname(file))), JSON.parse(await readFile(file, "utf8")));
  } catch (error) {
    throw new Error(`${slash(path.relative(root, file))} 不是有效 JSON：${error.message}`);
  }
}

const documents = [];
const validationErrors = [];
for (const file of contentFiles) {
  const relative = slash(path.relative(contentRoot, file));
  const extension = path.extname(file).toLowerCase();
  const type = extension === ".md" ? "markdown" : "html";
  const raw = await readFile(file, "utf8");
  const { attributes, body } = type === "markdown" ? parseFrontMatter(raw) : { attributes: {}, body: raw };
  if (type === "markdown") validationErrors.push(...validateMarkdown(file, body));
  else validationErrors.push(...validateHtml(file, body));
  const segments = relative.split("/");
  const fileName = segments.pop();
  const coursePath = segments.join("/") || "未分类";
  const fallback = path.basename(fileName, extension);
  const text = stripMarkup(body, type);
  documents.push({
    id: relative,
    path: `/content/${relative.split("/").map(encodeURIComponent).join("/")}`,
    type,
    title: attributes.title || titleFrom(body, type, fallback),
    description: attributes.description || text.slice(0, 150),
    coursePath,
    order: Number(attributes.order || fallback.match(/^\d{2,3}/)?.[0] || 999),
    fileName,
    searchText: text.slice(0, 30000)
  });
}

if (validationErrors.length) {
  console.error("\n内容校验失败：\n- " + validationErrors.join("\n- "));
  process.exit(1);
}

documents.sort((a, b) => natural.compare(a.coursePath, b.coursePath) || a.order - b.order || natural.compare(a.title, b.title));
const courseMap = new Map();
for (const document of documents) {
  if (!courseMap.has(document.coursePath)) {
    const config = courseConfigs.get(document.coursePath) || {};
    courseMap.set(document.coursePath, {
      id: document.coursePath,
      name: config.name || document.coursePath.split("/").at(-1),
      description: config.description || "",
      order: Number(config.order || 999),
      documents: []
    });
  }
  const { searchText, ...catalogDocument } = document;
  courseMap.get(document.coursePath).documents.push(catalogDocument);
}
const courses = [...courseMap.values()].sort((a, b) => a.order - b.order || natural.compare(a.name, b.name));
const catalogDocuments = documents.map(({ searchText, ...document }) => document);
const catalog = { site: { title: "墟 · XU 开源知识库", generatedAt: new Date().toISOString() }, courses, documents: catalogDocuments };
const searchIndex = documents.map(({ id, title, description, coursePath, type, searchText }) => ({ id, title, description, coursePath, type, text: searchText }));

const downloadCourses = new Map(courses.map((course) => [course.id, {
  id: course.id,
  name: course.name,
  groupId: course.id.split("/")[0],
  fileCount: 0,
  totalBytes: 0,
  files: []
}]));
const courseRoots = [...downloadCourses.keys()].sort((a, b) => b.length - a.length || natural.compare(a, b));
for (const file of [...allFiles].sort((a, b) => natural.compare(slash(path.relative(contentRoot, a)), slash(path.relative(contentRoot, b))))) {
  const relative = slash(path.relative(contentRoot, file));
  const owner = courseRoots.find((courseId) => relative.startsWith(`${courseId}/`));
  if (!owner) continue;
  const size = (await stat(file)).size;
  const course = downloadCourses.get(owner);
  course.files.push({
    path: relative,
    relativePath: slash(path.relative(path.join(contentRoot, owner), file)),
    url: `/content/${relative.split("/").map(encodeURIComponent).join("/")}`,
    size
  });
  course.fileCount += 1;
  course.totalBytes += size;
}
const downloadGroups = new Map();
for (const course of downloadCourses.values()) {
  if (!downloadGroups.has(course.groupId)) downloadGroups.set(course.groupId, { id: course.groupId, name: course.groupId, courses: [] });
  downloadGroups.get(course.groupId).courses.push(course);
}
const downloads = {
  generatedAt: catalog.site.generatedAt,
  limits: downloadLimits,
  groups: [...downloadGroups.values()].sort((a, b) => natural.compare(a.name, b.name))
};

await writeFile(path.join(generatedRoot, "catalog.json"), JSON.stringify(catalog, null, 2));
await writeFile(path.join(generatedRoot, "search-index.json"), JSON.stringify(searchIndex));
await writeFile(path.join(generatedRoot, "downloads.json"), JSON.stringify(downloads));
console.log(`内容构建完成：${courses.length} 个课程目录，${documents.length} 篇文档（Markdown ${documents.filter(d => d.type === "markdown").length}，HTML ${documents.filter(d => d.type === "html").length}）。`);
