---
title: Mahalli
description: "Local-first desktop app for Moroccan B2B businesses that handles the whole document chain, from quotes and orders to invoices, payments and credit notes."
tech:
  - name: Tauri v2
    use: "Packages the app for Windows, macOS and Linux, with file dialogs, notifications and auto-updates"
  - name: Rust
    use: "The backend, exposed to the frontend as Tauri commands for every document type"
  - name: SeaORM
    use: "Entities, migrations and queries, split into crates for the catalog and tenant databases"
  - name: SQLite
    use: "One database file per workspace, plus a catalog database that tracks them"
  - name: tauri-specta
    use: "Generates TypeScript bindings from the Rust commands, so frontend calls are typed"
  - name: Nuxt 4
    use: "The frontend, running inside the Tauri window"
  - name: TypeScript
    use: "The language for the frontend"
  - name: Tailwind CSS
    use: "Styling"
  - name: shadcn/vue
    use: "UI components for tables, forms and dialogs, built on Radix Vue"
  - name: VeeValidate and Zod
    use: "Form validation for clients, products and documents"
  - name: Unovis
    use: "The charts on the dashboard"
  - name: vue-pdf
    use: "Renders quotes, orders, delivery notes and invoices as printable PDFs"
  - name: Nuxt i18n
    use: "Translations for the interface"
  - name: GitHub Actions
    use: "Formats the code on every push to main and builds signed releases for Windows, macOS and Linux"
image: ./images/Mahalli.png
imageAlt: "Mahalli's invoices page, listing invoices with their client, status, total and amount paid in MAD"
web: https://mahalli-web.pages.dev/
github: https://github.com/AbdelilahOu/Mahalli
createdAt: "2026-01-15"
published: true
---

Mahalli is a desktop app for inventory and invoicing, built around the B2B document chain Moroccan businesses use. The name means "local" in Arabic. It runs on Tauri v2, with a Nuxt 4 frontend on a Rust backend that uses SeaORM and SQLite.

## What it does

### Document chain

It covers every step of a B2B sale: quote, customer order, delivery note, invoice, payment, and credit note. An approved quote turns into an order, and invoices can't be edited once finalized, so corrections go through a credit note instead. Payments can be partial or full, and the app tracks what each client still owes.

### Moroccan paperwork

Every printed document carries the legal identity fields Moroccan businesses need, for both the client and the seller: ICE, IF, RC, and Patente.

### Workspaces

You can create, clone, and switch between separate workspaces without restarting the app.

### Inventory, clients and dashboard

It tracks stock and products, keeps each client's documents together, and has a dashboard with charts.

### Works offline

Everything is stored locally in SQLite, so there's no server to run.

## What was hard

### Two layers of SQLite

Each workspace is its own SQLite tenant database. A separate catalog database tracks every workspace and which one is active, and the app hot-swaps the tenant connection when you switch.
