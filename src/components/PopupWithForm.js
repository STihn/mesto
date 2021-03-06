import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, {handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formSubmit = this._formSubmit.bind(this)
    }

    open() {
        super.open();
    }

    close() {
        super.close();
    }

    _getInputValues() {
        this._allInputForm = Array.from(this._popupSelector.querySelectorAll('.pop-up__input'));

        this._inputList = {};
        this._allInputForm.forEach((item) => {
            this._inputList[item.name] = item.value;
        });

        return this._inputList;
    }

    _formSubmit(evt){
        evt.preventDefault();
        this._handleFormSubmit( this._getInputValues() );
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', this._formSubmit);
    }
}