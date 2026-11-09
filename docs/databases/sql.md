---
title: SQL (MySQL)
sidebar_position: 1
description: The SQL you need for development and interviews — DDL, CRUD, joins, GROUP BY, subqueries, window functions, indexes, transactions, ACID, isolation levels and normalisation.
---

Examples use MySQL 8; almost everything works the same in PostgreSQL (differences are on the [Postgres page](./postgres.md)).

## Sample schema

```sql
CREATE TABLE customer (
  id         BIGINT PRIMARY KEY AUTO_INCREMENT,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) NOT NULL UNIQUE,
  city       VARCHAR(60),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id          BIGINT PRIMARY KEY AUTO_INCREMENT,
  customer_id BIGINT NOT NULL,
  total       DECIMAL(10,2) NOT NULL CHECK (total >= 0),
  status      ENUM('NEW','PAID','SHIPPED','CANCELLED') NOT NULL DEFAULT 'NEW',
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
  INDEX idx_orders_customer (customer_id, created_at)
);
```

Use `DECIMAL` for money (never `FLOAT`), and store times in UTC.

## Command families

| Family | Statements |
|---|---|
| DDL (structure) | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME` |
| DML (data) | `INSERT`, `UPDATE`, `DELETE`, `SELECT` |
| DCL (access) | `GRANT`, `REVOKE` |
| TCL (transactions) | `COMMIT`, `ROLLBACK`, `SAVEPOINT` |

## CRUD

```sql
INSERT INTO customer (name, email, city) VALUES
  ('Asha', 'asha@x.com', 'Pune'),
  ('Ravi', 'ravi@x.com', 'Bengaluru');

SELECT id, name FROM customer WHERE city IN ('Pune', 'Bengaluru') AND name LIKE 'A%'
ORDER BY created_at DESC LIMIT 10 OFFSET 20;

UPDATE orders SET status = 'PAID' WHERE id = 7;
DELETE FROM orders WHERE status = 'CANCELLED' AND created_at < NOW() - INTERVAL 1 YEAR;

-- upsert
INSERT INTO stock (sku, qty) VALUES ('A1', 5)
ON DUPLICATE KEY UPDATE qty = qty + VALUES(qty);
```

:::warning
`UPDATE`/`DELETE` without `WHERE` changes **every row**. Run the `SELECT` with the same `WHERE` first.
:::

**`DELETE` vs `TRUNCATE` vs `DROP`:** delete rows (logged, can filter, can roll back) vs empty the table fast (resets auto-increment) vs remove the table itself.

## Logical query order

```
FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT
```

That's why you can't use a `SELECT` alias in `WHERE`, but you can in `ORDER BY`.

## Joins

```mermaid
flowchart LR
  I["INNER JOIN<br/>only matches"] --- L["LEFT JOIN<br/>all left + matches"] --- R["RIGHT JOIN<br/>all right + matches"] --- F["FULL JOIN<br/>everything<br/>(UNION in MySQL)"]
```

```sql
-- customers with their orders (customers without orders are dropped)
SELECT c.name, o.id, o.total
FROM customer c
JOIN orders o ON o.customer_id = c.id;

-- customers who have never ordered
SELECT c.*
FROM customer c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.id IS NULL;

-- self join: employees with their manager
SELECT e.name AS employee, m.name AS manager
FROM employee e LEFT JOIN employee m ON m.id = e.manager_id;
```

## Aggregates & GROUP BY

```sql
SELECT c.city, COUNT(*) AS orders, SUM(o.total) AS revenue, AVG(o.total) AS avg_order
FROM orders o JOIN customer c ON c.id = o.customer_id
WHERE o.status <> 'CANCELLED'
GROUP BY c.city
HAVING SUM(o.total) > 10000          -- HAVING filters groups, WHERE filters rows
ORDER BY revenue DESC;
```

`COUNT(*)` counts rows; `COUNT(col)` skips NULLs; `COUNT(DISTINCT col)` counts unique values.

## Subqueries & CTEs

```sql
-- orders above the average
SELECT * FROM orders WHERE total > (SELECT AVG(total) FROM orders);

-- customers with at least one paid order
SELECT * FROM customer c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id AND o.status = 'PAID');

-- CTE: readable, reusable steps
WITH monthly AS (
  SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, SUM(total) AS revenue
  FROM orders GROUP BY month
)
SELECT * FROM monthly WHERE revenue > 50000;
```

## Window functions

Compute across related rows **without collapsing** them.

```sql
SELECT customer_id, id, total,
       ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_at DESC) AS rn,
       SUM(total)   OVER (PARTITION BY customer_id) AS customer_total,
       SUM(total)   OVER (ORDER BY created_at) AS running_total,
       LAG(total)   OVER (PARTITION BY customer_id ORDER BY created_at) AS prev_total
FROM orders;
```

| Function | 100, 90, 90, 80 |
|---|---|
| `ROW_NUMBER()` | 1, 2, 3, 4 |
| `RANK()` | 1, 2, 2, 4 |
| `DENSE_RANK()` | 1, 2, 2, 3 |

## Classic interview queries

```sql
-- 2nd highest salary
SELECT MAX(salary) FROM employee WHERE salary < (SELECT MAX(salary) FROM employee);

-- Nth highest salary (N = 3)
SELECT DISTINCT salary FROM employee ORDER BY salary DESC LIMIT 1 OFFSET 2;

-- highest paid employee per department
SELECT * FROM (
  SELECT e.*, DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS r FROM employee e
) t WHERE r = 1;

-- duplicate emails
SELECT email, COUNT(*) FROM customer GROUP BY email HAVING COUNT(*) > 1;

-- delete duplicates, keep the lowest id
DELETE c1 FROM customer c1 JOIN customer c2 ON c1.email = c2.email AND c1.id > c2.id;
```

## Indexes

An index (usually a **B+ tree**) lets the DB find rows without scanning the whole table.

```sql
CREATE INDEX idx_customer_city ON customer(city);
CREATE INDEX idx_orders_cust_date ON orders(customer_id, created_at);   -- composite
EXPLAIN SELECT * FROM orders WHERE customer_id = 7 ORDER BY created_at DESC;
```

- A composite index `(a, b, c)` helps queries on `a`, `a,b`, `a,b,c` — the **leftmost prefix** rule.
- Index columns used in `WHERE`, `JOIN` and `ORDER BY`; primary and unique keys are indexed automatically.
- Indexes speed up reads but slow down writes and use disk — don't index everything.
- These **can't** use an index well: `WHERE YEAR(created_at) = 2026` (function on column), `LIKE '%abc'` (leading wildcard). Rewrite as a range: `created_at >= '2026-01-01' AND created_at < '2027-01-01'`.
- **Clustered index** (InnoDB primary key) stores the rows themselves in key order; secondary indexes point to the primary key.

## Transactions & ACID

```sql
START TRANSACTION;
UPDATE account SET balance = balance - 500 WHERE id = 1;
UPDATE account SET balance = balance + 500 WHERE id = 2;
COMMIT;      -- or ROLLBACK;
```

| | Meaning |
|---|---|
| **Atomicity** | all statements succeed or none do |
| **Consistency** | constraints always hold before and after |
| **Isolation** | concurrent transactions don't see each other's half-done work |
| **Durability** | once committed, it survives a crash (write-ahead/redo log) |

### Isolation levels

| Level | Dirty read | Non-repeatable read | Phantom read |
|---|---|---|---|
| Read uncommitted | ✔ possible | ✔ | ✔ |
| Read committed (Postgres default) | ✖ | ✔ | ✔ |
| Repeatable read (**MySQL default**) | ✖ | ✖ | mostly ✖ in InnoDB |
| Serializable | ✖ | ✖ | ✖ |

Lock a row while you work on it: `SELECT … FOR UPDATE`.

## Normalisation

| Form | Rule | Fix |
|---|---|---|
| 1NF | atomic values, no repeating groups | one phone per row / separate table |
| 2NF | 1NF + no partial dependency on part of a composite key | split the table |
| 3NF | 2NF + no transitive dependency (non-key → non-key) | move `city → state` to its own table |
| BCNF | every determinant is a candidate key | stricter 3NF |

Normalise to avoid update anomalies; **denormalise deliberately** for read-heavy reporting.

## Keys & constraints

- **Primary key** — unique + not null, one per table.
- **Candidate key** — any column set that could be the PK; **alternate** = candidates not chosen.
- **Foreign key** — references another table's key; `ON DELETE CASCADE | SET NULL | RESTRICT`.
- **Composite key** — PK made of several columns (e.g. `(student_id, course_id)`).
- Constraints: `NOT NULL`, `UNIQUE`, `CHECK`, `DEFAULT`.

## Views, procedures, triggers

```sql
CREATE VIEW paid_orders AS SELECT * FROM orders WHERE status = 'PAID';

DELIMITER //
CREATE PROCEDURE customer_revenue(IN cid BIGINT, OUT rev DECIMAL(12,2))
BEGIN
  SELECT COALESCE(SUM(total), 0) INTO rev FROM orders WHERE customer_id = cid;
END //
DELIMITER ;
CALL customer_revenue(7, @rev); SELECT @rev;
```

## Useful functions

`COALESCE(a, b)` · `IFNULL` · `CASE WHEN … THEN … ELSE … END` · `CONCAT` · `SUBSTRING` · `TRIM` · `UPPER` · `ROUND(x, 2)` · `NOW()` · `DATE_ADD(d, INTERVAL 7 DAY)` · `DATEDIFF` · `DATE_FORMAT(d, '%d-%m-%Y')` · `GROUP_CONCAT(name ORDER BY name SEPARATOR ', ')`
