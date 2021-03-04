import React from 'react';

function Profile() {
    return (
        <section className="profile">
            <h1 className="profile__title">Привет, Александр!</h1>
            <form className="profile__form">
                <label className="profile__label">Имя
            <input className="profile__input profile__input_error" type="text" minLength="2" maxLength="30" required />
                </label>
                <div className="profile__line" />
                <label className="profile__label">Почта
            <input className="profile__input" type="Email" minLength="6" maxLength="40" required/>
                </label>
                <div className="profile__button-zone">
                    <span className="profile__error profile__error_visible">
                            Ошибка.
                    </span>
                    <button type="submit" className="profile__button profile__button_disabled">
                            Редактировать
                     </button>
                    <button className="profile__button profile__button_color">
                            Выйти из аккаунта
                    </button>
                </div>


            </form>
        </section>
    )
}

export default Profile;