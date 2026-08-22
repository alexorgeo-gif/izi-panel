# Сравнение izipanel.ru и брендовой версии IZI PANEL

Дата проверки: `2026-08-21`, Europe/Moscow
Проверенный URL: `https://izipanel.ru/`

## Что подтверждено на действующем сайте

- Заголовок и временная айдентика: `FORM / PANEL`, знак `F/P`.
- Основная конверсия: трёхшаговая форма `open-village-lead`.
- Endpoint: `POST /forms.html` с `application/x-www-form-urlencoded`.
- Nginx на `izipanel.ru` проксирует `/forms.html` в `https://izi-panel.netlify.app/forms.html`.
- Netlify-форма использует источник `open-village-2026`; серверная функция синхронизирует подтверждённые лиды с Google Sheets при наличии настроенных секретов окружения.
- После успешной отправки пользователь получает ссылку на `/downloads/price-list-izi-panel.xlsx`, Telegram `@IZI_PANEL` и email `Izipanelorder@gmail.com`.

## Что сохранено без изменения контракта

| Контур | Сохранённое значение |
|---|---|
| Form name | `open-village-lead` |
| Source | `open-village-2026` |
| Квалификация | `role`, `object`, `area`, `interest` |
| Контакт | `name`, `contact`, обязательный `consent` |
| Дополнительный запрос | `catalog_request` |
| Атрибуция | `lead_id`, `page_url`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `submitted_at` |
| Антиспам | `bot-field` / Netlify honeypot |
| Резервное хранение | Netlify Forms |
| Синхронизация | `netlify/functions/sync-google-sheet.mjs` |

UTM, URL страницы, время и уникальный `lead_id` теперь формируются непосредственно в момент отправки, чтобы в лид не попадало устаревшее состояние страницы.

## Что изменено

| Было на izipanel.ru | Стало в брендовой версии |
|---|---|
| `FORM / PANEL`, `F/P` | мастер-логотипы `IZI PANEL` |
| чёрный, белый и кислотный акцент | Deep Taupe, Sand Beige, Warm Beige, Cream |
| системная/временная типографика | self-hosted Commissioner с кириллицей |
| продуктовые карточки как основной рассказ | четыре интерьерные главы и материальные сочетания |
| временный hero и social preview | брендовые изображения, favicon, app icon и OG card |
| форма в светлом выставочном стиле | тот же рабочий квиз в Brand System №1 |

## Проверки новой версии

- Next.js static export: пройден.
- TypeScript: пройден.
- Rendered HTML + form contract: `3/3`.
- Google Sheets sync unit tests: `2/2`.
- ESLint: пройден.
- Mobile 390×844: три шага доступны; document width равен viewport; обязательные поля и consent видимы.

## Отдельный production-gate

Реальная доставка тестовой заявки из новой опубликованной версии ещё не выполнялась, чтобы не создавать лид и внешнее уведомление без отдельного подтверждения владельца. После staged-публикации нужно отправить один явно маркированный тестовый лид и подтвердить его появление в Netlify Forms и Google Sheets.
