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

  const [inputError, setInputError] = React.useState({
    email: true,
    password: true,
  });

  const [isValid, setIsValid] = React.useState(true);

  React.useEffect(() => {
    if (
      !inputError.email &&
      !inputError.password
    ) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [inputError]);

  function handlerEmail(evt) {
    setInputValue({...inputValue, email: evt.target.value})
    const reg = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
    setInputError({...inputError, email: !reg.test(evt.target.value)})
  };

  function handlerPassword(evt) {
    setInputValue({...inputValue, password: evt.target.value})
    setInputError({...inputError, password: evt.target.value.length < 8})
  };

  function onSubmit(evt) {
    evt.preventDefault();
    onLogin(inputValue);
    setInputValue({
      email: '',
      password: '',
    })
  };


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
        disabledButton={isValid}
      >

        <Input
          name="email"
          placeholder="Email"
          min="6"
          max="40"
          onChange={(evt) => {
            handlerEmail(evt)
          }}
          error={inputError.email}
          value={inputValue.email}
        />

        <Input
          name="password"
          placeholder="Пароль"
          min="8"
          max=""
          onChange={(evt) => {
            handlerPassword(evt)
          }}
          error={inputError.password}
          value={inputValue.password}
        />

      </Confirmation>

    </section>
  );
}

export default Login;