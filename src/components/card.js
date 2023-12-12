let cardTemplate;
export let likeCallback;

export function setCardTemplate(template) {
  cardTemplate = template;
}

export function setLikeCallback(callback) {
  likeCallback = callback;
}

export function createCard(cardData, deleteCallback, openImagePopup) {

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
    openImagePopup(cardData.link);
  });

  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card__like-button_is-active');

    if (likeCallback) {
      likeCallback(cardElement, cardData);
    }
  });

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}