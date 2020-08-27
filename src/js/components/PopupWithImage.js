import { getPathImg, getNameImg } from '../constants.js';
import { Popup } from './Popup.js';


export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    // метод увелечение изображения карточки
    open(name, link) {
        getPathImg.src = link;
        getNameImg.textContent = name;
        super.open();
        super.setEventListeners();
    }
}