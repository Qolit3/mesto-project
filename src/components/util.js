import { createOverEsc, deleteOverEsc } from "./modal";

export function popupOpen(popupO) {
  popupO.classList.add('popup_opened');
  createOverEsc(popupO);
}

export function popupClose(popupC) {
  popupC.classList.remove('popup_opened');
  deleteOverEsc(popupC);
}