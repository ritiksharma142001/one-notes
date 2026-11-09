---
format: md
---

# Java Full Stack Syllabus Guide: From "What is Java?" to Spring Boot, JWT and Docker

> **Note**: Sections marked **(Interview Imp - Java)** are frequently asked in interviews.
>
> **What this is:** a study guide built around the full topic list you pasted (Java fundamentals → OOP → data structures and algorithms → collections → exceptions → threads → I/O → annotations → testing → JDBC → Maven → Hibernate → Servlets → Spring/Spring Boot → Spring Security → the "Sales Savvy" full-stack project → Docker). Every topic title in the list is covered in one of the sections below; section 37 maps each module to its section.
>
> **How to trust the code:** code marked **(verified)** was compiled and run on OpenJDK 17 and the output shown is real. Code that needs outside libraries (Servlets, Hibernate, Spring, JUnit, Mockito, JWT, React, Razorpay, Docker) is marked **(not compiled here)**.
>
> **Worked examples:** every core-Java section (2-28) now has numbered **Worked Examples**: a complete program you can paste into `Main.java`, followed by its exact **Output** and an **Explanation** of why each line appears. Every one of them was compiled and run, and the output was compared with the text shown. Programs that read input list it in a `// stdin:` comment. For the framework sections (29-36), the examples show realistic code together with the **HTTP request/response or console log you should expect**, clearly marked as not compiled here.
>
> **Related files:** [Java_Practice_Curriculum_Guide.md](Java_Practice_Curriculum_Guide.md) (operators, loops, number puzzles in more detail) · [Java_Handwritten_Notes.md](Java_Handwritten_Notes.md) (your notebook) · [Java_Fundamentals_Deep_Dive.md](Java_Fundamentals_Deep_Dive.md) · [Java_Complete_Guide.md](Java_Complete_Guide.md) · [Java_Collections_Framework_Guide.md](Java_Collections_Framework_Guide.md) · [java-stream-api.md](java-stream-api.md) · [00_Docker_Index.md](../docker/00_Docker_Index.md) · [React_Complete_Guide.md](../react/React_Complete_Guide.md) · [MySQL_Complete_Guide.md](../mysql/MySQL_Complete_Guide.md)

| Level | Sections |
|---|---|
| **Beginner** | 1-10 (what Java is, how it runs, variables, operators, data types, methods, control flow, patterns, number programs) |
| **Intermediate** | 11-22 (OOP in depth, arrays, `main()`, Strings) |
| **Advanced core** | 23-28 (algorithms, collections, exceptions, threads, I/O, annotations) |
| **Professional** | 29-36 (testing, JDBC, Maven, Hibernate, Servlets, Spring, Security, the full-stack project) |

---

## Table of Contents
1. [Introduction: Why Java?](#1-introduction-why-java)
2. [How a Java Program Runs](#2-how-a-java-program-runs)
3. [Variables and `var`](#3-variables-and-var)
4. [Operators](#4-operators)
5. [Data Types and Type Casting](#5-data-types-and-type-casting)
6. [Methods](#6-methods)
7. [Input, Comments and Common Beginner Errors](#7-input-comments-and-common-beginner-errors)
8. [Control Constructs](#8-control-constructs)
9. [Pattern Programs](#9-pattern-programs)
10. [Number Manipulation Programs](#10-number-manipulation-programs)
11. [OOP: Classes and Objects](#11-oop-classes-and-objects)
12. [static](#12-static)
13. [Inheritance](#13-inheritance)
14. [Polymorphism, Upcasting and Downcasting](#14-polymorphism-upcasting-and-downcasting)
15. [Abstraction: Abstract Classes and Interfaces](#15-abstraction-abstract-classes-and-interfaces)
16. [Constructors, `this`, `super`, Initialization Order](#16-constructors-this-super-initialization-order)
17. [Packages, Access Modifiers and Overriding Rules](#17-packages-access-modifiers-and-overriding-rules)
18. [Encapsulation](#18-encapsulation)
19. [Inner Classes and Lambda Expressions](#19-inner-classes-and-lambda-expressions)
20. [Design Patterns: Singleton](#20-design-patterns-singleton)
21. [Arrays (1D, 2D, 3D) and the `main()` Method](#21-arrays-1d-2d-3d-and-the-main-method)
22. [Strings](#22-strings)
23. [Algorithms: Big O, Searching, Sorting](#23-algorithms-big-o-searching-sorting)
24. [Collections Framework](#24-collections-framework)
25. [Exception Handling](#25-exception-handling)
26. [Threads and Multithreading](#26-threads-and-multithreading)
27. [File Handling, I/O Streams and Serialization](#27-file-handling-io-streams-and-serialization)
28. [Java Annotations](#28-java-annotations)
29. [Unit Testing: JUnit and Mockito](#29-unit-testing-junit-and-mockito)
30. [JDBC](#30-jdbc)
31. [Maven](#31-maven)
32. [Hibernate](#32-hibernate)
33. [Servlets](#33-servlets)
34. [Spring and Spring Boot](#34-spring-and-spring-boot)
35. [Spring Security: BCrypt, Roles, OTP, JWT](#35-spring-security-bcrypt-roles-otp-jwt)
36. [Sales Savvy: The Full-Stack Project Blueprint](#36-sales-savvy-the-full-stack-project-blueprint)
37. [Syllabus Coverage Map](#37-syllabus-coverage-map)
38. [Final Cheat Sheet and Roadmap](#38-final-cheat-sheet-and-roadmap)

---

# 1. Introduction: Why Java?

**Java** is a general-purpose, object-oriented, statically typed language created by James Gosling and team at Sun Microsystems (1995, now Oracle). Its promise: **"Write Once, Run Anywhere" (WORA)**.

| Question in the syllabus | Answer |
|---|---|
| **Why was Java developed?** | Originally (project "Green", language **Oak**) for consumer electronics: a **small, reliable, platform-independent** language that could run on many different chips. The Internet era made that portability valuable for the web. |
| **Origins** | 1991 start → 1995 public release (Java 1.0 in 1996) → Sun acquired by Oracle (2010) → a new version every 6 months; **LTS** releases 8, 11, 17, 21, 25. |
| **Core philosophy** | Simple, object-oriented, **secure**, robust (strong typing, exceptions, garbage collection), **portable**, high-performance (JIT), multithreaded. |
| **Cross-platform power** | Compile to **bytecode** once; any machine with a **JVM** runs it. Only the JVM is OS-specific. |
| **Platform independence** | The `.class` file is the same on Windows, Linux, macOS, ARM, x86. |
| **Security features** | No raw pointers, **bytecode verifier**, **class-loader isolation**, a security manager (legacy), strong typing, automatic memory management, bounds-checked arrays, and mature libraries (crypto, TLS). |
| **Versatility** | Enterprise back ends, microservices, Android (with Kotlin), big data (Hadoop, Kafka, Spark), trading systems, games servers, desktop, embedded. |
| **Enterprise apps** | The default for banks, insurance, telecom, e-commerce: Spring, Jakarta EE, Hibernate, huge ecosystem, backward compatibility. |
| **Mobile** | Android apps were Java-first (now Kotlin-first but still JVM-based). |
| **Why learn Java / career benefits** | Large job market, stable long-lived systems, strong community, transferable concepts (OOP, concurrency, JVM) to Kotlin/Scala/C#. |
| **Community perks** | Huge open-source ecosystem (Maven Central), tools, documentation, Stack Overflow, JUGs. |
| **"Intro to App Dev & Full Stack"** | **Front end** (what the user sees: HTML/CSS/JS/React) + **back end** (business logic, DB: Java/Spring) + **database** (MySQL) + **deployment** (Docker). Java is the back-end language of this stack. |

**Strengths and weaknesses**

| Strength | Weakness (and the usual answer) |
|---|---|
| Portable, mature, huge ecosystem, fast after JIT warm-up | More verbose than Python/Kotlin (records, `var`, lambdas help) |
| Strong typing catches bugs at compile time | Slower start-up and higher memory (GraalVM native image, CDS) |
| Excellent concurrency support | GC pauses (G1/ZGC reduce them) |

---

### Java versions you will meet

| Version | Year | Headline features you will use in this syllabus |
|---|---|---|
| Java 8 (LTS) | 2014 | Lambdas, Streams, `Optional`, `java.time`, default methods |
| Java 11 (LTS) | 2018 | `var` in lambdas, `String.isBlank/strip/repeat/lines`, `HttpClient`, run a single file with `java Main.java` |
| Java 17 (LTS) | 2021 | Records, sealed classes, pattern matching for `instanceof`, switch expressions, text blocks |
| Java 21 (LTS) | 2023 | Virtual threads, record patterns, pattern matching for `switch`, sequenced collections |

> **Tip:** Spring Boot 3 requires **Java 17 or later**, so Java 17 is a good baseline for the full-stack part of this syllabus.

---

# 2. How a Java Program Runs

## 2.1 What is programming? Machine vs high-level language

- A **program** is a set of instructions for a computer. **Programming** is writing them.
- A computer understands only **machine-level language (MLL)**: binary `0`/`1` (low and high voltage).
- **High-level languages (HLL)** such as Java, C, Python use English-like words; a **translator** converts them to machine code.

| Level | Example | Who reads it |
|---|---|---|
| Machine language | `10110000 01100001` | CPU |
| Assembly | `MOV AL, 61h` | humans (barely) |
| High-level | `int a = 97;` | humans |

## 2.2 Your first program

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

```
javac Main.java     → compiles; creates Main.class (bytecode)
java Main           → JVM runs it           (java Main.java runs a single file directly, Java 11+)
```

**File rules:** the file name must equal the **`public` class** name (case-sensitive); one public top-level class per file; Java is case-sensitive (`Main` ≠ `main`, `System` ≠ `system`); every statement ends with `;`; `java.lang` is imported automatically.
#### Worked Example 1: reading command-line arguments and writing to both output streams

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Number of arguments: " + args.length);
        for (int i = 0; i < args.length; i++) {
            System.out.println("args[" + i + "] = " + args[i]);
        }
        System.err.println("(this line goes to the error stream)");
    }
}
```

**Output** (run as `java Main.java` with no arguments; stderr shown in the console too):
```text
Hello, World!
Number of arguments: 0
(this line goes to the error stream)
```

**Explanation:**
- `args` is never `null`: with no arguments it is an **empty array**, so `args.length` is `0` and the loop body never runs.
- Running `java Main.java red "big blue"` would add `args[0] = red` and `args[1] = big blue`; quotes keep words together.
- `System.err` is a separate stream. In a terminal both appear on screen, but `java Main > out.txt` redirects only `System.out`, leaving error messages visible. This is why errors and logs should go to `System.err` (or a logger).

#### The compiler errors every beginner meets

| You wrote | `javac` says | Fix |
|---|---|---|
| `System.out.println("Hi")` (no `;`) | `error: ';' expected` | add `;` |
| `system.out.println("Hi");` | `error: package system does not exist` | Java is case-sensitive: `System` |
| file `hello.java`, class `public class Main` | `error: class Main is public, should be declared in a file named Main.java` | rename the file or the class |
| `int x = "5";` | `error: incompatible types: String cannot be converted to int` | `Integer.parseInt("5")` |
| `println(y);` with no `y` declared | `error: cannot find symbol` | declare the variable |
| `int a; System.out.println(a);` | `error: variable a might not have been initialized` | give `a` a value |

## 2.3 JDK, JRE, JVM and what the JVM does

```
JDK  = JRE + development tools (javac, jar, javadoc, jshell, jdb...)
JRE  = JVM + class libraries (java.lang, java.util, java.io...)
JVM  = class loader + bytecode verifier + execution engine (interpreter + JIT) + garbage collector + runtime data areas
```

| JVM job | Meaning |
|---|---|
| **Load** | The class loader finds `.class` files (Bootstrap → Platform → Application, parent-first) |
| **Verify** | The bytecode verifier checks the code is safe |
| **Execute** | Interpreter runs bytecode instruction by instruction; the **JIT (Just-In-Time) compiler** compiles *hot* methods to native machine code |
| **Manage memory** | Allocates objects on the heap; the **garbage collector** frees unreachable ones |

**Common misconceptions:** "Java is only interpreted" (it is compiled to bytecode **and** JIT-compiled); "JVM = Java" (the JVM also runs Kotlin, Scala, Groovy); "Java is platform-independent, so the JVM is too" (**bytecode** is independent; the **JVM is platform-specific**); "JRE is needed to develop" (that is the JDK).

**Compilation process:** `Main.java` → lexical analysis → syntax analysis → semantic (type) check → bytecode generation → `Main.class` (starts with magic number `CAFEBABE`). See [Java_Fundamentals_Deep_Dive.md](Java_Fundamentals_Deep_Dive.md) §6-7 for `javap -c` output.
#### Worked Example 2: asking the running JVM about itself

```java
public class Main {
    public static void main(String[] args) {
        String version = System.getProperty("java.version");
        System.out.println("Java major version starts with 17? " + version.startsWith("17"));
        System.out.println("Bytecode runs on any OS with a JVM: " + (System.getProperty("os.name") != null));
        Runtime rt = Runtime.getRuntime();
        System.out.println("CPU cores visible to the JVM > 0: " + (rt.availableProcessors() > 0));
        System.out.println("Max heap is set: " + (rt.maxMemory() > 0));
        System.out.println("Class of a String literal: " + "hi".getClass().getName());
        System.out.println("String is loaded by the bootstrap loader: " + (String.class.getClassLoader() == null));
        System.out.println("Main is loaded by a non-bootstrap loader: " + (Main.class.getClassLoader() != null));
    }
}
```

**Output:**
```text
Java major version starts with 17? true
Bytecode runs on any OS with a JVM: true
CPU cores visible to the JVM > 0: true
Max heap is set: true
Class of a String literal: java.lang.String
String is loaded by the bootstrap loader: true
Main is loaded by a non-bootstrap loader: true
```

**Explanation:**
- `System.getProperty` reads JVM settings such as `java.version`, `os.name` and `user.dir`. The printouts are `true`/`false` checks so the output is the same on every machine; print the values themselves to see yours (for example `17.0.20.1`, `Linux`).
- `Runtime` exposes the JVM's view of the machine: cores, maximum heap (`-Xmx`), free memory.
- Core classes such as `String` are loaded by the **bootstrap** class loader, which is implemented inside the JVM and appears as `null`. Your own classes are loaded by a real loader object: the **application** class loader (named `app`) when you run `javac` + `java Main`, or an in-memory loader when you use the `java Main.java` shortcut. This is the class-loader hierarchy from the table above, made visible.

## 2.4 The `main()` method and class keywords

```java
public static void main(String[] args)
```

| Word | Why |
|---|---|
| `public` | The JVM (outside the class) must reach it |
| `static` | No object exists yet when the program starts |
| `void` | Nothing is returned to the JVM (**verified:** `public static int main(...)` gives *"Main method must return a value of type void"*) |
| `main` | The name the JVM looks for (case-sensitive) |
| `String[] args` | Command-line arguments |

**Class declaration keywords:** `class`, `public`, `final` (cannot be extended), `abstract` (cannot be instantiated), plus `extends`/`implements`. A file may contain many classes but only one `public` one.

## 2.5 `print()` vs `println()` (and `printf`)

| Method | Behaviour |
|---|---|
| `System.out.print(x)` | prints `x`, stays on the **same line** |
| `System.out.println(x)` | prints `x`, then a **new line** (`println()` alone prints an empty line) |
| `System.out.printf("%d %s%n", 5, "a")` | formatted output |

`System` is a class in `java.lang`; `out` is a `static` `PrintStream` field; `println` is its method. `System.err` is the error stream.

**Simple programs from the syllabus** (display a message, personalized message, developer statement, introduce yourself, an enthusiastic message, an invitation card): all use `println`/`print`/`printf` with strings, e.g.

```java
String name = "Asha";
System.out.println("Hello, " + name + "!");                 // + joins strings
System.out.println("I am a Java developer.");
System.out.println("*** You are invited ***");
```

#### Worked Example 3: the "introduce yourself" and "invitation card" programs

```java
public class Main {
    public static void main(String[] args) {
        String name = "Asha";
        int age = 22;
        String city = "Pune";
        System.out.println("Hello, " + name + "!");
        System.out.print("I am " + age + " years old ");
        System.out.println("and I live in " + city + ".");
        System.out.printf("%s will be %d next year.%n", name, age + 1);

        System.out.println("+----------------------------+");
        System.out.printf("| %-26s |%n", "You are invited!");
        System.out.printf("| %-26s |%n", "Event : Java Meetup");
        System.out.printf("| %-26s |%n", "Date  : 14 Feb, 6 PM");
        System.out.println("+----------------------------+");
    }
}
```

**Output:**
```text
Hello, Asha!
I am 22 years old and I live in Pune.
Asha will be 23 next year.
+----------------------------+
| You are invited!           |
| Event : Java Meetup        |
| Date  : 14 Feb, 6 PM       |
+----------------------------+
```

**Explanation:**
- `print` leaves the cursor on the same line, so the next `println` continues that sentence.
- In `printf`, `%s` takes a string and `%d` an integer; `age + 1` is computed before formatting.
- `%-26s` left-aligns the text in a 26-character column, which keeps the right border of the card straight however long each line is.

---

# 3. Variables and `var`

A **variable** is a named memory location. Declaration: `type name = value;`

```java
double temperature = 36.6;
int loginCount = 0;
boolean isActive = true;
```

**Naming rules (a name is valid if...)**

- starts with a **letter, `_` or `$`**; then letters, digits, `_`, `$`
- not a **keyword** (`class`, `int`, `new` ...), no spaces or hyphens, case-sensitive

| Valid | Invalid |
|---|---|
| `age`, `_count`, `$price`, `total2` | `2total`, `my-var`, `class`, `my var` |

**Best practices:** `camelCase` for variables/methods (`loginCounter`), `PascalCase` for classes, `UPPER_SNAKE_CASE` for constants, meaningful names; **booleans** read like questions: `isLoggedIn`, `hasPermission`.
#### Worked Example 4: declaring, updating and printing variables

```java
public class Main {
    public static void main(String[] args) {
        int loginCount = 0;                 // declare + initialise
        double temperature = 36.6;
        boolean isActive = true;
        final double GST_RATE = 0.18;       // constant: cannot be reassigned

        loginCount = loginCount + 1;        // update
        loginCount++;                       // same idea, shorter
        temperature += 0.4;
        isActive = !isActive;

        System.out.println("loginCount  = " + loginCount);
        System.out.println("temperature = " + temperature);
        System.out.println("isActive    = " + isActive);
        System.out.println("GST on 500  = " + 500 * GST_RATE);

        int a = 5, b = 10;                  // several on one line
        int temp = a; a = b; b = temp;      // swap using a temporary variable
        System.out.println("after swap a = " + a + ", b = " + b);
    }
}
```

**Output:**
```text
loginCount  = 2
temperature = 37.0
isActive    = false
GST on 500  = 90.0
after swap a = 10, b = 5
```

**Explanation:**
- A variable can be **re-assigned** any number of times, but its **type is fixed** for life: `loginCount = "two";` would not compile.
- `final` makes a variable a constant; writing `GST_RATE = 0.2;` later is a compile error. By convention constants use `UPPER_SNAKE_CASE`.
- `36.6 + 0.4` happens to print exactly `37.0`; many decimal sums do not (see section 5).
- The swap needs a third variable: after `a = b`, the old value of `a` would be lost without `temp`.

## The `var` keyword (Java 10+)

`var` lets the compiler infer the **local** variable's type from the initializer. Typing stays **static**.

```java
var count = 10;          // int
var price = 2.5;         // double
var name  = "Java";      // String
// verified: Integer Double String
```

`var` cannot be used for fields, parameters, return types, or without an initializer (`var x;` is an error), and not with `null` alone.
#### Worked Example 5: what `var` infers (and what it refuses)

```java
import java.util.ArrayList;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        var count = 10;
        var price = 2.5;
        var big = 10_000_000_000L;
        var letter = 'J';
        var name = "Java";
        var list = new ArrayList<String>();
        list.add("Spring");
        var scores = new HashMap<String, Integer>();
        scores.put("Asha", 91);

        Object[] values = {count, price, big, letter, name, list, scores};
        for (Object v : values)
            System.out.println(v.getClass().getSimpleName() + " -> " + v);

        for (var entry : scores.entrySet())            // var shines with long generic types
            System.out.println(entry.getKey() + " scored " + entry.getValue());
        // count = "ten";   // compile error: var is still statically typed (int)
    }
}
```

**Output:**
```text
Integer -> 10
Double -> 2.5
Long -> 10000000000
Character -> J
String -> Java
ArrayList -> [Spring]
HashMap -> {Asha=91}
Asha scored 91
```

**Explanation:**
- The compiler decides each type from the right-hand side **once**, at compile time: `10` → `int`, `2.5` → `double`, `10_000_000_000L` → `long`, `'J'` → `char`.
- The printout shows wrapper names (`Integer`, `Double`, …) because storing a primitive in an `Object[]` **boxes** it.
- `var entry` replaces the long type `Map.Entry<String, Integer>`, which is where `var` really helps readability.
- `var` is not dynamic typing: assigning `"ten"` to `count` later is a compile error, exactly as with `int count`.

---

# 4. Operators

An **operator** acts on **operands**: unary (1), binary (2), ternary (3).

## 4.1 Arithmetic

| Op | Meaning | Note |
|---|---|---|
| `+ - *` | add, subtract, multiply | `+` also joins strings |
| `/` | divide | `7 / 2 = 3` (int division), `7 / 2.0 = 3.5` |
| `%` | remainder (modulus) | `-10 % 3 = -1` (sign of the left operand) |

Compound assignment: `+= -= *= /= %=` (they include a hidden cast: `byte b = 10; b += 5;` works). "Enhancing / tripling / dividing values" = `x += 2`, `x *= 3`, `x /= 3`.
#### Worked Example 6: arithmetic results you must be able to predict

```java
public class Main {
    public static void main(String[] args) {
        int a = 17, b = 5;
        System.out.println(a + b + " " + (a - b) + " " + a * b + " " + a / b + " " + a % b);
        System.out.println(-10 % 3 + " " + 10 % -3 + " " + 7.5 % 2);
        System.out.println(7 / 2 + " vs " + 7 / 2.0 + " vs " + (double) 7 / 2 + " vs " + (double) (7 / 2));

        int x = 10;
        x += 2;  System.out.print(x + " ");   // enhancing
        x *= 3;  System.out.print(x + " ");   // tripling
        x /= 4;  System.out.print(x + " ");   // dividing (integer)
        x -= 1;  System.out.print(x + " ");
        x %= 4;  System.out.println(x);

        byte small = 120;
        small += 10;                          // hidden cast back to byte
        System.out.println("byte 120 += 10 -> " + small);
    }
}
```

**Output:**
```text
22 12 85 3 2
-1 1 1.5
3 vs 3.5 vs 3.5 vs 3.0
12 36 9 8 0
byte 120 += 10 -> -126
```

**Explanation:**
- First line: `a + b + " "` is evaluated left to right, so `17 + 5 = 22` happens **before** the string join.
- `%` takes the sign of the **left** operand: `-10 % 3 = -1`, `10 % -3 = 1`.
- `(double) 7 / 2` casts `7` first (→ `3.5`); `(double) (7 / 2)` divides first in `int` (→ `3`), then casts (→ `3.0`). The position of the cast matters.
- Compound assignments chain: `10 → 12 → 36 → 9 (36/4) → 8 → 0 (8 % 4)`.
- `small += 10` is really `small = (byte) (small + 10)`. `130` does not fit in a byte (max 127), so it wraps to `130 - 256 = -126`, silently.

## 4.2 Relational (always give `boolean`)

`> < >= <= == !=`. Comparing `double`s with `==` is risky (`0.1 + 0.2 != 0.3`).
#### Worked Example 7: comparing numbers, characters, doubles and strings

```java
public class Main {
    public static void main(String[] args) {
        int a = 10, b = 20;
        System.out.println((a < b) + " " + (a >= b) + " " + (a != b));
        System.out.println(('a' < 'b') + " " + ('A' < 'a') + " " + (10 == 10.0));

        double sum = 0.1 + 0.2;
        System.out.println(sum == 0.3);
        System.out.println(Math.abs(sum - 0.3) < 1e-9);

        String s1 = "java", s2 = new String("java");
        System.out.println((s1 == s2) + " " + s1.equals(s2));
    }
}
```

**Output:**
```text
true false true
true true true
false
true
false true
```

**Explanation:**
- Characters compare by their Unicode codes: `'A'` (65) is less than `'a'` (97).
- `10 == 10.0` is `true`: the `int` is widened to `double` before comparing.
- `0.1 + 0.2` is `0.30000000000000004`, so `== 0.3` is `false`. Compare doubles with a **tolerance** (`Math.abs(x - y) < 1e-9`).
- For objects such as `String`, `==` compares **references** (same object?), not contents. Always use `.equals()`.

## 4.3 Logical

| Op | Meaning |
|---|---|
| `&&` | AND, **short-circuit** (right side skipped if left is `false`) |
| `\|\|` | OR, **short-circuit** (skipped if left is `true`) |
| `!` | NOT |

| A | B | A && B | A \|\| B | !A |
|---|---|---|---|---|
| T | T | T | T | F |
| T | F | F | T | F |
| F | T | F | T | T |
| F | F | F | F | T |
#### Worked Example 8: short-circuit evaluation made visible

```java
public class Main {
    static boolean log(String label, boolean value) {
        System.out.print(label + " ");
        return value;
    }

    public static void main(String[] args) {
        boolean r1 = log("L1", false) && log("R1", true);
        System.out.println("-> " + r1);
        boolean r2 = log("L2", true) || log("R2", false);
        System.out.println("-> " + r2);
        boolean r3 = log("L3", false) & log("R3", true);
        System.out.println("-> " + r3);

        String user = null;
        if (user != null && user.length() > 3) System.out.println("valid");
        else System.out.println("no NullPointerException thanks to &&");

        int age = 25; boolean hasId = true, banned = false;
        System.out.println("can enter: " + (age >= 18 && hasId && !banned));
        System.out.println("discount : " + (age < 12 || age > 60));
    }
}
```

**Output:**
```text
L1 -> false
L2 -> true
L3 R3 -> false
no NullPointerException thanks to &&
can enter: true
discount : false
```

**Explanation:**
- `false && …` is false whatever the right side is, so `R1` is never evaluated; `true || …` is true, so `R2` is skipped.
- The single `&` always evaluates both sides (`L3 R3`).
- `user != null && user.length() > 3` is the standard **null guard**: `user.length()` runs only when `user` is not `null`. With `&`, this line would throw `NullPointerException`.

## 4.4 Increment / decrement (you will be asked to predict outputs)

`x++` = use then add; `++x` = add then use. With `a = 10` (each line starts fresh):

| Statement | `b` | `a` after |
|---|---|---|
| `b = ++a` | 11 | 11 |
| `b = a++` | 10 | 11 |
| `b = --a` | 9 | 9 |
| `b = a--` | 10 | 9 |
| `b = ++a + ++a` | 23 | 12 |
| `b = a++ + a++` | 21 | 12 |
| `b = --a + --a` | 17 | 8 |
| `b = a-- + a--` | 19 | 8 |
| `b = ++a + a++ + --a + a--` | 44 | 10 |

`i = i++;` leaves `i` unchanged. `++` also works on `double` (`2.5 → 3.5`), `char` (`'a' → 'b'`), and `byte`/`short` (it casts back silently: `short sh = 32767; sh++;` gives `-32768`, verified).
#### Worked Example 9: verifying the increment table

```java
public class Main {
    public static void main(String[] args) {
        int a, b;
        a = 10; b = ++a;                     System.out.println("b = ++a              -> b=" + b + " a=" + a);
        a = 10; b = a++;                     System.out.println("b = a++              -> b=" + b + " a=" + a);
        a = 10; b = ++a + ++a;               System.out.println("b = ++a + ++a        -> b=" + b + " a=" + a);
        a = 10; b = a++ + a++;               System.out.println("b = a++ + a++        -> b=" + b + " a=" + a);
        a = 10; b = ++a + a++ + --a + a--;   System.out.println("b = ++a+a++ +--a+a-- -> b=" + b + " a=" + a);

        int i = 5; i = i++;                  System.out.println("i = i++              -> i=" + i);
        double d = 2.5; d++;                 System.out.println("double 2.5++         -> " + d);
        char c = 'a'; c++;                   System.out.println("char 'a'++           -> " + c);
        short sh = 32767; sh++;              System.out.println("short 32767++        -> " + sh);
    }
}
```

**Output:**
```text
b = ++a              -> b=11 a=11
b = a++              -> b=10 a=11
b = ++a + ++a        -> b=23 a=12
b = a++ + a++        -> b=21 a=12
b = ++a+a++ +--a+a-- -> b=44 a=10
i = i++              -> i=5
double 2.5++         -> 3.5
char 'a'++           -> b
short 32767++        -> -32768
```

**Step-by-step for `++a + a++ + --a + a--` (start `a = 10`):**

| Term | Value used | `a` afterwards |
|---|---|---|
| `++a` | 11 | 11 |
| `a++` | 11 | 12 |
| `--a` | 11 | 11 |
| `a--` | 11 | 10 |
| **sum** | **44** | **10** |

Java always evaluates operands **left to right**, so these results are guaranteed (unlike in C, where such expressions are undefined behaviour). Still, never write them in real code.

## 4.5 Bitwise and shifts (verified for `5` and `3`)

| Op | Result |
|---|---|
| `5 & 3` | `1` |
| `5 \| 3` | `7` |
| `5 ^ 3` | `6` |
| `~5` | `-6` |
| `5 << 1` | `10` (× 2) |
| `-8 >> 1` | `-4` (keeps sign) |
| `-8 >>> 28` | `15` (fills zeros) |

Also work on `boolean` as non-short-circuit versions: `true & false`, `true | false` (both sides always evaluated). `n << k` multiplies by 2ᵏ; `n >> k` divides by 2ᵏ.
#### Worked Example 10: bit tricks used in real programs

```java
public class Main {
    public static void main(String[] args) {
        int n = 13;
        System.out.println(n + " in binary = " + Integer.toBinaryString(n));
        System.out.println("odd? " + ((n & 1) == 1));
        System.out.println("n * 8 = " + (n << 3) + ", n / 4 = " + (n >> 2));
        System.out.println("power of two? 16:" + isPowerOfTwo(16) + " 18:" + isPowerOfTwo(18));
        System.out.println("set bits in 13 = " + Integer.bitCount(13));

        final int READ = 1, WRITE = 2, EXECUTE = 4;      // permission flags
        int perms = READ | WRITE;                       // grant two permissions
        System.out.println("can write? " + ((perms & WRITE) != 0) + ", can execute? " + ((perms & EXECUTE) != 0));
        perms |= EXECUTE;                               // add
        perms &= ~WRITE;                                // remove
        System.out.println("perms now = " + Integer.toBinaryString(perms) + " (read + execute)");
    }

    static boolean isPowerOfTwo(int x) { return x > 0 && (x & (x - 1)) == 0; }
}
```

**Output:**
```text
13 in binary = 1101
odd? true
n * 8 = 104, n / 4 = 3
power of two? 16:true 18:false
set bits in 13 = 3
can write? true, can execute? false
perms now = 101 (read + execute)
```

**Explanation:**
- `n << 3` multiplies by 2³ = 8; `n >> 2` divides by 4 and drops the remainder (`13 / 4 = 3`).
- A power of two has exactly one `1` bit; subtracting 1 flips that bit and all bits below it, so `x & (x - 1)` is `0` only for powers of two (`16 = 10000`, `15 = 01111`).
- **Bit flags** store several yes/no settings in one `int`: `|` turns a flag on, `& ~FLAG` turns it off, `& FLAG` tests it. Unix file permissions (`chmod 755`) work exactly like this.

## 4.6 Ternary

`condition ? a : b`: the only 3-operand operator.

```java
String parity = n % 2 == 0 ? "Even" : "Odd";
String sign   = n > 0 ? "Positive" : n < 0 ? "Negative" : "Zero";
int max       = a > b ? a : b;
boolean vowel = "aeiouAEIOU".indexOf(ch) >= 0;
String kind   = vowel ? "Vowel" : "Consonant";       // (check Character.isLetter(ch) first for non-letters)
```

**Recap checklist:** modulus `%`, integer division, `!=`, `<=`, `a && !b`, `a || !b`, `*=`, `-=`, `&`, `|`, plus the output-prediction exercises above.
#### Worked Example 11: ternary operator in practice

```java
public class Main {
    public static void main(String[] args) {
        int[] nums = {7, -3, 0, 12};
        for (int n : nums) {
            String parity = n % 2 == 0 ? "Even" : "Odd";
            String sign = n > 0 ? "Positive" : n < 0 ? "Negative" : "Zero";
            System.out.println(n + ": " + parity + ", " + sign);
        }
        int a = 8, b = 15;
        System.out.println("max = " + (a > b ? a : b) + ", min = " + Math.min(a, b));
        for (char ch : new char[]{'e', 'k', '7'}) {
            String kind = !Character.isLetter(ch) ? "Not a letter"
                        : "aeiouAEIOU".indexOf(ch) >= 0 ? "Vowel" : "Consonant";
            System.out.println(ch + " -> " + kind);
        }
        int items = 1;
        System.out.println("You have " + items + " item" + (items == 1 ? "" : "s"));
    }
}
```

**Output:**
```text
7: Odd, Positive
-3: Odd, Negative
0: Even, Zero
12: Even, Positive
max = 15, min = 8
e -> Vowel
k -> Consonant
7 -> Not a letter
You have 1 item
```

**Explanation:** `-3 % 2` is `-1`, which is not `0`, so `-3` is correctly `Odd`. The chained ternary reads top to bottom like an `else-if` ladder. Checking `isLetter` first stops `'7'` from being called a consonant. The last line shows a common real use: choosing between singular and plural.

---

# 5. Data Types and Type Casting

## 5.1 The eight primitive types (Interview Imp - Java)

| Type | Size | Range | Default | Literal |
|---|---|---|---|---|
| `byte` | 1 byte | -128 .. 127 | 0 | `byte b = 100;` |
| `short` | 2 bytes | -32,768 .. 32,767 | 0 | |
| `int` | 4 bytes | about ±2.1 × 10⁹ | 0 | `int i = 1_000_000;` |
| `long` | 8 bytes | about ±9.2 × 10¹⁸ | 0L | `long l = 10_000_000_000L;` (**L required**) |
| `float` | 4 bytes | ~7 digits | 0.0f | `float f = 2.5f;` (**f required**) |
| `double` | 8 bytes | ~15 digits | 0.0 | `double d = 2.5;` (**default for decimals**) |
| `char` | 2 bytes | 0 .. 65,535 (unsigned UTF-16) | `'\u0000'` | `char c = 'A';` |
| `boolean` | JVM-dependent | `true` / `false` | false | |

Range of an *n*-bit signed type: **-2ⁿ⁻¹ to 2ⁿ⁻¹ - 1**. **Suffix questions:** `float` needs `f`/`F`, `long` needs `L`, `double` is the default (`3.14` is a `double`). `char` can be a number (`char c = 65;` → `'A'`) and is *unsigned*; it cannot hold two characters. Floating-point is inexact; use `BigDecimal` for money.

**Choosing a type:** `byte` for tiny values/binary data; `short` for small codes (library codes); `int` default for counts, ages; `long` for populations, timestamps; `float`/`double` for fractions ("Datatypes for Fractions": prefer `double`); `char` for a single character; `boolean` for flags.
#### Worked Example 12: ranges, defaults and overflow of every primitive type

```java
public class Main {
    static int intDefault;      // fields get default values
    static boolean boolDefault;
    static char charDefault;

    public static void main(String[] args) {
        System.out.println("byte   " + Byte.MIN_VALUE + " .. " + Byte.MAX_VALUE + "  (" + Byte.BYTES + " byte)");
        System.out.println("short  " + Short.MIN_VALUE + " .. " + Short.MAX_VALUE + "  (" + Short.BYTES + " bytes)");
        System.out.println("int    " + Integer.MIN_VALUE + " .. " + Integer.MAX_VALUE + "  (" + Integer.BYTES + " bytes)");
        System.out.println("long   " + Long.MIN_VALUE + " .. " + Long.MAX_VALUE + "  (" + Long.BYTES + " bytes)");
        System.out.println("float  max " + Float.MAX_VALUE + ", double max " + Double.MAX_VALUE);
        System.out.println("char   " + (int) Character.MIN_VALUE + " .. " + (int) Character.MAX_VALUE);
        System.out.println("defaults: int=" + intDefault + " boolean=" + boolDefault + " char code=" + (int) charDefault);

        int max = Integer.MAX_VALUE;
        System.out.println("MAX_VALUE + 1 = " + (max + 1));
        System.out.println("as long       = " + ((long) max + 1));
        float f = 1.1f;
        double d = 1.1;
        System.out.println("float 1.1f as double = " + (double) f + ", double 1.1 = " + d);
        char c = 65;
        System.out.println("char c = 65 -> " + c + ", 'A' + 1 = " + ('A' + 1) + ", (char)('A' + 1) = " + (char) ('A' + 1));
    }
}
```

**Output:**
```text
byte   -128 .. 127  (1 byte)
short  -32768 .. 32767  (2 bytes)
int    -2147483648 .. 2147483647  (4 bytes)
long   -9223372036854775808 .. 9223372036854775807  (8 bytes)
float  max 3.4028235E38, double max 1.7976931348623157E308
char   0 .. 65535
defaults: int=0 boolean=false char code=0
MAX_VALUE + 1 = -2147483648
as long       = 2147483648
float 1.1f as double = 1.100000023841858, double 1.1 = 1.1
char c = 65 -> A, 'A' + 1 = 66, (char)('A' + 1) = B
```

**Explanation:**
- Each wrapper class (`Byte`, `Integer`, …) exposes `MIN_VALUE`, `MAX_VALUE` and `BYTES`; you never need to memorise the digits.
- **Fields** get defaults (`0`, `false`, `'\u0000'`); **local variables** do not, and the compiler rejects using one before assignment.
- Adding 1 to `Integer.MAX_VALUE` wraps to `MIN_VALUE` without any error. Casting one operand to `long` first gives the correct `2147483648`.
- `float` keeps about 7 significant digits; widening `1.1f` to `double` reveals the approximation (`1.100000023841858`). This is why `double` is the default for decimals.
- `char c = 65` is legal because 65 is a constant that fits in `char`; it prints `A`. `'A' + 1` is `int` arithmetic (66); casting back with `(char)` gives `B`.

```java
char c = 'q';
boolean upper  = Character.isUpperCase(c);     // false
boolean digit  = Character.isDigit('7');       // true
boolean vowel  = "aeiou".indexOf(Character.toLowerCase(c)) >= 0;
```

**Floating-point operations:** `5.5 % 2 = 1.5`; `10.0 / 0` is `Infinity` (no exception); integer `5 / 0` throws `ArithmeticException` (**verified:** message `/ by zero`).
#### Worked Example 13: money with `double` vs `BigDecimal`

```java
import java.math.BigDecimal;
import java.math.RoundingMode;

public class Main {
    public static void main(String[] args) {
        double total = 0;
        for (int i = 0; i < 10; i++) total += 0.10;          // ten coins of 10 paise
        System.out.println("double total   = " + total);
        System.out.println("equals 1.0?      " + (total == 1.0));

        BigDecimal exact = BigDecimal.ZERO;
        for (int i = 0; i < 10; i++) exact = exact.add(new BigDecimal("0.10"));
        System.out.println("BigDecimal     = " + exact);
        System.out.println("equals 1.00?     " + (exact.compareTo(new BigDecimal("1.00")) == 0));

        BigDecimal price = new BigDecimal("199.99");
        BigDecimal withTax = price.multiply(new BigDecimal("1.18")).setScale(2, RoundingMode.HALF_UP);
        System.out.println("199.99 + 18% GST = " + withTax);
        System.out.println("10.0 / 0 = " + (10.0 / 0) + ", 5.5 % 2 = " + (5.5 % 2));
    }
}
```

**Output:**
```text
double total   = 0.9999999999999999
equals 1.0?      false
BigDecimal     = 1.00
equals 1.00?     true
199.99 + 18% GST = 235.99
10.0 / 0 = Infinity, 5.5 % 2 = 1.5
```

**Explanation:**
- `0.10` has no exact binary form, so adding it ten times gives `0.9999999999999999`. In a shopping cart, such errors add up and fail equality checks.
- `BigDecimal` stores decimal digits exactly. Always create it from a **String** (`new BigDecimal("0.10")`); `new BigDecimal(0.10)` would copy the binary error.
- Compare `BigDecimal` values with `compareTo`, because `equals` also compares the scale (`1.0` vs `1.00`).
- `199.99 × 1.18 = 235.9882`, rounded `HALF_UP` to 2 places → `235.99`.

## 5.2 Type casting

| Kind | Direction | Written? | Loss? |
|---|---|---|---|
| **Implicit (widening)** | small → large: `byte→short→int→long→float→double` (`char→int`) | automatic | none (but `long→float` can lose precision) |
| **Explicit (narrowing)** | large → small | `(type)` | **possible** |

```java
byte b = 10;  int bi = b;            // 10     implicit
double d = 9.99; int di = (int) d;   // 9      explicit, TRUNCATES (not rounds)
float fl = 7.9f; int fi = (int) fl;  // 7
long lg = 5; float lf = lg;          // 5.0    implicit long→float
char ch = 'a'; ch++;                 // 'b'
int ascii = 'A';                     // 65
// verified: 10 9 7 5.0 b ... 65
```

`boolean` never takes part in casting. `byte + byte` becomes `int` in arithmetic: `byte c = a + b;` fails; use `(byte)(a + b)`. Narrowing keeps the lowest bits: `(byte) 200 = -56`; `Integer.MAX_VALUE + 1 = -2147483648` (overflow wraps).
#### Worked Example 14: widening, narrowing and truncation

```java
public class Main {
    public static void main(String[] args) {
        byte b = 10;  int bi = b;                  // widening
        long lg = bi; float fl = lg; double db = fl;
        System.out.println("widening chain: " + b + " " + bi + " " + lg + " " + fl + " " + db);

        double d = 9.99;
        System.out.println("(int) 9.99     = " + (int) d);
        System.out.println("(int) -9.99    = " + (int) -9.99);
        System.out.println("Math.round     = " + Math.round(d));
        System.out.println("(byte) 200     = " + (byte) 200);
        System.out.println("(byte) 130     = " + (byte) 130);
        System.out.println("(int) 3.9e10   = " + (int) 3.9e10);
        System.out.println("(char) 9731    = " + (char) 9731);

        byte x = 50, y = 60;
        // byte z = x + y;          // compile error: x + y is an int
        byte z = (byte) (x + y);
        int sum = x + y;
        System.out.println("byte + byte    = " + sum + ", cast to byte = " + z);

        long big = 123456789123L;
        float f = big;
        System.out.println("long -> float  = " + f + " (precision lost)");
    }
}
```

**Output:**
```text
widening chain: 10 10 10 10.0 10.0
(int) 9.99     = 9
(int) -9.99    = -9
Math.round     = 10
(byte) 200     = -56
(byte) 130     = -126
(int) 3.9e10   = 2147483647
(char) 9731    = ☃
byte + byte    = 110, cast to byte = 110
long -> float  = 1.23456791E11 (precision lost)
```

**Explanation:**
- Casting a decimal to `int` **truncates toward zero**: `9.99 → 9`, `-9.99 → -9`. Use `Math.round` to round.
- Narrowing an integer keeps only the lowest bits: `200` is `11001000` in binary; as a signed byte that is `-56` (`200 - 256`).
- A `double` too large for `int` is clamped to `Integer.MAX_VALUE` rather than wrapped.
- Any `char` code can be cast: 9731 is the snowman symbol ☃.
- `x + y` is promoted to `int` even though both are `byte`s, so assigning it to a `byte` needs an explicit cast. Here 110 fits, so nothing is lost.
- `long → float` is legal widening, but a `float` keeps only about 7 significant digits, so `123456789123` becomes `1.23456791E11`.

**`var` vs explicit types:** `var` removes repetition (`var list = new ArrayList<String>();`), explicit types document intent and can differ (`List<String> list = new ArrayList<>();`); use explicit when the declared type should be the **interface** or wider than the object.

**Data type sizes to remember (interview):** `char` = 2 bytes; `boolean` = JVM-dependent (1 bit of information); `int` = 4 bytes always (Java fixes sizes, unlike C).

---

# 6. Methods

A **method** is a named, reusable block that performs a task. It has a **signature** (name + parameter types), a **return type**, parameters, and a body.

| Kind | Example |
|---|---|
| no params, no return | `static void hello() { System.out.println("Hi"); }` |
| params, no return | `static void print(String s) { ... }` |
| no params, return | `static int sum() { return 5 + 3; }` / `static boolean yes() { return true; }` |
| params and return | `static int square(int n) { return n * n; }`, `static double divide(float a, float b) { return a / b; }` |

**`void`** means "returns nothing"; a non-`void` method must `return` a value of the declared type on **every** path (compile error "missing return statement" otherwise). `return` ends the method immediately.

**Pass-by-value (Interview Imp - Java):** the method gets a **copy** of each argument. Changing a primitive parameter never affects the caller (`void addFive(int x) { x += 5; }`: the caller's variable is unchanged). For objects the **reference** is copied: the method can change the object's contents but cannot make the caller's variable point elsewhere.
#### Worked Example 16: pass-by-value with a primitive, an array and a reassigned reference

```java
import java.util.Arrays;

public class Main {
    static void addFive(int x) { x += 5; }
    static void fillFirst(int[] arr) { arr[0] = 99; }              // changes the shared object
    static void replace(int[] arr) { arr = new int[]{7, 7, 7}; }   // changes only the local copy of the reference

    public static void main(String[] args) {
        int n = 10;
        addFive(n);
        System.out.println("n after addFive  : " + n);

        int[] data = {1, 2, 3};
        fillFirst(data);
        System.out.println("data after fill  : " + Arrays.toString(data));
        replace(data);
        System.out.println("data after replace: " + Arrays.toString(data));
    }
}
```

**Output:**
```text
n after addFive  : 10
data after fill  : [99, 2, 3]
data after replace: [99, 2, 3]
```

**Explanation:**

```
main:      data ──┐
                  ├──► [99, 2, 3]      fillFirst: both references point to ONE array → change visible
fillFirst: arr  ──┘

replace:   arr ──► [7, 7, 7]           replace: the local copy now points elsewhere; main's data is untouched
```

Java copies the **value** of every argument. For an object, that value is a reference, so the method can change the object's **contents** but cannot make the caller's variable point to a different object.

**Memory:** each call pushes a **stack frame** (parameters + local variables) onto the thread's stack; it is popped on return. **Local variables** live only in their method, have **no default value**, and must be initialized before use. Too deep recursion → `StackOverflowError`.

**Static method calls:** a `static` method is called as `ClassName.method()` (or just `method()` from the same class); a non-static method needs an object.

**Common mistakes:** calling an instance method from `static main` without an object; `int` division (`5 / 2`); missing `return`; wrong signature; forgetting that variables are local.
#### Worked Example 15: the four method kinds, overloading and recursion

```java
public class Main {
    static void hello() { System.out.println("Hi"); }                     // no params, no return
    static void print(String s) { System.out.println("> " + s); }          // params, no return
    static int sum() { return 5 + 3; }                                      // no params, return
    static int square(int n) { return n * n; }                              // params and return
    static double divide(float a, float b) { return a / b; }

    static int add(int a, int b) { return a + b; }                          // overloading:
    static double add(double a, double b) { return a + b; }                 //   same name,
    static int add(int a, int b, int c) { return a + b + c; }               //   different parameters

    static long factorial(int n) {                                          // recursion
        if (n <= 1) return 1;                                               // base case
        return n * factorial(n - 1);                                        // recursive case
    }

    public static void main(String[] args) {
        hello();
        print("methods make code reusable");
        System.out.println("sum() = " + sum() + ", square(9) = " + square(9));
        System.out.println("divide(7, 2) = " + divide(7, 2));
        System.out.println("add(2, 3) = " + add(2, 3) + ", add(2.5, 3) = " + add(2.5, 3) + ", add(1, 2, 3) = " + add(1, 2, 3));
        System.out.println("factorial(5) = " + factorial(5));
        System.out.println("square(square(3)) = " + square(square(3)));
    }
}
```

**Output:**
```text
Hi
> methods make code reusable
sum() = 8, square(9) = 81
divide(7, 2) = 3.5
add(2, 3) = 5, add(2.5, 3) = 5.5, add(1, 2, 3) = 6
factorial(5) = 120
square(square(3)) = 81
```

**Explanation:**
- `divide(7, 2)`: the `int` arguments widen to `float`, so the division is done in floating point → `3.5`.
- **Overloading:** the compiler picks a version by the argument types. `add(2.5, 3)` has a `double`, so the `double` version runs (`3` is widened to `3.0`).
- **Recursion:** `factorial(5) = 5 × factorial(4) = … = 5 × 4 × 3 × 2 × 1`. Each call gets its own stack frame; the **base case** stops the chain. Without it, the program would end with `StackOverflowError`.

**Stack frames during `factorial(3)`:**

```
call factorial(3) ─► needs factorial(2) ─► needs factorial(1) ─► returns 1
                                          returns 2 * 1 = 2  ◄──┘
                     returns 3 * 2 = 6 ◄──┘
```

---

# 7. Input, Comments and Common Beginner Errors

## 7.1 Comments

```java
// single-line comment
/* multi-line
   comment */
/** Javadoc comment: documents a class or method */
```

#### Worked Example 17: a Javadoc-documented method

```java
public class Main {
    /**
     * Calculates simple interest.
     *
     * @param principal amount borrowed, in rupees
     * @param ratePercent yearly interest rate, e.g. 8.5 for 8.5%
     * @param years duration in years
     * @return the interest (not including the principal)
     */
    static double simpleInterest(double principal, double ratePercent, int years) {
        return principal * ratePercent * years / 100;   // SI = P × R × T / 100
    }

    public static void main(String[] args) {
        // Single-line comments explain WHY, not what the code obviously does.
        double si = simpleInterest(50000, 8.5, 3);
        System.out.printf("Interest = %.2f%n", si);
        /* Multi-line comments are useful
           for temporarily disabling a block: */
        /* System.out.println("disabled"); */
    }
}
```

**Output:**
```text
Interest = 12750.00
```

**Explanation:** comments are removed by the compiler and never run. Running `javadoc Main.java` turns the `/** … */` comments into HTML documentation, which is how the official Java API pages are generated. IDEs also show Javadoc when you hover over a method.

## 7.2 `Scanner`: reading every type

```java
Scanner sc = new Scanner(System.in);
byte  b = sc.nextByte();
short s = sc.nextShort();
int   i = sc.nextInt();
long  l = sc.nextLong();
String word = sc.next();        // one word
sc.nextLine();                  // consume the leftover Enter after a number
String line = sc.nextLine();    // a full line, including spaces
```
(verified with typed input: `12 30` → sum `42`; `7.5 2.5` → `10.0` and `3.0`.)

Applications from the syllabus: "User Information App" (name via `nextLine`, age via `nextInt`), "Simple Calculator" (two numbers + operator char via `switch`), "Coffee shop" (menu + prices).
#### Worked Example 18: the "Simple Calculator" application with `Scanner`

```java
// stdin: 12.5 4\n*
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter two numbers: ");
        double a = sc.nextDouble();
        double b = sc.nextDouble();
        System.out.print("Operator (+ - * /): ");
        char op = sc.next().charAt(0);
        System.out.println();

        double result;
        switch (op) {
            case '+': result = a + b; break;
            case '-': result = a - b; break;
            case '*': result = a * b; break;
            case '/':
                if (b == 0) { System.out.println("Cannot divide by zero"); return; }
                result = a / b; break;
            default:
                System.out.println("Unknown operator " + op); return;
        }
        System.out.printf("%.2f %c %.2f = %.2f%n", a, op, b, result);
    }
}
```

**Output** (input `12.5 4` then `*`):
```text
Enter two numbers: Operator (+ - * /): 
12.50 * 4.00 = 50.00
```

**Explanation:** `Scanner` has no `nextChar()`, so `next().charAt(0)` takes the first character of the next word. The `switch` picks the operation, and the `/` case checks for zero first, because `double` division by zero gives `Infinity` rather than an error, which is rarely what a user expects. The prompts appear on one line here only because the input came from a file; at a keyboard, each answer appears after its prompt.

## 7.3 The beginner-error list (these all appear as quiz topics)

| Topic | The rule |
|---|---|
| Validating `main` | Must be `public static void main(String[] args)` |
| Static context | A static method cannot use instance members directly |
| Case sensitivity | `main`, `System`, `String` are case-sensitive (`system.out` fails) |
| Literal suffix | `float f = 2.5;` is an error; write `2.5f` |
| Semicolons | Every statement needs `;` (a block `{ }` does not) |
| Division by zero | `int / 0` → `ArithmeticException`; `double / 0` → `Infinity` |
| `char` limits | One character only: `'ab'` is an error; use a `String` |
| Concatenation vs addition order | `1 + 2 + "x"` → `3x`; `"x" + 1 + 2` → `x12` (verified: `"" + 1 + 2` = `12`, `(1+2+"x"+1+2)` = `3x12`) |
| Local variables | Must be initialized before use |
| `=` vs `==` | Assignment vs comparison (`if (x = 5)` fails for `int`) |
| Scope inside loops | A variable declared inside a loop body is not visible after it |
| `import` placement | `package` first, then `import`s, then the class |
| Order of operations | `*` `/` `%` before `+` `-`; use parentheses |
#### Worked Example 19: reproducing three classic beginner bugs

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Total: " + 10 + 20);        // concatenation, not addition
        System.out.println("Total: " + (10 + 20));
        System.out.println(10 + 20 + " is the total");

        int count = 0;
        for (int i = 0; i < 3; i++) {
            int inside = i * 10;                          // scope: exists only in the loop body
            count += inside;
        }
        // System.out.println(inside);                   // compile error: cannot find symbol
        System.out.println("count = " + count);

        int x = 7;
        if (x % 2 == 1)                                  // == compares; = would assign
            System.out.println(x + " is odd");
    }
}
```

**Output:**
```text
Total: 1020
Total: 30
30 is the total
count = 30
7 is odd
```

**Explanation:** in `"Total: " + 10 + 20`, the string comes first, so each `+` joins text. Parentheses force the addition first. `inside` is declared inside the loop's braces, so it disappears after each iteration and cannot be used after the loop.

---

# 8. Control Constructs

## 8.1 Selection: `if`, `if-else`, `else-if`, `switch`

```java
if (n % 5 == 0) System.out.println("multiple of 5");

if (age >= 18) System.out.println("Eligible to vote"); else System.out.println("Not eligible");

if (marks >= 90) grade = "A";            // ladder: largest threshold first
else if (marks >= 75) grade = "B";
else if (marks >= 60) grade = "C";
else grade = "D";
```

Exercises in the list (multiple of 5, temperature "hot?", adult?, pass marks, temperature range, divisible by 3, odd/even, positive/negative, senior citizen, voting, exam status, grade evaluator, ticket pricing, weather advisor, day type, size category, time keeper) all reduce to **one condition (or a ladder) on a number**, e.g. `temp >= 30` → "hot"; `age >= 60` → senior; ticket price by age bands.
#### Worked Example 20: ticket pricing, senior citizen and weather advisor in one program

```java
public class Main {
    static int ticketPrice(int age) {
        if (age < 0) throw new IllegalArgumentException("age cannot be negative");
        if (age < 5) return 0;            // ladder: smallest band first because we use <
        else if (age < 18) return 100;
        else if (age < 60) return 250;
        else return 150;                   // senior discount
    }

    static String weatherAdvice(int temp, boolean raining) {
        if (raining) return "Take an umbrella";
        if (temp >= 35) return "Very hot: stay indoors";
        if (temp >= 30) return "Hot: drink water";
        if (temp <= 10) return "Cold: wear a jacket";
        return "Pleasant day";
    }

    public static void main(String[] args) {
        int[] ages = {3, 12, 18, 45, 60, 72};
        for (int age : ages)
            System.out.printf("age %2d -> Rs %3d%s%n", age, ticketPrice(age), age >= 60 ? "  (senior citizen)" : "");
        System.out.println(weatherAdvice(38, false));
        System.out.println(weatherAdvice(22, true));
        System.out.println(weatherAdvice(8, false));
        System.out.println(weatherAdvice(24, false));
    }
}
```

**Output:**
```text
age  3 -> Rs   0
age 12 -> Rs 100
age 18 -> Rs 250
age 45 -> Rs 250
age 60 -> Rs 150  (senior citizen)
age 72 -> Rs 150  (senior citizen)
Very hot: stay indoors
Take an umbrella
Cold: wear a jacket
Pleasant day
```

**Explanation:**
- With `<` thresholds the ladder starts from the **smallest** band; with `>=` it starts from the **largest**. Both work as long as each test assumes all the earlier tests failed.
- Boundary ages (18, 60) land in the correct bands: `18 < 18` is false, so 18 pays the adult price.
- `weatherAdvice` uses **early returns** instead of `else`: each `return` leaves the method, so later checks run only if earlier ones failed. The order encodes priority: rain beats temperature.
- Rejecting a negative age with an exception is better than silently returning a price.

**`switch`:**

```java
switch (day) {                                  // day 1..7
    case 1: System.out.println("Monday"); break;
    case 6: case 7: System.out.println("Weekend"); break;   // several cases, one body
    default: System.out.println("Invalid");
}

String color = switch (light) {                 // Java 14+ expression
    case "red"    -> "Stop";
    case "yellow" -> "Wait";
    case "green"  -> "Go";
    default       -> "Unknown";
};
```
Uses: day of the week, season identifier (month → season, grouping cases), traffic light, menu selection, fruit/clothes selection, simple calculator (`+ - * /`), pizza or burger. **Without `break`, execution falls through** to the next case (verified earlier: `case 3` printed `Wed` then `Thu`).
#### Worked Example 21: season identifier and calculator with switch expressions

```java
public class Main {
    static String season(int month) {
        return switch (month) {
            case 12, 1, 2 -> "Winter";
            case 3, 4, 5 -> "Summer";
            case 6, 7, 8, 9 -> "Monsoon";
            case 10, 11 -> "Autumn";
            default -> throw new IllegalArgumentException("invalid month " + month);
        };
    }

    static String dayType(int day) {
        String type;
        switch (day) {                                  // classic switch with grouped cases
            case 1: case 2: case 3: case 4: case 5:
                type = "Weekday"; break;
            case 6: case 7:
                type = "Weekend"; break;
            default:
                type = "Invalid";
        }
        return type;
    }

    static double calc(double a, char op, double b) {
        return switch (op) {
            case '+' -> a + b;
            case '-' -> a - b;
            case '*' -> a * b;
            case '/' -> {
                if (b == 0) throw new ArithmeticException("division by zero");
                yield a / b;
            }
            default -> throw new IllegalArgumentException("bad operator " + op);
        };
    }

    public static void main(String[] args) {
        for (int m : new int[]{1, 4, 7, 11}) System.out.println("month " + m + " -> " + season(m));
        System.out.println("day 3 -> " + dayType(3) + ", day 7 -> " + dayType(7) + ", day 9 -> " + dayType(9));
        System.out.println("8 / 4 = " + calc(8, '/', 4) + ", 8 * 4 = " + calc(8, '*', 4));
        try {
            calc(1, '/', 0);
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Output:**
```text
month 1 -> Winter
month 4 -> Summer
month 7 -> Monsoon
month 11 -> Autumn
day 3 -> Weekday, day 7 -> Weekend, day 9 -> Invalid
8 / 4 = 2.0, 8 * 4 = 32.0
Error: division by zero
```

**Explanation:**
- `case 12, 1, 2 ->` groups several values into one branch without fall-through.
- A switch **expression** must produce a value for every input; throwing an exception in `default` satisfies that and rejects bad input loudly.
- `dayType` shows the classic form: stacked `case` labels share one body, and each group ends with `break`.
- A block branch (`case '/' -> { … }`) returns its value with `yield`.

## 8.2 Loops

| Loop | Use |
|---|---|
| `for (init; cond; update)` | count known |
| `while (cond)` | repeat while true, check first |
| `do { } while (cond);` | at least once |

```java
int sum = 0; for (int i = 1; i <= n; i++) sum += i;        // sum of first n numbers
for (int i = 10; i >= 1; i--) System.out.println(i);        // countdown
long f = 1; int k = n; while (k > 1) f *= k--;              // factorial with while
int i = 1; do { System.out.println(i * 5); i++; } while (i <= 10);   // table printer
```

Syllabus exercises: sum of natural numbers, sum of first n, countdown, "Loop of Love for Java" (print a line n times), factorial calculator, even numbers with `while`, countdown timer, table printer, counting to ten, factorial with user input, odd numbers with `do-while`, "Coding is Fun" n times. **Output prediction** (for/while/do-while): trace variables in a table `i | condition | output | i after`.
#### Worked Example 22: tracing `for`, `while` and `do-while` loops

```java
public class Main {
    public static void main(String[] args) {
        int n = 5;
        int sum = 0;
        for (int i = 1; i <= n; i++) sum += i;
        System.out.println("sum 1.." + n + " = " + sum);

        System.out.print("countdown: ");
        for (int i = 5; i >= 1; i--) System.out.print(i + (i > 1 ? ", " : " -> Go!\n"));

        long f = 1;
        int k = n;
        while (k > 1) f *= k--;
        System.out.println(n + "! = " + f);

        System.out.print("table of 5: ");
        int i = 1;
        do { System.out.print(i * 5 + " "); i++; } while (i <= 10);
        System.out.println();

        System.out.print("odd numbers with do-while: ");
        int odd = 1;
        do { System.out.print(odd + " "); odd += 2; } while (odd < 12);
        System.out.println();

        for (int t = 1; t <= 3; t++) System.out.println(t + ". I love Java");
    }
}
```

**Output:**
```text
sum 1..5 = 15
countdown: 5, 4, 3, 2, 1 -> Go!
5! = 120
table of 5: 5 10 15 20 25 30 35 40 45 50 
odd numbers with do-while: 1 3 5 7 9 11 
1. I love Java
2. I love Java
3. I love Java
```

**Trace of `while (k > 1) f *= k--;` with `n = 5`:**

| `k` before | `k > 1`? | `f *= k--` | `f` after | `k` after |
|---|---|---|---|---|
| 5 | yes | `f = 1 × 5` | 5 | 4 |
| 4 | yes | `5 × 4` | 20 | 3 |
| 3 | yes | `20 × 3` | 60 | 2 |
| 2 | yes | `60 × 2` | 120 | 1 |
| 1 | **no** | loop ends | 120 | 1 |

`k--` uses the current value of `k` in the multiplication, then decrements it, so a single statement both multiplies and moves toward the end condition.

## 8.3 Jump statements

```java
for (int i = 1; i <= 10; i++) {
    if (i == 6) break;               // leave the loop
    if (i == 3 || i == 5) continue;  // skip this round
    System.out.print(i + " ");       // 1 2 4
}
```

| Statement | Effect |
|---|---|
| `break` | leave the innermost loop/`switch` |
| `continue` | next iteration |
| labeled `break`/`continue` | act on the **outer** loop |

Exercises: print numbers with early termination, breaking at a peak, `do-while` with `break`, skipping 3s and 5s, odd numbers in a range, sum of squares skipping 4s, skipping odd/even/multiples; predict outputs of `break`/`continue`. Nested/labeled-loop traces are in [Java_Practice_Curriculum_Guide.md](Java_Practice_Curriculum_Guide.md) §2.3.
#### Worked Example 23: `break` at a peak, skipping 3s and 5s, sum of squares skipping 4s

```java
public class Main {
    public static void main(String[] args) {
        int[] heights = {2, 5, 9, 14, 11, 7};
        for (int i = 1; i < heights.length; i++) {
            if (heights[i] < heights[i - 1]) {
                System.out.println("peak " + heights[i - 1] + " at index " + (i - 1));
                break;                                   // stop at the first descent
            }
        }

        System.out.print("1..15 without multiples of 3 or 5: ");
        for (int i = 1; i <= 15; i++) {
            if (i % 3 == 0 || i % 5 == 0) continue;
            System.out.print(i + " ");
        }
        System.out.println();

        int sumSq = 0;
        for (int i = 1; i <= 6; i++) {
            if (i == 4) continue;
            sumSq += i * i;
        }
        System.out.println("sum of squares 1..6 except 4 = " + sumSq);

        int num = 0;
        do {
            num += 7;
            if (num > 30) break;
            System.out.print(num + " ");
        } while (true);
        System.out.println("<- multiples of 7 up to 30");
    }
}
```

**Output:**
```text
peak 14 at index 3
1..15 without multiples of 3 or 5: 1 2 4 7 8 11 13 14 
sum of squares 1..6 except 4 = 75
7 14 21 28 <- multiples of 7 up to 30
```

**Explanation:**
- The peak is found the first time a value is **smaller** than the one before it; `break` ends the scan immediately, so the rest of the array is not examined.
- `continue` skips the rest of the current iteration only; the loop's update `i++` still runs.
- Sum of squares: `1 + 4 + 9 + 25 + 36 = 75` (16 is skipped).
- `do { … } while (true)` with a `break` inside is a common shape for "repeat until a condition, checked in the middle".

---

# 9. Pattern Programs

**Method:** the **outer loop = rows**, the **inner loop = columns** (spaces, then stars/numbers); for each row `i` decide *how many spaces* and *how many symbols*. All patterns below were generated by running the code (n = 4).
#### How to design any pattern: the row table

Before writing code, fill in a table for a small `n` (here `n = 4`, pyramid):

| Row `i` | Spaces | Stars | Formula for spaces | Formula for stars |
|---|---|---|---|---|
| 1 | 3 | 1 | `n - i` | `2i - 1` |
| 2 | 2 | 3 | `n - i` | `2i - 1` |
| 3 | 1 | 5 | `n - i` | `2i - 1` |
| 4 | 0 | 7 | `n - i` | `2i - 1` |

Once the formulas are known, the code is always the same shape: an outer loop over rows, one inner loop printing spaces, one inner loop printing symbols, then `println()`.

```java
// Right triangle                         // Inverted triangle
for (int i = 1; i <= n; i++) {            for (int i = n; i >= 1; i--) {
    for (int j = 1; j <= i; j++)              for (int j = 1; j <= i; j++)
        System.out.print("* ");                   System.out.print("* ");
    System.out.println();                     System.out.println();
}                                         }
```
```
*            * * * *
* *          * * *
* * *        * *
* * * *      *
```

**Pyramid** (spaces `n-i`, stars `2i-1`) and **Diamond** (pyramid, then the pyramid without the middle row reversed):

```java
for (int i = 1; i <= n; i++) System.out.println(" ".repeat(n - i) + "*".repeat(2 * i - 1));
for (int i = n - 1; i >= 1; i--) System.out.println(" ".repeat(n - i) + "*".repeat(2 * i - 1));   // second half of the diamond
```
```
   *            then      *****
  ***                      ***
 *****                      *
*******                (diamond = both halves)
```

**Hollow square** (print `*` on the border: first/last row or first/last column):

```java
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n; j++) System.out.print(i == 1 || i == n || j == 1 || j == n ? "* " : "  ");
    System.out.println();
}
```
```
* * * *
*     *
*     *
* * * *
```

**Floyd's triangle** (a running counter), **number triangle**, **alphabet triangle**:

```java
int c = 1; for (int i = 1; i <= n; i++) { for (int j = 1; j <= i; j++) System.out.print(c++ + " "); System.out.println(); }
```
```
1            1            A
2 3          1 2          A B
4 5 6        1 2 3        A B C
7 8 9 10     1 2 3 4      A B C D
```
Alphabet: `(char) ('A' + j)`. **Hollow diamond:** print the border `*` of each row with `2i-3` spaces between (verified):

```
   *
  * *
 *   *
*     *
 *   *
  * *
   *
```
#### Worked Example 24: eight patterns from one program (all with nested loops, no `repeat`)

```java
public class Main {
    static void title(String t) { System.out.println("-- " + t); }

    public static void main(String[] args) {
        int n = 4;

        title("right-aligned triangle");
        for (int i = 1; i <= n; i++) {
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= i; j++) System.out.print("*");
            System.out.println();
        }

        title("pyramid");
        for (int i = 1; i <= n; i++) {
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= 2 * i - 1; j++) System.out.print("*");
            System.out.println();
        }

        title("inverted pyramid");
        for (int i = n; i >= 1; i--) {
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= 2 * i - 1; j++) System.out.print("*");
            System.out.println();
        }

        title("number pyramid (palindromic rows)");
        for (int i = 1; i <= n; i++) {
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= i; j++) System.out.print(j);
            for (int j = i - 1; j >= 1; j--) System.out.print(j);
            System.out.println();
        }

        title("descending numbers");
        for (int i = 1; i <= n; i++) {
            for (int j = i; j >= 1; j--) System.out.print(j + " ");
            System.out.println();
        }

        title("uniform numerals");
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) System.out.print(i);
            System.out.println();
        }

        title("0-1 triangle");
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) System.out.print((i + j) % 2 == 0 ? "1 " : "0 ");
            System.out.println();
        }

        title("hollow rectangle 3 x 6");
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 6; j++) System.out.print(i == 1 || i == 3 || j == 1 || j == 6 ? "#" : " ");
            System.out.println();
        }
    }
}
```

**Output:**
```text
-- right-aligned triangle
   *
  **
 ***
****
-- pyramid
   *
  ***
 *****
*******
-- inverted pyramid
*******
 *****
  ***
   *
-- number pyramid (palindromic rows)
   1
  121
 12321
1234321
-- descending numbers
1 
2 1 
3 2 1 
4 3 2 1 
-- uniform numerals
1
22
333
4444
-- 0-1 triangle
1 
0 1 
1 0 1 
0 1 0 1 
-- hollow rectangle 3 x 6
######
#    #
######
```

**Explanation:**
- Every pattern is "spaces, then symbols, then newline". Only the **formulas** change: right-aligned uses `n - i` spaces and `i` stars; the pyramid uses `2i - 1` stars.
- The **inverted** versions just run the outer loop backwards (`i = n` down to 1) with the same formulas.
- The number pyramid prints `1..i` then `i-1..1`, which makes each row read the same in both directions.
- The 0-1 triangle uses parity: `(i + j)` is even on alternating cells, producing a checkerboard.
- A **hollow** shape prints the symbol only on the border (first/last row or first/last column) and spaces inside.
**Right-aligned pyramid** = spaces `n-i` + stars `i`; **inverted pyramid** = reverse loop; **descending numbers** = `for j from i down to 1`; **vertical line** = one `*` per `println`; **"uniform numerals"** = print `i` repeated `i` times. Variants in the list (Asterisk Symphony, Stars in Rows, Pyramid of Stars, Starry Path, Celestial Inversion, Alphabet Mountain, Symmetrical Brilliance, Fancy Hollow Rectangle, Shimmering Starlight...) are all combinations of: **count of spaces**, **count of symbols**, **hollow or solid**, **ascending or descending**.

---

# 10. Number Manipulation Programs

These use `%` (last digit) and `/` (drop last digit) heavily. Verified results are shown. More on prime/Armstrong/perfect numbers: [Java_Practice_Curriculum_Guide.md](Java_Practice_Curriculum_Guide.md) §4.

| Program | Idea | Check |
|---|---|---|
| **Leap year** | `(y%4==0 && y%100!=0) \|\| y%400==0` | 2024 `true`, 1900 `false`, 2000 `true` |
| **Decimal to binary** | divide by 2, prepend remainders | `10 → 1010` (= `Integer.toBinaryString(10)`) |
| **Perfect square** | `r = (int) Math.sqrt(n); r*r == n` | 49 `true`, 50 `false` |
| **Swap without temp** | `x = x + y; y = x - y; x = x - y;` or XOR (`x ^= y; y ^= x; x ^= y;`) | `5, 9 → 9, 5` |
| **Fahrenheit → Celsius** | `(F - 32) * 5 / 9` | 98.6 °F → `37.0` °C |
| **Smallest digit** | loop `n % 10`, keep the min | `40285 → 0` |
| **GCD** | Euclid: `while (b != 0) { t = a % b; a = b; b = t; }` | `gcd(48, 18) = 6` |
| **N-th Fibonacci** | iterate `a, b = b, a+b` n times | `nthFib(10) = 55` |
| **Single-digit sum (digital root)** | repeat digit-sum until `n < 10` | `9875 → 2` |
| **Digit counter / reverse / palindrome / Armstrong / factors / prime / sum of digits / factorial** | see the Practice guide | |
| **Averaging three integers** | `(a + b + c) / 3.0` (use `3.0` to keep decimals) | |
| **Squares / cubes of first n numbers; sum of squares; N even numbers; odd sum; natural sum** | simple loops (`i*i`, `i*i*i`, `2*i`, `2*i-1`) | |
| **N prime numbers / prime in range / n-th term of a series** | count found primes until you have n; test with `isPrime` | |
| **Season predictor, vowel or consonant, temperature predictor, senior citizen discount, positive/negative/zero** | `if/else` or `switch` ladders | |

```java
static boolean isLeap(int y)     { return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0; }
static int gcd(int a, int b)     { while (b != 0) { int t = a % b; a = b; b = t; } return a; }
static String toBinary(int n)    { if (n == 0) return "0"; String s = ""; while (n > 0) { s = n % 2 + s; n /= 2; } return s; }
```

#### Worked Example 25: the number programs, run together

```java
public class Main {
    static boolean isLeap(int y) { return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0; }
    static int gcd(int a, int b) { while (b != 0) { int t = a % b; a = b; b = t; } return a; }
    static String toBinary(int n) { if (n == 0) return "0"; String s = ""; while (n > 0) { s = n % 2 + s; n /= 2; } return s; }
    static boolean isPerfectSquare(int n) { int r = (int) Math.sqrt(n); return r * r == n; }
    static int smallestDigit(int n) { int min = 9; do { min = Math.min(min, n % 10); n /= 10; } while (n > 0); return min; }
    static long nthFib(int n) { long a = 0, b = 1; for (int i = 0; i < n; i++) { long t = a + b; a = b; b = t; } return a; }
    static int digitalRoot(int n) { while (n > 9) { int s = 0; while (n > 0) { s += n % 10; n /= 10; } n = s; } return n; }

    public static void main(String[] args) {
        for (int y : new int[]{2024, 1900, 2000, 2023})
            System.out.println(y + (isLeap(y) ? " is" : " is not") + " a leap year");
        System.out.println("10 in binary = " + toBinary(10) + " (library: " + Integer.toBinaryString(10) + ")");
        System.out.println("binary 1010 back to int = " + Integer.parseInt("1010", 2));
        System.out.println("49 perfect square? " + isPerfectSquare(49) + ", 50? " + isPerfectSquare(50));
        int x = 5, y = 9;
        x = x + y; y = x - y; x = x - y;
        System.out.println("swapped without temp: x = " + x + ", y = " + y);
        double f = 98.6;
        System.out.printf("%.1f F = %.1f C%n", f, (f - 32) * 5 / 9);
        System.out.println("smallest digit of 40285 = " + smallestDigit(40285));
        System.out.println("gcd(48, 18) = " + gcd(48, 18) + ", lcm = " + (48 / gcd(48, 18) * 18));
        System.out.println("10th Fibonacci = " + nthFib(10) + ", 50th = " + nthFib(50));
        System.out.println("digital root of 9875 = " + digitalRoot(9875));
        System.out.println("average of 4, 7, 8 = " + (4 + 7 + 8) / 3.0 + " (int division would give " + (4 + 7 + 8) / 3 + ")");
    }
}
```

**Output:**
```text
2024 is a leap year
1900 is not a leap year
2000 is a leap year
2023 is not a leap year
10 in binary = 1010 (library: 1010)
binary 1010 back to int = 10
49 perfect square? true, 50? false
swapped without temp: x = 9, y = 5
98.6 F = 37.0 C
smallest digit of 40285 = 0
gcd(48, 18) = 6, lcm = 144
10th Fibonacci = 55, 50th = 12586269025
digital root of 9875 = 2
average of 4, 7, 8 = 6.333333333333333 (int division would give 6)
```

**Trace of `toBinary(10)`:**

| `n` | `n % 2` | `s` (prepend) | `n / 2` |
|---|---|---|---|
| 10 | 0 | `"0"` | 5 |
| 5 | 1 | `"10"` | 2 |
| 2 | 0 | `"010"` | 1 |
| 1 | 1 | `"1010"` | 0 → stop |

Remainders come out **last bit first**, which is why each new digit is put in **front** of the string.

**Other notes:** 1900 is divisible by 100 but not by 400, so it is not a leap year. The 50th Fibonacci number (12,586,269,025) exceeds `int`, so `nthFib` uses `long`. `lcm(a, b) = a / gcd × b` divides first to avoid overflow.

---

# 11. OOP: Classes and Objects

**OOP** models a program as **objects** (real-world things) with **state** (fields) and **behaviour** (methods). Four pillars: **encapsulation, inheritance, polymorphism, abstraction**.

```java
class Professor {                 // class = blueprint
    String name;                  // instance variables (state)
    String subject;
    void teach() { System.out.println(name + " teaches " + subject); }   // behaviour
}
Professor p1 = new Professor();   // object = instance (created with new, lives on the HEAP)
p1.name = "Rao"; p1.subject = "Java"; p1.teach();
```

**Memory of objects:** `p1` (a **reference variable**) lives on the **stack** and holds the object's address; the object (with its instance variables) lives on the **heap**. `Professor p2 = p1;` copies the *reference*, not the object. An object with no references is **garbage** and is freed by the garbage collector.

| Local variable | Instance variable |
|---|---|
| Declared **inside a method** | Declared **in the class**, outside methods |
| **Stack** (the method's frame) | **Heap** (inside the object) |
| **No default value**, must initialize | Default `0 / false / null` |
| Gone when the method returns | Lives as long as the object |

**Anonymous object:** `new Professor().teach();`: no reference, usable **once**; becomes garbage right after.
#### Worked Example 26: classes, objects, references and garbage

```java
public class Main {
    static class Professor {
        String name;
        String subject;
        int experience;            // instance variables get defaults: null, null, 0

        void teach() { System.out.println(name + " teaches " + subject); }
        boolean isSenior() { return experience >= 10; }
    }

    public static void main(String[] args) {
        Professor p1 = new Professor();
        System.out.println("defaults: " + p1.name + ", " + p1.subject + ", " + p1.experience);
        p1.name = "Rao"; p1.subject = "Java"; p1.experience = 12;

        Professor p2 = new Professor();
        p2.name = "Mehta"; p2.subject = "DBMS"; p2.experience = 4;

        p1.teach();
        p2.teach();
        System.out.println(p1.name + " senior? " + p1.isSenior() + ", " + p2.name + " senior? " + p2.isSenior());

        Professor p3 = p1;                 // copies the reference, not the object
        p3.subject = "Spring";
        p1.teach();
        System.out.println("p1 == p3 ? " + (p1 == p3) + ", p1 == p2 ? " + (p1 == p2));

        new Professor().teach();           // anonymous object: used once
        p2 = null;                         // the "Mehta" object is now unreachable → eligible for GC
        System.out.println("p2 is now " + p2);
    }
}
```

**Output:**
```text
defaults: null, null, 0
Rao teaches Java
Mehta teaches DBMS
Rao senior? true, Mehta senior? false
Rao teaches Spring
p1 == p3 ? true, p1 == p2 ? false
null teaches null
p2 is now null
```

**Explanation:**

```
STACK                     HEAP
p1 ──┐
     ├──────────►  Professor{name="Rao", subject="Spring", experience=12}
p3 ──┘
p2 = null          Professor{name="Mehta", ...}   ← no reference left → garbage
```

- Each `new` creates a separate object with its **own copy** of the instance variables, so changing `p2` never affects `p1`.
- `p3 = p1` makes two references to **one** object; changing the subject through `p3` is visible through `p1`.
- The anonymous object has default field values, which is why it prints `null teaches null`.
- After `p2 = null`, nothing refers to the Mehta object, so the garbage collector may reclaim it. You cannot force collection; `System.gc()` is only a hint.

Modeling practice from the syllabus (Professors in a college, employees in an office, vehicles in a dealership, event management): identify the **nouns** → classes, their **attributes** → fields, and **actions** → methods; create several objects and store them in an array/`ArrayList`. "All about classes & objects" exercises (greeting the world, welcome wonders, motivational quote, birthday message...) are classes whose methods print messages.

---

# 12. static

| | `static` member | instance member |
|---|---|---|
| Belongs to | the **class** (one shared copy) | each **object** |
| Access | `ClassName.member` | `object.member` |
| Created | when the class loads | with `new` |

```java
class Classroom {
    static int count = 0;            // shared counter
    String student;
    Classroom(String s) { student = s; count++; }          // every new object increments the shared counter
    static int total() { return count; }                    // static method: no `this`, only static members directly
    static { System.out.println("Class loaded"); }          // static block: runs once, at class loading
}
```

Rules: a static method **cannot use `this`** or instance fields directly; static blocks run once, **before** `main` and in the order written (several static blocks are allowed); `static final` makes a constant. Uses: counters ("Attendance Alchemy"), utility methods ("Operation Odyssey": `add`, `subtract`; "Thermal Transmutations": `celsiusToFahrenheit`; "Geometric Genius": `areaCircle`), configuration (`AppConfig` with static fields and a block that loads them). Execution order of static/instance blocks and constructors is traced in [Java_Handwritten_Notes.md](Java_Handwritten_Notes.md) §18.
#### Worked Example 27: a shared counter, static utility methods and the static block

```java
public class Main {
    static class Classroom {
        static int count = 0;                          // ONE copy, shared by all objects
        String student;                                // one copy PER object

        static { System.out.println("[static block] Classroom class loaded"); }

        Classroom(String s) { student = s; count++; }
        static int total() { return count; }           // static: no object needed
    }

    static class Converter {                           // utility class: only static methods
        static double celsiusToFahrenheit(double c) { return c * 9 / 5 + 32; }
        static double areaCircle(double r) { return Math.PI * r * r; }
    }

    public static void main(String[] args) {
        System.out.println("main started");
        new Classroom("Asha");
        new Classroom("Ravi");
        Classroom c3 = new Classroom("Meena");
        System.out.println("total students: " + Classroom.total());
        System.out.println("via object (legal but misleading): " + c3.count);
        System.out.println("37 C = " + Converter.celsiusToFahrenheit(37) + " F");
        System.out.printf("area of radius 2 = %.2f%n", Converter.areaCircle(2));
    }
}
```

**Output:**
```text
main started
[static block] Classroom class loaded
total students: 3
via object (legal but misleading): 3
37 C = 98.6 F
area of radius 2 = 12.57
```

**Explanation:**
- The static block runs **once**, when the class is first used (here, at the first `new Classroom`), which is why it prints after `main started`. A static block in the class that contains `main` would run before `main`.
- Every constructor call increments the **same** `count`, so after three objects it is `3`, whichever object you ask.
- `c3.count` compiles, but it hides the fact that `count` belongs to the class. Always write `Classroom.count`.
- Utility classes such as `Math` and `Arrays` are collections of static methods: no object is needed to call `Math.sqrt`.

---

# 13. Inheritance

**Inheritance** lets a **child (sub/derived) class** acquire the fields and methods of a **parent (super/base) class** with `extends` (an **IS-A** relationship).

```java
class Person { String name; void intro() { System.out.println("I am " + name); } }
class Student extends Person { int roll; void study() { System.out.println(name + " studies"); } }
```

| Type | Shape | Allowed? |
|---|---|---|
| **Single** | A ← B | yes |
| **Multi-level** | A ← B ← C | yes (Employee → Manager → Director) |
| **Hierarchical** | A ← B, A ← C | yes (University: Person → Student, Professor) |
| **Hybrid** | mix of the above | yes (with classes + interfaces) |
| **Multiple** | C extends A and B | **No with classes** (diamond problem); **yes with interfaces** |
| **Cyclic** | A ← B ← A | never |

**Three kinds of methods:** **inherited** (used unchanged), **overridden** (child redefines it), **child-specific** (only in the child).
#### Worked Example 28: single, multi-level and hierarchical inheritance with `super`

```java
public class Main {
    static class Person {
        protected String name;
        Person(String name) { this.name = name; }
        void intro() { System.out.println("I am " + name); }
    }

    static class Employee extends Person {                 // single: Person ← Employee
        protected double salary;
        Employee(String name, double salary) { super(name); this.salary = salary; }
        double annualPay() { return salary * 12; }
        @Override void intro() { super.intro(); System.out.println("  I work here, salary " + salary); }
    }

    static class Manager extends Employee {                // multi-level: Person ← Employee ← Manager
        int teamSize;
        Manager(String name, double salary, int teamSize) { super(name, salary); this.teamSize = teamSize; }
        @Override double annualPay() { return super.annualPay() + 50000; }   // adds a bonus
        void conductMeeting() { System.out.println("  " + name + " meets " + teamSize + " people"); }
    }

    static class Student extends Person {                  // hierarchical: Person ← Student as well
        Student(String name) { super(name); }
        void study() { System.out.println("  " + name + " studies"); }
    }

    public static void main(String[] args) {
        Employee e = new Employee("Asha", 40000);
        Manager m = new Manager("Ravi", 80000, 6);
        Student s = new Student("Meena");

        e.intro();                         // overridden
        System.out.println("  annual pay " + e.annualPay());
        m.intro();                         // inherited from Employee
        System.out.println("  annual pay " + m.annualPay());
        m.conductMeeting();                // child-specific
        s.intro();                         // inherited from Person unchanged
        s.study();
        System.out.println("Manager is an Employee? " + (m instanceof Employee) + ", a Person? " + (m instanceof Person));
    }
}
```

**Output:**
```text
I am Asha
  I work here, salary 40000.0
  annual pay 480000.0
I am Ravi
  I work here, salary 80000.0
  annual pay 1010000.0
  Ravi meets 6 people
I am Meena
  Meena studies
Manager is an Employee? true, a Person? true
```

**Explanation:**
- `super(name)` must be the **first** statement of a child constructor; it runs the parent constructor so inherited fields are initialised.
- `super.intro()` calls the parent's version from inside an override, so the child **extends** the behaviour rather than replacing it.
- `Manager` does not override `intro`, so it uses `Employee`'s version (the nearest ancestor that defines it).
- `Manager.annualPay()` reuses the parent calculation (`80000 × 12 = 960000`) and adds a bonus → `1010000`.
- `instanceof` confirms the IS-A chain: a `Manager` is also an `Employee` and a `Person`.

**Overriding vs hiding (verified):**

```java
class Animal { String name = "animal"; static void s() { print("Animal.s"); } void speak() { print("..."); } }
class Dog extends Animal { String name = "dog";  static void s() { print("Dog.s"); } @Override void speak() { print("Woof"); } }
Animal an = new Dog();
an.speak();   // Woof       instance methods are polymorphic (object decides)
an.name;      // animal     fields are NOT polymorphic: **field hiding**, reference type decides
an.s();       // Animal.s   static methods are **hidden**, not overridden
```

#### Worked Example 29: overriding vs field hiding vs static method hiding

```java
public class Main {
    static class Animal {
        String name = "animal";
        static String kind() { return "Animal.kind"; }
        String speak() { return "..."; }
        String describe() { return "I say " + speak(); }    // calls the overridden version
    }

    static class Dog extends Animal {
        String name = "dog";                                 // hides Animal.name
        static String kind() { return "Dog.kind"; }          // hides Animal.kind
        @Override String speak() { return "Woof"; }
    }

    public static void main(String[] args) {
        Animal an = new Dog();
        Dog dog = (Dog) an;
        System.out.println("an.speak()    = " + an.speak());
        System.out.println("an.name       = " + an.name);
        System.out.println("dog.name      = " + dog.name);
        System.out.println("Animal.kind() = " + Animal.kind() + ", Dog.kind() = " + Dog.kind());
        System.out.println("an.describe() = " + an.describe());
    }
}
```

**Output:**
```text
an.speak()    = Woof
an.name       = animal
dog.name      = dog
Animal.kind() = Animal.kind, Dog.kind() = Dog.kind
an.describe() = I say Woof
```

**Explanation:**

| Member | Decided by | Why |
|---|---|---|
| Instance method `speak()` | the **object** (Dog) at run time | dynamic dispatch |
| Field `name` | the **reference type** (Animal) at compile time | fields are not polymorphic |
| Static method `kind()` | the **class name** used | static methods belong to the class |

- `describe()` is inherited from `Animal`, but its call to `speak()` still reaches `Dog.speak()`. Overridden methods are resolved on the real object even when called from parent code; this is what makes frameworks and template methods work.
- Declaring a field with the same name in the child is legal but confusing; in practice, keep fields `private` and expose them through methods.

**`final`:** `final class` cannot be extended (`String`); `final` method cannot be overridden; `final` variable is a constant. Trying to override a final method is a **compile error**.

**HAS-A: aggregation and composition**

| | Aggregation | Composition |
|---|---|---|
| Relationship | "has-a", **weak**: parts can exist independently | "has-a", **strong**: parts die with the owner |
| Example | `Library` has `Book`s (books survive the library); `Car` ↔ `Engine` passed in | `House` has `Room`s created inside; `Magazine` owns its `Article`s |
| Code | field set from outside (`Library(List<Book> books)`) | field created by the owner (`this.engine = new Engine();`) |

Prefer **composition over inheritance** when the relationship is "has-a" or only for reuse.
#### Worked Example 30: aggregation vs composition

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    static class Book {
        final String title;
        Book(String title) { this.title = title; }
    }

    static class Library {                                 // AGGREGATION: books come from outside
        private final List<Book> books;
        Library(List<Book> books) { this.books = books; }
        int size() { return books.size(); }
    }

    static class Room {
        final String name;
        Room(String name) { this.name = name; }
    }

    static class House {                                   // COMPOSITION: House creates and owns its rooms
        private final List<Room> rooms = new ArrayList<>();
        House(String... names) { for (String n : names) rooms.add(new Room(n)); }
        List<String> roomNames() {
            List<String> l = new ArrayList<>();
            for (Room r : rooms) l.add(r.name);
            return l;
        }
    }

    public static void main(String[] args) {
        List<Book> shelf = new ArrayList<>(List.of(new Book("Java"), new Book("SQL")));
        Library lib = new Library(shelf);
        System.out.println("library has " + lib.size() + " books");
        lib = null;                                        // the library is gone...
        System.out.println("books still exist: " + shelf.get(0).title + ", " + shelf.get(1).title);

        House h = new House("Kitchen", "Bedroom", "Hall");
        System.out.println("house rooms: " + h.roomNames());
        h = null;                                          // rooms have no other owner → they go with the house
        System.out.println("house gone; its rooms were never shared");
    }
}
```

**Output:**
```text
library has 2 books
books still exist: Java, SQL
house rooms: [Kitchen, Bedroom, Hall]
house gone; its rooms were never shared
```

**Explanation:** in aggregation the parts are created **outside** and passed in, so they outlive the whole (the books survive when the library is discarded). In composition the whole **creates** its parts and never hands them out, so their lifetimes are tied together. Both are "has-a" relationships expressed as fields, which is why composition is a flexible alternative to inheritance.

---

# 14. Polymorphism, Upcasting and Downcasting

**Polymorphism** = "many forms": one reference or method name, different behaviour.

| Compile-time (static) | Run-time (dynamic) |
|---|---|
| **Method overloading** (same name, different parameters, same class) | **Method overriding** + upcasting (parent reference → child object) |
| Chosen by the **compiler** | Chosen by the **JVM** from the real object |

```java
Vehicle v = new Car();     // UPCASTING: child object in a parent reference (automatic)
v.start();                 // Car's start() runs (dynamic dispatch)
// v.openSunroof();        // ERROR: a parent reference sees only parent members ("limitation of a parent reference")
((Car) v).openSunroof();   // DOWNCASTING with a cast to reach child-specific methods
if (v instanceof Car c) c.openSunroof();   // check first, then cast (pattern matching, Java 16+)
```

A wrong downcast throws `ClassCastException`. Polymorphism is the reason one method like `void pay(PaymentMethod p)` works for UPI, card and wallet. Syllabus systems (robotics control, library, restaurant order, hotel booking, project management, fitness tracking, meal tracking): define a **parent type** with an overridden method, store different children in `Parent[]`/`List<Parent>`, and loop calling the common method.
#### Worked Example 31: one payment method for every payment type (runtime polymorphism)

```java
import java.util.List;

public class Main {
    static abstract class PaymentMethod {
        abstract String pay(double amount);
    }
    static class Upi extends PaymentMethod {
        String pay(double amount) { return "Paid Rs " + amount + " via UPI"; }
        void showQr() { System.out.println("  [QR code shown]"); }
    }
    static class Card extends PaymentMethod {
        String pay(double amount) { return "Paid Rs " + amount + " via card (fee " + amount * 0.02 + ")"; }
    }
    static class Wallet extends PaymentMethod {
        String pay(double amount) { return "Paid Rs " + amount + " via wallet"; }
    }

    static void checkout(PaymentMethod p, double amount) {          // works for ANY subclass
        System.out.println(p.pay(amount));
        if (p instanceof Upi u) u.showQr();                         // safe downcast (Java 16+ pattern)
    }

    public static void main(String[] args) {
        List<PaymentMethod> methods = List.of(new Upi(), new Card(), new Wallet());
        for (PaymentMethod m : methods) checkout(m, 500);

        PaymentMethod p = new Card();
        try {
            Upi wrong = (Upi) p;                                    // Card is not a Upi
        } catch (ClassCastException e) {
            System.out.println("ClassCastException: a Card cannot be cast to Upi");
        }
    }
}
```

**Output:**
```text
Paid Rs 500.0 via UPI
  [QR code shown]
Paid Rs 500.0 via card (fee 10.0)
Paid Rs 500.0 via wallet
ClassCastException: a Card cannot be cast to Upi
```

**Explanation:**
- `checkout` is written once against the parent type; at run time the JVM calls the `pay` of the actual object (**dynamic dispatch**). Adding a new payment type requires no change to `checkout` (the open/closed principle).
- `showQr()` exists only in `Upi`, so it is reachable only after a downcast. `instanceof Upi u` tests and casts in one step.
- A blind cast to the wrong type compiles (the compiler only knows `p` is a `PaymentMethod`) but fails at run time with `ClassCastException`.

**Overloading** (compile time): choose by parameters: exact → widening → boxing → varargs (e.g. `f(5)` with `f(long)`/`f(Integer)` calls `long`).
#### Worked Example 32: which overload does the compiler pick?

```java
public class Main {
    static void f(int x)      { System.out.println("int"); }
    static void f(long x)     { System.out.println("long"); }
    static void f(Integer x)  { System.out.println("Integer"); }
    static void f(int... x)   { System.out.println("varargs"); }

    static void g(long x)     { System.out.println("g(long)"); }
    static void g(Integer x)  { System.out.println("g(Integer)"); }

    static void h(Object o)   { System.out.println("h(Object)"); }
    static void h(String s)   { System.out.println("h(String)"); }

    public static void main(String[] args) {
        f(5);                 // exact match
        byte b = 5; f(b);     // byte → int (widening)
        f(5L);                // exact long
        f(Integer.valueOf(5));// exact Integer
        f();                  // only varargs accepts zero arguments
        f(1, 2);              // only varargs accepts two
        g(5);                 // widening (long) beats boxing (Integer)
        h("hi");              // most specific type wins
        h(null);              // String is more specific than Object
    }
}
```

**Output:**
```text
int
int
long
Integer
varargs
varargs
g(long)
h(String)
h(String)
```

**Explanation:** the compiler tries three phases in order and stops at the first that finds a match: (1) exact type or **widening** of primitives, (2) **boxing/unboxing**, (3) **varargs**. That is why `g(5)` chooses `long` (phase 1) over `Integer` (phase 2). Among several applicable methods, the **most specific** wins, which is why `h(null)` picks `String`.

---

# 15. Abstraction: Abstract Classes and Interfaces

**Abstraction** = hide *how*, show *what*.

```java
abstract class Media {                     // cannot be instantiated: `new Media()` is an error
    String title;
    abstract void play();                  // no body → must be implemented by non-abstract children
    void info() { System.out.println(title); }   // concrete method allowed
}
class Song extends Media { void play() { System.out.println("Playing song"); } }
```

If a class has **any** abstract method it **must** be `abstract`. A child must implement all abstract methods or itself be `abstract`. Abstract classes can have constructors (run via `super()`), fields, static members, and concrete methods; `abstract` cannot be combined with `final`, `static` or `private`. A class can extend **only one** abstract class.
#### Worked Example 33: an abstract class with a template method

```java
public class Main {
    static abstract class Media {
        protected final String title;
        Media(String title) { this.title = title; System.out.println("Media constructor for " + title); }

        abstract void play();                         // WHAT every media item must do

        final void start() {                          // template: fixed steps, one varying step
            System.out.println("Loading " + title);
            play();
            System.out.println("Finished " + title);
        }
    }

    static class Song extends Media {
        Song(String t) { super(t); }
        void play() { System.out.println("  ♪ playing audio"); }
    }

    static class Video extends Media {
        Video(String t) { super(t); }
        void play() { System.out.println("  ▶ playing video with subtitles"); }
    }

    public static void main(String[] args) {
        Media[] playlist = { new Song("Kesariya"), new Video("Java in 100 seconds") };
        for (Media m : playlist) m.start();
        // Media m = new Media("x");   // compile error: Media is abstract; cannot be instantiated
    }
}
```

**Output:**
```text
Media constructor for Kesariya
Media constructor for Java in 100 seconds
Loading Kesariya
  ♪ playing audio
Finished Kesariya
Loading Java in 100 seconds
  ▶ playing video with subtitles
Finished Java in 100 seconds
```

**Explanation:**
- An abstract class **can have a constructor**; it runs through `super(t)` when a concrete child is created, even though `new Media(...)` itself is forbidden.
- `start()` is a **template method**: the parent fixes the order of steps and leaves one step (`play`) to the children. Marking it `final` stops children from changing the order.
- An array of the abstract type holds any concrete subclass, and the loop runs each child's own `play()`.

```java
interface Switchable { void on(); void off(); }                  // methods are implicitly public abstract
interface Dimmable   { int MAX = 100; void dim(int level); }     // fields are implicitly public static final
class Lamp implements Switchable, Dimmable {                     // multiple inheritance through interfaces
    public void on() { ... }  public void off() { ... }  public void dim(int l) { ... }
}
interface Smart extends Switchable { void schedule(); }          // interface extends interface
```

| Abstract class | Interface |
|---|---|
| `extends` (one) | `implements` (many) |
| fields, constructors, any methods | constants only, **no constructors** |
| for classes sharing state/code | for a **capability/contract** |

Since Java 8: `default` and `static` methods; Java 9: `private` methods. **Marker interface** = empty (`Serializable`). Examples: Smart Home System (`Switchable` devices), Banking Services (`Account` interface with `deposit/withdraw`), Fitness Training Program, Multimedia Content Management. Detailed tables: [Java_Handwritten_Notes.md](Java_Handwritten_Notes.md) §19.
#### Worked Example 34: interfaces with multiple implementation, default, static and private methods

```java
public class Main {
    interface Switchable {
        void on();
        void off();
        default void toggle(boolean isOn) { if (isOn) off(); else on(); }   // Java 8 default method
    }

    interface Dimmable {
        int MAX = 100;                                    // public static final
        void dim(int level);
        static int clamp(int v) { return Math.max(0, Math.min(MAX, v)); }   // Java 8 static method
    }

    interface Logger {
        default void info(String m) { log("INFO", m); }
        default void warn(String m) { log("WARN", m); }
        private void log(String level, String m) { System.out.println("[" + level + "] " + m); }   // Java 9
    }

    static class Lamp implements Switchable, Dimmable, Logger {   // a class may implement many interfaces
        private boolean on;
        public void on() { on = true; info("lamp on"); }
        public void off() { on = false; info("lamp off"); }
        public void dim(int level) {
            int l = Dimmable.clamp(level);
            if (l != level) warn("level " + level + " clamped to " + l);
            info("brightness " + l + "%");
        }
        boolean isOn() { return on; }
    }

    public static void main(String[] args) {
        Lamp lamp = new Lamp();
        lamp.on();
        lamp.dim(140);
        lamp.toggle(lamp.isOn());
        Switchable s = lamp;                     // usable through any of its interface types
        s.on();
        System.out.println("MAX = " + Dimmable.MAX + ", lamp is a Dimmable? " + (lamp instanceof Dimmable));
    }
}
```

**Output:**
```text
[INFO] lamp on
[WARN] level 140 clamped to 100
[INFO] brightness 100%
[INFO] lamp off
[INFO] lamp on
MAX = 100, lamp is a Dimmable? true
```

**Explanation:**
- `Lamp` gets **three** types at once, which is how Java achieves multiple inheritance of *behaviour contracts* without the diamond problem of multiple class inheritance.
- `toggle` is a **default method**: implementers get it for free and may override it. Default methods let library authors add methods to interfaces without breaking existing classes.
- `clamp` is a **static** interface method, called as `Dimmable.clamp(...)` (not through an object).
- `log` is a **private** interface method: shared helper code for the default methods, invisible to implementers.

---

# 16. Constructors, `this`, `super`, Initialization Order

A **constructor** runs when an object is created: same name as the class, **no return type**. If you write none, the compiler adds a **default no-arg constructor**.

```java
class Employee {
    int id; String name;
    Employee() { this(0, "unknown"); }                       // this(): calls another constructor of THIS class (first line)
    Employee(int id, String name) { this.id = id; this.name = name; }   // `this.` removes the shadowing problem
    Employee(Employee other) { this(other.id, other.name); }            // COPY constructor
}
```

| Concept | Meaning |
|---|---|
| **Shadowing problem** | A parameter with the same name hides the field; use `this.field = field;` |
| **Constructor overloading** | Several constructors with different parameters |
| **`this()`** | constructor chaining inside one class |
| **`super()`** | calls the **parent** constructor; **implicit** `super();` is inserted as the first line if you write neither `this()` nor `super()` |
| **`super.x` / `super.m()`** | access a **shadowed field** / the **parent's overridden method** |
| **Copy constructor** | builds a new object from an existing one |

**Initialization order (verified):** static blocks (parent → child, once) → parent instance blocks + field initializers → parent constructor → child instance blocks + field initializers → child constructor.

```
1 Parent static / 2 Child static / 3 Parent instance block / 4 Parent constructor /
Child.show v=0   ← an overridden method called from the parent constructor sees default values!
5 Child instance block / 6 Child constructor
```

**Chain trace (verified):** `new Car()` → `Car() → this("Kia") → Car(String) → super("Black") → Vehicle(String) → this() → Vehicle() → super() → Object()`; result `Black Kia`.

**Instance (initializer) blocks** `{ ... }` run for every object just **before** the constructor; use them for code shared by all constructors. Several static blocks run in order. "Program flow with various components" = this order.
#### Worked Example 35: constructor chaining, copy constructor and full initialisation order

```java
public class Main {
    static class Parent {
        static { System.out.println("1 Parent static block"); }
        { System.out.println("3 Parent instance block"); }
        Parent() {
            System.out.println("4 Parent constructor");
            show();                                       // calls the CHILD's override!
        }
        void show() { }
    }

    static class Child extends Parent {
        static { System.out.println("2 Child static block"); }
        int v = 42;
        { System.out.println("5 Child instance block (v = " + v + ")"); }
        Child() { System.out.println("6 Child constructor"); }
        @Override void show() { System.out.println("  Child.show sees v = " + v); }
    }

    static class Employee {
        int id; String name;
        Employee() { this(0, "unknown"); System.out.println("  no-arg constructor done"); }
        Employee(int id, String name) { this.id = id; this.name = name; System.out.println("  2-arg constructor: " + id + " " + name); }
        Employee(Employee other) { this(other.id, other.name + " (copy)"); }
    }

    public static void main(String[] args) {
        System.out.println("-- first object");
        new Child();
        System.out.println("-- second object (static blocks do not run again)");
        new Child();
        System.out.println("-- constructor chaining");
        Employee e1 = new Employee();
        Employee e2 = new Employee(7, "Asha");
        Employee e3 = new Employee(e2);
        System.out.println("e3 = " + e3.id + " " + e3.name + ", same object as e2? " + (e3 == e2));
    }
}
```

**Output:**
```text
-- first object
1 Parent static block
2 Child static block
3 Parent instance block
4 Parent constructor
  Child.show sees v = 0
5 Child instance block (v = 42)
6 Child constructor
-- second object (static blocks do not run again)
3 Parent instance block
4 Parent constructor
  Child.show sees v = 0
5 Child instance block (v = 42)
6 Child constructor
-- constructor chaining
  2-arg constructor: 0 unknown
  no-arg constructor done
  2-arg constructor: 7 Asha
  2-arg constructor: 7 Asha (copy)
e3 = 7 Asha (copy), same object as e2? false
```

**Explanation:**
- Static blocks run **once per class**, parent first, when the class is loaded. Instance blocks and constructors run **for every object**, parent part first.
- The parent constructor calls `show()`, which is overridden in `Child`. At that moment the child's field initialiser `v = 42` has **not run yet**, so `v` is still `0`. Lesson: **never call overridable methods from a constructor**.
- `this(0, "unknown")` delegates to another constructor of the same class; it must be the first line, so the delegated constructor finishes before the rest of the no-arg body runs.
- The copy constructor builds a **new, independent** object from an existing one.

---

# 17. Packages, Access Modifiers and Overriding Rules

A **package** groups classes (`package com.shop.model;`) and mirrors the folder structure; `import com.shop.model.Product;` or `import com.shop.model.*;`. Benefits: namespaces (avoid name clashes), access control, organization.

| Modifier | Same class | Same package | Subclass in other package | Everywhere |
|---|---|---|---|---|
| `private` | yes | no | no | no |
| default (none) | yes | yes | no | no |
| `protected` | yes | yes | yes (via inheritance) | no |
| `public` | yes | yes | yes | yes |

A **package-private** (default) class is visible only inside its package. Accessing a default constructor/class from another package fails.
#### Worked Example 36: what each access modifier allows (single-file demonstration)

```java
public class Main {
    static class Account {
        private double balance = 1000;          // only inside Account
        double limit = 500;                     // package-private: same package
        protected String branch = "Pune";       // package + subclasses
        public String holder = "Asha";          // everyone

        private void audit() { System.out.println("  audit: balance " + balance); }
        public void statement() { audit(); System.out.println("  statement for " + holder); }
    }

    static class SavingsAccount extends Account {
        void info() { System.out.println("  subclass sees branch = " + branch + ", holder = " + holder); }
    }

    public static void main(String[] args) {
        Account a = new Account();
        System.out.println("holder (public)        : " + a.holder);
        System.out.println("branch (protected)     : " + a.branch);
        System.out.println("limit (package-private): " + a.limit);
        a.statement();
        new SavingsAccount().info();
        // From a class in ANOTHER package: a.limit and a.branch would not compile,
        // and a.balance / a.audit() are never accessible outside Account.
    }
}
```

**Output:**
```text
holder (public)        : Asha
branch (protected)     : Pune
limit (package-private): 500.0
  audit: balance 1000.0
  statement for Asha
  subclass sees branch = Pune, holder = Asha
```

**Explanation:** everything here lives in one package, so `protected` and package-private members are visible from `main`. `private` members are reachable only from code **inside the class body**; the public `statement()` uses the private `audit()` internally, which is the normal pattern: a small public surface over private details. (Strictly, Java lets an enclosing top-level class reach the private members of its nested classes, but relying on that defeats the purpose.)

**Overriding rules (Interview Imp - Java):**

| Part | Rule |
|---|---|
| Name and parameters | identical |
| **Access** | same or **wider** (increasing visibility is allowed; **reducing is an error**, verified) |
| **Return type** | same, or a **co-variant** (subtype) return type |
| `static` | cannot be overridden (only hidden) |
| `final`, `private` | cannot be overridden |
| **Checked exceptions** | cannot throw new/broader checked exceptions than the parent |
| **Interface methods** | implicitly `public`, so the implementing method **must be `public`** |
| **Abstract methods** | cannot be `private`, `final` or `static`; valid visibilities: `public`, `protected`, default |

`private` methods in interfaces (Java 9+) are helpers for default/static methods.
#### Worked Example 37: legal overrides: wider access, covariant return, narrower exception

```java
import java.io.FileNotFoundException;
import java.io.IOException;

public class Main {
    static class Animal {}
    static class Dog extends Animal { public String toString() { return "Dog"; } }

    static class Shelter {
        protected Animal adopt() throws IOException { return new Animal(); }
    }

    static class DogShelter extends Shelter {
        @Override
        public Dog adopt() throws FileNotFoundException {   // wider access, covariant return, narrower exception
            return new Dog();
        }
    }

    public static void main(String[] args) throws Exception {
        DogShelter ds = new DogShelter();
        Dog d = ds.adopt();                     // no cast needed thanks to the covariant return type
        System.out.println("adopted: " + d);
        Shelter s = ds;
        System.out.println("through parent reference: " + s.adopt());
    }
}
```

**Output:**
```text
adopted: Dog
through parent reference: Dog
```

**Explanation:**
- `protected` → `public` widens access (allowed); the reverse would be a compile error, because code holding a `Shelter` reference must still be able to call the method.
- Returning `Dog` where the parent returns `Animal` is a **covariant return**: every `Dog` is an `Animal`, so callers of the parent method are still satisfied, and callers of the child get the more specific type without casting.
- `FileNotFoundException` is a subclass of `IOException`, so the override throws **less**, never more, than the parent promises.

---

# 18. Encapsulation

**Encapsulation** = bind data and methods together and **hide the data** behind a public interface.

```java
class Rectangle {
    private double length, width;                       // hidden
    public Rectangle(double l, double w) { setLength(l); setWidth(w); }
    public double getLength() { return length; }        // getter
    public void setLength(double l) {                   // setter with validation
        if (l <= 0) throw new IllegalArgumentException("length must be positive");
        length = l;
    }
    public double area() { return length * width; }
}
```

**Without encapsulation** anyone can write `r.length = -5;` (invalid state); with it, **every change goes through code you control** (validation, logging), and internals can change without breaking callers. Examples: Student information management, **temperature converter** (private Celsius with `getFahrenheit()`), employee salary (reject negative), shape drawing, vehicle manufacturing, food ordering.
#### Worked Example 38: encapsulation with validation, a derived property and an immutable record

```java
public class Main {
    static class BankAccount {
        private final String accountNo;
        private double balance;

        BankAccount(String accountNo, double opening) {
            this.accountNo = accountNo;
            deposit(opening);
        }

        public double getBalance() { return balance; }               // read-only: no setBalance
        public String getAccountNo() { return "XXXX" + accountNo.substring(accountNo.length() - 4); }

        public void deposit(double amt) {
            if (amt <= 0) throw new IllegalArgumentException("deposit must be positive");
            balance += amt;
        }

        public void withdraw(double amt) {
            if (amt > balance) throw new IllegalStateException("insufficient balance");
            balance -= amt;
        }
    }

    static class Temperature {
        private double celsius;
        public void setCelsius(double c) {
            if (c < -273.15) throw new IllegalArgumentException("below absolute zero");
            celsius = c;
        }
        public double getFahrenheit() { return celsius * 9 / 5 + 32; }   // derived, never stored
    }

    record Point(int x, int y) { }            // Java 16+: private final fields + accessors generated

    public static void main(String[] args) {
        BankAccount acc = new BankAccount("123456789012", 1000);
        acc.withdraw(300);
        System.out.println(acc.getAccountNo() + " balance " + acc.getBalance());
        try { acc.withdraw(5000); } catch (IllegalStateException e) { System.out.println("rejected: " + e.getMessage()); }
        try { acc.deposit(-50); } catch (IllegalArgumentException e) { System.out.println("rejected: " + e.getMessage()); }

        Temperature t = new Temperature();
        t.setCelsius(25);
        System.out.println("25 C = " + t.getFahrenheit() + " F");

        Point p = new Point(3, 4);
        System.out.println(p + ", x = " + p.x() + ", equal to new Point(3,4)? " + p.equals(new Point(3, 4)));
    }
}
```

**Output:**
```text
XXXX9012 balance 700.0
rejected: insufficient balance
rejected: deposit must be positive
25 C = 77.0 F
Point[x=3, y=4], x = 3, equal to new Point(3,4)? true
```

**Explanation:**
- `balance` can change **only** through `deposit` and `withdraw`, which enforce the rules. There is deliberately no `setBalance`, because "set any balance" is not a valid business operation.
- The getter can transform data on the way out: the account number is **masked** so callers never see the full value.
- `getFahrenheit()` computes its value from the single stored field, so the two units can never disagree.
- A `record` is the shortest way to write an **immutable** data carrier: fields are `private final`, and the constructor, accessors (`x()`), `equals`, `hashCode` and `toString` are generated.

---

# 19. Inner Classes and Lambda Expressions

| Kind | Example |
|---|---|
| **Member inner class** | `class Outer { int x = 10; class Inner { int sum() { return x + 5; } } }` → `Outer.Inner in = new Outer().new Inner();` (can use the outer's members) |
| **Static nested class** | `static class Nested { ... }` → `new Outer.Nested()` (no outer object needed) |
| **Local class** | declared inside a method; visible only there |
| **Anonymous class** | one-off implementation: `new Greeter() { public String greet(String n) { ... } }` |

All four verified: `15 nested`, `local class`, `Hi A (anonymous)`. Uses: Car & Engine, School & Classroom, Library & Book, calculator with `MathOperations`, configuration managers, button click handlers.
#### Worked Example 39: all four kinds of nested classes

```java
public class Main {
    private int base = 10;

    class Inner {                                   // member inner class: tied to an Outer object
        int sum() { return base + 5; }              // can read the outer object's fields
    }

    static class Nested {                           // static nested: no outer object needed
        String hello() { return "nested"; }
    }

    interface Greeter { String greet(String n); }

    String runLocal() {
        class Local {                               // local class: visible only in this method
            String shout(String s) { return s.toUpperCase() + "!"; }
        }
        return new Local().shout("local class");
    }

    public static void main(String[] args) {
        Main outer = new Main();
        Main.Inner in = outer.new Inner();          // special syntax: outerObject.new Inner()
        System.out.println("inner sum   : " + in.sum());
        System.out.println("static nested: " + new Main.Nested().hello());
        System.out.println("local       : " + outer.runLocal());

        Greeter anon = new Greeter() {              // anonymous class: one-off implementation
            @Override public String greet(String n) { return "Hi " + n + " (anonymous)"; }
        };
        Greeter lambda = n -> "Hi " + n + " (lambda)";
        System.out.println(anon.greet("A"));
        System.out.println(lambda.greet("B"));
    }
}
```

**Output:**
```text
inner sum   : 15
static nested: nested
local       : LOCAL CLASS!
Hi A (anonymous)
Hi B (lambda)
```

**Explanation:**
- A **member inner class** object always belongs to an outer object (hence `outer.new Inner()`), so it can read `base` directly.
- A **static nested** class is just a class namespaced inside another; prefer it whenever the inner code does not need the outer object.
- A **local** class exists only inside its method.
- An **anonymous** class and a **lambda** both implement `Greeter` on the spot. Because `Greeter` has exactly one abstract method, the lambda form is far shorter.

**Lambda expressions (Java 8):** a short anonymous function for a **functional interface** (one abstract method).

```java
interface Greeter { String greet(String n); }
Greeter g = n -> "Hi " + n;                                   // (parameters) -> expression
Greeter g2 = (String n) -> { return "Hello " + n; };           // block body
BiFunction<Integer, Integer, Integer> add = (p, q) -> p + q;   // add.andThen(x -> x * 2).apply(2, 3) = 10 (verified)
```

Syllabus: SimpleMathOperation, StringConverter (`s -> s.toUpperCase()`), NumberTester (`n -> n % 2 == 0`) with lambdas. Lambdas may use only **effectively final** local variables. More: [java-stream-api.md](java-stream-api.md).
#### Worked Example 40: lambdas with custom and built-in functional interfaces

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;

public class Main {
    @FunctionalInterface
    interface MathOperation { int apply(int a, int b); }

    public static void main(String[] args) {
        MathOperation add = (a, b) -> a + b;
        MathOperation power = (a, b) -> { int r = 1; for (int i = 0; i < b; i++) r *= a; return r; };
        System.out.println("add 4,5 = " + add.apply(4, 5) + ", 2^10 = " + power.apply(2, 10));

        Function<String, String> upper = s -> s.toUpperCase();
        Function<String, Integer> length = String::length;          // method reference
        Predicate<Integer> isEven = n -> n % 2 == 0;
        Supplier<String> greeting = () -> "Hello from a Supplier";
        BiFunction<Integer, Integer, Integer> mul = (p, q) -> p * q;

        System.out.println(upper.apply("java") + " " + length.apply("lambda") + " " + isEven.test(7) + " " + greeting.get());
        System.out.println("mul then double = " + mul.andThen(x -> x * 2).apply(3, 4));
        System.out.println("upper then length = " + upper.andThen(length).apply("spring"));

        List<String> names = new ArrayList<>(Arrays.asList("ravi", "asha", "meena", "om"));
        names.removeIf(n -> n.length() < 3);
        names.sort((x, y) -> y.compareTo(x));                      // descending
        names.forEach(n -> System.out.print(n + " "));
        System.out.println();

        int bonus = 10;                                            // effectively final
        Function<Integer, Integer> addBonus = s -> s + bonus;
        System.out.println("score 80 + bonus = " + addBonus.apply(80));
        // bonus = 20;   // would make the lambda above a compile error
    }
}
```

**Output:**
```text
add 4,5 = 9, 2^10 = 1024
JAVA 6 false Hello from a Supplier
mul then double = 24
upper then length = 6
ravi meena asha 
score 80 + bonus = 90
```

**Explanation:**

| Interface | Method | Takes → returns | Example |
|---|---|---|---|
| `Function<T,R>` | `apply` | T → R | `s -> s.toUpperCase()` |
| `Predicate<T>` | `test` | T → boolean | `n -> n % 2 == 0` |
| `Supplier<T>` | `get` | nothing → T | `() -> "Hello"` |
| `Consumer<T>` | `accept` | T → nothing | `n -> System.out.print(n)` |
| `BiFunction<T,U,R>` | `apply` | (T, U) → R | `(p, q) -> p * q` |

- `andThen` chains functions: `mul(3, 4) = 12`, then `x * 2 = 24`.
- `String::length` is a **method reference**, a shorter lambda when it only calls an existing method.
- `removeIf`, `sort` and `forEach` accept lambdas, which is how collection code becomes concise.
- A lambda can read a local variable only if it is **effectively final** (never reassigned).

---

# 20. Design Patterns: Singleton

A **design pattern** is a proven solution to a recurring design problem. **Singleton** guarantees **one instance** with a global access point (Village Well, School Principal, Database Connection, GameState).

```java
class DatabaseConnection {
    private static DatabaseConnection instance;                 // 1. the one instance
    private DatabaseConnection() { }                            // 2. private constructor: nobody else can `new`
    public static synchronized DatabaseConnection getInstance() {   // 3. global access, thread-safe
        if (instance == null) instance = new DatabaseConnection();
        return instance;
    }
}
```
Better ways: an **enum** singleton (`enum Single { INSTANCE; }`) or the **holder idiom** (a private static nested class holding the instance); both verified to give the same instance. If the singleton is `Serializable`, add `private Object readResolve() { return INSTANCE; }` so deserialization does not create a second one (verified: `singletonSame=true`).
#### Worked Example 41: three singleton implementations and proof of a single instance

```java
public class Main {
    static class DatabaseConnection {                       // lazy, synchronized
        private static DatabaseConnection instance;
        private static int created = 0;
        private DatabaseConnection() { created++; System.out.println("  connecting... (instance #" + created + ")"); }
        public static synchronized DatabaseConnection getInstance() {
            if (instance == null) instance = new DatabaseConnection();
            return instance;
        }
    }

    static class Config {                                   // holder idiom: lazy and thread-safe without locks
        private Config() { System.out.println("  Config created"); }
        private static class Holder { static final Config INSTANCE = new Config(); }
        static Config get() { return Holder.INSTANCE; }
    }

    enum GameState {                                        // enum: the simplest, serialization-safe
        INSTANCE;
        private int score;
        void add(int p) { score += p; }
        int score() { return score; }
    }

    public static void main(String[] args) throws Exception {
        System.out.println("asking for the connection 3 times:");
        DatabaseConnection a = DatabaseConnection.getInstance();
        DatabaseConnection b = DatabaseConnection.getInstance();
        DatabaseConnection c = DatabaseConnection.getInstance();
        System.out.println("same object? " + (a == b && b == c));

        System.out.println("before first Config.get()");
        Config c1 = Config.get();
        System.out.println("same Config? " + (c1 == Config.get()));

        GameState.INSTANCE.add(10);
        GameState.INSTANCE.add(5);
        System.out.println("game score = " + GameState.INSTANCE.score());

        Thread[] threads = new Thread[4];
        DatabaseConnection[] seen = new DatabaseConnection[4];
        for (int i = 0; i < 4; i++) { int k = i; threads[i] = new Thread(() -> seen[k] = DatabaseConnection.getInstance()); threads[i].start(); }
        for (Thread t : threads) t.join();
        System.out.println("4 threads got the same instance? " + (seen[0] == a && seen[1] == a && seen[2] == a && seen[3] == a));
    }
}
```

**Output:**
```text
asking for the connection 3 times:
  connecting... (instance #1)
same object? true
before first Config.get()
  Config created
same Config? true
game score = 15
4 threads got the same instance? true
```

**Explanation:**
- The **private constructor** is the heart of the pattern: no other class can call `new DatabaseConnection()`, so `getInstance()` is the only way in. `connecting...` prints **once** despite three requests.
- `synchronized` stops two threads from both seeing `instance == null` and creating two objects.
- **Holder idiom:** the nested `Holder` class is loaded only when `get()` first touches it (note `Config created` appears **after** `before first Config.get()`). Class loading is thread-safe by JVM guarantee, so no lock is needed on later calls.
- **Enum singleton:** the JVM guarantees exactly one `INSTANCE`, even across serialization and reflection, which makes it the most robust choice (recommended in *Effective Java*).

---

# 21. Arrays (1D, 2D, 3D) and the `main()` Method

## 21.1 Arrays

A **data structure** organizes data for efficient use. An **array** stores a fixed number of same-type values in contiguous memory, indexed from 0.

```java
int[] a = new int[5];                 // five 0s;  a.length = 5 (a field)
int[] b = {4, 11, 7, 20, 3};          // literal
for (int i = 0; i < b.length; i++) System.out.print(b[i] + " ");    // traverse
for (int v : b) System.out.print(v + " ");                           // for-each
// a[5] → ArrayIndexOutOfBoundsException
```

Standard exercises (user input into an array, sum, reverse, max, min, average, sum of evens): single loops. Reverse with two pointers (`swap a[i], a[n-1-i]`).
#### Worked Example 42: the standard 1-D array exercises in one pass

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] a = {12, 45, 7, 23, 56, 8};
        int sum = 0, evenSum = 0, max = a[0], min = a[0];
        for (int v : a) {
            sum += v;
            if (v % 2 == 0) evenSum += v;
            if (v > max) max = v;
            if (v < min) min = v;
        }
        System.out.println("array    = " + Arrays.toString(a));
        System.out.println("sum = " + sum + ", average = " + (double) sum / a.length + ", even sum = " + evenSum);
        System.out.println("max = " + max + ", min = " + min);

        for (int i = 0, j = a.length - 1; i < j; i++, j--) { int t = a[i]; a[i] = a[j]; a[j] = t; }
        System.out.println("reversed = " + Arrays.toString(a));

        Arrays.sort(a);
        System.out.println("sorted   = " + Arrays.toString(a) + ", index of 23 = " + Arrays.binarySearch(a, 23));

        int[] filled = new int[4];
        Arrays.fill(filled, 7);
        System.out.println("filled   = " + Arrays.toString(filled) + ", stream sum = " + Arrays.stream(a).sum());
    }
}
```

**Output:**
```text
array    = [12, 45, 7, 23, 56, 8]
sum = 151, average = 25.166666666666668, even sum = 76
max = 56, min = 7
reversed = [8, 56, 23, 7, 45, 12]
sorted   = [7, 8, 12, 23, 45, 56], index of 23 = 3
filled   = [7, 7, 7, 7], stream sum = 151
```

**Explanation:**
- One loop computes all statistics; there is no need to loop once per statistic.
- `max` and `min` start at `a[0]` so the code is correct for negative numbers too.
- The two-pointer reverse swaps `a[0]↔a[5]`, `a[1]↔a[4]`, `a[2]↔a[3]`, then stops when the pointers meet: `n/2` swaps, no extra array.
- `Arrays.binarySearch` is valid **only after sorting**; on the unsorted array its answer would be meaningless.

**2D arrays (matrix)** `int[][] m = new int[rows][cols];`

```java
int[][] m = {{1, 2, 3}, {4, 5, 6}};
int[][] t = new int[3][2];
for (int i = 0; i < 2; i++) for (int j = 0; j < 3; j++) t[j][i] = m[i][j];   // TRANSPOSE
// [[1, 4], [2, 5], [3, 6]]      (verified)
```

**Jagged array** (rows of different length): `int[][] j = new int[3][]; j[0] = new int[1]; j[1] = new int[2]; ...` → `[[1], [2, 2], [3, 3, 3]]` (verified). Sum of the minimum of each row: loop rows, track the row's min, add.
#### Worked Example 43: matrix addition, multiplication, row minimum and a jagged array

```java
import java.util.Arrays;

public class Main {
    static void print(String label, int[][] m) {
        System.out.println(label);
        for (int[] row : m) System.out.println("  " + Arrays.toString(row));
    }

    public static void main(String[] args) {
        int[][] a = {{1, 2}, {3, 4}};
        int[][] b = {{5, 6}, {7, 8}};
        int n = 2;

        int[][] sum = new int[n][n];
        int[][] prod = new int[n][n];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++) {
                sum[i][j] = a[i][j] + b[i][j];
                for (int k = 0; k < n; k++) prod[i][j] += a[i][k] * b[k][j];   // row of a · column of b
            }
        print("A + B", sum);
        print("A x B", prod);

        int[][] marks = {{70, 85, 60}, {90, 40, 75}, {55, 65, 95}};
        int total = 0;
        for (int[] row : marks) {
            int rowMin = row[0];
            for (int v : row) rowMin = Math.min(rowMin, v);
            total += rowMin;
        }
        System.out.println("sum of row minimums = " + total);

        int[][] jag = new int[3][];
        for (int i = 0; i < jag.length; i++) {
            jag[i] = new int[i + 1];
            Arrays.fill(jag[i], i + 1);
        }
        System.out.println("jagged = " + Arrays.deepToString(jag));
    }
}
```

**Output:**
```text
A + B
  [6, 8]
  [10, 12]
A x B
  [19, 22]
  [43, 50]
sum of row minimums = 155
jagged = [[1], [2, 2], [3, 3, 3]]
```

**Explanation:**
- Matrix **addition** adds matching cells. Matrix **multiplication** sets each cell `(i, j)` to the dot product of row `i` of A with column `j` of B: `prod[0][0] = 1×5 + 2×7 = 19`, `prod[1][1] = 3×6 + 4×8 = 50`. It needs a third loop (`k`), so it is O(n³).
- Row minimums: `60 + 40 + 55 = 155`.
- In a jagged array only the number of rows is fixed at first (`new int[3][]`); each row is created separately with its own length.

**3D arrays:** `int[2][2][2]` = 2 layers × 2 rows × 2 columns: `[[[1, 2], [3, 4]], [[5, 6], [7, 8]]]`, and the sum of layer 0 is `10` (verified). "Average of each 3D column" and "maximum of each 2D layer" are triple loops with accumulators per layer/column.
#### Worked Example 44: a 3-D array of sales (store × week × day)

```java
public class Main {
    public static void main(String[] args) {
        int[][][] sales = {                       // [store][week][day]
            {{5, 7, 6}, {8, 4, 9}},               // store 0
            {{3, 2, 4}, {6, 5, 7}}                // store 1
        };
        for (int s = 0; s < sales.length; s++) {
            int storeTotal = 0, best = Integer.MIN_VALUE;
            for (int w = 0; w < sales[s].length; w++)
                for (int d = 0; d < sales[s][w].length; d++) {
                    storeTotal += sales[s][w][d];
                    best = Math.max(best, sales[s][w][d]);
                }
            System.out.println("store " + s + ": total " + storeTotal + ", best day " + best);
        }
        System.out.printf("average of day 0 across all stores and weeks = %.2f%n",
                (sales[0][0][0] + sales[0][1][0] + sales[1][0][0] + sales[1][1][0]) / 4.0);
        System.out.println("dimensions: " + sales.length + " x " + sales[0].length + " x " + sales[0][0].length);
    }
}
```

**Output:**
```text
store 0: total 39, best day 9
store 1: total 27, best day 7
average of day 0 across all stores and weeks = 5.50
dimensions: 2 x 2 x 3
```

**Explanation:** a 3-D array is an array of 2-D arrays. Each extra dimension adds one nested loop; `sales[s].length` and `sales[s][w].length` give the size at each level. Store 0 totals `18 + 21 = 39`; day-0 average is `(5 + 8 + 3 + 6) / 4 = 5.5`.

## 21.2 `main()` in depth (all verified)

| Question | Answer |
|---|---|
| Valid signature | `public static void main(String[] args)`; `String... args`, `String args[]`, `static public`, `final String[] args` are also fine |
| Overloading `main` | Allowed; the JVM calls only the `String[]` version. Other overloads run only if you call them. |
| Multiple `main` methods | Several classes may each have one; **`java ClassName` chooses**. |
| `main` in an interface | **Works** (static methods are allowed in interfaces): `java M1` prints `interface main, args=0` |
| Wrong return type | `public static int main` → *"Main method must return a value of type void"* |
| Missing `static`/`public` | Class compiles but cannot start (*"Main method not found"* / "must be public static") |
| `args` | Empty array (never `null`) when no arguments are passed |
| Quotes | `java M3 10 20 "hello world"` → `args = ["10", "20", "hello world"]` (3 elements) |
| Parsing numbers | `Integer.parseInt(args[0]) + Integer.parseInt(args[1])` → `30`; non-numeric → `NumberFormatException` |
| Static block | Runs **before** `main` |
#### Worked Example 45: summing command-line numbers safely

```java
public class Main {
    static { System.out.println("static block runs before main"); }

    public static void main(String[] args) {
        if (args.length == 0) args = new String[]{"10", "20", "abc", "5"};   // default when run without arguments
        int sum = 0;
        for (String a : args) {
            try {
                sum += Integer.parseInt(a);
            } catch (NumberFormatException e) {
                System.out.println("skipping non-number: " + a);
            }
        }
        System.out.println("sum = " + sum);
        main(5);                                    // an overload: runs only because we call it
    }

    static void main(int x) { System.out.println("overloaded main(int) called with " + x); }
}
```

**Output:**
```text
static block runs before main
skipping non-number: abc
sum = 35
overloaded main(int) called with 5
```

**Explanation:** the static block runs while the class is loaded, before the JVM calls `main(String[])`. `Integer.parseInt("abc")` throws `NumberFormatException`; catching it per argument lets the program skip bad input instead of crashing. The JVM only ever calls the `String[]` version of `main`; any other overload is an ordinary method.

---

# 22. Strings

A `String` is an **immutable** sequence of characters (an object, not a primitive).

**Why strings?** Without them you would manage text as arrays of `char`, writing your own length/compare/search code. Strings give a rich API, safe sharing, and literal syntax: used for names, emails, messages, passwords, file paths, JSON, SQL.

**String pool:** literals with the same text share **one** object in the pool; `new String("x")` always makes a new heap object.

```java
String s1 = "java", s2 = "ja" + "va", s3 = new String("java"), s4 = "ja";
String s5 = s4 + "va";                                    // runtime concatenation → new object
// s1 == s2 → true     (compile-time constant, same pooled object)
// s1 == s3 → false    s1 == s5 → false     s1 == s5.intern() → true      (all verified)
```

**How many objects does `String s = new String("hello");` create?** Up to **2** (the pooled literal and the heap copy). `String a = "hi"; String b = "hi";` → 1.
#### Worked Example 46: the string pool, `intern()` and immutability

```java
public class Main {
    public static void main(String[] args) {
        String s1 = "java";
        String s2 = "ja" + "va";                 // compile-time constant → pooled
        String s3 = new String("java");          // explicit heap object
        String s4 = "ja";
        String s5 = s4 + "va";                   // run-time concatenation → new object
        final String s6 = "ja";
        String s7 = s6 + "va";                   // s6 is a compile-time constant → pooled

        System.out.println("s1 == s2 : " + (s1 == s2));
        System.out.println("s1 == s3 : " + (s1 == s3));
        System.out.println("s1 == s5 : " + (s1 == s5));
        System.out.println("s1 == s7 : " + (s1 == s7));
        System.out.println("s1 == s3.intern() : " + (s1 == s3.intern()));
        System.out.println("s1.equals(s3) : " + s1.equals(s3));

        String name = "asha";
        name.toUpperCase();                      // result discarded: name unchanged
        System.out.println("after toUpperCase(): " + name);
        name = name.toUpperCase();               // reassign to keep the new string
        System.out.println("after reassignment : " + name);

        String user = "ravi_01";
        String updated = user.replace("_01", "_2025");
        System.out.println("original " + user + ", updated " + updated);
    }
}
```

**Output:**
```text
s1 == s2 : true
s1 == s3 : false
s1 == s5 : false
s1 == s7 : true
s1 == s3.intern() : true
s1.equals(s3) : true
after toUpperCase(): asha
after reassignment : ASHA
original ravi_01, updated ravi_2025
```

**Explanation:**

```
String pool (in heap)          Regular heap
┌────────────┐
│  "java" ◄──┼── s1, s2, s7     s3 ──► "java" (separate object)
│  "ja"   ◄──┼── s4, s6         s5 ──► "java" (built at run time)
└────────────┘
```

- The compiler folds `"ja" + "va"` and `s6 + "va"` (because `s6` is `final` with a literal value) into the literal `"java"`, so they share the pooled object.
- `s4 + "va"` is computed at run time with a `StringBuilder`, producing a new object.
- `intern()` returns the pooled copy of a string with the same content.
- String methods never modify the original; you must keep the returned value.

**Immutability:** `s.concat("x")` / `toUpperCase()` return **new** strings; the original is unchanged; "Immutable Username Update" = reassign the variable.

## 22.1 Core methods (verified examples earlier)

| Method | Example → result |
|---|---|
| `length()` | `"Java".length()` → 4 |
| `charAt(i)` | `"Java".charAt(2)` → `v` |
| `concat(s)` / `+` | `"a".concat("b")` → `ab` |
| `equals`, `equalsIgnoreCase` | content comparison (never `==`) |
| `indexOf(x)` | first position or -1 |
| `substring(from, to)` | `to` is exclusive |
| `toUpperCase()`, `toLowerCase()` | |
| `trim()` / `strip()` | remove surrounding whitespace |
| `replace(a, b)` / `replaceAll(regex, b)` | |
| `split(regex)` / `String.join(sep, ...)` | `"a,b".split(",")` |
| `startsWith`, `endsWith`, `isEmpty`, `contains` | booleans |
| `matches(regex)` | `"test@mail.com".matches("[\\w.]+@[\\w.]+\\.[a-z]{2,}")` → `true`, `"bad@"` → `false` (verified) |
| `String.format("%5d\|%-5s\|%.2f", ...)` | formatting |

**Concatenation performance:** `+` in a loop creates many temporary objects; use **`StringBuilder`** (single thread, fast) or **`StringBuffer`** (synchronized). `new StringBuilder().capacity()` = **16** (verified).
#### Worked Example 47: `StringBuilder` operations and the cost of `+` in a loop

```java
public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Java");
        sb.append(" is").append(" fun");          // methods return the same builder → chaining
        System.out.println(sb);
        sb.insert(0, ">> ");
        System.out.println(sb);
        sb.replace(3, 7, "JAVA");
        System.out.println(sb);
        sb.deleteCharAt(sb.length() - 1).append("!");
        System.out.println(sb + "  length=" + sb.length() + " capacity>=length? " + (sb.capacity() >= sb.length()));
        System.out.println("reversed: " + new StringBuilder("racecar").reverse() + ", " + new StringBuilder("stack").reverse());
        System.out.println("default capacity of new StringBuilder() = " + new StringBuilder().capacity());

        int n = 20000;
        long t1 = System.nanoTime();
        String s = "";
        for (int i = 0; i < n; i++) s += "x";
        long t2 = System.nanoTime();
        StringBuilder b = new StringBuilder();
        for (int i = 0; i < n; i++) b.append("x");
        long t3 = System.nanoTime();
        System.out.println("same result: " + s.equals(b.toString()));
        System.out.println("StringBuilder faster: " + ((t3 - t2) < (t2 - t1)));
    }
}
```

**Output:**
```text
Java is fun
>> Java is fun
>> JAVA is fun
>> JAVA is fu!  length=14 capacity>=length? true
reversed: racecar, kcats
default capacity of new StringBuilder() = 16
same result: true
StringBuilder faster: true
```

**Explanation:**
- `StringBuilder` is **mutable**: `append`, `insert`, `replace`, `deleteCharAt` and `reverse` change the same object, and each returns it so calls can be chained.
- `replace(3, 7, "JAVA")` replaces indexes 3-6 (`Java`) with `JAVA`; like `substring`, the end index is exclusive.
- `s += "x"` creates a new `String` every time and copies all previous characters, so 20,000 iterations do roughly 200 million character copies (O(n²)). The builder appends into a growing buffer (amortised O(n)). On a typical machine the loop with `+` takes tens of milliseconds and the builder well under one.
- `StringBuffer` has the same API but synchronises every method; use it only when several threads share one buffer.

**Formatting and internationalisation:** `DecimalFormat("#,##0.00")`, `SimpleDateFormat("dd-MM-yyyy")` (legacy; prefer `java.time.format.DateTimeFormatter`), `NumberFormat.getCurrencyInstance(Locale)`, `String.format(Locale, ...)`. **Best practices:** compare with `equals`; avoid `+` in loops; use `StringBuilder`; check `null`/`isEmpty()`/`isBlank()`; never log passwords; use text blocks for multi-line.

## 22.2 String problems (verified)

| Problem | Approach | Result |
|---|---|---|
| Count vowels | loop, `"aeiou".indexOf(lower) >= 0` | `Education` → 5 |
| Anagram check | sort both char arrays, `Arrays.equals` | `listen`/`silent` → `true` |
| Remove all whitespace | `s.replaceAll("\\s", "")` | |
| Character frequency | `LinkedHashMap` + `merge` | `hello` → `{h=1, e=1, l=2, o=1}` |
| Extract digits | `replaceAll("\\D", "")` | `a1b22c3` → `1223` |
| Capitalize each word | split, `toUpperCase` first char | `java is fun` → `Java Is Fun` |
| Rotation check | `(a + a).contains(b)` and equal lengths | `ABCD`/`CDAB` → `true` |
| Longest substring without repeating | sliding window with a `Set` | `abcabcbb` → 3 |
| Longest palindromic substring | expand around each center | `babad` → `bab` |
| Permutations | recursion: fix a character, permute the rest | `abc` → `[abc, acb, bac, bca, cab, cba]` |
| Remove all vowels | `replaceAll("[aeiouAEIOU]", "")` | `programming language` → `prgrmmng lngg` |
| ASCII value | `(int) 'A'` | 65 |
| Toggle case of each character | `Character.isUpperCase` ? lower : upper | `Hello World java` → `hELLO wORLD JAVA` |
| Palindrome | compare with reverse (`StringBuilder.reverse()`) or two pointers | |
| Count a character | loop with a counter | |
| Reverse without `reverse()` | loop from the end / two-pointer swap | |
| Reverse **without a third variable** | XOR swap on a `char[]` (two pointers): `a ^= b; b ^= a; a ^= b;` | `abcde` → `edcba` |
| Regex validator | `matches(pattern)` | email example above |
| Print all characters / substring / length / equality / concatenation / `contains` / upper & lower / char at position | one-liners with the table above | |

```java
static boolean anagram(String a, String b) { char[] x = a.toCharArray(), y = b.toCharArray(); Arrays.sort(x); Arrays.sort(y); return Arrays.equals(x, y); }
static int longestNoRepeat(String s) {
    Set<Character> set = new HashSet<>(); int l = 0, best = 0;
    for (int r = 0; r < s.length(); r++) { while (set.contains(s.charAt(r))) set.remove(s.charAt(l++)); set.add(s.charAt(r)); best = Math.max(best, r - l + 1); }
    return best;
}
```

#### Worked Example 48: eight classic string problems, solved and run

```java
import java.util.*;

public class Main {
    static int countVowels(String s) {
        int c = 0;
        for (char ch : s.toLowerCase().toCharArray()) if ("aeiou".indexOf(ch) >= 0) c++;
        return c;
    }
    static boolean anagram(String a, String b) {
        char[] x = a.toCharArray(), y = b.toCharArray();
        Arrays.sort(x); Arrays.sort(y);
        return Arrays.equals(x, y);
    }
    static Map<Character, Integer> frequency(String s) {
        Map<Character, Integer> m = new LinkedHashMap<>();
        for (char c : s.toCharArray()) m.merge(c, 1, Integer::sum);
        return m;
    }
    static boolean isRotation(String a, String b) { return a.length() == b.length() && (a + a).contains(b); }
    static String toggle(String s) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray())
            sb.append(Character.isUpperCase(c) ? Character.toLowerCase(c) : Character.toUpperCase(c));
        return sb.toString();
    }
    static int longestNoRepeat(String s) {
        Set<Character> set = new HashSet<>();
        int l = 0, best = 0;
        for (int r = 0; r < s.length(); r++) {
            while (set.contains(s.charAt(r))) set.remove(s.charAt(l++));
            set.add(s.charAt(r));
            best = Math.max(best, r - l + 1);
        }
        return best;
    }
    static String longestPalindrome(String s) {
        int start = 0, len = 0;
        for (int c = 0; c < s.length(); c++)
            for (int odd = 0; odd < 2; odd++) {           // odd = 0 → center on a char, 1 → between chars
                int l = c, r = c + odd;
                while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }
                if (r - l - 1 > len) { len = r - l - 1; start = l + 1; }
            }
        return s.substring(start, start + len);
    }
    static void permute(String prefix, String rest, List<String> out) {
        if (rest.isEmpty()) { out.add(prefix); return; }
        for (int i = 0; i < rest.length(); i++)
            permute(prefix + rest.charAt(i), rest.substring(0, i) + rest.substring(i + 1), out);
    }

    public static void main(String[] args) {
        System.out.println("vowels in Education      : " + countVowels("Education"));
        System.out.println("listen/silent anagram    : " + anagram("listen", "silent"));
        System.out.println("frequency of hello       : " + frequency("hello"));
        System.out.println("CDAB rotation of ABCD    : " + isRotation("ABCD", "CDAB"));
        System.out.println("toggle Hello World java  : " + toggle("Hello World java"));
        System.out.println("digits from a1b22c3      : " + "a1b22c3".replaceAll("\\D", ""));
        System.out.println("without vowels           : " + "programming language".replaceAll("[aeiouAEIOU]", ""));
        System.out.println("longest no-repeat run    : " + longestNoRepeat("abcabcbb"));
        System.out.println("longest palindrome babad : " + longestPalindrome("babad"));
        List<String> perms = new ArrayList<>();
        permute("", "abc", perms);
        System.out.println("permutations of abc      : " + perms);
        System.out.println("email valid?             : " + "test@mail.com".matches("[\\w.]+@[\\w.]+\\.[a-z]{2,}") + " / " + "bad@".matches("[\\w.]+@[\\w.]+\\.[a-z]{2,}"));
    }
}
```

**Output:**
```text
vowels in Education      : 5
listen/silent anagram    : true
frequency of hello       : {h=1, e=1, l=2, o=1}
CDAB rotation of ABCD    : true
toggle Hello World java  : hELLO wORLD JAVA
digits from a1b22c3      : 1223
without vowels           : prgrmmng lngg
longest no-repeat run    : 3
longest palindrome babad : bab
permutations of abc      : [abc, acb, bac, bca, cab, cba]
email valid?             : true / false
```

**How the key algorithms work:**
- **Anagram:** sorting both words gives `eilnst` for `listen` and `silent`; equal sorted forms mean the same letters. O(n log n).
- **Frequency:** `merge(c, 1, Integer::sum)` puts 1 for a new key or adds 1 to an existing count; `LinkedHashMap` keeps first-seen order.
- **Rotation:** every rotation of `ABCD` appears inside `ABCDABCD`.
- **Sliding window (`abcabcbb`):** the window `[l, r]` always holds distinct characters. When `s[r]` is already inside, characters are removed from the left until it is not. The longest window is `abc` (3).
- **Expand around center:** each character (and each gap) is tried as the middle of a palindrome and expanded while both ends match. For `babad` both `bab` and `aba` have length 3; the first found is kept.
- **Permutations:** fix each character in turn as the next letter, then permute the remaining ones recursively. `n` characters give `n!` permutations (3! = 6).

---

# 23. Algorithms: Big O, Searching, Sorting

An **algorithm** is a finite, step-by-step procedure to solve a problem; **code** is one implementation of it in a language. The same algorithm can be written in Java, Python or C. Algorithms matter because they decide **speed and memory** as data grows, and interviews (product-based companies in particular) test them; service-based interviews lean more on language and framework knowledge.

## 23.1 Complexity (Big O)

Big O describes how running time (or memory) **grows with input size n**, ignoring constants.

| Notation | Name | Example |
|---|---|---|
| O(1) | constant | array access `a[i]`, `HashMap.get` (average) |
| O(log n) | logarithmic | **binary search** (halves the range) |
| O(n) | linear | linear search, one loop over the data |
| O(n log n) | linearithmic | merge sort, `Arrays.sort` (objects) |
| O(n²) | quadratic | **nested loops**, bubble/selection/insertion sort |
| O(2ⁿ) | exponential | naive recursive Fibonacci, subsets |

**Best / average / worst case:** linear search finds the item at index 0 (best, O(1)), anywhere (average O(n/2) → O(n)) or not at all (worst, O(n)). For large data prefer the lower row of growth: **O(n log n) beats O(n²)**; for lookups **O(log n)** or O(1).

**Control constructs:** a single loop of n rounds → O(n); two nested loops → O(n²); `if/else` adds no growth; a loop that halves the range (`i /= 2`) → O(log n).
#### Worked Example 49: counting operations to see Big O

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("     n   O(log n)   O(n)   O(n log n)    O(n^2)");
        for (int n : new int[]{8, 64, 1024}) {
            long logOps = 0, linOps = 0, nlogOps = 0, quadOps = 0;
            for (int i = n; i > 1; i /= 2) logOps++;                     // halving loop
            for (int i = 0; i < n; i++) linOps++;                        // single loop
            for (int i = 0; i < n; i++) for (int j = n; j > 1; j /= 2) nlogOps++;
            for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) quadOps++;   // nested loops
            System.out.printf("%6d %10d %6d %12d %9d%n", n, logOps, linOps, nlogOps, quadOps);
        }
    }
}
```

**Output:**
```text
     n   O(log n)   O(n)   O(n log n)    O(n^2)
     8          3      8           24        64
    64          6     64          384      4096
  1024         10   1024        10240   1048576
```

**Explanation:** when `n` grows 128 times (8 → 1024), the halving loop grows from 3 to only 10 steps, the single loop grows 128 times, and the nested loops grow 16,384 times (128²). This is why an O(n²) algorithm that is fine for 1,000 items becomes unusable for 1,000,000 (10¹² steps), while O(n log n) needs only about 20 million.

**Problem-solving techniques:** understand the input/output; try small examples; brute force first, then optimize; use a **HashMap/Set** to trade memory for speed; **two pointers**; **sliding window**; **sorting** first; recursion/divide-and-conquer; always test edge cases (empty, one element, duplicates, negatives).

## 23.2 Searching

```java
static int linear(int[] a, int k) { for (int i = 0; i < a.length; i++) if (a[i] == k) return i; return -1; }        // O(n), any order

static int binary(int[] a, int k) {                                       // O(log n), array MUST be SORTED
    int lo = 0, hi = a.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;                                     // avoids int overflow of (lo + hi)
        if (a[mid] == k) return mid;
        if (a[mid] < k) lo = mid + 1; else hi = mid - 1;
    }
    return -1;
}
// linear({64,25,12,22,11}, 22) = 3     binary({2,5,8,12,16,23}, 16) = 4     binary({2,5,8}, 7) = -1   (verified)
```

#### Worked Example 50: linear vs binary search, with every step printed

```java
public class Main {
    static int linear(int[] a, int k) {
        for (int i = 0; i < a.length; i++) {
            if (a[i] == k) { System.out.println("  linear: found after " + (i + 1) + " comparisons"); return i; }
        }
        System.out.println("  linear: not found after " + a.length + " comparisons");
        return -1;
    }

    static int binary(int[] a, int k) {
        int lo = 0, hi = a.length - 1, steps = 0;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            steps++;
            System.out.println("  step " + steps + ": lo=" + lo + " hi=" + hi + " mid=" + mid + " a[mid]=" + a[mid]);
            if (a[mid] == k) return mid;
            if (a[mid] < k) lo = mid + 1; else hi = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] sorted = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
        System.out.println("search 72:");
        System.out.println("  result index " + linear(sorted, 72));
        System.out.println("  result index " + binary(sorted, 72));
        System.out.println("search 7 (absent):");
        System.out.println("  result index " + binary(sorted, 7));
    }
}
```

**Output:**
```text
search 72:
  linear: found after 9 comparisons
  result index 8
  step 1: lo=0 hi=9 mid=4 a[mid]=16
  step 2: lo=5 hi=9 mid=7 a[mid]=56
  step 3: lo=8 hi=9 mid=8 a[mid]=72
  result index 8
search 7 (absent):
  step 1: lo=0 hi=9 mid=4 a[mid]=16
  step 2: lo=0 hi=3 mid=1 a[mid]=5
  step 3: lo=2 hi=3 mid=2 a[mid]=8
  result index -1
```

**Explanation:**
- Each binary-search step compares with the middle element and discards **half** of the remaining range: `72 > 16` → search right half; `72 > 56` → right again; found at step 3.
- For the absent value 7, the range shrinks until `lo > hi` (after step 3, `hi` becomes 1 and `lo` is 2), and `-1` is returned.
- 10 elements need at most ⌈log₂ 11⌉ = 4 steps; a million elements need at most 20, versus up to a million comparisons for linear search.
- `mid = lo + (hi - lo) / 2` gives the same value as `(lo + hi) / 2` but cannot overflow when `lo + hi` exceeds `Integer.MAX_VALUE`.

Practice problems and verified results:

| Problem | Idea | Result |
|---|---|---|
| Minimum in a shifted sorted array | binary search comparing `a[mid]` with `a[hi]` | `{4,5,6,7,0,1,2}` → `0` |
| Common elements of two arrays | put one in a `HashSet`, scan the other | |
| Duplicate number | Floyd's cycle detection (values as pointers) or a `HashSet` | `{1,3,4,2,2}` → `2` |
| First and last position of an element | scan once recording first/last (or two binary searches) | `{5,7,7,8,8,10}`, 8 → `[3, 4]` |
| Pairs with divisible sum | double loop `(a[i]+a[j]) % k == 0` | |
| Highest scorer / most expensive item | linear scan for the max | |
| Split array largest sum | **binary search on the answer** | (advanced) |
#### Worked Example 51: four searching problems from the list

```java
import java.util.*;

public class Main {
    static int minRotated(int[] a) {                       // minimum in a rotated sorted array, O(log n)
        int lo = 0, hi = a.length - 1;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (a[mid] > a[hi]) lo = mid + 1;              // minimum is to the right of mid
            else hi = mid;                                 // mid could be the minimum
        }
        return a[lo];
    }

    static int duplicate(int[] a) {                        // Floyd's cycle detection, O(n) time, O(1) space
        int slow = a[0], fast = a[0];
        do { slow = a[slow]; fast = a[a[fast]]; } while (slow != fast);
        slow = a[0];
        while (slow != fast) { slow = a[slow]; fast = a[fast]; }
        return slow;
    }

    static int[] firstLast(int[] a, int k) {
        int first = -1, last = -1;
        for (int i = 0; i < a.length; i++) if (a[i] == k) { if (first < 0) first = i; last = i; }
        return new int[]{first, last};
    }

    static List<Integer> common(int[] x, int[] y) {
        Set<Integer> seen = new HashSet<>();
        for (int v : x) seen.add(v);
        List<Integer> out = new ArrayList<>();
        for (int v : y) if (seen.remove(v)) out.add(v);    // remove → each common value reported once
        return out;
    }

    public static void main(String[] args) {
        System.out.println("min of rotated [4,5,6,7,0,1,2] = " + minRotated(new int[]{4, 5, 6, 7, 0, 1, 2}));
        System.out.println("duplicate in [1,3,4,2,2]        = " + duplicate(new int[]{1, 3, 4, 2, 2}));
        System.out.println("first/last of 8 in [5,7,7,8,8,10] = " + Arrays.toString(firstLast(new int[]{5, 7, 7, 8, 8, 10}, 8)));
        System.out.println("common of [1,2,3,4] and [3,4,5,3] = " + common(new int[]{1, 2, 3, 4}, new int[]{3, 4, 5, 3}));
    }
}
```

**Output:**
```text
min of rotated [4,5,6,7,0,1,2] = 0
duplicate in [1,3,4,2,2]        = 2
first/last of 8 in [5,7,7,8,8,10] = [3, 4]
common of [1,2,3,4] and [3,4,5,3] = [3, 4]
```

**Explanation:**
- **Rotated array:** if `a[mid] > a[hi]`, the "drop" (where the minimum sits) must be right of `mid`; otherwise the right half is sorted and the minimum is at `mid` or to its left.
- **Floyd's algorithm:** treat each value as a pointer to an index. A duplicate value means two indexes point to the same place, which creates a **cycle**. A slow pointer (1 step) and a fast pointer (2 steps) must meet inside the cycle; restarting one from the beginning and moving both 1 step finds the cycle's entrance, which is the duplicate.
- **Common elements:** a `HashSet` gives O(1) lookups, so the total is O(n + m) instead of O(n × m) with nested loops.

## 23.3 Sorting

| Sort | Idea | Time (worst) | Stable? |
|---|---|---|---|
| **Bubble** | repeatedly swap adjacent out-of-order pairs; large values "bubble" to the end; stop early if no swap | O(n²) (best O(n) with the flag) | yes |
| **Selection** | pick the minimum of the unsorted part and swap it to the front | O(n²) | no |
| **Insertion** | grow a sorted left part; insert each new item into place | O(n²) (best O(n) if nearly sorted) | yes |

```java
static int[] insertion(int[] a) {
    for (int i = 1; i < a.length; i++) { int key = a[i], j = i - 1; while (j >= 0 && a[j] > key) { a[j + 1] = a[j]; j--; } a[j + 1] = key; }
    return a;
}
// all three sorted {64,25,12,22,11} → [11, 12, 22, 25, 64]   (verified)
```

#### Worked Example 52: bubble, selection and insertion sort with a pass-by-pass trace

```java
import java.util.Arrays;

public class Main {
    static void bubble(int[] a) {
        for (int pass = 0; pass < a.length - 1; pass++) {
            boolean swapped = false;
            for (int j = 0; j < a.length - 1 - pass; j++)
                if (a[j] > a[j + 1]) { int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t; swapped = true; }
            System.out.println("  bubble pass " + (pass + 1) + ": " + Arrays.toString(a));
            if (!swapped) break;                       // already sorted → stop early
        }
    }

    static void selection(int[] a) {
        for (int i = 0; i < a.length - 1; i++) {
            int min = i;
            for (int j = i + 1; j < a.length; j++) if (a[j] < a[min]) min = j;
            int t = a[i]; a[i] = a[min]; a[min] = t;
            System.out.println("  selection step " + (i + 1) + ": " + Arrays.toString(a));
        }
    }

    static void insertion(int[] a) {
        for (int i = 1; i < a.length; i++) {
            int key = a[i], j = i - 1;
            while (j >= 0 && a[j] > key) { a[j + 1] = a[j]; j--; }
            a[j + 1] = key;
            System.out.println("  insertion of " + key + ": " + Arrays.toString(a));
        }
    }

    public static void main(String[] args) {
        int[] data = {64, 25, 12, 22, 11};
        bubble(data.clone());
        selection(data.clone());
        insertion(data.clone());
        String[] names = {"Ravi", "asha", "Meena", "Om"};
        Arrays.sort(names, String.CASE_INSENSITIVE_ORDER);
        System.out.println("names (case-insensitive): " + Arrays.toString(names));
    }
}
```

**Output:**
```text
  bubble pass 1: [25, 12, 22, 11, 64]
  bubble pass 2: [12, 22, 11, 25, 64]
  bubble pass 3: [12, 11, 22, 25, 64]
  bubble pass 4: [11, 12, 22, 25, 64]
  selection step 1: [11, 25, 12, 22, 64]
  selection step 2: [11, 12, 25, 22, 64]
  selection step 3: [11, 12, 22, 25, 64]
  selection step 4: [11, 12, 22, 25, 64]
  insertion of 25: [25, 64, 12, 22, 11]
  insertion of 12: [12, 25, 64, 22, 11]
  insertion of 22: [12, 22, 25, 64, 11]
  insertion of 11: [11, 12, 22, 25, 64]
names (case-insensitive): [asha, Meena, Om, Ravi]
```

**Explanation:**
- **Bubble:** after pass *k*, the *k* largest values are in their final places at the end (64 first, then 25, …), so each pass can stop one position earlier.
- **Selection:** step *k* finds the minimum of the unsorted part and swaps it to position *k−1*. It always does n−1 swaps at most, but always O(n²) comparisons, even on sorted input.
- **Insertion:** the left part is always sorted; each new `key` slides left past larger values. On nearly sorted data it does very little work (O(n)), which is why real libraries use it for small slices.
- `data.clone()` gives each algorithm its own copy of the original unsorted array.
- Without `CASE_INSENSITIVE_ORDER`, uppercase names would sort before `asha` because `'R'` (82) < `'a'` (97).

Verified problems: **missing number** in `{3,0,1}` = `2` (sum formula `n(n+1)/2` minus the sum); **third maximum** of `{2,2,3,1}` = `1` (keep a 3-element `TreeSet`); **sort by parity** `{3,1,2,4}` → `[2, 4, 1, 3]`; **squares of a sorted array** `{-4,-1,0,3,10}` → `[0, 1, 9, 16, 100]` (two pointers from both ends); **two sum** `{2,7,11,15}`, 9 → indexes `[0, 1]` (HashMap); alphabetical bubble sort of names uses `compareTo`; salaries by insertion sort; product prices in descending order with insertion sort by flipping the comparison; **sort colors** (0,1,2) with selection sort or counting. In production use `Arrays.sort` / `Collections.sort` (TimSort, O(n log n)).
#### Worked Example 53: two sum, missing number, squares of a sorted array, sort colours

```java
import java.util.*;

public class Main {
    static int[] twoSum(int[] a, int target) {
        Map<Integer, Integer> seen = new HashMap<>();          // value → index
        for (int i = 0; i < a.length; i++) {
            Integer j = seen.get(target - a[i]);
            if (j != null) return new int[]{j, i};
            seen.put(a[i], i);
        }
        return new int[0];
    }

    static int missing(int[] a) {
        int n = a.length, sum = 0;
        for (int v : a) sum += v;
        return n * (n + 1) / 2 - sum;
    }

    static int[] sortedSquares(int[] a) {
        int[] r = new int[a.length];
        int l = 0, h = a.length - 1;
        for (int k = a.length - 1; k >= 0; k--) {              // fill from the largest square
            if (Math.abs(a[l]) > Math.abs(a[h])) { r[k] = a[l] * a[l]; l++; }
            else { r[k] = a[h] * a[h]; h--; }
        }
        return r;
    }

    static void sortColors(int[] a) {                          // Dutch national flag, one pass
        int lo = 0, mid = 0, hi = a.length - 1;
        while (mid <= hi) {
            if (a[mid] == 0) { int t = a[lo]; a[lo++] = a[mid]; a[mid++] = t; }
            else if (a[mid] == 1) mid++;
            else { int t = a[hi]; a[hi--] = a[mid]; a[mid] = t; }
        }
    }

    public static void main(String[] args) {
        System.out.println("two sum [2,7,11,15], 9   -> " + Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9)));
        System.out.println("missing in [3,0,1]       -> " + missing(new int[]{3, 0, 1}));
        System.out.println("squares of [-4,-1,0,3,10] -> " + Arrays.toString(sortedSquares(new int[]{-4, -1, 0, 3, 10})));
        int[] colors = {2, 0, 2, 1, 1, 0};
        sortColors(colors);
        System.out.println("sort colours             -> " + Arrays.toString(colors));
        TreeSet<Integer> top3 = new TreeSet<>();
        for (int v : new int[]{2, 2, 3, 1}) { top3.add(v); if (top3.size() > 3) top3.pollFirst(); }
        System.out.println("third maximum of [2,2,3,1] -> " + (top3.size() == 3 ? top3.first() : top3.last()));
    }
}
```

**Output:**
```text
two sum [2,7,11,15], 9   -> [0, 1]
missing in [3,0,1]       -> 2
squares of [-4,-1,0,3,10] -> [0, 1, 9, 16, 100]
sort colours             -> [0, 0, 1, 1, 2, 2]
third maximum of [2,2,3,1] -> 1
```

**Explanation:**
- **Two sum:** for each number, the needed partner is `target - a[i]`. A `HashMap` of numbers seen so far answers "have I seen the partner?" in O(1), so the whole problem is O(n) instead of O(n²).
- **Missing number:** `0..n` should sum to `n(n+1)/2 = 6`; the array sums to 4, so 2 is missing.
- **Sorted squares:** the largest square is always at one of the two ends (a big negative or a big positive), so two pointers fill the result from the back in O(n).
- **Dutch national flag:** three regions are maintained (0s before `lo`, 1s between `lo` and `mid`, 2s after `hi`); one pass sorts the array.
- **Third maximum:** a `TreeSet` ignores duplicates and stays sorted; keeping only 3 elements leaves the third largest as the smallest.

---

# 24. Collections Framework

*(Full detail with complexity tables: [Java_Handwritten_Notes.md](Java_Handwritten_Notes.md) §5-8 and [Java_Collections_Framework_Guide.md](Java_Collections_Framework_Guide.md).)*

```
Iterable → Collection → List (ArrayList, LinkedList, Vector → Stack)
                      → Queue (PriorityQueue, ArrayDeque, LinkedList)
                      → Set (HashSet, LinkedHashSet, TreeSet)
Map (HashMap, LinkedHashMap, TreeMap, WeakHashMap, IdentityHashMap, ConcurrentHashMap)
```

| Interface | Characteristics |
|---|---|
| **Iterable** | `iterator()`: lets a type work in the for-each loop (`hasNext()`, `next()`, `remove()`) |
| **Collection** | `add, remove, contains, size, isEmpty, clear, addAll, removeAll, retainAll, iterator, stream` |
| **List** | ordered, **index** access, duplicates allowed |
| **Set** | **no duplicates** |
| **Queue/Deque** | order of processing (FIFO; Deque both ends; PriorityQueue by priority) |
| **Map** | key → value, unique keys |

**List classes:** `ArrayList` (dynamic array, fast `get`), `LinkedList` (doubly linked: `addFirst/addLast/getFirst/getLast`), `Vector`/`Stack` are **legacy, synchronized**. Operations: `add(e)`, `add(i, e)`, `get(i)`, `set(i, e)`, `remove(i)`.
#### Worked Example 54: List, Set, Queue, Deque and Map in one program

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(List.of("Java", "SQL", "Java"));
        list.add(1, "Spring");
        list.set(3, "React");
        System.out.println("ArrayList   : " + list + ", get(2) = " + list.get(2) + ", indexOf(SQL) = " + list.indexOf("SQL"));

        LinkedList<Integer> ll = new LinkedList<>(List.of(2, 3));
        ll.addFirst(1); ll.addLast(4);
        System.out.println("LinkedList  : " + ll + ", first " + ll.getFirst() + ", last " + ll.getLast());

        Set<String> hs = new HashSet<>(List.of("b", "a", "c"));
        Set<Integer> lhs = new LinkedHashSet<>(List.of(3, 1, 3, 2, 1));
        TreeSet<Integer> ts = new TreeSet<>(List.of(40, 10, 30, 20, 50));
        System.out.println("HashSet has a? " + hs.contains("a") + " size " + hs.size());
        System.out.println("LinkedHashSet: " + lhs + "  (duplicates removed, order kept)");
        System.out.println("TreeSet     : " + ts + ", ceiling(25) " + ts.ceiling(25) + ", headSet(30) " + ts.headSet(30));

        Queue<String> q = new ArrayDeque<>();
        q.offer("first"); q.offer("second"); q.offer("third");
        System.out.println("Queue poll  : " + q.poll() + ", then peek " + q.peek());

        Deque<Character> stack = new ArrayDeque<>();
        for (char c : "stack".toCharArray()) stack.push(c);
        StringBuilder rev = new StringBuilder();
        while (!stack.isEmpty()) rev.append(stack.pop());
        System.out.println("Stack (LIFO): " + rev);

        PriorityQueue<Integer> minHeap = new PriorityQueue<>(List.of(5, 1, 8, 3));
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        maxHeap.addAll(List.of(5, 1, 8, 3));
        System.out.println("PriorityQueue: min " + minHeap.peek() + ", max " + maxHeap.peek());

        Map<String, Integer> hm = new HashMap<>();
        for (String w : "to be or not to be".split(" ")) hm.merge(w, 1, Integer::sum);
        System.out.println("word counts : " + new TreeMap<>(hm));
        System.out.println("getOrDefault(java, 0) = " + hm.getOrDefault("java", 0));
    }
}
```

**Output:**
```text
ArrayList   : [Java, Spring, SQL, React], get(2) = SQL, indexOf(SQL) = 2
LinkedList  : [1, 2, 3, 4], first 1, last 4
HashSet has a? true size 3
LinkedHashSet: [3, 1, 2]  (duplicates removed, order kept)
TreeSet     : [10, 20, 30, 40, 50], ceiling(25) 30, headSet(30) [10, 20]
Queue poll  : first, then peek second
Stack (LIFO): kcats
PriorityQueue: min 1, max 8
word counts : {be=2, not=1, or=1, to=2}
getOrDefault(java, 0) = 0
```

**Explanation:**
- `List.of(...)` creates an **immutable** list; wrapping it in `new ArrayList<>(...)` gives a modifiable copy. `add(1, x)` shifts later elements right; `set(3, x)` replaces.
- `HashSet` order is unpredictable, so only `contains`/`size` are printed. `LinkedHashSet` keeps insertion order; `TreeSet` keeps sorted order and offers navigation (`ceiling`, `headSet`).
- `ArrayDeque` works as both a FIFO queue (`offer`/`poll`) and a LIFO stack (`push`/`pop`); it is faster than the legacy `Stack` class.
- `PriorityQueue` always exposes the smallest element; with `Collections.reverseOrder()` it exposes the largest.
- `merge(w, 1, Integer::sum)` counts words in one line; copying into a `TreeMap` prints the keys sorted. `getOrDefault` returns the fallback `0` for a missing key instead of `null`, which avoids a `NullPointerException` when unboxing.

**Generics** give type safety and remove casts; `List<? extends Number>` (read), `List<? super Integer>` (write), `List<?>` (unknown). **Queue:** `ArrayDeque` (stack/queue, no nulls), `PriorityQueue` (min-heap; `Collections.reverseOrder()` makes a max-queue: peek of `[3,9,4]` = `9`, verified; reverse a string by pushing characters and popping: `stack` → `kcats`).

**Sets (verified):** `LinkedHashSet` removes duplicates and keeps order (`[3, 1, 3, 2, 1]` → `[3, 1, 2]`); `TreeSet` sorted: `subSet(20,true,40,true)` = `[20, 30, 40]`, `ceiling(25)` = `30`, `floor(25)` = `20`; set algebra: `retainAll` (intersection `[3, 4]`), `addAll` (union `[1..5]`), `removeAll` (difference `[1, 2]`).

**`hashCode()` and `equals()`:** override **both**, consistently (`Objects.hash(brand, cc)`); a `HashSet<Car>` then finds an equal object (`true`, verified). **Comparable** (`compareTo`, natural order, in the class) vs **Comparator** (`compare`, external): `Collections.sort(cars)` → `[b900, c1200, a1500]`; `cl.sort(Comparator.comparing((Car c) -> c.brand).reversed())` → `[c1200, b900, a1500]` (verified).

**`Collections` utilities (verified on `[5,1,4,1,9]`):** after `sort` → `[1, 1, 4, 5, 9]`; `binarySearch(4)` = index `2` (**list must be sorted**); `frequency(1)` = `2`; `max` = `9`; `min` = `1`; `disjoint(list, [7,8])` = `true`; `reverse` → `[9, 5, 4, 1, 1]`; `sort(Comparator.reverseOrder())`.

**Maps:** `HashMap` (unordered O(1)), `LinkedHashMap` (insertion order; attendance tracking), `TreeMap` (sorted keys: `{a=1, b=2, c=3}`; flight arrivals ordered by time), **`WeakHashMap`** (entries disappear when the key is no longer referenced elsewhere; caches), **`IdentityHashMap`** (compares keys with `==`: two `new String("k")` keys give **size 2**, verified; session tokens/identity checks). **`ConcurrentHashMap`** is thread-safe without locking the whole map (`merge` is atomic: `{x=2}`), while `Hashtable`/`Collections.synchronizedMap` lock everything.

**Stack/queue interview problems** in the list: **parenthesis checker** (push openers on a stack; on a closer the top must match): `{[()]}` → `true`, `{[(])}` → `false`; **next greater element** (monotonic stack): `{4,5,2,25}` → `[5, 25, 25, -1]` (both verified). Others: level-order and zigzag traversal of a binary tree (BFS with a `Queue`; zigzag reverses every other level), **kth largest/smallest** (a heap of size k: `PriorityQueue`), **K closest points to origin** (heap by distance), **two sum** (HashMap).
#### Worked Example 55: equals/hashCode, Comparable vs Comparator, and two stack problems

```java
import java.util.*;

public class Main {
    static class Car implements Comparable<Car> {
        final String brand; final int cc;
        Car(String brand, int cc) { this.brand = brand; this.cc = cc; }
        @Override public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof Car)) return false;
            Car c = (Car) o;
            return cc == c.cc && brand.equals(c.brand);
        }
        @Override public int hashCode() { return Objects.hash(brand, cc); }
        @Override public int compareTo(Car other) { return Integer.compare(cc, other.cc); }   // natural order: by cc
        @Override public String toString() { return brand + cc; }
    }

    static class NoHash {                                   // equals WITHOUT hashCode: broken in hash collections
        final int id;
        NoHash(int id) { this.id = id; }
        @Override public boolean equals(Object o) { return o instanceof NoHash && ((NoHash) o).id == id; }
    }

    static boolean balanced(String s) {
        Deque<Character> st = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if ("([{".indexOf(c) >= 0) st.push(c);
            else if (")]}".indexOf(c) >= 0) {
                if (st.isEmpty()) return false;
                char open = st.pop();
                if ("([{".indexOf(open) != ")]}".indexOf(c)) return false;
            }
        }
        return st.isEmpty();
    }

    static int[] nextGreater(int[] a) {
        int[] res = new int[a.length];
        Arrays.fill(res, -1);
        Deque<Integer> st = new ArrayDeque<>();             // indexes still waiting for a greater value
        for (int i = 0; i < a.length; i++) {
            while (!st.isEmpty() && a[st.peek()] < a[i]) res[st.pop()] = a[i];
            st.push(i);
        }
        return res;
    }

    public static void main(String[] args) {
        Set<Car> cars = new HashSet<>();
        cars.add(new Car("a", 1500));
        System.out.println("HashSet finds an equal Car: " + cars.contains(new Car("a", 1500)));
        Set<NoHash> broken = new HashSet<>();
        broken.add(new NoHash(1));
        System.out.println("HashSet finds an equal NoHash: " + broken.contains(new NoHash(1)));

        List<Car> list = new ArrayList<>(List.of(new Car("a", 1500), new Car("c", 1200), new Car("b", 900)));
        Collections.sort(list);
        System.out.println("natural (cc)      : " + list);
        list.sort(Comparator.comparing((Car c) -> c.brand).reversed());
        System.out.println("brand descending  : " + list);
        list.sort(Comparator.comparingInt((Car c) -> c.cc).reversed().thenComparing(c -> c.brand));
        System.out.println("cc desc, then brand: " + list);

        System.out.println("{[()]} balanced? " + balanced("{[()]}") + ", {[(])} balanced? " + balanced("{[(])}"));
        System.out.println("next greater of [4,5,2,25] = " + Arrays.toString(nextGreater(new int[]{4, 5, 2, 25})));
    }
}
```

**Output:**
```text
HashSet finds an equal Car: true
HashSet finds an equal NoHash: false
natural (cc)      : [b900, c1200, a1500]
brand descending  : [c1200, b900, a1500]
cc desc, then brand: [a1500, c1200, b900]
{[()]} balanced? true, {[(])} balanced? false
next greater of [4,5,2,25] = [5, 25, 25, -1]
```

**Explanation:**
- A `HashSet` first uses `hashCode()` to pick a **bucket**, then `equals()` inside it. `NoHash` overrides only `equals`, so two equal objects get different (identity) hash codes, land in different buckets, and `contains` returns `false`. **Always override both together.**
- `Comparable` defines one **natural** order inside the class (`compareTo`, by cc). `Comparator` defines any number of **external** orders, and can be reversed and chained with `thenComparing`.
- **Balanced brackets:** every opener is pushed; every closer must match the most recent unmatched opener (the top of the stack). In `{[(])}` the `]` meets `(` → unbalanced.
- **Next greater element (monotonic stack):** indexes wait on the stack until a larger value arrives and "resolves" them. Each index is pushed and popped once, so it is O(n).

---

# 25. Exception Handling

*(Complete notes: [Java_Handwritten_Notes.md](Java_Handwritten_Notes.md) §3 and §11.)*

An **exception** is an **object** representing an abnormal event at run time; if unhandled, the JVM's **default exception handler** prints a stack trace and ends the program abnormally. Handling keeps the program running and lets you recover.

```
Throwable
 ├─ Error                (StackOverflowError, OutOfMemoryError, NoClassDefFoundError: JVM problems)
 └─ Exception
     ├─ checked          (IOException, SQLException: compiler forces handling)
     └─ RuntimeException (unchecked: ArithmeticException, NullPointerException, ArrayIndexOutOfBounds, ClassCastException, NumberFormatException)
```

| Topic | Key points |
|---|---|
| **Why exceptions occur** | bad input, array index out of range, missing file, `x / 0`, `null` access, network/DB failure, wrong cast |
| **Propagation** | The exception travels **up the call stack** (method → caller → ... → `main` → default handler) until some `catch` matches |
| **try-catch** | `try` holds risky code; `catch (Type e)` handles; **multiple catch blocks**: **specific first, generic (`Exception`) last**: the opposite order does not compile (*"exception ArithmeticException has already been caught"*, verified) |
| **Multi-catch** | `catch (A \| B e)` |
| **finally** | always runs (cleanup); not when `System.exit()` or the JVM dies. `return` inside `finally` overrides the try's return (verified `2`) |
| **try without catch** | allowed with `finally` or with **try-with-resources** |
| **try-with-resources (Java 7+)** | auto-closes `AutoCloseable` resources in reverse order (verified: `open A, open B, body, close B, close A`) |
| **throw** | actually throws an exception object |
| **throws** | declares that a method may throw (caller must handle/declare checked ones); "ducking" = not handling and passing it up |
| **Rethrow with context** | `throw new ServiceException("save failed", e);` keeps the **cause** (verified `getCause()`) |
| **Checked vs unchecked** | Checked = recoverable external problems; unchecked = programming bugs |
| **Error vs Exception** | Error = serious JVM state, not meant to be caught |
| **NoClassDefFoundError** | A class that existed at compile time is missing at run time (classpath problem); it is an *Error*, not an exception |
| **ClassCastException** | Wrong downcast (`(Integer) "text"`) |
| **Custom exceptions** | `class InsufficientBalance extends Exception { InsufficientBalance(String m){ super(m);} }` (checked) or `extends RuntimeException` (unchecked) |

**Best practices:** catch specific exceptions; **never leave a catch empty**; log for developers but show **friendly messages** to users; clean up in `finally`/try-with-resources; don't use exceptions for normal control flow; throw early, handle at the layer that can recover.
#### Worked Example 56: propagation, multiple catch blocks, `finally` and custom exceptions

```java
public class Main {
    static class InsufficientBalanceException extends Exception {        // checked custom exception
        private final double shortBy;
        InsufficientBalanceException(String msg, double shortBy) { super(msg); this.shortBy = shortBy; }
        double getShortBy() { return shortBy; }
    }

    static double balance = 1000;

    static void withdraw(double amt) throws InsufficientBalanceException {
        if (amt <= 0) throw new IllegalArgumentException("amount must be positive");      // unchecked
        if (amt > balance) throw new InsufficientBalanceException("balance too low", amt - balance);
        balance -= amt;
        System.out.println("  withdrew " + amt + ", balance " + balance);
    }

    static int level3(int[] a, int i) { return a[i] / (i - 2); }      // may throw two different exceptions
    static int level2(int[] a, int i) { return level3(a, i); }        // does not handle → propagates
    static int level1(int[] a, int i) {
        try {
            return level2(a, i);
        } catch (ArithmeticException e) {
            System.out.println("  caught ArithmeticException: " + e.getMessage());
            return -1;
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("  caught AIOOBE: " + e.getMessage());
            return -2;
        } finally {
            System.out.println("  finally for i = " + i);
        }
    }

    public static void main(String[] args) {
        int[] data = {10, 20, 30};
        System.out.println("i=0 -> " + level1(data, 0));
        System.out.println("i=2 -> " + level1(data, 2));
        System.out.println("i=5 -> " + level1(data, 5));

        for (double amt : new double[]{300, 900, -5}) {
            try {
                withdraw(amt);
            } catch (InsufficientBalanceException e) {
                System.out.println("  " + e.getMessage() + ", short by " + e.getShortBy());
            } catch (IllegalArgumentException e) {
                System.out.println("  invalid: " + e.getMessage());
            }
        }

        try {
            Integer.parseInt("12a");
        } catch (NumberFormatException e) {
            RuntimeException wrapped = new RuntimeException("could not read age", e);
            System.out.println(wrapped.getMessage() + " <- caused by " + wrapped.getCause().getClass().getSimpleName());
        }
    }
}
```

**Output:**
```text
  finally for i = 0
i=0 -> -5
  caught ArithmeticException: / by zero
  finally for i = 2
i=2 -> -1
  caught AIOOBE: Index 5 out of bounds for length 3
  finally for i = 5
i=5 -> -2
  withdrew 300.0, balance 700.0
  balance too low, short by 200.0
  invalid: amount must be positive
could not read age <- caused by NumberFormatException
```

**Explanation:**
- `i = 0`: `10 / (0 - 2) = -5`, no exception, but `finally` still runs **before** the method returns, which is why its line prints first.
- `i = 2`: division by zero in `level3`. Neither `level3` nor `level2` catches it, so it **propagates** up to `level1`, where the matching `catch` handles it.
- `i = 5`: `a[5]` throws `ArrayIndexOutOfBoundsException` before the division is even attempted.
- The custom checked exception carries extra data (`shortBy`) that the caller can use to show a helpful message.
- Wrapping an exception with a **cause** keeps the original error for debugging while giving a message that fits the current layer.

**Exceptions and inheritance (Interview Imp - Java):** an overriding method may throw **nothing, the same, or a narrower** checked exception, never a broader/new checked one (verified: `IOException` vs parent's `RuntimeException` → *"cannot override"*); unchecked exceptions are unrestricted. A superclass reference can hold a subclass exception object in `catch (Exception e)`.

**Debugging with stack traces:** read **top to bottom**: first line = exception type and message; the first `at ...` line is where it was thrown; lines below show the callers. `e.printStackTrace()` prints it (use a logger in real projects). **JDK 7/8 improvements:** multi-catch, try-with-resources, precise rethrow.
#### Worked Example 57: try-with-resources order, `finally` overriding `return`, and a stack trace

```java
public class Main {
    static class Resource implements AutoCloseable {
        private final String name;
        Resource(String name) { this.name = name; System.out.println("open " + name); }
        void use() { System.out.println("use " + name); }
        @Override public void close() { System.out.println("close " + name); }
    }

    @SuppressWarnings("finally")
    static int tricky() {
        try { return 1; }
        finally { return 2; }               // overrides the try's return (never do this)
    }

    static void c() { Object o = null; o.toString(); }
    static void b() { c(); }
    static void a() { b(); }

    public static void main(String[] args) {
        try (Resource r1 = new Resource("A"); Resource r2 = new Resource("B")) {
            r1.use();
            r2.use();
            throw new IllegalStateException("boom");
        } catch (IllegalStateException e) {
            System.out.println("caught " + e.getMessage() + " (after both resources closed)");
        }
        System.out.println("tricky() returns " + tricky());
        a();
    }
}
```

**Output:**
```text
open A
open B
use A
use B
close B
close A
caught boom (after both resources closed)
tricky() returns 2
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "Object.toString()" because "<local0>" is null
	at Main.c(Main.java:15)
	at Main.b(Main.java:16)
	at Main.a(Main.java:17)
	at Main.main(Main.java:28)
```

**Explanation:**
- Resources open in declaration order and close in **reverse** order (B, then A), and they are closed **before** the `catch` block runs.
- A `return` in `finally` silently replaces the `try`'s return value (and would even swallow an exception). Compilers warn about it.
- **Reading the stack trace:** the first line names the exception and a helpful message (Java 14+ "helpful NullPointerExceptions" say exactly what was `null`; `<local0>` is the variable `o`). The first `at` line is where it happened (`c`, line 15); each following line is the caller (`b` ← `a` ← `main`). Fix the problem at the top frame that is your own code. (When compiled with `javac -g`, the message names the variable: `because "o" is null`.)

---

# 26. Threads and Multithreading

*(Complete notes: [Java_Handwritten_Notes.md](Java_Handwritten_Notes.md) §4, §12.)*

| Concept | Explanation |
|---|---|
| **Multitasking** | Several **processes** (programs) at once, managed by the OS |
| **Multithreading** | Several **threads** inside one process; they **share the heap** but have their own stacks. Lighter and faster to communicate than processes |
| **Process vs thread** | Process = heavy, own memory; thread = light, shares memory |
| **Single vs multi-threaded** | Single: simple, no race conditions; multi: responsive UIs, background work, parallel CPU use |
| **Main thread** | Runs `main()`; name `main`, default priority **5** (range 1-10; verified `main prio 5 1..10`) |
| **Creating threads** | `extends Thread` (override `run()`, call **`start()`**), or `implements Runnable` + `new Thread(r).start()` (preferred: frees inheritance, shares one task) |
| **Thread vs Runnable** | Runnable separates task from thread, works with executors and lambdas |
| **`sleep(ms)`** | Pauses the current thread; throws checked `InterruptedException` |
| **`join()`** | Wait for another thread to finish (task ordering, main waits for workers) |
| **Lifecycle** | NEW → RUNNABLE → (BLOCKED / WAITING / TIMED_WAITING) → TERMINATED |
| **`interrupt()`** | Politely asks a thread to stop: a sleeping thread gets `InterruptedException` (verified: flag is **cleared**); a busy thread must check `isInterrupted()` (verified). Never use the deprecated `stop()`. **Graceful shutdown** = check the flag, finish the current unit of work, close resources |
| **Daemon threads** | Background helpers (GC, autosave); the JVM exits when only daemons remain; `setDaemon(true)` before `start()` |

**Race condition:** two threads read-modify-write shared data and results depend on timing (`counter++` is **not atomic**). Fixes: `synchronized`, `AtomicInteger` (1000 increments from a 4-thread pool → `1000`, verified), `ReentrantLock` (two threads × 10,000 → `20000`, verified; always `unlock()` in `finally`), immutable objects, concurrent collections.
#### Worked Example 58: creating threads, `join`, and fixing a race condition

```java
import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    static int unsafeCount = 0;
    static int syncCount = 0;
    static final AtomicInteger atomicCount = new AtomicInteger();

    static synchronized void incSync() { syncCount++; }

    public static void main(String[] args) throws InterruptedException {
        Thread t1 = new Thread(() -> System.out.println("  hello from " + Thread.currentThread().getName()), "worker-1");
        System.out.println("state before start: " + t1.getState());
        t1.start();
        t1.join();                                          // wait until worker-1 finishes
        System.out.println("state after join  : " + t1.getState());

        Runnable task = () -> {
            for (int i = 0; i < 100_000; i++) {
                unsafeCount++;                              // read, add, write: three steps, not atomic
                incSync();
                atomicCount.incrementAndGet();
            }
        };
        Thread a = new Thread(task), b = new Thread(task);
        a.start(); b.start();
        a.join(); b.join();
        System.out.println("expected            : 200000");
        System.out.println("synchronized counter: " + syncCount);
        System.out.println("AtomicInteger       : " + atomicCount.get());
        System.out.println("plain int lost updates? " + (unsafeCount < 200_000 ? "yes (usually)" : "not this time"));
        System.out.println("main thread priority: " + Thread.currentThread().getPriority());
    }
}
```

**Output** (`NONDETERMINISTIC`: the last-but-one line can vary between runs):
```text
state before start: NEW
  hello from worker-1
state after join  : TERMINATED
expected            : 200000
synchronized counter: 200000
AtomicInteger       : 200000
plain int lost updates? yes (usually)
main thread priority: 5
```

**Explanation:**
- `start()` creates a new thread that runs `run()`; calling `run()` directly would just execute it on the current thread. `join()` blocks until the other thread ends, so the state goes `NEW → (RUNNABLE) → TERMINATED`.
- `unsafeCount++` is really *load, add 1, store*. If both threads load the same value before either stores, one increment is **lost**, so the plain counter usually ends below 200,000 and differs on every run.
- `synchronized` lets only one thread at a time into `incSync`; `AtomicInteger` uses a single atomic CPU instruction (compare-and-swap). Both always reach exactly 200,000.

```java
ReentrantLock lock = new ReentrantLock();
lock.lock();
try { counter++; } finally { lock.unlock(); }          // unlock even if an exception occurs
```

| Synchronization | Notes |
|---|---|
| `synchronized` method | locks `this` |
| `synchronized (obj) { }` block | locks a chosen object; smaller scope = better performance |
| `ReentrantLock` | `tryLock(timeout)`, fairness, multiple conditions |
| **Deadlock** | needs mutual exclusion + hold-and-wait + no preemption + **circular wait**. Avoid: same lock order, `tryLock` with a **timeout**, reduce the **scope** of locks, use higher-level utilities |
| **Producer-consumer** | A shared buffer; the producer waits when full, the consumer when empty; `wait()` / `notify()` / `notifyAll()` inside `synchronized`. Always wait in a **`while` loop** because of **spurious wakeups**; `notifyAll()` is safer than `notify()` when several threads wait |
| **Higher-level utilities** | `ExecutorService` **thread pools**, `BlockingQueue`, `CountDownLatch`, `Semaphore`, `CompletableFuture`, `ConcurrentHashMap` |

**Best practices:** prefer thread pools over `new Thread` per task; keep shared state minimal and immutable; use atomic classes for counters; hold locks briefly; **release locks in `finally`**; don't swallow `InterruptedException`; name your threads for debugging. (Another section of the syllabus lists "Stream operations in Java" under multitasking: streams and `parallelStream()` are covered in [java-stream-api.md](java-stream-api.md).)
#### Worked Example 59: producer-consumer with `wait`/`notifyAll`, then the same with a thread pool

```java
import java.util.*;
import java.util.concurrent.*;

public class Main {
    static class Buffer {
        private final Queue<Integer> q = new LinkedList<>();
        private final int capacity = 2;

        synchronized void put(int v) throws InterruptedException {
            while (q.size() == capacity) wait();       // ALWAYS wait in a loop
            q.add(v);
            notifyAll();
        }

        synchronized int take() throws InterruptedException {
            while (q.isEmpty()) wait();
            int v = q.remove();
            notifyAll();
            return v;
        }
    }

    public static void main(String[] args) throws Exception {
        Buffer buf = new Buffer();
        List<Integer> consumed = Collections.synchronizedList(new ArrayList<>());
        Thread producer = new Thread(() -> {
            try { for (int i = 1; i <= 5; i++) buf.put(i); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        });
        Thread consumer = new Thread(() -> {
            try { for (int i = 1; i <= 5; i++) consumed.add(buf.take()); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        });
        producer.start(); consumer.start();
        producer.join(); consumer.join();
        System.out.println("consumed in order: " + consumed);

        ExecutorService pool = Executors.newFixedThreadPool(3);
        List<Future<Integer>> results = new ArrayList<>();
        for (int n = 1; n <= 4; n++) {
            int k = n;
            results.add(pool.submit(() -> k * k));        // Callable: returns a value
        }
        int total = 0;
        for (Future<Integer> f : results) total += f.get();   // get() waits for each result
        pool.shutdown();
        System.out.println("sum of squares from pool: " + total);
        System.out.println("pool terminated: " + pool.awaitTermination(1, TimeUnit.SECONDS));

        CompletableFuture<String> cf = CompletableFuture.supplyAsync(() -> "order")
                .thenApply(s -> s + " paid")
                .thenApply(String::toUpperCase);
        System.out.println("CompletableFuture: " + cf.get());
    }
}
```

**Output:**
```text
consumed in order: [1, 2, 3, 4, 5]
sum of squares from pool: 30
pool terminated: true
CompletableFuture: ORDER PAID
```

**Explanation:**
- The buffer holds at most 2 items. `put` waits while it is full; `take` waits while it is empty. `notifyAll()` wakes waiting threads after every change so they can re-check their condition.
- `wait()` must be inside a `while` loop, not an `if`: a thread can wake up without its condition being true (a *spurious wakeup*, or another thread got there first).
- With one producer and one consumer, values come out in FIFO order `[1, 2, 3, 4, 5]` regardless of timing.
- `ExecutorService` reuses 3 threads for 4 tasks. `submit` returns a `Future`; `get()` blocks until that task's result is ready (`1 + 4 + 9 + 16 = 30`). Always `shutdown()` a pool, or its threads keep the JVM alive.
- `CompletableFuture` chains asynchronous steps without manual threads.

---

# 27. File Handling, I/O Streams and Serialization

**Why file handling?** Variables disappear when the program ends; files **persist** data (logs, reports, settings). Java's I/O (in `java.io`) is built on **streams**.

| | Byte streams | Character streams |
|---|---|---|
| Unit | 8-bit bytes | 16-bit chars (text, encoding aware) |
| Classes | `InputStream` / `OutputStream` (`FileInputStream`, `FileOutputStream`, `DataInputStream`...) | `Reader` / `Writer` (`FileReader`, `FileWriter`, `BufferedReader`, `BufferedWriter`) |
| Use for | images, audio, binary, primitives | text files |

**Verified example (temp file):**

```java
try (BufferedWriter bw = new BufferedWriter(new FileWriter(file))) {
    bw.write("line one"); bw.newLine(); bw.write("line two");           // newLine() adds the platform line break
}
try (BufferedReader br = new BufferedReader(new FileReader(file))) {
    String line; while ((line = br.readLine()) != null) System.out.println("read: " + line);   // read: line one / read: line two
}
try (DataOutputStream dos = new DataOutputStream(new FileOutputStream(file))) { dos.writeInt(42); dos.writeDouble(3.5); dos.writeUTF("hi"); }
try (DataInputStream dis = new DataInputStream(new FileInputStream(file))) { dis.readInt(); dis.readDouble(); dis.readUTF(); }   // 42 3.5 hi (read in the SAME order)
```

| Item | Notes |
|---|---|
| **Buffered streams** | Read/write in chunks (an internal buffer) → far fewer disk hits; `BufferedReader.readLine()` reads a line; `flush()` forces buffered data out (done by `close()`) |
| **`FileInputStream.read()`** | Returns one **byte** (0-255) or **-1** at end of file |
| **Exceptions** | `FileNotFoundException` (a missing file: `nope.txt (No such file or directory)`, verified), `IOException`; both are **checked** |
| **Closing files** | Always close; **try-with-resources** does it automatically (resource leaks block files and exhaust handles) |
| **`File` class** | Describes a **path**: `exists()`, `isFile()`, `isDirectory()`, `getAbsolutePath()`, `getPath()`, `length()`, `isAbsolute()` (verified `true true false true false` for a real temp file and a relative `rel.txt`) |
| **`System.out`** | A `PrintStream` (byte stream wrapper) connected to the console |
| **NIO.2 (modern)** | `Files.readAllLines(path)`, `Files.writeString`, `Files.lines(path)` |
#### Worked Example 60: writing, reading, appending and inspecting a file

```java
import java.io.*;
import java.nio.file.*;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        File file = File.createTempFile("notes", ".txt");
        file.deleteOnExit();

        try (BufferedWriter bw = new BufferedWriter(new FileWriter(file))) {
            bw.write("line one");
            bw.newLine();
            bw.write("line two");
        }
        try (FileWriter fw = new FileWriter(file, true)) {          // true = append mode
            fw.write(System.lineSeparator() + "line three");
        }

        int count = 0;
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null) System.out.println("read " + (++count) + ": " + line);
        }

        try (DataOutputStream dos = new DataOutputStream(new FileOutputStream(file))) {
            dos.writeInt(42); dos.writeDouble(3.5); dos.writeUTF("hi");
        }
        try (DataInputStream dis = new DataInputStream(new FileInputStream(file))) {
            System.out.println("binary read: " + dis.readInt() + " " + dis.readDouble() + " " + dis.readUTF());
        }
        System.out.println("file size now = " + file.length() + " bytes");

        Path p = file.toPath();
        Files.writeString(p, "apple\nbanana\ncherry\n");
        List<String> lines = Files.readAllLines(p);
        System.out.println("NIO lines: " + lines + ", exists=" + Files.exists(p) + ", isDirectory=" + Files.isDirectory(p));

        try (FileReader fr = new FileReader("does-not-exist.txt")) {
            System.out.println("unreachable");
        } catch (FileNotFoundException e) {
            System.out.println("FileNotFoundException: " + e.getMessage());
        }
    }
}
```

**Output:**
```text
read 1: line one
read 2: line two
read 3: line three
binary read: 42 3.5 hi
file size now = 16 bytes
NIO lines: [apple, banana, cherry], exists=true, isDirectory=false
FileNotFoundException: does-not-exist.txt (No such file or directory)
```

**Explanation:**
- `new FileWriter(file)` **overwrites** the file; `new FileWriter(file, true)` **appends**.
- `readLine()` returns `null` at the end of the file, which ends the `while` loop. The assignment inside the condition is the standard idiom.
- `DataOutputStream` writes primitives in binary: 4 bytes for the `int`, 8 for the `double`, and 2 (length) + 2 (characters) for `writeUTF("hi")` = **16 bytes**. They must be read back **in the same order** with the matching methods.
- `Files.writeString` / `Files.readAllLines` (NIO.2) do the same job as the buffered classes in one line each; prefer them for small files.
- Opening a missing file throws the **checked** `FileNotFoundException`, a subclass of `IOException`.

## 27.1 Serialization and deserialization

**Serialization** = converting an object's **state** into a byte stream (to save to a file, send over a network, cache); **deserialization** = rebuilding the object.

```java
class Emp implements Serializable {                 // marker interface: the class must be Serializable
    private static final long serialVersionUID = 1L;    // version id: must match when reading
    String name; transient String password; int age;     // transient fields are NOT saved
}
// write: new ObjectOutputStream(out).writeObject(emp);     read: (Emp) new ObjectInputStream(in).readObject();
// result (verified): name = Asha, password = null (transient), age = 30
```

| Item | Notes |
|---|---|
| **Requirements** | The class implements `Serializable`; all non-transient fields must be serializable too; otherwise `NotSerializableException` (verified for `java.lang.Object`) |
| **`serialVersionUID`** | Version stamp; if the class changes and the id differs, `InvalidClassException` on read. Declare it explicitly |
| **`transient`** | Skip a field (passwords, caches) |
| **`static` fields** | Not serialized (they belong to the class) |
| **Exceptions** | `IOException`, `ClassNotFoundException`, `InvalidClassException`, `NotSerializableException` |
| **Security** | **Never deserialize untrusted data** (can run attacker code); use a **allow-list filter** (`ObjectInputFilter`) or prefer JSON |
| **Singleton + serialization** | Deserializing creates a second instance unless you add `readResolve()` returning the singleton (verified `singletonSame=true`) |
#### Worked Example 61: serialization round trip with `transient`, `static` and `serialVersionUID`

```java
import java.io.*;

public class Main {
    static class Emp implements Serializable {
        private static final long serialVersionUID = 1L;
        static String company = "Acme";        // static: belongs to the class, not saved
        String name;
        transient String password;              // transient: skipped
        int age;
        Emp(String n, String p, int a) { name = n; password = p; age = a; }
    }

    static class NotSer { }                     // does not implement Serializable
    static class Holder implements Serializable { NotSer field = new NotSer(); }

    public static void main(String[] args) throws Exception {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bytes)) {
            out.writeObject(new Emp("Asha", "s3cret", 30));
        }
        System.out.println("serialized size > 0: " + (bytes.size() > 0));

        Emp.company = "Changed Corp";           // change the static AFTER saving
        try (ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(bytes.toByteArray()))) {
            Emp e = (Emp) in.readObject();
            System.out.println("name = " + e.name + ", password = " + e.password + ", age = " + e.age + ", company = " + Emp.company);
        }

        try (ObjectOutputStream out = new ObjectOutputStream(new ByteArrayOutputStream())) {
            out.writeObject(new Holder());
        } catch (NotSerializableException ex) {
            System.out.println("NotSerializableException: " + ex.getMessage());
        }
    }
}
```

**Output:**
```text
serialized size > 0: true
name = Asha, password = null, age = 30, company = Changed Corp
NotSerializableException: Main$NotSer
```

**Explanation:**
- The object is turned into bytes (here in memory; a `FileOutputStream` would save it to disk) and rebuilt by `readObject()`. The constructor is **not** called during deserialization.
- `password` is `transient`, so it comes back as its default value `null`, which is exactly what you want for secrets.
- `company` is `static`, so it was never part of the saved object; after reading, you see whatever the class holds now.
- Every non-transient field must itself be serializable; `Holder.field` is a `NotSer`, so writing fails. `Main$NotSer` is the JVM name of the nested class.

---

# 28. Java Annotations

An **annotation** is **metadata** attached to code (`@Override`, `@Deprecated`, `@SuppressWarnings`). It does not change what the code does by itself; the **compiler, a tool or a framework** reads it.

| Built-in | Purpose |
|---|---|
| `@Override` | The compiler checks you really override a parent method; **wrong use (a typo) becomes a compile error** |
| `@Deprecated` | Marks old API (warning to users) |
| `@SuppressWarnings("unchecked")` | Silences chosen compiler warnings (use sparingly) |
| `@FunctionalInterface` | Compiler verifies a single abstract method |

**Custom annotation + reflection (verified):**

```java
@Retention(RetentionPolicy.RUNTIME)     // how long it is kept: SOURCE (compiler only), CLASS (default), RUNTIME (readable by reflection)
@Target(ElementType.METHOD)             // where it may be used: METHOD, TYPE, FIELD, PARAMETER ...
@interface Run { String value() default "go"; int times() default 1; }

class Svc { @Run(times = 2) public void a() {...}   public void b() {...}   @Run("custom") public void c() {...} }

for (Method m : Svc.class.getDeclaredMethods()) {
    Run r = m.getAnnotation(Run.class);
    if (r != null) for (int i = 0; i < r.times(); i++) m.invoke(new Svc());      // runs a() twice, c() once, never b()
}
// output: "go: a runs" ×2 and "custom: c runs"   (reflection does not guarantee method ORDER)
```

#### Worked Example 62: a mini test runner built with a custom annotation and reflection

```java
import java.lang.annotation.*;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Comparator;

public class Main {
    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.METHOD)
    @interface Test { String name() default ""; }

    static class CalculatorTests {
        @Test(name = "addition works")
        public void testAdd() { check(2 + 3 == 5); }

        @Test
        public void testDivide() { check(10 / 2 == 5); }

        @Test(name = "deliberately failing")
        public void testWrong() { check(2 * 2 == 5); }

        public void helper() { System.out.println("never run: no @Test"); }

        static void check(boolean ok) { if (!ok) throw new AssertionError("expected true"); }
    }

    public static void main(String[] args) throws Exception {
        Method[] methods = CalculatorTests.class.getDeclaredMethods();
        Arrays.sort(methods, Comparator.comparing(Method::getName));      // reflection order is not guaranteed
        int passed = 0, failed = 0;
        for (Method m : methods) {
            Test t = m.getAnnotation(Test.class);
            if (t == null) continue;
            String label = t.name().isEmpty() ? m.getName() : t.name();
            try {
                m.invoke(new CalculatorTests());
                System.out.println("PASS  " + label);
                passed++;
            } catch (java.lang.reflect.InvocationTargetException e) {
                System.out.println("FAIL  " + label + " -> " + e.getCause().getMessage());
                failed++;
            }
        }
        System.out.println(passed + " passed, " + failed + " failed");
    }
}
```

**Output:**
```text
PASS  addition works
PASS  testDivide
FAIL  deliberately failing -> expected true
2 passed, 1 failed
```

**Explanation:**
- `@Retention(RUNTIME)` keeps the annotation in the class file **and** makes it readable at run time; with the default (`CLASS`), `getAnnotation` would return `null`.
- The runner finds methods with `getDeclaredMethods()`, keeps those marked `@Test`, and calls them with `invoke`. An exception thrown inside the test arrives wrapped in `InvocationTargetException`; `getCause()` gives the original.
- This is, in miniature, exactly what **JUnit** does with `@Test`, and what Spring does when it scans for `@Component` and `@GetMapping`.

**Why it matters:** this exact mechanism (annotations + reflection) is how **JUnit** finds `@Test`, **Spring** finds `@Component`/`@Autowired`, and **Hibernate** finds `@Entity`. **Retention** and **Target** control visibility and placement.

---

# 29. Unit Testing: JUnit and Mockito

**Unit testing** checks the smallest pieces (methods/classes) automatically. Benefits over manual testing (printing and eyeballing): **repeatable, fast, run on every build (CI), catch regressions, document behaviour, give confidence to refactor**. **Test coverage** measures how much code the tests execute (aim for meaningful coverage, not 100% at all costs).

**JUnit 4 vs 5:** JUnit 5 (*Jupiter*) uses `org.junit.jupiter.api`, `@BeforeEach/@AfterEach/@BeforeAll/@AfterAll` (JUnit 4: `@Before/@After/@BeforeClass/@AfterClass`), `@Disabled` (4: `@Ignore`), `assertThrows` (4: `@Test(expected=...)`), parameterized tests, a modular design, and **Rules → Extensions**.

Maven dependency (not compiled here):

```xml
<dependency>
  <groupId>org.junit.jupiter</groupId><artifactId>junit-jupiter</artifactId><version>5.10.2</version><scope>test</scope>
</dependency>
```

```java
class DiscountTest {
    Discount d;
    @BeforeEach void setUp()      { d = new Discount(); }                      // runs before EACH test
    @Test void tenPercentOver1000() { assertEquals(900.0, d.apply(1000), 0.001); }
    @Test void negativeThrows()    { assertThrows(IllegalArgumentException.class, () -> d.apply(-1)); }   // testing exception handling
    @ParameterizedTest @ValueSource(ints = {2, 4, 6}) void evens(int n) { assertTrue(n % 2 == 0); }
    @Test @Disabled("not ready") void later() { }
}
```

| Assertion | Use |
|---|---|
| `assertEquals(expected, actual[, delta])` | values equal (the **expected comes first**) |
| `assertTrue/False`, `assertNull/NotNull` | conditions |
| `assertThrows(Type.class, executable)` | verify an exception |
| `assertAll(...)`, `assertArrayEquals` | grouped / arrays |

**Test suites** run many test classes together (`@Suite` with `@SelectClasses`/`@SelectPackages`). **Best practices:** one behaviour per test; names that describe the behaviour; **Arrange-Act-Assert**; tests independent of each other and of order; no real network/DB (use mocks); cover **edge cases** (empty, null, boundaries, e.g. sorting an empty/one-element/duplicates list); **flaky tests** (time/network-dependent) are fixed by mocking the unstable dependency.

**Mockito** replaces dependencies (a database, an API) with controllable fakes:

```java
@ExtendWith(MockitoExtension.class)
class OrderServiceTest {
    @Mock OrderRepository repo;                           // fake database access
    @InjectMocks OrderService service;                    // real service with the mock injected
    @Test void findsOrder() {
        when(repo.findById(1)).thenReturn(Optional.of(new Order(1)));      // stub the answer
        assertEquals(1, service.get(1).getId());
        verify(repo).findById(1);                                          // verify the interaction happened
    }
}
```

#### Worked Example 63: a complete tested service (JUnit 5 + Mockito)

This small project was **compiled here** against JUnit 5.12 and Mockito 5.17 (`mvn test-compile`). Running it needs the Surefire plugin from Maven Central, so the test report below shows the result you should see, not a captured run.

**Project layout**

```
shop-tests/
├── pom.xml
└── src
    ├── main/java/com/shop/  Discount.java  Order.java  OrderRepository.java  OrderService.java
    └── test/java/com/shop/  DiscountTest.java  OrderServiceTest.java
```

**Code under test**

```java
// Discount.java
public class Discount {
    /** 10% off for orders of 1000 or more; negative amounts are rejected. */
    public double apply(double amount) {
        if (amount < 0) throw new IllegalArgumentException("amount must not be negative");
        return amount >= 1000 ? amount * 0.9 : amount;
    }
}

// Order.java
public record Order(int id, double total) { }

// OrderRepository.java: the database boundary we will mock
public interface OrderRepository {
    Optional<Order> findById(int id);
    void save(Order order);
}

// OrderService.java: business logic with its dependencies injected through the constructor
public class OrderService {
    private final OrderRepository repo;
    private final Discount discount;
    public OrderService(OrderRepository repo, Discount discount) { this.repo = repo; this.discount = discount; }

    public Order get(int id) {
        return repo.findById(id).orElseThrow(() -> new IllegalStateException("order " + id + " not found"));
    }
    public Order place(int id, double amount) {
        Order order = new Order(id, discount.apply(amount));
        repo.save(order);
        return order;
    }
}
```

**Unit tests for a plain class (JUnit only)**

```java
class DiscountTest {
    private Discount discount;

    @BeforeEach
    void setUp() { discount = new Discount(); }          // fresh object before EACH test

    @Test
    @DisplayName("10% off at exactly 1000")
    void tenPercentAtThreshold() {
        assertEquals(900.0, discount.apply(1000), 0.001);  // expected, actual, delta for doubles
    }

    @Test
    void noDiscountBelowThreshold() { assertEquals(999.0, discount.apply(999), 0.001); }

    @Test
    void negativeAmountThrows() {
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> discount.apply(-1));
        assertEquals("amount must not be negative", ex.getMessage());
    }

    @ParameterizedTest(name = "{0} -> {1}")
    @CsvSource({"0, 0", "500, 500", "1000, 900", "2000, 1800"})
    void table(double amount, double expected) { assertEquals(expected, discount.apply(amount), 0.001); }

    @Test
    @Disabled("waiting for the festive-sale rules")
    void festiveSale() { fail("not implemented"); }
}
```

**Tests for a class with a dependency (JUnit + Mockito)**

```java
@ExtendWith(MockitoExtension.class)
class OrderServiceTest {
    @Mock OrderRepository repo;              // fake: returns what we tell it, records every call
    @Spy Discount discount = new Discount(); // real object whose calls are also recorded
    @InjectMocks OrderService service;       // real service built with the mock and the spy

    @Test
    void findsExistingOrder() {
        when(repo.findById(1)).thenReturn(Optional.of(new Order(1, 450.0)));   // Arrange: stub
        Order o = service.get(1);                                                // Act
        assertEquals(450.0, o.total(), 0.001);                                   // Assert
        verify(repo).findById(1);                                                // the call happened once
    }

    @Test
    void missingOrderThrows() {
        when(repo.findById(99)).thenReturn(Optional.empty());
        IllegalStateException ex = assertThrows(IllegalStateException.class, () -> service.get(99));
        assertEquals("order 99 not found", ex.getMessage());
    }

    @Test
    void placingAnOrderAppliesDiscountAndSaves() {
        Order placed = service.place(7, 2000);
        assertEquals(1800.0, placed.total(), 0.001);
        verify(discount).apply(2000);
        verify(repo, times(1)).save(any(Order.class));
        verifyNoMoreInteractions(repo);
    }
}
```

**Expected `mvn test` summary:**
```text
[INFO] Running com.shop.DiscountTest
[WARNING] Tests run: 8, Failures: 0, Errors: 0, Skipped: 1, Time elapsed: 0.05 s -- in com.shop.DiscountTest
[INFO] Running com.shop.OrderServiceTest
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.6 s -- in com.shop.OrderServiceTest
[INFO] Tests run: 11, Failures: 0, Errors: 0, Skipped: 1
[INFO] BUILD SUCCESS
```

**Explanation:**
- `DiscountTest` counts **8** tests: 3 `@Test` methods, 4 rows of the parameterized test, and 1 disabled test (reported as *Skipped*, which is why Maven prints a `[WARNING]`).
- The **boundary** values (999 and exactly 1000) are where bugs such as `>` instead of `>=` hide, so each gets its own test.
- `@Mock` gives an object that does nothing until stubbed with `when(...).thenReturn(...)`. No database is needed, so the tests are fast and never flaky.
- `@InjectMocks` calls `OrderService`'s constructor with the mock and the spy. Constructor injection is what makes this possible, which is one more reason to prefer it in Spring.
- `verify` checks **interactions** (was `save` called exactly once?); `verifyNoMoreInteractions` fails if the service made unexpected calls.
- **If a test fails**, Surefire prints the exact expectation, for example `expected: <900.0> but was: <1000.0>`, together with the test name and line number.

---

# 30. JDBC

*(Complete explanation: [Java_Handwritten_Notes.md](Java_Handwritten_Notes.md) §9.)* **JDBC** = **Java Database Connectivity**, the standard API (`java.sql`) to talk to relational databases; each database supplies a **driver**. Because you code against the **interfaces**, switching databases mostly means a new driver and URL: this **universal adapter** quality is its key benefit.

| Topic | Notes |
|---|---|
| **CRUD** | Create (`INSERT`), Read (`SELECT`), Update, Delete |
| **Driver types** | Type 1 JDBC-ODBC bridge (obsolete), Type 2 native-API, Type 3 network protocol, **Type 4 thin pure-Java driver** (what you use: MySQL Connector/J; no native code needed, best portability) |
| **Steps** | (1) dependency/driver on the classpath (loading `Class.forName(...)` is optional in JDBC 4+), (2) `DriverManager.getConnection(url, user, pwd)`, (3) create a `Statement`/`PreparedStatement`, (4) `executeQuery()` (SELECT, returns a `ResultSet`) or `executeUpdate()` (INSERT/UPDATE/DELETE, returns affected rows), (5) loop `while (rs.next())` and read with `getInt("col")` / `getString(1)` (**columns start at 1**), (6) **close** everything |
| **`SQLException`** | checked; catch it, show a friendly message, close resources (try-with-resources) |
| **`PreparedStatement` vs `Statement`** | Prepared is **pre-compiled, parameterized (`?`), prevents SQL injection**, faster on repeated use |
| **Batch** | `addBatch()` repeatedly, then `executeBatch()` → fewer round trips |
| **Special types** | `setDate`, `setBigDecimal`, `setBlob`, `setNull(index, Types.X)` |
| **Delete** | `DELETE ... WHERE id = ?` then check the returned count (>0 means something was removed); delete many with `IN (...)` or a batch |
| **Transactions / ACID** | **A**tomicity, **C**onsistency, **I**solation, **D**urability. `setAutoCommit(false)`; `commit()` on success; `rollback()` in the `catch`; restore auto-commit afterwards |
| **Stored procedures** | `CallableStatement cs = con.prepareCall("{call getSalary(?, ?)}"); cs.setInt(1, 7); cs.registerOutParameter(2, Types.DECIMAL); cs.execute(); cs.getBigDecimal(2);` |

```java
String url = "jdbc:mysql://localhost:3306/college";
try (Connection con = DriverManager.getConnection(url, "root", System.getenv("DB_PASSWORD"));
     PreparedStatement ps = con.prepareStatement("insert into Course values (?,?,?,?)")) {
    con.setAutoCommit(false);
    ps.setInt(1, 1); ps.setString(2, "Java"); ps.setString(3, "Rao"); ps.setInt(4, 5000);
    ps.addBatch();                                     // more rows can be added before the next line
    ps.executeBatch();
    con.commit();
} catch (SQLException e) { /* roll back inside a real transaction block */ e.printStackTrace(); }
```
(The core JDBC calls compile; running them needs a database.)
#### Worked Example 64: a complete DAO with CRUD, a transaction and the console output to expect

**Schema (MySQL):**

```sql
CREATE TABLE course (
  id      INT PRIMARY KEY,
  name    VARCHAR(50) NOT NULL,
  trainer VARCHAR(50),
  fee     DECIMAL(10,2)
);
```

**Data access object** (not compiled here: needs MySQL and Connector/J):

```java
import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CourseDao {
    private static final String URL = "jdbc:mysql://localhost:3306/college";

    private Connection connect() throws SQLException {
        return DriverManager.getConnection(URL, "root", System.getenv("DB_PASSWORD"));
    }

    public int insertAll(List<Object[]> rows) throws SQLException {
        String sql = "INSERT INTO course (id, name, trainer, fee) VALUES (?, ?, ?, ?)";
        try (Connection con = connect(); PreparedStatement ps = con.prepareStatement(sql)) {
            con.setAutoCommit(false);                         // start a transaction
            try {
                for (Object[] r : rows) {
                    ps.setInt(1, (Integer) r[0]);
                    ps.setString(2, (String) r[1]);
                    ps.setString(3, (String) r[2]);
                    ps.setBigDecimal(4, (BigDecimal) r[3]);
                    ps.addBatch();
                }
                int[] counts = ps.executeBatch();             // one round trip for all rows
                con.commit();                                 // make them permanent together
                return counts.length;
            } catch (SQLException e) {
                con.rollback();                               // undo the whole batch
                throw e;
            }
        }
    }

    public List<String> findCheaperThan(BigDecimal max) throws SQLException {
        String sql = "SELECT id, name, fee FROM course WHERE fee < ? ORDER BY fee";
        List<String> out = new ArrayList<>();
        try (Connection con = connect(); PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setBigDecimal(1, max);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next())                             // moves to the next row; false at the end
                    out.add(rs.getInt("id") + " " + rs.getString("name") + " " + rs.getBigDecimal("fee"));
            }
        }
        return out;
    }

    public int updateFee(int id, BigDecimal fee) throws SQLException {
        try (Connection con = connect();
             PreparedStatement ps = con.prepareStatement("UPDATE course SET fee = ? WHERE id = ?")) {
            ps.setBigDecimal(1, fee);
            ps.setInt(2, id);
            return ps.executeUpdate();                        // number of rows changed
        }
    }

    public int delete(int id) throws SQLException {
        try (Connection con = connect();
             PreparedStatement ps = con.prepareStatement("DELETE FROM course WHERE id = ?")) {
            ps.setInt(1, id);
            return ps.executeUpdate();
        }
    }

    public static void main(String[] args) throws SQLException {
        CourseDao dao = new CourseDao();
        System.out.println("inserted: " + dao.insertAll(List.of(
                new Object[]{1, "Java", "Rao", new BigDecimal("5000")},
                new Object[]{2, "SQL", "Mehta", new BigDecimal("3000")},
                new Object[]{3, "Spring", "Rao", new BigDecimal("7000")})));
        System.out.println("cheaper than 6000: " + dao.findCheaperThan(new BigDecimal("6000")));
        System.out.println("updated rows: " + dao.updateFee(2, new BigDecimal("3500")));
        System.out.println("deleted rows (id 3): " + dao.delete(3));
        System.out.println("deleted rows (id 99): " + dao.delete(99));
    }
}
```

**Expected console output** (on an empty `course` table):
```text
inserted: 3
cheaper than 6000: [2 SQL 3000.00, 1 Java 5000.00]
updated rows: 1
deleted rows (id 3): 1
deleted rows (id 99): 0
```

**Explanation:**
- **`PreparedStatement` with `?`** sends the SQL and the values separately, so a value such as `' OR '1'='1` is treated as data, never as SQL. This is what prevents **SQL injection**. With string concatenation (`"... WHERE name = '" + input + "'"`) the same input would return every row.
- The batch insert runs inside a **transaction**: if the third row failed (for example a duplicate id), `rollback()` would remove the first two as well, so the table is never left half-updated (**atomicity**).
- `executeQuery()` returns a `ResultSet` (for `SELECT`); `executeUpdate()` returns the **number of affected rows**. Deleting id 99 returns `0`, which is how you detect "record not found".
- `DECIMAL(10,2)` columns come back as `BigDecimal` with two decimals (`3000.00`), the correct type for money.
- The password comes from an environment variable so it is never committed to Git.

---

# 31. Maven

**Maven** is a **build and dependency-management tool**. Without it you download JARs by hand, put them on the classpath, and everyone's machine drifts (version conflicts, "works on my machine", no standard layout, manual builds).

| Feature | Meaning |
|---|---|
| **Dependency management** | Declare `groupId:artifactId:version`; Maven downloads it **and its transitive dependencies** from Maven Central into `~/.m2` |
| **Consistent builds** | The same commands everywhere |
| **Standard project structure** | `src/main/java`, `src/main/resources`, `src/test/java`, `target/` (output), `pom.xml` |
| **Lifecycle** | `validate → compile → test → package → verify → install → deploy` (running a phase runs all earlier ones); plus `clean` |
| **Plugins** | Add abilities: `maven-compiler-plugin`, `maven-surefire-plugin` (tests), `spring-boot-maven-plugin` (runnable JAR) |
| **Archetype** | A project template (`maven-archetype-quickstart`) |

```xml
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>                  <!-- organization / package prefix -->
  <artifactId>demo</artifactId>                   <!-- project name -->
  <version>1.0.0</version>
  <properties><maven.compiler.release>17</maven.compiler.release></properties>
  <dependencies>
    <dependency>
      <groupId>com.mysql</groupId><artifactId>mysql-connector-j</artifactId><version>8.4.0</version>
    </dependency>
    <dependency>                                  <!-- scope: only for tests -->
      <groupId>org.junit.jupiter</groupId><artifactId>junit-jupiter</artifactId><version>5.10.2</version><scope>test</scope>
    </dependency>
  </dependencies>
</project>
```

**Dependency scopes:** `compile` (default), `provided` (given by the server, e.g. servlet API), `runtime` (needed only to run, e.g. a JDBC driver), `test`. **Common commands:** `mvn clean`, `mvn compile`, `mvn test`, `mvn package` (builds the JAR), `mvn install`, `mvn dependency:tree`. **In Eclipse:** *New → Maven Project*, edit `pom.xml`, then **Maven → Update Project** to refresh dependencies; find the exact `groupId`/`artifactId`/version on **mvnrepository.com**. **Gradle** is the alternative build tool.
#### Worked Example 65: what Maven prints, and how to read it

**`mvn clean package` on the project from Worked Example 63** (trimmed, illustrative):

```text
[INFO] --- clean:3.2.0:clean (default-clean) @ shop-tests ---
[INFO] Deleting /work/shop-tests/target
[INFO] --- resources:3.3.1:resources (default-resources) @ shop-tests ---
[INFO] --- compiler:3.14.0:compile (default-compile) @ shop-tests ---
[INFO] Compiling 4 source files with javac [debug release 17] to target/classes
[INFO] --- compiler:3.14.0:testCompile (default-testCompile) @ shop-tests ---
[INFO] Compiling 2 source files with javac [debug release 17] to target/test-classes
[INFO] --- surefire:3.5.3:test (default-test) @ shop-tests ---
[INFO] Tests run: 11, Failures: 0, Errors: 0, Skipped: 1
[INFO] --- jar:3.4.1:jar (default-jar) @ shop-tests ---
[INFO] Building jar: /work/shop-tests/target/shop-tests-1.0.0.jar
[INFO] BUILD SUCCESS
```

**Explanation:** asking for the `package` phase ran **every earlier phase** in order: resources → compile → test-compile → test → jar. If a single test fails, the build stops at `test` and no JAR is produced, which is how Maven stops broken code from being packaged. The JAR name comes from `artifactId-version`.

**`mvn dependency:tree`** (illustrative) shows where each library comes from:

```text
com.shop:shop-tests:jar:1.0.0
+- org.junit.jupiter:junit-jupiter:jar:5.12.2:test
|  +- org.junit.jupiter:junit-jupiter-api:jar:5.12.2:test
|  +- org.junit.jupiter:junit-jupiter-params:jar:5.12.2:test
|  \- org.junit.jupiter:junit-jupiter-engine:jar:5.12.2:test
\- org.mockito:mockito-junit-jupiter:jar:5.17.0:test
   \- org.mockito:mockito-core:jar:5.17.0:test
      +- net.bytebuddy:byte-buddy:jar:1.15.11:test
      \- net.bytebuddy:byte-buddy-agent:jar:1.15.11:test
```

You declared **two** dependencies; Maven resolved the rest **transitively**. When two libraries need different versions of the same artifact, the version **nearest** to your project in this tree wins; you can force one with `<dependencyManagement>`.

| Problem | Typical message | Fix |
|---|---|---|
| Wrong Java level | `release version 17 not supported` | install JDK 17+ or lower `maven.compiler.release` |
| Typo in coordinates | `Could not find artifact com.mysql:mysql-conector-j` | copy coordinates from mvnrepository.com |
| Offline / no network | `Cannot access central ... in offline mode` | connect once so `~/.m2` is filled, or remove `-o` |
| Test failure | `Tests run: 5, Failures: 1` then `BUILD FAILURE` | read the failing assertion; `-DskipTests` only for emergencies |

---

# 32. Hibernate

*(Complete explanation incl. object states, N+1 and entity mappings: [Java_Handwritten_Notes.md](Java_Handwritten_Notes.md) §10 and §20.)* **Hibernate** is an **ORM** (Object-Relational Mapping) framework: it maps **classes ↔ tables, objects ↔ rows, fields ↔ columns**, so you work with objects instead of SQL. It builds on JDBC underneath.

| Question | Answer |
|---|---|
| Key features | ORM, **HQL** (queries on objects), **database independence** (a *dialect* generates SQL per database), **automatic table creation** (`hbm2ddl.auto`), caching, lazy loading, transactions |
| When to use | Many CRUD operations, domain-model-heavy apps, need to switch DBs; **less suited** for heavy reporting/bulk SQL where hand-tuned SQL wins |
| Advantage over raw SQL | Less boilerplate, no manual row↔object mapping, portability, built-in caching |

**Architecture:** `Configuration` (reads `hibernate.cfg.xml`) → **`SessionFactory`** (heavy, **one per application**, thread-safe) → **`Session`** (lightweight unit of work, **not** thread-safe, first-level cache) → **`Transaction`** → HQL `Query`.

```java
@Entity                                                       // a persistent entity (mapped to a table)
@Table(name = "book")
public class Book {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)   // primary key, DB auto-increment
    private int id;
    private String title;
    private double price;
    // no-arg constructor + getters/setters
}

SessionFactory sf = new Configuration().configure().addAnnotatedClass(Book.class).buildSessionFactory();
try (Session s = sf.openSession()) {
    Transaction tx = s.beginTransaction();
    s.persist(new Book("Java", 450));                         // INSERT   (transaction required for writes)
    Book b = s.get(Book.class, 1);                            // SELECT by primary key; returns null if missing
    b.setPrice(500);                                          // UPDATE: a persistent object is tracked automatically
    s.remove(b);                                              // DELETE
    tx.commit();
}
```
**CRUD in Hibernate:** save → `persist()`; read → `get()`; update → modify the persistent object (or `merge()`; older `update()`); delete → `remove()`; always inside a **transaction**, and missing records are handled by checking `get()` for `null` before updating or deleting.
#### Worked Example 66: the SQL Hibernate generates for each operation

With `hibernate.show_sql=true` and `hibernate.format_sql=true`, the CRUD code above prints the SQL it sends to MySQL (illustrative log):

```text
Hibernate:
    insert into book (price, title) values (?, ?)
Hibernate:
    select b1_0.id, b1_0.price, b1_0.title from book b1_0 where b1_0.id=?
Hibernate:
    update book set price=?, title=? where id=?
Hibernate:
    delete from book where id=?
```

**Explanation:**
- `persist()` → `INSERT`. With `GenerationType.IDENTITY` the insert runs immediately so the database can assign the id.
- `get(Book.class, 1)` → `SELECT … WHERE id = ?`. Calling `get` again for the same id in the **same session** prints **no** second SELECT, because the object is served from the **first-level cache**.
- `b.setPrice(500)` contains no Hibernate call at all, yet an `UPDATE` appears: the object is **persistent** (managed), and at `commit()` Hibernate compares it with the snapshot it loaded (**dirty checking**) and writes the change.
- `remove()` → `DELETE`. All statements are parameterised (`?`), so Hibernate is safe from SQL injection as long as you do not build HQL by string concatenation.

**The N+1 problem, seen in the log:** loading 3 departments and then touching `dept.getEmployees()` for each one prints

```text
select ... from department d1_0                         ← 1 query
select ... from employee e1_0 where e1_0.dept_id=?      ← +1 per department
select ... from employee e1_0 where e1_0.dept_id=?
select ... from employee e1_0 where e1_0.dept_id=?
```

Rewriting the query as `select d from Department d join fetch d.employees` loads everything with **one** joined `SELECT`.

**Primary key generation:** `AUTO`, `IDENTITY`, `SEQUENCE`, `TABLE`. **HQL:** `from Student where marks > :m` (class and field names, not table/column names): `session.createQuery(hql, Student.class).setParameter("m", 60).list()`.

**Mappings:** `@OneToOne`, `@OneToMany` / `@ManyToOne` (the foreign key is on the **many** side), `@ManyToMany` with `@JoinTable`; `@JoinColumn` names the FK; `cascade = CascadeType.ALL` propagates operations (Student-Course, Employee-Department examples); `mappedBy` marks the **inverse (non-owning)** side of a bidirectional relationship; in many-to-many, the side with `@JoinTable` **owns** the relationship. **Fetching:** `LAZY` (load related data when first used) vs `EAGER`. **Best practices:** use `LAZY`, avoid the **N+1 problem** with `join fetch`, index frequently queried columns, cache (**first-level** per session by default; second-level optional), keep sessions short, use DTOs for APIs.

---

# 33. Servlets

A **web application** is accessed through a browser over HTTP. The **UI** (HTML/CSS/JS) runs on the **client**; **server-side** code (Java servlets/Spring, PHP, Node) builds dynamic responses. **Static** pages are the same for everyone; **dynamic** pages are generated per request (from DB data, user input).

A **servlet** is a Java class that **handles HTTP requests and produces responses** on a server (Tomcat). It is the foundation under Spring MVC.

```
Servlet (interface) → GenericServlet (protocol-independent) → HttpServlet (HTTP: doGet, doPost)
```

**Lifecycle (container-controlled):** (1) the container **loads** the class and creates **one** instance; (2) `init()` runs **once**; (3) for every request `service()` runs (dispatching to `doGet`/`doPost`/...), possibly on many threads at once; (4) `destroy()` runs **once** at removal. `<load-on-startup>` (or `loadOnStartup` in annotations) creates/initializes the servlet **at server start** instead of at the first request.

```java
@WebServlet("/hello")                                         // URL mapping (no web.xml needed)
public class HelloServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("text/html");                     // tell the browser what is coming
        String name = req.getParameter("name");               // form/query parameter
        PrintWriter out = resp.getWriter();                   // text output stream
        out.println("<h1>Hello, " + name + "</h1>");
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.sendRedirect("success.html");                    // sends HTTP 302 → the browser requests a new URL
    }
}
```
(not compiled here: needs the Servlet API / Tomcat.)

| Item | Notes |
|---|---|
| **GET vs POST** | GET: data in the URL, for reads; POST: data in the body, for create/submit |
| **`sendRedirect()`** | Tells the browser to make a **new** request (status **302**); URL changes |
| **`RequestDispatcher` (`forward` / `include`)** | Server-side hand-off to another servlet/JSP in the **same** request (**servlet chaining**); URL does not change |
| **JDBC + servlets** | Read parameters → query with `PreparedStatement` → write HTML (fetch employee data, manage students/employees) |
| **Form handling** | `<form action="/save" method="post">` → `doPost` → `req.getParameter("fieldName")` (names must match) |
| **Thread safety** | One servlet instance serves many threads, so **don't keep per-request state in instance fields** |
#### Worked Example 67: a form-handling servlet and the HTTP exchange it produces

```java
@WebServlet(urlPatterns = "/register", loadOnStartup = 1)
public class RegisterServlet extends HttpServlet {
    @Override
    public void init() { System.out.println("RegisterServlet initialised"); }        // once

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("text/html;charset=UTF-8");
        resp.getWriter().println("""
            <form method="post" action="register">
              <input name="name"> <input name="email"> <button>Register</button>
            </form>""");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String name = req.getParameter("name");                                       // matches <input name="name">
        String email = req.getParameter("email");
        if (name == null || name.isBlank() || email == null || !email.contains("@")) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "name and a valid email are required");
            return;
        }
        // save with JDBC / a DAO here ...
        resp.sendRedirect("welcome.html?name=" + URLEncoder.encode(name, StandardCharsets.UTF_8));   // Post/Redirect/Get
    }

    @Override
    public void destroy() { System.out.println("RegisterServlet destroyed"); }      // once, at shutdown
}
```
(not compiled here: needs the Servlet API and Tomcat.)

**Trying it with `curl`:**

```text
$ curl -i -X POST -d "name=Asha&email=asha@mail.com" http://localhost:8080/app/register
HTTP/1.1 302
Location: welcome.html?name=Asha
Content-Length: 0

$ curl -i -X POST -d "name=Asha&email=wrong" http://localhost:8080/app/register
HTTP/1.1 400
Content-Type: text/html;charset=utf-8
...name and a valid email are required...
```

**Explanation:**
- The browser (or `curl -d`) sends the form fields in the POST **body** as `name=Asha&email=...`; `getParameter` looks them up by the input's `name` attribute.
- A successful POST answers with **302 + `Location`**, so the browser makes a fresh GET to the welcome page. This *Post/Redirect/Get* pattern stops a page refresh from submitting the form twice.
- Invalid input gets a **400 Bad Request** instead of a crash or a silent failure.
- `loadOnStartup = 1` makes Tomcat create the servlet and call `init()` when the application starts, so the first user does not pay the start-up cost. `destroy()` runs once at shutdown.
- `name` and `email` are **local variables**, so each request thread has its own copies. Storing them in fields would let simultaneous users overwrite each other's data.

---

# 34. Spring and Spring Boot

*(IoC/DI/bean/autowiring and the Student Management example are in [Java_Handwritten_Notes.md](Java_Handwritten_Notes.md) §21-22.)*

**Why Spring?** Plain Java EE needs lots of boilerplate (object creation, wiring, transactions, config). Spring provides a **container** that creates and wires objects (**IoC/DI**), plus **modular** libraries: Core, MVC/Web, Data (JPA/JDBC), Security, AOP, Test, etc. Choose the modules you need.

| Concept | Meaning |
|---|---|
| **IoC (Inversion of Control)** | The **container** creates and manages objects (beans) instead of your code calling `new` |
| **DI (Dependency Injection)** | The container **supplies** each object's dependencies |

| Injection type | Written as | When |
|---|---|---|
| **Constructor** | `@Autowired` (optional if one constructor) on the constructor | **Preferred**: required dependencies, immutable (`final`) fields |
| **Setter** | `@Autowired` on a setter | Optional dependencies |
| **Field** | `@Autowired` on the field | Short but hard to test; avoid in production |

```java
@Service
public class GreetingService { public String greet(String n) { return "Hello, " + n; } }

@Controller
public class HomeController {
    private final GreetingService service;
    public HomeController(GreetingService service) { this.service = service; }      // constructor injection

    @GetMapping("/greet")
    public String greet(@RequestParam(defaultValue = "friend") String name, Model model) {
        model.addAttribute("message", service.greet(name));                         // data for the Thymeleaf template
        return "greet";                                                              // templates/greet.html
    }
}
```
```html
<p th:text="${message}">placeholder</p>      <!-- Thymeleaf: filled from the Model -->
```
(not compiled here: needs Spring Boot.)

**Spring Boot** = Spring with **opinionated defaults**:

| Feature | Meaning |
|---|---|
| **Auto-configuration** | Looks at the classpath and your properties and configures beans automatically (`spring-boot-starter-web` → MVC + Jackson + Tomcat; a MySQL driver + `spring.datasource.*` → a `DataSource`) |
| **Starter POMs** | One dependency (`spring-boot-starter-web`, `-data-jpa`, `-security`, `-thymeleaf`, `-test`, `-mail`) brings a compatible set |
| **Embedded server** | Tomcat inside the JAR → run with `java -jar app.jar`, no external install |
| **`@SpringBootApplication`** | = `@Configuration` + `@EnableAutoConfiguration` + `@ComponentScan`; the **main application class** with `SpringApplication.run(...)` |
| **`@Primary`** | Preferred bean when several candidates of the same type exist; `@Qualifier("name")` picks one **explicitly** (a qualifier is more specific and wins over `@Primary`) |
| **`application.properties`** | Configuration (`server.port`, DB URL, etc.) |

**Build-it-yourself apps in the list:** a **Calculator** with a service layer (controller reads `@RequestParam` numbers, service computes and handles **division by zero** with a friendly message), a **dynamic greeting** (service → model → Thymeleaf). The **service layer** holds business logic so controllers stay thin and logic stays testable.

**REST** (Representational State Transfer): resources identified by URLs, manipulated with HTTP verbs, **stateless** (each request carries all it needs; the server keeps no client session → easy to scale).

| Verb | Meaning | Typical status |
|---|---|---|
| `GET` | read | 200 / 404 |
| `POST` | create | 201 Created |
| `PUT` | replace/update (idempotent) | 200 / 204 |
| `PATCH` | partial update | 200 |
| `DELETE` | delete | 204 |

```java
@RestController @RequestMapping("/employees")
public class EmployeeController {
    private final EmployeeService service;
    public EmployeeController(EmployeeService s) { this.service = s; }
    @GetMapping           public List<Employee> all()                          { return service.all(); }          // JSON
    @GetMapping("/{id}")  public ResponseEntity<Employee> one(@PathVariable int id) { return service.find(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()); }
    @PostMapping          public Employee add(@RequestBody Employee e)          { return service.save(e); }
}
public interface EmployeeRepository extends JpaRepository<Employee, Integer> { }   // Spring Data JPA writes the implementation
```
**JPA** (the standard persistence API) removes JDBC boilerplate; `JpaRepository` gives `save/findById/findAll/deleteById`; the **service layer** sits between controller and repository (business rules, transactions with `@Transactional`).
#### Worked Example 68: a REST endpoint end-to-end, with the requests and responses you should see

```java
@Entity
public class Employee {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Integer id;
    @NotBlank private String name;
    @Positive private double salary;
    // constructors, getters, setters
}

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    List<Employee> findBySalaryGreaterThan(double min);         // query derived from the method name
}

@Service
public class EmployeeService {
    private final EmployeeRepository repo;
    public EmployeeService(EmployeeRepository repo) { this.repo = repo; }
    public List<Employee> all() { return repo.findAll(); }
    public Optional<Employee> find(int id) { return repo.findById(id); }
    @Transactional public Employee save(Employee e) { return repo.save(e); }
    public List<Employee> richerThan(double min) { return repo.findBySalaryGreaterThan(min); }
}

@RestController
@RequestMapping("/employees")
public class EmployeeController {
    private final EmployeeService service;
    public EmployeeController(EmployeeService service) { this.service = service; }

    @GetMapping
    public List<Employee> all(@RequestParam(required = false) Double minSalary) {
        return minSalary == null ? service.all() : service.richerThan(minSalary);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> one(@PathVariable int id) {
        return service.find(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Employee> add(@Valid @RequestBody Employee e) {
        Employee saved = service.save(e);
        return ResponseEntity.created(URI.create("/employees/" + saved.getId())).body(saved);
    }
}
```

```properties
# application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/company
spring.datasource.username=root
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```
(not compiled here: needs Spring Boot with `spring-boot-starter-web`, `-data-jpa`, `-validation` and the MySQL driver.)

**Requests and expected responses:**

```text
$ curl -i -X POST localhost:8080/employees -H "Content-Type: application/json" -d '{"name":"Asha","salary":55000}'
HTTP/1.1 201
Location: /employees/1
Content-Type: application/json
{"id":1,"name":"Asha","salary":55000.0}

$ curl -s localhost:8080/employees/1
{"id":1,"name":"Asha","salary":55000.0}

$ curl -i localhost:8080/employees/42
HTTP/1.1 404

$ curl -s "localhost:8080/employees?minSalary=60000"
[]

$ curl -i -X POST localhost:8080/employees -H "Content-Type: application/json" -d '{"name":"","salary":-5}'
HTTP/1.1 400
```

**Explanation:**
- **Request flow:** Tomcat receives the request → Spring's `DispatcherServlet` finds the matching `@GetMapping`/`@PostMapping` → the controller calls the service → the service calls the repository → Hibernate runs SQL → the returned object is turned into **JSON** by Jackson.
- `@RequestBody` converts incoming JSON into an `Employee`; `@Valid` enforces `@NotBlank`/`@Positive` and answers **400** automatically when they fail, before your code runs.
- `ResponseEntity` lets the controller choose the status: **201 Created** with a `Location` header for a new resource, **404** when `findById` is empty.
- `findBySalaryGreaterThan` has no implementation: Spring Data reads the method name and generates `SELECT … WHERE salary > ?`.
- `@Transactional` on `save` means all database work in that method commits together or rolls back together.

---

# 35. Spring Security: BCrypt, Roles, OTP, JWT

| Concept | Explanation |
|---|---|
| **Without Spring Security** | You write filters, password checks, session handling, CSRF/CORS protection yourself, and mistakes are easy |
| **With Spring Security** | A **filter chain** in front of every request handles **authentication** (who are you?) and **authorization** (what may you do?), password hashing, sessions/tokens, CSRF, and more |
| **Basic authentication** | Adding `spring-boot-starter-security` secures everything immediately (a generated password in the log). Credentials travel in each request header → use only over **HTTPS** |
| **Custom security configuration** | A `SecurityFilterChain` bean: which URLs are public, which need login, which roles |
| **Role-based access control (RBAC)** | Users have **roles** (`USER`, `ADMIN`); URLs/methods require roles: `.requestMatchers("/admin/**").hasRole("ADMIN")` or `@PreAuthorize("hasRole('ADMIN')")` |

```java
@Configuration @EnableWebSecurity
public class SecurityConfig {
    @Bean SecurityFilterChain chain(HttpSecurity http) throws Exception {
        http.csrf(c -> c.disable())                                          // typical for stateless APIs
            .authorizeHttpRequests(a -> a
                .requestMatchers("/api/auth/**", "/api/products/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }
    @Bean PasswordEncoder encoder() { return new BCryptPasswordEncoder(); }
}
```
(not compiled here)

**`BCryptPasswordEncoder`:** a **one-way, salted, slow** hash for passwords. `encoder.encode("secret")` gives a different string each time (random salt); `encoder.matches("secret", hash)` verifies. **Never store plain-text passwords** and never decrypt them.
#### Worked Example 69: salted, slow password hashing with only the JDK (the idea behind BCrypt)

BCrypt itself comes from Spring Security, but the JDK ships **PBKDF2**, which works on the same principles, so the idea can be shown and run here.

```java
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;

public class Main {
    static final int ITERATIONS = 100_000;               // "slow" on purpose: costly for attackers

    static String hash(String password, byte[] salt) throws Exception {
        PBEKeySpec spec = new PBEKeySpec(password.toCharArray(), salt, ITERATIONS, 256);
        byte[] h = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256").generateSecret(spec).getEncoded();
        return Base64.getEncoder().encodeToString(salt) + ":" + Base64.getEncoder().encodeToString(h);
    }

    static boolean matches(String password, String stored) throws Exception {
        byte[] salt = Base64.getDecoder().decode(stored.split(":")[0]);
        String recomputed = hash(password, salt);
        return MessageDigest.isEqual(recomputed.getBytes(), stored.getBytes());   // constant-time compare
    }

    public static void main(String[] args) throws Exception {
        SecureRandom rnd = new SecureRandom();
        byte[] salt1 = new byte[16], salt2 = new byte[16];
        rnd.nextBytes(salt1);
        rnd.nextBytes(salt2);

        String h1 = hash("secret123", salt1);
        String h2 = hash("secret123", salt2);
        System.out.println("same password, different stored hashes? " + !h1.equals(h2));
        System.out.println("stored format is salt:hash          ? " + (h1.split(":").length == 2));
        System.out.println("correct password matches            ? " + matches("secret123", h1));
        System.out.println("wrong password matches              ? " + matches("secret124", h1));
        System.out.println("plain text appears in the hash      ? " + h1.contains("secret123"));
    }
}
```

**Output:**
```text
same password, different stored hashes? true
stored format is salt:hash          ? true
correct password matches            ? true
wrong password matches              ? false
plain text appears in the hash      ? false
```

**Explanation:**
- **One-way:** there is no "decrypt". To log a user in, you hash the typed password with the **same salt** and compare the results.
- **Salted:** a fresh random salt per user makes identical passwords produce different hashes, so a leaked table cannot be attacked with one precomputed "rainbow table", and users with the same password are not revealed.
- **Slow:** 100,000 iterations take a fraction of a second for one login but make guessing billions of passwords impractical. BCrypt's *cost factor* (the `$2a$10$` prefix means 2¹⁰ rounds) plays the same role and stores the salt inside the hash string.
- `MessageDigest.isEqual` compares in constant time, so response timing does not leak how many characters matched.
- In Spring you simply write `encoder.encode(raw)` when registering and `encoder.matches(raw, storedHash)` when logging in.

**OTP authentication (one-time password):** (1) user submits email → (2) server generates a random 6-digit code, stores **its hash**/expiry, and emails it with `spring-boot-starter-mail` (`JavaMailSender`) → (3) user enters it → (4) server checks the code **and** that it is **not expired** (e.g. `now < createdAt + 5 minutes`) and **not already used**, limits attempts, then logs the user in.
#### Worked Example 70: generating and validating an OTP with expiry, single use and attempt limits

```java
import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;

public class Main {
    static class OtpRecord {
        final String code; final Instant expiresAt; boolean used; int attempts;
        OtpRecord(String code, Instant expiresAt) { this.code = code; this.expiresAt = expiresAt; }
    }

    static final SecureRandom RANDOM = new SecureRandom();

    static String generate() { return String.format("%06d", RANDOM.nextInt(1_000_000)); }   // 000000-999999

    static String verify(OtpRecord r, String entered, Instant now) {
        if (r.used) return "rejected: already used";
        if (now.isAfter(r.expiresAt)) return "rejected: expired";
        if (++r.attempts > 3) return "rejected: too many attempts";
        if (!r.code.equals(entered)) return "rejected: wrong code (attempt " + r.attempts + ")";
        r.used = true;
        return "accepted";
    }

    public static void main(String[] args) {
        String code = generate();
        System.out.println("6 digits? " + code.matches("\\d{6}"));

        Instant issued = Instant.parse("2026-01-01T10:00:00Z");
        OtpRecord rec = new OtpRecord("482913", issued.plus(Duration.ofMinutes(5)));
        System.out.println(verify(rec, "111111", issued.plusSeconds(30)));
        System.out.println(verify(rec, "482913", issued.plusSeconds(60)));
        System.out.println(verify(rec, "482913", issued.plusSeconds(90)));

        OtpRecord late = new OtpRecord("120044", issued.plus(Duration.ofMinutes(5)));
        System.out.println(verify(late, "120044", issued.plus(Duration.ofMinutes(6))));

        OtpRecord brute = new OtpRecord("777777", issued.plus(Duration.ofMinutes(5)));
        for (String guess : new String[]{"000001", "000002", "000003", "777777"})
            System.out.println(verify(brute, guess, issued.plusSeconds(10)));
    }
}
```

**Output:**
```text
6 digits? true
rejected: wrong code (attempt 1)
accepted
rejected: already used
rejected: expired
rejected: wrong code (attempt 1)
rejected: wrong code (attempt 2)
rejected: wrong code (attempt 3)
rejected: too many attempts
```

**Explanation:**
- `SecureRandom` (not `Random`) is required for security codes: `Random` is predictable once a few outputs are known. `%06d` keeps leading zeros (`004213`).
- The checks run in a deliberate order: **used** → **expired** → **attempt limit** → **code**. Even the correct code is refused after it has been used once, after its 5-minute window, or after 3 failed attempts (otherwise an attacker could try all 1,000,000 codes).
- Times are passed in as parameters instead of calling `Instant.now()` inside `verify`, which makes the logic **testable** with fixed times, exactly as done here.
- In the real service the code is stored **hashed** in the database (like a password) and sent with `JavaMailSender`.

**JWT (JSON Web Token):** a signed token the server gives after login; the client sends it in `Authorization: Bearer <token>` on every request, so the server stays **stateless**. Structure: `header.payload.signature` (Base64URL parts). **Key payload fields (claims):** `sub` (subject, e.g. username/id), `iat` (issued at), **`exp` (expiration)**, roles. `setExpiration(...)` limits how long a stolen token is useful. The signature (HMAC/RSA with a **secret key kept on the server**) detects tampering; the payload is **readable**, so never put secrets in it.

```
Login ─► validate password (BCrypt) ─► create JWT (sub, role, iat, exp) signed with the secret ─► return to client
Request ─► Authorization: Bearer <jwt> ─► a JWT FILTER (runs before controllers) validates signature + expiry ─► sets the authenticated user
```

**Centralized request filtering for authentication** = one `OncePerRequestFilter` checks the token for every request instead of repeating the check in each controller.
#### Worked Example 71: building and verifying a JWT by hand (HMAC-SHA256, JDK only)

Libraries such as `jjwt` do this for you, but seeing the three parts built and checked removes the mystery.

```java
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;

public class Main {
    static final Base64.Encoder B64 = Base64.getUrlEncoder().withoutPadding();
    static final byte[] SECRET = "change-me-to-a-long-random-server-secret".getBytes(StandardCharsets.UTF_8);

    static String sign(String data) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(SECRET, "HmacSHA256"));
        return B64.encodeToString(mac.doFinal(data.getBytes(StandardCharsets.UTF_8)));
    }

    static String create(String user, String role, long iat, long exp) throws Exception {
        String header = B64.encodeToString("{\"alg\":\"HS256\",\"typ\":\"JWT\"}".getBytes(StandardCharsets.UTF_8));
        String payload = B64.encodeToString(("{\"sub\":\"" + user + "\",\"role\":\"" + role
                + "\",\"iat\":" + iat + ",\"exp\":" + exp + "}").getBytes(StandardCharsets.UTF_8));
        return header + "." + payload + "." + sign(header + "." + payload);
    }

    static String validate(String token, long now) throws Exception {
        String[] parts = token.split("\\.");
        if (parts.length != 3) return "invalid: not three parts";
        String expected = sign(parts[0] + "." + parts[1]);
        if (!MessageDigest.isEqual(expected.getBytes(), parts[2].getBytes())) return "invalid: signature mismatch (tampered)";
        String json = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
        long exp = Long.parseLong(json.replaceAll(".*\"exp\":(\\d+).*", "$1"));
        if (now >= exp) return "invalid: expired";
        return "valid -> " + json;
    }

    public static void main(String[] args) throws Exception {
        long iat = 1_767_225_600L;                       // 2026-01-01T00:00:00Z in seconds
        long exp = iat + 15 * 60;                        // valid for 15 minutes
        String token = create("asha", "USER", iat, exp);
        String[] p = token.split("\\.");
        System.out.println("header  = " + p[0]);
        System.out.println("decoded = " + new String(Base64.getUrlDecoder().decode(p[0])));
        System.out.println("payload decoded = " + new String(Base64.getUrlDecoder().decode(p[1])));

        System.out.println(validate(token, iat + 60));

        String forgedPayload = B64.encodeToString(("{\"sub\":\"asha\",\"role\":\"ADMIN\",\"iat\":" + iat + ",\"exp\":" + exp + "}").getBytes());
        System.out.println(validate(p[0] + "." + forgedPayload + "." + p[2], iat + 60));

        System.out.println(validate(token, exp + 1));
    }
}
```

**Output:**
```text
header  = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
decoded = {"alg":"HS256","typ":"JWT"}
payload decoded = {"sub":"asha","role":"USER","iat":1767225600,"exp":1767226500}
valid -> {"sub":"asha","role":"USER","iat":1767225600,"exp":1767226500}
invalid: signature mismatch (tampered)
invalid: expired
```

**Explanation:**
- A JWT is `base64url(header).base64url(payload).base64url(signature)`. Every JWT signed with HS256 starts with `eyJhbGciOiJIUzI1NiIs…`, because that is the encoding of the same header JSON.
- The payload is only **encoded, not encrypted**: anyone holding the token can read it (the decoded line above). Never put passwords or personal secrets in it.
- The **signature** is an HMAC of `header.payload` computed with a secret only the server knows. Changing `"role":"USER"` to `"ADMIN"` changes the payload, the recomputed signature no longer matches, and the token is rejected. Without the secret, an attacker cannot produce a valid signature.
- `exp` limits how long a stolen token is useful; the filter rejects it once `now >= exp`.
- In Spring Security, this validation lives in **one** `OncePerRequestFilter` that reads `Authorization: Bearer <token>`, validates it, and sets the authenticated user before any controller runs.

---

# 36. Sales Savvy: The Full-Stack Project Blueprint

The syllabus ends with an end-to-end e-commerce project, **Sales Savvy**: a React front end, Spring Boot back end, MySQL database, JWT security, a payment gateway and Docker. This section describes how such a system is normally designed from your topic list (it is a **design guide**; it does not reproduce any private course code).

## 36.1 Architecture

```
React (browser)  ──HTTPS/JSON──►  Spring Boot REST API  ──JPA/Hibernate──►  MySQL
 pages, state                      Controller → Service → Repository
 (useState, useNavigate)           Spring Security + JWT filter, BCrypt
                                   mail (OTP), payment SDK (Razorpay)
```

## 36.2 Services (modular, scalable)

| Service | Responsibility | Typical endpoints |
|---|---|---|
| **Authentication** | Registration, login, logout, JWT issue/validate | `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout` |
| **Product management** | Products by category, details | `GET /api/products?category=...` |
| **Cart management** | Add item, fetch cart, update quantity, delete item | `POST /api/cart`, `GET /api/cart`, `PUT /api/cart/{id}`, `DELETE /api/cart/{id}` |
| **Payment** | Create a payment order, verify the gateway response | `POST /api/payment/create`, `POST /api/payment/verify` |
| **Order management** | Create order from the cart, order history | `POST /api/orders`, `GET /api/orders` |
| **Admin** | Manage products, users, business reports | `/api/admin/...` (role `ADMIN`) |

## 36.3 Database design (normalized)

**Normalization** removes duplicated data by splitting it into related tables linked with foreign keys (1NF: atomic columns; 2NF: no partial dependency; 3NF: no transitive dependency).

```
users(id PK, username UNIQUE, email UNIQUE, password_hash, role, created_at)
products(id PK, name, description, price, category, image_url, stock)
cart_items(id PK, user_id FK→users, product_id FK→products, quantity)
orders(id PK, user_id FK→users, total, status, created_at)
order_items(id PK, order_id FK→orders, product_id FK→products, quantity, price_at_purchase)
payments(id PK, order_id FK→orders, gateway_payment_id, amount, status)
jwt_tokens(id PK, user_id FK, token, expires_at)    -- optional: supports logout / revocation
```
Store **price at purchase** in `order_items` so later price changes do not rewrite history. Index columns used in `WHERE`/`JOIN` (`email`, `user_id`, `category`).

## 36.4 Flow by feature

| Feature | Back end | Front end |
|---|---|---|
| **Registration** | Validate input, check duplicates, **BCrypt-hash** the password, save the user | Form with controlled inputs (`useState` per field), submit with `fetch`/axios |
| **Login** | Load user, `matches(raw, hash)`, create **JWT** (`sub`, `role`, `exp`), return it | Store the token (memory/`localStorage`/**httpOnly cookie** is safer), redirect (`useNavigate`) |
| **Display products** | JWT filter authenticates; `ProductController` → `ProductService` → `ProductRepository.findByCategory` | `useEffect` fetch on load, render cards, category filter, cart icon navigates to the cart |
| **Add to cart** | Identify the user from the **token** (never trust a user id from the client), create/increase the cart item | Button calls the API and updates state |
| **Fetch cart** | Three layers: controller (HTTP) → service (totals, rules) → repository (query) | Cart page lists items, quantity +/-, delete, total |
| **Update/delete cart item** | Verify the item belongs to the user, then update/delete | Optimistic UI update, error display |
| **Payment** | Server creates a **gateway order** (amount computed **on the server**), returns its id; after the user pays, the server **verifies the signature** from the gateway before marking the order paid | Gateway checkout widget (Razorpay) opened with the order id, success callback calls verify |
| **Order management** | On verified payment: create `orders` + `order_items`, clear the cart (one **transaction**), history query by user | Orders page |
| **Logout** | Invalidate/blacklist the token (or let it expire); clear server-side state if any | Remove the stored token, redirect to login |
| **Admin** | Role-protected endpoints: product CRUD, user management, **business queries** (sales per day, top products via `GROUP BY`/`SUM`) | Dashboard with tables and **modals**; a `modalType` state decides which form (add/edit/delete) is shown |

**Security checklist for this project:** HTTPS; BCrypt; JWT with short expiry (+ refresh token); validate input (`@Valid`); never trust client prices/ids; parameterized queries (JPA does this); CORS limited to your front end origin; secrets (DB password, JWT key, payment keys) in environment variables, never in Git; role checks on **every** admin endpoint.
#### Worked Example 72: the cart total computed safely on the server

The most common e-commerce security bug is trusting a price sent by the browser. This plain-Java model of the cart service shows the server-side rules, and runs here.

```java
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

public class Main {
    record Product(int id, String name, BigDecimal price, int stock) { }
    record CartItem(int productId, int quantity) { }

    static final Map<Integer, Product> CATALOG = Map.of(
            1, new Product(1, "Headphones", new BigDecimal("1999.00"), 5),
            2, new Product(2, "USB Cable", new BigDecimal("249.50"), 100),
            3, new Product(3, "Laptop Stand", new BigDecimal("1299.00"), 0));

    static BigDecimal total(List<CartItem> cart) {
        BigDecimal sum = BigDecimal.ZERO;
        for (CartItem item : cart) {
            Product p = CATALOG.get(item.productId());
            if (p == null) throw new IllegalArgumentException("unknown product " + item.productId());
            if (item.quantity() < 1 || item.quantity() > 10) throw new IllegalArgumentException("invalid quantity for " + p.name());
            if (item.quantity() > p.stock()) throw new IllegalStateException(p.name() + " has only " + p.stock() + " in stock");
            sum = sum.add(p.price().multiply(BigDecimal.valueOf(item.quantity())));   // price from the CATALOG, never from the client
        }
        BigDecimal gst = sum.multiply(new BigDecimal("0.18")).setScale(2, RoundingMode.HALF_UP);
        return sum.add(gst);
    }

    public static void main(String[] args) {
        List<CartItem> cart = List.of(new CartItem(1, 1), new CartItem(2, 2));
        System.out.println("payable incl. 18% GST = " + total(cart));
        System.out.println("in paise for the payment gateway = " + total(cart).movePointRight(2).intValueExact());

        List<List<CartItem>> badCarts = List.of(
                List.of(new CartItem(9, 1)),
                List.of(new CartItem(2, -3)),
                List.of(new CartItem(3, 1)));
        for (List<CartItem> bad : badCarts) {
            try { total(bad); }
            catch (RuntimeException e) { System.out.println("rejected: " + e.getMessage()); }
        }
    }
}
```

**Output:**
```text
payable incl. 18% GST = 2947.64
in paise for the payment gateway = 294764
rejected: unknown product 9
rejected: invalid quantity for USB Cable
rejected: Laptop Stand has only 0 in stock
```

**Explanation:**
- The client sends only **product ids and quantities**; the server looks up prices in its own catalogue. A user who edits the request to say "price: 1" changes nothing.
- Arithmetic: `1999.00 + 2 × 249.50 = 2498.00`; GST `2498.00 × 0.18 = 449.64`; total **2947.64**. `BigDecimal` keeps it exact; with `double` the same sum can drift by a fraction of a paisa.
- Payment gateways such as Razorpay take amounts in the **smallest currency unit** (paise), so the server converts with `movePointRight(2)`; `intValueExact()` throws instead of silently truncating if a fraction remained.
- Every rule is enforced on the server: unknown product ids, impossible quantities (negative, or more than 10 per order) and out-of-stock items are rejected before any payment order is created.
- The same total is computed again when the gateway confirms payment, and the order is created only if the amounts match.

## 36.5 Docker (containerization)

A **container** packages the app with everything it needs, so it runs the **same everywhere**. An **image** is the template; a **container** is a running instance.

```dockerfile
# Dockerfile for the Spring Boot back end   (not compiled here)
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY target/salessavvy.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```
```yaml
# docker-compose.yml: app + database together
services:
  db:
    image: mysql:8
    environment: { MYSQL_ROOT_PASSWORD: "${DB_PASSWORD}", MYSQL_DATABASE: salessavvy }
    volumes: [ "dbdata:/var/lib/mysql" ]
  api:
    build: .
    ports: [ "8080:8080" ]
    environment: { SPRING_DATASOURCE_URL: "jdbc:mysql://db:3306/salessavvy", SPRING_DATASOURCE_PASSWORD: "${DB_PASSWORD}" }
    depends_on: [ db ]
volumes: { dbdata: {} }
```
Build with `mvn package`, then `docker compose up --build`. In compose the app reaches MySQL by the **service name** (`db`). Full Docker coverage: [06_Docker_Compose.md](../docker/06_Docker_Compose.md); React: [React_Complete_Guide.md](../react/React_Complete_Guide.md).

---

# 37. Syllabus Coverage Map

| Syllabus module (from your list) | Section |
|---|---|
| Introduction to Java Programming (why Java, careers, cross-platform, security, origins, philosophy, mobile, enterprise, full stack) | 1 |
| Programming basics, first program, how Java runs, classes, `main()`, class keywords, machine/high-level language, JDK/JRE/JVM, JIT, bytecode, print vs println, installing Java | 2 |
| Variables, naming, `var` | 3 |
| Operators (arithmetic, relational, logical, increment/decrement, bitwise, ternary, recap) | 4 |
| Data types, suffixes, `char`/`boolean`, typecasting, `var` vs data types, sizes | 5 |
| Methods (types, signature, return, void, memory, value passing, scope) | 6 |
| Comments, Scanner input, Java-basics errors | 7 |
| Control constructs: `if`, `if-else`, else-if, switch, loops, jump statements | 8 |
| Pattern programs | 9 |
| Number manipulation problems | 10 |
| OOP, classes and objects, local vs instance, anonymous objects | 11 |
| static | 12 |
| Inheritance (all types), overriding, hiding, `final`, HAS-A (aggregation, composition) | 13 |
| Polymorphism, upcasting, downcasting | 14 |
| Abstraction: abstract classes, interfaces, marker interfaces | 15 |
| Constructors, `this`, `super`, chaining, copy constructors, instance blocks, init order | 16 |
| Packages, access modifiers, overriding rules (access, return types) | 17 |
| Encapsulation | 18 |
| Inner classes, lambda expressions | 19 |
| Design patterns (Singleton) | 20 |
| Arrays (1D/2D/3D), `main()` deep dive | 21 |
| Strings (pool, methods, StringBuilder/Buffer, problems) | 22 |
| Algorithms (Big O, searching, sorting, problems) | 23 |
| Collections (List, Set, Queue, Map, generics, Comparable/Comparator, `Collections`, concurrent collections, stack/queue problems) | 24 |
| Exception handling | 25 |
| Threads and multithreading (lifecycle, synchronization, deadlock, producer-consumer, pools) | 26 |
| File handling, I/O streams, serialization | 27 |
| Annotations | 28 |
| Unit testing (JUnit, Mockito) | 29 |
| JDBC | 30 |
| Maven | 31 |
| Hibernate (architecture, annotations, CRUD, mappings, HQL, best practices) | 32 |
| Servlets | 33 |
| Spring, Spring Boot, DI, REST | 34 |
| Spring Security (BCrypt, RBAC, OTP, JWT) | 35 |
| Sales Savvy project (services, DB design, React, payments, admin, Docker) | 36 |

---

# 38. Final Cheat Sheet and Roadmap

```text
RUN        javac X.java ; java X ; main = public static void main(String[] args) ; static block runs first
TYPES      byte1 short2 int4 long8 float4 double8 char2 boolean ; 10L 2.5f ; (int)9.99 = 9 ; var = inferred local type
OPERATORS  ++x add-then-use ; x++ use-then-add ; && || short-circuit ; & | ^ ~ << >> >>> ; c ? a : b
CONTROL    if/else-if (largest first) ; switch (break or ->) ; for/while/do-while ; break continue label
OOP        class=blueprint object=heap instance ; reference on stack ; local vars no default ; static=class-level
INHERIT    extends ; no multiple class inheritance ; override=same signature, access same/wider ; final stops it
POLY       parent reference + child object ; dynamic dispatch ; downcast only after instanceof ; fields are NOT polymorphic
ABSTRACT   abstract class (one, state+code) ; interface (many, contract) ; default/static/private in interfaces
CTOR       this()/super() first line ; implicit super() ; order: static → parent init+ctor → child init+ctor
STRINGS    immutable ; pool ; equals not == ; StringBuilder in loops ; split/join/replaceAll/matches
BIG-O      O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) ; binary search needs SORTED data
COLLECT    ArrayList LinkedList ArrayDeque PriorityQueue HashSet LinkedHashSet TreeSet HashMap LinkedHashMap TreeMap ConcurrentHashMap
           equals+hashCode together ; Comparable(natural) vs Comparator(external) ; Collections.sort/binarySearch/frequency...
EXCEPTION  checked vs unchecked ; specific catch first ; finally always ; try-with-resources ; throw vs throws ; keep the cause
THREADS    start() not run() ; Runnable ; join ; interrupt flag ; synchronized/lock/atomic ; wait in while ; deadlock = circular wait
I/O        Buffered streams ; try-with-resources ; Serializable + serialVersionUID ; transient ; never deserialize untrusted data
JDBC       PreparedStatement ; commit/rollback ; batch ; Type 4 driver
MAVEN      pom.xml ; lifecycle validate→compile→test→package→install ; scopes ; mvn clean package
HIBERNATE  SessionFactory(1) → Session(per unit of work) → Transaction ; persist/get/remove ; LAZY ; avoid N+1
SPRING     IoC + DI ; constructor injection ; @Primary/@Qualifier ; Boot = auto-config + starters + embedded Tomcat
SECURITY   BCrypt, HTTPS, JWT (sub, iat, exp) stateless ; RBAC ; never trust client ids/prices ; secrets in env vars
```

### Top interview questions across the syllabus

| # | Question | Model answer (short) | Section |
|---|---|---|---|
| 1 | JDK vs JRE vs JVM? | JDK = JRE + tools (`javac`); JRE = JVM + libraries; JVM runs bytecode | 2 |
| 2 | Why is Java platform-independent but the JVM is not? | Bytecode is the same everywhere; each OS needs its own JVM to run it | 2 |
| 3 | Why is `main` static? | The JVM calls it before any object exists | 2, 21 |
| 4 | `int` vs `Integer`? | Primitive value vs object wrapper (nullable, usable in collections, cached -128..127) | 5 |
| 5 | What does `(int) 9.99` give? | `9`: casting truncates toward zero | 5 |
| 6 | Is Java pass-by-value? | Always; for objects the *reference* is copied (Worked Example 16) | 6 |
| 7 | Overloading vs overriding? | Same name, different parameters, compile time vs same signature in a subclass, run time | 13, 14 |
| 8 | Can we override a static method? | No, it is hidden; the reference's class decides (Worked Example 29) | 13 |
| 9 | Abstract class vs interface? | One parent with state and constructors vs many contracts with no instance state | 15 |
| 10 | Why is multiple inheritance not allowed with classes? | The diamond problem: ambiguous inherited state and implementation | 13 |
| 11 | `this()` vs `super()`? | Call another constructor of this class vs the parent's; either must be the first line | 16 |
| 12 | What is the initialisation order? | Static (parent → child) → per object: parent init + ctor → child init + ctor (Worked Example 35) | 16 |
| 13 | What is encapsulation's real benefit? | All changes go through validated code; internals can change freely | 18 |
| 14 | How do you make a thread-safe singleton? | Enum, holder idiom, or synchronized/double-checked locking (Worked Example 41) | 20 |
| 15 | Why are strings immutable? | Pooling, security, thread safety, cached hash codes | 22 |
| 16 | `String` vs `StringBuilder` vs `StringBuffer`? | Immutable vs mutable fast vs mutable synchronized | 22 |
| 17 | Time complexity of binary search? Precondition? | O(log n); the data must be sorted | 23 |
| 18 | `ArrayList` vs `LinkedList`? | Array (fast `get`) vs nodes (fast insert at ends); `ArrayList` wins in practice | 24 |
| 19 | Why override `hashCode` with `equals`? | Hash collections use `hashCode` to find the bucket (Worked Example 55) | 24 |
| 20 | `Comparable` vs `Comparator`? | Natural order inside the class vs external, many orders | 24 |
| 21 | Checked vs unchecked exceptions? | Compiler-enforced, recoverable vs programming errors (`RuntimeException`) | 25 |
| 22 | Does `finally` always run? | Yes, except `System.exit()`, JVM crash or an infinite loop/kill | 25 |
| 23 | `start()` vs `run()`? | `start()` creates a new thread; `run()` is a normal call | 26 |
| 24 | Why must `wait()` be called in a loop? | Spurious wakeups / condition changed by another thread | 26 |
| 25 | What is a deadlock and how do you avoid it? | Circular waiting on locks; consistent lock order, timeouts | 26 |
| 26 | What does `transient` do? | Excludes a field from serialization | 27 |
| 27 | How do JUnit and Spring find your annotated code? | Runtime-retained annotations + reflection (Worked Example 62) | 28 |
| 28 | Mock vs spy? | Mock = fake with no behaviour until stubbed; spy = real object whose calls are recorded | 29 |
| 29 | `Statement` vs `PreparedStatement`? | Prepared is precompiled and parameterised, preventing SQL injection | 30 |
| 30 | What is ACID? | Atomicity, Consistency, Isolation, Durability | 30 |
| 31 | What does `mvn package` do? | Runs validate → compile → test → package and builds the JAR | 31 |
| 32 | `get()` vs `load()` in Hibernate? | `get` hits the DB and returns `null` if missing; `load` returns a lazy proxy and throws on access | 32 |
| 33 | What is the N+1 problem? | 1 query for parents + 1 per parent for children; fix with `join fetch` | 32 |
| 34 | `forward` vs `sendRedirect`? | Server-side, same request, URL unchanged vs new browser request (302), URL changes | 33 |
| 35 | What is IoC / DI? | The container creates objects and supplies their dependencies | 34 |
| 36 | `@Component` vs `@Service` vs `@Repository` vs `@Controller`? | All are components; the names document the layer (`@Repository` also translates DB exceptions) | 34 |
| 37 | Why is REST stateless? | Each request carries everything needed; servers scale horizontally | 34 |
| 38 | Why BCrypt instead of SHA-256 for passwords? | Salted and deliberately slow (Worked Example 69) | 35 |
| 39 | Is a JWT encrypted? | No, it is signed; the payload is readable (Worked Example 71) | 35 |
| 40 | Why compute prices on the server? | The client can modify any request (Worked Example 72) | 36 |

### Predict-the-output quiz (core Java)

Cover the output, predict, then check. All answers come from the program below.

```java
import java.util.*;

public class Main {
    static int f(int x) { return x++; }
    static String s(Object o) { return "Object"; }
    static String s(String o) { return "String"; }

    public static void main(String[] args) {
        System.out.println(1 + 2 + "3" + 4 + 5);
        int a = 5;
        System.out.println(f(a) + a);
        System.out.println('a' + 1 + "b");
        System.out.println(s(null));
        String x = "hi", y = "h" + "i", z = new String("hi");
        System.out.println((x == y) + " " + (x == z) + " " + x.equals(z));
        Integer i1 = 127, i2 = 127, i3 = 128, i4 = 128;
        System.out.println((i1 == i2) + " " + (i3 == i4) + " " + i3.equals(i4));
        List<Integer> list = new ArrayList<>(List.of(1, 2, 3));
        list.remove(1);
        list.remove(Integer.valueOf(1));
        System.out.println(list);
        System.out.println(10 / 3 * 3 + 10 % 3);
        System.out.println(Math.max(-0.0, 0.0) + " " + (char) ('A' + 2));
        StringBuilder sb = new StringBuilder("ab");
        change(sb);
        System.out.println(sb);
    }

    static void change(StringBuilder b) { b.append("c"); b = new StringBuilder("zz"); }
}
```

**Output:**
```text
3345
10
98b
String
true false true
true false true
[3]
10
0.0 C
abc
```

| # | Why |
|---|---|
| 1 | `1 + 2 = 3` (numbers), then string joining: `"3" + "3" + 4 + 5` → `3345` |
| 2 | `f(a)` returns the old value 5 (the `++` affects only the parameter copy); `5 + 5 = 10` |
| 3 | `'a' + 1` is int `98`, then `+ "b"` |
| 4 | `null` fits both; `String` is the more specific overload |
| 5 | `"h" + "i"` is a compile-time constant (pooled); `new String` is a separate object |
| 6 | `Integer` caches -128..127, so 127 is the same object; 128 creates two objects; always use `equals` |
| 7 | `remove(1)` removes **index** 1 (the `2`); `remove(Integer.valueOf(1))` removes the **value** 1 |
| 8 | `10 / 3 = 3`, `3 * 3 = 9`, `+ 1` → `10` |
| 9 | `Math.max` treats `0.0` as larger than `-0.0`; `'A' + 2` cast back → `C` |
| 10 | The method mutates the shared object (`abc`), then reassigning its parameter does not affect the caller |

**Roadmap through this syllabus**

| Stage | Sections | Build this |
|---|---|---|
| 1. Language basics | 1-8 | Console calculator, grade evaluator, menu-driven shopping bill |
| 2. Logic building | 9-10, 21-22 | 15 pattern programs, number puzzles, string utilities |
| 3. Object-oriented design | 11-20 | Bank/library/hotel management with inheritance, interfaces, encapsulation, Singleton |
| 4. Data structures and algorithms | 23-24 | Implement linear/binary search and 3 sorts; solve 20 array/string/stack/queue problems |
| 5. Robust Java | 25-28 | Exception-safe file-based contact book with serialization and tests |
| 6. Persistence | 29-32 | JDBC CRUD, then the same with Hibernate; add JUnit and Mockito tests |
| 7. Web back end | 33-34 | Student Management (Spring Boot + Thymeleaf + MySQL), then a REST version |
| 8. Security and the full project | 35-36 | Login with BCrypt + JWT, role-based admin, cart/order/payment flow, Docker |
