import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({moviesCards}) {
  return (
    <section className="movies">
      <SearchForm/>
      <MoviesCardList cards={moviesCards}/>
      {moviesCards.length>12 && <button className="movies__more">Ещё</button>}
    </section>
  );
}

export default Movies;