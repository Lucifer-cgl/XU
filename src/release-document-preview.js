import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

const previewError = (stage, message) => {
  stage.replaceChildren();
  const notice = document.createElement("p");
  notice.className = "release-document-message";
  notice.textContent = `${message} 可使用上方“下载原文件”在本地查看。`;
  stage.appendChild(notice);
};

export async function showReleaseText(stage, url, signal) {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`文本读取失败（${response.status}）`);
  const bytes = await response.arrayBuffer();
  if (signal.aborted) return;
  let content;
  try {
    content = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    content = new TextDecoder("gb18030").decode(bytes);
  }
  const pre = document.createElement("pre");
  pre.className = "release-text-content";
  pre.textContent = content;
  stage.replaceChildren(pre);
}

export async function showReleasePdf(stage, url, signal, fileSize = 0) {
  const maxPreviewBytes = 80 * 1024 * 1024;
  if (fileSize > maxPreviewBytes) {
    previewError(stage, "此 PDF 超过 80 MB，暂不适合在浏览器中完整加载。");
    return;
  }
  const pdfjs = await import("pdfjs-dist");
  if (signal.aborted) return;
  pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
  stage.textContent = "正在下载 PDF…";
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`PDF 读取失败（${response.status}）`);
  const contentLength = Number(response.headers.get("content-length") || 0);
  if (contentLength > maxPreviewBytes) {
    await response.body?.cancel();
    previewError(stage, "此 PDF 超过 80 MB，暂不适合在浏览器中完整加载。");
    return;
  }
  const bytes = await response.arrayBuffer();
  if (signal.aborted) return;
  if (bytes.byteLength > maxPreviewBytes) {
    previewError(stage, "此 PDF 超过 80 MB，暂不适合在浏览器中完整加载。");
    return;
  }
  stage.textContent = "正在解析 PDF…";
  const task = pdfjs.getDocument({ data: new Uint8Array(bytes), isEvalSupported: false });
  const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        void drawPage(entry.target);
      }
    }
  }, { rootMargin: "800px 0px" }) : null;
  signal.addEventListener("abort", () => {
    observer?.disconnect();
    void task.destroy();
  }, { once: true });

  let pdf;
  const drawPage = async (holder) => {
    if (signal.aborted || holder.dataset.rendered) return;
    holder.dataset.rendered = "true";
    try {
      const page = await pdf.getPage(Number(holder.dataset.page));
      if (signal.aborted) return;
      const base = page.getViewport({ scale: 1 });
      const width = Math.min(Math.max(stage.clientWidth - 36, 320), 1000);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({ scale: width * pixelRatio / base.width });
      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${width}px`;
      canvas.style.height = "auto";
      holder.replaceChildren(canvas);
      await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
      page.cleanup();
    } catch (error) {
      if (!signal.aborted) holder.textContent = `第 ${holder.dataset.page} 页加载失败：${error.message}`;
    }
  };

  try {
    pdf = await task.promise;
    if (signal.aborted) return;
    const info = document.createElement("p");
    info.className = "release-document-count";
    info.textContent = `共 ${pdf.numPages} 页 · 滚动时按需加载`;
    const pages = document.createElement("div");
    pages.className = "release-pdf-pages";
    for (let number = 1; number <= pdf.numPages; number += 1) {
      const holder = document.createElement("div");
      holder.className = "release-pdf-page";
      holder.dataset.page = String(number);
      holder.textContent = `第 ${number} 页正在准备…`;
      pages.appendChild(holder);
      if (number !== 1) observer?.observe(holder);
    }
    stage.replaceChildren(info, pages);
    void drawPage(pages.firstElementChild);
    if (!observer) pages.querySelectorAll(".release-pdf-page").forEach((holder) => void drawPage(holder));
  } catch (error) {
    if (!signal.aborted) previewError(stage, `PDF 预览失败：${error.message}`);
  }
}
