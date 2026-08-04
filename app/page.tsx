import LeadForm from "./lead-form";

const solutions = [
  {
    number: "01",
    title: "Дерево и шпон",
    text: "Тёплая фактура для жилых интерьеров, гостиничных номеров и лаунж-зон.",
    image: "/catalog-interiors/solution-wood.webp",
    catalog: "Коллекция дерева",
  },
  {
    number: "02",
    title: "Травертин и мрамор",
    text: "Крупный природный рисунок для акцентных стен, лобби и гостиных.",
    image: "/catalog-interiors/solution-stone.webp",
    catalog: "Коллекция камня",
  },
  {
    number: "03",
    title: "Тканевые поверхности",
    text: "Мягкий визуальный фон для спален, кабинетов и зон ожидания.",
    image: "/catalog-interiors/solution-fabric.webp",
    catalog: "Коллекция текстиля",
  },
  {
    number: "04",
    title: "Металл и патина",
    text: "Выразительный акцент для ресторанов, баров и коммерческих интерьеров.",
    image: "/catalog-interiors/solution-metal.webp",
    catalog: "Коллекция металла",
  },
];

const audiences = [
  ["Частному заказчику", "Поможем понять объём, подобрать декор и собрать решение под интерьер."],
  ["Дизайнеру", "Подбор образцов, понятная спецификация и сопровождение проекта."],
  ["Строителю", "Зафиксируем тип объекта, площадь и данные для будущей комплектации."],
  ["Дилеру", "Покажем основные коллекции и соберём запрос по формату сотрудничества."],
];

const projectOptions = [
  {
    number: "01",
    title: "Общественные зоны",
    text: "Подберём решение под требования объекта, включая помещения с требованиями по пожарной безопасности.",
  },
  {
    number: "02",
    title: "Влагостойкость и ударопрочность",
    text: "Предложим SPC, кварц-винил и WPC с бамбуковым наполнением — под условия конкретного помещения.",
  },
  {
    number: "03",
    title: "Высота до 6 метров",
    text: "Нестандартные панели высотой 3–6 м рассчитываем индивидуально под проект.",
  },
];

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="На главную">
          <span className="brand-mark">F/P</span>
          <span>FORM / PANEL</span>
        </a>
        <a className="topbar-cta" href="#lead">
          Получить прайс
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Open Village · скидка до 50%</p>
          <h1>
            Стены, которые
            <br />
            <em>задают характер.</em>
          </h1>
          <p className="hero-text">
            Декоративные панели для квартир, загородных домов и коммерческих
            интерьеров. Подберём решение и предварительно рассчитаем объём под
            ваш объект. На отдельные позиции выставочная цена — от 1 900 ₽/м².
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#lead">
              Получить прайс и расчёт <span>↗</span>
            </a>
            <a className="text-link" href="#solutions">
              Смотреть решения <span>↓</span>
            </a>
          </div>
          <div className="hero-trust">
            <span>Прайс после квиза</span>
            <span>Проектный расчёт</span>
            <span>Для дома и HoReCa</span>
          </div>
        </div>

        <div className="hero-visual" role="img" aria-label="Современный интерьер с декоративными панелями">
          <div className="hero-badge">
            <strong>01</strong>
            <span>Дерево · камень<br />ткань · металл</span>
          </div>
          <div className="scroll-note">Листайте, чтобы увидеть больше</div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Применение панелей">
        <p>От 1 900 ₽/м².</p>
        <p>Скидка до 50%.</p>
        <span>На отдельные позиции при максимальной скидке · условия уточняются</span>
      </section>

      <section className="section project-options">
        <div className="section-heading compact">
          <p className="eyebrow"><span /> Под задачу проекта</p>
          <h2>Для дома.<br /><em>Для общественных зон.</em></h2>
        </div>
        <div className="project-options-grid">
          {projectOptions.map((item) => (
            <article key={item.title}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section solutions" id="solutions">
        <div className="section-heading">
          <p className="eyebrow"><span /> Решения</p>
          <h2>Одна система.<br /><em>Разный характер.</em></h2>
          <p>
            Четыре направления.
          </p>
        </div>
        <div className="solution-grid">
          {solutions.map((item) => (
            <article className="solution-card" key={item.title}>
              <div className="solution-image" style={{ backgroundImage: `url(${item.image})` }}>
                <span>{item.number}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <small className="solution-meta">{item.catalog}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="section fit-section">
        <div className="fit-intro">
          <p className="eyebrow light"><span /> Для вашего формата работы</p>
          <h2>Говорим с вами<br /><em>на одном языке.</em></h2>
        </div>
        <div className="audience-list">
          {audiences.map(([title, text], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section process">
        <div className="section-heading compact">
          <p className="eyebrow"><span /> Что получите</p>
          <h2>Следующий шаг —<br /><em>уже конкретный.</em></h2>
        </div>
        <div className="process-grid">
          <article>
            <span>01</span>
            <h3>Прайс сразу после квиза</h3>
            <p>Откроем выставочный прайс после сохранения контакта и параметров объекта.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Предварительный расчёт</h3>
            <p>Зафиксируем ориентировочную площадь и подготовим данные для расчёта.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Полные каталоги и образцы</h3>
            <p>По запросу покажем все фактуры и согласуем встречу или передачу образцов.</p>
          </article>
        </div>
      </section>

      <section className="lead-section" id="lead">
        <div className="lead-copy">
          <p className="eyebrow light"><span /> Только для гостей Open Village</p>
          <h2>Получите прайс<br />и расчёт <em>под ваш объект.</em></h2>
          <p>
            Ответьте на несколько коротких вопросов. Сразу после отправки
            откроется прайс, а мы сохраним контекст разговора и вернёмся с предметным предложением.
          </p>
          <div className="lead-note">
            <strong>≈ 45 секунд</strong>
            <span>Без длинной анкеты<br />и рекламных рассылок</span>
          </div>
        </div>
        <LeadForm />
      </section>

      <section className="faq section">
        <div className="section-heading compact">
          <p className="eyebrow"><span /> Коротко о главном</p>
          <h2>Перед тем,<br /><em>как продолжить.</em></h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>Можно ли заказать только образцы?<span>+</span></summary>
            <p>Да. Подберём релевантные вашему проекту декоры и согласуем удобный способ передачи.</p>
          </details>
          <details>
            <summary>Вы работаете с дизайнерами и комплектаторами?<span>+</span></summary>
            <p>Да. В квизе можно указать роль, тип объекта и интересующую коллекцию — запрос сохранится с этим контекстом.</p>
          </details>
          <details>
            <summary>Как получить точную стоимость?<span>+</span></summary>
            <p>Нужны размеры, выбранный материал и объём. После этого подготовим спецификацию и предложение.</p>
          </details>
          <details>
            <summary>Есть решения для общественных и влажных зон?<span>+</span></summary>
            <p>Да, подбираем решение под условия объекта. Сертификаты и рабочие характеристики подтверждаем по конкретному артикулу до согласования.</p>
          </details>
          <details>
            <summary>Можно заказать панели выше 2,8 метра?<span>+</span></summary>
            <p>Проектные форматы 3–6 м рассматриваем индивидуально. Точную доступность декора, формат и логистику подтверждаем под заказ.</p>
          </details>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark">F/P</span>
          <span>FORM / PANEL</span>
        </a>
        <p>Декоративные панели для современных интерьеров</p>
        <div className="footer-links">
          <a href="#lead">Получить прайс</a>
          <span>Контакты — следующим этапом</span>
        </div>
        <small>Выставочное предложение Open Village · условия по конкретной позиции подтверждаются при расчёте</small>
      </footer>
    </main>
  );
}
