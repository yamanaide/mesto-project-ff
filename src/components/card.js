const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');

function isLiked(buttonLike) {
  return buttonLike.classList.contains('card__like-button_is-active')
}

function toggleLikeButton(buttonLike) {
  if (isLiked(buttonLike)) {
    buttonLike.classList.remove('card__like-button_is-active');
  } else {
    buttonLike.classList.add('card__like-button_is-active');
  }
}

export function renderCard(
  cardData,
  count,
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
  likeCount.textContent = count;

  if (!isMine) {
    deleteButton.hidden = true;
  }

  cardData.likes.forEach(user => {
    if (user._id === userId) {
      toggleLikeButton(likeButton)
    }
  })

  deleteButton.addEventListener('click', function() {
    deleteCallback(cardData._id)
      .then(deleted => {
        if (deleted) cardElement.remove()
      })
  });

  cardImage.addEventListener('click', function () {
    openImagePopup(cardData.link, cardData.name, cardData.name);
  });

  likeButton.addEventListener('click', function () {
    const handler = isLiked(likeButton) ? deleteLikeCallback : addLikeCallback;
    handler(cardData._id)
      .then(card => {
        toggleLikeButton(likeButton);
        likeCount.textContent = card.likes.length;
      })
  });

  return cardElement;
}
