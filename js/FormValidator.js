
export class FormValidator {
    constructor (options, form) {
        this._options = options;
        this._form = form;
    }

    // метод установки слушателей на формы 
    enableValidation() {
        const allformElement = Array.from(document.querySelectorAll(this._form));

        allformElement.forEach((form) => {
            form.addEventListener('submit', function(evt) {
                evt.preventDefault();
            });

            this._setEventListeners(form);
        });
    };

    // метод установки слушателей на инпуты
    _setEventListeners(form) {
        const inputList = Array.from(form.querySelectorAll(this._options.inputSelector));
        const buttonElement = form.querySelector(this._options.submitButtonSelector);
        
        inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._isValid(form, input);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };    

    // метод получает информацию о валидности/не валидности
    //  и после добавляет/убирает стили с ошибками инпутам и атрибут disabled для кнопки
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.remove(this._options.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        } else {
            buttonElement.classList.add(this._options.inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        }
    };

    // метод проверяет инпуты формы на валидность
    _hasInvalidInput(inputList) {
        return inputList.every(function(input) {
            return input.validity.valid;
        });
    };

    // метод, который проверяет валидность поля
    _isValid(form, input) {
    //  Если поле не проходит валидацию, покажем ошибку
        if (input.validity.valid) {
           this._hideInputError(form, input);
        } else {
            this._showInputError(form, input, input.validationMessage);
        }
    };

    // метод, который добавляет класс с ошибкой
    _showInputError(form, input, errorMessage) {
        const formError = form.querySelector(`#${input.id}-error`);

        input.classList.add(this._options.inputErrorClass);
        formError.classList.add(this._options.errorClass);
        formError.textContent = errorMessage;
    };

    // метод, который удаляет класс с ошибкой
    _hideInputError(form, input) {
        const formError = form.querySelector(`#${input.id}-error`);

        input.classList.remove(this._options.inputErrorClass);
        formError.classList.remove(this._options.errorClass);
        formError.textContent = '';
    };
}

