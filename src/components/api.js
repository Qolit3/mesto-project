const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-10',
  headers: {
    authorization: 'ae17cf5f-30f7-49c5-80a6-f47193e26f36',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = (cardsContainer, addPlace) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((res) => {return res.json()})
  .then((res) => {
    console.log(res);
    res.forEach((ele) => {
      cardsContainer.append(addPlace(ele));
    });  
  })  
  .catch((res) => alert(`Не удалось получить посты от сервера: ${res}`))
}

export const putLike = (place, heartsCounter) => {
  fetch(`${config.baseUrl}/cards/likes/${place.id}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((res) => {
    return res.json()
  })
  .then((res) => {
    heartsCounter.textContent = res.likes.length;
  })
  .catch((res) => alert(`Не удалось поставить лайк: ${res}`))
}

export const deleteLike = (place, heartsCounter) => {
  fetch(`${config.baseUrl}/cards/likes/${place.id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => {
    return res.json()
  })
  .then((res) => {
    heartsCounter.textContent = res.likes.length;
  })
  .catch((res) => alert(`Не удалось удалить лайк: ${res}`))
}

export const deleteCard = (place) => {
  fetch(`${config.baseUrl}/cards/${place.id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .catch((res) => alert(`Не удалось удалить карточку: ${res}`))
}

let profile = {};

export const getProfile = (profileAvatar, profileName, profileDescription) => {
  fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res) => {
    return res.json()
  })
  .then((res) => {
    profileName.textContent = res.name;
    profileDescription.textContent = res.about;
    profileAvatar.src = res.avatar;
    profile = res;
  })
  .catch((res) => alert(`Не удалось получить профиль: ${res}`))
}

export const patchAvatar = (evt, avatarLink, profileAvatar, avatarSave, closePopup, changeAvatarPopup) => {
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink.value
    })  
  })
  .then((res) => {
    return res.json()
  })
  .then((res) => {
    profileAvatar.src = res.avatar;
  })
  .then(() => {
    avatarSave.textContent = 'Готово';
    closePopup(changeAvatarPopup);
    evt.target.reset();  
  })
  .catch((res) => alert(`Не удалось загрузить аватар: ${res}`))
}

export const postCard = (evt, cardInfo, addName, addLink, cardSubmitButton, cardsContainer, addPlace, closePopup, add) => {
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: addName.value,
      link: addLink.value
    })
  })
  .then((res) => {return res.json()})
  .then((res) => {
    cardInfo = res;
  })
  .then(() => {
    cardSubmitButton.textContent = 'Готово';
    cardsContainer.prepend(addPlace(cardInfo));  
    closePopup(add);
    evt.target.reset();
  })
  .catch((res) => alert(`Не удалось загрузить пост: ${res}`))
}

export const patchProfile = (editName, editDescription, profileName, profileDescription, profileSubmitBtn, closePopup, edit) => {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: editName.value,
      about: editDescription.value
    })  
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    profileName.textContent = res.name;
    profileDescription.textContent = res.about;       
  })
  .then(() => {
    profileSubmitBtn.textContent = 'Готово'
    closePopup(edit);
  })
  .catch((res) => alert(`Не удалось обновить профиль: ${res}`))
}

export {profile};