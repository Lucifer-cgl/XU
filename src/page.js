import "./print.css";

function createPrintHeader({ title, coursePath }) {
  const header = document.createElement("div");
  header.className = "print-page-header";
  header.setAttribute("aria-hidden", "true");

  const brand = document.createElement("span");
  brand.className = "print-brand";
  brand.textContent = "墟 · XU 开源知识库";

  const location = document.createElement("span");
  location.className = "print-location";
  const path = ["首页", ...(coursePath || "").split("/").filter(Boolean), title].filter(Boolean);
  location.textContent = ` / ${path.join(" / ")}`;

  header.append(brand, location);
  return header;
}

export async function openPdfPreview(documentInfo) {
  const info = typeof documentInfo === "string" ? { title: documentInfo } : documentInfo;
  const printHeader = createPrintHeader(info);
  document.body.append(printHeader);
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
    printHeader.remove();
  }
}
