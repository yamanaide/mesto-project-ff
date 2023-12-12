import '/src/pages/index.css';

import { createCard, deleteCard, setCardTemplate, setLikeCallback, likeCallback } from './card.js';
import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
const placesList = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const imagePopupImage = imagePopup.querySelector('.popup__image');

setCardTemplate(cardTemplate);

function openEditPopup() {
  openModal(editPopup);

  const openEditFormElement = editPopup.querySelector('.popup__form');
  const nameInput = openEditFormElement.querySelector('.popup__input_type_name');
  const jobInput = openEditFormElement.querySelector('.popup__input_type_description');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

document.querySelector('.profile__edit-button').addEventListener('click', openEditPopup);

function openAddPopup() {
  openModal(addPopup);

  const openAddFormElement = addPopup.querySelector('.popup__form');
  const nameInput = openAddFormElement.querySelector('.popup__input_type_card-name');
  const linkInput = openAddFormElement.querySelector('.popup__input_type_url');
}

document.querySelector('.profile__add-button').addEventListener('click', openAddPopup);

function openImagePopup(imageUrl, imageAlt, imageCaption) {
  imagePopupImage.src = imageUrl;
  imagePopupImage.alt = imageAlt;
  imagePopup.querySelector('.popup__caption').textContent = imageCaption;

  openModal(imagePopup);
}

function renderCards(cardsArray) {
  cardsArray.forEach(function (card) {
    const newCard = createCard(card, deleteCard, function (imageUrl) {
      openImagePopup(imageUrl, card.name, card.caption);
    });
    if (newCard) {
      placesList.appendChild(newCard);
    }
  });
}

renderCards(initialCards);

const editFormElement = editPopup.querySelector('.popup__form');
editFormElement.addEventListener('submit', handleFormSubmit);

const addFormElement = addPopup.querySelector('.popup__form');
addFormElement.addEventListener('submit', handleAddFormSubmit);

setLikeCallback(likeCallback);

function closeEditPopup() {
  closeModal(editPopup);
}

function closeAddPopup() {
  const closeAddFormElement = addPopup.querySelector('.popup__form');
  closeAddFormElement.reset();
  closeModal(addPopup);
}

function closeImagePopup() {
  closeModal(imagePopup);
}

// Use event delegation for close buttons
document.addEventListener('click', function (event) {
  const closeButtons = document.querySelectorAll('.popup__close');
  if (event.target.classList.contains('popup__close')) {
    const popupType = event.target.closest('.popup').classList[1];
    switch (popupType) {
      case 'popup_type_edit':
        closeEditPopup();
        break;
      case 'popup_type_new-card':
        closeAddPopup();
        break;
      case 'popup_type_image':
        closeImagePopup();
        break;
      default:
        break;
    }
  }
});

function handleFormSubmit(evt) {
  evt.preventDefault();

  const newName = editFormElement.querySelector('.popup__input_type_name').value;
  const newJob = editFormElement.querySelector('.popup__input_type_description').value;

  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;

  closeEditPopup();
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = addFormElement.querySelector('.popup__input_type_card-name');
  const linkInput = addFormElement.querySelector('.popup__input_type_url');

  const cardName = nameInput.value;
  const cardLink = linkInput.value;

  const newCardData = {
    name: cardName,
    link: cardLink
  };

  const newCard = createCard(newCardData, deleteCard, function (imageUrl) {
    openImagePopup(imageUrl, newCardData.name, newCardData.caption);
  });
  placesList.prepend(newCard);

  closeAddPopup();
}
