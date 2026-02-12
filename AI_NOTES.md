# AI Notes - Workflow Builder Lite

## LLM Provider

**Provider:** OpenAI  
**Model:** gpt-4o-mini (configurable via `OPENAI_MODEL`)

**Why OpenAI:** Stable API, good instruction-following, widely supported. gpt-4o-mini balances cost and quality for short text processing (clean, summarize, extract, tag).

## What AI Was Used For

- Project scaffold (Next.js, Prisma, Tailwind)
- Database schema (Workflow, Step, Run, RunStepOutput)
- API routes, Zod validation
- UI components (Button, Card, Input, Toast, Badge, Dialog, Skeleton)
- Features: workflow form, list (edit/delete/duplicate/search), run form, run detail, history, health, templates
- Dashboard with stats
- Theme toggle (dark/light)
- Docker, docker-compose
- README, AI_NOTES, PROMPTS_USED

## What Was Checked Manually

- End-to-end flows
- API correctness
- Database schema and Prisma
- Error handling, validation
- UI layout, responsiveness, dark mode
- Environment variables

## Architecture

- **Controllers** – HTTP, Zod
- **Services** – Business logic, LLM via `services/llm/client.ts`
- **Repositories** – Data access
- **Validation** – Empty input, invalid workflow rejected
