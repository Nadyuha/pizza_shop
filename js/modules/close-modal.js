export function closeModal(modal, elClass) {
  modal.addEventListener('click', (e) => {
    let target = e.target;
    if(target === modal ||
    target.closest(elClass)) {
        modal.style.display = 'none';
    };
  });
}