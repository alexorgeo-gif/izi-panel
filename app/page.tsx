"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import LeadForm from "./lead-form";
import { ArrowIcon } from "./brand-icons";

const spaces = [
  {
    id: "living",
    number: "01",
    label: "Гостиная",
    title: "Тёплое дерево. Холодный камень. Один спокойный объём.",
    description:
      "Панель задаёт ритм стены, скрывает дверь и связывает мебель с архитектурой. Камень остаётся акцентом, а не спорит с рисунком дерева.",
    image: "/images/hero-living.jpg",
    alt: "Гостиная с крупноформатными панелями под дерево и светлым камнем",
    recipe: ["тёплое дерево", "светлый травертин", "тёмная бронза"],
    focus: "ТВ-зона · камин · скрытая дверь",
  },
  {
    id: "bedroom",
    number: "02",
    label: "Спальня",
    title: "Мягкая фактура вместо декоративного шума.",
    description:
      "Спокойная поверхность работает как фон для сна: крупный модуль, тёплая подсветка и одна узкая плоскость дерева собирают стену за изголовьем.",
    image: "/images/bedroom.jpg",
    alt: "Спальня с панелями под текстиль, орехом и встроенным шкафом",
    recipe: ["текстильный эффект", "орех", "светлый камень"],
    focus: "Изголовье · гардероб · боковой свет",
  },
  {
    id: "kitchen",
    number: "03",
    label: "Кухня и столовая",
    title: "Панели продолжают мебель и скрывают функциональные зоны.",
    description:
      "Вертикальная плоскость объединяет высокие шкафы, проход и скрытую кладовую. Керамогранит остаётся практичным спокойным основанием композиции.",
    image: "/images/kitchen.jpg",
    alt: "Кухня с тёмными панелями под дерево, скрытой дверью и светлым керамогранитом",
    recipe: ["тёмный шпон", "керамогранит", "матовый металл"],
    focus: "Фасады · кладовая · обеденная зона",
  },
  {
    id: "wardrobe",
    number: "04",
    label: "Гардеробная и хранение",
    title: "Хранение становится частью архитектуры.",
    description:
      "Один материал связывает шкафы, дверные полотна и проход в хозяйственную зону. Функция остаётся внутри, снаружи читается цельный объём.",
    image: "/images/wardrobe.jpg",
    alt: "Гардеробная с тёмными стеновыми панелями и проходом в систему хранения",
    recipe: ["глубокое дерево", "матовый taupe", "травертин"],
    focus: "Шкафы · проход · хозяйственная зона",
  },
];

const collections = [
  {
    number: "01",
    title: "Дерево и шпон",
    text: "Для цельных стен, скрытых дверей, ТВ-зон и встроенной мебели.",
    image: "/images/legacy/solution-wood.webp",
  },
  {
    number: "02",
    title: "Травертин и мрамор",
    text: "Для крупного рисунка, каминных объёмов, ниш и спокойных акцентов.",
    image: "/images/legacy/solution-stone.webp",
  },
  {
    number: "03",
    title: "Тканевые поверхности",
    text: "Для спален, кабинетов и пространств, где важен мягкий визуальный фон.",
    image: "/images/legacy/solution-fabric.webp",
  },
  {
    number: "04",
    title: "Металл и патина",
    text: "Для ниш, барных зон и точных акцентов рядом с деревом и камнем.",
    image: "/images/legacy/solution-metal.webp",
  },
];

function WordTitle({ children }: { children: string }) {
  return (
    <span className="word-title" aria-label={children}>
      {children.split(" ").map((word, index) => (
        <span className="word" aria-hidden="true" style={{ "--word-index": index } as CSSProperties} key={`${word}-${index}`}>
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 40);
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  return (
    <main id="top">
      <a className="skip-link" href="#content">Перейти к содержанию</a>

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="IZI PANEL — наверх">
          <Image
            className="brand-logo"
            src={scrolled || menuOpen ? "/brand/izi-panel-logo-primary.svg" : "/brand/izi-panel-logo-reversed.svg"}
            alt="IZI PANEL"
            width={600}
            height={160}
            priority
          />
        </a>

        <nav id="mobile-menu" className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Основная навигация">
          <a href="#spaces" onClick={() => setMenuOpen(false)}>Интерьеры</a>
          <a href="#collections" onClick={() => setMenuOpen(false)}>Направления</a>
          <a href="#combinations" onClick={() => setMenuOpen(false)}>Сочетания</a>
          <a className="nav-cta" href="#lead" onClick={() => setMenuOpen(false)}>Получить прайс</a>
        </nav>

        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? "Закрыть" : "Меню"}
        </button>
        <div className="scroll-progress" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <Image className="hero-image" src="/images/hero-living.jpg" alt="Современная гостиная с декоративными панелями под дерево и светлым камнем" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-copy" data-reveal>
          <h1 id="hero-title">
            <WordTitle>Декоративные стеновые панели, которые собирают интерьер.</WordTitle>
          </h1>
          <p className="hero-lead">
            Дерево, камень, ткань и металл — не отдельными образцами,
            а в законченных пространствах.
          </p>
          <div className="hero-actions">
            <a className="button button-light" href="#spaces">Смотреть в интерьере <ArrowIcon direction="down" /></a>
            <a className="line-link line-link-light" href="#lead">Получить прайс и расчёт <ArrowIcon direction="up-right" /></a>
          </div>
        </div>
        <div className="hero-meta" aria-label="Визуальные направления">
          <span>IZI PANEL · 01 / 04</span>
          <span>Дерево · камень · ткань · металл</span>
        </div>
        <p className="hero-note">Концептуальная интерьерная визуализация</p>
      </section>

      <div id="content">
        <section className="manifesto section-shell" aria-labelledby="manifesto-title">
          <div className="manifesto-copy" data-reveal>
            <h2 id="manifesto-title">Материал становится архитектурой.</h2>
            <p>
              Когда работает не сам по себе, а вместе с объёмом, светом,
              мебелью и соседними поверхностями.
            </p>
          </div>
          <figure className="material-figure" data-reveal>
            <Image src="/images/material-detail.jpg" alt="Стык панели под дерево и светлой поверхности под травертин" width={1536} height={1024} />
            <figcaption>
              <span>Деталь 01</span>
              <span>Дерево / профиль / травертин</span>
            </figcaption>
          </figure>
        </section>

        <section className="spaces-intro section-shell" id="spaces" aria-labelledby="spaces-title">
          <h2 id="spaces-title" data-reveal>Не каталог комнат.<br />Четыре способа собрать пространство.</h2>
          <p className="spaces-deck" data-reveal>
            В каждой главе — общий объём, материальный рецепт и зона,
            где поверхность решает архитектурную задачу.
          </p>
        </section>

        <div className="space-stories">
          {spaces.map((space) => (
            <section className="space-story" id={space.id} key={space.id} aria-labelledby={`${space.id}-title`}>
              <div className="space-sticky">
                <Image src={space.image} alt={space.alt} fill priority={space.id === "living"} sizes="100vw" />
                <div className="space-overlay" />
                <div className="space-index"><span>{space.number}</span><span>{space.label}</span></div>
                <div className="space-copy" data-reveal>
                  <h2 id={`${space.id}-title`}>{space.title}</h2>
                  <p>{space.description}</p>
                </div>
                <div className="recipe-panel" data-reveal>
                  <div>
                    <span className="recipe-label">Материальный рецепт</span>
                    <ul>
                      {space.recipe.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                  <p>{space.focus}</p>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="collections section-shell" id="collections" aria-labelledby="collections-title">
          <header className="collections-heading" data-reveal>
            <div>
              <h2 id="collections-title">Четыре характера поверхности.</h2>
            </div>
            <p>
              Это пока архитектура ассортимента, а не список подтверждённых артикулов.
              Конкретные декоры подключаются из актуального каталога.
            </p>
          </header>

          <div className="collection-grid">
            {collections.map((collection) => (
              <article className="collection-card" key={collection.title} data-reveal>
                <div className="collection-media">
                  <Image src={collection.image} alt="" width={1400} height={1682} />
                  <span>{collection.number}</span>
                </div>
                <h3>{collection.title}</h3>
                <p>{collection.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="combinations" id="combinations" aria-labelledby="combinations-title">
          <div className="combinations-media">
            <Image src="/images/material-detail.jpg" alt="Точный стык тёмной древесной панели и светлой поверхности под камень" width={1536} height={1024} />
          </div>
          <div className="combinations-copy" data-reveal>
            <h2 id="combinations-title">Один активный материал. Один поддерживающий.</h2>
            <ol className="rules-list">
              <li>
                <span>01</span>
                <div><h3>Сначала иерархия</h3><p>Выразительный камень требует спокойной древесной плоскости. Активное дерево — однотонного камня.</p></div>
              </li>
              <li>
                <span>02</span>
                <div><h3>Стык — это деталь</h3><p>Тонкий профиль, теневая щель или мебельный модуль должны объяснять переход между поверхностями.</p></div>
              </li>
              <li>
                <span>03</span>
                <div><h3>Свет раскрывает фактуру</h3><p>Боковой свет показывает направление рисунка и глубину поверхности лучше, чем яркая фронтальная подсветка.</p></div>
              </li>
            </ol>
          </div>
        </section>

        <section className="request-section" id="lead" aria-labelledby="request-title">
          <div className="request-intro" data-reveal>
            <h2 id="request-title">Получите прайс и расчёт под ваш объект.</h2>
            <p>
              Три коротких шага сохранят роль, параметры объекта и интересующее
              направление — менеджер получит контекст для предметного ответа.
            </p>
            <div className="request-assurance">
              <strong>≈ 45 секунд</strong>
              <span>Без длинной анкеты и рекламных рассылок</span>
            </div>
          </div>
          <div data-reveal>
            <LeadForm />
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <a className="brand brand-footer" href="#top" aria-label="IZI PANEL — наверх">
          <Image className="brand-logo" src="/brand/izi-panel-logo-primary.svg" alt="IZI PANEL" width={600} height={160} />
        </a>
        <p>Декоративные панели как часть архитектуры интерьера.</p>
        <div>
          <a href="#spaces">Интерьеры</a>
          <a href="#collections">Направления</a>
          <a href="#lead">Получить прайс</a>
          <a href="https://t.me/IZI_PANEL" target="_blank" rel="noreferrer">Telegram · @IZI_PANEL <ArrowIcon direction="up-right" /></a>
          <a href="mailto:Izipanelorder@gmail.com">Izipanelorder@gmail.com <ArrowIcon direction="up-right" /></a>
        </div>
        <small>Конкретные позиции, цены и условия подтверждаются при расчёте.</small>
      </footer>
    </main>
  );
}
