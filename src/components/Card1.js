export default class Card {
  constructor(cardData, templateSelector, handleCardClick, api, userInfo) {
    this._name = cardData.name;
    this._src = cardData.link;
    this._likes = cardData.likes;
    this._id = cardData._id;
    this._owner = cardData.owner;
    this._template = document.querySelector(templateSelector).content.querySelector('.element');
    this._handleCardCLick = handleCardClick;
    this._api = api;
    this._userInfo = userInfo;
  }

  _getTemplate() {
    const getedTemplate = this._template.cloneNode(true);
    return getedTemplate;
  }

  generate() {
    this._element = this._getTemplate();
    this._element.id = this._id;
    this._user = this._userInfo.getUserInfo();
    this._heart = this._element.querySelector('.element__heart');
    this._delete = this._element.querySelector('.element__delete');
    this._image = this._element.querySelector('.element__image');
    this._heartCounter = this._element.querySelector('.element__heart-counter');
    this._imageText = this._element.querySelector('.element__name');

    this._imageText.textContent = this._name;
    this._image.src = this._src;
    this._image.alt = this._name;
    this._heartCounter.textContent = this._likes.length;

    this._likes.forEach(element => {
      if(element._id === this._user._id) {
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
    if(this._user.name === this._owner.name) {
      this._delete.addEventListener('click', () => {
      this._handleDelete();
        
      })
    } else {
      this._delete.remove();
    }
    
    this._image.addEventListener('click', () => {
      this._handleCardCLick();
    })
  }

  _handleDelete() {
    this._api.removeCard(this._id)
      .then(() => this._element.remove())
      .catch((res) => alert(`Не удалось удалить карточку: ${res}`))
  }

  _handleLike() {    
      if(!this._heart.classList.contains('element__heart_active')) {
        this._api.addLikeCard(this._element.id)
        .then((res) => {
          this._heartCounter.textContent = res.likes.length;
          this._heart.classList.add('element__heart_active');
        })
        .catch((res) => alert(`Не удалось поставить лайк: ${res}`))
      } else {
        this._api.removeLikeCard(this._element.id)
        .then((res) => {
          this._heartCounter.textContent = res.likes.length;
          this._heart.classList.remove('element__heart_active');
        })
        .catch((res) => alert(`Не удалось удалить лайк: ${res}`))
    };
  }
}