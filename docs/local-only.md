# I Do! local-only operation

User decision: November 6, 2026.

Open http://127.0.0.1:4180/ after starting the existing voice launcher or running `node voice/gateway.mjs` from the application checkout. The API key stays in the ignored local `.env.local`.

The gateway listens on IPv4 loopback only. It accepts only matching localhost/127.0.0.1 Host headers and local origins, and requires a short-lived capability for paid routes. The previous hosted I Do! origin is explicitly rejected. Daily import limit: 10, with persisted usage and duplicate-request caching. No public backend or tunnel is configured by this project.

The old owner-private Sites deployment is retired to a static local-only notice rather than serving the I Do! application. Do not redeploy the application there. Its historical project ID is retained solely as provenance.

Golden Hour remains independently public at https://golden-hour-photography-portfolio.safeamber12.chatgpt.site/ and serves static HTML, CSS and illustrations only. It has no paid API route or OpenAI credential. I Do! can still import other external public HTTPS websites from the local backend.

The existing browser-local draft and published listing are preserved. Source is still backed up in GitHub; a source repository is not a public executable API service.
