const previewTypes = new Map([
  ["pdf", "application/pdf"],
  ["txt", "text/plain; charset=utf-8"]
]);

export async function serveReleasePreview(request, manifest) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  }
  const id = new URL(request.url).searchParams.get("id");
  const item = manifest.files?.find((file) => file.id === id && file.uploaded);
  const contentType = previewTypes.get(item?.type?.toLowerCase());
  if (!item || !contentType || !item.url) return new Response("Preview not found", { status: 404 });

  // The URL is taken from the published manifest, never from the visitor's input.
  const source = new URL(item.url);
  if (source.protocol !== "https:" || source.hostname !== "github.com" ||
      !source.pathname.startsWith("/Lucifer-cgl/XU/releases/download/")) {
    return new Response("Invalid preview source", { status: 502 });
  }
  const headers = new Headers();
  for (const name of ["Range", "If-Range", "If-None-Match"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  let upstream;
  try {
    upstream = await fetch(source, { method: request.method, headers, redirect: "follow" });
  } catch {
    return new Response("Preview source unavailable", { status: 502 });
  }
  if (![200, 206, 304, 416].includes(upstream.status)) {
    return new Response("Preview source unavailable", { status: 502 });
  }
  const responseHeaders = new Headers({
    "Content-Type": contentType,
    "Content-Disposition": "inline",
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "public, max-age=300"
  });
  if (item.type.toLowerCase() === "txt") responseHeaders.set("Content-Security-Policy", "sandbox");
  for (const name of ["Content-Length", "Content-Range", "Accept-Ranges", "ETag", "Last-Modified"]) {
    const value = upstream.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }
  return new Response(request.method === "HEAD" ? null : upstream.body, {
    status: upstream.status,
    headers: responseHeaders
  });
}
