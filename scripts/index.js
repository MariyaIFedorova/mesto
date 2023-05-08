//Элементы секции EditProfile
const editProfilePopupOpenBtn = document.querySelector('.edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
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
const addContentEditBtn = addContentPopup.querySelector('.popup__edit-btn_type_add-content');
//Элементы секции создания карточки createCardsElement
const cardsGrid = document.querySelector('.elements');
const cardsTemplate = document.getElementById('cards-template');
//Элементы секции увеличения изображения zoomImage
const zoomImagePopup = document.querySelector('.popup_type_zoom-image');
const zoomImagePopupPicture = zoomImagePopup.querySelector('.popup__image');
const zoomImagePopupTitle = zoomImagePopup.querySelector('.popup__title_type_zoom-image')
//Элементы для закрытия popup
const closeBtns = document.querySelectorAll('.popup__close-btn');
const popups = document.querySelectorAll('.popup');

//Открыть popup
const openPopup = (popupElement) => {
    popupElement.classList.add('popup_open');
};

//Закрыть popup
const closePopup = () => {
    for (let i = 0; i < popups.length; ++i) {
        if (popups[i].classList.contains('popup_open')) {
            popups[i].classList.remove('popup_open')
        }
    }
}

const closePopupByBtn = () => {
    for (let i = 0; i < closeBtns.length; ++i) {
        closeBtns[i].addEventListener('click', closePopup);
    }
}
closePopupByBtn();

const closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
        closePopup();
    }
}
document.addEventListener('keydown', closePopupByEsc);

const closeByOverlay = (evt) => {
    if (evt.target.classList.contains('popup_open') && !evt.target.classList.contains('popup__container')) {
        closePopup()
    }
}
document.addEventListener('click', closeByOverlay);


// Редактирование персональных данных о пользователе
const openEditProfilePopup = () => {
    editProfileNameField.value = personName.textContent;
    editProfileJobField.value = personJob.textContent;
    openPopup(editProfilePopup);
};
editProfilePopupOpenBtn.addEventListener('click', openEditProfilePopup);

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    personName.textContent = editProfileNameField.value;
    personJob.textContent = editProfileJobField.value;
    editProfilePopup.classList.remove('popup_open');
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
    cardImage.addEventListener('click', function (evt) {
        evt.preventDefault();
        openPopup(zoomImagePopup);
        zoomImagePopupPicture.src = cardImage.src;
        zoomImagePopupTitle.textContent = cardTitle.textContent;
    });

    return cardElement;
};
initialCards.forEach((userCard) => {
    const element = createCardsElement(userCard);
    cardsGrid.append(element);
});

//Добавление новой карточки
addContentPopupOpenBtn.addEventListener('click', (event) => { openPopup(addContentPopup) });

const handleAddContentFormSubmit = (evt) => {
    evt.preventDefault();
    const newCard = { name: addContentPlaceField.value, link: addContentAdressField.value };
    const newCardElement = createCardsElement(newCard);
    cardsGrid.prepend(newCardElement);
    addContentPopup.classList.remove('popup_open');
    formAddContentElement.reset();
};
formAddContentElement.addEventListener('submit', handleAddContentFormSubmit);