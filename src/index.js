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
import { PopupWithImage, PopupWithForm} from './components/Popup';

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


export let userProfile = {}

Promise.all([userInfoEx.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    userProfile = userData;
    

    editName.value = userData.name;
    editDescription.value = userData.about;
    editFormValidate.enableValidation();

    const sectionEx = new Section({
      items: cards,
      renderer: (item) => {
        const card = new Card(item, '#card');
        const cardElement = card.generate();
        
        return cardElement;
      }
    }, cardsContainer)

    sectionEx.renderAll();
  })
  .catch(err => {
    alert(`Не удалось загрузить данные профиля или посты: ${err}`)
  });

const popupEdit = new PopupWithForm('#edit', () => {
  profileSubmitBtn.disabled = true;
  profileSubmitBtn.textContent = 'Сохранение...';

  api.editProfile(editName.value, editDescription.value)
  .then((res) => {
    profileName.textContent = res.name;
    profileDescription.textContent = res.about;
    
  })
  .catch((res) => alert(`Не удалось обновить профиль: ${res}`))
  .finally(() => profileSubmitBtn.textContent = 'Готово');
})

popupEdit.setEventListeners();

openEdit.addEventListener('click', () => {
  editName.value = profileName.textContent;
  editDescription.value = profileDescription.textContent;

  profileSubmitBtn.textContent = 'Сохранить'
  
  popupEdit.open();
});

const popupAvatar = new PopupWithForm('#avatar', () => {
  avatarSave.disabled = true;
  avatarSave.textContent = 'Сохранение...';
  
  api.updateAvatar(avatarLink.value)
    .then((res) => {
      profileAvatar.src = res.avatar;
    })
    .catch((res) => alert(`Не удалось загрузить аватар: ${res}`))
    .finally(() => avatarSave.textContent = 'Готово')   
})

popupAvatar.setEventListeners();

profileAvatar.addEventListener('mouseover', () => {
  changeAvatar.classList.add('profile__avatar-change_opened');
});

changeAvatar.addEventListener('mouseout', () => {
  changeAvatar.classList.remove('profile__avatar-change_opened');
});

changeAvatar.addEventListener('click', () => {
  avatarSave.textContent = 'Сохранить';
  popupAvatar.open();
  avatarSave.disabled = true;
})

const sectionAdd = new Section({
  items: {},
  renderer: (item) => {
    const card = new Card(item, '#card');
    const cardElement = card.generate();
    return cardElement;
  }
}, cardsContainer)

const popupAdd = new PopupWithForm('#add', () => {
  cardSubmitButton.disabled = true;
  cardSubmitButton.textContent = 'Создание...';
  
  api.addCard(addName.value, addLink.value)
    .then((res) => {
      const addedCard = new Card(res, '#card');
      sectionAdd.addItem(addedCard.generate());
    })
    .catch((res) => alert(`Не удалось загрузить пост: ${res}`))
    .finally(() => cardSubmitButton.textContent = 'Готово')
})

popupAdd.setEventListeners();

openAdd.addEventListener('click', () => {
  cardSubmitButton.textContent = 'Создать'
  
  cardSubmitButton.disabled = true;
  popupAdd.open();
});

export const popupImage = new PopupWithImage('#image')