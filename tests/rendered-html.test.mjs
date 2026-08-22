import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const html = await readFile(new URL("out/index.html", root), "utf8");
const formDetector = await readFile(new URL("public/forms.html", root), "utf8");

test("exports the IZI PANEL landing with the approved brand assets", async () => {
  assert.match(html, /<title>IZI PANEL — декоративные панели в интерьере<\/title>/i);
  assert.match(html, /IZI PANEL/);
  assert.doesNotMatch(html, /FORM \/ PANEL|>F\/P</i);
  assert.match(html, /href="\/favicon-izi-v2\.svg"/);
  await access(new URL("out/brand/izi-panel-logo-primary.svg", root));
  await access(new URL("out/brand/favicon-izi-v2-32.png", root));
  await access(new URL("out/brand/izi-panel-touch-v2.png", root));
  await access(new URL("out/fonts/Commissioner-Variable.ttf", root));
});

test("keeps the live Open Village lead contract", async () => {
  assert.match(html, /name="open-village-lead"/);
  assert.match(html, /action="\/forms.html"/);
  assert.match(html, /name="form-name"[^>]*value="open-village-lead"/);
  assert.match(html, /name="source"[^>]*value="open-village-2026"/);
  for (const field of ["role", "object", "area", "interest", "lead_id", "page_url", "utm_source", "utm_medium", "utm_campaign", "utm_content", "submitted_at", "name", "contact", "consent", "catalog_request"]) {
    assert.match(formDetector, new RegExp(`name=["']${field}["']`));
  }
  await access(new URL("out/forms.html", root));
  await access(new URL("out/downloads/price-list-izi-panel.xlsx", root));
});

test("does not publish blocked absolute commercial promises", () => {
  assert.doesNotMatch(html, /гарантия\s+\d+|доставка\s+за\s+\d+|сертифицировано|пожарный\s+класс/i);
});
