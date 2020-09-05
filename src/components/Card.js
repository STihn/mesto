
export class Card {
    constructor({ data, handleCardClick, handleLike, handleDeleteClick},userId, selector) {
        this._name = data.name;
        this._link = data.link;
        this._like = data.likes;
        this._cardId = data._id;
        this._myId = userId;
        this._ownerId = data.owner._id;
        this._handleCardClick = handleCardClick;
        this._handleLike = handleLike;
        this._handleDeleteClick = handleDeleteClick;
        this._selector = selector;
    }
    
    // метод создания новый карточки
    _getTemplate() {
        const cardElement = document.querySelector(this._selector).content
        .querySelector('.element')
        .cloneNode(true);
        
        return cardElement;
    }
    // метод наполняет новую карточку информацией,вызывает метод установки слушателей на элементы
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__text').textContent = this._name;
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__countLike').textContent = this._like.length;

        if(this._link === ''){
            this._element.querySelector('.element__image').alt = 'Картинка не загрузилась';
        } else {
            this._element.querySelector('.element__image').alt = this._name;
        }
        
        this._like.some(item => {
            if (item._id === this._myId) {
                this._element.querySelector('.element__btnLike').classList.add('element__btnLike_active');
            }
        });

        if(this._ownerId !== this._myId) {
            this._element.querySelector('.element__btnDelete').setAttribute('style', 'display: none');
        }

        return this._element;
    }
    // метод меняет состаяния кнопки "Like"
    btnLikeCard(element, options) {
        element.querySelector('.element__btnLike').classList.toggle('element__btnLike_active');
        element.querySelector('.element__countLike').textContent = options.likes.length;
        
    }
    // метод установки слушателей на кнопки "like",удаление карточки и увелечение изображения у карточки 
    _setEventListeners() {
        this._element.querySelector('.element__btnLike').addEventListener('click', () => {
            this._handleLike(this._cardId, this._element)
        });
        this._element.querySelector('.element__btnDelete').addEventListener('click', () => {
            this._handleDeleteClick(this._cardId, this._element)
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }
}