---
sidebar_position: 3
---

# Scanner

## Java Scanner Input and Buffer

### 1. Scanner Package

Java mein `Scanner` class use karne ke liye humein yeh package import karna padta hai:

```java
import java.util.Scanner;
```

In Java, we need to import this package to use the `Scanner` class for input.

---

### 2. Scanner Input kaise kaam karta hai? (How Scanner input works)

Jab hum keyboard se input dete hain, wo seedha Scanner tak nahi jaata.
Pehle wo ek temporary jagah mein store hota hai, jise hum **buffer** kehte hain.

When we type something from the keyboard, it doesn't go directly to the Scanner.
It first goes into a temporary place called the **buffer**.

### Example:

Agar tum likhte ho:

```
10⏎
```

To buffer mein store hota hai:

```
[ '1', '0', '\n' ]
```

* `'1'`, `'0'` = tumhara number
* `'\n'` = Enter key se aayi newline character

When you type `10` and press Enter, these characters go to the buffer.

---

### 3. `System.in` kya hai? (What is `System.in`?)

`System.in` ek **input stream** hai jo keyboard se data read karta hai.
Yeh ek **byte stream** hoti hai — iska matlab yeh raw data (bytes) read karta hai.

`System.in` is an **input stream** connected to the keyboard.
It is a **byte stream**, meaning it reads raw binary data (bytes).

### Stream vs Pipeline:

* **Stream** ek data ka flow hota hai — jaise pipe ke andar paani beh raha ho.
* **Pipeline** usually ek set of steps hota hai jisme data process hota hai stage-by-stage.

Stream is a continuous flow of data (like water in a pipe),
whereas a pipeline is a chain of operations. In Java, `System.in` is called a **stream**.

---

### 4. Scanner Methods aur Buffer Behavior

### `nextInt()` kya karta hai? (What does `nextInt()` do?)

* Sirf **number** padhta hai
* `\n` (Enter) ko **ignore** karta hai, lekin buffer mein chhod deta hai

It reads only the number, and leaves the Enter (`\n`) in the buffer.

### `nextLine()` kya karta hai? (What does `nextLine()` do?)

* **Puri line** padhta hai, including `\n`
* Agar buffer mein sirf `\n` ho, to yeh **khaali string** ("") return karta hai

It reads the whole line, including newline. If only `\n` is left in the buffer, it returns an empty string.

---

### 5. Problem kab aati hai? (When does the problem happen?)

Agar tum `nextInt()` ke baad `nextLine()` use karte ho:

```java
int n = sc.nextInt();      // Input: 10
String name = sc.nextLine(); // Problem: yeh sirf \n padhta hai
```

**Result:** `name` becomes an empty string ("")

This happens because the leftover `\n` in the buffer is read by `nextLine()`.

---

### 6. Solution (Extra `nextLine()` use karo / Use an extra `nextLine()`)

```java
int n = sc.nextInt();     // Input: 10
sc.nextLine();            // Yeh \n hata deta hai (clears buffer)
String name = sc.nextLine(); // Ab sahi input lega (reads actual name)
```

Use an extra `sc.nextLine()` to remove the newline from the buffer.

---

### 7. Summary Table

| Tum kya use kar rahe ho? (What are you using?) | Extra `sc.nextLine()` chahiye? | Needed? |
| ---------------------------------------------- | ------------------------------ | ------- |
| `nextInt()` ke baad `nextInt()`                | ❌ Nahi chahiye                 | ❌ No    |
| `nextInt()` ke baad `nextLine()`               | ✅ Haan, chahiye                | ✅ Yes   |

---

### 8. Full Table Summary

| Method          | Reads            | Spaces Allowed? | Leaves `\n`? | Use extra `nextLine()`? |
| --------------- | ---------------- | --------------- | ------------ | ----------------------- |
| `next()`        | One word         | ❌ No            | ✅ Yes        | ✅ Yes                   |
| `nextLine()`    | Full line        | ✅ Yes           | ❌ No         | ❌ No                    |
| `nextInt()`     | Integer          | ❌ No            | ✅ Yes        | ✅ Yes                   |
| `nextByte()`    | Byte             | ❌ No            | ✅ Yes        | ✅ Yes                   |
| `nextShort()`   | Short            | ❌ No            | ✅ Yes        | ✅ Yes                   |
| `nextLong()`    | Long             | ❌ No            | ✅ Yes        | ✅ Yes                   |
| `nextFloat()`   | Decimal (float)  | ❌ No            | ✅ Yes        | ✅ Yes                   |
| `nextDouble()`  | Decimal (double) | ❌ No            | ✅ Yes        | ✅ Yes                   |
| `nextBoolean()` | true/false       | ❌ No            | ✅ Yes        | ✅ Yes                   |



## sc.close() in Java

`sc.close();` is used to **close the Scanner object** after you're done taking input.

---

### Why should you use it?

**1. Frees up system resources:**
Closing the Scanner releases the **input stream** (like `System.in`) and any memory associated with it.

**2. Good practice:**
It's a part of **resource management** — like closing files or database connections after use.

**3. Avoids memory leaks:**
Keeping input streams open unnecessarily can cause memory issues in **long-running programs**.

---

### Note:

* After calling `sc.close();`, you **cannot use** that Scanner again.
* If you try to read input after closing, it will throw an exception:

```java
java.util.NoSuchElementException
```

Always close your Scanner object when you're completely done using it.
