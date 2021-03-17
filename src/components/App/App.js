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
import {CurrentUserContext} from '../../context/ CurrentUserContext';
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

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            getCurrentUser();
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
      })
      .catch((err) => console.log(err))
  }

  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setCurrentUser({})
    history.push('/');
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
        setSavedMovies([...savedMovies, {...res, id: res.id}])
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteMovieCard = (id) => {
    const idMovie = savedMovies.find(item => item.id === id)._id;
    setIsLoading(true);
    mainApi.deleteMovies(idMovie)
      .then(() => {
        setSavedMovies(savedMovies.filter(item => item._id !== idMovie));
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
          return {...item, id: item.id}
        })
        localStorage.setItem('savedMovies', JSON.stringify(savedArray));
        setSavedMovies(savedArray);
      })
      .catch((err) => {
        localStorage.removeItem('savedMovies');
        console.log(err)
      })
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
                          saveProfile={saveProfile}
                          signOut={signOut}
          />

          <ProtectedRoute path="/movies"
                          loggedIn={loggedIn}
                          component={Movies}
                          savedMovies={false}
                          cards={moviesCards}
                          turnOn={isLoading}
                          submitSearch={onSubmitSearch}
                          deleteMovieCard={deleteMovieCard}
                          isSavedMovie={savedMovie}
          />

          <ProtectedRoute path="/saved-movies"
                          loggedIn={loggedIn}
                          component={Movies}
                          savedMovies={true}
                          cards={filterSavedMovies}
                          turnOn={isLoading}
                          submitSearch={onSubmitSearchSaved}
                          deleteMovieCard={deleteMovieCard}
                          isSavedMovie={savedMovie}
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