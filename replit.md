# FarmSphere

A full-stack farming market platform built with a pnpm monorepo. Helps farmers track MSP prices, market (mandi) rates, and alerts for price violations.

## Stack

- **Frontend**: React 19 + Vite, Tailwind CSS, shadcn/ui, Wouter routing
- **Backend**: Express 5 (ESM), Drizzle ORM, PostgreSQL
- **Auth**: Clerk (optional — falls back to local mock auth if `VITE_CLERK_PUBLISHABLE_KEY` is not set)
- **AI**: Google Gemini / Groq (optional)
- **Monorepo**: pnpm workspaces

## Workspaces

| Path | Name | Role |
|------|------|------|
| `artifacts/farmer-market` | `@workspace/farmer-market` | React frontend (Vite) |
| `artifacts/api-server` | `@workspace/api-server` | Express API server |
| `lib/db` | `@workspace/db` | Drizzle ORM schema + DB client |
| `lib/api-spec` | `@workspace/api-spec` | Shared API spec + codegen |
| `lib/api-zod` | `@workspace/api-zod` | Zod schemas |
| `lib/api-client-react` | `@workspace/api-client-react` | React Query hooks |

## Running on Replit

Two workflows are configured:

- **Start application** — Vite dev server (frontend) on port 5000, webview
- **API Server** — Express API server on port 3000, console

The Vite dev server proxies `/api/*` requests to the Express server at `localhost:3000`.

## Environment Variables / Secrets

| Key | Required | Notes |
|-----|----------|-------|
| `POSTGRES_URL` | Yes | PostgreSQL connection string (Render, Neon, Supabase, etc.) |
| `SESSION_SECRET` | Yes | Express session secret |
| `VITE_CLERK_PUBLISHABLE_KEY` | No | Clerk auth; omit to use mock auth |
| `CLERK_SECRET_KEY` | No | Clerk auth server secret |
| `GROQ_API_KEY` | No | AI features via Groq |
| `DATA_GOV_IN_API_KEY` | No | Live mandi prices from data.gov.in |

## Database

Schema is managed with Drizzle ORM. To push schema changes to the database:

```bash
pnpm --filter @workspace/db run push
```

## User Preferences

- Keep the existing monorepo structure; do not restructure or consolidate workspaces.
