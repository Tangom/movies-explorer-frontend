import React from 'react';
import {useLocation} from "react-router";

function MoviesCard({saveMoviesCards,onSaveMovie,moviesCard}) {
  const location = useLocation();
  const {duration, image, trailer, nameRU, id} = moviesCard;
  const isSaveDefault = saveMoviesCards.some(i => i.id === moviesCard.id);
  const [isSave, setIsSave] = React.useState(isSaveDefault);

  function handleClick() {
    onSaveMovie(moviesCard);
    setIsSave(!isSave);
  };

  // const handleClick = () => {
  //   if (!saved) {
  //     onSaveMovieCard(moviesCard);
  //   } else {
  //     deleteMovieCard(id);
  //   }
  // };
  return (
    <div className="movies-card">
      <div className="movies-card__content">
        <div className="movies-card__description">
          <h2 className="movies-card__title">{nameRU}</h2>
          <p className="movies-card__duration">{duration}</p>
        </div>
        <button
          className={`movies-card__button ${(location.pathname === "/saved-movies" ? "movies-card__button_delete" : "")}`}
          type="button" onClick={handleClick}/>
      </div>
      <a href={trailer} target="_blank">
        <img className="movies-card__image" alt={nameRU} src={image}/>
      </a>
    </div>
  )
}

export default MoviesCard;