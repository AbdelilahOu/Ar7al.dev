---
title: AttijariFlare
description: "Personal finance tracker that turns monthly Attijariwafa bank PDF statements into a categorized ledger, built entirely on Cloudflare's free tier."
tech:
  - name: Cloudflare Workers
    use: "Runs the API, the two queue consumers, and the frontend as static assets"
  - name: Workers AI
    use: "Converts each PDF to markdown, extracts transactions with Llama 3.3 70B, and embeds merchant names with bge-m3"
  - name: Queues
    use: "Separate ingest and enrichment pipelines, each with its own dead-letter queue"
  - name: Vectorize
    use: "Holds merchant embeddings so new transactions take the category of similar confirmed merchants"
  - name: D1
    use: "Stores statements, transactions, merchants, categories and splits, in the EU jurisdiction"
  - name: R2
    use: "Stores the uploaded PDF statements, also in the EU jurisdiction"
  - name: Hono
    use: "The HTTP server inside the API Worker"
  - name: oRPC
    use: "Typed procedures between the frontend and the API, validated with Zod"
  - name: Drizzle ORM
    use: "Schema, migrations and queries for D1"
  - name: Better Auth
    use: "Email and password sign-in, with sign-ups switched off in production"
  - name: Solid
    use: "The frontend, on Solid 2 with Solid Router and TanStack Query"
  - name: Tailwind CSS
    use: "Styling, light and dark themes"
  - name: Alchemy
    use: "Infrastructure as TypeScript for the dev, per-PR preview and production stages"
  - name: GitHub Actions
    use: "Deploys a preview on every pull request and production on every push to main"
image: ./images/AttijariFlare.png
imageAlt: "AttijariFlare's dashboard with sample data, showing money in, money out, net and closing balance for October 2026, a monthly totals chart, and spending by category in MAD"
web: https://finance.ar7al.dev
github: https://github.com/AbdelilahOu/AttijariFlare
createdAt: "2026-11-25"
published: true
---

AttijariFlare reads the monthly PDF statements from my Moroccan bank and turns them into a ledger I can trust. My bank only gives me a PDF each month, no export, no API, and every budgeting app wants a bank connection that doesn't exist for it. So the app works from the PDF I already get: upload it, let AI read it, fix the few rows it got wrong, split the cash, and read the totals. It's a personal tool with one owner, so sign-ups are closed and the live site is a landing page with the app behind sign-in.

## What it does

### Statement upload

Statements get dragged in as PDFs, deduplicated by file hash, and stored in R2. Each one shows its status as it moves through the pipeline: queued, extracting, parsed, needs review, or failed.

### AI extraction

The ingest consumer converts the PDF to markdown with Workers AI, splits it into chunks, and asks Llama 3.3 70B in JSON mode for every transaction with its date, description, signed amount, and running balance. A chunk that keeps failing gets split in half and retried. Row fingerprints make re-ingesting a statement a no-op.

### Balances that have to add up

After extraction, the app checks that the opening balance plus every transaction equals the closing balance, and that each running balance follows from the one before. If the numbers don't match, the statement is marked as needing review so I can find the row the model got wrong.

### A categorizer that learns

Merchant names get embedded with bge-m3, a multilingual model that handles French and Arabic, and stored in Vectorize. A new transaction takes the category of confirmed merchants that are similar enough, falls back to the LLM when nothing matches closely, and carries a confidence score. When I correct a category, the app learns it for that merchant and offers to apply it to the merchant's other transactions.

### Split cash withdrawals

A cash withdrawal, or any debit, can be split into parts, each with its own category and note, with helpers to split evenly or fill the remainder. Reports count the parts instead of the withdrawal, so they show where the cash actually went.

### Dashboard

It shows money in, money out, net and closing balance for any range of months, a monthly chart, spending by category, and a list of what needs review: uncategorized or low-confidence rows, cash that isn't fully split, and statements that need a look.

## What was hard

### A pipeline that doesn't block

Extraction and categorization run as two separate queues, each with its own dead-letter queue, so one failed statement never holds up the rest.

### Previews with their own database

The infrastructure is TypeScript through Alchemy, with three stages: local dev, a preview per pull request on its own subdomain with a fresh database, and production. GitHub Actions deploys a preview on every pull request and production on every push to main, and all of it stays inside Cloudflare's free tier.
