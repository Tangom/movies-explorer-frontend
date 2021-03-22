import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({moviesCard, onSaveMovie, deleteMovieCard, onBookmarkClick}) {
  const cardElements = moviesCard.slice(0, 12)
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
      {cardElements}
    </ul>
    : <p className="cards__not-found">Ничего не найдено</p>;
}

export default MoviesCardList;