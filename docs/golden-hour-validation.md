# Golden Hour live import validation — November 6, 2026

Public source: https://golden-hour-photography-portfolio.safeamber12.chatgpt.site/

Five independently hosted static HTML pages expose 49 intended public answers. Six original AI-generated illustrations are clearly disclosed; all business details and stories are fictional. Source lives under `examples/golden-hour-photography/` in GitHub. Its QA coverage map is outside the served `dist/` and is never supplied to extraction.

## Two paid imports; no automatic retries

| Run | Public Keepsake price and returned exact quote | Returned suggestions | Manually supported | Retrieval | Extraction | Total |
| --- | --- | --- | --- | --- | --- | --- |
| Baseline | The Keepsake $4,200 per wedding | 48 | 47 | 1.135s | 29.577s | 30.712s |
| Fresh | The Keepsake $4,650 per wedding | 48 | 47 | 1.411s | 29.732s | 31.143s |

Baseline source commit: `cd2b5d36189b54c37f8e37f678209826c867a60c`; final source commit: `50ad6eaf9f33718a6556331b68d86059dfc74b7b`. Only the public price and its test-only coverage passage changed between those versions. I Do!'s extraction code was unchanged across these two actual API calls. Each used a different request identifier. Repeating each same identifier recovered a cached result with no new model request or import-count increment. Daily usage after validation: 2/3 imports.

All returned quotes were checked against actual retrieved text. Manual review found one whole-answer evidence issue per run: baseline bio included style details outside its cited quote; fresh coverage added 10/12-hour package options outside its standard-eight-hour quote. These were excluded from the supported count. Both facts existed elsewhere on the source site, but the displayed evidence did not support the entire proposed value. Exact-substring grounding is not semantic entailment; review-before-apply remains essential. No fabricated private fact was returned.

All eight photographer-specific answers were returned in both runs. Baseline omitted tags; fresh omitted the featured-event description. Counts are observed, not fixed or guaranteed.

The following nine fields remained absent in BOTH runs: insurance status, insurer, liability limit, certificate expiry, license status, professional reference, document follow-up plan, outstanding onboarding follow-up, and platform portfolio permission. Personal-use printing rights and public copyright were not treated as I Do! display permission.

## Automated and browser checks

- Public unauthenticated retrieval: all five pages, no warnings or truncation; 10,133 extracted characters total, each below 6,500.
- Five ordinary static HTML files, no content JavaScript, all image references resolve locally; responsive home and collections checked at 390px, desktop checked at default width.
- Public HTTPS/DNS boundaries, same-host redirects, robots exclusions, inaccessible pages, source truncation, missing facts, bounded same-origin hyperlink metadata, 58-suggestion ceiling, 8,000 output tokens, legacy event-catering normalization.
- Gateway authorization, daily import budget, cached duplicate recovery and actual timing receipts.
- Frontend tests: deliberate fresh identifiers vs retry identifier reuse, no fictional fallback on failure, shortcut changes only category/URL, review never auto-applies, applied answers retain source URLs, clean draft replacement preserves prior published snapshot, raw pages are not persisted into the saved browser draft.
- Existing owner-assistant, voice schema, pricing confirmation, private-field exclusion and published-snapshot tests pass.

The two paid freshness calls were exercised through the actual local gateway using `tools/validate-golden-hour-live.mjs`; frontend fresh-read actions and apply behavior were tested separately without paid requests. To repeat costs money and consumes the normal three-import daily allowance. Live extraction still requires the local gateway at 127.0.0.1:4180; Golden Hour itself is independently public and needs no gateway.
