
const enableValidation = ({
    formSelector: '.popup__content',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__edit-btn',
    inactiveButtonClass: '.popup__edit-btn_disabled',
    inputErrorClass: '.popup__field_type_error',
    errorClass: '.popup__field-error_active'
});

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__field_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__field-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__field_type_errorr');
    errorElement.classList.remove('popup__field-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
    const buttonElement = formElement.querySelector('.popup__edit-btn');

    const hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })

    }

    const toggleButtonState = (inputList, buttonElement) => {
        if (hasInvalidInput(inputList)) {
            buttonElement.classList.add('popup__edit-btn_disabled');
            buttonElement.setAttribute('disabled', true);
        } else {
            buttonElement.classList.remove('popup__edit-btn_disabled');
            buttonElement.removeAttribute('disabled');
        }
    }
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        })
    })
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
        })
    })
};

const checkValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__content'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        })
        const fieldsetList = Array.from(formElement.querySelectorAll('.popup__form-set'));
        fieldsetList.forEach((fieldset) => { setEventListeners(fieldset) });
        return fieldsetList;
        setEventListeners(formElement);
    })
};

checkValidation();


