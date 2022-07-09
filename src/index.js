//Импорты и переменные

import './index.css';
import {
  openAdd,
  openEdit,
  cardsContainer,
  changeAvatar,
  profileName,
  profileDescription,
  profileAvatar,
  avatarSave,
  profileSubmitBtn,
  editName,
  editDescription,
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

const formValidators = {}

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

const userInfoEx = new UserInfo(profileName, profileDescription, profileAvatar);

Promise.all([api.getProfileInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userInfoEx.setUserInfo(userData);

    editName.value = userData.name;
    editDescription.value = userData.about;
    enableValidation(settings);

    function createCard (item) {
      const card = new Card(item, '#card', () => {
        popupImage.open(item.link, item.name);
      }, api, userInfoEx);
      const cardElement = card.generate();
      return cardElement 
    }

    const popupAdd = new PopupWithForm('#add', (inputValue) => {
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
      formValidators['add-place'].resetValidation();   
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
  profileSubmitBtn.textContent = 'Сохранение...';

  api.editProfile(inputValue[0], inputValue[1])
  .then((res) => {
    userInfoEx.setUserInfo(res);
    popupEdit.close();
  })
  .catch((res) => alert(`Не удалось обновить профиль: ${res}`))
  .finally(() => profileSubmitBtn.textContent = 'Сохранить');
})

popupEdit.setEventListeners();

openEdit.addEventListener('click', () => {
  editName.value = profileName.textContent;
  editDescription.value = profileDescription.textContent;
  formValidators['profile-edit'].resetValidation();   
  
  popupEdit.open();
});

const popupAvatar = new PopupWithForm('#avatar', (inputValue) => {
  avatarSave.textContent = 'Сохранение...';
  
  api.updateAvatar(inputValue[0])
    .then((res) => {
      userInfoEx.setUserInfo(res)
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
  formValidators['avatar-edit'].resetValidation();   
  popupAvatar.open();
})

export const popupImage = new PopupWithImage('#image')
popupImage.setEventListeners();