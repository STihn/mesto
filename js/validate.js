
function enableValidation(options) {
    const allformElement = Array.from(document.querySelectorAll(options.formSelector));
    allformElement.forEach(function(form) {
        form.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        setEventListeners(form, options);
    });
};

function setEventListeners(form, options) {
    const inputList = Array.from(form.querySelectorAll(options.inputSelector));
    const buttonElement = form.querySelector(options.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, options);
    inputList.forEach(function(input) {
        input.addEventListener('input', function() {
            isValid(form, input, options);
            toggleButtonState(inputList, buttonElement, options);
        });
    });
};

function toggleButtonState(inputList, buttonElement, options) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(options.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(options.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
        }
};

function hasInvalidInput(inputList) {
    return inputList.some(function(input) {
      return input.validity.valid == false;
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
function showInputError(formElement, input, errorMessage, options) {
    const formError = formElement.querySelector(`#${input.id}-error`);
    input.classList.add(options.inputErrorClass);
    formError.classList.add(options.errorClass);
    formError.textContent = errorMessage;
};
  
  // Функция, которая удаляет класс с ошибкой
function hideInputError(formElement, input, options) {
    const formError = formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(options.inputErrorClass);
    formError.classList.remove(options.errorClass);
    formError.textContent = '';
};

obj = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__btnSubmit',
    inactiveButtonClass: 'pop-up__btnSubmit_inactive',
    inputErrorClass: 'pop-up__input_type_error',
    errorClass: 'pop-up__input-error_active'
}
enableValidation(obj);
