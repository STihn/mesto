
import '../pages/index.css';
import { initialCards } from './initialCards.js';
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import { Section } from './components/Section.js';
import { Popup } from './components/Popup.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
import { buttonEditProfile, popUpEditProfile, popUpEditCard,  
         formElement, formElementAddCard, profileName, profileSpecialty, profileAddButton, 
         elements, buttonElement, showImg, validationConfig } from './constants.js';


const formValidatorEditProfile = new FormValidator(validationConfig, formElement);
formValidatorEditProfile.enableValidation();
const formValidatorAddCard = new FormValidator(validationConfig, formElementAddCard);
formValidatorAddCard.enableValidation();

const section = new Section( { data: initialCards, renderer: (item) => {
    const card = new Card( { data: item, handleCardClick: (name, link) => {
        const popupWithImage = new PopupWithImage(showImg);
        popupWithImage.open(name, link);
        } 
    }, '#card');
    const cardElement = card.generateCard();

    section.addItem(cardElement);
    }
}, elements);

 section.renderItems();

const popupAddCard =  new PopupWithForm (popUpEditCard , {handleFormSubmit: (item) => {
    const card = new Card({ data: item, handleCardClick: (name, link) => {
        const popupWithImage = new PopupWithImage(showImg);
        popupWithImage.open(name, link);
        } 
    }, '#card');
    const cardElement = card.generateCard();

    elements.prepend(cardElement);
    }
})

const popupEditProfile =  new PopupWithForm (popUpEditProfile , {handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    }
});

const userInfo = new UserInfo(profileName, profileSpecialty);


buttonEditProfile.addEventListener('click', () => {
    const popup = new Popup(popUpEditProfile);
    popup.open();
    userInfo.getUserInfo()
    popupEditProfile.setEventListeners();
});

profileAddButton.addEventListener('click', () => {
    const popup = new Popup(popUpEditCard);
    popup.open();
    popupAddCard.setEventListeners();
    formElementAddCard.reset();
    formValidatorAddCard.disabledButtonState(buttonElement);
});