import manifest from "../release-resources.json";
import { serveReleasePreview } from "../src/release-preview.js";

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname === "/api/release-preview") {
      return serveReleasePreview(request, manifest);
    }
    return env.ASSETS.fetch(request);
  }
};
