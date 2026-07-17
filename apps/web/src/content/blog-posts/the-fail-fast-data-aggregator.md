---
title: Errgroup - The fail-fast data aggregator
description: Learn Golang's concurrency control (errgroup), Context Propagation & Functional Options.
seoDescription: A practical guide to Go errgroup for fail-fast aggregation, with context cancellation and functional options patterns.
seoKeywords:
  - Go errgroup
  - fail fast
  - context cancellation
  - functional options
  - Go concurrency
date: "2026-01-23"
tags:
  - Go/Golang
  - Kata 01
  - Go Concurrency
published: true
---

<script>
	import FailFastTimelineDiagram from '$lib/components/diagrams/FailFastTimelineDiagram.svelte';
</script>

As I dive deeper into Go and its concurrency model, I’ve been building various CLI tools and backend services, etc.

I'm relying on this [Github repo](https://github.com/MedUnes/go-kata) that explores those concepts using problem solving, for example the first Kata is about building a fail-fast data aggregator using solely [errgroup](https://pkg.go.dev/golang.org/x/sync/errgroup).

Package errgroup provides synchronization, error propagation and context cancellation for groups of goroutines working on subtasks.

## The scenario

Imagine we want to build a dashboard, for this dashboard we must fetch data from two independent services, and we must fetch them in parallel, however, if either fails or global timeout is reached, the entire operation must abort immediately.

## The Challenge

Create a `DashboardAggregator` struct and a method `Aggregate(id int)` that orchestrates this fetching.

Requirements:

- The Aggregator must be configurable (timeout, logger).
- Both services must be queried concurrently.
- Fail if timeout is surpassed
- Result should combine both outputs: `output 1 | output 2`

## The solution

Before I got into this challenge, I thought that using goroutines with `sync.WaitGroup` is enough and that it's the only solution, to be fair it was the only way I knew, but `sync.WaitGroup` doesn't fail-fast, let's say we run 100 goroutines using `sync.WaitGroup` our program will have to wait for all those 100 goroutines to finish which isn't what we want, if one fails we stop.

### Functional Options

before we get into the concurrency stuff, let's talk about how we configure our aggregator. you could do the classic constructor with all the params:

```go
func NewAggregator(timeout time.Duration, logger *slog.Logger) *DashboardAggregator
```

but what happens when you need to add more config? retry count, custom HTTP client, rate limiting? your constructor becomes a mess and callers don't know which params are required vs optional.

the [functional options pattern](https://dave.cheney.net/2014/10/17/functional-options-for-friendly-apis) solves this, instead of passing values directly, you pass functions that modify the struct. each option is self-contained and optional:

```go
type Option func(*DashboardAggregator)

func WithTimeout(t time.Duration) Option {
	return func(a *DashboardAggregator) { a.timeout = t }
}

func WithLogger(l *slog.Logger) Option {
	return func(a *DashboardAggregator) { a.logger = l }
}
```

now your constructor takes variadic options and applies them one by one:

```go
func NewAggregator(opts ...Option) *DashboardAggregator {
	a := &DashboardAggregator{} // sensible defaults
	for _, opt := range opts {
		opt(a)
	}
	return a
}
```

usage becomes clean and readable: `NewAggregator(WithTimeout(5*time.Second), WithLogger(myLogger))`. no more guessing what nil means or which param goes where.

### Errgroup and Context Propagation

now for the main part, this is where errgroup and context work together. the idea of context propagation is simple: you pass a context from the top level down to every function that does work, and when that context gets cancelled, everything stops.

`errgroup.WithContext` gives us a group and a derived context. when any goroutine in the group returns an error, the context gets cancelled automatically and all other goroutines can check `ctx.Done()` to bail out.

```go
func (a *DashboardAggregator) Aggregate(ctx context.Context, id int) (string, error) {
	ctx, cancel := context.WithTimeout(ctx, a.timeout)
	defer cancel()

	g, ctx := errgroup.WithContext(ctx)
	var profile, orders string
	var err error

	g.Go(func() error { profile, err = fetchProfile(ctx, id); return err })
	g.Go(func() error { orders, err = fetchOrder(ctx, id); return err })

	if err := g.Wait(); err != nil {
		a.logger.Error(err.Error())
		return "", err
	}

	a.logger.Info("fetched success")
	return fmt.Sprintf("%s | %s", profile, orders), nil
}
```

let's break this down:

- `context.WithTimeout` wraps our context with a deadline, if we exceed it everything cancels
- `errgroup.WithContext` creates a group that shares a context, if any goroutine fails the context cancels
- `g.Go` spawns a goroutine and tracks it
- `g.Wait` blocks until all goroutines finish and returns the first error if any

### Context Propagation in Action

these are mock functions that simulate API calls, but they show the important part: how to make your goroutines respect context cancellation. in real life you'd have HTTP requests or database queries here.

```go
func fetchProfile(ctx context.Context, id int) (string, error) {
	select {
	case <-time.After(2 * time.Second):
		return "Name: Alice", nil
	case <-ctx.Done():
		return "", ctx.Err()
	}
}

func fetchOrder(ctx context.Context, id int) (string, error) {
	select {
	case <-time.After(500 * time.Millisecond):
		return "Order: 5", nil
	case <-ctx.Done():
		return "", ctx.Err()
	}
}
```

the key here is the select statement, it's listening on both channels at the same time. either the work finishes and we return data, or the context gets cancelled and we return early. this is context propagation in action: the parent says "stop" and the children listen. without this your goroutines would keep running in the background doing useless work even after the caller gave up.

### Putting it all together

```go
func main() {
	a := NewAggregator(WithLogger(), WithTimeout(1*time.Second))
	result, err := a.Aggregate(context.Background(), 1)
	if err != nil {
		fmt.Printf("error: %s", err.Error())
	}
	fmt.Print(result)
}
```

so with a 1 second timeout and fetchProfile taking 2 seconds, this will fail with `context deadline exceeded` which is exactly what we want, we set the timeout to 1 second but one of our services takes 2 seconds so we bail out early, fail fast, don't waste resources waiting for something that won't matter anyway

<FailFastTimelineDiagram />

## Takeaway

honestly this kata taught me a lot about how Go handles concurrency properly, before this I was just throwing goroutines everywhere with WaitGroup and hoping for the best, now I know better.

- use `errgroup` instead of `sync.WaitGroup` when you need error propagation and cancellation
- functional options keep your constructors clean, especially when you have a lot of optional config
- always pass context and respect `ctx.Done()` in your goroutines
