//Импорты и переменные

import './index.css';
import { image, closeImage, openAdd, closeAdd, add, edit, openEdit, closeEdit } from './components/modal';
import {addForm, cardsContainer, addPlace, firstPlaces} from './components/card';
import {validateAllforms} from './components/validate';
import { popupClose, popupOpen } from './components/util';

const editForm = document.querySelector('#editForm');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let editName = document.querySelector('#editName');
let editDescription = document.querySelector('#editDescription');

//Слушатели

editForm.addEventListener('submit', submitFormEdit);
editForm.addEventListener('submit', () => popupClose(edit));

openEdit.addEventListener('click', () => popupOpen(edit));
closeEdit.addEventListener('click', () => popupClose(edit));

addForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const addName = document.querySelector('#addName');
  const addLink = document.querySelector('#addLink');

  

  cardsContainer.prepend(addPlace(addName.value, addLink.value));
  
  addName.value = '';
  addLink.value = '';
});

addForm.addEventListener('submit', () => popupClose(add));

openAdd.addEventListener('click', () => popupOpen(add));
closeAdd.addEventListener('click', () => popupClose(add));

closeImage.addEventListener('click', () => popupClose(image));

//сохранение формы

function submitFormEdit (evt) {
    evt.preventDefault();
    () => console.log(1);
    const nameChange = editName.value;
    const descriptionChange = editDescription.value;
    
    profileName.textContent = nameChange;
    profileDescription.textContent = descriptionChange;    
}

//карточки

firstPlaces();

//Валидация форм

validateAllforms({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_er',
  errorClass: 'popup__validate_active'
});