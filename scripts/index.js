// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, deleteCallback) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
    deleteCallback(cardData);
    cardElement.remove();
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardData) {
  const cardIndex = initialCards.findIndex(card => card.name === cardData.name);
  if (cardIndex !== -1) {
    initialCards.splice(cardIndex, 1);
  }
}

// @todo: Вывести карточки на страницу
function renderCards(cardsArray, deleteCallback) {

  cardsArray.forEach(function(card) {
    const newCard = createCard(card, deleteCallback);
    placesList.appendChild(newCard);
  });
}

renderCards(initialCards, deleteCard);



