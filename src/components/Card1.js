import { popupImage } from '../index.js'
import { api, userProfile } from '../index.js'

export default class Card {
  constructor(cardData, templateSelector) {
    this._name = cardData.name;
    this._src = cardData.link;
    this._likes = cardData.likes;
    this._id = cardData._id;
    this._owner = cardData.owner;
    this._template = templateSelector;
  }

  _getTemplate() {
    const getedTemplate = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
    return getedTemplate;
  }

  generate() {
    this._element = this._getTemplate();
    this._element.id = this._id;
    this._heart = this._element.querySelector('.element__heart');
    this._delete = this._element.querySelector('.element__delete');
    this._image = this._element.querySelector('.element__image');
    this._heartCounter = this._element.querySelector('.element__heart-counter');

    this._element.querySelector('.element__name').textContent = this._name;
    this._image.src = this._src;
    this._image.alt = this._name;
    this._heartCounter.textContent = this._likes.length;

    this._likes.forEach(element => {
      if(element._id === userProfile._id) {
        this._heart.classList.add('element__heart_active')
      }
    });

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    
    this._heart.addEventListener('click', () => {
      this._handleLike();
    })
    if(userProfile.name === this._owner.name) {
      this._delete.addEventListener('click', () => {
      this._handleDelete();
      this._element.remove();
        
      })
    } else {
      this._delete.remove();
    }
    
    this._image.addEventListener('click', () => {
      this._handleClick();
    })
  }

  _handleClick() {
    popupImage.open(this._src, this._name);
  }

  _handleDelete() {
    api.removeCard(this._id)
      .then(() => this._element.remove())
      .catch((res) => alert(`Не удалось удалить карточку: ${res}`))
  }

  _handleLike() {    
      if(!this._heart.classList.contains('element__heart_active')) {
        api.addLikeCard(this._element.id)
        .then((res) => {
          this._heartCounter.textContent = res.likes.length;
          this._heart.classList.add('element__heart_active');
        })
        .catch((res) => alert(`Не удалось поставить лайк: ${res}`))
      } else {
        api.removeLikeCard(this._element.id)
        .then((res) => {
          this._heartCounter.textContent = res.likes.length;
          this._heart.classList.remove('element__heart_active');
        })
        .catch((res) => alert(`Не удалось удалить лайк: ${res}`))
    };
  }
}