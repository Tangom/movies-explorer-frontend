import search from '../../images/search.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <input className="search__input" placeholder="Фильм" required/>
        <button type="submit" className="search__button ">
          <img src={search} alt="search" className="search__image"/>
        </button>
      </form>
      <div className="search__line">
        <FilterCheckbox/>
      </div>
    </section>
  )
}

export default SearchForm;