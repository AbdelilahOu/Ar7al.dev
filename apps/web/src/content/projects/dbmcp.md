---
title: DBMcp
description: "Golang MCP server that lets AI assistants introspect PostgreSQL, MySQL, and SQLite databases: list tables, describe schemas, analyze foreign keys, and more, with a clean driver interface that makes adding new databases a one-file change."
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

DBMcp is a Model Context Protocol (MCP) server written in Go that gives AI assistants full introspection access to relational databases. It started with PostgreSQL, grew to MySQL, then SQLite, and the architecture was refactored around a driver interface so adding a fourth database requires creating exactly one file.

The server exposes around 20 tools covering the full range of database introspection: listing tables and views, describing columns and constraints, exploring foreign keys, triggers, functions, sequences, and enums. Each tool delegates to a `Driver` interface, so the tool files contain no database-specific logic and no branching on database type.

Capability flags on the interface handle feature differences between databases. PostgreSQL supports enums, sequences, and materialized views; SQLite supports none of them. Tools are registered at connection time based on what the connected database actually supports.

## Features

- Full schema introspection: tables, views, columns, constraints, foreign keys
- Database-specific features: enums and enum values, sequences, materialized views, triggers, stored functions
- Schema search: find columns by name across tables and schemas
- Queries are parameterized throughout, avoiding string interpolation
- Capability-aware tool registration: only tools the connected database supports are exposed
- Multi-database support: PostgreSQL, MySQL, SQLite

## Architecture

```
internal/driver/
    driver.go       <- Driver interface + shared return types
    postgres.go     <- PostgresDriver
    mysql.go        <- MysqlDriver
    sqlite.go       <- SqliteDriver
    helpers.go      <- shared parsing utilities
```

The `Driver` interface owns all database-specific queries. Session state holds a `Driver` instance rather than a type string, so every tool handler is a straight delegation with no branching:

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

- Designing the driver abstraction so that tool files contain zero database-specific logic
- Handling capability differences across databases without reverting to type-string branching
- Keeping driver return types free of presentation concerns while maintaining a clean mapping to MCP output types
- Removing implicit schema state from session in favor of explicit schema parameters per tool call
