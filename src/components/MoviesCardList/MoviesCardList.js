import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({moviesCard, onSaveMovie, onBookmarkClick}) {
  const cardElements = moviesCard.slice(0, 12)
    .map((item) =>
      (<li key={item.id}>
        <MoviesCard
          onBookmarkClick={onBookmarkClick}
          key={moviesCard.id}
          moviesCard={moviesCard}
          onSaveMovie={onSaveMovie}
        />
      </li>));
  return moviesCard.length > 0 ?
    <ul className="cards">
      {cardElements}
    </ul>
    : <p className="cards__not-found">Ничего не найдено</p>;
}

export default MoviesCardList;