import React from 'react';
import {Route, Switch, useLocation, useHistory} from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

function App() {

  const location = useLocation();
  const [isNavVisible, setIsNavVisible] = React.useState(false);
  const [isFootVisible, setIsFootVisible] = React.useState(false);
  const [isNavOpen, setIsNavOpen] = React.useState(false);

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

  function onSubmitRegister({name, email, password}) {
    if (!name || !email || !password) {
      return;
    }
    mainApi.register(name, email, password)
      .then((res) => {
        if (res) {
          login(email, password);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  //авторизация
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

  function onSubmitLogin({email, password}) {
    if (!email || !password) {
      return;
    }
    login(email, password);
  }

  // получить данные текущего пользователя
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

  // редактирование профиля
  function handleSaveProfile(data) {

    mainApi.saveProfile(data)
      .then((profile) => {
        setCurrentUser(profile);
      })
      .catch((err) => console.log(err))
  }

  // выход
  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setCurrentUser({})
    history.push('/');
  }


  function handleNavVisible() {
    if (location.pathname === '/movies'
      || location.pathname === '/saved-movies'
      || location.pathname === '/profile') {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true)
    }
    ;
  }

  function handleFootVisible() {
    if (location.pathname === '/movies'
      || location.pathname === '/saved-movies'
      || location.pathname === '/') {
      setIsFootVisible(true);
    } else {
      setIsFootVisible(false)
    }
    ;
  }

  React.useEffect(() => {
    handleNavVisible();
    handleFootVisible();
  }, [location.pathname]);

  function handleNavOpen() {
    setIsNavOpen(true);
  };

  function handleNAvClose() {
    setIsNavOpen(false);
  }

  return (
    <div className="page">
      <Header visible={isNavVisible} onNavOpen={handleNavOpen}/>
      <Navigation visible={isNavVisible} navOpen={isNavOpen} navClose={handleNAvClose}/>

      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>

        <Route path="/signup">
          <Register/>
        </Route>

        <Route path="/signin">
          <Login/>
        </Route>

        <Route path="/profile">
          <Profile/>
        </Route>

        <Route path="/movies">
          <Movies moviesCards={moviesCards}/>
        </Route>

        <Route path="/saved-movies">
          <Movies moviesCards={moviesCards.filter(item => item.saved)}/>
        </Route>

        <Route path="*">
          <PageNotFound/>
        </Route>
      </Switch>
      <Footer visible={isFootVisible}/>
    </div>
  );
}

export default App;