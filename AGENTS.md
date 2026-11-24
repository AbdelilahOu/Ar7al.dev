# Repository Guidelines

Personal portfolio at [ar7al.dev](https://ar7al.dev): a Bun + Turborepo workspace with a SvelteKit 5 / Tailwind v4 site, a Hono API on Cloudflare Workers, oRPC between them, and Alchemy for dev and deploys. Formatting is bun's built-in `bun fmt`, linting is oxlint.

## Layout

- `apps/web` — the site (port 5173). Routes in `src/routes/(app)`, content in `src/content/{blog-posts,career,projects}`, components and data in `src/lib`.
- `apps/server` — the API worker (port 3000), `src/index.ts`. Runs oRPC's `RPCHandler` at `/rpc/*` and `OpenAPIHandler` at `/api-reference`.
- `packages/api` — the shared `appRouter` and context. Procedures live in `src/routers/<name>/index.ts` and are composed in `src/routers/index.ts`; the web app imports `AppRouter` for end-to-end types.
- `packages/config` — shared tsconfig presets.
- `alchemy.{dev,prod,preview}.ts` — one deploy config per environment.

## Commands

- `bun run dev` — web + server via Alchemy; `bun run dev:web` / `bun run dev:server` for one at a time.
- `bun run build` — build everything with Turborepo.
- `bun run fmt` / `bun run fmt:check` — `bun fmt`, configured in `bunfig.toml` (print width 100, sorted imports). It covers every tracked file type it knows — ts, svelte, md, json, yaml, css, html — and skips what `.gitignore` skips.
- `bun run lint` / `bun run lint:fix` — oxlint, configured in `.oxlintrc.json`. Run fmt and lint before committing.
- `bun run check-types` — tsc via Turborepo.
- `bun run deploy` / `bun run destroy` — production.
- `bun run deploy:preview` / `bun run destroy:preview` — a PR preview; needs `ALCHEMY_PREVIEW_ID` set to the PR number.

There is no test framework; `check-types` plus a manual pass in `bun run dev` is the whole check.

Project pages are written like blog posts: frontmatter holds only metadata (title, description, tech, links, dates, and an optional `image` cover such as `./images/DBMcp.png`), and the intro, `## What it does` and `## What was hard` sections live in the markdown body. The cover shows under the title on the details page and in the home page's Featured Projects, and morphs between them through the `project-<slug>-image` view transition name. The body renders in `.project-body` (in `app.css`), not `.prose`: the first paragraph is the large intro, `h2` is the italic display heading, and each `###` becomes a numbered item with the paragraphs under it indented. Project images go in `apps/web/src/content/projects/images/`.

Blog posts can also set an `image` cover (in `images/covers/`) and an `imageAlt` in frontmatter; it shows under the title on the post page and in the home page's Latest Posts, morphing through `post-<slug>-image`. Cover illustrations are stored as quality 90 JPEG, screenshots as palette PNG.

Blog post images go in `apps/web/src/content/blog-posts/images/` and are referenced with relative paths (`./images/...`), not from `static/`. mdsvex imports them through `@sveltejs/enhanced-img`, and `src/lib/components/markdown/Image.svelte` renders the AVIF/WebP picture with width, height and lazy loading. An image in `static/` gets none of that.

The JSON-LD blocks in the route pages write their opening tag as `<${"script"} type="application/ld+json">` inside the `{@html}` template literal. That renders identically but keeps oxlint's Svelte parser from choking on a literal `<script>` inside a string, so leave the split in place.

## Deployment

Each environment is its own Alchemy entrypoint, passed to the CLI by the scripts above. They are standalone copies on purpose — keep them in sync by hand when bindings or worker options change.

- `alchemy.dev.ts` — local workers, no custom domains, bindings from the `.env` files.
- `alchemy.prod.ts` — `ar7al.dev` and `api.ar7al.dev`, plus the `edge-rules` scope (www→apex redirect, security headers). `apps/server/env.d.ts` and `packages/api/env.d.ts` derive `Env` from this file, so it's the reference for bindings.
- `alchemy.preview.ts` — stage `pr-<id>`, `portfolio-pr-<id>` / `api-portfolio-pr-<id>` on `workers.dev` URLs, and writes `web_url` / `server_url` to `$GITHUB_OUTPUT` for the PR comment.

Bindings: `PUBLIC_SERVER_URL` on web; `CORS_ORIGINS` and `GH_TOKEN` on the server. Env files: `.env` (`SECRET_PASSPHRASE`), `apps/web/.env` (`PUBLIC_SERVER_URL`), `apps/server/.env` (`CORS_ORIGINS`, `GH_TOKEN`).

## Commits

Short imperative messages, `feat:` / `fix:` when it helps. PRs: a clear summary, linked issues, screenshots for UI changes.
