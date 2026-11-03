# Bub's transcript profile evals

This suite runs promptfoo 0.125.1 against hand-authored output fixtures. These are examples of extraction strategies, not outputs measured from live models. No API key or model call is required. Do not interpret the scores as model rankings.

Use Node.js 22 or newer. From this directory, run `npm ci`, then `npm run eval`. The runner writes `results.json` and publishes a browser report to `../dist/evals/` when run from the site repository. Expected negative-fixture failures are retained; execution errors and a failure in any grounded reference case stop the runner. `run.log` contains the CLI transcript.

Seven cases cover a detailed call, missing pricing, sparse information, conflicting rates, tentative services, a dropped call, and an instruction embedded in transcript content. All data is fictional. Eight fields are a representative subset of the larger onboarding schema.

Each output is checked for JSON schema, preservation of supported facts, null values for unknown facts, exact annotated evidence, explicit uncertainty status, and targeted follow-up questions. Quotes are compared with the human-authored expected annotations; this intentionally strict suite does not recognize every semantically equivalent paraphrase. The UI shows the same annotations so the standard is inspectable.

`fixture-provider.cjs` returns the recorded output selected by case and strategy. To evaluate actual extraction implementations, replace the provider with your model or application provider, keep the output schema and assertions, and rerun promptfoo. Never put API keys into site source, fixture files, or the browser. For prompt comparisons, replace the fixture provider and add the desired prompt templates to the promptfoo configuration.

The in-browser candidate JSON checker runs the same deterministic assertion code locally. It is separate from the saved promptfoo run and is labeled accordingly. The published tab does not run a Node process or call a model.

Reference: https://www.promptfoo.dev/docs/providers/custom-api/ and https://www.promptfoo.dev/docs/configuration/expected-outputs/javascript/
