class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _showErrow(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getSaveMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._showErrow(res));
  }

  saveMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._showErrow(res));
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._showErrow(res));
  }

  // запрос на регистрацию пользователя
  register(data) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => this._showErrow(res));
  };

  // запрос на авторизацию пользователя
  login(data) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then((res) => { return res.json() })
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

  // запрос на поллучение токена
  getToken() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => { return res.json() })
      .then(data => data)
      .catch((err) => console.log(err));
  }

  // запрос пользователя
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._showErrow(res));
  }

  // запрос пользователей
  // getUsers() {
  //   return fetch(`${this._url}/users`, {
  //     method: 'GET',
  //     headers: this._headers,
  //   })
  //     .then((res) => { return res.json() })
  //     .then(data => data)
  //     .catch((err) => console.log(err));
  // }

  // изменение данных пользователя
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._showErrow(res));
  }
}

//создание экземпляра класса
const mainApi = new MainApi({
  url: 'https://api.tango.students.nomoredomains.icu',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default mainApi;