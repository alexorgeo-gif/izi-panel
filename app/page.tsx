import LeadForm from "./lead-form";

const solutions = [
  {
    number: "01",
    title: "Фактура дерева",
    text: "Тёплая архитектурная база для гостиных, спален и загородных домов.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=86",
  },
  {
    number: "02",
    title: "Камень и мрамор",
    text: "Выразительные акцентные плоскости без тяжёлой мокрой отделки.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=86",
  },
  {
    number: "03",
    title: "Реечные системы",
    text: "Ритм, глубина и визуальное зонирование пространства.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=86",
  },
  {
    number: "04",
    title: "Проектные решения",
    text: "Комбинации фактур и профилей под задачу дизайнера или комплектатора.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=86",
  },
];

const audiences = [
  ["Частному заказчику", "Поможем понять объём, подобрать декор и собрать решение под интерьер."],
  ["Дизайнеру", "Подбор образцов, понятная спецификация и сопровождение проекта."],
  ["Строителю", "Технические данные, расчёт комплектации и прогнозируемая поставка."],
  ["Дилеру", "Ассортиментная матрица и отдельные условия для регулярных закупок."],
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
          Получить каталог
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Open Village · специальное предложение</p>
          <h1>
            Стены, которые
            <br />
            <em>задают характер.</em>
          </h1>
          <p className="hero-text">
            Декоративные панели для квартир, загородных домов и коммерческих
            интерьеров. Подберём решение и предварительно рассчитаем объём под
            ваш объект.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#lead">
              Получить подборку и расчёт <span>↗</span>
            </a>
            <a className="text-link" href="#solutions">
              Смотреть решения <span>↓</span>
            </a>
          </div>
          <div className="hero-trust">
            <span>Образцы декоров</span>
            <span>Проектный расчёт</span>
            <span>Прямые поставки</span>
          </div>
        </div>

        <div className="hero-visual" role="img" aria-label="Современный интерьер с декоративными панелями">
          <div className="hero-badge">
            <strong>01</strong>
            <span>Натуральная эстетика<br />современных материалов</span>
          </div>
          <div className="scroll-note">Листайте, чтобы увидеть больше</div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Преимущества">
        <p>Не просто материал.</p>
        <p>Готовое решение для стены.</p>
        <span>Подбор → расчёт → комплектация</span>
      </section>

      <section className="section solutions" id="solutions">
        <div className="section-heading">
          <p className="eyebrow"><span /> Решения</p>
          <h2>Одна система.<br /><em>Разный характер.</em></h2>
          <p>
            Подбираем материал и формат панели под стиль, бюджет и условия
            конкретного помещения.
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
            <h3>Подборка декоров</h3>
            <p>Отберём варианты под стиль и задачу вашего пространства.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Предварительный расчёт</h3>
            <p>Посчитаем ориентировочный объём и бюджет по размерам объекта.</p>
          </article>
          <article>
            <span>03</span>
            <h3>План дальнейших действий</h3>
            <p>Зафиксируем образцы, спецификацию и следующий контакт.</p>
          </article>
        </div>
      </section>

      <section className="lead-section" id="lead">
        <div className="lead-copy">
          <p className="eyebrow light"><span /> Только для гостей Open Village</p>
          <h2>Получите каталог<br />и расчёт <em>под ваш объект.</em></h2>
          <p>
            Ответьте на несколько коротких вопросов. Мы сохраним контекст
            разговора и вернёмся уже с предметным предложением.
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
            <p>Да. Для профессионального сообщества предусмотрены проектное сопровождение и отдельные условия.</p>
          </details>
          <details>
            <summary>Как получить точную стоимость?<span>+</span></summary>
            <p>Нужны размеры, выбранный материал и объём. После этого подготовим спецификацию и предложение.</p>
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
          <a href="#lead">Получить каталог</a>
          <a href="#">Telegram</a>
          <a href="#">WhatsApp</a>
        </div>
        <small>Прототип выставочного продукта · контакты и цены будут обновлены</small>
      </footer>
    </main>
  );
}
