const LEADS_SHEET_NAME = "Лиды";
const SPREADSHEET_ID = "1bkrkd-CnxaTd7gk2uSbMnQUsgXJ7uU3JfVHFRySbNLE";

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function getRequiredProperty(name) {
  const value = PropertiesService.getScriptProperties().getProperty(name);
  if (!value) throw new Error(`Не задано свойство скрипта: ${name}`);
  return value;
}

function parseSubmittedAt(value) {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function consentValue(value) {
  return value === true || value === "true" || value === "on" || value === "Да";
}

function segmentValue(role) {
  const segments = {
    "Частный заказчик": "Частные клиенты",
    "Дизайнер / архитектор": "Дизайнеры",
    "Строитель / комплектатор": "Строители и комплектаторы",
    "Дилер / магазин": "Дилеры",
  };
  return segments[String(role || "").trim()] || "Не определён";
}

function doPost(event) {
  const lock = LockService.getScriptLock();

  try {
    const requestBody = event && event.postData ? event.postData.contents : "{}";
    const body = JSON.parse(requestBody || "{}");
    const expectedSecret = getRequiredProperty("WEBHOOK_SECRET");
    if (body.secret !== expectedSecret) return jsonResponse({ ok: false, error: "unauthorized" });

    const data = body.data || {};
    const leadId = String(data.lead_id || "").trim();
    if (!leadId) return jsonResponse({ ok: false, error: "missing_lead_id" });

    lock.waitLock(10000);
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(LEADS_SHEET_NAME);
    if (!sheet) throw new Error(`Не найден лист: ${LEADS_SHEET_NAME}`);

    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const duplicate = sheet
        .getRange(2, 1, lastRow - 1, 1)
        .createTextFinder(leadId)
        .matchEntireCell(true)
        .findNext();
      if (duplicate) return jsonResponse({ ok: true, duplicate: true, leadId });
    }

    const rowNumber = lastRow + 1;
    const row = [
      leadId,
      parseSubmittedAt(data.submitted_at),
      String(data.name || "").trim(),
      String(data.contact || "").trim(),
      String(data.role || "").trim(),
      segmentValue(data.role),
      String(data.object || "").trim(),
      String(data.area || "").trim(),
      String(data.interest || "").trim(),
      String(data.source || "open-village-2026").trim(),
      String(data.utm_source || "").trim(),
      String(data.utm_medium || "").trim(),
      String(data.utm_campaign || "").trim(),
      String(data.utm_content || "").trim(),
      String(data.page_url || "").trim(),
      "Новый",
      "Не определён",
      "",
      "",
      consentValue(data.catalog_request) ? "Запросил полные каталоги фактур и показ образцов" : "",
      consentValue(data.consent),
    ];

    sheet.getRange(rowNumber, 1, 1, row.length).setValues([row]);
    sheet.getRange(rowNumber, 2).setNumberFormat("yyyy-mm-dd hh:mm");
    sheet.getRange(rowNumber, 19).setNumberFormat("yyyy-mm-dd");
    SpreadsheetApp.flush();

    return jsonResponse({ ok: true, leadId });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: "internal_error" });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}
