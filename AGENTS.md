# Repository Guidelines

Personal portfolio at [ar7al.dev](https://ar7al.dev): a Bun + Turborepo workspace with a SvelteKit 5 / Tailwind v4 site, a Hono API on Cloudflare Workers, oRPC between them, and Alchemy for dev and deploys. Lint and format with oxlint and oxfmt.

## Layout

- `apps/web` — the site (port 5173). Routes in `src/routes/(app)`, content in `src/content/{blog-posts,career,projects}`, components and data in `src/lib`.
- `apps/server` — the API worker (port 3000), `src/index.ts`. Runs oRPC's `RPCHandler` at `/rpc/*` and `OpenAPIHandler` at `/api-reference`.
- `packages/api` — the shared `appRouter` and context. Procedures live in `src/routers/<name>/index.ts` and are composed in `src/routers/index.ts`; the web app imports `AppRouter` for end-to-end types.
- `packages/config` — shared tsconfig and lint presets.
- `alchemy.{dev,prod,preview}.ts` — one deploy config per environment.

## Commands

- `bun run dev` — web + server via Alchemy; `bun run dev:web` / `bun run dev:server` for one at a time.
- `bun run build` — build everything with Turborepo.
- `bun run check` (oxlint, autofix), `bun run fmt` (oxfmt), `bun run check-types` (tsc). Run the first two before committing.
- `bun run deploy` / `bun run destroy` — production.
- `bun run deploy:preview` / `bun run destroy:preview` — a PR preview; needs `ALCHEMY_PREVIEW_ID` set to the PR number.

There is no test framework; `check-types` plus a manual pass in `bun run dev` is the whole check.

## Deployment

Each environment is its own Alchemy entrypoint, passed to the CLI by the scripts above. They are standalone copies on purpose — keep them in sync by hand when bindings or worker options change.

- `alchemy.dev.ts` — local workers, no custom domains, bindings from the `.env` files.
- `alchemy.prod.ts` — `ar7al.dev` and `api.ar7al.dev`, plus the `edge-rules` scope (www→apex redirect, security headers). `apps/server/env.d.ts` and `packages/api/env.d.ts` derive `Env` from this file, so it's the reference for bindings.
- `alchemy.preview.ts` — stage `pr-<id>`, `portfolio-pr-<id>` / `api-portfolio-pr-<id>` on `workers.dev` URLs, and writes `web_url` / `server_url` to `$GITHUB_OUTPUT` for the PR comment.

Bindings: `PUBLIC_SERVER_URL` on web; `CORS_ORIGINS` and `GH_TOKEN` on the server. Env files: `.env` (`SECRET_PASSPHRASE`), `apps/web/.env` (`PUBLIC_SERVER_URL`), `apps/server/.env` (`CORS_ORIGINS`, `GH_TOKEN`).

## Commits

Short imperative messages, `feat:` / `fix:` when it helps. PRs: a clear summary, linked issues, screenshots for UI changes.
