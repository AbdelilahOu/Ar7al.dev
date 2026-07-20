---
title: The Concurrent Map with Sharded Locks
description: Build a type-safe sharded map in Go using fnv hashing and sync.RWMutex for fast, race-free concurrent access.
seoDescription: Learn how to build a sharded concurrent map in Go with FNV hashing and sync.RWMutex for fast, race-free reads and writes.
seoKeywords:
  - concurrent map Go
  - sharded locks
  - sync.RWMutex
  - FNV hash
  - Go concurrency patterns
date: "2026-02-01"
tags:
  - Go/Golang
  - Kata 02
  - Go Concurrency
published: true
---

<script>
	import HashRoutingDiagram from '$lib/components/diagrams/HashRoutingDiagram.svelte';
	import MapOperationsDiagram from '$lib/components/diagrams/MapOperationsDiagram.svelte';
</script>

In this post, I'll walk through how to build a concurrent map with sharded locks. It's based on the [KATA-02 exercise](https://github.com/MedUnes/go-kata).

## What is a map?

To understand how a map works, let's start with the basic idea. A map maps one value to another. Given one value, called a `key`, it returns a second value.

```go
map(key) -> value // a key maps to a value
```

Now, a map isn't very useful unless we can put data into it. We'll need a function that adds data to the map.

```go
insert(map, key, value) // add data
```

and a function that removes data from the map.

```go
delete(map, key) // remove data
```

<MapOperationsDiagram />

There are other interesting properties of map implementations like checking whether a key exists or listing all keys, but they're outside the scope of what we're covering today. We'll just focus on insertion, deletion, and mapping keys to values.

## What is a `sharded` lock?

First, a lock is a synchronization mechanism from the `sync` package, specifically the `Mutex` type. It controls access to a shared resource so only one goroutine can touch it at a time, which prevents race conditions.

In Go, the `sync` package gives us `Lock` (write lock) and `RLock` (read lock). `RLock` is designed for read-heavy scenarios where many goroutines can read concurrently, while writes stay exclusive.

### Sharding, hash functions

What is a hash function? It's a function that takes a `key` of unknown length and returns a fixed-length value.

```go
hash(key) -> integer // fixed-size integer output
```

That hash value is usually an integer.

Now the idea of sharding is simple: instead of one big map with one big lock, we split the map into multiple small maps (shards). Each shard has its own lock. When we want to read or write a key, we hash the key and use that hash to pick a shard.

```go
shardIndex := hash(key) % numShards // pick a shard
```

<HashRoutingDiagram />

That means two different keys will most likely land in different shards, so they won't block each other. That's the whole win.

## The solution

Let's implement a sharded map. We'll keep it clean and type-safe with generics.

### The data structures

We need two things: the sharded map itself and a bucket (one shard).

```go
type ShardedMap[K comparable, V any] struct {
	shards    []*Bucket[K, V] // slice of shards
	numShards uint64          // cached shard count
}

type Bucket[K comparable, V any] struct {
	sync.RWMutex      // per-shard lock
	items       map[K]V // data for this shard
}
```

Each bucket embeds an `RWMutex`, so reads can happen in parallel while writes still get exclusive access.

### Constructor

We allocate the shards and initialize each inner map, defaulting to 1 shard if `0` is passed.

```go
func NewShardedMap[K comparable, V any](numShards uint64) *ShardedMap[K, V] {
	if numShards == 0 {
		numShards = 1 // safe default
	}

	sm := &ShardedMap[K, V]{
		shards:    make([]*Bucket[K, V], numShards),
		numShards: numShards,
	}

	for i := range sm.shards {
		sm.shards[i] = &Bucket[K, V]{items: make(map[K]V)} // init map per shard
	}

	return sm
}
```

### Shard selection

We hash the key with `fnv64a`, then take modulo to pick the shard. The hot path avoids allocations for common key types.

```go
func (sm *ShardedMap[K, V]) getShardIndex(key K) uint64 {
	h := fnv.New64a() // fast, non-cryptographic hash

	switch k := any(key).(type) {
	case string:
		h.Write([]byte(k)) // no extra alloc beyond []byte
	case int:
		var buf [8]byte
		binary.LittleEndian.PutUint64(buf[:], uint64(k))
		h.Write(buf[:]) // reuse stack buffer
	case uint64:
		var buf [8]byte
		binary.LittleEndian.PutUint64(buf[:], k)
		h.Write(buf[:]) // reuse stack buffer
	default:
		s := fmt.Sprint(key) // fallback for uncommon key types
		h.Write([]byte(s))
	}
	hash := h.Sum64()
	return hash % sm.numShards // map hash to shard index
}
```

`fnv64a` is fast and deterministic, and modulo gives us an even spread across shards (as long as the hash is decent).

### Get, Set, Delete

Reads use `RLock` and writes use `Lock`, but only on the selected shard.

```go
func (sm *ShardedMap[K, V]) Get(key K) (V, bool) {
	idx := sm.getShardIndex(key)
	shard := sm.shards[idx]
	shard.RLock() // shared read lock
	val, ok := shard.items[key]
	shard.RUnlock()
	return val, ok
}

func (sm *ShardedMap[K, V]) Set(key K, value V) {
	idx := sm.getShardIndex(key)
	shard := sm.shards[idx]
	shard.Lock() // exclusive write lock
	shard.items[key] = value
	shard.Unlock()
}

func (sm *ShardedMap[K, V]) Delete(key K) {
	idx := sm.getShardIndex(key)
	shard := sm.shards[idx]
	shard.Lock() // exclusive write lock
	delete(shard.items, key)
	shard.Unlock()
}
```

This is the key point: no global lock. Each shard can be used independently, which massively reduces contention.

### Keys

Collecting all keys requires locking each shard one by one.

```go
func (sm *ShardedMap[K, V]) Keys() []K {
	keys := make([]K, 0, 100) // pre-alloc a little
	for i := uint64(0); i < sm.numShards; i++ {
		shard := sm.shards[i]
		shard.RLock() // read lock per shard
		for k := range shard.items {
			keys = append(keys, k)
		}
		shard.RUnlock()
	}
	return keys
}
```

This stays safe even under concurrent writes because each shard is protected by its own lock.

### Takeaways

With this setup, reads scale well, writes don't block each other unless they hit the same shard, and you get a clean, type-safe API without `sync.Map`.

- Sharding keeps lock contention low by spreading keys across buckets.
- `RWMutex` gives you cheap reads while still keeping writes safe.
- `fnv64a` is fast and predictable for consistent shard selection.
