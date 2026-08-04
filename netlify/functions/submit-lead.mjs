import { isOpenVillageLead, postLeadToGoogleSheet } from "./sync-google-sheet.mjs";

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export default async function submitLead(request) {
  if (request.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  try {
    const data = await request.json();
    if (!isOpenVillageLead(data)) return json({ ok: false, error: "invalid_form" }, 400);
    if (!String(data.lead_id || "").trim()) return json({ ok: false, error: "missing_lead_id" }, 400);
    if (!String(data.name || "").trim()) return json({ ok: false, error: "missing_name" }, 400);
    if (!String(data.contact || "").trim()) return json({ ok: false, error: "missing_contact" }, 400);
    if (data.consent !== "on") return json({ ok: false, error: "missing_consent" }, 400);

    const result = await postLeadToGoogleSheet(data);
    return json({ ok: true, duplicate: result?.duplicate === true, leadId: data.lead_id });
  } catch (error) {
    console.error(error);
    return json({ ok: false, error: "lead_sync_failed" }, 502);
  }
}
