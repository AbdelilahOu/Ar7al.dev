---
title: DBMcp
description: "MCP server that lets AI assistants inspect PostgreSQL, MySQL, and SQLite databases, built so adding a new database is a one-file change."
tech:
  - Golang
  - MCP
  - PostgreSQL
  - MySQL
  - SQLite
intro: "DBMcp is a Model Context Protocol (MCP) server, written in Go, that lets AI assistants look inside relational databases. It started with PostgreSQL and later picked up MySQL and SQLite."
features:
  - name: Schema introspection
    summary: "About 20 tools list tables and views, describe columns and constraints, and dig into foreign keys, triggers, stored functions, sequences, materialized views, and enums (with their values) wherever the database has them."
  - name: Column search
    summary: "You can look up a column by name across every table and schema."
  - name: Parameterized queries
    summary: "Every query is parameterized instead of built with string interpolation."
challenges:
  - name: No database code in the tools
    summary: "All the database-specific queries live behind a Driver interface, and the session holds a Driver instead of a type string. The tools just call through to it and never branch on the database type. Adding a fourth database means writing exactly one file."
  - name: Databases that differ
    summary: "PostgreSQL has enums, sequences, and materialized views; SQLite has none of them. Capability flags on the interface describe what each database can do, and the server only registers the tools the connected database supports."
  - name: Clean return types
    summary: "Driver return types carry no presentation details, but they still have to map cleanly to MCP output types."
  - name: Explicit schemas
    summary: "The schema used to be implied by the session. I replaced that with an explicit schema parameter on each tool call."
github: https://github.com/AbdelilahOu/DBMcp
createdAt: "2026-01-20"
published: true
---
