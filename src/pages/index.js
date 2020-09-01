
import './index.css';
import { initialCards } from '../utils/initialCards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';


const buttonEditProfile = document.querySelector('.profile__editButton');
const popUpEditProfile = document.querySelector('.pop-up_editProfile');
const popUpEditCard = document.querySelector('.pop-up_addCard');
const formElement = popUpEditProfile.querySelector('.pop-up__form_editProfile');
const formElementAddCard = popUpEditCard.querySelector('.pop-up__form-addCard');
const nameInput = document.querySelector('.pop-up__input_name');
const jobInput = document.querySelector('.pop-up__input_specialty');
const profileName = document.querySelector('.profile__name');
const profileSpecialty = document.querySelector('.profile__specialty');
const profileAddButton = document.querySelector('.profile__addButton');
const elements = document.querySelector('.elements');
const popUpZoomImg = document.querySelector('.pop-up_img');
export const pathImg = document.querySelector('.pop-up__image');
export const nameImg = document.querySelector('.pop-up__preview');
const buttonElement = formElementAddCard.querySelector('.pop-up__btnSubmit');
const validationConfig = {
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__btnSubmit',
    inactiveButtonClass: 'pop-up__btnSubmit_inactive',
    inputErrorClass: 'pop-up__input_type_error',
    errorClass: 'pop-up__input-error_active'
};

const formValidatorEditProfile = new FormValidator(validationConfig, formElement);
formValidatorEditProfile.enableValidation();
const formValidatorAddCard = new FormValidator(validationConfig, formElementAddCard);
formValidatorAddCard.enableValidation();

const popupWithImage = new PopupWithImage(popUpZoomImg);
popupWithImage.setEventListeners();

function handleCardClass(item) {
    const card = new Card( { data: item, handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
        } 
    }, '#card');
    const cardElement = card.generateCard();
    return cardElement;
}

const section = new Section( { data: initialCards, renderer: (item) => {
        section.addItem(handleCardClass(item));
    }
}, elements);

 section.renderItems();

const popupAddCard =  new PopupWithForm (popUpEditCard , {handleFormSubmit: (item) => {
        elements.prepend(handleCardClass(item));
    }
});
popupAddCard.setEventListeners();

const userInfo = new UserInfo(profileName, profileSpecialty);

const popupEditProfile =  new PopupWithForm (popUpEditProfile , {handleFormSubmit: (data) => {
        userInfo.setUserInfo(data);
    }
});
popupEditProfile.setEventListeners();

buttonEditProfile.addEventListener('click', () => {
    popupEditProfile.open();
    const userInputList = userInfo.getUserInfo();
    nameInput.value = userInputList.name;
    jobInput.value = userInputList.job;
});

profileAddButton.addEventListener('click', () => {
    popupAddCard.open();
    formElementAddCard.reset();
    formValidatorAddCard.disabledButtonState(buttonElement);
});