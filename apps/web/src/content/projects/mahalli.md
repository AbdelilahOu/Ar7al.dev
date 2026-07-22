---
title: Mahalli
description: "Tauri v2 desktop app for Moroccan B2B businesses. Covers the full document chain (quotes, orders, delivery notes, invoices, payments, and credit notes) across multiple workspaces, built with Nuxt 4, Rust, and SQLite."
tech:
  - Nuxt 4
  - TypeScript
  - Tailwind CSS
  - shadcn/vue
  - Tauri v2
  - Rust
  - SeaORM
  - SQLite
web: https://mahalli-web.pages.dev/
github: https://github.com/AbdelilahOu/Mahalli
createdAt: "2026-01-15"
published: true
---

Mahalli is a desktop application for inventory and invoicing, built specifically around the B2B document chain used by Moroccan businesses. The name means "local" in Arabic.

Built with Tauri v2, it combines a Nuxt 4 frontend with a Rust backend powered by SeaORM, delivering native performance with a modern UI. All data is stored locally in SQLite, so no external server is required.

The app supports multiple independent workspaces. Each workspace is a separate SQLite tenant database, hot-swappable at runtime. A persistent system catalog database tracks all registered workspaces and the active one, letting users create, clone, and switch between them without restarting.

## Document Chain

The full Moroccan B2B workflow is covered end to end:

1. **Quote / Devis**: generate and send a quote to the client for approval
2. **Customer Order / Bon de commande**: convert an approved quote into a purchase order
3. **Delivery Note / Bon de livraison**: issue a delivery note when goods are dispatched
4. **Invoice / Facture**: generate the final billing document after delivery; invoices are immutable once finalized
5. **Payment Tracking**: record partial and full payments against invoices with outstanding balance per client
6. **Credit Note / Avoir**: issue a credit note against a finalized invoice for returns or pricing corrections

All printed documents carry the required Moroccan legal identity fields: ICE, IF, RC, and Patente/TP for both clients and the seller's own profile.

## Features

- Multi-workspace support with runtime database switching
- Full B2B document chain from quote to credit note
- Inventory management with stock tracking
- Client database with full transaction history
- PDF generation for all document types
- Charts and analytics dashboard
- Internationalization (i18n) support
- Offline-first with local SQLite storage

## Architecture

```
src-tauri/
├── src/
│   ├── commands/
│   │   ├── clients.rs
│   │   ├── ...
│   │   └── templates.rs
│   ├── db/
│   │   ├── manager.rs
│   │   ├── paths.rs
│   │   ├── system.rs
│   │   └── tenant.rs
│   └── lib.rs
└── crates/
    ├── system-entity/     # SeaORM entities for the system/catalog DB
    ├── system-migration/  # Migrations for the system DB
    ├── system-service/    # Queries/mutations for the system DB
    ├── tenant-entity/     # SeaORM entities for tenant databases
    ├── tenant-migration/  # Migrations for tenant databases
    └── tenant-service/    # Queries/mutations for tenant databases
```

## Challenges

- Designing a two-layer SQLite architecture (system catalog + per-tenant databases) with hot-swappable connections
- Implementing the full Moroccan legal document chain with immutability constraints on finalized invoices
- Building a printable PDF system for quotes, delivery notes, and invoices with correct legal fields
- Integrating Nuxt 4 with Tauri v2 IPC and managing state across workspace switches
