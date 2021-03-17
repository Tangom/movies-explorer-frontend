import React from 'react';
import search from '../../images/search.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


function SearchForm({onFilter, submitSearch}) {

  const [query, setQuery] = React.useState('');

  function handleOnChange(evt) {
    setQuery(evt.target.value);
  }

  function submitForm(evt) {
    evt.preventDefault();
    submitSearch(query);
  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={submitForm}>
        <input className="search__input" placeholder="Фильм" onChange={handleOnChange} required/>
        <button type="submit" className="search__button ">
          <img src={search} alt="search" className="search__image"/>
        </button>
      </form>
      <div className="search__line">
        <FilterCheckbox onFilter={onFilter}/>
      </div>
    </section>
  )
}

export default SearchForm;