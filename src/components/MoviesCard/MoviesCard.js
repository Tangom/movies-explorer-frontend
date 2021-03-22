import React from 'react';
import {useLocation} from "react-router";

function MoviesCard({onSaveMovie, moviesCard, onBookmarkClick}) {
  const location = useLocation();

  let isSave = onSaveMovie(moviesCard);

  function handleClick(evt) {
    evt.preventDefault();
    location.pathname === "/saved-movies" ?
      onBookmarkClick(moviesCard, false)
      : onBookmarkClick(moviesCard, !isSave);
  }


  function duration(duration) {
    const hh = Math.trunc(duration / 60)
    const mm = duration % 60;
    return `${hh>0 ? hh+'ч ' : ''}${mm}м`
  }

  return (
    <div className="movies-card">
      <div className="movies-card__content">
        <div className="movies-card__description">
          <h2 className="movies-card__title">{moviesCard.nameRU}</h2>
          <p className="movies-card__duration">{duration(moviesCard.duration)}</p>
        </div>
        <button
          className={`movies-card__button ${(location.pathname === "/saved-movies" ? "movies-card__button_delete" : "")}`}
          type="button" onClick={handleClick}/>
      </div>
      <a href={moviesCard.trailer} target="_blank">
        <img className="movies-card__image" alt={moviesCard.nameRU} src={moviesCard.image}/>
      </a>
    </div>
  )
}

export default MoviesCard;