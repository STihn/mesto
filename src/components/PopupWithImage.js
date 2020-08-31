import { pathImg, nameImg } from '../pages/index.js';
import { Popup } from './Popup.js';


export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    // метод увелечение изображения карточки
    open(name, link) {
        pathImg.src = link;
        nameImg.textContent = name;
        super.open();
    }
}