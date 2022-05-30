
import {closePopup} from './util'; 

function handleOverlayClick(evt) {    
  if(evt.target === evt.currentTarget) {
    closePopup(document.querySelector('.popup_opened'));
  }
}
  

function handleEscKey(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector(`.popup_opened`));
  }
}

export function createOverEsc(popupEle) {
  popupEle.addEventListener('click', handleOverlayClick);
  window.addEventListener('keydown', handleEscKey)
}
  
export function deleteOverEsc(popupEle) {
  popupEle.removeEventListener('click', handleOverlayClick);
  window.removeEventListener('keydown', handleEscKey);
}

export const image = document.querySelector('#image');
export const popupImage = document.querySelector('.popup__image');
export const popupImageText = document.querySelector('.popup__image-text');

export const add = document.querySelector('#add');
export const openAdd = document.querySelector('.profile__add');

export const edit = document.querySelector('#edit');
export const openEdit = document.querySelector('.profile__edit');
