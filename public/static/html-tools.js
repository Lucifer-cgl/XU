document.addEventListener("click", (event) => {
  const printButton = event.target.closest("[data-xu-print]");
  if (printButton) window.print();
});
