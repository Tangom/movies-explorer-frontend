import MoviesCard from "../MoviesCard/MoviesCard";
import React from "react";

function MoviesCardList({movies, onBookmarkClick, isSavedMovie}) {

  const [extraPortion, setExtraPortion] = React.useState(3);
  const [currentCount, setCurrenCount] = React.useState(0);
  const [renderMovies, setRenderMovies] = React.useState([]);

  function getCount(windowSize) {
    if (windowSize > 768) {
      return {first: 12, extra: 3}
    } else if (windowSize > 480 && windowSize <= 768) {
      return {first: 8, extra: 2}
    } else {
      return {first: 5, extra: 2}
    }
  }

  function renderPortion() {
    const count = Math.min(movies.length, currentCount + extraPortion);
    const extraMovies = movies.slice(currentCount, count)
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
    const count = Math.min(movies.length, sizePortion.first);
    setRenderMovies(movies.slice(0, count));
    setCurrenCount(count);
  }, [movies])

  return (
    <>
      <section className="cards">
        {
          renderMovies.map((movie) => (
            <MoviesCard
              key={movie.id}
              movie={movie}
              onBookmarkClick={onBookmarkClick}
              isSavedMovie={isSavedMovie}
            />
          ))
        }
      </section>
      {currentCount < movies.length && <button className="cards__more" onClick={renderPortion}>Ещё</button>}
    </>
  );
}

export default MoviesCardList;