const configUrl = "/release-mirrors.json";
const cacheKey = "xu-release-mirrors-v1";
const cacheFreshMs = 30 * 60 * 1000;
const cacheUsableMs = 7 * 24 * 60 * 60 * 1000;
const maxCandidates = 30;
const maxHealthy = 4;
const batchSize = 3;

let config;
let ranked = [];
let refreshPromise;

function dispatchStatus(state, message) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("xu:mirror-status", { detail: { state, message, mirrors: ranked.slice() } }));
}

function isPrivateHostname(hostname) {
  const host = hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".local") || host === "0.0.0.0" || host === "::1") return true;
  const match = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!match) return false;
  const octets = match.slice(1).map(Number);
  return octets.some((value) => value > 255)
    || octets[0] === 10
    || octets[0] === 127
    || (octets[0] === 169 && octets[1] === 254)
    || (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31)
    || (octets[0] === 192 && octets[1] === 168);
}

export function normalizeMirrorPrefix(value) {
  try {
    const url = new URL(String(value || "").trim());
    if (url.protocol !== "https:" || url.username || url.password || url.port || url.search || url.hash || isPrivateHostname(url.hostname)) return "";
    return `${url.origin}${url.pathname.replace(/\/+$/, "")}`;
  } catch {
    return "";
  }
}

export function mirrorUrl(prefix, githubUrl) {
  const cleanPrefix = normalizeMirrorPrefix(prefix);
  if (!cleanPrefix || !String(githubUrl).startsWith("https://github.com/")) return githubUrl;
  return `${cleanPrefix}/${githubUrl}`;
}

function loadCache() {
  try {
    const saved = JSON.parse(localStorage.getItem(cacheKey) || "null");
    if (!saved || Date.now() - Number(saved.checkedAt) > cacheUsableMs || !Array.isArray(saved.mirrors)) return null;
    const mirrors = saved.mirrors.filter((item) => normalizeMirrorPrefix(item.prefix));
    return { checkedAt: Number(saved.checkedAt), mirrors };
  } catch {
    return null;
  }
}

function saveCache() {
  try {
    localStorage.setItem(cacheKey, JSON.stringify({ checkedAt: Date.now(), mirrors: ranked }));
  } catch {
    // Private browsing can disable storage; the in-memory ranking still works.
  }
}

async function fetchBodyWithTimeout(url, timeoutMs, bodyType, options = {}) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal, credentials: "omit", referrerPolicy: "no-referrer" });
    const body = bodyType === "arrayBuffer" ? await response.arrayBuffer() : await response.text();
    return { response, body };
  } finally {
    window.clearTimeout(timer);
  }
}

async function sha256Hex(buffer) {
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function loadDynamicCandidates(sources) {
  const found = [];
  await Promise.allSettled((sources || []).slice(0, 4).map(async (source) => {
    const { response, body } = await fetchBodyWithTimeout(source, 5000, "text");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const length = Number(response.headers.get("content-length") || 0);
    if (length > 128 * 1024) throw new Error("镜像名单过大");
    const text = body.slice(0, 128 * 1024);
    for (const match of text.matchAll(/https:\/\/[^\s<>"'`]+/g)) {
      const prefix = normalizeMirrorPrefix(match[0].replace(/[),.;\]]+$/, ""));
      if (prefix) found.push(prefix);
    }
  }));
  return found;
}

async function probeMirror(prefix, probe) {
  const started = performance.now();
  const { response, body: buffer } = await fetchBodyWithTimeout(
    mirrorUrl(prefix, probe.url),
    9000,
    "arrayBuffer",
    { cache: "no-store" }
  );
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const declaredLength = Number(response.headers.get("content-length") || 0);
  if (declaredLength && declaredLength !== probe.size) throw new Error("文件大小不符");
  if (buffer.byteLength !== probe.size) throw new Error("文件大小不符");
  if (await sha256Hex(buffer) !== probe.sha256) throw new Error("文件校验失败");
  const elapsedMs = Math.max(1, Math.round(performance.now() - started));
  return {
    prefix,
    elapsedMs,
    speedKbps: Math.round(probe.size * 1000 / 1024 / elapsedMs),
    checkedAt: Date.now()
  };
}

function uniqueCandidates(values) {
  return [...new Set(values.map(normalizeMirrorPrefix).filter(Boolean))].slice(0, maxCandidates);
}

async function refreshMirrors() {
  dispatchStatus("checking", ranked.length ? "正在后台更新国内线路…" : "正在检测国内线路…");
  try {
    config = await fetch(configUrl, { cache: "no-cache" }).then((response) => {
      if (!response.ok) throw new Error(`镜像配置读取失败（${response.status}）`);
      return response.json();
    });
    const cachedPrefixes = ranked.map((item) => item.prefix);
    const bootstrap = (config.bootstrap || []).map((item) => item.prefix);
    const dynamic = await loadDynamicCandidates(config.sources);
    const candidates = uniqueCandidates([...cachedPrefixes, ...bootstrap, ...dynamic]);
    const healthy = [];
    for (let index = 0; index < candidates.length && healthy.length < maxHealthy; index += batchSize) {
      const results = await Promise.allSettled(candidates.slice(index, index + batchSize).map((prefix) => probeMirror(prefix, config.probe)));
      for (const result of results) {
        if (result.status === "fulfilled") healthy.push(result.value);
      }
    }
    if (healthy.length) {
      ranked = healthy.sort((a, b) => a.elapsedMs - b.elapsedMs).slice(0, maxHealthy);
      saveCache();
      dispatchStatus("ready", `国内线路 ${ranked.length} 条可用 · 已选择最快线路`);
    } else if (ranked.length) {
      dispatchStatus("stale", "实时检测失败 · 暂用上次可用线路");
    } else {
      dispatchStatus("unavailable", "暂未找到可用国内线路 · 使用 GitHub 原地址");
    }
  } catch {
    dispatchStatus(ranked.length ? "stale" : "unavailable", ranked.length ? "线路更新失败 · 暂用上次结果" : "线路检测失败 · 使用 GitHub 原地址");
  }
  return ranked;
}

export function initializeReleaseMirrors() {
  if (refreshPromise) return refreshPromise;
  const cached = loadCache();
  if (cached?.mirrors.length) {
    ranked = cached.mirrors;
    dispatchStatus("cached", "已载入上次可用的国内线路");
  }
  refreshPromise = refreshMirrors();
  if (cached && Date.now() - cached.checkedAt < cacheFreshMs) {
    return Promise.resolve(ranked);
  }
  return refreshPromise;
}

export function releaseDownloadUrl(githubUrl) {
  return ranked.length ? mirrorUrl(ranked[0].prefix, githubUrl) : githubUrl;
}

export async function releasePreviewUrls(githubUrl, fallbackUrl = "") {
  if (!ranked.length) {
    await Promise.race([
      initializeReleaseMirrors(),
      new Promise((resolve) => window.setTimeout(resolve, 5000))
    ]);
  }
  const urls = ranked.map((item) => mirrorUrl(item.prefix, githubUrl));
  if (githubUrl) urls.push(githubUrl);
  if (fallbackUrl) urls.push(fallbackUrl);
  return [...new Set(urls)];
}

export function mirrorStatusText() {
  return ranked.length ? `国内线路 ${ranked.length} 条可用` : "国内线路检测中";
}
