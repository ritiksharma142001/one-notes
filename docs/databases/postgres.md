---
title: PostgreSQL
sidebar_position: 2
description: What's different in PostgreSQL — psql commands, identity columns, JSONB, arrays, RETURNING, upserts, useful index types, EXPLAIN ANALYZE and MVCC.
---

PostgreSQL is a standards-focused, extensible open-source database. Everything on the [SQL page](./sql.md) applies; this page covers what's **different or extra**.

## psql cheat sheet

```bash
psql -h localhost -U app -d shop
docker run --name pg -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:17
```

| Command | Does |
|---|---|
| `\l` | list databases |
| `\c shop` | connect to a database |
| `\dt` / `\dt+` | list tables (with size) |
| `\d orders` | describe a table |
| `\di` | list indexes |
| `\du` | list roles |
| `\x` | toggle expanded output |
| `\timing` | show query time |
| `\i file.sql` | run a file |
| `\q` | quit |

## MySQL → Postgres differences

| MySQL | PostgreSQL |
|---|---|
| `AUTO_INCREMENT` | `GENERATED ALWAYS AS IDENTITY` (or `SERIAL`) |
| `` `backticks` `` | `"double quotes"` for identifiers; `'single'` for strings |
| `ENUM(...)` inline | `CREATE TYPE status AS ENUM (...)` or a `CHECK` / lookup table |
| `LIMIT 10, 20` | `LIMIT 20 OFFSET 10` |
| `ON DUPLICATE KEY UPDATE` | `ON CONFLICT (...) DO UPDATE` |
| `IFNULL` | `COALESCE` |
| `DATETIME` | `TIMESTAMPTZ` (stores UTC, converts to session time zone) |
| `GROUP_CONCAT` | `STRING_AGG(name, ', ')` |
| `LIKE` is case-insensitive by default collation | `LIKE` is case-sensitive; use `ILIKE` |
| Repeatable Read default | Read Committed default |

## Table with Postgres features

```sql
CREATE TABLE product (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       TEXT NOT NULL,
  price      NUMERIC(10,2) NOT NULL CHECK (price > 0),
  tags       TEXT[] NOT NULL DEFAULT '{}',
  attrs      JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

`TEXT` and `VARCHAR` perform the same in Postgres — use `TEXT` unless you need a length limit.

## RETURNING

```sql
INSERT INTO product (name, price) VALUES ('Desk', 4999) RETURNING id, created_at;
UPDATE product SET price = price * 0.9 WHERE 'sale' = ANY(tags) RETURNING id, price;
DELETE FROM session WHERE expires_at < now() RETURNING user_id;
```

## Upsert

```sql
INSERT INTO stock (sku, qty) VALUES ('A1', 5)
ON CONFLICT (sku) DO UPDATE SET qty = stock.qty + EXCLUDED.qty;

INSERT INTO visit (user_id, day) VALUES (7, current_date) ON CONFLICT DO NOTHING;
```

## JSONB

```sql
SELECT attrs->>'color' AS color FROM product WHERE attrs @> '{"brand": "Acme"}';
UPDATE product SET attrs = jsonb_set(attrs, '{stock}', '12');
CREATE INDEX idx_product_attrs ON product USING GIN (attrs);
```

`->` returns JSON, `->>` returns text, `@>` means "contains". Great for flexible attributes — but keep core fields as real columns.

## Arrays

```sql
SELECT * FROM product WHERE 'sale' = ANY(tags);
SELECT * FROM product WHERE tags && ARRAY['new', 'sale'];   -- overlaps
SELECT unnest(tags) AS tag, count(*) FROM product GROUP BY tag;
```

## Index types

| Type | Good for |
|---|---|
| B-tree (default) | `=`, `<`, `>`, `BETWEEN`, `ORDER BY` |
| GIN | JSONB, arrays, full-text search |
| GiST | geometry, ranges, nearest-neighbour |
| BRIN | huge append-only tables ordered by time |
| Hash | equality only |

```sql
CREATE INDEX CONCURRENTLY idx_order_open ON orders (created_at) WHERE status = 'NEW';  -- partial index
CREATE INDEX idx_customer_email_lower ON customer (lower(email));                    -- expression index
```

## Full-text search

```sql
ALTER TABLE article ADD COLUMN search tsvector
  GENERATED ALWAYS AS (to_tsvector('english', title || ' ' || body)) STORED;
CREATE INDEX idx_article_search ON article USING GIN (search);

SELECT title FROM article
WHERE search @@ websearch_to_tsquery('english', 'spring boot -kotlin')
ORDER BY ts_rank(search, websearch_to_tsquery('english', 'spring boot -kotlin')) DESC;
```

## Reading a query plan

```sql
EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM orders WHERE customer_id = 7;
```

- `Seq Scan` on a big table with a selective filter → probably missing an index.
- `Index Scan` / `Index Only Scan` → good.
- Compare **estimated rows vs actual rows** — big gaps mean stale statistics (`ANALYZE orders;`).

## MVCC & VACUUM

Postgres never overwrites a row in place: an `UPDATE` writes a new **version** and marks the old one dead. Readers see a consistent snapshot without locking writers. **Autovacuum** cleans dead versions — long-running transactions block it and cause table bloat.

## Handy queries

```sql
SELECT pg_size_pretty(pg_total_relation_size('orders'));          -- table size
SELECT pid, now() - query_start AS running, query FROM pg_stat_activity WHERE state = 'active';
SELECT pg_cancel_backend(12345);                                   -- stop a query
```

## Connection strings

```
postgresql://app:secret@localhost:5432/shop?sslmode=require
jdbc:postgresql://localhost:5432/shop
```

Serverless hosts (Neon, Supabase) give you a **pooled** URL (PgBouncer) for the app and a direct URL for migrations.
