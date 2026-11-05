# Bub’s vendor onboarding demo

The main experience is now vendor self-service: choose a business category, start from a sample website or blank draft, review business information, confirm services and pricing, add a cover and optional private insurance document, preview, and publish a finished demo listing.

## Open and run

Existing private Site: https://bubs-vendor-onboarding-demo.safeamber12.chatgpt.site/?v=10

Run `node voice/gateway.mjs` with a recent Node release, or use `start-voice-pilot.cmd` on the original development computer. Open http://127.0.0.1:4180/?v=10. Voice needs the existing ignored `.env.local` configuration and local gateway. The static flow can be served from `dist/` with any static HTTP server.

## Current behavior

- Four categories: photographer, DJ, venue, caterer; category-specific service questions.
- Website imports remain simulated. The sample source packets deliberately include outdated pricing and no confirmed booking email. Field notes link to the actual fictional packet.
- A blank entry path accepts the vendor’s own information. Required fields, contact email, website protocol, current-price confirmation, authorization, and final review are checked before publishing.
- Draft and published listing are separate browser-local snapshots. Editing a draft leaves the previously published listing intact until republished. Drafts survive refresh; Save & exit provides a resumable handoff.
- Optional cover photo is compressed and saved locally. Insurance files stay in memory for the current page session; only the filename persists. Insurance never appears in the public listing, and upload does not verify coverage.
- The embedded vendor voice assistant receives the visible draft, suggests changes for review, and returns only explicitly applied fields. Existing pilot limits and local-key handling are retained. Closing the assistant ends its session.
- Publish produces a finished couple-facing demo page. It does not create an internet-public listing or shared database record. Inquiry actions are simulated and send no messages.
- The original rep workflow, comparison, and promptfoo evals remain at `team-demo.html` as a separate presentation tool.

## Verification

`node tools/vendor.test.mjs` verifies required-field checks, email/URL handling, pricing/authorization checks, public/private separation, escaping, and published snapshot isolation. Browser checks covered sample import/loading, missing email, pricing correction, preview/publish, draft persistence, unchanged published state while editing, reload of the finished page, and embedded voice context handoff. No new paid model call or microphone recording was used for this redesign; the prior live voice integration tests remain documented in `voice/README.md`.

The fixture-based promptfoo suite lives in `evals/` (`npm ci`, then `npm run eval`). `node voice/gateway.test.mjs` runs local gateway tests without API charges.

API keys, local usage counters, and dependencies are excluded from source control. All sample businesses, documents, and prices are fictional.
