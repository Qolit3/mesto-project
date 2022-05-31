//Импорты и переменные

import './index.css';
import { openAdd, add, edit, openEdit } from './components/modal';
import {addFirstPlaces ,addForm, cardsContainer, addPlace} from './components/card';
import {enableValidation} from './components/validate';
import { closePopup, openPopup } from './components/util';

const editForm = document.querySelector('#editForm');

export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');

export const editName = document.querySelector('#editName');
export const editDescription = document.querySelector('#editDescription');

const addName = document.querySelector('#addName');
const addLink = document.querySelector('#addLink');
const cardSubmitButton = document.querySelector('#saveAdd');

//Слушатели

editForm.addEventListener('submit', submitFormEdit);

openEdit.addEventListener('click', () => {
  editName.value = profileName.textContent;
  editDescription.value = profileDescription.textContent;
  openPopup(edit);
});

const closeButtons = document.querySelectorAll('.popup__close-image');
closeButtons.forEach((ele) => {
  const popup = ele.closest('.popup'); //Спасибо за совет!
  ele.addEventListener('click', () => closePopup(popup));
})

addForm.addEventListener('submit', function(evt) {
  evt.preventDefault();  

  cardsContainer.prepend(addPlace(addName.value, addLink.value));
  closePopup(add);
  evt.target.reset();
  
  ыButton.disabled = true;
  cardSubmitButton.classList.add('popup__save_inactive');

});

openAdd.addEventListener('click', () => openPopup(add));

//сохранение формы

addFirstPlaces();

function submitFormEdit (evt) {
    evt.preventDefault();
    
    profileName.textContent = editName.value;
    profileDescription.textContent = editDescription.value;   
    closePopup(edit) 
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