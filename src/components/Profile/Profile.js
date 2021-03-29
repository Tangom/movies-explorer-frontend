import React from 'react';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import cn from 'classnames';

function Profile(onUpdateUser, signOut, message) {

  const [inputValue, setInputValue] = React.useState({
    name: '',
    email: '',
  });

  const [inputError, setInputError] = React.useState({
    name: true,
    email: true,
  });

  // const [inputDirty, setInputDirty] = React.useState({
  //   name: false,
  //   email: false,
  // });

  const [isValid, setIsValid] = React.useState(true);

  // function blurHandler(evt) {
  //   switch (evt.target.name) {
  //     case 'name':
  //       return setInputDirty({...inputDirty, name: true})
  //     case 'email':
  //       return setInputDirty({...inputDirty, email: true})
  //     default:
  //       console.log('Не соответствует ни одному из вариантов')
  //   }
  // }
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setInputValue({
      ...inputValue,
      name: currentUser.name || '',
      email: currentUser.email || ''
    })
  }, [currentUser]);

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


  function handleName(evt) {
    setInputValue({...inputValue, name: evt.target.value})
    setInputError({...inputError, name: evt.target.value.length < 2})
  }

  function handleEmail(evt) {
    setInputValue({...inputValue, email: evt.target.value})
    const reg = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
    setInputError({...inputError, email: !reg.test(evt.target.value)})
  }

  function handleOnSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(inputValue);
  }

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <form className="profile__form" name="profile" noValidate onSubmit={handleOnSubmit}>
        <label className="profile__label">Имя
          <input className="profile__input" type="text" minLength="2" maxLength="30" required
                 style={{color: inputError.name ? 'red' : 'white'}}
                 value={inputValue.name}
                 onChange={(evt) => {
                   handleName(evt)
                 }}
          />
        </label>
        <span
          className={cn('profile__error', {'profile__error_visible': inputError.name})}>
                    Имя заполнено некорректно
        </span>
        <div className="profile__line"/>
        <label className="profile__label">Почта
          <input className="profile__input" type="Email" minLength="6" maxLength="40" required value={inputValue.email}
                 style={{color: inputError.email ? 'red' : 'white'}}
                 onChange={(evt) => {
                   handleEmail(evt)
                 }}
          />
        </label>
        <span
          className={cn('profile__error', {'profile__error_visible': inputError.email})}>
                    Поле Email заполнено некорректно
        </span>
        <div className="profile__button-zone">
                    <span className="profile__error profile__error_visible">{message}
                    </span>
          <button type="submit" className={cn('profile__button', {'profile__button_disabled': isValid})}
                  disabled={isValid}>>
            Редактировать
          </button>
          <button type="button" className="profile__button profile__button_color" onClick={signOut}>
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  )
}

export default Profile;