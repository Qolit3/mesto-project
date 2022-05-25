// реализация открытия и закрытия окна редактирования


const edit = document.querySelector('#edit');
const openEdit = document.querySelector('.profile__edit');
const closeEdit = document.querySelector('#closeEdit');

function popupOpen(popupO) {
    popupO.classList.add('popup_opened');
}

function popupClose(popupC) {
  console.log(1);
  popupC.classList.remove('popup_opened');
}

openEdit.addEventListener('click', () => popupOpen(edit));
closeEdit.addEventListener('click', () => popupClose(edit));

// берём поля формы с главной странички

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let editName = document.querySelector('#editName');
let editDescription = document.querySelector('#editDescription');

//сохранение формы

const editForm = document.querySelector('#editForm')

function submitFormEdit (evt) {
    evt.preventDefault();
    () => console.log(1);
    const nameChange = editName.value;
    const descriptionChange = editDescription.value;
    
    profileName.textContent = nameChange;
    profileDescription.textContent = descriptionChange;

    
}

editForm.addEventListener('submit', submitFormEdit);
editForm.addEventListener('submit', () => popupClose(edit));

//карточки

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
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

const cardsContainer = document.querySelector('.elements');
const card = document.querySelector('#card').content;

for (let i = 0; i < initialCards.length; i++) {
  
  cardsContainer.prepend(addPlace(initialCards[i].name, initialCards[i].link));
}

//добавлени нового места

const addForm = document.querySelector('#addForm');

addForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const addName = document.querySelector('#addName');
  const addLink = document.querySelector('#addLink');

  

  cardsContainer.prepend(addPlace(addName.value, addLink.value));
  
  addName.value = '';
  addLink.value = '';
});
addForm.addEventListener('submit', () => popupClose(add));


function addPlace(placeName, placeLink) {
  const place = card.querySelector('.element').cloneNode(true);

  const placePic = place.querySelector('.element__image');
  placePic.src = placeLink;
  place.querySelector('.element__name').textContent = placeName;
  

  place.querySelector('.element__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__heart_active');
  });

  place.querySelector('.element__image').addEventListener('click', function() {
    popupImage.src = placeLink;
    popupImageText.textContent = placeName;

    popupOpen(image);
  });  

  place.querySelector('.element__delete').addEventListener('click', function () {
    place.remove();
  });

  return place;
}

//открытие и закрытие окна добавления

const add = document.querySelector('#add');
const openAdd = document.querySelector('.profile__add');
const closeAdd = document.querySelector('#closeAdd');


openAdd.addEventListener('click', () => popupOpen(add));
closeAdd.addEventListener('click', () => popupClose(add));

//попап с картинкой

const image = document.querySelector('#image');
const popupImage = document.querySelector('.popup__image');
const popupImageText = document.querySelector('.popup__image-text');

const closeImage = document.querySelector('#closeImage');
closeImage.addEventListener('click', () => popupClose(image));

//Валидация форм




import './index.css';