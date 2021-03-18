import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({moviesCard, onSaveMovie, saveMoviesCards, }) {
  const cardElements = moviesCard.slice(0, 12)
    .map((item) =>
      (<li key={item.id}>
        <MoviesCard
          key={moviesCard.id}
          moviesCard={moviesCard}
          onSaveMovie={onSaveMovie}
          saveMoviesCards={saveMoviesCards}
          />
      </li>));
  return moviesCard.length > 0 ?
    <ul className="cards">
      {cardElements}
    </ul>
    : <p className="cards__not-found">Ничего не найдено</p>;
}

export default MoviesCardList;