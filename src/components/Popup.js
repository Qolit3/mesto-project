export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleOverlayClick = (evt) => {
      if(evt.target === evt.currentTarget) {
        this.close();
      }
    };
    this._handleEscKey = (evt) => {
      if(evt.key === 'Escape') {
        this.close();
      }
    }
    this._popupClose = this._popup.querySelector('.popup__close-image');
  }

  open() {
    this._popup.classList.add('popup_opened')
    this._popup.addEventListener('click', this._handleOverlayClick)
    window.addEventListener('keydown', this._handleEscKey)
  }

  close() {
    this._popup.classList.remove('popup_opened')
    this._popup.removeEventListener('click', this._handleOverlayClick)
    window.removeEventListener('keydown', this._handleEscKey)
  }

  setEventListeners() {
    this._popupClose.addEventListener('click', () => {
      this.close();
    })
  }
}