let activeModal = null;

function openModal(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  activeModal = popup;
  }


function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-animated');
  activeModal = null;
}

export function closeOverlayClick(event) {
  if (activeModal && event.target === activeModal) {
    closeModal(activeModal);
  }
}

export function closeEscPopup(event) {
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