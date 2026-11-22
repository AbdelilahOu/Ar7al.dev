import { appendFileSync } from "node:fs";

import alchemy from "alchemy";
import { SvelteKit, Worker } from "alchemy/cloudflare";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "./apps/web/.env" });
config({ path: "./apps/server/.env" });

const previewId = process.env.ALCHEMY_PREVIEW_ID;

if (!previewId) {
  throw new Error("ALCHEMY_PREVIEW_ID is required to deploy or destroy a preview.");
}

const WORKERS_DEV_SUBDOMAIN = "ar7al";

const webName = `portfolio-pr-${previewId}`;
const serverName = `api-portfolio-pr-${previewId}`;
const webUrl = `https://${webName}.${WORKERS_DEV_SUBDOMAIN}.workers.dev`;

const app = await alchemy("Personal-website", {
  password: alchemy.env.SECRET_PASSPHRASE!,
  stage: `pr-${previewId}`,
});

export const server = await Worker("server", {
  cwd: "apps/server",
  name: serverName,
  adopt: true,
  url: true,
  entrypoint: "src/index.ts",
  compatibility: "node",
  bindings: {
    GH_TOKEN: alchemy.secret(process.env.GH_TOKEN!),
    CORS_ORIGINS: webUrl,
  },
  dev: {
    port: 3000,
  },
});

export const web = await SvelteKit("web", {
  cwd: "apps/web",
  name: webName,
  adopt: true,
  url: true,
  spa: false,
  assets: {
    not_found_handling: "404-page",
    run_worker_first: true,
  },
  bindings: {
    PUBLIC_SERVER_URL: server.url!,
  },
});

console.log(`Web    -> ${web.url}`);
console.log(`Server -> ${server.url}`);

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `web_url=${web.url}\nserver_url=${server.url}\n`);
}

await app.finalize();
