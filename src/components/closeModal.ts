export function closeModal(closeBtn: HTMLButtonElement, modal: HTMLDivElement) {
  closeBtn.addEventListener('click', () => modal.setAttribute('hidden', 'hidden'))
  modal.addEventListener('click', (e) =>{ 
    e.target === modal &&
    modal.setAttribute('hidden', 'hidden')})
  }