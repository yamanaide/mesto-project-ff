const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
  headers: {
    authorization: 'ea6e9f73-a3a1-4c81-b756-8035bd6ecdbe',
    'Content-Type': 'application/json'
  }
}

const getResponseData = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getCards = async () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then(res => {
    return getResponseData(res)
  });
}

export const getProfile = async () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then(res => {
    return getResponseData(res)
  });
}

export const updateProfile = async (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify(data),
  })
  .then(res => {
    return getResponseData(res)
  });
}

export const createCard = async (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify(data),
  })
  .then(res => {
    return getResponseData(res)
  });
}

export const deleteCard = async (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    headers: config.headers,
    method: "DELETE",
  })
  .then(res => {
    return getResponseData(res)
  });
}

export const addLike = async (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    headers: config.headers,
    method: "PUT",
  })
  .then(res => {
    return getResponseData(res)
  });
}

export const deleteLike = async (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    headers: config.headers,
    method: "DELETE",
  })
  .then(res => {
    return getResponseData(res)
  });
}

export const updateAvatar = async (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({ avatar: url }),
  })
  .then(res => {
    return getResponseData(res)
  });
}

