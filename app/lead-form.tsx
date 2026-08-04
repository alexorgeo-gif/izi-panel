"use client";

import { FormEvent, useState } from "react";

const roles = ["Частный заказчик", "Дизайнер / архитектор", "Строитель / комплектатор", "Дилер / магазин"];
const objects = ["Квартира", "Загородный дом", "Коммерческий объект", "Несколько объектов"];
const areas = ["до 30 м²", "30–70 м²", "70–150 м²", "более 150 м²", "пока не знаю"];

export default function LeadForm() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [objectType, setObjectType] = useState("");
  const [area, setArea] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const nextFromRole = (value: string) => {
    setRole(value);
    setStep(2);
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const payload = new URLSearchParams();
    for (const [key, value] of new FormData(form).entries()) {
      payload.append(key, String(value));
    }
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="lead-form success-card" aria-live="polite">
        <span className="success-icon">✓</span>
        <p className="form-kicker">Готово</p>
        <h3>Контакт сохранён.</h3>
        <p>Мы пришлём подборку и вернёмся к вашему запросу с конкретным следующим шагом.</p>
        <a className="button button-dark" href="#solutions">Посмотреть решения</a>
      </div>
    );
  }

  return (
    <form
      className="lead-form"
      name="open-village-lead"
      method="POST"
      data-netlify="true"
      onSubmit={submit}
    >
      <input type="hidden" name="form-name" value="open-village-lead" />
      <input type="hidden" name="source" value="open-village-2026" />
      <input type="hidden" name="role" value={role} />
      <input type="hidden" name="object" value={objectType} />
      <input type="hidden" name="area" value={area} />

      <div className="form-progress" aria-label={`Шаг ${step} из 3`}>
        {[1, 2, 3].map((item) => <span className={item <= step ? "active" : ""} key={item} />)}
      </div>
      <p className="form-kicker">Шаг {step} из 3</p>

      {step === 1 && (
        <fieldset>
          <legend>В каком качестве вы рассматриваете панели?</legend>
          <div className="option-list">
            {roles.map((item) => (
              <button type="button" onClick={() => nextFromRole(item)} key={item}>
                {item}<span>→</span>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend>Расскажите немного об объекте</legend>
          <label className="select-label">
            Тип объекта
            <select value={objectType} onChange={(e) => setObjectType(e.target.value)} required>
              <option value="">Выберите вариант</option>
              {objects.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="select-label">
            Примерная площадь панелей
            <select value={area} onChange={(e) => setArea(e.target.value)} required>
              <option value="">Выберите вариант</option>
              {areas.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <div className="form-nav">
            <button type="button" className="back-button" onClick={() => setStep(1)}>← Назад</button>
            <button type="button" className="button button-dark" disabled={!objectType || !area} onClick={() => setStep(3)}>Продолжить →</button>
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend>Куда отправить каталог и расчёт?</legend>
          <label className="field-label">
            Ваше имя
            <input name="name" type="text" autoComplete="name" placeholder="Например, Александр" required />
          </label>
          <label className="field-label">
            Телефон или Telegram
            <input name="contact" type="text" autoComplete="tel" placeholder="+7… или @username" required />
          </label>
          <label className="consent">
            <input name="consent" type="checkbox" required />
            <span>Согласен на обработку данных для связи по моему запросу</span>
          </label>
          {status === "error" && <p className="form-error">Не удалось отправить. Проверьте связь и попробуйте ещё раз.</p>}
          <div className="form-nav">
            <button type="button" className="back-button" onClick={() => setStep(2)}>← Назад</button>
            <button type="submit" className="button button-dark" disabled={status === "sending"}>
              {status === "sending" ? "Сохраняем…" : "Получить подборку →"}
            </button>
          </div>
        </fieldset>
      )}
    </form>
  );
}
