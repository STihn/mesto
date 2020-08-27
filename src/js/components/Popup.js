
export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    // Функция открытия модальных окн
    open() {
        this._popupSelector.classList.add('pop-up_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    // Функция закрытия модальных окн
    close() {
        this._popupSelector.classList.remove('pop-up_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    // Функция закрытия модального окна при нажатие кнопки escape
    _handleEscClose(evt) {
        if(evt.key === 'Escape'){
            this.close();
        } 
    }

    setEventListeners(){
        this._popupSelector.querySelector('.pop-up__btnClose').addEventListener('click', () => {this.close()});
        this._popupSelector.addEventListener('click', (evt) => {
            if(evt.target.classList.contains('pop-up_opened')) {
                this.close();
            };
        });
    }
}