
const buttonEditProfile = document.querySelector('.profile__editButton');
const popUp = document.querySelector('.pop-up');
const allPopUp = Array.from(document.querySelectorAll('.pop-up'));
const allCloseModalWindow = Array.from(document.querySelectorAll('.pop-up__btnClose'));
const allInput =  Array.from(document.querySelectorAll('.pop-up__input'));
const formElement = document.querySelector('.pop-up__form');
const nameInput = formElement.querySelector('.pop-up__input_name');
const jobInput = formElement.querySelector('.pop-up__input_specialty');
const profileName = document.querySelector('.profile__name');
const profileSpecialty = document.querySelector('.profile__specialty');
const allBtnSubmit = Array.from(document.querySelectorAll('.pop-up__btnSubmit'));
const profileAddButton = document.querySelector('.profile__addButton');
const showEditCard = document.querySelector('.pop-up_addCard');
const formElementAddCard = document.querySelector('.pop-up__form-addCard');
const cardCaption = document.querySelector('.pop-up__input_caption');
const cardImage = document.querySelector('.pop-up__input_image');
const elements = document.querySelector('.elements');
const showImg = document.querySelector('.pop-up_img');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://code.s3.yandex.net/web-code/gallery-river.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

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

function renderCard(card) {
    elements.append(card);
};

initialCards.forEach(function(item) {
    cardCaption.value = item.name;
    cardImage.value = item.link;
    renderCard(getCard(cardCaption.value, cardImage.value));
});

function editProfile() {
    popUp.classList.add('pop-up_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileSpecialty.textContent;
    enableValidation(obj);
};

function showModalWindowAddCard() {
    showEditCard.classList.add('pop-up_opened');
     for(i in allInput) {
        allInput[i].value = '';
    }
    enableValidation(obj);
};

buttonEditProfile.addEventListener('click', editProfile);
profileAddButton.addEventListener('click', showModalWindowAddCard);

allCloseModalWindow.forEach(function(btnClose) {
    btnClose.addEventListener('click', function(evt) {
        if(evt.target.classList.contains('pop-up__btnClose')) {
            allPopUp.forEach(function (popUp) {
                popUp.classList.remove('pop-up_opened');
            });
        }
        for(i in allInput) {
            allInput[i].value = '';
        };
    });
});

function formSubmitHandler(evt) {
    evt.preventDefault(); 
    
    profileName.textContent = nameInput.value;
    profileSpecialty.textContent = jobInput.value;
};

function formSubmitAddCard(evt) {
    evt.preventDefault(); 

    elements.prepend(getCard(cardCaption.value, cardImage.value));
};

formElement.addEventListener('submit', formSubmitHandler);
formElementAddCard.addEventListener('submit', formSubmitAddCard);

allBtnSubmit.forEach(function(btnSubmit) {
    btnSubmit.addEventListener('click', function(evt) {
        if(evt.target.classList.contains('pop-up__btnSubmit')) {
            allPopUp.forEach(function (popUp) {
                popUp.classList.remove('pop-up_opened');
            });
        }
    });
});

elements.addEventListener('click', function (event) {
    const target = event.target;
    if (target.getAttribute('name') == 'btnLike') {
        target.classList.toggle('element__btnLike_active');
    }
    else if (target.getAttribute('name') == 'btnDelete') {
        target.parentNode.remove();
    }
    else if (target.tagName == 'IMG') {
        showImg.classList.add('pop-up_opened');
        const getPathImg = document.querySelector('.pop-up__image');
        const getNameImg = document.querySelector('.pop-up__preview');
        getPathImg.setAttribute('src', target.getAttribute('src'));
        getNameImg.textContent = target.getAttribute('alt');
    }
  });

allPopUp.forEach(function(popUp) {
    popUp.addEventListener('click', function(evt) {
        if(evt.target.classList.contains('pop-up')) popUp.classList.remove('pop-up_opened');
    });
    document.addEventListener('keydown', function(evt) {
        if(evt.key === 'Escape') popUp.classList.remove('pop-up_opened');
    });
});
