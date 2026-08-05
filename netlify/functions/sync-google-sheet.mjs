const FORM_NAME = "open-village-lead";
const FORM_SOURCE = "open-village-2026";

function requireEnvironment(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export function isOpenVillageLead(data) {
  return data?.source === FORM_SOURCE || data?.["form-name"] === FORM_NAME;
}

export async function postLeadToGoogleSheet(data) {
  const webhookUrl = requireEnvironment("GOOGLE_SHEETS_WEBHOOK_URL");
  const webhookSecret = requireEnvironment("GOOGLE_SHEETS_WEBHOOK_SECRET");
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: webhookSecret,
      data,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  const result = await response.json().catch(() => null);
  if (!response.ok || result?.ok !== true) {
    throw new Error(`Google Sheets sync failed with status ${response.status}`);
  }

  return result;
}

export default {
  async formSubmitted(event) {
    const data = event?.data ?? {};
    console.info(`Netlify form event received: source=${data.source ?? "missing"}; fields=${Object.keys(data).sort().join(",")}`);
    if (!isOpenVillageLead(data)) {
      console.warn("Skipped form event without the Open Village source");
      return;
    }

    await postLeadToGoogleSheet(data);
    console.info(`Google Sheets lead synced: ${data.lead_id ?? "without-id"}`);
  },
};
