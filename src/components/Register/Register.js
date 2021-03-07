import logo from '../../images/logo.svg';
import {Link} from 'react-router-dom';
import Input from '../Input/Input';
import Confirmation from '../Confirmation/Confirmation'
import React from 'react';


function Register() {

  return (
    <section className="register">
      <Link to="/" className="register__logo"><img src={logo} alt="Логотип"/></Link>
      <h2 className="register__title">Добро пожаловать!</h2>

      <Confirmation
        name="register"
        buttonText="Зарегистрироваться"
        linkText="Уже зарегистрированы?"
        linkButton="Войти"
        link="/signin"
      >
        <Input
          name="name"
          placeholder="Имя"
          min="2"
          max="30"
        />

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

export default Register;