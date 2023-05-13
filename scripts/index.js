//Элементы секции EditProfile
const profilePopupOpenBtn = document.querySelector('.edit-button');
const profilePopup = document.querySelector('.popup_type_edit-profile');
const profileNameField = profilePopup.querySelector('.popup__field_type_name');
const profileJobField = profilePopup.querySelector('.popup__field_type_job');
const personName = document.querySelector('.info__name');
const personJob = document.querySelector('.info__description');
const profileSaveBtn = profilePopup.querySelector('.popup__edit-btn_type_edit-profile');
const formEditProfileElement = profilePopup.querySelector('.popup__content_type_edit-profile');
//Элементы секции добаления новой карточки пользователем AddPopup
const formAddContentElement = document.querySelector('.popup__content_type_add-content');
const contentPlaceField = formAddContentElement.querySelector('.popup__field_type_place');
const contentAdressField = formAddContentElement.querySelector('.popup__field_type_adress');
const contentPopupOpenBtn = document.querySelector('.add-button');
const contentPopup = document.querySelector('.popup_type_add-content');
const contentEditBtn = contentPopup.querySelector('.popup__edit-btn_type_add-content');
//Элементы секции создания карточки createCardsElement
const cardsGrid = document.querySelector('.elements');
const cardsTemplate = document.getElementById('cards-template');
//Элементы секции увеличения изображения zoomImage
const imageZoomPopup = document.querySelector('.popup_type_zoom-image');
const imageZoomPopupPicture = imageZoomPopup.querySelector('.popup__image');
const imageZoomPopupTitle = imageZoomPopup.querySelector('.popup__title_type_zoom-image')
//Элементы для закрытия popup
const btnsToClosePopup = document.querySelectorAll('.popup__close-btn');
const popups = document.querySelectorAll('.popup');

//Открыть popup
const openPopup = (popupElement) => {
    popupElement.classList.add('popup_open');
    document.addEventListener('keydown', closePopupByEsc);
    popupElement.addEventListener('click', closeByOverlay);
};

//Закрыть popup
const closePopup = (popupElement) => {
    popupElement.classList.remove('popup_open');
    document.removeEventListener('keydown', closePopupByEsc);
    popupElement.removeEventListener('click', closeByOverlay);
}

btnsToClosePopup.forEach((btn) => {
    const popup = btn.closest('.popup');
    btn.addEventListener('click', () => closePopup(popup))
});

function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_open');
        closePopup(popupOpened);
    }
};

const closeByOverlay = (evt) => {
    if (evt.target.classList.contains('popup_open') && !evt.target.classList.contains('popup__container')) {
        const popupOpened = document.querySelector('.popup_open');
        closePopup(popupOpened);
    }
};

// Редактирование персональных данных о пользователе
const openEditProfilePopup = () => {
    profileNameField.value = personName.textContent;
    profileJobField.value = personJob.textContent;
    openPopup(profilePopup);
};
profilePopupOpenBtn.addEventListener('click', openEditProfilePopup);

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    personName.textContent = profileNameField.value;
    personJob.textContent = profileJobField.value;
    closePopup(profilePopup);
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
    cardImage.alt = 'Фотография загруженная пользователем'

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
        openPopup(imageZoomPopup);
        imageZoomPopupPicture.src = cardImage.src;
        imageZoomPopupTitle.textContent = cardTitle.textContent;
        imageZoomPopupPicture.alt = 'Фотография загруженная пользователем';
    });

    return cardElement;
};
initialCards.forEach((userCard) => {
    const element = createCardsElement(userCard);
    cardsGrid.append(element);
});

//Добавление новой карточки
const openContentPopup = () => {
    contentPlaceField.value = ('');
    contentAdressField.value = ('');
    contentEditBtn.setAttribute('disabled', true);
    contentEditBtn.classList.add('popup__edit-btn_disabled');
    openPopup(contentPopup);
};
contentPopupOpenBtn.addEventListener('click', (event) => { openContentPopup(contentPopup) });

const handleAddContentFormSubmit = (evt) => {
    evt.preventDefault();
    const newCard = { name: contentPlaceField.value, link: contentAdressField.value };
    const newCardElement = createCardsElement(newCard);
    cardsGrid.prepend(newCardElement);
    closePopup(contentPopup);
};
formAddContentElement.addEventListener('submit', handleAddContentFormSubmit);