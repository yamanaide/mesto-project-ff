// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard(cardData, deleteCallback) {
  const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item').cloneNode(true);

  cardTemplate.querySelector('.card__title').textContent = cardData.name;
  cardTemplate.querySelector('.card__image').src = cardData.link;
  cardTemplate.querySelector('.card__image').alt = cardData.name;

  cardTemplate.querySelector('.card__delete-button').addEventListener('click', function() {
    deleteCallback(cardData);
    cardTemplate.remove();
  });

  return cardTemplate;
}

function renderCards(cardsArray, deleteCallback) {
  const placesList = document.querySelector('.places__list');

  placesList.innerHTML = '';

  cardsArray.forEach(function(card) {
    const newCard = createCard(card, deleteCallback);
    placesList.appendChild(newCard);
  });
}


renderCards(initialCards, function(cardData) {
  console.log('Удаление карточки:', cardData);
});

