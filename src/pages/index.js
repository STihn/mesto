
import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
import { Api } from '../components/Api.js';
import { renderLoading } from '../utils/utils.js';


const validationConfig = {
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__btnSubmit',
    inactiveButtonClass: 'pop-up__btnSubmit_inactive',
    inputErrorClass: 'pop-up__input_type_error',
    errorClass: 'pop-up__input-error_active'
};
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
const buttonElement = document.querySelector('.pop-up__btnSubmit');
const buttonElementCard = formElementAddCard.querySelector('.pop-up__btnSubmit');
const profileBtnUserpic = document.querySelector('.profile__btnUserpic');
const profileUserpic = document.querySelector('.profile__userpic');
const popUpEditUserpic = document.querySelector('.pop-up_userpic');
const formElementEditUserpic = document.querySelector('.pop-up__form-editUserpic');
const popUptoRemove = document.querySelector('.pop-up_toRemove');
let userId = 0;


const formValidatorEditProfile = new FormValidator(validationConfig, formElement);
formValidatorEditProfile.enableValidation();
const formValidatorAddCard = new FormValidator(validationConfig, formElementAddCard);
formValidatorAddCard.enableValidation();
const formValidatorUserpic = new FormValidator(validationConfig, formElementEditUserpic);
formValidatorUserpic.enableValidation();

const popupWithImage = new PopupWithImage(popUpZoomImg);
popupWithImage.setEventListeners();

const popupWithSubmit = new PopupWithSubmit(popUptoRemove);
popupWithSubmit.setEventListeners();

function handleCardClass(item) {
    const card = new Card( { data: item, handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
        },
        handleDeleteClick: (cardId, element) => {
            popupWithSubmit.handleDeleteCard(cardId, element, api);
        },
        handleLike: (cardId, element) => {
            if(!element.querySelector('.element__btnLike').classList.contains('element__btnLike_active')) {
                api.likeCard(cardId).then((options) => {
                        card.btnLikeCard(element, options);
                    });
            } else {
                api.noLikeCard(cardId).then((options) => {
                    card.btnLikeCard(element, options);
                }); 
            }
        } 
    }, userId, '#card');
    const cardElement = card.generateCard();
    return cardElement;
}

const api = new Api ({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: {
        authorization: '6e586ab2-f36c-4d4a-abc3-ac2332162dcd',
        'content-type': 'application/json'
    }
});

api.getInitialCards().then((data) => {
    const section = new Section( { data, renderer: (item) => {
            section.addItem(handleCardClass(item));
        }
    }, elements);

    section.renderItems();
});

api.getUserProfile()
    .then((data) => {
        userInfo.setUserInfo(data);
        userId = data._id;
    });


const popupAddCard =  new PopupWithForm (popUpEditCard , {handleFormSubmit: (item) => {
        renderLoading(buttonElement, true, 'Сохранение..');

        api.createCard(item).then((item) => {
            elements.prepend(handleCardClass(item));
        })

        renderLoading(buttonElement, false, 'Создать');
    }
});
popupAddCard.setEventListeners();

const userInfo = new UserInfo(profileName, profileSpecialty, profileUserpic);

const popupEditProfile =  new PopupWithForm (popUpEditProfile , {handleFormSubmit: (data) => {
        renderLoading(buttonElement, true, 'Сохранение..');

        api.editProfile(data).then((data) => {
            userInfo.setUserInfo(data);
        });

        renderLoading(buttonElement, false, 'Сохранить');
    }
});
popupEditProfile.setEventListeners();

buttonEditProfile.addEventListener('click', () => {
    popupEditProfile.open();
    const userInputList = userInfo.getUserInfo();
    nameInput.value = userInputList.name;
    jobInput.value = userInputList.about;
    
});

profileAddButton.addEventListener('click', () => {
    popupAddCard.open();
    formElementAddCard.reset();
    formValidatorAddCard.disabledButtonState(buttonElementCard);
});

const avatarPopup = new PopupWithForm(popUpEditUserpic, {handleFormSubmit: (data) => {
        renderLoading(buttonElement, true, 'Сохранение..');
        api.editAvatar(data).then((data) => {
            userInfo.setUserInfo(data);
        });
        renderLoading(buttonElement, false, 'Сохранить');
    }
})
avatarPopup.setEventListeners();

profileBtnUserpic.addEventListener('click', () =>{
    avatarPopup.open();
    formElementEditUserpic.reset();
    formValidatorUserpic.disabledButtonState(buttonElement);
});
