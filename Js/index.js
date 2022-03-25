// реализация открытия и закрытия окна редактирования

let edit = document.querySelector('#edit');
const openEdit = document.querySelector('.profile__edit');
const closeEdit = document.querySelector('#closeEdit');

function openCloseEdit() {
  edit.classList.toggle('popup_opened');
  editName.placeholder = profileName.textContent;
  editDescription.placeholder = profileDescription.textContent;
}

openEdit.addEventListener('click', openCloseEdit);
closeEdit.addEventListener('click', openCloseEdit);

// берём поля формы с главной странички

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let editName = document.querySelector('#editName');
let editDescription = document.querySelector('#editDescription');

//сохранение формы

const editForm = document.querySelector('#editForm')

function formEditSubmit (evt) {
    evt.preventDefault();
    let nameChange = editName.value;
    let descriptionChange = editDescription.value;
    
    profileName.textContent = nameChange;
    profileDescription.textContent = descriptionChange;

    edit.classList.toggle('popup_opened');
}

editForm.addEventListener('submit', formEditSubmit);

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
  const initialCard = card.querySelector('.element').cloneNode(true);

  initialCard.querySelector('.element__image').src = initialCards[i].link;
  initialCard.querySelector('.element__name').textContent = initialCards[i].name;
  initialCard.querySelector('.element__image').alt = initialCards[i].name;

  initialCard.querySelector('.element__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__heart_active');
  });

  initialCard.querySelector('.element__image').addEventListener('click', function() {
    image.classList.toggle('popup_opened');
    
    popupImage.src = initialCards[i].link;
    popupImageText.textContent = initialCards[i].name;
  });

  initialCard.querySelector('.element__delete').addEventListener('click', function (evt) {
    initialCard.remove();
  });  

  cardsContainer.append(initialCard);
}

//добавлени нового места

const addForm = document.querySelector('#addForm');

addForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  let addName = document.querySelector('#addName');
  let addLink = document.querySelector('#addLink');

  addPlace(addName.value, addLink.value);

  openCloseAdd();
  
  addName.value = '';
  addLink.value = '';
});



function addPlace(placeName, placeLink) {
  const place = card.querySelector('.element').cloneNode(true);

  place.querySelector('.element__image').src = placeLink;
  place.querySelector('.element__name').textContent = placeName;
  place.querySelector('.element__image').alt = placeName;

  place.querySelector('.element__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__heart_active');
  });

  place.querySelector('.element__image').addEventListener('click', function() {
    image.classList.toggle('popup_opened');
    
    popupImage.src = placeLink;
    popupImageText.textContent = placeName;
  });  

  place.querySelector('.element__delete').addEventListener('click', function () {
    place.remove();
  });

  cardsContainer.prepend(place);
}

//открытие и закрытие окна добавления

let add = document.querySelector('#add');
const openAdd = document.querySelector('.profile__add');
const closeAdd = document.querySelector('#closeAdd');

function openCloseAdd() {
  add.classList.toggle('popup_opened');
}

openAdd.addEventListener('click', openCloseAdd);
closeAdd.addEventListener('click', openCloseAdd);

//попап с картинкой

let image = document.querySelector('#image');
const popupImage = document.querySelector('.popup__image');
const popupImageText = document.querySelector('.popup__image-text');

const closeImage = document.querySelector('#closeImage');
closeImage.addEventListener('click', function() {
  image.classList.toggle('popup_opened');
});