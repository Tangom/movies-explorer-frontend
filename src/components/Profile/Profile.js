import React from 'react';
import {CurrentUserContext} from '../../context/CurrentUserContext';

function Profile(saveProfile, signOut) {

  const [inputValue, setInputValue] = React.useState({
    name: '',
    email: '',
  });

  const [inputError, setInputError] = React.useState({
    name: true,
    email: true,
  });

  const [isValid, setIsValid] = React.useState(true);


  const currentUser = React.useContext(CurrentUserContext);

  // React.useEffect(() => {
  //   setInputValue({
  //     ...inputValue,
  //     name: currentUser.name || '',
  //     email: currentUser.email || ''
  //   })
  // }, [currentUser]);

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

  function handleOnSubmit(evt) {
    evt.preventDefault();
    saveProfile(inputValue);
  }

  function handleName(evt) {
    setInputValue({...inputValue, name: evt.target.value})
    setInputError({...inputError, name: evt.target.value.length < 2})
  };

  function handleEmail(evt) {
    setInputValue({...inputValue, email: evt.target.value})
    const eml = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
    setInputError({...inputError, email: !eml.test(evt.target.value)})
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

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <form className="profile__form" action="post" name="profile" noValidate onSubmit={handleOnSubmit}>
        <label className="profile__label">Имя
          <input className="profile__input" type="text" minLength="2" maxLength="30" required
                 style={{color: inputError.name ? 'red' : 'white'}}
                 value={inputValue.name} onChange={(evt) => {
            handleName(evt)
          }}/>
        </label>
        <div className="profile__line"/>
        <label className="profile__label">Почта
          <input className="profile__input" type="Email" minLength="6" maxLength="40" required value={inputValue.email}
                 style={{color: inputError.name ? 'red' : 'white'}}
                 onChange={(evt) => {
                   handleEmail(evt)
                 }}/>
        </label>
        <div className="profile__button-zone">
                    <span className="profile__error profile__error_visible">
                            Ошибка.
                    </span>
          <button type="submit" className={`profile__button ${isValid && 'profile__button_disabled'}`}
                  disabled={isValid}>>
            Редактировать
          </button>
          <button className="profile__button profile__button_color" onClick={signOut}>
            Выйти из аккаунта
          </button>
        </div>


      </form>
    </section>
  )
}

export default Profile;