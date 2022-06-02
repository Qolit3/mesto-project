import { createOverEsc, deleteOverEsc } from "./modal";

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  createOverEsc(popup);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  deleteOverEsc(popup);
}