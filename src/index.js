//Импорты и переменные

import './index.css';
import {
  openAdd,
  openEdit,
  cardsContainer,
  editForm,
  addForm,
  changeAvatar,
  avatarForm,
  profileName,
  profileDescription,
  profileAvatar,
  avatarLink,
  avatarSave,
  profileSubmitBtn,
  editName,
  editDescription,
  addName,
  addLink,
  cardSubmitButton,
  settings
} from './components/const.js';

import Api from './components/Api1.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';
import Card from './components/Card1.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-10',
  headers: {
    authorization: 'ae17cf5f-30f7-49c5-80a6-f47193e26f36',
    'Content-Type': 'application/json'
  },
})

const editFormValidate = new FormValidator(settings, editForm);
const addFormValidate = new FormValidator(settings, addForm);
const avatarFormValidate = new FormValidator(settings, avatarForm);

avatarFormValidate.enableValidation();
addFormValidate.enableValidation();

const userInfoEx = new UserInfo(profileName, profileDescription, profileAvatar);


export let userProfile = {};
let items = [];

Promise.all([userInfoEx.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    userProfile = userData;
    

    editName.value = userData.name;
    editDescription.value = userData.about;
    editFormValidate.enableValidation();

    function createCard (item) {
      const card = new Card(item, '#card', () => {
        popupImage.open(item.link, item.name);
      });
      const cardElement = card.generate();
      return cardElement 
    }

    const popupAdd = new PopupWithForm('#add', (inputValue) => {
      cardSubmitButton.disabled = true;
      cardSubmitButton.textContent = 'Создание...';
      
      api.addCard(inputValue[0], inputValue[1])
        .then((res) => {
          sectionEx.addItem(createCard(res));
          popupAdd.close();
        })
        .catch((res) => alert(`Не удалось загрузить пост: ${res}`))
        .finally(() => cardSubmitButton.textContent = 'Создать')
    })
    
    popupAdd.setEventListeners();
    
    openAdd.addEventListener('click', () => {  
      cardSubmitButton.disabled = true;
      popupAdd.open();
    });

    const sectionEx = new Section({
      items: cards,
      renderer: createCard
    }, cardsContainer)
    sectionEx.renderAll();

  })
  .catch(err => {
    alert(`Не удалось загрузить данные профиля или посты: ${err}`)
  });

const popupEdit = new PopupWithForm('#edit', (inputValue) => {
  profileSubmitBtn.disabled = true;
  profileSubmitBtn.textContent = 'Сохранение...';

  api.editProfile(inputValue[0], inputValue[1])
  .then((res) => {
    profileName.textContent = res.name;
    profileDescription.textContent = res.about;
    popupEdit.close();
  })
  .catch((res) => alert(`Не удалось обновить профиль: ${res}`))
  .finally(() => profileSubmitBtn.textContent = 'Сохранить');
})

popupEdit.setEventListeners();

openEdit.addEventListener('click', () => {
  editName.value = profileName.textContent;
  editDescription.value = profileDescription.textContent;
  
  popupEdit.open();
});

const popupAvatar = new PopupWithForm('#avatar', (inputValue) => {
  avatarSave.disabled = true;
  avatarSave.textContent = 'Сохранение...';
  
  api.updateAvatar(inputValue[0])
    .then((res) => {
      profileAvatar.src = res.avatar;
      popupAvatar.close();
    })
    .catch((res) => alert(`Не удалось загрузить аватар: ${res}`))
    .finally(() => avatarSave.textContent = 'Сохранить')   
})

popupAvatar.setEventListeners();

profileAvatar.addEventListener('mouseover', () => {
  changeAvatar.classList.add('profile__avatar-change_opened');
});

changeAvatar.addEventListener('mouseout', () => {
  changeAvatar.classList.remove('profile__avatar-change_opened');
});

changeAvatar.addEventListener('click', () => {
  popupAvatar.open();
  avatarSave.disabled = true;
})

export const popupImage = new PopupWithImage('#image')
popupImage.setEventListeners();