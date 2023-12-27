import '/src/pages/index.css';

import { destroyCard, renderCard, toggleLikeButton } from './card.js';
import { openModal, closeModal, closeOverlayClick, handleCloseButtonClick, AddModalAnimation } from './modal.js';
import { getProfile, getCards, createCard, deleteCard, addLike, deleteLike, updateAvatar, updateProfile } from "./api.js"
import { clearValidation, enableValidation } from './validation.js';

const placesList = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const avatarPopup = document.querySelector('.popup_type_new-avatar');
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const formPopupProfile = editPopup.querySelector('.popup__form');
const formPopupAvatar = avatarPopup.querySelector('.popup__form');
const avatarInput = formPopupAvatar.querySelector('.popup__input_type_avatar-url');
const nameEditInput = formPopupProfile.querySelector('.popup__input_type_name');
const jobInput = formPopupProfile.querySelector('.popup__input_type_description');
const formPopupAddOpen = addPopup.querySelector('.popup__form');
const linkInput = formPopupAddOpen.querySelector('.popup__input_type_url');
const formPopupEdit = editPopup.querySelector('.popup__form');
const newNameInput = formPopupEdit.querySelector('.popup__input_type_name');
const newAboutInput = formPopupEdit.querySelector('.popup__input_type_description');
const formPopupAdd = addPopup.querySelector('.popup__form');
const nameInput = formPopupAdd.querySelector('.popup__input_type_card-name');
const linkAddInput = formPopupAdd.querySelector('.popup__input_type_url');
const buttonsClose = document.querySelectorAll('.popup__close');
let userId = "";

const validationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(validationOptions)

function displayCard(cardData) {
  const newCard = renderCard(
    cardData,
    handleDeleteCard,
    openImagePopup,
    handleAddLike,
    handleDeleteLike,
    userId,
  )
  
  return newCard
}

function renderPage() {
  Promise.all([getProfile(), getCards()])
    .then(([user, cards]) => {
      profileImage.style.backgroundImage = `url(${user.avatar})`
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;

      userId = user._id;
      cards.forEach(function (card) {
        const newCard = displayCard(card);
        placesList.append(newCard);
      });
    })
    .catch(error => {
      console.log(error);
    })
}

renderPage();

profileImage.addEventListener('click', () => {
  clearValidation(formPopupAvatar, validationOptions)
  openModal(avatarPopup)
})

document.querySelector('.profile__edit-button').addEventListener('click', () => {
  clearValidation(formPopupEdit, validationOptions)
  openModal(editPopup);
  nameEditInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
  clearValidation(formPopupAdd, validationOptions)
  openModal(addPopup)
});

function openImagePopup(imageUrl, imageAlt, imageCaption) {
  imagePopupImage.src = imageUrl;
  imagePopupImage.alt = imageAlt;
  imagePopup.querySelector('.popup__caption').textContent = imageCaption;

  openModal(imagePopup);
}

AddModalAnimation(editPopup)
AddModalAnimation(avatarPopup)
AddModalAnimation(addPopup)

formPopupEdit.addEventListener('submit', handleEditFormSubmit);
formPopupAdd.addEventListener('submit', handleAddFormSubmit);
formPopupAvatar.addEventListener('submit', handleAvatarFormSubmit);

editPopup.addEventListener('click', closeOverlayClick);
addPopup.addEventListener('click', closeOverlayClick);
imagePopup.addEventListener('click', closeOverlayClick);

buttonsClose.forEach(button => {
  button.addEventListener('click', handleCloseButtonClick);
});

function handleDeleteCard(id, cardElement) {
  deleteCard(id)
    .then(deleted => {
      if (deleted) destroyCard(cardElement)
    })
}

function handleAddLike(id, likeButton, likeCount) {
  addLike(id)
    .then(card => {
      toggleLikeButton(likeButton);
      likeCount.textContent = card.likes.length;
    })
}

function handleDeleteLike(id, likeButton, likeCount) {
  deleteLike(id)
    .then(card => {
      toggleLikeButton(likeButton);
      likeCount.textContent = card.likes.length;
    })

}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const button = evt.submitter

  const newName = newNameInput.value;
  const newAbout = newAboutInput.value;

  const newData = {
    name: newName,
    about: newAbout,
  }

  button.textContent = "Сохранение..."
  updateProfile(newData)
    .then(data => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;

      closeModal(editPopup);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    })
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const button = evt.submitter

  const cardName = nameInput.value;
  const cardLink = linkAddInput.value;

  const newCardData = {
    name: cardName,
    link: cardLink
  };

  button.textContent = "Сохранение..."
  createCard(newCardData)
    .then(cardData => {
      const newCard = displayCard(cardData, userId);
      placesList.prepend(newCard);

      closeModal(addPopup);
    })
    .finally(() => {
      button.textContent = "Создать";
    })
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const button = evt.submitter
  
  const newAvatar = avatarInput.value;

  button.textContent = "Сохранение...";
  updateAvatar(newAvatar)
    .then(data => {
      const avatar = data.avatar;
      profileImage.style.backgroundImage = `url(${avatar})`

      closeModal(avatarPopup);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    })
}
