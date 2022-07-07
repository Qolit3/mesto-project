import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._callback = callback;
    this._form = this._popup.querySelector('.popup__form');
    this._submit = this._form.querySelector('.popup__save');
  }

  setEventListeners() {
    super.setEventListeners();
  
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit.disabled = true;
      this._submit.classList.add('popup__save_inactive');
      this._callback(this._getInputValues());  
      this._form.reset();    
    });
  }

  _getInputValues() {
    
    this._inputListValues = [];
    this._inputList.forEach((item) => {
      this._inputListValues = this._inputListValues.concat(item.value)
      
    })
    return this._inputListValues;
  }

  close() {
    super.close();
    
  }
}