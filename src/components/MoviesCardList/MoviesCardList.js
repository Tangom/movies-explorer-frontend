import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({cards, savedMovies, userMovie, deleteMovieCard}) {
  const cardElements = cards.slice(0, 12)
    .map((item) =>
      (<li key={item.id}>
        <MoviesCard
          data={item}
          savedMovies={savedMovies}
          isSavedMovie={userMovie.some(usersItem => usersItem.id === item.id)}
          deleteMovieCard={deleteMovieCard}/>
      </li>));
  return cardElements.length > 0 ?
    <ul className="cards">
      {cardElements}
    </ul>
    : <p className="cards__not-found">Ничего не найдено</p>;
}

export default MoviesCardList;