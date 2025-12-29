---
sidebar_position: 1
---

# Exception Handling in Java

An **exception** is an event that occurs during the execution of a program, which disrupts the normal flow of instructions. When an exception occurs, the program terminates abruptly unless it is properly handled.

### Key Points about Exceptions in Java:
1. **Exception as an Object**: In Java, exceptions are treated as objects.
2. **Default Exception Handler**: When an exception is not handled, the Java runtime system provides a default exception handler that prints the exception details and terminates the program.
3. **User-Defined Exception Handler**: When an exception is handled using a `try-catch` block, the program does not terminate abruptly. Instead, execution continues after handling the exception.
4. **Finally Block Execution**: The `finally` block always executes, regardless of whether an exception occurs or not.
5. **Repetition of Try-Catch**: The `try` block and `catch` block will execute only when an exception is generated.

### Syntax for Try-Catch-Finally Block:
```java
try {
    // Code that may throw an exception
} catch (ExceptionType e) {
    // Code to handle the exception
} finally {
    // Code that will execute regardless of exception occurrence
}
```

### Notes on Try-Catch-Finally Block:
- The `try` block contains the code that might throw an exception.
- The `catch` block contains the code to handle the exception.
- The `finally` block is always executed, ensuring cleanup activities like closing resources.
- If no exception occurs, the `catch` block is skipped, but the `finally` block still runs.

### Program Without Exception Handling:
```java
import java.util.Scanner;

public class WithoutExceptionHandling {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter value for a: ");
        int a = scanner.nextInt();
        System.out.print("Enter value for b: ");
        int b = scanner.nextInt();
        
        int c = a / b; // May cause ArithmeticException if b is 0
        System.out.println("Result: " + c);
        
        scanner.close();
    }
}
```

### Example Program with Exception Handling:
```java
import java.util.Scanner;

public class ExceptionHandlingExample {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        try {
            System.out.print("Enter value for a: ");
            int a = scanner.nextInt();
            System.out.print("Enter value for b: ");
            int b = scanner.nextInt();
            
            int c = a / b; // May cause ArithmeticException if b is 0
            System.out.println("Result: " + c);
        } catch (Exception e) {
            System.out.println("Exception: Division by zero is not allowed.");
        } finally {
            scanner.close();
            System.out.println("Program execution completed.");
        }
    }
}
```

### Explanation:
- The `try` block contains code that might generate an exception.
- If an exception occurs (like division by zero), the `catch` block handles it.
- The `finally` block ensures that resources are released properly.

### Summary:
Exception handling is crucial for writing robust Java programs. By handling exceptions using `try-catch-finally`, `throw`, and `throws`, developers can prevent abrupt program termination and ensure smooth execution.



**Exception Handling in Java**

An **exception** is an event that occurs during the execution of a program, which disrupts the normal flow of instructions. When an exception occurs, the program terminates abruptly unless it is properly handled.

### Key Points about Exceptions in Java:
1. **Exception as an Object**: In Java, exceptions are treated as objects.
2. **Default Exception Handler**: When an exception is not handled, the Java runtime system provides a default exception handler that prints the exception details and terminates the program.
3. **User-Defined Exception Handler**: When an exception is handled using a `try-catch` block, the program does not terminate abruptly. Instead, execution continues after handling the exception.
4. **Finally Block Execution**: The `finally` block always executes, regardless of whether an exception occurs or not.
5. **Repetition of Try-Catch**: The `try` block and `catch` block will execute only when an exception is generated.
6. **Using Multiple Catch Blocks**: It is a good practice to use multiple specific `catch` blocks along with a generic `catch` block at the end to handle any unforeseen exceptions.

### Syntax for Try-Catch-Finally Block with Multiple Catch Blocks:
```java
try {
    // Code that may throw an exception
} catch (ArithmeticException e) {
    // Handle arithmetic exception
} catch (NegativeArraySizeException e) {
    // Handle negative array size exception
} catch (IndexOutOfBoundsException e) {
    // Handle index out of bounds exception
} catch (Exception e) {
    // Generic catch block to handle any other exceptions
} finally {
    // Code that will execute regardless of exception occurrence
}
```

### Example Program with Multiple Catch Blocks:
```java
import java.util.Scanner;

public class MultipleCatchExample {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        try {
            System.out.print("Enter value for a: ");
            int a = scanner.nextInt();
            System.out.print("Enter value for b: ");
            int b = scanner.nextInt();
            
            int c = a / b; // May cause ArithmeticException
            System.out.println("Result: " + c);
            
            int[] arr = new int[a]; // May cause NegativeArraySizeException
            arr[a + 1] = 10; // May cause IndexOutOfBoundsException
            
        } catch (ArithmeticException e) {
            System.out.println("Exception: Division by zero is not allowed.");
        } catch (NegativeArraySizeException e) {
            System.out.println("Exception: Array size cannot be negative.");
        } catch (IndexOutOfBoundsException e) {
            System.out.println("Exception: Array index is out of bounds.");
        } catch (Exception e) {
            System.out.println("General Exception: An unexpected error occurred.");
        } finally {
            scanner.close();
            System.out.println("Program execution completed.");
        }
    }
}
```

### Explanation:
- The `try` block contains code that might generate different types of exceptions.
- Multiple `catch` blocks handle specific exceptions:
  - `ArithmeticException`: Handles division by zero.
  - `NegativeArraySizeException`: Handles negative array sizes.
  - `IndexOutOfBoundsException`: Handles invalid array index access.
  - A generic `Exception` block catches any other unexpected exceptions.
- The `finally` block ensures that resources are released properly.

### Summary:
Using multiple `catch` blocks allows for specific exception handling, making debugging easier. The generic `catch` block at the end ensures that any unhandled exceptions do not crash the program unexpectedly. This approach enhances the robustness of Java applications.

**Exception Handling in Multiple Methods**

When an exception occurs in a method, the runtime system checks if the user-defined exception handler is present in the same method where the exception has been generated. If a user-defined exception handler is present, the exception object will be handled. Otherwise, it will be passed to the caller method. If the caller method also lacks an appropriate exception handler, the default exception handler will manage it, leading to abrupt termination of the program.

**Using `throw` and `throws` Keywords:**
- The `throw` keyword is used to explicitly throw an exception to the caller method after handling it.
- It can also be used when a method does not want to handle an exception and delegates the responsibility to the caller method.
- The `throws` keyword is used with the method declaration and serves as a way for a method to inform its caller about the possible exceptions that might be thrown.

### Example:

```java
class ExceptionExample {
    // Method that throws an exception
    static void methodA() throws ArithmeticException {
        throw new ArithmeticException("Exception thrown in methodA");
    }
    
    // Method that calls methodA and handles the exception
    static void methodB() {
        try {
            methodA(); // Calling methodA, which throws an exception
        } catch (ArithmeticException e) {
            System.out.println("Exception handled in methodB: " + e.getMessage());
            throw e; // Rethrowing exception to the caller method
        }
    }
    
    public static void main(String[] args) {
        try {
            methodB(); // Calling methodB, which rethrows the exception
        } catch (ArithmeticException e) {
            System.out.println("Exception handled in main method: " + e.getMessage());
        }
    }
}
```

### Explanation:
1. `methodA` throws an `ArithmeticException` using the `throw` keyword.
2. `methodB` calls `methodA` and catches the exception but rethrows it.
3. The `main` method calls `methodB` and ultimately handles the exception.
4. If `main` didn't handle the exception, the default exception handler would terminate the program.

This demonstrates how exceptions can propagate through multiple methods using `throw` and `throws` while ensuring they are properly handled.



**Understanding Exception Ducking and Exception Handling in Java**

### **What is Exception Ducking?**
Exception ducking refers to passing an exception from one method to another without handling it in the current method. This is achieved using the `throws` keyword in Java. The exception is handled at a higher level in the call stack.

### **Example: Tax Calculation with Exception Ducking**
```java
class TaxCalculator {
    static double calculateTax(double income) throws ArithmeticException {
        if (income < 0) {
            throw new ArithmeticException("Income cannot be negative!");
        }
        return income * 0.1; // 10% tax
    }

    public static void main(String[] args) {
        try {
            System.out.println("Tax: " + calculateTax(-5000)); // This will cause an exception
        } catch (ArithmeticException e) {
            System.out.println("Exception Caught: " + e.getMessage());
        }
    }
}
```
**Explanation:**
- The `calculateTax()` method throws an exception if the income is negative.
- The exception is ducked to the `main()` method, where it is caught and handled.

---

### **Java Program to Calculate Area of Circle, Rectangle, and Triangle**
The following Java program calculates the area of different shapes while handling exceptions for invalid inputs.

```java
import java.util.Scanner;

class AreaCalculator {
    static double circleArea(double radius) throws ArithmeticException {
        if (radius < 0) {
            throw new ArithmeticException("Radius cannot be negative!");
        }
        return Math.PI * radius * radius;
    }

    static double rectangleArea(double length, double width) {
        if (length < 0 || width < 0) {
            throw new ArithmeticException("Length and width cannot be negative!");
        }
        return length * width;
    }

    static double triangleArea(double base, double height) {
        if (base < 0 || height < 0) {
            throw new ArithmeticException("Base and height cannot be negative!");
        }
        return 0.5 * base * height;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        try {
            // Circle
            System.out.print("Enter radius of circle: ");
            double radius = scanner.nextDouble();
            System.out.println("Area of Circle: " + circleArea(radius));

            // Rectangle
            System.out.print("Enter length of rectangle: ");
            double length = scanner.nextDouble();
            System.out.print("Enter width of rectangle: ");
            double width = scanner.nextDouble();
            System.out.println("Area of Rectangle: " + rectangleArea(length, width));

            // Triangle
            System.out.print("Enter base of triangle: ");
            double base = scanner.nextDouble();
            System.out.print("Enter height of triangle: ");
            double height = scanner.nextDouble();
            System.out.println("Area of Triangle: " + triangleArea(base, height));

        } catch (ArithmeticException e) {
            System.out.println("Exception Caught: " + e.getMessage());
        } finally {
            scanner.close();
        }
    }
}
```

### **Notes on Exception Handling in Java**
1. **Exception Handling:** Mechanism to handle runtime errors like invalid input, file not found, division by zero, etc.
2. **Ducking an Exception:** When a method does not handle an exception but instead passes it to the calling method using `throws`.
3. **Try-Catch Block:** Used to catch and handle exceptions.
4. **Finally Block:** Used to execute code after try-catch, whether an exception occurs or not.
5. **Custom Exceptions:** Developers can define their own exception classes for specific error cases.

**Checked and Unchecked Exceptions in Java**

### 1. **Exception Hierarchy**
   - In Java, all exceptions are derived from the `Throwable` class.
   - `Throwable` has two direct subclasses:
     - `Exception`
     - `Error`
   
   ```
   Throwable
   |
   |-- Exception
   |    |-- IOException
   |    |-- SQLException
   |
   |-- Error
        |-- OutOfMemoryError
        |-- StackOverflowError
   ```

### 2. **Checked Exceptions**
   - Checked exceptions are checked at **compile-time**.
   - If a method throws a checked exception, it must be handled using a `try-catch` block or declared using `throws`.
   - Examples:
     - `IOException`
     - `SQLException`
     - `FileNotFoundException`
   
   **Example Code:**
   ```java
   import java.io.*;

   public class CheckedExceptionExample {
       public static void main(String[] args) {
           try {
               InputStreamReader isr = new InputStreamReader(System.in);
               BufferedReader br = new BufferedReader(isr);
               String message = br.readLine();
               System.out.println("Message: " + message);
           } catch (IOException e) {
               System.out.println("IOException handled: " + e.getMessage());
           }
       }
   }
   ```

### 3. **Unchecked Exceptions**
   - Unchecked exceptions are **not checked** at compile-time.
   - These occur due to programming errors and do not require mandatory handling.
   - Examples:
     - `NullPointerException`
     - `ArrayIndexOutOfBoundsException`
     - `ArithmeticException`
   
   **Example Code:**
   ```java
   public class UncheckedExceptionExample {
       public static void main(String[] args) {
           int[] arr = new int[5];
           System.out.println(arr[10]); // Throws ArrayIndexOutOfBoundsException
       }
   }
   ```

### 4. **Key Differences**
| Feature            | Checked Exception         | Unchecked Exception      |
|--------------------|-------------------------|--------------------------|
| Checked at Compile-time | Yes                     | No                        |
| Handling Required  | Mandatory                | Optional                  |
| Examples          | IOException, SQLException | NullPointerException, ArithmeticException |

### 5. **Conclusion**
- Checked exceptions enforce error handling and improve program robustness.
- Unchecked exceptions indicate runtime errors that should be avoided through proper logic.
- Proper handling of both types of exceptions is essential for writing reliable Java applications.


## Custom Exception

```
class InsufficientBalanceException extends Exception {
    public InsufficientBalanceException() {
        super("Balance is insufficient");
    }
}

public class BankAccount {
    public static void withdrawAmount(int balance, int amount) throws InsufficientBalanceException {
        if (amount > balance) {
            throw new InsufficientBalanceException();
        } else {
            System.out.println("Withdrawal successful. Remaining balance: " + (balance - amount));
        }
    }

    public static void main(String[] args) {
        int balance = 2000;
        int amount;
        
        try {
            amount = 2500; // Example amount greater than balance to trigger exception
            withdrawAmount(balance, amount);
        } catch (InsufficientBalanceException e) {
            System.out.println("Exception: " + e.getMessage());
            e.printStackTrace();
            System.out.println("Catch block executed");
        }
    }
}


**Notes on Samadhi Rules and Exception Handling**

### Parent and Child Class Exception Handling Rules with Examples:

#### Rule 1: If a parent class method throws an exception, the child class method can:
   - Throw the same exception.
   - Throw a subclass of the parent exception.
   - Not throw any exception at all.

**Example:**
```java
class Parent {
    void display() throws ArithmeticException {
        System.out.println("Parent method throwing ArithmeticException");
        throw new ArithmeticException("Exception in Parent");
    }
}

class Child extends Parent {
    @Override
    void display() throws ArithmeticException {
        System.out.println("Child method throwing the same exception");
        throw new ArithmeticException("Exception in Child");
    }
}

public class Test {
    public static void main(String[] args) {
        Parent p = new Child();
        try {
            p.display();
        } catch (ArithmeticException e) {
            System.out.println("Caught Exception: " + e.getMessage());
        }
    }
}
```

---

#### Rule 2: If a parent class method does not throw an exception, the child class method cannot throw a checked exception.

**Example:**
```java
class Parent {
    void show() {
        System.out.println("Parent method with no exception");
    }
}

class Child extends Parent {
    // This will cause a compilation error if uncommented
    // @Override
    // void show() throws IOException { 
    //     System.out.println("Child method attempting to throw checked exception");
    // }
}

public class Test2 {
    public static void main(String[] args) {
        Parent p = new Child();
        p.show();
    }
}
```

---

#### Rule 3: If the parent class method throws an unchecked exception (RuntimeException), the child class method can:
   - Throw the same unchecked exception.
   - Throw a subclass of the unchecked exception.
   - Not throw any exception.

**Example:**
```java
class Parent {
    void process() throws NullPointerException {
        System.out.println("Parent method throwing NullPointerException");
        throw new NullPointerException("Null pointer in Parent");
    }
}

class Child extends Parent {
    @Override
    void process() throws RuntimeException { // Allowed to throw RuntimeException
        System.out.println("Child method throwing RuntimeException");
        throw new RuntimeException("Runtime exception in Child");
    }
}

public class Test3 {
    public static void main(String[] args) {
        Parent p = new Child();
        try {
            p.process();
        } catch (RuntimeException e) {
            System.out.println("Caught Exception: " + e.getMessage());
        }
    }
}
```

---

### ATM PIN Exception Handling Example with Nested Try-Catch:
- If a user enters the wrong PIN three times, an exception is generated, and the card is blocked.
- Uses a custom exception class for handling incorrect PIN entries.

**Example:**
```java
class IncorrectPinException extends RuntimeException {
    public IncorrectPinException(String message) {
        super(message);
    }
}

class ATM {
    private final String correctPin = "1234";
    private int attempts = 0;

    void enterPin(String pin) {
        try {
            if (pin.equals(correctPin)) {
                System.out.println("Access Granted!");
                attempts = 0; // Reset attempts after successful entry
            } else {
                try {
                    attempts++;
                    if (attempts >= 3) {
                        throw new IncorrectPinException("Card is Blocked! Too many incorrect attempts.");
                    } else {
                        throw new IncorrectPinException("Incorrect PIN. Try again.");
                    }
                } catch (IncorrectPinException e) {
                    System.out.println(e.getMessage());
                }
            }
        } catch (Exception ex) {
            System.out.println("An unexpected error occurred: " + ex.getMessage());
        }
    }
}

public class ATMTest {
    public static void main(String[] args) {
        ATM atm = new ATM();
        try {
            atm.enterPin("1111"); // Wrong PIN
            atm.enterPin("2222"); // Wrong PIN
            atm.enterPin("3333"); // Third wrong attempt
            atm.enterPin("1234"); // Correct PIN after being blocked (won't execute)
        } catch (Exception e) {
            System.out.println("Unhandled Exception: " + e.getMessage());
        }
    }
}
```

### Key Takeaways:
- A parent class method throwing an exception affects child class exception handling.
- A child class cannot throw new checked exceptions if the parent method does not declare them.
- Unchecked exceptions (RuntimeExceptions) follow different rules.
- The ATM example demonstrates real-world exception handling with custom exceptions.
- Nested try-catch blocks handle exceptions gracefully, ensuring proper error handling and preventing program crashes.


