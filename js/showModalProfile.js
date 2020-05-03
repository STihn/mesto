
const buttonEditProfile = document.querySelector('.profile__editButton');
const showProfile = document.querySelector('.pop-up');
const closeEditProfile = document.querySelector('.pop-up__btnClose');
const inputAllClear = document.querySelectorAll('.pop-up__input');
const formElement = document.querySelector('.pop-up__form');
const nameInput = formElement.querySelector('.pop-up__input_name');
const jobInput = formElement.querySelector('.pop-up__input_specialty');
const profileName = document.querySelector('.profile__name');
const profileSpecialty = document.querySelector('.profile__specialty');
const submitCloseModal = document.querySelector('.pop-up__btnSubmit');

function editProfile() {
    showProfile.classList.add('pop-up_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileSpecialty.textContent;
};

function clouseProfile() {
    showProfile.classList.remove('pop-up_opened');
    for(i in inputAllClear) {
        inputAllClear[i].value = '';
    }
};

buttonEditProfile.addEventListener('click', editProfile);
closeEditProfile.addEventListener('click', clouseProfile);

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileSpecialty.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);

function submitCloseModalWindow() {
    showProfile.classList.remove('pop-up_opened');
 };

submitCloseModal.addEventListener('click', submitCloseModalWindow);

