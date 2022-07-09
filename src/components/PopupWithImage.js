import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector('.popup__image');
    this._text =this._popup.querySelector('.popup__image-text');
  }

  open(link, name) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._text.textContent = name;
  } 
}

