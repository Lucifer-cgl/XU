import "./print.css";

export async function openPdfPreview(title) {
  document.body.classList.add("printing");
  const previousTitle = document.title;
  document.title = title;
  try {
    if (document.fonts?.ready) await document.fonts.ready;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    window.print();
  } finally {
    document.title = previousTitle;
    document.body.classList.remove("printing");
  }
}
