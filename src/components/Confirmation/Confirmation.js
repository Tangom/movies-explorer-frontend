import { NavLink } from 'react-router-dom';

function Confirmation({name, buttonText, linkText, link, linkButton, ...props}) {
    return (
      
      <form className="form" action="post" name={name} noValidate>
        { 
          props.children 
        }
        <button className={`form__button form__button_${name}`}>{buttonText}</button>
        <p className="form__text">{linkText}
          <NavLink className="form__link" to={link}>{linkButton}</NavLink>
        </p>
      </form>
    );
  }
  
  export default Confirmation;