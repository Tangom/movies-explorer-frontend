import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import profile from '../../images/profile.svg'


function Navigation(props) {

  return (
    <nav
      className={`navigation ${!props.visible ? 'navigation_none' : ''} 
            ${props.navOpen ? 'navigation_open' : ''}`}>
      <div className="navigation__container">
        <button
          className="navigation__close navigation__button navigation__button_visible"
          onClick={props.navClose}/>
        <ul className="navigation__movies">
          <li className="navigation__movies-item">
            <NavLink exact to="/"
                     className="navigation__button navigation__button_visible"
                     activeClassName="navigation__button_active">
              Главная</NavLink>
          </li>
          <li className="navigation__movies-item">
            <NavLink to="/movies"
                     className="navigation__button navigation__button_boild"
                     activeClassName="navigation__button_active">
              Фильмы</NavLink>
          </li>
          <li className="navigation__movies-item">
            <NavLink to="/saved-movies"
                     className="navigation__button"
                     activeClassName="navigation__button_active">
              Сохранённые фильмы</NavLink>
          </li>
        </ul>
        <Link to="/profile" className="navigation__button-accaunt">
          Аккаунт
          <div className="navigation__button-accaunt-circle">
            <img src={profile} alt="Аккаунт"
                 className="navigation-logo"/>
          </div>
        </Link>
      </div>
    </nav>
  )
}

export default Navigation;