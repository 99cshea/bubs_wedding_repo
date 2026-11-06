# Hosting boundary

I Do! is strictly local-only by explicit user instruction. Run the app and API gateway on 127.0.0.1:4180; never bind to all network interfaces, allow public website origins, expose a tunnel, or deploy the I Do! application/API without a new explicit user request reversing this decision. Keep API credentials local and ignored. The old Sites project is retired to a static local-only notice; its retained hosting ID is not authorization to republish the app.

Exception: examples/golden-hour-photography is a separate PUBLIC static source website. Keep that static site public. It must contain no OpenAI key or paid API endpoint. The local I Do! importer may retrieve arbitrary public HTTPS vendor sites under its existing public-network checks. Do not relax those checks to fetch private-network sites.
