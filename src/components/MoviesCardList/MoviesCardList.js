import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({moviesCard, renderMovies, onSaveMovie, deleteMovieCard, onBookmarkClick}) {
  renderMovies = moviesCard.slice(0, 12)
    .map((item) =>
      (<li key={item.id}>
        <MoviesCard
          onBookmarkClick={onBookmarkClick}
          moviesCard={item}
          onSaveMovie={onSaveMovie}
          deleteMovieCard={deleteMovieCard}
        />
      </li>));
  return ((moviesCard && moviesCard.length) || 0)> 0 ?
    <ul className="cards">
      {renderMovies}
    </ul>
    : <p className="cards__not-found">Ничего не найдено</p>;
}

export default MoviesCardList;