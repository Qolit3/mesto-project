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

getProfile(profileAvatar, profileName, profileDescription);
//Слушатели

openEdit.addEventListener('click', () => {
  editName.value = profileName.textContent;
  editDescription.value = profileDescription.textContent;
  profileSubmitBtn.textContent = 'Сохранить';
  enableValidation(settings);
  openPopup(edit);
});

profileAvatar.addEventListener('mouseover', () => {
  changeAvatar.classList.add('profile__avatar-change_opened');
});
changeAvatar.addEventListener('mouseout', () => {
  changeAvatar.classList.remove('profile__avatar-change_opened');
});

changeAvatar.addEventListener('click', () => {
  avatarSave.textContent = 'Сохранить';
  openPopup(changeAvatarPopup);
})

avatarForm.addEventListener('submit',(evt) => {
  evt.preventDefault();
  avatarSave.textContent = 'Сохранение...';
  console.log(avatarLink.value);
  patchAvatar(evt, avatarLink, profileAvatar, avatarSave, closePopup, changeAvatarPopup);  
});

editForm.addEventListener('submit', submitFormEdit);

const closeButtons = document.querySelectorAll('.popup__close-image');
closeButtons.forEach((ele) => {
  const popup = ele.closest('.popup');
  ele.addEventListener('click', () => closePopup(popup));
})

addForm.addEventListener('submit', function(evt) {
  evt.preventDefault();  
  cardSubmitButton.textContent = 'Создание...';
  let cardInfo = {};  

  postCard(evt, cardInfo, addName, addLink, cardSubmitButton, cardsContainer, addPlace, closePopup, add);
});

openAdd.addEventListener('click', () => {
  cardSubmitButton.textContent = 'Создать'
  cardSubmitButton.classList.add('popup__save_inactive');
  openPopup(add);
});

//сохранение формы

function submitFormEdit (evt) {
    evt.preventDefault();
    profileSubmitBtn.textContent = 'Сохранение...';
    profileName.textContent = editName.value;
    profileDescription.textContent = editDescription.value;
    
   
    patchProfile(editName, editDescription, profileName, profileDescription, profileSubmitBtn, closePopup, edit);
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


enableValidation(settings);