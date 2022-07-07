class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  open() {
    this._popup.classList.add('popup_opened')
  }

  close() {
    this._popup.classList.remove('popup_opened')
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-image').addEventListener('click', () => {
      this.close();
    })
    this._popup.addEventListener('click', (evt) => {
      if(evt.target === evt.currentTarget) {
        this.close();
      }
    })
    window.addEventListener('keydown', (evt) => {
      if(evt.key === 'Escape') {
        this.close();
      }
    })
  }
}

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector)
  }

  open(link, name) {
    this._popup.classList.add('popup_opened');
    this._popup.querySelector('.popup__image').src = link;
    this._popup.querySelector('.popup__image-text').textContent = name;
  } 
}

export class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      
      
      this._callback()
      this.close()
        
    });
    this._popup.querySelector('.popup__close-image').addEventListener('click', () => {
      this.close();
    })
    this._popup.addEventListener('click', (evt) => {
      if(evt.target === evt.currentTarget) {
        this.close();
      }
    })
    window.addEventListener('keydown', (evt) => {
      if(evt.key === 'Escape') {
        this.close();
      }
    })
  }

  close() {
    this._popup.classList.remove('popup_opened')
    this._popup.querySelector('.popup__form').reset();
  }
}