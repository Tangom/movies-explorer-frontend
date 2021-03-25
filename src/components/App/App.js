import React from 'react';
import {Route, Switch, Redirect, useLocation, useHistory} from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

function App() {

  const location = useLocation();
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isNavVisible, setIsNavVisible] = React.useState(false);
  const [isFootVisible, setIsFootVisible] = React.useState(false);
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [moviesCards, setMoviesCards] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filterSavedMovies, setFilterSavedMovies] = React.useState([]);
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [updateUserMessage, setUpdateUserMessage] = React.useState('');


  // React.useEffect(() => {
  //   if (localStorage.getItem('token') !== null) {
  //     Promise.all([mainApi.getUserInfo(), mainApi.getSaveMovies()])
  //       .then(([userData, savedMovies]) => {
  //         setCurrentUser(userData);
  //         setSavedMovies(savedMovies);
  //         setSavedMovies(savedMovies);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //   }
  // }, []);

  React.useEffect(() => {
    const path = location.pathname;
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            getCurrentUser();
            history.push(path);
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('token')
          history.push('/');
        });
    }
  }, []);

  function onRegister(data) {
    mainApi.register(data).then((data) => {
      if (data) {
        history.push('/signin');
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function login(email, password) {
    mainApi.login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          getCurrentUser();
          history.push('/movies');
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  // function handlerLogin() {
  //   const token = localStorage.getItem('token');
  //   if (token !== null) {
  //     mainApi.getToken(token)
  //       .then((data) => {
  //         if (data) {
  //           setCurrentUser(data);
  //           setLoggedIn(true);
  //           history.push('/movies');
  //         }
  //       }).catch((err) => {
  //       console.log(err);
  //       signOut();
  //     })
  //   } else signOut();
  // }

  // сохранение токена для повторного входа
  // React.useEffect(() => {
  //   handlerLogin();
  // }, [loggedIn]);

  //функция удаления токена
  // function signOut() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('initialMovies');
  //   setLoggedIn(false);
  //   history.push('/');
  // }

  function signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setLoggedIn(false);
    setCurrentUser({})
    localStorage.removeItem('initialMovies');
    localStorage.removeItem('savedMovies');
    setInitialMovies([]);
    setSavedMovies([]);
    setMoviesCards([]);
    setFilterSavedMovies([]);
    history.push('/');
  }
  // функция авторизации
  // function submitLogin(data) {
  //   mainApi.login(data).then((data) => {
  //     if (data) {
  //       handlerLogin();
  //       setCurrentUser(data);
  //       history.push('/');
  //     }
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }

  // // функция обаботки данных о пользователе
  // function handlerUpdateUser(data) {
  //   mainApi.setUserInfo(data)
  //     .then((dataInfo) => {
  //       if (dataInfo) {
  //         setCurrentUser(dataInfo.user);
  //         setUpdateUserMessage('Данные успешно редактированы');
  //       } else {
  //         setUpdateUserMessage('Произошла ошибка');
  //       }
  //     }).catch((err) => {
  //     setUpdateUserMessage('Произошла ошибка');
  //     console.log(err);
  //   })
  // }
  function submitLogin({email, password}) {
    if (!email || !password) {
      return;
    }
    login(email, password);
  }

  function getCurrentUser() {
    const token = localStorage.getItem('token');
    mainApi.getCurrentUser(token)
      .then((res) => {
        if (res) {
          setCurrentUser(res)
          localStorage.setItem('currentUser', JSON.stringify(res))
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  function saveProfile(data) {
    mainApi.saveProfile(data)
      .then((profile) => {
        setCurrentUser(profile);
        setUpdateUserMessage('Профиль успешно обновлен');
      })
      .catch((err) => console.log(err))
  }

  function handlerNavVisible() {
    if (location.pathname === '/movies'
      || location.pathname === '/saved-movies'
      || location.pathname === '/profile') {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true)
    }
  }

  function handlerFootVisible() {
    if (location.pathname === '/movies'
      || location.pathname === '/saved-movies'
      || location.pathname === '/') {
      setIsFootVisible(true);
    } else {
      setIsFootVisible(false)
    }
  }

  React.useEffect(() => {
    handlerNavVisible();
    handlerFootVisible();
  }, [location.pathname]);

  function handlerNavOpen() {
    setIsNavOpen(true);
  }

  function handlerNAvClose() {
    setIsNavOpen(false);
  }

  const savedMovie = (data) => {
    setIsLoading(true);
    mainApi.createMovie(data)
      .then((res) => {
        setSavedMovies([...savedMovies, {...res, id: res.movieId}])
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    setFilterSavedMovies(filter(savedMovies, query));
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies])

  const deleteMovieCard = (movieId) => {
    const id = savedMovies.find(item => item.movieId === movieId)._id;
    setIsLoading(true);
    mainApi.deleteMovies(id)
      .then(() => {
        setSavedMovies(savedMovies.filter(item => item._id !== id));
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function filter(data, query) {
    if (query) {
      const regex = new RegExp(query, 'gi');
      const filterData = data.filter((item) => {
        return regex.test(item.nameRU) || regex.test(item.nameEN);
      });
      if (filterData.length === 0) {
        console.log('Ничего не найдено');
      } else {
        console.log('');
      }
      return filterData;
    }
    return [];
  }

  function getInitialMovies() {
    moviesApi.getMovies()
      .then((data) => {
        const initialArray = data.map((item) => {
          const imageURL = item.image ? item.image.url : '';
          return {
            ...item,
            image: `https://api.nomoreparties.co${imageURL}`,
            trailer: item.trailerLink,
          }
        })
        localStorage.setItem('initialMovies', JSON.stringify(initialArray));
        setInitialMovies(initialArray);
      })
      .catch((err) => {
        localStorage.removeItem('initialMovies');
        console.log(err);
      })
  }

  function getSavedMovies() {
    mainApi.getMovies()
      .then((data) => {
        const savedArray = data.map((item) => {
          return {...item, id: item.movieId}
        })
        localStorage.setItem('savedMovies', JSON.stringify(savedArray));
        setSavedMovies(savedArray);
      })
      .catch((err) => {
        localStorage.removeItem('savedMovies');
        console.log(err)
      })
  }

  function onBookmarkClick(movie, isMarked) {
    if (isMarked) {
      savedMovie(movie);
    } else {
      deleteMovieCard(movie);
    }
  }

  function onSaveMovie(movie) {
    return savedMovies.some((item) => item.id === movie.id)
  }

  function onSubmitSearch(query) {
    setIsLoading(true);
    setTimeout(() => {
      setQuery(query);
      setMoviesCards(filter(initialMovies, query));
      setIsLoading(false);
    }, 500)
  }

  function onSubmitSearchSaved(query) {
    setIsLoading(true);
    setTimeout(() => {
      setQuery(query);
      setFilterSavedMovies(filter(savedMovies, query));
      setIsLoading(false);
    }, 500)
  }

  React.useEffect(() => {
    if (loggedIn) {
      getInitialMovies();
      getSavedMovies();
    }
  }, [loggedIn])

  React.useEffect(() => {
    const initial = JSON.parse(localStorage.getItem('initialMovies'));
    if (initial) {
      setInitialMovies(initial);
    } else {
      getInitialMovies();
    }
    const saved = JSON.parse(localStorage.getItem('savedMovies'));
    if (saved) {
      setSavedMovies(saved)
    } else {
      getSavedMovies();
    }
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header visible={isNavVisible} onNavOpen={handlerNavOpen}/>
        <Navigation visible={isNavVisible} navOpen={isNavOpen} navClose={handlerNAvClose}/>

        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>

          <Route path="/signup">
            <Register onRegister={onRegister}/>
          </Route>

          <Route path="/signin">
            <Login onLogin={submitLogin}/>
          </Route>

          <ProtectedRoute path="/profile"
                          loggedIn={loggedIn}
                          component={Profile}
                          onUpdateUser={saveProfile}
                          signOut={signOut}
                          message={updateUserMessage}
          />

          <ProtectedRoute path="/movies"
                          loggedIn={loggedIn}
                          component={Movies}
                          onSaveMovie={onSaveMovie}
                          moviesCard={moviesCards}
                          isLoading={isLoading}
                          submitSearch={onSubmitSearch}
                          onBookmarkClick={onBookmarkClick}
                          deleteMovieCard={deleteMovieCard}
          />

          <ProtectedRoute path="/saved-movies"
                          loggedIn={loggedIn}
                          component={Movies}
                          onSaveMovie={onSaveMovie}
                          moviesCard={filterSavedMovies}
                          isLoading={isLoading}
                          submitSearch={onSubmitSearchSaved}
                          onBookmarkClick={onBookmarkClick}
                          deleteMovieCard={deleteMovieCard}
          />

          <Route path="*">
            <PageNotFound/>
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/movies"/> : <Redirect to="/"/>}
          </Route>
        </Switch>

        <Footer visible={isFootVisible}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;