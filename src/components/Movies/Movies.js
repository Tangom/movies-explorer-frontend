import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';

function Movies({submitSearch, turnOn, cards, onSaveMovie, saveMoviesCards}) {

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
      <Preloader turnOn={turnOn}/>
      <MoviesCardList
        onSaveMovie={onSaveMovie}
        saveMoviesCards={saveMoviesCards}
        moviesCard={shortFilm ? filterShortFilm(cards) : cards}/>
      {cards.length > 12 && <button className="movies__more">Ещё</button>}
    </section>
  );
}

export default Movies;