import { createOverEsc, deleteOverEsc } from "./modal";
import { editName, editDescription, profileDescription, profileName} from '../index';

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  createOverEsc(popup);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  deleteOverEsc(popup);
}