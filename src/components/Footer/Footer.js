function Footer(props) {
  return (
    <footer className={`footer ${props.visible ? 'footer_visible' : ''}`}>
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__info">
        <p className="footer__copyright">&copy; 2021</p>
        <ul className="footer__links">
          <li className="footer__item"><a href="https://praktikum.yandex.ru/"
                                          className="footer__link">Яндекс.Практикум</a></li>
          <li className="footer__item"><a href="https://github.com/Tangom" className="footer__link">Github</a></li>
          <li className="footer__item"><a href="/" className="footer__link">Facebook</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;