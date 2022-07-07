import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._callback = callback;
    this._form = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
  
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      
      this._callback(this._getInputValues());        
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
    this._form.reset();
  }
}