import logo from '../../images/logo.svg';
import {Link} from 'react-router-dom';
import Input from '../Input/Input';
import Confirmation from '../Confirmation/Confirmation'
import React from 'react';


function Register({onRegister}) {

  const [inputValue, setInputValue] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const [isValid, setIsValid] = React.useState(true);
  const [inputError, setInputError] = React.useState({
    name: true,
    email: true,
    password: true,
  });

  React.useEffect(() => {
    if (
      !inputError.name &&
      !inputError.email &&
      !inputError.password
    ) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [inputError]);

  function onSubmit(evt) {
    evt.preventDefault();
    onRegister(inputValue);
    setInputValue({
      name: '',
      email: '',
      password: '',
    })
  };

  function handlerName(evt) {
    setInputValue({ ...inputValue, name: evt.target.value })
    setInputError({ ...inputError, name: evt.target.value.length < 2 })
  };

  function handlerEmail(evt) {
    setInputValue({ ...inputValue, email: evt.target.value })
    const reg = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
    setInputError({ ...inputError, email: !reg.test(evt.target.value) })
  };

  function handlerPassword(evt) {
    setInputValue({ ...inputValue, password: evt.target.value })
    setInputError({ ...inputError, password: evt.target.value.length < 8 })
  };


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
        onSubmit={onSubmit}
        disabledButton={isValid}
      >
        <Input
          name="name"
          placeholder="Имя"
          min="2"
          max="30"
          onChange={(evt) => {
            handlerName(evt)
          }}
          error={inputError.name}
          value={inputValue.name}
        />

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

export default Register;