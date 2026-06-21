# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev      # Start dev server on port 3030 (Turbopack)
yarn build    # Production build
yarn lint     # ESLint check
```

No test suite exists yet (see TODO.md P2).

## Architecture

Terminal-style personal portfolio built with Next.js 15 App Router. The entire UI simulates a Unix shell — users type commands, the terminal parses and dispatches them, and React components render the output.

### Command System

The core abstraction is in [src/app/ui/commands/registry.ts](src/app/ui/commands/registry.ts). Every command is registered there with:

- `name` + `aliases` — what the user types
- `component` (rendered) or `effect` (side-effect only, e.g. clear/cv) — mutually exclusive
- `completionMode`: `"rendered"` (complete on mount), `"resolved"` (complete after async data loads), `"manual"` (component calls `onComplete` itself)
- `includeInAll` — whether `all` command aggregates this command's output
- `getTextOutput` — optional text serializer used by the `> file.txt` redirect feature
- `manual` — structured data used by the `man` command

When adding a new command: register it in `registry.ts`, create its folder under `src/app/ui/commands/`, export a component and (if applicable) `getTextOutput`. Never spread command metadata across other files.

### Command Kinds

- **echo** — informational output (about, experience, skills, etc.)
- **utility** — actions or meta (clear, cv, all, man)

### Terminal Execution Flow

[src/app/ui/components/terminal/index.tsx](src/app/ui/components/terminal/index.tsx) handles the full lifecycle:
1. User input → `parseCommand` → parsed args/flags/redirect
2. `resolveCommandName` resolves aliases
3. Effect commands run their `CommandEffect` directly; rendered commands mount the component
4. Terminal waits for completion signal based on `completionMode`
5. File redirect (`> file.txt`) calls `getTextOutput()` and triggers download instead of rendering

### Data Fetching

Two API routes serve async commands:
- `/api/skills` — static skill matrix
- `/api/stats` — Leetcode stats (fetched with 5s timeout, 60s cache, requires `LEETCODE_USERNAME` env var)

React Query (`useSuspenseQuery`) is used inside async command components. Commands with async data use `completionMode: "resolved"` so the terminal waits for the query to settle. Error boundaries wrap each such command.

### Styling

No Tailwind. Pure CSS modules per component + global CSS variables in [src/app/globals.css](src/app/globals.css) for the terminal color theme. Font: Ubuntu Mono (self-hosted woff2 in `public/fonts/`).

### Path Aliases

- `@/*` → `src/*`
- `ui/*` → `src/app/ui/*`

### Version Injection

`next.config.ts` reads `VERCEL_GIT_COMMIT_SHA` and `VERCEL_DEPLOYMENT_ID` at build time and injects them as `NEXT_PUBLIC_*` env vars. The `version` command formats them as `<package>+<8-char-commit>+<deployment-id>`.
