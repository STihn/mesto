
 export class Card {
    constructor(data, selector) {
        this._name = data.name;
        this._link = data.link;
        this._selector = selector;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._selector).content
        .querySelector('.element')
        .cloneNode(true);
        
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__text').textContent = this._name;
        this._element.querySelector('.element__image').src = this._link;

        if(this._link == ''){
            this._element.querySelector('.element__image').alt = 'Картинка не загрузилась';
        } else {
            this._element.querySelector('.element__image').alt = this._name;
        }

        return this._element;
    }
    
    _btnLikeCard() {
        this.classList.toggle('element__btnLike_active');
    };

    _deleteCard() {
        this.parentNode.remove();
    };

    _zoomImg() {
        openPopup(showImg);
        getPathImg.setAttribute('src', this.getAttribute('src'));
        getNameImg.textContent = this.getAttribute('alt');
    };

    _setEventListeners() {
        this._element.querySelector('.element__btnLike').addEventListener('click', this._btnLikeCard);
        this._element.querySelector('.element__btnDelete').addEventListener('click', this._deleteCard);
        this._element.querySelector('.element__image').addEventListener('click', this._zoomImg);
    };
    
}