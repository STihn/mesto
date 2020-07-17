
const buttonEditProfile = document.querySelector('.profile__editButton');
const allPopUp = Array.from(document.querySelectorAll('.pop-up'));
const popUpEditProfile = document.querySelector('.pop-up_editProfile');
const btnCloseProfile = popUpEditProfile.querySelector('.pop-up__btnClose');
const popUpEditCard = document.querySelector('.pop-up_addCard');
const btnCloseCard = popUpEditCard.querySelector('.pop-up__btnClose');
const formElement = popUpEditProfile.querySelector('.pop-up__form_editProfile');
const formElementAddCard = popUpEditCard.querySelector('.pop-up__form-addCard');
const allInputCard = Array.from(formElementAddCard.querySelectorAll('.pop-up__input'));
const nameInput = document.querySelector('.pop-up__input_name');
const jobInput = document.querySelector('.pop-up__input_specialty');
const profileName = document.querySelector('.profile__name');
const profileSpecialty = document.querySelector('.profile__specialty');
const profileAddButton = document.querySelector('.profile__addButton');
const cardCaption = document.querySelector('.pop-up__input_caption');
const cardImage = document.querySelector('.pop-up__input_image');
const elements = document.querySelector('.elements');
const showImg = document.querySelector('.pop-up_img');
const btnCloseImage = showImg.querySelector('.pop-up__btnClose');


function getCard(name, link) {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.element__text').textContent = name;
    cardElement.querySelector('.element__image').src = link;

    if(link == ''){
        cardElement.querySelector('.element__image').alt = 'Картинка не загрузилась';
    } else {
        cardElement.querySelector('.element__image').alt = name;
    }
    return cardElement;
};
// Функция добавления карточек
function renderCard(card, elements) {
    elements.append(card);
};
// Перебор массива с карточками
initialCards.forEach(function(item) {

    renderCard(getCard(item.name, item.link), elements)
});
// Функция открытия модального окна(редактирование профиля) и установка слушателя при нажатии на escape
function modalWindowEditProfile() {
    openPopup(popUpEditProfile);
    setProfileValues();
};
// Функция открытия модального окна добавление карточек, очистка полей и установка слушателя при нажатии на escape
function modalWindowAddCard() {
    openPopup(popUpEditCard);

    for(i in allInputCard) {
        allInputCard[i].value = '';
    }

    const buttonElement = formElementAddCard.querySelector('.pop-up__btnSubmit');
    buttonElement.classList.add('pop-up__btnSubmit_inactive');
    buttonElement.setAttribute('disabled', true);
};
// Функция открытия модальных окн
function openPopup(popup) {
    popup.classList.add('pop-up_opened');
    document.addEventListener('keydown', escClousePopup);
};
// Функция закрытия модальных окн
function closePopup(popup) {
    popup.classList.remove('pop-up_opened');
    document.removeEventListener('keydown', escClousePopup);
};
// Функция закрытия модального окна при нажатие кнопки escape
function escClousePopup(evt) {
    if(evt.key === 'Escape'){
        closePopup(document.querySelector('.pop-up_opened'));
    } 
};
// Функцция устанавливает значение полей 
function setProfileValues() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileSpecialty.textContent;
}

buttonEditProfile.addEventListener('click', modalWindowEditProfile);
profileAddButton.addEventListener('click', modalWindowAddCard);
btnCloseProfile.addEventListener('click', () => closePopup(popUpEditProfile));
btnCloseCard.addEventListener('click', () => closePopup(popUpEditCard));

// Функция при клике по кнопке сохранить(сабмит),получает значение полей формы "редактировать профиль"
function formSubmitHandler(evt) {
    evt.preventDefault(); 
    
    profileName.textContent = nameInput.value;
    profileSpecialty.textContent = jobInput.value;

    closePopup(popUpEditProfile);
};
// Функция при клике по кнопке сохранить(сабмит),добавляет карточку в начало , форма "новое место"
function formSubmitAddCard(evt) {
    evt.preventDefault(); 

    elements.prepend(getCard(cardCaption.value, cardImage.value));
    closePopup(popUpEditCard);
};

formElement.addEventListener('submit', formSubmitHandler);
formElementAddCard.addEventListener('submit', formSubmitAddCard);

 
elements.addEventListener('click', function (event) {
    const target = event.target;
    if (target.getAttribute('name') == 'btnLike') {
        btnLikeCard(target);
    }
    else if (target.getAttribute('name') == 'btnDelete') {
        deleteCard(target);
    }
    else if (target.tagName == 'IMG') {
        zoomImg(target)
    }
  });
// Функция - лайк при клике по сердцу
function btnLikeCard(target) {
    target.classList.toggle('element__btnLike_active');
};
// Функция удаление карточки
function deleteCard(target) {
    target.parentNode.remove();
};
// Функция увелечение изображения у карточки
function zoomImg(target) {
    openPopup(showImg);
    const getPathImg = document.querySelector('.pop-up__image');
    const getNameImg = document.querySelector('.pop-up__preview');
    getPathImg.setAttribute('src', target.getAttribute('src'));
    getNameImg.textContent = target.getAttribute('alt');
};
// Функция закрытия модального окна увеличенного изображения
function closeImage() {
    closePopup(document.querySelector('.pop-up_opened'));
};

btnCloseImage.addEventListener('click', closeImage);

// Функция закрытия модального окна при клике по фону
allPopUp.forEach(function(popUp) {
    popUp.addEventListener('click', function(evt) {
        if(evt.target.classList.contains('pop-up')) closePopup(popUp);
    });
});
