
import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


const buttonEditProfile = document.querySelector('.profile__editButton');
const allPopUp = Array.from(document.querySelectorAll('.pop-up'));
const popUpEditProfile = document.querySelector('.pop-up_editProfile');
const btnCloseProfile = popUpEditProfile.querySelector('.pop-up__btnClose');
const popUpEditCard = document.querySelector('.pop-up_addCard');
const btnCloseCard = popUpEditCard.querySelector('.pop-up__btnClose');
const formElement = popUpEditProfile.querySelector('.pop-up__form_editProfile');
const formElementAddCard = popUpEditCard.querySelector('.pop-up__form-addCard');
const nameInput = document.querySelector('.pop-up__input_name');
const jobInput = document.querySelector('.pop-up__input_specialty');
const profileName = document.querySelector('.profile__name');
const profileSpecialty = document.querySelector('.profile__specialty');
const profileAddButton = document.querySelector('.profile__addButton');
const elements = document.querySelector('.elements');
export const showImg = document.querySelector('.pop-up_img');
const btnCloseImage = showImg.querySelector('.pop-up__btnClose');
export const getPathImg = document.querySelector('.pop-up__image');
export const getNameImg = document.querySelector('.pop-up__preview');
const cardCaption = document.querySelector('.pop-up__input_caption');
const cardImage = document.querySelector('.pop-up__input_image');
const buttonElement = formElementAddCard.querySelector('.pop-up__btnSubmit');
const validationConfig = {
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__btnSubmit',
    inactiveButtonClass: 'pop-up__btnSubmit_inactive',
    inputErrorClass: 'pop-up__input_type_error',
    errorClass: 'pop-up__input-error_active'
};


const formValidator = new FormValidator(validationConfig,'.pop-up__form');
formValidator.enableValidation();

// Перебор массива и добавление карточек
initialCards.forEach(function(item) {
    const card = new Card(item, '#card');
    const cardElement = card.generateCard();

    elements.append(cardElement);
})
// Функция открытия модального окна(редактирование профиля) и установка слушателя при нажатии на escape
function modalWindowEditProfile() {
    openPopup(popUpEditProfile);
    setProfileValues();
}
// Функция открытия модального окна добавление карточек, очистка полей и установка слушателя при нажатии на escape
function modalWindowAddCard() {
    openPopup(popUpEditCard);
    formElementAddCard.reset();
    
    formValidator.disabledButtonState(buttonElement);
}
// Функция открытия модальных окн
export function openPopup(popup) {
    popup.classList.add('pop-up_opened');
    document.addEventListener('keydown', escClousePopup);
}
// Функция закрытия модальных окн
function closePopup(popup) {
    popup.classList.remove('pop-up_opened');
    document.removeEventListener('keydown', escClousePopup);
}
// Функция закрытия модального окна при нажатие кнопки escape
function escClousePopup(evt) {
    if(evt.key === 'Escape'){
        closePopup(document.querySelector('.pop-up_opened'));
    } 
}
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
}
// Функция при клике по кнопке сохранить(сабмит),добавляет карточку в начало , форма "новое место"
function formSubmitAddCard(evt) {
    evt.preventDefault();
    
    const item = {
        name: cardCaption.value,
        link: cardImage.value
    };
    const card = new Card(item, '#card');
    const cardElement = card.generateCard();

    elements.prepend(cardElement);

    closePopup(popUpEditCard);
}

formElement.addEventListener('submit', formSubmitHandler);
formElementAddCard.addEventListener('submit', formSubmitAddCard);

btnCloseImage.addEventListener('click', () => closePopup(showImg));

// Функция закрытия модального окна при клике по фону
allPopUp.forEach(function(popUp) {
    popUp.addEventListener('click', function(evt) {
        if(evt.target.classList.contains('pop-up')) closePopup(popUp);
    })
})
