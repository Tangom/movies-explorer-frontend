import React from 'react';
import logo from '../../images/logo.svg';
import profile from '../../images/profile.svg'
import { NavLink } from 'react-router-dom';

function Header() {
    
   const [loggedIn, setLoggedIn] = React.useState(false);

  return(
    <header className="header">
      <NavLink to="/" className="logo"><img src={logo} alt="Логотип"/></NavLink>

      <div className="header__container"> 
              {loggedIn && (<nav className="header__auth ">
          <NavLink to="/signup" className="header__signup" >Регистрация</NavLink>
          <NavLink to="/signin" className="header__signin" >Войти</NavLink>
              </nav>)}
        <div className="header__cover">
               {!loggedIn && ( <nav className="header__menu">
            <NavLink to="/" className="header__menu-item" >Главная</NavLink>
            <NavLink to="/movies" className="header__menu-item" activeClassName="header__menu-item_active">Фильмы</NavLink>
            <NavLink to="/saved-movies" className="header__menu-item" activeClassName="header__menu-item_active" >Сохранённые фильмы</NavLink>
            <NavLink to="/profile" className="header__profile">
              <p className="header__profile-text">Аккаунт</p>
              <img src={profile} alt="Аккаунт" className="header__profile-img"/>
            </NavLink>
            <div className="header__close-menu" >
              <div className="header__cross"></div>
            </div>
              </nav>)}
        </div>
        {loggedIn && (<div className="header__open-menu" >
          <div className="header__line"></div>
        </div>)}
        
      </div>
      
    </header>
  )
}

export default Header;