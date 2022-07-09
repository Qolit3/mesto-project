export default class Api{
  constructor(settings){
    this._url = settings.baseUrl;
    this._headers = settings.headers;
  }
  _checkResponse(res) {
    if (res.ok){
      return(res.json())
    } else {
     return Promise.reject(`Ошибка: ${res.status}`)
    }
  }
  async getProfileInfo() {
    return await fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(this._checkResponse)
  }
  async getCards() {
    return await fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this._checkResponse)
  }
  async addCard(name, link){
    return await fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    }).then(this._checkResponse)
  }
  async editProfile(name, about) {
    return await fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse)
  }
  async updateAvatar(link) {
    return await fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      }),
    }).then(this._checkResponse);
  }
  
  async removeCard(cardId) {
    return  await fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse);
  };
  async addLikeCard(cardId) {
    return await fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    }).then(this._checkResponse)
  };
  async removeLikeCard(cardId) {
    return await fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._checkResponse)
  }
}