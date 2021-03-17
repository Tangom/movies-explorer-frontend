function FilterCheckbox({onFilter}) {

  function handlerChange(evt) {
    onFilter(evt.target.checked);
  }

  return (
    <label className="filter-checkbox filter-checkbox_screen filter-checkbox_mobile">
      Короткометражки
      <input className="filter-checkbox__button filter-checkbox__button_visible" type="checkbox"
             onChange={handlerChange}/>
    </label>
  )
}

export default FilterCheckbox;