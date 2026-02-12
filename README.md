# Workflow Builder Lite

A production-ready AI-native automation runner for text processing. Create workflows with 2–4 steps (clean, summarize, extract, tag), run them on input text, and view step-by-step output with export options.

## How to Run

### Prerequisites

- Node.js 20+
- PostgreSQL
- OpenAI API key

### Local

```bash
npm install
cp .env.example .env
npm run db:push
npm run dev
```

Open http://localhost:3000

### Docker 
```bash
OPENAI_API_KEY=sk-your-key docker-compose up --build
```

App: http://localhost:3000


### Environment Variables

| Variable         | Description                  |
| ---------------- | ---------------------------- |
| `DATABASE_URL`   | PostgreSQL connection string |
| `OPENAI_API_KEY` | OpenAI API key               |
| `OPENAI_MODEL`   | Model name (default: gpt-4o-mini) |

## What Is Done

- **Dashboard** – Stats (workflow count, run count, last run), quick actions, recent workflows
- **Workflows** – Create (with templates), edit, delete, duplicate, search
- **Run** – Select workflow, enter text, execute, view output of each step
- **History** – Last 5 runs with status badges, view details
- **Export** – Copy markdown or download .md for any run
- **Health** – Backend, database, and LLM connection status
- **Validation** – Empty input rejected, invalid workflow rejected
- **Theme** – Dark/light mode toggle
- **UI** – Gradient accents, glass cards, skeletons, animations

## What Is Not Done

- Authentication / user accounts
- Persistent run history beyond last 5
- Streaming / real-time step output during run
- Multiple LLM provider support

## Tech Stack

- Next.js 14 (App Router), TypeScript, Tailwind CSS
- PostgreSQL, Prisma ORM
- OpenAI API (gpt-4o-mini)
