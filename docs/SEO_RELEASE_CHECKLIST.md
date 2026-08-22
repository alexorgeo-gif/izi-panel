# SEO release checklist IZI PANEL

Production не изменяется до явного разрешения владельца. Релиз: отдельная ветка → локальная проверка → staging → проверка → атомарная активация → smoke → автоматический rollback при ошибке.

## 1. Локальная проверка

- [x] ESLint пройден прямым запуском локального бинарника.
- [x] Production build `next build --webpack` пройден; TypeScript пройден внутри build.
- [x] 6 тестов пройдены.
- [x] `out/robots.txt` существует и содержит `Sitemap: https://izipanel.ru/sitemap.xml`.
- [x] `out/sitemap.xml` содержит только canonical `https://izipanel.ru/`.
- [x] `out/404.html` брендирован и доступен без JS.
- [x] Canonical, OG `site_name` и оба JSON-LD блока присутствуют в `out/index.html`.
- [x] JSON-LD парсится как JSON и не содержит неподтверждённых рейтингов, цен или адреса.
- [x] `public/forms.html` совпадает по полям с видимой формой.
- [x] Прайс и брендовые файлы попали в export.

## 2. Browser-QA без отправки заявки

- [x] Desktop 1440×900: главная проверена; 404 проверена как общий responsive surface.
- [x] Mobile 390×844: главная и 404 проверены.
- [x] Нет горизонтального overflow (`scrollWidth === clientWidth`).
- [x] Один H1, последовательные H2/H3, понятные alt.
- [x] Все три шага формы открываются; финальный submit не выполнялся.
- [x] Keyboard focus и семантические controls сохранены; меню и ссылки присутствуют.
- [x] Console ошибок и предупреждений нет; локальные assets загрузились без неожиданных ошибок.

## 3. Staging

- [x] Ветка запушена: `feature/izi-panel-seo-foundation`; GitHub commit `fca12b7c6cf8e60abf706c83af431c1fad28bf77`.
- [x] На CORE собран отдельный worktree через `next build --webpack`; production symlink не менялся.
- [x] Staging: `/var/www/izipanel.ru/releases/release-20260822T062329Z`; `index.html` SHA-256 `0dfa8b0a5c25eb043708a00633d87faf431f58335f767cc7ca86f710773e57cd` совпал на CORE и Beget.
- [x] Предыдущий/активный production остался `/var/www/izipanel.ru/releases/release-20260821T222244Z`.
- [x] Candidate Nginx из `deploy/nginx-izipanel.ru.conf` сравнен с активным конфигом; `/forms.html` proxy сохранён.
- [x] `nginx -t` прошёл на временной копии candidate-конфига; установка и reload не выполнялись.

## 4. Production — только после разрешения

- [ ] Владелец явно разрешил конкретный release ID и Nginx candidate.
- [ ] Создана резервная копия активного Nginx-конфига.
- [ ] Candidate установлен; `nginx -t`; затем reload.
- [ ] Release активирован атомарно; при failed smoke возвращён предыдущий symlink и конфиг.
- [ ] `https://izipanel.ru/` → 200 HTML.
- [ ] `/robots.txt` → 200 `text/plain`.
- [ ] `/sitemap.xml` → 200 `application/xml` или `text/xml`.
- [ ] Несуществующий URL → 404 с брендированной страницей.
- [ ] `https://www.izipanel.ru/path?x=1` → один 301 на `https://izipanel.ru/path?x=1`.
- [ ] `http://izipanel.ru/` и `http://www.izipanel.ru/` → один 301 на HTTPS non-www.
- [ ] URL с `?release`, `?icon`, UTM содержит canonical `https://izipanel.ru/`.
- [ ] `/forms.html` продолжает проксироваться; реальный submit только по отдельному разрешению.
- [ ] Прайс, логотипы, favicon и OG доступны.

## 5. Поисковые кабинеты и аналитика — инструкция

Внешние аккаунты и коды не подключать без разрешения.

### Яндекс Вебмастер

1. Добавить `https://izipanel.ru/` как сайт.
2. Подтвердить владение рекомендованным владельцем способом (DNS предпочтителен для домена; метод согласовать).
3. Отправить `https://izipanel.ru/sitemap.xml`.
4. Проверить robots, обход, индексирование, ошибки и страницы в поиске.
5. Еженедельно выгружать запросы/страницы: показы, клики, CTR, средняя позиция.

### Google Search Console

1. Создать Domain property `izipanel.ru` и подтвердить DNS.
2. Отправить sitemap.
3. Проверить URL Inspection для главной и будущих целевых страниц.
4. Контролировать Page indexing, Core Web Vitals и Performance по queries/pages/devices.

### Яндекс Метрика

1. После разрешения установить один счётчик через согласованный consent-механизм.
2. Событие успеха формы отправлять только после подтверждённого успешного HTTP-ответа, например `lead_submit_success`.
3. Отдельно фиксировать `lead_form_start`, переходы по шагам и ошибку submit; не считать клик по кнопке заявкой.
4. Сохранять UTM в уже существующих полях формы и отчётах, не включать персональные данные в URL/события.
5. Настроить отчёты: source/medium/campaign → landing page → form start → success.

## 6. Еженедельный SEO-контроль

- Запросы: показы, клики, CTR, позиция отдельно в Яндексе и Google.
- Страницы: индексируемость, canonical, 404, sitemap, новые исключения.
- Конверсии: organic sessions → form start → успешная заявка.
- CWV: LCP/INP/CLS по реальным полевым данным.
- Все изменения контента проходят факт-чек; частотность и эффекты не угадываются.
