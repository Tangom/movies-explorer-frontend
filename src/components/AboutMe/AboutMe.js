import Title from '../Title/Title';
import photo from '../../images/photo.svg';

function AboutMe() {
  return (
    <section className="aboutme" id="aboutme">
      <Title
        title="Студент"
      />
      <div className="aboutme__container">
        <div className="aboutme__student">
          <div className="aboutme__info">
           <h3 className="aboutme__name">Александр</h3>
           <p className="aboutme__bio">Фронтенд-разработчик, 40 лет</p>
           <p className="aboutme__story">Я родился и живу в Санкт-Петербурге, закончил факультет технологии и исследования материалов СпбГПУ(Политех). У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь танго. Недавно начал кодить. С 2012 года работал в компании «Промснаб». После того, как прошёл курс по веб-разработке, ушёл с постоянной работы.</p>
          </div>
          <ul className="aboutme__links">
            <li className="aboutme__links-item">
              <a className="aboutme__link" href="/">Facebook</a>
            </li>
            <li className="aboutme__links-item">
              <a className="aboutme__link" href="https://github.com/Tangom">Github</a>
            </li>
          </ul>
        </div>
        <img className="aboutme__photo" src={photo} alt="Фото"/>
      </div>
    </section>

  );
}

export default AboutMe;