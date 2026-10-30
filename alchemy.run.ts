import { appendFileSync } from "node:fs";
import alchemy from "alchemy";
import { Ruleset, SvelteKit, Worker } from "alchemy/cloudflare";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "./apps/web/.env" });
config({ path: "./apps/server/.env" });

// Set by the PR preview workflow to something like "pr-42". Unset in production.
const previewId = process.env.ALCHEMY_PREVIEW_ID;
const isPreview = Boolean(previewId);

// Cloudflare account's workers.dev subdomain, taken from the production
// CORS_ORIGINS value (https://api-portfolio.ar7al.workers.dev). Used to predict
// a preview Worker's URL before it exists, so the other Worker's bindings can
// reference it without a second deploy.
const WORKERS_DEV_SUBDOMAIN = "ar7al";

const app = await alchemy("Personal-website", {
  password: alchemy.env.SECRET_PASSPHRASE!,
  // A distinct stage keeps preview state and resources (Worker names, no
  // custom domains) completely separate from the production stage, so a
  // preview deploy can never affect ar7al.dev's domain bindings.
  ...(isPreview ? { stage: `pr-${previewId}` } : {}),
});

const webName = isPreview ? `portfolio-${previewId}` : "portfolio";
const serverName = isPreview ? `api-portfolio-${previewId}` : "api-portfolio";

const webPreviewUrl = `https://${webName}.${WORKERS_DEV_SUBDOMAIN}.workers.dev`;

export const server = await Worker("server", {
  cwd: "apps/server",
  name: serverName,
  adopt: true,
  ...(isPreview ? { url: true } : { domains: ["api.ar7al.dev"] }),
  entrypoint: "src/index.ts",
  compatibility: "node",
  bindings: {
    GH_TOKEN: alchemy.secret(process.env.GH_TOKEN!),
    CORS_ORIGINS: isPreview ? webPreviewUrl : alchemy.env.CORS_ORIGINS!,
  },
  dev: {
    port: 3000,
  },
});

export const web = await SvelteKit("web", {
  cwd: "apps/web",
  name: webName,
  adopt: true,
  ...(isPreview ? { url: true } : { domains: ["ar7al.dev", "www.ar7al.dev"] }),
  spa: false,
  assets: {
    not_found_handling: "404-page",
    run_worker_first: true,
  },
  bindings: {
    PUBLIC_SERVER_URL: isPreview ? server.url! : alchemy.env.PUBLIC_SERVER_URL!,
  },
});

if (!isPreview) {
  await Ruleset("www-redirect-ruleset", {
    zone: "ar7al.dev",
    phase: "http_request_dynamic_redirect",
    rules: [
      {
        description: "Redirect www to apex",
        expression: '(http.host eq "www.ar7al.dev")',
        action: "redirect",
        action_parameters: {
          from_value: {
            status_code: 301,
            target_url: {
              expression: 'concat("https://ar7al.dev", http.request.uri.path)',
            },
            preserve_query_string: true,
          },
        },
      },
    ],
  });

  await Ruleset("security-headers-ruleset", {
    zone: "ar7al.dev",
    phase: "http_response_headers_transform",
    rules: [
      {
        description: "Add security headers",
        expression: "true",
        action: "rewrite",
        action_parameters: {
          headers: {
            "Strict-Transport-Security": {
              operation: "set",
              value: "max-age=31536000; includeSubDomains",
            },
            "X-Content-Type-Options": {
              operation: "set",
              value: "nosniff",
            },
            "X-Frame-Options": {
              operation: "set",
              value: "DENY",
            },
            "Referrer-Policy": {
              operation: "set",
              value: "strict-origin-when-cross-origin",
            },
            "Cross-Origin-Opener-Policy": {
              operation: "set",
              value: "same-origin",
            },
            "Permissions-Policy": {
              operation: "set",
              value: "camera=(), microphone=(), geolocation=()",
            },
          },
        },
      },
    ],
  });
}

console.log(`Web    -> ${web.url}`);
console.log(`Server -> ${server.url}`);

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `web_url=${web.url}\nserver_url=${server.url}\n`);
}

await app.finalize();
