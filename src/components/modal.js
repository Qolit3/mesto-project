const listForm = Array.from(document.querySelectorAll('.popup'));
import {popupClose} from './util'; 

function deleteClick(evt) {

  for(let q = 0; q < listForm.length; q++) {
    
    if(evt.target.id === listForm[q].id) {
      popupClose(document.querySelector('.popup_opened'));
    }
  }
}  

function deleteEsc(evt) {
  if (evt.keyCode === 27) {
    popupClose(document.querySelector(`.popup_opened`));
  }
}

export function createOverEsc(popupEle) {
  popupEle.addEventListener('click', deleteClick);
  window.addEventListener('keydown', deleteEsc)
}
  
export function deleteOverEsc(popupEle) {
  popupEle.removeEventListener('click', deleteClick);
  window.removeEventListener('keydown', deleteEsc);
}

export const image = document.querySelector('#image');
export const popupImage = document.querySelector('.popup__image');
export const popupImageText = document.querySelector('.popup__image-text');

export const closeImage = document.querySelector('#closeImage');

export const add = document.querySelector('#add');
export const openAdd = document.querySelector('.profile__add');
export const closeAdd = document.querySelector('#closeAdd');

export const edit = document.querySelector('#edit');
export const openEdit = document.querySelector('.profile__edit');
export const closeEdit = document.querySelector('#closeEdit');
