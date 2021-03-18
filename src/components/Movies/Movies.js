import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';

function Movies({submitSearch, isLoading, cards, onSaveMovie, onBookmarkClick}) {

  const [shortFilm, setShortFilm] = React.useState(false);

  function onFilter(filterOn) {
    setShortFilm(filterOn);
  }

  function filterShortFilm(cards) {
    return cards.filter((item) => {
      return item.duration < 40;
    })
  }

  return (
    <section className="movies">
      <SearchForm onFilter={onFilter} submitSearch={submitSearch}/>
      {isLoading && <Preloader/>}
      <MoviesCardList
        onBookmarkClick={onBookmarkClick}
        onSaveMovie={onSaveMovie}

        moviesCard={shortFilm ? filterShortFilm(cards) : cards}/>
      {cards.length > 12 && <button className="movies__more">Ещё</button>}
    </section>
  );
}

export default Movies;