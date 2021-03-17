class MoviesApi {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  _getResponseData(response) {
    return response.then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    })
  }

  getMovies() {
    return this._getResponseData(fetch(`${this._url}`, {
      method: 'GET',
      headers: this._headers,
    }))
  }
}

const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default moviesApi;