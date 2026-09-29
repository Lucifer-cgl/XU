import { access, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import crypto from "node:crypto";
import path from "node:path";

const root = process.cwd();
const stagingRoot = path.join(root, "release-staging");
const outputRoot = path.join(root, "public", "generated");
const trackedManifest = path.join(root, "release-resources.json");
const slash = (value) => value.split(path.sep).join("/");
const natural = new Intl.Collator("zh-CN", { numeric: true, sensitivity: "base" });
const ignored = new Set([".DS_Store", "Thumbs.db", "desktop.ini"]);
const previewTypes = new Set(["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "png", "jpg", "jpeg", "webp", "gif", "svg"]);

async function exists(file) {
  try { await access(file); return true; } catch { return false; }
}

async function walk(directory) {
  if (!await exists(directory)) return [];
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (ignored.has(entry.name) || entry.name.startsWith(".")) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

async function sha256(file) {
  const hash = crypto.createHash("sha256");
  for await (const chunk of createReadStream(file)) hash.update(chunk);
  return hash.digest("hex");
}

function assetName(relative, digest, previous) {
  if (previous?.uploaded === true && previous.sha256 === digest && /^[A-Za-z0-9._-]+$/.test(previous.assetName || "")) {
    return previous.assetName;
  }
  const extension = path.extname(relative).slice(1).toLowerCase();
  if (!/^[a-z0-9]{1,10}$/.test(extension)) throw new Error(`附件扩展名不符合发布规则：${relative}`);
  const pathHash = crypto.createHash("sha256").update(relative).digest("hex").slice(0, 16);
  return `xu-${pathHash}-${digest.slice(0, 16)}.${extension}`;
}

function urlFor(base, name) {
  if (!base) return null;
  return `${base.replace(/\/$/, "")}/${name.split("/").map(encodeURIComponent).join("/")}`;
}

function insertTree(rootNode, item) {
  let node = rootNode;
  const segments = item.path.split("/");
  segments.forEach((segment, index) => {
    const isFile = index === segments.length - 1;
    node.children ||= [];
    let child = node.children.find((entry) => entry.name === segment);
    if (!child) {
      child = { name: segment, type: isFile ? "file" : "folder", ...(isFile ? { resourceId: item.id } : {}) };
      node.children.push(child);
    }
    node = child;
  });
}

const stagingExists = await exists(stagingRoot);
let previousManifest = null;
if (await exists(trackedManifest)) {
  try { previousManifest = JSON.parse(await readFile(trackedManifest, "utf8")); } catch { previousManifest = null; }
}

await mkdir(outputRoot, { recursive: true });

if (!stagingExists && previousManifest) {
  await writeFile(path.join(outputRoot, "release-resources.json"), JSON.stringify(previousManifest, null, 2));
  console.log("部署环境没有 release-staging，已使用仓库中提交的 release-resources.json。");
  process.exit(0);
}

await mkdir(stagingRoot, { recursive: true });
const base = process.env.XU_RELEASE_BASE_URL || previousManifest?.releaseBaseUrl || "";
const mirrorBase = process.env.XU_RELEASE_MIRROR_BASE_URL || previousManifest?.mirrorBaseUrl || "";
const previousFiles = new Map((previousManifest?.files || []).map((file) => [file.path, file]));
const files = [];
const assetDigests = new Map();
for (const file of await walk(stagingRoot)) {
  const relative = slash(path.relative(stagingRoot, file));
  const extension = path.extname(relative).slice(1).toLowerCase();
  const fileStat = await stat(file);
  if (fileStat.size === 0) throw new Error(`不能发布 0 字节附件：${relative}`);
  const digest = await sha256(file);
  const previous = previousFiles.get(relative);
  const uploaded = previous?.uploaded === true && previous.sha256 === digest && previousManifest?.releaseBaseUrl === base;
  const asset = assetName(relative, digest, uploaded ? previous : null);
  if (assetDigests.has(asset) && assetDigests.get(asset).digest !== digest) {
    throw new Error(`附件名冲突：${relative} 与 ${assetDigests.get(asset).path}`);
  }
  assetDigests.set(asset, { digest, path: relative });
  const id = `release:${relative}`;
  files.push({
    id,
    path: relative,
    name: path.basename(relative),
    type: extension || "file",
    size: fileStat.size,
    sha256: digest,
    assetName: asset,
    uploaded,
    preview: previewTypes.has(extension),
    url: uploaded ? urlFor(base, asset) : null,
    mirrorUrl: uploaded ? urlFor(mirrorBase, asset) : null
  });
}
files.sort((a, b) => natural.compare(a.path, b.path));
const tree = { name: "发布附件", type: "folder", children: [] };
files.forEach((file) => insertTree(tree, file));
const manifest = {
  schema: 1,
  generatedAt: new Date().toISOString(),
  source: "release-staging",
  releaseBaseUrl: base || null,
  mirrorBaseUrl: mirrorBase || null,
  note: "大文件由发布脚本上传到 GitHub/Gitee Release；本清单保存目录、哈希、发布标记和下载地址。",
  files,
  tree
};
await writeFile(path.join(outputRoot, "release-resources.json"), JSON.stringify(manifest, null, 2));
await writeFile(trackedManifest, JSON.stringify(manifest, null, 2));
console.log(`Release 清单完成：${files.length} 个附件，已标记发布 ${files.filter((file) => file.uploaded).length} 个。`);
