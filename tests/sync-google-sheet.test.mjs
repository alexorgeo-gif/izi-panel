import assert from "node:assert/strict";
import test from "node:test";

import syncGoogleSheet, { isOpenVillageLead } from "../netlify/functions/sync-google-sheet.mjs";
import submitLead from "../netlify/functions/submit-lead.mjs";

test("recognizes only the Open Village form", () => {
  assert.equal(isOpenVillageLead({ "form-name": "open-village-lead" }), true);
  assert.equal(isOpenVillageLead({ "form-name": "another-form" }), false);
});

test("returns success only after the Google Sheets webhook confirms the lead", async () => {
  const previousFetch = globalThis.fetch;
  const previousUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const previousSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;

  process.env.GOOGLE_SHEETS_WEBHOOK_URL = "https://example.test/webhook";
  process.env.GOOGLE_SHEETS_WEBHOOK_SECRET = "test-secret";
  globalThis.fetch = async () => new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

  try {
    const response = await submitLead(new Request("https://example.test/.netlify/functions/submit-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "form-name": "open-village-lead",
        source: "open-village-2026",
        lead_id: "lead-end-to-end-88",
        name: "Тест 88",
        contact: "88",
        consent: "on",
      }),
    }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      ok: true,
      duplicate: false,
      leadId: "lead-end-to-end-88",
    });
  } finally {
    globalThis.fetch = previousFetch;
    if (previousUrl === undefined) delete process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    else process.env.GOOGLE_SHEETS_WEBHOOK_URL = previousUrl;
    if (previousSecret === undefined) delete process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
    else process.env.GOOGLE_SHEETS_WEBHOOK_SECRET = previousSecret;
  }
});

test("forwards a verified lead without exposing configuration in the client", async () => {
  const previousFetch = globalThis.fetch;
  const previousUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const previousSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  let request;

  process.env.GOOGLE_SHEETS_WEBHOOK_URL = "https://example.test/webhook";
  process.env.GOOGLE_SHEETS_WEBHOOK_SECRET = "test-secret";
  globalThis.fetch = async (url, options) => {
    request = { url, options };
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    await syncGoogleSheet.formSubmitted({
      data: {
        "form-name": "open-village-lead",
        lead_id: "lead-test-1",
        name: "Тест",
        contact: "@test",
        role: "Дизайнер / архитектор",
        catalog_request: "on",
      },
    });
  } finally {
    globalThis.fetch = previousFetch;
    if (previousUrl === undefined) delete process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    else process.env.GOOGLE_SHEETS_WEBHOOK_URL = previousUrl;
    if (previousSecret === undefined) delete process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
    else process.env.GOOGLE_SHEETS_WEBHOOK_SECRET = previousSecret;
  }

  assert.equal(request.url, "https://example.test/webhook");
  const body = JSON.parse(request.options.body);
  assert.equal(body.secret, "test-secret");
  assert.equal(body.data.lead_id, "lead-test-1");
  assert.equal(body.data.catalog_request, "on");
});
