---
sidebar_position: 1
---

### **String Handling in Java**  

#### **1. String Basics**  
- Strings in Java are immutable, meaning once created, they cannot be changed.  
- `concat()` method is used to join two strings, but it does not modify the original string.  

```java
String s1 = "Java";
System.out.println(s1);
System.out.println(s1.concat(" is a programming language."));
System.out.println(s1);
```

#### **2. Comparing Strings**  
- `==` compares object references (whether they point to the same memory location).  
- `equals()` compares the actual content of the strings.  
- `equalsIgnoreCase()` compares content while ignoring case differences.  

```java
String s2 = "Java";
String s3 = "Java";
String s4 = new String("java");
if(s4 == s3){
    System.out.println("s1 and s2 are the same object in memory.");
}else{
    System.out.println("s1 and s2 are different objects in memory.");
}
System.out.println(s3.equals(s4));
```

#### **3. Creating Strings**  
- String literals are stored in the **String Pool** to optimize memory.  
- `new String("text")` creates a new object in the heap, even if the same string exists in the pool.  

#### **4. Using `compareTo()` Method**  
- Used to compare strings lexicographically.  
- Returns:
  - `> 0` if the first string is greater  
  - `< 0` if the first string is smaller  
  - `0` if both are equal  

```java
String s5 = "SACHIN";
String s6 = "SAURAV";
int res = s5.compareTo(s6);
if(res > 0){
    System.out.println(s5 + " is greater than " + s6);
}else if(res < 0){
    System.out.println(s5 + " is less than " + s6);
}else{
    System.out.println(s5 + " is equal to " + s6);
}
```

#### **5. Converting Between Character Arrays and Strings**  
- `toCharArray()` converts a string into a character array.  
- A character array can be converted back into a string using `new String(charArray)`.  

```java
char[] ch1 = {'r', 'i', 't', 'i', 'k'};
String s7 = new String(ch1); // converting char array to string
System.out.println(s7);
```

#### **6. String Interning (`intern()`)**  
- `intern()` moves a dynamically created string into the **String Pool**, allowing it to be referenced like a string literal.  

```java
String s8 = new String("richa");
String s9 = s8.intern(); // converts the string to a string literal
String s10 = "richa"; // string literal
if(s9 == s10){
    System.out.println("s8 and s10 are the same object in memory.");
}else{
    System.out.println("s8 and s10 are different objects in memory.");
}
```

#### **7. String Concatenation and Immutability**  
- Modifying a string using `concat()` does not change the original string but creates a new one.  

```java
String s1 = "knowledge";
String s2 = s1; // s2 points to the same "knowledge"
s1 = s1.concat(" base"); // Creates a new String "knowledge base"
System.out.println(s1);
System.out.println(s2); // s2 still points to "knowledge"
```

#### **8. Null Concatenation Issue**  
- Concatenating a `null` value using `concat()` will cause a `NullPointerException`.  

```java
String s1 = "knowledge base";
String s2 = s1.concat(null); // Throws NullPointerException
System.out.println(s2);
```

**Java String Methods with Examples**

---

### **1. length()**
- Returns the number of characters in the string.
```java
String str = "Hello";
System.out.println(str.length()); // Output: 5
```

### **2. charAt(int i)**
- Returns the character at index `i`.
```java
System.out.println(str.charAt(1)); // Output: 'e'
```

### **3. substring(int i)**
- Returns substring from index `i` to end.
```java
System.out.println(str.substring(2)); // Output: "llo"
```

### **4. concat(String str)**
- Concatenates the specified string to the end.
```java
System.out.println(str.concat(" World")); // Output: "Hello World"
```

### **5. indexOf(String s)**
- Returns the index of the first occurrence of `s`.
```java
System.out.println(str.indexOf("l")); // Output: 2
```

### **6. equals(String anotherString)**
- Checks if two strings are equal.
```java
System.out.println(str.equals("Hello")); // Output: true
```

### **7. equalsIgnoreCase(String anotherString)**
- Compares strings ignoring case.
```java
System.out.println(str.equalsIgnoreCase("hello")); // Output: true
```

### **8. toLowerCase()**
- Converts all characters to lowercase.
```java
System.out.println(str.toLowerCase()); // Output: "hello"
```

### **9. toUpperCase()**
- Converts all characters to uppercase.
```java
System.out.println(str.toUpperCase()); // Output: "HELLO"
```

### **10. trim()**
- Removes whitespace from both ends.
```java
String str2 = "  Hello  ";
System.out.println(str2.trim()); // Output: "Hello"
```

### **11. replace(char oldChar, char newChar)**
- Replaces occurrences of `oldChar` with `newChar`.
```java
System.out.println(str.replace('l', 'p')); // Output: "Heppo"
```

### **12. replaceAll(String regex, String replacement)**
- Replaces all occurrences matching the regex.
```java
System.out.println(str.replaceAll("l", "X")); // Output: "HeXXo"
```

### **13. startsWith(String prefix)**
- Checks if string starts with `prefix`.
```java
System.out.println(str.startsWith("He")); // Output: true
```

### **14. endsWith(String suffix)**
- Checks if string ends with `suffix`.
```java
System.out.println(str.endsWith("lo")); // Output: true
```

### **15. lastIndexOf(char ch)**
- Returns the last occurrence index of `ch`.
```java
System.out.println(str.lastIndexOf('l')); // Output: 3
```

### **16. contains(String s)**
- Checks if string contains `s`.
```java
System.out.println(str.contains("ell")); // Output: true
```

---

## **Java StringBuffer Class**

### **1. StringBuffer()**
- Creates a buffer with an initial capacity of 16 characters.
```java
StringBuffer sb = new StringBuffer();
System.out.println(sb.capacity()); // Output: 16
```

### **2. StringBuffer(int size)**
- Creates a buffer with the specified size.
```java
StringBuffer sb = new StringBuffer(30);
System.out.println(sb.capacity()); // Output: 30
```

### **3. StringBuffer(String str)**
- Creates a buffer initialized with the given string and reserves 16 extra characters.
```java
StringBuffer sb = new StringBuffer("Hello");
System.out.println(sb.capacity()); // Output: 21
```

### **Methods of Java StringBuffer Class**

### **4. append(String str)**
- Appends the specified string to the buffer.
```java
sb.append(" World");
System.out.println(sb); // Output: "Hello World"
```

### **5. insert(int index, String str)**
- Inserts a string at the specified index.
```java
sb.insert(5, " Java");
System.out.println(sb); // Output: "Hello Java World"
```

### **6. replace(int start, int end, String str)**
- Replaces characters from `start` to `end` with `str`.
```java
sb.replace(6, 10, "C++");
System.out.println(sb); // Output: "Hello C++ World"
```

### **7. delete(int start, int end)**
- Deletes characters from `start` to `end`.
```java
sb.delete(6, 10);
System.out.println(sb); // Output: "Hello World"
```

### **8. reverse()**
- Reverses the character sequence in the buffer.
```java
sb.reverse();
System.out.println(sb); // Output: "dlroW olleH"
```

---

## **Java StringBuilder Class**

### **1. Constructors**
```java
StringBuilder sb1 = new StringBuilder(); // Default capacity 16
StringBuilder sb2 = new StringBuilder(50); // Custom capacity 50
StringBuilder sb3 = new StringBuilder("Hello"); // Initialized with "Hello"
StringBuilder sb4 = new StringBuilder(new StringBuffer("Buffer")); // From StringBuffer
```

### **2. Common Methods**

### **append(String str)**
- Appends the specified string.
```java
sb1.append(" World");
System.out.println(sb1); // Output: " World"
```

### **insert(int offset, String str)**
- Inserts a string at a specific position.
```java
sb1.insert(0, "Hello");
System.out.println(sb1); // Output: "Hello World"
```

### **replace(int start, int end, String str)**
- Replaces characters in a substring.
```java
sb1.replace(6, 11, "Java");
System.out.println(sb1); // Output: "Hello Java"
```

### **delete(int start, int end)**
- Removes characters from a specified range.
```java
sb1.delete(5, 10);
System.out.println(sb1); // Output: "Hello"
```

### **reverse()**
- Reverses the sequence of characters.
```java
sb1.reverse();
System.out.println(sb1); // Output: "olleH"
```

### **capacity()**
- Returns the current capacity.
```java
System.out.println(sb1.capacity());
```

### **length()**
- Returns the length of the string.
```java
System.out.println(sb1.length());
```

### **charAt(int index)**
- Returns the character at a given index.
```java
System.out.println(sb1.charAt(1));
```

### **setCharAt(int index, char c)**
- Sets a character at a specific index.
```java
sb1.setCharAt(0, 'M');
System.out.println(sb1);
```

### **substring(int start, int end)**
- Returns a substring.
```java
System.out.println(sb1.substring(1, 4));
```

### **toString()**
- Converts `StringBuilder` to a `String`.
```java
String strConverted = sb1.toString();
```

---

This covers `String`, `StringBuffer`, and `StringBuilder` methods with examples in Java. 🚀


```
public class Main {
    public static void main(String[] args) {
        StringBuffer sb = new StringBuffer();
        System.out.println(sb.capacity()); // Default capacity is 16
        sb.ensureCapacity(24);
        System.out.println(sb.capacity()); // 24
        // new capacity = old capacity * 2 + 2

        sb.append("Hello");
        System.out.println(sb.capacity()); // 16

        sb.append(" is a programming language");
        System.out.println(sb.capacity()); // 34 (16 + 16 + 2 = 34)

        // new capacity = old capacity * 2 + 2

        System.out.println(sb);
        System.out.println(sb.capacity()); // 34


        StringBuffer sb2 = new StringBuffer();
        System.out.println(sb2.capacity()); // Default capacity is 16
        sb2.ensureCapacity(100);

        System.out.println(sb2.capacity()); // 100


        StringBuilder sb3 = new StringBuilder(100);
        System.out.println(sb3.capacity()); // 100


        StringBuilder sb4 = new StringBuilder("Hello");
        System.out.println(sb4.capacity()); // 21 (16 + 5 = 21)

    }
}
```
