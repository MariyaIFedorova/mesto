const openPopupBtn = document.querySelector('.edit-button');
const popup = document.querySelector('.popup');
const closePopupBtn = document.querySelector('.popup__close-btn');
const nameField = popup.querySelector('.popup__field_type_name');
const jobField = popup.querySelector('.popup__field_type_job');
const personName = document.querySelector('.info__name');
const personJob = document.querySelector('.info__description');
const saveBtn = popup.querySelector('.popup__edit-btn');
let formElement = popup.querySelector('.popup__content');


function openPopup() {
    popup.classList.add('popup_open');
    nameField.value = personName.textContent;
    jobField.value = personJob.textContent;

}

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





