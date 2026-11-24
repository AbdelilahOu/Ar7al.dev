---
title: DBMcp
description: "MCP server that lets AI assistants inspect PostgreSQL, MySQL, and SQLite databases, built so adding a new database is a one-file change."
tech:
  - Golang
  - MCP
  - PostgreSQL
  - MySQL
  - SQLite
image: ./images/DBMcp.png
imageAlt: "Claude Code calling DBMcp to count the tables in the Mahalli database and the rows in each one"
github: https://github.com/AbdelilahOu/DBMcp
createdAt: "2026-01-20"
published: true
---

DBMcp is a Model Context Protocol (MCP) server, written in Go, that lets AI assistants look inside relational databases. It started with PostgreSQL and later picked up MySQL and SQLite.

## What it does

### Schema introspection

About 20 tools list tables and views, describe columns and constraints, and dig into foreign keys, triggers, stored functions, sequences, materialized views, and enums (with their values) wherever the database has them.

### Column search

You can look up a column by name across every table and schema.

### Parameterized queries

Every query is parameterized instead of built with string interpolation.

## What was hard

### Moving to a driver interface

The first version hard-coded the database type as a string in the session, and every tool branched on it to pick which queries to run. I moved all the database-specific queries behind a Driver interface, so the session now holds a Driver and the tools just call through to it. Capability flags on the interface say what each database supports (SQLite has no enums or sequences, for example), and adding a fourth database means writing exactly one file. I wrote up the refactor in [DBMcp: Refactoring to a Driver Interface](/blog/go-driver-interface-pattern).
