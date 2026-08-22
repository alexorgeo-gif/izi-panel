# SEO-аудит IZI PANEL

Дата проверки: 2026-08-22. Канонический домен: `https://izipanel.ru/`.

Статусы: `[FACT]` подтверждено кодом или HTTP-проверкой; `[HYPOTHESIS]` требует поисковых данных; `[ТРЕБУЕТ УТОЧНЕНИЯ]` данных или доступа нет.

## Резюме

- P0: production выдаёт HTML soft-404 с HTTP 200 для `/robots.txt`, `/sitemap.xml` и несуществующего URL.
- P0: `https://www.izipanel.ru/` отвечает 200 вместо редиректа на non-www.
- P1: в production нет canonical и JSON-LD.
- P1: title и H1 не полностью отражают коммерческий интент «декоративные стеновые панели».
- `[FACT]` Форма `open-village-lead`, `POST /forms.html` и источник `open-village-2026` сохранены в реализации и тестах.

## Проверки и исправления

| Объект | Текущее состояние и доказательство | Приоритет | Исправление | Статус после локальной проверки |
|---|---|---:|---|---|
| Главная | `[FACT]` `GET https://izipanel.ru/` → HTTP 200, `text/html` | — | Без изменения маршрута | Реализовано |
| `robots.txt` | `[FACT]` production → HTTP 200, но `text/html` и тело 404 | P0 | Metadata route с `Allow: /` и ссылкой на sitemap | Staging → 200 `text/plain`; live ожидает активации |
| `sitemap.xml` | `[FACT]` production → HTTP 200, но `text/html` и тело 404 | P0 | XML sitemap только с `https://izipanel.ru/` | Staging → 200 `text/xml`; live ожидает активации |
| Несуществующий URL | `[FACT]` `/seo-audit-nonexistent-page` → HTTP 200, `text/html` | P0 | `try_files ... =404`, `error_page 404 /404.html` | Staging → HTTP 404 с брендированной страницей; live ожидает активации |
| HTTPS www | `[FACT]` `https://www.izipanel.ru/` → HTTP 200 | P0 | Отдельный TLS server block с 301 на non-www | Candidate Nginx готов; live ожидает активации |
| HTTP | `[FACT]` `http://www.izipanel.ru/` → один 301 на `https://izipanel.ru/` | — | Сохранить | Сохранено в candidate Nginx |
| Canonical и query | `[FACT]` canonical отсутствует; `?release`, `?icon`, UTM отдают ту же страницу | P1 | Абсолютный self-canonical `https://izipanel.ru/` во всём HTML | Реализовано локально |
| Title | `[FACT]` было `IZI PANEL — декоративные панели в интерьере` | P1 | `Декоративные стеновые панели IZI PANEL — каталог и расчёт` (57 знаков) | Реализовано локально |
| Description | `[FACT]` было 82 знака | P1 | Подтверждённые направления и CTA, 150 знаков | Реализовано локально |
| H1 | `[FACT]` был один H1: «Поверхности, которые собирают интерьер» | P1 | Один H1: «Декоративные стеновые панели, которые собирают интерьер» | Реализовано локально |
| Заголовки | `[FACT]` один H1; H2 раскрывают интерьеры, поверхности, сочетания и заявку; H3 используются внутри подблоков | P2 | Сохранить смысловую иерархию | Проверяется тестом и browser-QA |
| Indexability | `[FACT]` основной текст присутствует в статическом export; блокирующих `noindex` и `X-Robots-Tag` на главной не обнаружено | P1 | Явно `index, follow`; critical content остаётся в HTML | Реализовано локально |
| Open Graph | `[FACT]` OG title/description/url/image уже были | P2 | Обновить текст, добавить `site_name=IZI PANEL` | Реализовано локально |
| Schema.org | `[FACT]` отсутствовала | P1 | `WebSite` и `Organization` только с подтверждёнными данными | Реализовано локально |
| Внутренние ссылки | `[FACT]` навигация ведёт к разделам главной; CTA ведут к форме; логотип и 404 ведут на `/` | P2 | Сохранять canonical-пути | Реализовано локально |
| Alt | `[FACT]` содержательные интерьерные изображения имеют описательные alt; декоративные карточки имеют `alt=""`; логотипы названы | P2 | Сохранить разделение informative/decorative | Проверяется ESLint и browser-QA |
| Без JavaScript | `[FACT]` контент и ссылки экспортируются в HTML; интерактивная трёхшаговая форма требует JS | P2 | Не скрывать critical content; fallback-контакты доступны в футере | Сохранено |
| Mobile/overflow | `[FACT]` есть отдельная компоновка ≤760 px и `overflow-x: clip`; карточки используют scroll-snap | P1 | Проверить 390 px и desktop после нового H1/404 | Пройдено: 1440×900 и 390×844, overflow отсутствует |
| LCP/CWV | `[FACT]` hero image помечен `priority`; `[HYPOTHESIS]` крупный JPEG hero может быть LCP-риском | P1 | Измерить PSI/CrUX после релиза; затем подготовить responsive WebP/AVIF без потери качества | `[ТРЕБУЕТ УТОЧНЕНИЯ]` полевые данные |
| Изображения | `[FACT]` JPG: hero 356 KB, остальные 372–512 KB; WebP-карточки 88–404 KB; OG PNG 1.1 MB; Next static export использует `unoptimized: true` | P1 | Проверить фактический LCP; оптимизацию вынести в отдельный подтверждённый срез | Размеры зафиксированы; файлы не менялись |
| Форма | `[FACT]` три шага, `open-village-lead`, `/forms.html`, `open-village-2026`; Nginx проксирует маршрут в Netlify Forms | P0 | Не менять контракт; пройти шаги без финального submit | Все 3 шага пройдены локально, submit не выполнялся |
| Прайс и бренд | `[FACT]` XLSX, логотипы, favicon и OG asset находятся в `public/` | P0 | Проверить export и ссылки | Покрыто тестами |

## Подтверждённые факты

- Бренд: IZI PANEL.
- Домен: `https://izipanel.ru/`.
- Продуктовая категория: декоративные стеновые панели.
- Публично показанные направления: дерево, камень, ткань, металл.
- CTA: получить прайс и предварительный расчёт.
- Контакты: `@IZI_PANEL`, `Izipanelorder@gmail.com`.
- Форма: `open-village-lead`; источник: `open-village-2026`.

## Недостающие данные

- `[ТРЕБУЕТ УТОЧНЕНИЯ]` URL политики конфиденциальности и реквизиты оператора данных.
- `[ТРЕБУЕТ УТОЧНЕНИЯ]` права на публичное использование интерьерных изображений.
- `[ТРЕБУЕТ УТОЧНЕНИЯ]` доступ к Яндекс Вебмастеру, Wordstat, Google Search Console и Метрике.
- `[ТРЕБУЕТ УТОЧНЕНИЯ]` подтверждённые ассортимент, характеристики, цены, сроки, гарантии, сертификаты, доставка и география.
- `[ТРЕБУЕТ УТОЧНЕНИЯ]` полевые Core Web Vitals и реальные поисковые запросы/частотность.

## Нормативная база

- Google: canonical должен быть абсолютным, self-referential и согласованным с redirect и sitemap: <https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls>
- Google: sitemap содержит абсолютные canonical URL, которые должны попадать в поиск: <https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap>
- Яндекс: требования к Sitemap: <https://yandex.ru/support/webmaster/ru/indexing-options/sitemap>
- Яндекс: рекомендации по title и description: <https://yandex.ru/support/webmaster/ru/search-results/title-and-description>
