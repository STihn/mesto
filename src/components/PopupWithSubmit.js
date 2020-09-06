import { Popup } from "./Popup.js";

export class  PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit()
        });
    }

    handleDeleteCard(handleDelete) {
        this._formSubmit = handleDelete;
    }

    open() {
        super.open();
    }

    close() {
        super.close();
    }
}