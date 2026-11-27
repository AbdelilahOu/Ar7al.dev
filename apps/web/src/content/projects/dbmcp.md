---
title: DBMcp
description: "MCP server in Go that gives AI assistants 27 tools to explore and query PostgreSQL, MySQL, and SQLite databases, with named connections you can switch between mid-session."
tech:
  - name: Go
    use: "The whole server: a single binary that AI clients start over stdio"
  - name: MCP Go SDK
    use: "The official modelcontextprotocol/go-sdk, which registers each tool with typed input and output structs"
  - name: Cobra
    use: "The command line, with the stdio command and the --config and --connection flags"
  - name: database/sql
    use: "Go's standard database layer: all three drivers plug into it, and every Driver method runs its queries through it"
  - name: lib/pq
    use: "The PostgreSQL driver"
  - name: go-sql-driver/mysql
    use: "The MySQL driver"
  - name: modernc.org/sqlite
    use: "A pure Go SQLite driver, so the binary builds without cgo"
  - name: uuid and cuid2
    use: "Back the generate_id tool, which returns UUID v1 to v7, CUID, or CUID2"
image: ./images/DBMcp.png
imageAlt: "Claude Code using DBMcp to find the clients table in the Mahalli database and count its 150 clients"
github: https://github.com/AbdelilahOu/DBMcp
createdAt: "2026-01-20"
published: true
---

DBMcp is a Model Context Protocol (MCP) server, written in Go, that lets AI assistants like Claude look inside relational databases and query them. It started with PostgreSQL and later picked up MySQL and SQLite. You list your databases once in a `connections.json` file, and the assistant can switch between them in the middle of a session.

## What it does

### Named connections

Each connection in `connections.json` has a name, a type, a URL, and a description. The server opens the default one on startup, and the `list_connections`, `switch_connection`, and `test_connection` tools let the assistant see the others and move between them.

### Schema introspection

The tools list schemas, tables, and views, describe columns and indexes, and dig into foreign keys, table relationships, constraints, triggers, stored functions, sequences, materialized views, and enums wherever the database has them. `find_column` looks up a column by name across every table.

### Queries with guard rails

`select_query` only accepts `SELECT` and `WITH` statements, adds `LIMIT 100` when there is no limit, and stops after 30 seconds. `execute_query` handles writes and schema changes but refuses `DROP DATABASE`, `DROP SCHEMA`, and `TRUNCATE`.

### Core or full tool set

All 27 tools load by default. Setting `advanced` to `false` in the config keeps only the 10 core ones, so the assistant has fewer tools to pick from.

## What was hard

### Moving to a driver interface

The first version hard-coded the database type as a string in the session, and every tool branched on it to pick which queries to run. I moved all the database-specific queries behind a Driver interface, so the session now holds a Driver and the tools just call through to it. Capability flags on the interface say what each database supports (SQLite has no enums or sequences, for example), and adding a fourth database means writing exactly one file. I wrote up the refactor in [DBMcp: Refactoring to a Driver Interface](/blog/go-driver-interface-pattern).
