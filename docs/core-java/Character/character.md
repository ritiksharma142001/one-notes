---
sidebar_position: 1
---

# Character Class in Java

## Introduction
Java provides a wrapper class `Character` in the `java.lang` package. An object of type `Character` contains a single field whose type is `char`. The `Character` class offers various useful static methods for manipulating characters.

## Creating a Character Object
```java
Character ch = new Character('a');
```
This creates a `Character` object containing 'a'. The class is immutable like `String`.

## Autoboxing & Unboxing
If we pass a primitive `char` into a method expecting an object, Java automatically converts it to a `Character` object. This feature is called **Autoboxing**. The reverse process is called **Unboxing**.

---

## Methods in Character Class

### 1. `isLetter(char ch)`
Checks if the given character is a letter.
```java
System.out.println(Character.isLetter('A')); // true
System.out.println(Character.isLetter('0')); // false
```

### 2. `isDigit(char ch)`
Checks if the given character is a digit.
```java
System.out.println(Character.isDigit('A')); // false
System.out.println(Character.isDigit('9')); // true
```

### 3. `isWhitespace(char ch)`
Checks if the given character is a whitespace.
```java
System.out.println(Character.isWhitespace(' ')); // true
System.out.println(Character.isWhitespace('\t')); // true
System.out.println(Character.isWhitespace('A')); // false
```

### 4. `isUpperCase(char ch)`
Checks if the given character is an uppercase letter.
```java
System.out.println(Character.isUpperCase('A')); // true
System.out.println(Character.isUpperCase('a')); // false
```

### 5. `isLowerCase(char ch)`
Checks if the given character is a lowercase letter.
```java
System.out.println(Character.isLowerCase('a')); // true
System.out.println(Character.isLowerCase('A')); // false
```

### 6. `toUpperCase(char ch)`
Converts the given character to uppercase.
```java
System.out.println(Character.toUpperCase('a')); // A
```

### 7. `toLowerCase(char ch)`
Converts the given character to lowercase.
```java
System.out.println(Character.toLowerCase('A')); // a
```

### 8. `toString(char ch)`
Converts the given character to a String.
```java
System.out.println(Character.toString('x')); // "x"
```

### 9. `isLetterOrDigit(char ch)`
Checks if the character is a letter or digit.
```java
System.out.println(Character.isLetterOrDigit('A')); // true
System.out.println(Character.isLetterOrDigit('1')); // true
System.out.println(Character.isLetterOrDigit('@')); // false
```

### 10. `isJavaIdentifierStart(char ch)`
Checks if the character is a valid start for a Java identifier.
```java
System.out.println(Character.isJavaIdentifierStart('A')); // true
System.out.println(Character.isJavaIdentifierStart('1')); // false
```

### 11. `isJavaIdentifierPart(char ch)`
Checks if the character is valid within a Java identifier (not the first character).
```java
System.out.println(Character.isJavaIdentifierPart('A')); // true
System.out.println(Character.isJavaIdentifierPart('1')); // true
System.out.println(Character.isJavaIdentifierPart('@')); // false
```

### 12. `isDefined(char ch)`
Checks if the character is a defined Unicode character.
```java
System.out.println(Character.isDefined('A')); // true
System.out.println(Character.isDefined('\uFFFF')); // false
```

### 13. `getType(char ch)`
Returns the general category of the character as defined by Unicode.
```java
System.out.println(Character.getType('A')); // 1 (UPPERCASE_LETTER)
```

### 14. `getNumericValue(char ch)`
Returns the numeric value of a character (e.g., digit characters).
```java
System.out.println(Character.getNumericValue('5')); // 5
System.out.println(Character.getNumericValue('A')); // 10
```

### 15. `reverseBytes(char ch)`
Reverses the bytes of a character.
```java
System.out.println(Character.reverseBytes('A')); 
```

---

## Escape Sequences
Escape sequences in Java use a backslash (`\`).

| Escape Sequence | Description |
|----------------|-------------|
| `\t` | Inserts a tab |
| `\b` | Inserts a backspace |
| `\n` | Inserts a newline |
| `\r` | Inserts a carriage return |
| `\f` | Inserts a form feed |
| `\'` | Inserts a single quote |
| `\"` | Inserts a double quote |
| `\\` | Inserts a backslash |

### Example:
```java
System.out.println("She said \"Hello!\" to me.");
```
**Output:**
```
She said "Hello!" to me.
```

---

This document provides an overview of the `Character` class and its key methods with examples.

