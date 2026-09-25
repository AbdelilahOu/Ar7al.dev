---
title: DBMcp
description: "MCP server that lets AI assistants inspect PostgreSQL, MySQL, and SQLite databases, built so adding a new database is a one-file change."
tech:
  - Golang
  - MCP
  - PostgreSQL
  - MySQL
  - SQLite
github: https://github.com/AbdelilahOu/DBMcp
createdAt: "2026-01-20"
published: true
---

DBMcp is a Model Context Protocol (MCP) server, written in Go, that lets AI assistants look inside relational databases. It started with PostgreSQL, then picked up MySQL and SQLite, and was later restructured around a driver interface. Adding a fourth database now means writing exactly one file.

The server has about 20 tools. They list tables and views, describe columns and constraints, and dig into foreign keys, triggers, functions, sequences, and enums. Every tool delegates to the `Driver` interface, so the tool files have no database-specific code and never branch on the database type.

Databases don't all support the same things. PostgreSQL has enums, sequences, and materialized views; SQLite has none of them. Capability flags on the interface describe what each database can do, and tools are registered at connection time based on that.

## Features

- Schema introspection for tables, views, columns, constraints, and foreign keys
- Enums and their values, sequences, materialized views, triggers, and stored functions, where the database has them
- Column search by name across tables and schemas
- Parameterized queries everywhere instead of string interpolation
- Only the tools the connected database supports get registered
- Works with PostgreSQL, MySQL, and SQLite

## Architecture

```
internal/driver/
    driver.go       <- Driver interface + shared return types
    postgres.go     <- PostgresDriver
    mysql.go        <- MysqlDriver
    sqlite.go       <- SqliteDriver
    helpers.go      <- shared parsing utilities
```

All database-specific queries live behind the `Driver` interface. The session holds a `Driver` instead of a type string, so each tool handler just calls through to it:

```go
type DBSessionState struct {
    Conn   *sql.DB
    Driver driver.Driver
}
```

Capability flags on the interface control which tools are registered at connection time:

```go
type Driver interface {
    ListTables(ctx, conn, schema) ([]TableRow, error)
    DescribeTable(ctx, conn, table, schema) (DescribeTableResult, error)
    // ...
    SupportsEnums() bool
    SupportsSequences() bool
    SupportsMaterializedViews() bool
}
```

## Challenges

- Designing the driver abstraction so tool files have no database-specific code at all
- Handling feature differences between databases without going back to branching on a type string
- Keeping driver return types free of presentation details while still mapping cleanly to MCP output types
- Replacing the implicit schema in the session with an explicit schema parameter on each tool call
