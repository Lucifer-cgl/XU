const RUNTIME_PREFIX = "/__xu_office__/";
const DB_NAME = "xu-office-runtime";
const STORE_NAME = "handles";
const HANDLE_KEY = "runtime";
const ALLOWED_FILES = new Set([
  "index.html",
  "src/main.js",
  "src/style.css",
  "office_thread.js",
  "assets/vendor/zetajs/zeta.js",
  "assets/fonts/NotoSansSC.ttf",
  "assets/zetaoffice/soffice.js",
  "assets/zetaoffice/soffice.data.js.metadata",
  "assets/zetaoffice/runtime-manifest.json"
]);

const CONTENT_TYPES = {
  html: "text/html; charset=utf-8",
  js: "text/javascript; charset=utf-8",
  css: "text/css; charset=utf-8",
  json: "application/json; charset=utf-8",
  wasm: "application/wasm",
  data: "application/octet-stream",
  ttf: "font/ttf",
  woff: "font/woff",
  woff2: "font/woff2",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  svg: "image/svg+xml"
};

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getRuntimeHandle() {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME).get(HANDLE_KEY);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

function safeSegments(pathname) {
  const relative = decodeURIComponent(pathname.slice(RUNTIME_PREFIX.length));
  const segments = relative.split("/").filter(Boolean);
  if (!segments.length || segments.some((segment) => segment === "." || segment === ".." || segment.includes("\\"))) return null;
  return segments;
}

async function fileFromPath(root, segments) {
  let directory = root;
  for (const segment of segments.slice(0, -1)) directory = await directory.getDirectoryHandle(segment);
  return (await directory.getFileHandle(segments.at(-1))).getFile();
}

async function runtimeManifest(root) {
  return JSON.parse(await (await fileFromPath(root, ["assets", "zetaoffice", "runtime-manifest.json"])).text());
}

function streamParts(root, parts) {
  return new ReadableStream({
    async start(controller) {
      try {
        for (const part of parts) {
          const file = await fileFromPath(root, ["assets", "zetaoffice", part]);
          const reader = file.stream().getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    }
  });
}

function responseHeaders(pathname, contentType, length) {
  const headers = new Headers({
    "Content-Type": contentType,
    "Cache-Control": "no-store",
    "Cross-Origin-Resource-Policy": "same-origin",
    "X-Content-Type-Options": "nosniff"
  });
  if (Number.isFinite(length)) headers.set("Content-Length", String(length));
  if (pathname.endsWith("/index.html")) {
    headers.set("Cross-Origin-Embedder-Policy", "require-corp");
    headers.set("Content-Security-Policy", "default-src 'self' blob: data:; script-src 'self' 'unsafe-eval' blob:; worker-src 'self' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'");
  }
  return headers;
}

async function localRuntimeResponse(requestUrl) {
  const root = await getRuntimeHandle();
  if (!root) return new Response("Office runtime folder is not connected", { status: 503 });
  const permission = await root.queryPermission?.({ mode: "read" });
  if (permission && permission !== "granted") return new Response("Office runtime folder permission is required", { status: 403 });

  const pathname = requestUrl.pathname;
  const segments = safeSegments(pathname);
  if (!segments) return new Response("Invalid runtime path", { status: 400 });

  const combinedName = segments.slice(-3).join("/");
  if (combinedName === "assets/zetaoffice/soffice.wasm" || combinedName === "assets/zetaoffice/soffice.data") {
    const name = combinedName.endsWith(".wasm") ? "soffice.wasm" : "soffice.data";
    const entry = (await runtimeManifest(root))[name];
    if (!entry) return new Response("Runtime manifest entry missing", { status: 404 });
    return new Response(streamParts(root, entry.parts), {
      headers: responseHeaders(pathname, entry.contentType, entry.length)
    });
  }

  const relativePath = segments.join("/");
  if (!ALLOWED_FILES.has(relativePath)) return new Response("Runtime path is not allowed", { status: 403 });

  try {
    const file = await fileFromPath(root, segments);
    const extension = file.name.includes(".") ? file.name.split(".").pop().toLowerCase() : "";
    return new Response(file.stream(), {
      headers: responseHeaders(pathname, CONTENT_TYPES[extension] || file.type || "application/octet-stream", file.size)
    });
  } catch {
    return new Response("Runtime file not found", { status: 404 });
  }
}

self.addEventListener("install", (event) => event.waitUntil(self.skipWaiting()));
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin === self.location.origin && url.pathname.startsWith(RUNTIME_PREFIX)) {
    event.respondWith(localRuntimeResponse(url));
  }
});
