import '/src/pages/index.css';

import { createCard, deleteCard, likeCallback, setCardTemplate, handleLikeCard } from './card.js';
import { initialCards } from './cards.js';
import { openModal, closeModal, closeOverlayClick, handleCloseButtonClick } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
const placesList = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const formPopupProfile = editPopup.querySelector('.popup__form');
const nameEditInput = formPopupProfile.querySelector('.popup__input_type_name');
const jobInput = formPopupProfile.querySelector('.popup__input_type_description');
const formPopupAddOpen = addPopup.querySelector('.popup__form');
const linkInput = formPopupAddOpen.querySelector('.popup__input_type_url');
const formPopupEdit = editPopup.querySelector('.popup__form');
const formPopupAdd = addPopup.querySelector('.popup__form');
const nameInput = formPopupAdd.querySelector('.popup__input_type_card-name');
const linkAddInput = formPopupAdd.querySelector('.popup__input_type_url');
const buttonsClose = document.querySelectorAll('.popup__close');

setCardTemplate(cardTemplate);

function openEditPopup() {
  openModal(editPopup);
  nameEditInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

document.querySelector('.profile__edit-button').addEventListener('click', openEditPopup);

function openAddPopup() {
  openModal(addPopup);
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
      openImagePopup(imageUrl, card.name, card.name);
    }, function (likeButton, cardData) {
      handleLikeCard(likeButton, cardData);
    });
    if (newCard) {
      placesList.appendChild(newCard);
    }
  });
}

renderCards(initialCards);

formPopupEdit.addEventListener('submit', handleEditFormSubmit);
formPopupAdd.addEventListener('submit', handleAddFormSubmit);

function closeEditPopup() {
  closeModal(editPopup);
}

function closeAddPopup() {
  formPopupAdd.reset();
  closeModal(addPopup);
}

function closeImagePopup() {
  closeModal(imagePopup);
}

editPopup.addEventListener('click', closeOverlayClick);
addPopup.addEventListener('click', closeOverlayClick);
imagePopup.addEventListener('click', closeOverlayClick);

buttonsClose.forEach(button => {
  button.addEventListener('click', handleCloseButtonClick);
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const newName = formPopupEdit.querySelector('.popup__input_type_name').value;
  const newJob = formPopupEdit.querySelector('.popup__input_type_description').value;

  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;

  closeEditPopup();
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const cardName = nameInput.value;
  const cardLink = linkAddInput.value;

  const newCardData = {
    name: cardName,
    link: cardLink
  };

  const newCard = createCard(newCardData, deleteCard, function (imageUrl) {
    openImagePopup(imageUrl, newCardData.name, newCardData.name);
  }, function (likeButton, cardData) {
    handleLikeCard(likeButton, cardData);
  });
  placesList.prepend(newCard);

  closeAddPopup();
}