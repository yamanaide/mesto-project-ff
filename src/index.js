import './pages/index.css';

import { createCard, deleteCard, setCardTemplate } from './components/card.js';
import { openEditPopup, closeEditPopup, openAddPopup, closeAddPopup, openImagePopup, closeImagePopup, handleFormSubmit, handleAddFormSubmit } from './components/modal.js';
import { initialCards } from './components/cards.js';

// DOM узлы
const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
export const placesList = document.querySelector('.places__list');

setCardTemplate(cardTemplate);

// DOM узлы попапов
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Обработчики событий для кнопок "Редактировать" и "+"
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.profile__edit-button').addEventListener('click', function () {
    openEditPopup();
  });

  document.querySelector('.profile__add-button').addEventListener('click', function () {
    openAddPopup();
  });

  // Вывести карточки на страницу
  function renderCards(cardsArray) {
    cardsArray.forEach(function (card) {
      const newCard = createCard(card, deleteCard, openImagePopup, handleLike);
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
});

function handleLike(cardData, likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

// Обработчики событий для закрытия попапов
document.addEventListener('DOMContentLoaded', function () {

  document.querySelector('.popup_type_edit .popup__close').addEventListener('click', function () {
    closeEditPopup();
  });

  document.querySelector('.popup_type_new-card .popup__close').addEventListener('click', function () {
    closeAddPopup();
  });

  document.querySelector('.popup_type_image .popup__close').addEventListener('click', function () {
    closeImagePopup();
  });
});

const formElement = document.querySelector('.popup_type_edit .popup__form');

formElement.addEventListener('submit', handleFormSubmit);