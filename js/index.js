
const buttonEditProfile = document.querySelector('.profile__editButton');
const popUp = document.querySelector('.pop-up');
const allPopUp = Array.from(document.querySelectorAll('.pop-up'));
const popUpEditProfile = document.querySelector('.pop-up_editProfile');
const btnCloseProfile = popUpEditProfile.querySelector('.pop-up__btnClose');
const allCloseModalWindow = Array.from(document.querySelectorAll('.pop-up__btnClose'));
const popUpEditCard = document.querySelector('.pop-up_addCard');
const btnCloseCard = popUpEditCard.querySelector('.pop-up__btnClose');
const formElement = popUpEditProfile.querySelector('.pop-up__form_editProfile');
const formElementAddCard = popUpEditCard.querySelector('.pop-up__form-addCard');
const allInputCard = Array.from(formElementAddCard.querySelectorAll('.pop-up__input'));
const nameInput = document.querySelector('.pop-up__input_name');
const jobInput = document.querySelector('.pop-up__input_specialty');
const profileName = document.querySelector('.profile__name');
const profileSpecialty = document.querySelector('.profile__specialty');
const allBtnSubmit = Array.from(document.querySelectorAll('.pop-up__btnSubmit'));
const profileAddButton = document.querySelector('.profile__addButton');
const cardCaption = document.querySelector('.pop-up__input_caption');
const cardImage = document.querySelector('.pop-up__input_image');
const elements = document.querySelector('.elements');
const showImg = document.querySelector('.pop-up_img');


function getCard(cardCaption, cardImage) {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.element__text').textContent = cardCaption;
    cardElement.querySelector('.element__image').src = cardImage;

    if(cardImage == ''){
        cardElement.querySelector('.element__image').alt = 'Картинка не загрузилась';
    } else {
        cardElement.querySelector('.element__image').alt = cardCaption;
    }
    return cardElement;
};
// Функция добавления карточек
function renderCard(card, elements) {
    elements.append(card);
};
// Перебор массива с карточками
initialCards.forEach(function(item) {
    cardCaption.value = item.name;
    cardImage.value = item.link;

    renderCard(getCard(cardCaption.value, cardImage.value), elements);
});
// Функция открытия модального окна(редактирование профиля) и установка слушателя при нажатии на escape
function ModalWindowEditProfile() {
    togglePopUp(popUpEditProfile);
    setFieldsValue();
    document.addEventListener('keydown', escClouseProfile);
};
// функция открытия модального окна добавление карточек, очистка полей и установка слушателя при нажатии на escape
function ModalWindowAddCard() {
    togglePopUp(popUpEditCard);

    for(i in allInputCard) {
        allInputCard[i].value = '';
    }

    const buttonElement = formElementAddCard.querySelector('.pop-up__btnSubmit');
    buttonElement.classList.add('pop-up__btnSubmit_inactive');
    buttonElement.setAttribute('disabled', true);
    
    document.addEventListener('keydown', escClouseCard);
};
// функция открытии/закрытия модального окна
function togglePopUp(popup) {
    popup.classList.toggle('pop-up_opened');
};
// функция закрытия модального окна при нажатие кнопки escape
function escClouseProfile(evt) {
    if(evt.key === 'Escape'){
        togglePopUp(popUpEditProfile);
        document.removeEventListener('keydown', escClouseProfile);
    } 
};

function escClouseCard(evt) {
    if(evt.key === 'Escape'){
        togglePopUp(popUpEditCard);
        document.removeEventListener('keydown', escClouseCard);
    } 
};
// 
function setFieldsValue() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileSpecialty.textContent;
}

buttonEditProfile.addEventListener('click', ModalWindowEditProfile);
profileAddButton.addEventListener('click', ModalWindowAddCard);
btnCloseProfile.addEventListener('click', () => togglePopUp(popUpEditProfile));
btnCloseCard.addEventListener('click', () => togglePopUp(popUpEditCard));


function formSubmitHandler(evt) {
    evt.preventDefault(); 
    
    profileName.textContent = nameInput.value;
    profileSpecialty.textContent = jobInput.value;

    togglePopUp(popUpEditProfile);
};

function formSubmitAddCard(evt) {
    evt.preventDefault(); 

    elements.prepend(getCard(cardCaption.value, cardImage.value));
    togglePopUp(popUpEditCard);
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

function btnLikeCard(target) {
    target.classList.toggle('element__btnLike_active');
};

function deleteCard(target) {
    target.parentNode.remove();
};

function zoomImg(target) {
    showImg.classList.add('pop-up_opened');
    const getPathImg = document.querySelector('.pop-up__image');
    const getNameImg = document.querySelector('.pop-up__preview');
    getPathImg.setAttribute('src', target.getAttribute('src'));
    getNameImg.textContent = target.getAttribute('alt');
};

allPopUp.forEach(function(popUp) {
    popUp.addEventListener('click', function(evt) {
        if(evt.target.classList.contains('pop-up')) popUp.classList.remove('pop-up_opened');
    });
});
