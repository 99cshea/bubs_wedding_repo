# Local GPT Live pilot

Double-click `start-voice-pilot.cmd`, then open the private Site's Voice assistant tab. The gateway serves a local copy at http://127.0.0.1:4180 as well. Leave the gateway running while using voice. It reads the already configured, ignored `.env.local` file; the API key never enters the hosted site, browser, source control, or logs.

The pilot uses GPT Live 1 for audio and GPT-6 Luna with low reasoning effort for bounded, structured profile analysis. Microphone permission is requested only after Start voice. Test connection uses a silent generated track and never requests microphone access. The page includes AI-generated speech disclosure.

Controls: one active session, two-minute server hangup timer, thirty-second browser idle cutoff, ten session starts per UTC day, three text analyses per session, 750 maximum output tokens per analysis, bounded context, no hosted tools, no automatic API retries. Starts include connection tests and failed attempts. Daily counters persist in ignored `.voice-runtime/usage.json`. These are application pilot limits, not a dollar-denominated account spending cap. If the gateway is forcibly killed, its close timer cannot execute; always use End session before closing the gateway. Session close failures remain active and retry hangup rather than releasing the concurrency lock.

Only the fixed private Site origin and the loopback preview origin are accepted. A short-lived browser capability token is required for every paid request; it is not an OpenAI key. The gateway binds only to 127.0.0.1 and is not a public server. The browser may request local-network permission when the hosted Site contacts the gateway. Use the loopback preview if the browser blocks that request.

Only rep/user transcript text is sent to the extraction backend. Proposed field evidence must occur literally in that text. The rep explicitly applies suggestions to the draft. No changes are sent to a CRM or vendor and no insurance is verified. Session audio is not stored by this app, and API requests set store=false. In-memory captions can be exported by the rep.

References: https://developers.openai.com/api/docs/guides/voice-webrtc, https://developers.openai.com/api/docs/guides/live-delegation, https://developers.openai.com/api/docs/guides/voice-latency-cost.

V12: the vendor assistant connects automatically, with technical controls moved out of the primary UI. Restart this gateway after updating source; the browser checks `fieldContractVersion:12` to avoid using an outdated 46-field service. Both prompts speak directly with the business owner. The shared contract supports all 58 fields for each category and preserves field identifiers end to end. See `voice/vendor-integration.test.mjs` for boundary and mapping checks.

Real website import is now available at POST /api/voice/import. It uses the same origin-bound, short-lived browser capability as voice but a separate three-import-per-UTC-day budget. One actual Responses request is made after public HTML retrieval; no voice session is required. Keep the local gateway running while importing. The browser offers a local-service fallback if the hosted page cannot reach loopback. Raw website text and model API keys are never committed as sample output.
