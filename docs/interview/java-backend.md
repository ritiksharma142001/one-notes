---
title: Java & Spring interview questions
sidebar_position: 1
description: The questions asked most in Java backend interviews, with short, correct answers — core Java, OOP, collections, concurrency, Java 8+, JVM and Spring Boot.
---

Short answers you can say out loud. Follow the links for depth.

## Core Java

<details>
<summary><b>Why is Java platform independent?</b></summary>

`javac` compiles source into **bytecode** (`.class`), which runs on any OS that has a **JVM**. The JVM itself is platform-specific. → [JDK, JRE & JVM](../core-java/basics/jre.md)
</details>

<details>
<summary><b>JDK vs JRE vs JVM?</b></summary>

JVM runs bytecode. JRE = JVM + core libraries (enough to run). JDK = JRE + tools like `javac`, `jar`, `jshell` (needed to develop).
</details>

<details>
<summary><b><code>==</code> vs <code>equals()</code>?</b></summary>

`==` compares references (or primitive values); `equals()` compares content as defined by the class. `String`, wrappers and records override `equals`.
</details>

<details>
<summary><b>Why is String immutable?</b></summary>

Safe sharing in the **string pool**, thread safety, cached `hashCode` (great as `HashMap` keys) and security (class names, URLs, file paths can't be changed after validation). → [Strings](../core-java/strings/strings.md)
</details>

<details>
<summary><b>String vs StringBuilder vs StringBuffer?</b></summary>

String is immutable. StringBuilder is mutable and fast (not thread-safe). StringBuffer is mutable and synchronised (slower). Use StringBuilder in loops.
</details>

<details>
<summary><b>What is the <code>equals</code>/<code>hashCode</code> contract?</b></summary>

Equal objects **must** have equal hash codes. Override both together — otherwise `HashMap`/`HashSet` can't find your objects.
</details>

<details>
<summary><b><code>final</code>, <code>finally</code>, <code>finalize</code>?</b></summary>

`final`: can't reassign / override / extend. `finally`: block that always runs after try/catch. `finalize`: deprecated GC hook — don't use it; use try-with-resources / `Cleaner`.
</details>

<details>
<summary><b>Checked vs unchecked exceptions?</b></summary>

Checked (`IOException`, `SQLException`) must be declared or caught — compile-time. Unchecked (`RuntimeException` subclasses like `NullPointerException`, `IllegalArgumentException`) don't. → [Exception handling](../core-java/exceptions/exception-handling.md)
</details>

<details>
<summary><b>static keyword?</b></summary>

Belongs to the class, not instances: shared fields, utility methods, static nested classes, static blocks that run once at class load. Static methods can't use `this` or be overridden (only hidden).
</details>

<details>
<summary><b>Pass by value or reference?</b></summary>

Always **by value**. For objects, the value copied is the reference — you can mutate the object, but reassigning the parameter doesn't affect the caller.
</details>

## OOP

<details>
<summary><b>The four pillars?</b></summary>

**Encapsulation** (hide state behind methods), **Inheritance** (reuse via `extends`), **Polymorphism** (one interface, many forms — overloading & overriding), **Abstraction** (expose what, hide how — interfaces/abstract classes). → [OOP](../core-java/oops/class-object.md)
</details>

<details>
<summary><b>Abstract class vs interface?</b></summary>

Abstract class: state (fields), constructors, single inheritance — for a common base with shared code. Interface: a contract, multiple inheritance, `default`/`static`/`private` methods since Java 8/9, no instance state. → [Abstraction](../core-java/oops/abstraction.md)
</details>

<details>
<summary><b>Overloading vs overriding?</b></summary>

Overloading: same name, different parameters, same class — resolved at **compile time**. Overriding: subclass redefines a parent method with the same signature — resolved at **run time** (dynamic dispatch).
</details>

<details>
<summary><b>Composition vs inheritance?</b></summary>

Prefer composition ("has-a") — it's flexible and avoids fragile base classes. Use inheritance only for a true "is-a" relationship.
</details>

<details>
<summary><b>SOLID?</b></summary>

**S**ingle responsibility · **O**pen for extension, closed for modification · **L**iskov substitution (subtypes usable wherever the parent is) · **I**nterface segregation (small, focused interfaces) · **D**ependency inversion (depend on abstractions — what Spring DI gives you).
</details>

## Collections

<details>
<summary><b>How does HashMap work?</b></summary>

An array of buckets. `hashCode()` (spread) picks the bucket; `equals()` finds the key inside it. Collisions are chained in a linked list, converted to a **red-black tree** when a bucket has more than 8 entries (Java 8+). It **resizes** (doubles) when size exceeds capacity × load factor (0.75). Average O(1), worst O(log n). → [Map](../core-java/collections/map.md)
</details>

<details>
<summary><b>ArrayList vs LinkedList?</b></summary>

ArrayList: dynamic array, O(1) random access, amortised O(1) append, cache-friendly — the default choice. LinkedList: O(1) insert/remove at the ends via iterator, O(n) access — rarely faster in practice.
</details>

<details>
<summary><b>HashMap vs Hashtable vs ConcurrentHashMap?</b></summary>

HashMap: not thread-safe, allows one null key. Hashtable: legacy, fully synchronised, no nulls. ConcurrentHashMap: thread-safe with fine-grained locking/CAS, high concurrency, no nulls.
</details>

<details>
<summary><b>HashSet vs LinkedHashSet vs TreeSet?</b></summary>

No order (O(1)) vs insertion order (O(1)) vs sorted (O(log n), needs `Comparable` or a `Comparator`).
</details>

<details>
<summary><b>Comparable vs Comparator?</b></summary>

`Comparable.compareTo` = the natural order inside the class. `Comparator` = external, many possible orders: `Comparator.comparing(User::getAge).thenComparing(User::getName)`.
</details>

<details>
<summary><b>Fail-fast vs fail-safe iterators?</b></summary>

Fail-fast (ArrayList, HashMap) throw `ConcurrentModificationException` if the collection is structurally modified during iteration. Fail-safe (CopyOnWriteArrayList, ConcurrentHashMap) iterate over a snapshot/weakly consistent view. → [Concurrent modification](../core-java/collections/concurrent-modification.md)
</details>

## Concurrency

<details>
<summary><b>Ways to create a thread?</b></summary>

Extend `Thread`, implement `Runnable` or `Callable`, or — preferred — submit tasks to an `ExecutorService`. Java 21: **virtual threads** (`Executors.newVirtualThreadPerTaskExecutor()`) for massive I/O concurrency. → [Threads](../core-java/multithreading/threads.md)
</details>

<details>
<summary><b><code>synchronized</code> vs <code>volatile</code>?</b></summary>

`volatile` guarantees **visibility** (and ordering) of a single variable, not atomicity. `synchronized` gives mutual exclusion **and** visibility. For counters use `AtomicInteger`/`LongAdder`.
</details>

<details>
<summary><b><code>wait()</code> vs <code>sleep()</code>?</b></summary>

`wait()` releases the monitor and waits for `notify`; must be called inside `synchronized`. `sleep()` pauses the thread and keeps any locks.
</details>

<details>
<summary><b>What is a deadlock and how do you avoid it?</b></summary>

Two threads each hold a lock the other needs. Avoid with a consistent lock order, `tryLock` with timeouts, and fewer/shorter locks.
</details>

<details>
<summary><b>Runnable vs Callable? Future vs CompletableFuture?</b></summary>

Callable returns a value and can throw checked exceptions. `Future.get()` blocks; `CompletableFuture` composes async steps (`thenApply`, `thenCompose`, `allOf`) without blocking.
</details>

## Java 8+

<details>
<summary><b>What's a functional interface?</b></summary>

An interface with exactly one abstract method (`Runnable`, `Comparator`, `Function`, `Predicate`, `Supplier`, `Consumer`) — the target type of a lambda.
</details>

<details>
<summary><b><code>map</code> vs <code>flatMap</code>? Intermediate vs terminal operations?</b></summary>

`map` transforms each element one-to-one; `flatMap` maps each element to a stream and flattens them. Intermediate ops (`filter`, `map`, `sorted`) are lazy; nothing runs until a terminal op (`collect`, `forEach`, `reduce`, `count`). → [Stream API](../core-java/streams/stream-api.md)
</details>

<details>
<summary><b>Optional — why?</b></summary>

Makes "may be absent" explicit in return types: `findById(id).map(User::name).orElse("guest")`. Don't use it for fields or parameters.
</details>

<details>
<summary><b>Newer features worth mentioning?</b></summary>

`var` (10), text blocks (15), **records** (16), pattern matching for `instanceof` (16), **sealed** classes (17), **switch pattern matching** and **virtual threads** (21), sequenced collections (21).
</details>

## JVM

<details>
<summary><b>JVM memory areas?</b></summary>

**Heap** (objects; young & old generations), **stack** (per thread: frames, local variables), **metaspace** (class metadata), PC register, native method stack. `StackOverflowError` = stack too deep; `OutOfMemoryError` = heap/metaspace full.
</details>

<details>
<summary><b>How does garbage collection work?</b></summary>

Objects unreachable from GC roots are collected. Most objects die young, so the heap is generational: frequent minor GCs in the young generation, rarer major GCs in the old. Default collector: **G1**; low-pause options: ZGC, Shenandoah.
</details>

<details>
<summary><b>Class loading?</b></summary>

Bootstrap → Platform → Application class loaders, using **parent delegation** (ask the parent first). Steps: load → link (verify, prepare, resolve) → initialise (static blocks).
</details>

## Spring Boot

<details>
<summary><b>IoC and dependency injection?</b></summary>

The container creates and wires objects (beans) instead of your code calling `new`. Prefer constructor injection. → [Spring & Spring Boot](../advanced-java/spring-boot.md)
</details>

<details>
<summary><b>What does <code>@SpringBootApplication</code> do?</b></summary>

`@Configuration` + `@EnableAutoConfiguration` (conditional beans based on the classpath and properties) + `@ComponentScan` (finds your `@Component`s in this package and below).
</details>

<details>
<summary><b>Bean scopes?</b></summary>

singleton (default), prototype, request, session, application. Singleton beans must be stateless or thread-safe.
</details>

<details>
<summary><b>How does <code>@Transactional</code> work, and when does it fail?</b></summary>

A proxy opens a transaction before the method and commits/rolls back after. It's skipped for **self-invocation** (calling from the same class) and for non-public methods; checked exceptions don't roll back by default.
</details>

<details>
<summary><b>How do you handle errors in a REST API?</b></summary>

`@RestControllerAdvice` with `@ExceptionHandler` methods returning consistent `ProblemDetail` responses; validate input with `@Valid` and Bean Validation annotations.
</details>

<details>
<summary><b>How do you secure a REST API?</b></summary>

Spring Security filter chain, stateless JWT (or OAuth2 resource server), role checks with `requestMatchers(...).hasRole()` or `@PreAuthorize`, BCrypt passwords, HTTPS, CORS allow-list, input validation, rate limiting.
</details>

<details>
<summary><b>What is the N+1 query problem?</b></summary>

Loading N parents then lazily loading each child = N+1 queries. Fix with `JOIN FETCH`, `@EntityGraph` or batch fetching. → [JPA & Hibernate](../advanced-java/jpa-hibernate.md#the-n1-problem)
</details>

<details>
<summary><b>Microservices vs monolith?</b></summary>

Start with a well-structured **modular monolith**. Split into services when teams or scaling needs demand it — microservices add network calls, distributed transactions (sagas), service discovery, tracing and ops overhead.
</details>
