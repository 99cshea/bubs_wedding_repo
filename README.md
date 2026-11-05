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

## Expanded vendor intake (v11)

The vendor flow now restores the original 46-field onboarding schema and adds eight category-specific operating questions plus four insurance record fields: 58 answers across six substantive sections. Manual and assisted paths have the same requirements. Blank manual intake resets the draft explicitly, preserving any published listing.

Business contacts, service scope, three package tiers, inclusions, overtime, fees, booking/payment/cancellation policies, contingency plans, portfolio permissions, and document follow-up all require answers. Not-applicable or unavailable details must be explained explicitly. Every section needs vendor confirmation; changing a field invalidates that section’s confirmation. Pricing and delivery have separate confirmation gates.

The simulated assisted import uses the existing five-document packet JSON and its exact text spans, drafting 42 fields and leaving 16 unsupported fields blank. Price and timeline discrepancies remain unresolved until reviewed. No measured or assumed time saving is claimed. The UI shows actual field coverage and remaining requirements. Pending insurance does not imply verification and requires status/follow-up details. Private contacts, address, references, and insurance are excluded from new published snapshots and listing exports.

Run `node tools/vendor-depth.test.mjs` for all-category field counts, same completion standard, sample coverage, withheld answers, source spans, confirmation gates, and privacy checks. Browser QA checked a truly blank manual worksheet, blocked incomplete progression, source viewing without autofill, sample loading, 42/58 prefill, and category-specific gaps. Existing v10 drafts retain their values and need to complete the expanded intake before republishing.
