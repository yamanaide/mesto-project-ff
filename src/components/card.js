const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');

export function isLiked(buttonLike) {
  return buttonLike.classList.contains('card__like-button_is-active')
}

export function toggleLikeButton(buttonLike) {
  if (isLiked(buttonLike)) {
    buttonLike.classList.remove('card__like-button_is-active');
  } else {
    buttonLike.classList.add('card__like-button_is-active');
  }
}

export function destroyCard(cardElement) {
  cardElement.remove()
}

export function renderCard(
  cardData,
  deleteCallback,
  openImagePopup,
  addLikeCallback,
  deleteLikeCallback,
  userId,
) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.like__count');
  const isMine = cardData.owner._id === userId;

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCount.textContent = cardData.likes.length;

  if (!isMine) {
    deleteButton.remove()
  }

  cardData.likes.forEach(user => {
    if (user._id === userId) {
      toggleLikeButton(likeButton)
    }
  })

  deleteButton.addEventListener('click', deleteCallback);

  cardImage.addEventListener('click', function () {
    openImagePopup(cardData.link, cardData.name, cardData.name);
  });

  likeButton.addEventListener('click', function () {
    const id = cardData._id;
    isLiked(likeButton) ? deleteLikeCallback(id, likeButton, likeCount) : addLikeCallback(id, likeButton, likeCount);
  });

  return cardElement;
}
