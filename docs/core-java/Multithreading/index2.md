---
sidebar_position: 2
---

# 🧵 Java Multithreading Notes

## ✅ What is Multithreading?
Multithreading is the process of creating multiple **threads** to execute a Java program **concurrently**.

A **thread** is the smallest unit of execution. In Java, you can create multiple threads that run independently or in coordination with each other.

## ⚙️ Advantages of Multithreading
- Faster execution of the program
- Efficient CPU utilization
- Handles multiple tasks simultaneously
- Good for responsive applications (like GUI)

## 💤 `Thread.sleep(3000)`
- This makes the current thread **sleep for 3 seconds** (3000 milliseconds).
- It is a **checked exception**, meaning you must handle it using `try-catch`.

```java
try {
    Thread.sleep(3000);
} catch (InterruptedException e) {
    e.printStackTrace();
}
```

## ⚠️ Exception
If an exception occurs during runtime and the program can't handle it, it is passed to the **JVM** (Java Virtual Machine), which may stop the program.

## 👨‍💻 Program: Single-threaded Input and Sum
This is an example of a **single-threaded** program where all code executes in a single flow:

```java
import java.util.Scanner;

public class SumProgram {
    public static void main(String[] args) {
        try {
            Scanner sc = new Scanner(System.in);
            System.out.print("Enter A: ");
            int a = sc.nextInt();
            System.out.print("Enter B: ");
            int b = sc.nextInt();

            int sum = a + b;
            System.out.println("Sum: " + sum);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

## 🧠 Single-threaded vs Multi-threaded Programs

### 🚶 Single-threaded:
- All statements run in sequence.
- One activity at a time.

### 🏃🏃 Multi-threaded:
- Multiple tasks run in parallel.
- Example: One thread handles addition, another handles printing, independently.

### Example scenario:
If your program does addition **and** printing (and they are independent), then these can be done using **two threads**.

---

> Multithreading improves performance when your program has independent activities that can run in parallel.

Would you like examples of Java code that creates two threads for addition and printing?


**Java Multithreading - Express Note**

Multithreading in Java allows multiple threads to run concurrently, helping to achieve better CPU utilization and faster program execution.

---

**Thread Creation in Java:**
When an object of the `Thread` class is created, it represents a separate thread of execution. This object can be created in two main ways:

1. **By Extending the Thread Class**
   - Create a class that extends `Thread`.
   - Override the `run()` method.
   - Create an object of your class and call `start()` to begin execution.

   ```java
   class MyThread extends Thread {
       public void run() {
           System.out.println("Thread is running");
       }
   }

   public class Main {
       public static void main(String[] args) {
           MyThread t1 = new MyThread();
           t1.start();
       }
   }
   ```

2. **By Implementing the Runnable Interface**
   - Create a class that implements `Runnable`.
   - Implement the `run()` method.
   - Pass an object of your class to a `Thread` object and call `start()`.

   ```java
   class MyRunnable implements Runnable {
       public void run() {
           System.out.println("Thread is running");
       }
   }

   public class Main {
       public static void main(String[] args) {
           Runnable r = new MyRunnable();
           Thread t1 = new Thread(r);
           t1.start();
       }
   }
   ```

---

**Main Thread & Thread Scheduling:**
- When a Java application starts, the JVM creates a main thread, often referred to as `mainThread`.
- New threads can be scheduled and executed independently of the main thread.
- The JVM uses a thread scheduler to determine the order of thread execution, which is not guaranteed and may vary.

---

**Summary:**
- **Main Stack:** Main thread runs in this stack.
- **Express Track (Thread Object):** When a thread object is created and `start()` is called, the `run()` method is executed in a separate call stack.
- **Two Approaches:**
  - Extending `Thread`
  - Implementing `Runnable`

Both are used to achieve multithreading in Java, providing a structure for concurrent program execution.

![image](https://github.com/user-attachments/assets/1768fc84-7847-4c95-acba-bdc7c1873b64)


**Java Multithreading - Express Note**

Multithreading in Java allows multiple threads to run concurrently, helping to achieve better CPU utilization and faster program execution.

---

**Thread Creation in Java:**
When an object of the `Thread` class is created, it represents a separate thread of execution. This object can be created in two main ways:

1. **By Extending the Thread Class**
   - Create a class that extends `Thread`.
   - Override the `run()` method.
   - Create an object of your class and call `start()` to begin execution.

   ```java
   class MyThread extends Thread {
       public void run() {
           System.out.println("Thread is running");
       }
   }

   public class Main {
       public static void main(String[] args) {
           MyThread t1 = new MyThread();
           t1.start();
       }
   }
   ```

   **Example: Multithreading using Thread class**
   ```java
   class Addition extends Thread {
       @Override
       public void run() {
           System.out.println("Addition started");
           int a = 10, b = 20;
           int sum = a + b;
           try {
               Thread.sleep(300);
           } catch (Exception e) {
               e.printStackTrace();
           }
           System.out.println("Sum: " + sum);
           System.out.println("Addition completed");
       }
   }

   class Printing extends Thread {
       @Override
       public void run() {
           for (int i = 1; i <= 5; i++) {
               System.out.println("Hi");
               try {
                   Thread.sleep(300);
               } catch (Exception e) {
                   e.printStackTrace();
               }
           }
       }
   }

   public class MainThreadExample {
       public static void main(String[] args) {
           Addition t1 = new Addition();
           Printing t2 = new Printing();

           t1.start();
           t2.start();
       }
   }
   ```

2. **By Implementing the Runnable Interface**
   - Create a class that implements `Runnable`.
   - Implement the `run()` method.
   - Create objects and assign tasks to threads.

   ```java
   // Implementing Runnable interface
   class Addition implements Runnable {
       public void run() {
           System.out.println("Addition task running");
       }
   }

   class Printing implements Runnable {
       public void run() {
           System.out.println("Printing task running");
       }
   }

   public class Main {
       public static void main(String[] args) {
           // Creating task objects
           Addition addTask = new Addition();
           Printing printTask = new Printing();

           // Assigning tasks to thread objects
           Thread t1 = new Thread(addTask);
           Thread t2 = new Thread(printTask);

           // Starting threads
           t1.start();
           t2.start();
       }
   }
   ```

---

**Main Thread & Thread Scheduling:**
- When a Java application starts, the JVM creates a main thread, often referred to as `mainThread`.
- New threads can be scheduled and executed independently of the main thread.
- The JVM uses a thread scheduler to determine the order of thread execution, which is not guaranteed and may vary.

---

**Summary:**
- **Main Stack:** Main thread runs in this stack.
- **Express Track (Thread Object):** When a thread object is created and `start()` is called, the `run()` method is executed in a separate call stack.
- **Two Approaches:**
  - Extending `Thread`
  - Implementing `Runnable`

Both are used to achieve multithreading in Java, providing a structure for concurrent program execution.

```
// Using Thread class to print multiplication table
class MultiplicationThread extends Thread {
    int number;

    MultiplicationThread(int number) {
        this.number = number;
    }

    public void run() {
        for (int i = 1; i <= 10; i++) {
            System.out.println("Table: " + number + " x " + i + " = " + (number * i));
            try {
                Thread.sleep(100); // Sleep to simulate concurrent output
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

// Custom exception for demonstration
class UserCorruptionException extends Exception {
    public UserCorruptionException(String message) {
        super(message);
    }
}

// Using Runnable interface to print 12 characters starting from 'A'
class CharacterPrinter implements Runnable {
    public void run() {
        char ch = 'A';
        for (int i = 0; i < 12; i++) {
            try {
                if (ch + i > 'Z') {
                    throw new UserCorruptionException("Character limit exceeded valid alphabet range.");
                }
                System.out.println("Char: " + (char)(ch + i));
                Thread.sleep(100); // Sleep to simulate concurrent output
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (UserCorruptionException e) {
                System.out.println("UserCorruptionException caught: " + e.getMessage());
            }
        }
    }
}

// Main class to run both threads
public class ThreadRunnableDemo {
    public static void main(String[] args) {
        MultiplicationThread t1 = new MultiplicationThread(5); // Multiplication table of 5
        Thread t2 = new Thread(new CharacterPrinter());

        t1.start();
        t2.start();
    }
}

```

