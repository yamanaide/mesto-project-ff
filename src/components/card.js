let cardTemplate;
export let likeCallback;

export function setCardTemplate(template) {
  cardTemplate = template;
}

export function handleLikeCard(buttonLike) {
  buttonLike.classList.toggle('card__like-button_is-active');
}

export function createCard(cardData, deleteCallback, openImagePopup, likeCallback) {

  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  deleteButton.addEventListener('click', function () {
    deleteCallback(cardElement);
  });

  cardImage.addEventListener('click', function () {
    openImagePopup(cardData.link, cardTitle);
  });

  likeButton.addEventListener('click', function () {
      likeCallback(likeButton)
  });

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}