const selectorsList = {
    formSelector: '.popup__form-set',
    inputSelector: '.popup__field',
    buttonSubmitSelector: '.popup__edit-btn',
    inactiveButtonClass: 'popup__edit-btn_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
};

const enableValidation = ({ formSelector, ...rest }) => {
    const forms = Array.from(document.querySelectorAll([formSelector]));
    forms.forEach(formElement => {
        setEventListeners(formElement, rest);
    })
}

const setEventListeners = (formElement, { inputSelector, buttonSubmitSelector, ...rest }) => {
    const formInputs = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(buttonSubmitSelector);

    formInputs.forEach(inputElement => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            if (hasInvalidInput(formInputs)) {
                disabledButtonState(buttonElement);
            } else {
                enableButtonState(buttonElement);
            }
        })
    })
}

const disabledButtonState = (buttonElement) => {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(selectorsList.inactiveButtonClass);
}

const enableButtonState = (buttonElement) => {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(selectorsList.inactiveButtonClass);
}

const hasInvalidInput = (formInputs) => {
    return formInputs.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectorsList.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectorsList.errorClass);
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectorsList.inputErrorClass);
    errorElement.classList.remove(selectorsList.errorClass);
    errorElement.textContent = ('');

};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

enableValidation(selectorsList);