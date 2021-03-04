import { useLocation } from "react-router";

function MoviesCard({data}) {
    const { nameRU, image} = data;
    const location = useLocation();
    return (
        <div className="movies-card">
            <div className="movies-card__content">
                <div className="movies-card__description">
                    <h2 className="movies-card__title">{nameRU}</h2>
                    <p className="movies-card__duration">1ч 47м</p>
                </div>
                <button className= {`movies-card__button ${(location.pathname === "/saved-movies"? "movies-card__button_delete":"")}`} type="button" />
            </div>
            <img className="movies-card__image" alt={nameRU} src={image} />
        </div>
    )
}

export default MoviesCard;