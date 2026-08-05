"use client";

import { FormEvent, useEffect, useState } from "react";

const roles = ["Частный заказчик", "Дизайнер / архитектор", "Строитель / комплектатор", "Дилер / магазин"];
const objects = [
  "Квартира / дом",
  "Гостиница / апартаменты",
  "Ресторан / кафе",
  "Офис / коммерческое пространство",
  "Магазин / шоурум",
  "Несколько объектов",
];
const areas = ["до 30 м²", "30–70 м²", "70–150 м²", "более 150 м²", "пока не знаю"];
const interests = [
  "Дерево и шпон",
  "Травертин и мрамор",
  "Тканевые поверхности",
  "Металл и патина",
  "Пока не знаю — нужна помощь",
];

const NETLIFY_FORM_ENDPOINT = "/forms.html";
const TELEGRAM_URL = "https://t.me/IZI_PANEL";
const EMAIL_URL = "mailto:Izipanelorder@gmail.com";
const PRICE_LIST_URL = "/downloads/price-list-izi-panel.xlsx";

type Tracking = {
  leadId: string;
  pageUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
};

const emptyTracking: Tracking = {
  leadId: "",
  pageUrl: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
};

export default function LeadForm() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [objectType, setObjectType] = useState("");
  const [area, setArea] = useState("");
  const [interest, setInterest] = useState("");
  const [tracking, setTracking] = useState<Tracking>(emptyTracking);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTracking({
      leadId: window.crypto?.randomUUID?.() ?? `lead-${Date.now()}`,
      pageUrl: window.location.href,
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
      utmContent: params.get("utm_content") ?? "",
    });
  }, []);

  const nextFromRole = (value: string) => {
    setRole(value);
    setStep(2);
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data: Record<string, string> = {};
    for (const [key, value] of new FormData(form).entries()) {
      data[key] = String(value);
    }
    data.submitted_at = new Date().toISOString();
    try {
      const formPayload = new URLSearchParams(data);
      // Submit to the static form page Netlify scanned at deploy time. Posting to
      // the Next.js root can return the application HTML with a misleading 200.
      const formResponse = await fetch(NETLIFY_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formPayload.toString(),
      });
      if (!formResponse.ok) throw new Error(`Netlify form submission failed: ${formResponse.status}`);
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
        <p>Прайс уже доступен. Полные каталоги фактур и показ образцов можно запросить у менеджера.</p>
        <div className="success-actions">
          <a className="button button-dark" href={PRICE_LIST_URL} download="Прайс-лист-IZI-PANEL.xlsx">
            Скачать прайс-лист
          </a>
          <a className="text-link" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
            Telegram · @IZI_PANEL ↗
          </a>
          <a className="text-link" href={EMAIL_URL}>
            Izipanelorder@gmail.com ↗
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      className="lead-form"
      name="open-village-lead"
      method="POST"
      action={NETLIFY_FORM_ENDPOINT}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={submit}
    >
      <input type="hidden" name="form-name" value="open-village-lead" />
      <p hidden>
        <label>Не заполняйте это поле: <input name="bot-field" /></label>
      </p>
      <input type="hidden" name="source" value="open-village-2026" />
      <input type="hidden" name="role" value={role} />
      <input type="hidden" name="object" value={objectType} />
      <input type="hidden" name="area" value={area} />
      <input type="hidden" name="interest" value={interest} />
      <input type="hidden" name="lead_id" value={tracking.leadId} />
      <input type="hidden" name="page_url" value={tracking.pageUrl} />
      <input type="hidden" name="utm_source" value={tracking.utmSource} />
      <input type="hidden" name="utm_medium" value={tracking.utmMedium} />
      <input type="hidden" name="utm_campaign" value={tracking.utmCampaign} />
      <input type="hidden" name="utm_content" value={tracking.utmContent} />
      <input type="hidden" name="submitted_at" value="" />

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
          <label className="select-label">
            Что заинтересовало
            <select value={interest} onChange={(e) => setInterest(e.target.value)} required>
              <option value="">Выберите вариант</option>
              {interests.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <div className="form-nav">
            <button type="button" className="back-button" onClick={() => setStep(1)}>← Назад</button>
            <button type="button" className="button button-dark" disabled={!objectType || !area || !interest} onClick={() => setStep(3)}>Продолжить →</button>
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend>Куда отправить прайс и расчёт?</legend>
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
          <label className="consent catalog-request">
            <input name="catalog_request" type="checkbox" />
            <span>Хочу посмотреть полные каталоги фактур и образцы</span>
          </label>
          {status === "error" && <p className="form-error">Не удалось отправить. Проверьте связь и попробуйте ещё раз.</p>}
          <div className="form-nav">
            <button type="button" className="back-button" onClick={() => setStep(2)}>← Назад</button>
            <button type="submit" className="button button-dark" disabled={status === "sending"}>
              {status === "sending" ? "Сохраняем…" : "Получить прайс →"}
            </button>
          </div>
        </fieldset>
      )}
    </form>
  );
}
