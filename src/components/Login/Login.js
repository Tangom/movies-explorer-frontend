import logo from '../../images/logo.svg';
import { NavLink } from 'react-router-dom';
import Input from '../Input/Input';
import Confirmation from '../Confirmation/Confirmation'
import React from 'react';

function Login() {
  
    return (
      <section className="login">
        <NavLink to="/" className="logo"><img src={logo} alt="Логотип"/></NavLink>
        <h2 className="login__title">Рады видеть!</h2>

        <Confirmation
          name="login"
          buttonText="Войти"
          linkText="Ещё не зарегистрированы?"
          linkButton="Регистрация"
          link="/signup"
          > 

        <Input
          name="email"
          placeholder="Email"
          min="6"
          max="40"
        /> 

        <Input
          name="password"
          placeholder="Пароль"
          min="8"
          max=""
        /> 

        </Confirmation>
      
      </section> 
    );
}
  
export default Login;