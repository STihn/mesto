
const buttonEditProfile = document.querySelector('.profile__editButton');
const showProfile = document.querySelector('.pop-up');
const closeEditProfile = document.querySelectorAll('.pop-up__btnClose');
const inputAllClear = document.querySelectorAll('.pop-up__input');
const formElement = document.querySelector('.pop-up__form');
const nameInput = formElement.querySelector('.pop-up__input_name');
const jobInput = formElement.querySelector('.pop-up__input_specialty');
const profileName = document.querySelector('.profile__name');
const profileSpecialty = document.querySelector('.profile__specialty');
const submitCloseModal = document.querySelector('.pop-up__btnSubmit');
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

function addCard() {
    
    initialCards.forEach(function(item) {
        cardCaption.value = item.name;
        cardImage.value = item.link;
        
        const cardTemplate = document.querySelector('#card').content;
        const cardElement = cardTemplate.cloneNode(true);
        let cardContainer = document.querySelector('.elements');
        cardElement.querySelector('.element__text').textContent = cardCaption.value;
        cardElement.querySelector('.element__image').src = cardImage.value;
        cardElement.querySelector('.element__image').alt = cardCaption.value;
        cardContainer.append(cardElement);
    });
};
addCard();

function editProfile() {
    showProfile.classList.add('pop-up_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileSpecialty.textContent;
};

function clouseProfile(event) {
    let target = event.target;
    if(target.getAttribute('name') == 'closeEditProfile'){
        showProfile.classList.remove('pop-up_opened');
    }
    else if (target.getAttribute('name') == 'closeImage') {
        showImg.classList.remove('pop-up_opened');
    }
    else {
        showEditCard.classList.remove('pop-up_opened');
    };

    for(i in inputAllClear) {
        inputAllClear[i].value = '';
    };
};

function showModalWindowAddCard() {
    showEditCard.classList.add('pop-up_opened');
     for(i in inputAllClear) {
        inputAllClear[i].value = '';
    }
};

buttonEditProfile.addEventListener('click', editProfile);
closeEditProfile[0].addEventListener('click', clouseProfile);
closeEditProfile[1].addEventListener('click', clouseProfile);
closeEditProfile[2].addEventListener('click', clouseProfile);
profileAddButton.addEventListener('click', showModalWindowAddCard);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    
    profileName.textContent = nameInput.value;
    profileSpecialty.textContent = jobInput.value;
};

function formSubmitAddCard (evt) {
    evt.preventDefault(); 

    addCardClickSubmitForm (cardCaption.value, cardImage.value);
};

formElement.addEventListener('submit', formSubmitHandler);
formElementAddCard.addEventListener('submit', formSubmitAddCard);

function submitCloseModalWindow() {
    showProfile.classList.remove('pop-up_opened');
};

function submitCloseModalWindowAddCard() {
    showEditCard.classList.remove('pop-up_opened');
}

submitCloseModal.addEventListener('click', submitCloseModalWindow);
formElementAddCard.lastElementChild.addEventListener('click',  submitCloseModalWindowAddCard);

function addCardClickSubmitForm (cardCaptionValue, cardImageValue) {

    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.cloneNode(true);
    let cardContainer = document.querySelector('.elements');
    cardElement.querySelector('.element__text').textContent = cardCaption.value;
    cardElement.querySelector('.element__image').src = cardImage.value;
    cardElement.querySelector('.element__image').alt = cardCaption.value;
    cardContainer.prepend(cardElement);
}

elements.addEventListener('click', function (event) {
    let target = event.target;
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
