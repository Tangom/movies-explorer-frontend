import React from 'react';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import cn from 'classnames';

function Profile({ signOut, onUpdateUser, ...props }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [inputValue, setInputValue] = React.useState({
    name: '',
    email: '',
  });

  const [inputError, setInputError] = React.useState({
    name: true,
    email: true,
  });

  const [inputDirty, setInputDirty] = React.useState({
    name: false,
    email: false,
  });

  const [isValid, setIsValid] = React.useState(true);

  function blurHandler(e) {
    switch (e.target.name) {
      case 'name':
        return setInputDirty({ ...inputDirty, name: true })
      case 'email':
        return setInputDirty({ ...inputDirty, email: true })
      default:
        console.log('Не соответствует ни одному из вариантов')
    }
  };

  React.useEffect(() => {
    if (
      !inputError.name &&
      !inputError.email
    ) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [inputError]);


  function nameHandler(e) {
    setInputValue({ ...inputValue, name: e.target.value })
    setInputError({ ...inputError, name: e.target.value.length < 3 })
  };


  function emailHandler(e) {
    setInputValue({ ...inputValue, email: e.target.value })
    const reg = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
    setInputError({ ...inputError, email: !reg.test(e.target.value) })
  };

  function handlerSubmit(e) {
    e.preventDefault();
    onUpdateUser(inputValue);
  };

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <form className="profile__form" onSubmit={handlerSubmit}>
        <label className="profile__label">Имя
          <input
            className="profile__input profile__input_error"
            type="text"
            minLength="2"
            maxLength="30"
            onBlur={(e) => {
              blurHandler(e)
            }}
            style={{ color: inputError.name & inputDirty.name ? 'red' : 'white' }}
            onChange={(e) => {
              nameHandler(e)
            }}
            name="name"
            value={inputValue.name}
            required
          />
        </label>
        <span
          className={cn('profile__error', { 'profile__error_visible': inputError.name & inputDirty.name })}>
                    Имя заполнено некорректно
                </span>
        <div className="profile__line" />
        <label className="profile__label">Почта
          <input
            className="profile__input"
            type="Email"
            onBlur={(e) => {
              blurHandler(e)
            }}
            style={{ color: inputError.email & inputDirty.email ? 'red' : 'white' }}
            onChange={(e) => {
              emailHandler(e)
            }}
            name="email"
            value={inputValue.email}
            required
          />
        </label>
        <span
          className={cn('profile__error', { 'profile__error_visible': inputError.email & inputDirty.email })}>
                    Поле Email заполнено некорректно
                    </span>
        <div className="profile__button-zone">
                    <span className="profile__error profile__error_visible"
                    >{props.message}</span>
          <button
            type="submit"
            className={cn('profile__button', { 'profile__button_disabled': isValid})}
            disabled={isValid}>
            Редактировать
          </button>
          <button
            type="button"
            className="profile__button profile__button_color"
            onClick={signOut}
          >Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  )
}

export default Profile;