---
name: IZI PANEL
description: Тихая архитектурная редакционность в тёплой бежево-тауповой палитре.
colors:
  ink: "#4a4038"
  ink-soft: "#70645b"
  paper: "#e9ddcf"
  paper-light: "#f7f1e9"
  stone: "#d7c5b2"
  bronze: "#9a7b60"
  bronze-light: "#c7a98a"
  line: "rgba(74, 64, 56, 0.2)"
  white-line: "rgba(255, 255, 255, 0.32)"
  story-dark: "#3f3731"
  error: "#9a3e30"
typography:
  display:
    fontFamily: '"Commissioner IZI", "Avenir Next", Arial, sans-serif'
    fontSize: "clamp(3rem, 5.3vw, 6rem)"
    fontWeight: 520
    lineHeight: 0.98
    letterSpacing: "-0.036em"
  body:
    fontFamily: '"Commissioner IZI", "Avenir Next", Arial, sans-serif'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: '"Commissioner IZI", "Avenir Next", Arial, sans-serif'
    fontSize: "0.68rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  control-sm: "8px"
  control: "10px"
  media: "14px"
  panel: "18px"
  round: "50%"
  progress: "999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  page-mobile: "1.125rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "clamp(7rem, 12vw, 13rem)"
  page-x: "clamp(1.125rem, 3.2vw, 3rem)"
components:
  button-light:
    backgroundColor: "{colors.paper-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.85rem 1.15rem"
    height: "52px"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper-light}"
    rounded: "{rounded.control}"
    padding: "0.85rem 1.15rem"
    height: "52px"
  form-panel:
    backgroundColor: "{colors.paper-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "clamp(1.5rem, 4vw, 3.75rem)"
---

# Design System: IZI PANEL

## Overview

**Creative North Star: "Тихая архитектурная редакционность"**

Код реализует owner-approved Brand System №1 с ключом `owner-approved-izi-panel-a-20260820`: панели показаны в масштабе законченного интерьера, а интерфейс остаётся спокойной рамой. Характер системы — тёплый, материальный, сдержанный; выразительность создают масштаб изображений, воздух и типографическая иерархия.

**Key Characteristics:**

- крупные интерьерные кадры вместо товарных cutout-объектов;
- крупные короткие заголовки, спокойный текст и редакционные паузы;
- тонкие линии, умеренно скруглённые плоскости, без glow и glassmorphism;
- все critical content доступен без завершения motion.

## Colors

Палитра строится на кремовых, бежевых и taupe-плоскостях; бронза маркирует состояния, фокус и детали.

### Primary

- **Deep Taupe** (`ink`): основной текст, тёмные CTA и фон секции заявки.
- **Warm Bronze** (`bronze`) и **Light Bronze** (`bronze-light`): активный шаг, hover/focus, selection и брендовая деталь.

### Neutral

- **Cream Paper** (`paper-light`): основной фон, светлая кнопка и панель формы.
- **Warm Beige** (`paper`), **Stone** (`stone`): секционные слои, hover и неактивный progress.
- **Soft Taupe** (`ink-soft`): вторичный текст; `line` и `white-line` — разделители на светлом и тёмном фоне.
- **Story Dark** (`story-dark`): резервный тёмный фон интерьерных глав; `error` — только для ошибки формы.

**The Quiet Accent Rule.** Бронза объясняет состояние и акцент, но не становится доминирующей заливкой экрана.

## Typography

**Display Font:** Commissioner IZI (self-hosted variable `100–900`, fallback Avenir Next, Arial, sans-serif)

**Body Font:** Commissioner IZI (the same stack)
**Character:** один строгий гротеск даёт цельность; контраст создают масштаб, вес, tracking и регистр.

### Hierarchy

- **Hero display:** `clamp(3.6rem, 6.7vw, 6rem)`, weight `560`, line-height `0.94`, tracking `-0.038em`; на mobile — `clamp(3.45rem, 15vw, 5.1rem)`.
- **Section display:** базово `clamp(3rem, 5.3vw, 6rem)`, weight `520`, line-height `0.98`, tracking `-0.036em`.
- **Body:** `16px/1.5`; крупный supporting copy до `1.35rem`.
- **Label:** `0.65–0.75rem`, uppercase только для metadata/control labels, tracking `0.05–0.18em`.

**The One-Family Rule.** Не вводить декоративную пару к Commissioner: иерархия уже закодирована внутри одного variable-семейства.

## Layout

Контент ограничен `1600px`; горизонтальное поле — `page-x`, от `18px` на mobile до `48px` на wide desktop. Сетка меняется по смыслу секции: 12-колоночные карточки, несимметричные split-layouts, fullscreen hero и sticky интерьерные главы.

Основной breakpoint — `760px`, промежуточный — `1100px`. На mobile sticky отключается, двухколоночные секции становятся одноколоночными, карточки превращаются в scroll-snap-ленту, CTA растягиваются на ширину, а навигация становится раскрывающимся меню. `prefers-reduced-motion` убирает animation/transition, reveal-transform и sticky-поведение.

## Elevation & Depth

Система плоская: декоративные тени не используются. Глубину дают фотографии, тональные слои, тонкие градиентные overlays и однопиксельные разделители. Единственный `box-shadow` — функциональная двойная линия фокуса поля (`0 2px 0 var(--bronze)`).

**The Flat-by-Default Rule.** Не добавлять card shadows, glow и псевдообъём: иерархию несут масштаб, цвет и плотность.

## Shapes

Форма — прямоугольная с умеренным скруглением: controls `8–10px`, media `14px`, панель формы `18px`. Круг допустим для success-иконки, а pill `999px` — только для тонких progress-сегментов. Поля не имеют контейнера: их форма задана нижней линией.

## Components

### Brand assets

- Основной логотип: `/brand/izi-panel-logo-primary.svg`; обратный для фото/тёмного фона: `/brand/izi-panel-logo-reversed.svg`.
- Монохромный логотип: `/brand/izi-panel-logo-monochrome.svg`; отдельный знак: `/brand/izi-panel-mark-primary.svg`.
- App/favicon-набор: `/brand/izi-panel-app-icon.svg`, `izi-panel-app-icon-512.png`, `apple-touch-icon.png`, `favicon-16.png`, `favicon-32.png`.
- Логотип всегда берётся из мастер-ассета; не набирать его заново шрифтом и не перекрашивать SVG мимо палитры.

### Buttons and links

Кнопки прямоугольные (`min-height: 52px`, radius `10px`) с тонкой обводкой. Light CTA инвертируется в transparent на hover; dark CTA переходит в `bronze`. Secondary action — текстовая ссылка с тонкой нижней линией. Общий keyboard focus — контур `2px bronze-light` с offset `4px`.

### Authored icon family

`ArrowIcon` и `CheckIcon` из `app/brand-icons.tsx` — собственные inline SVG в `24×24`: `fill: none`, `stroke: currentColor`, width `1.75`, round caps/joins. Стрелка поворачивается для right/left/down/up-right; новые UI-иконки должны продолжать эту монолинейную геометрию, а не подмешивать внешнюю icon library.

### Cards and imagery

Карточки коллекций строятся вокруг вертикального кадра `4:5` с radius `14px`; на desktop чётные карточки смещены, на mobile собраны в горизонтальную scroll-snap-ленту. Интерьерные и material-detail изображения — концептуальные визуализации, не фотография конкретного артикула и не доказательство точных свойств.

### Lead form

Форма `open-village-lead` — трёхшаговый светлый panel на тёмном фоне. Контракт:

- шаг 1 — роль; шаг 2 — тип объекта, площадь, интерес; шаг 3 — имя, контакт, обязательное согласие и опциональный запрос каталога;
- постоянные labels, native required-validation, disabled до заполнения и в состоянии sending, клавиатурный focus;
- визуальные состояния: idle/step progress, hover/focus, disabled, sending (`«Сохраняем…»`), error с retry через повторный submit, success-card с download и fallback-контактами;
- `POST /forms.html`, Netlify form name `open-village-lead`, source `open-village-2026`; в payload входят данные шагов, `lead_id`, `page_url`, UTM-метки и `submitted_at`;
- fallback после success: `@IZI_PANEL` и `Izipanelorder@gmail.com`.

## Do's and Don'ts

### Do:

- **Do** показывать материал в законченном интерьере и с видимым стыком, масштабом и направлением рисунка.
- **Do** сохранять отдельную mobile-композицию, visible focus и reduced-motion fallback.
- **Do** обозначать интерьерные изображения как концептуальные до замены на проверенные production-материалы.

### Don't:

- **Don't** вводить pill-CTA, glassmorphism, glow, кислотные градиенты, palace luxury, gold glamour и сетку одинаковых карточек как основу драматургии.
- **Don't** скрывать critical content до окончания анимации или блокировать native scroll.
- **Don't** считать production готовым: до публикации обязательно подтвердить URL политики конфиденциальности, реквизиты оператора персональных данных и права/разрешения на все интерьерные изображения.
