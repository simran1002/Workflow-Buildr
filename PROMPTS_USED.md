# Prompts Used for App Development

Records of prompts used when building this app with AI. No agent responses or API keys.

---

## Project Setup

- "Build a production-quality AI-native web application called Workflow Builder Lite..."
- "Tech stack: Next.js 14, TypeScript, Tailwind, PostgreSQL, Prisma, OpenAI..."
- "Layered architecture: /app, /components, /features, /services, /lib, /api, /db, /types..."

---

## Features

- "Create workflow: name, 2-4 steps, types clean/summarize/extract/tag, prompt template, order"
- "Run workflow: input text, execute steps sequentially, store outputs, show intermediate results"
- "History: last 5 runs, timestamp, workflow name, view details"
- "Export: copy markdown, download .md"
- "Health page: backend ok, db ok, llm ok"
- "Basic validation: empty text, invalid workflow"
- "Templates: prebuilt workflow templates"
- "Dashboard with stats"
- "Edit, delete, duplicate workflow"
- "Search workflows"
- "Theme toggle (dark/light)"
- "Better UI, gradient, glass, animations"

---

## Documentation

- "README: how to run, what is done, what is not done"
- "AI_NOTES: what AI was used for, what was checked manually, which LLM and why"
- "PROMPTS_USED: prompts used for app development"
- "ABOUTME: name and resume placeholder"

---

## App Prompts (Step Types)

Prompts used inside the app for LLM step execution:

- **clean:** Normalize text, fix typos, remove extra whitespace
- **summarize:** Produce 2–3 sentence summary
- **extract:** Extract entities (people, orgs, dates, locations)
- **tag:** Assign 3–5 comma-separated tags
- Placeholder: `{input}` – previous step output
