import { createOverEsc, deleteOverEsc } from "./modal";
import { editName, editDescription, profileDescription, profileName} from '../index';

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  editName.value = profileName.textContent;
  editDescription.value = profileDescription.textContent;
  createOverEsc(popup);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  deleteOverEsc(popup);
}