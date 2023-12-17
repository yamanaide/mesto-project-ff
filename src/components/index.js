import '/src/pages/index.css';

import { renderCard, destroyCard, likeCallback, setCardTemplate, toggleLikeButton } from './card.js';
import { openModal, closeModal, closeOverlayClick, handleCloseButtonClick } from './modal.js';
import { getProfile, getCards, createCard, deleteCard, addLike, deleteLike, updateAvatar, updateProfile } from "./api.js"

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

async function renderPage() {
  await Promise.all([getProfile(), getCards()])
    .then(([user, cards]) => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;

      const id = user._id;
      cards.forEach(function (card) {
        const isMine = card.owner._id === id;
        const newCard = renderCard(card, isMine, card.likes.length, async function(cardElement) {
          const deleted = await deleteCard(card._id);
          if (deleted) destroyCard(cardElement);
        }, function (imageUrl) {
          openImagePopup(imageUrl, card.name, card.name);
        }, function (likeButton) {
          toggleLikeButton(likeButton, async function() {
              await addLike(card._id)
            }, async function() {
              await deleteLike(card._id)
            });
        });

        if (newCard) {
          placesList.appendChild(newCard);
        }
      });
    })
    .catch(error => {
      console.log(error);
    })
}

await renderPage();

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

formPopupEdit.addEventListener('submit', await handleEditFormSubmit);
formPopupAdd.addEventListener('submit', await handleAddFormSubmit);

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

async function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const newName = formPopupEdit.querySelector('.popup__input_type_name').value;
  const newJob = formPopupEdit.querySelector('.popup__input_type_description').value;

  const data = await updateProfile({
    name: newName,
    about: newJob,
  })

  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;

  closeEditPopup();
}

async function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const cardName = nameInput.value;
  const cardLink = linkAddInput.value;

  const newCardData = {
    name: cardName,
    link: cardLink
  };

  const data = await createCard(newCardData)

  const newCard = renderCard(
    data,
    true,
    async function(cardElement) {
      const deleted = await deleteCard(data._id)
      if (deleted) destroyCard(cardElement)
    }, function (imageUrl) {
      openImagePopup(imageUrl, data.name, data.name);
    }, async function (likeButton, cardData) {
      await addLike(data._id)
      toggleLikeButton(likeButton, cardData);
    },
  );
  placesList.prepend(newCard);

  closeAddPopup();
}
