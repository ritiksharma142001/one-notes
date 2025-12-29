---
sidebar_position: 2
---

**Java Strings and Character Arrays**

### 1. What are Strings in Java?
- Strings in Java are objects that store sequences of characters.
- They are represented by the `String` class.
- Strings are widely used in Java for text manipulation.

**Example:**
```java
String greeting = "Hello, World!";
System.out.println(greeting);  // Output: Hello, World!
```

---

### 2. Array of Characters in Java
- A `char` array can store a sequence of characters.
- Unlike `String`, it is mutable (can be changed).

**Example:**
```java
char[] charArray = {'J', 'a', 'v', 'a'};
System.out.println(charArray);  // Output: Java
```

---

### 3. Null Character (`\0`)
- The null character (`\0`) represents the end of a string in languages like C.
- In Java, strings are not null-terminated.

**Example:**
```java
char[] chars = {'H', 'i', '\0', 'J', 'a', 'v', 'a'};
System.out.println(chars);  // Output: Hi
```

---

**Java Strings are Immutable**

### 1. What Does Immutable Mean?
- An **immutable** object is one whose state **cannot be changed** after creation.
- In Java, once a `String` object is created, its **content cannot be modified**.
- Any modification creates a **new String object** instead of changing the existing one.

---

### 2. How Are Strings Immutable in Java?
- Java stores strings in a **String Pool** to avoid duplication.
- The `String` class and all wrapper classes (`Integer`, `Boolean`, etc.) are immutable.

**Example:**
```java
public class Main {
    public static void main(String[] args) {
        String s1 = "knowledge";
        String s2 = s1; // s2 points to the same "knowledge"
        s1 = s1.concat(" base"); // Creates a new String "knowledge base"
        System.out.println(s1);
    }
}
```
**Output:**
```
knowledge base
```
**Explanation:** The original string "knowledge" remains unchanged. A new string "knowledge base" is created instead.

---

### 3. Why Are Java Strings Immutable?
1. **String Pool Optimization**: Reuses existing strings to save memory.
2. **Security**: Prevents modification of sensitive data (e.g., passwords, URLs).
3. **Thread Safety**: Since strings cannot change, multiple threads can safely use them.
4. **Performance**: JVM optimizes memory usage by reusing immutable strings.

---

### 4. Demonstration of String Immutability
**Example:**
```java
public class Main {
    public static void main(String[] args) {
        String s1 = "java";
        s1.concat(" rules");
        System.out.println("s1 refers to " + s1);
    }
}
```
**Output:**
```
s1 refers to java
```
**Explanation:** Even though `concat(" rules")` is called, `s1` still refers to "java" because a new string is created, but not assigned.

---

### 5. FAQs on String Immutability
- **What is String Immutability in Java?**
  - It means that a string’s value **cannot be changed** after creation.
- **Why are Strings Immutable in Java?**
  - For **security, performance, and thread safety**.
- **Can We Modify a String in Java?**
  - No, any modification creates a **new string object**.
- **What Happens if We Modify a String in Java?**
  - A **new** string is created, and the original remains unchanged.
- **How does String Immutability Help Memory Efficiency?**
  - By **reusing** existing strings in the String Pool, reducing memory usage.

---

**What Does "Thread Safety" Mean for Strings?**

### 1. What is Thread Safety?
- When multiple **threads** (independent parts of a program) access the same **data** at the same time, there is a risk of **unexpected changes** or **errors**.
- **Thread safety** means **multiple threads can use the same data without causing problems**.

---

### 2. How are Strings Thread-Safe?
- **Strings in Java are immutable**, meaning once created, their value **cannot change**.
- If multiple threads access the same string, they **cannot modify it**, preventing conflicts.

---

### 3. Example: Why Immutable Strings are Thread-Safe
Imagine a **shared notebook** where people can only **read** but **not write**:
- Multiple people can read the notebook **at the same time** without issues.
- Since no one can edit it, the content **remains the same for everyone**.



#### **In Java:**
```java
class Main {
    public static void main(String[] args) {
        String message = "Hello"; // Shared string

        // Two threads using the same string
        Thread t1 = new Thread(() -> System.out.println(message));
        Thread t2 = new Thread(() -> System.out.println(message));

        t1.start();
        t2.start();
    }
}
```
✅ **Since `message` cannot change, both threads can safely read it without conflicts.**

---

### 4. What if Strings Were Mutable?
- If one thread **modified** a string while another **read** it, the second thread might get **incorrect or incomplete data**.
- This can cause **bugs** or unexpected behavior.

🔹 **Since Java Strings are immutable, such issues never happen, making them thread-safe by design!** 🚀


// Java Concat()
**Java String concat() Method with Examples**

### 1. What is concat() Method?
- The `concat()` method **appends** one string to the end of another.
- It returns a **new combined string**.
- If **null** is passed, it throws a `NullPointerException`.

#### **Syntax:**
```java
public String concat(String s);
```
- **Parameter**: A string to be appended.
- **Return Value**: A new concatenated string.

---

### 2. Program to Concatenate Two Strings
```java
// Java Program to Illustrate concat() method
class Main {
    public static void main(String args[]) {
        String s = "Geeks";
        s = s.concat("forGeeks");
        System.out.println(s);
    }
}
```
**Output:**
```
GeeksforGeeks
```

---

### 3. Sequential Concatenation of Multiple Strings
```java
public class Main {
    public static void main(String args[]) {
        String s1 = "Computer-";
        String s2 = "Science-";
        String s3 = s1.concat(s2);
        System.out.println(s3);
        
        String s4 = "Portal";
        String s5 = s3.concat(s4);
        System.out.println(s5);
    }
}
```
**Output:**
```
Computer-Science-
Computer-Science-Portal
```

---

### 4. Handling NullPointerException in concat()
```java
public class Main {
    public static void main(String args[]) {
        String s1 = "Computer-";
        String s2 = null;
        String s3 = s1.concat(s2); // Throws NullPointerException
        System.out.println(s3);
    }
}
```
**Output:**
```
Exception in thread "main" java.lang.NullPointerException
```

---

### 5. Combining Two Strings Using concat()
```java
class Main {
    public static void main(String args[]) {
        String s1 = "Geeksfor";
        String s2 = "Geeks";
        s1 = s1.concat(s2);
        System.out.println(s1);
    }
}
```
**Output:**
```
GeeksforGeeks
```

---

### 6. Reversing a String Using concat()
```java
public class ReverseString {
    public static void main(String[] args) {
        String a = "Geeks";
        String b = "";
        for (int i = a.length() - 1; i >= 0; i--) {
            String ch1 = Character.toString(a.charAt(i));
            b = b.concat(ch1);
        }
        System.out.println("Original: " + a);
        System.out.println("Reversed: " + b);
    }
}
```
**Output:**
```
Original: Geeks
Reversed: skeeG
```

---

### **Key Takeaways**
✅ `concat()` appends one string to another.
✅ Returns a new string (does not modify the original).
✅ Throws `NullPointerException` if the argument is `null`.
✅ Used for sequential string concatenation.
✅ Can be used to **reverse** a string with loops.

🚀 **Use `concat()` for efficient string joining instead of `+` operator in loops!**

//String class
**String Class in Java**

### Introduction
String is a sequence of characters. In Java, objects of the String class are immutable, meaning they cannot be changed once created.

---

### Creating a String
There are two ways to create a string in Java:
1. **Using String literal:** `String s = "GeeksforGeeks";`
2. **Using new keyword:** `String s = new String("GeeksforGeeks");`

**Example:**
```java
class GFG {
    public static void main (String[] args) {
        String s1 = "String1";
        System.out.println(s1);
        
        String s2 = new String("String2");
        System.out.println(s2);
    }
}
```
**Output:**
```
String1
String2
```

---

### String Constructors in Java

| Constructor | Description |
|-------------|-------------|
| `String(byte[] byte_arr)` | Constructs a new String by decoding the byte array using the platform's default charset. |
| `String(byte[] byte_arr, Charset char_set)` | Constructs a new String by decoding the byte array using the specified charset. |
| `String(char[] char_arr)` | Allocates a new String from the given character array. |
| `String(StringBuffer s_buffer)` | Allocates a new string from a StringBuffer. |
| `String(StringBuilder s_builder)` | Allocates a new string from a StringBuilder. |

**Example:**
```java
class Main {
    static byte[] b_arr = {71, 101, 101, 107, 115};
    static Charset cs = Charset.defaultCharset();
    static char[] char_arr = {'G', 'e', 'e', 'k', 's'};
    static StringBuffer s_buffer = new StringBuffer("Geeks");
    static StringBuilder s_builder = new StringBuilder("Geeks");

    public static void main(String[] args) {
        String s1 = new String(b_arr);
        System.out.println("Method 1: " + s1);

        String s5 = new String(char_arr);
        System.out.println("Method 5: " + s5);
    }
}
```
**Output:**
```
Method 1: Geeks
Method 5: Geeks
```

---

### String Methods in Java

| Method | Description |
|--------|-------------|
| `int length()` | Returns the number of characters in the string. |
| `char charAt(int i)` | Returns the character at index `i`. |
| `String substring(int i)` | Returns substring from index `i` to end. |
| `String concat(String str)` | Concatenates the specified string to the end of the current string. |
| `int indexOf(String s)` | Returns the index of the first occurrence of `s`. |
| `boolean equals(String anotherString)` | Checks if two strings are equal. |
| `boolean equalsIgnoreCase(String anotherString)` | Compares strings ignoring case. |
| `String toLowerCase()` | Converts all characters to lowercase. |
| `String toUpperCase()` | Converts all characters to uppercase. |
| `String trim()` | Removes whitespace from both ends. |
| `String replace(char oldChar, char newChar)` | Replaces occurrences of `oldChar` with `newChar`. |

**Example:**
```java
class Test {
    public static void main(String[] args) {
        String s = "GeeksforGeeks";
        System.out.println("String length = " + s.length());
        System.out.println("Character at 3rd position = " + s.charAt(3));
        System.out.println("Substring = " + s.substring(2,5));
        
        String s1 = "Geeks";
        String s2 = "forGeeks";
        System.out.println("Concatenated string = " + s1.concat(s2));
        
        System.out.println("Index of Share " + "Learn Share Learn".indexOf("Share"));
        
        System.out.println("Changing to lower Case " + "GeeKyMe".toLowerCase());
        System.out.println("Changing to UPPER Case " + "GeekyME".toUpperCase());
        System.out.println("Trim the word " + " Learn Share Learn ".trim());
        
        String str1 = "feeksforfeeks";
        System.out.println("Original String " + str1);
        System.out.println("Replaced f with g -> " + str1.replace('f' ,'g'));
    }
}
```

**Output:**
```
String length = 13
Character at 3rd position = k
Substring = eks
Concatenated string = GeeksforGeeks
Index of Share 6
Changing to lower Case geekyme
Changing to UPPER Case GEEKYME
Trim the word Learn Share Learn
Original String feeksforfeeks
Replaced f with g -> geeksgorgeeks
```

---

### Summary
- Strings are immutable in Java.
- They can be created using string literals or the `new` keyword.
- Java provides multiple constructors for creating strings from different data types.
- The String class has several useful methods for manipulation, comparison, and transformation of strings.


//  sting Buffer
### StringBuffer Class in Java

#### Introduction
StringBuffer is a class in Java that represents a mutable sequence of characters. Unlike the immutable String class, StringBuffer allows modification of its contents without creating new objects.

### Features of StringBuffer
- **Mutable:** StringBuffer objects can be modified without creating new objects.
- **Capacity Management:** Initial capacity can be specified during creation or adjusted using `ensureCapacity()`.
- **Thread-Safe:** StringBuffer is synchronized, making it thread-safe.
- **Dynamic Growth:** The buffer grows automatically to accommodate new characters.

### Constructors of StringBuffer Class
| Constructor | Description |
|------------|-------------|
| `StringBuffer()` | Creates a buffer with an initial capacity of 16 characters. |
| `StringBuffer(int size)` | Creates a buffer with the specified size. |
| `StringBuffer(String str)` | Creates a buffer initialized with the given string and reserves 16 extra characters. |

### Methods of Java StringBuffer Class
| Method | Description |
|--------|-------------|
| `append(String str)` | Appends the specified string to the buffer. |
| `insert(int index, String str)` | Inserts a string at the specified index. |
| `replace(int start, int end, String str)` | Replaces characters from start to end with the specified string. |
| `delete(int start, int end)` | Deletes characters from start to end. |
| `reverse()` | Reverses the character sequence in the buffer. |
| `capacity()` | Returns the current capacity of the buffer. |
| `length()` | Returns the length of the buffer. |
| `charAt(int index)` | Returns the character at the specified index. |
| `setCharAt(int index, char ch)` | Sets the character at the specified index. |
| `substring(int start, int end)` | Returns a substring of the buffer. |

### Example Programs
#### Example 1: `append()` Method
```java
public class StringBufferExample {
    public static void main(String[] args) {
        StringBuffer sb = new StringBuffer("Hello ");
        sb.append("Java");
        System.out.println(sb);
    }
}
```
**Output:**
```
Hello Java
```

#### Example 2: `insert()` Method
```java
public class InsertExample {
    public static void main(String[] args) {
        StringBuffer sb = new StringBuffer("Hello ");
        sb.insert(1, "Java");
        System.out.println(sb);
    }
}
```
**Output:**
```
HJavaello
```

#### Example 3: `reverse()` Method
```java
public class ReverseExample {
    public static void main(String[] args) {
        StringBuffer sb = new StringBuffer("Hello");
        sb.reverse();
        System.out.println(sb);
    }
}
```
**Output:**
```
olleH
```

### Differences Between `String`, `StringBuffer`, and `StringBuilder`
| Feature | String | StringBuffer | StringBuilder |
|---------|--------|-------------|--------------|
| Mutability | Immutable | Mutable | Mutable |
| Performance | Slow | Moderate | Fast |
| Thread-Safe | Yes | Yes | No |

### Conclusion
StringBuffer is useful for handling mutable strings efficiently in Java, especially in multi-threaded environments. For single-threaded applications, `StringBuilder` is preferred due to its better performance.

// String Builder

**Java StringBuilder Class - Notes**

**Introduction:**

- The `StringBuilder` class in Java is a part of the `java.lang` package.
- It provides a mutable sequence of characters.
- Unlike `String` (which is immutable), `StringBuilder` allows in-place modifications, making it more memory-efficient and faster for frequent string operations.

**Declaration:**

```java
StringBuilder sb = new StringBuilder("Initial String");
```

**Key Features:**

- Represents a mutable sequence of characters.
- Similar functionality to `StringBuffer`, but without synchronization.
- Faster than `StringBuffer` due to the lack of thread-safety mechanisms.
- Should not be used in multi-threaded environments (use `StringBuffer` instead).

**Example Usage:**

```java
public class StrBuilderClass {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("GeeksforGeeks");
        System.out.println("Initial StringBuilder: " + sb);
        
        sb.append(" is awesome!");
        System.out.println("After append: " + sb);
        
        sb.insert(13, " Java");
        System.out.println("After insert: " + sb);
        
        sb.replace(0, 5, "Welcome to");
        System.out.println("After replace: " + sb);
        
        sb.delete(8, 14);
        System.out.println("After delete: " + sb);
        
        sb.reverse();
        System.out.println("After reverse: " + sb);
    }
}
```

**StringBuilder vs String vs StringBuffer:**

| Feature     | String        | StringBuilder                 | StringBuffer                    |
| ----------- | ------------- | ----------------------------- | ------------------------------- |
| Mutability  | Immutable     | Mutable                       | Mutable                         |
| Thread-Safe | Yes           | No                            | Yes                             |
| Performance | Slow          | Fast                          | Slower (due to synchronization) |
| Use Case    | Fixed strings | Single-threaded modifications | Multi-threaded modifications    |

**Constructors:**

| Constructor                      | Description                                                                 |
| -------------------------------- | --------------------------------------------------------------------------- |
| `StringBuilder()`                | Creates an empty `StringBuilder` with a default capacity of 16.             |
| `StringBuilder(int capacity)`    | Creates a `StringBuilder` with the specified initial capacity.              |
| `StringBuilder(String str)`      | Creates a `StringBuilder` initialized with the given string.                |
| `StringBuilder(CharSequence cs)` | Creates a `StringBuilder` initialized with the given `CharSequence` object. |

**Common Methods:**

| Method                                    | Description                                |
| ----------------------------------------- | ------------------------------------------ |
| `append(String str)`                      | Appends the specified string.              |
| `insert(int offset, String str)`          | Inserts a string at a specific position.   |
| `replace(int start, int end, String str)` | Replaces characters in a substring.        |
| `delete(int start, int end)`              | Removes characters from a specified range. |
| `reverse()`                               | Reverses the sequence of characters.       |
| `capacity()`                              | Returns the current capacity.              |
| `length()`                                | Returns the length of the string.          |
| `charAt(int index)`                       | Returns the character at a given index.    |
| `setCharAt(int index, char c)`            | Sets a character at a specific index.      |
| `substring(int start, int end)`           | Returns a substring.                       |
| `toString()`                              | Converts `StringBuilder` to `String`.      |

**Advantages:**

- Faster than `String` for modifications.
- Memory-efficient as it avoids unnecessary object creation.
- Allows modification without creating new instances.
- Dynamically adjusts capacity as needed.

**Disadvantages:**

- Not thread-safe, requiring manual synchronization.
- Can use excess memory if not initialized properly.

**Best Practices:**

- Initialize with a sufficient capacity to avoid frequent resizing.
- Use `append()` instead of `+` for concatenation.
- Use `delete()` and `deleteCharAt()` for efficient character removal.

**FAQs:**

- **When should I use **``**?**
  - When frequent string modifications are needed in a single-threaded environment.
- **Is **``** thread-safe?**
  - No, use `StringBuffer` in multi-threaded environments.
- **What’s the default capacity of **``**?**
  - 16 characters.
- **How do I convert a **``** to a **``**?**
  - Use `toString()`. Example: `String result = sb.toString();`

//
**Java StringBuilder Class - Notes**

**Introduction:**

- The `StringBuilder` class in Java is a part of the `java.lang` package.
- It provides a mutable sequence of characters.
- Unlike `String` (which is immutable), `StringBuilder` allows in-place modifications, making it more memory-efficient and faster for frequent string operations.

**Declaration:**

```java
StringBuilder sb = new StringBuilder("Initial String");
```

**Key Features:**

- Represents a mutable sequence of characters.
- Similar functionality to `StringBuffer`, but without synchronization.
- Faster than `StringBuffer` due to the lack of thread-safety mechanisms.
- Should not be used in multi-threaded environments (use `StringBuffer` instead).

**Example Usage:**

```java
public class StrBuilderClass {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("GeeksforGeeks");
        System.out.println("Initial StringBuilder: " + sb);
        
        sb.append(" is awesome!");
        System.out.println("After append: " + sb);
        
        sb.insert(13, " Java");
        System.out.println("After insert: " + sb);
        
        sb.replace(0, 5, "Welcome to");
        System.out.println("After replace: " + sb);
        
        sb.delete(8, 14);
        System.out.println("After delete: " + sb);
        
        sb.reverse();
        System.out.println("After reverse: " + sb);
    }
}
```

**StringBuilder vs String vs StringBuffer:**

| Feature     | String        | StringBuilder                 | StringBuffer                    |
| ----------- | ------------- | ----------------------------- | ------------------------------- |
| Mutability  | Immutable     | Mutable                       | Mutable                         |
| Thread-Safe | Yes           | No                            | Yes                             |
| Performance | Slow          | Fast                          | Slower (due to synchronization) |
| Use Case    | Fixed strings | Single-threaded modifications | Multi-threaded modifications    |

**Constructors:**

| Constructor                      | Description                                                                 |
| -------------------------------- | --------------------------------------------------------------------------- |
| `StringBuilder()`                | Creates an empty `StringBuilder` with a default capacity of 16.             |
| `StringBuilder(int capacity)`    | Creates a `StringBuilder` with the specified initial capacity.              |
| `StringBuilder(String str)`      | Creates a `StringBuilder` initialized with the given string.                |
| `StringBuilder(CharSequence cs)` | Creates a `StringBuilder` initialized with the given `CharSequence` object. |

**Common Methods:**

| Method                                    | Description                                |
| ----------------------------------------- | ------------------------------------------ |
| `append(String str)`                      | Appends the specified string.              |
| `insert(int offset, String str)`          | Inserts a string at a specific position.   |
| `replace(int start, int end, String str)` | Replaces characters in a substring.        |
| `delete(int start, int end)`              | Removes characters from a specified range. |
| `reverse()`                               | Reverses the sequence of characters.       |
| `capacity()`                              | Returns the current capacity.              |
| `length()`                                | Returns the length of the string.          |
| `charAt(int index)`                       | Returns the character at a given index.    |
| `setCharAt(int index, char c)`            | Sets a character at a specific index.      |
| `substring(int start, int end)`           | Returns a substring.                       |
| `toString()`                              | Converts `StringBuilder` to `String`.      |

**Advantages:**

- Faster than `String` for modifications.
- Memory-efficient as it avoids unnecessary object creation.
- Allows modification without creating new instances.
- Dynamically adjusts capacity as needed.

**Disadvantages:**

- Not thread-safe, requiring manual synchronization.
- Can use excess memory if not initialized properly.

**Best Practices:**

- Initialize with a sufficient capacity to avoid frequent resizing.
- Use `append()` instead of `+` for concatenation.
- Use `delete()` and `deleteCharAt()` for efficient character removal.

**FAQs:**

- **When should I use **``**?**
  - When frequent string modifications are needed in a single-threaded environment.
- **Is **``** thread-safe?**
  - No, use `StringBuffer` in multi-threaded environments.
- **What’s the default capacity of **``**?**
  - 16 characters.
- **How do I convert a **``** to a **``**?**
  - Use `toString()`. Example: `String result = sb.toString();`


//

**Java String vs StringBuilder vs StringBuffer - Notes**

**Introduction:**
- A `String` is a sequence of characters in Java.
- Java provides three classes for handling strings: `String`, `StringBuilder`, and `StringBuffer`.
- The main differences among them are:
  - `String`: Immutable and thread-safe but less memory-efficient.
  - `StringBuilder`: Mutable, not thread-safe, and more efficient for single-threaded applications.
  - `StringBuffer`: Mutable, thread-safe (synchronized), but less efficient than `StringBuilder`.

**Comparison Table:**

| Feature     | String       | StringBuilder    | StringBuffer     |
|------------|-------------|------------------|-----------------|
| Introduced | JDK 1.0     | JDK 1.5          | JDK 1.0         |
| Mutability | Immutable   | Mutable          | Mutable        |
| Thread-Safe | Yes        | No               | Yes            |
| Memory Efficiency | High  | Efficient        | Less Efficient |
| Performance | High (No Sync) | High (No Sync) | Low (Due to Sync) |
| Usage | Used when immutability is needed | Used in single-threaded environments | Used in multi-threaded environments |

**Example: Understanding Differences**
```java
class StringComparison {
    public static void concat1(String s1) {
        s1 = s1 + "forgeeks";
    }

    public static void concat2(StringBuilder s2) {
        s2.append("forgeeks");
    }

    public static void concat3(StringBuffer s3) {
        s3.append("forgeeks");
    }

    public static void main(String[] args) {
        String s1 = "Geeks";
        concat1(s1);
        System.out.println("String: " + s1);

        StringBuilder s2 = new StringBuilder("Geeks");
        concat2(s2);
        System.out.println("StringBuilder: " + s2);

        StringBuffer s3 = new StringBuffer("Geeks");
        concat3(s3);
        System.out.println("StringBuffer: " + s3);
    }
}
```
**Output:**
```
String: Geeks
StringBuilder: Geeksforgeeks
StringBuffer: Geeksforgeeks
```

**Key Takeaways:**
- `String` objects are immutable, so changes create new instances.
- `StringBuilder` is more memory-efficient for frequent modifications.
- `StringBuffer` is synchronized, making it suitable for multi-threaded applications.

**Conversion Between String Types:**

1. **From `String` to `StringBuffer` and `StringBuilder`:**
```java
String s = "Geeks";
StringBuffer sbf = new StringBuffer(s);
StringBuilder sbl = new StringBuilder(s);
```

2. **From `StringBuffer` and `StringBuilder` to `String`:**
```java
StringBuffer sbf = new StringBuffer("Geeks");
StringBuilder sbl = new StringBuilder("Hello");
String s1 = sbf.toString();
String s2 = sbl.toString();
```

3. **From `StringBuffer` to `StringBuilder` (or vice versa):**
```java
StringBuffer sbf = new StringBuffer("Geek");
String s = sbf.toString();
StringBuilder sbl = new StringBuilder(s);
System.out.println(sbl);
```
**Output:**
```
Geek
```

**Conclusion:**
- Use `String` when immutability is required.
- Use `StringBuilder` for efficient modifications in a single-threaded environment.
- Use `StringBuffer` when working with multiple threads to ensure thread safety.

//

https://www.geeksforgeeks.org/tag/java-string-programs/



