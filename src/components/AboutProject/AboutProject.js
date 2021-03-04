import Title from '../Title/Title';

function AboutProject() {
  return (
    <section className="project" id="project">
      <Title
       title="О проекте"
      />
      <ul className="project__content">
        <li className="project__content-item">
          <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="project__content-item">
          <h3 className="project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="project__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="project-info">
        <div className="project-info__item project-info__item_green">1 неделя</div>
        <div className="project-info__item project-info__item_grey">4 недели</div>
        <div className="project-info__description">Back-end</div>
        <div className="project-info__description">Front-end</div>
      </div>
    </section>
  );
}

export default AboutProject;