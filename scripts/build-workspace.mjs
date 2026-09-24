import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const distDirectory = resolve("dist");
const workspaceDirectory = resolve(distDirectory, "workspace");
await mkdir(workspaceDirectory, { recursive: true });
await copyFile(resolve(distDirectory, "index.html"), resolve(workspaceDirectory, "index.html"));
