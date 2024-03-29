function Input({name, placeholder, min, max}) {
  return (
    <article className="input">
      <label className="input__label" htmlFor={name}>{placeholder}</label>
      <input className={`input__field input__field_${name}`} id={name} type={name} name={name}
             placeholder="" required minLength={min} maxLength={max}/>
      <span className='input__error input__error_visible'>Что-то пошло не так...</span>
    </article>
  )
}

export default Input;