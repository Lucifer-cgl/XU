import { defineConfig } from "vite";
import { readFile } from "node:fs/promises";
import { Readable } from "node:stream";
import { serveReleasePreview } from "./src/release-preview.js";

function localReleasePreview() {
  const middleware = (server) => {
    server.middlewares.use(async (incoming, outgoing, next) => {
      if (!incoming.url?.startsWith("/api/release-preview")) return next();
      try {
        const manifest = JSON.parse(await readFile(new URL("./release-resources.json", import.meta.url), "utf8"));
        const request = new Request(`http://127.0.0.1${incoming.url}`, {
          method: incoming.method,
          headers: incoming.headers
        });
        const response = await serveReleasePreview(request, manifest);
        outgoing.statusCode = response.status;
        response.headers.forEach((value, name) => outgoing.setHeader(name, value));
        if (response.body) Readable.fromWeb(response.body).pipe(outgoing);
        else outgoing.end();
      } catch (error) {
        server.config.logger.error(`Release preview failed: ${error.message}`);
        if (!outgoing.headersSent) { outgoing.statusCode = 502; outgoing.end("Preview unavailable"); }
      }
    });
  };
  return { name: "xu-local-release-preview", configureServer: middleware, configurePreviewServer: middleware };
}

export default defineConfig({
  plugins: [localReleasePreview()],
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp"
    }
  },
  preview: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp"
    }
  },
  build: {
    target: "esnext",
    sourcemap: false,
    assetsDir: "assets"
  }
});
