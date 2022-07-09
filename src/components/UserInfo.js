export default class UserInfo{
  constructor(userNameSelector, userDescriptionSelector, userAvatarSelector) {
    this._name = userNameSelector;
    this._about = userDescriptionSelector;
    this._avatar = userAvatarSelector;
    this._id;
  }

  getUserInfo() {
    this._user = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
      _id: this._id
    }
    return this._user;
  }

  setUserInfo({name, about, avatar, _id}) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }
}

