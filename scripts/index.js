const openPopupBtn = document.querySelector('.edit-button');
const popup = document.querySelector('.popup');
const closePopupBtn = document.querySelector('.popup__close-btn');
const nameField = popup.querySelector('.popup__field_type_name');
const jobField = popup.querySelector('.popup__field_type_job');
const personName = document.querySelector('.info__name');
const personJob = document.querySelector('.info__description');
const saveBtn = popup.querySelector('.popup__edit-btn');
const formElement = popup.querySelector('.popup__content');

const addForm = document.querySelector('.add-popup__content');
const placeField = addForm.querySelector('.add-popup__field_type_place');
const adressField = addForm.querySelector('.add-popup__field_type_adress');
const openAddPopupBtn = document.querySelector('.add-button');
const addPopup = document.querySelector('.add-popup');
const closeAddPopupBtn = document.querySelector('.add-popup__close-btn');
const saveAddedBtn = addPopup.querySelector('.add-popup__edit-btn');

const imagePopup = document.querySelector('.image-popup');
const imagePopupCloseBtn = imagePopup.querySelector('.image-popup__close-btn');
const imagePopupPicture = imagePopup.querySelector('.image-popup__picture');
const imagePopupText = imagePopup.querySelector('.image-popup__text');

// Редактирование персональных данных о пользователе

function openPopup() {
    popup.classList.add('popup_open');
    nameField.value = personName.textContent;
    jobField.value = personJob.textContent;
};

openPopupBtn.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup_open');
}

closePopupBtn.addEventListener('click', closePopup);


function handleFormSubmit(evt) {

    evt.preventDefault();

    personName.textContent = nameField.value;
    personJob.textContent = jobField.value;

    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);

//Массив вложенных по умолчанию кароточек 

const initialCards = [
    {
        name: 'Руза',
        link: 'https://images.unsplash.com/photo-1595890964455-72de1d9b81b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Тула',
        link: 'https://images.unsplash.com/photo-1625426818317-95001074dc78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Мыс Анива',
        link: 'https://images.unsplash.com/photo-1660548842709-de562a80db95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//Редактирование карточек

//Перенос данных массива в DOM

const cardsGrid = document.querySelector('.elements');
const cardsTemplate = document.getElementById('cards-template');

const createCardsElement = (card) => {
    const cardElement = cardsTemplate.content.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.group__text');
    const cardDeleteBtn = cardElement.querySelector('.element__delete-btn');
    const cardLikeBtn = cardElement.querySelector('.group__rectangle');

    cardTitle.textContent = card.name;
    cardImage.src = card.link;

    //Удаление карточки

    const deleteCard = () => {
        cardElement.remove();
    };

    cardDeleteBtn.addEventListener('click', deleteCard);

    //Постаивть лайк

    const markElement = () => {
        cardLikeBtn.classList.toggle('group__rectangle_active');
    };
    cardLikeBtn.addEventListener('click', markElement);

    return cardElement;
};


initialCards.forEach((userCard) => {
    const element = createCardsElement(userCard);
    cardsGrid.prepend(element);
});

//Добавление новой карточки

function handleAddFormSubmit(evt) {

    evt.preventDefault();
    const formAddElement = addPopup.querySelector('.add-popup__content');
    const placeField = addPopup.querySelector('.add-popup__field_type_place');
    const adressField = addPopup.querySelector('.add-popup__field_type_adress');
    const oneOfCards = initialCards[0];
    const newCard = Object.assign({}, oneOfCards, { name: placeField.value, link: adressField.value });
    initialCards.push(newCard);
    const newCardElement = createCardsElement(newCard);
    cardsGrid.prepend(newCardElement);

    closeAddPopup();
};

addForm.addEventListener('submit', handleAddFormSubmit);

function openAddPopup() {
    addPopup.classList.add('add-popup_open');
}

openAddPopupBtn.addEventListener('click', openAddPopup);

const closeAddPopup = () => {
    addPopup.classList.remove('add-popup_open');
};

closeAddPopupBtn.addEventListener('click', closeAddPopup);

// Увеличение изображения

const imageLinks = document.querySelectorAll('.element__image');
const imageTexts = document.querySelectorAll('.group__text');

for (let i = 0; i < imageLinks.length; ++i) {
    imageLinks[i].addEventListener('click', function (evt) {
        imagePopup.classList.add('image-popup_open');
        imagePopupPicture.src = imageLinks[i].src;
        for (let i = 0; i < imageTexts.length; ++i) {
        };
        imagePopupText.textContent = imageTexts[i].textContent;
    });
};

function closeImagePopup() {
    imagePopup.classList.remove('image-popup_open');
}
imagePopupCloseBtn.addEventListener('click', closeImagePopup);






