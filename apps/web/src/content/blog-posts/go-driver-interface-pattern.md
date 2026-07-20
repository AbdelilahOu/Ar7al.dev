---
title: "DBMcp: Refactoring to a Driver Interface"
description: How I restructured DBMcp's multi-database support — replacing scattered if/else checks with a Go interface so adding a new driver only requires one new file.
seoDescription: A look at how DBMcp moved from scattered database type checks to a clean Go driver interface, making the codebase easier to extend and maintain.
seoKeywords:
  - DBMcp
  - MCP server Go
  - Go interface pattern
  - database driver abstraction
  - Go refactoring
date: "2026-05-22"
tags:
  - Go/Golang
  - DBMcp
  - Software Design
published: true
---

<script>
	import BranchingCheckDiagram from '$lib/components/diagrams/BranchingCheckDiagram.svelte';
	import DriverDelegationDiagram from '$lib/components/diagrams/DriverDelegationDiagram.svelte';
</script>

I've been building [DBMcp](https://github.com/AbdelilahOu/DBMcp), an MCP server that lets AI assistants introspect databases — list tables, describe schemas, analyze foreign keys, and so on. It started with PostgreSQL support. Then MySQL. Then SQLite.

By the time I had three databases, the codebase had a problem that I couldn't ignore.

## The old way

Every tool function — and there were around 20 of them — had the same shape. Here is what `list_tables` looked like:

```go
func listTablesHandler(ctx context.Context, dbType string, conn *sql.DB, schema string) ([]TableInfo, error) {
    if dbType == "postgres" {
        rows, err := conn.QueryContext(ctx, `
            SELECT table_name, table_schema, table_type
            FROM information_schema.tables
            WHERE table_schema = $1
            ORDER BY table_name`, schema)
        // ... scan rows ...
    } else if dbType == "mysql" {
        rows, err := conn.QueryContext(ctx, `
            SELECT TABLE_NAME, TABLE_SCHEMA, TABLE_TYPE
            FROM information_schema.TABLES
            WHERE TABLE_SCHEMA = ?
            ORDER BY TABLE_NAME`, schema)
        // ... scan rows ...
    } else if dbType == "sqlite" {
        rows, err := conn.QueryContext(ctx, `
            SELECT name, 'main', type
            FROM sqlite_master
            WHERE type IN ('table', 'view')
            ORDER BY name`)
        // ... scan rows ...
    }
}
```

<BranchingCheckDiagram />

And `describe_table` had the same shape. And `list_views`. And `list_foreign_keys`. Every single tool, three branches, repeated.

The session state carried a plain string to track which database was active:

```go
type DBSessionState struct {
    Conn          *sql.DB
    DBType        string  // "postgres", "mysql", or "sqlite"
    CurrentSchema string
}
```

This worked fine — until you thought about what happens when you want to add a fourth database.

## Why this hurts

Say you want to add CockroachDB support. You'd have to:

1. Open `listTables.go` and add an `else if dbType == "cockroachdb"` branch
2. Open `describeTable.go` and do the same
3. Open `analyzeTable.go`, `listViews.go`, `foreignKeys.go`, `triggers.go`, `functions.go`, `constraints.go`, `columnSearch.go`, `sequences.go`, `getEnumValues.go` — and add the branch in each one

That's 20 files to edit for one new database. Every edit is a chance to introduce a bug. Every file is now coupled to a list of databases it has to know about. The tools, which should only care about *what* they're doing, are polluted with *how* each database does it differently.

This violates the open/closed principle: you can't extend the system without modifying it.

## The interface approach

The fix is to define a `Driver` interface that owns all the database-specific queries:

```go
type Driver interface {
    GetDbInfo(ctx context.Context, conn *sql.DB) (DbInfo, error)
    ListTables(ctx context.Context, conn *sql.DB, schema string) ([]TableRow, error)
    DescribeTable(ctx context.Context, conn *sql.DB, table, schema string) (DescribeTableResult, error)
    ListViews(ctx context.Context, conn *sql.DB, schema string) ([]ViewRow, error)
    ListForeignKeys(ctx context.Context, conn *sql.DB, table, schema string) ([]ForeignKeyRow, error)
    ListTriggers(ctx context.Context, conn *sql.DB, table, schema string) ([]TriggerRow, error)
    ListFunctions(ctx context.Context, conn *sql.DB, schema string, filterBySchema bool) ([]FunctionRow, error)
    ListConstraints(ctx context.Context, conn *sql.DB, table, schema string) ([]ConstraintRow, error)
    FindColumns(ctx context.Context, conn *sql.DB, column, table, schema string, exactMatch bool) ([]ColumnMatch, error)
    ListSchemas(ctx context.Context, conn *sql.DB) ([]SchemaRow, error)
    // ... and more
}
```

Each database gets one file that implements this interface. The session state now holds a `Driver` instead of a string:

```go
type DBSessionState struct {
    Conn   *sql.DB
    Driver driver.Driver
}
```

And every tool becomes a straight delegation:

```go
func listTablesHandler(...) {
    session, _ := state.GetActiveSession("default")
    rows, err := session.Driver.ListTables(ctx, session.Conn, input.Schema)
    // map rows to output, done
}
```

No branches. No string comparisons. The tool doesn't know or care whether it's talking to Postgres or SQLite.

<DriverDelegationDiagram />

## Return types without json tags

One design decision worth calling out: the driver interface returns plain structs with no json or jsonschema tags.

```go
// driver package — raw data, no presentation concerns
type TableRow struct {
    Name   string
    Schema string
    Type   string
}
```

The tools package has its own output types with the MCP-facing annotations:

```go
// tools package — presentation layer
type TableInfo struct {
    Name   string `json:"name" jsonschema_description:"Table name"`
    Schema string `json:"sch"  jsonschema_description:"Schema name"`
    Type   string `json:"type,omitempty" jsonschema_description:"Table type"`
}
```

There's a simple field-by-field mapping between them in each tool handler. This keeps the driver layer free of presentation concerns, and means you can evolve the MCP output format without touching the driver queries.

## Capability flags

Not every database supports every feature. PostgreSQL has enums, sequences, and materialized views. MySQL doesn't. SQLite has none of the above.

The old approach handled this with `if dbType == "postgres"` in the tool registration code — same string-matching problem. The new approach adds capability flags to the interface:

```go
type Driver interface {
    // ...query methods...
    SupportsEnums() bool
    SupportsSequences() bool
    SupportsMaterializedViews() bool
    SupportsFunctions() bool
    SupportsShowCommands() bool
}
```

Each driver declares what it supports:

```go
// postgres
func (d *PostgresDriver) SupportsEnums() bool             { return true }
func (d *PostgresDriver) SupportsSequences() bool         { return true }
func (d *PostgresDriver) SupportsMaterializedViews() bool { return true }

// sqlite
func (d *SqliteDriver) SupportsEnums() bool             { return false }
func (d *SqliteDriver) SupportsSequences() bool         { return false }
func (d *SqliteDriver) SupportsMaterializedViews() bool { return false }
```

Tool registration becomes readable:

```go
func RegisterTools(s *mcp.Server, drv driver.Driver) {
    GetListTablesTool().Register(s)
    GetListSchemasTool().Register(s)

    if drv.SupportsEnums() {
        GetListEnumsTool().Register(s)
        GetEnumValuesTool().Register(s)
    }
    if drv.SupportsMaterializedViews() {
        GetListMaterializedViewsTool().Register(s)
    }
}
```

The server registers exactly the tools the connected database can actually use.

## Adding a new driver

Here is what adding CockroachDB support looks like now. Create one file:

```go
// internal/driver/cockroachdb.go
package driver

type CockroachDBDriver struct{}

func (d *CockroachDBDriver) SupportsEnums() bool             { return true }
func (d *CockroachDBDriver) SupportsSequences() bool         { return true }
func (d *CockroachDBDriver) SupportsMaterializedViews() bool { return false }
func (d *CockroachDBDriver) SupportsFunctions() bool         { return true }
func (d *CockroachDBDriver) SupportsShowCommands() bool      { return false }

func (d *CockroachDBDriver) ListTables(ctx context.Context, conn *sql.DB, schema string) ([]TableRow, error) {
    // CockroachDB is wire-compatible with PostgreSQL, so this is often identical
    // ...
}

// implement the rest of the interface...
```

Then wire it in the connection switch:

```go
case "cockroachdb":
    drv = &driver.CockroachDBDriver{}
```

That's it. Zero changes to any tool file. The 20 tool handlers work without knowing CockroachDB exists. The compiler tells you immediately if you've missed any interface method.

## Cleaning up hidden state

One more improvement came from rethinking `CurrentSchema`. The old code stored the current schema in session state and silently applied it as a fallback whenever a tool was called without an explicit schema argument:

```go
schema := input.Schema
if schema == "" {
    schema = session.CurrentSchema // hidden default
}
```

This meant the same tool call could produce different results depending on what schema was current when the connection was established. It was implicit and invisible.

The new approach removes `CurrentSchema` entirely. Instead, a `list_schemas` tool gives callers an explicit way to discover what schemas are available. When a schema is required and none is provided, the driver handles the default internally — for PostgreSQL that's `public`, for SQLite the schema parameter is irrelevant and ignored.

Schema is now a parameter you pass deliberately, not a side effect of connection setup.

## The result

The directory structure tells the story clearly:

```
internal/driver/
    driver.go       <- interface + shared return types
    postgres.go     <- PostgresDriver (one file)
    mysql.go        <- MysqlDriver (one file)
    sqlite.go       <- SqliteDriver (one file)
    helpers.go      <- shared parsing utilities
```

Each file is self-contained. Adding a driver is additive, not invasive. The tool files dropped thousands of lines of duplicated query logic and became straightforward delegations that are easy to read and easy to test.

The underlying idea isn't new — it's just the standard Go interface pattern applied consistently. But it's a good reminder that the payoff from designing around interfaces shows up most clearly when you need to extend something you didn't plan to extend.
