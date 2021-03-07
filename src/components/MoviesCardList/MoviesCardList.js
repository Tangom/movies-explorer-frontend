import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({cards}) {
  const cardElements = cards.slice(0, 12).map((item) => <li key={item.id}><MoviesCard data={item}/></li>);
  return (
    <ul className="cards">
      {cardElements}
    </ul>
  );
}

export default MoviesCardList;