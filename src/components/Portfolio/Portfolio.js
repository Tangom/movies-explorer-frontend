function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a className="portfolio__link" target="blank" href="https://github.com/Tangom/russian-travel">
            <p className="portfolio__text">Russian travel</p>
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" target="blank" href="https://github.com/Tangom/react-mesto-auth">
            <p className="portfolio__text">Адаптивный сайт Mesto</p>
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" target="blank" href="https://tangom.github.io/Tarot/index.html">
            <p className="portfolio__text">Одностраничный сайт Таро</p>
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;