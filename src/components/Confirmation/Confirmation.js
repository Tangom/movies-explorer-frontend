import {NavLink} from 'react-router-dom';

function Confirmation({name, buttonText, linkText, link, onSubmit, disabledButton, linkButton, ...props}) {
  return (

    <form className="form" action="post" name={name} noValidate onSubmit={onSubmit}>
      {
        props.children
      }
      <button className={`form__button ${disabledButton && 'form__button_disabled'} form__button_${name}`}
              disabled={disabledButton}>{buttonText}</button>
      <p className="form__text">{linkText}
        <NavLink className="form__link" to={link}>{linkButton}</NavLink>
      </p>
    </form>
  );
}

export default Confirmation;