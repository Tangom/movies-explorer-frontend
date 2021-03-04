import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';
import moviesCards from '../../utils/moviesCards';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <div className="page">
      { loggedIn && <Header /> }

      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <Route path="/signup">
          <Register />
        </Route>
        
        <Route path="/signin">
          <Login />
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
          <PageNotFound />
        </Route>
      </Switch>

      { loggedIn && <Footer /> }
    </div>
  );
}

export default App;