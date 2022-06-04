const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-10',
  headers: {
    authorization: 'ae17cf5f-30f7-49c5-80a6-f47193e26f36',
    'Content-Type': 'application/json'
  }
}

function _checkResponse(res)  {
  
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`)
  
  }

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(_checkResponse)
}

export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(_checkResponse)
}

export const putLike = (place) => {
  return fetch(`${config.baseUrl}/cards/likes/${place.id}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(_checkResponse)
  
}

export const deleteLike = (place) => {
  return fetch(`${config.baseUrl}/cards/likes/${place.id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(_checkResponse)
}

export const deleteCard = (place) => {
  return fetch(`${config.baseUrl}/cards/${place.id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(_checkResponse)

}

export const patchAvatar = () => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink.value
    })  
  })
  .then(_checkResponse)
  
}

export const postCard = (addName, addLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: addName.value,
      link: addLink.value
    })
  })
  .then(_checkResponse)
  
}

export const patchProfile = (editName, editDescription) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: editName.value,
      about: editDescription.value
    })  
  })
  .then(_checkResponse)
}