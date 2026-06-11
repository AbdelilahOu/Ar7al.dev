import alchemy from "alchemy";
import { RedirectRule, SvelteKit, Worker } from "alchemy/cloudflare";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "./apps/web/.env" });
config({ path: "./apps/server/.env" });

const app = await alchemy("Personal-website", {
  password: alchemy.env.SECRET_PASSPHRASE!,
});

export const web = await SvelteKit("web", {
  cwd: "apps/web",
  name: "portfolio",
  adopt: true,
  domains: ["ar7al.dev", "www.ar7al.dev"],
  spa: false,
  assets: {
    not_found_handling: "404-page",
    run_worker_first: true,
  },
  bindings: {
    PUBLIC_SERVER_URL: alchemy.env.PUBLIC_SERVER_URL!,
  },
});

export const wwwRedirect = await RedirectRule("www-redirect", {
  zone: "ar7al.dev",
  requestUrl: "https://www.ar7al.dev/*",
  targetUrl: "https://ar7al.dev/${1}",
  statusCode: 301,
  preserveQueryString: true,
});

export const server = await Worker("server", {
  cwd: "apps/server",
  name: "api-portfolio",
  adopt: true,
  domains: ["api.ar7al.dev"],
  entrypoint: "src/index.ts",
  compatibility: "node",
  bindings: {
    GH_TOKEN: alchemy.secret(process.env.GH_TOKEN!),
    CORS_ORIGINS: alchemy.env.CORS_ORIGINS!,
  },
  dev: {
    port: 3000,
  },
});

console.log(`Web    -> ${web.url}`);
console.log(`Server -> ${server.url}`);

await app.finalize();
