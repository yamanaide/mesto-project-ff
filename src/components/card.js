let cardTemplate;
export let likeCallback;

export function setCardTemplate(template) {
  cardTemplate = template;
}

export async function toggleLikeButton(buttonLike, addLikeCallback, deleteLikeCallback) {
  const liked = buttonLike.classList.contains('card__like-button_is-active')
  liked ? await deleteLikeCallback() : await addLikeCallback()

  buttonLike.classList.toggle('card__like-button_is-active');
}

export function renderCard(cardData, isMine, count, deleteCallback, openImagePopup, likeCallback) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.like__count')

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCount.textContent = count

  deleteButton.addEventListener('click', function() {
    deleteCallback(cardElement)
  });

  cardImage.addEventListener('click', function () {
    openImagePopup(cardData.link, cardTitle);
  });

  likeButton.addEventListener('click', function () {
    likeCallback(likeButton)
  });

  if (isMine) {
    likeButton.hidden = true;
  }
  if (!isMine) {
    deleteButton.hidden = true;
  }

  return cardElement;
}

export function destroyCard(cardElement) {
  cardElement.remove();
}
