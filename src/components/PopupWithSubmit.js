import { Popup } from "./Popup.js";

export class  PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            super.close(); 
        });
    }
    
    handleDeleteCard(cardId, element, api) {
        super.open();
        api.deleteCard(cardId).then(() => {
            element.remove();
        });
        super.close(); 
    }
}