# Repository Guidelines

## Project Overview

**Fingerlings**: A personal portfolio website built as a modern TypeScript monorepo. The project showcases career history, projects, and blog posts with a full-stack architecture using edge computing and type-safe APIs.

### Tech Stack

- **Frontend**: SvelteKit 5 + Svelte 5 with TailwindCSS v4, mdsvex for markdown posts
- **Backend**: Hono 4 running on Cloudflare Workers with compatibility: "node"
- **API Layer**: oRPC (OpenAPI + RPC handlers) for end-to-end type safety
- **Build & Deploy**: Turborepo monorepo, Alchemy for local dev & Cloudflare deployment
- **Code Quality**: oxlint + oxfmt for linting/formatting
- **Utilities**: Zod for schema validation, shiki for syntax highlighting, @ethercorps/sveltekit-og for OG images

## Project Structure & Module Organization

```
portfolio/
├── apps/
│   ├── web/              # SvelteKit frontend (port 5173 in dev)
│   │   ├── src/
│   │   │   ├── routes/   # SvelteKit routes
│   │   │   │   ├── (marketing)/  # Layout group for public pages
│   │   │   │   │   ├── ar7al/    # Personal name route (Arabic)
│   │   │   │   │   ├── blog/     # Blog listing & posts
│   │   │   │   │   ├── career/   # Career/experience page
│   │   │   │   │   ├── projects/ # Projects portfolio
│   │   │   │   │   └── social.png/ # Social image generation
│   │   │   │   ├── api/     # Server-side API routes (unused currently)
│   │   │   │   ├── 404/     # 404 error page
│   │   │   │   └── sitemap.xml/ # Dynamic sitemap route
│   │   │   ├── posts/   # Markdown blog posts (mdsvex)
│   │   │   ├── lib/     # Shared utilities & components
│   │   │   └── app.{css,html,d.ts} # Global styles & app shell
│   │   ├── static/      # Static assets
│   │   ├── svelte.config.js
│   │   ├── vite.config.ts
│   │   └── .env         # Example: PUBLIC_SERVER_URL=http://localhost:3000
│   │
│   └── server/          # Cloudflare Worker API (port 3000 in dev)
│       ├── src/
│       │   └── index.ts # Hono app with oRPC handlers
│       ├── dist/        # Compiled output
│       ├── env.d.ts     # Cloudflare env types
│       ├── tsdown.config.ts
│       └── .env         # Example: CORS_ORIGINS=http://localhost:5173
│
├── packages/
│   ├── api/             # Shared oRPC router & context
│   │   ├── src/
│   │   │   ├── routers/
│   │   │   │   └── index.ts  # appRouter with oRPC procedures
│   │   │   ├── context.ts    # Context factory for API requests
│   │   │   └── index.ts      # Exports procedure builder
│   │   └── package.json (exports "." and "./*" for tree-shaking)
│   │
│   └── config/          # Shared build/lint config presets
│
├── alchemy.run.ts       # Alchemy dev/deploy config
├── turbo.json          # Turborepo config
├── .oxlintrc.json      # oxlint rules
├── .oxfmtrc.json       # oxfmt config
└── package.json        # Workspace root config

```

## Key Features

- **Type-Safe API**: oRPC with Zod validation ensures type safety from database to frontend
- **Markdown Blog**: mdsvex converts .md files to Svelte components; shiki syntax highlighting
- **OG Image Generation**: SvelteKit endpoint for dynamic social media card images
- **OpenAPI Docs**: oRPC auto-generates `/api-reference` documentation
- **CORS-Enabled**: Hono CORS middleware routes configured in .env
- **Deployment**: Alchemy manages local dev & Cloudflare Workers deployment in one command

## Build, Test, and Development Commands

- `bun run dev`: Run all apps via Alchemy (web + server).
- `bun run dev:web`: Run only the SvelteKit app (port 5173).
- `bun run dev:server`: Run only the API worker (port 3000).
- `bun run build`: Build all apps with Turborepo.
- `bun run deploy`: Deploy via Alchemy to Cloudflare.
- `bun run destroy`: Tear down Alchemy environment.
- `bun run check`: Lint/auto-fix with `oxlint --fix --fix-suggestions --fix-dangerously`.
- `bun run check-types`: Type-check all packages with Turborepo.
- `bun run fmt` / `bun run fmt:check`: Format with `oxfmt`.

## Coding Style & Naming Conventions

- **TypeScript-first**: All source code is `.ts` or `.svelte` files; ESM modules.
- **SvelteKit routing**: Use `+page.svelte`, `+page.ts`, `+server.ts`, `+layout.svelte` naming.
- **API routers**: Define procedures in `packages/api/routers/*.ts`, export from `routers/index.ts`.
- **Markdown posts**: Place `.md` files in `apps/web/src/posts/` for mdsvex processing.
- **Tailwind**: Use TailwindCSS v4 utilities; no custom CSS classes unless necessary.
- **Zod schemas**: Use for API validation and type inference; define in api layer.
- **Formatting/linting**: Run `bun run check` and `bun run fmt` before commits.

## Testing Guidelines

- No dedicated test framework configured yet.
- Use `bun run check-types` for TypeScript compilation checks.
- Use `bun run check` for static linting (oxlint can catch many bugs).
- Integration testing: manually via `bun run dev` during development.
- If adding tests, document the command and location in this section.

## Deployment & Environment

- **Alchemy**: Single command dev/deploy via `alchemy.run.ts`.
- **Bindings**: Configured in `alchemy.run.ts` for web/server; synced from `.env` files.
- **Web bindings**: `PUBLIC_SERVER_URL` (API endpoint URL).
- **Server bindings**: `CORS_ORIGINS` (comma-separated allowed origins); `GH_TOKEN` (GitHub token for GitHub API calls if needed).
- **Cloudflare Workers**: Node.js compatibility mode enabled (`compatibility: "node"`).
- **Environment files**:
  - `.env` (root): `SECRET_PASSPHRASE` for Alchemy.
  - `apps/web/.env`: `PUBLIC_SERVER_URL`.
  - `apps/server/.env`: `CORS_ORIGINS`, `GH_TOKEN`.

## Commit & Pull Request Guidelines

- Commit history mixes conventional (`feat:`/`fix:`) and simple (`Update ...`).
- Recommendation: use short, imperative messages; prefer `feat:` or `fix:` when meaningful.
- PRs should include: clear summary, linked issues (if any), and screenshots for UI changes.
- Always format before committing: `bun run fmt && bun run check` (auto-fixes linting issues).

## oRPC & API Architecture

- **oRPC Router**: Defined in `packages/api/routers/index.ts` as `appRouter`.
- **Procedures**: Each function in `appRouter` is an oRPC procedure with optional input/output Zod schemas.
- **Server Handler**: `apps/server/src/index.ts` runs `RPCHandler` (for JSON-RPC calls) and `OpenAPIHandler` (for REST docs).
- **RPC Prefix**: `/rpc/*` for JSON-RPC calls; `/api-reference` for OpenAPI docs.
- **Client Usage**: Import `AppRouter` type in frontend for end-to-end type safety.

## Common Development Workflows

- **Add a new blog post**: Create `apps/web/src/posts/my-post.md`, mdsvex auto-renders it in `/blog` route.
- **Add an API endpoint**: Define procedure in `packages/api/routers/index.ts`, re-run dev server.
- **Update styling**: Edit Tailwind classes in `.svelte` files; v4 auto-scans and compiles.
- **Add environment variable**: Update `.env` file, restart dev server (Alchemy reloads bindings).
- **Test API**: Use `/api-reference` OpenAPI docs or make POST request to `/rpc/<procedure-name>`.

## Blog Diagram Guidelines

Blog posts under `apps/web/src/content/blog-posts/` sometimes benefit from an inline diagram to explain a concept. This section is the accumulated lesson from actually building and iterating on these — follow it rather than re-deriving the approach from scratch.

### Where diagrams live

- Each diagram is its own Svelte component in `apps/web/src/lib/components/diagrams/<Name>Diagram.svelte`. Never inline raw `<svg>` markup directly into a markdown post's body — it clutters the source and can't be reused.
- Wire it into a post with a `<script>` block right after the frontmatter:
  ```svelte
  <script>
  	import FooDiagram from '$lib/components/diagrams/FooDiagram.svelte';
  </script>
  ```
  then drop `<FooDiagram />` at the exact point in the prose where it belongs.

### Placement is what matters most

- A diagram must sit immediately after the specific paragraph or code block it illustrates — not several paragraphs later, not "up front" as a preview. The reading flow is: **explain the concept in text → show the diagram → the diagram confirms and visualizes what was just said.**
- One diagram = one concept. Don't build a single diagram trying to summarize an entire post or compare two whole systems side by side.
- Before adding a diagram, ask: "does the paragraph right above this need a picture, or am I adding one because the post feels diagram-shaped?" Only add it if the answer is genuinely the former — not every section needs a diagram.

### Keep it small, keep it simple

- Target one focused visual: one flow, one comparison of two things at most, one animated sequence. If you're reaching for a third panel or a legend explaining what four colors mean, it's too big — split it or cut it.
- Prefer several small diagrams distributed through the post over one large "capstone" diagram at the end. A big end-of-post summary diagram sounds appealing but tends to land either too abstract to add value or too busy to read at a glance.
- Use concrete example values, not placeholders: a real-looking key like `"user:42"`, an actual computed number, real modulo math that checks out (`8213740922 % 4 = 2`). A worked example is more convincing than a generic labeled box.

### Micro-animation, not spectacle

- Use small SMIL `<animate>` / `<animateTransform>` loops: a handful of elements changing state over a several-second loop, not a complex simultaneous system. This keeps the component dependency-free — no JS state machine needed.
- Sequence beats deliberately: a label/caption should appear *first*, then — after a short delay (roughly 0.5-1s) — the visual element reacts. Don't animate the label and the shape change at the same instant; simultaneous changes read as noise, not narration.
- Loop cleanly with `repeatCount="indefinite"`, and make the `keyTimes="0"` state the idle/at-rest state, so the loop restart isn't jarring.

### Visual style — match the site

- Font: `'JetBrains Mono Variable', monospace` throughout (the site's loaded webfont; works fine inline since these SVGs render in the DOM, not as external images).
- Box fill `#1a1a1a` / `#141414`, at-rest border `#52525b` (or `#3f3f46` for a fainter guide line), sharp corners only — never round one of these boxes (`rx`/`ry`), the whole site uses hard edges.
- Color language, used consistently: white `#f9fafb` = primary text / neutral state; green `#10b981` = success / active / arrived; blue `#60a5fa` = in-progress / computing / links; red `#f87171` = failure / cancelled / blocked. Muted gray `#9ca3af` / `#6b7280` for captions and secondary labels, typically `font-style="italic"` for the small caption line under a diagram.
- For a side-by-side comparison of two things, wrap both independently-sized `<svg>` elements in `<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">` so they stack to one column on small screens instead of squeezing two panels into a phone width.

### What didn't work — don't repeat this

- A two-panel "one lock vs. sharded locks" comparison and a "keys fan out through a router" diagram were both built, then removed — they tried to explain too much system at once and stopped being something you could read in a couple of seconds.
- Three different "capstone summary" diagrams (independent-shard pulse, struct recap, single-key routing) were prototyped for the end of a post and all three were scrapped in favor of no diagram there at all.
- If unsure which of several diagram concepts fits best, don't just build the most elaborate one and hope — build 2-3 small, cheap variants and ask which one lands, the same way you'd ask about any other design decision.

### Verification

- Run the dev server (`bun run dev:web`, or the `web` config in `.claude/launch.json` via the preview tool) and actually look at the rendered post before calling a diagram done.
- Watch a full animation loop (several seconds) to confirm every phase plays correctly, not just the first frame.
- Check both desktop and mobile widths for any diagram with more than one panel.
