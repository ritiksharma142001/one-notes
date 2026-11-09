---
mdx:
  format: md
---

# SQL and Database Essentials Syllabus Guide (MySQL and Oracle): From "What is Data?" to Triggers and Normalization

> **Note**: Sections marked **(Interview Imp)** are frequently asked in interviews.
>
> **What this is:** a study guide built around the full "Database Essentials" topic list you pasted: understanding data → database basics → creating tables and inserting data → `SELECT` → data types → constraints → aliases → operators → `LIKE`/`IN`/`BETWEEN`/`NULL` → `DISTINCT`/`LIMIT` → functions (MySQL **and** Oracle) → `GROUP BY` → subqueries → joins → CTEs → DDL/DML/TCL/DCL → views, synonyms, sequences, procedures, indexes, triggers → ER diagrams → normalization. Section 21 maps every module of your list to a section here.
>
> **How to trust the code:** every **MySQL** example was run on a real **MySQL 8.4** server using the sample database in section 3, and the outputs shown are real. **Oracle** syntax is written from the Oracle documentation and marked **(Oracle, not run here)**, because no Oracle server was available.
>
> **Related files:** [MySQL_Complete_Guide.md](MySQL_Complete_Guide.md) (deeper MySQL: window functions, indexing, tuning) · [Oracle_SQL_Complete_Guide.md](../oracle/Oracle_SQL_Complete_Guide.md) (the same sample tables in Oracle syntax) · [Java_FullStack_Syllabus_Guide.md](../java/Java_FullStack_Syllabus_Guide.md) (JDBC and Hibernate use this SQL)

| Level | Sections |
|---|---|
| **Beginner** | 1-8 (data, databases, setup, `CREATE`, `INSERT`, `SELECT`, data types) |
| **Intermediate** | 9-14 (constraints, aliases, operators, pattern matching, `DISTINCT`, `LIMIT`, functions) |
| **Advanced** | 15-18 (grouping, subqueries, joins, CTEs) |
| **Professional** | 19-20 (command categories, database objects, design and normalization) |

---

## Table of Contents
1. [Understanding Data](#1-understanding-data)
2. [Databases, DBMS, RDBMS and SQL](#2-databases-dbms-rdbms-and-sql)
3. [Setup, Clients and the Sample Database](#3-setup-clients-and-the-sample-database)
4. [Creating Databases and Tables, Inserting Data](#4-creating-databases-and-tables-inserting-data)
5. [Retrieving Data: Projection and Selection](#5-retrieving-data-projection-and-selection)
6. [SQL Data Types in MySQL and Oracle](#6-sql-data-types-in-mysql-and-oracle)
7. [Case Sensitivity](#7-case-sensitivity)
8. [Aliases](#8-aliases)
9. [Constraints and Data Integrity](#9-constraints-and-data-integrity)
10. [Operators](#10-operators)
11. [`IN`, `BETWEEN`, `IS NULL`, `LIKE` and `DISTINCT`](#11-in-between-is-null-like-and-distinct)
12. [`LIMIT`, `OFFSET` and Pagination](#12-limit-offset-and-pagination)
13. [SQL Functions](#13-sql-functions)
14. [Oracle Functions and the `DUAL` Table](#14-oracle-functions-and-the-dual-table)
15. [`GROUP BY`, `HAVING` and the Full `SELECT`](#15-group-by-having-and-the-full-select)
16. [Subqueries](#16-subqueries)
17. [Joins](#17-joins)
18. [Common Table Expressions (CTEs)](#18-common-table-expressions-ctes)
19. [SQL Command Categories: DDL, DML, TCL, DCL](#19-sql-command-categories-ddl-dml-tcl-dcl)
20. [Database Objects, ER Diagrams and Normalization](#20-database-objects-er-diagrams-and-normalization)
21. [Syllabus Coverage Map](#21-syllabus-coverage-map)
22. [Interview Questions](#22-interview-questions)
23. [Cheat Sheet](#23-cheat-sheet)

---

# 1. Understanding Data

**Data** is raw facts and figures: numbers, text, images, sounds, clicks, sensor readings. By itself it has little meaning; when organized and interpreted it becomes **information**, and information drives decisions. That is why data is called **"the new fuel"**: companies run on customer data, sales data, logs and sensor data the way engines run on fuel.

| Kind of data | Meaning | Examples |
|---|---|---|
| **Structured** | Fits a fixed **schema** of rows and columns with defined types | A bank table (`account_no`, `holder`, `balance`), an employee table |
| **Semi-structured** | Has some organization (tags/keys) but **no rigid table schema** | JSON, XML, YAML, log lines, e-mail headers |
| **Unstructured** | No predefined model | Images, videos, audio, PDFs, free text, social media posts |

**Pick a structured example:** `employee(emp_id INT, name VARCHAR, salary DECIMAL)` is structured because every row has the same typed columns. A JSON document `{"name":"Asha","skills":["Java","SQL"]}` is semi-structured because the shape can vary from document to document.

---

# 2. Databases, DBMS, RDBMS and SQL

## 2.1 Definitions

| Term | Meaning |
|---|---|
| **Database (DB)** | An **organized collection of data**, stored so it can be easily accessed, managed and updated |
| **DBMS** | **D**ata**b**ase **M**anagement **S**ystem: software that creates, stores, secures and queries databases (MySQL, Oracle, PostgreSQL, MongoDB) |
| **RDBMS** | **R**elational DBMS: stores data in **tables** (relations) of rows and columns linked by keys (MySQL, Oracle, SQL Server, PostgreSQL) |
| **SQL** | **S**tructured **Q**uery **L**anguage: the standard language to define, change, query and control relational data |
| **Schema** | The **blueprint** of the database: tables, columns, types, constraints, relationships |

## 2.2 Relational vs non-relational (Interview Imp)

| | **Relational (SQL)** | **Non-relational (NoSQL)** |
|---|---|---|
| Structure | Tables with a **predefined schema** | Flexible: documents, key-value, wide-column, graph |
| Fits | **Structured** data | **Semi-/unstructured** data |
| Examples | MySQL, Oracle, PostgreSQL | MongoDB, Redis, Cassandra, Neo4j |
| Query language | SQL | Database-specific APIs |
| Consistency | Strong **ACID** transactions | Often eventual consistency (varies) |
| Relationships | Foreign keys and joins | Embedded documents / application logic |
| Scaling | Mostly vertical (bigger machine); replication | Designed to scale horizontally |

**Characteristics of a relational database:** data in tables; each row is a record, each column an attribute of one type; a **primary key** identifies each row; **foreign keys** relate tables; integrity constraints; SQL; ACID transactions; normalization to avoid duplication.

## 2.3 What SQL is used for

SQL is **declarative**: you say *what* you want, and the database engine decides *how*. Properties: English-like, case-insensitive keywords, works on **sets of rows** (not one row at a time), standardized (ANSI) with vendor dialects (MySQL, Oracle PL/SQL, T-SQL).

| Task | Category | Statements |
|---|---|---|
| Define structure | **DDL** | `CREATE`, `ALTER`, `DROP`, `TRUNCATE` |
| Change data | **DML** | `INSERT`, `UPDATE`, `DELETE` |
| Read data | **DQL** | `SELECT` |
| Control transactions | **TCL** | `COMMIT`, `ROLLBACK`, `SAVEPOINT` |
| Control access | **DCL** | `GRANT`, `REVOKE` (and user creation) |

## 2.4 Database schema design (fundamentals)

1. Find the **entities** (things you store: Employee, Department, Product).
2. Choose their **attributes** (columns) and **types**.
3. Choose a **primary key** for each entity.
4. Connect entities with **relationships** (one-to-one, one-to-many, many-to-many) using **foreign keys**.
5. **Normalize** to remove duplication (section 20.5).
6. Add **constraints** for rules (`NOT NULL`, `UNIQUE`, `CHECK`, `DEFAULT`).

---

# 3. Setup, Clients and the Sample Database

## 3.1 Installing

| | MySQL | Oracle |
|---|---|---|
| Download | MySQL Community Server 8.x (`apt install mysql-server`, Windows MSI, `brew install mysql`) or Docker `docker run -e MYSQL_ROOT_PASSWORD=pw -p 3306:3306 mysql:8` | **Oracle Database XE** (free) or Docker image; or the cloud "Always Free" tier |
| Default port | `3306` | `1521` |
| Admin user | `root` | `SYS` / `SYSTEM` |
| First connection | `mysql -u root -p` | `sqlplus system@localhost/XEPDB1` |
| Check | `SELECT VERSION();` | `SELECT * FROM v$version;` |

## 3.2 Database clients

A **client** is the program you type SQL into; it sends statements to the server and shows results.

| Client | For |
|---|---|
| `mysql` command line, **MySQL Workbench** | MySQL |
| **SQL*Plus**, **SQL Developer** | Oracle |
| **DBeaver**, DataGrip, VS Code extensions | Both (many databases) |

Usage: create a **connection** (host, port, user, password), open an SQL editor, run a statement (Ctrl+Enter), read the result grid, and run scripts. A MySQL statement ends with `;`.

## 3.3 The sample database used in this guide (MySQL)

Run this once; every MySQL example below uses it. (`ENGINE` defaults to InnoDB.)

```sql
DROP DATABASE IF EXISTS kod; CREATE DATABASE kod; USE kod;

CREATE TABLE department (
  dept_id   INT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL UNIQUE,
  location  VARCHAR(30) DEFAULT 'Bangalore');

CREATE TABLE employee (
  emp_id     INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name  VARCHAR(30),
  age        INT CHECK (age >= 18),
  salary     DECIMAL(10,2) DEFAULT 30000.00,
  dept_id    INT,
  hire_date  DATE,
  email      VARCHAR(50) UNIQUE,
  CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES department(dept_id));

INSERT INTO department VALUES (10,'IT','Bangalore'),(20,'HR','Mumbai'),(30,'Sales','Delhi'),(40,'Finance','Pune'),(50,'Legal',DEFAULT);

INSERT INTO employee (first_name,last_name,age,salary,dept_id,hire_date,email) VALUES
('Jane','Doe',28,65000,10,'2021-03-15','jane@x.com'),
('John','Smith',45,90000,10,'2018-07-01','john@x.com'),
('Jane','Roe',24,38000,30,'2023-01-10','jane.r@x.com'),
('Asha','Rao',32,52000,20,'2020-11-23','asha@x.com'),
('Ravi','Kumar',29,47000,30,'2022-05-05',NULL),
('Meera','Nair',51,120000,40,'2012-02-14','meera@x.com'),
('Ankit','Sharma',22,31000,NULL,'2024-06-01','ankit@x.com'),
('Priya','Das',38,76000,10,'2019-09-09','priya@x.com');

CREATE TABLE student (id INT PRIMARY KEY, first_name VARCHAR(20), last_name VARCHAR(20), age INT, grade CHAR(2));
INSERT INTO student VALUES (1,'Jon','Davidson',20,'A'),(2,'Ann','Anderson',19,'B'),(3,'Jake','Dean',21,'AB'),(4,'Susan','Brown',22,'C'),
                           (5,'Alan','Cole',18,'A'),(6,'J','Eaton',23,'B'),(7,'Ian','Wilson',20,'D'),(8,'Dan','Fox',19,'A');

CREATE TABLE products (product_id INT PRIMARY KEY, name VARCHAR(30), category VARCHAR(20), price DECIMAL(8,2), stock INT);
INSERT INTO products VALUES (1,'Laptop','Electronics',55000.50,10),(2,'Mouse','Electronics',499.99,150),(3,'Desk','Furniture',7500,0),
                            (4,'Chair','Furniture',3200.75,25),(5,'Pen','Stationery',10,500);

CREATE TABLE sales (sale_id INT PRIMARY KEY AUTO_INCREMENT, product_id INT, customer VARCHAR(20), qty INT, sale_date DATE,
                    FOREIGN KEY (product_id) REFERENCES products(product_id));
INSERT INTO sales (product_id,customer,qty,sale_date) VALUES (1,'Asha',1,'2026-10-01'),(2,'Asha',3,'2026-10-01'),(2,'Ravi',2,'2026-10-02'),
                                                              (5,'Meera',20,'2026-10-02'),(1,'Ravi',2,'2026-10-03'),(4,'Priya',4,'2026-10-03');

CREATE TABLE booking (booking_id INT PRIMARY KEY, passenger_name VARCHAR(30), ticket_no VARCHAR(10), booking_status VARCHAR(10), show_date DATE, price DECIMAL(6,2));
INSERT INTO booking VALUES (1,'  Aditya Rao ','T7','CONFIRMED','2026-11-01',250),(2,'Bhavna Jain','T42','WAITING','2026-11-01',250),
                           (3,'Chetan Das','T105','CONFIRMED','2026-11-02',300),(4,'Aditya Rao','T8','CANCELLED','2026-11-03',300),(5,'Esha Nair',NULL,'CONFIRMED','2026-11-03',250);
```

**`employee` at a glance** (`NULL` = unknown / missing):

| emp_id | first_name | last_name | age | salary | dept_id | hire_date | email |
|---|---|---|---|---|---|---|---|
| 1 | Jane | Doe | 28 | 65000 | 10 | 2021-03-15 | jane@x.com |
| 2 | John | Smith | 45 | 90000 | 10 | 2018-07-01 | john@x.com |
| 3 | Jane | Roe | 24 | 38000 | 30 | 2023-01-10 | jane.r@x.com |
| 4 | Asha | Rao | 32 | 52000 | 20 | 2020-11-23 | asha@x.com |
| 5 | Ravi | Kumar | 29 | 47000 | 30 | 2022-05-05 | **NULL** |
| 6 | Meera | Nair | 51 | 120000 | 40 | 2012-02-14 | meera@x.com |
| 7 | Ankit | Sharma | 22 | 31000 | **NULL** | 2024-06-01 | ankit@x.com |
| 8 | Priya | Das | 38 | 76000 | 10 | 2019-09-09 | priya@x.com |

---

# 4. Creating Databases and Tables, Inserting Data

## 4.1 `CREATE`

```sql
CREATE DATABASE shop;                    -- a database (in Oracle a "user/schema" plays this role)
USE shop;                                -- MySQL: select it

CREATE TABLE emp (                       -- CREATE TABLE name ( column datatype [constraint], ... );
  emp_id INT PRIMARY KEY,
  name   VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2)
);
```

| Part | Notes |
|---|---|
| Keyword `CREATE TABLE` | `CREATE` + the object type (`DATABASE`, `TABLE`, `VIEW`, `INDEX`...) |
| Column | `name datatype` plus optional constraints |
| Enclosure | **Parentheses** `( )` hold the column list; **commas** separate columns (none after the last); **single quotes** enclose text and dates in values (`'Asha'`, `'2026-10-25'`); the statement ends with `;` |
| Choose the right data type | `INT` for ids, `VARCHAR(n)` for names, `DECIMAL(p,s)` for money, `DATE` for dates (section 6) |

**Oracle (not run here):** `CREATE TABLE emp (emp_id NUMBER(5) PRIMARY KEY, name VARCHAR2(30) NOT NULL, salary NUMBER(10,2));`

Copy a table's structure: `CREATE TABLE emp_copy LIKE employee;` (MySQL, verified); `CREATE TABLE emp_copy AS SELECT * FROM employee;` (both; copies data, not all constraints).

## 4.2 `INSERT`

```sql
INSERT INTO department VALUES (60,'Admin','Chennai');                              -- all columns, in table order
INSERT INTO employee (first_name, age) VALUES ('Default', 30);                      -- chosen columns; the rest get DEFAULT/NULL
INSERT INTO products VALUES (6,'Bag','Fashion',999,20),(7,'Cap','Fashion',199,30);  -- several rows at once (MySQL)
```
Verified: inserting `('Default', 30)` gave `salary = 30000.00` from the column `DEFAULT`.

| Rule | Detail |
|---|---|
| Value order matches the column list | Without a column list, you must supply **every** column in table order |
| Text and dates in single quotes | Numbers without |
| Omitted columns | Take the `DEFAULT`, else `NULL` (error if the column is `NOT NULL` with no default and not auto-generated) |
| Oracle: multiple rows | One `INSERT` per row, or `INSERT ALL INTO ... INTO ... SELECT 1 FROM DUAL;` |
| Oracle needs `COMMIT;` | Oracle tools keep inserts uncommitted until you commit (MySQL auto-commits by default) |

---

# 5. Retrieving Data: Projection and Selection

`SELECT` has two basic powers:

| | Meaning | Written as |
|---|---|---|
| **Projection** | Choose **columns** | `SELECT first_name, salary FROM employee` |
| **Selection** | Choose **rows** | `... WHERE salary > 60000` |

```sql
SELECT * FROM student;                                          -- all columns, all rows
SELECT first_name, last_name FROM student;                      -- projection
SELECT first_name, salary FROM employee WHERE salary > 60000;   -- projection + selection
```
Output (verified):

```
+------------+-----------+
| first_name | salary    |
+------------+-----------+
| Jane       |  65000.00 |
| John       |  90000.00 |
| Meera      | 120000.00 |
| Priya      |  76000.00 |
+------------+-----------+
```

**Logical processing order of a query (Interview Imp):** `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `DISTINCT` → `ORDER BY` → `LIMIT`. (This is why a `WHERE` clause cannot use a column alias defined in `SELECT`.) Without `ORDER BY` the **row order is not guaranteed**: a test run of `WHERE emp_id % 2 = 1` on this sample (section 10.1) returned the ids as `7, 1, 3, 5` because MySQL read them through an index.

Practice patterns from your list: *Projecting account-holder names / balance details* = `SELECT name, balance FROM account`; *account holders with a specific balance* = `WHERE balance = 5000` or `>`; *all columns from Patients* = `SELECT *`; *patients' names* = `SELECT name`; *filter patients by billing amount* = `WHERE bill = 1200`.

---

# 6. SQL Data Types in MySQL and Oracle

## 6.1 Comparison

| Kind | MySQL | Oracle |
|---|---|---|
| Integer | `TINYINT`, `SMALLINT`, `INT`, `BIGINT` | `NUMBER(p)` / `NUMBER(p,0)` (also `INTEGER`, which maps to `NUMBER(38)`) |
| Exact decimal | `DECIMAL(p,s)` | `NUMBER(p,s)` |
| Approximate | `FLOAT`, `DOUBLE` | `BINARY_FLOAT`, `BINARY_DOUBLE`, `FLOAT` |
| Fixed text | `CHAR(n)` | `CHAR(n)` |
| Variable text | `VARCHAR(n)` | **`VARCHAR2(n)`** (use this in Oracle) |
| Long text | `TEXT` | `CLOB` |
| Date only | `DATE` | `DATE` (**but Oracle's `DATE` also stores the time**) |
| Date and time | `DATETIME`, `TIMESTAMP` | `TIMESTAMP` (and `DATE`) |
| Boolean | `BOOLEAN` (= `TINYINT(1)`) | none in SQL before 23c (use `NUMBER(1)` or `CHAR(1)`) |

**`DECIMAL(p,s)` / `NUMBER(p,s)`:** **precision** `p` = total digits, **scale** `s` = digits after the decimal point. `DECIMAL(5,2)` holds up to `999.99`.

## 6.2 `CHAR` vs `VARCHAR`

| `CHAR(n)` | `VARCHAR(n)` |
|---|---|
| **Fixed** length; padded with spaces to `n` | **Variable** length; stores only what you give (+ a length byte) |
| Fast and tidy for fixed codes (country `IN`, grade `A`) | Space-efficient for names, emails, addresses |
| Maximum 255 characters (MySQL) | Up to 65,535 bytes (MySQL row limit) |
| Oracle: `CHAR` | Oracle: **`VARCHAR2`** |

## 6.3 What happens with bad values (verified on MySQL 8.4, strict mode)

```sql
CREATE TABLE dt (i INT, c CHAR(5), v VARCHAR(5), d DECIMAL(5,2), dd DATE, dtm DATETIME);
INSERT INTO dt (i,c,v,d,dd,dtm) VALUES ('42','ab','ab',123.456,'2026-10-25','2026-10-25 14:30:00');
```
```
| i  | c    | v    | d      | dd         | dtm                 |
| 42 | [ab] | [ab] | 123.46 | 2026-10-25 | 2026-10-25 14:30:00 |        -- '42' (a numeric STRING) was converted to INT 42;
                                                                          -- 123.456 was ROUNDED to 123.46 (scale 2)
```

| Statement | Result |
|---|---|
| `INSERT ... (v) VALUES ('toolongvalue')` | `ERROR 1406: Data too long for column 'v'` (length limit enforced) |
| `INSERT ... (dd) VALUES ('2026-13-45')` | `ERROR 1292: Incorrect date value` (type mismatch with a `DATE` column) |
| `INSERT ... (i) VALUES ('abc')` | `ERROR 1366: Incorrect integer value` |
| `INSERT ... (d) VALUES (1234.5)` | `ERROR 1264: Out of range value` (exceeds `DECIMAL(5,2)`) |
| Date column given a datetime string `'2026-10-25 14:30:00'` | accepted; stored as `2026-10-25` (**time part discarded**, with a note) |

**Dates:** MySQL standard literal is `'YYYY-MM-DD'` (`'2026-10-25'`) and `'YYYY-MM-DD HH:MM:SS'`.

**Oracle dates (not run here):** `DATE` holds **date + time to the second**; "storing dates without time" means the time part is `00:00:00`. The **default display format** comes from `NLS_DATE_FORMAT` (commonly `DD-MON-RR`, e.g. `25-OCT-26`); the default time of a date literal with no time is **midnight**. Safe literals: `DATE '2026-10-25'` or `TO_DATE('25-10-2026','DD-MM-YYYY')` (a plain `'2026-10-25'` string only works if it matches `NLS_DATE_FORMAT`). Oracle `NUMBER(5,2)` has the same precision/scale meaning; `NUMBER` without arguments stores any number; **`NUMBER(p,s)` with negative `s` rounds to the left** (`NUMBER(5,-2)` rounds to hundreds).

---

# 7. Case Sensitivity

| What | MySQL | Oracle |
|---|---|---|
| **Keywords** (`select`, `SELECT`) | not case-sensitive | not case-sensitive |
| **Column names** | not case-sensitive (verified: `SELECT FIRST_NAME` worked) | not case-sensitive (stored in UPPERCASE unless quoted) |
| **Table names** | **depends on the OS**: case-**sensitive on Linux** (verified: `SELECT ... FROM EMPLOYEE` → `ERROR 1146: Table 'kod.EMPLOYEE' doesn't exist`), insensitive on Windows (setting `lower_case_table_names`) | not case-sensitive unless created with **double quotes** (`"Emp"`) |
| **String data comparison** | **not case-sensitive by default** (default collation `utf8mb4_0900_ai_ci`) | **case-sensitive** |

Verified in MySQL: `'Java' = 'JAVA'` → `1` (true); `'Java' = BINARY 'JAVA'` → `0`; `WHERE first_name = 'jane'` returned both `Jane` rows. In Oracle, `WHERE name = 'jane'` would **not** match `'Jane'` (use `UPPER(name) = 'JANE'`). Best practice: pick one naming style (`snake_case`, lower case) and use it everywhere.

---

# 8. Aliases

An **alias** is a **temporary** name: it exists only for that query.

| | Column alias | Table alias |
|---|---|---|
| Purpose | Rename an output column or an expression | Short name for a table (self joins, long names) |
| MySQL | `SELECT salary*12 AS annual` (`AS` optional) | `FROM employee e` or `FROM employee AS e` |
| Oracle | `SELECT salary*12 AS annual` / `"Annual Pay"` (**double quotes** keep case and allow spaces) | `FROM employee e` (**no `AS`** for table aliases) |
| Where it applies | In `ORDER BY` (and MySQL `HAVING`/`GROUP BY`); **not in `WHERE`** | Everywhere in that query only |

```sql
SELECT e.first_name AS name, e.salary*12 AS annual FROM employee e WHERE e.dept_id = 10;
```
```
| name  | annual     |
| Jane  |  780000.00 |
| John  | 1080000.00 |
| Priya |  912000.00 |
```

Rules: a table alias is **temporary** (gone after the query); once you alias a table, use the alias (`e.first_name`) instead of the table name; double quotes in Oracle protect spaces/case (`SELECT salary AS "Monthly Pay"`); in MySQL use backticks or single quotes for aliases with spaces. "Selection using column alias" works through `HAVING` or by wrapping the query (`SELECT * FROM (SELECT salary*12 AS annual FROM employee) t WHERE annual > 900000`).

---

# 9. Constraints and Data Integrity

A **constraint** is a rule the database enforces on data, protecting **data integrity**.

| Constraint | Rule | Notes |
|---|---|---|
| **`PRIMARY KEY`** | Unique **and** not null; identifies each row | **One per table** (may span several columns = composite key); creates an index |
| **`UNIQUE`** | No duplicate values | A table can have **many**; allows `NULL`s (MySQL allows several; Oracle allows several too) |
| **`NOT NULL`** | A value is mandatory | `first_name VARCHAR(30) NOT NULL` |
| **`DEFAULT`** | Value used when none is given | `salary DECIMAL(10,2) DEFAULT 30000.00` |
| **`CHECK`** | Value must satisfy a condition | `age INT CHECK (age >= 18)` (MySQL enforces it from **8.0.16**) |
| **`FOREIGN KEY`** | Value must exist in the **parent** table's key (or be `NULL`) | Keeps tables consistent |

```sql
CREATE TABLE department (dept_id INT PRIMARY KEY, dept_name VARCHAR(30) NOT NULL UNIQUE, location VARCHAR(30) DEFAULT 'Bangalore');
CREATE TABLE employee (
  emp_id INT PRIMARY KEY AUTO_INCREMENT, first_name VARCHAR(30) NOT NULL,
  age INT CHECK (age >= 18), salary DECIMAL(10,2) DEFAULT 30000.00, dept_id INT, email VARCHAR(50) UNIQUE,
  CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES department(dept_id)
);
```

## 9.1 What happens when a constraint is violated (all verified)

| Statement | Error |
|---|---|
| Duplicate `UNIQUE` value (`email` = `'jane@x.com'`) | `ERROR 1062 (23000): Duplicate entry 'jane@x.com' for key 'employee.email'` |
| `NULL` into `NOT NULL` | `ERROR 1048 (23000): Column 'first_name' cannot be null` |
| `age = 15` against `CHECK (age >= 18)` | `ERROR 3819 (HY000): Check constraint 'employee_chk_1' is violated.` |
| `dept_id = 99` that does not exist in `department` | `ERROR 1452: Cannot add or update a child row: a foreign key constraint fails` |
| Duplicate `PRIMARY KEY` (`dept_id = 10`) | `ERROR 1062: Duplicate entry '10' for key 'department.PRIMARY'` |
| `DELETE FROM department WHERE dept_id = 10` while employees reference it | `ERROR 1451: Cannot delete or update a parent row: a foreign key constraint fails` |

**Foreign keys relate tables** (Products ↔ Orders, Doctor ↔ Patients): the **child** table (`employee`) holds the key of the **parent** (`department`). The parent row cannot be removed while children exist unless you define `ON DELETE CASCADE` (delete the children too) or `ON DELETE SET NULL`. A foreign key column **may be `NULL`** (employee `Ankit` has no department). Define it inline (`FOREIGN KEY (dept_id) REFERENCES department(dept_id)`) or later with `ALTER TABLE ... ADD CONSTRAINT`.

**Oracle (not run here):** same syntax; constraint names can be given (`CONSTRAINT emp_pk PRIMARY KEY (emp_id)`); `CHECK` has always been enforced; `ON DELETE CASCADE` / `SET NULL` supported (no `ON UPDATE CASCADE`).

---

# 10. Operators

## 10.1 Arithmetic and modulo

```sql
SELECT 7+2, 7-2, 7*2, 7/2, 7 DIV 2, 7 % 2, MOD(7,2);
```
```
| 7+2 | 7-2 | 7*2 | 7/2    | 7 DIV 2 | 7 % 2 | MOD(7,2) |
|   9 |   5 |  14 | 3.5000 |       3 |     1 |        1 |
```
`/` gives a decimal in MySQL (`DIV` is integer division); in Oracle use `MOD(7,2)` (there is no `%` or `DIV`), and `TRUNC(7/2)` for integer division. A **calculated column**: `SELECT salary*12 AS annual_salary FROM employee`. **Update with operators:** `UPDATE products SET stock = stock + 10 WHERE product_id = 2;` (increase), `price = price * 0.9` (reduce 10%). **Divisibility checks:** `WHERE emp_id % 2 = 1` (odd ids); *"Utilizing modulo"*, *"Total value of stocked products"* = `SELECT name, price*stock AS stock_value FROM products`.

## 10.2 Comparison (relational) operators

`=`, `<>` or `!=`, `<`, `>`, `<=`, `>=` (one `=` compares in SQL, there is no `==`). Strings compare **alphabetically** (`'Ann' < 'Bob'`). A comparison with `NULL` is never true (section 11.3). *Greater/equal/not equal on a `music_playlist` table*: `WHERE duration > 200`, `WHERE genre = 'Rock'`, `WHERE genre <> 'Rock'`.

```sql
SELECT first_name, age FROM employee WHERE age >= 25 AND age <= 32;      -- same as BETWEEN 25 AND 32
```

## 10.3 Logical operators

`AND` (both true), `OR` (either), `NOT` (reverse). **`AND` binds tighter than `OR`:** use parentheses.

```sql
SELECT first_name, age, dept_id FROM employee WHERE (dept_id = 10 OR salary > 100000) AND NOT age > 40;
```
```
| Jane  | 28 | 10 |
| Priya | 38 | 10 |
```
(Meera and John are excluded by `NOT age > 40`.) *Excluding the Finance department*: `WHERE dept_id <> 40` (rows with `NULL` dept are also dropped; add `OR dept_id IS NULL` to keep them).

**Evaluating Boolean expressions in SQL:** `SELECT 5 > 3` returns `1` (true) / `0` (false) in MySQL; three-valued logic (true / false / unknown) because of `NULL`.

---

# 11. `IN`, `BETWEEN`, `IS NULL`, `LIKE` and `DISTINCT`

## 11.1 `BETWEEN` (inclusive)

```sql
SELECT first_name, age FROM employee WHERE age BETWEEN 25 AND 32;      -- Jane 28, Asha 32, Ravi 29
```
`BETWEEN a AND b` means `>= a AND <= b`: **both limits are included**. To **exclude the upper limit**: `age >= 25 AND age < 32`. Always write the **smaller value first**. Works for numbers, dates (`BETWEEN '2026-10-01' AND '2026-10-02'`) and text. `NOT BETWEEN` selects outside the range.

## 11.2 `IN` and `NOT IN`

```sql
SELECT first_name FROM employee WHERE dept_id IN (10, 30);       -- Jane, John, Priya, Jane, Ravi
SELECT first_name FROM employee WHERE dept_id NOT IN (10, 30);   -- Asha, Meera   (Ankit with NULL dept is NOT returned)
```
`IN (a,b,c)` is shorthand for `= a OR = b OR = c`; works with numbers, strings and dates; the list may be a **subquery**. 

**The `NOT IN` + `NULL` trap (verified):** `WHERE dept_id NOT IN (10, 20, 30, NULL)` returns **no rows at all**, because `x <> NULL` is unknown. Use `NOT EXISTS`, or remove `NULL`s from the list/subquery.

## 11.3 `IS NULL` and `IS NOT NULL`

`NULL` means **unknown / no value**; it is not zero and not an empty string. Any comparison with `NULL` (`= NULL`, `<> NULL`) is **unknown, not true**, so use `IS NULL`.

```sql
SELECT first_name FROM employee WHERE dept_id IS NULL OR email IS NULL;       -- Ravi (no email), Ankit (no dept)
SELECT 1 = NULL, NULL = NULL, NULL IS NULL, 5 <=> NULL, NULL <=> NULL;
```
```
| 1 = NULL | NULL = NULL | NULL IS NULL | 5 <=> NULL | NULL <=> NULL |
|     NULL |        NULL |            1 |          0 |             1 |
```
(`<=>` is MySQL's NULL-safe equals.) Typical problems: *seats not booked* = `LEFT JOIN booked b ON ... WHERE b.seat_id IS NULL` (or `NOT EXISTS`); *dishes ordered by someone* = `WHERE order_id IS NOT NULL` or `EXISTS`; *orders with a missing shipment date* = `WHERE shipped_on IS NULL`. **Oracle:** an **empty string `''` is treated as `NULL`**, so `WHERE col = ''` never matches; use `IS NULL`. Aggregates ignore `NULL` (section 13.6).

## 11.4 `LIKE` and wildcards (verified on `student`)

| Wildcard | Meaning |
|---|---|
| `%` | any number of characters (including none) |
| `_` | exactly **one** character |

| Goal | Pattern | Result |
|---|---|---|
| Last name starts with `D` | `last_name LIKE 'D%'` | Davidson, Dean |
| First name contains `an` | `first_name LIKE '%an%'` | Ann, Susan, Alan, Ian, Dan |
| First name is four characters | `first_name LIKE '____'` | Jake, Alan |
| Starts with `J` and ends with `n` | `first_name LIKE 'J%n'` | Jon |
| Grade is exactly two characters | `grade LIKE '__'` | AB |
| Last name does **not** contain `i` | `last_name NOT LIKE '%i%'` | Anderson, Dean, Brown, Cole, Eaton, Fox |
| Last name starts with A, B or C | MySQL: `last_name REGEXP '^[ABC]'`; Oracle: `REGEXP_LIKE(last_name,'^[ABC]')` | Anderson, Brown, Cole |
| Single-character first name | `first_name LIKE '_'` | J |
| Contains `a` or `e` | `last_name LIKE '%a%' OR last_name LIKE '%e%'` | |

To search for a literal `%` or `_`, escape it: `LIKE '50\%%'` (MySQL) or `LIKE '50!%%' ESCAPE '!'` (Oracle). `LIKE '%x'` (leading wildcard) cannot use a normal index.

## 11.5 `DISTINCT` (and `UNIQUE`)

`DISTINCT` removes **duplicate rows** from the result (not from the table).

```sql
SELECT DISTINCT grade FROM student;                       -- A, B, AB, C, D
SELECT DISTINCT dept_id, age > 30 AS over30 FROM employee ORDER BY dept_id;     -- distinct COMBINATIONS
SELECT COUNT(DISTINCT dept_id) FROM employee;             -- 4   (NULLs are not counted)
```
`DISTINCT` applies to the **whole column list**, not just the first column. With `WHERE`: `SELECT DISTINCT show_date FROM booking WHERE booking_status = 'CONFIRMED'` (filter first, then remove duplicates). **`UNIQUE` as a query keyword** exists only in **Oracle** (a synonym of `DISTINCT` in `SELECT UNIQUE`); in MySQL `UNIQUE` is a *constraint*. Typical uses: unique movie names, unique customers, distinct show dates, unique ticket prices.

---

# 12. `LIMIT`, `OFFSET` and Pagination

```sql
SELECT booking_id FROM booking ORDER BY booking_id LIMIT 3;             -- first 3 rows           → 1, 2, 3
SELECT booking_id FROM booking ORDER BY booking_id LIMIT 2 OFFSET 2;    -- skip 2, take 2         → 3, 4
SELECT booking_id FROM booking ORDER BY booking_id LIMIT 3, 3;          -- LIMIT offset, count    → 4, 5   (only 2 remain)
```
(all verified.)

| Idea | Formula |
|---|---|
| First 3 records | `LIMIT 3` |
| Skip the first 2 | `LIMIT <big number> OFFSET 2` (MySQL needs a `LIMIT` when you use `OFFSET`) |
| **Pagination** | page `p` of size `n` → `LIMIT n OFFSET (p-1)*n` |
| Bookings 4 to 6 | `ORDER BY booking_id LIMIT 3 OFFSET 3` |
| First 2 with `WHERE` | `WHERE booking_status='CONFIRMED' ORDER BY booking_id LIMIT 2` |
| N-th highest salary | `ORDER BY salary DESC LIMIT 1 OFFSET N-1` (3rd highest → Priya 76000, verified) |

**Always combine with `ORDER BY`**, otherwise *which* rows you get is undefined. **Oracle (not run here):** no `LIMIT`. Oracle 12c+: `ORDER BY booking_id FETCH FIRST 3 ROWS ONLY;` and `OFFSET 2 ROWS FETCH NEXT 2 ROWS ONLY;` (older versions: `WHERE ROWNUM <= 3` on an ordered subquery).

---

# 13. SQL Functions

A **function** takes inputs and returns a value. **Single-row functions** return one result **per row** (`UPPER(name)`); **multi-row (aggregate) functions** return one result **for a group of rows** (`SUM(salary)`).

## 13.1 String functions (MySQL, verified)

| Function | Example → result |
|---|---|
| `UPPER(s)`, `LOWER(s)` | `UPPER('Java')` → `JAVA`; `LOWER('SQL')` → `sql` |
| `LENGTH(s)` (**bytes**), `CHAR_LENGTH(s)` (characters) | `LENGTH('Hello')` → 5 |
| `REVERSE(s)` | `REVERSE('abc')` → `cba` |
| `CONCAT(a,b,...)` | `CONCAT('a','-','b')` → `a-b`; **any `NULL` makes the result `NULL`**: `CONCAT('x',NULL)` → `NULL` |
| `CONCAT_WS(sep,...)` | `CONCAT_WS(' ','Ann','Lee')` → `Ann Lee` (skips `NULL`s) |
| `SUBSTR(s,pos[,len])` (**1-based**) | `SUBSTR('Hello World',7)` → `World`; `SUBSTR('Hello World',1,5)` → `Hello`; `SUBSTR('Hello World',-5)` → `World` (negative = from the end) |
| `INSTR(s,sub)` | `INSTR('hello@x.com','@')` → `6`; not found → `0` |
| `LEFT(s,n)`, `RIGHT(s,n)` | `LEFT('abcdef',3)` → `abc`; `RIGHT('abcdef',3)` → `def` |
| `ASCII(c)` | `ASCII('A')` → `65`; `ASCII('Apple')` → `65` (first character only) |
| `LPAD(s,n,pad)`, `RPAD(...)` | `LPAD('42',5,'0')` → `00042`; `RPAD('OK',5,'*')` → `OK***` |
| `TRIM(s)`, `LTRIM`, `RTRIM` | `TRIM('  hi  ')` → `hi` |
| `TRIM(LEADING 'x' FROM s)`, `TRAILING`, `BOTH` | `TRIM(LEADING '0' FROM '00120')` → `120`; `TRIM(TRAILING 'x' FROM 'abcxx')` → `abc`; `TRIM(BOTH '*' FROM '**a**')` → `a` |

Combined example (verified), cleaning `booking`:

```sql
SELECT booking_id, TRIM(passenger_name) AS pname, LENGTH(passenger_name) AS raw_len,
       LENGTH(TRIM(passenger_name)) AS clean_len, LPAD(ticket_no,6,'0') AS padded FROM booking;
```
```
| 1 | Aditya Rao  | 13 | 10 | 0000T7 |      -- the stored name had extra spaces: 13 → 10 after TRIM
| 2 | Bhavna Jain | 11 | 11 | 000T42 |
| 5 | Esha Nair   |  9 |  9 | NULL   |      -- LPAD of NULL gives NULL
```
Other examples from your list: *sum of lengths of first and last names* = `LENGTH(first_name)+LENGTH(last_name)`; *reverse then uppercase* = `UPPER(REVERSE(first_name))` (`Jon` → `NOJ`); *first five characters* = `LEFT(name,5)`; *position of `'J'`* = `INSTR(name,'J')`; *last three characters* = `RIGHT(s,3)`; *ASCII of the first letter of passenger names* = `ASCII(passenger_name)`. **Errors to know:** `SUBSTR` with a missing argument is a syntax error; `SUBSTR('Hello',2,0)` returns an empty string; `INSTR` with a non-existent substring returns `0` (not an error); a wrong argument order silently gives wrong results.

## 13.2 Numeric functions (MySQL, verified)

| Function | Examples |
|---|---|
| `MOD(a,b)` | `MOD(10,3)` → 1; `MOD(-10,3)` → **-1** (sign of the first argument); `MOD(10,0)` → `NULL` (no error) |
| `ABS(x)` | `ABS(-7.5)` → 7.5 |
| `ROUND(x[,d])` | `ROUND(2.5)` → **3**, `ROUND(-2.5)` → **-3** (halves round **away from zero**); `ROUND(3.14159,2)` → 3.14; **negative digits round left**: `ROUND(1234.567,-2)` → 1200, `ROUND(1250,-2)` → 1300, `ROUND(-1250,-2)` → -1300 |
| `TRUNCATE(x,d)` | `TRUNCATE(3.987,2)` → **3.98** (cuts, never rounds; compare `ROUND(3.987,2)` → 3.99); `TRUNCATE(3.987,0)` → 3; `TRUNCATE(-3.987,1)` → -3.9; `TRUNCATE(1999,-2)` → 1900 |
| `POWER(x,y)` = `POW(x,y)` | `POWER(2,10)` → 1024; `POWER(2,-1)` → 0.5; `POWER(7,0)` → 1 |
| `SQRT(x)` | `SQRT(16)` → 4; `SQRT(2)` → 1.4142135623730951; `SQRT(-1)` → `NULL` |
| `CEIL(x)` = `CEILING(x)` | `CEIL(4.1)` → 5; `CEIL(-4.1)` → **-4** |
| `FLOOR(x)` | `FLOOR(4.9)` → 4; `FLOOR(-4.1)` → **-5** |

Remember: `CEIL` goes **toward +∞**, `FLOOR` toward **-∞**; for negatives that is the opposite of what beginners guess. Combined: square of a price `POWER(price,2)`, cube `POWER(price,3)`, `SQRT(POWER(x,2))`, *odd product ids* `WHERE MOD(product_id,2)=1`, *absolute price differences* `ABS(price1 - price2)`, *round then truncate*.

## 13.3 Date and time functions (MySQL, verified)

| Need | Function | Example |
|---|---|---|
| Current date and time | `NOW()`, `SYSDATE()`, `LOCALTIME()`, `CURRENT_TIMESTAMP` | `NOW()` is fixed at **statement start**; `SYSDATE()` is the **actual** time of each call |
| Current date | `CURDATE()` = `CURRENT_DATE()` | `2026-10-25` |
| Current time | `CURTIME()` = `CURRENT_TIME()` | `14:30:45` |
| Date part / time part | `DATE(dt)`, `TIME(dt)` | `DATE('2026-10-25 14:30:45')` → `2026-10-25`; `TIME(...)` → `14:30:45`; an invalid text such as `DATE('not a date')` → `NULL` |
| Add / subtract | `DATE_ADD(d, INTERVAL n unit)`, `DATE_SUB` | `DATE_ADD('2026-01-31', INTERVAL 3 DAY)` → `2026-02-03`; `INTERVAL 1 MONTH` → `2026-02-28` (clamped to month end); `INTERVAL -2 WEEK` → `2026-01-17`; `INTERVAL 2 YEAR` → `2028-01-31`; `INTERVAL 1 QUARTER` → `2026-04-30` |
| Difference | `TIMESTAMPDIFF(unit, start, end)` | `DAY`: `2026-01-01`→`2026-03-01` = **59**; `HOUR`: 26; `MINUTE`: 90; `SECOND`: 90; `MONTH` from `01-31` to `02-28` = **0** (not a full month); `YEAR`: `2000-05-15`→`2026-05-14` = **25** (birthday not reached) |
| Day count | `DATEDIFF(end, start)` | `DATEDIFF('2026-12-25','2026-10-25')` → 61 |
| Parts | `DAY()`, `MONTH()`, `YEAR()`, `DAYNAME()`, `MONTHNAME()`, `DAYOFWEEK()` | `25`, `10`, `2026`, `Sunday`, `October`, `1` (Sunday = 1) |
| Format | `DATE_FORMAT(d,'%d-%m-%Y %W')` | `25-10-2026 Sunday` |

`INTERVAL` units: `SECOND, MINUTE, HOUR, DAY, WEEK, MONTH, QUARTER, YEAR`. The **first argument of `TIMESTAMPDIFF`** is the **unit**, then start, then end (result is negative if start is after end). Example: **years of service** = `TIMESTAMPDIFF(YEAR, hire_date, CURDATE())` (Meera: 14 years, verified for `'2026-10-25'`).

## 13.4 Control-flow functions (MySQL, verified)

| Function | Meaning | Example |
|---|---|---|
| `IF(cond, a, b)` | one of two values | `IF(5>3,'yes','no')` → `yes` |
| `IFNULL(x, d)` | replace `NULL` | `IFNULL(NULL,'default')` → `default`; `IFNULL(0,'default')` → `0` |
| `COALESCE(a,b,c,...)` | **first non-NULL** (standard SQL; also Oracle) | `COALESCE(NULL,NULL,'third')` → `third` |
| `NULLIF(a,b)` | `NULL` when equal, else `a` | `NULLIF(5,5)` → `NULL`; `NULLIF(5,6)` → `5` (handy to avoid division by zero: `x / NULLIF(y,0)`) |
| `CASE WHEN ... THEN ... ELSE ... END` | multi-branch (standard) | below |

```sql
SELECT first_name, IFNULL(email,'no email') AS email, IF(salary>60000,'High','Normal') AS band,
       CASE WHEN age<25 THEN 'Young' WHEN age<40 THEN 'Mid' ELSE 'Senior' END AS grp FROM employee;
```
```
| Jane  | jane@x.com   | High   | Mid    |
| Ravi  | no email     | Normal | Mid    |
| Ankit | ankit@x.com  | Normal | Young  |
```

## 13.5 Division by zero and bad input

In MySQL `10/0` and `MOD(10,0)` give `NULL` (with a warning) in plain `SELECT`s; in strict `INSERT/UPDATE` they raise an error. Oracle raises `ORA-01476: divisor is equal to zero`.

## 13.6 Multi-row (aggregate) functions

| Function | Result | Verified on `employee` |
|---|---|---|
| `COUNT(*)` | number of **rows** | 8 |
| `COUNT(col)` | rows where `col` is **not NULL** | `COUNT(email)` = 7, `COUNT(dept_id)` = 7 |
| `COUNT(DISTINCT col)` | distinct non-NULL values | `COUNT(DISTINCT dept_id)` = 4 |
| `MIN(col)`, `MAX(col)` | smallest / largest | 31000.00 / 120000.00 |
| `SUM(col)`, `AVG(col)` | total / mean (**NULLs ignored**) | 519000.00 / 64875.000000 |

*Counting rows based on a condition:* `SELECT COUNT(*) FROM booking WHERE booking_status='CONFIRMED';` → `3`. *Average length of ticket numbers:* `AVG(LENGTH(ticket_no))` → `2.75` (the `NULL` ticket is ignored, so 11 ÷ 4). *Longest / shortest passenger name:* `MAX(LENGTH(TRIM(passenger_name)))` = 11, `MIN(...)` = 9. Aggregate functions **cannot appear in `WHERE`** (use `HAVING`).

---

# 14. Oracle Functions and the `DUAL` Table

*(Oracle syntax: not run here; it follows the Oracle documentation.)*

## 14.1 `DUAL`

Oracle requires a `FROM` clause in every `SELECT`. **`DUAL`** is a built-in **one-row, one-column table** (column `DUMMY`, value `'X'`) for evaluating expressions that need no real table.

```sql
SELECT 2 + 3 FROM DUAL;                         -- 5          arithmetic
SELECT SYSDATE FROM DUAL;                       -- current date and time of the DB server
SELECT USER FROM DUAL;                          -- current user
SELECT UPPER('oracle') FROM DUAL;               -- ORACLE
SELECT * FROM DUAL;                             -- DUMMY = X
```
Use it to **retrieve system values** (`SYSDATE`, `USER`, `SYS_CONTEXT(...)`), test functions, or read a sequence (`SELECT seq.NEXTVAL FROM DUAL`). (MySQL lets you write `SELECT 2+3;` with no table and also accepts `FROM DUAL`.)

## 14.2 Oracle function equivalents

| Task | MySQL | Oracle |
|---|---|---|
| Title case | (no built-in) | `INITCAP('rajdhani express')` → `Rajdhani Express` |
| Join text | `CONCAT(a,b,c)` | `a \|\| b \|\| c` (`CONCAT` takes **two** arguments) |
| Substring / position | `SUBSTR`, `INSTR` | `SUBSTR`, `INSTR` (same, 1-based) |
| Pad / trim | `LPAD`, `RPAD`, `TRIM` | same |
| Round / truncate numbers | `ROUND`, `TRUNCATE(x,d)` | `ROUND`, **`TRUNC(x,d)`** |
| Current date/time | `NOW()`, `CURDATE()` | `SYSDATE`, `CURRENT_DATE`, `SYSTIMESTAMP` |
| Add months | `DATE_ADD(d, INTERVAL n MONTH)` | **`ADD_MONTHS(d, n)`** |
| Months between | `TIMESTAMPDIFF(MONTH, a, b)` | **`MONTHS_BETWEEN(b, a)`** (can be fractional) |
| Add days / hours | `DATE_ADD(d, INTERVAL n DAY)` | `d + n` (days); `d + n/24` (hours) |
| Day difference | `DATEDIFF(b, a)` | `b - a` (number of days, can be fractional) |
| Date parts | `MONTH(d)`, `YEAR(d)` | `EXTRACT(MONTH FROM d)`, `EXTRACT(YEAR FROM d)`; `TO_CHAR(d,'MON')` |
| Replace `NULL` | `IFNULL(x,d)` | **`NVL(x,d)`** |
| If-then-else on `NULL` | `IF(x IS NULL, a, b)` | **`NVL2(x, if_not_null, if_null)`** |
| String → date | `STR_TO_DATE('25-10-2026','%d-%m-%Y')` | **`TO_DATE('25-10-2026','DD-MM-YYYY')`** |
| Date/number → string | `DATE_FORMAT(d,'%d-%m-%Y')` | **`TO_CHAR(d,'DD-MM-YYYY')`**, `TO_CHAR(1234.5,'9,999.99')` |
| Row limit | `LIMIT n` | `FETCH FIRST n ROWS ONLY` |

```sql
SELECT NVL(commission, 0) FROM emp;                              -- NULL → 0 ("Using NVL with numeric values")
SELECT NVL2(commission, 'Has bonus', 'No bonus') FROM emp;       -- conditional display
SELECT TO_DATE('25-10-2026','DD-MM-YYYY') FROM DUAL;             -- date conversion
SELECT TO_CHAR(1234567.891,'9,999,999.99') FROM DUAL;            --  1,234,567.89   (formatting numbers)
SELECT TO_CHAR(SYSDATE,'DD-MON-YYYY HH24:MI') FROM DUAL;
SELECT INITCAP(train_name) FROM trains;                          -- title case for train names
SELECT ADD_MONTHS(arrival, 3) FROM trains;                       -- add months to arrival time
SELECT MONTHS_BETWEEN(arrival, departure) FROM trains;           -- number of months between
SELECT arrival - departure FROM trains;                          -- duration in days (e.g. 0.5 = 12 hours)
SELECT departure + 5/24 FROM trains;                             -- add 5 hours to departure
SELECT TO_CHAR(departure,'MONTH') FROM trains;                   -- month of departure
SELECT * FROM trains WHERE EXTRACT(MONTH FROM arrival) BETWEEN 3 AND 5;   -- trains arriving between specific months
SELECT AVG(arrival - departure) FROM trains;                     -- average duration of journeys
```
The `trains(train_name, departure, arrival)` table in those examples is the exercise's table (not part of the `kod` sample). **Control-flow (Oracle):** `NVL`, `NVL2`, `COALESCE`, `NULLIF`, `CASE`, `DECODE(x, v1, r1, v2, r2, default)`. **Conversion:** `TO_CHAR`, `TO_DATE`, `TO_NUMBER`.

---

# 15. `GROUP BY`, `HAVING` and the Full `SELECT`

`GROUP BY` splits the rows into **groups** and applies an aggregate **to each group**.

```sql
SELECT p.name, SUM(s.qty) AS total_qty, SUM(s.qty*p.price) AS revenue
FROM sales s JOIN products p ON p.product_id = s.product_id
GROUP BY p.product_id, p.name ORDER BY revenue DESC;
```
```
| Laptop | 3  | 165001.50 |
| Chair  | 4  |  12803.00 |
| Mouse  | 5  |   2499.95 |
| Pen    | 20 |    200.00 |
```

| Report (from your list) | Query idea |
|---|---|
| Total quantity sold per product | `SUM(qty) ... GROUP BY product_id` |
| Total sales amount per product / customer | `SUM(qty*price) ... GROUP BY product_id` / `GROUP BY customer` |
| **Daily** sales quantity per product | `GROUP BY sale_date, product_id` |
| Average quantity per sale per product | `AVG(qty) ... GROUP BY product_id` |
| Maximum quantity in a single sale | `MAX(qty) ... GROUP BY product_id` |
| Revenue per day | `SUM(qty*price) ... GROUP BY sale_date` |
| Number of transactions per day / per customer | `COUNT(*) ... GROUP BY sale_date` (verified: 2, 2, 2) / `GROUP BY customer` |
| List of products sold each day | MySQL `GROUP_CONCAT(DISTINCT product_id)`; Oracle `LISTAGG(product_id, ',') WITHIN GROUP (ORDER BY product_id)`. Verified: `2026-10-01 → 1,2`, `2026-10-02 → 2,5`, `2026-10-03 → 1,4` |

**Rule:** every column in `SELECT` must be **either inside an aggregate or listed in `GROUP BY`** (MySQL enforces this with `ONLY_FULL_GROUP_BY`; Oracle always does).

**`WHERE` vs `HAVING` (Interview Imp):** `WHERE` filters **rows before** grouping (no aggregates allowed); `HAVING` filters **groups after** grouping (aggregates allowed).

```sql
SELECT customer, SUM(qty) AS items, COUNT(*) AS n FROM sales GROUP BY customer HAVING SUM(qty) > 3 ORDER BY items DESC;
-- Meera 20, Asha 4, Ravi 4, Priya 4
SELECT dept_id, COUNT(*) c, ROUND(AVG(salary)) avg_sal FROM employee WHERE age > 22 GROUP BY dept_id HAVING COUNT(*) >= 1 ORDER BY avg_sal DESC;
-- 40 → 120000, 10 → 77000, 20 → 52000, 30 → 42500
```
**All clauses together, in their required written order:**

```sql
SELECT   columns / expressions / aggregates
FROM     table [joins]
WHERE    row filter
GROUP BY grouping columns
HAVING   group filter
ORDER BY sort columns [ASC|DESC]
LIMIT    n OFFSET m;                    -- Oracle: FETCH FIRST n ROWS ONLY
```
*"Combining WHERE, GROUP BY, ORDER BY and HAVING"* = this template; `CASE` can be used inside any clause (*conditional logic*).

---

# 16. Subqueries

A **subquery** (inner query) is a `SELECT` inside another statement, in parentheses. It runs first and its result feeds the outer query.

| Type | Returns | Use with | Verified example |
|---|---|---|---|
| **Single value** (scalar) | one row, one column | `=`, `>`, `<` | `WHERE salary > (SELECT AVG(salary) FROM employee)` → Jane, John, Meera, Priya |
| **Multiple values** (one column) | many rows | `IN`, `ANY`, `ALL` | `WHERE dept_id IN (SELECT dept_id FROM department WHERE location IN ('Mumbai','Delhi'))` → Asha, Jane, Ravi |
| **Multiple columns** (row) | many rows and columns | `(a,b) IN (...)` | highest earner per department: `WHERE (dept_id, salary) IN (SELECT dept_id, MAX(salary) FROM employee GROUP BY dept_id)` → John, Asha, Ravi, Meera |
| In the **`SELECT` list** | one value per row | | `(SELECT dept_name FROM department d WHERE d.dept_id=e.dept_id) AS dept` |
| In **`FROM`** (derived table) | a table | needs an alias | `FROM (SELECT ...) t` |

More verified examples:

```sql
SELECT first_name FROM employee WHERE salary > ALL (SELECT salary FROM employee WHERE dept_id = 30);  -- earns more than EVERYONE in Sales
SELECT name FROM products WHERE product_id NOT IN (SELECT product_id FROM sales);                    -- never sold → Desk
SELECT d.dept_name FROM department d WHERE NOT EXISTS (SELECT 1 FROM employee e WHERE e.dept_id=d.dept_id);   -- no employees → Legal
SELECT first_name FROM employee ORDER BY salary DESC LIMIT 1 OFFSET 2;                                -- 3rd highest → Priya
SELECT first_name, salary FROM employee WHERE salary = (SELECT MAX(salary) FROM employee WHERE salary < (SELECT MAX(salary) FROM employee));  -- 2nd highest → John 90000
```

| Technique | Notes |
|---|---|
| **Pattern matching** inside | `WHERE name LIKE (SELECT CONCAT(first_letter,'%') FROM ...)`: the subquery produces the pattern |
| **`ORDER BY` / `LIMIT` in a subquery** | `WHERE salary = (SELECT salary FROM employee ORDER BY salary DESC LIMIT 1)` (MySQL does not allow `LIMIT` inside an `IN (...)` subquery directly; wrap it in a derived table. Oracle: `FETCH FIRST`) |
| **Correlated** subquery | refers to the outer row, runs once **per outer row** (`WHERE salary > (SELECT AVG(salary) FROM employee e2 WHERE e2.dept_id = e.dept_id)`) |
| **`EXISTS`** | `true` if the subquery returns any row; stops at the first; `NULL`-safe, unlike `NOT IN` |
| **Cardinality error** | A scalar subquery returning **more than one row** raises *"Subquery returns more than 1 row"* |
| **Subqueries in DML** | `UPDATE employee SET salary = salary*1.1 WHERE dept_id = (SELECT dept_id FROM department WHERE dept_name='IT')` |

Subquery or join? Joins are usually faster and let you show columns from both tables; subqueries read naturally for "greater than the average" and "not in".

---

# 17. Joins

A **join** combines rows from two or more tables **on a related column** (usually primary key = foreign key). **Always write the `ON` condition**; without it you get a **Cartesian product** (every row paired with every row: `employee` × `department` = 8 × 5 = **40** rows, verified).

```
employee ─── dept_id ───► department(dept_id)
```

| Join | Returns | Verified result on the sample data |
|---|---|---|
| **`INNER JOIN`** (`JOIN`) | rows with a **match in both** tables | 7 employees (Ankit has no department → missing) |
| **`LEFT JOIN`** | **all rows from the left**, matches from the right, `NULL` when none | 8 rows; `Ankit | NULL` |
| **`RIGHT JOIN`** | all rows from the **right**, matches from the left | adds `Legal | NULL` (a department with no employees) |
| **`FULL OUTER JOIN`** | all rows from **both** | Oracle native; MySQL: `LEFT JOIN ... UNION ... RIGHT JOIN ...` (verified, 9 rows) |
| **`CROSS JOIN`** | every combination | 40 rows |
| **Self join** | a table joined to itself (use two aliases) | pairs in the same department |

```sql
SELECT e.first_name, d.dept_name FROM employee e INNER JOIN department d ON e.dept_id = d.dept_id;      -- 7 rows
SELECT e.first_name, d.dept_name FROM employee e LEFT  JOIN department d ON e.dept_id = d.dept_id;      -- 8 rows: Ankit | NULL
SELECT d.dept_name, e.first_name FROM employee e RIGHT JOIN department d ON e.dept_id = d.dept_id WHERE e.emp_id IS NULL;   -- Legal | NULL

-- FULL OUTER JOIN in MySQL: union of both outer joins
SELECT e.first_name, d.dept_name FROM employee e LEFT JOIN department d ON e.dept_id=d.dept_id
UNION
SELECT e.first_name, d.dept_name FROM employee e RIGHT JOIN department d ON e.dept_id=d.dept_id;

-- Self join: pairs of employees in the same department (a.emp_id < b.emp_id prevents (A,B) AND (B,A) and self-pairs)
SELECT a.first_name AS emp1, b.first_name AS emp2, a.dept_id FROM employee a JOIN employee b ON a.dept_id=b.dept_id AND a.emp_id < b.emp_id;
```
Self-join result (verified): `Jane–John`, `Jane–Priya`, `John–Priya` (dept 10) and `Jane–Ravi` (dept 30).

**`ON` clause:** states how rows match (`ON e.dept_id = d.dept_id`). *Returning matching rows* = inner join. **Handling non-matching rows:** use `LEFT/RIGHT/FULL` and look for `NULL` on the other side: `... LEFT JOIN orders o ON c.id = o.customer_id WHERE o.id IS NULL` = **customers with no orders** (also *seats not booked*, *flights without passengers*). **`USING (dept_id)`** is shorthand when both tables share the column name. **Oracle** (old style, avoid): `FROM a, b WHERE a.x = b.x` and `(+)` for outer joins; use ANSI `JOIN ... ON`.

Typical exercises from your list: *employees with their department names* (inner), *all employees with their department* (left), *all departments with their employees* (right), *all employees and departments* (full), *all columns of two tables* (`SELECT *` join), *pairs of employees in the same department* (self join), *passengers and their flights* (inner), *flights with and without passengers* (left/right), *combinations of passengers and flights* (cross join), *co-passengers on the flight* (self join on `flight_id` with `a.passenger_id <> b.passenger_id`), *customers and their orders* (left).

---

# 18. Common Table Expressions (CTEs)

A **CTE** is a **named temporary result set** defined with `WITH` and usable in the query that follows. It makes complex queries readable (like a variable for a query) and exists **only for that statement**.

```sql
WITH dept_avg AS (                                     -- 1. start a CTE: WITH name AS ( query )
    SELECT dept_id, AVG(salary) AS avg_sal FROM employee GROUP BY dept_id
)
SELECT e.first_name, e.salary, ROUND(da.avg_sal) AS dept_avg        -- 2. use it like a table
FROM employee e JOIN dept_avg da ON da.dept_id = e.dept_id          --    (CTE joined with another table)
WHERE e.salary > da.avg_sal;
```
```
| John | 90000.00 | 77000 |        -- earns more than his department's average
| Ravi | 47000.00 | 42500 |
```

| Variant | Example |
|---|---|
| **Retrieving employee details** | `WITH e AS (SELECT * FROM employee WHERE age > 30) SELECT first_name, salary FROM e;` |
| **Maximum salary** | `WITH max_sal AS (SELECT MAX(salary) AS m FROM employee) SELECT first_name FROM employee, max_sal WHERE salary = m;` → Meera (verified) |
| **Multiple columns** | list them in the CTE's `SELECT` (or `WITH t(a,b) AS (...)`) |
| **Multiple CTEs** (comma-separated, **no second `WITH`**) | `WITH hi AS (SELECT ... salary>60000), lo AS (SELECT ... salary<40000) SELECT 'high', COUNT(*) FROM hi UNION ALL SELECT 'low', COUNT(*) FROM lo;` → `high 4`, `low 2` (verified) |
| **Join CTEs with other tables / each other** | `FROM cte1 JOIN cte2 ON ...` |
| **Recursive CTE** | `WITH RECURSIVE n(i) AS (SELECT 1 UNION ALL SELECT i+1 FROM n WHERE i<5) SELECT i FROM n;` (MySQL 8 / PostgreSQL; Oracle: `WITH n(i) AS (...)` without the word `RECURSIVE`) |

CTE vs subquery vs view: a CTE lives for **one statement**, a **view** is stored permanently, a derived-table subquery cannot be referenced twice.

---

# 19. SQL Command Categories: DDL, DML, TCL, DCL

| Category | Full name | Commands | Auto-commits? |
|---|---|---|---|
| **DDL** | Data **Definition** Language | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME` | **Yes** (implicit commit) |
| **DML** | Data **Manipulation** Language | `INSERT`, `UPDATE`, `DELETE` (`MERGE` in Oracle) | No (needs `COMMIT` in a transaction) |
| **DQL** | Data **Query** Language | `SELECT` | n/a |
| **TCL** | **Transaction** Control Language | `COMMIT`, `ROLLBACK`, `SAVEPOINT` | |
| **DCL** | Data **Control** Language | `GRANT`, `REVOKE` | Yes |

## 19.1 DDL (verified on MySQL)

```sql
CREATE TABLE emp_copy LIKE employee;                  -- table creation (the "Emp" table), foreign keys included (see section 9)
ALTER TABLE emp_copy ADD COLUMN phone VARCHAR(15);    -- adding a column (e.g. Email)
ALTER TABLE emp_copy MODIFY COLUMN phone BIGINT;      -- changing the data type    (Oracle: ALTER TABLE emp_copy MODIFY (phone NUMBER(12));)
ALTER TABLE emp_copy RENAME COLUMN email TO mail;     -- rename
ALTER TABLE emp_copy DROP COLUMN phone;               -- deleting a column
TRUNCATE TABLE emp_copy;                              -- remove ALL rows, keep the table, reset AUTO_INCREMENT
DROP TABLE emp_copy;                                  -- remove the table itself
```
| | `DELETE` | `TRUNCATE` | `DROP` |
|---|---|---|---|
| Category | DML | DDL | DDL |
| Removes | chosen rows (`WHERE`) or all | **all rows** | rows **and** the table |
| `WHERE` | yes | no | no |
| Rollback | **yes** (inside a transaction) | no (implicit commit) | no |
| Speed on a big table | slower (row by row, logged) | very fast | very fast |
| Identity/auto counter | continues | **reset** (verified: after `TRUNCATE` the next id was `1`) | gone |

## 19.2 DML (verified)

```sql
INSERT INTO employee (first_name,age) VALUES ('Default', 30);                  -- insert into specific columns
UPDATE employee SET salary = salary * 1.10 WHERE dept_id = 30;                 -- update with WHERE → Jane 38000→41800.00, Ravi 47000→51700.00
UPDATE employee SET salary = salary + 1000 WHERE age < 25 AND dept_id IS NOT NULL;   -- with logical operators
DELETE FROM employee WHERE first_name = 'Default';                             -- delete with WHERE (1 row)
DELETE FROM employee WHERE age > 200 OR salary < 0;                            -- with logical operators (0 rows)
-- DELETE FROM employee;           -- WITHOUT WHERE → deletes EVERY row!  (and UPDATE without WHERE changes every row)
```
> **Danger:** `UPDATE` / `DELETE` **without `WHERE`** affects **all rows**. Run a `SELECT` with the same `WHERE` first; in MySQL Workbench "safe updates" mode blocks it.

## 19.3 TCL (verified, InnoDB)

A **transaction** is a group of statements that succeed or fail **together** (**ACID**: Atomicity, Consistency, Isolation, Durability).

```sql
CREATE TABLE acct (id INT PRIMARY KEY, bal INT) ENGINE=InnoDB;  INSERT INTO acct VALUES (1,100),(2,200);

START TRANSACTION; UPDATE acct SET bal=bal-50 WHERE id=1; UPDATE acct SET bal=bal+50 WHERE id=2; ROLLBACK;
-- (1,100) (2,200)  : ROLLBACK undid both updates

START TRANSACTION; UPDATE acct SET bal=bal-50 WHERE id=1; SAVEPOINT sp1;
                   UPDATE acct SET bal=bal-999 WHERE id=2; ROLLBACK TO SAVEPOINT sp1; COMMIT;
-- (1,50) (2,200)   : only the work AFTER the savepoint was undone; the first update was committed

START TRANSACTION; DELETE FROM acct WHERE id=2; COMMIT; ROLLBACK;
-- (1,50)           : after COMMIT a ROLLBACK cannot bring the row back ("rollback to commit")
```

| Command | Effect |
|---|---|
| `COMMIT` | make the transaction's changes **permanent** |
| `ROLLBACK` | undo everything since the last commit (or the start) |
| `SAVEPOINT name` | a marker inside a transaction |
| `ROLLBACK TO SAVEPOINT name` | undo back to the marker, **keep the transaction open** |
| `SET autocommit = 0` | MySQL: stop committing each statement automatically (verified: an `UPDATE` followed by `ROLLBACK` left the data unchanged) |

MySQL **autocommits** each statement by default; Oracle starts a transaction implicitly at the first DML and commits only on `COMMIT` (or on any DDL, or on exit). Use `START TRANSACTION` (MySQL) / nothing (Oracle) to begin.

## 19.4 DCL: users and privileges (verified)

```sql
CREATE USER 'kodnest'@'localhost' IDENTIFIED BY 'Str0ng#Pass';     -- new user at host = 'localhost'
GRANT SELECT ON kod.employee TO 'kodnest'@'localhost';             -- grant select privilege
SHOW GRANTS FOR 'kodnest'@'localhost';
```
```
| GRANT USAGE ON *.* TO `kodnest`@`localhost`                |        -- USAGE = "can log in, nothing else"
| GRANT SELECT ON `kod`.`employee` TO `kodnest`@`localhost`  |
```
```sql
GRANT ALL PRIVILEGES ON kod.* TO 'kodnest'@'localhost';            -- every privilege on the whole database
REVOKE ALL PRIVILEGES ON kod.* FROM 'kodnest'@'localhost';         -- take privileges back
DROP USER 'kodnest'@'localhost';                                   -- drop the user
```
(After `GRANT ALL ... ON kod.*` the grants list contained both the database-wide grant **and** the earlier table-level `SELECT`; `REVOKE` only removes what you name.) **Oracle (not run here):** `CREATE USER kodnest IDENTIFIED BY pwd;` `GRANT CREATE SESSION TO kodnest;` (needed to log in) `GRANT SELECT ON hr.employee TO kodnest;` `DROP USER kodnest CASCADE;`. Principle: **least privilege**.

---

# 20. Database Objects, ER Diagrams and Normalization

## 20.1 Views (verified)

A **view** is a **stored query** that behaves like a virtual table; it stores **no data** itself.

```sql
CREATE VIEW emp_sal AS SELECT emp_id, first_name, salary FROM employee WHERE salary > 50000;
SELECT * FROM emp_sal;                                      -- Jane, John, Asha, Ravi(51700 after the raise), Meera, Priya
CREATE OR REPLACE VIEW grade_view AS
  SELECT first_name, CASE WHEN salary>=100000 THEN 'A' WHEN salary>=60000 THEN 'B' ELSE 'C' END AS grade FROM employee;
DROP VIEW emp_sal;     DROP VIEW grade_view;
```
Why: **simplify** complex queries, **hide columns** (security: grant access to the view, not the table), keep logic in one place. Simple views can be updated; those with `GROUP BY`/`DISTINCT`/joins usually cannot. Oracle also has **materialized views** that store results.

## 20.2 Synonyms (Oracle, not run here)

A **synonym** is an **alias for a database object** (table, view, sequence, procedure), often in another schema.

```sql
CREATE SYNONYM emp FOR hr.employees;          -- synonyms for tables (or views)
SELECT * FROM emp;
CREATE PUBLIC SYNONYM emp FOR hr.employees;   -- visible to all users (needs privilege)
DROP SYNONYM emp;
```
Use cases: hide the schema/owner name, give a stable name when the real object moves, shorten names. MySQL has no synonyms (use views).

## 20.3 Sequences

A **sequence** generates unique numbers (ids).

**Oracle (not run here):**

```sql
CREATE SEQUENCE emp_seq START WITH 1 INCREMENT BY 1 NOCACHE;     -- creating a sequence
INSERT INTO emp (emp_id, name) VALUES (emp_seq.NEXTVAL, 'Asha');  -- using it to insert data
SELECT emp_seq.CURRVAL FROM DUAL;                                 -- last value in this session
DROP SEQUENCE emp_seq;
```
**MySQL has no `CREATE SEQUENCE`**; use `AUTO_INCREMENT` (verified: after inserting ids 1, 2, 10 the next generated id was **11**; `LAST_INSERT_ID()` returned it). Oracle 12c+ also supports `GENERATED ALWAYS AS IDENTITY`.

## 20.4 Stored procedures, indexes, triggers

### Stored procedures (verified, MySQL)

A **stored procedure** is a named block of SQL saved in the database and run with `CALL`. It reduces network traffic, centralizes logic and can be secured.

```sql
DELIMITER //                                   -- tell the client that ';' inside the body does not end the statement
CREATE PROCEDURE UpdateSalary(IN p_id INT, IN p_amt DECIMAL(10,2))
BEGIN
  UPDATE employee SET salary = salary + p_amt WHERE emp_id = p_id;
END //
CREATE PROCEDURE GetName(IN p_id INT, OUT p_name VARCHAR(30))      -- OUT parameter = "return value"
BEGIN
  SELECT first_name INTO p_name FROM employee WHERE emp_id = p_id;
END //
DELIMITER ;

CALL UpdateSalary(2, 500);            -- John 90000 → 90500
CALL GetName(6, @n); SELECT @n;       -- Meera
```
| Parameter mode | Meaning |
|---|---|
| `IN` | input (default) |
| `OUT` | the procedure assigns it and the caller reads it |
| `INOUT` | both |

A **function** (`CREATE FUNCTION ... RETURNS type`) **returns one value** and can be used inside `SELECT`; a procedure is called with `CALL`. **Oracle (not run here):**

```sql
CREATE OR REPLACE PROCEDURE update_salary (p_id IN NUMBER, p_amt IN NUMBER) AS
BEGIN
  UPDATE employee SET salary = salary + p_amt WHERE emp_id = p_id;
  COMMIT;
END;
/
EXEC update_salary(2, 500);     -- or  BEGIN update_salary(2, 500); END;
```
(Oracle uses `IS/AS` instead of MySQL's `BEGIN` directly after the signature, `SELECT ... INTO var FROM ...`, and `/` to run the block.)

### Indexes (verified)

An **index** is a separate sorted structure (a **B-tree**) that lets the database find rows **without scanning the whole table**, like a book's index. Primary and unique keys get one automatically.

```sql
CREATE INDEX idx_emp_sal ON employee (salary);       -- creating an index (on Emp_id, salary, ...)
SHOW INDEX FROM employee;                            -- BTREE
EXPLAIN SELECT * FROM employee WHERE emp_id = 3;     -- type = const, key = PRIMARY, rows = 1
EXPLAIN SELECT * FROM employee WHERE salary > 100000;-- type = range, key = idx_emp_sal  (used the new index)
DROP INDEX idx_emp_sal ON employee;                  -- Oracle: DROP INDEX idx_emp_sal;
```
**Usage:** index columns used in `WHERE`, `JOIN ... ON`, `ORDER BY`. **Cost:** extra disk space and **slower `INSERT/UPDATE/DELETE`** (the index must be updated). Not helpful on tiny tables, low-selectivity columns (gender), or `LIKE '%text'`, or when you wrap the column in a function (`WHERE UPPER(name) = ...`). **Oracle (not run here):** same `CREATE INDEX`; `EXPLAIN PLAN FOR ...` then `SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);`.

### Triggers (verified, MySQL)

A **trigger** is code that runs **automatically** before/after an `INSERT`, `UPDATE` or `DELETE` on a table. `NEW` = the new row values, `OLD` = the old row values.

```sql
CREATE TABLE stock (product_id INT PRIMARY KEY, qty INT);       INSERT INTO stock VALUES (1,100),(2,50);
CREATE TABLE orders_t (oid INT PRIMARY KEY AUTO_INCREMENT, product_id INT, qty INT);

DELIMITER //
CREATE TRIGGER trg_before BEFORE INSERT ON orders_t FOR EACH ROW        -- BEFORE: validate / change NEW values
BEGIN
  IF NEW.qty <= 0 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'qty must be positive'; END IF;
END //
CREATE TRIGGER trg_after_ins AFTER INSERT ON orders_t FOR EACH ROW      -- AFTER INSERT: reduce stock ("UpdateQty")
BEGIN UPDATE stock SET qty = qty - NEW.qty WHERE product_id = NEW.product_id; END //
CREATE TRIGGER trg_after_del AFTER DELETE ON orders_t FOR EACH ROW      -- AFTER DELETE: put the stock back
BEGIN UPDATE stock SET qty = qty + OLD.qty WHERE product_id = OLD.product_id; END //
DELIMITER ;
```
Results (verified): `INSERT INTO orders_t (product_id,qty) VALUES (1,10)` → stock of product 1 became **90**; `... VALUES (1,0)` → `ERROR 1644 (45000): qty must be positive` (the `BEFORE` trigger rejected it); `DELETE FROM orders_t WHERE oid=1` → stock back to **100**.

| | `BEFORE` trigger | `AFTER` trigger |
|---|---|---|
| Runs | before the row is written | after the row is written |
| Typical use | validation, default/derived values, **modify `NEW`** | audit logs, updating other tables (stock), notifications |

Triggers can be hard to debug (hidden logic) and add cost to every DML: use them for integrity/audit, not for general business logic. **Oracle (not run here):** `CREATE OR REPLACE TRIGGER trg BEFORE INSERT ON orders_t FOR EACH ROW BEGIN IF :NEW.qty <= 0 THEN RAISE_APPLICATION_ERROR(-20001,'qty must be positive'); END IF; END;` (note the **colon** in `:NEW`/`:OLD`).

## 20.5 Design: dependencies, anomalies, ER diagrams, normalization

### Functional dependencies

`A → B` means: **the value of A determines the value of B** (`emp_id → name`).

| Dependency | Meaning | Example |
|---|---|---|
| **Full / functional** | non-key column depends on the **whole** key | `emp_id → salary` |
| **Partial dependency** | a non-key column depends on **part of a composite key** | key `(order_id, product_id)`, but `product_name` depends only on `product_id` |
| **Transitive dependency** | non-key depends on another **non-key** column | `emp_id → dept_id → dept_name` (`dept_name` depends on `dept_id`, not directly on `emp_id`) |

### Anomalies in a badly designed table

Table `emp_dept(emp_id, emp_name, dept_id, dept_name)`: department data is repeated in every employee row.

| Anomaly | What goes wrong |
|---|---|
| **Insertion anomaly** | You cannot add a new department until it has an employee (no row to hold it), or you must invent a dummy employee |
| **Update anomaly** | Renaming `IT` requires changing **every** row; miss one and the data is inconsistent |
| **Deletion anomaly** | Deleting the last employee of a department also **erases the department's information** |

The cure is **normalization**: split into `employee(emp_id, emp_name, dept_id)` and `department(dept_id, dept_name)` with a foreign key, exactly like the sample database.

### ER (Entity-Relationship) diagrams

An **ER diagram** is a picture of the data model before building tables.

| Symbol | Meaning |
|---|---|
| **Rectangle** | **Entity** (a thing: Employee, Department) |
| **Double rectangle** | **Weak entity** (cannot be identified without its owner, e.g. `Dependent` of `Employee`) |
| **Ellipse / oval** | **Attribute** (a property: name, salary) |
| **Underlined attribute** | **Primary key** |
| **Ellipse made of smaller ellipses** | **Composite attribute** (`address` → street, city, pin) |
| **Double ellipse** | Multivalued attribute (`phone numbers`) |
| **Dashed ellipse** | Derived attribute (`age` from date of birth) |
| **Diamond** | **Relationship** (works_in, enrolls) |
| **A solid line** | Connects entities, attributes and relationships; labels like `1`, `N`, `M` give **cardinality** (one-to-one, one-to-many, many-to-many) |

**Converting to tables:** each entity → a table; each attribute → a column; primary key underlined → `PRIMARY KEY`; one-to-many → a foreign key on the "many" side; **many-to-many → a third (junction) table** holding both keys (`enrollment(student_id, course_id)`).

### Normalization (Interview Imp)

**Normalization** organizes tables to **reduce redundancy and anomalies**. Each **normal form (NF)** builds on the previous one.

| Normal form | Requirement | Fix when violated |
|---|---|---|
| **1NF** | Every column holds **atomic (single) values**; no repeating groups or lists; each row is unique (has a key) | Put each value in its own row/column (`phones = '111,222'` → separate rows/table) |
| **2NF** | 1NF **and no partial dependency** (every non-key column depends on the **whole** primary key) | Move columns that depend on part of the key into their own table |
| **3NF** | 2NF **and no transitive dependency** (non-key columns depend **only on the key**) | Move `dept_name` out into `department(dept_id, dept_name)` |
| **BCNF** (Boyce-Codd) | For every dependency `A → B`, **A is a candidate (super) key**: a stricter 3NF | Decompose so every determinant is a key |

**Worked example.** `orders_raw(order_id, customer, phones, product, qty, product_price)`:

1. `phones` holds `'111,222'` → **not 1NF** → give each phone its own row or a `customer_phone` table.
2. Key `(order_id, product)`; `product_price` depends only on `product` (**partial dependency**) → **not 2NF** → move to `products(product, price)`.
3. If `customer_city` depends on `customer` (a non-key) → **transitive** → **not 3NF** → move to `customers(customer, city)`.
4. Result: `orders`, `order_items`, `products`, `customers`, `customer_phone`: small tables joined by keys.

Trade-off: more tables mean more joins; sometimes systems **denormalize** deliberately (reporting, caching) for speed. Normalize first, denormalize only with a measured reason.

**Database clients (again):** a client such as Workbench/DBeaver also shows the **ER diagram** (reverse engineering) and the table designer; use it to check your design.

---

# 21. Syllabus Coverage Map

| Module in your list | Section |
|---|---|
| Understanding Data (data, structured / unstructured / semi-structured, "new fuel") | 1 |
| Introduction to Databases (database, DBMS, RDBMS, relational vs non-relational, schemas, SQL, SQL uses, properties) | 2 |
| Setting up the stage: schema design, SQL tasks, installing MySQL and Oracle, clients | 2.4, 3 |
| Creating a database and table; `CREATE` keyword, syntax, data types, enclosures; inserting data | 4 |
| SQL Query Essentials: projection and selection, `SELECT`, `WHERE` | 5 |
| Understanding SQL data types in MySQL and Oracle (INT, CHAR/VARCHAR, DECIMAL, DATE/DATETIME, NUMBER, VARCHAR2, Oracle date format) | 6 |
| Case sensitivity (keywords, tables, columns, Oracle queries) | 7 |
| SQL aliases (table/column, MySQL and Oracle, double quotes, scope) | 8 |
| Database integrity: constraints (PK, UNIQUE, NOT NULL, DEFAULT, CHECK, FK and relationships) | 9 |
| SQL operators: arithmetic, comparison, logical, `BETWEEN`, `IN`, `IS NULL`, `LIKE`, `DISTINCT`/`UNIQUE` | 10-11 |
| `LIMIT`, `OFFSET`, pagination | 12 |
| SQL functions: single-row (string, number, date/time, control flow), multi-row | 13 |
| Oracle functions, the `DUAL` table, `NVL`/`NVL2`/`TO_DATE`/`TO_CHAR` | 14 |
| Structuring data with SQL: `GROUP BY`, `HAVING`, all `SELECT` clauses | 15 |
| Mastering subqueries | 16 |
| Mastering SQL joins | 17 |
| Common Table Expressions | 18 |
| SQL commands: DDL, DML, TCL, DCL | 19 |
| Database objects: views, synonyms, sequences, stored procedures, indexes, triggers | 20.1-20.4 |
| Database design: dependencies, anomalies, ER diagrams, normalization (1NF-BCNF) | 20.5 |

### Practice-title patterns, quick answer key

| Practice title pattern in your list | Query shape |
|---|---|
| "Retrieve / project / list ..." | `SELECT col1, col2 FROM t` |
| "... with a specific / threshold ..." | add `WHERE col <op> value` |
| "Between ... / age range / salary range" | `BETWEEN a AND b` (inclusive) |
| "Specific ages / exact grades / categories" | `IN (...)`; "excluding" → `NOT IN (...)` |
| "Missing / not booked / without ..." | `IS NULL` or `LEFT JOIN ... WHERE right.id IS NULL` or `NOT EXISTS` |
| "Starting with / ending with / containing / N-character" | `LIKE 'x%'`, `'%x'`, `'%x%'`, `'____'` |
| "Unique / distinct ..." | `SELECT DISTINCT col` |
| "First N / skip N / records N to M" | `ORDER BY ... LIMIT n OFFSET m` |
| "Total / count / average / min / max per ..." | aggregate + `GROUP BY` (+ `HAVING` to filter groups) |
| "... greater than the average / highest / second highest" | scalar subquery, or `ORDER BY ... LIMIT 1 OFFSET n-1` |
| "Employees with their department names" | `JOIN department ON ...` |
| "Pairs / co-passengers / same department" | self join with `a.id < b.id` |
| "Convert / pad / trim / reverse / length / position" | the string functions in 13.1 |
| "Add days / months / difference in hours" | `DATE_ADD`, `TIMESTAMPDIFF` (Oracle: `+`, `ADD_MONTHS`, `MONTHS_BETWEEN`) |
| "Create user / grant / revoke / drop user" | 19.4 |
| "Commit / rollback / savepoint" | 19.3 |
| "UpdateQty trigger (insert / delete)" | 20.4 triggers |

---

# 22. Interview Questions

| Level | Question | Short answer |
|---|---|---|
| Basic | What is the difference between DBMS and RDBMS? | RDBMS stores data in related tables with keys and constraints; a plain DBMS may not. |
| Basic | `DELETE` vs `TRUNCATE` vs `DROP`? | Remove chosen rows (DML, rollback-able) / remove all rows fast (DDL) / remove the table. |
| Basic | `WHERE` vs `HAVING`? | `WHERE` filters rows before grouping; `HAVING` filters groups after, and may use aggregates. |
| Basic | Primary key vs unique key? | One primary key per table, no `NULL`; many unique keys, `NULL` allowed. |
| Basic | `CHAR` vs `VARCHAR`? | Fixed vs variable length. |
| Basic | `COUNT(*)` vs `COUNT(col)`? | All rows vs non-NULL values of `col`. |
| Mid | Why does `NOT IN` sometimes return nothing? | A `NULL` in the list makes every comparison unknown; use `NOT EXISTS`. |
| Mid | `UNION` vs `UNION ALL`? | `UNION` removes duplicates (slower); `UNION ALL` keeps them. |
| Mid | `INNER` vs `LEFT` join? | Matching rows only vs all left rows plus matches. |
| Mid | What is a foreign key? | A column referencing another table's key; enforces referential integrity. |
| Mid | What is the logical order of a `SELECT`? | FROM, WHERE, GROUP BY, HAVING, SELECT, DISTINCT, ORDER BY, LIMIT. |
| Mid | `ROLLBACK` after `COMMIT`? | Cannot undo committed work. |
| Mid | Does DDL roll back? | No: DDL commits implicitly (MySQL and Oracle). |
| Advanced | What is an index and its cost? | B-tree lookup structure; speeds reads, slows writes, uses space. |
| Advanced | View vs materialized view? | Stored query without data vs stored query with stored results. |
| Advanced | Procedure vs function vs trigger? | Called with `CALL`, no required return / returns one value, used in SQL / fires automatically on DML. |
| Advanced | Explain 1NF, 2NF, 3NF, BCNF. | Atomic values / no partial dependency / no transitive dependency / every determinant is a key. |
| Advanced | ACID? | Atomicity, Consistency, Isolation, Durability. |
| Advanced | Find the Nth highest salary. | `ORDER BY salary DESC LIMIT 1 OFFSET N-1`, or `DENSE_RANK()` window function. |
| Advanced | MySQL vs Oracle differences? | `LIMIT` vs `FETCH FIRST`; `AUTO_INCREMENT` vs sequence; `VARCHAR` vs `VARCHAR2`; `IFNULL` vs `NVL`; `DUAL`; Oracle `''` is `NULL`; case-sensitive text in Oracle. |

---

# 23. Cheat Sheet

```text
DATA        structured (tables) | semi (JSON/XML) | unstructured (media, text)         RDBMS: tables+keys  NoSQL: flexible
DDL         CREATE ALTER DROP TRUNCATE      DML  INSERT UPDATE DELETE      DQL SELECT
TCL         COMMIT ROLLBACK SAVEPOINT       DCL  GRANT REVOKE (CREATE USER)
SELECT      SELECT cols FROM t [JOIN ...] WHERE row-filter GROUP BY cols HAVING group-filter ORDER BY cols LIMIT n OFFSET m
ORDER       FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT
FILTER      = <> < > <= >=  AND OR NOT  BETWEEN a AND b (inclusive)  IN (..)  IS NULL  LIKE 'a%' '_x' '%x%'
NULL        = NULL is never true → IS NULL ; NOT IN with a NULL returns nothing ; aggregates ignore NULL ; COUNT(*) counts rows
CONSTRAINTS PRIMARY KEY (unique+not null, 1) | UNIQUE | NOT NULL | DEFAULT | CHECK | FOREIGN KEY (child → parent)
STRINGS     UPPER LOWER LENGTH REVERSE CONCAT SUBSTR(s,pos,len) INSTR LEFT RIGHT LPAD RPAD TRIM ASCII
NUMBERS     MOD ABS ROUND TRUNCATE POWER SQRT CEIL FLOOR      (ROUND(2.5)=3 ROUND(-2.5)=-3 CEIL(-4.1)=-4 FLOOR(-4.1)=-5)
DATES       NOW CURDATE CURTIME DATE() TIME() DATE_ADD(d,INTERVAL n unit) TIMESTAMPDIFF(unit,a,b) DAY MONTH YEAR DAYNAME
CONTROL     IF IFNULL COALESCE NULLIF CASE      Oracle: NVL NVL2 DECODE TO_DATE TO_CHAR ADD_MONTHS MONTHS_BETWEEN INITCAP DUAL
JOINS       INNER (matches) LEFT (all left) RIGHT (all right) FULL (both; MySQL = LEFT UNION RIGHT) CROSS (all pairs) SELF (alias twice)
SUBQUERY    scalar (=) | list (IN/ANY/ALL) | row ((a,b) IN) | correlated | EXISTS | derived table (needs alias)
CTE         WITH name AS (query) [, name2 AS (...)] SELECT ... ;  lives for one statement
OBJECTS     VIEW (stored query) | SYNONYM (Oracle alias) | SEQUENCE (Oracle; MySQL AUTO_INCREMENT) | INDEX (B-tree) | PROCEDURE | TRIGGER
NORMAL      1NF atomic | 2NF no partial dep | 3NF no transitive dep | BCNF every determinant is a key
ER          rectangle=entity  double rectangle=weak entity  ellipse=attribute (underline=PK)  diamond=relationship  line=connection
SAFETY      UPDATE/DELETE need WHERE · SELECT first · transactions for multi-step changes · least-privilege users · PreparedStatement from code
```
