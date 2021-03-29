import React from 'react';
import logo from '../../images/logo.svg';
import {Link, useLocation} from 'react-router-dom';

function Header(props) {

  const location = useLocation();
  const [headerType, isHeaderType] = React.useState({
    headerVisible: false,
    buttonVisible: false,
  });

  function handleHeaderType() {
    if (location.pathname === '/'&& !props.loggedIn) {
      isHeaderType({
        headerVisible: true,
        buttonVisible: true,
      });
    }
    if (location.pathname === '/movies'
      || location.pathname === '/saved-movies') {
      isHeaderType({
        headerVisible: true,
        buttonVisible: false,
      });
    } else {
      if (location.pathname === '/signin'
        || location.pathname === '/signup') {
        isHeaderType({
          headerVisible: false,
          buttonVisible: false,
        });
      }
      if (location.pathname === '/profile') {
        isHeaderType({
          headerVisible: true,
          buttonVisible: false,
        });
      }
    }
  }

  React.useEffect(() => {
    handleHeaderType();
  }, [location.pathname])

  return (
    <header className={`header  ${headerType.headerVisible ? 'header_visible' : ''}`}
    >
      <Link
        to="/"
        className="header__logo"
      >
        <img src={logo} alt="логотип"/>
      </Link>
      <button
        className={`header__nav-button ${!props.visible ? 'header__nav-button_display' : ''}`}
        onClick={props.onNavOpen}/>
      <ul className={`header__button-list 
          ${headerType.buttonVisible ? 'header__button-list_display' : ''}`}
      >
        <li>
          <Link
            to="/signup"
            className="header__button-signup"
          >Регистрация</Link>
        </li>
        <li>
          <Link
            to="/signin"
            className="header__button-signin"
          >Войти</Link>
        </li>
      </ul>
    </header>
  )
}

export default Header;