export function AddModalAnimation(popup) {
  popup.classList.add('popup_is-animated');
}

function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEscPopup);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEscPopup); 
}

export function closeOverlayClick(evt) {
  const modal = evt.target;
  closeModal(modal);
}

function closeEscPopup(evt) {
  if (evt.key === 'Escape') {
    const modal = document.querySelector('.popup_is-opened');
      closeModal(modal);
  }
}

export function handleCloseButtonClick(evt) {
  const modal = evt.target.parentNode.parentNode;
  closeModal(modal);
}

export { openModal, closeModal };
