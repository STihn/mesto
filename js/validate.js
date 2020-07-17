
// функция установки слушателей на формы 
function enableValidation(options) {
    const allformElement = Array.from(document.querySelectorAll(options.formSelector));
    allformElement.forEach(function(form) {
        form.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        setEventListeners(form, options);
    });
};
// функция установки слушателей на инпуты
function setEventListeners(form, options) {
    const inputList = Array.from(form.querySelectorAll(options.inputSelector));
    const buttonElement = form.querySelector(options.submitButtonSelector);
    inputList.forEach(function(input) {
        input.addEventListener('input', function() {
            isValid(form, input, options);
            toggleButtonState(inputList, buttonElement, options);
        });
    });
    
};
// фукнция получает информацию о валидности/не валидности
//  и после добавляет/убирает стили с ошибками инпутам и атрибут disabled для кнопки
function toggleButtonState(inputList, buttonElement, options) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.remove(options.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    } else {
        buttonElement.classList.add(options.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    }
};
// функция проверяет инпуты формы на валидность
function hasInvalidInput(inputList) {
    return inputList.every(function(input) {
        return input.validity.valid;
    });
};
 // Функция, которая проверяет валидность поля
function isValid(form, input, options) {
    //   Если поле не проходит валидацию, покажем ошибку
    if (input.validity.valid) {
        hideInputError(form, input, options);
    } else {
        showInputError(form, input, input.validationMessage, options);
    }
};
// Функция, которая добавляет класс с ошибкой
function showInputError(form, input, errorMessage, options) {
    const formError = form.querySelector(`#${input.id}-error`);
    input.classList.add(options.inputErrorClass);
    formError.classList.add(options.errorClass);
    formError.textContent = errorMessage;
};
// Функция, которая удаляет класс с ошибкой
function hideInputError(form, input, options) {
    const formError = form.querySelector(`#${input.id}-error`);
    input.classList.remove(options.inputErrorClass);
    formError.classList.remove(options.errorClass);
    formError.textContent = '';
};

const validationConfig = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__btnSubmit',
    inactiveButtonClass: 'pop-up__btnSubmit_inactive',
    inputErrorClass: 'pop-up__input_type_error',
    errorClass: 'pop-up__input-error_active'
}

enableValidation(validationConfig);
