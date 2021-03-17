import logo from '../../images/logo.svg';
import {Link} from 'react-router-dom';
import Input from '../Input/Input';
import Confirmation from '../Confirmation/Confirmation'
import React from 'react';

function Login({onLogin}) {

  const [inputValue, setInputValue] = React.useState({
    email: '',
    password: '',
  });

  function onSubmit(evt) {
    evt.preventDefault();
    onLogin(inputValue);
    setInputValue({
      email: '',
      password: '',
    })
  };

  function onChange(evt) {
    const {name, value} = evt.target;
    setInputValue({
      ...inputValue,
      [name]: value
    });
  }

  function disabledButton(evt) {
    evt.preventDefault();
    onLogin(inputValue);
  }

  return (
    <section className="login">
      <Link to="/" className="login__logo"><img src={logo} alt="Логотип"/></Link>
      <h2 className="login__title">Рады видеть!</h2>

      <Confirmation
        name="login"
        buttonText="Войти"
        linkText="Ещё не зарегистрированы?"
        linkButton="Регистрация"
        link="/signup"
        onSubmit={onSubmit}
        disabledButton={disabledButton}
      >

        <Input
          name="email"
          placeholder="Email"
          min="6"
          max="40"
          onChange={onChange}
        />

        <Input
          name="password"
          placeholder="Пароль"
          min="8"
          max=""
          onChange={onChange}
        />

      </Confirmation>

    </section>
  );
}

export default Login;