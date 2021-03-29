import React from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({moviesCard, onSaveMovie, deleteMovieCard, onBookmarkClick}) {

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

  React.useEffect(() => {
    const windowSize = window.innerWidth;
    const sizePortion = getCount(windowSize);
    setExtraPortion(sizePortion.extra);
    const count = Math.min(moviesCard.length, sizePortion.first);
    setRenderMovies(moviesCard.slice(0, count));
    setCurrenCount(count);
  }, [moviesCard])


  renderMovies.map((item) =>
    (<li>
      <MoviesCard
        key={item.id}
        onBookmarkClick={onBookmarkClick}
        moviesCard={item}
        onSaveMovie={onSaveMovie}
        deleteMovieCard={deleteMovieCard}
      />
    </li>));
  return ((moviesCard && moviesCard.length) || 0) > 0 ?
    <ul className="cards">
      {renderMovies}
    </ul>
    : <p className="cards__not-found">Ничего не найдено</p>;

  {moviesCard.length > 12 && <button className="movies__more" onClick={renderPortion}>Ещё</button>}
}

export default MoviesCardList;