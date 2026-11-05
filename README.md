# Bub’s vendor onboarding demo

The main experience is now vendor self-service: choose a business category, start from a sample website or blank draft, review business information, confirm services and pricing, add a cover and optional private insurance document, preview, and publish a finished demo listing.

## Open and run

Existing private Site: https://bubs-vendor-onboarding-demo.safeamber12.chatgpt.site/?v=13

Run `node voice/gateway.mjs` with a recent Node release, or use `start-voice-pilot.cmd` on the original development computer. Open http://127.0.0.1:4180/?v=10. Voice needs the existing ignored `.env.local` configuration and local gateway. The static flow can be served from `dist/` with any static HTTP server.

## Current behavior

- Four categories: photographer, DJ, venue, caterer; category-specific service questions.
- Live website imports retrieve public pages and make a bounded Responses API request. Fictional sample imports remain separately labeled; their source packets include outdated pricing and document gaps. Field notes link to the actual fictional packet.
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

## Assistance-first integration (v12)

The opening now leads with bringing existing information and finishing gaps; the full manual workload is available in a disclosure. Each intake section offers a prominent Help me finish my profile action with focus derived from the visible section, unresolved source conflicts, and missing answers. The 58-answer completion standard remains unchanged.

The assistant automatically prepares its local gateway connection without starting a paid session. Vendors see Start conversation or Type instead, a focused conversation, quoted proposals, and Apply/Dismiss controls. Technical setup and limits are tucked into Session details; failures show an actionable local-service fallback. Microphone and paid sessions still require an explicit click. The local gateway remains required on the same computer.

`dist/vendor-contract.js` is shared by the gateway and browser. Each category has 58 supported fields (50 common plus eight category-specific). Requests use a category-scoped output schema; the parent message handler and bridge use the same accepted keys. `delivery` remains `delivery` throughout. Applied category and insurance fields reach the intake. Updates invalidate affected section confirmations and pricing/timeline confirmations; unapplied proposals do not change the draft. New conversation corrections take precedence over old sample-source prompts.

Both Live and Responses instructions address the business owner directly. The current category, focused field identifiers, draft, and missing fields reach the backend as bounded reference data. The Live model requests extraction through client delegation; the Responses backend returns grounded suggestions with exact quotes. Apply returns changes immediately to the intake, and Done/close ends the session. Existing two-minute/three-analysis/ten-start limits remain intact.

Validation: `node voice/vendor-integration.test.mjs`, `node voice/gateway.test.mjs`, `node tools/vendor-assistant-ui.test.mjs`, `node tools/vendor-depth.test.mjs`, and `node tools/vendor.test.mjs`. Integration tests cover every category’s contract, persona, delivery/insurance/category mappings, the real parent message handler, review invalidation, and corrected-source precedence. Browser testing used one actual GPT Live session and two Responses analyses with fictional typed notes, producing and applying price, email, delivery, photography-method, insurer, and expiry updates. Physical microphone input was not recorded. A repeated spoken follow-up and closing-event warning observed during that test were addressed in the final prompt/event handling; no additional paid session was started after those refinements.

## Real public-website import (v13)

The main import path now retrieves the submitted website’s public HTML and makes one actual GPT-6 Luna Responses API call. No Bittersweet business answers or page snapshots are hardcoded. The example button only supplies its URL and category. Fictional sample import remains an explicit alternative under Other ways to try the demo.

The local gateway reads up to five same-host pages, honors explicit robots exclusions, rejects local/private destinations and non-HTTPS URLs, limits response sizes and input text, and does not read linked PDFs, images, or JavaScript-rendered content. The extraction schema is scoped to the selected vendor category. Accepted suggestions require exact quoted evidence from the retrieved text. Delivery-only order minimums and delivery policies are not promoted to wedding-event prices or policies. The model may still propose partial or imperfect answers, which require human review.

The review page lists actual source URLs, retrieval timestamps, quotes, missing fields, and retrieval limitations. Applying selected answers creates a clean draft with real website evidence. Existing published snapshots are preserved; no real vendor listing is published by the test. The submitted URL is retained as user-provided provenance if the model does not propose a website field. Import category selection does not discard the current draft. Imported private records retain the existing public/private separation.

Pilot limits: three paid imports per UTC day, one model request per import, 3,500 maximum output tokens, one import at a time, and no automatic retries. Duplicate request identifiers with the same browser capability recover an in-memory result without another model call. Voice budgets are separate. Requests use store=false. Import results are not committed as fixtures; raw page text is not persisted in the saved browser draft.

Browser QA on Bittersweet used five freshly retrieved pages and one actual Responses request. In that observed run, the model returned 12 grounded suggestions; applying them plus the submitted URL filled 13/58 fields and left 45 unanswered. All 12 package/pricing fields remained blank. This is an observed result, not a predetermined output or completeness guarantee. The import did not contact the vendor or submit any forms.

Run `node voice/site-import.test.mjs` and `node tools/vendor-live-import.test.mjs` for retrieval boundaries, robots handling, evidence/scope filters, independent auth/budgets, duplicate request recovery, review-before-apply, correct category handling, clean replacement, no old-price carryover, and published snapshot preservation. `node tools/check-real-site.mjs [https-url]` checks retrieval without making an AI request.
