---
format: md
---

# Java Practice Curriculum Guide: From First Program to Number, Array and String Problems

> **Note**: Sections marked **(Interview Imp - Java)** are frequently asked in interviews.
>
> **How to read this file:** it follows your 5-module course list in order. Every *learn* topic has four parts:
>
> 1. **Concept**: what the feature is and why it exists, in plain language.
> 2. **Syntax**: the exact form you write.
> 3. **Worked examples**: complete programs you can copy into `Main.java`, each followed by its **exact output** and an **explanation of why that output appears** (often as a dry-run table).
> 4. **Practice titles**: every exercise from your course list with the approach and a hint, so you can write the solution yourself.
>
> Every complete program in this file was compiled and run on **OpenJDK 17**, and the printed output was compared against the text shown. Programs that read input show the input used in a `// stdin:` comment at the top.
>
> **Related files:** [Java_Handwritten_Notes.md](Java_Handwritten_Notes.md) (your notebook, typed up) · [Java_Fundamentals_Deep_Dive.md](Java_Fundamentals_Deep_Dive.md) · [Java_Complete_Guide.md](Java_Complete_Guide.md) · [Java_Collections_Framework_Guide.md](Java_Collections_Framework_Guide.md)

| Module | Topics | Level |
|---|---|---|
| **1. Introduction to Java Programming** | Input/output, operators | Beginner |
| **2. Control Constructs** | `if`, `if-else`, `switch`, loops, `break`/`continue`, nested and labeled loops | Beginner |
| **3. Number Manipulation** | `if-else` ladders, coordinates, methods, sums | Beginner → Intermediate |
| **4. Advanced Number Manipulation** | primes, digits, palindromes, Armstrong, Fibonacci, factorial, special numbers | Intermediate |
| **5. Array & String Manipulation** | arrays, copying, sum/max, string operations | Intermediate |

---

## Table of Contents
0. [Before You Start: How to Compile, Run and Read the Examples](#0-before-you-start-how-to-compile-run-and-read-the-examples)
1. [Module 1: Introduction to Java Programming](#1-module-1-introduction-to-java-programming)
   - [1.1 Writing Basic Java Programs: Input and Output](#11-writing-basic-java-programs-input-and-output)
   - [1.2 Operators in Java](#12-operators-in-java)
2. [Module 2: Control Constructs](#2-module-2-control-constructs)
   - [2.1 Conditional Statements](#21-conditional-statements)
   - [2.2 Looping Statements](#22-looping-statements)
   - [2.3 Jumping Statements](#23-jumping-statements)
3. [Module 3: Number Manipulation](#3-module-3-number-manipulation)
   - [3.1 Decision Making with if-else](#31-decision-making-with-if-else)
   - [3.2 if-else Ladder and Coordinates](#32-if-else-ladder-and-coordinates)
   - [3.3 Methods in Java](#33-methods-in-java)
4. [Module 4: Advanced Number Manipulation](#4-module-4-advanced-number-manipulation)
   - [4.1 Prime Numbers and Prime Factors](#41-prime-numbers-and-prime-factors)
   - [4.2 Digits: Sum, Reverse, Palindrome, Power](#42-digits-sum-reverse-palindrome-power)
   - [4.3 Armstrong Numbers and Fibonacci](#43-armstrong-numbers-and-fibonacci)
   - [4.4 Factors, Factorial and Strong Numbers](#44-factors-factorial-and-strong-numbers)
   - [4.5 Perfect, Automorphic, Harshad, Abundant and Amicable Numbers](#45-perfect-automorphic-harshad-abundant-and-amicable-numbers)
   - [4.6 Capstone: One Program That Classifies a Number Every Way](#46-capstone-one-program-that-classifies-a-number-every-way)
5. [Module 5: Array and String Manipulation](#5-module-5-array-and-string-manipulation)
   - [5.1 Arrays](#51-arrays)
   - [5.2 Strings](#52-strings)
6. [Common Mistakes Across All Modules](#6-common-mistakes-across-all-modules)
7. [Interview Questions](#7-interview-questions)
8. [Predict-the-Output Quiz](#8-predict-the-output-quiz)
9. [How to Practise and Self-Check](#9-how-to-practise-and-self-check)
10. [Cheat Sheet](#10-cheat-sheet)

---

# 0. Before You Start: How to Compile, Run and Read the Examples

### The two commands

```bash
javac Main.java      # compile: Main.java  →  Main.class (bytecode)
java Main            # run the class that has main()
java Main.java       # Java 11+ shortcut: compile in memory and run in one step
```

| Step | Tool | Input | Output | Errors you can get |
|---|---|---|---|---|
| Compile | `javac` | `Main.java` (source) | `Main.class` (bytecode) | **Compile-time errors**: missing `;`, wrong type, undefined variable |
| Run | `java` (the JVM) | `Main.class` | whatever your program prints | **Runtime exceptions**: divide by zero, array index out of bounds |

### The skeleton every program in this file uses

```java
public class Main {                              // 1. class name must match the file name Main.java
    public static void main(String[] args) {     // 2. the JVM starts here
        System.out.println("Ready to practise"); // 3. your statements go here
    }
}
```

**Output:**
```text
Ready to practise
```

**Explanation:**

| Part | Meaning |
|---|---|
| `public class Main` | Declares a class. A `public` class must live in a file with the same name (`Main.java`). |
| `public` | The JVM (which is outside your class) must be able to call `main`. |
| `static` | The JVM calls `main` **without creating an object** of `Main`. |
| `void` | `main` returns nothing to the JVM. |
| `String[] args` | Command-line arguments: `java Main hello 42` gives `args[0] = "hello"`, `args[1] = "42"`. |
| `System.out.println` | `System` class → its static field `out` (a `PrintStream` connected to the console) → method `println`. |

### How to read the examples

- **Snippets** (a few lines, no `class`) must be placed inside `main` to run.
- **Complete programs** (with `public class ... main`) can be saved and run as they are.
- The **Output** block directly below a program is the exact text the program prints.
- The **Explanation** or **Dry run** below that tells you *why* each line of output appears. When you practise, try to predict the output **before** reading it.

---

# 1. Module 1: Introduction to Java Programming

## 1.1 Writing Basic Java Programs: Input and Output

### Concept

A program is useful only if it can **talk to the user**: show results (*output*) and accept data (*input*). Java connects every program to three standard streams:

| Stream | Java object | Default device | Typical use |
|---|---|---|---|
| Standard output | `System.out` | console | normal results |
| Standard error | `System.err` | console (often shown in red by IDEs) | error and warning messages |
| Standard input | `System.in` | keyboard | reading data, usually wrapped in a `Scanner` |

### Output: three print methods

| Method | Moves to a new line afterwards? | Use it for |
|---|---|---|
| `System.out.println(x)` | **Yes** | One result per line |
| `System.out.print(x)` | No | Building one line piece by piece |
| `System.out.printf(format, values...)` | Only if the format contains `%n` or `\n` | Tables, decimals, aligned columns |

#### Example 1: comparing `println`, `print` and `printf`

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to Java!");          // prints, then a new line
        System.out.print("Hello ");                      // prints, stays on the same line
        System.out.print("World\n");                     // \n = new line
        System.out.printf("%d + %d = %d%n", 7, 5, 7 + 5); // formatted
        System.out.println();                            // empty println = blank line
        System.out.println("Done");
    }
}
```

**Output:**
```text
Welcome to Java!
Hello World
7 + 5 = 12

Done
```

**Explanation:**
- `println` prints `Welcome to Java!` and moves the cursor to the next line.
- The two `print` calls write on the **same line**; the `\n` at the end of `"World\n"` is what finally ends that line.
- In `printf`, each `%d` is replaced, in order, by the next value: `7`, `5`, then `12` (Java computes `7 + 5` **before** calling `printf`). `%n` ends the line.
- `println()` with no argument prints only a line break, which produces the blank line.

#### Format specifiers

| Format | Meaning | Example | Result |
|---|---|---|---|
| `%d` | integer (`int`, `long`) | `printf("%d", 42)` | `42` |
| `%f` | decimal, 6 places by default | `printf("%f", 3.14159)` | `3.141590` |
| `%.2f` | decimal, 2 places (rounded) | `printf("%.2f", 3.14159)` | `3.14` |
| `%s` | string (or anything, via `toString()`) | `printf("%s", "Java")` | `Java` |
| `%c` | character | `printf("%c", 'A')` | `A` |
| `%b` | boolean | `printf("%b", 5 > 3)` | `true` |
| `%5d` | integer, right-aligned in width 5 | `printf("[%5d]", 42)` | `[   42]` |
| `%-5d` | integer, left-aligned in width 5 | `printf("[%-5d]", 42)` | `[42   ]` |
| `%05d` | pad with zeros | `printf("%05d", 42)` | `00042` |
| `%,d` | thousands separator | `printf("%,d", 1234567)` | `1,234,567` |
| `%%` | a literal `%` sign | `printf("50%%")` | `50%` |
| `%n` | platform-independent new line | | |

#### Example 2: printing a neat bill with `printf`

```java
public class Main {
    public static void main(String[] args) {
        String[] items = {"Pen", "Notebook", "Bag"};
        int[] qty      = {3, 2, 1};
        double[] price = {10.5, 45.0, 799.99};

        System.out.printf("%-10s %5s %10s%n", "Item", "Qty", "Amount");
        System.out.println("-".repeat(27));
        double total = 0;
        for (int i = 0; i < items.length; i++) {
            double amount = qty[i] * price[i];
            total += amount;
            System.out.printf("%-10s %5d %10.2f%n", items[i], qty[i], amount);
        }
        System.out.println("-".repeat(27));
        System.out.printf("%-10s %16.2f%n", "Total", total);
        System.out.printf("GST 18%%: %.2f%n", total * 0.18);
    }
}
```

**Output:**
```text
Item         Qty     Amount
---------------------------
Pen            3      31.50
Notebook       2      90.00
Bag            1     799.99
---------------------------
Total                921.49
GST 18%: 165.87
```

**Explanation:**
- `%-10s` reserves 10 characters and **left**-aligns the text; `%5d` and `%10.2f` **right**-align numbers, which is how real bills line up their columns.
- `%10.2f` rounds to two decimals: `3 × 10.5 = 31.5` is shown as `31.50`.
- `"-".repeat(27)` (Java 11+) builds a 27-character dashed line.
- `%%` prints a single `%`; a lone `%` followed by `:` would throw `UnknownFormatConversionException`.
- `921.49 × 0.18 = 165.8682`, which `%.2f` rounds to `165.87`.

#### Example 3: escape sequences and text blocks

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Tab:\tafter tab");
        System.out.println("Quote: \"Java\"  Backslash: \\  Apostrophe: \'");
        System.out.println("Line1\nLine2");
        String poem = """
                Roses are red,
                  Java is cool.
                """;                    // text block (Java 15+)
        System.out.print(poem);
    }
}
```

**Output:**
```text
Tab:	after tab
Quote: "Java"  Backslash: \  Apostrophe: '
Line1
Line2
Roses are red,
  Java is cool.
```

**Explanation:**

| Escape | Prints |
|---|---|
| `\t` | a tab |
| `\n` | a new line |
| `\"` | a double quote inside a string |
| `\\` | one backslash |
| `\'` | an apostrophe (needed in a `char` literal: `'\''`) |

A **text block** (`"""` … `"""`) keeps line breaks exactly as written. Java removes the common indentation (the 16 spaces in front of every line), so the extra 2 spaces before `Java is cool.` survive. The closing `"""` on its own line adds a final `\n`, which is why `print` (not `println`) is used.

**Practice titles in this topic**

| Practice | How to solve |
|---|---|
| Displaying a Welcome Message | One `println("Welcome ...")`. |
| Printing Multiple Lines of Text | Several `println` calls, or one string with `\n`, or a text block `"""..."""` (Example 3). |
| Writing to Standard Output | `System.out` is the *standard output stream*; try `print`, `println`, `printf`. (`System.err` is the error stream.) |

### Input: reading from the keyboard with `Scanner`

#### Concept

`System.in` delivers raw bytes. The `Scanner` class (in `java.util`) splits that input into **tokens** (pieces separated by spaces, tabs or new lines) and converts each token into the type you ask for.

| Method | Reads | Example input → value |
|---|---|---|
| `nextInt()` | one token as `int` | `42` → `42` |
| `nextLong()` | one token as `long` | `9000000000` → `9000000000L` |
| `nextDouble()` | one token as `double` | `7.5` → `7.5` |
| `nextBoolean()` | `true` / `false` | `TRUE` → `true` (case-insensitive) |
| `next()` | one word (stops at whitespace) | `Ravi Kumar` → `"Ravi"` |
| `nextLine()` | the **rest of the current line** | `Ravi Kumar` → `"Ravi Kumar"` |
| `hasNextInt()` | `true` if the next token is an int (does not consume it) | useful for validation |

#### Example 4: reading numbers, decimals and a character

```java
// stdin: 12 30\n7.5 2.5\nz
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println("Sum = " + (a + b));
        double x = sc.nextDouble();
        double y = sc.nextDouble();
        System.out.println("x + y = " + (x + y));
        System.out.println("x / y = " + (x / y));
        char ch = sc.next().charAt(0);        // there is no nextChar()
        System.out.println("You typed " + ch + ", code " + (int) ch + ", next letter " + (char) (ch - 1));
    }
}
```

Input typed by the user:
```text
12 30
7.5 2.5
z
```

**Output:**
```text
Sum = 42
x + y = 10.0
x / y = 3.0
You typed z, code 122, next letter y
```

**Explanation:**
- `nextInt()` skips whitespace, so `12` and `30` can be on one line or on two lines; the result is the same.
- `(a + b)` is in parentheses. Without them, `"Sum = " + a + b` would join strings left to right and print `Sum = 1230`.
- `x + y` and `x / y` are `double` results, so they always print with a decimal point (`10.0`, `3.0`).
- `sc.next()` returns the word `"z"`; `.charAt(0)` takes its first character.
- `(int) ch` shows the Unicode/ASCII code (`'z'` = 122). `ch - 1` is an `int` (121), so it is cast back with `(char)` to print `y`.

#### Example 5: the `nextInt()` + `nextLine()` trap and its fix

```java
// stdin: 21\nRavi Kumar
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Age: ");
        int age = sc.nextInt();        // reads "21" but leaves the Enter key ("\n") in the buffer
        sc.nextLine();                 // FIX: consume that leftover "\n"
        System.out.print("Full name: ");
        String name = sc.nextLine();   // now reads the whole line "Ravi Kumar"
        System.out.println();
        System.out.println(name + " is " + age + " years old.");
    }
}
```

**Output:**
```text
Age: Full name: 
Ravi Kumar is 21 years old.
```

**Explanation:**
- The prompts appear on one line here only because the input came from a file; when you type at a keyboard, your input and Enter key appear after each prompt.
- After `nextInt()` reads `21`, the line break the user typed is **still waiting** in the input. Without the extra `sc.nextLine()`, the next `nextLine()` would return that empty remainder (`""`) at once and `name` would be empty.
- Rule: **after any `nextInt()`/`nextDouble()`/`next()`, call `sc.nextLine()` once before reading a full line.**

#### Example 6: division results for `int` vs `double` (the "Dividing Double Numbers" practice)

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(7 / 2);        // int / int
        System.out.println(7 / 2.0);      // int / double
        System.out.println(0.1 + 0.2);    // binary floating point
        System.out.println(5 / 0.0);      // double divided by zero
        System.out.println(-5 / 0.0);
        System.out.println(0.0 / 0.0);
        System.out.println(5 / 0);        // int divided by zero
    }
}
```

**Output:**
```text
3
3.5
0.30000000000000004
Infinity
-Infinity
NaN
Exception in thread "main" java.lang.ArithmeticException: / by zero
	at Main.main(Main.java:9)
```

**Explanation:**

| Expression | Result | Why |
|---|---|---|
| `7 / 2` | `3` | Both operands are `int`, so the fraction is **discarded** (not rounded). |
| `7 / 2.0` | `3.5` | One operand is `double`, so the whole division is done in `double`. |
| `0.1 + 0.2` | `0.30000000000000004` | `0.1` cannot be stored exactly in binary; the tiny error becomes visible. Use `BigDecimal` for money. |
| `5 / 0.0` | `Infinity` | Floating-point division by zero follows the IEEE-754 standard: no exception. |
| `0.0 / 0.0` | `NaN` | "Not a Number": the result is undefined. |
| `5 / 0` | **exception** | Integer division by zero has no sensible value, so the JVM throws `ArithmeticException` and the program stops. |

| Practice | How to solve |
|---|---|
| Adding Two Numbers | `nextInt()` twice, print the sum (Example 4). |
| Adding Decimal Numbers | `nextDouble()`; `0.1 + 0.2` shows `0.30000000000000004` (Example 6). Print with `%.2f` to hide the noise. |
| Dividing Double Numbers | `x / y` with doubles; dividing by `0.0` gives `Infinity`, not an exception. Integer `5 / 0` throws `ArithmeticException` (Example 6). |
| Character Input and Output | `char ch = sc.next().charAt(0);` then print it, its `(int)` code, and `(char)(ch + 1)` (Example 4). |

> **Remember:** after `nextInt()`, a following `nextLine()` returns an empty string because the Enter key is still in the buffer. Call an extra `sc.nextLine()` first (Example 5; more in [Java_Handwritten_Notes.md](Java_Handwritten_Notes.md), chapter 2).

---

## 1.2 Operators in Java

### Concept

An **operator** is a symbol that performs an operation on one, two or three **operands** and produces a value. `a + b` has the operator `+` and the operands `a` and `b`.

| Category | Operators | Operands | Result type |
|---|---|---|---|
| Arithmetic | `+ - * / %` | 2 | number |
| Unary | `+ - ++ -- !  ~` | 1 | same as operand |
| Relational | `== != < > <= >=` | 2 | `boolean` |
| Logical | `&& \|\| !` | 2 (or 1 for `!`) | `boolean` |
| Bitwise / shift | `& \| ^ ~ << >> >>>` | 2 (or 1 for `~`) | integer |
| Assignment | `= += -= *= /= %= &= \|= ^= <<= >>=` | 2 | type of the left side |
| Ternary | `? :` | 3 | type of the chosen branch |

### Arithmetic operators

| Operator | Meaning | `10 op 3` |
|---|---|---|
| `+ - *` | add, subtract, multiply | `13`, `7`, `30` |
| `/` | divide (**integer division** when both are ints) | `3` |
| `%` | remainder (modulus) | `1` |

#### Example 7: all arithmetic operators, including negatives

```java
public class Main {
    public static void main(String[] args) {
        int a = 17, b = 5;
        System.out.println("a + b = " + (a + b));
        System.out.println("a - b = " + (a - b));
        System.out.println("a * b = " + (a * b));
        System.out.println("a / b = " + (a / b));
        System.out.println("a % b = " + (a % b));
        System.out.println("-17 / 5 = " + (-17 / 5) + ",  -17 % 5 = " + (-17 % 5));
        System.out.println("17 % -5 = " + (17 % -5));
        System.out.println("7.5 % 2 = " + (7.5 % 2));
        System.out.println("1 + 2 + \"3\" = " + (1 + 2 + "3") + ",  \"1\" + 2 + 3 = " + ("1" + 2 + 3));
    }
}
```

**Output:**
```text
a + b = 22
a - b = 12
a * b = 85
a / b = 3
a % b = 2
-17 / 5 = -3,  -17 % 5 = -2
17 % -5 = 2
7.5 % 2 = 1.5
1 + 2 + "3" = 33,  "1" + 2 + 3 = 123
```

**Explanation:**
- `17 / 5 = 3` and `17 % 5 = 2`, because `17 = 5 × 3 + 2`. The identity `a == (a / b) * b + a % b` always holds.
- Integer division **truncates toward zero**: `-17 / 5` is `-3` (not `-4`), so the remainder is `-17 - (5 × -3) = -2`.
- The sign of `%` follows the **left** operand: `17 % -5` is `+2`, `-17 % 5` is `-2`. This is why an odd test must be `n % 2 != 0`, not `n % 2 == 1` (for `n = -3`, `n % 2` is `-1`).
- `%` also works with decimals: `7.5 = 2 × 3 + 1.5`.
- `+` is evaluated **left to right**. In `1 + 2 + "3"`, `1 + 2 = 3` happens first (numbers), then `3 + "3"` is string joining → `"33"`. In `"1" + 2 + 3`, the left side is already a string, so everything after it is joined → `"123"`.

### Relational and logical operators

| Operator | Meaning |
|---|---|
| `== != < > <= >=` | comparisons, result is `boolean` |
| `&&` | AND: both true. **Short-circuit**: stops if the left side is `false` |
| `\|\|` | OR: at least one true. **Short-circuit**: stops if the left side is `true` |
| `!` | NOT |

| `A` | `B` | `A && B` | `A \|\| B` | `!A` | `A ^ B` (XOR) |
|---|---|---|---|---|---|
| true | true | true | true | false | false |
| true | false | false | true | false | true |
| false | true | false | true | true | true |
| false | false | false | false | true | false |

#### Example 8: comparisons and short-circuit evaluation

```java
public class Main {
    static boolean check(String name, boolean result) {
        System.out.println("  evaluating " + name);
        return result;
    }

    public static void main(String[] args) {
        int a = 10, b = 3;
        System.out.println((a > b) + " " + (a == b) + " " + (a != b) + " " + (a <= 10));

        System.out.println("false && ... :");
        boolean r1 = check("left", false) && check("right", true);
        System.out.println("  result = " + r1);

        System.out.println("true || ... :");
        boolean r2 = check("left", true) || check("right", false);
        System.out.println("  result = " + r2);

        System.out.println("non-short-circuit & :");
        boolean r3 = check("left", false) & check("right", true);
        System.out.println("  result = " + r3);

        int[] arr = {};
        boolean safe = arr.length > 0 && arr[0] > 5;   // arr[0] is never touched
        System.out.println("safe = " + safe);
    }
}
```

**Output:**
```text
true false true true
false && ... :
  evaluating left
  result = false
true || ... :
  evaluating left
  result = true
non-short-circuit & :
  evaluating left
  evaluating right
  result = false
safe = false
```

**Explanation:**
- With `&&`, once the left side is `false` the answer **must** be `false`, so Java never calls the right side. The output shows only `evaluating left`.
- With `||`, once the left side is `true` the answer **must** be `true`, so again the right side is skipped.
- The single `&` on booleans **always evaluates both sides**, which is why `evaluating right` appears.
- Short-circuiting is a safety tool: in `arr.length > 0 && arr[0] > 5`, the array access runs only when the array is not empty, so no `ArrayIndexOutOfBoundsException` is possible.

### Bitwise operators (work on the binary form)

Integers are stored in binary (32 bits for `int`). Bitwise operators work on each **bit position** separately.

| Operator | Name | Rule | Shortcut |
|---|---|---|---|
| `&` | AND | 1 only if both bits are 1 | `n & 1` = last bit (odd/even check) |
| `\|` | OR | 1 if either is 1 | |
| `^` | XOR | 1 if bits differ | `a ^ a = 0`, `a ^ 0 = a` |
| `~` | NOT | flips all bits | `~n = -n - 1` |
| `<<` | left shift | fill with 0 | `n << k = n × 2ᵏ` |
| `>>` | right shift (keeps sign) | fill with the sign bit | `n >> k = n ÷ 2ᵏ` (floor) |
| `>>>` | unsigned right shift | fill with 0 | for negative numbers the result becomes large and positive |

#### Example 9: bitwise operators with binary printouts

```java
public class Main {
    static String bin(int n) {                     // last 8 bits, padded with zeros
        return String.format("%8s", Integer.toBinaryString(n & 0xFF)).replace(' ', '0');
    }

    public static void main(String[] args) {
        int a = 5, b = 3;
        System.out.println("a      = " + bin(a) + " = " + a);
        System.out.println("b      = " + bin(b) + " = " + b);
        System.out.println("a & b  = " + bin(a & b) + " = " + (a & b));
        System.out.println("a | b  = " + bin(a | b) + " = " + (a | b));
        System.out.println("a ^ b  = " + bin(a ^ b) + " = " + (a ^ b));
        System.out.println("a << 1 = " + bin(a << 1) + " = " + (a << 1));
        System.out.println("a >> 1 = " + bin(a >> 1) + " = " + (a >> 1));
        System.out.println("~a = " + (~a) + ",  -8 >> 1 = " + (-8 >> 1) + ",  -8 >>> 28 = " + (-8 >>> 28));
        System.out.println("12 is " + ((12 & 1) == 0 ? "even" : "odd") + ", 7 is " + ((7 & 1) == 0 ? "even" : "odd"));
        int x = 4, y = 9;
        x = x ^ y; y = x ^ y; x = x ^ y;           // XOR swap
        System.out.println("after XOR swap: x = " + x + ", y = " + y);
    }
}
```

**Output:**
```text
a      = 00000101 = 5
b      = 00000011 = 3
a & b  = 00000001 = 1
a | b  = 00000111 = 7
a ^ b  = 00000110 = 6
a << 1 = 00001010 = 10
a >> 1 = 00000010 = 2
~a = -6,  -8 >> 1 = -4,  -8 >>> 28 = 15
12 is even, 7 is odd
after XOR swap: x = 9, y = 4
```

**Explanation:**
- Read each column of bits: `0101 & 0011 = 0001` (only the last position has 1 in both), `0101 | 0011 = 0111`, `0101 ^ 0011 = 0110`.
- `5 << 1` moves every bit one place left, which doubles the value (`10`). `5 >> 1` moves them right and drops the last bit (`2`, i.e. `5 / 2` rounded down).
- `~5` flips **all 32 bits**, giving `-6`, matching the rule `~n = -n - 1` (two's complement).
- `-8 >> 1` keeps the sign bit, so the result stays negative (`-4`). `-8 >>> 28` shifts in zeros from the left: the top 4 bits of `-8` (`1111`) end up at the bottom, giving `15`.
- `n & 1` is the last bit: `0` for even, `1` for odd.
- XOR swap works because `a ^ b ^ b = a`. It is a classic interview trick, but in real code a temporary variable is clearer.

### Unary operators: increment and decrement

| Form | Name | Behaviour |
|---|---|---|
| `x++` | post-increment | use the **old** value in the expression, then add 1 |
| `++x` | pre-increment | add 1 first, then use the **new** value |
| `x--` / `--x` | post/pre-decrement | same idea with subtraction |

#### Example 10: predicting `++` and `--` results

```java
public class Main {
    public static void main(String[] args) {
        int x = 5;
        int y = x++;            // y gets 5, then x becomes 6
        int z = ++x;            // x becomes 7, then z gets 7
        System.out.println("x=" + x + " y=" + y + " z=" + z);

        int a = 10;
        int r = a++ + ++a;      // 10 + 12
        System.out.println("a=" + a + " r=" + r);

        int b = 5;
        int s = b-- - --b;      // 5 - 3
        System.out.println("b=" + b + " s=" + s);

        int c = 3;
        c = c++;                // classic trap
        System.out.println("c=" + c);
    }
}
```

**Output:**
```text
x=7 y=5 z=7
a=12 r=22
b=3 s=2
c=3
```

**Dry run of `r = a++ + ++a` (start `a = 10`):**

| Step | Sub-expression | Value used | `a` afterwards |
|---|---|---|---|
| 1 | `a++` | `10` (old value) | `11` |
| 2 | `++a` | `12` (new value) | `12` |
| 3 | `10 + 12` | `22` | `12` |

**Dry run of `s = b-- - --b` (start `b = 5`):** `b--` gives `5` (b → 4), `--b` makes b `3` and gives `3`, so `s = 5 - 3 = 2`.

**Why `c = c++` leaves `c` at 3:** Java saves the old value (`3`), increments `c` to `4`, then the assignment writes the saved `3` back into `c`. Never write `x = x++`.

### Assignment and compound assignment

```java
int n = 10;
n += 5;   // n = n + 5   → 15
n -= 3;   // n = n - 3   → 12
n *= 2;   // n = n * 2   → 24
n /= 5;   // n = n / 5   → 4   (integer division)
n %= 3;   // n = n % 3   → 1
byte small = 10;
small += 5;          // OK: compound assignment includes a hidden cast back to byte
// small = small + 5; // compile error: small + 5 is an int
```

### Ternary operator

**Syntax:** `condition ? valueIfTrue : valueIfFalse`. It is an *expression* (it produces a value), so it can be used inside `println` or assigned to a variable.

#### Example 11: ternary for max, even/odd and nested three-way decisions

```java
public class Main {
    public static void main(String[] args) {
        int a = 10, b = 3;
        int max = a > b ? a : b;
        String parity = a % 2 == 0 ? "even" : "odd";
        String size = a > 5 ? (a > 8 ? "big" : "mid") : "small";
        System.out.println(max + " " + parity + " " + size);

        int n = -7;
        String sign = n > 0 ? "positive" : n < 0 ? "negative" : "zero";
        System.out.println(n + " is " + sign);

        int x = 4, y = 9, z = 7;
        int largest = x > y ? (x > z ? x : z) : (y > z ? y : z);
        System.out.println("largest of " + x + ", " + y + ", " + z + " = " + largest);
    }
}
```

**Output:**
```text
10 even big
-7 is negative
largest of 4, 9, 7 = 9
```

**Explanation:**
- `a > b` is true, so `max` takes `a` (10). `10 % 2 == 0`, so `parity` is `"even"`. `10 > 5` and `10 > 8`, so `size` is `"big"`.
- A ternary chain `c1 ? v1 : c2 ? v2 : v3` is read like an `else-if` ladder: `-7 > 0` is false, `-7 < 0` is true → `"negative"`.
- For the largest of three: `4 > 9` is false, so Java evaluates `(y > z ? y : z)` → `9 > 7` → `9`.
- Nested ternaries quickly become hard to read; beyond two levels, use `if-else`.

### Precedence and associativity (highest first)

| Level | Operators | Associativity |
|---|---|---|
| 1 | `()` `[]` `.` | left to right |
| 2 | `x++ x--` | left to right |
| 3 | `++x --x + - ! ~` (unary), `(type)` cast | right to left |
| 4 | `* / %` | left to right |
| 5 | `+ -` | left to right |
| 6 | `<< >> >>>` | left to right |
| 7 | `< > <= >= instanceof` | left to right |
| 8 | `== !=` | left to right |
| 9 | `&` | left to right |
| 10 | `^` | left to right |
| 11 | `\|` | left to right |
| 12 | `&&` | left to right |
| 13 | `\|\|` | left to right |
| 14 | `? :` | right to left |
| 15 | `= += -= ...` | right to left |

**When unsure, use parentheses**: they cost nothing and make intent obvious.

#### Example 12: evaluating mixed expressions step by step

```java
public class Main {
    public static void main(String[] args) {
        int a = 6, b = 4, c = 2;
        System.out.println(a + b * c);            // * before +
        System.out.println((a + b) * c);
        System.out.println(a - b - c);            // left to right
        System.out.println(a / b * c);            // left to right
        System.out.println(5 + 3 > 2 * 4);        // arithmetic before relational
        System.out.println(a > b && b > c || c > a);
        System.out.println(a++ * 2 + --b);
        System.out.println(1 << 2 + 1);           // + before <<
        int p, q;
        p = q = 7;                                // assignment is right to left
        System.out.println(p + q);
    }
}
```

**Output:**
```text
14
20
0
2
false
true
15
8
14
```

**Step-by-step evaluation:**

| Expression | Steps | Result |
|---|---|---|
| `a + b * c` | `4 * 2 = 8` → `6 + 8` | `14` |
| `(a + b) * c` | `10 * 2` | `20` |
| `a - b - c` | `(6 - 4) - 2` (not `6 - (4 - 2)`) | `0` |
| `a / b * c` | `(6 / 4) * 2` → `1 * 2` | `2` |
| `5 + 3 > 2 * 4` | `8 > 8` | `false` |
| `a > b && b > c \|\| c > a` | `(true && true) \|\| false` | `true` |
| `a++ * 2 + --b` | `6 * 2 + 3` = `12 + 3` (a → 7, b → 3) | `15` |
| `1 << 2 + 1` | `+` first: `1 << 3` | `8` |
| `p = q = 7` | `q = 7` first, then `p = 7` | `14` |

**Practice titles in this topic**

| Practice | How to solve |
|---|---|
| Basic Operations | Compute `+ - * / %` on two numbers and print each (Example 7). |
| Working with Bitwise Operations | Print `a & b`, `a \| b`, `a ^ b`, `~a`, `a << 1`, `a >> 1` and check with the binary table (Example 9). |
| Understanding Relational Operators | Print the result of each comparison (`boolean`). |
| Combining Relational and Logical Operators | Combine, e.g. `age >= 18 && hasId`. Remember short-circuit (Example 8). |
| Evaluating Arithmetic and Logical Operations | Work **by hand** first using precedence, then run to check (Example 12). |
| Exploring Bitwise and Unary Operators | Mix `x++`, `~x`, shifts; write the order of evaluation on paper (Example 10). |
| Evaluating / Combining Arithmetic & Relational Operators | e.g. `5 + 3 > 2 * 4` → arithmetic first (`8 > 8`) → `false`. |
| Basic / Advanced Ternary Operator Comparisons | One ternary for max/min/even-odd; nest for three-way (grades, sign) (Example 11). |
| Comprehensive Operator Evaluation | Mixed expression exercise: evaluate step by step and **show intermediate values** (table in Example 12). |

---

# 2. Module 2: Control Constructs

By default Java runs statements **top to bottom, one after another**. *Control constructs* change that order:

| Kind | Statements | Question it answers |
|---|---|---|
| **Selection** (decision) | `if`, `if-else`, `else-if` ladder, `switch` | *Which* block should run? |
| **Iteration** (looping) | `for`, `while`, `do-while`, for-each | *How many times* should a block run? |
| **Jump** (transfer) | `break`, `continue`, `return`, labeled `break`/`continue` | Where should control go *right now*? |

## 2.1 Conditional Statements

### `if` (do something only when a condition is true)

**Syntax:**
```java
if (condition) {
    // runs only when condition is true
}
```
The condition **must** be a `boolean` expression. Unlike C, `if (1)` or `if (x = 5)` does not compile in Java, which prevents a whole class of bugs.

#### Example 13: independent `if` statements (multiples and weather checks)

```java
public class Main {
    public static void main(String[] args) {
        int n = 15;
        if (n % 3 == 0) System.out.println(n + " is a multiple of 3");
        if (n % 5 == 0) System.out.println(n + " is a multiple of 5");
        if (n % 7 == 0) System.out.println(n + " is a multiple of 7");

        int temp = 34;
        boolean raining = false;
        if (temp > 30) System.out.println("Hot day: stay hydrated");
        if (raining)   System.out.println("Carry an umbrella");
        if (temp > 30 && !raining) System.out.println("Use sunscreen");
    }
}
```

**Output:**
```text
15 is a multiple of 3
15 is a multiple of 5
Hot day: stay hydrated
Use sunscreen
```

**Explanation:** each `if` is **independent**, so Java tests every one of them. `15 % 7` is `1`, so the third message is skipped. `raining` is `false`, so the umbrella line is skipped, while `temp > 30 && !raining` is `true && true`. Use separate `if`s when **several** messages may apply at once; use `else if` when **exactly one** should apply.

| Practice | How to solve |
|---|---|
| Checking Multiples of a Number | `n % k == 0` means `n` is a multiple of `k`. |
| Checking Election Eligibility | `age >= 18` → "eligible". |
| Checking Weather Conditions | e.g. `temp > 30` → "hot"; use several independent `if`s (as in Example 13) or an `else if` chain. |

### `if-else` (two ways)

**Syntax:**
```java
if (condition) {
    // runs when true
} else {
    // runs when false
}
```
Exactly **one** of the two blocks runs, never both, never neither.

#### Example 14: even/odd, discount and player rating

```java
public class Main {
    public static void main(String[] args) {
        int number = 7;
        if (number % 2 == 0) System.out.println(number + " is Even");
        else                 System.out.println(number + " is Odd");

        double bill = 2500;
        double discount;
        if (bill > 2000)      discount = 0.20;
        else if (bill > 1000) discount = 0.10;
        else                  discount = 0.0;
        System.out.printf("Bill %.1f, discount %.0f%%, pay %.1f%n", bill, discount * 100, bill * (1 - discount));

        int score = 72;
        String rating;
        if (score >= 90)      rating = "Excellent";
        else if (score >= 60) rating = "Good";
        else                  rating = "Needs practice";
        System.out.println("Score " + score + ": " + rating);
    }
}
```

**Output:**
```text
7 is Odd
Bill 2500.0, discount 20%, pay 2000.0
Score 72: Good
```

**Explanation:**
- `7 % 2` is `1`, so the condition is false and the `else` branch runs.
- In the discount ladder, `2500 > 2000` is true, so `discount = 0.20` and the remaining conditions are **not checked**. Amount payable = `2500 × 0.8 = 2000.0`.
- `72 >= 90` is false, `72 >= 60` is true → `"Good"`. The compiler knows that `rating` is assigned on every path, so using it afterwards is allowed.

| Practice | How to solve |
|---|---|
| Determining Even or Odd Numbers | `n % 2 == 0` (or `(n & 1) == 0`). |
| Calculating Shopping Discounts | `if (total > 2000) 20% off else if (total > 1000) 10% off else none`. Example: bill `2500` with 20% off → `2000.0`. |
| Assessing Player Performance | Compare score with thresholds (`>= 90` excellent, `>= 60` good...). |

### Else-if ladder

Conditions are checked **top to bottom**; the **first** true one runs and the rest are skipped.

#### Example 15: why the order of an else-if ladder matters

```java
public class Main {
    static String gradeCorrect(int m) {
        if (m >= 90) return "A";
        else if (m >= 75) return "B";
        else if (m >= 60) return "C";
        else return "D";
    }

    static String gradeWrongOrder(int m) {
        if (m >= 60) return "C";           // too broad: catches 95 as well
        else if (m >= 75) return "B";
        else if (m >= 90) return "A";
        else return "D";
    }

    public static void main(String[] args) {
        int[] marks = {95, 82, 64, 40};
        for (int m : marks)
            System.out.println(m + " -> correct: " + gradeCorrect(m) + ", wrong order: " + gradeWrongOrder(m));
    }
}
```

**Output:**
```text
95 -> correct: A, wrong order: C
82 -> correct: B, wrong order: C
64 -> correct: C, wrong order: C
40 -> correct: D, wrong order: D
```

**Explanation:** in `gradeWrongOrder`, `95 >= 60` is already true at the first test, so `"C"` is returned and the more specific tests are **unreachable** for any value ≥ 60. Rule: with `>=` thresholds, put the **largest** threshold first; with `<=` thresholds, put the **smallest** first.

### `switch`

#### Concept

`switch` picks one branch by comparing **one value** against several constants. It is cleaner than a long `if-else` ladder when you test the same variable for equality.

`switch` works with `int`, `char`, `byte`, `short` (and their wrappers), `String`, and `enum`. It does **not** work with `long`, `float`, `double` or `boolean`.

#### Example 16: classic `switch` with and without `break` (fall-through)

```java
public class Main {
    public static void main(String[] args) {
        int day = 3;
        switch (day) {
            case 1: System.out.println("Mon"); break;
            case 2: System.out.println("Tue"); break;
            case 3: System.out.println("Wed");            // no break → FALL-THROUGH
            case 4: System.out.println("Thu (fall-through)"); break;
            default: System.out.println("?");
        }

        char grade = 'B';
        switch (grade) {                 // intentional fall-through: grouping cases
            case 'A':
            case 'B':
                System.out.println("Distinction");
                break;
            case 'C':
                System.out.println("Pass");
                break;
            default:
                System.out.println("Fail");
        }
    }
}
```

**Output:**
```text
Wed
Thu (fall-through)
Distinction
```

**Explanation:**
- `day` is `3`, so execution **jumps** to `case 3` and prints `Wed`. There is no `break`, so it continues into `case 4` (the label is ignored once you are inside) and prints `Thu (fall-through)`, then stops at that `break`.
- Fall-through is usually a bug, but it is also how classic `switch` groups several labels: `'A'` and `'B'` share one block.
- `default` runs when no `case` matches. It may appear anywhere, but by convention it goes last.

#### Example 17: modern switch (Java 14+): arrows, multiple labels and returning a value

```java
public class Main {
    enum Level { LOW, MEDIUM, HIGH }

    public static void main(String[] args) {
        String col = "green";
        String msg = switch (col) {
            case "red", "orange" -> "warm";
            case "green", "blue"  -> "cool";
            default               -> "other";
        };
        System.out.println(col + " is " + msg);

        int month = 2, year = 2024;
        int days = switch (month) {
            case 4, 6, 9, 11 -> 30;
            case 2 -> {
                boolean leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
                yield leap ? 29 : 28;        // yield returns a value from a block
            }
            default -> 31;
        };
        System.out.println("Days in " + month + "/" + year + " = " + days);

        Level lv = Level.HIGH;
        switch (lv) {
            case LOW    -> System.out.println("Relax");
            case MEDIUM -> System.out.println("Watch out");
            case HIGH   -> System.out.println("Act now");
        }
    }
}
```

**Output:**
```text
green is cool
Days in 2/2024 = 29
Act now
```

**Explanation:**
- With `->`, only the matching branch runs: **no `break` needed and no fall-through**.
- `case "red", "orange"` lists several labels in one branch.
- A switch **expression** produces a value (note the `;` after `}`). It must be *exhaustive*: every possible input must lead to a value, which is why `default` is required for `String` and `int`.
- When a branch needs several statements, use a block `{ ... }` and `yield` the result. 2024 is divisible by 4 and not by 100, so it is a leap year → `29`.
- For an `enum`, the case labels are written without the type name (`case LOW`, not `case Level.LOW`).

| Classic `switch` (`:`) | Modern `switch` (`->`) |
|---|---|
| Needs `break` to stop | Stops automatically |
| Falls through by default | Never falls through |
| Statement only | Statement **or** expression (returns a value) |
| One label per `case` (stack them to group) | `case A, B, C ->` |

#### Example 18: a menu-driven billing system (template for the "system" practices)

```java
// stdin: 2\n3
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("1. Burger  120");
        System.out.println("2. Pizza   250");
        System.out.println("3. Coffee   80");
        System.out.print("Choice: ");
        int choice = sc.nextInt();
        System.out.print("Quantity: ");
        int qty = sc.nextInt();
        System.out.println();

        String item;
        int price;
        switch (choice) {
            case 1 -> { item = "Burger"; price = 120; }
            case 2 -> { item = "Pizza";  price = 250; }
            case 3 -> { item = "Coffee"; price = 80; }
            default -> { System.out.println("Invalid choice"); return; }
        }

        double amount = price * qty;
        double discount = amount >= 500 ? amount * 0.10 : 0;   // rule handled with a condition
        System.out.printf("%s x %d = %.2f%n", item, qty, amount);
        System.out.printf("Discount    = %.2f%n", discount);
        System.out.printf("To pay      = %.2f%n", amount - discount);
    }
}
```

**Output:**
```text
1. Burger  120
2. Pizza   250
3. Coffee   80
Choice: Quantity: 
Pizza x 3 = 750.00
Discount    = 75.00
To pay      = 675.00
```

**Explanation:** the user chose `2` (Pizza) and quantity `3`. The `switch` maps the menu number to an item and price; the `default` branch handles invalid input and leaves `main` with `return`. Business rules (10% off for orders of 500 or more) are conditions, so they use `if`/ternary rather than `switch`. Because every non-default branch assigns `item` and `price`, the compiler accepts using them afterwards.

| Practice | How to solve |
|---|---|
| Identifying Rainbow Colors with Switch | Number 1-7 → VIBGYOR names (`case 1 -> "Violet"` ...). |
| Selecting Food Items Using Switch | Menu number → item and price (Example 18). |
| Choosing Festival Greetings with Switch | Festival name (String) → greeting; use `default` for unknown. |
| Implementing a Weather Advisory System | Weather code/String → advice (rain → umbrella). |
| Developing an Election Advisory System | `if (age >= 18)` → eligible; combine with `switch` for the voter type. |
| Vehicle Maintenance Advisory System | Vehicle type via `switch`; km driven via `if`/`else` → "service due". |
| Creating a Shopping and Billing System | `switch` for item → price; quantity × price; add discount with `if` (Example 18). |
| Hotel Room Booking System | Room type (`switch`) × nights; add taxes/discounts. |
| Educational Course Enrollment System | Course code (`switch`) → fee; check age/eligibility with `if`. |

> **Tip for the "system" practices:** read the menu choice with `Scanner`, use `switch` for the menu, `if-else` for rules, and always include a `default` (invalid input) branch. Print a bill with `printf("%.2f")`.

---

## 2.2 Looping Statements

### Concept

A **loop** repeats a block of code while a condition is true. Each repetition is called an **iteration**. Without loops, printing 1 to 1000 would need 1000 `println` lines.

Every loop has four ingredients. Missing any one causes a bug:

| Ingredient | Example | Missing it causes |
|---|---|---|
| **Initialisation** | `int i = 1` | compile error (variable not initialised) |
| **Condition** | `i <= 10` | infinite loop |
| **Body** | `System.out.println(i)` | nothing happens |
| **Update** | `i++` | infinite loop |

| Loop | Use when | Checks condition | Minimum runs |
|---|---|---|---|
| `for` | You know how many times | **before** each round | 0 |
| `while` | You repeat while a condition holds (count unknown) | **before** | 0 |
| `do-while` | The body must run **at least once** (menus, input validation) | **after** | 1 |
| for-each | Visit every element of an array/collection | (automatic) | 0 |

```
for (init ; condition ; update) { body }
   1 init (once)  →  2 check condition  →  3 body  →  4 update  →  back to 2
                         │ false
                         ▼
                     loop ends
```

#### Example 19: the same task with all four loop types

```java
public class Main {
    public static void main(String[] args) {
        System.out.print("for      : ");
        for (int i = 1; i <= 5; i++) System.out.print(i + " ");
        System.out.println();

        System.out.print("while    : ");
        int j = 1;
        while (j <= 5) { System.out.print(j + " "); j++; }
        System.out.println();

        System.out.print("do-while : ");
        int k = 1;
        do { System.out.print(k + " "); k++; } while (k <= 5);
        System.out.println();

        System.out.print("for-each : ");
        int[] nums = {1, 2, 3, 4, 5};
        for (int v : nums) System.out.print(v + " ");
        System.out.println();

        int m = 100;
        do { System.out.println("do-while ran once although m <= 5 is " + (m <= 5)); } while (m <= 5);
        while (m <= 5) { System.out.println("never printed"); }
    }
}
```

**Output:**
```text
for      : 1 2 3 4 5 
while    : 1 2 3 4 5 
do-while : 1 2 3 4 5 
for-each : 1 2 3 4 5 
do-while ran once although m <= 5 is false
```

**Explanation:** all four loops print the same numbers. The difference shows at the end: with `m = 100` the condition is false from the start. `do-while` runs its body **first** and checks afterwards, so it prints once; `while` checks first and never runs.

#### Example 20: dry run of a `for` loop that builds a sum

```java
public class Main {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 4; i++) {
            sum += i * i;
            System.out.println("i=" + i + "  i*i=" + (i * i) + "  sum=" + sum);
        }
        System.out.println("Sum of squares 1..4 = " + sum);
    }
}
```

**Output:**
```text
i=1  i*i=1  sum=1
i=2  i*i=4  sum=5
i=3  i*i=9  sum=14
i=4  i*i=16  sum=30
Sum of squares 1..4 = 30
```

**Dry-run table:**

| Iteration | `i` | `i <= 4`? | `sum` before | `sum += i*i` | `sum` after |
|---|---|---|---|---|---|
| 1 | 1 | true | 0 | + 1 | 1 |
| 2 | 2 | true | 1 | + 4 | 5 |
| 3 | 3 | true | 5 | + 9 | 14 |
| 4 | 4 | true | 14 | + 16 | 30 |
| — | 5 | **false** | | loop ends | 30 |

After the loop, `i` no longer exists: it was declared **inside** the `for`, so its scope ends with the loop.

#### Example 21: `while` loops for an unknown number of rounds

```java
public class Main {
    public static void main(String[] args) {
        int n = 10;
        System.out.print("Countdown by 2: ");
        while (n > 0) { System.out.print(n + " "); n -= 2; }
        System.out.println();

        double balance = 1000;
        int years = 0;
        while (balance < 2000) {          // how many years to double at 8%?
            balance *= 1.08;
            years++;
        }
        System.out.printf("Doubled after %d years: %.2f%n", years, balance);

        int number = 4782, count = 0;
        while (number != 0) { number /= 10; count++; }
        System.out.println("Digits in 4782 = " + count);
    }
}
```

**Output:**
```text
Countdown by 2: 10 8 6 4 2 
Doubled after 10 years: 2158.92
Digits in 4782 = 4
```

**Explanation:**
- `while` is the right choice when you **cannot know the number of rounds in advance**: you do not know beforehand how many years compound interest needs, or how many digits a number has.
- Each year multiplies the balance by `1.08`; after 9 years it is `1999.00` (still below 2000), after 10 years it is `2158.92`.
- Each `number /= 10` removes the last digit: `4782 → 478 → 47 → 4 → 0`, four rounds.

### Braces matter (your "Importance of Braces" topic)

Without `{ }`, only the **next single statement** belongs to the `if`/loop. Indentation means nothing to the compiler.

#### Example 22: the same code with and without braces

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++)
            System.out.print("A ");
            System.out.print("B ");          // looks inside the loop, but is NOT
        System.out.println();

        int x = 5;
        if (x > 10)
            System.out.println("p");
            System.out.println("q");         // always runs

        for (int i = 1; i <= 2; i++) {
            for (int j = 1; j <= 3; j++)
                System.out.print("*");
            System.out.println();            // belongs to the OUTER loop
        }

        for (int i = 1; i <= 2; i++)
            for (int j = 1; j <= 3; j++) { System.out.print("#"); }
        System.out.println();
    }
}
```

**Output:**
```text
A A A B 
q
***
***
######
```

**Explanation:**
- The `for` owns only `print("A ")`. `print("B ")` runs **once**, after the loop, even though it is indented as if it were inside.
- The `if` owns only `println("p")`. Since `5 > 10` is false, `p` is skipped, but `q` is a separate statement and always prints.
- In the first nested loop, the inner `for` owns only `print("*")`, so each outer round prints `***` and then a line break: two lines.
- In the last loop, nothing ends the line inside the loops, so all `2 × 3 = 6` hashes appear on one line.

**Always use braces**, even for one line. The famous Apple "goto fail" security bug (2014) was caused by exactly this kind of missing brace.

### Nested loops

The inner loop runs **completely** for every single round of the outer loop. If the outer loop runs `R` times and the inner loop `C` times, the body runs `R × C` times.

#### Example 23: multiplication table and the trace of `i` and `j`

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 4; j++) System.out.printf("%4d", i * j);
            System.out.println();
        }
        System.out.println();
        for (int i = 1; i <= 2; i++)
            for (int j = 1; j <= 3; j++)
                System.out.println("i=" + i + " j=" + j);
    }
}
```

**Output:**
```text
   1   2   3   4
   2   4   6   8
   3   6   9  12

i=1 j=1
i=1 j=2
i=1 j=3
i=2 j=1
i=2 j=2
i=2 j=3
```

**Explanation:** row `i` holds `i × 1, i × 2, …`. The trace shows that `j` restarts at 1 every time `i` changes. `%4d` gives each number a width of 4 so the columns line up.

#### Example 24: loops combined with conditions

```java
public class Main {
    public static void main(String[] args) {
        System.out.print("Divisible by 3 (1..20): ");
        for (int i = 1; i <= 20; i++) if (i % 3 == 0) System.out.print(i + " ");
        System.out.println();

        System.out.print("Squares: ");
        for (int i = 1; i <= 5; i++) System.out.print(i * i + " ");
        System.out.println();

        System.out.print("Cubes  : ");
        for (int i = 1; i <= 5; i++) System.out.print(i * i * i + " ");
        System.out.println();

        System.out.print("Reverse: ");
        for (int i = 10; i >= 1; i--) System.out.print(i + " ");
        System.out.println();

        System.out.println("Table of 7 (odd multipliers only):");
        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) continue;
            System.out.println("7 x " + i + " = " + 7 * i);
        }
    }
}
```

**Output:**
```text
Divisible by 3 (1..20): 3 6 9 12 15 18 
Squares: 1 4 9 16 25 
Cubes  : 1 8 27 64 125 
Reverse: 10 9 8 7 6 5 4 3 2 1 
Table of 7 (odd multipliers only):
7 x 1 = 7
7 x 3 = 21
7 x 5 = 35
7 x 7 = 49
7 x 9 = 63
```

**Explanation:** `i * i + " "` works without parentheses because `*` has higher precedence than `+`, so the multiplication happens before the string join. A faster way to list multiples of 3 is `for (int i = 3; i <= 20; i += 3)`, which skips the `if` entirely and runs 6 times instead of 20.

| Practice | How to solve |
|---|---|
| Calculating the Total Bill for Multiple Items | Loop `n` times, read each price, `total += price`. |
| Tracking Daily Water Intake | Loop over days/glasses, accumulate litres, compare with a goal. |
| Creating a User-Defined Countdown | Read `n`; `for (int i = n; i >= 1; i--)` then print "Go!". |
| Repeating a Message N times Using While Loop | `int i = 1; while (i <= n) { println(msg); i++; }` |
| Counting Down by Multiples of 2 | `while (n > 0) { print(n); n -= 2; }` (e.g. `10 8 6 4 2`, Example 21). |
| Finding Multiples of 4 Using while Loop | `i % 4 == 0` or step by 4. |
| Impact of Braces on Conditional Statements / in Nested Loops | Example 22; write the predicted output, then run. |
| Print Numbers with Conditions / Multiplication Table with Conditions | Add an `if` inside the loop (Example 24). |
| Print Numbers from 1 to 10 | `for (int i = 1; i <= 10; i++)`. |
| Printing Numbers Divisible by 3 | `if (i % 3 == 0)` or `i += 3`. |
| Printing Numbers in Reverse Order | `for (int i = 10; i >= 1; i--)`. |
| Printing Squares / Cubes of Numbers | `i * i`, `i * i * i`. |
| Printing in While Loop | Rewrite any `for` as `while` (init before, update inside). |

> **Infinite-loop warning:** forgetting the update (`i++`) or using the wrong condition keeps the loop running forever. `for(;;)` and `while(true)` are *intentional* infinite loops, ended with `break`. Watch for loops whose variable moves **away** from the condition, e.g. `for (int i = 10; i > 0; i++)`. That one stops only when `i` overflows past `Integer.MAX_VALUE` and becomes negative.

---

## 2.3 Jumping Statements

| Statement | Effect |
|---|---|
| `break` | Leaves the **nearest** loop/`switch` immediately |
| `continue` | Skips the rest of **this round** and goes to the next one (in a `for`, the update still runs) |
| `break label` / `continue label` | Leaves / continues the **labeled outer** loop |
| `return` | Leaves the whole method (and every loop inside it) |

#### Example 25: `break` and `continue` in one loop

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            if (i % 3 == 0) continue;     // skip multiples of 3
            if (i > 7) break;             // stop completely after 7
            System.out.print(i + " ");
        }
        System.out.println();
    }
}
```

**Output:**
```text
1 2 4 5 7 
```

**Dry run:**

| `i` | `i % 3 == 0`? | `i > 7`? | Action |
|---|---|---|---|
| 1, 2 | no | no | print |
| 3 | **yes** | — | `continue` (skip) |
| 4, 5 | no | no | print |
| 6 | **yes** | — | `continue` |
| 7 | no | no | print |
| 8 | no | **yes** | `break` (loop ends; 9 and 10 never checked) |

#### Example 26: `break` in `while(true)` and `do-while` (input validation pattern)

```java
// stdin: -5\n150\n42
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int age;
        while (true) {                         // intentional infinite loop
            System.out.print("Enter age (0-120): ");
            age = sc.nextInt();
            if (age >= 0 && age <= 120) break; // valid → leave the loop
            System.out.println("Invalid, try again.");
        }
        System.out.println("Accepted age " + age);

        int n = 1;
        do {
            if (n * n > 30) break;
            System.out.print(n * n + " ");
            n++;
        } while (true);
        System.out.println("\nStopped at n = " + n);
    }
}
```

**Output:**
```text
Enter age (0-120): Invalid, try again.
Enter age (0-120): Invalid, try again.
Enter age (0-120): Accepted age 42
1 4 9 16 25 
Stopped at n = 6
```

**Explanation:** the inputs were `-5`, `150` and `42`. The first two fail the range check, so the loop prints a message and asks again; `42` passes and `break` leaves the loop. In the `do-while`, `6 × 6 = 36 > 30` triggers `break`, so the squares stop at `25`.

### Nested loops with `break` (understand the output)

#### Example 27: plain `break` vs labeled `break` and `continue`

```java
public class Main {
    public static void main(String[] args) {
        System.out.print("plain break   : ");
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                if (j == 2) break;               // leaves only the INNER loop
                System.out.print(i + "" + j + " ");
            }
        }
        System.out.println();

        System.out.print("labeled       : ");
        outer:
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                if (j == 2) continue outer;      // go to the next i
                if (i == 3) break outer;         // leave both loops
                System.out.print(i + "" + j + " ");
            }
        }
        System.out.println();

        System.out.print("find pair     : ");
        int[][] grid = {{1, 4, 7}, {2, 9, 5}, {8, 3, 6}};
        int target = 9;
        boolean found = false;
        search:
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[r].length; c++) {
                if (grid[r][c] == target) {
                    System.out.println(target + " at row " + r + ", col " + c);
                    found = true;
                    break search;
                }
            }
        }
        if (!found) System.out.println("not found");
    }
}
```

**Output:**
```text
plain break   : 11 21 31 
labeled       : 11 21 
find pair     : 9 at row 1, col 1
```

**Explanation:**
- **Plain break:** for every `i`, the inner loop prints `j = 1`, then `break`s at `j = 2`. The outer loop is unaffected, so you get `11 21 31`.
- **Labeled:** `i = 1`: print `11`, then `continue outer` at `j = 2`. Same for `i = 2` (`21`). At `i = 3, j = 1` the check `j == 2` is false but `i == 3` is true, so `break outer` ends **both** loops before anything is printed.
- **Searching a 2-D grid:** without the label, `break` would leave only the inner loop and the outer loop would keep scanning. `break search` stops the whole search at the first match.

#### Example 28: "find the first …" problems with `break`

```java
public class Main {
    public static void main(String[] args) {
        String s = "rhythm and Blues";
        int firstVowel = -1, firstUpper = -1, firstNonVowel = -1;
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (firstVowel < 0 && "aeiouAEIOU".indexOf(ch) >= 0) firstVowel = i;
            if (firstUpper < 0 && Character.isUpperCase(ch)) firstUpper = i;
            if (firstNonVowel < 0 && Character.isLetter(ch) && "aeiouAEIOU".indexOf(ch) < 0) firstNonVowel = i;
        }
        System.out.println("first vowel     : index " + firstVowel + " '" + s.charAt(firstVowel) + "'");
        System.out.println("first uppercase : index " + firstUpper + " '" + s.charAt(firstUpper) + "'");
        System.out.println("first non-vowel : index " + firstNonVowel + " '" + s.charAt(firstNonVowel) + "'");

        int[] nums = {12, 7, -3, 9, -8};
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] < 0) {
                System.out.println("first negative  : " + nums[i] + " at index " + i);
                break;                        // -8 is never examined
            }
        }

        String found = "none";
        for (String w : "java is a fun language".split(" ")) {
            if (w.length() == 3) { found = w; break; }
        }
        System.out.println("first 3-letter word: " + found);

        System.out.print("words not of length 3: ");
        for (String w : "skip the cat now please".split(" ")) {
            if (w.length() == 3) continue;
            System.out.print(w + " ");
        }
        System.out.println();

        System.out.print("without 'a': ");
        for (char ch : "banana bread".toCharArray()) {
            if (ch == 'a') continue;
            System.out.print(ch);
        }
        System.out.println();
    }
}
```

**Output:**
```text
first vowel     : index 7 'a'
first uppercase : index 11 'B'
first non-vowel : index 0 'r'
first negative  : -3 at index 2
first 3-letter word: fun
words not of length 3: skip please 
without 'a': bnn bred
```

**Explanation:**
- `"aeiouAEIOU".indexOf(ch)` returns the position of `ch` inside the vowel string, or `-1` if it is not there. That makes it a compact "is this a vowel?" test.
- `"rhythm"` has no vowels (`y` is not in the list), so the first vowel is the `a` of `and` at index 7.
- The checks are guarded with `firstX < 0` so each is recorded only the **first** time. When you look for a single thing, prefer `break`, which also saves work.
- `Character.isLetter` keeps spaces and digits from counting as "non-vowels".
- `split(" ")` breaks the sentence into words; `continue` skips the 3-letter words `the`, `cat`, `now`.

| Practice | How to solve |
|---|---|
| Understanding the Use of Break in a While Loop / Do-While / Breaking Out of a While Loop | Put `if (condition) break;` inside `while(true)`; the loop ends when the condition is met (Example 26). |
| Counting Down by Multiples of 2 / Multiples of 4 Using While Loop | Same as module 2.2, with `break` at a limit. |
| Skipping Multiples of a Number | `if (i % k == 0) continue;`. |
| Skipping Specific Words | Loop the words; `if (w.equals("bad")) continue;`. |
| Skipping Specific Characters in a String | Loop `charAt(i)`; `continue` for the unwanted char (Example 28). |
| Finding the First Negative Number in a List | Loop; on the first `< 0`, record it and `break` (Example 28). |
| Skipping Words with Specific Length | `if (w.length() == n) continue;`. |
| Finding the First Uppercase Letter | `Character.isUpperCase(ch)`, then `break`. |
| Finding the First Vowel / First Non-Vowel Character | `"aeiouAEIOU".indexOf(ch) >= 0` (vowel) or `< 0` (non-vowel); `break` at the first. Check `Character.isLetter` for non-vowel so spaces are skipped. |
| Finding the First Word with a Specific Length | Loop words; `if (w.length() == n) { found = w; break; }`. |
| Nested Loops: Understanding the Output | Trace `i` and `j` in a table; the inner loop restarts for every `i` (Example 23). |
| break in Nested Loops (plain / with if / labeled) | Example 27. |

---

# 3. Module 3: Number Manipulation

## 3.1 Decision Making with if-else

### Greatest of two numbers

#### Example 29: three ways to find the greater number

```java
public class Main {
    public static void main(String[] args) {
        int a = 42, b = 17;

        if (a > b) System.out.println(a + " is greater");
        else if (b > a) System.out.println(b + " is greater");
        else System.out.println("Both are equal");

        int viaTernary = a > b ? a : b;
        int viaMath = Math.max(a, b);
        System.out.println("ternary: " + viaTernary + ", Math.max: " + viaMath);

        int c = 17, d = 17;
        if (c > d) System.out.println(c + " is greater");
        else if (d > c) System.out.println(d + " is greater");
        else System.out.println("Both are equal (" + c + ")");
    }
}
```

**Output:**
```text
42 is greater
ternary: 42, Math.max: 42
Both are equal (17)
```

**Explanation:** a two-way `if-else` cannot report "equal", so the three-way ladder is the safer version. `Math.max` is the shortest when you only need the value.

### Even or odd, including negative numbers

`n % 2 == 0` means even. For odd, test `n % 2 != 0`, **not** `n % 2 == 1`, because the remainder of a negative number is negative.

#### Example 30: even/odd test that also works for negative numbers

```java
public class Main {
    public static void main(String[] args) {
        int[] values = {4, 7, -3, -8, 0};
        for (int n : values) {
            String wrong = n % 2 == 1 ? "odd" : "even";        // buggy for negatives
            String right = n % 2 != 0 ? "odd" : "even";
            String bitwise = (n & 1) == 1 ? "odd" : "even";
            System.out.printf("%3d  n%%2=%2d  wrong:%-5s right:%-5s bitwise:%s%n", n, n % 2, wrong, right, bitwise);
        }
    }
}
```

**Output:**
```text
  4  n%2= 0  wrong:even  right:even  bitwise:even
  7  n%2= 1  wrong:odd   right:odd   bitwise:odd
 -3  n%2=-1  wrong:even  right:odd   bitwise:odd
 -8  n%2= 0  wrong:even  right:even  bitwise:even
  0  n%2= 0  wrong:even  right:even  bitwise:even
```

**Explanation:** `-3 % 2` is `-1`, so `n % 2 == 1` reports `-3` as even. `n & 1` looks at the last bit, which is `1` for every odd number in two's complement, negative or positive. Zero is even.

### Characters are numbers (UTF-16)

A `char` stores a 16-bit Unicode (UTF-16) code. `'A'` is 65, `'a'` is 97, `'0'` is 48. Arithmetic on a `char` gives an `int`.

#### Example 31: comparing characters and doing arithmetic on them

```java
public class Main {
    public static void main(String[] args) {
        char c1 = 'a', c2 = 'Z';
        System.out.println("'" + c1 + "' = " + (int) c1 + ", '" + c2 + "' = " + (int) c2);
        if (c1 > c2) System.out.println(c1 + " comes after " + c2 + " in UTF-16 order");
        else System.out.println(c1 + " comes before " + c2);

        System.out.println(c1 + 2);              // int arithmetic
        System.out.println((char) (c1 + 2));     // cast back to char
        System.out.println("" + c1 + c2);        // string joining
        System.out.println(c1 + c2);             // 97 + 90

        char d = 'k';
        System.out.println(d + " code " + (int) d + " is " + ((int) d % 2 == 0 ? "even" : "odd"));
        System.out.println("'7' as a number: " + ('7' - '0'));
        System.out.println("uppercase of 'g': " + (char) ('g' - 32) + ", via API: " + Character.toUpperCase('g'));
    }
}
```

**Output:**
```text
'a' = 97, 'Z' = 90
a comes after Z in UTF-16 order
99
c
aZ
187
k code 107 is odd
'7' as a number: 7
uppercase of 'g': G, via API: G
```

**Explanation:**
- All uppercase letters (65-90) come **before** all lowercase letters (97-122), so `'a' > 'Z'` is true.
- `c1 + 2` is `int` arithmetic: `97 + 2 = 99`. Casting with `(char)` turns 99 back into `'c'`.
- `"" + c1 + c2` starts with a string, so the characters are joined: `"aZ"`. Without the empty string, `c1 + c2` adds the codes: `97 + 90 = 187`.
- `'7' - '0'` = `55 - 48` = `7`: the standard trick to turn a digit character into its number.
- Lowercase and uppercase letters differ by exactly 32, but `Character.toUpperCase` is clearer and also handles non-English letters.

| Practice | How to solve |
|---|---|
| Boolean Comparison with If-Else | Compare two `boolean`s with `==`; or `if (flag)` directly. |
| Number Comparison Tool | Print `<`, `>` or `=` after comparing. |
| Adding and Comparing Two Numbers | `sum = a + b`, then compare `sum` with a third value. |
| Comparing Numbers with Modification | Change one value first (`a++`, `b *= 2`), then compare. |
| Left and Right Shifts with Comparison | `a << 1` doubles, `a >> 1` halves; compare the results. |
| Comparison of Four Numbers | Keep a running `max`: `max = a; if (b > max) max = b; ...` (Example 32). |
| Increment and Check Even or Odd | `n++` then `n % 2`. |
| Increment and Divisibility Check by 3 | `n++` then `n % 3 == 0`. |
| Check If Both Numbers are Even | `a % 2 == 0 && b % 2 == 0`. |
| Add and Check for Oddity | `(a + b) % 2 != 0`. |
| Comparing Two Characters Using UTF-16 Values | `char` is a number: `'a'` = 97, `'A'` = 65. Compare `c1 > c2` or `(int) c1` (Example 31). |
| Comparing Two Characters After Adding 2 to Their Values | `(char)(c1 + 2)`: `char + int` is an `int`, so cast back to `char` to print a letter. |
| Check UTF Value: Even or Odd | `(int) ch % 2 == 0`. |

## 3.2 if-else Ladder and Coordinates

### Greatest of three or four numbers

#### Example 32: ladder vs running maximum

```java
public class Main {
    public static void main(String[] args) {
        int a = 4, b = 9, c = 7;
        int max;
        if (a >= b && a >= c) max = a;
        else if (b >= a && b >= c) max = b;
        else max = c;
        System.out.println("ladder         : " + max);
        System.out.println("Math.max twice : " + Math.max(Math.max(a, b), c));

        int w = 15, x = 42, y = 8, z = 23;     // running maximum scales to any count
        int best = w;
        if (x > best) best = x;
        if (y > best) best = y;
        if (z > best) best = z;
        System.out.println("max of four    : " + best);

        double[] sprintTimes = {11.8, 10.9, 12.4, 11.1};
        int winner = 0;
        for (int i = 1; i < sprintTimes.length; i++)
            if (sprintTimes[i] < sprintTimes[winner]) winner = i;
        System.out.println("best sprinter  : runner " + (winner + 1) + " with " + sprintTimes[winner] + " s");
    }
}
```

**Output:**
```text
ladder         : 9
Math.max twice : 9
max of four    : 42
best sprinter  : runner 2 with 10.9 s
```

**Explanation:** the ladder needs more conditions for every extra number, while the **running maximum** pattern (assume the first is the best, then challenge it with each of the others) works for any count. The "Best Sprinter" practice is the same pattern with `<`, because the **smallest** time wins. Storing the **index** of the winner, rather than only the value, tells you *who* won.

### Positive / negative / zero and grade ladder

#### Example 33: sign classification and grade ladder as reusable methods

```java
public class Main {
    static String sign(int n) {
        if (n > 0) return "Positive";
        else if (n < 0) return "Negative";
        else return "Zero";
    }

    static String grade(int m) {
        if (m < 0 || m > 100) return "Invalid";
        else if (m >= 90) return "A";
        else if (m >= 75) return "B";
        else if (m >= 60) return "C";
        else if (m >= 40) return "D";
        else return "Fail";
    }

    public static void main(String[] args) {
        for (int n : new int[]{12, -5, 0}) System.out.println(n + " -> " + sign(n));
        for (int m : new int[]{97, 75, 74, 40, 39, 105}) System.out.println("marks " + m + " -> " + grade(m));
    }
}
```

**Output:**
```text
12 -> Positive
-5 -> Negative
0 -> Zero
marks 97 -> A
marks 75 -> B
marks 74 -> C
marks 40 -> D
marks 39 -> Fail
marks 105 -> Invalid
```

**Explanation:** the **boundary values** (75, 74, 40, 39) are the ones most likely to expose a mistake such as `>` instead of `>=`, so always test them. Validating the input range **first** keeps impossible marks (105) from being graded `A`.

### Position of a point on the Cartesian plane

```
             y
             ▲
     Q2      │      Q1        Q1: x > 0, y > 0     Q2: x < 0, y > 0
   (-, +)    │    (+, +)      Q3: x < 0, y < 0     Q4: x > 0, y < 0
  ───────────┼───────────▶ x  On the x-axis: y == 0;  on the y-axis: x == 0
     Q3      │      Q4        Origin: x == 0 && y == 0
   (-, -)    │    (+, -)
```

Distance of `(x, y)` from the origin (Pythagoras): `√(x² + y²)`. Distance between two points: `√((x₂−x₁)² + (y₂−y₁)²)`.

#### Example 34: quadrant, distance and transformations

```java
public class Main {
    static String quadrant(int x, int y) {
        if (x == 0 && y == 0) return "Origin";
        else if (y == 0) return "on X-axis";
        else if (x == 0) return "on Y-axis";
        else if (x > 0 && y > 0) return "Q1";
        else if (x < 0 && y > 0) return "Q2";
        else if (x < 0) return "Q3";       // here y < 0 is certain
        else return "Q4";
    }

    public static void main(String[] args) {
        int[][] points = {{3, -4}, {-2, 5}, {-1, -1}, {0, 7}, {6, 0}, {0, 0}};
        for (int[] p : points) {
            double dist = Math.sqrt(p[0] * p[0] + p[1] * p[1]);
            System.out.printf("(%2d,%2d) %-9s distance %.2f%n", p[0], p[1], quadrant(p[0], p[1]), dist);
        }

        int x = 3, y = -4;
        System.out.println("x + y = " + (x + y) + ", x * y = " + (x * y));
        int dx = -5, dy = 6;                         // translate (shift) the point
        System.out.println("shifted to (" + (x + dx) + "," + (y + dy) + ") -> " + quadrant(x + dx, y + dy));
        System.out.println("mirror in Y-axis (" + (-x) + "," + y + ") -> " + quadrant(-x, y));
        System.out.println("rotate 90 deg  (" + (-y) + "," + x + ") -> " + quadrant(-y, x));
        double d = Math.hypot(6 - 3, 0 - (-4));      // distance between (3,-4) and (6,0)
        System.out.println("distance (3,-4)->(6,0) = " + d);
    }
}
```

**Output:**
```text
( 3,-4) Q4        distance 5.00
(-2, 5) Q2        distance 5.39
(-1,-1) Q3        distance 1.41
( 0, 7) on Y-axis distance 7.00
( 6, 0) on X-axis distance 6.00
( 0, 0) Origin    distance 0.00
x + y = -1, x * y = -12
shifted to (-2,2) -> Q2
mirror in Y-axis (-3,-4) -> Q3
rotate 90 deg  (4,3) -> Q1
distance (3,-4)->(6,0) = 5.0
```

**Explanation:**
- The axis and origin checks come **first**; otherwise a point such as `(0, 7)` would fall through to a quadrant branch by mistake.
- Once the ladder reaches `else if (x < 0)`, Java has already ruled out `y == 0` and `y > 0` with `x < 0`, so `y < 0` is guaranteed. Each branch can rely on everything above it being false.
- `(3, -4)` is the classic 3-4-5 right triangle: `√(9 + 16) = 5`.
- Transformations change the quadrant: shifting by `(-5, +6)` moves `(3,-4)` to `(-2, 2)` in Q2; mirroring in the y-axis negates `x`; rotating 90° counter-clockwise maps `(x, y)` to `(-y, x)`.
- `Math.hypot(dx, dy)` computes `√(dx² + dy²)` without overflow problems.

| Practice | How to solve |
|---|---|
| Finding the Best Sprinter | Smallest time wins: running **minimum** of the times (Example 32). |
| Comparing the Power of Engines | Greatest of three/four values (running max). |
| Calculating Student Grade Based on Marks | The grade ladder (Example 33). |
| Working with Cartesian Coordinates: Checking Distance and Quadrants | Quadrant ladder + `Math.sqrt(x*x + y*y)` (Example 34). |
| Determining Quadrant and Performing Calculations on Coord | After the quadrant, compute e.g. `x + y`, `x * y`. |
| Exploring Coordinate Transformations | Shift `x += dx`, mirror `x = -x`, rotate `(x, y) → (-y, x)`, then **re-check the quadrant**. |

## 3.3 Methods in Java

### Concept

A **method** is a named, reusable block of code that performs **one** task. Instead of copying the same 10 lines in five places, you write them once and **call** the method five times.

**Why methods?**

| Benefit | Meaning |
|---|---|
| Reuse | Write once, call many times |
| Readability | `isPrime(n)` explains itself; 6 lines of loop do not |
| Testing | You can test a small method on its own |
| Maintenance | A bug is fixed in one place |

### Anatomy of a method

```
 access   static  return   name      parameters
   │        │      type     │            │
 public  static   int    greater (int a, int b)  {     ← method header (signature = name + parameter types)
     return a > b ? a : b;                              ← body; return sends the value back
 }
```

| Part | Meaning |
|---|---|
| **Return type** | Type of the value sent back (`int`, `boolean`, `String`, …), or `void` for nothing |
| **Name** | A verb in camelCase: `calculateTotal`, `isEven`, `printTable` |
| **Parameters** | Input variables, each with a type. Empty `()` if none |
| **Body** | The statements; a non-`void` method must `return` a value on **every** path |

**Parameters vs arguments:** in `static int greater(int a, int b)`, `a` and `b` are **parameters**. In the call `greater(10, 20)`, `10` and `20` are **arguments**. Java copies each argument's value into the parameter (*pass by value*).

### The four kinds of methods (from your notebook)

| Kind | Example | Called as |
|---|---|---|
| no input, no output | `static void hello()` | `hello();` |
| input, no output | `static void printEvenTo(int n)` | `printEvenTo(10);` |
| no input, output | `static int roll()` | `int r = roll();` |
| input and output | `static int greater(int a, int b)` | `int g = greater(3, 8);` |

#### Example 35: all four kinds of methods in one program

```java
public class Main {
    static void hello() {                              // no input, no output
        System.out.println("Hello from a method!");
    }

    static void printEvenTo(int n) {                   // input, no output
        for (int i = 2; i <= n; i += 2) System.out.print(i + " ");
        System.out.println();
    }

    static int luckyNumber() {                         // no input, output
        return 7;
    }

    static int greater(int a, int b) {                 // input and output
        return a > b ? a : b;
    }

    static boolean isEven(int n) {
        return n % 2 == 0;
    }

    public static void main(String[] args) {
        hello();
        printEvenTo(10);
        int lucky = luckyNumber();
        System.out.println("lucky = " + lucky);
        System.out.println("greater(3, 8) = " + greater(3, 8));
        System.out.println("greater of three = " + greater(greater(4, 9), 7));   // nested calls
        for (int n = 5; n <= 8; n++) System.out.println(n + (isEven(n) ? " is even" : " is odd"));
    }
}
```

**Output:**
```text
Hello from a method!
2 4 6 8 10 
lucky = 7
greater(3, 8) = 8
greater of three = 9
5 is odd
6 is even
7 is odd
8 is even
```

**Explanation:**
- When Java reaches a call such as `greater(3, 8)`, it copies `3` into `a` and `8` into `b`, runs the body, and replaces the call with the returned value (`8`).
- `greater(greater(4, 9), 7)` runs the **inner** call first (`9`), then `greater(9, 7)` → `9`.
- `isEven` returns a `boolean`, so it fits straight into a condition. Methods that answer a yes/no question are conventionally named `isX`, `hasX` or `canX`.

#### Example 36: pass by value: a method cannot change the caller's variable

```java
public class Main {
    static void tryToDouble(int x) {
        x = x * 2;
        System.out.println("inside method: x = " + x);
    }

    static int doubled(int x) {
        return x * 2;
    }

    public static void main(String[] args) {
        int n = 10;
        tryToDouble(n);
        System.out.println("after call  : n = " + n);
        n = doubled(n);
        System.out.println("after return: n = " + n);
    }
}
```

**Output:**
```text
inside method: x = 20
after call  : n = 10
after return: n = 20
```

**Explanation:** `tryToDouble` receives a **copy** of `n`. Changing the copy (`x`) does not touch `n`. The correct way to "change" a value through a method is to **return** the new value and assign it.

### Sums using methods

#### Example 37: sum helpers checked against the formulas

```java
public class Main {
    static int sumFirstN(int n)  { int s = 0; for (int i = 1; i <= n; i++) s += i;         return s; }
    static int sumEvenN(int n)   { int s = 0; for (int i = 1; i <= n; i++) s += 2 * i;     return s; }
    static int sumOddN(int n)    { int s = 0; for (int i = 1; i <= n; i++) s += 2 * i - 1; return s; }
    static int sumRange(int from, int to) { int s = 0; for (int i = from; i <= to; i++) s += i; return s; }

    static int sumFirstNDivisibleBy5Not10(int n) {
        int s = 0, count = 0;
        for (int i = 1; count < n; i++) {
            if (i % 5 == 0 && i % 10 != 0) { s += i; count++; }
        }
        return s;
    }

    public static void main(String[] args) {
        int n = 5;
        System.out.println("1+2+...+" + n + "       = " + sumFirstN(n) + "  formula n(n+1)/2 = " + n * (n + 1) / 2);
        System.out.println("first " + n + " evens     = " + sumEvenN(n) + "  formula n(n+1)   = " + n * (n + 1));
        System.out.println("first " + n + " odds      = " + sumOddN(n) + "  formula n*n      = " + n * n);
        System.out.println("even - odd        = " + (sumEvenN(n) - sumOddN(n)));
        System.out.println("sum 10..20        = " + sumRange(10, 20));
        System.out.println("5,15,25,35 (n=4)  = " + sumFirstNDivisibleBy5Not10(4));
    }
}
```

**Output:**
```text
1+2+...+5       = 15  formula n(n+1)/2 = 15
first 5 evens     = 30  formula n(n+1)   = 30
first 5 odds      = 25  formula n*n      = 25
even - odd        = 5
sum 10..20        = 165
5,15,25,35 (n=4)  = 80
```

**Explanation:**
- First `n` evens are `2, 4, …, 2n` (`2 × i`); first `n` odds are `1, 3, …, 2n−1` (`2 × i − 1`).
- Each even number is exactly 1 more than the matching odd number (`2 vs 1`, `4 vs 3`, …), so their difference is always `n`.
- `sum 10..20` = `(10 + 20) × 11 / 2` = 165 (first + last, times count, divided by 2).
- "First `n` numbers that satisfy a condition" needs a **counter**, because you do not know how far the loop must go: `for (int i = 1; count < n; i++)`. The hits are 5, 15, 25, 35 → 80.
- Formulas run in **O(1)** (constant time) while loops run in **O(n)**. Use loops to learn, formulas when you can.

| Practice | How to solve |
|---|---|
| Greatest of Two Numbers Using Methods | Method with two params returning the larger (Example 35). |
| Checking if an Entered Number is Even or Odd Using Methods | `static boolean isEven(int n)`; call from `main` and print. |
| Printing All Even Numbers in 1 to 10 / Odd Numbers 1 to n | `void` method with a `for` loop (step 2). |
| Even and Odd Numbers in a Given Range | Method with `(int from, int to)`. |
| Check and Add Even / Odd Numbers | Return the sum of only the even (or odd) numbers. |
| Sum of First 5 Even Numbers / First 10 Divisible by 5 / by Both 2 and 4 | Count how many you have found; stop at the target (`while (count < 10)`). "Both 2 and 4" is the same as "divisible by 4". |
| Sum of First N Even / Odd Numbers | `sumEvenN`, `sumOddN` (Example 37). |
| Sum of First N Odd and Even Numbers and Their Difference | `sumEvenN(n) - sumOddN(n)`; the result is `n`. |
| Sum of Numbers in a Given Range | Loop `from` to `to`, `s += i`. |
| Sum of the First N Numbers Divisible by 5 but Not Divisible by 10 | Condition `i % 5 == 0 && i % 10 != 0` (5, 15, 25, ...); count to N (Example 37). |

> **Methods + loops pattern:** a method should do **one** job and **return** the result; let `main` read input and print. This makes the method reusable and testable.

---

# 4. Module 4: Advanced Number Manipulation

### How to approach every problem in this module

Almost every practice title here is **two or three small checks glued together with an `if`**, e.g. "Prime Check, Reverse Number, and Sum of Digits". So the professional approach is:

1. Write each check as a small **helper method** (`isPrime`, `sumDigits`, `reverse`, …).
2. Test each helper on its own with known answers (the tables below give them).
3. Combine helpers in `main` according to the practice title.

All helpers in this module were compiled together and the outputs shown are real.

## 4.1 Prime Numbers and Prime Factors

### Concept

A **prime** has exactly two divisors: 1 and itself (`2, 3, 5, 7, 11, …`).
- `1` is **not** prime (only one divisor).
- `2` is the only even prime.
- A number > 1 that is not prime is **composite** (`4, 6, 8, 9, …`).

### From slow to fast: three versions of `isPrime`

| Version | Idea | Loop runs (for n = 1,000,003) | Time complexity |
|---|---|---|---|
| Count all divisors | count `i` in `1..n` with `n % i == 0`; prime if count is 2 | ~1,000,003 times | O(n) |
| Stop at first divisor | test `2..n-1`, return `false` on the first hit | ~1,000,001 times (for a prime) | O(n) |
| **Stop at √n** | test `2..√n` only | ~1,000 times | **O(√n)** |

**Why √n is enough:** divisors come in pairs `a × b = n`. If both `a` and `b` were greater than `√n`, their product would be greater than `n`. So at least one of every pair is `≤ √n`, and if no divisor exists up to `√n`, none exists at all. Example: `36 = 1×36 = 2×18 = 3×12 = 4×9 = 6×6`; the smaller partner is always ≤ 6.

#### Example 38: `isPrime`, primes in a range and prime factors

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; (long) i * i <= n; i++)      // only need to check up to √n
            if (n % i == 0) return false;
        return true;
    }

    static List<Integer> primesIn(int a, int b) {
        List<Integer> l = new ArrayList<>();
        for (int i = a; i <= b; i++) if (isPrime(i)) l.add(i);
        return l;
    }

    static List<Integer> primeFactors(int n) {
        List<Integer> l = new ArrayList<>();
        for (int i = 2; (long) i * i <= n; i++)
            while (n % i == 0) { l.add(i); n /= i; }
        if (n > 1) l.add(n);                         // what remains is itself a prime
        return l;
    }

    public static void main(String[] args) {
        for (int n : new int[]{0, 1, 2, 9, 17, 97, 100})
            System.out.println(n + " prime? " + isPrime(n));
        System.out.println("primes 10..30   : " + primesIn(10, 30));
        System.out.println("count 1..100    : " + primesIn(1, 100).size());
        System.out.println("factors of 84   : " + primeFactors(84));
        System.out.println("factors of 97   : " + primeFactors(97));
        System.out.println("factors of 360  : " + primeFactors(360));
    }
}
```

**Output:**
```text
0 prime? false
1 prime? false
2 prime? true
9 prime? false
17 prime? true
97 prime? true
100 prime? false
primes 10..30   : [11, 13, 17, 19, 23, 29]
count 1..100    : 25
factors of 84   : [2, 2, 3, 7]
factors of 97   : [97]
factors of 360  : [2, 2, 2, 3, 3, 5]
```

**Explanation:**
- `isPrime(2)`: the loop condition `2 * 2 <= 2` is false at once, so no divisor is tested and `true` is returned.
- `isPrime(9)`: `i = 2` (9 % 2 = 1), `i = 3` (9 % 3 = 0) → `false`. Testing up to 3 was enough.
- `(long) i * i` prevents overflow: for `n` close to `Integer.MAX_VALUE`, `i * i` in `int` could wrap to a negative number and keep the loop running.
- There are **25 primes below 100**, a classic fact worth remembering for checking your own code.

**Dry run of `primeFactors(84)`:**

| `i` | `n` before | `n % i == 0`? | Action | List | `n` after |
|---|---|---|---|---|---|
| 2 | 84 | yes | add 2, divide | [2] | 42 |
| 2 | 42 | yes | add 2, divide | [2, 2] | 21 |
| 2 | 21 | no | next `i` | | 21 |
| 3 | 21 | yes | add 3, divide | [2, 2, 3] | 7 |
| 3 | 7 | no | next `i`; `4 * 4 = 16 > 7`, loop ends | | 7 |
| — | 7 | `7 > 1` | add the remaining prime | [2, 2, 3, 7] | |

The inner `while` divides out each factor **completely** before moving on. That is why only primes are ever added: by the time `i = 4` is reached, every factor 2 has already been removed, so 4 can never divide `n`.

#### Example 39: combining the prime check with other operations

```java
public class Main {
    static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; (long) i * i <= n; i++) if (n % i == 0) return false;
        return true;
    }

    public static void main(String[] args) {
        int n = 13;
        if (isPrime(n)) {
            System.out.println(n + " is prime");
            System.out.println("  plus 10 = " + (n + 10) + (n + 10 > 20 ? " (exceeds 20)" : " (does not exceed 20)"));
            System.out.println("  n << 1  = " + (n << 1) + ",  n >> 1 = " + (n >> 1));
        }

        int a = 11, b = 29;
        if (isPrime(a) && isPrime(b)) {
            System.out.print("both prime; primes strictly between: ");
            for (int i = a + 1; i < b; i++) if (isPrime(i)) System.out.print(i + " ");
            System.out.println();
        }

        int evenSum = 0, oddSum = 0, primeSum = 0;
        for (int i = 1; i <= 10; i++) {          // one loop, three running sums
            if (i % 2 == 0) evenSum += i; else oddSum += i;
            if (isPrime(i)) primeSum += i;
        }
        System.out.println("1..10 -> even sum " + evenSum + ", odd sum " + oddSum + ", prime sum " + primeSum);
    }
}
```

**Output:**
```text
13 is prime
  plus 10 = 23 (exceeds 20)
  n << 1  = 26,  n >> 1 = 6
both prime; primes strictly between: 13 17 19 23 
1..10 -> even sum 30, odd sum 25, prime sum 17
```

**Explanation:** primes in 1..10 are 2, 3, 5, 7 → sum 17. Computing all three sums in **one** loop is more efficient than three separate loops over the same range.

| Practice | How to solve |
|---|---|
| Identifying Whether a Prime Number Plus 10 Exceeds 20 | `isPrime(n)` then `n + 10 > 20` (Example 39). |
| Check Prime Numbers and Perform Arithmetic Operations | If prime, print `n + k`, `n * k`... |
| Check Prime Numbers and Perform Bitwise Shift Operations | If prime, print `n << 1`, `n >> 1`. |
| Check Prime Numbers and Find All Primes Between Them | Read two numbers; if both prime, list primes between (Example 39). |
| Prime Check and Divisibility Condition | `isPrime(n) && n % k == 0` (only 2 can be an even prime). |
| Prime Check, Sum of Even and Odd Numbers, and Prime Sum | Loop the range once, adding to three sums (`evenSum`, `oddSum`, `primeSum`). |
| Prime Check, Sum of Digits, and Classification of Input | Branch on the type of the input; call `sumDigits` (next section). |

## 4.2 Digits: Sum, Reverse, Palindrome, Power

### Concept: the two digit operations

Every digit puzzle uses just two operations:

| Operation | Gives | `n = 4729` |
|---|---|---|
| `n % 10` | the **last digit** | `9` |
| `n / 10` | the number **without its last digit** | `472` |

Repeat them in a `while (n > 0)` loop and you visit every digit from right to left.

#### Example 40: the digit helpers with a trace

```java
public class Main {
    static int sumDigits(int n) { int s = 0; n = Math.abs(n); while (n > 0) { s += n % 10; n /= 10; } return s; }
    static int reverse(int n)   { int r = 0; while (n > 0) { r = r * 10 + n % 10; n /= 10; } return r; }
    static boolean isPalindrome(int n) { return n == reverse(n); }
    static long power(int b, int e) { long r = 1; for (int i = 0; i < e; i++) r *= b; return r; }
    static int digits(int n)    { int c = 0; do { c++; n /= 10; } while (n > 0); return c; }
    static int productDigits(int n) { int p = 1; do { p *= n % 10; n /= 10; } while (n > 0); return p; }

    public static void main(String[] args) {
        int n = 4729;
        int t = n;
        System.out.println("step  n     n%10  n/10");
        while (t > 0) {
            System.out.printf("      %-5d %-5d %d%n", t, t % 10, t / 10);
            t /= 10;
        }
        System.out.println("sumDigits(12345)   = " + sumDigits(12345));
        System.out.println("productDigits(234) = " + productDigits(234));
        System.out.println("reverse(12345)     = " + reverse(12345));
        System.out.println("reverse(1200)      = " + reverse(1200));
        System.out.println("isPalindrome(12321)= " + isPalindrome(12321) + ", isPalindrome(123) = " + isPalindrome(123));
        System.out.println("power(2, 10)       = " + power(2, 10) + ", power(9, 12) = " + power(9, 12));
        System.out.println("digits(9045)       = " + digits(9045) + ", digits(0) = " + digits(0));
    }
}
```

**Output:**
```text
step  n     n%10  n/10
      4729  9     472
      472   2     47
      47    7     4
      4     4     0
sumDigits(12345)   = 15
productDigits(234) = 24
reverse(12345)     = 54321
reverse(1200)      = 21
isPalindrome(12321)= true, isPalindrome(123) = false
power(2, 10)       = 1024, power(9, 12) = 282429536481
digits(9045)       = 4, digits(0) = 1
```

**Dry run of `reverse(123)`:**

| Round | `n` | `n % 10` | `r = r * 10 + n % 10` | `n / 10` |
|---|---|---|---|---|
| 1 | 123 | 3 | `0 * 10 + 3 = 3` | 12 |
| 2 | 12 | 2 | `3 * 10 + 2 = 32` | 1 |
| 3 | 1 | 1 | `32 * 10 + 1 = 321` | 0 → stop |

**Explanation of the subtle results:**
- `reverse(1200)` is `21`: the trailing zeros become leading zeros, which a number cannot store. If you need `"0021"`, reverse it as a **string**.
- `digits` uses `do-while` so that `digits(0)` is `1`. With a plain `while (n > 0)`, the loop would never run and return `0`.
- `power(9, 12)` is `282,429,536,481`, far above the `int` limit (~2.1 billion). That is why `power` returns `long`.

| Call | Result |
|---|---|
| `sumDigits(12345)` | `15` |
| `reverse(12345)` | `54321` |
| `isPalindrome(12321)` / `isPalindrome(123)` | `true` / `false` |
| `power(2, 10)` | `1024` |
| `digits(9045)` | `4` |

#### Example 41: combining digit checks (the multi-condition practices)

```java
public class Main {
    static int sumDigits(int n) { int s = 0; n = Math.abs(n); while (n > 0) { s += n % 10; n /= 10; } return s; }
    static int reverse(int n)   { int r = 0; while (n > 0) { r = r * 10 + n % 10; n /= 10; } return r; }
    static boolean isPalindrome(int n) { return n == reverse(n); }
    static long power(int b, int e) { long r = 1; for (int i = 0; i < e; i++) r *= b; return r; }
    static int digits(int n) { int c = 0; do { c++; n /= 10; } while (n > 0); return c; }
    static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; (long) i * i <= n; i++) if (n % i == 0) return false;
        return true;
    }

    static void analyse(int n) {
        System.out.println("n = " + n);
        System.out.println("  " + (n % 2 == 0 ? "even -> reverse = " + reverse(n) : "odd  -> digit sum = " + sumDigits(n)));
        System.out.println("  prime? " + isPrime(n) + ", palindrome? " + isPalindrome(n));
        int d = digits(n);
        String size = d == 1 ? "single digit" : d == 2 ? "double digit" : d + " digits";
        System.out.println("  " + size + ", n^digits = " + power(n, d) + ", divisible by 3? " + (n % 3 == 0));
    }

    public static void main(String[] args) {
        analyse(7);
        analyse(46);
        analyse(131);
    }
}
```

**Output:**
```text
n = 7
  odd  -> digit sum = 7
  prime? true, palindrome? true
  single digit, n^digits = 7, divisible by 3? false
n = 46
  even -> reverse = 64
  prime? false, palindrome? false
  double digit, n^digits = 2116, divisible by 3? false
n = 131
  odd  -> digit sum = 5
  prime? true, palindrome? true
  3 digits, n^digits = 2248091, divisible by 3? false
```

**Explanation:** `analyse` shows the "glue" approach: every line calls a ready helper. `131` is both prime and a palindrome (a *palindromic prime*). `46² = 2116` and `131³ = 2,248,091`. The divisibility-by-3 rule (sum of digits divisible by 3) is consistent: digit sums 7, 10, 5 are not multiples of 3.

| Practice | How to solve |
|---|---|
| Sum of Digits for an Even Number | `if (n % 2 == 0) sumDigits(n)`. |
| Odd Number Check and Sum of Digits | Same with `!= 0`. |
| Even Check, Reverse Number or Sum of Digits | Even → reverse; odd → sum of digits (or as stated) (Example 41). |
| Prime Check, Reverse Number, and Sum of Digits | Combine the three helpers. |
| Even or Odd Check, Palindrome Verification, and Sum of Digits | Run all three checks on one input. |
| Double Digit and Single Digit Check, Power Calculation, and Sum of Digits | `digits(n)` returns 2 or 1; then `power(...)`. |
| Count Digits, Power Calculation, and Divisibility Check | `digits(n)`, `power(n, digits)`, then `% k`. |

**Data type warning:** `power(9, 12)` or factorials overflow `int` quickly; use `long` (or `BigInteger`).

## 4.3 Armstrong Numbers and Fibonacci

### Armstrong numbers

**Definition:** an `d`-digit number is an Armstrong number (also called a *narcissistic* number) if the sum of each digit raised to the power `d` equals the number.

| Number | Digits `d` | Calculation | Armstrong? |
|---|---|---|---|
| `153` | 3 | `1³ + 5³ + 3³ = 1 + 125 + 27 = 153` | yes |
| `370` | 3 | `27 + 343 + 0 = 370` | yes |
| `9474` | 4 | `6561 + 256 + 2401 + 256 = 9474` | yes |
| `123` | 3 | `1 + 8 + 27 = 36` | no |
| `7` | 1 | `7¹ = 7` | yes (all single digits) |

#### Example 42: Armstrong check with a visible calculation

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    static long power(int b, int e) { long r = 1; for (int i = 0; i < e; i++) r *= b; return r; }
    static int digits(int n) { int c = 0; do { c++; n /= 10; } while (n > 0); return c; }
    static int reverse(int n) { int r = 0; while (n > 0) { r = r * 10 + n % 10; n /= 10; } return r; }

    static boolean isArmstrong(int n) {
        int d = digits(n), t = n;                 // copy n: the loop destroys t
        long s = 0;
        while (t > 0) { s += power(t % 10, d); t /= 10; }
        return s == n;
    }

    static String explain(int n) {
        int d = digits(n);
        StringBuilder sb = new StringBuilder();
        long s = 0;
        for (char c : String.valueOf(n).toCharArray()) {
            int digit = c - '0';
            if (sb.length() > 0) sb.append(" + ");
            sb.append(digit).append('^').append(d);
            s += power(digit, d);
        }
        return n + " = " + sb + " = " + s + (s == n ? "  -> Armstrong" : "  -> not Armstrong");
    }

    public static void main(String[] args) {
        System.out.println(explain(153));
        System.out.println(explain(9474));
        System.out.println(explain(123));
        List<Integer> found = new ArrayList<>();
        for (int i = 1; i <= 10000; i++) if (isArmstrong(i)) found.add(i);
        System.out.println("Armstrong 1..10000: " + found + " (count " + found.size() + ")");
        System.out.println("153 is " + (153 % 2 == 0 ? "even" : "odd") + ", reversed = " + reverse(153));
    }
}
```

**Output:**
```text
153 = 1^3 + 5^3 + 3^3 = 153  -> Armstrong
9474 = 9^4 + 4^4 + 7^4 + 4^4 = 9474  -> Armstrong
123 = 1^3 + 2^3 + 3^3 = 36  -> not Armstrong
Armstrong 1..10000: [1, 2, 3, 4, 5, 6, 7, 8, 9, 153, 370, 371, 407, 1634, 8208, 9474] (count 16)
153 is odd, reversed = 351
```

**Explanation:** the key detail is `int t = n;`. The loop divides `t` down to `0`; if it divided `n` itself, the final comparison `s == n` would compare against `0`. There are no 2-digit Armstrong numbers, four 3-digit ones (153, 370, 371, 407) and three 4-digit ones (1634, 8208, 9474).

### Fibonacci series

Each term is the sum of the previous two: `F(0) = 0, F(1) = 1, F(n) = F(n−1) + F(n−2)` → `0, 1, 1, 2, 3, 5, 8, 13, 21, 34, …`

#### Example 43: Fibonacci series, membership test, even/odd terms

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    static List<Integer> fib(int n) {
        List<Integer> l = new ArrayList<>();
        int x = 0, y = 1;
        for (int i = 0; i < n; i++) { l.add(x); int t = x + y; x = y; y = t; }
        return l;
    }

    static boolean isFibonacci(int n) {          // generate terms until we reach or pass n
        int a = 0, b = 1;
        while (a < n) { int t = a + b; a = b; b = t; }
        return a == n;
    }

    static long fibRecursive(int n) {
        return n < 2 ? n : fibRecursive(n - 1) + fibRecursive(n - 2);
    }

    public static void main(String[] args) {
        System.out.println("fib(10) = " + fib(10));
        System.out.print("term parity: ");
        for (int v : fib(10)) System.out.print(v + (v % 2 == 0 ? "(E) " : "(O) "));
        System.out.println();
        for (int n : new int[]{0, 1, 21, 22, 144}) System.out.println("isFibonacci(" + n + ") = " + isFibonacci(n));
        System.out.println("fibRecursive(20) = " + fibRecursive(20));
    }
}
```

**Output:**
```text
fib(10) = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
term parity: 0(E) 1(O) 1(O) 2(E) 3(O) 5(O) 8(E) 13(O) 21(O) 34(E) 
isFibonacci(0) = true
isFibonacci(1) = true
isFibonacci(21) = true
isFibonacci(22) = false
isFibonacci(144) = true
fibRecursive(20) = 6765
```

**Dry run of the iterative loop (first 5 terms):**

| `i` | add `x` | `t = x + y` | new `x` | new `y` |
|---|---|---|---|---|
| 0 | 0 | 1 | 1 | 1 |
| 1 | 1 | 2 | 1 | 2 |
| 2 | 1 | 3 | 2 | 3 |
| 3 | 2 | 5 | 3 | 5 |
| 4 | 3 | 8 | 5 | 8 |

**Explanation:**
- The parity pattern repeats **E, O, O** every three terms, so every third Fibonacci number is even.
- `isFibonacci(22)`: terms go `…, 13, 21, 34`; `a` jumps from 21 to 34, passing 22, so the answer is `false`.
- The recursive version mirrors the definition but recomputes the same terms repeatedly, roughly `2ⁿ` calls; `fibRecursive(45)` takes seconds, while the loop is instant. Prefer the iterative version.

| Practice | How to solve |
|---|---|
| Armstrong Number Check and Even/Odd Identification | `isArmstrong(n)` then `n % 2`. |
| Armstrong Number Check and Reverse | If Armstrong print `reverse(n)`. (Armstrong 153 reversed is 351.) |
| Armstrong Number Check, Digit Sum, and Reverse | Combine `isArmstrong`, `sumDigits`, `reverse`. |
| Armstrong Numbers in a Given Range and Count | Loop range, count the hits (`1..500` → 13 numbers, `1..10000` → 16). |
| Armstrong and Prime Numbers in Range / Armstrong, Prime and NotPrime | Loop once; classify each number as Armstrong, prime, or not prime (see section 4.6). |
| Check if a Number is in Fibonacci Series | `isFibonacci(n)`. |
| Print n Fibonacci Numbers and Identify Even or Odd | `fib(n)` then check each term's `% 2` (Example 43). |

## 4.4 Factors, Factorial and Strong Numbers

### Factors

The **factors** (divisors) of `n` are the numbers that divide it exactly (`n % i == 0`).

#### Example 44: factors the simple way and the fast way

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {
    static List<Integer> factors(int n) {
        List<Integer> l = new ArrayList<>();
        for (int i = 1; i <= n; i++) if (n % i == 0) l.add(i);
        return l;
    }

    static List<Integer> factorsFast(int n) {         // pairs (i, n / i) up to √n
        List<Integer> l = new ArrayList<>();
        for (int i = 1; i * i <= n; i++) {
            if (n % i == 0) {
                l.add(i);
                if (i != n / i) l.add(n / i);         // avoid adding 6 twice for 36
            }
        }
        Collections.sort(l);
        return l;
    }

    public static void main(String[] args) {
        System.out.println("factors(36)     = " + factors(36));
        System.out.println("factorsFast(36) = " + factorsFast(36));
        System.out.println("factors(13)     = " + factors(13) + "  (a prime has exactly 2)");
        System.out.println("is 5 a factor of 10? " + (10 % 5 == 0));
        int n = 28;
        if (n % 2 == 0) System.out.println(n + " is even, factors: " + factors(n));
    }
}
```

**Output:**
```text
factors(36)     = [1, 2, 3, 4, 6, 9, 12, 18, 36]
factorsFast(36) = [1, 2, 3, 4, 6, 9, 12, 18, 36]
factors(13)     = [1, 13]  (a prime has exactly 2)
is 5 a factor of 10? true
28 is even, factors: [1, 2, 4, 7, 14, 28]
```

**Explanation:** `factorsFast` uses the same pairing idea as `isPrime`: finding `2` also gives its partner `36 / 2 = 18`. It loops only 6 times for 36 instead of 36 times. The `i != n / i` check matters for perfect squares, where the middle pair is `6 × 6`.

### Factorial and digital root

`n! = 1 × 2 × … × n`, with `0! = 1` by definition. Factorials grow extremely fast:

| `n` | `n!` | Fits in |
|---|---|---|
| 5 | 120 | `int` |
| 12 | 479,001,600 | `int` (the last one) |
| 13 | 6,227,020,800 | `long` |
| 20 | 2,432,902,008,176,640,000 | `long` (the last one) |
| 25 | 15,511,210,043,330,985,984,000,000 | only `BigInteger` |

The **digital root** keeps summing the digits until a single digit remains: `9875 → 29 → 11 → 2`.

#### Example 45: factorial overflow, `BigInteger` and digital root

```java
import java.math.BigInteger;

public class Main {
    static long factorial(int n) { long f = 1; for (int i = 2; i <= n; i++) f *= i; return f; }
    static int factorialInt(int n) { int f = 1; for (int i = 2; i <= n; i++) f *= i; return f; }
    static BigInteger bigFactorial(int n) {
        BigInteger f = BigInteger.ONE;
        for (int i = 2; i <= n; i++) f = f.multiply(BigInteger.valueOf(i));
        return f;
    }
    static int sumDigits(int n) { int s = 0; while (n > 0) { s += n % 10; n /= 10; } return s; }
    static int digitalRoot(int n) { while (n > 9) n = sumDigits(n); return n; }

    public static void main(String[] args) {
        System.out.println("5!  = " + factorial(5) + ", 0! = " + factorial(0));
        System.out.println("13! as int  = " + factorialInt(13) + "   <- overflow, wrong");
        System.out.println("13! as long = " + factorial(13));
        System.out.println("21! as long = " + factorial(21) + "   <- overflow, negative");
        System.out.println("25! BigInteger = " + bigFactorial(25));
        int n = 9875;
        System.out.println("digitalRoot(" + n + ") = " + digitalRoot(n) + ", its factorial = " + factorial(digitalRoot(n)));
        System.out.println("shortcut 1 + (n - 1) % 9 = " + (1 + (n - 1) % 9));
    }
}
```

**Output:**
```text
5!  = 120, 0! = 1
13! as int  = 1932053504   <- overflow, wrong
13! as long = 6227020800
21! as long = -4249290049419214848   <- overflow, negative
25! BigInteger = 15511210043330985984000000
digitalRoot(9875) = 2, its factorial = 2
shortcut 1 + (n - 1) % 9 = 2
```

**Explanation:**
- `0!` is `1` because the loop `for (i = 2; i <= 0; …)` never runs, leaving `f = 1`, which matches the mathematical definition.
- Integer overflow is **silent**: Java does not throw an error, it wraps around. `13!` in an `int` gives a wrong positive number; `21!` in a `long` even becomes negative. Always check the range of your type. `Math.multiplyExact(a, b)` throws `ArithmeticException` on overflow if you want a loud failure.
- `BigInteger` has no size limit, but uses methods (`multiply`, `add`) instead of operators.
- The digital root of any positive `n` equals `1 + (n − 1) % 9`, because a number and its digit sum leave the same remainder when divided by 9.

### Strong numbers

A **strong number** equals the sum of the **factorials of its digits**: `145 = 1! + 4! + 5! = 1 + 24 + 120`.

#### Example 46: strong numbers, with odd and prime checks

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    static long factorial(int n) { long f = 1; for (int i = 2; i <= n; i++) f *= i; return f; }
    static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; (long) i * i <= n; i++) if (n % i == 0) return false;
        return true;
    }
    static boolean isStrong(int n) {
        int t = n; long s = 0;
        while (t > 0) { s += factorial(t % 10); t /= 10; }
        return s == n;
    }

    public static void main(String[] args) {
        List<Integer> strong = new ArrayList<>();
        for (int i = 1; i <= 100000; i++) if (isStrong(i)) strong.add(i);
        System.out.println("strong numbers 1..100000: " + strong);
        for (int n : strong)
            System.out.println("  " + n + ": " + (n % 2 != 0 ? "odd" : "even") + ", " + (isPrime(n) ? "prime" : "not prime"));
        System.out.print("factorials of primes up to 15: ");
        for (int p = 2; p <= 15; p++) if (isPrime(p)) System.out.print(p + "!=" + factorial(p) + " ");
        System.out.println();
    }
}
```

**Output:**
```text
strong numbers 1..100000: [1, 2, 145, 40585]
  1: odd, not prime
  2: even, prime
  145: odd, not prime
  40585: odd, not prime
factorials of primes up to 15: 2!=2 3!=6 5!=120 7!=5040 11!=39916800 13!=6227020800 
```

**Explanation:** only four strong numbers exist in total: 1, 2, 145 and 40585 (`4! + 0! + 5! + 8! + 5! = 24 + 1 + 120 + 40320 + 120`). Note that `0! = 1` matters for 40585. `13!` already needs `long`, which is why the practice "Factorial of Prime Numbers" specifies `long`.

| Practice | How to solve |
|---|---|
| Factors of Particular Number | `factors(n)` (Example 44). |
| Factor and Armstrong Number Check with Divisibility | Check each factor with `isArmstrong` or `% k`. |
| Checking Even and Printing Factors | If even, print `factors(n)`. |
| Check Prime and Printing Factors | A prime prints only `[1, n]`. |
| Reducing to Digital Root and Finding Factorial | `digitalRoot`, then `factorial(root)` (Example 45). |
| Factorial of Prime Numbers | For each prime in range, print `factorial(p)` (use `long`) (Example 46). |
| Checking Odd and Checking Strong / Strong and Prime | `isStrong(n)` plus `% 2` / `isPrime` (Example 46). |

## 4.5 Perfect, Automorphic, Harshad, Abundant and Amicable Numbers

### The shared helper: sum of proper divisors

**Proper divisors** are all divisors except the number itself. No proper divisor can be bigger than `n / 2`, so the loop stops there.

```java
static int sumProperDivisors(int n) { int s = 0; for (int i = 1; i <= n / 2; i++) if (n % i == 0) s += i; return s; }
```

| Type | Definition | Example | Code idea |
|---|---|---|---|
| **Perfect** | sum of proper divisors **= n** | `6 = 1+2+3`; `28` | `sumProperDivisors(n) == n` |
| **Abundant** | sum of proper divisors **> n** | `12` (1+2+3+4+6 = 16) | `sumProperDivisors(n) > n` |
| **Deficient** | sum **< n** | `8` (1+2+4 = 7) | `<` |
| **Automorphic** | the square **ends with the number itself** | `5² = 2**5**`, `76² = 57**76**` | `n*n % 10^digits == n` |
| **Harshad / Niven** | divisible by the **sum of its digits** | `18` (1+8 = 9, 18/9 = 2) | `n % sumDigits(n) == 0` |
| **Amicable pair** | `a`'s divisor sum = `b` **and** `b`'s divisor sum = `a`, `a != b` | `(220, 284)` | see below |

#### Example 47: all five number types with explanations printed

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    static int sumProperDivisors(int n) { int s = 0; for (int i = 1; i <= n / 2; i++) if (n % i == 0) s += i; return s; }
    static int sumDigits(int n) { int s = 0; while (n > 0) { s += n % 10; n /= 10; } return s; }
    static int digits(int n) { int c = 0; do { c++; n /= 10; } while (n > 0); return c; }
    static long power(int b, int e) { long r = 1; for (int i = 0; i < e; i++) r *= b; return r; }

    static boolean isPerfect(int n)    { return n > 1 && sumProperDivisors(n) == n; }
    static boolean isAbundant(int n)   { return sumProperDivisors(n) > n; }
    static boolean isAutomorphic(int n){ long sq = (long) n * n; long mod = power(10, digits(n)); return sq % mod == n; }
    static boolean isHarshad(int n)    { return n > 0 && n % sumDigits(n) == 0; }
    static boolean isAmicable(int a, int b) { return a != b && sumProperDivisors(a) == b && sumProperDivisors(b) == a; }
    static int gcd(int a, int b)       { return b == 0 ? a : gcd(b, a % b); }       // Euclid

    static List<Integer> collect(int from, int to, java.util.function.IntPredicate test) {
        List<Integer> l = new ArrayList<>();
        for (int i = from; i <= to; i++) if (test.test(i)) l.add(i);
        return l;
    }

    public static void main(String[] args) {
        System.out.println("Perfect 1..10000    : " + collect(1, 10000, Main::isPerfect));
        System.out.println("Abundant 1..40      : " + collect(1, 40, Main::isAbundant));
        System.out.println("Automorphic 1..1000 : " + collect(1, 1000, Main::isAutomorphic));
        System.out.println("Harshad 1..30       : " + collect(1, 30, Main::isHarshad));
        System.out.println();
        System.out.println("28: proper divisor sum = " + sumProperDivisors(28) + " -> perfect");
        System.out.println("12: proper divisor sum = " + sumProperDivisors(12) + " -> abundant by " + (sumProperDivisors(12) - 12));
        System.out.println("76: 76*76 = " + 76 * 76 + ", last 2 digits = " + (76 * 76 % 100) + " -> automorphic");
        System.out.println("18: digit sum = " + sumDigits(18) + ", 18 % 9 = " + 18 % 9 + " -> Harshad");
        System.out.println("220 -> " + sumProperDivisors(220) + ", 284 -> " + sumProperDivisors(284) + " -> amicable? " + isAmicable(220, 284));
        System.out.println("isAmicable(12, 18) = " + isAmicable(12, 18) + ", so gcd(12, 18) = " + gcd(12, 18));
    }
}
```

**Output:**
```text
Perfect 1..10000    : [6, 28, 496, 8128]
Abundant 1..40      : [12, 18, 20, 24, 30, 36, 40]
Automorphic 1..1000 : [1, 5, 6, 25, 76, 376, 625]
Harshad 1..30       : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 18, 20, 21, 24, 27, 30]

28: proper divisor sum = 28 -> perfect
12: proper divisor sum = 16 -> abundant by 4
76: 76*76 = 5776, last 2 digits = 76 -> automorphic
18: digit sum = 9, 18 % 9 = 0 -> Harshad
220 -> 284, 284 -> 220 -> amicable? true
isAmicable(12, 18) = false, so gcd(12, 18) = 6
```

**Explanation:**
- **Perfect:** only four perfect numbers exist below 10,000, all even. `28 = 1 + 2 + 4 + 7 + 14`. `isPerfect` excludes 1 explicitly because its proper divisor sum is `0`, not 1.
- **Automorphic:** to test "ends with", take the square modulo `10^digits`. For 76 (2 digits) compute `5776 % 100 = 76`. The square is computed as `long` because for larger `n`, `n * n` overflows `int`.
- **Harshad:** every single-digit number qualifies (divisible by itself). `11` does not (`11 % 2 = 1`).
- **Amicable:** 220's proper divisors `1+2+4+5+10+11+20+22+44+55+110 = 284`; 284's are `1+2+4+71+142 = 220`. Each "points to" the other.
- `Main::isPerfect` is a **method reference** (passing a method as a value), used here so one `collect` helper can test any condition. You will learn it properly with lambdas.

**Dry run of Euclid's `gcd(12, 18)`:**

| Call | `a` | `b` | `a % b` |
|---|---|---|---|
| `gcd(12, 18)` | 12 | 18 | 12 |
| `gcd(18, 12)` | 18 | 12 | 6 |
| `gcd(12, 6)` | 12 | 6 | 0 |
| `gcd(6, 0)` | 6 | 0 | `b == 0` → return **6** |

The first call swaps the numbers automatically, so you never need to pass the larger number first. LCM follows directly: `lcm(a, b) = a / gcd(a, b) * b` → `lcm(12, 18) = 36`.

**Verified results:**

| Check | Output |
|---|---|
| Perfect numbers 1..500 | `[6, 28, 496]` |
| Automorphic numbers 1..400 | `[1, 5, 6, 25, 76, 376]` |
| Harshad numbers 1..30 | `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 18, 20, 21, 24, 27, 30]` |
| Abundant numbers 1..40 | `[12, 18, 20, 24, 30, 36, 40]` |
| `isAmicable(220, 284)` | `true` |
| `isAmicable(12, 18)` | `false`; `gcd(12, 18) = 6` |

| Practice | How to solve |
|---|---|
| Even Perfect Numbers | Perfect numbers that are even (all known ones are: 6, 28, 496, 8128). |
| Checking for Perfect Numbers and Calculating Factorial | If perfect, print `factorial(n)` (only small `n` fits in `long`; `6! = 720`, `28!` needs `BigInteger`). |
| Check Automorphic and Palindrome / Check Even and Automorphic | Combine `isAutomorphic` with `isPalindrome` / `% 2`. |
| Harshad (Niven) Number and Prime / Harshad and Palindrome | Combine `isHarshad` with `isPrime` / `isPalindrome`. |
| Checking Abundant and Fibonacci / Prime and Abundant | `isAbundant` with `isFibonacci` / `isPrime`. (No prime is abundant: a prime's only proper divisor is 1.) |
| Checking for Armstrong Numbers and Amicable Numbers | Run both checks on the inputs. |
| Check Amicable Numbers and Find GCD if Not Amicable | `if (!isAmicable(a,b)) print gcd(a,b)` (Example 47). |

## 4.6 Capstone: One Program That Classifies a Number Every Way

This program puts every helper from Module 4 into one reusable `NumberUtils`-style class. It is the professional shape of the module: **each helper is small, named, tested, and reused**, and `main` only orchestrates.

#### Example 48: a complete number classifier

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; (long) i * i <= n; i++) if (n % i == 0) return false;
        return true;
    }
    static int sumDigits(int n) { int s = 0; while (n > 0) { s += n % 10; n /= 10; } return s; }
    static int reverse(int n) { int r = 0; while (n > 0) { r = r * 10 + n % 10; n /= 10; } return r; }
    static int digits(int n) { int c = 0; do { c++; n /= 10; } while (n > 0); return c; }
    static long power(int b, int e) { long r = 1; for (int i = 0; i < e; i++) r *= b; return r; }
    static long factorial(int n) { long f = 1; for (int i = 2; i <= n; i++) f *= i; return f; }
    static int sumProperDivisors(int n) { int s = 0; for (int i = 1; i <= n / 2; i++) if (n % i == 0) s += i; return s; }

    static boolean isPalindrome(int n) { return n == reverse(n); }
    static boolean isArmstrong(int n) {
        int d = digits(n), t = n; long s = 0;
        while (t > 0) { s += power(t % 10, d); t /= 10; }
        return s == n;
    }
    static boolean isStrong(int n) {
        int t = n; long s = 0;
        while (t > 0) { s += factorial(t % 10); t /= 10; }
        return s == n;
    }
    static boolean isFibonacci(int n) { int a = 0, b = 1; while (a < n) { int t = a + b; a = b; b = t; } return a == n; }
    static boolean isAutomorphic(int n) { return (long) n * n % power(10, digits(n)) == n; }
    static boolean isHarshad(int n) { return n > 0 && n % sumDigits(n) == 0; }

    static List<String> classify(int n) {
        List<String> tags = new ArrayList<>();
        tags.add(n % 2 == 0 ? "even" : "odd");
        tags.add(isPrime(n) ? "prime" : (n > 1 ? "composite" : "neither"));
        if (isPalindrome(n)) tags.add("palindrome");
        if (isArmstrong(n)) tags.add("Armstrong");
        if (isStrong(n)) tags.add("strong");
        if (isFibonacci(n)) tags.add("Fibonacci");
        if (isAutomorphic(n)) tags.add("automorphic");
        if (isHarshad(n)) tags.add("Harshad");
        int s = sumProperDivisors(n);
        if (n > 1) tags.add(s == n ? "perfect" : s > n ? "abundant" : "deficient");
        return tags;
    }

    public static void main(String[] args) {
        for (int n : new int[]{1, 2, 6, 12, 21, 145, 153, 376, 496})
            System.out.printf("%4d -> %s%n", n, String.join(", ", classify(n)));
    }
}
```

**Output:**
```text
   1 -> odd, neither, palindrome, Armstrong, strong, Fibonacci, automorphic, Harshad
   2 -> even, prime, palindrome, Armstrong, strong, Fibonacci, Harshad, deficient
   6 -> even, composite, palindrome, Armstrong, automorphic, Harshad, perfect
  12 -> even, composite, Harshad, abundant
  21 -> odd, composite, Fibonacci, Harshad, deficient
 145 -> odd, composite, strong, deficient
 153 -> odd, composite, Armstrong, Harshad, deficient
 376 -> even, composite, automorphic, deficient
 496 -> even, composite, perfect
```

**Explanation:**
- `1` is a special case for almost every definition: it is neither prime nor composite, and "perfect/abundant/deficient" is skipped for it.
- `6` collects many tags: `6² = 36` ends in 6 (automorphic), `1 + 2 + 3 = 6` (perfect), and every single digit is Armstrong and a palindrome.
- `153` is both Armstrong and Harshad (`1 + 5 + 3 = 9`, `153 / 9 = 17`).
- `376² = 141376` ends in 376 → automorphic.
- To answer a combined practice such as "Harshad (Niven) Number and Prime", you would call just two of these helpers.

---

# 5. Module 5: Array and String Manipulation

## 5.1 Arrays

### Concept

An **array** is a fixed-size row of values of the **same type**, stored one after another in memory and numbered from **index 0**.

```
int[] arr = {4, 11, 7, 20, 3};

 index:    0     1     2     3     4
        ┌─────┬─────┬─────┬─────┬─────┐
 arr →  │  4  │ 11  │  7  │ 20  │  3  │      arr.length == 5
        └─────┴─────┴─────┴─────┴─────┘
 valid indexes: 0 .. length-1      arr[5] → ArrayIndexOutOfBoundsException
```

| Fact | Detail |
|---|---|
| Fixed size | The length is set at creation and **cannot change**. Need growth? Use `ArrayList`. |
| Same type | `int[]` holds only `int`s. |
| Zero-based | First element `arr[0]`, last `arr[arr.length - 1]`. |
| `length` is a field | `arr.length` (no parentheses); for strings it is the method `s.length()`. |
| Arrays are objects | The variable holds a **reference** (address) to the array on the heap. |
| Default values | `0` for numbers, `false` for `boolean`, `'\u0000'` for `char`, `null` for objects. |
| Fast access | `arr[i]` takes the same time for any `i`: O(1). |

### Declaring and creating arrays

```java
int[] a = {4, 11, 7};            // declare + create + fill (array literal)
int[] b = new int[5];            // five zeros
String[] names = new String[3];  // three nulls
double[] d = new double[]{1.5, 2.5};
int c[] = {1, 2};                // C-style, legal but not recommended
```

#### Example 49: creation, default values, traversal and the out-of-bounds error

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] arr = {4, 11, 7, 20, 3};
        int[] zeros = new int[3];
        boolean[] flags = new boolean[2];
        String[] names = new String[2];
        System.out.println("arr      = " + Arrays.toString(arr) + ", length " + arr.length);
        System.out.println("defaults = " + Arrays.toString(zeros) + " " + Arrays.toString(flags) + " " + Arrays.toString(names));
        System.out.println("first = " + arr[0] + ", last = " + arr[arr.length - 1]);
        System.out.println("printing the variable directly: " + (arr.toString().startsWith("[I@") ? "[I@... (type + hash code)" : "?"));

        System.out.print("index loop : ");
        for (int i = 0; i < arr.length; i++) System.out.print("arr[" + i + "]=" + arr[i] + " ");
        System.out.println();
        System.out.print("for-each   : ");
        for (int v : arr) System.out.print(v + " ");
        System.out.println();

        arr[2] = 70;                       // arrays are mutable
        System.out.println("after arr[2] = 70: " + Arrays.toString(arr));
        System.out.println(arr[5]);
    }
}
```

**Output:**
```text
arr      = [4, 11, 7, 20, 3], length 5
defaults = [0, 0, 0] [false, false] [null, null]
first = 4, last = 3
printing the variable directly: [I@... (type + hash code)
index loop : arr[0]=4 arr[1]=11 arr[2]=7 arr[3]=20 arr[4]=3 
for-each   : 4 11 7 20 3 
after arr[2] = 70: [4, 11, 70, 20, 3]
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5
	at Main.main(Main.java:23)
```

**Explanation:**
- `System.out.println(arr)` does **not** print the elements; it prints something like `[I@1b6d3586` (`[I` means "array of int", followed by a hash code). Use `Arrays.toString(arr)`.
- Use the **index loop** when you need the position or want to change elements; use **for-each** when you only read values. Assigning to `v` inside a for-each loop does not change the array, because `v` is a copy.
- The exception message tells you exactly what went wrong: index 5, length 5. Valid indexes stop at 4.

### Sum, average, maximum, minimum and second largest

#### Example 50: the one-pass statistics pattern

```java
public class Main {
    public static void main(String[] args) {
        int[] arr = {4, 11, 7, 20, 3, 20};
        int sum = 0, max = arr[0], min = arr[0], maxIndex = 0;
        for (int i = 0; i < arr.length; i++) {
            sum += arr[i];
            if (arr[i] > max) { max = arr[i]; maxIndex = i; }
            if (arr[i] < min) min = arr[i];
        }
        double avg = (double) sum / arr.length;
        System.out.println("sum = " + sum + ", average = " + avg);
        System.out.println("max = " + max + " (first at index " + maxIndex + "), min = " + min);

        int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
        for (int v : arr) {
            if (v > first) { second = first; first = v; }
            else if (v > second && v != first) second = v;
        }
        System.out.println("largest = " + first + ", second largest (distinct) = " + second);
    }
}
```

**Output:**
```text
sum = 65, average = 10.833333333333334
max = 20 (first at index 3), min = 3
largest = 20, second largest (distinct) = 11
```

**Explanation:**
- `max` and `min` start at `arr[0]`, **not** at `0`. If all elements were negative, starting `max` at `0` would wrongly report `0`.
- `(double) sum / arr.length` casts **before** dividing; `sum / arr.length` alone would give `10` (integer division).
- `>` (strictly greater) keeps the **first** index of the maximum; `>=` would record the last one (index 5).
- **Second largest in one pass:** when a new largest appears, the old largest drops to second place. `v != first` stops the duplicate 20 from becoming the second largest.

| Element | `first` | `second` |
|---|---|---|
| start | MIN | MIN |
| 4 | 4 | MIN |
| 11 | 11 | 4 |
| 7 | 11 | 7 |
| 20 | 20 | 11 |
| 3 | 20 | 11 |
| 20 | 20 (equal, skipped) | 11 |

### Copying arrays: reference copy vs real copy

#### Example 51: aliasing, manual copy, reverse copy and `Arrays` helpers

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] arr = {4, 11, 7, 20, 3};

        int[] alias = arr;                 // NOT a copy: two names, one array
        alias[0] = 99;
        System.out.println("arr after alias[0] = 99 : " + Arrays.toString(arr));
        arr[0] = 4;                        // restore

        int[] copy = new int[arr.length];
        for (int i = 0; i < arr.length; i++) copy[i] = arr[i];

        int[] rev = new int[arr.length];
        for (int i = 0; i < arr.length; i++) rev[i] = arr[arr.length - 1 - i];

        System.out.println("copy = " + Arrays.toString(copy) + ", rev = " + Arrays.toString(rev));
        System.out.println("arr == copy        : " + (arr == copy));
        System.out.println("Arrays.equals      : " + Arrays.equals(arr, copy));

        int[] c2 = Arrays.copyOf(arr, 7);              // longer: padded with zeros
        int[] c3 = Arrays.copyOfRange(arr, 1, 4);      // indexes 1, 2, 3
        int[] c4 = arr.clone();
        System.out.println("copyOf(arr, 7)     : " + Arrays.toString(c2));
        System.out.println("copyOfRange(1, 4)  : " + Arrays.toString(c3));
        System.out.println("clone              : " + Arrays.toString(c4));

        for (int i = 0, j = arr.length - 1; i < j; i++, j--) {   // reverse IN PLACE
            int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
        System.out.println("reversed in place  : " + Arrays.toString(arr));
    }
}
```

**Output:**
```text
arr after alias[0] = 99 : [99, 11, 7, 20, 3]
copy = [4, 11, 7, 20, 3], rev = [3, 20, 7, 11, 4]
arr == copy        : false
Arrays.equals      : true
copyOf(arr, 7)     : [4, 11, 7, 20, 3, 0, 0]
copyOfRange(1, 4)  : [11, 7, 20]
clone              : [4, 11, 7, 20, 3]
reversed in place  : [3, 20, 7, 11, 4]
```

**Explanation:**

```
int[] alias = arr;                         int[] copy = arr.clone();

arr   ──┐                                  arr  ──▶ [4, 11, 7, 20, 3]
        ├──▶ [99, 11, 7, 20, 3]
alias ──┘                                  copy ──▶ [4, 11, 7, 20, 3]   (separate array)
```

- `int[] alias = arr;` copies the **reference** only, so a change through `alias` is visible through `arr`.
- `==` compares references (same array object?), so it is `false` for two separate arrays with equal contents. `Arrays.equals` compares element by element.
- For the reverse copy, element `i` comes from `length - 1 - i`: index 0 gets index 4, index 1 gets index 3, and so on.
- The in-place reversal swaps from both ends toward the middle, using two indexes and no second array. It stops when `i` meets `j`.

### Arrays combined with number helpers

#### Example 52: building arrays from number checks

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Main {
    static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; (long) i * i <= n; i++) if (n % i == 0) return false;
        return true;
    }
    static int sumProperDivisors(int n) { int s = 0; for (int i = 1; i <= n / 2; i++) if (n % i == 0) s += i; return s; }
    static int sumDigits(int n) { int s = 0; while (n > 0) { s += n % 10; n /= 10; } return s; }
    static boolean isHarshad(int n) { return n > 0 && n % sumDigits(n) == 0; }

    public static void main(String[] args) {
        int[] arr = {4, 11, 7, 20, 3, 15, 13};

        int maxPrime = -1;
        for (int v : arr) if (isPrime(v) && v > maxPrime) maxPrime = v;
        System.out.println("greatest prime        : " + maxPrime);

        int[] primes = new int[arr.length];          // worst case: all are prime
        int count = 0;
        for (int v : arr) if (isPrime(v)) primes[count++] = v;
        primes = Arrays.copyOf(primes, count);       // trim to the real size
        System.out.println("primes copied         : " + Arrays.toString(primes));

        int[] squared = new int[arr.length];
        for (int i = 0; i < arr.length; i++) squared[i] = arr[i] * arr[i];
        System.out.println("transformed (squares) : " + Arrays.toString(squared));

        List<Integer> abundant = new ArrayList<>();  // growable alternative
        for (int i = 1; i <= 30; i++) if (sumProperDivisors(i) > i) abundant.add(i);
        System.out.println("abundant 1..30        : " + abundant);

        int sum = 0;
        for (int v : arr) sum += v;
        int s = sumProperDivisors(sum);
        System.out.println("sum " + sum + " is " + (s == sum ? "perfect" : s > sum ? "abundant" : "deficient") + " (proper divisor sum " + s + ")");

        int max = arr[0], harshadSum = 0;
        for (int v : arr) { if (v > max) max = v; if (isHarshad(v)) harshadSum += v; }
        System.out.println("greatest " + max + ", sum of Harshad elements " + harshadSum);
    }
}
```

**Output:**
```text
greatest prime        : 13
primes copied         : [11, 7, 3, 13]
transformed (squares) : [16, 121, 49, 400, 9, 225, 169]
abundant 1..30        : [12, 18, 20, 24, 30]
sum 73 is deficient (proper divisor sum 1)
greatest 20, sum of Harshad elements 34
```

**Explanation:**
- `primes[count++] = v` stores `v` at position `count` and **then** increments `count`, so `count` always equals "how many stored so far". `Arrays.copyOf(primes, count)` then trims the unused zeros.
- When you do not know the result size in advance, an `ArrayList` (which grows automatically) is usually simpler than an oversized array.
- The element sum is `73`, a prime, so its only proper divisor is `1` → deficient.
- Harshad elements: `4, 7, 20, 3` (each divisible by its digit sum) → `4 + 7 + 20 + 3 = 34`. `11` (digit sum 2), `15` (6) and `13` (4) are not.

### Two-dimensional arrays

A 2-D array is an **array of arrays**: `int[][] m = new int[rows][cols];` and `m[r][c]` is row `r`, column `c`.

#### Example 53: matrix traversal, row sums and transpose

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[][] m = {
            {1, 2, 3},
            {4, 5, 6}
        };
        System.out.println("rows = " + m.length + ", cols = " + m[0].length);
        for (int r = 0; r < m.length; r++) {
            int rowSum = 0;
            for (int c = 0; c < m[r].length; c++) {
                System.out.print(m[r][c] + " ");
                rowSum += m[r][c];
            }
            System.out.println("| row sum " + rowSum);
        }
        int[][] t = new int[m[0].length][m.length];
        for (int r = 0; r < m.length; r++)
            for (int c = 0; c < m[r].length; c++)
                t[c][r] = m[r][c];
        System.out.println("transpose: " + Arrays.deepToString(t));

        int[][] jagged = {{1}, {2, 3}, {4, 5, 6}};          // rows of different lengths
        System.out.println("jagged:    " + Arrays.deepToString(jagged));
    }
}
```

**Output:**
```text
rows = 2, cols = 3
1 2 3 | row sum 6
4 5 6 | row sum 15
transpose: [[1, 4], [2, 5], [3, 6]]
jagged:    [[1], [2, 3], [4, 5, 6]]
```

**Explanation:** `m.length` is the number of rows; `m[r].length` is the length of row `r`. Transposing turns rows into columns (`t[c][r] = m[r][c]`), so a 2×3 matrix becomes 3×2. Because each row is a separate array, Java allows **jagged** arrays with rows of different lengths; always loop with `m[r].length`, not a fixed column count. `Arrays.deepToString` prints nested arrays.

### Useful `Arrays` methods

| Method | Does | Example result |
|---|---|---|
| `Arrays.toString(a)` | readable text | `[3, 1, 2]` |
| `Arrays.sort(a)` | sorts ascending, in place | `[1, 2, 3]` |
| `Arrays.fill(a, 7)` | sets every element | `[7, 7, 7]` |
| `Arrays.equals(a, b)` | element-by-element equality | `true` / `false` |
| `Arrays.copyOf(a, n)` | copy, truncated or zero-padded to `n` | |
| `Arrays.copyOfRange(a, from, to)` | copy of `[from, to)` | |
| `Arrays.binarySearch(a, key)` | index of `key` in a **sorted** array (negative if absent) | |
| `Arrays.stream(a).sum()` | sum (also `.max()`, `.average()`) | |
| `Arrays.deepToString(m)` | text for 2-D arrays | `[[1, 2], [3, 4]]` |

| Practice | How to solve |
|---|---|
| Adding Abundant Numbers to an Array | Loop a range; when `isAbundant(i)`, store `arr[count++] = i`. Size the array to the maximum possible count, or use an `ArrayList` (Example 52). |
| Extracting Amicable Numbers to an Array | For each `a`, `b = sumProperDivisors(a)`; if `isAmicable(a, b)`, store. |
| Copying Prime Number in Array | Copy only the elements that are prime (Example 52). |
| Transforming Array | Apply an operation to each element (double it, square it) into a new array (Example 52). |
| Array Elements in Reverse Order and Adding Armstrong / Automorphic Numbers | Reverse-copy (Example 51), then append the numbers that satisfy the check. |
| Sum of Array Element is Perfect / Abundant Number or Not | `sum` then `isPerfect(sum)` / `isAbundant(sum)` (Example 52). |
| Greatest Number in an Array and Adding Harshad Numbers | Running max; also sum the elements where `isHarshad` (Example 52). |
| Finding the Greatest Prime Number from an Array | Example 52. |

## 5.2 Strings

### Concept

A `String` is an **immutable** sequence of characters. *Immutable* means a string object can never change after creation: every "modifying" method such as `toUpperCase()` or `replace()` returns a **new** string and leaves the original untouched.

```
String s = "Java";

 index:   0    1    2    3
        ┌────┬────┬────┬────┐
        │ J  │ a  │ v  │ a  │       s.length() == 4
        └────┴────┴────┴────┘
```

### Core `String` methods

| Method | Returns | `"Java Code"` example |
|---|---|---|
| `length()` | number of chars | `9` |
| `charAt(i)` | char at index `i` | `charAt(2)` → `'v'` |
| `indexOf(x)` / `lastIndexOf(x)` | first / last position, or `-1` | `indexOf('a')` → `1`, `lastIndexOf('a')` → `3` |
| `substring(b, e)` | chars from `b` to `e-1` | `substring(0, 4)` → `"Java"` |
| `substring(b)` | from `b` to the end | `substring(5)` → `"Code"` |
| `toUpperCase()` / `toLowerCase()` | new string | `"JAVA CODE"` |
| `trim()` / `strip()` | without leading/trailing spaces | |
| `replace(a, b)` | every `a` replaced by `b` | `replace('a', 'o')` → `"Jovo Code"` |
| `contains(s)` / `startsWith(s)` / `endsWith(s)` | `boolean` | `contains("Co")` → `true` |
| `split(regex)` | `String[]` of pieces | `split(" ")` → `["Java", "Code"]` |
| `toCharArray()` | `char[]` | |
| `equals(o)` / `equalsIgnoreCase(o)` | content comparison | |
| `compareTo(o)` | negative / 0 / positive (dictionary order) | `"apple".compareTo("banana")` → `-1` |
| `isEmpty()` / `isBlank()` | length 0 / only whitespace | |
| `String.valueOf(x)` | any value as text | `String.valueOf(42)` → `"42"` |
| `String.join(sep, parts)` | joins with a separator | `String.join("-", "a", "b")` → `"a-b"` |

#### Example 54: core methods and immutability

```java
public class Main {
    public static void main(String[] args) {
        String s = "Java Code";
        System.out.println(s.length() + " " + s.charAt(2) + " " + s.indexOf('a') + " " + s.lastIndexOf('a') + " " + s.indexOf('z'));
        System.out.println(s.substring(0, 4) + "|" + s.substring(5) + "|" + s.toUpperCase() + "|" + s.replace('a', 'o'));
        System.out.println(s.contains("Co") + " " + s.startsWith("Ja") + " " + s.endsWith("x"));

        String upper = s.toUpperCase();
        System.out.println("original still: " + s + ", new: " + upper);

        String[] parts = "red,green,,blue".split(",");
        System.out.println(parts.length + " parts: " + String.join(" | ", parts));
        System.out.println("[" + "  padded  ".trim() + "]");
        System.out.println("apple vs banana: " + "apple".compareTo("banana") + ", banana vs apple: " + "banana".compareTo("apple"));
    }
}
```

**Output:**
```text
9 v 1 3 -1
Java|Code|JAVA CODE|Jovo Code
true true false
original still: Java Code, new: JAVA CODE
4 parts: red | green |  | blue
[padded]
apple vs banana: -1, banana vs apple: 1
```

**Explanation:**
- `indexOf('z')` returns `-1` ("not found"); always check for `-1` before using the result as an index.
- `substring(0, 4)`: the end index is **exclusive**, so you get indexes 0-3. A handy rule: `substring(b, e)` has length `e - b`.
- After `s.toUpperCase()`, `s` is still `"Java Code"`. A common bug is calling `s.toUpperCase();` alone and expecting `s` to change; you must write `s = s.toUpperCase();`.
- `"red,green,,blue".split(",")` gives **4** parts, including an empty string between the two commas.
- `compareTo` returns the difference of the first differing characters: `'a' - 'b' = -1`. Negative means "comes first in dictionary order"; this is what sorting uses.

#### Example 55: `==` vs `.equals()` and why `StringBuilder` exists

```java
public class Main {
    public static void main(String[] args) {
        String a = "hello";
        String b = "hello";                    // same literal → same pooled object
        String c = new String("hello");        // forced new object
        String d = "hel" + "lo";               // constant folded at compile time
        String part = "hel";
        String e = part + "lo";                // built at run time → new object

        System.out.println("a == b      : " + (a == b));
        System.out.println("a == c      : " + (a == c));
        System.out.println("a == d      : " + (a == d));
        System.out.println("a == e      : " + (a == e));
        System.out.println("a.equals(e) : " + a.equals(e));
        System.out.println("HELLO equalsIgnoreCase: " + "HELLO".equalsIgnoreCase(a));

        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 5; i++) sb.append(i).append(i < 5 ? "-" : "");
        sb.insert(0, "[").append("]");
        System.out.println(sb + ", length " + sb.length() + ", reversed " + new StringBuilder(sb).reverse());
    }
}
```

**Output:**
```text
a == b      : true
a == c      : false
a == d      : true
a == e      : false
a.equals(e) : true
HELLO equalsIgnoreCase: true
[1-2-3-4-5], length 11, reversed ]5-4-3-2-1[
```

**Explanation:**
- `==` asks "are these the **same object**?"; `.equals()` asks "do they contain the **same characters**?".
- String literals are stored once in the **String pool**, so `a` and `b` share one object. `new String(...)` always creates a new object. `"hel" + "lo"` is computed by the compiler, so it is a literal too; `part + "lo"` is computed at run time, producing a new object.
- The results of `==` depend on these details, which is exactly why you must **always use `.equals()`** for strings.
- Because strings are immutable, `s = s + x` inside a loop creates a new string every round (O(n²) copying in total). `StringBuilder` is a **mutable** buffer: `append`, `insert`, `reverse` and `deleteCharAt` change it in place.

### String problems

#### Example 56: capitalise words, sort characters, reverse words and the whole string

```java
import java.util.Arrays;

public class Main {
    static String capitalizeWords(String s) {
        StringBuilder sb = new StringBuilder();
        for (String w : s.trim().split("\\s+")) {          // \\s+ = one or more spaces
            if (sb.length() > 0) sb.append(' ');
            sb.append(Character.toUpperCase(w.charAt(0))).append(w.substring(1).toLowerCase());
        }
        return sb.toString();
    }

    static String reverseEachWord(String s) {
        StringBuilder sb = new StringBuilder();
        for (String w : s.split(" ")) {
            if (sb.length() > 0) sb.append(' ');
            sb.append(new StringBuilder(w).reverse());
        }
        return sb.toString();
    }

    static String reverseManually(String s) {
        String r = "";
        for (int i = s.length() - 1; i >= 0; i--) r += s.charAt(i);
        return r;
    }

    static String reverseWordOrder(String s) {
        String[] w = s.split(" ");
        StringBuilder sb = new StringBuilder();
        for (int i = w.length - 1; i >= 0; i--) sb.append(w[i]).append(i > 0 ? " " : "");
        return sb.toString();
    }

    public static void main(String[] args) {
        System.out.println(capitalizeWords("java is   fun to LEARN"));

        char[] cs = "program".toCharArray();
        Arrays.sort(cs);
        System.out.println(new String(cs) + " " + Arrays.toString(cs));
        char[] mixed = "JavaCode".toCharArray();
        Arrays.sort(mixed);
        System.out.println("mixed case sorts uppercase first: " + new String(mixed));

        String text = "hello java world";
        System.out.println("each word reversed : " + reverseEachWord(text));
        System.out.println("whole string       : " + new StringBuilder(text).reverse());
        System.out.println("manual loop        : " + reverseManually(text));
        System.out.println("word order reversed: " + reverseWordOrder(text));
    }
}
```

**Output:**
```text
Java Is Fun To Learn
agmoprr [a, g, m, o, p, r, r]
mixed case sorts uppercase first: CJaadeov
each word reversed : olleh avaj dlrow
whole string       : dlrow avaj olleh
manual loop        : dlrow avaj olleh
word order reversed: world java hello
```

**Explanation:**
- `split("\\s+")` treats **runs** of spaces as one separator, so the three spaces between `is` and `fun` do not create empty words (with `split(" ")`, `charAt(0)` on an empty word would throw `StringIndexOutOfBoundsException`). `.toLowerCase()` on the rest turns `LEARN` into `Learn`.
- `Arrays.sort` on a `char[]` sorts by character code, so `C` (67) and `J` (74) come before every lowercase letter.
- Three different "reverses":

| Operation | `"hello java world"` → |
|---|---|
| reverse each word | `olleh avaj dlrow` (word order kept) |
| reverse whole string | `dlrow avaj olleh` (letters and word order reversed) |
| reverse word order | `world java hello` (letters kept) |

- `reverseManually` shows the loop logic, but `r += …` creates a new string each round; for long strings use `StringBuilder`.

#### Example 57: palindromes, vowel counting and character frequency

```java
public class Main {
    static boolean isPalindrome(String s) {
        String clean = s.toLowerCase().replaceAll("[^a-z0-9]", "");   // keep letters and digits
        int i = 0, j = clean.length() - 1;
        while (i < j) {
            if (clean.charAt(i) != clean.charAt(j)) return false;
            i++; j--;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println("madam: " + isPalindrome("madam"));
        System.out.println("A man, a plan, a canal: Panama: " + isPalindrome("A man, a plan, a canal: Panama"));
        System.out.println("java: " + isPalindrome("java"));

        String s = "Programming in Java";
        int vowels = 0, consonants = 0, spaces = 0;
        for (char ch : s.toLowerCase().toCharArray()) {
            if ("aeiou".indexOf(ch) >= 0) vowels++;
            else if (Character.isLetter(ch)) consonants++;
            else if (ch == ' ') spaces++;
        }
        System.out.println("vowels " + vowels + ", consonants " + consonants + ", spaces " + spaces);

        int[] freq = new int[26];
        for (char ch : s.toLowerCase().toCharArray())
            if (ch >= 'a' && ch <= 'z') freq[ch - 'a']++;
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 26; i++)
            if (freq[i] > 1) sb.append((char) ('a' + i)).append('=').append(freq[i]).append(' ');
        System.out.println("letters appearing more than once: " + sb.toString().trim());
    }
}
```

**Output:**
```text
madam: true
A man, a plan, a canal: Panama: true
java: false
vowels 6, consonants 11, spaces 2
letters appearing more than once: a=3 g=2 i=2 m=2 n=2 r=2
```

**Explanation:**
- The **two-pointer** palindrome check compares the first and last characters, then moves both pointers inward. It stops as soon as one pair differs, and needs no reversed copy.
- `replaceAll("[^a-z0-9]", "")` removes everything that is not a lowercase letter or digit (a *regular expression*), so spaces and punctuation are ignored.
- Frequency counting with `int[26]`: `ch - 'a'` maps `'a'` → 0, `'b'` → 1, …, `'z'` → 25, so each letter has its own counter. `(char) ('a' + i)` maps back from index to letter.

| Practice | How to solve |
|---|---|
| Capitalize the first letter of each word in String | `capitalizeWords` (Example 56). |
| Sorting Characters of a Word in Ascending Order and Storing in an Array | `toCharArray()` + `Arrays.sort`. (Uppercase letters sort before lowercase: compare in one case with `toLowerCase()` first if needed.) |
| Reverse Each Word in string | `reverseEachWord` (Example 56). |
| Reverse Entire String | `new StringBuilder(s).reverse()` or a loop from `s.length() - 1` down to 0. |

> **Compare strings with `.equals()`, never `==`** (Example 55; see also [Java_Handwritten_Notes.md](Java_Handwritten_Notes.md), chapter 14). Build strings in loops with `StringBuilder`, not `+`.

---

# 6. Common Mistakes Across All Modules

| # | Mistake | Wrong | Right | Section |
|---|---|---|---|---|
| 1 | Integer division | `7 / 2` → `3` | `7 / 2.0` or `(double) 7 / 2` → `3.5` | 1.1 |
| 2 | `=` instead of `==` | `if (x = 5)` (compile error in Java) | `if (x == 5)` | 2.1 |
| 3 | Missing braces | second line silently outside the `if`/loop | always write `{ }` | 2.2 |
| 4 | Forgetting `break` in an old-style `switch` | falls through into the next case | add `break`, or use `->` | 2.1 |
| 5 | Off-by-one | `i <= arr.length` | `i < arr.length` (indexes `0 .. length-1`) | 5.1 |
| 6 | Infinite loop | no update, or update moves away from the condition | check the loop variable moves toward the end | 2.2 |
| 7 | `1` treated as prime | `isPrime(1)` → `true` | return `false` for `n < 2` | 4.1 |
| 8 | Digit loops on negative numbers | `while (n > 0)` never runs for `-123` | `n = Math.abs(n)` first | 4.2 |
| 9 | Silent overflow | `13!` in `int` → `1932053504` | `long`, `BigInteger`, `Math.multiplyExact` | 4.4 |
| 10 | Floating-point equality | `0.1 + 0.2 == 0.3` → `false` | `Math.abs(a - b) < 1e-9`; `BigDecimal` for money | 1.1 |
| 11 | `nextLine()` after `nextInt()` | returns `""` | consume the leftover newline | 1.1 |
| 12 | Comparing arrays/strings with `==` | compares references | `Arrays.equals`, `.equals()` | 5.1, 5.2 |
| 13 | Destroying the original | `while (n > 0) n /= 10;` then `s == n` | copy first: `int t = n;` | 4.3 |
| 14 | `power(...)` returning `int` | `9^12` overflows | return `long` | 4.2 |
| 15 | Odd test with `== 1` | `-3 % 2 == 1` is `false` | `n % 2 != 0` | 3.1 |
| 16 | `"Sum: " + a + b` | joins as text → `Sum: 1230` | `"Sum: " + (a + b)` | 1.1 |
| 17 | Ignoring the result of a string method | `s.toUpperCase();` | `s = s.toUpperCase();` | 5.2 |
| 18 | Starting `max` at `0` | wrong for all-negative arrays | start at `arr[0]` | 5.1 |
| 19 | `x = x++` | `x` does not change | `x++;` | 1.2 |
| 20 | Wrong ladder order | `if (m >= 60) … else if (m >= 90)` | largest threshold first | 2.1 |

---

# 7. Interview Questions

| Question | Short answer |
|---|---|
| `for` vs `while` vs `do-while`? | `for`: known count; `while`: condition checked first; `do-while`: runs at least once. |
| `break` vs `continue`? | `break` leaves the loop; `continue` skips to the next round. |
| What is a labeled break? | `break label;` leaves the labeled outer loop (Example 27). |
| Why check primes only up to √n? | A divisor above √n pairs with one below it. |
| How do you reverse a number without strings? | `r = r*10 + n%10; n /= 10;` in a loop. |
| How do you check a palindrome number? | Reverse it and compare with the original. |
| What is an Armstrong number? | Sum of digits each raised to the digit count equals the number (153). |
| Time complexity of `isPrime`? | O(√n). |
| Can a `switch` use a `String`? | Yes (Java 7+). Not `long`, `float`, `double`, `boolean`. |
| What happens if a `switch` case has no `break`? | Execution **falls through** to the next case. |
| What does `yield` do? | Returns a value from a block inside a switch **expression**. |
| `i++` vs `++i`? | Use then add; add then use. |
| Difference between `&&` and `&`? | `&&` short-circuits; `&` always evaluates both sides (and works on bits). |
| `>>` vs `>>>`? | `>>` keeps the sign bit; `>>>` fills with zeros. |
| How do you swap two numbers without a temp? | `a = a + b; b = a - b; a = a - b;` (or XOR). A temp variable is clearer. |
| How is an array different from `ArrayList`? | Fixed size and primitives allowed vs growable and objects only. |
| What is the default value of an `int[]` element? Of a `String[]` element? | `0`; `null`. |
| Why does `System.out.println(arr)` print `[I@…`? | Arrays do not override `toString()`; use `Arrays.toString(arr)`. |
| Why is `String` immutable? | Security, thread safety, string-pool sharing, cached hash codes. |
| `String` vs `StringBuilder`? | Immutable vs mutable; use `StringBuilder` for repeated changes. |
| `==` vs `.equals()` for strings? | Same object vs same characters (Example 55). |
| Find the second-largest in an array? | Track `max` and `second` in one pass (Example 50). |
| GCD of two numbers? | Euclid: `gcd(a, b) = gcd(b, a % b)`. LCM = `a / gcd * b`. |
| Check if a number is a power of 2? | `n > 0 && (n & (n - 1)) == 0`. |
| Is Java pass-by-value or pass-by-reference? | Always pass-by-value (for objects, the *reference* is copied) (Example 36). |
| Why does `0.1 + 0.2` print `0.30000000000000004`? | `0.1` and `0.2` have no exact binary representation. |
| What happens on `int` overflow? | It silently wraps around (`Integer.MAX_VALUE + 1 == Integer.MIN_VALUE`). |

---

# 8. Predict-the-Output Quiz

Cover the answers, write your prediction, then check. Each answer was produced by running the code.

| # | Code | Output | Why |
|---|---|---|---|
| 1 | `System.out.println(10 + 20 + "Java" + 10 + 20);` | `30Java1020` | Left to right: numbers add until the first string, then everything joins. |
| 2 | `System.out.println('A' + 'B');` | `131` | `char + char` is `int`: 65 + 66. |
| 3 | `System.out.println("" + 'A' + 'B');` | `AB` | String first, so characters are joined. |
| 4 | `int x = 5; x += x++ * 2; System.out.println(x);` | `15` | `x = 5 + (5 * 2)`; the post-increment is overwritten. |
| 5 | `System.out.println(5 / 2 * 2.0);` | `4.0` | `5 / 2 = 2` (int), then `2 * 2.0 = 4.0`. |
| 6 | `System.out.println(-7 % 3);` | `-1` | Sign follows the left operand. |
| 7 | `for (int i = 0; i < 5; i += 2) System.out.print(i);` | `024` | `i` = 0, 2, 4; 6 fails the test. |
| 8 | `int i = 0; while (i++ < 3) System.out.print(i);` | `123` | Compare with the old value, print the new value. |
| 9 | `System.out.println(Integer.MAX_VALUE + 1);` | `-2147483648` | Overflow wraps around. |
| 10 | `System.out.println((char) ('a' + 25));` | `z` | 97 + 25 = 122. |
| 11 | `System.out.println("Java".substring(1, 1).length());` | `0` | Begin = end gives the empty string. |
| 12 | `System.out.println(1.0 / 0 + " " + (0.0 == -0.0));` | `Infinity true` | Floating-point division by zero; `0.0` and `-0.0` compare equal. |
| 13 | `System.out.println(true ? 1 : 2.0);` | `1.0` | Both branches are promoted to a common type (`double`). |
| 14 | `int[] a = {1,2,3}; int[] b = a; b[0] = 9; System.out.println(a[0]);` | `9` | `b` is an alias of `a`. |
| 15 | `System.out.println(Math.round(2.5) + " " + Math.round(-2.5));` | `3 -2` | `Math.round` adds 0.5 and takes the floor. |

#### Example 58: running the quiz

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(10 + 20 + "Java" + 10 + 20);
        System.out.println('A' + 'B');
        System.out.println("" + 'A' + 'B');
        int x = 5; x += x++ * 2; System.out.println(x);
        System.out.println(5 / 2 * 2.0);
        System.out.println(-7 % 3);
        for (int i = 0; i < 5; i += 2) System.out.print(i);
        System.out.println();
        int i = 0; while (i++ < 3) System.out.print(i);
        System.out.println();
        System.out.println(Integer.MAX_VALUE + 1);
        System.out.println((char) ('a' + 25));
        System.out.println("Java".substring(1, 1).length());
        System.out.println(1.0 / 0 + " " + (0.0 == -0.0));
        System.out.println(true ? 1 : 2.0);
        int[] a = {1, 2, 3}; int[] b = a; b[0] = 9; System.out.println(a[0]);
        System.out.println(Math.round(2.5) + " " + Math.round(-2.5));
    }
}
```

**Output:**
```text
30Java1020
131
AB
15
4.0
-1
024
123
-2147483648
z
0
Infinity true
1.0
9
3 -2
```

---

# 9. How to Practise and Self-Check

1. **Predict, then run.** For every operator/loop exercise, write the output on paper first. Wrong predictions show you exactly which rule you have not absorbed yet.
2. **Trace with a table** for loops: columns `i`, `j`, condition, output (as in Examples 20, 25, 40).
3. **Build helpers once** (`isPrime`, `sumDigits`, `reverse`, `digits`, `power`, `factorial`, `sumProperDivisors`) and reuse them: nearly every "combining" practice title in Module 4 is two helpers glued by an `if` (Example 48).
4. **Test edge cases:** `0`, `1`, `2`, negative numbers, a one-digit number, the largest value, empty input, boundary marks such as 74/75.
5. **Small steps:** make it work for one value, then add the loop, then add `Scanner`.
6. **Refactor:** move repeated code into a method with a clear name.
7. **Read error messages fully.** The first line names the problem (`ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5`) and `at Main.main(Main.java:23)` names the line.
8. **Debug with prints.** When the output is wrong, print the variables inside the loop (as in Example 20) and compare with your hand trace.

### A professional solution template

```java
import java.util.Scanner;

public class Main {
    // 1. Small, single-purpose helpers that RETURN values (no printing inside)
    static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; (long) i * i <= n; i++) if (n % i == 0) return false;
        return true;
    }

    // 2. main only reads input, calls helpers and prints results
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int n = sc.nextInt();
        System.out.println(n + (isPrime(n) ? " is prime" : " is not prime"));
        sc.close();
    }
}
```

**Suggested order:** Module 1 → 2 (all) → 3.3 (methods) → 3.1-3.2 → 4.1-4.2 → 4.3 → 4.4 → 4.5 → 4.6 → 5.

---

# 10. Cheat Sheet

```text
RUN        javac Main.java && java Main      |  java Main.java  (Java 11+, single file)
OUTPUT     println (newline) | print | printf("%d %.2f %s %c %5d %-10s%n")   %% = literal %
INPUT      Scanner sc = new Scanner(System.in);  nextInt nextDouble next nextLine ; char: next().charAt(0)
           after nextInt() call sc.nextLine() once before reading a full line
OPERATORS  arithmetic + - * / %  | relational == != < > <= >= | logical && || ! (short-circuit)
           bitwise & | ^ ~ << >> >>> | ternary c ? a : b | x++ (use then add) ++x (add then use)
           int / int truncates | % sign follows left operand | "a" + 1 + 2 = "a12", 1 + 2 + "a" = "3a"
IF         if / else if / else ; put the largest threshold first ; axis/edge cases first
SWITCH     case ... break ; modern: case A, B -> value ; yield in blocks ; default for the rest
           types: int char byte short String enum  (not long, float, double, boolean)
LOOPS      for (init; cond; update) | while (cond) | do { } while (cond);   ALWAYS use { }
JUMP       break (leave loop) | continue (next round) | label: ... break label; | return
METHODS    returnType name(params) { ... return value; }   one job per method ; pass-by-value
DIGITS     n % 10 = last digit | n / 10 = drop last digit | digits count: do { c++; n /= 10; } while (n > 0)
           reverse: r = r * 10 + n % 10 | char digit → int: ch - '0'
PRIME      n >= 2 and no divisor i with i*i <= n          FACTORS  pairs (i, n/i) up to √n
ARMSTRONG  sum(digit^numberOfDigits) == n          STRONG  sum(digit!) == n   (1, 2, 145, 40585)
PERFECT    sum of proper divisors == n   ABUNDANT  > n   AUTOMORPHIC  n*n % 10^digits == n
HARSHAD    n % sumDigits(n) == 0                   AMICABLE  s(a)=b and s(b)=a and a != b
FIBONACCI  0 1 1 2 3 5 8 13 21 ...   x,y = y, x+y        GCD  gcd(a,b) = gcd(b, a%b)   LCM a/gcd*b
OVERFLOW   int ≤ 2,147,483,647 (12!) | long ≤ 9.2e18 (20!) | BigInteger beyond
ARRAY      int[] a = new int[n]; a.length; a[i] (0..n-1); Arrays.sort / toString / equals / copyOf
           b = a is an alias ; copy with a.clone() / Arrays.copyOf ; max starts at a[0]
STRING     length() charAt substring(b,e excl.) indexOf split toCharArray ; immutable: s = s.trim()
           equals not == ; StringBuilder append/insert/reverse for loops
```
