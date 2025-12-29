---
sidebar_position: 1
---

# Character Class in Java

## Introduction

Java provides a wrapper class **Character** in the `java.lang` package.
An object of type `Character` contains a single field whose type is `char`.

The `Character` class provides several useful static methods to work with characters.

---

## Creating a Character Object

```java
Character ch = new Character('a');
```

This creates a `Character` object containing `'a'`.

> The `Character` class is immutable, just like `String`.

---

## Autoboxing & Unboxing

If a primitive `char` is passed where a `Character` object is expected, Java automatically converts it (Autoboxing).
The reverse process is called Unboxing.

---

## Methods in Character Class

### 1. isLetter(char ch)

```java
System.out.println(Character.isLetter('A')); // true
System.out.println(Character.isLetter('0')); // false
```

### 2. isDigit(char ch)

```java
System.out.println(Character.isDigit('A')); // false
System.out.println(Character.isDigit('9')); // true
```

### 3. isWhitespace(char ch)

```java
System.out.println(Character.isWhitespace(' '));  // true
System.out.println(Character.isWhitespace('\t')); // true
System.out.println(Character.isWhitespace('A'));  // false
```

### 4. isUpperCase(char ch)

```java
System.out.println(Character.isUpperCase('A')); // true
System.out.println(Character.isUpperCase('a')); // false
```

### 5. isLowerCase(char ch)

```java
System.out.println(Character.isLowerCase('a')); // true
System.out.println(Character.isLowerCase('A')); // false
```

### 6. toUpperCase(char ch)

```java
System.out.println(Character.toUpperCase('a')); // A
```

### 7. toLowerCase(char ch)

```java
System.out.println(Character.toLowerCase('A')); // a
```

### 8. toString(char ch)

```java
System.out.println(Character.toString('x')); // "x"
```

### 9. isLetterOrDigit(char ch)

```java
System.out.println(Character.isLetterOrDigit('A')); // true
System.out.println(Character.isLetterOrDigit('1')); // true
System.out.println(Character.isLetterOrDigit('@')); // false
```

### 10. isJavaIdentifierStart(char ch)

```java
System.out.println(Character.isJavaIdentifierStart('A')); // true
System.out.println(Character.isJavaIdentifierStart('1')); // false
```

### 11. isJavaIdentifierPart(char ch)

```java
System.out.println(Character.isJavaIdentifierPart('A')); // true
System.out.println(Character.isJavaIdentifierPart('1')); // true
System.out.println(Character.isJavaIdentifierPart('@')); // false
```

### 12. isDefined(char ch)

```java
System.out.println(Character.isDefined('A'));      // true
System.out.println(Character.isDefined('\uFFFF')); // false
```

### 13. getType(char ch)

```java
System.out.println(Character.getType('A')); // 1 (UPPERCASE_LETTER)
```

### 14. getNumericValue(char ch)

```java
System.out.println(Character.getNumericValue('5')); // 5
System.out.println(Character.getNumericValue('A')); // 10
```

### 15. reverseBytes(char ch)

```java
System.out.println(Character.reverseBytes('A'));
```

---

## Escape Sequences

| Escape | Description |
|--------|-------------|
| \t | Tab |
| \b | Backspace |
| \n | New line |
| \r | Carriage return |
| \f | Form feed |
| \' | Single quote |
| \" | Double quote |
| \\ | Backslash |

---

### Example

```java
System.out.println("She said \"Hello!\" to me.");
```

Output:
She said "Hello!" to me.