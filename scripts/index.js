//Элементы секции EditProfile
const editProfilePopupOpenBtn = document.querySelector('.edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfilePopupCloseBtn = editProfilePopup.querySelector('.popup__close-btn_type_edit-profile');
const editProfileNameField = editProfilePopup.querySelector('.popup__field_type_name');
const editProfileJobField = editProfilePopup.querySelector('.popup__field_type_job');
const personName = document.querySelector('.info__name');
const personJob = document.querySelector('.info__description');
const editProfileSaveBtn = editProfilePopup.querySelector('.popup__edit-btn_type_edit-profile');
const formEditProfileElement = editProfilePopup.querySelector('.popup__content_type_edit-profile');
//Элементы секции добаления новой карточки пользователем AddPopup
const formAddContentElement = document.querySelector('.popup__content_type_add-content');
const addContentPlaceField = formAddContentElement.querySelector('.popup__field_type_place');
const addContentAdressField = formAddContentElement.querySelector('.popup__field_type_adress');
const addContentPopupOpenBtn = document.querySelector('.add-button');
const addContentPopup = document.querySelector('.popup_type_add-content');
const addContentPopupCloseBtn = document.querySelector('.popup__close-btn_type_add-content');
const addContentEditBtn = addContentPopup.querySelector('.popup__edit-btn_type_add-content');
//Элементы секции создания карточки createCardsElement
const cardsGrid = document.querySelector('.elements');
const cardsTemplate = document.getElementById('cards-template');
//Элементы секции увеличения изображения zoomImage
const zoomImagePopup = document.querySelector('.popup_type_zoom-image');
const zoomImagePopupCloseBtn = zoomImagePopup.querySelector('.popup__close-btn_type_zoom-image');
const zoomImagePopupPicture = zoomImagePopup.querySelector('.popup__image');
const zoomImagePopupTitle = zoomImagePopup.querySelector('.popup__title_type_zoom-image');

//Открыть popup
const openPopup = (popupElement) => {
    popupElement.classList.add('popup_open');
};

//Закрыть popup
const closePopup = (popupElement) => {
    popupElement.classList.remove('popup_open');
};

// Редактирование персональных данных о пользователе
const openEditProfilePopup = () => {
    editProfileNameField.value = personName.textContent;
    editProfileJobField.value = personJob.textContent;
    openPopup(editProfilePopup);
};
editProfilePopupOpenBtn.addEventListener('click', openEditProfilePopup);
editProfilePopupCloseBtn.addEventListener('click', (event) => { closePopup(editProfilePopup) });

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    personName.textContent = editProfileNameField.value;
    personJob.textContent = editProfileJobField.value;
    closePopup(editProfilePopup);
}
formEditProfileElement.addEventListener('submit', handleEditProfileFormSubmit);

//Редактирование карточек
//Перенос данных массива в DOM
const createCardsElement = (card) => {
    const cardElement = cardsTemplate.content.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.group__text');
    const cardDeleteBtn = cardElement.querySelector('.element__delete-btn');
    const cardLikeBtn = cardElement.querySelector('.group__rectangle');
    const imageLinks = cardElement.querySelectorAll('.element__image');

    cardTitle.textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = 'здесь должно было быть загруженное Вами изображение, но что-то пошло не так. Проверьте ссылку'

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

    // Увеличение изображения
    for (let i = 0; i < imageLinks.length; ++i) {
        imageLinks[i].addEventListener('click', function (evt) {
            openPopup(zoomImagePopup);
            zoomImagePopupPicture.src = imageLinks[i].src;
            zoomImagePopupTitle.textContent = cardTitle.textContent;
        });
    };
    zoomImagePopupCloseBtn.addEventListener('click', (event) => { closePopup(zoomImagePopup) });

    return cardElement;
};
initialCards.forEach((userCard) => {
    const element = createCardsElement(userCard);
    cardsGrid.append(element);
});

//Добавление новой карточки
addContentPopupOpenBtn.addEventListener('click', (event) => { openPopup(addContentPopup) });
addContentPopupCloseBtn.addEventListener('click', (event) => { closePopup(addContentPopup) });
const handleAddContentFormSubmit = (evt) => {
    evt.preventDefault();
    const newCard = { name: addContentPlaceField.value, link: addContentAdressField.value };
    const newCardElement = createCardsElement(newCard);
    cardsGrid.prepend(newCardElement);
    closePopup(addContentPopup);
    formAddContentElement.reset();
};
formAddContentElement.addEventListener('submit', handleAddContentFormSubmit);