import React from 'react';
import {Route, Switch, useLocation} from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';
import moviesCards from '../../utils/moviesCards';

function App() {

  const location = useLocation();
  const [isNavVisible, setIsNavVisible] = React.useState(false);
  const [isFootVisible, setIsFootVisible] = React.useState(false);
  const [isNavOpen, setIsNavOpen] = React.useState(false);

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