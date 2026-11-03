# Bub’s Real Good Weddings & BBQ Inc.

Vendor onboarding demo, saved November 2, 2026. Source snapshot: `7880c9f0fb131186368e27b249a310da7224e527` from the existing Sites checkout. GitHub repository: https://github.com/99cshea/bubs_wedding_repo. This snapshot preserves the current application source and handoff notes.

## Work completed

- Before/after onboarding for photographers, DJs, venues, and caterers: a manual 46-field workflow and simulated automated profile creation.
- Editable rep rate, process comparison, fictional source packets, email and call transcripts, exact source citations, and a downloadable sample insurance certificate.
- Wedding-oriented editorial styling, improved text contrast, reduced sidebar marketing copy, and staged loading screens.
- Transcript-to-profile flow, vendor draft review, and browser-based vendor directory.
- Promptfoo comparison of three profile strategies across seven transcript scenarios, including incomplete information. Published reports include 126 assertion results. These evaluate fixture outputs, not live model generations.
- Real GPT Live voice pilot with a local Node gateway, GPT-6 Luna profile analysis, captions, typed-input option, exact supporting quotes, explicit Apply/Dismiss controls, and draft/transcript export.

## Run locally

Use a recent Node.js release with built-in fetch and environment proxy support. Run `node voice/gateway.mjs`, then open http://127.0.0.1:4180/?v=9#voice. The Windows launcher uses the runtime path on the original development computer; update it if moving the repo.

For live API features, configure `OPENAI_API_KEY` in this repository’s ignored `.env.local` file. No credential is included in this snapshot. The original checkout still holds its existing local configuration. Do not put the key in `dist/`, source control, or client-side code.

The static demo can also be served from `dist/` with any static HTTP server; voice requires the gateway. Only one gateway can bind port 4180 at a time.

## Pilot limits and validation

One active voice session; two-minute server cutoff; thirty-second browser idle cutoff; ten starts per UTC day; three bounded profile analyses per session. Connection tests count toward daily starts. These are application limits, not an account dollar spending cap. End sessions before stopping the gateway.

Validated gateway authorization, origin restrictions, budgets, persisted start limits, grounding, secret-file exclusion, and server cutoff with `node voice/gateway.test.mjs`. A real API test verified spoken replies, grounded suggestions from typed rep notes, withheld missing email, explicit application, and shutdown. Physical microphone input has not been tested. Hosted-page access to the local gateway remained unverified; the local browser flow worked.

## Layout

- `dist/`: complete static application, sample evidence, certificate, and published eval assets.
- `voice/`: gateway implementation, tests, API smoke test, and operating notes.
- `evals/`: reproducible promptfoo fixture suite (`npm ci`, then `npm run eval` from this directory).
- `tools/`: sample packet/certificate generation and model-access check.
- `.openai/hosting.json`: existing Sites project binding; preserve unless intentionally creating a separate deployment.

Existing private deployment: https://bubs-vendor-onboarding-demo.safeamber12.chatgpt.site/?v=9#voice

The non-voice automation and vendor documents are fictional demo data. Profile changes stay in the browser; no CRM integration or insurance verification is implemented.
