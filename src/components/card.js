export const initialCards = [
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

import { openPopup } from "./util";

export const image = document.querySelector('#image');
export const popupImage = document.querySelector('.popup__image');
export const popupImageText = document.querySelector('.popup__image-text');

export const closeImage = document.querySelector('#closeImage');

export const cardsContainer = document.querySelector('.elements');
export const card = document.querySelector('#card').content;

export function addFirstPlaces() {
  initialCards.forEach((ele) => {
    cardsContainer.prepend(addPlace(ele.name, ele.link));
  });
}

//добавлени нового места

export const addForm = document.querySelector('#addForm');

export function addPlace(placeName, placeLink) {
  const place = card.querySelector('.element').cloneNode(true);

  const placePic = place.querySelector('.element__image');
  placePic.src = placeLink;
  placePic.alt = placeName;
  place.querySelector('.element__name').textContent = placeName;
  

  place.querySelector('.element__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__heart_active');
  });

  place.querySelector('.element__image').addEventListener('click', function() {
    popupImage.src = placeLink;
    popupImage.alt = placeName
    popupImageText.textContent = placeName;

    openPopup(image);
  });  

  place.querySelector('.element__delete').addEventListener('click', function () {
    place.remove();
  });

  return place;
}