# Easy Panel website instructions

This folder contains the `izi-panel` website imported from GitHub.

- Work on the website in this folder; the parent folder also contains a separate Telegram bot.
- Read `PRODUCT_BRIEF.md` before changing product logic, copy, lead qualification, or conversion flow.
- Keep the site as a mobile-first Next.js landing page for Open Village.
- Primary conversion: successful submission of the Netlify form `open-village-lead`.
- Preserve the lead source value `open-village-2026` unless the campaign changes explicitly.
- Keep `public/forms.html` aligned with the visible lead form so Netlify can detect it.
- Do not publish unverified prices, delivery times, warranties, certificates, fire ratings, moisture resistance, or environmental claims.
- Treat `IZI PANEL` and Brand System №1 as owner-approved. Product photos, commercial claims and unverified descriptions remain placeholders until verified materials are supplied.
- Keep secrets and local credentials out of source files and chat.
- After code changes, run the smallest relevant check and `npm run build:netlify` when dependencies are available.
