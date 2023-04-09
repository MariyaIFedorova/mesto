const openPopupBtn = document.querySelector('.edit-button');
const popup = document.querySelector('.popup');
const closePopupBtn = document.querySelector('.popup__close-btn');
const nameField = popup.querySelector('.popup__field_name');
const jobField = popup.querySelector('.popup__field_job');
const personName = document.querySelector('.info__name');
const personJob = document.querySelector('.info__description');
const saveBtn = popup.querySelector('.popup__edit-btn');

function openPopup() {
    popup.classList.toggle('popup_open');
}

openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', openPopup);


personName.value = nameField.textContent;
personJob.value = jobField.textContent;


let formElement = popup.querySelector('.popup__content');

function handleFormSubmit(evt) {

    evt.preventDefault();

    personName.textContent = nameField.value;
    personJob.textContent = jobField.value;
}

saveBtn.addEventListener('click', handleFormSubmit);
saveBtn.addEventListener('click', openPopup);


formElement.addEventListener('submit', handleFormSubmit);





