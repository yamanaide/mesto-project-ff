let activeModal = null;

function openModal(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEscPopup);
  document.addEventListener('click', closeOverlayClick);
  activeModal = popup;

  const closeButton = popup.querySelector('.popup__close');
  if (closeButton) {
    closeButton.addEventListener('click', handleCloseButtonClick);
  }
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-animated');
  document.removeEventListener('click', closeOverlayClick);
  document.removeEventListener('keydown', closeEscPopup);

  const closeButton = popup.querySelector('.popup__close');
  if (closeButton) {
    closeButton.removeEventListener('click', handleCloseButtonClick);
  }

  activeModal = null;
}

function closeOverlayClick(event) {
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

function handleCloseButtonClick() {
  closeModal(activeModal);
}

export { openModal, closeModal };