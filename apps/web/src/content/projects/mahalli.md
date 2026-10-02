---
title: Mahalli
description: "Cross-platform app for Moroccan B2B businesses that handles the whole document chain, from quotes and orders to invoices and payments."
tech:
  - Nuxt 4
  - TypeScript
  - Tailwind CSS
  - shadcn/vue
  - Tauri v2
  - Rust
  - SeaORM
  - SQLite
intro: 'Mahalli is a desktop app for inventory and invoicing, built around the B2B document chain Moroccan businesses use. The name means "local" in Arabic. It runs on Tauri v2, with a Nuxt 4 frontend on a native Rust backend that uses SeaORM.'
features:
  - name: Document chain
    summary: "It covers every step of a B2B sale: quote, customer order, delivery note, invoice, payment, and credit note. Payments can be partial or full, the app tracks what each client still owes, and every document prints to PDF."
  - name: Workspaces
    summary: "You can create, clone, and switch between separate workspaces without restarting the app."
  - name: Inventory and clients
    summary: "It tracks stock, keeps each client's full transaction history, and has a dashboard with charts and analytics."
  - name: Works offline
    summary: "Everything is stored locally in SQLite, so there's no server to run. The interface supports more than one language through i18n."
challenges:
  - name: Two layers of SQLite
    summary: "Each workspace is its own SQLite tenant database. A separate system catalog database tracks every workspace and which one is active, and the app hot-swaps the tenant connection when you switch."
  - name: Invoices that can't change
    summary: "Once an invoice is finalized it's immutable, so returns and pricing corrections go through credit notes instead."
  - name: Legal PDFs
    summary: "Quotes, delivery notes, and invoices print with the legal identity fields Moroccan documents require (ICE, IF, RC, and Patente/TP) for both the client and the seller."
  - name: Nuxt on Tauri
    summary: "Nuxt 4 talks to the Rust backend over Tauri v2 IPC, and its state has to stay right when you switch workspaces."
web: https://mahalli-web.pages.dev/
github: https://github.com/AbdelilahOu/Mahalli
createdAt: "2026-01-15"
published: true
---
