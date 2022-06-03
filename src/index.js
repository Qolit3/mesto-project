//Импорты и переменные

import './index.css';
import { openAdd, add, edit, openEdit } from './components/modal';
import { addForm, cardsContainer, addPlace} from './components/card';
import { enableValidation } from './components/validate';
import { closePopup, openPopup } from './components/util';
import { getProfile, patchAvatar, postCard, patchProfile } from './components/api'

const editForm = document.querySelector('#editForm');
const changeAvatar = document.querySelector('.profile__avatar-change');
const avatarForm = document.querySelector('#avatarForm');

export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');
const avatarLink = document.querySelector('#avatarLink');
const avatarSave = document.querySelector('#avatarSave');

const profileSubmitBtn = document.querySelector('#saveProfile');

export const editName = document.querySelector('#editName');
export const editDescription = document.querySelector('#editDescription');

const changeAvatarPopup = document.querySelector('#avatar');

const addName = document.querySelector('#addName');
const addLink = document.querySelector('#addLink');
const cardSubmitButton = document.querySelector('#saveAdd');

getProfile()
  .then((res) => {
    profileName.textContent = res.name;
    profileDescription.textContent = res.about;
    profileAvatar.src = res.avatar;
    editName.value = profileName.textContent;
    editDescription.value = profileDescription.textContent;
    enableValidation(settings);
})
//Слушатели

openEdit.addEventListener('click', () => {
  
  profileSubmitBtn.textContent = 'Сохранить'
  
  openPopup(edit);
});

profileAvatar.addEventListener('mouseover', () => {
  changeAvatar.classList.add('profile__avatar-change_opened');
});
changeAvatar.addEventListener('mouseout', () => {
  changeAvatar.classList.remove('profile__avatar-change_opened');
});

changeAvatar.addEventListener('click', () => {
  avatarSave.textContent = 'Сохранить'
  openPopup(changeAvatarPopup);
})

avatarForm.addEventListener('submit',(evt) => {
  evt.preventDefault();
  avatarSave.disabled = true;
  avatarSave.textContent = 'Сохранение...';
  console.log(avatarLink.value);
  patchAvatar()
    .then((res) => {
      profileAvatar.src = res.avatar;
    })
    .then(() => {
      closePopup(changeAvatarPopup);
      evt.target.reset();  
    })
    .catch((res) => alert(`Не удалось загрузить аватар: ${res}`))
    .finally(() => avatarSave.textContent = 'Готово') 
});

editForm.addEventListener('submit', submitFormEdit);

const closeButtons = document.querySelectorAll('.popup__close-image');
closeButtons.forEach((ele) => {
  const popup = ele.closest('.popup');
  ele.addEventListener('click', () => closePopup(popup));
})

addForm.addEventListener('submit', function(evt) {
  evt.preventDefault();  
  cardSubmitButton.disabled = true;
  cardSubmitButton.textContent = 'Создание...';
  

  Promise.all([getProfile(), postCard(addName, addLink)])
    .then(([getedProfile, postedCard]) => {
      cardsContainer.prepend(addPlace(postedCard, getedProfile));  
      closePopup(add);
      addForm.reset();
    })
    .catch((res) => alert(`Не удалось загрузить пост: ${res}`))
    .finally(() => cardSubmitButton.textContent = 'Готово')
});

openAdd.addEventListener('click', () => {
  cardSubmitButton.textContent = 'Создать'
  cardSubmitButton.classList.add('popup__save_inactive');
  openPopup(add);
});

//сохранение формы

function submitFormEdit (evt) {
    evt.preventDefault();
    profileSubmitBtn.disabled = true;
    profileSubmitBtn.textContent = 'Сохранение...';
    profileName.textContent = editName.value;
    profileDescription.textContent = editDescription.value;
    
   
    patchProfile(editName, editDescription)
      .then((res) => {
        profileName.textContent = res.name;
        profileDescription.textContent = res.about;       
      })
      .then(() => {
        closePopup(edit);
        editName.value = profileName.textContent;
        editDescription.value = profileDescription.textContent;
      })
      .catch((res) => alert(`Не удалось обновить профиль: ${res}`))
      .finally(() => profileSubmitBtn.textContent = 'Готово')
}

//Валидация форм
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_er',
  errorClass: 'popup__validate_active'
}