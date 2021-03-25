class MainApi {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  _getResponseData(response) {
    return response.then((res) => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 409 || res.status === 404 || res.status === 400) {
        return Promise.reject({
          status: res.status
        })
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    })
  }

  register(data) {
    return this._getResponseData(fetch(`${this._url}/signup`, {
      method: 'POST',
      body: JSON.stringify({
        "name": data.name,
        "email": data.email,
        "password": data.password
      }),
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }))
  }

  login(data) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        if (data.token) {
          // сохранение токена в localStorage
          localStorage.setItem('token', data.token);
          return data;
        } else {
          return;
        }
      })
      .catch((err) => console.log(err));
  };

  getToken() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => {
        return res.json()
      })
      .then(data => data)
      .catch((err) => console.log(err));
  }

  // запрос пользователя
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  getUsers() {
    return fetch(`${this._url}/users`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => {
        return res.json()
      })
      .then(data => data)
      .catch((err) => console.log(err));
  }

  // изменение данных пользователя
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  // checkToken(token) {
  //   return this._getResponseData(fetch(`${this._url}/users/me`, {
  //     method: 'GET',
  //     headers: {
  //       ...this._headers,
  //       "Authorization": `Bearer ${token}`
  //     }
  //   }))
  // }

  // getCurrentUser(token) {
  //   return this._getResponseData(fetch(`${this._url}/users/me`, {
  //     method: 'GET',
  //     headers: {
  //       ...this._headers,
  //       "Authorization": `Bearer ${token}`
  //     }
  //   }))
  // }

  // saveProfile(data) {
  //   const token = localStorage.getItem('token');
  //   return this._getResponseData(fetch(`${this._url}/users/me`, {
  //     method: 'PATCH',
  //     headers: {
  //       ...this._headers,
  //       "Authorization": `Bearer ${token}`
  //     },
  //     body: JSON.stringify({
  //       name: data.name,
  //       email: data.email
  //     })
  //   }))
  // }

  getSaveMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  getMovies() {
    return this._getResponseData(fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        ...this._headers,
      }
    }))
  }

  createMovie(data) {
    return this._getResponseData(fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailer: data.trailer,
        thumbnail: data.image,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      })
    }))
  }

  deleteMovies(movieId) {
    return this._getResponseData(fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
      }
    }))
  }
}

const mainApi = new MainApi({
  url: 'https://api.tango.students.nomoredomains.icu',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  credentials: 'include',
})

export default mainApi;