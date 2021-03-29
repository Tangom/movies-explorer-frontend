import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';

function Movies({submitSearch, isLoading, deleteMovieCard, moviesCard, onSaveMovie, onBookmarkClick}) {

  const [shortFilm, setShortFilm] = React.useState(false);

  const [extraPortion, setExtraPortion] = React.useState(3);
  const [currentCount, setCurrenCount] = React.useState(0);
  const [renderMovies, setRenderMovies] = React.useState([]);

  function getCount(windowSize) {
    if (windowSize > 1190) {
      return {first: 12, extra: 3}
    } else if (windowSize > 480 && windowSize <= 767) {
      return {first: 8, extra: 2}
    } else {
      return {first: 5, extra: 2}
    }
  }

  function renderPortion() {
    const count = Math.min(moviesCard.length, currentCount + extraPortion);
    const extraMovies = moviesCard.slice(currentCount, count)
    setRenderMovies([...renderMovies, ...extraMovies]);
    setCurrenCount(count);
  }

  function handleResize() {
    const windowSize = window.innerWidth;
    const sizePortion = getCount(windowSize);
    setExtraPortion(sizePortion.extra);
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      {
      renderMovies.map((moviesCard) => (
      <MoviesCardList
        deleteMovieCard={deleteMovieCard}
        onBookmarkClick={onBookmarkClick}
        onSaveMovie={onSaveMovie}
        moviesCard={shortFilm ? filterShortFilm(moviesCard) : moviesCard}/>
      ))
      }
      {moviesCard.length > 12 && <button className="movies__more" onClick={renderPortion}>Ещё</button>}
    </section>
  );
}

export default Movies;