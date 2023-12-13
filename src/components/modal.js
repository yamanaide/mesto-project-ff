let activeModal = null;

function openModal(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEscPopup);
  activeModal = popup;
  }


function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-animated');
  document.removeEventListener('keydown', closeEscPopup); 
  activeModal = null;
}

export function closeOverlayClick(event) {
  if (activeModal && event.target === activeModal) {
    closeModal(activeModal);
  }
}

function closeEscPopup(event) {
  if (event.key === 'Escape') {
    if (activeModal) {
      closeModal(activeModal);
    }
  }
}

export function handleCloseButtonClick() {
  closeModal(activeModal);
}

export { openModal, closeModal };