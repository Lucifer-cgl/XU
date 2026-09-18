import "./print.css";

function escapeCssString(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/[\r\n]+/g, " ");
}

function createPrintHeaderStyle({ title, coursePath }) {
  const path = ["首页", ...(coursePath || "").split("/").filter(Boolean), title].filter(Boolean);
  const label = `墟 · XU 开源知识库 / ${path.join(" / ")}`;
  const style = document.createElement("style");
  style.textContent = `@page { @top-center { content: "${escapeCssString(label)}"; } }`;
  return style;
}

export async function openPdfPreview(documentInfo) {
  const info = typeof documentInfo === "string" ? { title: documentInfo } : documentInfo;
  const printHeaderStyle = createPrintHeaderStyle(info);
  document.head.append(printHeaderStyle);
  document.body.classList.add("printing");
  const previousTitle = document.title;
  document.title = info.title;
  try {
    if (document.fonts?.ready) await document.fonts.ready;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    window.print();
  } finally {
    document.title = previousTitle;
    document.body.classList.remove("printing");
    printHeaderStyle.remove();
  }
}
