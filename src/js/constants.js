
export const buttonEditProfile = document.querySelector('.profile__editButton');
export const popUpEditProfile = document.querySelector('.pop-up_editProfile');
export const popUpEditCard = document.querySelector('.pop-up_addCard');
export const formElement = popUpEditProfile.querySelector('.pop-up__form_editProfile');
export const formElementAddCard = popUpEditCard.querySelector('.pop-up__form-addCard');
export const nameInput = document.querySelector('.pop-up__input_name');
export const jobInput = document.querySelector('.pop-up__input_specialty');
export const profileName = document.querySelector('.profile__name');
export const profileSpecialty = document.querySelector('.profile__specialty');
export const profileAddButton = document.querySelector('.profile__addButton');
export const elements = document.querySelector('.elements');
export const showImg = document.querySelector('.pop-up_img');
export const getPathImg = document.querySelector('.pop-up__image');
export const getNameImg = document.querySelector('.pop-up__preview');
export const buttonElement = formElementAddCard.querySelector('.pop-up__btnSubmit');
export const validationConfig = {
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__btnSubmit',
    inactiveButtonClass: 'pop-up__btnSubmit_inactive',
    inputErrorClass: 'pop-up__input_type_error',
    errorClass: 'pop-up__input-error_active'
};