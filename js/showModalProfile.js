
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


buttonEditProfile.addEventListener('click', function() {
    showProfile.classList.add('pop-up_opened');
    let profileNameValue = profileName.textContent;
    let profileSpecialtyValue = profileSpecialty.textContent;
    nameInput.value = profileNameValue;
    jobInput.value = profileSpecialtyValue;
});

closeEditProfile.addEventListener('click', function() {
    showProfile.classList.remove('pop-up_opened');
    for(i in inputAllClear) {
        inputAllClear[i].value = '';
    }
});

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    let nameInputResult = nameInput.value;
    let jobInputResult = jobInput.value;

    profileName.textContent = nameInputResult;
    profileSpecialty.textContent = jobInputResult;
}

formElement.addEventListener('submit', formSubmitHandler);

submitCloseModal.addEventListener('click', function() {
    showProfile.classList.remove('pop-up_opened');
 });

