import { getInitialCards, deleteCard, deleteLike, putLike, getProfile} from './api';
import { openPopup } from "./util";

export const image = document.querySelector('#image');
export const popupImage = document.querySelector('.popup__image');
export const popupImageText = document.querySelector('.popup__image-text');

export const closeImage = document.querySelector('#closeImage');

export const cardsContainer = document.querySelector('.elements');
export const card = document.querySelector('#card').content;
export const addForm = document.querySelector('#addForm');

//добавлени нового места

export function addPlace(downloadedCard, profile) {
  const place = card.querySelector('.element').cloneNode(true);
  
  place.id = downloadedCard._id;

  const heartsCounter = place.querySelector('.element__heart-counter');
  heartsCounter.textContent = downloadedCard.likes.length;

  const placePic = place.querySelector('.element__image');
  placePic.src = downloadedCard.link;
  placePic.alt = downloadedCard.name;
  place.querySelector('.element__name').textContent = downloadedCard.name;
  const heartElement = place.querySelector('.element__heart');

  heartElement.addEventListener('click', function () {
    if(!heartElement.classList.contains('element__heart_active')) {
      putLike(place)
      .then((res) => {
        heartsCounter.textContent = res.likes.length;
        heartElement.classList.toggle('element__heart_active');
      })
      .catch((res) => alert(`Не удалось поставить лайк: ${res}`))
    } else {
      deleteLike(place)
      .then((res) => {
        heartsCounter.textContent = res.likes.length;
        heartElement.classList.toggle('element__heart_active');
      })
      .catch((res) => alert(`Не удалось удалить лайк: ${res}`))
  }});

  place.querySelector('.element__image').addEventListener('click', function() {
    popupImage.src = downloadedCard.link;
    popupImage.alt = downloadedCard.name
    popupImageText.textContent = downloadedCard.name;

    openPopup(image);
  });  

  downloadedCard.likes.forEach((ele) => {
    if(ele.name === profile.name) {
      heartElement.classList.toggle('element__heart_active');
      console.log(1);
    }
  });

  if(downloadedCard.owner.name === profile.name){
    place.querySelector('.element__delete').addEventListener('click', function () {
      console.log(place.id);
      deleteCard(place)
      .then(place.remove())
      .catch((res) => alert(`Не удалось удалить карточку: ${res}`))
      
    });
  } else {
    place.querySelector('.element__delete').remove();
  }
  return place;
}