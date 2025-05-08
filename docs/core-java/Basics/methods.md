---
sidebar_position: 4
---

# Methods

### Basic Method Structure

```java
returnType methodName(parameters) {
    // method body or definition
}
```

* **returnType**: Output of the method
* **parameters**: Inputs to the method
* **methodName**: Identifier used to call the method
* **method body**: Set of instructions that perform a specific task

---

### What is a Method?

A method is a **set of instructions** written together to perform a **specific task**.

It helps in:

* Reusability
* Code organization
* Logical grouping of operations

---

### Elements of a Method

Every method consists of **4 main elements**:

| Element        | Description                               |
| -------------- | ----------------------------------------- |
| 1. Method Name | Name used to call the method              |
| 2. Return Type | Type of value the method returns          |
| 3. Parameters  | Inputs required by the method (optional)  |
| 4. Activity    | The body (code) that defines the behavior |

---

### Types of Methods (Based on Return Type and Parameters)

| Type | Return Type | Parameters | Description                                              |
| ---- | ----------- | ---------- | -------------------------------------------------------- |
| 1.   | No          | No         | Method does not take input and does not return any value |
| 2.   | No          | Yes        | Method takes input but does not return any value         |
| 3.   | Yes         | No         | Method does not take input but returns a value           |
| 4.   | Yes         | Yes        | Method takes input and returns a value                   |

### Examples:

```java
// 1. No return, No parameter
tvoid greet() {
    System.out.println("Hello");
}

// 2. No return, With parameter
void greetUser(String name) {
    System.out.println("Hello " + name);
}

// 3. With return, No parameter
int getNumber() {
    return 10;
}

// 4. With return, With parameter
int add(int a, int b) {
    return a + b;
}
```

---

### Example

```java
int add(int a, int b) {
    return a + b;
}
```

* **Method Name**: `add`
* **Return Type**: `int`
* **Parameters**: `int a`, `int b`
* **Activity**: `return a + b;`

---

### Tip

If a method **does not return anything**, use `void` as the return type.

```java
void greet() {
    System.out.println("Hello!");
}
```

---

Feel free to use these notes for documentation, learning, or class assignments!


