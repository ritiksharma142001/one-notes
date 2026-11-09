---
format: md
---

# 🌊 Java Stream API: Complete Reference

> A comprehensive guide to Java's Stream API from basics to advanced usage.

## 🎯 What is a Stream?

A **Stream** in Java is a sequence of data that supports:
- **Declarative** processing (what you want, not how to do it)
- **Functional-style** operations (map, filter, reduce)
- **Lazy evaluation** (computations only happen when needed)
- **Parallel processing** capability

### Stream vs Collection

| Aspect | Collection | Stream |
|--------|------------|--------|
| **Storage** | Yes - stores data in memory | No - computes data on demand |
| **Memory** | Memory-intensive | Memory-efficient (lazy) |
| **Iteration** | External iteration | Internal iteration |
| **Operations** | Add/remove/modify elements | Transform/filter/query |
| **Reusability** | Can iterate multiple times | Single-use pipeline |
| **Parallel processing** | Manual | Built-in (.parallel()) |

---

## 🛠️ Creating Streams

### From Collections
```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
Stream<String> stream = names.stream();

// Parallel stream
Stream<String> parallel = names.parallelStream();
```

### From Arrays
```java
String[] array = {"Java", "Python", "JavaScript"};
Stream<String> arrayStream = Arrays.stream(array);

// Range
IntStream.range(1, 10);        // 1 to 9
IntStream.rangeClosed(1, 10);  // 1 to 10
```

### Static Factory Methods
```java
Stream.of("Hello", "World");           // Fixed set of elements
Stream.empty();                        // Empty stream
Stream.generate(Math::random);         // Infinite stream
Stream.iterate(1, n -> n * 2);         // Iterative infinite stream
```

### From Files
```java
Path path = Paths.get("data.txt");
try (Stream<String> lines = Files.lines(path)) {
    lines.filter(line -> line.contains("error"))
         .forEach(System.out::println);
}
```

---

## ⚡ Stream Operations

### Intermediate Operations (Lazy - return Stream)

| Operation | Purpose | Example |
|-----------|---------|---------|
| `filter()` | Keep elements matching predicate | `stream.filter(x -> x > 5)` |
| `map()` | Transform each element | `stream.map(String::toUpperCase)` |
| `sorted()` | Sort elements | `stream.sorted()` |
| `distinct()` | Remove duplicates | `stream.distinct()` |
| `limit()` | Take first N elements | `stream.limit(5)` |
| `skip()` | Skip first N elements | `stream.skip(3)` |
| `flatMap()` | Flatten nested structures | `stream.flatMap(list -> list.stream())` |
| `peek()` | Debug without modifying | `stream.peek(System.out::println)` |

### Terminal Operations (Eager - produce result)

| Operation | Purpose | Return Type |
|-----------|---------|-------------|
| `forEach()` | Apply action to each element | `void` |
| `collect()` | Gather results into collection | `Collection<T>` |
| `reduce()` | Combine elements | `T` |
| `count()` | Count elements | `long` |
| `min()/max()` | Find extremum | `Optional<T>` |
| `anyMatch()` | Test if any element matches | `boolean` |
| `allMatch()` | Test if all elements match | `boolean` |
| `noneMatch()` | Test if no elements match | `boolean` |
| `findFirst()` | Find first matching element | `Optional<T>` |
| `findAny()` | Find any matching element | `Optional<T>` |

---

## 📦 Collectors Reference

### Basic Collectors

| Collector | Purpose | Return Type |
|-----------|---------|-------------|
| `toList()` | Collect to List | `List<T>` |
| `toSet()` | Collect to Set | `Set<T>` |
| `toMap()` | Collect to Map | `Map<K,V>` |
| `toCollection()` | Collect to specific collection | `Collection<T>` |
| `joining()` | Join elements into String | `String` |
| `counting()` | Count elements | `Long` |
| `summarizingInt()` | Statistical summary | `IntSummaryStatistics` |

### Grouping & Partitioning Collectors

| Collector | Purpose | Return Type |
|-----------|---------|-------------|
| `groupingBy()` | Group by classifier function | `Map<K, List<T>>` |
| `groupingBy()` with downstream | Group with aggregation | `Map<K, R>` |
| `partitioningBy()` | Partition into two groups | `Map<Boolean, List<T>>` |
| `partitioningBy()` with downstream | Partition with aggregation | `Map<Boolean, R>` |
| `mapping()` | Apply mapping function | `Map<K, List<R>>` |
| `filtering()` | Apply filter during collection | `Map<K, List<T>>` |

---

## 🔧 Complete Method Comparison Table

| Operation Type | Category | Method | Purpose | Signature | Example |
|----------------|----------|--------|---------|-----------|---------|
| **Intermediate** | Transformation | `map` | Transform each element | `map(Function<? super T,? extends R>)` | `.map(String::toUpperCase)` |
| **Intermediate** | Filtering | `filter` | Keep matching elements | `filter(Predicate<? super T>)` | `.filter(x -> x > 5)` |
| **Intermediate** | Sorting | `sorted` | Sort elements | `sorted()`, `sorted(Comparator)` | `.sorted(Comparator.naturalOrder())` |
| **Intermediate** | Deduplication | `distinct` | Remove duplicates | `distinct()` | `.distinct()` |
| **Intermediate** | Limiting | `limit` | Take first N | `limit(long maxSize)` | `.limit(10)` |
| **Intermediate** | Skipping | `skip` | Skip first N | `skip(long n)` | `.skip(5)` |
| **Intermediate** | Flattening | `flatMap` | Flatten nested streams | `flatMap(Function)` | `.flatMap(s -> Arrays.stream(s.split(",")))` |
| **Intermediate** | Debugging | `peek` | Inspect without modifying | `peek(Consumer)` | `.peek(System.out::println)` |
| **Terminal** | Iteration | `forEach` | Apply action | `forEach(Consumer)` | `.forEach(System.out::println)` |
| **Terminal** | Collection | `collect` | Gather results | `collect(Collector)` | `.collect(Collectors.toList())` |
| **Terminal** | Reduction | `reduce` | Combine elements | `reduce(BinaryOperator)` | `.reduce(0, Integer::sum)` |
| **Terminal** | Counting | `count` | Count elements | `count()` | `.count()` |
| **Terminal** | Extremum | `min/max` | Find min/max | `min/max(Comparator)` | `.max(Comparator.naturalOrder())` |
| **Terminal** | Matching | `anyMatch` | Test if any match | `anyMatch(Predicate)` | `.anyMatch(s -> s.startsWith("A"))` |
| **Terminal** | Matching | `allMatch` | Test if all match | `allMatch(Predicate)` | `.allMatch(s -> s.length() > 3)` |
| **Terminal** | Matching | `noneMatch` | Test if none match | `noneMatch(Predicate)` | `.noneMatch(s -> s.isEmpty())` |
| **Terminal** | Finding | `findFirst` | Find first element | `findFirst()` | `.findFirst()` |
| **Terminal** | Finding | `findAny` | Find any element | `findAny()` | `.findAny()` |
| **Collector** | Collection | `toList` | Collect to List | `toList()` | `.collect(Collectors.toList())` |
| **Collector** | Collection | `toSet` | Collect to Set | `toSet()` | `.collect(Collectors.toSet())` |
| **Collector** | Collection | `toMap` | Collect to Map | `toMap(keyMapper, valueMapper)` | `.collect(Collectors.toMap(Person::getName, Person::getAge))` |
| **Collector** | Grouping | `groupingBy` | Group by function | `groupingBy(Function)` | `.collect(Collectors.groupingBy(Employee::getDepartment))` |
| **Collector** | Grouping | `groupingBy` w/ downstream | Group with aggregation | `groupingBy(Function, Collector)` | `.collect(Collectors.groupingBy(Employee::getDepartment, Collectors.counting()))` |
| **Collector** | Partitioning | `partitioningBy` | Partition by predicate | `partitioningBy(Predicate)` | `.collect(Collectors.partitioningBy(s -> s.length() > 5))` |
| **Collector** | Joining | `joining` | Join elements | `joining()`, `joining(separator)` | `.collect(Collectors.joining(", "))` |
| **Collector** | Statistics | `summarizingInt` | Int summary stats | `summarizingInt(ToIntFunction)` | `.collect(Collectors.summarizingInt(Employee::getSalary))` |

---

## 💡 Code Examples

### Basic Filtering and Transformation
```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

// Traditional approach
List<String> result = new ArrayList<>();
for (String name : names) {
    if (name.length() > 4) {
        result.add(name.toUpperCase());
    }
}

// Stream approach
List<String> streamResult = names.stream()
    .filter(name -> name.length() > 4)
    .map(String::toUpperCase)
    .collect(Collectors.toList());
```

### Grouping Data
```java
class Employee {
    private String name;
    private String department;
    private int salary;
    
    // constructors, getters...
}

List<Employee> employees = Arrays.asList(
    new Employee("Alice", "IT", 70000),
    new Employee("Bob", "HR", 50000),
    new Employee("Charlie", "IT", 80000)
);

// Group employees by department
Map<String, List<Employee>> byDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::getDepartment));

// Count employees per department
Map<String, Long> countByDept = employees.stream()
    .collect(Collectors.groupingBy(
        Employee::getDepartment,
        Collectors.counting()
    ));
```

### Chaining Operations
```java
List<String> result = Arrays.asList("apple", "banana", "cherry", "date", "elderberry")
    .stream()
    .filter(fruit -> fruit.length() > 5)
    .map(String::toUpperCase)
    .sorted(Comparator.reverseOrder())
    .limit(2)
    .collect(Collectors.toList());

// Result: [ELDERBERRY, CHERRY]
```

### Parallel Streams
```java
// Sequential
List<Double> sequential = IntStream.range(0, 1_000_000)
    .mapToObj(Math::random)
    .filter(d -> d > 0.5)
    .collect(Collectors.toList());

// Parallel
List<Double> parallel = IntStream.range(0, 1_000_000)
    .parallel()
    .mapToObj(Math::random)
    .filter(d -> d > 0.5)
    .collect(Collectors.toList());
```

---

## ⚠️ Common Mistakes

### 1. Reusing Streams
```java
// ❌ WRONG - streams can only be used once!
Stream<String> stream = names.stream();
stream.forEach(System.out::println);
stream.forEach(System.out::println); // IllegalStateException!

// ✅ CORRECT
names.stream().forEach(System.out::println);
names.stream().forEach(System.out::println);
```

### 2. Side Effects in Intermediate Operations
```java
// ❌ WRONG - side effects in map()
List<String> upperCase = new ArrayList<>();
names.stream()
    .map(name -> {
        upperCase.add(name.toUpperCase()); // Side effect!
        return name.toUpperCase();
    })
    .forEach(System.out::println);

// ✅ CORRECT - use collect
List<String> upperCase = names.stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());
```

### 3. Missing Terminal Operation
```java
// ❌ WRONG - no terminal operation means no execution
names.stream()
    .filter(name -> name.startsWith("A"))
    .map(String::toUpperCase);

// ✅ CORRECT - terminal operation triggers execution
names.stream()
    .filter(name -> name.startsWith("A"))
    .map(String::toUpperCase)
    .forEach(System.out::println);
```

---

## 📊 When to Use Streams vs Loops

| Scenario | Recommendation | Reason |
|----------|----------------|---------|
| Simple indexed iteration | ✅ Loop | Direct access to indices |
| Complex data transformation | ✅ Stream | Clean, functional approach |
| Filtering with multiple conditions | ✅ Stream | Readable method chaining |
| Performance-critical tight loops | ❌ Stream | Overhead may be significant |
| Simple collection processing | ✅ Either | Both work fine |
| Parallel processing needed | ✅ Stream | Built-in parallel capabilities |
| Team unfamiliar with functional concepts | ❌ Stream | Learning curve |

---

## 🚀 Quick Reference Card

```java
// Creation
list.stream()           // Sequential stream
list.parallelStream()   // Parallel stream
Stream.of(...)          // From elements
Arrays.stream(array)    // From array
Files.lines(path)       // From file

// Intermediate
.filter(predicate)      // Filter elements
.map(function)          // Transform elements
.sorted()               // Sort elements
.distinct()             // Remove duplicates
.limit(n)               // Take first n
.skip(n)                // Skip first n
.flatMap(function)      // Flatten nested
.peek(consumer)         // Debug without modifying

// Terminal
.forEach(consumer)      // Apply action
.collect(collector)     // Convert to collection
.reduce(operator)       // Reduce to single value
.count()                // Count elements
.min/max(comparator)    // Find extremes
.anyMatch/allMatch/noneMatch(predicate)  // Boolean tests
.findFirst/findAny()    // Find elements

// Common Collectors
Collectors.toList()     // To list
Collectors.toSet()      // To set
Collectors.toMap(k, v)  // To map
Collectors.joining()    // Join strings
Collectors.groupingBy() // Group elements
Collectors.partitioningBy() // Partition elements
Collectors.summarizingInt() // Statistical summary
```

---

*See also: [Exception Handling in Java](Java_Complete_Guide.md#7-exception-handling-interview-imp) (theory and worked examples) and the practice project in `exception_handling/untitled/` (Maven, open in IntelliJ)*
