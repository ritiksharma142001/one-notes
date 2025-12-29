---
sidebar_position: 1
---

# Java Constructors and Important Concepts

---

## **1. Default and Parameterized Constructors**

### **Definition**
A constructor is a special method in Java that is automatically called when an object is created. It initializes the object's properties.

- **Default Constructor**: A constructor without parameters.
- **Parameterized Constructor**: A constructor that takes arguments to initialize an object with specific values.

```java
class Object {
    Object() {
        System.out.println("Object Default constructor called");
    }
    Object(int a, int b) {
        System.out.println("Object Parameterized constructor called with a: " + a + " b: " + b);
    }
}
class Student extends Object {
    Student() {
        super(20, 30); // Calls parameterized constructor of Object class
        System.out.println("Student Default constructor called");
    }
}
public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
    }
}
```

**Output:**

```
Object Parameterized constructor called with a: 20 b: 30
Student Default constructor called
```

---

## **2. `this` Keyword Example**

### **Definition**
- `this` keyword refers to the current instance of the class.
- It is used to differentiate between instance variables and parameters.

```java
class Program1 {
    int a = 10; // Instance variable in Program1

    void disp() {
        System.out.println("Program1 a: " + a);
    }
}

class Program2 extends Program1 {
    int a = 20; // Instance variable in Program2

    void disp() {
        System.out.println("Program2 a: " + a);
        System.out.println("Using super.a to access Program1's a: " + super.a);
    }
}

public class Main {
    public static void main(String[] args) {
        Program2 obj = new Program2();
        obj.disp();
    }
}
```

**Output:**

```
Program2 a: 20
Using super.a to access Program1's a: 10
```

---

## **3. `super` Keyword Example**

### **Definition**
- `super` is used to refer to the immediate parent class.
- It helps in accessing parent class variables and methods.

```java
class Program1 {
    int a = 10; // Instance variable in Program1

    void disp() {
        System.out.println("Program1 a: " + a);
    }
}

class Program2 extends Program1 {
    int a = 20; // Instance variable in Program2

    void disp() {
        System.out.println("Program2 a: " + a);
        System.out.println("Using super.a to access Program1's a: " + super.a);
    }
}

public class Main {
    public static void main(String[] args) {
        Program2 obj = new Program2();
        obj.disp();
    }
}
```

**Output:**

```
Program2 a: 20
Using super.a to access Program1's a: 10
```

---

## **4. Copy Constructor**

### **Definition**
A copy constructor is used to create a new object by copying values from an existing object.

```java
class Student {
    String name;
    int age;

    // Normal Constructor
    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Copy Constructor
    Student(Student s) {
        this.name = s.name;
        this.age = s.age;
    }

    void display() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Alice", 20); // Original object
        Student s2 = new Student(s1);          // Copy object using copy constructor

        s1.display();
        s2.display();
    }
}
```

**Output:**

```
Name: Alice, Age: 20
Name: Alice, Age: 20
```

---

## **5. Private Constructor & Singleton Pattern**

### **Definition**
- A **private constructor** prevents the creation of multiple instances of a class.
- Used in **Singleton Pattern**, where only one instance of the class exists.

```java
class Singleton {
    private static Singleton instance; // Single instance

    // Private Constructor
    private Singleton() {
        System.out.println("Private Constructor Called");
    }

    // Static method to get the only instance
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}

public class Main {
    public static void main(String[] args) {
        Singleton obj1 = Singleton.getInstance(); // ✅ Allowed
        Singleton obj2 = Singleton.getInstance();

        System.out.println(obj1 == obj2); // Output: true (Both are the same instance)
    }
}
```

**Output:**

```
Private Constructor Called
true
```

---

## **6. Constructor Chaining**

### **Definition**
- Constructor chaining allows one constructor to call another constructor in the same or parent class.

```java
class A {
    A() {
        System.out.println("Constructor A called");
    }
}

class B extends A {
    B() {
        super(); // Calls parent class constructor
        System.out.println("Constructor B called");
    }
}

public class Main {
    public static void main(String[] args) {
        B obj = new B();
    }
}
```

**Output:**

```
Constructor A called
Constructor B called
```

---

## **7. Anonymous Object**

```java
class Student {
    void study() {
        System.out.println("Student is studying.");
    }
}

public class Main {
    public static void main(String[] args) {
        new Student().study(); // Anonymous object
    }
}
```

**Output:**

```
Student is studying.
```

---

## **8. Actual vs Formal Parameters**

```java
public class Main {
    static void add(int a, int b) { // Formal parameters
        System.out.println("Sum is: " + (a + b));
    }
    public static void main(String[] args) {
        add(10, 20); // Actual parameters
    }
}
```

**Output:**

```
Sum is: 30
```

------------------------------------------------------------------------------------------------


# Method Overloading and Compile-Time Polymorphism in Java

## **1. Parameters vs Arguments**
- **Parameters** are variables that accept inputs for a method and are defined in the method declaration.
- **Arguments** are the actual values or variables passed when calling the method.

### **Example:**
```java
public class Example {
    // Method with parameters
    static void greet(String name) {
        System.out.println("Hello, " + name);
    }
    
    public static void main(String[] args) {
        // Passing arguments
        greet("Alice");
        greet("Bob");
    }
}
```
**Output:**
```
Hello, Alice
Hello, Bob
```

---

## **2. Method Overloading**
Method Overloading is the process of defining multiple methods with the same name within the same class but with different parameters.

### **Rules for Method Overloading:**
1. Methods must have the **same name**.
2. Methods must have **different parameters**.
3. Methods cannot be duplicated (same name, same parameters, and same order of parameters).

### **How Java Resolves Method Overloading:**
1. By checking the **number of parameters**.
2. By checking the **data types of parameters**.
3. By checking the **order of parameters**.

### **Example:**
```java
class OverloadExample {
    // Method with one integer parameter
    void display(int a) {
        System.out.println("Integer: " + a);
    }
    
    // Method with one double parameter
    void display(double a) {
        System.out.println("Double: " + a);
    }
    
    // Method with two parameters
    void display(int a, int b) {
        System.out.println("Two integers: " + a + ", " + b);
    }
}

public class Main {
    public static void main(String[] args) {
        OverloadExample obj = new OverloadExample();
        obj.display(10);
        obj.display(5.5);
        obj.display(10, 20);
    }
}
```
**Output:**
```
Integer: 10
Double: 5.5
Two integers: 10, 20
```

### **What is NOT Allowed in Method Overloading?**
Duplicate methods are **not allowed**. If two methods have:
- The same name
- The same number of parameters
- The same data types and order of parameters

Then they are considered duplicate methods, which causes a **compilation error**.

### **Example of Invalid Method Overloading:**
```java
class InvalidOverloading {
    void show(int a) {}
    void show(int b) {} // Compilation Error: Duplicate method
}
```

---

## **3. Compile-Time Polymorphism (Static/Method Overloading Polymorphism)**
Polymorphism means "many forms". **Compile-time polymorphism** (also known as **static polymorphism**) happens when a method is selected at compile time based on the method signature.

### **Example:**
```java
class PolymorphismExample {
    void add(int a, int b) {
        System.out.println("Sum: " + (a + b));
    }
    void add(double a, double b) {
        System.out.println("Sum: " + (a + b));
    }
}

public class Main {
    public static void main(String[] args) {
        PolymorphismExample obj = new PolymorphismExample();
        obj.add(5, 10);
        obj.add(2.5, 3.5);
    }
}
```
**Output:**
```
Sum: 15
Sum: 6.0
```

### **Key Points About Compile-Time Polymorphism:**
✔ Method Overloading is an example of Compile-Time Polymorphism.
✔ The method to be called is decided at **compile-time** based on the method signature.
✔ It improves code readability and usability.

---

## **Conclusion**
- **Method Overloading** allows multiple methods with the same name but different parameters within a class.
- **Java resolves overloading** by checking the number, type, and order of parameters.
- **Compile-time polymorphism** (static polymorphism) occurs when the method to be executed is determined at compile time.
- **Duplicate methods are not allowed** as they cause a compilation error.

This ensures **flexibility, readability, and better code maintainability** in Java programs. 🚀


## **Questions**
1. What is a constructor in Java?
2. What are the key features of a constructor?
3. How are constructors different from Java methods?
4. Why do we need constructors in Java?
5. When is a Java constructor called?
6. What are the types of constructors in Java?
7. Can a Java constructor be private?
8. What is constructor overloading?
9. What happens if no constructor is defined in a Java class?
10. Can constructors be final or static in Java?
11. Can constructors throw exceptions in Java?


