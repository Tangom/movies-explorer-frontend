import {useHistory} from 'react-router-dom';

function PageNotFound() {

  const history = useHistory();

  return (
    <section class="notFound">
      <h2 className="notFound__title">404</h2>
      <p className="notFound__text">Страница не найдена</p>
      <button className="notFound__button" onClick={() => history.goBack()}>Назад</button>
    </section>
  );
}

export default PageNotFound;