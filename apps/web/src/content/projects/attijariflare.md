---
title: AttijariFlare
description: "Personal finance tracker that turns monthly Attijariwafa bank PDF statements into a categorized ledger, built entirely on Cloudflare's free tier."
tech:
  - Solid
  - TypeScript
  - Cloudflare Workers
  - D1
  - R2
  - Queues
  - Vectorize
  - Workers AI
  - Hono
  - oRPC
  - Drizzle
  - Tailwind CSS
  - Alchemy
  - GitHub Actions
image: ./images/AttijariFlare.png
imageAlt: "AttijariFlare's dashboard with sample data, showing money in, money out, net and closing balance for October 2026, a monthly totals chart, and spending by category in MAD"
web: https://finance.ar7al.dev
createdAt: "2026-11-25"
published: true
---

AttijariFlare reads the monthly PDF statements from my Moroccan bank and turns them into a ledger I can trust. My bank only gives me a PDF each month, no export, no API, and every budgeting app wants a bank connection that doesn't exist for it. So the app works from the PDF I already get: upload it, let AI read it, fix the few rows it got wrong, split the cash, and read the totals. It's a personal tool with one owner, so the live site is a landing page and the app itself sits behind sign-in.

## What it does

### Statement upload

Statements get dragged in as PDFs, deduplicated by file hash, and stored in R2. Each one shows its status as it moves through the pipeline: queued, extracting, parsed, needs review, or failed.

### AI extraction

A queue consumer sends each statement to Workers AI, which pulls out every transaction with its date, description, signed amount, type, and running balance. Row fingerprints make re-ingesting a statement a no-op.

### A categorizer that learns

Merchant names get embedded into a Vectorize index. A new transaction takes the category of similar known merchants, falls back to the LLM when nothing matches closely, and carries a confidence score. When I correct a category, the app learns it for that merchant and offers to apply it to the merchant's other transactions.

### Split cash withdrawals

A cash withdrawal, or any debit, can be split into parts, each with its own category and note, with helpers to split evenly or fill the remainder. Reports count the parts instead of the withdrawal, so they show where the cash actually went.

### Dashboard

It shows money in, money out, net and closing balance for any range of months, a monthly chart, spending by category, and a list of what needs review: uncategorized or low-confidence rows, cash that isn't fully split, and statements that need a look.

## What was hard

### A pipeline that doesn't block

Extraction and categorization run as two separate queues, each with its own dead-letter queue, so one failed statement never holds up the rest.

### Previews with their own database

The infrastructure is TypeScript through Alchemy, with three stages: local dev, a preview per pull request on its own subdomain with a fresh database, and production. GitHub Actions deploys a preview on every pull request and production on every push to main, and all of it stays inside Cloudflare's free tier.

### French and Arabic on a phone

Statement descriptions mix French and Arabic, and I check my spending on my phone as often as on a laptop. The UI is mobile first, with a sidebar on desktop and bottom tabs on phones, light and dark themes, a typeface that handles both scripts, and amounts like `1 234,56 MAD` in tabular figures.
