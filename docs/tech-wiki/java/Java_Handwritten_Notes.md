---
format: md
---

# Java Handwritten Notes (Typed Up)

> **Source:** `pdf/java/java_handwritten/` (photos of handwritten notebook pages).
>
> **Rule used:** only what was actually legible on the pages is written here (all pages of all six PDFs). Anything I added to explain or correct a note is marked **> Clarification** so you can tell your notes from my additions. Handwriting I could not read confidently is marked **(unclear)**.
>
> **How the file is organised:** each chapter keeps your handwritten notes first. At the end of each chapter there is a block titled **"Explained Simply and Going Deeper"** (marked *added by Claude, not from your notebook*) with plain-language explanations, verified code, common mistakes, a basic → advanced ladder and interview questions. Chapters 25-29 add extra advanced topics and a roadmap.
>
> **Complete worked examples:** most chapters now end with **Complete worked examples** (also *added by Claude*): full programs built around the examples in your notebook (Printing, Hospital, Factory, ATM, InstaApp, Bank/Hero/Villain, Vehicle/Car…), each with its exact **Output** and an **Explanation**. They were all compiled and run on OpenJDK 17, and the output shown is the real output. Programs that read keyboard input list the input in a `// stdin:` comment; thread examples are coordinated (with `join`, latches or locks) so that their output is the same on every run.
>
> **Related:** [Java_Fundamentals_Deep_Dive.md](Java_Fundamentals_Deep_Dive.md) (same basics, expanded) · [Java_Collections_Framework_Guide.md](Java_Collections_Framework_Guide.md) · [java-stream-api.md](java-stream-api.md) · [Java_Complete_Guide.md](Java_Complete_Guide.md)

## Coverage

All pages of all six PDFs are now typed up.

| File | Pages | Sections in this file |
|---|---|---|
| `1_Basics.pdf` | 20 | 1 (SDLC, machine language, compilation, features, architecture, variables, operators, data types, casting, Scanner, methods, JRE segments) |
| `Scanner.pdf` | 1 | 2 (Day 2: Scanner and the `nextInt()` / `nextLine()` issue) |
| `oops-2.pdf` | 18 | 3 (exception handling, Days 43-46) |
| `Exception_2.pdf` | 100 | 11 (Days 47-48), 12 (Days 49-53), 4 (Days 54-56), 5-9 (collections, sorting, maps, fail-fast, JDBC), 10 (Hibernate Days 70-75) |
| `OOPs.pdf` | 73 | 13-19 (methods, overloading, objects, strings, classes, encapsulation, inheritance, overriding, polymorphism, static, abstraction, interfaces) |
| *(added by Claude)* | | 25-29: Java 8+ toolkit, JVM memory and GC, design patterns, interview question bank (56 questions), learning roadmap and cheat sheet |
| `Hibernate.pdf` | 30 | 20-23 (Hibernate CRUD, Spring IoC/DI/wiring, MVC, Spring Boot student management, login system, constructor note) |

## Table of Contents
1. [Day 1: SDLC, Machine Language, Java Basics](#1-day-1-sdlc-machine-language-java-basics)
2. [Day 2: Scanner](#2-day-2-scanner)
3. [Exception Handling (Days 43-46)](#3-exception-handling-days-43-46)
4. [Multithreading (Days 54-56)](#4-multithreading-days-54-56)
5. [Collections Framework (Days 57-64)](#5-collections-framework-days-57-64)
6. [Sorting: Comparable and Comparator (Days 61-63)](#6-sorting-comparable-and-comparator-days-61-63)
7. [Map Classes (Days 63-64)](#7-map-classes-days-63-64)
8. [Structural Modification, Fail-Fast and Fail-Safe (Day 65)](#8-structural-modification-fail-fast-and-fail-safe-day-65)
9. [JDBC (Days 66-69)](#9-jdbc-days-66-69)
10. [Hibernate (Days 70-75)](#10-hibernate-days-70-75)
11. [Exception Handling: Syntax Rules, Overriding Rules, ATM Example (Days 47-48)](#11-exception-handling-syntax-rules-overriding-rules-atm-example-days-47-48)
12. [Multithreading Basics (Days 49-53)](#12-multithreading-basics-days-49-53)
13. [OOP Basics: Methods, Overloading, Objects, Variables](#13-oop-basics-methods-overloading-objects-variables)
14. [Strings (Days 17-18)](#14-strings-days-17-18)
15. [Classes, Constructors, Encapsulation (Days 29-30)](#15-classes-constructors-encapsulation-days-29-30)
16. [Inheritance (Days 30-33)](#16-inheritance-days-30-33)
17. [Method Overriding, Polymorphism, Casting (Days 34-35)](#17-method-overriding-polymorphism-casting-days-34-35)
18. [static vs non-static: Blocks, Variables, Methods (Days 37-38)](#18-static-vs-non-static-blocks-variables-methods-days-37-38)
19. [Abstraction: Abstract Classes and Interfaces (Days 39-42)](#19-abstraction-abstract-classes-and-interfaces-days-39-42)
20. [Hibernate CRUD and Mappings (Day 76)](#20-hibernate-crud-and-mappings-day-76)
21. [Spring Framework: IoC, DI, Beans, Wiring (Days 77-80)](#21-spring-framework-ioc-di-beans-wiring-days-77-80)
22. [MVC and Spring Boot (Days 81-90)](#22-mvc-and-spring-boot-days-81-90)
23. [Constructor Deep Concept (loose page, Hinglish)](#23-constructor-deep-concept-loose-page-hinglish)
25. [Java 8+ Toolkit: Generics, Lambdas, Streams, Optional](#25-java-8-toolkit-generics-lambdas-streams-optional)
26. [JVM Memory, Garbage Collection and Performance](#26-jvm-memory-garbage-collection-and-performance)
27. [Design Patterns You Will Meet](#27-design-patterns-you-will-meet)
28. [Interview Question Bank from These Notes (Basic → Advanced)](#28-interview-question-bank-from-these-notes-basic--advanced)
29. [Learning Roadmap and Master Cheat Sheet (Basic → Advanced)](#29-learning-roadmap-and-master-cheat-sheet-basic--advanced)
30. [Notes About This File](#30-notes-about-this-file)

---

# 1. Day 1: SDLC, Machine Language, Java Basics

*Source: `1_Basics.pdf`. Starts with `javac Main.java` / `java Main`.*

## 1.1 SDLC (Software Development Life Cycle)

SDLC consists of several stages to build or develop software.

```
Requirement Collection & Analysis   -> BA / PA (Business Analyst / Product Analyst)
              |
           Design                   -> Designers
              |
   Development (coding)             -> Developers
              |
           Testing                  -> Testers
              |
         Deployment                 -> Deployment Engineer
              |
         Maintenance                -> Maintenance Engineer
```

- **Manual testing:** test the software manually.
- **Automation testing:** test the software using a program or software (e.g. Selenium).

| # | Stage | Notes |
|---|---|---|
| 1 | **Requirement collection & analysis** | Ambiguity (confusion) should not be there. **Feasibility** (possibility of achieving). **Completeness** (complete requirement). **Consistent** (first-day requirement should be the same as the last requirement). |
| 2 | **Design** | Flow chart, low-level design, high-level design. |
| 3 | **Development** | Programming. |
| 4 | **Testing** | The tester tests the software according to the requirement. |
| 5 | **Deployment** | Software is given to the customer. |
| 6 | **Maintenance** | (no further text on the page) |

## 1.2 What does a computer understand?

- **Program** = a set of instructions given to the computer to perform some task.
- **Programming** = the process of writing a program, giving it to the computer, the computer doing processing and generating an output.
- The computer understands **low voltage (0 volts)** and **high voltage (+5 V)**.
- According to IT engineers, the computer understands only **binary numbers, i.e. 0 and 1**.
- The language that consists of 0s and 1s is called **Machine Level Language (MLL)**.

```
Program (MLL: 010101 110101 ...)  ->  Processing (Computer)  ->  Output
```

## 1.3 Compilation and execution in Java

```
Codnest.java            Codnest.class                     CPU
High-level language  -> Bytecode / class file          ->  MLL (0101...)
(source file)           = Intermediate Level Language
   |                        (ILL)
   |  Java Compiler            |  JVM (JIT compiler + Java interpreter)
   +--------- Compilation -----+----------- Execution --------------+
```

In Java programming the set of instructions is written in a **high-level language (HLL)**. The Java compiler converts it to **intermediate level language (ILL)**. Later this ILL is converted to **MLL by the JVM** (Java Virtual Machine).

## 1.4 Features of Java

1. High-level language (English words)
2. Platform-independent
3. Object-oriented
4. Supports **WORA** (Write Once, Run Anywhere)
5. Architecture-neutral
6. Internet programming language
7. Strongly typed
8. Both **compiled and interpreted**

### Platform

Platform = **software (OS, operating system)** + **hardware (microprocessor)**. Examples: Windows + i3, Mac + i5.

### Platform independence

```
 Windows machine                              Windows machine
 HLL -> Java compiler -> ILL --(Internet)--> ILL -> JVM -> 0101 (MLL)
                                  \
                                   -------> Mac machine
                                            ILL -> JVM -> 0101 (MLL)
```

- Java is a platform-independent programming language: it can be **compiled on any platform and executed on any platform**.
- **WORA** = Write Once, Run Anywhere.
- **Architecture-neutral** = a Java program can be compiled on any architecture and executed on any architecture.
- Compile: `javac FileName.java`  ·  Execute: `java FileName`
- (The notes mention downloading **Java-17**.)

## 1.5 Architecture of Java

```
JDK (Java Development Kit)
 |- Source file, javac, developer tools
 |- JRE (Java Runtime Environment)
     |- Java libraries
     |- JVM (Java Virtual Machine)
         |- Class loader
         |- Bytecode verifier
         |- Java Execution Engine
             |- Just-In-Time (JIT) compiler
             |- Java interpreter
```

## 1.6 Compilation vs Interpretation

| | Compiler | Interpreter |
|---|---|---|
| Translates | HLL to MLL **at once** | HLL to MLL **line by line** |

In Java:

| Component | Input | Output | How |
|---|---|---|---|
| **Java compiler** | HLL | ILL | at once |
| **JIT compiler** | ILL | MLL | at once |
| **Java interpreter** | ILL | MLL | line by line |

Both compiler and interpreter are called **language processors**.

## 1.7 Variables

RAM is made of bytes, each with an address (e.g. 1001, 1002, 1003). A variable named `name` can sit at address 1002 holding `"Ritik"`.

> **Variables are the name given to a memory location of the computer for easily storing and retrieving the data.**

## 1.8 Strongly typed language

```java
int age = 22;
//  ^    ^     ^
//  |    |     data / value / literal
//  |    variable
//  type of variable (datatype)
```

In Java it is **mandatory to provide the type** of variables (the data type).

## 1.9 Operators

Operators are mechanisms that help us perform operations in the program.

- **Unary:** one operand
- **Binary:** two operands, split into
  - Arithmetic: `+ - * / %`
  - Relational: `< > <= >= == !=`
  - Logical: `|| &&`
- **Ternary:** three operands

### Unary operators (single operand)

`+`, `-`, `++`, `--`, `!`. Note: `a = a + 1` (increment), `a = a - 1` (decrement).

| Name | Form | Meaning |
|---|---|---|
| Pre-increment | `++a` | increment first, then assign/use |
| Post-increment | `a++` | assign/use first, then increment |
| Pre-decrement | `--a` | decrement first, then use |
| Post-decrement | `a--` | use first, then decrement |

With `a = 10` at the start of each:

| Statement | Result |
|---|---|
| `b = ++a` | a = 11, b = 11 |
| `b = a++` | a = 11, b = 10 |
| `b = --a` | a = 9, b = 9 |
| `b = a--` | a = 9, b = 10 |
| `b = ++a + ++a` (11 + 12) | a = 12, b = 23 |
| `b = a++ + a++` (10 + 11) | a = 12, b = 21 |
| `b = --a + --a` (9 + 8) | a = 8, b = 17 |
| `b = a-- + a--` (10 + 9) | a = 8, b = 19 |
| `b = ++a + a++ + --a + a--` (11 + 11 + 11 + 11) | a = 10, b = 44 |

The notes also have one longer practice expression (many `++a`, `a++`, `--a`, `a--` terms) ending in `a = 12`, `b = 58`. That expression is too hard to read in the photo to retype safely **(unclear)**.

## 1.10 Data types

| Primitive | Non-primitive |
|---|---|
| **Integer type:** `byte`, `short`, `int`, `long` | Arrays |
| **Real number type:** `float`, `double` | String |
| `boolean` | Inbuilt classes |
| `char` | User-defined classes |

> A datatype is a mechanism to indicate and mention the type of value that has to be stored in the variable.

| Type | Size | Range |
|---|---|---|
| `byte` | 1 byte (8 bits) | -128 to +127 |
| `short` | 2 bytes (16 bits) | -32768 to +32767 |
| `int` | 4 bytes (32 bits) | -2147483648 to +2147483647 |
| `long` | 8 bytes (64 bits) | -2⁶³ to 2⁶³ - 1 |
| `float` | 4 bytes (32 bits) | 6-7 digits, **less precision** |
| `double` | 8 bytes (64 bits) | 14-15 digits, **high precision** |
| `char` | 2 bytes (16 bits) | Unicode, 65536 symbols, 0 to 65535 (unsigned) |
| `boolean` | size depends on the JVM | true / false |

**Finding the range of a type** with `n` bits: **-2ⁿ⁻¹ to 2ⁿ⁻¹ - 1**. For `byte`: -2⁷ to 2⁷ - 1 = -128 to +127.

- A **red mark in Eclipse** means a compilation error (the notes show `2.3f` as the example of a float literal that needs the `f`/`F`).
- For storing float values, a suffix **F** has to be used.
- Execution starts from the JVM, which sends control to the `main` method. That is why `main` is also called the **entry point** of a Java program.

## 1.11 Type casting

> Type casting is the process of converting one datatype into another datatype.

### Implicit

- Converting a **smaller size datatype into a larger size datatype**. Happens **automatically by the Java compiler**.
- **No loss of data.**
- From smaller to larger, or from less efficient to more efficient datatypes.

```java
byte a = 37;   int b;   b = a;        // implicit
short a = 82;  float b; b = a;        // b = 82.0
```

### Explicit

- Data loss **might** happen.
- From larger to smaller size, or from more efficient to less efficient datatypes.

```java
short a = 82;     byte b;  b = (byte) a;
double a = 452.34; int b;  b = (int) a;
```

### Other points

- **`boolean` does not participate in type casting** (it cannot be converted to any datatype and vice versa).
- Order: `byte (1) → short (2) → int (4) → long (8) → float (4) → double (8)`. Left to right is implicit, right to left is explicit.
- `float` / `double` use the **IEEE format**. `byte` / `short` (and the other integer types) use the **base-2 format** (rules to convert into 0s and 1s).
- `char` is **Unicode format**: 65536 symbols, 0 to 65535 (unsigned). `char` converts implicitly to `int`, `long`, `float`, `double`.

### The float literal problem

```java
float a = 26.31;          // error: 26.31 is double (8 bytes), a is float (4 bytes)
float a = (float) 26.31;  // solution 1: explicit type casting
float a = 26.31F;         // solution 2: suffix F
```

- By default, real-number literals are considered **double**.
- Suffix **L** is required for **long** literals.

## 1.12 Scanner (predefined / inbuilt class)

`nextByte()`, `nextShort()`, `nextInt()`, `nextLong()`, `nextFloat()`, `nextDouble()`, `nextBoolean()`, `next()`, `nextLine()`.

## 1.13 Methods

```java
returnType methodName(parameters) {     // ② return type, ① name, ③ parameters (input)
    // method body / definition         // ④ activity
}
```

> A method is a set of instructions written at one place to perform a specific task. Every method consists of **four elements**: method name, return type, parameters (input), and body (activity).

**Types of methods (on the basis of return type and parameters):**

| Type | Input (parameters) | Output (return type) |
|---|---|---|
| I | none | none |
| II | yes | none |
| III | none | yes |
| IV | yes | yes |

Type I methods have no input and no output: they do not accept parameters and have no return type.

## 1.14 Segments of the JRE

> **JRE** (Java Runtime Environment) is the space where a Java program is running (gets executed).

| Segment | What it holds |
|---|---|
| **CODE** | Program code |
| **STACK** | Local variables, reference variables, activation records / stack frames |
| **STATIC** | Static variables, static blocks, static methods |
| **HEAP** | Instance (non-static) variables, objects |

```java
class Program {
    public static void main(String[] args) {   // ① JVM calls main
        add();                                  // ② main calls add
    }                                           // ④ control returns
    static void add() {                         // ③
        int a = 10;
        int b = 20;
        int c = a + b;
        System.out.println(c);
    }
}
```

### Stack frame

```
STACK
+------------------------+
| add()   a=10 b=20 c=30 |   <- stack frame / activation record (AR) of add()
+------------------------+
| main()                 |   <- stack frame / activation record of main()
+------------------------+
```

- Whenever a method is called, its **stack frame / activation record** is created in the stack segment.
- Whenever a method's execution is completed, its stack frame / AR is **deleted** from the stack segment.
- **Local variables** are present directly inside a method, and their memory is allocated in the stack frame of that method.
- **Stack frame** = also called activation record: the block of memory allocated on the stack segment to store the data or information about that specific method.

### Worked example from the notes

```java
class Program {
    public static void main(String[] args) {
        double num1 = 10.0;
        double num2 = 5.0;
        double res = findRem(num1, num2);
        System.out.println("Remainder is " + res);
    }
    static double findRem(double num1, double num2) {
        double res = num1 % num2;
        return res;
    }
}
```

While `findRem()` runs, the stack has two frames: `findRem()` (num1 = 10.0, num2 = 5.0, res = 0.0 at first) on top of `main()` (num1 = 10.0, num2 = 5.0, res = 0.0 at first). `res` in `findRem` becomes 0.0 (10.0 % 5.0) and is returned to `main`.


## 1.15 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 1.15.1 Your notebook's story in one picture

```
 You write            javac (compiler)         java (JVM)                 CPU
 Main.java  ───────►  Main.class  ───────────► interpret + JIT ─────────► runs 0s and 1s
 (HLL: English-like)  (bytecode / "ILL")       (bytecode → machine code)
```

| Your notebook says | What it really means |
|---|---|
| HLL (high-level language) | Source code you can read: `int a = 10;` |
| ILL (intermediate level language) | **Bytecode** in a `.class` file. It is for an imaginary CPU (the JVM), so it is the same on every OS. |
| MLL (machine level language) | The 0s and 1s of the **real** CPU (Intel, ARM...). The JVM produces these while running. |
| Compiler vs interpreter | Compiler = translate **everything first**. Interpreter = translate **line by line while running**. Java does **both** (`javac` compiles; the JVM interprets and JIT-compiles). |
| JIT compiler | "Just-In-Time": finds code that runs many times (hot code) and compiles it to machine code so it runs fast. |
| WORA | Write Once, Run Anywhere: the `.class` file runs on any OS that has a JVM. **The JVM is OS-specific; bytecode is not.** |

### 1.15.2 Why `public static void main(String[] args)`?

| Word | Reason |
|---|---|
| `public` | The JVM is *outside* your class, so it must be allowed to call it. |
| `static` | The JVM has **no object yet**, so it must call it on the class itself. |
| `void` | The JVM does not use a return value. (Use `System.exit(1)` for an exit code.) |
| `main` | The fixed name the JVM looks for. |
| `String[] args` | Command-line arguments: `java Main a b` gives `args = {"a", "b"}`. |

### 1.15.3 The three kinds of errors

| Kind | When | Example | Who finds it |
|---|---|---|---|
| **Compile-time (syntax/type)** | `javac` | `int x = "hi";` / missing `;` | compiler |
| **Runtime (exception)** | while running | `10 / 0`, `arr[5]` on a 2-element array, `null.length()` | JVM |
| **Logical** | runs fine, wrong answer | `avg = a + b / 2` instead of `(a + b) / 2` | you (testing) |

### 1.15.4 Verified examples for your operator and casting notes

All outputs below were produced by running the code on JDK 17.

```java
System.out.println((byte) 130);        // -126   (130 - 256)
System.out.println((byte) 200);        // -56
System.out.println((int) 3.99);        // 3      (cut, not rounded)
System.out.println('A' + 1);           // 66     (char becomes int)
System.out.println((char) ('A' + 1));  // B
System.out.println(10 / 3);            // 3      int / int
System.out.println(-10 % 3);           // -1     sign follows the left side
System.out.println(10.0 / 0);          // Infinity (no exception for double)
System.out.println(0.1 + 0.2);         // 0.30000000000000004
System.out.println(Integer.MAX_VALUE + 1);   // -2147483648 (overflow wraps)
long big = 1_000_000 * 1_000_000;      // -727379968   overflow happens in int BEFORE widening
long ok  = 1_000_000L * 1_000_000;     // 1000000000000
int x = 10; x += 3.7;                  // x = 13 : += hides a cast to int
byte b = 10; b += 5;                   // 15    : b = b + 5 would NOT compile
```

**Pre/post increment table from your notes: all checked.** With `a = 10` each time: `++a + ++a` = 11 + 12 = 23; `a++ + a++` = 10 + 11 = 21; `--a + --a` = 9 + 8 = 17; `a-- + a--` = 10 + 9 = 19; `++a + a++ + --a + a--` = 11 + 11 + 11 + 11 = 44 (final `a = 10`).

**Rule to remember:** `x++` = *use the old value, then add 1*; `++x` = *add 1, then use the new value*. And `i = i++;` leaves `i` unchanged (the old value is written back).

### 1.15.5 Common mistakes (basic)

1. File name differs from the `public` class name (`class Hello` saved as `hello.java`).
2. Forgetting `F` on a float (`float f = 2.5;` fails because `2.5` is a `double`) or `L` on a long literal bigger than `int`.
3. Using `=` instead of `==` in conditions (`if (a = 5)` does not compile for ints; with booleans it silently assigns).
4. Integer division: `5 / 2` is `2`. Use `5 / 2.0` or `(double) 5 / 2`.
5. Comparing floating-point numbers with `==`. Use `Math.abs(a - b) < 1e-9`.
6. Comparing strings with `==` instead of `.equals()` (see [chapter 14](#14-strings-days-17-18)).

### 1.15.6 Basic → advanced ladder for this chapter

| Level | What to know |
|---|---|
| 1 Basic | Write, compile (`javac`) and run (`java`) a program; variables; data types; operators |
| 2 | Compile vs runtime errors; type casting rules; operator precedence; `Scanner` input |
| 3 | Bytecode: run `javap -c Main` to see `iload`, `iadd`, `istore`; the class file starts with `CAFEBABE` |
| 4 Advanced | Class loader (Bootstrap → Platform → Application), the parent-delegation model, verification, tiered JIT (C1/C2) |
| 5 Expert | JVM flags (`-Xmx`, `-Xss`, `-XX:+PrintCompilation`), GraalVM native image, startup vs peak performance |

More detail on every point above: [Java_Fundamentals_Deep_Dive.md](Java_Fundamentals_Deep_Dive.md) (chapters 1-8).

### 1.15.7 Interview questions from this chapter

| Question | Short answer |
|---|---|
| Is Java compiled or interpreted? | Both. `javac` compiles to bytecode; the JVM interprets it and JIT-compiles hot code. |
| Is Java platform independent? | The **bytecode** is. The **JVM** is platform-dependent. |
| JDK vs JRE vs JVM? | JDK = JRE + dev tools (`javac`); JRE = JVM + libraries; JVM = runs bytecode. |
| Why is `main` static? | No object exists when the JVM starts the program. |
| Why is `char` 2 bytes? | Java uses Unicode (UTF-16), so one `char` can hold characters from any language. |
| Is Java 100% object-oriented? | No: primitives (`int`, `char`...) and `static` members are not objects. |
| What is the default value of a local variable? | None. It must be initialized before use (instance variables get 0 / null / false). |

### Complete worked examples *(added by Claude)*

#### Worked Example 1: Day 1 in one program (variables, operators, casting, methods)

```java
public class Program {
    static int add(int a, int b) { return a + b; }               // method with input and output
    static void greet(String name) { System.out.println("Hello " + name); }   // input, no output
    static double average(int a, int b, int c) { return (a + b + c) / 3.0; }

    public static void main(String[] args) {
        int a = 17, b = 5;                                     // variables (strongly typed)
        System.out.println("a+b=" + (a + b) + " a-b=" + (a - b) + " a*b=" + a * b + " a/b=" + a / b + " a%b=" + a % b);
        int x = 5;
        int y = x++ + ++x;                                     // 5 + 7
        System.out.println("x=" + x + " y=" + y);
        System.out.println("relational " + (a > b) + ", logical " + (a > 10 && b > 10) + ", ternary " + (a > b ? "a" : "b"));

        double d = 9.78;
        int narrowed = (int) d;                                // explicit (narrowing) casting
        long widened = narrowed;                               // implicit (widening) casting
        char ch = 'A';
        int code = ch;                                         // char -> int
        System.out.println("(int) 9.78 = " + narrowed + ", widened to long = " + widened + ", 'A' as int = " + code + ", (char) 98 = " + (char) 98);
        System.out.println("byte (byte) 130 = " + (byte) 130);

        greet("Ritik");
        System.out.println("add(10, 20) = " + add(10, 20) + ", average(4, 5, 7) = " + average(4, 5, 7));
    }
}
```

**Output:**
```text
a+b=22 a-b=12 a*b=85 a/b=3 a%b=2
x=7 y=12
relational true, logical false, ternary a
(int) 9.78 = 9, widened to long = 9, 'A' as int = 65, (char) 98 = b
byte (byte) 130 = -126
Hello Ritik
add(10, 20) = 30, average(4, 5, 7) = 5.333333333333333
```

**Explanation:**
- `a / b` is integer division (17 / 5 = 3) and `a % b` is the remainder (2), exactly as in the operator table of your notes.
- `x++ + ++x`: the first `x++` uses 5 and makes x 6; `++x` makes x 7 and uses 7; so `y = 12` and `x = 7`.
- `(int) 9.78` drops the decimal part (narrowing needs an explicit cast); assigning an `int` to a `long` is automatic (widening). A `char` is stored as a number, so `'A'` is 65 and `(char) 98` is `b`.
- `(byte) 130` is `-126`: 130 does not fit in a byte (max 127), so it wraps around by 256.
- `average` divides by `3.0`, so the result keeps its decimals (`16 / 3.0 = 5.333…`).

---

# 2. Day 2: Scanner

*Source: `Scanner.pdf`.*

```
Keyboard --> [ 5 ... ] (input stream / pipe) --> processor / computer
```

- `Scanner sc = new Scanner(System.in);` where `System.in` is the **input stream**.
- `sc.nextInt()` reads the `5`. After typing 5 we press **Enter**; **the Enter is read by `sc.nextLine()`**.

```java
class Program {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        System.out.println("enter no. of employees");
        int n = s.nextInt();
        String[] arr = new String[n];
        s.nextLine();                         // consume the leftover Enter
        for (int i = 0; i < n - 1; i++) {     // loop bound as written; see clarification
            arr[i] = s.nextLine();
        }
    }
}
```

> **Clarification:** the loop condition looks like `i < n - 1` on the page (the earlier `arr.length` is crossed out). That reads only `n - 1` names. To read all `n` names use `i < n` (or `i <= n - 1`).


## 2.1 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 2.1.1 What really happens when you type input

The keyboard sends characters into a **stream** (`System.in`). A `Scanner` reads that stream and cuts it into **tokens** separated by whitespace.

```
You type:   5 ⏎ Ritik Sharma ⏎
Stream:     '5' '\n' 'R' 'i' 't' 'i' 'k' ' ' 'S' 'h' ... '\n'
nextInt()   → takes "5" and STOPS before '\n'  (the Enter is still in the stream)
nextLine()  → reads from '\n' to the next '\n'  → returns "" (empty!)
```

This is why your Day 2 note says *"Enter is read by `sc.nextLine()`"*. Real output (verified): `age=5 name=[]`.

### 2.1.2 Three correct ways to read a number and then a line

```java
// 1. Throw away the leftover Enter
int age = sc.nextInt();
sc.nextLine();
String name = sc.nextLine();

// 2. Read everything as lines and convert
int age2 = Integer.parseInt(sc.nextLine().trim());
String name2 = sc.nextLine();

// 3. Use next() when a single word is enough
String first = sc.next();
```

### 2.1.3 Scanner methods cheat sheet

| Method | Reads | Stops at |
|---|---|---|
| `next()` | one word | whitespace |
| `nextLine()` | the whole rest of the line | `\n` (and **consumes** it) |
| `nextInt() / nextDouble() / nextBoolean()...` | one token, converted | whitespace (leaves the `\n`) |
| `hasNextInt()` | `true` if the next token is an int (does not consume) | |
| `hasNext()` / `hasNextLine()` | `true` if more input exists | end of input |

There is **no `nextChar()`**. Use `sc.next().charAt(0)` (your notebook has this too).

### 2.1.4 Safe input loop (validation)

```java
int n;
while (true) {
    System.out.print("Enter a number: ");
    if (sc.hasNextInt()) { n = sc.nextInt(); break; }
    System.out.println("That is not a number, try again.");
    sc.next();                      // throw away the bad token
}
```

Without `hasNextInt()`, typing `abc` throws `InputMismatchException`.

### 2.1.5 Going deeper

| Topic | Notes |
|---|---|
| **Close the Scanner?** | `sc.close()` also closes `System.in`. Create **one** Scanner for the keyboard and close it at the very end (or not at all in small programs). |
| **Scanner from other sources** | `new Scanner("10 20 30")` (a String), `new Scanner(new File("data.txt"))` (a file; throws `FileNotFoundException`). |
| **Different separator** | `sc.useDelimiter(",")` for comma-separated values. |
| **Speed** | `Scanner` uses regular expressions, so it is slow for 10⁵+ numbers. Use `BufferedReader` (see below). |
| **Command-line args** | `java Main 10 20` gives `args[0] = "10"`. `args` is an empty array (never `null`) if nothing is passed. |

**Fast input (competitive programming / big files):**

```java
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
int n = Integer.parseInt(br.readLine().trim());
StringTokenizer st = new StringTokenizer(br.readLine());
long sum = 0;
for (int i = 0; i < n; i++) sum += Long.parseLong(st.nextToken());
System.out.println(sum);
```

`readLine()` throws `IOException`, a **checked** exception, so the method needs `throws IOException` (see the Day 46 notes in [chapter 3](#3-exception-handling-days-43-46)).

### 2.1.6 Interview questions

| Question | Short answer |
|---|---|
| `next()` vs `nextLine()`? | `next()` = one token; `nextLine()` = rest of the line, including spaces. |
| Why does `nextLine()` after `nextInt()` return empty? | `nextInt()` leaves the newline in the buffer. |
| Scanner vs BufferedReader? | BufferedReader is faster and reads Strings only; Scanner parses types but is slower. |
| What happens if you close `System.in`? | No later code can read from the keyboard. |

### Complete worked examples *(added by Claude)*

#### Worked Example 2: the `nextInt()` + `nextLine()` problem and both fixes

```java
// stdin: 21\nRitik Sharma\n22\nAsha Verma
import java.util.Scanner;

public class Program {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);

        int age1 = scan.nextInt();          // reads 21, leaves "\n" in the buffer
        String name1 = scan.nextLine();     // reads the leftover "\n" → empty string!
        System.out.println("Problem: age=" + age1 + ", name=[" + name1 + "]");

        String skipped = scan.nextLine();   // this is the name we actually wanted
        System.out.println("The name was still waiting: [" + skipped + "]");

        int age2 = scan.nextInt();
        scan.nextLine();                    // FIX 1: consume the leftover newline
        String name2 = scan.nextLine();
        System.out.println("Fix 1: age=" + age2 + ", name=[" + name2 + "]");

        Scanner lines = new Scanner("30\nMeena Rao\n");
        int age3 = Integer.parseInt(lines.nextLine().trim());   // FIX 2: read every line as text, then parse
        String name3 = lines.nextLine();
        System.out.println("Fix 2: age=" + age3 + ", name=[" + name3 + "]");
    }
}
```

**Output:**
```text
Problem: age=21, name=[]
The name was still waiting: [Ritik Sharma]
Fix 1: age=22, name=[Asha Verma]
Fix 2: age=30, name=[Meena Rao]
```

**Explanation:**
- The input was four lines: `21`, `Ritik Sharma`, `22`, `Asha Verma`. After `nextInt()` reads `21`, the Enter key (`\n`) is still in the buffer. `nextLine()` reads "up to the next newline", finds it immediately and returns an **empty** string; this is exactly the Day 2 issue in your notes.
- The real name is not lost; it is simply read by the *next* `nextLine()`.
- **Fix 1:** call one extra `scan.nextLine()` after any `nextInt()`/`nextDouble()`/`next()` before reading a full line.
- **Fix 2:** read everything with `nextLine()` and convert with `Integer.parseInt(...)`; then the problem cannot occur. (The second `Scanner` here reads from a `String` only to keep the example self-contained.)

---

# 3. Exception Handling (Days 43-46)

*Source: `oops-2.pdf`.*

## 3.1 What is an exception?

- An **exception** is an event in which the program will be **terminated abruptly**.
- If an exception occurs, program execution is not completed; in between, control is sent back to the **JVM**.
- Exceptions are **treated as objects** in Java. Whenever an exception is generated, an exception object is created.
- By default a part of the JVM handles exceptions: the **Default Exception Handler (DEH)**. DEH can handle all exceptions but it leads to **abrupt / abnormal termination**.
- It is the developer's responsibility to handle exceptions using the handling mechanisms: **`try`, `catch`, `finally`, `throw`, `throws`**.

Example in the notes (divide `a / b` with `b = 0`):

```
Program execution started
Enter first number
10
Enter second number
0
ArithmeticException: / by zero
```

`RTS` = Runtime System: it creates the exception object and hands it to the handler.

## 3.2 try / catch (Day 43)

```
STACK:  main()
          |  exception at  c = a / b
          v
        RTS --> looks for U.D.E.H. (user-defined exception handler)
          if none --> D.E.H. (default exception handler)
```

```java
public static void main(String[] args) {
    try {
        int a = 10;
        int b = 0;
        int c = a / b;            // RTS creates the exception object here
        System.out.println(c);
    } catch (Exception e) {
        System.out.println("Exception is handled");
    }
    System.out.println("Program executed");
}
```

- The exception is handled by the **user-defined exception handler (try-catch)**, so the program is **not terminated abnormally**.
- In the `try` block put statements that **can throw an exception**.
- In the `catch` block put statements that should be **executed after handling** the exception.
- The `try` block is always executed whether or not an exception occurs.
- The `catch` block executes **only if an exception object is generated**.

## 3.3 finally

```java
try { ... } catch (...) { ... } finally { System.out.println("Program execution completed"); }
```

- Statements that are **critical and mandatory** to execute must be inside `finally`.
- No matter what happens during execution, **`finally` is always executed**.

## 3.4 Multiple catch blocks (Day 44, marked "Imp")

```java
try {
    System.out.println("Program execution started");
    Scanner sc = new Scanner(System.in);
    int a = sc.nextInt();
    int b = sc.nextInt();
    int res = a / b;
    System.out.println(res);
    int size = sc.nextInt();
    int[] arr = new int[size];
    int elem = sc.nextInt();
    int id = sc.nextInt();
    arr[id] = elem;
    System.out.println("Element is stored in array");
} catch (ArithmeticException e1) {
    ...
} catch (NegativeArraySizeException e2) {
    ...
} catch (ArrayIndexOutOfBoundsException e3) {
    ...
} catch (Exception e4) {          // generic catch LAST
    ...
} finally {
    ...
}
```

- With a **single** catch block we cannot display the specific reason for the exception. Hence it is good practice to write **multiple specific catch blocks along with a generic catch block at the last**.
- The generic catch block should be there because if the specific catch blocks miss any exception, it will be handled by the generic one.

## 3.5 Exception handling across multiple methods

```
STACK:  divide()   <- exception generated here (RTS looks for UDEH here first)
        main()     <- then in the caller
        DEH        <- finally the default handler (abrupt termination)
```

When an exception occurs in a method, the **RTS checks for a UDEH in the same method** where it was generated. If found, the exception object is handled there; otherwise it is **given to the caller method**. If no UDEH is present in the caller either, it is handled by **DEH**, resulting in abrupt termination of the program.

## 3.6 `throw` and `throws` (Day 45)

```java
public static void main(String[] args) {
    try {
        System.out.println("Main method execution started");
        divide();
    } catch (Exception e) {
        System.out.println(...);
    } finally {
        System.out.println(...);
    }
}

static void divide() throws Exception {
    try {
        System.out.println("Division started");
        int c = a / b;            // exception is thrown automatically
        System.out.println(c);
    } catch (Exception e) {
        System.out.println(...);
        throw e;                  // rethrowing
    } finally {
        System.out.println(...);
    }
}
```

- **`throw`** is used for **rethrowing** an exception to the caller method **after handling it**. It can also be used when the method doesn't want to handle the exception and wants to pass its responsibility to the caller method.
- **`throws`** is used with the **method declaration**. It is a way for a method to **communicate to its caller method about the exception**.

### Ducking an exception

The method does not handle the exception at all; it just declares `throws` and the caller handles it:

```java
main() {
    try { divide(); }
    catch (Exception e) { ... }
    finally { ... }
}
divide() throws Exception {
    int res = a / b;
    System.out.println(res);
}
```

### Practice question

> Write a Java program to calculate the area of circle, rectangle and triangle, where in the circle-area method the exception should be handled.

```java
main() {
    try {
        areaCircle(radius);
        areaRectangle(l, b);
        areaTriangle(b, h);
    } catch (...) { ... } finally { ... }
}
areaCircle(radius)            { try { } catch (Exception e) { } finally { } }   // handled inside
areaRectangle(l, b) throws Exception { try { } catch (Exception e) { ...; throw e; } finally { } }
areaTriangle(b, h)  throws Exception { }                                         // ducked
```

## 3.7 Exception hierarchy (Day 46)

```
                    Throwable
                   /         \
               Error        Exception
              /     \        /      \
 StackOverflowError  OutOfMemoryError   IOException   SQLException     RuntimeException
                                        (CHECKED)     (CHECKED)         (UNCHECKED)
                                                                       /      |         \
                                              ArithmeticException  ArrayIndexOutOfBounds  NegativeArraySize
                                                                   Exception              Exception
                                                                   (+ InputMismatchException)
```

| | Checked exception | Unchecked exception |
|---|---|---|
| Checked by | The Java compiler, **at compile time** | Not checked by the compiler |
| If not handled | Compilation error | DEH handles it, leading to abrupt termination |
| Handling | **Mandatory** | Not mandatory |
| Examples | `IOException`, `SQLException` | `ArithmeticException`, `ArrayIndexOutOfBoundsException`, `NegativeArraySizeException`, `InputMismatchException` |

### Handling a checked exception: `BufferedReader.readLine()`

`readLine()` throws `IOException`, which is a checked exception, so it is mandatory to handle it.

**Approach 1: try/catch:**

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

class Program {
    public static void main(String[] args) {
        try {
            System.out.println("Enter String");
            InputStreamReader isr = new InputStreamReader(System.in);
            BufferedReader br = new BufferedReader(isr);
            String msg = br.readLine();
            System.out.println(msg);
        } catch (IOException e) {
            System.out.println("Exception is handled");
        }
    }
}
```

**Approach 2: `throws` and handle in the caller:**

```java
main() {
    try { takeUserInput(); }
    catch (Exception e) { System.out.println(...); }
}
takeUserInput() throws IOException { ... }
```

## 3.8 Custom (user-defined) exception

```java
class InsufficientBalance extends Exception {
    public InsufficientBalance() {
        super("Balance is insufficient");     // message printed if the exception is generated
    }
}

class Program {
    public static void main(String[] args) {
        int balance = 2000;
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the amount");
        int amount = sc.nextInt();
        try {
            withdrawAmount(balance, amount);
        } catch (Exception e) {
            System.err.println("catch block executed");
            e.printStackTrace();
        }
    }

    public static void withdrawAmount(int balance, int amount) throws Exception {
        if (amount > balance) {
            InsufficientBalance sb = new InsufficientBalance();
            throw sb;
        } else {
            System.out.println("Amount is withdrawn");
        }
    }
}
```

The notes mark **Day 44** as "Imp", then list Day 45 and Day 46.


## 3.9 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 3.9.1 What actually happens when an exception occurs

```
main() ──calls──► divide() ──calls──► a / b   ← 0 → ArithmeticException object created here
                                       │
        no catch in divide()?  ◄───────┘  JVM (RTS) looks for a matching catch in divide()
        no catch in main()?    ◄────────  then in the caller (main)
        nobody catches it      ──────────► Default Exception Handler (DEH): prints the stack trace
                                           and terminates the program abnormally
```

This "walk back through the callers" is called **stack unwinding**. It is exactly what your Day 44 picture of `divide() → main() → DEH` shows.

**Reading a stack trace** (read top to bottom: the first line is where it happened):

```
Exception in thread "main" java.lang.ArithmeticException: / by zero
    at Program.divide(Program.java:12)     ← the line that failed
    at Program.main(Program.java:5)        ← who called it
```

### 3.9.2 Checked vs unchecked (your Day 46)

| | Checked | Unchecked |
|---|---|---|
| Parent class | `Exception` (but not `RuntimeException`) | `RuntimeException` and `Error` |
| Compiler forces handling? | **Yes** (`try/catch` or `throws`) | No |
| Meaning | Something **outside** your control can fail (file, network, DB) | Usually a **bug** in your code |
| Examples | `IOException`, `SQLException`, `FileNotFoundException`, `InterruptedException` | `NullPointerException`, `ArithmeticException`, `ArrayIndexOutOfBoundsException`, `NumberFormatException`, `ClassCastException` |

`Error` (`StackOverflowError`, `OutOfMemoryError`) means the JVM itself is in trouble. Normal programs do not catch it.

### 3.9.3 `throw` vs `throws` vs `final` vs `finally`

| Keyword | Where | Meaning |
|---|---|---|
| `throw` | inside a method | **actually throws** one exception object: `throw new InsufficientBalance();` |
| `throws` | method declaration | **warns the caller** this method may throw these (your "ducking") |
| `final` | variable/method/class | constant / no override / no inheritance |
| `finally` | after try/catch | **always runs** (cleanup) |
| `finalize()` | on `Object` | old GC hook, **deprecated**; do not use |

### 3.9.4 `finally` edge cases (verified)

```java
static int f() { try { return 1; } finally { return 2; } }   // returns 2 (finally overrides!)
static int g() { int x = 1; try { return x; } finally { x = 99; } }   // returns 1 (value already saved)
```
Output of `f() + " " + g()` is `2 1`. **Never `return` inside `finally`.** `finally` does **not** run only when the JVM dies first (`System.exit()`, power loss, infinite loop).

### 3.9.5 Order of catch blocks

Put the **specific** exception first and the **generic** one last. The other order does not compile:

```java
try { int x = 1 / 0; }
catch (Exception e) { }
catch (ArithmeticException e) { }   // error: exception ArithmeticException has already been caught
```

That is the reason for your note *"generic catch block should be written in the last"* (Day 44).

### 3.9.6 Modern Java features around exceptions

**Multi-catch** (one block for several types):

```java
try { ... }
catch (ClassCastException | NullPointerException e) { System.out.println(e.getClass().getSimpleName()); }
```

**try-with-resources** (Java 7+): closes things automatically, in reverse order, even on an exception. The resource must implement `AutoCloseable`.

```java
try (Res r1 = new Res("A"); Res r2 = new Res("B")) {
    System.out.println("body");
}
// open A, open B, body, close B, close A      (verified)
```
No `finally { close(); }` is needed. Use this for `Scanner(File)`, `BufferedReader`, JDBC `Connection`/`PreparedStatement`.

**Exception chaining**, i.e. keep the original cause:

```java
try { int z = 1 / 0; }
catch (ArithmeticException e) { throw new IllegalStateException("wrapped", e); }
// e.getMessage() = "wrapped", e.getCause() = java.lang.ArithmeticException: / by zero   (verified)
```

### 3.9.7 Custom exceptions: checked or unchecked?

```java
class InsufficientBalance extends Exception {            // CHECKED: caller must handle
    InsufficientBalance(String msg) { super(msg); }
}
class InvalidAge extends RuntimeException {              // UNCHECKED: programmer error
    InvalidAge(String msg) { super(msg); }
}
```
Your notebook's `InsufficientBalance extends Exception` is the checked kind, which is right for "the business rule failed, handle it".

### 3.9.8 Best practices

1. Catch the **most specific** exception you can handle; avoid empty `catch {}` blocks.
2. Don't use exceptions for normal flow (e.g. to leave a loop).
3. Always keep the **cause** when wrapping; log with `e.printStackTrace()` only while learning, use a logger in real projects.
4. Close resources with **try-with-resources**.
5. Throw early (validate arguments), catch late (at the layer that can really handle it).

### 3.9.9 Interview questions

| Question | Short answer |
|---|---|
| Difference between `throw` and `throws`? | `throw` throws an object; `throws` declares what a method may throw. |
| Checked vs unchecked? | Checked = compiler-enforced (`IOException`); unchecked = `RuntimeException` family. |
| Can `finally` be skipped? | Only if the JVM exits (`System.exit`) or crashes. |
| Can we have `try` without `catch`? | Yes, with `finally` (or try-with-resources). |
| What if both `try` and `finally` return? | `finally`'s value wins. |
| `Error` vs `Exception`? | `Error` = serious JVM problem (not meant to be caught); `Exception` = recoverable. |
| Can a constructor throw an exception? | Yes. |
| Can we catch `Throwable`? | Yes but you shouldn't: it also catches `Error`. |

### Complete worked examples *(added by Claude)*

#### Worked Example 3: exception propagation from `divide()` to `main()`, `finally`, and a custom exception

```java
public class Program {
    static class InsufficientBalance extends Exception {          // checked custom exception (your notes)
        InsufficientBalance(String msg) { super(msg); }
    }

    static int balance = 5000;

    static void withdraw(int amount) throws InsufficientBalance {
        if (amount > balance) throw new InsufficientBalance("Balance " + balance + " is less than " + amount);
        balance -= amount;
        System.out.println("  withdrawn " + amount + ", balance " + balance);
    }

    static int divide(int a, int b) {
        System.out.println("  divide(" + a + ", " + b + ") started");
        int r = a / b;                                             // ArithmeticException when b == 0
        System.out.println("  divide finished");
        return r;
    }

    public static void main(String[] args) {
        System.out.println("Connection established");
        try {
            System.out.println("  result " + divide(10, 2));
            System.out.println("  result " + divide(10, 0));       // exception jumps out of divide() into main()
            System.out.println("  never printed");
        } catch (ArithmeticException e) {
            System.out.println("  caught in main: " + e.getMessage());
        } finally {
            System.out.println("Connection terminated (finally always runs)");
        }

        int[] amounts = {2000, 4000};
        for (int amt : amounts) {
            try {
                withdraw(amt);
            } catch (InsufficientBalance e) {
                System.out.println("  " + e.getMessage());
            }
        }

        try {
            String s = null;
            s.length();
        } catch (ArithmeticException | NullPointerException e) {      // multi-catch
            System.out.println("multi-catch handled " + e.getClass().getSimpleName());
        }
        System.out.println("program ends normally");
    }
}
```

**Output:**
```text
Connection established
  divide(10, 2) started
  divide finished
  result 5
  divide(10, 0) started
  caught in main: / by zero
Connection terminated (finally always runs)
  withdrawn 2000, balance 3000
  Balance 3000 is less than 4000
multi-catch handled NullPointerException
program ends normally
```

**Explanation:**
- `divide(10, 0)` throws `ArithmeticException` at `a / b`. `divide` has no `catch`, so the exception travels back (**stack unwinding**) to `main`, where the `catch` handles it. The rest of `divide` and the next line in `try` never run.
- `finally` runs whether or not an exception occurred, which is why your notes use it to close the connection.
- `withdraw(4000)` fails because only 3000 is left after the first withdrawal; the checked `InsufficientBalance` forces the caller to handle it (`throws` + `try/catch`).
- Because every exception was handled, the program ends normally instead of being stopped by the Default Exception Handler.

---

# 4. Multithreading (Days 54-56)

*Source: `Exception_2.pdf`, pages 25 onward. The thread-creation / intro pages before this are in [section 12](#12-multithreading-basics-days-49-53).*

## 4.1 Daemon threads

```java
class Main {
    public static void main(String[] args) {
        Typing     t1 = new Typing();
        SpellCheck t2 = new SpellCheck();
        Autosave   t3 = new Autosave();
        t1.start();
        t2.setDaemon(true);
        t3.setDaemon(true);
        t2.start();
        t3.start();
    }
}
```

> To create **daemon threads**, we should **keep the thread activity in an infinite loop and set the daemon status as true**.

Example output idea in the notes: `Typing` printed repeatedly (the user thread), `Autosaving` printed by a daemon.

> **Clarification:** a daemon thread is a background thread; the JVM exits when all non-daemon (user) threads finish, killing the daemons. That is why they usually run an infinite loop.

## 4.2 Naming threads: `Printing` example

```java
public class Printing extends Thread {
    public void run() {
        if (getName().equals("Number")) {
            numberPrinting();
        } else {
            characterPrinting();
        }
    }
    public void numberPrinting()    { try { ... } catch ( ... ) { ... } }
    public void characterPrinting() { try { ... } catch ( ... ) { ... } }
}

public class Main {
    public static void main(String[] args) {
        Printing t1 = new Printing();
        Printing t2 = new Printing();
        t1.setName("Number");
        t2.setName("character");
        t1.start();
        t2.start();
    }
}
```

**If `Runnable` is used** (the class implements `Runnable`, so `getName()` is not available; use `Thread.currentThread()`):

```java
Printing pr = new Printing();
Thread t1 = new Thread(pr);
Thread t2 = new Thread(pr);
t1.setName("Number");
t2.setName("character");
t1.start();  t2.start();
```

## 4.3 Thread life cycle: states of a thread (Day 54)

```
 new Thread object
      |
     New --start()--> Runnable --(thread scheduler)--> Running --(task complete)--> Dead
                         ^                                 |
                         |  time duration completed        |-- sleep() --> Sleep
                         +---------------------------------+
                         |  notify() / notifyAll()         |-- wait()  --> Wait
                         +---------------------------------+
                         |  when resource is available     |-- resource not available --> Blocked
                         +---------------------------------+
         interrupt() can also move a thread toward Dead / Runnable (arrows on the diagram)
```

| State | Meaning (from the notes) |
|---|---|
| **New** | Whenever a `Thread` object is created. |
| **Runnable** | After `start()`. Waiting for the thread scheduler. |
| **Running** | Execution of the thread = the `run` method executes. |
| **Sleep** | `sleep()` called. Back to Runnable when the time duration completes. |
| **Wait** | `wait()` called. Back to Runnable on `notify()` / `notifyAll()`. |
| **Blocked** | Whenever the resource is not available. Back to Runnable when the resource is available. |
| **Dead** | Task completed (or interrupted). |

## 4.4 `synchronized` keyword

```java
class Hospital implements Runnable {
    synchronized public void run() {          // used in a lock environment
        try {
            System.out.println(Thread.currentThread().getName() + " is getting into ICU");
            Thread.sleep(3000);
            System.out.println(Thread.currentThread().getName() + " is operated in ICU");
            Thread.sleep(3000);
            System.out.println(Thread.currentThread().getName() + " is exiting the ICU");
            Thread.sleep(3000);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

class HospitalApp {
    public static void main(String[] args) {
        Hospital hspt = new Hospital();
        Thread t1 = new Thread(hspt);
        Thread t2 = new Thread(hspt);
        t1.setName("Tom");
        t2.setName("Jerry");
        t1.start();
        t2.start();
    }
}
```

- The **`synchronized` keyword is used for putting a lock on a shared resource.**
- In some scenarios multiple threads will be using the shared resource, but according to the requirement **only one thread should use the shared resource at any given point of time**. This can be achieved using the `synchronized` keyword.

## 4.5 Synchronized blocks, thread states walk-through and deadlock (Days 54-55)

```java
class Hospital {
    String res1 = "Bed";
    String res2 = "Doctor";

    public void tomTreatment() {
        try {
            synchronized (res1) {
                System.out.println("Tom has acquired " + res1);
                Thread.sleep(3000);
                synchronized (res2) {
                    System.out.println("Tom has acquired " + res2);
                    Thread.sleep(3000);
                }
            }
        } catch (Exception e) { e.printStackTrace(); }
    }

    public void jerryTreatment() {
        try {
            synchronized (res1) {                 // on the page this reads res1 (see clarification)
                System.out.println("Jerry has acquired " + res1);
                Thread.sleep(3000);
                synchronized (res2) {
                    System.out.println("Jerry has acquired " + res2);
                    Thread.sleep(3000);
                }
            }
        } catch (Exception e) { e.printStackTrace(); }
    }
}

class Tom implements Runnable {
    Hospital h;
    Tom(Hospital h) { this.h = h; }
    public void run() { h.tomTreatment(); }
}
class Jerry implements Runnable {
    Hospital h;
    Jerry(Hospital h) { this.h = h; }
    public void run() { h.jerryTreatment(); }
}

class HospitalApp {
    public static void main(String[] args) {
        Hospital h = new Hospital();
        Tom t = new Tom(h);
        Jerry j = new Jerry(h);
        Thread t1 = new Thread(t);
        Thread t2 = new Thread(j);
        t1.start();
        t2.start();
    }
}
```

> **Clarification:** the Day 55 diagram in the notes shows **Tom: res1 → res2** and **Jerry: res2 → res1**. The **opposite lock order** is what creates a deadlock. If both threads take `res1` then `res2` (as the page code may read), no deadlock happens: the second thread just waits. For the deadlock demo, make `jerryTreatment()` lock `res2` first, then `res1`.

### Walk-through of states (m = main thread, t1, t2; resources res1, res2)

1. The **main thread (m)** is created: New → Runnable → Running (execution). It goes into the `main` method.
2. Whenever a thread object is created (t1, t2) it goes to **New**. Whenever we use `t1.start()` the thread moves **New → Runnable**.
3. The **thread scheduler** takes a thread from Runnable to Running **only if the Running state is empty**.
4. The main thread dies when control reaches the end of the program and is shifted to **Dead**; the Running state becomes empty.
5. **t1** is shifted to Running (t2 maybe). t1's `run` method executes and **synchronizes (locks)** `res1`, then t1 goes to the **Sleep** state and Running becomes empty. t2 sees Running is empty, so it passes to Running.
6. Now t2 executes and sees **`res1` is not available**, so it is shifted to **Blocked** and Running becomes empty.
7. t1 is passed back to Runnable → Running, and makes `res2` available and `res1` available.

### Deadlock (Day 55)

```
Tom   -> res1 -> res2
Jerry -> res2 -> res1        (also written on the page: live lock, resource lock)
```

> **Deadlock** is the scenario in which multiple threads get stuck in the **Blocked state forever** and the program will not terminate.

## 4.6 Producer-Consumer problem (Days 55-56)

```
 Thread                      Thread
 Producer  --- Factory(item) ---  Consumer
 [Factory f]                     [Factory f]
```

**Problem version (no synchronization):**

```java
public class Factory {
    int item;
    void produce(int i) { item = i; System.out.println("Producer has produced item " + item); }
    void consume()      { System.out.println("Consumer has consumed item " + item); }
}

class Producer implements Runnable {
    Factory f;
    Producer(Factory f) { this.f = f; }
    int i = 1;
    public void run() { while (true) { f.produce(i); ++i; } }
}
class Consumer implements Runnable {
    Factory f;
    Consumer(Factory f) { this.f = f; }
    public void run() { while (true) { f.consume(); } }
}

main() {
    Factory f = new Factory();
    Producer pr = new Producer(f);
    Consumer cr = new Consumer(f);
    Thread t1 = new Thread(pr);
    Thread t2 = new Thread(cr);
    t1.start();  t2.start();
}
```

The notes' explanation:

- This program is the implementation of the **producer-consumer problem**, which is basically a **multithreading synchronization problem**.
- In the program, the `produce` and `consume` methods of `Factory` are **not synchronized**, so both threads can access these methods and modify `item` **simultaneously**.
- There is **no coordination mechanism** to ensure the consumer waits for the item to be produced before consuming it, and the producer waits if the consumer has not consumed the previous item.
- This can be solved using **inter-thread communication**, with coordination methods **`wait()` and `notify()` in a synchronized environment**.

**Solution version:**

```java
public class Factory {
    int item;
    boolean itemFilledStatus = false;

    synchronized void produce(int i) {
        try {
            if (itemFilledStatus == true) {
                wait();                       // producer waits if the item is filled
            } else {
                item = i;
                System.out.println("Producer has produced item " + item);
                itemFilledStatus = true;
                notify();                     // after producing, notify the consumer
            }
        } catch (Exception e) { e.printStackTrace(); }
    }

    synchronized void consume() {
        try {
            if (itemFilledStatus == true) {
                System.out.println("Consumer has consumed item " + item);
                itemFilledStatus = false;
                notify();                     // after consuming, notify the producer
            } else {
                wait();                       // consumer waits if the item is empty
            }
        } catch (Exception e) { e.printStackTrace(); }
    }
}
```

> **Clarification (not in the notes):** in production code the `wait()` is normally inside a `while (condition)` loop, not an `if`, to guard against spurious wake-ups. With `if`/`else` as written, a call that only waits will skip producing/consuming for that turn and rely on the next loop iteration.


## 4.7 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 4.7.1 Process vs thread

| | Process | Thread |
|---|---|---|
| What | A running **program** with its own memory | A path of execution **inside** a process |
| Memory | Own heap and stack | **Share the heap**, but each has its **own stack** (your Day 50 diagram: "an extra stack for every thread") |
| Cost | Heavy | Light |
| Communication | Hard (pipes, sockets) | Easy (shared objects) → that is also where bugs come from |

Every Java program has at least one thread: the **main thread**. The JVM also starts hidden threads (garbage collector, etc.).

### 4.7.2 Your thread states, with the real Java names

Java's `Thread.State` enum has six values. Your notebook's picture maps onto them like this:

| Notebook state | Java `Thread.State` | How it happens |
|---|---|---|
| New | `NEW` | `new Thread(...)` |
| Runnable | `RUNNABLE` | after `start()`, waiting for or using the CPU. **Java does not separate "Running" from "Runnable".** |
| Running | `RUNNABLE` | the scheduler picked it |
| Sleep | `TIMED_WAITING` | `Thread.sleep(ms)`, `join(ms)`, `wait(ms)` |
| Wait | `WAITING` | `wait()`, `join()` |
| Blocked | `BLOCKED` | waiting to enter a `synchronized` block that another thread holds |
| Dead | `TERMINATED` | `run()` finished (or died with an exception) |

### 4.7.3 Why `start()` and not `run()`

`start()` asks the JVM to create a **new stack** and call `run()` on it. Calling `run()` yourself is just an ordinary method call on the **main** thread: no new thread, no multithreading (your Day 53 note). You can call `start()` **only once** per thread (`IllegalThreadStateException` the second time).

### 4.7.4 Thread vs Runnable

| `extends Thread` | `implements Runnable` |
|---|---|
| Uses up your **one** chance to extend a class | Class can still extend something else |
| Task and thread are mixed in one class | **Task** (`Runnable`) is separate from the **thread** that runs it |
| Cannot be shared easily | Same `Runnable` can be given to many threads (your hospital example) |
| | Works with `ExecutorService` and lambdas: `new Thread(() -> ...)` |

Prefer `Runnable` (or a lambda).

### 4.7.5 The race condition (why `synchronized` exists), a verified demo

Four threads each add 1 to a counter 100,000 times. Expected total: 400,000.

```java
class Unsafe  { int c; void inc() { c++; } }                    // NOT atomic: read, add, write
class Counter { int c; synchronized void inc() { c++; } }       // lock: one thread at a time
AtomicInteger at = new AtomicInteger();   // at.incrementAndGet() uses a CPU-level atomic instruction
```

Result of the run: `safe=400000 atomic=400000`, and the unsafe counter was **less than 400000** (it loses updates because `c++` is three steps and threads interleave).

### 4.7.6 Tools for thread safety, from simple to advanced

| Tool | Use when |
|---|---|
| `synchronized` method/block | Simple mutual exclusion (your hospital ICU example) |
| `volatile` | One thread writes a flag, others read it (visibility only, **not** atomicity) |
| `AtomicInteger`, `AtomicLong` | Counters without locks |
| `ReentrantLock` | Need `tryLock()`, timeouts, fairness, several conditions |
| Concurrent collections (`ConcurrentHashMap`, `CopyOnWriteArrayList`, `BlockingQueue`) | Shared collections |
| **Immutable objects** (`record`, `final` fields) | Best: nothing to protect |
| `ThreadLocal` | Each thread needs its own copy (e.g. a date formatter) |

### 4.7.7 `wait()` / `notify()` done right (verified)

Your Day 56 producer-consumer uses `if (...) wait();`. In real code the check must be in a **`while`** loop (a waiting thread can wake up spuriously, or another consumer may have taken the item first). Use `notifyAll()` when more than two threads are involved.

```java
class Buf {
    int item; boolean full;
    synchronized void put(int i) throws InterruptedException {
        while (full) wait();           // wait until the consumer took the item
        item = i; full = true; notifyAll();
    }
    synchronized int take() throws InterruptedException {
        while (!full) wait();          // wait until the producer put an item
        full = false; notifyAll(); return item;
    }
}
// producer puts 1,2,3; consumer prints:  1 2 3     (verified)
```

`wait()`, `notify()`, `notifyAll()` can be called **only inside `synchronized`** (otherwise `IllegalMonitorStateException`). `wait()` releases the lock; `sleep()` does **not**.

| `sleep()` | `wait()` |
|---|---|
| `Thread` method | `Object` method |
| Does **not** release the lock | **Releases** the lock |
| Wakes after the time | Wakes on `notify()`/`notifyAll()` (or timeout) |

### 4.7.8 Deadlock: the four conditions and the cure

Your Tom/Jerry example deadlocks when **Tom locks `res1` then wants `res2`** and **Jerry locks `res2` then wants `res1`**. A deadlock needs all four:

1. **Mutual exclusion**: a resource can be used by only one thread.
2. **Hold and wait**: a thread holds one lock while waiting for another.
3. **No preemption**: a lock cannot be taken away.
4. **Circular wait**: Tom waits for Jerry, Jerry waits for Tom.

**Cure:** break one condition. The easiest is **always lock in the same order** (everyone takes `res1` then `res2`), or use `tryLock(timeout)`. See also livelock (threads keep reacting to each other, no progress) and starvation (a thread never gets a turn).

### 4.7.9 Thread pools: how real applications do it

Creating a thread per task is expensive. An `ExecutorService` keeps a pool of reusable threads:

```java
ExecutorService ex = Executors.newFixedThreadPool(3);
Future<Integer> f = ex.submit(() -> 6 * 7);     // Callable: returns a value
System.out.println(f.get());                     // 42  (blocks until done)   (verified)
ex.shutdown();                                   // stop accepting tasks, finish the queued ones
```

| `Runnable` | `Callable<V>` |
|---|---|
| `void run()` | `V call() throws Exception` |
| No result, cannot throw checked exceptions | Returns a result (via `Future`) |

| Pool | Use |
|---|---|
| `newFixedThreadPool(n)` | Known number of workers |
| `newCachedThreadPool()` | Many short tasks (grows as needed) |
| `newSingleThreadExecutor()` | Tasks one after another |
| `newScheduledThreadPool(n)` | Run later or repeatedly |
| `newVirtualThreadPerTaskExecutor()` | **Java 21+**: one cheap *virtual thread* per task |

### 4.7.10 `CompletableFuture`, async chains (verified)

```java
int r = CompletableFuture.supplyAsync(() -> 20)    // run in the background
                         .thenApply(x -> x + 1)    // then transform the result
                         .get();                   // 21
```
Also `thenCompose`, `thenCombine`, `allOf`, `exceptionally`.

### 4.7.11 Daemon threads (your Day 53 notes)

A JVM stays alive while **any non-daemon (user) thread** is alive. When only daemon threads are left, the JVM exits and kills them. That is why background helpers (autosave, spell check, garbage collector) are daemons that run `for(;;)`. Call `setDaemon(true)` **before** `start()`.

### 4.7.12 Interview questions: basic → advanced

| Level | Question | Answer in one line |
|---|---|---|
| Basic | Ways to create a thread? | Extend `Thread`, implement `Runnable`, `Callable` via an executor, (Java 21) virtual threads. |
| Basic | `start()` vs `run()`? | `start()` creates a new thread; `run()` runs on the current one. |
| Basic | What does `join()` do? | Makes the current thread wait until the other thread finishes. |
| Mid | `synchronized` method vs block? | Method locks `this`; a block locks any object and can be smaller (better performance). |
| Mid | `volatile` vs `synchronized`? | `volatile` = visibility only; `synchronized` = visibility **and** mutual exclusion. |
| Mid | What is a race condition? | Result depends on the unpredictable order of threads (see the demo above). |
| Mid | How do you avoid deadlock? | Same lock order, `tryLock` with timeout, fewer nested locks. |
| Advanced | `ExecutorService` vs creating threads? | Reuses threads, queues tasks, controls load, returns `Future`s. |
| Advanced | `ConcurrentHashMap` vs `Hashtable`? | Fine-grained locking / lock-free reads vs one lock for the whole table. |
| Advanced | What is the Java Memory Model "happens-before"? | A guarantee that one thread's write is visible to another (e.g. unlock → lock, `volatile` write → read, `start()`, `join()`). |
| Advanced | Platform vs virtual threads? | Platform thread = 1:1 with an OS thread; virtual thread (Java 21) is cheap and scheduled by the JVM, so you can have millions. |

Deeper chapter: [Java_Complete_Guide.md §12](Java_Complete_Guide.md#12-multithreading-and-concurrency-interview-imp).

### Complete worked examples *(added by Claude)*

#### Worked Example 4: `Hospital` with and without `synchronized` (deterministic version)

```java
import java.util.concurrent.CountDownLatch;

public class HospitalApp {
    static class Hospital implements Runnable {
        final CountDownLatch tomInside;
        Hospital(CountDownLatch tomInside) { this.tomInside = tomInside; }

        synchronized public void run() {                       // lock on the shared Hospital object
            String name = Thread.currentThread().getName();
            System.out.println(name + " is getting into ICU");
            tomInside.countDown();                              // lets main start Jerry only after Tom holds the lock
            pause(100);
            System.out.println(name + " is operated in ICU");
            pause(100);
            System.out.println(name + " is exiting the ICU");
        }
    }

    static void pause(long ms) { try { Thread.sleep(ms); } catch (InterruptedException e) { Thread.currentThread().interrupt(); } }

    public static void main(String[] args) throws Exception {
        CountDownLatch tomInside = new CountDownLatch(1);
        Hospital hspt = new Hospital(tomInside);
        Thread t1 = new Thread(hspt, "Tom");
        Thread t2 = new Thread(hspt, "Jerry");
        t1.start();
        tomInside.await();                                      // Tom is now inside the synchronized method
        t2.start();
        Thread.sleep(50);
        System.out.println("[main] Jerry's state while Tom is in the ICU: " + t2.getState());
        t1.join();
        t2.join();
        System.out.println("[main] both patients done");
    }
}
```

**Output:**
```text
Tom is getting into ICU
[main] Jerry's state while Tom is in the ICU: BLOCKED
Tom is operated in ICU
Tom is exiting the ICU
Jerry is getting into ICU
Jerry is operated in ICU
Jerry is exiting the ICU
[main] both patients done
```

**Explanation:**
- Both threads share **one** `Hospital` object, and `run()` is `synchronized`, so only one thread at a time can hold the object's lock. Jerry cannot enter until Tom has completely exited.
- While waiting, Jerry is in the **BLOCKED** state, the "waiting for a lock" state from your thread-life-cycle diagram.
- The latch is only there to make the demo deterministic (Tom always goes first). In your original version either patient may enter first, but the three lines of one patient are never mixed with the other's.
- Without `synchronized`, the lines of Tom and Jerry would interleave, because both could be "in the ICU" at once.

#### Worked Example 5: the `Factory` producer-consumer, completed with `wait()`/`notify()`

```java
public class FactoryApp {
    static class Factory {
        int item;
        boolean itemFilledStatus = false;

        synchronized void produce(int i) throws InterruptedException {
            while (itemFilledStatus) wait();                  // producer waits while the item is still there
            item = i;
            System.out.println("Producer has produced item " + item);
            itemFilledStatus = true;
            notify();                                         // wake the consumer
        }

        synchronized void consume() throws InterruptedException {
            while (!itemFilledStatus) wait();                 // consumer waits until something is produced
            System.out.println("Consumer has consumed item " + item);
            itemFilledStatus = false;
            notify();                                         // wake the producer
        }
    }

    public static void main(String[] args) throws Exception {
        Factory f = new Factory();
        Thread producer = new Thread(() -> {
            try { for (int i = 1; i <= 5; i++) f.produce(i); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        });
        Thread consumer = new Thread(() -> {
            try { for (int i = 1; i <= 5; i++) f.consume(); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        });
        producer.start();
        consumer.start();
        producer.join();
        consumer.join();
        System.out.println("all 5 items produced and consumed in order");
    }
}
```

**Output:**
```text
Producer has produced item 1
Consumer has consumed item 1
Producer has produced item 2
Consumer has consumed item 2
Producer has produced item 3
Consumer has consumed item 3
Producer has produced item 4
Consumer has consumed item 4
Producer has produced item 5
Consumer has consumed item 5
all 5 items produced and consumed in order
```

**Explanation:**
- `itemFilledStatus` is the "slot full?" flag from your solution. The producer waits while the slot is full; the consumer waits while it is empty. Each side calls `notify()` after changing the flag, so the other side wakes up and re-checks.
- `wait()` releases the lock while waiting (unlike `sleep()`), which is what allows the other thread to enter the synchronized method.
- The loops use `while`, not `if`: a woken thread must re-check the condition, because it may wake up spuriously or find the condition changed again.
- The result is a strict produce → consume → produce → … alternation, so no item is ever overwritten or consumed twice. (The loops are limited to 5 items so the program ends; your notes use `while (true)`.)

#### Worked Example 6: daemon threads stop automatically when `main` finishes

```java
public class Main {
    public static void main(String[] args) throws Exception {
        Thread typing = new Thread(() -> {
            for (int i = 1; i <= 3; i++) { System.out.println("Typing " + i); sleep(100); }
        });
        Thread autoSave = new Thread(() -> {
            for (;;) { sleep(120); System.out.println("AutoSave"); }            // infinite loop
        });
        autoSave.setDaemon(true);                                                 // must be set BEFORE start()
        System.out.println("typing daemon? " + typing.isDaemon() + ", autoSave daemon? " + autoSave.isDaemon());
        typing.start();
        autoSave.start();
        typing.join();
        System.out.println("main ends; the JVM exits even though AutoSave has an infinite loop");
    }

    static void sleep(long ms) { try { Thread.sleep(ms); } catch (InterruptedException e) { Thread.currentThread().interrupt(); } }
}
```

**Output** (`NONDETERMINISTIC`: the number of "AutoSave" lines depends on timing, usually 2):
```text
typing daemon? false, autoSave daemon? true
Typing 1
Typing 2
AutoSave
Typing 3
AutoSave
main ends; the JVM exits even though AutoSave has an infinite loop
```

**Explanation:**
- The JVM keeps running while **any non-daemon** thread is alive. `typing` is a normal thread; `autoSave` is a daemon (background) thread.
- When `typing` and `main` finish, only the daemon is left, so the JVM shuts down and kills it in the middle of its infinite loop. That is exactly how your Typing/AutoSave/SpellCheck example behaves.
- `setDaemon(true)` after `start()` throws `IllegalThreadStateException`.

---

# 5. Collections Framework (Days 57-64)

*Source: `Exception_2.pdf`.*

## 5.1 Why collections? (Day 57)

> **Collections Framework** = ready-made solutions (JDK 1.2, Joshua J. Bloch).

- A **data structure** holds the data and exhibits some behaviours. Data structures named: Array, Stack, Queue, LinkedList.
- In Java, data can be managed using **variables** but that only handles a **small amount of data**.
- To manage a **large volume of data**, **arrays** were introduced. But arrays have major disadvantages:
  1. Can store only **homogeneous** data (similar type of data).
  2. Can't store **heterogeneous** data (different types).
  3. **Fixed in size**: we can't change the size of the array after creation.
  4. Arrays use **contiguous memory** locations; they can't use dispersed memory locations.
- Because of these limitations the **Collections Framework** was introduced as the solution. It is a ready-made solution (**pre-defined classes, pre-defined methods, pre-defined interfaces**).

The classes listed in the notes (the notes say it "consists of 7 classes"):

1. `ArrayList`  2. `LinkedList`  3. `ArrayDeque`  4. `PriorityQueue`  5. `TreeSet`  6. `HashSet`  7. `LinkedHashSet`

## 5.2 ArrayList (Day 58)

```java
import java.util.ArrayList;

ArrayList al = new ArrayList();      // can hold heterogeneous data
al.add(10);
al.add("Java");
al.add(3.14);
System.out.println(al);
```

```
al --> [ 10 | Java | 3.14 | | ]      (index 0 1 2 3 4)   address 100
```

- `ArrayList` is a class present in the collections framework.
- It can store **heterogeneous data**.
- It **maintains the order of insertion**: elements come out in the same order they were added.
- It **internally implements the dynamic array** data structure.

| Method | Meaning |
|---|---|
| `list1.addAll(list2)` | add all elements of `list2` to `list1` |
| `list.add(0, 24)` | `add(index, element)` |
| `list.get(0)` | on an empty list throws `IndexOutOfBoundsException` |
| `list.contains(30)` | returns boolean |
| `list.removeAll(list2)` | removes the items of `list2` from `list` |
| `list.remove(2)` | removes by index |
| `list.clear()` | removes all / empties the ArrayList |

### `add()` vs `set()` (asked as a question in the notes)

- **`add(index, element)`** checks the index at which the element needs to be added and then **shifts all the elements from that index to the last index one place to the right**.
- **`set(index, element)`** does **not shift** anything; it **replaces** the old element at that index with the new element.

```
list = [0, 1, 2, 3]
list.add(1, 10)  ->  [0, 10, 1, 2, 3]
list.set(1, 10)  ->  [0, 10, 2, 3]
```

### Traversing

```java
for (Object ele : al) { System.out.println(ele); }
System.out.println(al);
for (int i = 0; i < al.size(); i++) { System.out.println(al.get(i)); }
```

## 5.3 Iterator (Day 59)

> **Iterators** (an interface) are provided for the collection-based classes in order to traverse through them.

- Iterators are like **cursors** which point **just before the first element** when they are created.
- `hasNext()` returns `true` if more elements are present in the collection. However, **it doesn't move the iterator**. Returns `false` if no more elements are present.
- `next()` **moves the iterator to the next element and returns the element**.

```java
ArrayList al = new ArrayList();
al.add(10); al.add(20); al.add(30); al.add(40);
Iterator it = al.iterator();
while (it.hasNext()) {
    System.out.println(it.next());     // 10 20 30 40, one per line
}
```

## 5.4 ArrayDeque (Day 59)

- Class in the collection framework used when we want to add elements from the **front end and back end**.
- Internally implements the **double-ended queue** data structure.
- Unlike `ArrayList`, it **doesn't support index values**, hence it has no methods involving an index.
- Like `ArrayList`, it **maintains the order of insertion** and can store heterogeneous data.

```java
ArrayDeque ad = new ArrayDeque();
ad.add(10); ad.add(20); ad.add(30); ad.add(40); ad.add(50);
System.out.println(ad);          // [10, 20, 30, 40, 50]
ad.addLast("last");
ad.addFirst("first");
System.out.println(ad);
System.out.println(ad.getFirst());   // first
System.out.println(ad.getLast());    // last
```

**ArrayList vs ArrayDeque:** `ArrayList` can be used when we need to add an element from the back end. Although `ArrayList` can add an element at a random position, **that process is not efficient**. `ArrayDeque` only provides adding from the front and last. If we want to **efficiently add at a random position, we must go for a `LinkedList`**.

## 5.5 LinkedList (Day 59)

```java
LinkedList ll = new LinkedList();
ll.add(10); ll.add(20); ll.add(30);
ll.add(1, 99);                 // (index, element)
System.out.println(ll);        // [10, 99, 20, 30]
```

- Class present in the collection framework, used when we want to **insert data at a random position efficiently**.
- Internally implements the **doubly linked list** data structure.
- Each element is stored in a **node**. Each node, along with containing the element, also **refers to the previous as well as the next node**.
- Like `ArrayList`, supports **index values** and **maintains the order of insertion**.
- Like `ArrayDeque`, has methods to add elements at the **front and last**.
- Able to utilise the **scattered memory** available in RAM.

## 5.6 PriorityQueue (Day 60)

```java
PriorityQueue pq = new PriorityQueue();
pq.add(30); pq.add(20); pq.add(10); pq.add(50); pq.add(40);
System.out.println(pq);     // [10, 30, 20, 50, 40]

PriorityQueue pq2 = new PriorityQueue();
pq2.add("viru"); pq2.add("dhiru"); pq2.add("siru"); pq2.add("ziru"); pq2.add("piru");
System.out.println(pq2);    // [dhiru, piru, siru, ziru, viru]
```

- `PriorityQueue` is a class in the Collection Framework.
- It **doesn't maintain the order of insertion**; instead it returns the **priority element at the top**.
- Internally it follows the **min-heap** data structure.
- When we try to store **heterogeneous data**, there is **no compile-time error**, but at execution it results in **`ClassCastException`**.

> **Clarification:** the printed order is the heap's internal array order, not sorted order. Only the head (smallest) is guaranteed. I checked the two outputs above by hand-simulating the heap inserts.

## 5.7 TreeSet (Day 60)

- Class in the collection framework used to **sort data and present it**.
- Uses a **Red-Black tree**, which is a **balanced binary tree** data structure.

```java
TreeSet ts1 = new TreeSet();
ts1.add(30); ts1.add(20); ts1.add(10); ts1.add(40); ts1.add(50);
System.out.println(ts1);     // [10, 20, 30, 40, 50]

TreeSet ts2 = new TreeSet();
ts2.add("viru"); ts2.add("dhiru"); ts2.add("siru"); ts2.add("ziru"); ts2.add("piru");
System.out.println(ts2);     // [dhiru, piru, siru, viru, ziru]
```

(On the page the 5th `ts1` add reads like `40` twice, while the output shows `50`. I typed `50`. **(unclear)**)

- Storing **heterogeneous** data does not cause a compile-time error, but results in **`ClassCastException` at runtime**:

```java
ts2.add(30);
ts2.add("ten");       // ClassCastException
ts2.add(false);
```

## 5.8 HashSet and LinkedHashSet (Day 60)

```java
HashSet set = new HashSet();
set.add(30); set.add("ten"); set.add(50.55); set.add('z');
System.out.println(set);

LinkedHashSet set2 = new LinkedHashSet();
set2.add(30); set2.add("ten"); set2.add(false); set2.add(50.55); set2.add('z');
System.out.println(set2);
```

- The **speciality of a set is that it doesn't allow duplicate elements.**
- A `HashSet` **doesn't sort** the data, neither does it maintain the order of insertion.
- A `LinkedHashSet` doesn't sort the data but **maintains the order of insertion**.
- A `TreeSet` internally uses a **`TreeMap`**; a `HashSet` uses a **`HashMap`**; a `LinkedHashSet` uses a **`LinkedHashMap`**.

| Use | When |
|---|---|
| **TreeSet** | You want the data in **sorted order**. |
| **HashSet** | You want to **prevent duplicates** and are not concerned about the order of the output. |
| **LinkedHashSet** | You want to **prevent duplicates** as well as **maintain the order of insertion**. (The page writes `LinkedHashMap` here; it means the set.) |

An `ArrayList` example in the notes shows that a list **accepts duplicates and `null`**:

```java
ArrayList coll = new ArrayList();
coll.add(10); coll.add(20); coll.add(20); coll.add("gems"); coll.add(3.55); coll.add(null);
System.out.println(coll);    // 10, 20, 20, gems, 3.55, null
```

## 5.9 Which classes can store heterogeneous data? (Day 61)

- **Can:** `ArrayList`, `LinkedList`, `ArrayDeque`, `HashSet`, `LinkedHashSet`.
- **Cannot:** `PriorityQueue` and `TreeSet`.

```java
ArrayList al = new ArrayList();
al.add(10); al.add("Apple"); al.add(30); al.add(40.5F);
System.out.println(al);                 // [10, Apple, 30, 40.5]

LinkedList ll = new LinkedList();
ll.add(30); ll.add("Apple"); ll.add(10); ll.add(40.5F);
System.out.println(ll);                 // page shows [10, Apple, 30, 40.5]

ArrayDeque ad = new ArrayDeque();
ad.add(10); ad.add("Apple"); ad.add(30); ad.add(40.5F);
System.out.println(ad);                 // [10, Apple, 30, 40.5]

PriorityQueue pq = new PriorityQueue();
pq.add(10); pq.add("Apple"); pq.add(30); pq.add(40.5F);
System.out.println(pq);                 // Exception

TreeSet ts = new TreeSet();
ts.add(10); ts.add("Apple");
System.out.println(ts);                 // Exception
```

> **Clarification:** for the `LinkedList` example the page shows `[10, Apple, 30, 40.5]`, but the adds were `30, "Apple", 10, 40.5F`. A `LinkedList` keeps insertion order, so the actual output is `[30, Apple, 10, 40.5]`.

## 5.10 Wrapper classes: boxing and unboxing (Day 61)

| Primitive | Wrapper |
|---|---|
| `byte` | `Byte` |
| `short` | `Short` |
| `int` | `Integer` |
| `long` | `Long` |
| `float` | `Float` |
| `double` | `Double` |
| `char` | `Character` |
| `boolean` | `Boolean` |

- **Boxing** = converting a primitive datatype into a wrapper class object.
  - If this conversion happens **automatically** it is called **autoboxing**.
  - If it is done **by the programmer** it is called **boxing**.
- **Unboxing** = converting a wrapper class object into a primitive datatype value.
  - If it happens **automatically**: **auto-unboxing** (the page writes "autoboxing" here).
  - If it happens **manually** by the programmer: **unboxing**.

```java
ArrayList al = new ArrayList();
al.add(10);       // -> al.add(new Integer(10))     autoboxing
al.add(45.5F);    // -> al.add(new Float(45.5F))    autoboxing
System.out.println(al);       // [10, 45.5F]  (objects)

int a     = (int)     al.get(0);    // unboxing
boolean b = (boolean) al.get(2);    // unboxing
float c   = (float)   al.get(3);    // unboxing
System.out.println(a);   // 10
System.out.println(b);   // true     } primitives
```

## 5.11 Collection Framework hierarchy and "which class for what" (Day 63-64)

Hierarchy drawn in the notes (solid arrow = extends, dashed arrow = implements):

```
                          Iterable
                              ^
                          Collection
              ____________/   |    \____________
            List            Queue              Set
           /    \          /      \           /     \
   ArrayList  LinkedList  Deque  PriorityQueue SortedSet  HashSet, LinkedHashSet
                          /   \                  |
                  LinkedList  ArrayDeque     NavigableSet
                                                 |
                                              TreeSet
```

Quick comparison written in the notes (Day 64):

| Class | Use |
|---|---|
| `ArrayList` | store heterogeneous data, **contiguous** location, store at **last end** |
| `LinkedList` | store heterogeneous data, **dispersed** memory location |
| `ArrayDeque` | store at **front or rear** end |
| `PriorityQueue` | **highest priority at first** |
| `TreeSet` | **sorting** |
| `HashSet` | **searching** |
| `LinkedHashSet` | searching **and** order of insertion |

## 5.12 Hashing in HashSet (Day 64)

```java
HashSet hs = new HashSet();
hs.add(45); hs.add(32); hs.add(21); hs.add(62); hs.add(15);
System.out.println(hs);
```

Hashing algorithm / hash function from the page: for `45` → `4 + 5 = 9`, `9 mod 10 = 9`, so `45` is stored at **index 9**. The page also notes that a **collision can happen** (two values hashing to the same index); it doesn't say how it is resolved.


## 5.13 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 5.13.1 The big picture

```
Iterable
  └─ Collection
       ├─ List   (ordered, duplicates allowed, index)       ArrayList, LinkedList
       ├─ Queue  (take from the front)                      PriorityQueue, ArrayDeque, LinkedList
       └─ Set    (no duplicates)                            HashSet, LinkedHashSet, TreeSet
Map (key → value, separate family)                          HashMap, LinkedHashMap, TreeMap
```

**Which one should I pick?** (this table is your Day 64 comparison, extended)

| Need | Class | Inside (data structure) | Notes |
|---|---|---|---|
| Fast access by index, add at the end | `ArrayList` | dynamic **array** | Default choice for lists |
| Frequent insert/remove in the **middle** (by node) | `LinkedList` | **doubly linked list** | Slow to reach an index (walks the nodes) |
| Add/remove at **both ends** | `ArrayDeque` | circular array | Use as stack **and** queue; no `null` |
| Always get the **smallest** (or highest priority) first | `PriorityQueue` | **min-heap** | Only the head is ordered; printing shows heap order |
| No duplicates, fastest lookup | `HashSet` | hash table (`HashMap` inside) | No order |
| No duplicates **and** keep insertion order | `LinkedHashSet` | hash table + linked list | |
| No duplicates **and** sorted | `TreeSet` | **red-black tree** | `O(log n)` |

### 5.13.2 Speed (Big-O) cheat sheet

| Operation | ArrayList | LinkedList | ArrayDeque | HashSet / HashMap | TreeSet / TreeMap | PriorityQueue |
|---|---|---|---|---|---|---|
| Add at end | O(1) amortized | O(1) | O(1) | O(1) average | O(log n) | O(log n) |
| Add at front | O(n) | O(1) | O(1) | n/a | n/a | n/a |
| Get by index | **O(1)** | O(n) | n/a | n/a | n/a | n/a |
| Search by value | O(n) | O(n) | O(n) | **O(1)** average | O(log n) | O(n) |
| Remove from middle | O(n) | O(n) to find, O(1) to unlink | O(n) | O(1) average | O(log n) | O(n) |
| Peek smallest | O(n) | O(n) | O(n) | O(n) | O(log n) | **O(1)** |

> **In practice `ArrayList` beats `LinkedList` almost always**, because arrays are cache-friendly. Your notebook says "LinkedList for random-position insert"; that is true only when you already hold the node (an iterator) so no walking is needed.

### 5.13.3 How `ArrayList` grows

`new ArrayList()` starts empty; the first `add` allocates room for **10**. When full, it makes a new array about **1.5× bigger** and copies. That is why `add(index, e)` in your notes shifts elements, and why `set` doesn't.

### 5.13.4 Raw types vs generics (important for real code)

Your notebook stores mixed types: `ArrayList al = new ArrayList();` (a **raw type**). It compiles but is unsafe: nothing stops you from adding a `String` into a list you meant for numbers and crashing later with `ClassCastException`.

```java
ArrayList<Integer> nums = new ArrayList<>();   // only Integer allowed: checked at COMPILE time
nums.add(10);
// nums.add("Java");                           // compile error
int first = nums.get(0);                       // no cast needed (auto-unboxing)
```

Use generics (`<Type>`) in all real code. Raw/heterogeneous collections are for understanding only.

### 5.13.5 Removing from a list: three traps (all verified)

```java
List<Integer> l = new ArrayList<>(List.of(10, 20, 30));
l.remove(Integer.valueOf(10));   // remove the VALUE 10  → [20, 30]
l.remove(0);                     // remove the INDEX 0   → [30]
// list.remove(10) on a List<Integer> means "index 10" → IndexOutOfBoundsException!
```

```java
List<Integer> l = new ArrayList<>(List.of(1, 2, 3, 4));
for (Integer i : l) if (i == 2) l.remove(i);          // ConcurrentModificationException (see chapter 8)

Iterator<Integer> it = l.iterator();                   // correct way
while (it.hasNext()) if (it.next() % 2 == 0) it.remove();   // [1, 3]
// or simply:  l.removeIf(x -> x % 2 == 0);
```
`List.of(...)` creates an **immutable** list: `add`/`remove` throw `UnsupportedOperationException`.

### 5.13.6 `equals()` and `hashCode()`: why HashSet/HashMap need them (verified)

`HashSet` finds an element in two steps: (1) `hashCode()` picks a bucket, (2) `equals()` compares inside the bucket. If you override `equals` but not `hashCode`, two "equal" objects land in different buckets and the set cannot find them.

```java
// both equals and hashCode written          →  set.contains(new Pt(1,2))   = true
// only equals written (no hashCode)         →  set.contains(new BadPt(1))  = false
```

**Contract:** if `a.equals(b)` then `a.hashCode() == b.hashCode()`. (Different objects may share a hash: `"Aa"` and `"BB"` both have hash `2112`. That is a **collision**.)

### 5.13.7 Your hashing example in real life

Your Day 64 model, `4 + 5 = 9, 9 mod 10 = 9`, is a *teaching* hash function. Real Java does:

```
index = (table.length - 1) & hash(key)         // table length is a power of 2, starts at 16
```
Collisions are kept in the same bucket (a linked list; **since Java 8 a bucket turns into a red-black tree when it has ≥ 8 entries** and the table has ≥ 64 slots). When the map is **75% full** (load factor 0.75) the table **doubles** and everything is re-distributed.

### 5.13.8 `PriorityQueue`: min-heap and max-heap

Your output `[10, 30, 20, 50, 40]` is the **heap array**, not a sorted list. Only the head is guaranteed to be the smallest.

```java
PriorityQueue<Integer> min = new PriorityQueue<>();                         // smallest first
PriorityQueue<Integer> max = new PriorityQueue<>(Collections.reverseOrder()); // largest first
min.add(30); min.add(10); min.add(20);
min.poll();   // 10 (removes the head);   min.peek() looks without removing
```
It throws `ClassCastException` for mixed types (as your Day 61 note says) because it must **compare** elements.

### 5.13.9 `ArrayDeque` as a stack and a queue

```java
Deque<Integer> stack = new ArrayDeque<>();
stack.push(1); stack.push(2); stack.pop();      // 2   (LIFO)
Queue<Integer> q = new ArrayDeque<>();
q.offer(1); q.offer(2); q.poll();               // 1   (FIFO)
```
Prefer it over the old `Stack` and `LinkedList` classes.

### 5.13.10 Useful `Collections` / `List` helpers

| Call | Does |
|---|---|
| `Collections.sort(list)` | sort (stable, merge/TimSort) |
| `Collections.reverse(list)`, `shuffle(list)` | reverse / shuffle |
| `Collections.max(c)`, `min(c)` | largest / smallest |
| `Collections.unmodifiableList(l)` | read-only **view** |
| `List.of(..)`, `Set.of(..)`, `Map.of(..)` | immutable, quick creation |
| `new ArrayList<>(otherCollection)` | copy |
| `Arrays.asList(arr)` | fixed-size list backed by the array |
| `list.toArray(new String[0])` | list → array |

### 5.13.11 Interview questions: basic → advanced

| Level | Question | Answer |
|---|---|---|
| Basic | `ArrayList` vs `LinkedList`? | Array vs doubly linked list; `get(i)` O(1) vs O(n); `ArrayList` is usually faster. |
| Basic | `List` vs `Set`? | List allows duplicates and is ordered by index; Set rejects duplicates. |
| Basic | Why can't `TreeSet` hold mixed types? | It must compare elements → `ClassCastException`. |
| Mid | How does `HashSet` avoid duplicates? | It stores elements as keys of an internal `HashMap` and uses `hashCode` + `equals`. |
| Mid | `ArrayList` vs `Vector`? | Vector is synchronized (legacy, slow); use `ArrayList` or `CopyOnWriteArrayList`. |
| Mid | `ArrayList` initial capacity and growth? | 10 (lazily), then ×1.5. |
| Advanced | Why must keys in a `HashMap` be immutable? | If the key's hash changes after insertion, it is lost in the wrong bucket. |
| Advanced | What changed in `HashMap` in Java 8? | Buckets with ≥ 8 collisions become trees (O(log n) instead of O(n)). |
| Advanced | Is `HashSet` thread-safe? | No. Use `ConcurrentHashMap.newKeySet()` or `Collections.synchronizedSet`. |

More: [Java_Collections_Framework_Guide.md](Java_Collections_Framework_Guide.md).

### Complete worked examples *(added by Claude)*

#### Worked Example 7: every collection class from Days 57-64 in one program

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        ArrayList<Object> al = new ArrayList<>();                       // heterogeneous data allowed
        al.add(10); al.add("Java"); al.add(3.5); al.add('c'); al.add(true); al.add(null); al.add(10);
        System.out.println("ArrayList      " + al + " size " + al.size() + ", get(1) " + al.get(1));
        al.remove(Integer.valueOf(10));
        System.out.println("after remove   " + al);

        Iterator<Object> it = al.iterator();
        System.out.print("Iterator       ");
        while (it.hasNext()) System.out.print(it.next() + " ");
        System.out.println();

        ArrayDeque<Integer> ad = new ArrayDeque<>(List.of(20, 30));
        ad.addFirst(10); ad.addLast(40);
        System.out.println("ArrayDeque     " + ad + ", pollFirst " + ad.pollFirst() + ", pollLast " + ad.pollLast() + " -> " + ad);

        LinkedList<String> ll = new LinkedList<>(List.of("b", "c"));
        ll.addFirst("a"); ll.add(1, "a2");
        System.out.println("LinkedList     " + ll + ", getLast " + ll.getLast());

        PriorityQueue<Integer> pq = new PriorityQueue<>(List.of(50, 10, 40, 20, 30));
        System.out.print("PriorityQueue  poll order: ");
        while (!pq.isEmpty()) System.out.print(pq.poll() + " ");
        System.out.println();

        TreeSet<Integer> ts = new TreeSet<>(List.of(50, 10, 40, 10, 20));
        System.out.println("TreeSet        " + ts + " (sorted, no duplicates)");

        HashSet<String> hs = new HashSet<>(List.of("x", "y", "z"));
        LinkedHashSet<String> lhs = new LinkedHashSet<>(List.of("z", "x", "y", "x"));
        System.out.println("HashSet        size " + hs.size() + " contains(y) " + hs.contains("y") + "  (order not guaranteed)");
        System.out.println("LinkedHashSet  " + lhs + " (insertion order, no duplicates)");

        int primitive = 25;
        Integer boxed = primitive;                                      // boxing (autoboxing)
        int unboxed = boxed;                                            // unboxing
        System.out.println("boxing/unboxing " + boxed + " " + unboxed + ", Integer.valueOf(127) == Integer.valueOf(127): " + (Integer.valueOf(127) == Integer.valueOf(127)));
    }
}
```

**Output:**
```text
ArrayList      [10, Java, 3.5, c, true, null, 10] size 7, get(1) Java
after remove   [Java, 3.5, c, true, null, 10]
Iterator       Java 3.5 c true null 10 
ArrayDeque     [10, 20, 30, 40], pollFirst 10, pollLast 40 -> [20, 30]
LinkedList     [a, a2, b, c], getLast c
PriorityQueue  poll order: 10 20 30 40 50 
TreeSet        [10, 20, 40, 50] (sorted, no duplicates)
HashSet        size 3 contains(y) true  (order not guaranteed)
LinkedHashSet  [z, x, y] (insertion order, no duplicates)
boxing/unboxing 25 25, Integer.valueOf(127) == Integer.valueOf(127): true
```

**Explanation:**
- `ArrayList<Object>` accepts any mix of types, including `null` and duplicates; `remove(Integer.valueOf(10))` removes the **first** matching value, not the element at index 10.
- `ArrayDeque` allows fast insertion and removal at both ends; `LinkedList` also supports index-based insertion (`add(1, "a2")`).
- `PriorityQueue` always hands out the smallest element first, so polling produces sorted order even though its internal order is not sorted.
- `TreeSet` sorts and removes duplicates; `LinkedHashSet` removes duplicates but keeps the order of first insertion; `HashSet` gives no order guarantee.
- Collections store objects, so `int` values are **boxed** into `Integer` automatically (Day 61 wrapper classes).

---

# 6. Sorting: Comparable and Comparator (Days 61-63)

## 6.1 Sorting simple objects

```java
TreeSet ts = new TreeSet();
ts.add(80); ts.add(90); ts.add(40); ts.add(10);
System.out.println(ts);                  // [10, 40, 80, 90]

ArrayList al = new ArrayList();
al.add(80); al.add(90); al.add(40); al.add(10);
Collections.sort(al);
System.out.println(al);                  // [10, 40, 80, 90]
```

- **`sort` methods are used on list-based classes**, i.e. `ArrayList` and `LinkedList`.

Sorting an `ArrayDeque` (it has no `sort`): copy to a list, sort, then copy back.

```java
ArrayDeque ad = new ArrayDeque();
ad.add(80); ad.add(50); ad.add(30); ad.add(10); ad.add(60);
ArrayList al = new ArrayList();
al.addAll(ad);
Collections.sort(al);
ad.clear();            // clear the ArrayDeque
ad.addAll(al);
System.out.println(ad);
```

> **Clarification:** the page writes the result as `[10, 40, 80, 90]` (copied from the previous example). For the values above the real output is `[10, 30, 50, 60, 80]`.

## 6.2 Storing complex objects

```java
public class Student extends Object {      // "extends Object" is optional
    int roll_no;                  // page: rollNo
    String name;
    int age;
    char gender;
    float marks;
    boolean isPlaced;
    // constructor, getters, setters
}

main() {
    Student s1 = new Student(1, "Anuj",   22, 'M', 89.4F,  false);   // names/ages as read from handwriting
    Student s2 = new Student(2, "Amit",   23, 'M', 71.34F, false);
    Student s3 = new Student(3, "Chetan", 24, 'M', 99.14F, true);
    Student s4 = new Student(4, "Sakshi", 24, 'F', 85.95F, true);

    ArrayList al = new ArrayList();
    al.add(s1); al.add(s2); al.add(s3); al.add(s4);
    System.out.println(al);        // prints addresses of objects
}
```

- `System.out.println(al)` is equivalent to `System.out.println(al.toString())`, and `toString()` is an **`Object` class method**. Override it to print useful text:

```java
@Override
public String toString() {
    return "Student [rollNo=" + rollNo + ", name=" + name + ", age=" + age +
           ", gender=" + gender + ", marks=" + marks + ", isPlaced=" + isPlaced + "]";
}
```

> This example shows **how to store complex objects in a collection framework class**.

## 6.3 Practice (Day 62)

> Write a Java program to create an object of a `laptop` class having data members `id, brand, cost, processor, memory`. Create 3 objects of laptop, store them in an `ArrayList`, and display the details of all the laptop objects.

```java
class laptop {
    String id;  String brand;  int cost;  String Processor;  int memory;
    @Override
    public String toString() { return "Laptop [lapId=" + id + ... ; }
}
main() {
    laptop L1 = new laptop(...);  laptop L2 = ...;  laptop L3 = ...;
    ArrayList al = new ArrayList();
    al.add(L1); al.add(L2); al.add(L3);
    System.out.println(al);
    Collections.sort(al);
    System.out.println(al);      // Exception: ClassCastException
}
```

`Collections.sort(al)` on complex objects fails with **`ClassCastException`**: **Java doesn't know how to sort a complex object** because it has many different types of data. So sorting of complex objects should be performed using one of two approaches:

1. Using the **`Comparable`** interface
2. Using the **`Comparator`** interface

## 6.4 Generics

> **Generics** are used to mention the type of objects to be stored in collection framework classes.

```java
ArrayList<Student> al = new ArrayList<Student>();
```

In the `ArrayList` above we specified generics of `Student` type, which means **only `Student` objects can be stored** in it.

## 6.5 Comparable interface

`Student` is the **target class**; we want to sort objects of the `Student` class.

```java
class Student implements Comparable<Student> {      // target class
    ...
    @Override
    public int compareTo(Student other) {
        return this.age - other.age;
    }
}

main() {
    ...
    System.out.println(al);
    Collections.sort(al);       // internally it will call compareTo()
    System.out.println(al);
}
```

## 6.6 Comparator interface

**Scenario:** we **cannot use `Comparable`** (we can't modify the target class), so make **one helper class**.

```java
public class SortingHelper implements Comparator<Student> {
    @Override
    public int compare(Student s1, Student s2) {
        return s1.age - s2.age;
    }
}

main() {
    ...
    SortingHelper sh = new SortingHelper();
    Collections.sort(al, sh);        // sort the al object on the basis of sh
    System.out.println(al);
}
```

The notes then pose: **sort on the basis of name** (practice).

## 6.7 How to decide: Comparable or Comparator? (Day 63)

> If the target class is **accessible for modification** use **Comparable**. If the target class is **not accessible for modification**, use **Comparator**.

| Comparable | Comparator |
|---|---|
| Used **with the target class** when it is accessible for modification | Used when the target class is **not available for modification**, hence a **new class** should be created which implements this interface |
| Contains the **`compareTo()`** method | Contains the **`compare()`** method |
| `compareTo()` accepts **one** parameter | `compare()` accepts **two** parameters |

The notes say: solve the laptop questions.


## 6.8 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 6.8.1 Why does Java not know how to sort your `Student`?

Numbers and Strings have a **natural order** (1 < 2, "a" < "b"). A `Student` has many fields; "bigger" could mean higher marks, older age, alphabetical name... Java refuses to guess, so `Collections.sort(al)` throws `ClassCastException` until you define the order.

### 6.8.2 Comparable vs Comparator in one picture

```
Comparable<T>                         Comparator<T>
"I know how to compare MYSELF"        "I am a SEPARATE judge that compares two objects"
class Student implements Comparable   class ByName implements Comparator<Student>
  int compareTo(Student other)          int compare(Student a, Student b)
ONE natural order, inside the class   MANY orders (by age, by name, by marks) from outside
```

### 6.8.3 What the returned `int` means

| Result of `compareTo` / `compare` | Meaning |
|---|---|
| **negative** | first is **smaller** → comes first |
| **0** | equal |
| **positive** | first is **bigger** → comes later |

`String.compareTo` returns the **difference** of the first differing characters: `"SACHIN".compareTo("SAURAV")` = `'C' - 'U'` = **-18**; `"a".compareTo("c")` = -2; `"abc".compareTo("ab")` = 1 (length difference). (all verified)

### 6.8.4 Careful: `this.age - other.age` can overflow

Your note uses `return this.age - other.age;`. It works for small ages, but with large values (e.g. `Integer.MIN_VALUE - 1`) the subtraction **wraps** and gives the wrong sign (verified: `Integer.MIN_VALUE - 1 < 0` is `false`). Use:

```java
public int compareTo(Student other) { return Integer.compare(this.age, other.age); }
```

### 6.8.5 Modern way: build comparators with lambdas (verified)

No helper class (`SortingHelper`) is needed any more:

```java
record Student(int roll, String name, double marks) {}
List<Student> st = new ArrayList<>(List.of(
        new Student(2, "Amit", 71.3), new Student(1, "Ritik", 92.5), new Student(3, "Asha", 92.5)));

st.sort(Comparator.comparingDouble(Student::marks).reversed()   // highest marks first
                  .thenComparing(Student::name));               // tie → by name
// result order: Asha, Ritik, Amit
```

Your "sort on the basis of name" practice becomes `st.sort(Comparator.comparing(Student::name));`.

### 6.8.6 Facts worth knowing

| Fact | Detail |
|---|---|
| Sorting is **stable** | Equal elements keep their original order (`Collections.sort` / `List.sort` use TimSort). |
| `TreeSet` / `TreeMap` | Accept a comparator in the constructor: `new TreeSet<>(Comparator.comparing(Student::name))`. |
| `PriorityQueue` | Also takes a comparator. |
| Arrays | `Arrays.sort(int[])` (dual-pivot quicksort), `Arrays.sort(T[], comparator)`. |
| `ArrayDeque` has no `sort` | Copy into an `ArrayList`, sort, copy back (your approach). |
| Correct output of your `ArrayDeque` example | Input `80, 50, 30, 10, 60` → `[10, 30, 50, 60, 80]`. |

### 6.8.7 Interview questions

| Question | Answer |
|---|---|
| Comparable vs Comparator? | `Comparable` = natural order, in the class (`compareTo`); `Comparator` = external, many orders (`compare`). |
| When to use Comparator? | Class cannot be changed (library class) or you need several orders. |
| Can one class be sorted by two fields? | Yes: `thenComparing`. |
| Why `Integer.compare` instead of subtraction? | Subtraction can overflow. |
| Is `Collections.sort` stable? | Yes. |

### Complete worked examples *(added by Claude)*

#### Worked Example 8: `Comparable` on `Student` and a `Comparator` helper class

```java
import java.util.*;

public class Main {
    static class Student implements Comparable<Student> {
        int id; String name; double marks;
        Student(int id, String name, double marks) { this.id = id; this.name = name; this.marks = marks; }
        @Override public int compareTo(Student other) { return Integer.compare(this.id, other.id); }   // natural order: id
        @Override public String toString() { return id + ":" + name + ":" + marks; }
    }

    static class SortingHelper implements Comparator<Student> {                // external order: marks descending
        @Override public int compare(Student s1, Student s2) { return Double.compare(s2.marks, s1.marks); }
    }

    public static void main(String[] args) {
        List<Student> list = new ArrayList<>(List.of(
                new Student(3, "Ravi", 91.0), new Student(1, "Asha", 78.5),
                new Student(4, "Om", 66.0), new Student(2, "Meena", 91.0)));

        Collections.sort(list);
        System.out.println("by id (Comparable)        " + list);

        Collections.sort(list, new SortingHelper());
        System.out.println("by marks desc (Comparator) " + list);

        list.sort(Comparator.comparing((Student s) -> s.name));
        System.out.println("by name (lambda)          " + list);

        list.sort(Comparator.comparingDouble((Student s) -> s.marks).reversed().thenComparing(s -> s.name));
        System.out.println("marks desc, then name     " + list);

        TreeSet<Student> byId = new TreeSet<>(list);
        System.out.println("TreeSet uses compareTo    " + byId);
    }
}
```

**Output:**
```text
by id (Comparable)        [1:Asha:78.5, 2:Meena:91.0, 3:Ravi:91.0, 4:Om:66.0]
by marks desc (Comparator) [2:Meena:91.0, 3:Ravi:91.0, 1:Asha:78.5, 4:Om:66.0]
by name (lambda)          [1:Asha:78.5, 2:Meena:91.0, 4:Om:66.0, 3:Ravi:91.0]
marks desc, then name     [2:Meena:91.0, 3:Ravi:91.0, 1:Asha:78.5, 4:Om:66.0]
TreeSet uses compareTo    [1:Asha:78.5, 2:Meena:91.0, 3:Ravi:91.0, 4:Om:66.0]
```

**Explanation:**
- `Comparable` gives `Student` one **natural order** (by id), used automatically by `Collections.sort(list)` and by `TreeSet`.
- `SortingHelper` is a separate **Comparator** class, so the same students can be sorted another way without touching `Student`: your Day 62-63 design.
- Meena and Ravi both have 91.0. Sorting is **stable**, so in the marks-only sort they keep their previous relative order (id order: Meena 2 before Ravi 3); `thenComparing(name)` makes such tie-breaks explicit instead of depending on the previous order.
- `Double.compare` / `Integer.compare` are safe; subtracting values can overflow or lose decimals.

---

# 7. Map Classes (Days 63-64)

Under the Map hierarchy there are three classes: **`TreeMap`**, **`HashMap`** and **`LinkedHashMap`**. A map stores data as **[Key : Value]**. (The page shows the idea of a record: key `"KOD12"` with a bundle of data like `"Ritik", 23, 78.5F, Bangalore`.)

## 7.1 TreeMap

```java
TreeMap<Integer, String> tm1 = new TreeMap<>();
tm1.put(1, "Mango");
tm1.put(3, "Apple");
tm1.put(2, "Orange");
tm1.put(4, "Banana");
System.out.println(tm1);       // {1=Mango, 2=Orange, 3=Apple, 4=Banana}

TreeMap<String, String> tm2 = new TreeMap<>();
tm2.put("Ritik", "sharma");
tm2.put("Arav", "Singh");
tm2.put("Bin", "sen");
System.out.println(tm2);

tm3.put(1, 1);
tm3.put(true, 2);              // ClassCastException
```

- **Comparison happens for homogeneous data** (keys are compared to sort them).
- `ClassCastException`: **cast = conversion**. Wrapper-class objects: conversion of one object class into another is not possible.

## 7.2 Map class comparison (Day 64)

| Class | Keys | Values | Order |
|---|---|---|---|
| `TreeMap` | **Heterogeneous keys ✗**, homogeneous keys ✓ | Heterogeneous values ✓ | **Sorting of keys** |
| `HashMap` | Heterogeneous keys ✓ | | **Doesn't maintain order of insertion**; **searching on keys** |
| `LinkedHashMap` | Heterogeneous keys ✓ | | **Maintains order of insertion**; searching on keys and order of insertion |

## 7.3 HashMap and traversal

```java
HashMap<Integer, String> hm = new HashMap<>();
hm.put(1, "Mango"); hm.put(2, "Apple"); hm.put(3, "Java"); hm.put(4, "Python"); hm.put(5, "Jam");
System.out.println(hm);

// values only
Collection val = hm.values();
Iterator itr = val.iterator();
while (itr.hasNext()) { System.out.print(itr.next() + " "); }

// keys only
Set key = hm.keySet();
for (Object x : key) { System.out.println(x); }

// key = value pairs
Set s = hm.entrySet();
for (Object x : s) { System.out.println(x); }     // 1=Mango  2=Apple  3=Java  4=Python ...
```

## 7.4 Map hierarchy (drawn in the notes)

```
                 Map
        ^         ^          ^   (dashed = implements)
   SortedMap   AbstractMap
        ^         ^     ^
 NavigableMap     |    HashMap
        ^         |       ^
     TreeMap -----+    LinkedHashMap
```

`TreeMap` implements `NavigableMap` (which extends `SortedMap` which extends `Map`) and extends `AbstractMap`. `HashMap` extends `AbstractMap` and implements `Map`. `LinkedHashMap` extends `HashMap`.


## 7.5 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 7.5.1 What is a Map?

A **Map stores key → value pairs** (like a phone book: name → number). Keys are **unique**; values may repeat. `Map` is **not** a `Collection`; it is its own family (your Day 63 hierarchy).

| Class | Order | Null key | Speed | Use when |
|---|---|---|---|---|
| `HashMap` | none | 1 allowed | O(1) average | Fast lookup by key (**default choice**) |
| `LinkedHashMap` | insertion order | 1 allowed | O(1) | Lookup + keep the order (also easy LRU cache) |
| `TreeMap` | **sorted by key** | **not allowed** | O(log n) | Sorted keys, range queries (`firstKey`, `headMap`...) |
| `Hashtable` | none | not allowed | slow (all methods synchronized) | Legacy, avoid |
| `ConcurrentHashMap` | none | not allowed | O(1), thread-safe | Shared between threads |
| `EnumMap` | enum order | no | very fast | Keys are an `enum` |

Your Day 64 table says `TreeMap` cannot have heterogeneous **keys**: correct, because keys are compared with each other (`tm3.put(1, 1); tm3.put(true, 2);` → `ClassCastException`).

### 7.5.2 Day-to-day operations

```java
Map<String, Integer> hm = new HashMap<>();
hm.put("a", 1);                 // add / replace
hm.get("a");                    // 1   (null if missing)
hm.getOrDefault("z", 0);        // 0
hm.containsKey("a");            // true
hm.remove("a");

hm.merge("a", 1, Integer::sum);          // add 1, or sum if already there
hm.merge("a", 1, Integer::sum);          // a = 2
hm.computeIfAbsent("b", k -> 5);         // b = 5 only if missing
// result: {a=2, b=5}      (verified)
```

**Word-frequency counting (the classic use):**

```java
Map<String, Integer> freq = new TreeMap<>();
for (String w : "to be or not to be".split(" ")) freq.merge(w, 1, Integer::sum);
// {be=2, not=1, or=1, to=2}
```

### 7.5.3 Three ways to walk a map (your notebook's three views)

| You want | Call | Type returned |
|---|---|---|
| only **values** | `hm.values()` | `Collection<V>` |
| only **keys** | `hm.keySet()` | `Set<K>` |
| **key = value** pairs | `hm.entrySet()` | `Set<Map.Entry<K,V>>` |

```java
for (Map.Entry<Integer, String> e : hm.entrySet())
    System.out.println(e.getKey() + " = " + e.getValue());
hm.forEach((k, v) -> System.out.println(k + " = " + v));      // shortest
```

### 7.5.4 How `HashMap.put` works (interview favourite)

```
put(key, value)
 1. hash = hash(key.hashCode())
 2. index = (n - 1) & hash                 → bucket number
 3. bucket empty?          → store the entry
    bucket has entries?    → walk it: if equals(key) → REPLACE value, else append (collision)
 4. size > 0.75 × capacity → resize (double) and re-distribute
```
`get(key)` repeats steps 1-3. This is why a key class needs a correct `equals` + `hashCode`, and should be **immutable** (e.g. `String`, `Integer`, records).

### 7.5.5 Interview questions

| Level | Question | Answer |
|---|---|---|
| Basic | `HashMap` vs `TreeMap`? | Unordered O(1) vs sorted O(log n); TreeMap forbids `null` keys. |
| Basic | `HashMap` vs `Hashtable`? | Hashtable is synchronized and legacy; HashMap allows one null key. |
| Mid | `HashMap` vs `ConcurrentHashMap`? | The second is thread-safe without locking the whole map. |
| Mid | What if two keys have the same hash? | Same bucket (collision); `equals` tells them apart. |
| Advanced | Initial capacity / load factor? | 16 and 0.75. |
| Advanced | Why is `String` a good key? | Immutable and caches its hash. |

### Complete worked examples *(added by Claude)*

#### Worked Example 9: `HashMap`, `LinkedHashMap` and `TreeMap` with the same data

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        String[][] data = {{"105", "Ravi"}, {"101", "Asha"}, {"103", "Om"}, {"102", "Meena"}};
        Map<Integer, String> hm = new HashMap<>(), lhm = new LinkedHashMap<>(), tm = new TreeMap<>();
        for (String[] row : data) {
            int id = Integer.parseInt(row[0]);
            hm.put(id, row[1]); lhm.put(id, row[1]); tm.put(id, row[1]);
        }
        System.out.println("LinkedHashMap (insertion order): " + lhm);
        System.out.println("TreeMap (sorted by key)        : " + tm);
        System.out.println("HashMap has all 4 keys         : " + hm.keySet().containsAll(tm.keySet()));

        System.out.println("put existing key returns old value: " + hm.put(101, "Asha K"));
        System.out.println("get(101) = " + hm.get(101) + ", get(999) = " + hm.get(999) + ", getOrDefault = " + hm.getOrDefault(999, "unknown"));

        for (Map.Entry<Integer, String> e : tm.entrySet())
            System.out.println("  entry " + e.getKey() + " -> " + e.getValue());

        TreeMap<Integer, String> t = (TreeMap<Integer, String>) tm;
        System.out.println("firstKey " + t.firstKey() + ", lastKey " + t.lastKey() + ", floorKey(104) " + t.floorKey(104) + ", headMap(103) " + t.headMap(103));

        Map<Character, Integer> freq = new TreeMap<>();
        for (char c : "programming".toCharArray()) freq.merge(c, 1, Integer::sum);
        System.out.println("character frequency of 'programming': " + freq);
    }
}
```

**Output:**
```text
LinkedHashMap (insertion order): {105=Ravi, 101=Asha, 103=Om, 102=Meena}
TreeMap (sorted by key)        : {101=Asha, 102=Meena, 103=Om, 105=Ravi}
HashMap has all 4 keys         : true
put existing key returns old value: Asha
get(101) = Asha K, get(999) = null, getOrDefault = unknown
  entry 101 -> Asha
  entry 102 -> Meena
  entry 103 -> Om
  entry 105 -> Ravi
firstKey 101, lastKey 105, floorKey(104) 103, headMap(103) {101=Asha, 102=Meena}
character frequency of 'programming': {a=1, g=2, i=1, m=2, n=1, o=1, p=1, r=2}
```

**Explanation:**
- All three maps store unique keys; they differ only in **order**: `LinkedHashMap` remembers insertion order, `TreeMap` sorts by key, `HashMap` promises no order (so the example only checks its contents).
- `put` on an existing key **replaces** the value and returns the old one, which is how "updating" works in a map.
- `get` returns `null` for a missing key; `getOrDefault` returns a fallback instead.
- `TreeMap` adds navigation methods (`firstKey`, `floorKey`, `headMap`) because its keys are kept sorted in a red-black tree.
- `merge(c, 1, Integer::sum)` is the one-line way to count occurrences.

---

# 8. Structural Modification, Fail-Fast and Fail-Safe (Day 65)

**Structural / concurrent modification** = changing the collection while reading it. Two kinds of operation: **write (add)** and **read (displaying)**.

```java
ArrayList al = new ArrayList();
al.add(10); al.add(20); al.add(30); al.add(40); al.add(50);

// performing structural modification using a for loop
int count = 60;
for (int i = 0; i < al.size() - 1; i++) {
    System.out.println(al.get(i));
    al.add(count);
    count += 10;
}
```

> This loop will act as an **infinite loop**, because the `for` loop **cannot check structural modification** (it just uses the index, and the size keeps growing). If we use an **index-based `for` loop on a list, it will always result in an infinite loop** because it cannot predict concurrent / structural modification.

```java
// using the for-each loop
for (Object x : al) {
    System.out.println(x);
    al.add(count);
    count += 10;
}
// output: 10, then Exception
```

> The for-each loop acts as **fail-fast**: it results in **`ConcurrentModificationException`**.

### `CopyOnWriteArrayList` (`java.util.concurrent`)

```java
CopyOnWriteArrayList cwal = new CopyOnWriteArrayList();
cwal.add(10); cwal.add(20); cwal.add(30); cwal.add(40); cwal.add(50);
int count = 60;
Iterator itr = cwal.iterator();
while (itr.hasNext()) {
    System.out.println(itr.next());      // 10 20 30 40 50
    cwal.add(count);
    count += 10;
}
System.out.println(cwal);     // [10 20 30 40 50 60 70 80 90 100]
```

```
cwal --> [10 20 30 40 50 60 70 80 90]   (new elements added)
 iterator reads from --> [10 20 30 40 50]   (the original snapshot)
```

**Adding happens on the clone; reads come from the original.** Using an advanced `for` loop or an iterator on `java.util.concurrent` package classes is considered **fail-safe**.

| Fail-fast | Fail-safe |
|---|---|
| Happens when we use an **iterator or for-each loop on `java.util` package classes** | Iterator or for-each loop on **`java.util.concurrent`** classes |
| Results in **`ConcurrentModificationException`** | Performs the structural modification **on a clone** |


## 8.1 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 8.1.1 Why "fail-fast"?

Every `java.util` collection keeps a hidden counter, `modCount`, that goes up whenever the structure changes (add/remove). An iterator remembers the value it saw when it was created. On every `next()` it checks: *"has `modCount` changed behind my back?"* If yes it **fails immediately** with `ConcurrentModificationException` instead of producing wrong results later.

```java
List<Integer> l = new ArrayList<>(List.of(1, 2, 3, 4));
for (Integer i : l) if (i == 2) l.remove(i);     // ConcurrentModificationException (verified)
```
Your note: *the for-each loop acts as fail-fast*; the loop is just an iterator in disguise.

### 8.1.2 Ways to change a list safely

| Approach | Use |
|---|---|
| `Iterator.remove()` | Remove while looping (verified: `[1, 2, 3, 4]` → `[1, 3]`) |
| `list.removeIf(x -> ...)` | Cleanest (Java 8+) |
| Loop **backwards** with an index | `for (int i = list.size()-1; i >= 0; i--)` |
| Collect first, remove after | `list.removeAll(toRemove)` |
| Fail-safe collection | `CopyOnWriteArrayList` (below) |

### 8.1.3 Fail-safe: `CopyOnWriteArrayList`

Every write copies the whole array; iterators read the **old snapshot**, so they never throw, but they also **do not see** the new elements (your Day 65 diagram: *adding on the clone, reading from the original*).

| | Good | Bad |
|---|---|---|
| `CopyOnWriteArrayList` | Many reads, rare writes (listeners, config) | Every write is O(n) and uses extra memory |
| `ConcurrentHashMap` | Thread-safe, iterators are **weakly consistent**: never throw and may or may not show updates made after creation | |

Your index-based `for` loop that adds elements is an **infinite loop** (the size keeps growing); an iterator/for-each would instead throw. Neither is a good way to modify a list while walking it.

### 8.1.4 Interview questions

| Question | Answer |
|---|---|
| Fail-fast vs fail-safe? | Fail-fast throws `ConcurrentModificationException` on change (`java.util`); fail-safe iterates a snapshot/consistent view (`java.util.concurrent`). |
| Is fail-fast guaranteed? | No: it is **best-effort**, meant to detect bugs, not to be relied on. |
| How to remove while iterating? | `Iterator.remove()` or `removeIf`. |
| Does a single-threaded program get this exception? | Yes (the example above has one thread). |

### Complete worked examples *(added by Claude)*

#### Worked Example 10: structural vs non-structural modification, fail-fast vs fail-safe

```java
import java.util.*;
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(List.of(10, 20, 30, 40));
        for (Integer x : list) if (x == 20) list.set(0, 99);          // NON-structural (size unchanged): allowed
        System.out.println("set() during iteration: " + list);

        try {
            for (Integer x : list) if (x == 20) list.add(50);           // STRUCTURAL: size changes
        } catch (ConcurrentModificationException e) {
            System.out.println("add() during iteration: ConcurrentModificationException (fail-fast)");
        }

        Map<String, Integer> hm = new HashMap<>(Map.of("a", 1, "b", 2));
        try {
            for (String k : hm.keySet()) hm.put("c", 3);
        } catch (ConcurrentModificationException e) {
            System.out.println("HashMap put during iteration: ConcurrentModificationException (fail-fast)");
        }

        List<Integer> cow = new CopyOnWriteArrayList<>(List.of(10, 20, 30));
        for (Integer x : cow) if (x == 20) cow.add(50);
        System.out.println("CopyOnWriteArrayList (fail-safe): " + cow);

        Map<String, Integer> chm = new ConcurrentHashMap<>(Map.of("a", 1, "b", 2));
        for (String k : chm.keySet()) chm.put("c", 3);
        System.out.println("ConcurrentHashMap (fail-safe): size " + chm.size());

        Iterator<Integer> it = list.iterator();
        while (it.hasNext()) if (it.next() > 30) it.remove();          // the safe way with normal collections
        System.out.println("Iterator.remove(): " + list);
    }
}
```

**Output:**
```text
set() during iteration: [99, 20, 30, 40]
add() during iteration: ConcurrentModificationException (fail-fast)
HashMap put during iteration: ConcurrentModificationException (fail-fast)
CopyOnWriteArrayList (fail-safe): [10, 20, 30, 50]
ConcurrentHashMap (fail-safe): size 3
Iterator.remove(): [20, 30]
```

**Explanation:**
- A **structural modification** changes the size (`add`, `remove`); `set` only replaces a value and is **not** structural, so it is allowed during iteration (your Day 65 definition).
- Normal collections (`ArrayList`, `HashMap`) have **fail-fast** iterators: they count modifications and throw `ConcurrentModificationException` as soon as they notice an unexpected structural change.
- Concurrent collections have **fail-safe** iterators: `CopyOnWriteArrayList` iterates over a snapshot (the newly added 50 is not visited, but it is in the list afterwards), and `ConcurrentHashMap` tolerates changes.
- With normal collections, remove elements through `Iterator.remove()` (or `removeIf`).

---

# 9. JDBC (Days 66-69)

## 9.1 What is JDBC? (Day 66)

- **JDBC = Java Database Connectivity.** Considered an **API** (Application Programming Interface).
- An API is used to establish interaction between an application / software.

```
 Java Program <----- JDBC (Java Database Connectivity) -----> DBMS --> Database tables
```

> **JDBC is a Java API which is used to establish interaction between a Java program and a DBMS.**

## 9.2 JDBC steps

```
 ① DRIVER (load)
 Java Program --② Connection--> DBMS --> table
        |  ③ Statement  <------------->
        |  ④ ResultSet  <-------------
```

1. **Driver**
2. **Connection**
3. **Statement**
4. **ResultSet**

**Adding a JAR in Eclipse:** right-click the project → Build Path → Configure Build Path → Libraries → select Classpath → **Add External JARs**.

**Loading the driver** = take the driver from the hard disk and put it into RAM.

## 9.3 Loading the driver and connecting (Day 67)

- `class` (lowercase) = keyword. **`Class`** (capital C) = inbuilt class, used here **to load the driver**: `Class.forName(path)`.
- `DriverManager.getConnection(url, user, password)`.
- URL pattern: `"jdbc:mysql://localhost:3306/<dbname>"`

```
jdbc : mysql : localhost : 3306 / jdbc_mysql      (page: jdbc-mysql)
 ^       ^        ^         ^        ^
 API    DBMS   some computer port    database name
```

> For **MySQL, loading the driver is optional**. If the programmer doesn't load the driver it is **automatically loaded**. In other DBMS like **Oracle, loading the driver is mandatory**.

## 9.4 JDBC program outline (Day 68)

```java
class JDBCProgram {
    main() {
        // 1 -> insert
        // 2 -> update
        // 3 -> delete
        // 4 -> fetch data
        // other -> invalid
    }
}
```

Table used: **Course** with columns `c_id`, `c_name`, `c_trainer`, `c_cost`.

## 9.5 Batch in JDBC (Day 69)

```
Scenario 1:  query -> connection -> DBMS  (one trip per query)
Scenario 2:  queries -> [ Batch ] -> execute -> DBMS  (one trip for many queries)
```

- In scenario 1, for **every data insert, the hard disk gets hit**, which increases the number of hits on the hard disk. This approach is **not efficient as the HDD is slow**.
- The efficiency can be improved using the concept of **batch in JDBC**: queries are collected into a batch and executed together.


## 9.6 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 9.6.1 What JDBC really is

JDBC is a set of **interfaces** (`Connection`, `Statement`, `ResultSet`...) in `java.sql`. Each database vendor supplies a **driver**: the classes that implement those interfaces. Your code talks only to the interfaces, so changing MySQL → Oracle mostly means changing the driver and the URL.

```
Your Java code ──► JDBC API (java.sql) ──► Driver (mysql-connector JAR) ──► MySQL server
```

### 9.6.2 Your four steps, with the modern code

| Notebook step | Code |
|---|---|
| 1. Load the driver | `Class.forName("com.mysql.cj.jdbc.Driver");` (**optional with modern drivers**, as your note says for MySQL) |
| 2. Connection | `Connection con = DriverManager.getConnection(url, user, pwd);` |
| 3. Statement | `PreparedStatement ps = con.prepareStatement(sql);` |
| 4. ResultSet | `ResultSet rs = ps.executeQuery();` |

URL pattern (your note): `jdbc:mysql://localhost:3306/<dbname>`. Also **close everything**, which try-with-resources does for you:

```java
String url = "jdbc:mysql://localhost:3306/college";
try (Connection con = DriverManager.getConnection(url, "root", "password");
     PreparedStatement ps = con.prepareStatement("select c_id, c_name from Course where c_cost > ?")) {
    ps.setInt(1, 1000);                                   // fills the first ?
    try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {                               // moves to the next row; false at the end
            System.out.println(rs.getInt("c_id") + " " + rs.getString("c_name"));
        }
    }
} catch (SQLException e) {
    e.printStackTrace();
}
```
(The core JDBC calls here, `PreparedStatement`, the `ResultSet` loop and `commit`/`rollback`, were compile-checked; running them needs a real database.)

### 9.6.3 `Statement` vs `PreparedStatement`: always prefer the second

| | `Statement` | `PreparedStatement` |
|---|---|---|
| Parameters | Built into the SQL string | `?` placeholders + `setXxx` |
| **SQL injection** | **Vulnerable** | **Safe** (values never become SQL) |
| Speed on repeated use | Parsed every time | Pre-compiled once |
| Types / dates / quotes | You handle them | Handled for you |

```java
// DANGEROUS:  "select * from users where name = '" + input + "'"      input = ' OR '1'='1   → logs in as anyone
// SAFE:       "select * from users where name = ?"  +  ps.setString(1, input)
```

### 9.6.4 Which execute method?

| Method | For | Returns |
|---|---|---|
| `executeQuery()` | `SELECT` | `ResultSet` |
| `executeUpdate()` | `INSERT / UPDATE / DELETE / DDL` | number of rows changed |
| `execute()` | unknown / many results | `boolean` |

### 9.6.5 Batch (your Day 69), explained

Without a batch each `insert` is a separate **network round trip** to the database. A batch collects many statements and sends them together:

```java
try (PreparedStatement ps = con.prepareStatement("insert into Course values (?,?,?,?)")) {
    for (Course c : courses) {
        ps.setInt(1, c.id); ps.setString(2, c.name); ps.setString(3, c.trainer); ps.setInt(4, c.cost);
        ps.addBatch();                 // queue it
    }
    int[] counts = ps.executeBatch();  // send all at once
}
```

### 9.6.6 Transactions: all-or-nothing

By default JDBC commits **every** statement (`autoCommit = true`). For a bank transfer, you need *both* the debit and the credit, or neither:

```java
con.setAutoCommit(false);
try {
    // debit account A
    // credit account B
    con.commit();            // make both permanent
} catch (SQLException e) {
    con.rollback();          // undo both
    throw e;
}
```
**ACID:** Atomicity, Consistency, Isolation, Durability.

### 9.6.7 Real-world additions

| Topic | Notes |
|---|---|
| **Connection pool** | Opening a connection is slow. A pool (HikariCP is the default in Spring Boot) keeps connections ready; `con.close()` returns it to the pool. |
| **DAO pattern** | Put all SQL for one table in one class (`CourseDao`) so the rest of the program never sees SQL. |
| **Column index starts at 1** | `rs.getString(1)` is the first column; parameter index in `setXxx` also starts at 1. |
| **Never** hard-code passwords | Use environment variables or `application.properties` (see [chapter 22](#22-mvc-and-spring-boot-days-81-90)). |
| **Why Hibernate/JPA** | JDBC means writing SQL and copying columns into objects by hand. ORM does that automatically (next chapter). |

### 9.6.8 Interview questions

| Question | Answer |
|---|---|
| What is JDBC? | Java API (`java.sql`) to talk to relational databases. |
| `Statement` vs `PreparedStatement`? | The second is pre-compiled, parameterized and prevents SQL injection. |
| What is a `ResultSet`? | A cursor over the rows returned by a query; `next()` moves it. |
| How do you commit/rollback? | `setAutoCommit(false)`, then `commit()` / `rollback()`. |
| What is a connection pool? | A cache of open connections reused by many requests. |
| Is loading the driver mandatory? | Not for modern JDBC 4+ drivers (found automatically). |

### Complete worked examples *(added by Claude)*

JDBC code needs a running MySQL server and the Connector/J driver, so it is not run here. A complete DAO (insert with a batch and a transaction, select, update, delete) together with the console output to expect is in [Java_FullStack_Syllabus_Guide.md](Java_FullStack_Syllabus_Guide.md), **Worked Example 64**. Compared with the `JDBCProgram` in your notes it adds three professional habits: `PreparedStatement` with `?` placeholders (prevents SQL injection), try-with-resources (connections always close), and `commit`/`rollback` around multi-row changes.

---

# 10. Hibernate (Days 70-75)

*These notes come from `Exception_2.pdf` (pages 91-100). `Hibernate.pdf` continues from Day 76 in [section 20](#20-hibernate-crud-and-mappings-day-76).*

## 10.1 What is Hibernate? (Day 70)

```
 Student object (class Student) --- Hibernate (ORM) ---> Student table in the database
```

- **Hibernate** is a Java framework which is also considered an **ORM tool**.
- **ORM = Object Relational Mapping**: used for connecting Java objects to a database table and vice versa.
- Hibernate **internally makes use of JDBC**. With Hibernate, the Java programmer **does not have to write the query**; they only need to instruct Hibernate to perform activities.
- Hibernate uses **HQL (Hibernate Query Language)**, which is similar to SQL but **operates on objects instead of database tables**.

## 10.2 Project setup with Maven (Days 70-71)

**Maven** = project management tool.

1. Eclipse: *File → New → Maven Project*.
2. Catalog = **Internal**.
3. **GroupId:** `org.apache.maven.archetypes`, **ArtifactId:** `maven-archetype-quickstart`, version `1.1` → Next.
4. Then give your own **GroupId (package name)** and **ArtifactId (project name)** → Finish. The console should say **Build Success**.
5. Create the Hibernate config: `src/java` → right-click → New → Other → **XML file** → file name **`hibernate.cfg.xml`**.
6. If Eclipse lacks Java EE tools: *Help → Eclipse Marketplace → search "web" → Eclipse Enterprise Java and Web Developer Tools 3.32 → Install*.
7. Refresh Maven: right-click project → **Maven → Update Project → Force Update of Snapshots/Releases → OK**.

Notes on edition: **Java Standard Edition → JDBC**; Java EE → (blank on the page).

| File | Purpose |
|---|---|
| `pom.xml` | **configure the project** (holds the Hibernate Maven dependency and the MySQL Maven dependency) |
| `hibernate.cfg.xml` | **configure Hibernate** |
| `hibernate.dtd` | **document type definition** |

`hibernate.cfg.xml` skeleton from the notes:

```xml
<!-- Hibernate DTD (DOCTYPE) goes first -->
<hibernate-configuration>
    <session-factory>
        <!-- properties -->
    </session-factory>
</hibernate-configuration>
```

**Finding the MySQL driver class name:** Maven dependencies → mysql → `com.mysql.cj.jdbc` → **Driver class** → right-click → **Copy Qualified Name**.

## 10.3 Practice (Day 72)

> Create 3 `Employee` objects (`empId`, `empEmailId`, `empSalary`). Save all 3 objects in the database using Hibernate.

## 10.4 Mappings (Days 73-75)

| Relationship | Direction | Annotation |
|---|---|---|
| 1 : 1 | unidirectional or bidirectional | `@OneToOne` |
| 1 : Many | | `@OneToMany` |
| Many : 1 | | `@ManyToOne` |
| Many : Many | | `@ManyToMany` |

### One-to-One (Day 73): Laptop and Charger

Tables:

| laptop: lappy_id | lappy_brand | lappy_price | ch_id |
|---|---|---|---|
| 1 | Dell | 32000 | 1001 |
| 2 | Lenovo | 29000 | 1002 |

| charger: ch_id | ch_brand | ch_price |
|---|---|---|
| 1001 | dellc | 800 |
| 1002 | lenovoc | 999 |

```
 laptop object (id, brand, price, charger) ---------> charger object (id, brand, price)
```

- **`@OneToOne`**: one laptop object will have one charger object.
- The laptop object has the **address of the charger object**, but the charger object **doesn't have the address of the laptop object** (this is **unidirectional**).

**Bidirectional one-to-one:** each object holds a reference to the other.

```
 laptop (address 100)                          charger (address 111)
 laptopId = 1                                  chargerId = 1001
 laptopBrand = Dell                            chargerBrand = ...
 laptopPrice = 33999                           chargerPrice = 799
 charger -> 111  ------------------------->    laptop  -> 100
```

### One-to-Many / Many-to-One (Day 74): Bike and Rider

```
 Bike                        Rider
 BK01  Hero  ---------->    R01  Ritik
                  \-------> R02  Amit
 BK02  KTM   ---------->    R03  Manoj
                  \-------> R04  Mohit
                  \-------> R05  Rohit
   @OneToMany  ------->         <------- @ManyToOne
```

> `@OneToMany`: whenever it is "toMany", **create a list**.

### Many-to-Many (Day 75): Developer and Project

| Dev_ID | Dev_Name |   | P_Id | P_Name |
|---|---|---|---|---|
| 12 | Mohan | | 123 | Project_A |
| 13 | Ram | | 328 | Project_B |
| 14 | Roshan | | 439 | Project_C |
| 15 | Aman | | | |

A many-to-many relationship needs **two lookup (join) tables**, as drawn in the notes:

| Developer_Project: Dev_ID → P_ID | | Project_Developer: P_Id → Dev_ID |
|---|---|---|
| 12 → 123, 328 | | 123 → 12, 13, 15 |
| 13 → 123, 328, 439 | | 328 → 12, 13, 14 |
| 14 → 328, 439 | | 439 → 13, 14, 15 |
| 15 → 123, 439 | | |


## 10.5 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 10.5.1 The problem Hibernate solves

With JDBC, to save a `Student` you write SQL, set each `?`, and to read it you copy every column back into an object. That is repetitive and error-prone. **ORM (Object Relational Mapping)** maps *classes ↔ tables*, *fields ↔ columns*, *objects ↔ rows*, and writes the SQL for you.

```
 Student object            Hibernate (ORM)               student table
 roll=1, name="Ritik"  ───────────────────────────►   | roll | name  |
                                                       |  1   | Ritik |
 Java world                                            Relational world
```

### 10.5.2 JPA vs Hibernate vs Spring Data JPA

| Name | What it is |
|---|---|
| **JPA** (Jakarta Persistence) | A **specification** (rules/annotations like `@Entity`) |
| **Hibernate** | The most popular **implementation** of JPA (does the real work, uses JDBC underneath) |
| **Spring Data JPA** | A Spring layer on top that gives you `JpaRepository` so you often write **no** DAO code (your Day 85 `StudentRepository extends JpaRepository<Student, Integer>`) |

### 10.5.3 Your setup files, explained

| File | Role |
|---|---|
| `pom.xml` | Maven: lists dependencies (Hibernate, MySQL driver) and downloads them |
| `hibernate.cfg.xml` | Hibernate settings: DB URL, user, password, driver class, dialect, `hbm2ddl.auto` (create/update tables), `show_sql` |
| Entity class | A class marked `@Entity` that is mapped to a table |

Typical objects: `SessionFactory` (heavy, **one per app**) → `Session` (light, **one per unit of work**) → `Transaction`.

### 10.5.4 A minimal entity and save (not compiled here: needs the Hibernate libraries)

```java
@Entity
public class Employee {
    @Id private int empId;
    private String empEmailId;
    private double empSalary;
    // constructors, getters, setters
}

SessionFactory sf = new Configuration().configure("hibernate.cfg.xml")
                                       .addAnnotatedClass(Employee.class)
                                       .buildSessionFactory();
try (Session session = sf.openSession()) {
    Transaction tx = session.beginTransaction();
    session.persist(new Employee(1, "a@x.com", 50000));    // INSERT (older code: save())
    tx.commit();
}
```
Your Day 76 CRUD list: **insert** = `persist`, **read** = `get`/`find`, **update** = change the managed object (or `merge`), **delete** = `remove`.

### 10.5.5 Object states (very common interview question)

| State | Meaning |
|---|---|
| **Transient** | `new Employee()`: not in any session and not in the DB |
| **Persistent** | Attached to a session: changes are **automatically saved** at commit |
| **Detached** | Was persistent but the session closed |
| **Removed** | Marked for deletion |

### 10.5.6 Going deeper

| Topic | Explanation |
|---|---|
| **HQL / JPQL** | Query **objects**, not tables: `from Employee e where e.empSalary > 40000` |
| **Lazy vs eager loading** | Lazy = load related rows only when touched (default for collections); eager = load immediately |
| **N+1 problem** | Load 1 list of authors, then 1 extra query **per author** to get their books. Fix with `join fetch` or `@EntityGraph` |
| **First-level cache** | Per `Session`: the same row is loaded once per session |
| **Second-level cache** | Optional, shared across sessions |
| **Cascade** | `cascade = CascadeType.ALL` saves/deletes children with the parent |
| `get()` vs `load()` | `get` hits the DB now and returns `null` if missing; `load` returns a proxy and throws if missing when used |

Mapping annotations and examples from your Day 73-76 tables are in [chapter 20](#20-hibernate-crud-and-mappings-day-76).

### 10.5.7 Interview questions

| Question | Answer |
|---|---|
| What is ORM? | Mapping objects to relational tables automatically. |
| Hibernate vs JDBC? | Hibernate generates SQL, maps results to objects, caches, manages relations. |
| What is `SessionFactory`? | A thread-safe, expensive factory created once; creates `Session`s. |
| Hibernate vs JPA? | JPA is the standard; Hibernate implements it. |
| What is the N+1 problem? | One query for the parent plus N for the children; fix with a fetch join. |

### Complete worked examples *(added by Claude)*

Hibernate needs the Hibernate libraries and a database, so it is not run here. [Java_FullStack_Syllabus_Guide.md](Java_FullStack_Syllabus_Guide.md), **Worked Example 66**, shows the exact SQL Hibernate prints for `persist`, `get`, an automatic update (dirty checking) and `remove`, plus what the N+1 problem looks like in the log.

---

# 11. Exception Handling: Syntax Rules, Overriding Rules, ATM Example (Days 47-48)

*Source: `Exception_2.pdf`, pages 1-9.*

## 11.1 Valid syntax of try / catch / finally (Day 48)

| # | Valid combination |
|---|---|
| 1 | `try { } catch { }` |
| 2 | `try { } finally { }` |
| 3 | `try { } catch { } finally { }` |
| 4 | `try { } catch { } catch { }` (multiple catch) |
| 5 | `try { } catch { } catch { } finally { }` |
| 6 | A `try` block nested inside another `try` block (the page shows an outer try/catch/finally with a full try/catch/finally inside the try) |
| 7 | A full `try { } catch { } finally { }` nested inside a `catch` block |
| 8 | A full `try { } catch { } finally { }` nested inside a `finally` block |

**Invalid syntax:**

| # | Invalid combination | Why |
|---|---|---|
| 1 | `try { }` alone | needs a `catch` or `finally` |
| 2 | `catch { }` alone | `catch` needs a `try` |
| 3 | `finally { }` alone | `finally` needs a `try` |
| 4 | `catch { } finally { }` without `try` | no `try` |

## 11.2 Rules for exceptions when overriding methods

**Rule 1:** If the parent class method is throwing an exception, the child class overridden method **may or may not** throw the exception.

```java
class Parent {
    void display() throws ArithmeticException { System.out.println("Inside parent display"); }
}
class Child1 extends Parent {
    @Override void display() { System.out.println("Inside child1 display"); }              // does not throw: OK
}
class Child2 extends Parent {
    @Override void display() throws ArithmeticException { System.out.println("Inside child2 display"); }   // throws: OK
}
```

**Rule 2:** If the parent method throws an exception, the child overridden method can also throw an exception **provided the parent throws a parent exception and the child throws a child exception**.

```java
class Parent { void display() throws RuntimeException { ... } }
class Child1 extends Parent { void display() throws IOException { ... } }                  // error (as marked on the page)
class Child2 extends Parent { @Override void display() throws ArithmeticException { ... } } // OK: ArithmeticException is a child of RuntimeException
```

**Rule 3:** If the parent method throws an exception, the child overridden method can throw a **different** exception if the parent's exception and the child's exception are **both of the runtime-exception category**.

```java
class Parent { void display() throws ArithmeticException { ... } }
class Child1 extends Parent { @Override void display() throws InputMismatchException { ... } }
class Child2 extends Parent { @Override void display() throws ArrayIndexOutOfBoundsException { ... } }
```

> **Clarification:** the compiler only enforces this for **checked** exceptions. An overriding method can never throw a *new or broader checked* exception than the parent declares, but it can throw any unchecked (runtime) exception. That is what Rule 3 is expressing.

## 11.3 Question: custom exception for an ATM PIN

> Create a custom exception named **InvalidUserException**. The user is entering a PIN of an ATM and every time a wrong PIN is entered the exception has to be generated. If the user has entered **three consecutive wrong PINs**, then the exception should not be generated; rather a message is generated that **"Card is blocked"**.

```java
class BankApp {
    public static void main(String[] args) {
        Bank b = new Bank();
        b.startTransaction();
    }
}
class Bank {
    void startTransaction() {
        ATM atm = new ATM();
        int pin = 5555;
        atm.access(pin);
    }
}
class ATM {
    void access(int pin) throws Exception {
        Scanner scan = new Scanner(System.in);
        System.out.println("Enter Pin");
        int userPin = scan.nextInt();
        if (userPin == pin) {
            System.out.println("Access Given");
        } else {
            try {
                InvalidUserException iue = new InvalidUserException();
                throw iue;
            } catch (Exception e) {
                System.out.println("Enter the pin 2nd time");
                userPin = scan.nextInt();
                if (userPin == pin) {
                    System.out.println("Access given");
                } else {
                    try {
                        InvalidUserException iue = new InvalidUserException();
                        throw iue;
                    } catch (Exception e) {            // the page reuses the name e here
                        System.out.println("Enter the pin 3rd time");
                        userPin = scan.nextInt();
                        if (userPin == pin) System.out.println("Access given");
                        else System.out.println("Card is blocked");
                    }
                }
            }
        }
    }
}
public class InvalidUserException extends Exception {
    public InvalidUserException() { super("Invalid user"); }
}
```

> **Clarification:** two `catch (Exception e)` blocks nested like this reuse the variable name `e` in an enclosing scope, which gives a compile error ("variable e is already defined"). Rename the inner one (e.g. `e2`). A `for` loop with a counter (3 attempts) is the cleaner solution.


## 11.4 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 11.4.1 Reading the valid/invalid table

| Rule | Why |
|---|---|
| `try` must be followed by **at least one** `catch` **or** a `finally` | A bare `try {}` has no meaning. |
| `catch` and `finally` **cannot exist without `try`** | They belong to a `try`. |
| `finally` comes **last**, after all `catch` blocks | Order is fixed: `try` → `catch`(es) → `finally`. |
| Several `catch` blocks → **specific first, generic last** | Otherwise the compiler says *"exception X has already been caught"* (verified). |
| You can **nest** a `try` inside `try`, `catch` or `finally` | Your cases 6, 7, 8. Useful when the cleanup itself can fail. |

### 11.4.2 Why the three overriding rules exist

The idea is **"a child must be usable wherever the parent is used"**. Code written against `Parent.display()` only prepared for the exceptions the parent declared. So a child override is not allowed to surprise the caller with a **new or bigger checked exception**.

| Case | Allowed? | Reason |
|---|---|---|
| Parent throws; child throws **nothing** | Yes | Safer than the parent. |
| Parent throws `RuntimeException`; child throws `IOException` | **No** (verified: *"d() in C1 cannot override d() in P"*) | `IOException` is a *checked* exception the caller never expected. |
| Parent throws `RuntimeException`; child throws `ArithmeticException` | Yes | It is a **narrower** exception of the same family. |
| Parent throws `ArithmeticException`; child throws `InputMismatchException` | Yes | Both are **unchecked**; the compiler does not track them (your Rule 3). |
| Parent throws **nothing**; child throws a **checked** exception | **No** | Same reason as above. |

### 11.4.3 ATM exercise: the cleaner way

The nested `try`/`catch` in the notebook repeats the same code three times. A loop with a counter is shorter and has no duplicate-variable problem:

```java
class InvalidUserException extends Exception {
    InvalidUserException() { super("Invalid user"); }
}

class ATM {
    void access(int pin) throws InvalidUserException {
        Scanner scan = new Scanner(System.in);
        for (int attempt = 1; attempt <= 3; attempt++) {
            System.out.println("Enter PIN (attempt " + attempt + ")");
            int userPin = scan.nextInt();
            if (userPin == pin) { System.out.println("Access given"); return; }
            if (attempt == 3) { System.out.println("Card is blocked"); return; }
            // wrong PIN on attempt 1 or 2: report it as an exception, then loop again
            try { throw new InvalidUserException(); }
            catch (InvalidUserException e) { System.out.println(e.getMessage()); }
        }
    }
}
```

(Third wrong PIN prints "Card is blocked" **instead of** throwing, exactly as the question asks.)

### 11.4.4 Interview questions

| Question | Answer |
|---|---|
| Can `try` exist alone? | No: needs `catch` or `finally` (or resources). |
| Can there be code between `try` and `catch`? | No. |
| Can a `catch` be empty? | Yes, but it hides bugs; at least log the exception. |
| Child overriding method can throw broader checked exception? | No. |

### Complete worked examples *(added by Claude)*

#### Worked Example 11: the ATM with three attempts, run with real input

```java
// stdin: 1234\n4321\n5555
import java.util.Scanner;

public class BankApp {
    static class InvalidUserException extends Exception {
        InvalidUserException(int attemptsLeft) { super("Invalid PIN, " + attemptsLeft + " attempt(s) left"); }
    }

    static class ATM {
        private final Scanner scan = new Scanner(System.in);

        boolean access(int pin) {
            for (int attempt = 1; attempt <= 3; attempt++) {
                System.out.print("Enter PIN (attempt " + attempt + "): ");
                int userPin = scan.nextInt();
                System.out.println();
                try {
                    if (userPin != pin) throw new InvalidUserException(3 - attempt);
                    System.out.println("Access given");
                    return true;
                } catch (InvalidUserException e) {
                    System.out.println(e.getMessage());
                }
            }
            System.out.println("Card is blocked");
            return false;
        }
    }

    public static void main(String[] args) {
        boolean ok = new ATM().access(5555);
        System.out.println("transaction allowed: " + ok);
    }
}
```

**Output:**
```text
Enter PIN (attempt 1): 
Invalid PIN, 2 attempt(s) left
Enter PIN (attempt 2): 
Invalid PIN, 1 attempt(s) left
Enter PIN (attempt 3): 
Access given
transaction allowed: true
```

**Explanation:** the input was `1234`, `4321`, then the correct PIN `5555`. The prompt and the input share a line only because the input came from a file. The loop replaces the three nested `try`/`catch` blocks from your notes (and avoids the duplicate variable `e`). Each wrong PIN throws `InvalidUserException`, which is caught immediately and reported with the number of attempts left. On the third attempt the correct PIN is entered, so access is given; three wrong PINs would leave the loop and print "Card is blocked".

#### Worked Example 12: checking the overriding rules for exceptions

```java
import java.io.IOException;

public class Main {
    static class Parent {
        void display() throws IOException { System.out.println("Parent display"); }
    }
    static class Child1 extends Parent {
        @Override void display() { System.out.println("Child1: throws nothing (allowed)"); }
    }
    static class Child2 extends Parent {
        @Override void display() throws java.io.FileNotFoundException { System.out.println("Child2: narrower checked exception (allowed)"); }
    }
    static class Child3 extends Parent {
        @Override void display() throws IOException, ArithmeticException { System.out.println("Child3: any unchecked exception (allowed)"); }
    }
    // static class Child4 extends Parent { @Override void display() throws Exception { } }   // compile error: broader checked exception

    public static void main(String[] args) throws IOException {
        Parent[] all = {new Parent(), new Child1(), new Child2(), new Child3()};
        for (Parent p : all) p.display();                   // the caller only prepared for IOException
    }
}
```

**Output:**
```text
Parent display
Child1: throws nothing (allowed)
Child2: narrower checked exception (allowed)
Child3: any unchecked exception (allowed)
```

**Explanation:** the caller holds `Parent` references and only handles `IOException`. Every override therefore may throw **nothing**, the **same** checked exception, a **narrower** checked one (`FileNotFoundException`), or any **unchecked** one; all keep the caller safe. Throwing a broader checked exception such as `Exception` (Child4) would surprise the caller, so the compiler rejects it with "overridden method does not throw Exception".

---

# 12. Multithreading Basics (Days 49-53)

*Source: `Exception_2.pdf`, pages 10-24. Continues in [section 4](#4-multithreading-days-54-56).*

## 12.1 Tasking scenarios (Day 49)

| Scenario | OS type | Description |
|---|---|---|
| 1 | **STOS** (single-task operating system) | **Single tasking.** One process at a time is loaded from the HDD into RAM; the microprocessor (MP) runs that one process/task. |
| 2 | STOS | **Multi-tasking** attempted with several processes (process 1, 2, 3) loaded from HDD to RAM. The page notes: **both approaches use STOS, which is not the efficient way.** |
| 3 | **MTOS** (multi-task operating system) | **Multi-tasking using MTOS and single-threaded**: the MP handles process 1, process 2, process 3 in RAM, one thread each. |
| 4 | MTOS | **Multi-tasking and multithreaded using MTOS**: each process has a **thread scheduler (TS)** attached. |

- **Multitasking** → happens at the **OS level**.
- **Multithreading** → happens at the **program level** (the end of this line is cut off in the photo; **(unclear)**).

## 12.2 What is multithreading? (Day 50)

- **Multithreading is the process of creating multiple threads to execute the Java program.**
- By achieving multithreading we get the advantage of **faster execution** of the program.
- `Thread.sleep(3000)` → a **checked exception**; 3000 ms = 3 seconds; it creates a **delay in program execution**.
- If the compiler is giving any error, then it is a checked exception (red colour on `Thread.sleep(3000)` until it is handled).
- The **Thread Scheduler (T.S.) is present inside the JVM**. It sits above the stack and picks which thread runs.

### Disadvantage of a single-threaded application: time-taking

```java
class Program {
    public static void main(String[] args) {
        try {
            Scanner sc = new Scanner(System.in);
            System.out.println("Enter a & b");
            int a = sc.nextInt();
            int b = sc.nextInt();
            int c = a + b;
            System.out.println(c);
            for (int i = 0; i < 5; i++) { System.out.println(i); }
        } catch (Exception e) { e.printStackTrace(); }
    }
}
```

> In the above program **a single thread is executing**, hence it is considered a **single-threaded program**. Although two independent activities are present in the program, the printing activity still waits on the addition activity. **Whenever independent activities are present in the program, we should run them in the multithreaded environment.**

## 12.3 Two approaches to multithreading

1. **Extending the `Thread` class**
2. **Implementing the `Runnable` interface**

### Approach 1: extending `Thread`

```java
class Program {
    public static void main(String[] args) {
        Addition t1 = new Addition();
        Printing t2 = new Printing();
        t1.start();
        t2.start();
    }
}
class Addition extends Thread {
    @Override
    public void run() {
        System.out.println("Addition is started");
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = a + b;
        try {
            Thread.sleep(3000);
            System.out.println(c);
        } catch (Exception e) { e.printStackTrace(); }
        System.out.println("Addition completed");
    }
}
class Printing extends Thread {
    @Override
    public void run() {
        System.out.println("Printing is started");
        try {
            for (int i = 1; i <= 5; i++) {
                System.out.println(i);
                Thread.sleep(1000);
            }
        } catch (Exception e) { e.printStackTrace(); }
        System.out.println("Printing is completed");
    }
}
```

The page also has a boxed side-note "Print: `t1.run()` `t2.run()`" next to `start()` **(unclear)**; it relates to Day 53 "why we should not call `run()`".

**Stack diagram:** the thread scheduler (TS) controls a **main stack** (with `main()`), and **an extra stack for each thread** (Thread 0 with `run()`, Thread 1 with `run()`).

> **Whenever a thread object is created (and started), one extra stack section is created.**

### Approach 2: implementing `Runnable`

```java
public class Program {
    public static void main(String[] args) {
        // creating the object of non-thread class
        Addition add = new Addition();
        Printing print = new Printing();
        // creating the object of thread class & assigning their jobs
        Thread t1 = new Thread(add);
        Thread t2 = new Thread(print);
        // calling start() which calls run() internally
        t1.start();
        t2.start();
    }
}
class Addition implements Runnable { @Override public void run() { ... } }
class Printing implements Runnable { public void run() { ... } }
```

## 12.4 Practice (Day 51)

> Q. Write a program to achieve multithreading.
> Scenario 1 → print the table of a number up to 10 times.
> Scenario 2 → print 12 characters starting from A.

```java
public class Table implements Runnable {
    @Override
    public void run() {
        try {
            int n = sc.nextInt();                 // Scanner sc as on the page
            for (int i = 1; i <= 10; i++) {
                System.out.println(n * i);
                Thread.sleep(4000);
            }
        } catch (Exception e) { e.printStackTrace(); }
    }
}
public class CharPrint implements Runnable {
    @Override
    public void run() {
        try {
            for (char ch = 'A'; ch <= 'L'; ch++) {          // A..L = 12 characters
                System.out.println(ch);
                Thread.sleep(4000);
            }
        } catch (Exception e) { e.printStackTrace(); }
    }
}
public class Main {
    public static void main(String[] args) {
        Table tbl = new Table();
        CharPrint cp = new CharPrint();
        Thread t1 = new Thread(tbl);
        Thread t2 = new Thread(cp);
        t1.start();
        t2.start();
    }
}
```

## 12.5 `join()` method

> `join()` is used in scenarios where **a thread has to wait for another thread to die (completing the task)**.
> It is always the **main thread** which starts the execution and completes the execution. Hence, if there is any other thread which has to be executed **before the main thread completes** the execution, then the `join` method must be used.

```java
class InstaApp {
    public static void main(String[] args) {
        try {
            System.out.println("Insta App is opened");
            Chatting ch = new Chatting();
            Reel rl = new Reel();
            ch.start();
            rl.start();
            ch.join();
            rl.join();
            System.out.println("Insta App is closed");   // waits for ch & rl to join & die
        } catch (Exception e) { e.printStackTrace(); }
    }
}
class Chatting extends Thread { public void run() { try { ... } catch (...) { } } }
class Reel extends Thread     { public void run() { try { ... } catch (...) { } } }
```

## 12.6 `isAlive()`

```java
class Main {
    public static void main(String[] args) {
        System.out.println("Main thread execution started");
        CustomThread ct = new CustomThread();
        System.out.println(ct.isAlive());   // false
        ct.start();                         // thread will become active
        System.out.println(ct.isAlive());   // true
        System.out.println("Main thread execution ended");
    }
}
class CustomThread extends Thread { public void run() { ... } }
```

## 12.7 `currentThread()`, priority and name

```java
class Main {
    public static void main(String[] args) {
        Thread t = Thread.currentThread();      // static method
        System.out.println(t);                  // Thread[main,5,main]
        t.setPriority(3);
        System.out.println(t);                  // Thread[main,3,main]
        t.setName("Ritik");
        System.out.println(t);                  // Thread[Ritik,3,main]
    }
}
```

In `Thread[Ritik,3,main]`: the first value is the **thread name**, the second is the **priority (1 to 10)**, the third is the **thread group** (the page points at the third value with "stack"; see Clarification). **Threads are considered as objects.**

> **Clarification:** the third value in `Thread[name, priority, group]` is the thread group (`main`), not the stack.

**Day 52 (LeetCode):** only the heading is written on the page.

## 12.8 Why we should not call `run()` directly (Day 53)

> If we call `run()`, then on the `main()` stack memory will be created and it will use a single thread to execute. (No new thread / new stack is created, so there is no multithreading.) Always call `start()`.

## 12.9 Daemon threads (Day 53)

> **Daemon threads → threads created to execute background activity.**

```java
class Typing extends Thread {
    public void run() {
        try { for (int i = 1; i <= 5; i++) { System.out.println("Typing"); Thread.sleep(2000); } }
        catch (Exception e) { e.printStackTrace(); }
    }
}
class AutoSave extends Thread {
    public void run() {
        try { for (;;) { System.out.println("AutoSave"); Thread.sleep(2000); } }
        catch (Exception e) { e.printStackTrace(); }
    }
}
class SpellCheck extends Thread {
    public void run() {
        try { for (;;) { System.out.println("check spelling"); Thread.sleep(...); } }
        catch (Exception e) { ... }
    }
}
```

The `main` that starts them (with `setDaemon(true)`) is already in [section 4.1](#41-daemon-threads).


## 12.10 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 12.10.1 Why multithreading helps (your Day 49-50 story)

| Scenario | Meaning | Real-life picture |
|---|---|---|
| 1. STOS, one process | One task at a time | A shop with **one** cashier and the doors closed to other customers |
| 3. MTOS, single-threaded processes | OS switches between processes | Many shops, each with one cashier |
| 4. MTOS + multithreaded | OS switches between processes **and** each process does several things at once | Each shop has several cashiers (threads) sharing the same stock room (heap) |

**Your single-threaded program:** it waits for the user to type `a` and `b`, adds them, then prints `0..4`, one after the other. The loop **does not depend** on the sum, so it can run **at the same time** in another thread. Rule of thumb from your notebook: *independent activities → separate threads.*

### 12.10.2 Timeline of your Addition + Printing program

```
time →     0s        1s   2s   3s   4s   5s
Addition:  [wait for input ... sleep 3 s ..........] prints sum  → "Addition completed"
Printing:  1 ..... 2 ..... 3 ..... 4 ..... 5  → "Printing is completed"
           (both threads run at the same time, so the total time is the LONGEST one, not the sum)
```
The exact interleaving of the printed lines can differ each run: **thread scheduling is not under your control.**

### 12.10.3 `sleep`, `join`, `isAlive`, priority: what each is for

| Method | What it does | Typical use |
|---|---|---|
| `Thread.sleep(ms)` | Pauses **the current thread**; throws checked `InterruptedException` | Simulate work, polling delays |
| `t.join()` | **Waits** until thread `t` has died | Wait for all workers before printing "done" (your `InstaApp`) |
| `t.isAlive()` | `false` before `start()` and after it ends; `true` in between | Check status |
| `t.setPriority(1..10)` | A **hint** to the scheduler (default 5); the OS may ignore it | Rarely useful |
| `t.setName("x")` / `getName()` | Name threads | Debugging, logs, your `Printing` example |
| `Thread.currentThread()` | The thread running this line | Print which thread executes |
| `t.interrupt()` | Politely asks a thread to stop (wakes it from `sleep`/`wait` with `InterruptedException`) | Cancelling work |
| `setDaemon(true)` | Background thread; JVM can exit without waiting | Autosave, monitoring |

> Why is `InterruptedException` checked? Because a thread that is sleeping or waiting can be woken by `interrupt()`, so Java forces you to decide what to do. Normally: stop the work, or restore the flag with `Thread.currentThread().interrupt()`.

### 12.10.4 Using a lambda instead of a class (modern)

The notebook creates `Addition` and `Printing` classes. For a short task you can write:

```java
Thread t1 = new Thread(() -> {
    for (int i = 1; i <= 5; i++) {
        System.out.println(i);
        try { Thread.sleep(1000); } catch (InterruptedException e) { return; }
    }
});
t1.start();
```
`Runnable` has one method, so it is a **functional interface** and accepts a lambda (see [chapter 25](#25-java-8-toolkit-generics-lambdas-streams-optional)).

### 12.10.5 Interview questions

| Question | Answer |
|---|---|
| Multitasking vs multithreading? | Multitasking = many programs (processes) at once, OS level; multithreading = many threads inside one program. |
| Why call `start()` not `run()`? | `run()` is a normal call on the current thread. |
| What does the thread scheduler do? | Chooses which `RUNNABLE` thread gets the CPU (inside the JVM/OS). |
| Can we restart a dead thread? | No: `start()` twice → `IllegalThreadStateException`. |
| What if `main` ends while other threads run? | The JVM waits for all **non-daemon** threads. |

Deeper (race conditions, executors, deadlock): [chapter 4, section 4.7](#47-explained-simply-and-going-deeper-added-by-claude-not-from-your-notebook).

### Complete worked examples *(added by Claude)*

#### Worked Example 13: `InstaApp` with `join()`, `isAlive()`, names, priorities, and `run()` vs `start()`

```java
public class InstaApp {
    static class Chatting extends Thread {
        public void run() { for (int i = 1; i <= 2; i++) { System.out.println("  chatting " + i); pause(50); } }
    }
    static class Reel extends Thread {
        public void run() { System.out.println("  reel playing on " + Thread.currentThread().getName()); pause(80); }
    }
    static void pause(long ms) { try { Thread.sleep(ms); } catch (InterruptedException e) { Thread.currentThread().interrupt(); } }

    public static void main(String[] args) throws Exception {
        Thread main = Thread.currentThread();
        System.out.println(main);
        main.setPriority(3);
        main.setName("Ritik");
        System.out.println(main);
        main.setName("main");
        main.setPriority(5);

        System.out.println("Insta App is opened");
        Chatting ch = new Chatting();
        System.out.println("isAlive before start: " + ch.isAlive() + ", state " + ch.getState());
        ch.start();
        System.out.println("isAlive after start : " + ch.isAlive());
        ch.join();                                  // main waits until chatting dies
        System.out.println("isAlive after join  : " + ch.isAlive() + ", state " + ch.getState());

        Reel rl = new Reel();
        rl.setName("reel-thread");
        rl.run();                                   // WRONG: runs on the main thread, no new thread
        rl.start();                                 // RIGHT: runs on its own thread
        rl.join();
        System.out.println("Insta App is closed");
    }
}
```

**Output:**
```text
Thread[main,5,main]
Thread[Ritik,3,main]
Insta App is opened
isAlive before start: false, state NEW
isAlive after start : true
  chatting 1
  chatting 2
isAlive after join  : false, state TERMINATED
  reel playing on main
  reel playing on reel-thread
Insta App is closed
```

**Explanation:**
- `Thread[main,5,main]` shows **name, priority, thread group**, as in your Day 52 notes; `setPriority`/`setName` change the first two values.
- Before `start()` a thread is `NEW` and not alive; after `start()` it is alive; after `join()` returns it is `TERMINATED`. `join()` makes `main` wait, which is why "Insta App is closed" is always printed last.
- Calling `rl.run()` directly just executes the method on the **current** thread, so it prints `main`; only `start()` creates a new call stack and prints the thread's own name (Day 53).

---

# 13. OOP Basics: Methods, Overloading, Objects, Variables

*Source: `OOPs.pdf`, pages 1-8 and 17-22. The days in this notebook are not in strict order, so day numbers are given as written.*

## 13.1 Parameters vs arguments

```java
class Program {
    public static void main(String[] args) {
        add(10, 20);                       // 10, 20 are ARGUMENTS (actual parameters)
    }
    static void add(int a, int b) {        // a, b are PARAMETERS (formal parameters)
        System.out.println(a + b);
    }
}
```

- **Parameters** are the variables which accept the input for the methods; they are present in the **method declaration**.
- **Arguments** are the variables or values which are passed while **invoking** the methods.

## 13.2 Method overloading

> **Q. What is method overloading?** The process of creating multiple methods having the **same name inside the same class with different parameters**.

- Although multiple methods have the same name, they **cannot be duplicates**, which means the **parameters of the methods must be different**.
- While achieving method overloading, the compiler gets confused about which method should be called. The confusion is resolved in **3 steps**:
  1. By checking the **number** of parameters
  2. By checking the **data type** of parameters
  3. By checking the **order** of parameters
- **Q. What is not allowed in method overloading?** **Duplicate methods.** Any method that has the **same name, same number of parameters, same data types, same order** of parameters is a duplicate method, which is not allowed in Java and results in a **compilation error**.

```java
class Calculator {
    public static void main(String[] args) {
        System.out.println(add(10, 20));         // int, int
        System.out.println(add(10.5, 20.5));     // double, double
        System.out.println(add(10, 30.5));       // int, double
    }
    static int add(int a, int b)          { return a + b; }
    static double add(double a, double b) { return a + b; }
    // add(double a, int b)  ✗   (marked with a cross on the page: not defined)
}
```

> **Clarification (verified):** `add(10, 30.5)` still works with only these two methods: `10` is widened to `10.0` and `add(double, double)` is called, giving `40.5`.

## 13.3 Virtual / false polymorphism = compile-time (Day 17)

| | |
|---|---|
| **Virtual (false) polymorphism** | **Compile time** |
| How to achieve | using **method overloading** |

> **What is virtual or false polymorphism?** Polymorphism refers to a **1 : many relationship**. If this relationship is **imaginary**, then it is considered **virtual polymorphism**. During method overloading, the programmer who is invoking the method may feel that there is **one method performing multiple tasks**, but in reality there are multiple methods, each doing one task, so in reality there is a **1 : 1 relationship** in the program.

(The last line of the page is slightly hard to read; the meaning is that each call maps to exactly one real method.)

## 13.4 Class → JVM → objects (Day 18)

```
class ---> JVM ---> objects
Design / Blueprint ---> Contractor ---> Entity (house)
```

A **class is the blueprint** (design); the **JVM acts like the contractor** that builds **objects** (the real entity) from it.

## 13.5 Creating objects and constructors (Day 21)

```java
class Student {
    int rollNo;           // instance variables
    String name;
    void study() { }
}
class StudentApp {
    public static void main(String[] args) {
        Student s1 = new Student();    // constructor call
        Student s2 = new Student();
        Student s3 = new Student();    // (s1, s2, s3: "3 times used")
    }
}
public Student() { }       // constructor
```

**Constructor:**
- **no return type**
- **name same as the class name**
- **created / called at the time of object creation**

### Reading `Student s1 = new Student();`

| Part | Meaning |
|---|---|
| `Student` | **type of the reference variable** |
| `s1` | **reference variable** |
| `new` | **keyword for object creation** |
| `Student()` | **constructor call** (class for which the object is created) |

```
STACK                       HEAP
s1 [ 4000 ] ───────────►   (object at 4000)
s2 [ 6000 ] ───────────►   (object at 6000)
```

## 13.6 Instance variable vs local variable (Days 21-22)

| Instance variable | Local variable |
|---|---|
| Present **directly inside the class, outside any method** | Present **directly inside the method** |
| Memory is allocated **in the object, in the heap segment** | Memory allocated **in the stack frame, in the stack segment** |
| **Has a default value** (`int` = 0, `String` = null) | **No default value** |
| Memory is **deallocated by the garbage collector** while removing the garbage object | Memory is **deallocated when the stack frame of that method is removed** |
| **Can be used without initialization** | **Cannot be used without initialization** |
| Can be accessed **in the class** | Can be accessed **only in the method in which it is created** |
| Also called: class variable | Also called: method variable |

## 13.7 Anonymous object, normal object, garbage object

- `new Student().study();` → **anonymous object**: use it **if only one work is required**.
- **Anonymous objects are objects which don't have a reference variable and can be used only once.**
- **Normal object** → when we have to use the object **multiple times**.
- **Garbage objects** are objects which are **not in use**; they do **not have a reference variable**.
- When the work is done, **anonymous objects are garbage objects**.
- The **garbage collector** will remove the unused objects. (The page says "remove instance variable".)

## 13.8 Packages and calling methods (Day 26)

```
src -> com.learn.gradle (package)  ->  class1, class2
package com.learn.gradle;
```

- If a **static method is in a separate class**, call it using `ClassName.methodName();`
- If a **static method is in the same class**, call it as `methodName();`
- If the methods are **non-static**, **create the object of that class** to call them.
- `String res = String.format("%.2f", res);` → marked **Revise**.


## 13.9 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 13.9.1 Java is *always* pass-by-value (very common trap)

```java
static void change(int x)        { x = 100; }         // changes the COPY
static void mutate(int[] arr)    { arr[0] = 100; }    // copy of the REFERENCE → same array object
static void reassign(int[] arr)  { arr = new int[]{999}; }   // only the local copy now points elsewhere
```

| Call | Effect on the caller |
|---|---|
| `change(n)` | none: `n` stays `5` |
| `mutate(a)` | `a[0]` becomes `100` (both references point to the same heap object) |
| `reassign(a)` | none: the caller's `a` still points to the original array |

So you **cannot write a `swap(int a, int b)`** that works in Java.

### 13.9.2 How overloading is resolved (verified)

The compiler tries, in this order: **exact match → widening → boxing → varargs**; within a step, the **most specific** wins.

```java
static void f(long x)    { System.out.println("long"); }
static void f(Integer x) { System.out.println("Integer"); }
static void f(int... x)  { System.out.println("varargs"); }
f(5);                      // long      (widening beats boxing beats varargs)

static void g(Object o) { System.out.println("Object"); }
static void g(String s) { System.out.println("String"); }
g(null);                   // String    (most specific)

static void h(double d) { System.out.println("double"); }
static void h(float d)  { System.out.println("float"); }
h(5);                      // float     (int widens to both; float is more specific)
```
**Overloading by return type alone is not allowed** (the method *signature* is name + parameter types). The notebook's three steps (count, type, order of parameters) are exactly that signature.

### 13.9.3 Parameters vs arguments in one line

`void add(int a, int b)` → **a, b are parameters** (formal). `add(10, 20)` → **10, 20 are arguments** (actual).

### 13.9.4 Where things live in memory

```
STACK (per thread)                         HEAP (shared)
main(): Student s1 [4000] ──────────────►  object at 4000: rollNo=0, name=null
        int years = 3                      (instance variables get DEFAULT values)
```

| Variable kind | Lives in | Default value | Disappears when |
|---|---|---|---|
| Local (including parameters) | stack frame | **none** (must assign) | the method returns |
| Instance | the object on the heap | 0 / false / null | the object is garbage-collected |
| Static | class area | 0 / false / null | the class is unloaded |

### 13.9.5 Objects and the garbage collector (your Day 21 note)

An object becomes **garbage** when no reference points to it. The garbage collector (GC) frees it automatically; you cannot force it (`System.gc()` is only a request).

```java
Student s = new Student();   // object A
s = new Student();           // object A is now unreachable → garbage
new Student().study();       // anonymous object: garbage right after the line
```
Java has no `delete`/`free`; that removes a whole class of C/C++ memory bugs.

### 13.9.6 Overloading vs overriding vs "virtual" polymorphism

| | Overloading | Overriding |
|---|---|---|
| Where | same class | parent and child |
| Signature | **different** parameters | **same** |
| Decided | **compile time** (your "virtual/false" polymorphism) | **run time** (true polymorphism) |
| Needs inheritance | no | yes |

### 13.9.7 Interview questions

| Question | Answer |
|---|---|
| Is Java pass-by-value or pass-by-reference? | Always by value (the value of a reference is copied). |
| Can we overload `main`? | Yes, but the JVM calls only `main(String[])`. |
| Can we overload on return type? | No. |
| Can static methods be overloaded? | Yes. |
| Does an object get deleted when I set the variable to `null`? | It becomes *eligible* for GC when nothing else references it. |

### Complete worked examples *(added by Claude)*

#### Worked Example 14: the `Calculator` overloading example, objects and the three kinds of variables

```java
public class Calculator {
    static int objectsCreated = 0;            // static variable: one copy for the class
    String owner;                             // instance variable: one copy per object

    Calculator(String owner) { this.owner = owner; objectsCreated++; }

    static int add(int a, int b)                { System.out.print("add(int,int) -> ");          return a + b; }
    static double add(double a, double b)       { System.out.print("add(double,double) -> ");    return a + b; }
    static int add(int a, int b, int c)         { System.out.print("add(int,int,int) -> ");      return a + b + c; }
    static String add(String a, int b)          { System.out.print("add(String,int) -> ");       return a + b; }

    void show() {
        int local = 5;                         // local variable: exists only during this call
        System.out.println(owner + " uses a calculator (local=" + local + ", total objects=" + objectsCreated + ")");
    }

    public static void main(String[] args) {
        System.out.println(add(10, 20));
        System.out.println(add(10.5, 20.5));
        System.out.println(add(10, 30.5));     // 10 widens to 10.0
        System.out.println(add(1, 2, 3));
        System.out.println(add("Java", 17));
        char c = 'A';
        System.out.println(add(c, 1));         // char widens to int

        Calculator c1 = new Calculator("Asha");
        Calculator c2 = new Calculator("Ravi");
        Calculator c3 = c1;                    // second reference to the SAME object
        c3.owner = "Asha K";
        c1.show();
        c2.show();
        System.out.println("c1 == c3: " + (c1 == c3) + ", c1 == c2: " + (c1 == c2));
    }
}
```

**Output:**
```text
add(int,int) -> 30
add(double,double) -> 31.0
add(double,double) -> 40.5
add(int,int,int) -> 6
add(String,int) -> Java17
add(int,int) -> 66
Asha K uses a calculator (local=5, total objects=2)
Ravi uses a calculator (local=5, total objects=2)
c1 == c3: true, c1 == c2: false
```

**Explanation:**
- The compiler chooses an overload from the **number**, **types** and **order** of the arguments (your Day 17 rules). `add(10, 30.5)` has no `(int, double)` version, so `10` is widened and `add(double, double)` runs; a `char` widens to `int`, so `add('A', 1)` gives `65 + 1 = 66`.
- This choice happens at **compile time**, which is why your notes call overloading "virtual / false polymorphism".
- `c1` and `c3` refer to one object, so renaming through `c3` changes what `c1.show()` prints; `c2` is a separate object. `objectsCreated` is shared, so both objects report 2.

---

# 14. Strings (Days 17-18)

*Source: `OOPs.pdf`, pages 10-14.*

## 14.1 Strings are immutable (Day 18)

```java
String s1 = "Java";
System.out.println(s1);            // Java
s1.concat("SQL");
System.out.println(s1);            // Java   (unchanged: a new "JavaSQL" is created but not stored)
String s2 = s1.concat("Python");
System.out.println(s1);            // Java
System.out.println(s2);            // JavaPython
```

```
s1 [4000] ──► Java           s2 [6000] ──► JavaPython
              JavaSQL at 5000 (created by concat but no reference)
```

- `s.length()` → for **String** (a method). `arr.length` → for **array** (a variable).
- Other methods listed: `toLowerCase()`, `toUpperCase()`, `indexOf("T")`, `charAt(2)`, `contains("Nest")` → true, `startsWith("Kod")`, `endsWith("logies")`, `equalsIgnoreCase(...)`. (One more method at the bottom is cut off in the photo.)

## 14.2 Different ways of comparing strings (Day 17)

1. `==`
2. `equals()`
3. `equalsIgnoreCase()`
4. `compareTo()`

**With string literals** (same content, one object in the String Pool):

```java
String s1 = "JAVA";
String s2 = "JAVA";
if (s1 == s2) System.out.println("References are same");     // printed: both point to 4000
else          System.out.println("References are not same");
if (s1.equals(s2)) System.out.println("Values are equal");
else               System.out.println("Values are not same");
```

```
STACK                       HEAP
s1 [4000] ─┐                String Pool: 4000 [ JAVA ]
s2 [4000] ─┘
```

**With `new String(...)`** (two separate objects):

```java
String s1 = new String("JAVA");     // 4000
String s2 = new String("JAVA");     // 6000
if (s1 == s2) ...                   // "References are not same"
if (s1.equals(s2)) ...              // "Values are same"
```

**`equalsIgnoreCase`:**

```java
String s1 = "Java SQL Python";
String s2 = "JAVA SQL Python";
if (s1.equalsIgnoreCase(s2)) System.out.println("Value are same after ignoring cases");
```

Reading a single character: `char ch = scan.next().charAt(0);`

**`compareTo()`:**

```
compareTo()  ->  negative : s1 < s2
             ->  0        : both strings are equal
             ->  positive : s1 > s2
```

```java
String s1 = "SACHIN";
String s2 = "SAURAV";
int res = s1.compareTo(s2);
if (res > 0)      // s1 > s2
else if (res < 0) // s2 > s1
else              // s1 == s2
```

It works in **lexical order**: it checks the **Unicode value of characters** (here `'C'` < `'U'`, so the result is negative).

## 14.3 StringBuffer vs StringBuilder

| StringBuffer | StringBuilder |
|---|---|
| Inbuilt class used to create **mutable** strings | Inbuilt class used to create **mutable** strings |
| Default capacity is **16 characters** | Default capacity is **16 characters** |
| This class is **synchronized** | This class is **not synchronized** |
| This class is **thread safe** | This class is **not thread safe** |
| It is **slow** in comparison with StringBuilder | It is **faster** in comparison with StringBuffer |
| It is **not suitable for multithreading** (as written) | It is **suitable for multithreading** (as written) |
| Available **since JDK 1.0** | Available **since JDK 1.5** |

Footer lines: *Synchronized ensures that only one thread tries to access the resource, avoiding conflicts. A Thread is like a small, independent task running inside a program. A Java program runs with at least one thread.*

> **Clarification:** the two "suitable for multithreading" rows look swapped on the page. In practice **`StringBuffer` is the thread-safe one** (use it when several threads modify the same string) and **`StringBuilder` is faster but not thread safe** (use it in single-threaded code or when each thread has its own builder).


## 14.4 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 14.4.1 The String Pool (why `==` sometimes works)

```
String s1 = "JAVA";             String s3 = new String("JAVA");
String s2 = "JAVA";

STACK                    HEAP
s1 ─┐                    ┌── String Pool ──┐
s2 ─┴─► same address ───►│ "JAVA"          │      s3 ──► a SEPARATE "JAVA" object (outside the pool)
                         └─────────────────┘
```

| Expression | Result | Why |
|---|---|---|
| `s1 == s2` | `true` | both literals share one pooled object |
| `s1 == s3` | `false` | `new` always creates a new object |
| `s1.equals(s3)` | `true` | same **characters** |
| `s1 == s3.intern()` | `true` | `intern()` returns the pooled one |

(verified: `new String("hi") == "hi"` is `false`, and `"hi" == s2.intern()` is `true`.)

**Rule: compare Strings with `.equals()` (or `equalsIgnoreCase`), never `==`.**

### 14.4.2 Why Strings are immutable

Your note: `s1.concat("SQL")` does **not** change `s1`; it returns a **new** string (which you threw away). Reasons for immutability: **security** (class names, file paths, DB URLs cannot be changed after checking), **thread safety**, **pooling/caching** (safe to share one object), and a **cached hash code** (fast `HashMap` keys).

Cost: building a string in a loop with `+` creates many temporary objects. Use `StringBuilder`:

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 3; i++) sb.append(i).append(',');
System.out.println(sb);                  // 0,1,2,
StringBuilder x = new StringBuilder("ab");
x.append("c").reverse().insert(0, "X");  // Xcba   (verified)
```

### 14.4.3 The String method toolbox

| Task | Method | Example |
|---|---|---|
| Length | `length()` | `"Java".length()` → 4 (for **arrays** it is the field `arr.length`) |
| Character at index | `charAt(i)` | `"Java".charAt(2)` → `'v'` |
| Search | `indexOf`, `lastIndexOf`, `contains` | `"Nest".contains("es")` |
| Start/end | `startsWith`, `endsWith` | |
| Case | `toUpperCase`, `toLowerCase` | |
| Cut | `substring(from, to)` | `"abcdef".substring(1,4)` → `bcd` |
| Replace | `replace`, `replaceAll(regex)` | |
| Trim | `trim()`, `strip()` | `" x ".strip()` → `x` |
| Split / join | `split(",")`, `String.join(",", a, b)` | `"a,b,c".split(",").length` → 3 |
| Repeat | `repeat(n)` | `"abc".repeat(2)` → `abcabc` |
| Empty? | `isEmpty()`, `isBlank()` | |
| Format | `String.format("%5d|%-5s|%.2f", 42, "ab", 3.14159)` | `   42|ab   |3.14` |

(verified.) **Text blocks** (Java 15+) keep line breaks without `\n`:

```java
String t = """
    Hello
      Block""";
```

### 14.4.4 `compareTo` in numbers

`s1.compareTo(s2)` returns the difference of the first different characters' Unicode values (`"SACHIN"` vs `"SAURAV"` → `'C'(67) - 'U'(85) = -18`). If one is a prefix of the other, it returns the **length difference**. Sign is what matters: negative / 0 / positive.

### 14.4.5 StringBuffer vs StringBuilder (cleaned up)

| | `String` | `StringBuffer` | `StringBuilder` |
|---|---|---|---|
| Mutable? | **No** | Yes | Yes |
| Thread safe? | Yes (immutable) | **Yes** (synchronized) | **No** |
| Speed | slow if you concatenate in loops | slower | **fastest** |
| Since | 1.0 | 1.0 | 1.5 |
| Use for | constants, keys | strings changed by **several threads** (rare) | strings changed by **one thread** (most cases) |

### 14.4.6 Interview questions

| Question | Answer |
|---|---|
| Why is `String` immutable? | Security, thread safety, pool sharing, cached hash. |
| `==` vs `equals` for Strings? | `==` compares references, `equals` compares content. |
| How many objects: `String s = new String("a");`? | Up to 2: the pooled literal `"a"` and the new heap object. |
| What is `intern()`? | Returns the canonical pooled instance. |
| `StringBuilder` vs `StringBuffer`? | Same API; Buffer is synchronized and slower. |
| Is `+` in a loop bad? | Yes, creates many temporary objects; use `StringBuilder`. |

### Complete worked examples *(added by Claude)*

#### Worked Example 15: immutability, the four ways of comparing strings, and `StringBuilder` vs `StringBuffer`

```java
public class Program {
    public static void main(String[] args) {
        String s = "java";
        String t = s.concat(" rocks");                // returns a NEW string
        s.toUpperCase();                              // result ignored: s does not change
        System.out.println("s = " + s + ", t = " + t);

        String s1 = "Ritik", s2 = "Ritik", s3 = new String("Ritik"), s4 = "ritik";
        System.out.println("s1 == s2           : " + (s1 == s2) + "   (same object in the String pool)");
        System.out.println("s1 == s3           : " + (s1 == s3) + "  (new String creates a separate object)");
        System.out.println("s1.equals(s3)      : " + s1.equals(s3) + "   (same characters)");
        System.out.println("equalsIgnoreCase   : " + s1.equalsIgnoreCase(s4));
        System.out.println("compareTo          : " + "apple".compareTo("banana") + ", " + "b".compareTo("a") + ", " + s1.compareTo(s3));

        StringBuilder sb = new StringBuilder("Java");
        sb.append(" 17").insert(0, "I love ").reverse();
        System.out.println("StringBuilder      : " + sb + " (capacity grows automatically, length " + sb.length() + ")");
        StringBuffer buf = new StringBuffer("abc");
        buf.append("def").deleteCharAt(0).replace(0, 2, "XY");
        System.out.println("StringBuffer       : " + buf);

        String word = "Programming";
        int vowels = 0;
        for (char ch : word.toLowerCase().toCharArray()) if ("aeiou".indexOf(ch) >= 0) vowels++;
        System.out.println(word + ": length " + word.length() + ", vowels " + vowels + ", reversed " + new StringBuilder(word).reverse()
                + ", palindrome? " + word.equalsIgnoreCase(new StringBuilder(word).reverse().toString()));
    }
}
```

**Output:**
```text
s = java, t = java rocks
s1 == s2           : true   (same object in the String pool)
s1 == s3           : false  (new String creates a separate object)
s1.equals(s3)      : true   (same characters)
equalsIgnoreCase   : true
compareTo          : -1, 1, 0
StringBuilder      : 71 avaJ evol I (capacity grows automatically, length 14)
StringBuffer       : XYdef
Programming: length 11, vowels 3, reversed gnimmargorP, palindrome? false
```

**Explanation:**
- A `String` can never change. `concat` and `toUpperCase` return **new** strings; calling them without saving the result does nothing (Day 18).
- `==` compares **addresses**: two literals share one pooled object, while `new String(...)` always makes a new one. `equals` compares **content**, `equalsIgnoreCase` ignores case, and `compareTo` gives the dictionary order (negative, zero or positive), matching your Day 17 list of comparison methods.
- `StringBuilder` and `StringBuffer` are **mutable**: methods change the same object and can be chained. `StringBuffer` is synchronized (thread-safe, slower); `StringBuilder` is the default choice.

---

# 15. Classes, Constructors, Encapsulation (Days 29-30)

*Source: `OOPs.pdf`, pages 15-22.*

## 15.1 Class and object (Day 29)

```
+----------------+
| Student        |
| roll           |
| name           |
| marks          |
+----------------+
| study()        |
| info()         |
+----------------+
```

```java
class Student {
    int roll;                       // data members or instance variables
    String name;
    double marks;

    void study() { System.out.println(name + " is studying"); }       // member functions
    void info()  { System.out.println(roll); System.out.println(name); System.out.println(marks); }

    Student() { }                                                     // 0-parameterized constructor
    Student(int roll, String name, double marks) {                    // parameterized constructor
        this.roll = roll;
        this.name = name;
        this.marks = marks;
    }
}
class StudentApp {
    public static void main(String[] args) {
        Student s1 = new Student();
        s1.roll = 13;  s1.name = "Ritik";  s1.marks = 92.5;
        s1.study();  s1.info();
        Student s2 = new Student(15, "Rohan", 93.4);
        s2.study();  s2.info();
    }
}
```

- A **class is a blueprint of an object** which consists of **properties (data members)** and **behaviours (member functions)** of an object.
- An **object is the programming representation of the class**, and its memory is allocated in the **heap section/segment**.
- Java is an OOP language, which means **every element in Java is represented as a class & object**.
- As it is an OOP language, it follows the OOP principles: **i) Encapsulation, ii) Inheritance, iii) Polymorphism, iv) Abstraction.**

## 15.2 Encapsulation

- **Encapsulation is the process of binding the data members with the member functions.**
- A **Java class is a basic fundamental example of encapsulation** (scope: class).

```java
class Employee {
    int empId;                  // data members
    String empName;
    void info() {               // member function
        System.out.println(empId);
        System.out.println(empName);
    }
}
```

- **Encapsulation is also the process of providing security to the data members present in a class** (`private`, i.e. **controlled access**).

```java
class Bank {
    // providing security
    private int money = 1000;       // restrict `money` variable outside the Bank class
}
```

```java
class Hero    { main { Bank b = new Bank(); System.out.println(b.money); /* Error */ } }
class Villain { main { Bank b = new Bank();
                       System.out.println(b.money);   // Error
                       b.money = 0;                    // Error
                       System.out.println(b.money); }  // Error
              }
```

**Encapsulation → providing security → controlled access using getter & setter.**
**Getter** = get the value of a data member. **Setter** = set the value to the data member.

```java
class Bank {
    private int money = 1000;
    private int key = 1234;

    public void setHeroMoney(int key, int amount) {
        if (key == 1234) {
            money = amount;
            System.out.println("Deposited money " + amount);
        } else {
            System.out.println("Invalid");
            return;
        }
    }
    public int getHeroMoney(int key) {
        if (key == 1234) {
            return money;
        } else {
            System.out.println("Invalid");
            return -1;
        }
    }
}
class Hero {
    public static void main(String[] args) {
        Bank b = new Bank();
        int key = 1234;
        b.money = 15000;                               // error
        System.out.println(b.money);                   // error
        b.setHeroMoney(key, 1500);                     // Deposited money 1500   (the page's number is hard to read)
        System.out.println(b.getHeroMoney(key));       // 1500
    }
}
```

## 15.3 Encapsulated Student with getters (Day 30)

```java
class Student {
    private int roll;
    private String name;
    private double marks;

    public Student(int roll, String name, double marks) {
        this.roll = roll;  this.name = name;  this.marks = marks;
    }
    public int getRoll()        { return roll; }
    public String getName()     { return name; }
    public double getMarks()    { return marks; }
}
class StudentApp {
    public static void main(String[] args) {
        Student s1 = new Student(13, "Ritik", 98.5);
        // System.out.println(s1.roll); s1.name; s1.marks;   // Error: private
        System.out.println(s1.getRoll());
        System.out.println(s1.getName());
        System.out.println(s1.getMarks());
    }
}
```

The heap object at 4000 holds `roll = 13`, `name = Ritik`, `marks = 98.5`, and `s1` on the stack holds `4000`.


## 15.4 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 15.4.1 Class, object, reference: a picture

```
class Student          ← blueprint (written once)
   int roll; String name; double marks;
   void study()

new Student(13,"Ritik",98.5)   ← a real object built from the blueprint, lives on the HEAP
Student s1 = ...               ← s1 is just a remote control (reference) kept on the STACK
```
Several references can point to **one** object (`Student s2 = s1;`: no copy is made).

### 15.4.2 The four kinds of constructors

| Kind | Example | Notes |
|---|---|---|
| **Default** (compiler-made) | *(nothing written)* | Only exists if you wrote **no** constructor at all |
| **No-arg** (0-parameterized) | `Student() {}` | Your notebook's `student()` |
| **Parameterized** | `Student(int roll, String name, double marks)` | Your notebook uses `this.roll = roll;` |
| **Copy** (by convention) | `Student(Student other)` | Copies fields from another object |

Once you write **any** constructor, Java no longer adds the default one.

### 15.4.3 What `this` means

`this` = "the object that is running this code". It solves **shadowing**: when a parameter has the same name as a field.

```java
Student(int roll) {
    roll = roll;        // BUG: assigns the parameter to itself, the field stays 0
    this.roll = roll;   // correct: field = parameter
}
```
Other uses: `this()` calls another constructor of the same class (must be the **first** line); `return this;` enables method chaining (builders).

### 15.4.4 Encapsulation: the three-step recipe

1. Make fields **`private`** → nobody can touch them directly (your `Bank.money` example).
2. Give **public getters** to read them (`getRoll()`).
3. Give **public setters** only where changing is allowed, and **validate**:

```java
private double marks;
public void setMarks(double marks) {
    if (marks < 0 || marks > 100) throw new IllegalArgumentException("marks must be 0-100");
    this.marks = marks;
}
```
Benefit: you can change the internals later (e.g. store marks as an `int`) without breaking any code that calls `getMarks()`. In your notebook the `key` check in `setHeroMoney(int key, int amount)` is a (simplified) validation inside a setter.

### 15.4.5 POJO, JavaBean and `record`

| Term | Meaning |
|---|---|
| **POJO** | "Plain Old Java Object": a simple class with fields + getters/setters (your Spring/Hibernate entities) |
| **JavaBean** | A POJO with a no-arg constructor, private fields, getters/setters |
| **`record`** (Java 16+) | One line gives you private final fields, constructor, getters, `equals`, `hashCode`, `toString` |

```java
record Student(int roll, String name, double marks) {}
Student s = new Student(3, "Asha", 92.5);
s.name();          // accessor (no "get" prefix)
System.out.println(s);   // Student[roll=3, name=Asha, marks=92.5]   (verified)
```
Records are **immutable**: ideal for DTOs and Map keys.

### 15.4.6 `toString`, `equals`, `hashCode`: the three methods every class should think about

| Method | Default (from `Object`) | Override when |
|---|---|---|
| `toString()` | `ClassName@hexHash` (that is what your `println(al)` printed) | You want readable output |
| `equals(Object)` | same reference only | Two objects with the same data should be "equal" |
| `hashCode()` | based on identity | **Always** override together with `equals` |

### 15.4.7 Interview questions

| Question | Answer |
|---|---|
| Class vs object? | Class = blueprint; object = instance in the heap. |
| What are the four OOP pillars? | Encapsulation, inheritance, polymorphism, abstraction. |
| Can a constructor be `private`? | Yes (Singleton, factory methods, utility classes). |
| Can a constructor return a value? | No: it has no return type. |
| What is a default constructor? | The no-arg one the compiler adds if you wrote none. |
| What is encapsulation in one line? | Hiding data (`private`) and exposing controlled access (getters/setters). |
| Encapsulation vs abstraction? | Encapsulation = **how** data is protected; abstraction = **what** is shown, hiding details. |

### Complete worked examples *(added by Claude)*

#### Worked Example 16: `Bank`, `Hero` and `Villain`: encapsulation with key-protected getters and setters

```java
public class Program {
    static class Bank {
        private int money = 1000;                 // hidden: no class outside Bank can touch it directly
        private final int key = 1234;

        public void setHeroMoney(int key, int amount) {
            if (key != this.key) { System.out.println("  Invalid key, deposit refused"); return; }
            if (amount < 0) { System.out.println("  Negative amount refused"); return; }
            money = amount;
            System.out.println("  Deposited money " + amount);
        }

        public int getHeroMoney(int key) {
            if (key != this.key) { System.out.println("  Invalid key"); return -1; }
            return money;
        }
    }

    static class Student {
        private final int id;
        private String name;
        Student(int id, String name) { this.id = id; setName(name); }    // constructor uses the setter's validation
        public int getId() { return id; }
        public String getName() { return name; }
        public void setName(String name) {
            if (name == null || name.isBlank()) throw new IllegalArgumentException("name required");
            this.name = name.trim();
        }
    }

    public static void main(String[] args) {
        Bank b = new Bank();
        System.out.println("Hero:");
        b.setHeroMoney(1234, 15000);
        System.out.println("  Hero sees " + b.getHeroMoney(1234));
        System.out.println("Villain:");
        b.setHeroMoney(1111, 0);
        System.out.println("  Villain sees " + b.getHeroMoney(1111));
        System.out.println("  money is still " + b.getHeroMoney(1234));
        // b.money = 0;   // compile error: money has private access in Bank

        Student s = new Student(1, "  Asha ");
        System.out.println("Student " + s.getId() + " name [" + s.getName() + "]");
        try {
            s.setName("");
        } catch (IllegalArgumentException e) {
            System.out.println("setName(\"\") rejected: " + e.getMessage());
        }
    }
}
```

**Output:**
```text
Hero:
  Deposited money 15000
  Hero sees 15000
Villain:
  Invalid key, deposit refused
  Invalid key
  Villain sees -1
  money is still 15000
Student 1 name [Asha]
setName("") rejected: name required
```

**Explanation:**
- `money` is `private`, so `b.money = 0` in `Hero` or `Villain` does not even compile (the "Error" lines in your notes). The only way in is through the public methods.
- The setter and getter check the key, so the Villain's wrong key is refused and the balance stays 15000: **controlled access**, which is the security your notes describe.
- `id` has a getter but no setter (read-only after construction), and the constructor reuses the setter's validation so a `Student` can never hold a blank name.

---

# 16. Inheritance (Days 30-33)

*Source: `OOPs.pdf`, pages 23-40.*

## 16.1 What is inheritance?

- **Inheritance is a process of inheriting or acquiring the properties and behaviours of one class into another class.**
- In Java, inheritance is achieved using the **`extends`** keyword.
- The class which **gives** properties & behaviours is the **parent class**; the class which **takes** them is the **child class**.
- **Parent class** is also called **super class** or **base class**.
- **Child class** is also called **derived class** or **sub class**.

```
Parent
 eyeColor
 foodBusiness()
     ^   (is-a) extends
Child
```

```java
class Parent {
    String eyeColor = "Blue";
    void foodBusiness() { System.out.println("Chinese Restaurant"); }
}
class Child extends Parent { }

class ParentChildApp {
    public static void main(String[] args) {
        Parent p = new Parent();
        System.out.println(p.eyeColor);
        p.foodBusiness();
        Child c = new Child();
        System.out.println(c.eyeColor);       // inherited
        c.foodBusiness();                     // inherited
    }
}
```

## 16.2 Types of inheritance

| Type | Meaning | Example |
|---|---|---|
| **Single level** | **One parent class is inherited by one child class.** | `Program2 extends Program1` |
| **Multi-level** | A class is inherited by its child class & the child class is again inherited by its child class. | `Program3 extends Program2`, `Program2 extends Program1` |
| **Hierarchical** | One parent with several children. | `Program2 extends Program1`, `Program3 extends Program1` |
| **Hybrid** (Day 31) | **Single level + multi-level + hierarchical** combined. | `Program2` and `Program3` extend `Program1`; `Program4` extends `Program3` |
| **Multiple** | A child class inherits from **multiple parent classes**. | Not allowed with classes in Java (see below). |
| **Cyclic** | `Program1` extends `Program2` and `Program2` extends `Program1`. | **Not allowed in Java.** |

### Multiple inheritance and the diamond problem

```
              Object
             /      \
   Program1          Program2          (both have display())
   display()         display()
             \      /
              Program3                 (fun())
```

> **In Java, multiple inheritance is not allowed using classes** because by default every class in Java has the **Object class** as its parent. Hence it will lead to the **diamond shape problem**, due to which multiple inheritance is not allowed using classes.
> **But in Java multiple inheritance can be achieved using interfaces**, because **interfaces do not have any default parent.** (See [section 19](#19-abstraction-abstract-classes-and-interfaces-days-39-42).)

### Types of methods in inheritance

| Method kind | Meaning |
|---|---|
| **Inherited method** | Inherited from parent class to the child class; the child class uses it **without modification**. |
| **Overridden method** | Inherited from the parent class to the child class, but the child class **modifies the method body** according to the requirement. |
| **Child specific method** | Present **only inside the child class** and **not present inside the parent class**. |

### Hierarchical example from the notes

```
                Developer
          project(), attendMeeting()
         /            |             \
   JavaDev          SQLDev          PythonDev
   learnJava()      learnSQL()      learnPython()
   project()        project()       project()
```

## 16.3 Constructor chaining in inheritance (Day 32)

```java
class Object { Object() { } }                       // (conceptual)

class Parent extends Object {
    void dispParent() { System.out.println("Inside Parent disp"); }
    Parent() { super(); }
}
class Child extends Parent {
    void dispChild() { System.out.println("Inside Child disp"); }
    Child() { super(); }
}
class ParentChildApp extends Object {
    public static void main(String[] args) {           // JVM calls main
        Parent p = new Parent();
        p.dispParent();
        Child c = new Child();
        c.dispChild();
        c.dispParent();
    }
    ParentChildApp() { super(); }
}
```

**Five points written in the notes:**

1. During program execution, the **Object class code will be attached** in the program.
2. If any class is **not extending any other class**, then that class will be **extending the Object class**.
3. If any class's **constructor is not available**, then **JVM will provide a default constructor (0-parameter constructor)**.
4. **Every constructor will have the `super()` method present in the first line.** Its responsibility is to **take the control from the child class constructor to its parent class constructor.**
5. While creating an object of a class, **its parent class constructor is always executed.**

> **Constructor chaining = the process of invoking a constructor from another constructor.** It can be achieved using the **`super()`** and **`this()`** methods.
> - **`super()`** takes control from the **child class constructor to its parent class constructor.**
> - **`this()`** takes control from **one constructor to another constructor present inside the same class.**

### Vehicle / Car example

```
Vehicle (color)
    ^
Car (brand)

c1 [4000] -> color = black, brand = Kia
c2 [6000] -> color = black, brand = tata   (page shows "tata"; see the Car(String) call below)
```

```java
class Vehicle extends Object {
    String color;
    Vehicle() { super(); }
    Vehicle(String color) {
        this();
        this.color = color;
    }
}
class Car extends Vehicle {
    String brand;
    Car() { this("Kia"); }
    Car(String brand) {
        super("Black");
        this.brand = brand;
    }
}
class VehicleApp {
    public static void main(String[] args) {
        Car c1 = new Car();
        System.out.println(c1.color);
        System.out.println(c1.brand);
        Car c2 = new Car();            // as written on the page
        System.out.println(c2.color);
        System.out.println(c2.brand);
    }
}
```

> **Writing multiple constructors inside the same class → constructor overloading.**

> **Verified by running it:** `new Car()` calls `Car()` → `this("Kia")` → `Car(String)` → `super("Black")` → `Vehicle(String)` → `this()` → `Vehicle()` → `super()` → `Object()`. Output order: `V()`, `V(String)`, `C(String)`, `C()`, and `c.color = Black`, `c.brand = Kia`. To get brand `tata` for `c2`, call `new Car("tata")`.

## 16.4 `this` and `super` summary (Day 33)

Day 33 example: `Robot` (`change()`, `talk()`, `work()`) is the parent, extended ("is-a") by `TeacherRobot` (`teach()`, `work()`) and `DoctorRobot` (`surgery()`, `work()`).

| Item | Use |
|---|---|
| **`@Override`** | to represent an **overridden method**. An **annotation** is the mechanism to provide **extra information about the component**. |
| **`this` variable** | **removing shadowing** |
| **`super` variable** | **accessing parent class variable** |
| **`this()` method** | **constructor chaining in the same class** |
| **`super()` method** | **constructor chaining between child class and parent class** |

```java
class Program1 {
    int a = 10;
    void disp() { System.out.println(a); }                   // 10
}
class Program2 extends Program1 {
    int a = 55;
    void disp() { System.out.println(a);                     // 55
                  System.out.println(super.a); }             // 10
}
class Program3 extends Program2 {
    int a = 99;
    void disp() { System.out.println(a);                     // 99
                  System.out.println(super.a);               // 55
                  System.out.println(super.super.a); }       // error
}
public class ProgramApp {
    public static void main(String[] args) {
        Program1 p1 = new Program1();  p1.disp();
        Program2 p2 = new Program2();  p2.disp();
    }
}
```

## 16.5 `final` keyword

| Applied to | Effect |
|---|---|
| **class** | to **prevent inheritance** |
| **method** | to **prevent method overriding** |
| **variable** | to **create constants** |

```java
final class Program1 { }
class Program2 extends Program1 { }            // error

class Program1 { final void disp() { System.out.println("Inside program1 disp"); } }
class Program2 extends Program1 { void disp() { } }     // error: cannot override the final method

class Program1 {
    final int a = 10;
    void changeValue() {
        System.out.println(a);
        a = 99;                                // error: can't change the value of a final variable
    }
}
```

## 16.6 Access modifiers

1. **Public**   2. **Protected**   3. **Default** (no access modifier)   4. **Private**

| Modifier | Accessible |
|---|---|
| **public** | **anywhere** |
| **protected** | **anywhere in the same package & in a child class of a different package using inheritance** |
| **default** | **anywhere in the same package** |
| **private** | **anywhere in the same class** |

```java
package P1;
public class Program1 {
    public int a = 10;
    protected int b = 20;
    int c = 30;
    private int d = 40;
    void display1() { System.out.println(a); System.out.println(b); System.out.println(c); System.out.println(d); }
}

package P1;
public class Program2 extends Program1 {
    void display2() { a; b; c;   /* d → error */ }
}
package P1;
public class Program3 {
    void display3() {
        Program1 p1 = new Program1();
        p1.a; p1.b; p1.c;        // OK in same package
        // p1.d                  // error
    }
}

package P2;
import P1.Program1;
public class Program4 extends Program1 {
    void display4() { a; b;      // OK (public, protected via inheritance)
                      /* c → error, d → error */ }
}
package P2;
import P1.Program1;
public class Program5 {
    void display5() {
        Program1 p1 = new Program1();
        p1.a;                    // OK (public)
        // p1.b  p1.c  p1.d      // all errors
    }
}
```

Package layout drawn: **P1** has Program1, Program2, Program3; **P2** has Program4, Program5.


## 16.7 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 16.7.1 IS-A vs HAS-A (when should I inherit?)

| Relationship | Meaning | Java |
|---|---|---|
| **IS-A** | `JavaDev` **is a** `Developer` | `extends` (inheritance) |
| **HAS-A** | `Car` **has an** `Engine` | a **field** of that type (composition) |

> Inherit only for a real IS-A. For code reuse prefer **composition** ("composition over inheritance"), because inheritance couples the child tightly to the parent.

### 16.7.2 What a child gets (and does not get)

| Parent member | Child inherits it? |
|---|---|
| `public` / `protected` fields and methods | Yes |
| default (package-private) | Only if the child is in the **same package** |
| `private` | **No** (exists in the object but is not accessible) |
| Constructors | **No** (a child calls them with `super(...)`) |
| `static` methods | Accessible, but **hidden** not overridden |

### 16.7.3 Object creation order: a verified trace

```java
class Par { static {…"1"}  {…"3"}  Par(){…"4"; show();} }
class Chi extends Par { static {…"2"}  int v = 7;  {…"5"}  Chi(){…"6"} void show(){ print(v) } }
new Chi();
```
Output (verified):
```
1 Parent static
2 Child static
3 Parent instance block
4 Parent constructor
Child.show v=0          ← the child's override ran BEFORE the child's fields were assigned!
5 Child instance block
6 Child constructor
```

**Order:** static blocks (parent then child, once, at class load) → parent instance blocks/field initializers → parent constructor → child instance blocks/field initializers → child constructor.
**Trap:** never call an overridable method from a constructor: the child's version sees default values (`v = 0`).

### 16.7.4 Constructor chaining, step by step (your Vehicle/Car example, verified)

`new Car()` runs this call chain:

```
Car()  →  this("Kia")  →  Car(String brand)  →  super("Black")  →  Vehicle(String color)
                                                                    →  this()  →  Vehicle()  →  super()  →  Object()
Then it unwinds:   Object done → Vehicle() body → Vehicle(String) body (color = "Black")
                   → Car(String) body (brand = "Kia") → Car() body
```
Printed order was `V()`, `V(String)`, `C(String)`, `C()`, and the result `Black Kia`.

Rules to remember: `this(...)` and `super(...)` must be the **first statement**; you cannot use **both** in one constructor; if you write neither, the compiler inserts `super();`; if the parent has **no no-arg constructor** the child **must** call `super(args)` explicitly.

### 16.7.5 Field hiding vs method overriding (verified)

```java
class Par { String name = "P"; void show() {…} }
class Chi extends Par { String name = "C"; void show() {…} }
Par p = new Chi();
p.name              // "P"   fields are NOT polymorphic: the reference type decides
((Chi) p).name      // "C"
p.show()            // Child's version: methods ARE polymorphic: the object type decides
```
Your notebook's `Program3` with `a = 99`, `super.a = 55`, `super.super.a` (error) is the same idea: `super.` reaches only **one** level up.

### 16.7.6 Multiple inheritance: why classes cannot, interfaces can

Two parent classes both having `display()` → "which one does the child inherit?" (the **diamond problem**). Interfaces escape this because (before Java 8) they had **no bodies**. Since Java 8, if two interfaces have the same `default` method, the class **must** override it and may choose:

```java
interface A { default String hi() { return "A"; } }
interface B { default String hi() { return "B"; } }
class AB implements A, B {
    public String hi() { return A.super.hi() + B.super.hi(); }   // "AB"   (verified)
}
```

### 16.7.7 Access modifiers: the complete table

| Modifier | Same class | Same package | Subclass (other package) | Anywhere |
|---|---|---|---|---|
| `private` | yes | no | no | no |
| default (no keyword) | yes | yes | no | no |
| `protected` | yes | yes | **yes, through inheritance only** | no |
| `public` | yes | yes | yes | yes |

Why `Program5` in your example could not read `p1.b`: `protected` outside the package works **only on `this`/a subclass object**, not through a `new Program1()` reference.

### 16.7.8 `final` in depth

| On | Meaning | Examples |
|---|---|---|
| variable | assign **once** | `final int a = 10;` (for objects, the **reference** is fixed, the contents may change) |
| method | cannot be overridden | |
| class | cannot be extended | `String`, `Integer`, all wrapper classes |
| parameter | cannot be changed inside the method | |

`static final` = a constant (`Math.PI`), named in `UPPER_SNAKE_CASE`.

### 16.7.9 The `Object` class: the root of everything

Every class (without `extends`) secretly extends `Object` (your Day 32 rule 2). It gives: `toString()`, `equals()`, `hashCode()`, `getClass()`, `clone()`, `finalize()` (deprecated), and `wait()/notify()/notifyAll()` (used in threads).

### 16.7.10 Interview questions

| Level | Question | Answer |
|---|---|---|
| Basic | Why no multiple inheritance with classes? | Diamond problem (ambiguity); use interfaces. |
| Basic | What does `super` do? | Refers to the parent: `super.x`, `super.method()`, `super(...)` constructor. |
| Basic | Are constructors inherited? | No. |
| Mid | What if the parent has no default constructor? | The child must call `super(args)` explicitly. |
| Mid | Can we override `private`/`static`/`final` methods? | No (private not visible; static is hidden; final forbidden). |
| Mid | Order of initialization? | Static → parent instance/constructor → child instance/constructor. |
| Advanced | Composition vs inheritance? | HAS-A (flexible, loosely coupled) vs IS-A (tightly coupled); prefer composition. |
| Advanced | Why is `protected` access through a reference different across packages? | To stop unrelated code reaching internals through an instance. |

### Complete worked examples *(added by Claude)*

#### Worked Example 17: `Vehicle` → `Car`: constructor chaining, multilevel inheritance and `final`

```java
public class VehicleApp {
    static class Vehicle {
        String color;
        Vehicle() { this("White"); System.out.println("  Vehicle() done"); }
        Vehicle(String color) { super(); this.color = color; System.out.println("  Vehicle(String) color=" + color); }
        void start() { System.out.println("  Vehicle starts"); }
        final void showColor() { System.out.println("  colour is " + color); }      // cannot be overridden
    }

    static class Car extends Vehicle {
        String brand;
        Car() { this("Kia"); System.out.println("  Car() done"); }
        Car(String brand) { super("Black"); this.brand = brand; System.out.println("  Car(String) brand=" + brand); }
        @Override void start() { super.start(); System.out.println("  " + brand + " car engine starts"); }
    }

    static class ElectricCar extends Car {                         // multilevel: Vehicle ← Car ← ElectricCar
        ElectricCar() { super("Tata"); System.out.println("  ElectricCar() done"); }
        @Override void start() { System.out.println("  silent electric start"); }
    }

    public static void main(String[] args) {
        System.out.println("new Car():");
        Car c = new Car();
        c.start();
        c.showColor();
        System.out.println("new ElectricCar():");
        ElectricCar e = new ElectricCar();
        e.start();
        e.showColor();
        System.out.println("ElectricCar is a Vehicle? " + (e instanceof Vehicle));
    }
}
```

**Output:**
```text
new Car():
  Vehicle(String) color=Black
  Car(String) brand=Kia
  Car() done
  Vehicle starts
  Kia car engine starts
  colour is Black
new ElectricCar():
  Vehicle(String) color=Black
  Car(String) brand=Tata
  ElectricCar() done
  silent electric start
  colour is Black
ElectricCar is a Vehicle? true
```

**Explanation:**
- `new Car()` runs `Car()` → `this("Kia")` → `Car(String)` → `super("Black")` → `Vehicle(String)` → `super()` → `Object()`. Constructors **finish in reverse order**, so the parent's line prints first: the parent part of an object is always built before the child part.
- `super("Black")` chooses the parent constructor explicitly; if a constructor names neither `this(...)` nor `super(...)`, the compiler inserts `super()` as its first line.
- `Car.start()` extends the parent behaviour with `super.start()`; `ElectricCar.start()` replaces it entirely.
- `showColor()` is `final`, so subclasses inherit it but cannot override it.

---

# 17. Method Overriding, Polymorphism, Casting (Days 34-35)

*Source: `OOPs.pdf`, pages 41-51.*

## 17.1 Visibility order (Day 34)

```
visibility ↑  /  accessibility ↑      public
                                       protected
                                       default           security ↑ going down
                                       private
```

**Method overriding** is the process of **inheriting a method from the parent class to the child class and modifying its body according to the child class requirement.**

## 17.2 Method overloading vs method overriding

| Method overloading | Method overriding |
|---|---|
| Process of creating **multiple methods having the same name inside the same class with different parameters** | Process of **overriding the method from the parent class to the child class** |
| Supports **compile-time polymorphism** | **Run-time polymorphism** |
| Happens in the **same class** | Happens in the **parent & child class** |
| To achieve it, **inheritance is not needed** | To achieve it, **inheritance is required** |
| Overloaded methods should have **different parameters** | Overridden methods should have the **same parameters** |

## 17.3 Rules of method overriding

**Rule 1:** The **access modifier** of the parent class method and the child class overridden method **must be the same**. If it is different, it gives an error. *(Refined by Rule 2 below.)*

```java
class Program1 { public void display() { System.out.println("Program1 display"); } }
class Program2 extends Program1 { @Override public void display() { System.out.println("Program2 display"); } }
class Program3 extends Program1 { @Override void display() { ... } }     // error (default is weaker than public)
```

**Rule 2:** The access modifier can be different **if the visibility or accessibility of the overridden method is increased**, but if it is **decreased** then it is **not allowed**.

```java
class P1 { protected void d() { System.out.println("P1"); } }
class P2 extends P1 { @Override public void d() { System.out.println("P2"); } }     // visibility increased: OK
class P3 extends P1 { @Override void d() { System.out.println("P3"); } }            // error, visibility is decreased
```

(The page writes the P3 method name as `display()`; it should be `d()` to match `P1`.)

**Rule 3:** If the parent class method is **private**, we **cannot inherit** it. *(This rule is applicable only for public, protected and default.)*

**Rule 4:** The **return type** of the parent class method and the child class overridden method **must be the same**.

```java
class P1 { int d1() { return 20; } }
class P2 extends P1 { int d1() { return 10; } }      // OK (the page names it d2; unclear)
class P3 extends P1 { void d1() { } }                // error
```

**Rule 5: Co-variant return type.** The parent class method return type and the child class overridden method return type **can be different provided they are co-variant return types.**

> **Co-variant return types** are return types which have an **"is-a" relationship** between them. They should have **inheritance**.

```java
class Parent { }
class Child extends Parent { }

class P1 { Parent d1() { Parent pr = new Parent(); return pr; } }
class P2 extends P1 { Parent d1() { Parent pr = new Parent(); return pr; } }
class P3 extends P1 { Child d1() { Child ch = new Child(); return ch; } }        // co-variant: Child is-a Parent
```

(Overriding with exceptions is in [section 11.2](#112-rules-for-exceptions-when-overriding-methods).)

## 17.4 Upcasting

> **Upcasting** → the process of **creating child objects & assigning them to the parent-type reference variable.**

```
          Teacher
       teach(), project()
        ^              ^
 JavaTeacher        SQLTeacher
 (ref → 4000)       (st → 6000)
```

```java
class TeacherApp {
    public static void main(String[] args) {
        Teacher ref;
        JavaTeacher jt = new JavaTeacher();
        ref = jt;                    // upcasting
        ref.teach();
        ref.project();
        SQLTeacher st = new SQLTeacher();
        ref = st;                    // upcasting
        ref.teach();
        ref.project();
    }
}
```

The page marks this with **"1 : Many"** (one parent reference, many child objects).

## 17.5 Polymorphism

> **Polymorphism is the process of achieving a 1 : many relationship in the program.** We can achieve polymorphism using **method overriding & upcasting**.
> **Advantage of polymorphism = code flexibility**, which means using a **parent-type reference, the method of a child class can be invoked.**

### Polymorphic program (Day 35)

```java
Teacher ref;
ref = new JavaTeacher();        // upcasting
Teacher ref = new JavaTeacher;  // same idea in one line  -> "polymorphic program with code reducability" (as written; likely "reusability")

class Teacher     { void teach() { } void project() { } }
class JavaTeacher extends Teacher { void teach() { } void project() { } }
class SQLTeacher  extends Teacher { void teach() { } void project() { } }

class TeacherApp {
    public static void teacherMethod(Teacher ref) {
        ref.teach();
        ref.project();
    }
}
class Main {
    public static void main(String[] args) {
        JavaTeacher jt = new JavaTeacher();
        SQLTeacher  st = new SQLTeacher();
        teacherMethod(jt);       // ref = jt
        teacherMethod(st);
    }
}
```

## 17.6 Downcasting and `instanceof`

```
             Developer
        project(), attendMeeting()
        ^                        ^
 BackendDeveloper         FrontendDeveloper
 bdTeam(), project()      fdTeam(), project()
```

> **Downcasting** → the process of **converting the parent-type reference to the child level for invoking the child-specific method.** (`cast` → convert.)
> **`instanceof` operator** → `dev instanceof BackendDev` checks **which class the reference variable `dev` belongs to.**

```java
class DevApp {
    public static void main(String[] args) {
        Developer dev;
        BackendDev bd = new BackendDev();
        dev = bd;
        dev.attendMeeting();                        // can call inherited method
        dev.project();                              // can call overridden method
        // dev.bdTeam();                            // cannot call child-specific method
        ((BackendDev) dev).bdTeam();                // downcasting

        FrontendDev fd = new FrontendDev();
        dev = fd;
        dev.attendMeeting();
        dev.project();
        ((FrontendDev) dev).fdTeam();               // (page writes bdTeam here; it should be the frontend's own method)
    }
}
```

**OR, using a method with `instanceof`:**

```java
public class DevApp {
    public static void main(String[] args) {
        BackendDev bd = new BackendDev();
        FrontendDev fd = new FrontendDev();
        devMethods(bd);
        devMethods(fd);
    }
    public static void devMethods(Developer dev) {
        dev.attendMeeting();
        dev.project();
        if (dev instanceof BackendDev) {
            ((BackendDev) dev).bdTeam();
        } else {
            ((FrontendDev) dev).fdTeam();
        }
    }
}
```


## 17.7 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 17.7.1 Polymorphism: "one reference, many forms"

```java
Teacher ref;                       // a PARENT reference
ref = new JavaTeacher();  ref.teach();    // runs JavaTeacher.teach()
ref = new SQLTeacher();   ref.teach();    // runs SQLTeacher.teach()   ← same line of code, different behaviour
```

| Kind | Also called | Decided by | How you get it |
|---|---|---|---|
| **Compile-time** | static, "virtual/false" | the **compiler**, from the **parameter list** | method overloading |
| **Run-time** | dynamic | the **JVM**, from the **actual object** | overriding + upcasting |

**Dynamic dispatch:** at run time the JVM looks at the real object (not the reference type) to choose the method. Therefore the `teacherMethod(Teacher ref)` in your notes works for **any** future subclass without changing its code: that is the *code flexibility* advantage.

### 17.7.2 What the reference type controls

| Reference type decides... | Object type decides... |
|---|---|
| *which members you may call* (compile-time check) | *which overridden version runs* (run time) |
| field values (fields are not polymorphic) | |

So `Developer dev = new BackendDev(); dev.bdTeam();` fails **to compile**: `Developer` has no `bdTeam()`. That is why you need **downcasting**.

### 17.7.3 Upcasting vs downcasting

| | Upcasting | Downcasting |
|---|---|---|
| Direction | child → parent | parent → child |
| Written | automatic: `Teacher ref = new JavaTeacher();` | explicit cast: `(BackendDev) dev` |
| Safe? | Always | **May throw `ClassCastException`** at run time |
| Purpose | write generic code | reach child-specific methods |

```java
Object o = "hello";
Integer i = (Integer) o;       // ClassCastException: String cannot be cast to Integer   (verified)
```

### 17.7.4 `instanceof`: check before you cast

```java
if (dev instanceof BackendDev) {
    ((BackendDev) dev).bdTeam();
}
// Java 16+ pattern matching: test, cast and name it in one step
if (dev instanceof BackendDev b) { b.bdTeam(); }
```
`null instanceof X` is `false`, never an exception.

A well-designed program avoids many `instanceof` chains: put the behaviour in an overridden method instead (`dev.work()`), and let polymorphism choose.

### 17.7.5 The complete overriding rule list in one table

| Part of the method | Rule |
|---|---|
| Name and parameters | **identical** |
| Return type | same, or a **covariant** subtype (`Parent d1()` → `Child d1()`) |
| Access | **same or wider** (`protected` → `public` OK; `public` → default is an error, verified) |
| Checked exceptions | none new / not broader (chapter 11) |
| `static`, `private`, `final` | cannot be overridden |
| `@Override` | optional, but **always write it**: the compiler then checks you really are overriding (typos become errors) |

### 17.7.6 Static methods are hidden, not overridden (verified)

```java
class Par { static void st() { System.out.println("Par.st"); } }
class Chi extends Par { static void st() { System.out.println("Chi.st"); } }
Par p = new Chi();
p.st();            // prints "Par.st"  : chosen by the REFERENCE type (there is no dynamic dispatch for static)
```

### 17.7.7 Interview questions

| Level | Question | Answer |
|---|---|---|
| Basic | What is polymorphism? | One interface/reference, many behaviours. |
| Basic | Overloading vs overriding? | See table in [section 17.2](#172-method-overloading-vs-method-overriding). |
| Mid | Can we override a static method? | No, it is hidden. |
| Mid | What is a covariant return type? | An overriding method may return a subtype of the parent's return type. |
| Mid | When does `ClassCastException` occur? | Downcasting to a type the object is not. |
| Advanced | How does the JVM choose the method at run time? | Virtual method table (vtable) lookup using the object's real class. |
| Advanced | Are fields polymorphic? | No: only methods are. |

### Complete worked examples *(added by Claude)*

#### Worked Example 18: overriding rules, upcasting, downcasting and `instanceof`

```java
public class Main {
    static class Program1 {
        String name = "Program1 field";
        protected void display() { System.out.println("  Program1 display"); }
        Object create() { return "an Object"; }
        static void info() { System.out.println("  Program1.info (static)"); }
    }

    static class Program2 extends Program1 {
        String name = "Program2 field";
        @Override public void display() { System.out.println("  Program2 display"); }   // visibility increased: OK
        @Override String create() { return "a String (covariant return)"; }             // narrower return type: OK
        static void info() { System.out.println("  Program2.info (static, hides the parent's)"); }
        void onlyInChild() { System.out.println("  child-specific method"); }
    }

    public static void main(String[] args) {
        Program1 p = new Program2();                    // UPCASTING (automatic)
        p.display();                                    // overridden → child's version (runtime polymorphism)
        System.out.println("  create(): " + p.create());
        System.out.println("  field via parent reference: " + p.name);     // fields are NOT overridden
        p.info();                                       // static → decided by the reference type
        // p.onlyInChild();                             // compile error: not visible through a Program1 reference

        if (p instanceof Program2 c) {                  // safe DOWNCASTING
            c.onlyInChild();
            System.out.println("  field via child reference: " + c.name);
        }

        Program1 plain = new Program1();
        try {
            Program2 wrong = (Program2) plain;          // a Program1 object is NOT a Program2
        } catch (ClassCastException e) {
            System.out.println("  ClassCastException: cannot downcast a Program1 object to Program2");
        }
    }
}
```

**Output:**
```text
  Program2 display
  create(): a String (covariant return)
  field via parent reference: Program1 field
  Program1.info (static)
  child-specific method
  field via child reference: Program2 field
  ClassCastException: cannot downcast a Program1 object to Program2
```

**Explanation:**
- `Program1 p = new Program2()` is **upcasting**: allowed automatically because every child *is a* parent. Calls to overridden methods (`display`, `create`) go to the **object's** class at run time: that is runtime (true) polymorphism.
- An override may **increase** visibility (`protected` → `public`) and may return a **narrower** type (`Object` → `String`), but never the reverse (Day 34 rules).
- Fields and `static` methods are **not** polymorphic: they are chosen by the reference type, so `p.name` is the parent's field and `p.info()` is the parent's static method.
- Through a parent reference you can only call parent methods. To reach `onlyInChild()` you must **downcast**, and `instanceof` makes that safe; casting an actual `Program1` object fails at run time with `ClassCastException`.

---

# 18. static vs non-static: Blocks, Variables, Methods (Days 37-38)

*Source: `OOPs.pdf`, pages 52-58.*

A class can contain: **static variables, non-static variables (instance variables), static methods, non-static methods (instance methods), static blocks, non-static blocks (instance blocks), constructor.**

```java
class Program {
    static int a, b;
    static {                                          // static block
        System.out.println("Inside static block");
        a = 10;  b = 20;
    }
    static void disp1() {                             // static method
        System.out.println("Inside static method");
        System.out.println(a);
        System.out.println(b);
    }
    int x, y;
    {                                                 // non-static (instance) block
        System.out.println("Inside non-static block");
        a = 100;  b = 200;  x = 300;  y = 400;
    }
    void disp2() {                                    // non-static method
        System.out.println("Inside non-static method");
        System.out.println(a);  System.out.println(b);  System.out.println(x);  System.out.println(y);
    }
    Program() {                                       // constructor
        System.out.println("Inside constructor");
        a = 11;  b = 22;  x = 33;  y = 44;
    }
}
class PApp {
    public static void main(String[] args) {
        Program.disp1();
        Program p = new Program();
        p.disp2();
    }
}
```

**Output (as written, and verified by running it):**

```
Inside static block
Inside static method
10
20
Inside non-static block
Inside constructor
Inside non-static method
11
22
33
44
```

### Memory picture

```
STACK                    STATIC                          HEAP (4000)
disp2()  (popped)        a  0 → 10 → 100 → 11            x  0 → 300 → 33
disp1()  (popped)        b  0 → 20 → 200 → 22            y  0 → 400 → 44
main()                   static { }, static disp1(), psvm
p [4000] ──────────────────────────────────────────────►
```

> **How a Java program starts:** execution starts from the **OS sending the control to the JVM**. JVM passes the control to the **class loader**. The class loader loads the **static variables, static methods & static blocks into the static segment** and passes the control back to the JVM. JVM **allocates memory for static variables, executes the static blocks & executes the main method.**

**Rules from the notes:**
- Any method invoked using the **class name** is considered a **static method** (JVM searches in the static segment).
- Any method invoked using the **reference variable** is considered a **non-static method**.
- **Static blocks are executed before the main method execution.**
- **Non-static blocks are executed before executing the constructor.**
- **Static variables can be accessed** inside the static block, static method, non-static block, non-static method & constructor.
- **Non-static variables can be accessed** in the non-static block, non-static method & constructor.
- **Non-static variables cannot be accessed in the static block, static method.**

### Professor example (Day 38)

```java
class Professor {
    // static variables
    private static String univName = "KID";
    private static int totalProfessor = 0;
    // non-static variables
    private int professorId;
    private String subject;

    // static block
    static { System.out.println("Welcome to " + univName); }

    // non-static block
    {
        totalProfessor += 1;
        professorId = totalProfessor;
    }

    // constructor
    public Professor(String subject) { this.subject = subject; }
}
```


## 18.1 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 18.1.1 `static` = belongs to the class, not to an object

| | `static` | non-static (instance) |
|---|---|---|
| Belongs to | the **class** (one copy) | each **object** (own copy) |
| Memory | static segment (your "STATIC" box) | heap, inside the object |
| Created | when the class is loaded | when you write `new` |
| Accessed with | `ClassName.member` | `object.member` |
| Needs an object? | **No** | Yes |

Example: in `Professor`, `univName` and `totalProfessor` are **shared by all professors**; `professorId` and `subject` are **per professor**. The non-static block `totalProfessor += 1; professorId = totalProfessor;` therefore gives every new professor the next ID automatically.

### 18.1.2 Who can use whom (your Day 37 rules, as a table)

| From → To | static variable/method | instance variable/method |
|---|---|---|
| **static** method / block | yes | **No**, unless you create an object first (there is no `this`) |
| **instance** method / block / constructor | yes | yes |

That is the reason for the error *"non-static variable cannot be referenced from a static context"* when you use an instance field in `main`.

### 18.1.3 When does each part run?

```
JVM starts → class loader loads the class
   1. static variables get default values          (a=0, b=0)
   2. static blocks run, top to bottom, ONCE        (a=10, b=20)
   3. main() starts
 every  new Program():
   4. instance variables get defaults               (x=0, y=0)
   5. instance (non-static) blocks run              (a=100 ... y=400)
   6. the constructor body runs                     (a=11 ... y=44)
```
Your Day 37 output is exactly this order (verified). Static blocks ran **before** `main`, instance blocks **before** the constructor.

### 18.1.4 Real uses of `static`

| Use | Example |
|---|---|
| Utility functions | `Math.max()`, `Integer.parseInt()`, your `Table`... |
| Constants | `static final double PI = 3.14159;` |
| Shared counter / ID generator | `totalProfessor` |
| **Singleton** pattern | one shared instance (see [chapter 27](#27-design-patterns-you-will-meet)) |
| Factory methods | `List.of(...)`, `LocalDate.now()` |
| One-time set-up | a `static { }` block (load a driver, build a lookup table) |

### 18.1.5 Static nested classes and static imports

```java
class Outer { static class Helper { } }            // a nested class that does not need an Outer object
Outer.Helper h = new Outer.Helper();

import static java.lang.Math.max;                  // lets you write max(3, 7) directly
```

### 18.1.6 Pitfalls

- `static` data is **shared**: in multithreaded code it needs synchronization.
- Too much static state makes testing hard (hidden global variables).
- A static method **cannot be abstract** or overridden (chapter 19).
- Static fields stay alive as long as the class is loaded: a `static List` that only grows is a classic **memory leak**.

### 18.1.7 Interview questions

| Question | Answer |
|---|---|
| Why is `main` static? | The JVM calls it without creating an object. |
| Can a static method use `this`? | No. |
| Can we override a static method? | No: hidden. |
| What is a static block and when does it run? | Runs once when the class is loaded, before `main`/any object. |
| Order of static, instance block, constructor? | Static block → instance block → constructor. |
| Can we have a `static` constructor? | No. |

### Complete worked examples *(added by Claude)*

#### Worked Example 19: static vs non-static members in a real use case

```java
public class PApp {
    static class Student {
        static String college = "DPS";              // shared by every student
        static int count;                           // how many students were created
        static { System.out.println("  [static block] college = " + college); }

        final int rollNo;
        String name;
        { count++; }                                 // instance block: runs before each constructor body

        Student(String name) { this.name = name; this.rollNo = count; }

        void show() { System.out.println("  " + rollNo + " " + name + " of " + college); }   // instance method sees both
        static void changeCollege(String c) { college = c; }                                 // static method: no 'this'
    }

    public static void main(String[] args) {
        System.out.println("main started");
        Student a = new Student("Asha");
        Student b = new Student("Ravi");
        a.show(); b.show();
        Student.changeCollege("KV");                  // one change, visible to all objects
        a.show(); b.show();
        System.out.println("  total students: " + Student.count);
    }
}
```

**Output:**
```text
main started
  [static block] college = DPS
  1 Asha of DPS
  2 Ravi of DPS
  1 Asha of KV
  2 Ravi of KV
  total students: 2
```

**Explanation:**
- The `static` block runs **once**, when `Student` is first used (after `main` has started), and a `static` variable exists once for the whole class. Changing `college` through the static method changes it for every student.
- The instance block runs for **every** object before the constructor body, so `count` is already incremented when the constructor reads it for the roll number.
- A static method has no `this`, so it can use only static members directly; an instance method can use both. That is why your notes' `disp1()` (static) prints only `a` and `b`, while `disp2()` prints all four variables.

---

# 19. Abstraction: Abstract Classes and Interfaces (Days 39-42)

*Source: `OOPs.pdf`, pages 59-73.*

> **Abstraction** is the process of **hiding irrelevant data.** It can be achieved using **abstract classes or interfaces.**

## 19.1 Abstraction using abstract classes (Day 39)

```
      «abstract» Teacher
      (A) teach()
      (A) project()
       ^                ^
 JavaTeacher       PythonTeacher
 teach()           teach()
 project()         project()
```

```java
abstract class Teacher {
    abstract void teach();
    abstract void project();
}
class JavaTeacher extends Teacher {
    void teach()   { System.out.println(...); }
    void project() { System.out.println(...); }
}
class PythonTeacher extends Teacher {
    void teach()   { System.out.println(...); }
    void project() { System.out.println(...); }
}
class TeacherApp {
    static void teacherBehavior(Teacher ref) {
        ref.teach();
        ref.project();
    }
    public static void main(String[] args) {
        JavaTeacher jt = new JavaTeacher();
        PythonTeacher pt = new PythonTeacher();
        teacherBehavior(jt);
        teacherBehavior(pt);
    }
}
```

- The **`abstract` keyword** is used for creating an **abstract class** and **abstract methods**.
- **Abstract methods are methods which will not have a method body.**
- **Rule in Java:** if a class consists of any abstract method, then the class also **must be declared as an abstract class.**

### Pure vs impure abstract class

```java
// PURE abstract class: all methods abstract
abstract class Program1 {
    abstract void disp1();
    abstract void disp2();
}

// IMPURE abstract class: abstract + concrete methods
abstract class Program2 {
    abstract void disp1();
    void disp2() { System.out.println(...); }       // concrete method
}

// Impure abstract class with only concrete methods (as drawn on the page)
abstract class Program3 {
    void disp1() { ... }
    void disp2() { ... }
}
```

> **What is an abstract class?** Abstract classes are classes **whose object cannot be created or instantiated.**

## 19.2 Child of an abstract class (Day 40)

> If a child class is inheriting a parent class and the parent class consists of abstract methods, then the child class **must override and provide the body for every abstract method**; otherwise the child class **should also be declared as an abstract class** (partial abstract).

```java
abstract class Vehicle {
    abstract void speed();
    abstract void seater();
}
abstract class Car extends Vehicle {            // partial: only speed() implemented, so Car stays abstract
    void speed() { System.out.println(...); }
}
class Bike extends Vehicle {                    // implements both
    void speed()  { }
    void seater() { }
}
```

### NOTE: abstract methods cannot be `final` or `static`

```java
abstract class Vehicle {
    final void speed() { System.out.println(...); }    // a concrete final method is fine
    // abstract final void seater();                   // error: abstract method cannot be final
    // abstract static void typeEngine();              // error: abstract method cannot be static
}
```

- An abstract method **cannot be final** because the abstract method body is **provided by the child class** and a **final method cannot be overridden**, so both statements are **opposite to each other**.
- An abstract method **cannot be static** because **static methods are class-level methods**; an abstract method is **meant to be implemented by a subclass to define its behaviour.**

### What an abstract class can contain

```java
abstract class Vehicle {
    static int x;
    static { x = 10; }
    static void disp1() { System.out.println(x); }
    int y;
    { System.out.println("Non Static"); }
    void disp2() { System.out.println("Non Static"); System.out.println(x); System.out.println(y); }
    Vehicle() { /* constructor */ }
    abstract void disp3();
}
```

> **An abstract class can consist of static variables, static methods, static blocks, non-static variables, non-static blocks, methods & constructor.**

## 19.3 Abstraction using interfaces

```java
interface StudentActivities {
    abstract void study();
    abstract void practice();
}
class PhysicsStudent implements StudentActivities {
    @Override public void study()    { System.out.println(...); }
    public void practice()           { System.out.println(...); }
}
class MathStudent implements StudentActivities {
    public void study()    { System.out.println(...); }
    public void practice() { System.out.println(...); }
}
class StudentApp {
    static void invokeStuAct(StudentActivities sa) {
        sa.study();
        sa.practice();
    }
    public static void main(String[] args) {
        PhysicsStudent ps = new PhysicsStudent();
        MathStudent ms = new MathStudent();
        invokeStuAct(ps);
        invokeStuAct(ms);
    }
}
```

> An **interface consists of abstract methods.** It is another way of achieving abstraction. When a class connects with an interface, the **`implements`** keyword has to be used, which means the implementing class (child class of the interface) **has to provide the body for all the abstract methods**, otherwise it has to be **declared abstract**. (The page also says "Interfaces cannot have concrete method"; see the Day 42 update below.)

## 19.4 Why interfaces? (Day 41)

Interfaces were introduced for two reasons:
1. **To achieve standardization**: inside the interface **only method declarations** are provided. In other words, **interfaces tell what to do, not how to do it.**
2. **Using interfaces, multiple inheritance can be achieved**, which cannot be achieved by abstract classes (it is possible because **interfaces do not have any parent by default**).

**NOTE:** we **can't create an object of an interface**, but we **can create a reference of an interface.**

```java
interface Calculator {
    void add();            // public abstract void add()
    void sub();
}
class MyCalculator implements Calculator {
    public void add() { System.out.println(...); }
    public void sub() { System.out.println(...); }
}
class CalculatorApp {
    public static void main(String[] args) {
        // Calculator calc1 = new Calculator();   // cannot create object of an interface
        Calculator calc2;                          // reference of interface can be created
        MyCalculator mycalc1 = new MyCalculator();
        calc2 = mycalc1;
        calc2.add();
        calc2.sub();
    }
}
```

**NOTE 1: all methods of interfaces are by default `public abstract`.**

```java
interface Cal {
    void add();
    void sub();
    public abstract void multiply();
}
class MyCal implements Cal {
    public void add() { }
    public void sub() { }
    public void multiply() { }
}
```

**NOTE 2: variables in interfaces are declared as `public static final`.**

```java
interface Cal {
    int a = 10;                          // public static final int a = 10
    public static final int b = 20;
    // int c;                            // Error: all variables in interfaces are final, hence they should be initialized
}
class MyCal implements Cal {
    void change() { a = 99; }            // Error: final variable cannot be changed
}
class Main {
    public static void main(String[] args) {
        System.out.println(MyCal.a);     // 10
        System.out.println(MyCal.b);     // 20
    }
}
```

**NOTE 3: partial implementation.** If any class is **partially implementing** the interface (not providing the body for all the abstract methods), then the **class also has to be declared abstract.**

```java
interface Cal { void add(); void sub(); }
abstract class MyCal implements Cal {
    public void add() { System.out.println(...); }
    // not providing the method body for sub()
}
```

## 19.5 Multiple inheritance using interfaces

```java
interface Cal1 { void add(); }
interface Cal2 { void sub(); }
interface Cal3 { void mul(); }
class MyCal implements Cal1, Cal2, Cal3 {
    public void add() { ... }
    public void sub() { ... }
    public void mul() { ... }
}
class Main {
    public static void main(String[] args) {
        MyCal m = new MyCal();
        m.add();  m.sub();  m.mul();
    }
}
```

### Interface extends interface

```java
interface Cal1 { void add(); }
interface Cal2 extends Cal1 { void sub(); }
class MyCal implements Cal2 {
    public void add() { }
    public void sub() { }
}
```

Relationships drawn: **class → class: `extends`**, **interface → interface: `extends`**, **interface ↔ class: `implements`.**

> **An interface can never `implements` another; rather it can `extends` another interface.**
> If a class is implementing the extended **child interface**, then it **has to provide the method body for all the methods of the child interface & the parent interface.**

### A class can extend a class and implement an interface

```java
interface Cal1 { void add(); }
class MyCal { void sub() { System.out.println(...); } }
class MyCal2 extends MyCal implements Cal1 {
    public void add() { System.out.println(...); }
}
```

### Marker interface

> **Marker interface / Tagged interface / Empty interface** → such interfaces which **don't contain anything** (empty). They are also considered **tagged interfaces**.

```java
interface Cal { }
```

Example: **`Serializable` is the inbuilt marker interface.**

## 19.6 Concrete methods in interfaces (Day 42)

```java
interface Cal1 {
    public abstract void disp1();                 // abstract method
    public default void disp2() {                 // default concrete method
        System.out.println("Inside disp2");
    }
    static void disp3() {                         // static concrete method
        System.out.println(...);
    }
    private void disp4() {                        // private concrete method
        System.out.println(...);
    }
}
```

> **Clarification:** this Day 42 page updates the earlier line "Interfaces cannot have concrete methods": since Java 8, interfaces can have **`default` and `static`** methods, and since Java 9 **`private`** methods, all with bodies.


## 19.7 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 19.7.1 Abstraction in plain words

> Show **what** something does; hide **how** it does it.

You press the accelerator without knowing the engine. In Java, `Teacher.teach()` tells callers *what* a teacher can do; `JavaTeacher` and `PythonTeacher` decide *how*. Callers (like `teacherBehavior(Teacher ref)`) depend only on the abstraction, so new teachers can be added without changing them.

### 19.7.2 Abstract class vs interface: the complete comparison

| | Abstract class | Interface |
|---|---|---|
| Keyword | `abstract class` / `extends` | `interface` / `implements` |
| Object creation | not allowed | not allowed (but you can hold a **reference**) |
| Abstract methods | yes (`abstract void f();`) | yes (**implicitly** `public abstract`) |
| Concrete methods | yes | `default`, `static` (Java 8+), `private` (Java 9+) |
| Variables | any kind | **only constants** (`public static final`) |
| Constructors | **yes** | no |
| Fields with state | yes | no |
| Multiple inheritance | **no** (one parent class) | **yes** (a class can implement many interfaces) |
| Use when | classes share **code/state** ("is-a" with common base) | you want a **contract/capability** (`Comparable`, `Runnable`) |

A class can do both: `class MyCal2 extends MyCal implements Cal1` (your Day 41 note).

### 19.7.3 What you can put inside an abstract class (your Day 40 list)

Static and non-static variables, static and non-static blocks, constructors (run when a **child** object is built), concrete methods **and** abstract methods. A class with **no** abstract methods can also be marked `abstract` to stop anyone creating objects of it.

### 19.7.4 Why `abstract` cannot be combined with `final`, `static` or `private`

| Combination | Why it is illegal |
|---|---|
| `abstract final` | abstract *must* be overridden; final *cannot* be (verified: *"illegal combination of modifiers: abstract and final"*) |
| `abstract static` | static belongs to the class and cannot be overridden |
| `abstract private` | private is invisible to subclasses, so no one could implement it |

### 19.7.5 Interface features by Java version

| Java | Added to interfaces |
|---|---|
| 1-7 | only abstract methods and constants |
| **8** | `default` and `static` methods (so old interfaces like `List` could get `forEach`/`sort` without breaking implementers) |
| **9** | `private` methods (helpers for default methods) |
| **8+** | **Functional interface** (exactly one abstract method, optionally `@FunctionalInterface`) → can be written as a **lambda** |
| **17** | `sealed interface X permits A, B`: only listed classes may implement it |

**Constants in interfaces** (your Day 41 note): `int a = 10;` is really `public static final int a = 10;`, so `a = 99;` is an error (verified: *"cannot assign a value to final variable a"*) and an interface variable **must** be initialized.

### 19.7.6 Marker interfaces

An empty interface that only "tags" a class: `Serializable`, `Cloneable`. The JVM or a library checks `obj instanceof Serializable`. (Annotations are the modern alternative.)

### 19.7.7 Interface as a type: the power of programming to the interface

```java
List<String> list = new ArrayList<>();      // variable type is the INTERFACE, object is a class
list = new LinkedList<>();                  // swap the implementation, nothing else changes
```
This is the same idea as your `Calculator calc2 = mycalc1;`.

### 19.7.8 Example: a functional interface and a lambda

```java
interface Pay { void pay(int amt); }            // one abstract method → functional interface
Pay upi = amt -> System.out.println("UPI " + amt);
upi.pay(5);                                      // UPI 5     (verified)
```

### 19.7.9 Interview questions

| Level | Question | Answer |
|---|---|---|
| Basic | What is abstraction? | Hiding implementation details and showing only essential behaviour. |
| Basic | Can we create an object of an abstract class? | No; but a child object can be held in an abstract-type reference. |
| Basic | Can an abstract class have a constructor? | Yes (called via `super()` from the child). |
| Mid | Abstract class vs interface? | See the table in 19.7.2. |
| Mid | Can an interface have a constructor? | No. |
| Mid | If a class does not implement all interface methods? | It must be declared `abstract`. |
| Advanced | Why were `default` methods added? | To evolve interfaces without breaking existing implementers. |
| Advanced | Two interfaces with the same default method? | The class must override and may call `A.super.hi()`. |
| Advanced | What is a functional interface? | An interface with exactly one abstract method (target of lambdas). |

### Complete worked examples *(added by Claude)*

#### Worked Example 20: abstract class + interfaces + multiple inheritance in one design

```java
import java.util.List;

public class Main {
    abstract static class Animal {                             // abstraction: partial implementation
        protected final String name;
        Animal(String name) { this.name = name; System.out.println("  Animal constructor for " + name); }
        abstract String sound();                               // WHAT every animal must do
        void describe() { System.out.println("  " + name + " says " + sound()); }   // concrete method
    }

    interface Pet { default String play() { return "plays fetch"; } }     // capability (Java 8 default method)
    interface Swimmer { String swim(); }
    interface Registered { int MAX_PETS = 3; static String rule() { return "max " + MAX_PETS + " pets per owner"; } }

    static class Dog extends Animal implements Pet, Swimmer {              // one class, several interfaces
        Dog() { super("Dog"); }
        String sound() { return "Woof"; }
        public String swim() { return "paddles"; }
    }

    static class Cat extends Animal implements Pet {
        Cat() { super("Cat"); }
        String sound() { return "Meow"; }
        @Override public String play() { return "chases a laser"; }
    }

    public static void main(String[] args) {
        List<Animal> zoo = List.of(new Dog(), new Cat());
        for (Animal a : zoo) {
            a.describe();
            if (a instanceof Pet p) System.out.println("    as a Pet it " + p.play());
            if (a instanceof Swimmer s) System.out.println("    as a Swimmer it " + s.swim());
        }
        System.out.println("  " + Registered.rule());
        // Animal x = new Animal("x");   // compile error: Animal is abstract; cannot be instantiated
    }
}
```

**Output:**
```text
  Animal constructor for Dog
  Animal constructor for Cat
  Dog says Woof
    as a Pet it plays fetch
    as a Swimmer it paddles
  Cat says Meow
    as a Pet it chases a laser
  max 3 pets per owner
```

**Explanation:**
- `Animal` is abstract: it cannot be instantiated, but it has a constructor (run through `super(...)`), a concrete method and an abstract one, exactly like Days 39-40.
- `describe()` is written once in the parent, yet it prints each child's own `sound()`.
- `Dog` extends **one** class but implements **two** interfaces: multiple inheritance of type through interfaces (Day 41-42), without the diamond problem of classes.
- `Pet.play()` is a **default** (concrete) method that `Dog` inherits and `Cat` overrides; `Registered.rule()` is a static interface method, and `MAX_PETS` is automatically `public static final`.

---

# 20. Hibernate CRUD and Mappings (Day 76)

*Source: `Hibernate.pdf`, pages 1-2. (The earlier Hibernate days, 70-75, are in [section 10](#10-hibernate-days-70-75).)*

**Hibernate CRUD:** 1 → insert, 2 → update, 3 → delete.

## 20.1 Hibernate One-To-One

**Employee** (Emp_ID, E_Name): 111 Ajay, 112 Suraj, 113 Manoj.
**Project** (P_ID, P_Name): 1234 Amazon, 2346 Flipkart, 4789 PhonePay.

Arrows connect each employee to **one** project (the lines cross each other on the page, so the exact pairing **(unclear)**). The point of the example is **one employee ↔ one project**.

## 20.2 Hibernate One-To-Many

**Author** (Auth_ID, Auth_Name, Auth_Email):

| Auth_ID | Auth_Name | Auth_Email | Books |
|---|---|---|---|
| 1 | Amit | amit@gmail.com | 101, 102 |
| 2 | Akash | akash@gmail.com | 103, 104 |
| 3 | Manu | manu@gmail.com | 105 |

**Book** (BK_ID, BK_Name, BK_Publisher, BK_Price):

| BK_ID | BK_Name | BK_Publisher | BK_Price |
|---|---|---|---|
| 101 | Java | SKPublisher | 2500 |
| 102 | Python | PKPublisher | 2450 |
| 103 | SQL | SKPublisher | 3200 |
| 104 | Web | WKPublisher | 1200 |
| 105 | API (hard to read) | AKPublisher | 650 |

One author has many books.


## 20.3 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 20.3.1 What "mapping" means

A **relationship between tables** (foreign key) becomes a **relationship between objects** (a field holding another object or a list).

| Table design | Java design | JPA annotation |
|---|---|---|
| `employee.project_id` → `project.p_id` (FK in employee) | `Employee` has a `Project` | `@OneToOne` |
| `book.author_id` → `author.auth_id` | `Author` has a `List<Book>`; `Book` has one `Author` | `@OneToMany` / `@ManyToOne` |
| join table `developer_project(dev_id, p_id)` | `Developer` has a `List<Project>` and vice versa | `@ManyToMany` |

Rule from your Day 74 note: **"whenever it is `toMany`, create a list"**.

### 20.3.2 Your Author-Book example as entities (not compiled here: needs JPA/Hibernate libraries)

```java
@Entity
public class Author {
    @Id private int authId;
    private String authName;
    private String authEmail;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)   // "author" = the field in Book that owns the FK
    private List<Book> books = new ArrayList<>();
}

@Entity
public class Book {
    @Id private int bkId;
    private String bkName;
    private String bkPublisher;
    private int bkPrice;

    @ManyToOne
    @JoinColumn(name = "author_id")                              // the foreign-key column
    private Author author;
}
```

**Owning side** = the side that has the foreign-key column (`Book` here). `mappedBy` marks the **other** side so Hibernate does not create a second, duplicate relationship. This is also what **unidirectional** (only one side has a reference) vs **bidirectional** (both sides) means in your Day 73 notes.

### 20.3.3 One-to-One and Many-to-Many snippets

```java
@Entity class Employee {
    @Id int empId;
    String eName;
    @OneToOne @JoinColumn(name = "project_id") Project project;
}

@Entity class Developer {
    @Id int devId;
    String devName;
    @ManyToMany
    @JoinTable(name = "developer_project",
               joinColumns = @JoinColumn(name = "dev_id"),
               inverseJoinColumns = @JoinColumn(name = "p_id"))
    List<Project> projects = new ArrayList<>();
}
```
Your Day 75 notes drew **two** lookup tables (Developer → Projects and Project → Developers). In JPA there is **one** join table; you read it from both sides.

### 20.3.4 Going deeper

| Topic | Notes |
|---|---|
| `fetch = FetchType.LAZY/EAGER` | `@OneToMany`/`@ManyToMany` default to lazy; `@ManyToOne`/`@OneToOne` default to eager |
| Cascade types | `PERSIST`, `MERGE`, `REMOVE`, `ALL`, `orphanRemoval` |
| Avoid infinite JSON/`toString` loops | `Author` → `books` → `author` → ... use DTOs or `@JsonIgnore` |
| **N+1** | Fix with `join fetch` in HQL |
| Equality of entities | Base it on the id, not on all fields |

### 20.3.5 Interview questions

| Question | Answer |
|---|---|
| What does `mappedBy` do? | Declares the non-owning side of a bidirectional relationship. |
| Which side holds the foreign key? | The `@ManyToOne` side (the "many" side). |
| `@JoinColumn` vs `@JoinTable`? | Foreign key column in the entity's table vs a separate join table (many-to-many). |
| Lazy vs eager? | Load related data when used vs immediately. |

### Complete worked examples *(added by Claude)*

Running Hibernate needs its libraries and a database. The SQL that Hibernate generates for each CRUD call, and the N+1 problem as it appears in the log, are shown in [Java_FullStack_Syllabus_Guide.md](Java_FullStack_Syllabus_Guide.md), **Worked Example 66**.

---

# 21. Spring Framework: IoC, DI, Beans, Wiring (Days 77-80)

*Source: `Hibernate.pdf`, pages 3-14.*

## 21.1 What is Spring? (Day 77)

> The **Spring Framework is a suite of tools which can help the programmer to create Java-based enterprise applications.**

- **Spring IoC (Inversion of Control):** the programming scenario where **the control of creating objects is taken from the user or programmer and given to the Spring framework** is known as IoC.
- **Spring DI (Dependency Injection):** the Spring framework also helps us in **injecting values or objects into other objects.**

```
User ──► Classroom object ◄── Spring DI ◄── Java Mentor / SQL Mentor objects
                                Spring IoC: inversion of control (Spring creates the Java and SQL mentor objects)
```

Dependency injection types listed on the diagram page: **Constructor Injection, Setter Injection, Collection Injection.** (Day 79 says there are two main types: setter and constructor.)

## 21.2 Creating a Spring project (Day 78)

1. **Spring Initializer** → download project (unzip) → import in Eclipse.
2. Lang → **Java**; Project → **Maven**; Spring Boot → **3.3.2**.
3. Eclipse: **File → Import → Maven → Existing Maven project → Browse → Select project.**

**SpringProject1:**
- Right-click `src/main/java` → **New → Other → XML → XML file → `config.xml` → Finish.**
- `config.xml` → configuration for XML.
- **Spring documentation → Core Technologies → Container Overview → copy the config & paste.**

> **If we are creating an object → Object. If Spring is creating an object for a class → Bean.**

```java
ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("config.xml");   // class: to activate the beans
Object o = ctx.getBean("pers");                                                          // to get the bean
```

## 21.3 Setter injection and constructor injection (Day 79, Spring Project 3)

> Whenever we use the **`<property>` tag, Spring will invoke the setter method.**

Output for two beans (as written on the page):

```
0-para constructor
id-setter method
brand-setter method
cost-setter method
0-para constructor
id-setter method
brand-setter method
cost-setter method
```

**There are two types of Dependency Injection:**

1. **Setter injection:** while creating a bean, if **property tags** are used, then the **setter method** of the class will be executed.
2. **Constructor injection:** when we call the constructor, it will call the **parameterized constructor**. (When we use the setter method, the **0-parameter constructor** is called.)

```xml
<bean class="com.learn.springproject3.laptop" id="lap1">
    <constructor-arg value="1"></constructor-arg>
    <constructor-arg value="HP"></constructor-arg>
</bean>
```

**Storing collection-type values in list, set, map:** `SpringProjects`: `Employee` class, `config.xml`, `SpringBoot3Application.java` (the rest of this page is faint).

## 21.4 Wiring (Day 80, Spring Project 4)

```
Employee (4000)  empId 12, empName Amit, empSalary 5600        Company
Employee (6000)  empId 14, ...                          emp [ 4000 | 6000 ]  (company holds references to the employees)
```

> **Wiring** → in Spring, **injecting the reference of one bean into another bean.**
> - Done using the **`ref=""` keyword.**
> - It is the process of **connecting two beans using the Spring framework.**
> - To perform wiring, the **`ref` keyword** should be used for assigning the reference of one bean into another bean. **(It's done by the programmer.)**

## 21.5 Autowiring

> **Autowiring** → the process of achieving wiring **by the Spring framework** using the following approaches:
> i) by Name  ii) by Type  iii) constructor  iv) `@Autowired` annotation  v) `@Qualifier` annotation

**i) By name:**

```xml
<bean class="..." id="c1" autowire="byName"> ... </bean>
```

It checks the **name of the reference variable in the POJO class** and the **`id` in `config.xml`**, and wherever the names match it injects that particular bean. *(The page's example: Spring searches the `Company` bean `c1` and looks for the variable `emp` among the bean ids in the config file.)*

**ii) By type:** Spring checks the **type of the reference variable in the POJO class** and the **class name of the beans in `config.xml`**; wherever they match it injects that bean.

```xml
<bean class="..." id="c1" autowire="byType"></bean>
<bean class="..." id="e1"><property ... /></bean>
```

**Only one bean of that type can be created; if we create two, it will give an error.**

> **NOTE:** while autowiring using `byName` or `byType`, the **setter methods are invoked** for injecting the value. If the **constructor** should be invoked, then autowiring should happen using the keyword **`constructor`**.

**iii) By constructor:** `autowire="constructor"` → the **parameterized constructor is executed.**

**iv) `@Autowired`:**

```java
class Company {
    @Autowired
    Employee emp;
}
```

- Uses the **0-parameter constructor**.
- **Internally it wires using `byType` only.**
- For annotation-based configuration, see: **Spring docs → Core Technologies → Annotation-based container config → XML.**

**v) `@Qualifier`:** `@Autowired` uses the **type of the bean** for wiring. If there are **multiple beans of the same type**, we should use the **`@Qualifier`** annotation along with the **id name of the bean** to be wired.

```java
public class Company {
    @Autowired
    @Qualifier("emp2")        // specify the id of the bean which has to be injected / wired
    Employee emp;
}
```


## 21.6 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 21.6.1 The problem Spring solves

Without Spring, objects **create their own dependencies**:

```java
class Classroom {
    JavaMentor mentor = new JavaMentor();     // Classroom is glued to JavaMentor
}
```
To switch to `SqlMentor` you must edit `Classroom`, and you cannot test it with a fake mentor. With Spring, someone else (the **container**) creates the objects and **hands them in**:

```java
class Classroom {
    private final Mentor mentor;
    Classroom(Mentor mentor) { this.mentor = mentor; }    // injected: Classroom does not know which mentor it gets
}
```

| Term (your Day 77) | Plain meaning |
|---|---|
| **IoC (Inversion of Control)** | **Who creates the objects?** Not you (`new`) but Spring: the control is *inverted*. |
| **DI (Dependency Injection)** | **How the objects reach each other**: Spring injects them via constructor/setter. IoC is the idea, DI is the technique. |
| **Bean** | An object created and managed by Spring (your Day 78 note) |
| **Container / ApplicationContext** | The Spring object that reads the configuration, builds beans and wires them |
| **POJO** | The plain class Spring turns into a bean |

### 21.6.2 What happens when you run your code

```java
ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("config.xml");
Laptop l = (Laptop) ctx.getBean("lap1");
```
1. Spring reads `config.xml` and finds `<bean id="lap1" class="...Laptop">`.
2. It creates **every singleton bean immediately** at start-up (that is why your Day 79 output printed *"0-para constructor, id-setter..."* before you even asked for the beans).
3. `<property>` → calls the **setter**; `<constructor-arg>` → calls the **parameterized constructor**.
4. `getBean("lap1")` just returns the already-built object.

### 21.6.3 Setter vs constructor injection

| | Setter injection (`<property>`) | Constructor injection (`<constructor-arg>`) |
|---|---|---|
| Calls | no-arg constructor, then setters | one constructor with all values |
| Object can be half-built? | Yes (before setters run) | **No** (always complete) |
| Optional dependencies | good | awkward |
| Fields can be `final`? | no | **yes** |
| Recommended | for optional things | **default choice** in modern Spring |

### 21.6.4 Wiring and autowiring: your Day 80, side by side

| Style | You write | Who decides which bean? |
|---|---|---|
| Manual (XML) | `<property name="emp" ref="e1"/>` | **you** |
| `autowire="byName"` | nothing | Spring: property name == bean `id` |
| `autowire="byType"` | nothing | Spring: property **type** == bean class (error if 2 matches) |
| `autowire="constructor"` | nothing | Spring: matches constructor parameters by type |
| `@Autowired` | the annotation on the field/constructor | by **type** |
| `@Autowired` + `@Qualifier("emp2")` | plus the id | by type, **narrowed by id** |

### 21.6.5 The same thing in modern Spring (annotations, no XML) *(not compiled here: needs Spring libraries)*

```java
@Component                       // "Spring, make a bean of this class"
class Employee { ... }

@Component
class Company {
    private final Employee emp;
    @Autowired                   // optional when there is one constructor (Spring 4.3+)
    Company(Employee emp) { this.emp = emp; }
}

@Configuration
class AppConfig {
    @Bean Laptop lap1() { return new Laptop(1, "HP"); }      // Java config instead of XML
}

ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);
```

| Annotation | Meaning |
|---|---|
| `@Component` | Generic bean |
| `@Service` | Business logic layer (a `@Component`) |
| `@Repository` | Data access layer (also translates DB exceptions) |
| `@Controller` / `@RestController` | Web layer |
| `@Configuration` + `@Bean` | Java-based configuration |
| `@Primary`, `@Qualifier` | Choose between several beans of the same type |
| `@Value("${x}")` | Inject a property |

### 21.6.6 Bean scopes and lifecycle

| Scope | Meaning |
|---|---|
| **singleton** (default) | **One** shared instance per container |
| prototype | A **new** instance each time it is requested |
| request / session | One per HTTP request / session (web) |

Lifecycle: instantiate → inject dependencies → `@PostConstruct` (init) → ready → `@PreDestroy` (cleanup) → destroyed. Because singletons are shared by many threads, they should be **stateless**.

### 21.6.7 Interview questions

| Level | Question | Answer |
|---|---|---|
| Basic | What is IoC? | The container, not your code, creates and manages objects. |
| Basic | What is DI? | Providing an object's dependencies from outside. |
| Basic | What is a bean? | An object managed by the Spring container. |
| Mid | Constructor vs setter injection? | Constructor for required, immutable dependencies (preferred). |
| Mid | `BeanFactory` vs `ApplicationContext`? | ApplicationContext is the full-featured one (events, i18n, eager singletons). |
| Mid | Default bean scope? | Singleton. |
| Advanced | What if two beans match `@Autowired` by type? | `NoUniqueBeanDefinitionException`; use `@Qualifier` or `@Primary`. |
| Advanced | Circular dependency? | A needs B and B needs A; avoid by redesign (constructor injection fails fast). |

### Complete worked examples *(added by Claude)*

#### Worked Example 21: what Spring's IoC container does, written by hand

Spring creates objects and injects their dependencies for you. This plain-Java version (no Spring needed) does the same wiring manually, which makes the idea of **Inversion of Control** and **constructor injection** concrete.

```java
import java.util.*;
import java.util.function.Supplier;

public class Main {
    interface Engine { String start(); }
    static class PetrolEngine implements Engine { public String start() { return "petrol engine: vroom"; } }
    static class ElectricEngine implements Engine { public String start() { return "electric engine: hum"; } }

    static class Car {
        private final Engine engine;                                // dependency
        Car(Engine engine) { this.engine = engine; }               // constructor injection
        String drive() { return "Car with " + engine.start(); }
    }

    static class MiniContainer {                                    // a toy "ApplicationContext"
        private final Map<Class<?>, Object> beans = new HashMap<>();
        <T> void register(Class<T> type, Supplier<? extends T> factory) { beans.put(type, factory.get()); }
        <T> T getBean(Class<T> type) { return type.cast(beans.get(type)); }
    }

    public static void main(String[] args) {
        MiniContainer ctx = new MiniContainer();
        ctx.register(Engine.class, ElectricEngine::new);                       // "configuration": choose the bean
        ctx.register(Car.class, () -> new Car(ctx.getBean(Engine.class)));     // wire Car with the Engine bean

        Car car = ctx.getBean(Car.class);
        System.out.println(car.drive());
        System.out.println("same Car bean every time (singleton scope): " + (car == ctx.getBean(Car.class)));

        Car manual = new Car(new PetrolEngine());                               // swap the dependency without touching Car
        System.out.println(manual.drive());
    }
}
```

**Output:**
```text
Car with electric engine: hum
same Car bean every time (singleton scope): true
Car with petrol engine: vroom
```

**Explanation:**
- `Car` never says `new ElectricEngine()`; it only declares "I need an `Engine`" in its constructor. Whoever builds the `Car` decides which engine to supply. Control over object creation has moved from the class to the container: **Inversion of Control**.
- The container creates each bean once and hands out the same object (`singleton` is Spring's default scope).
- Because `Car` depends on the `Engine` **interface**, switching to a `PetrolEngine` (or a fake engine in a test) needs no change to `Car`.
- In Spring, `@Component` on the classes plus constructor injection replace the whole `MiniContainer`: Spring scans the classes, creates the beans and calls the constructors with the right dependencies.

---

# 22. MVC and Spring Boot (Days 81-90)

*Source: `Hibernate.pdf`, pages 15-30.*

## 22.1 MVC and client-server architecture (Day 81)

- **Design patterns in programming provide a way of organizing our code.**
- **MVC stands for Model View Controller.** The MVC design pattern helps us to organize our code as **models, views & controllers.**
  - **View** → the component responsible for **interacting with the end user.**
  - **Controller** → responsible for **taking inputs from the view & sending back data to the view.**
  - **Model** → generally represents the components **where the actual work happens.**

**Client-server architecture:**
- A **client** is the combination of the **end user & the web browser.** It is generally used to **interact with the end user or send a request to the server or receive the response from the server.**
- A **server** is a **machine which accepts the request from the client & sends it a response.** The **backend component of an application** is present on the server, and hence also the **business logic**. A server might also **interact with the database**. A server can sometimes also be **software**.

## 22.2 Basic architecture of a Spring Boot application

```
Client (frontend)                Server (Tomcat)  — backend: Java, Spring           Database
 HTML, CSS, React/JS,   Request   +------------------------------------------+
 Thymeleaf             ───────►   | Controller ─► Services ─► Repository ─────┼─► MySQL
                       ◄───────   |       (Entities used throughout)          |   (via Spring Data JPA)
                       Response   +------------------------------------------+
```

## 22.3 Installing Spring Tools in Eclipse

**Help → Eclipse Marketplace → search "Spring Tool" → Spring Tools 4 (aka Spring Tool Suite 4) → Install → default → confirm → Trust Authorities: tick "Always trust all" → accept → Finish.**

## 22.4 Student Management System (Days 82-90)

**Day 82 plan:** `index.html` has Add Student, Search, View All, Update, Delete → **Controller → Services → Repositories → Database**, with **Entities**. These are **CRUD** operations.

**Package layout:**

```
com.student.management
 ├─ com.student.management.controller
 ├─ com.student.management.service
 ├─ com.student.management.entities
 └─ com.student.management.repository
```

**Creating the project:** File → Other → search "spring" → **Spring Starter Project** → Next:

| Field | Value |
|---|---|
| Name | com.student.management |
| Type | Maven |
| Java version | 17 |
| Packaging | Jar |
| Language | Java |
| Group / Artifact / Package | com.student.management |
| Dependencies | **MySQL, Spring Data JPA, Spring Web** |

```
src/main/resources
 ├─ static
 ├─ templates            (New → Other → html)
 └─ application.properties   ← database details
```

**Day 83:** frontend part (heading only). 

### First request (Day 84)

```
Browser (client)  ── request: localhost:8080/ ──►  Tomcat :8080
                                                   @RestController
                                                   class StudentController {
                                                       @GetMapping("/")
                                                       public String sayHello() { return "Hello from SpringBoot"; }
                  ◄── response: "hello from SpringBoot" ───
```

### HTTP methods for CRUD (Day 85)

| CRUD | HTTP |
|---|---|
| **C** (create) | **POST** |
| **R** (read) | **GET** |
| **U** (update) | **PUT** |
| **D** (delete) | **DELETE** |

*HTML forms support only two of them (GET and POST).* Also on the page: **Add dependencies → Developer tools.**

### Controller → Service → Repository flow

```
JSON / form: { roll: 1, name: "Ritik", branch: "CS", YOP: 2020, cgpa: 7.9 }
   │ request
   ▼
Controller (gets the Student object) ─► Service ─► Repository ─► Database table (mapped by JPA)

interface StudentService { String addStudent(Student st); }

class StudentServiceImplementation implements StudentService {
    public String addStudent(Student st) { repo.save(st); ... }
}

interface StudentRepository extends JpaRepository<Student, Integer> { }
```

> **`JpaRepository<T, ID>`:** `T` = **for whom to create the object** (`Student`); `ID` = **datatype of the primary key** (`Integer`).

### Day 86-87: more operations

- Day 86: `searchStudent()`, `updateStudent()`, `deleteStudent()`.
- Day 87: `getAllStudent()`, `deleteAllStudent()`.

**Frontend dependency:** for the front-end part, install the extra dependency **Thymeleaf** via Spring Initializr (copy & paste the dependency into `pom.xml`).

> We **cannot go directly from one HTML page to another.** When we click any link, the **request goes to the controller**, and the controller **searches for the method** whether it is present or not, and **on that basis it renders the page.**

| Annotation | Use |
|---|---|
| **`@RestController`** | used when we want to **return a String** |
| **`@Controller`** | used to **return an HTML page** |

```java
return "add-student";        // don't use .html; same name as the HTML page (add-student.html)
```

`add-student.html` → `<form>`: the **`name` attribute value should be exactly the same as the instance variable in the entity class**; `action="/addStudent"`.

### Passing data to the page with `Model` (Day 88)

```
enter roll [1] [Add]  ──►  "/searchStudent" { return Student obj (st) }
                                  │ st
                                  ▼
                        Model object  ("student" → st)
                                  │
                                  ▼
                       displayStudent.html
```

- **`@Controller` → for rendering an HTML page; `@RestController` → for rendering a String.**
- **Model class / Model object:** **whatever data we want to send to the frontend, we attach to the model object and send to the frontend.**

```java
@GetMapping("/searchStudent")
public String searchStudent(@RequestParam int roll, Model model) {     // Model: import from org.springframework.ui
    Student st = ...;
    model.addAttribute("student", st);       // attribute → state of an object
    return "displayStudent";
}
```

### Showing a message (Day 89)

```
Add student form (Roll, Name) [ADD Student]
   → StudentController: service.addStudent(st); model.addAttribute("msg", "added"); return "index";
   → index page shows the message:
        <p th:if="${msg}" th:text="${msg}"></p>
```

### Login system (Days 89-90)

```
index.html [Login] [Sign up]
   Sign up → signUp.html (username, email, password, gender: M / F) → add user to DB & redirect to login page
   Login   → login.html (username, password) → valid credentials? → home.html ("Welcome home")
                                              → invalid credentials → (back to login)
```

Check shown on the page: the web form sends `username = Aman`, `password = a123`; the DB row has `id 101`, `user Aman`, `pass a123`, `email ...`; if they match → **valid** → home page. Day 90 has a faint note about finding the object by something other than the primary key and writing that method in the repository **(too faint to read)**.


## 22.5 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

### 22.5.1 What Spring Boot adds

| Plain Spring | Spring Boot |
|---|---|
| You write XML/Java config for everything | **Auto-configuration**: sees `spring-web` on the classpath → sets up the web stack |
| You deploy a WAR to a Tomcat you installed | **Embedded Tomcat** inside your JAR: `java -jar app.jar` |
| You pick compatible library versions | **Starters** (`spring-boot-starter-web`, `-data-jpa`, `-thymeleaf`...) bring a tested set |
| Settings spread around | One `application.properties` |

### 22.5.2 Request flow (your architecture picture, step by step)

```
Browser ── GET /searchStudent?roll=1 ──►  Tomcat
                                           │
                                  DispatcherServlet (front controller)
                                           │  finds the method with @GetMapping("/searchStudent")
                                           ▼
                                      StudentController          ← web layer
                                           │ calls
                                      StudentService             ← business logic
                                           │ calls
                                      StudentRepository (JpaRepository) ← data access
                                           │ SQL via Hibernate/JDBC
                                           ▼
                                        MySQL
   response ◄── HTML (Thymeleaf template filled from the Model)  or  JSON (@RestController)
```

**Why layers?** Each class has one job, so you can change the database without touching the controller, and test the service without a web server (the SOLID "single responsibility" idea).

### 22.5.3 `application.properties` for your Student Management project

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_db
spring.datasource.username=root
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```
`ddl-auto=update` creates/updates the table for your `@Entity` (use `validate` or migrations in production). **Do not commit real passwords.**

### 22.5.4 Controller vs RestController: the full picture

| | `@Controller` | `@RestController` |
|---|---|---|
| Returns | a **view name** (`"add-student"` → `templates/add-student.html`) | the **response body** (String, object → JSON) |
| Equal to | | `@Controller` + `@ResponseBody` |
| Used for | server-rendered pages (Thymeleaf) | REST APIs for React/mobile |

### 22.5.5 The mapping annotations

| Annotation | HTTP | Typical meaning |
|---|---|---|
| `@GetMapping` | GET | read |
| `@PostMapping` | POST | create |
| `@PutMapping` | PUT | replace/update |
| `@PatchMapping` | PATCH | partial update |
| `@DeleteMapping` | DELETE | delete |

Getting inputs:

| Annotation | Reads | Example |
|---|---|---|
| `@RequestParam int roll` | query string `?roll=1` (your `/searchStudent`) | |
| `@PathVariable int id` | URL part `/students/5` | |
| `@RequestBody Student s` | JSON body → object (your JSON `{roll:1,name:"Ritik"...}`) | |
| `@ModelAttribute Student s` | HTML form fields → object (works because **form field `name`s equal the entity's field names**, your Day 87 rule) | |

### 22.5.6 A small REST controller version (not compiled here: needs Spring Boot)

```java
@RestController
@RequestMapping("/students")
class StudentApi {
    private final StudentService service;
    StudentApi(StudentService service) { this.service = service; }

    @PostMapping                       public Student add(@RequestBody Student s)      { return service.add(s); }
    @GetMapping("/{roll}")             public ResponseEntity<Student> one(@PathVariable int roll) {
        return service.find(roll).map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());          // 404 when missing
    }
    @GetMapping                        public List<Student> all()                      { return service.all(); }
    @DeleteMapping("/{roll}")          public void delete(@PathVariable int roll)       { service.delete(roll); }
}

interface StudentRepository extends JpaRepository<Student, Integer> {
    List<Student> findByBranch(String branch);          // Spring Data writes the SQL from the method name!
}
```

### 22.5.7 Your `JpaRepository<T, ID>` gives you for free

`save(entity)` (insert **or** update), `findById(id)` (returns `Optional`), `findAll()`, `deleteById(id)`, `count()`, `existsById(id)`, paging `findAll(Pageable)`.

### 22.5.8 `Model`, `Thymeleaf`, and the message example (Day 88-89)

```
Controller:  model.addAttribute("msg", "added");  return "index";
Template:    <p th:if="${msg}" th:text="${msg}"></p>
```
`${msg}` reads the attribute from the model; `th:if` shows the tag only when it exists. Attributes are *"the state of an object"* in your words: the `Model` is just a map from names to objects that travels to the page.

### 22.5.9 Security warnings for the Login System (important)

The notebook compares the typed password with the one in the DB (`a123 == a123`). That means the DB stores **plain-text passwords**, which is unsafe.

1. **Never store plain passwords.** Store a **salted hash** using **BCrypt** (Spring Security's `BCryptPasswordEncoder`); compare with `matches(raw, hash)`.
2. Use **HTTPS**; never send login data in a URL (`GET`); use `POST`.
3. Don't build SQL from input (Spring Data/JPA with parameters is safe; see SQL injection in chapter 9).
4. Real apps use **Spring Security** (sessions or JWT tokens) rather than hand-written login pages.
5. Validate input (`@Valid`, `@NotBlank`, `@Email`) and send DTOs, not entities, to the client.

### 22.5.10 Common errors

| Symptom | Likely cause |
|---|---|
| `Port 8080 already in use` | Another app uses it: change `server.port` |
| `Whitelabel Error Page` (404) | No controller method matches the URL, or `@Controller` returns a name with no template |
| Template shows `[[...]]`/blank | Thymeleaf dependency missing or wrong attribute name |
| `Unable to determine Dialect` / connection refused | Wrong DB URL/credentials or DB not running |
| Form fields stay `null` in the entity | Form `name` ≠ entity field name |
| `No qualifying bean of type StudentService` | Missing `@Service` or class outside the main package's sub-packages |

### 22.5.11 Interview questions

| Level | Question | Answer |
|---|---|---|
| Basic | What is Spring Boot? | Spring with auto-configuration, starters and an embedded server. |
| Basic | `@Controller` vs `@RestController`? | View name vs response body (JSON). |
| Mid | What does `@SpringBootApplication` do? | `@Configuration` + `@EnableAutoConfiguration` + `@ComponentScan`. |
| Mid | `PUT` vs `POST`? | POST creates (not idempotent); PUT replaces a resource (idempotent). |
| Mid | What is `JpaRepository`? | Spring Data interface with ready CRUD methods; generated at start-up. |
| Advanced | What is the DispatcherServlet? | Front controller that routes every request to the right handler. |
| Advanced | Entity vs DTO? | Entity maps the table; DTO is the shape sent/received by the API. |
| Advanced | How do you store passwords? | Salted BCrypt hash, never plain text. |

### Complete worked examples *(added by Claude)*

A Spring Boot application cannot be started inside this guide, but [Java_FullStack_Syllabus_Guide.md](Java_FullStack_Syllabus_Guide.md), **Worked Example 68**, walks through a complete REST endpoint (entity, repository, service, controller, `application.properties`) together with the exact `curl` requests and the JSON responses and status codes (201, 404, 400) you should see. It is the REST counterpart of your Student Management project.

---

# 23. Constructor Deep Concept (loose page, Hinglish)

*Source: `Hibernate.pdf`, last page (a page from a different notebook, written in Hinglish).*

Written as:

> `this()` → ye same class mein non-parameterized constructor ko control bhejega.
> `this("Ritik")` → same class mein parameterized constructor ko call karega.
> Agar kisi bhi constructor call mein `this()` ya `super()` nahi hoga, to wo `super()` ko call karega. Agar `this()` hua to `super()` ko call nahi karega.
> Samajhne ke liye: Core Java → This Super Program → `Main.java`.

In English:
- `this()` sends control to the **no-argument constructor of the same class**.
- `this("Ritik")` calls the **parameterized constructor of the same class**.
- If a constructor has **neither `this()` nor `super()`**, it **calls `super()` by itself**. If `this()` is used, that constructor **does not call `super()`** (the constructor it jumps to does).
- To understand: Core Java → "This Super Program" → `Main.java`. (The earlier [Vehicle / Car example](#163-constructor-chaining-in-inheritance-day-32) is exactly this chain.)


## 23.1 Explained Simply and Going Deeper *(added by Claude, not from your notebook)*

Your Hinglish note, as a short decision list:

| Constructor starts with... | What Java does |
|---|---|
| `this(...)` | Jumps to **another constructor of the same class**. That one will eventually reach a `super(...)`. |
| `super(...)` | Jumps to the **parent** constructor. |
| neither | The compiler **adds `super();`** as the first line. |
| both | **Not allowed** (each must be the first statement). |

Exactly what the notebook says: *"if `this()` is there, it will not call `super()`"* (itself); the constructor that `this()` reaches does. The traced example is in [section 16.7.4](#1674-constructor-chaining-step-by-step-your-vehiclecar-example-verified), and the full run order (static → parent → child) in [section 16.7.3](#1673-object-creation-order-a-verified-trace).

### Complete worked examples *(added by Claude)*

#### Worked Example 22: what a constructor really does (default, parameterized, `this`, copy)

```java
public class Main {
    static class Student {
        int id; String name; double marks;                           // fields get defaults: 0, null, 0.0

        Student() { }                                                  // what the compiler adds if you write NO constructor
        Student(int id, String name) { this(id, name, 0.0); }         // reuse the full constructor
        Student(int id, String name, double marks) {
            this.id = id;                                              // 'this.id' = field, 'id' = parameter
            this.name = name;
            this.marks = marks;
        }
        Student(Student other) { this(other.id, other.name, other.marks); }   // copy constructor
        @Override public String toString() { return "Student[" + id + ", " + name + ", " + marks + "]"; }
    }

    static class NoThis {
        int id;
        NoThis(int id) { id = id; }                                   // BUG: assigns the parameter to itself
    }

    public static void main(String[] args) {
        System.out.println(new Student());
        System.out.println(new Student(1, "Asha"));
        Student s = new Student(2, "Ravi", 88.5);
        Student copy = new Student(s);
        copy.name = "Ravi (copy)";
        System.out.println(s + " / " + copy + " / same object? " + (s == copy));
        System.out.println("without this.: id = " + new NoThis(7).id);
    }
}
```

**Output:**
```text
Student[0, null, 0.0]
Student[1, Asha, 0.0]
Student[2, Ravi, 88.5] / Student[2, Ravi (copy), 88.5] / same object? false
without this.: id = 0
```

**Explanation:**
- A constructor runs once per `new` and **initialises** the object's fields. Fields not set keep their defaults (`0`, `null`, `0.0`).
- If a class declares no constructor, the compiler adds an empty no-argument one; as soon as you write any constructor, that default disappears (here it is written explicitly so `new Student()` still works).
- `this(...)` calls another constructor of the same class, avoiding duplicated code; `this.field = parameter` resolves the name clash between field and parameter. Forgetting `this.` (the `NoThis` class) silently leaves the field at `0`.
- A copy constructor builds an independent object, so changing the copy does not affect the original.

---

# 25. Java 8+ Toolkit: Generics, Lambdas, Streams, Optional

*Added by Claude. Your notebook uses raw collections, anonymous helper classes and `if/else` null checks; modern Java replaces them with the tools below. All snippets were compiled and run on JDK 17 unless marked otherwise.*

## 25.1 Generics

> **Generics = type safety for collections and classes.** The compiler checks the type, so you do not cast and you do not get `ClassCastException` at run time.

```java
List<String> names = new ArrayList<>();      // <> "diamond": the type is inferred
names.add("Asha");
// names.add(5);                             // compile error
String first = names.get(0);                 // no cast
```

| Idea | Syntax | Meaning |
|---|---|---|
| Generic class | `class Box<T> { T value; }` | `T` is a placeholder for a type |
| Generic method | `static <T> T first(List<T> l)` | type decided per call |
| Bounded type | `<T extends Comparable<T>>` | `T` must be comparable (so you may call `compareTo`) |
| Wildcard | `List<?>`, `List<? extends Number>`, `List<? super Integer>` | unknown type / read-only producer / write-only consumer (**PECS**: *Producer Extends, Consumer Super*) |
| Type erasure | | Generics exist only at **compile time**; at run time `List<String>` is just `List`. So `new T()` and `instanceof List<String>` are not allowed. |
| Primitives | `List<int>` ✗ | Use wrappers: `List<Integer>` (auto-boxing) |

## 25.2 Lambdas and functional interfaces

A **lambda** is a short anonymous function. It can be used wherever an interface with **one** abstract method (a *functional interface*) is expected.

```java
// old way: a helper class (your SortingHelper)
Collections.sort(list, new Comparator<Student>() {
    public int compare(Student a, Student b) { return a.age - b.age; }
});
// lambda:
list.sort((a, b) -> Integer.compare(a.age, b.age));
// method reference:
list.sort(Comparator.comparingInt(Student::getAge));
```

| Interface (`java.util.function`) | Method | Example |
|---|---|---|
| `Predicate<T>` | `boolean test(T)` | `String::isEmpty` |
| `Function<T,R>` | `R apply(T)` | `s -> s.length()` |
| `Consumer<T>` | `void accept(T)` | `System.out::println` |
| `Supplier<T>` | `T get()` | `() -> "s"` |
| `BiFunction<T,U,R>` | `R apply(T,U)` | `(x, y) -> x + y` |
| `Runnable` / `Callable` / `Comparator` | | `() -> ...` |

(verified: `add.apply(2,3)` = 5, `sup.get()` = `s`, `em.test("")` = `true`.)

Lambdas can only use **effectively final** local variables (variables you do not reassign).

## 25.3 Streams

A **stream** processes a collection as a pipeline: *source → intermediate operations (lazy) → terminal operation (starts the work)*. It does not change the original collection.

```java
List<Student> st = ...;
List<String> names = st.stream()
        .filter(s -> s.marks() > 80)         // keep
        .sorted(Comparator.comparingDouble(Student::marks).reversed()
                          .thenComparing(Student::name))
        .map(Student::name)                  // transform
        .collect(Collectors.toList());       // terminal: gather        → [Asha, Ritik]  (the demo data from chapter 6)

int sum  = IntStream.rangeClosed(1, 5).sum();                              // 15
long cnt = Stream.of("a", "bb", "ccc").filter(x -> x.length() > 1).count(); // 2

Map<Double, List<String>> byMarks = st.stream().collect(
        Collectors.groupingBy(Student::marks, TreeMap::new,
                              Collectors.mapping(Student::name, Collectors.toList())));
// {71.3=[Amit], 92.5=[Asha, Ritik]}   (verified)
```

| Intermediate | Terminal |
|---|---|
| `filter`, `map`, `flatMap`, `sorted`, `distinct`, `limit`, `skip`, `peek` | `collect`, `forEach`, `count`, `sum`, `min/max`, `reduce`, `anyMatch/allMatch/noneMatch`, `findFirst`, `toList()` (16+) |

Notes: a stream can be used **once**; `parallelStream()` uses many threads (only worth it for big, CPU-heavy, independent work); avoid changing outside state inside a stream. Details: [java-stream-api.md](java-stream-api.md).

## 25.4 `Optional`: say "maybe no value" without `null`

```java
Optional<String> op = Optional.ofNullable(findName());     // may hold a value or be empty
String name = op.orElse("none");                           // verified: empty → "none"
op.ifPresent(System.out::println);
op.map(String::toUpperCase).orElseGet(() -> "NONE");
// repository.findById(5).orElseThrow(() -> new StudentNotFound(5));   // typical in Spring Data
```
Use it for **return types**; do not use it for fields or parameters.

## 25.5 Modern language features (what each Java version added)

| Version | Feature | Example |
|---|---|---|
| 8 | lambdas, streams, `Optional`, `java.time`, default methods | above |
| 9 | `List.of`, `Set.of`, `Map.of`, private interface methods, modules | `List.of(1,2,3)` |
| 10 | `var` (local type inference) | `var list = new ArrayList<String>();` |
| 14-15 | switch expressions, **text blocks** `"""` | `String s = switch (day) { case 1 -> "Mon"; default -> "?"; };` |
| 16 | **records**, `instanceof` patterns | `record Student(int roll, String name, double marks) {}` |
| 17 (LTS) | **sealed classes/interfaces** | `sealed interface Shape permits Circle, Sq {}` (verified) |
| 21 (LTS) | pattern matching for `switch`, **virtual threads**, record patterns | `switch (shape) { case Circle c -> ...; case Sq q -> ... }` *(preview in 17, so it is not accepted by a default JDK 17 compiler: verified)* |
| 25 (LTS) | simpler `main`, scoped values and more | |

`enum` quick facts (verified): `Level.valueOf("HIGH").ordinal()` = 1, `Level.values()` = `[LOW, HIGH]`.

## 25.6 Interview questions

| Question | Answer |
|---|---|
| What is type erasure? | Generic type info is removed after compilation; only the compiler checks it. |
| `List<Object>` vs `List<?>`? | The first accepts only `Object` lists (no `List<String>`); `?` accepts any list but you can only read. |
| What is a functional interface? | An interface with one abstract method; usable as a lambda. |
| `map` vs `flatMap`? | `map` = one-to-one; `flatMap` = one-to-many then flatten. |
| Are streams lazy? | Yes: nothing runs until a terminal operation. |
| `Optional.get()` problem? | Throws if empty; prefer `orElse`, `orElseThrow`, `ifPresent`. |
| What is a record? | An immutable data carrier with generated constructor/accessors/`equals`/`hashCode`/`toString`. |

### Complete worked examples *(added by Claude)*

#### Worked Example 23: generics, lambdas, streams and `Optional` working together

```java
import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class Main {
    record Student(String name, String course, double marks) { }

    static <T extends Comparable<T>> T maxOf(List<T> items) {        // a generic method
        return items.stream().max(Comparator.naturalOrder()).orElseThrow();
    }

    public static void main(String[] args) {
        List<Student> students = List.of(
                new Student("Asha", "Java", 91), new Student("Ravi", "Python", 74),
                new Student("Meena", "Java", 85), new Student("Om", "Python", 58), new Student("Zoya", "Java", 67));

        Predicate<Student> passed = s -> s.marks() >= 60;
        Function<Student, String> label = s -> s.name() + "(" + (int) s.marks() + ")";
        System.out.println("passed     : " + students.stream().filter(passed).map(label).toList());
        System.out.println("top 2      : " + students.stream().sorted(Comparator.comparingDouble(Student::marks).reversed()).limit(2).map(Student::name).toList());
        System.out.println("by course  : " + students.stream().collect(Collectors.groupingBy(Student::course, TreeMap::new, Collectors.mapping(Student::name, Collectors.toList()))));
        System.out.println("avg/course : " + students.stream().collect(Collectors.groupingBy(Student::course, TreeMap::new, Collectors.averagingDouble(Student::marks))));
        System.out.println("total marks: " + students.stream().mapToDouble(Student::marks).sum());

        Optional<Student> firstFail = students.stream().filter(passed.negate()).findFirst();
        System.out.println("first fail : " + firstFail.map(Student::name).orElse("nobody"));
        Optional<Student> perfect = students.stream().filter(s -> s.marks() == 100).findFirst();
        System.out.println("perfect    : " + perfect.map(Student::name).orElse("nobody"));

        System.out.println("generic max: " + maxOf(List.of(4, 19, 7)) + ", " + maxOf(List.of("pear", "apple", "zoo")));
        Supplier<List<String>> fresh = ArrayList::new;
        List<String> names = fresh.get();
        students.forEach(s -> names.add(s.name().toUpperCase()));
        System.out.println("forEach    : " + names);
    }
}
```

**Output:**
```text
passed     : [Asha(91), Ravi(74), Meena(85), Zoya(67)]
top 2      : [Asha, Meena]
by course  : {Java=[Asha, Meena, Zoya], Python=[Ravi, Om]}
avg/course : {Java=81.0, Python=66.0}
total marks: 375.0
first fail : Om
perfect    : nobody
generic max: 19, zoo
forEach    : [ASHA, RAVI, MEENA, OM, ZOYA]
```

**Explanation:**
- `Predicate`, `Function` and `Supplier` are functional interfaces; the lambdas assigned to them can be reused and combined (`passed.negate()`).
- A stream pipeline reads like the question it answers: filter → map → collect. `groupingBy` with `TreeMap::new` groups and sorts by course in one step.
- `findFirst` returns an `Optional` because there may be no match; `map(...).orElse("nobody")` handles both cases without any `null` checks.
- `<T extends Comparable<T>>` lets one `maxOf` work for numbers and strings alike.

---

# 26. JVM Memory, Garbage Collection and Performance

*Added by Claude. It extends your "segments of JRE" (chapter 1) and the stack frame notes.*

## 26.1 Memory areas again, with what lives in each

| Area | Per thread? | Holds | Error when exhausted |
|---|---|---|---|
| **Heap** | shared | all objects & arrays (your `new ...`), String pool | `OutOfMemoryError: Java heap space` |
| **Stack** | **one per thread** | stack frames: local variables, parameters, references | `StackOverflowError` (too deep recursion) |
| **Metaspace** (was PermGen) | shared | class definitions, method bytecode, static variable metadata | `OutOfMemoryError: Metaspace` |
| **PC register** | per thread | address of the current instruction | |
| **Native method stack** | per thread | frames for native (C/C++) code | |

Your 4-box picture (CODE / STACK / STATIC / HEAP) is the same idea in teaching form: CODE+STATIC ≈ **Metaspace** (class data), STACK = stack, HEAP = heap.

## 26.2 The heap and garbage collection

```
HEAP
 ├─ Young generation:  Eden  |  Survivor S0  |  Survivor S1     ← new objects start in Eden
 └─ Old (Tenured) generation                                    ← objects that survived many collections
```

1. `new Student()` → allocated in **Eden**.
2. **Minor GC** (fast): live objects move to a Survivor space; dead ones are dropped.
3. Objects that survive several rounds are promoted to the **Old generation**.
4. **Major/Full GC** (slower, can pause the program) cleans the Old generation.

An object is *garbage* when it is **unreachable** from any **GC root** (stack variables, static fields, active threads). That is the precise version of your note "no reference variable → garbage object".

| Collector | Notes |
|---|---|
| Serial / Parallel | simple, throughput-oriented |
| **G1** (default since Java 9) | splits heap into regions, balances pause time and throughput |
| **ZGC / Shenandoah** | very low pause times for big heaps |

## 26.3 References and memory leaks

| Reference | Collected when |
|---|---|
| Strong (`Student s = new Student()`) | never while reachable |
| `SoftReference` | memory is low (caches) |
| `WeakReference` | at the next GC (`WeakHashMap`) |

Java has no dangling pointers but it **can leak**: objects that are still *referenced* but no longer *needed*. Typical causes: a `static` collection that only grows, listeners never removed, unclosed resources, `ThreadLocal` in thread pools.

## 26.4 Reading the errors

```java
static void recurse() { recurse(); }                      // no base case → StackOverflowError
List<long[]> list = new ArrayList<>();
while (true) list.add(new long[1_000_000]);              // heap fills → OutOfMemoryError: Java heap space
```
Each recursive call pushes a new stack frame (your Day 12 `findRem` picture), and frames are only removed when the method returns.

## 26.5 Useful flags and tools

| Tool / flag | Use |
|---|---|
| `-Xms256m -Xmx1g` | initial / maximum heap |
| `-Xss1m` | thread stack size |
| `-XX:+PrintCompilation` | see JIT compilation |
| `-Xlog:gc` | GC log |
| `jps`, `jstack <pid>` | list JVMs / **thread dump** (find deadlocks, see thread states) |
| `jmap -histo <pid>`, `jcmd` | heap statistics |
| **VisualVM**, **JFR / JDK Mission Control** | profiling |

## 26.6 Performance habits that matter most

1. Choose the right **algorithm and collection** first (`HashMap` lookup vs scanning a list).
2. Use `StringBuilder` in loops; avoid creating objects in hot loops (boxing: `Integer` vs `int`).
3. Don't guess: **measure** (profiler, JMH benchmarks).
4. Close resources; keep caches bounded.
5. For many tasks use pools (or virtual threads, Java 21) instead of a raw thread per task.

## 26.7 Interview questions

| Question | Answer |
|---|---|
| Stack vs heap? | Stack = per-thread frames (locals); heap = shared objects. |
| When is an object eligible for GC? | When no GC root can reach it. |
| Can we force GC? | No: `System.gc()` is only a hint. |
| `StackOverflowError` vs `OutOfMemoryError`? | Too deep call chain vs too many objects / not enough memory. |
| What replaced PermGen? | Metaspace (native memory) in Java 8. |
| Default GC today? | G1. |
| Memory leak in Java? | Reachable but useless objects (static collections, listeners...). |

More depth: [Java_Complete_Guide.md §13](Java_Complete_Guide.md#13-jvm-internals-interview-imp), [Java_Fundamentals_Deep_Dive.md §8](Java_Fundamentals_Deep_Dive.md#8-segments-of-the-jre--jvm-memory-areas-interview-imp---java).

### Complete worked examples *(added by Claude)*

#### Worked Example 24: watching memory and garbage collection from inside a program

```java
// NONDETERMINISTIC: exact memory numbers differ by machine; only the comparisons are printed.
import java.lang.ref.WeakReference;
import java.util.*;

public class Main {
    static List<byte[]> leak = new ArrayList<>();                     // a static list keeps objects reachable

    public static void main(String[] args) throws Exception {
        Runtime rt = Runtime.getRuntime();
        System.out.println("max heap (-Xmx) is set: " + (rt.maxMemory() > 0) + ", available processors > 0: " + (rt.availableProcessors() > 0));

        WeakReference<byte[]> temp = new WeakReference<>(new byte[10 * 1024 * 1024]);   // 10 MB, nothing else refers to it
        for (int i = 0; i < 5 && temp.get() != null; i++) { System.gc(); Thread.sleep(50); }
        System.out.println("unreachable 10 MB array collected: " + (temp.get() == null));

        for (int i = 0; i < 5; i++) leak.add(new byte[10 * 1024 * 1024]);
        System.gc();
        Thread.sleep(50);
        long usedMb = (rt.totalMemory() - rt.freeMemory()) / (1024 * 1024);
        System.out.println("50 MB held by a static list survives GC: " + (usedMb >= 50));
        leak.clear();                                                  // remove the references
        System.gc();
        Thread.sleep(50);
        long afterMb = (rt.totalMemory() - rt.freeMemory()) / (1024 * 1024);
        System.out.println("after clearing the list, memory is reclaimed: " + (afterMb < usedMb));

        String a = "pool", b = "pool", c = new String("pool");
        System.out.println("string literals share the pool: " + (a == b) + ", new String does not: " + (a == c));
    }
}
```

**Output:**
```text
max heap (-Xmx) is set: true, available processors > 0: true
unreachable 10 MB array collected: true
50 MB held by a static list survives GC: true
after clearing the list, memory is reclaimed: true
string literals share the pool: true, new String does not: false
```

**Explanation:**
- The garbage collector frees objects that are **unreachable** from GC roots (stack variables, static fields). The 10 MB array is referenced only weakly, so the first `System.gc()` normally collects it.
- The 50 MB in the static list stays alive because a static field is a GC root: this is exactly how most Java **memory leaks** happen (a collection that only grows). Clearing the list makes the arrays unreachable and the memory is reclaimed.
- `System.gc()` is only a *request*; real programs should not call it. It is used here only to make the effect visible.

---

# 27. Design Patterns You Will Meet

*Added by Claude. A pattern is a proven solution to a common design problem. These tie together your notebook's static, constructor, interface and Spring topics. All snippets compiled and ran.*

## 27.1 Singleton: exactly one instance (uses `static`, private constructor)

```java
enum Single { INSTANCE; int n; }            // simplest and thread-safe: Single.INSTANCE

class Lazy {                                // lazy + thread-safe via the class-loader (holder idiom)
    private static class H { static final Lazy I = new Lazy(); }
    static Lazy get() { return H.I; }
    private Lazy() {}                       // nobody else can call new
}
// Lazy.get() == Lazy.get()  → true   (verified)
```
Spring beans are singletons by default, so you rarely write this by hand.

## 27.2 Factory: hide `new` behind a method

```java
interface Notification { void send(String msg); }
class Sms implements Notification { public void send(String m) { ... } }
class Email implements Notification { public void send(String m) { ... } }
class NotificationFactory {
    static Notification of(String type) { return type.equals("sms") ? new Sms() : new Email(); }
}
```
Callers use the **interface** (your upcasting); the factory chooses the class.

## 27.3 Builder: many optional fields, readable code (verified)

```java
class Pizza {
    final String size; final boolean cheese;
    private Pizza(Builder b) { size = b.size; cheese = b.cheese; }
    static class Builder {
        String size = "M"; boolean cheese;
        Builder size(String s)    { size = s;   return this; }     // return this → chaining (uses `this`)
        Builder cheese(boolean c) { cheese = c; return this; }
        Pizza build() { return new Pizza(this); }
    }
}
Pizza z = new Pizza.Builder().size("L").cheese(true).build();      // "Ltrue"
```
It avoids constructors with many parameters. (Lombok's `@Builder` generates this.)

## 27.4 Strategy: swap behaviour (polymorphism / lambdas)

```java
interface Pay { void pay(int amt); }
Pay upi  = amt -> System.out.println("UPI " + amt);
Pay card = amt -> System.out.println("Card " + amt);
upi.pay(5);                                 // UPI 5  (verified)
```
Your `Teacher ref` / `StudentActivities sa` examples are strategy in disguise.

## 27.5 Observer, DAO/Repository, MVC, Dependency Injection

| Pattern | Idea | Where you have seen it |
|---|---|---|
| **Observer** | Subscribers get notified when something changes | event listeners, `PropertyChangeListener`, Spring events |
| **DAO / Repository** | One class holds all database access for an entity | `StudentRepository` (Day 85), JDBC DAO (chapter 9) |
| **MVC** | Model-View-Controller separates data, UI and input handling | Day 81, Spring MVC |
| **Dependency Injection** | Dependencies are supplied from outside | Spring (chapter 21) |
| **Template Method** | Parent defines the steps, children fill some | abstract class with concrete + abstract methods (chapter 19) |
| **Adapter / Decorator / Proxy** | Wrap an object to adapt, add behaviour or control access | `BufferedReader(new InputStreamReader(...))`, Spring AOP/transactions |

## 27.6 SOLID in one line each

| Letter | Principle | Meaning |
|---|---|---|
| **S** | Single Responsibility | A class has one reason to change (Controller / Service / Repository split) |
| **O** | Open/Closed | Open for extension, closed for modification (add a new `Teacher` subclass, don't edit `teacherMethod`) |
| **L** | Liskov Substitution | A child must work wherever the parent is expected (the override rules) |
| **I** | Interface Segregation | Several small interfaces beat one huge one |
| **D** | Dependency Inversion | Depend on abstractions (interfaces), not on concrete classes (IoC/DI) |

Much more: [01_LLD_Design_Patterns.md](../design-patterns/01_LLD/01_LLD_Design_Patterns.md), [02_Creational_Pattern.md](../design-patterns/01_LLD/02_Creational_Pattern.md).

### Complete worked examples *(added by Claude)*

#### Worked Example 25: Singleton, Factory, Builder, Strategy and Observer in one program

```java
import java.util.*;
import java.util.function.*;

public class Main {
    enum Config {                                                     // SINGLETON (enum form)
        INSTANCE;
        final String appName = "StudentPortal";
    }

    interface Notification { String send(String msg); }               // FACTORY
    static Notification create(String type) {
        return switch (type) {
            case "email" -> m -> "EMAIL: " + m;
            case "sms" -> m -> "SMS: " + m;
            default -> throw new IllegalArgumentException("unknown type " + type);
        };
    }

    static final class Student {                                       // BUILDER
        private final String name; private final int age; private final String course;
        private Student(Builder b) { name = b.name; age = b.age; course = b.course; }
        static Builder builder() { return new Builder(); }
        static final class Builder {
            private String name; private int age; private String course = "Java";
            Builder name(String n) { name = n; return this; }
            Builder age(int a) { age = a; return this; }
            Builder course(String c) { course = c; return this; }
            Student build() { if (name == null) throw new IllegalStateException("name required"); return new Student(this); }
        }
        @Override public String toString() { return name + " (" + age + ", " + course + ")"; }
    }

    static class FeeCalculator {                                       // STRATEGY
        private final DoubleUnaryOperator discount;
        FeeCalculator(DoubleUnaryOperator discount) { this.discount = discount; }
        double fee(double base) { return discount.applyAsDouble(base); }
    }

    static class Course {                                              // OBSERVER
        private final List<Consumer<String>> subscribers = new ArrayList<>();
        void subscribe(Consumer<String> s) { subscribers.add(s); }
        void announce(String msg) { subscribers.forEach(s -> s.accept(msg)); }
    }

    public static void main(String[] args) {
        System.out.println("Singleton : " + Config.INSTANCE.appName + ", same instance: " + (Config.INSTANCE == Config.valueOf("INSTANCE")));
        System.out.println("Factory   : " + create("email").send("Welcome") + " | " + create("sms").send("OTP 4821"));
        System.out.println("Builder   : " + Student.builder().name("Asha").age(21).build() + " | " + Student.builder().name("Ravi").age(23).course("Spring").build());
        FeeCalculator regular = new FeeCalculator(b -> b), scholarship = new FeeCalculator(b -> b * 0.5), early = new FeeCalculator(b -> b - 1000);
        System.out.println("Strategy  : regular " + regular.fee(20000) + ", scholarship " + scholarship.fee(20000) + ", early-bird " + early.fee(20000));
        Course java = new Course();
        java.subscribe(m -> System.out.println("Observer  : Asha got '" + m + "'"));
        java.subscribe(m -> System.out.println("Observer  : Ravi got '" + m + "'"));
        java.announce("Class moved to 10 AM");
    }
}
```

**Output:**
```text
Singleton : StudentPortal, same instance: true
Factory   : EMAIL: Welcome | SMS: OTP 4821
Builder   : Asha (21, Java) | Ravi (23, Spring)
Strategy  : regular 20000.0, scholarship 10000.0, early-bird 19000.0
Observer  : Asha got 'Class moved to 10 AM'
Observer  : Ravi got 'Class moved to 10 AM'
```

**Explanation:**

| Pattern | Problem it solves | Where in this program |
|---|---|---|
| **Singleton** | exactly one shared instance | `Config.INSTANCE` (the enum form is thread-safe and serialization-safe) |
| **Factory** | callers ask for "an email notification" without knowing the class | `create("email")` |
| **Builder** | readable construction of objects with many optional fields, with validation in one place | `Student.builder()...build()`; `course` defaults to "Java" |
| **Strategy** | swap an algorithm at run time | three `FeeCalculator`s with different discount rules |
| **Observer** | notify many listeners when something happens | `Course.announce` calls every subscriber |

Spring uses these constantly: beans are singletons, `BeanFactory` is a factory, `ResponseEntity.ok().body(...)` is a builder, and application events are observers.

---

# 28. Interview Question Bank from These Notes (Basic → Advanced)

*Added by Claude. Short answers; the chapter that explains each is in brackets.*

## Level 1: Basics

1. **Is Java compiled or interpreted?** Both: `javac` → bytecode, JVM interprets + JIT. [1]
2. **JDK vs JRE vs JVM?** Dev kit ⊃ runtime ⊃ virtual machine. [1]
3. **What is WORA?** Compile once; any JVM runs the bytecode. [1]
4. **Primitive types and sizes?** `byte 1, short 2, int 4, long 8, float 4, double 8, char 2, boolean (JVM-dependent)`. [1]
5. **Implicit vs explicit casting?** Small→big automatic; big→small needs `(type)` and may lose data. [1]
6. **`next()` vs `nextLine()`?** Token vs rest of the line. [2]
7. **What is a method signature?** Name + parameter types. [13]
8. **Parameters vs arguments?** In the declaration vs in the call. [13]
9. **What is a constructor?** Special method, same name as class, no return type, runs at object creation. [15]
10. **Local vs instance variable?** Stack, no default vs heap, default value. [13]

## Level 2: Core OOP

11. **Four pillars?** Encapsulation, inheritance, polymorphism, abstraction. [15-19]
12. **Overloading vs overriding?** Same class/different params/compile time vs parent-child/same signature/run time. [17]
13. **Why no multiple inheritance with classes?** Diamond problem; use interfaces. [16]
14. **`this` vs `super`?** Current object / parent object (also `this()` / `super()` constructor calls). [16]
15. **`final` on class/method/variable?** No inherit / no override / constant. [16]
16. **Access modifiers?** private < default < protected < public. [16]
17. **Abstract class vs interface?** Table in [19.7.2]. [19]
18. **What is upcasting/downcasting?** Child→parent (safe) / parent→child (cast, can fail). [17]
19. **`static` block vs instance block?** Once at class load vs for every object before the constructor. [18]
20. **String immutability and pool?** [14]
21. **`==` vs `equals`?** Reference vs content. [14]
22. **StringBuilder vs StringBuffer?** Not synchronized/fast vs synchronized. [14]

## Level 3: Exceptions, collections, threads

23. **Checked vs unchecked?** Compiler-enforced vs runtime. [3]
24. **`throw` vs `throws`; `final` vs `finally`?** [3]
25. **Can `finally` be skipped?** Only by `System.exit`/crash. [3]
26. **try-with-resources?** Auto-closes `AutoCloseable`s. [3]
27. **ArrayList vs LinkedList?** [5]
28. **How does HashMap work?** Hash → bucket → `equals`; resize at 0.75; trees at ≥ 8. [5, 7]
29. **Why override both `equals` and `hashCode`?** Hash-based collections need them to agree. [5]
30. **Comparable vs Comparator?** [6]
31. **Fail-fast vs fail-safe?** [8]
32. **Thread states / `start()` vs `run()`?** [4]
33. **`synchronized` vs `volatile` vs atomic?** [4]
34. **What is a deadlock and how to avoid it?** [4]
35. **`wait()` vs `sleep()`?** [4]
36. **Runnable vs Callable?** [4]

## Level 4: Frameworks and databases

37. **JDBC steps / `PreparedStatement` benefits?** [9]
38. **What is ORM / Hibernate / JPA?** [10]
39. **Entity states; lazy vs eager; N+1?** [10, 20]
40. **IoC vs DI; bean; scopes?** [21]
41. **Constructor vs setter injection?** [21]
42. **`@Autowired` and `@Qualifier`?** [21]
43. **Spring Boot vs Spring?** [22]
44. **`@RestController` vs `@Controller`; `@RequestParam` vs `@PathVariable` vs `@RequestBody`?** [22]
45. **MVC layers and responsibilities?** [22]
46. **How should passwords be stored?** Salted BCrypt hash. [22]

## Level 5: Advanced / design

47. **Explain the object creation order with inheritance.** Static (parent→child) → parent init/constructor → child init/constructor. [16]
48. **Why is calling an overridable method in a constructor dangerous?** The child sees default field values. [16]
49. **Composition vs inheritance?** [16]
50. **Explain type erasure.** [25]
51. **Streams: lazy evaluation, `flatMap`.** [25]
52. **Heap generations and GC roots.** [26]
53. **How do you find a deadlock in production?** `jstack`/thread dump. [26]
54. **Singleton: thread-safe ways.** Enum or holder idiom. [27]
55. **SOLID with an example from these notes.** [27]
56. **Virtual threads vs platform threads (Java 21).** [4, 25]

---

# 29. Learning Roadmap and Master Cheat Sheet (Basic → Advanced)

*Added by Claude.*

## 29.1 The ladder

| Stage | Topics (this file) | Practice project | Next reading |
|---|---|---|---|
| **1 Foundations** | Ch 1-2: compile/run, types, operators, casting, Scanner | Calculator, grade calculator, temperature converter | [Java_Fundamentals_Deep_Dive.md](Java_Fundamentals_Deep_Dive.md) |
| **2 Control & methods** | Ch 1.13, 13: methods, overloading, recursion | Prime/factorial/Fibonacci, number games | [Java_Complete_Guide.md](Java_Complete_Guide.md) ch 3-5 |
| **3 OOP** | Ch 13-19 | Bank account, student management (console), library system | [01_LLD_Design_Patterns.md](../design-patterns/01_LLD/01_LLD_Design_Patterns.md) |
| **4 Robustness** | Ch 3, 11 exceptions; Ch 14 Strings | Bank app with custom exceptions + input validation | [exception_handling/](exception_handling) |
| **5 Data structures** | Ch 5-8 collections, sorting, maps | Contact book, word counter, leaderboard | [Java_Collections_Framework_Guide.md](Java_Collections_Framework_Guide.md) |
| **6 Concurrency** | Ch 4, 12 | Producer-consumer, parallel downloader, thread-safe counter | [Java_Complete_Guide.md](Java_Complete_Guide.md) ch 12 |
| **7 Modern Java** | Ch 25 | Rewrite earlier projects with streams/records | [java-stream-api.md](java-stream-api.md) |
| **8 Databases** | Ch 9-10, 20 | JDBC CRUD, then Hibernate CRUD | [MySQL_Complete_Guide.md](../mysql/MySQL_Complete_Guide.md) |
| **9 Spring** | Ch 21-23 | Student Management + Login (with BCrypt) | [spring-springboot-topics.md](../pdf/java/spring-springboot-topics.md) |
| **10 Production** | Ch 26-27 + testing (JUnit/Mockito), logging, Docker | Dockerize the Spring app, add REST + tests | [00_Docker_Index.md](../docker/00_Docker_Index.md), [Client_Server_Web_Architecture_Guide.md](../web-architecture/Client_Server_Web_Architecture_Guide.md) |

## 29.2 One-page cheat sheet

```text
RUN        javac Main.java ; java Main ; java Main.java (11+) ; javap -c Main
TYPES      byte1 short2 int4 long8 float4 double8 char2 boolean ; 10L 2.5f 0b1010 012(octal!) 0xFF
CAST       small→big automatic ; big→small (type) ; byte+byte=int ; b += 1 has a hidden cast
INPUT      sc.next() | sc.nextLine() | nextInt() then nextLine() trap ; BufferedReader for speed
METHODS    pass-by-value always ; overload: exact→widening→boxing→varargs
OBJECTS    new → heap ; reference → stack ; locals no default ; fields default 0/null/false
STRINGS    immutable, pool ; equals not == ; StringBuilder in loops
OOP        encapsulation(private+get/set) inheritance(extends) polymorphism(override+upcast) abstraction(abstract/interface)
CTOR       this()/super() first line ; no ctor written → default added ; order: static → parent → child
STATIC     class-level ; static can't use this/instance ; static block runs once before main
EXCEPTION  checked(compiler) vs unchecked ; try→catch(specific first)→finally ; try-with-resources
THREAD     start() not run() ; Runnable > Thread ; synchronized/atomic ; wait in while ; join waits ; daemon
COLLECT    ArrayList(array) LinkedList(nodes) ArrayDeque(both ends) PriorityQueue(heap) HashSet TreeSet(sorted) ; HashMap(0.75, tree@8)
SORT       Comparable(compareTo, in class) Comparator(compare, outside) ; Integer.compare not a-b
FAILFAST   modify during for-each → ConcurrentModificationException ; use Iterator.remove / removeIf
JDBC       PreparedStatement ; try-with-resources ; transactions ; batch
SPRING     IoC(container creates) DI(inject) bean(singleton default) @Autowired(by type) @Qualifier(by id)
BOOT       controller → service → repository → DB ; @Controller view ; @RestController JSON
SECURITY   never plain passwords (BCrypt) ; PreparedStatement ; HTTPS
```

---

# 30. Notes About This File

- The handwritten content (chapters 1-23) comes from your six PDFs: every page has been read. Anything marked **(unclear)** is handwriting I could not read confidently.
- The `Hibernate.pdf` file is mostly **Hibernate CRUD + Spring + Spring Boot (Days 76-90)**; the Hibernate setup and mapping notes (Days 70-75) are inside `Exception_2.pdf`.
- Items marked **Clarification** are my additions. I ran the code for the Day 37 output, overloading with `add(10, 30.5)`, `String` comparisons and the Vehicle/Car constructor chain to confirm your notes' results.
- Blocks titled **"Explained Simply and Going Deeper"** and chapters 25-29 are **additions by Claude**, not from your notebook. Code in them marked *verified* was compiled and run on JDK 17; Spring/Hibernate snippets are marked *not compiled here* because they need those libraries.
