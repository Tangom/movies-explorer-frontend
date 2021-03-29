import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';

function Movies({submitSearch, isLoading, deleteMovieCard, moviesCard, onSaveMovie, onBookmarkClick}) {

  const [shortFilm, setShortFilm] = React.useState(false);


  function onFilter(filterOn) {
    setShortFilm(filterOn);
  }

  function filterShortFilm(moviesCard) {
    return moviesCard.filter((item) => {
      return item.duration < 40;
    })
  }

  return (
    <section className="movies">
      <SearchForm onFilter={onFilter} submitSearch={submitSearch}/>
      {isLoading && <Preloader/>}
      <MoviesCardList
        deleteMovieCard={deleteMovieCard}
        onBookmarkClick={onBookmarkClick}
        onSaveMovie={onSaveMovie}
        moviesCard={shortFilm ? filterShortFilm(moviesCard) : moviesCard}/>
    </section>
  );
}

export default Movies;