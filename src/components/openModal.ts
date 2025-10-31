export function openModal(
  openBtn: HTMLButtonElement,
  modal: HTMLDivElement,
  input: HTMLInputElement
) {
  openBtn.addEventListener("click", () => {
    modal.removeAttribute("hidden");
    input.focus();
  });
}
