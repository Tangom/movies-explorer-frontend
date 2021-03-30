import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';

function Movies({savedMovies, onSubmitSearch, movies, isLoading, loadingError, onBookmarkClick, isSavedMovie}) {

  const [shortFilm, setShortFilm] = React.useState(false);

  function onFilter(filterOn) {
    setShortFilm(filterOn);
  }

  function filterShortFilm(movies) {
    return movies.filter((item) => {
      return item.duration < 40;
    })
  }

  return (
    <section className="movies">
      <SearchForm onFilter={onFilter} submitSearch={onSubmitSearch}/>
      {isLoading && <Preloader/>}
      {!isLoading && loadingError === '' &&
      <MoviesCardList
        savedMovies={savedMovies}
        movies={shortFilm ? filterShortFilm(movies) : movies}
        onBookmarkClick={onBookmarkClick}
        isSavedMovie={isSavedMovie}
      />
      }
      {!isLoading && loadingError !== '' && <div className="movies__not-found">{loadingError}</div>}
    </section>
  );
}

export default Movies;