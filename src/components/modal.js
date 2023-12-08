import { createCard, deleteCard } from './card.js';
import { placesList } from '/src/index.js'

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

let nameInput;
let jobInput;
let linkInput;

export function openModal(modalElement) {
  modalElement.style.opacity = '0';
  modalElement.style.visibility = 'visible';

  const fadeIn = () => {
    modalElement.style.opacity = (parseFloat(modalElement.style.opacity) + 0.6).toString();
    if (parseFloat(modalElement.style.opacity) < 1) {
      requestAnimationFrame(fadeIn);
    }
  };

  fadeIn();

  modalElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKey);
  modalElement.addEventListener('click', handleOverlayClick);
}

export function closeModal(modalElement) {
  const fadeOut = () => {
    modalElement.style.opacity = (parseFloat(modalElement.style.opacity) - 0.04).toString();
    if (parseFloat(modalElement.style.opacity) > 0) {
      requestAnimationFrame(fadeOut);
    } else {
      modalElement.style.visibility = 'hidden';
      modalElement.classList.remove('popup_is-opened');
    }
  };

  fadeOut();

  document.removeEventListener('keydown', handleEscKey);
  modalElement.removeEventListener('click', handleOverlayClick);
}

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget);
  }
}

export function openEditPopup() {
  openModal(editPopup);

  const formElement = editPopup.querySelector('.popup__form');

  nameInput = formElement.querySelector('.popup__input_type_name');
  jobInput = formElement.querySelector('.popup__input_type_description');

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

export function closeEditPopup() {
  closeModal(editPopup);
}

export function handleFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;

  closeEditPopup();
}

export function openAddPopup() {
  openModal(addPopup);

    const formElement = addPopup.querySelector('.popup__form');

    nameInput = formElement.querySelector('.popup__input_type_card-name');
    linkInput = formElement.querySelector('.popup__input_type_url');
}

export function closeAddPopup() {
  const formElement = addPopup.querySelector('.popup__form');
  formElement.reset();
  closeModal(addPopup);
}

export function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const cardName = nameInput.value;
  const cardLink = linkInput.value;

  const newCardData = {
    name: cardName,
    link: cardLink,
  };

  const newCard = createCard(newCardData, deleteCard, openImagePopup);
  placesList.prepend(newCard);

  closeAddPopup();
}

const addFormElement = addPopup.querySelector('.popup__form');
addFormElement.addEventListener('submit', handleAddFormSubmit);

export function openImagePopup(imageUrl) {
  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  imageElement.classList.add('popup__image');

  imagePopup.innerHTML = ''; 
  imagePopup.appendChild(imageElement);
  openModal(imagePopup);
}

export function closeImagePopup() {
  closeModal(imagePopup);
}

function handleEscKey(event) {
  if (event.key === 'Escape') {
    closeModal(editPopup);
    closeModal(addPopup);
    closeModal(imagePopup);
  }
}