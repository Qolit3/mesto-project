import { api } from '../index.js'

export default class UserInfo{
  constructor(userNameSelector, userDescriptionSelector, userAvatarSelector) {
    this._name = userNameSelector;
    this._about = userDescriptionSelector;
    this._avatar = userAvatarSelector;
  }

  getUserInfo() {
    return api.getProfileInfo()  
  }

  setUserInfo(name, about) {
    return api.editProfile(name, about)
    .then(res => {
      
      this._name.textContent = res.name;
      this._about.textContent = res.about;
    })
  }

  setAvatar(link) {
    return api.updateAvatar(link)
    .then(res => {
      this._avatar.src = res.avatar
      
    })
  }
}

