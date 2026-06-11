import alchemy from "alchemy";
import { Ruleset, SvelteKit, Worker } from "alchemy/cloudflare";
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

export const wwwRedirect = await Ruleset("www-redirect-ruleset", {
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

export const securityHeaders = await Ruleset("security-headers-ruleset", {
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
