import React from 'react';
import {useLocation} from "react-router";

function MoviesCard({savedMovies, movie, onBookmarkClick, isSavedMovie}) {
  const location = useLocation();
  const {nameRU, duration, trailer, image} = movie;
  const isSaved = isSavedMovie(movie);

  function durationFormat(duration) {
    const hh = Math.trunc(duration / 60)
    const mm = duration % 60;
    return `${hh > 0 ? hh + 'ч ' : ''}${mm}м`
  }

  function handleOnClick(evt) {
    evt.preventDefault();
    onBookmarkClick(movie, !isSaved)
  }

  function handleOnDelete() {
    onBookmarkClick(movie, false);
  }

  return (
    <div className="movies-card">
      <div className="movies-card__content">
        <div className="movies-card__description">
          <h2 className="movies-card__title">{nameRU}</h2>
          <p className="movies-card__duration">{durationFormat(duration)}</p>
        </div>
        <button
          className={`movies-card__button ${isSaved ? "movies-card__button_save" : ''} ${(location.pathname === "/saved-movies" ? "movies-card__button_delete" : "")}`}
          type="button" onClick={location.pathname === "/saved-movies" ? handleOnDelete : handleOnClick}/>
      </div>
      <a href={trailer} target="_blank">
        <img className="movies-card__image" alt={nameRU} src={image}/>
      </a>
    </div>
  )
}

export default MoviesCard;