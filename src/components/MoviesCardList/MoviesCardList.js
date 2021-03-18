import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({cards, onSaveMovieCard, userMovie, deleteMovieCard}) {
  const cardElements = cards.slice(0, 12)
    .map((item) =>
      (<li key={item.id}>
        <MoviesCard
          data={item}
          onSaveMovieCard={onSaveMovieCard}
          saved={userMovie.some(item.id)}
          deleteMovieCard={deleteMovieCard}/>
      </li>));
  return cards.length > 0 ?
    <ul className="cards">
      {cardElements}
    </ul>
    : <p className="cards__not-found">Ничего не найдено</p>;
}

export default MoviesCardList;