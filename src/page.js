import "./print.css";

export async function openPdfPreview(title) {
  document.body.classList.add("printing");
  const previousTitle = document.title;
  document.title = title;
  try {
    await import("pagedjs");
    if (document.fonts?.ready) await document.fonts.ready;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    window.print();
  } catch (error) {
    console.warn("Paged.js 加载失败，改用浏览器原生 A4 打印。", error);
    window.print();
  } finally {
    document.title = previousTitle;
    document.body.classList.remove("printing");
  }
}
