---
format: md
---

# Low-Level Design (LLD) Patterns - Complete Guide

> **For Java Interview Preparation** - Master these 26 fundamental design patterns
>
> **Note**: Patterns marked with **(Interview Imp - Java)** are frequently asked in Java interviews
>
> **How to use this file:** This is the **quick overview** of all 26 LLD patterns on one page (short explanation + Java code for each). For the full treatment of each pattern (what, why, how it works, variants, Spring examples, pros and cons, pitfalls, interview questions, cheat sheets and 📘 Terms Explained tables), use the detailed guides:
> - [02_Creational_Pattern.md](02_Creational_Pattern.md): Singleton, Factory Method, Abstract Factory, Builder, Prototype
> - [03_Structural_Pattern.md](03_Structural_Pattern.md): Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy
> - [04_Behavioral_Pattern.md](04_Behavioral_Pattern.md): Chain of Responsibility, Command, Interpreter, Iterator, Mediator, Memento, Observer, State, Strategy, Template Method, Visitor
> - Null Object, Object Pool and Lazy Initialization: Section 4 below; Object Pool in depth in [10_Game_Development_Pattern.md](../04_Specialized/10_Game_Development_Pattern.md#4-object-pool-interview-imp---java), lazy loading in [03_Performance_Pattern.md](../03_System_Design/03_Performance_Pattern.md#7-lazy-loading-and-prefetching-interview-imp---java)
> - The list of every pattern in this wiki: [00_Design_Patterns_Complete_List.md](../00_Design_Patterns_Complete_List.md)

---

## **Table of Contents**
1. [Understanding LLD Pattern Categories](#understanding-lld-pattern-categories)
2. [Creational Patterns](#1-creational-patterns-5-patterns)
3. [Structural Patterns](#2-structural-patterns-7-patterns)
4. [Behavioral Patterns](#3-behavioral-patterns-11-patterns)
5. [Additional LLD Patterns](#4-additional-lld-patterns-3-patterns)
6. [Quick Reference Guide](#quick-reference-guide)

---

# **Understanding LLD Pattern Categories**

## **What are the 3 Main Categories?**

### **1. Creational Patterns** 🏗️
**Purpose**: Deal with **object creation mechanisms**

**Key Question**: *"HOW do we create objects?"*

**Focus**:
- Creating objects in a manner suitable to the situation
- Making the system independent of how objects are created, composed, and represented
- Hiding the creation logic
- Controlling the instantiation process

**When to Use**:
- When you need to control object creation
- When direct object creation causes design problems
- When you need flexibility in what gets created

**Analogy**: Think of a **factory assembly line** - you don't build a car yourself; you use a factory that knows how to build it properly.

---

### **2. Structural Patterns** 🏛️
**Purpose**: Deal with **object composition and relationships**

**Key Question**: *"HOW do objects relate to each other?"*

**Focus**:
- How classes and objects are composed to form larger structures
- Simplifying relationships between entities
- Making the structure flexible and efficient
- Building complex structures from simple components

**When to Use**:
- When you need to compose objects into larger structures
- When you want to simplify relationships between classes
- When you need to add functionality without changing existing code

**Analogy**: Think of **building with LEGO blocks** - you combine simple pieces in different ways to create complex structures.

---

### **3. Behavioral Patterns** 🔄
**Purpose**: Deal with **object collaboration and responsibility**

**Key Question**: *"HOW do objects communicate and interact?"*

**Focus**:
- Communication between objects
- How objects distribute responsibility
- Algorithms and assignment of responsibilities
- Patterns of communication between objects

**When to Use**:
- When you need to define how objects interact
- When you want to distribute responsibilities
- When you need flexible communication between objects

**Analogy**: Think of a **restaurant workflow** - waiters, chefs, and managers all have different responsibilities and communicate in specific ways.

---

## **Quick Comparison Table**

| Category | Focuses On | Answers | Example Scenario |
|----------|-----------|---------|------------------|
| **Creational** | Object Creation | "How to create?" | Building different types of database connections |
| **Structural** | Object Relationships | "How to compose?" | Adapting old payment API to work with new system |
| **Behavioral** | Object Interaction | "How to communicate?" | Notifying multiple users when a new post is created |

---

## **Visual Summary**

```
CREATIONAL (Creating Objects)
    ↓
    Creates instances
    ↓
STRUCTURAL (Organizing Objects)
    ↓
    Composes/Arranges instances
    ↓
BEHAVIORAL (Coordinating Objects)
    ↓
    Manages communication between instances
```

---

# **1. Creational Patterns** (5 Patterns)

> **Purpose**: Control object creation - *HOW objects are created*

## **1.1 Singleton** ⭐ **(Interview Imp - Java)**

**Intent**: Ensure a class has only ONE instance and provide global access to it

**Problem**:
- Need exactly one instance of a class (e.g., database connection, configuration manager)
- Multiple instances would cause issues (e.g., conflicting file access, wasted resources)

**Solution**:
- Private constructor (prevent external instantiation)
- Static method to get the instance
- Lazy or eager initialization

**Real-World Scenario**:
Your application needs a **Database Connection Manager**. If multiple instances exist, you'll have:
- Multiple connection pools (waste of resources)
- Inconsistent configuration
- Connection leaks

**Java Implementation**:

### **Approach 1: Eager Initialization (Thread-Safe)**
```java
/**
 * Eager Singleton - Instance created at class loading time
 * Thread-safe but wastes memory if instance never used
 */
public class DatabaseConnection {
    // Instance created immediately when class loads
    private static final DatabaseConnection instance = new DatabaseConnection();

    // Private constructor prevents external instantiation
    private DatabaseConnection() {
        System.out.println("Database Connection Initialized");
        // Initialize database connection
    }

    // Global access point
    public static DatabaseConnection getInstance() {
        return instance;
    }

    public void executeQuery(String query) {
        System.out.println("Executing: " + query);
    }
}
```

### **Approach 2: Lazy Initialization with Double-Checked Locking (Thread-Safe)**
```java
/**
 * Lazy Singleton - Instance created only when needed
 * Thread-safe with double-checked locking
 * Best for expensive object creation
 */
public class Logger {
    // volatile ensures visibility across threads
    private static volatile Logger instance;

    private Logger() {
        System.out.println("Logger Initialized");
    }

    public static Logger getInstance() {
        if (instance == null) {  // First check (no locking)
            synchronized (Logger.class) {  // Lock only if null
                if (instance == null) {  // Second check (with lock)
                    instance = new Logger();
                }
            }
        }
        return instance;
    }

    public void log(String message) {
        System.out.println("[LOG] " + message);
    }
}
```

### **Approach 3: Bill Pugh Singleton (Best Practice - Lazy + Thread-Safe)**
```java
/**
 * Bill Pugh Singleton - Uses inner static helper class
 * Lazy initialization + Thread-safe without synchronization
 * RECOMMENDED APPROACH
 */
public class ConfigurationManager {

    private ConfigurationManager() {
        System.out.println("Configuration Manager Initialized");
    }

    // Static inner class - loaded only when getInstance() is called
    private static class SingletonHelper {
        private static final ConfigurationManager INSTANCE = new ConfigurationManager();
    }

    public static ConfigurationManager getInstance() {
        return SingletonHelper.INSTANCE;
    }

    public String getConfig(String key) {
        return "Value for " + key;
    }
}
```

### **Approach 4: Enum Singleton (Most Secure - Prevents Reflection & Serialization)**
```java
/**
 * Enum Singleton - Safest implementation
 * Automatically handles serialization and reflection attacks
 * Joshua Bloch recommended approach (Effective Java)
 */
public enum ApplicationCache {
    INSTANCE;  // The single instance

    private Map<String, Object> cache;

    // Constructor called only once
    ApplicationCache() {
        cache = new HashMap<>();
        System.out.println("Cache Initialized");
    }

    public void put(String key, Object value) {
        cache.put(key, value);
    }

    public Object get(String key) {
        return cache.get(key);
    }
}
```

### **Usage Example**:
```java
public class SingletonDemo {
    public static void main(String[] args) {
        // 1. Database Connection (Eager)
        DatabaseConnection db1 = DatabaseConnection.getInstance();
        DatabaseConnection db2 = DatabaseConnection.getInstance();
        System.out.println("db1 == db2: " + (db1 == db2));  // true - same instance
        db1.executeQuery("SELECT * FROM users");

        // 2. Logger (Lazy with Double-Checked Locking)
        Logger logger1 = Logger.getInstance();
        Logger logger2 = Logger.getInstance();
        System.out.println("logger1 == logger2: " + (logger1 == logger2));  // true
        logger1.log("Application started");

        // 3. Configuration Manager (Bill Pugh)
        ConfigurationManager config1 = ConfigurationManager.getInstance();
        ConfigurationManager config2 = ConfigurationManager.getInstance();
        System.out.println("config1 == config2: " + (config1 == config2));  // true
        System.out.println(config1.getConfig("app.name"));

        // 4. Cache (Enum)
        ApplicationCache cache1 = ApplicationCache.INSTANCE;
        ApplicationCache cache2 = ApplicationCache.INSTANCE;
        System.out.println("cache1 == cache2: " + (cache1 == cache2));  // true
        cache1.put("user1", "John Doe");
        System.out.println("User: " + cache2.get("user1"));  // Same cache
    }
}
```

**Output**:
```
Database Connection Initialized
db1 == db2: true
Executing: SELECT * FROM users
Logger Initialized
logger1 == logger2: true
[LOG] Application started
Configuration Manager Initialized
config1 == config2: true
Value for app.name
Cache Initialized
cache1 == cache2: true
User: John Doe
```

**When to Use**:
- ✅ When exactly one instance is needed
- ✅ When you need global access point
- ✅ Database connections, logging, caching, configuration

**When NOT to Use**:
- ❌ When you need multiple instances
- ❌ Makes unit testing difficult (hard to mock)
- ❌ Can hide dependencies (implicit global state)

**Key Points**:
- **Eager**: Simple but wastes memory if not used
- **Lazy + DCL**: Complex but efficient
- **Bill Pugh**: Best balance (lazy + thread-safe)
- **Enum**: Most secure (prevents reflection/serialization attacks)

**Thread Safety Comparison**:
| Approach | Thread-Safe | Lazy | Performance | Complexity |
|----------|-------------|------|-------------|------------|
| Eager | ✅ | ❌ | High | Low |
| Lazy DCL | ✅ | ✅ | Medium | High |
| Bill Pugh | ✅ | ✅ | High | Medium |
| Enum | ✅ | ❌ | High | Low |

---

## **1.2 Factory Method** ⭐ **(Interview Imp - Java)**

**Intent**: Define an interface for creating objects, but let subclasses decide which class to instantiate

**Problem**:
- Need to create objects but don't know exact class until runtime
- Want to delegate instantiation to subclasses
- Want to avoid tight coupling with concrete classes

**Real-World Scenario**:
You're building a **Notification System** that sends messages via Email, SMS, or Push notifications. The type depends on user preference, but you don't want to use `if-else` everywhere.

**Java Implementation**:

### **Step 1: Define Product Interface**
```java
/**
 * Product interface - what all notifications must implement
 */
public interface Notification {
    void send(String message);
}
```

### **Step 2: Create Concrete Products**
```java
/**
 * Concrete Product 1 - Email Notification
 */
public class EmailNotification implements Notification {
    @Override
    public void send(String message) {
        System.out.println("📧 Email sent: " + message);
        // Actual email sending logic here
    }
}

/**
 * Concrete Product 2 - SMS Notification
 */
public class SMSNotification implements Notification {
    @Override
    public void send(String message) {
        System.out.println("📱 SMS sent: " + message);
        // Actual SMS sending logic here
    }
}

/**
 * Concrete Product 3 - Push Notification
 */
public class PushNotification implements Notification {
    @Override
    public void send(String message) {
        System.out.println("🔔 Push notification sent: " + message);
        // Actual push notification logic here
    }
}
```

### **Step 3: Create Abstract Creator**
```java
/**
 * Creator - defines factory method
 */
public abstract class NotificationFactory {

    // Factory Method - subclasses will implement this
    public abstract Notification createNotification();

    // Template method that uses the factory method
    public void notifyUser(String message) {
        // Create notification using factory method
        Notification notification = createNotification();

        // Use the notification
        notification.send(message);

        // Additional common logic
        logNotification(message);
    }

    private void logNotification(String message) {
        System.out.println("✓ Logged: " + message);
    }
}
```

### **Step 4: Create Concrete Creators**
```java
/**
 * Concrete Creator 1 - Creates Email Notifications
 */
public class EmailNotificationFactory extends NotificationFactory {
    @Override
    public Notification createNotification() {
        return new EmailNotification();
    }
}

/**
 * Concrete Creator 2 - Creates SMS Notifications
 */
public class SMSNotificationFactory extends NotificationFactory {
    @Override
    public Notification createNotification() {
        return new SMSNotification();
    }
}

/**
 * Concrete Creator 3 - Creates Push Notifications
 */
public class PushNotificationFactory extends NotificationFactory {
    @Override
    public Notification createNotification() {
        return new PushNotification();
    }
}
```

### **Step 5: Client Code**
```java
public class FactoryMethodDemo {
    public static void main(String[] args) {
        // Scenario: User preferences determine notification type

        // User 1 prefers Email
        NotificationFactory factory1 = new EmailNotificationFactory();
        factory1.notifyUser("Welcome to our platform!");

        System.out.println();

        // User 2 prefers SMS
        NotificationFactory factory2 = new SMSNotificationFactory();
        factory2.notifyUser("Your order has been shipped!");

        System.out.println();

        // User 3 prefers Push
        NotificationFactory factory3 = new PushNotificationFactory();
        factory3.notifyUser("New message received!");

        System.out.println("\n--- Dynamic Factory Selection ---");

        // Based on runtime configuration
        String userPreference = "SMS"; // Could come from database
        NotificationFactory factory = getFactory(userPreference);
        factory.notifyUser("Password reset successful!");
    }

    // Helper method to get factory based on type
    private static NotificationFactory getFactory(String type) {
        switch (type.toUpperCase()) {
            case "EMAIL":
                return new EmailNotificationFactory();
            case "SMS":
                return new SMSNotificationFactory();
            case "PUSH":
                return new PushNotificationFactory();
            default:
                throw new IllegalArgumentException("Unknown notification type: " + type);
        }
    }
}
```

**Output**:
```
📧 Email sent: Welcome to our platform!
✓ Logged: Welcome to our platform!

📱 SMS sent: Your order has been shipped!
✓ Logged: Your order has been shipped!

🔔 Push notification sent: New message received!
✓ Logged: New message received!

--- Dynamic Factory Selection ---
📱 SMS sent: Password reset successful!
✓ Logged: Password reset successful!
```

### **Real-World Example 2: Document Creator**
```java
// Product
interface Document {
    void open();
    void save();
}

// Concrete Products
class WordDocument implements Document {
    public void open() { System.out.println("Opening Word document"); }
    public void save() { System.out.println("Saving Word document"); }
}

class PDFDocument implements Document {
    public void open() { System.out.println("Opening PDF document"); }
    public void save() { System.out.println("Saving PDF document"); }
}

// Creator
abstract class DocumentCreator {
    public abstract Document createDocument();

    public void processDocument() {
        Document doc = createDocument();
        doc.open();
        // Do some work
        doc.save();
    }
}

// Concrete Creators
class WordDocumentCreator extends DocumentCreator {
    public Document createDocument() {
        return new WordDocument();
    }
}

class PDFDocumentCreator extends DocumentCreator {
    public Document createDocument() {
        return new PDFDocument();
    }
}
```

**When to Use**:
- ✅ When you don't know the exact type at compile time
- ✅ When subclasses should specify the objects to create
- ✅ When you want to delegate creation logic
- ✅ When you want to provide extension points in libraries

**Benefits**:
- ✅ **Open/Closed Principle**: Open for extension, closed for modification
- ✅ **Single Responsibility**: Creation logic separated from business logic
- ✅ **Loose Coupling**: Code depends on interface, not concrete classes
- ✅ **Easy to extend**: Add new notification types without changing existing code

**Drawbacks**:
- ❌ Can lead to many subclasses
- ❌ More complex than simple object creation

**Key Points**:
- Client works with factory interface, not concrete products
- Each factory creates one specific type of product
- Adding new product type requires new factory class
- Different from Abstract Factory (which creates families of products)

---

## **1.3 Abstract Factory** ⭐ **(Interview Imp - Java)**

**Intent**: Provide an interface for creating families of related or dependent objects without specifying their concrete classes

**Problem**:
- Need to create families of related objects
- Want to ensure created objects are compatible with each other

**Solution**:
- Define abstract factory interface
- Create concrete factories for each family
- Each factory creates a complete family of related objects

**Real-World Examples**:
- UI toolkit (Windows UI family: WinButton, WinCheckbox vs Mac UI family: MacButton, MacCheckbox)
- Database factory (Oracle: OracleConnection, OracleCommand vs MySQL: MySQLConnection, MySQLCommand)
- Game character creation (Warrior family: WarriorWeapon, WarriorArmor vs Mage family: MageWeapon, MageArmor)

**When to Use**:
- ✅ When system needs to work with multiple families of related objects
- ✅ When you want to ensure products from same family are used together
- ✅ When you want to provide a library of products hiding implementation

**Difference from Factory Method**:
- **Factory Method**: Creates ONE product
- **Abstract Factory**: Creates FAMILIES of related products

---

## **1.4 Builder** ⭐ **(Interview Imp - Java)**

**Intent**: Construct complex objects step by step, allowing different representations using the same construction process

**Problem**:
- Creating complex objects with many optional parameters
- Constructor with too many parameters (telescoping constructor problem)
- Want different representations of same object

**Real-World Scenario**:
You're building a **Computer Configuration System**. A computer has many optional components:
- Required: CPU, RAM
- Optional: GPU, Storage, WiFi, Bluetooth, RGB Lighting, Water Cooling

**❌ Without Builder (Telescoping Constructor Anti-Pattern)**:
```java
public class Computer {
    // Many fields
    private String cpu;
    private String ram;
    private String gpu;
    private String storage;
    private boolean wifi;
    private boolean bluetooth;
    private boolean rgbLighting;
    private boolean waterCooling;

    // Constructor hell - too many parameters!
    public Computer(String cpu, String ram) { ... }
    public Computer(String cpu, String ram, String gpu) { ... }
    public Computer(String cpu, String ram, String gpu, String storage) { ... }
    public Computer(String cpu, String ram, String gpu, String storage, boolean wifi) { ... }
    // ... nightmare continues

    // Usage is confusing:
    Computer pc = new Computer("i9", "32GB", null, "1TB", true, false, true, false);
    //                                        ↑ What does null mean?
    //                                             ↑ What is true/false?
}
```

**✅ With Builder Pattern**:

### **Step 1: Create Product with Private Constructor**
```java
/**
 * Product class - Computer
 * Constructor is private, can only be built via Builder
 */
public class Computer {
    // All fields are final (immutable)
    private final String cpu;           // Required
    private final String ram;           // Required
    private final String gpu;           // Optional
    private final String storage;       // Optional
    private final boolean wifi;         // Optional
    private final boolean bluetooth;    // Optional
    private final boolean rgbLighting;  // Optional
    private final boolean waterCooling; // Optional

    // Private constructor - only Builder can call it
    private Computer(Builder builder) {
        this.cpu = builder.cpu;
        this.ram = builder.ram;
        this.gpu = builder.gpu;
        this.storage = builder.storage;
        this.wifi = builder.wifi;
        this.bluetooth = builder.bluetooth;
        this.rgbLighting = builder.rgbLighting;
        this.waterCooling = builder.waterCooling;
    }

    // Only getters (no setters - immutable)
    public String getCpu() { return cpu; }
    public String getRam() { return ram; }
    public String getGpu() { return gpu; }
    public String getStorage() { return storage; }
    public boolean hasWifi() { return wifi; }
    public boolean hasBluetooth() { return bluetooth; }
    public boolean hasRgbLighting() { return rgbLighting; }
    public boolean hasWaterCooling() { return waterCooling; }

    @Override
    public String toString() {
        return "Computer Configuration:\n" +
               "  CPU: " + cpu + "\n" +
               "  RAM: " + ram + "\n" +
               "  GPU: " + (gpu != null ? gpu : "Integrated") + "\n" +
               "  Storage: " + (storage != null ? storage : "None") + "\n" +
               "  WiFi: " + (wifi ? "Yes" : "No") + "\n" +
               "  Bluetooth: " + (bluetooth ? "Yes" : "No") + "\n" +
               "  RGB Lighting: " + (rgbLighting ? "Yes" : "No") + "\n" +
               "  Water Cooling: " + (waterCooling ? "Yes" : "No");
    }

    /**
     * Static nested Builder class
     */
    public static class Builder {
        // Required parameters
        private final String cpu;
        private final String ram;

        // Optional parameters - initialized with default values
        private String gpu = null;
        private String storage = null;
        private boolean wifi = false;
        private boolean bluetooth = false;
        private boolean rgbLighting = false;
        private boolean waterCooling = false;

        // Constructor with required parameters only
        public Builder(String cpu, String ram) {
            this.cpu = cpu;
            this.ram = ram;
        }

        // Setter methods for optional parameters - return 'this' for chaining
        public Builder gpu(String gpu) {
            this.gpu = gpu;
            return this;
        }

        public Builder storage(String storage) {
            this.storage = storage;
            return this;
        }

        public Builder wifi(boolean wifi) {
            this.wifi = wifi;
            return this;
        }

        public Builder bluetooth(boolean bluetooth) {
            this.bluetooth = bluetooth;
            return this;
        }

        public Builder rgbLighting(boolean rgbLighting) {
            this.rgbLighting = rgbLighting;
            return this;
        }

        public Builder waterCooling(boolean waterCooling) {
            this.waterCooling = waterCooling;
            return this;
        }

        // Build method creates the Computer instance
        public Computer build() {
            // Can add validation here
            if (cpu == null || cpu.isEmpty()) {
                throw new IllegalStateException("CPU is required");
            }
            if (ram == null || ram.isEmpty()) {
                throw new IllegalStateException("RAM is required");
            }

            return new Computer(this);
        }
    }
}
```

### **Step 2: Client Usage**
```java
public class BuilderPatternDemo {
    public static void main(String[] args) {
        System.out.println("=== Gaming PC ===");
        // Build a high-end gaming computer
        Computer gamingPC = new Computer.Builder("Intel i9-13900K", "64GB DDR5")
                .gpu("NVIDIA RTX 4090")
                .storage("2TB NVMe SSD")
                .wifi(true)
                .bluetooth(true)
                .rgbLighting(true)
                .waterCooling(true)
                .build();

        System.out.println(gamingPC);

        System.out.println("\n=== Office PC ===");
        // Build a basic office computer (minimal configuration)
        Computer officePC = new Computer.Builder("Intel i5-12400", "16GB DDR4")
                .storage("512GB SSD")
                .wifi(true)
                .build();  // Other options use default values

        System.out.println(officePC);

        System.out.println("\n=== Budget PC ===");
        // Build an ultra-budget computer
        Computer budgetPC = new Computer.Builder("AMD Ryzen 3", "8GB DDR4")
                .build();  // Absolutely minimal - no optional features

        System.out.println(budgetPC);

        // Demonstrate immutability
        System.out.println("\n=== Immutability Test ===");
        // gamingPC.setCpu("Different CPU");  // ❌ Compile error - no setters!
        System.out.println("Gaming PC is immutable - cannot be modified after creation");
    }
}
```

**Output**:
```
=== Gaming PC ===
Computer Configuration:
  CPU: Intel i9-13900K
  RAM: 64GB DDR5
  GPU: NVIDIA RTX 4090
  Storage: 2TB NVMe SSD
  WiFi: Yes
  Bluetooth: Yes
  RGB Lighting: Yes
  Water Cooling: Yes

=== Office PC ===
Computer Configuration:
  CPU: Intel i5-12400
  RAM: 16GB DDR4
  GPU: Integrated
  Storage: 512GB SSD
  WiFi: Yes
  Bluetooth: No
  RGB Lighting: No
  Water Cooling: No

=== Budget PC ===
Computer Configuration:
  CPU: AMD Ryzen 3
  RAM: 8GB DDR4
  GPU: Integrated
  Storage: None
  WiFi: No
  Bluetooth: No
  RGB Lighting: No
  Water Cooling: No

=== Immutability Test ===
Gaming PC is immutable - cannot be modified after creation
```

### **Real-World Example 2: Pizza Builder**
```java
public class Pizza {
    private final String size;        // Required
    private final String crust;       // Required
    private final boolean cheese;
    private final boolean pepperoni;
    private final boolean mushrooms;
    private final boolean onions;
    private final boolean extraCheese;

    private Pizza(Builder builder) {
        this.size = builder.size;
        this.crust = builder.crust;
        this.cheese = builder.cheese;
        this.pepperoni = builder.pepperoni;
        this.mushrooms = builder.mushrooms;
        this.onions = builder.onions;
        this.extraCheese = builder.extraCheese;
    }

    public static class Builder {
        private final String size;
        private final String crust;
        private boolean cheese = false;
        private boolean pepperoni = false;
        private boolean mushrooms = false;
        private boolean onions = false;
        private boolean extraCheese = false;

        public Builder(String size, String crust) {
            this.size = size;
            this.crust = crust;
        }

        public Builder addCheese() {
            this.cheese = true;
            return this;
        }

        public Builder addPepperoni() {
            this.pepperoni = true;
            return this;
        }

        public Builder addMushrooms() {
            this.mushrooms = true;
            return this;
        }

        public Builder addOnions() {
            this.onions = true;
            return this;
        }

        public Builder addExtraCheese() {
            this.extraCheese = true;
            return this;
        }

        public Pizza build() {
            return new Pizza(this);
        }
    }

    @Override
    public String toString() {
        return "Pizza: " + size + " with " + crust + " crust, " +
               "Toppings: " +
               (cheese ? "Cheese, " : "") +
               (pepperoni ? "Pepperoni, " : "") +
               (mushrooms ? "Mushrooms, " : "") +
               (onions ? "Onions, " : "") +
               (extraCheese ? "Extra Cheese" : "");
    }
}

// Usage:
Pizza pizza = new Pizza.Builder("Large", "Thin")
        .addCheese()
        .addPepperoni()
        .addMushrooms()
        .addExtraCheese()
        .build();
```

### **Builder with Director (Optional)**
```java
/**
 * Director class - knows how to build specific configurations
 */
public class ComputerDirector {

    public Computer buildGamingPC() {
        return new Computer.Builder("Intel i9", "64GB")
                .gpu("RTX 4090")
                .storage("2TB SSD")
                .wifi(true)
                .rgbLighting(true)
                .waterCooling(true)
                .build();
    }

    public Computer buildOfficePC() {
        return new Computer.Builder("Intel i5", "16GB")
                .storage("512GB SSD")
                .wifi(true)
                .build();
    }

    public Computer buildServerPC() {
        return new Computer.Builder("AMD EPYC", "256GB ECC")
                .storage("8TB RAID")
                .build();
    }
}

// Usage:
ComputerDirector director = new ComputerDirector();
Computer gaming = director.buildGamingPC();
Computer office = director.buildOfficePC();
```

**When to Use**:
- ✅ When object has many optional parameters (4+)
- ✅ When you want immutable objects
- ✅ When construction process must allow different representations
- ✅ To avoid telescoping constructors
- ✅ When object creation requires multiple steps

**Benefits**:
- ✅ **Readable code**: Clear what each parameter is
- ✅ **Immutability**: Objects are immutable by default
- ✅ **Flexible**: Easy to add new optional parameters
- ✅ **Validation**: Can validate in build() method
- ✅ **No constructor hell**: No need for multiple constructors

**Drawbacks**:
- ❌ More code (but worth it for complex objects)
- ❌ Not suitable for simple objects with few fields

**Key Points**:
- Builder is often a **static nested class**
- Builder constructor takes **required** parameters
- Builder methods take **optional** parameters and return `this` (for chaining)
- `build()` method creates and returns the final object
- Product is **immutable** (final fields, no setters)
- Can add **validation** in build() method

---

## **1.5 Prototype** ⭐ **(Interview Imp - Java)**

**Intent**: Create new objects by copying existing objects (cloning)

**Problem**:
- Creating objects is expensive (database calls, complex initialization)
- Want to avoid subclassing just for object creation
- Need to create objects based on existing instances

**Solution**:
- Implement a clone() method
- Create new objects by copying existing prototypes
- Can use shallow or deep copy

**Real-World Examples**:
- Copying documents with different content but same formatting
- Game object cloning (copying enemy units)
- Database record templates
- Object.clone() in Java

**When to Use**:
- ✅ When object creation is expensive
- ✅ When you need to create many similar objects
- ✅ When you want to avoid subclassing

**Key Points**:
- Beware of shallow vs deep copy issues
- In Java: implement Cloneable interface
- Consider copy constructors as alternative

---

# **2. Structural Patterns** (7 Patterns)

> **Purpose**: Organize objects and classes - *HOW objects relate and compose*

## **2.1 Adapter** ⭐ **(Interview Imp - Java)**

**Intent**: Convert the interface of a class into another interface clients expect (like a translator)

**Problem**:
- Need to use an existing class but its interface doesn't match what you need
- Want to integrate third-party libraries with incompatible interfaces
- Legacy code integration

**Solution**:
- Create an adapter class that wraps the incompatible class
- Adapter implements the expected interface
- Translates calls from new interface to old interface

**Real-World Examples**:
- Power adapter (US plug to EU socket)
- Card reader (Memory card to USB)
- Legacy payment gateway integration
- XML to JSON converter
- Third-party library wrapper

**Types**:
- **Class Adapter**: Uses inheritance (extends adaptee)
- **Object Adapter**: Uses composition (has-a adaptee)

**When to Use**:
- ✅ When you want to use existing class with incompatible interface
- ✅ When integrating third-party libraries
- ✅ When working with legacy code

---

## **2.2 Bridge** **(Interview Imp - Java)**

**Intent**: Decouple abstraction from implementation so both can vary independently

**Problem**:
- When abstraction and implementation both need to extend independently
- Avoid explosion of subclasses (e.g., RedCircle, BlueCircle, RedSquare, BlueSquare...)

**Solution**:
- Separate abstraction hierarchy from implementation hierarchy
- Use composition instead of inheritance
- Abstraction contains reference to implementation

**Real-World Examples**:
- Device (TV, Radio) + RemoteControl (Basic, Advanced)
- Shape (Circle, Square) + Color (Red, Blue)
- Database drivers (JDBC separates SQL abstraction from driver implementation)
- UI toolkit (Window abstraction + platform-specific rendering)

**When to Use**:
- ✅ When you want to avoid permanent binding between abstraction and implementation
- ✅ When both abstraction and implementation should be extensible
- ✅ To avoid class explosion from multiple dimensions of variation

**Difference from Adapter**:
- **Adapter**: Makes existing interfaces work together (after design)
- **Bridge**: Separates abstraction from implementation (during design)

---

## **2.3 Composite** ⭐ **(Interview Imp - Java)**

**Intent**: Compose objects into tree structures to represent part-whole hierarchies

**Problem**:
- Need to treat individual objects and compositions uniformly
- Want to represent hierarchies (tree structures)

**Solution**:
- Define a common interface for both simple and complex objects
- Create tree structures where leaves and composites have same interface
- Clients treat all objects uniformly

**Real-World Examples**:
- File system (files and folders)
- Organization hierarchy (employees and departments)
- UI components (panels containing buttons, which are both components)
- Graphics drawing (shapes, groups of shapes)
- Menu systems (menu items and submenus)

**When to Use**:
- ✅ When you have part-whole hierarchies
- ✅ When clients should treat individual and composite objects uniformly
- ✅ When you want to represent tree structures

**Key Points**:
- Uses recursive composition
- Makes adding new component types easier
- Can make design overly general

---

## **2.4 Decorator** ⭐ **(Interview Imp - Java)**

**Intent**: Add responsibilities to objects dynamically without modifying their structure

**Problem**:
- Need to add functionality to individual objects, not entire class
- Inheritance is too static and creates too many subclasses
- Want to add/remove responsibilities at runtime

**Real-World Scenario**:
You're building a **Coffee Shop Ordering System**. Coffee can have various add-ons:
- Base: Simple Coffee
- Add-ons: Milk, Sugar, Whipped Cream, Caramel, Vanilla

**❌ Without Decorator (Subclass Explosion)**:
```java
// This approach creates a class for every combination!
class SimpleCoffee { }
class CoffeeWithMilk { }
class CoffeeWithSugar { }
class CoffeeWithMilkAndSugar { }
class CoffeeWithMilkAndSugarAndWhippedCream { }
// ... 2^n combinations! 😱
```

**✅ With Decorator Pattern**:

### **Step 1: Define Component Interface**
```java
/**
 * Component interface - what all coffee types must implement
 */
public interface Coffee {
    String getDescription();
    double getCost();
}
```

### **Step 2: Create Concrete Component (Base Coffee)**
```java
/**
 * Concrete Component - Simple black coffee
 */
public class SimpleCoffee implements Coffee {

    @Override
    public String getDescription() {
        return "Simple Coffee";
    }

    @Override
    public double getCost() {
        return 2.00;  // Base price
    }
}
```

### **Step 3: Create Abstract Decorator**
```java
/**
 * Abstract Decorator - Base class for all decorators
 * Implements same interface and HAS-A component
 */
public abstract class CoffeeDecorator implements Coffee {
    protected Coffee decoratedCoffee;  // Component being decorated

    public CoffeeDecorator(Coffee coffee) {
        this.decoratedCoffee = coffee;
    }

    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription();
    }

    @Override
    public double getCost() {
        return decoratedCoffee.getCost();
    }
}
```

### **Step 4: Create Concrete Decorators**
```java
/**
 * Concrete Decorator 1 - Milk
 */
public class MilkDecorator extends CoffeeDecorator {

    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription() + ", Milk";
    }

    @Override
    public double getCost() {
        return decoratedCoffee.getCost() + 0.50;
    }
}

/**
 * Concrete Decorator 2 - Sugar
 */
public class SugarDecorator extends CoffeeDecorator {

    public SugarDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription() + ", Sugar";
    }

    @Override
    public double getCost() {
        return decoratedCoffee.getCost() + 0.25;
    }
}

/**
 * Concrete Decorator 3 - Whipped Cream
 */
public class WhippedCreamDecorator extends CoffeeDecorator {

    public WhippedCreamDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription() + ", Whipped Cream";
    }

    @Override
    public double getCost() {
        return decoratedCoffee.getCost() + 0.75;
    }
}

/**
 * Concrete Decorator 4 - Caramel
 */
public class CaramelDecorator extends CoffeeDecorator {

    public CaramelDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription() + ", Caramel";
    }

    @Override
    public double getCost() {
        return decoratedCoffee.getCost() + 0.60;
    }
}

/**
 * Concrete Decorator 5 - Vanilla
 */
public class VanillaDecorator extends CoffeeDecorator {

    public VanillaDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription() + ", Vanilla";
    }

    @Override
    public double getCost() {
        return decoratedCoffee.getCost() + 0.40;
    }
}
```

### **Step 5: Client Code**
```java
public class DecoratorPatternDemo {
    public static void main(String[] args) {
        System.out.println("☕ Coffee Shop - Decorator Pattern Demo\n");
        System.out.println("=".repeat(60));

        // Order 1: Simple black coffee
        Coffee coffee1 = new SimpleCoffee();
        printOrder(coffee1);

        System.out.println("=".repeat(60));

        // Order 2: Coffee with milk
        Coffee coffee2 = new SimpleCoffee();
        coffee2 = new MilkDecorator(coffee2);
        printOrder(coffee2);

        System.out.println("=".repeat(60));

        // Order 3: Coffee with milk and sugar
        Coffee coffee3 = new SimpleCoffee();
        coffee3 = new MilkDecorator(coffee3);
        coffee3 = new SugarDecorator(coffee3);
        printOrder(coffee3);

        System.out.println("=".repeat(60));

        // Order 4: Fancy coffee - milk, sugar, whipped cream, caramel
        Coffee coffee4 = new SimpleCoffee();
        coffee4 = new MilkDecorator(coffee4);
        coffee4 = new SugarDecorator(coffee4);
        coffee4 = new WhippedCreamDecorator(coffee4);
        coffee4 = new CaramelDecorator(coffee4);
        printOrder(coffee4);

        System.out.println("=".repeat(60));

        // Order 5: All toppings!
        Coffee coffee5 = new SimpleCoffee();
        coffee5 = new MilkDecorator(coffee5);
        coffee5 = new SugarDecorator(coffee5);
        coffee5 = new WhippedCreamDecorator(coffee5);
        coffee5 = new CaramelDecorator(coffee5);
        coffee5 = new VanillaDecorator(coffee5);
        printOrder(coffee5);

        System.out.println("=".repeat(60));

        // Demonstrate fluent wrapping
        System.out.println("\n🎯 Fluent Decoration Example:");
        Coffee fancyCoffee = decorateCoffee();
        printOrder(fancyCoffee);
    }

    private static void printOrder(Coffee coffee) {
        System.out.println("☕ " + coffee.getDescription());
        System.out.println("💰 Cost: $" + String.format("%.2f", coffee.getCost()));
        System.out.println();
    }

    // Helper method for fluent decoration
    private static Coffee decorateCoffee() {
        return new VanillaDecorator(
                new CaramelDecorator(
                    new WhippedCreamDecorator(
                        new SugarDecorator(
                            new MilkDecorator(
                                new SimpleCoffee()
                            )
                        )
                    )
                )
            );
    }
}
```

**Output**:
```
☕ Coffee Shop - Decorator Pattern Demo

============================================================
☕ Simple Coffee
💰 Cost: $2.00

============================================================
☕ Simple Coffee, Milk
💰 Cost: $2.50

============================================================
☕ Simple Coffee, Milk, Sugar
💰 Cost: $2.75

============================================================
☕ Simple Coffee, Milk, Sugar, Whipped Cream, Caramel
💰 Cost: $4.10

============================================================
☕ Simple Coffee, Milk, Sugar, Whipped Cream, Caramel, Vanilla
💰 Cost: $4.50

============================================================

🎯 Fluent Decoration Example:
☕ Simple Coffee, Milk, Sugar, Whipped Cream, Caramel, Vanilla
💰 Cost: $4.50
```

### **Real-World Example 2: Java I/O Streams**
```java
/**
 * Java's I/O is a perfect example of Decorator pattern
 */
public class JavaIODecoratorExample {
    public static void main(String[] args) throws IOException {
        // Reading a file with multiple decorators

        // Base component: FileInputStream
        FileInputStream fileStream = new FileInputStream("data.txt");

        // Decorator 1: BufferedInputStream (adds buffering)
        BufferedInputStream bufferedStream = new BufferedInputStream(fileStream);

        // Decorator 2: DataInputStream (adds primitive data reading)
        DataInputStream dataStream = new DataInputStream(bufferedStream);

        // All wrapped in one line (common pattern):
        DataInputStream input = new DataInputStream(
            new BufferedInputStream(
                new FileInputStream("data.txt")
            )
        );

        // Reader example with even more decorators:
        BufferedReader reader = new BufferedReader(  // Buffering
            new InputStreamReader(                    // Byte-to-char conversion
                new FileInputStream("data.txt")       // Base file reading
            )
        );
    }
}
```

### **Real-World Example 3: Text Formatting**
```java
// Component
interface Text {
    String format();
}

// Concrete Component
class PlainText implements Text {
    private String content;

    public PlainText(String content) {
        this.content = content;
    }

    public String format() {
        return content;
    }
}

// Decorators
class BoldDecorator implements Text {
    private Text text;

    public BoldDecorator(Text text) {
        this.text = text;
    }

    public String format() {
        return "<b>" + text.format() + "</b>";
    }
}

class ItalicDecorator implements Text {
    private Text text;

    public ItalicDecorator(Text text) {
        this.text = text;
    }

    public String format() {
        return "<i>" + text.format() + "</i>";
    }
}

class UnderlineDecorator implements Text {
    private Text text;

    public UnderlineDecorator(Text text) {
        this.text = text;
    }

    public String format() {
        return "<u>" + text.format() + "</u>";
    }
}

// Usage:
Text text = new PlainText("Hello World");
text = new BoldDecorator(text);
text = new ItalicDecorator(text);
text = new UnderlineDecorator(text);
System.out.println(text.format());
// Output: <u><i><b>Hello World</b></i></u>
```

### **Decorator Pattern Structure**
```
Client
  ↓ uses
Component (interface)
  ↓ implements
ConcreteComponent
  ↑ wrapped by
Decorator (abstract, HAS-A Component)
  ↓ extends
ConcreteDecoratorA, ConcreteDecoratorB, ...
```

**When to Use**:
- ✅ When you want to add responsibilities dynamically
- ✅ When extending by subclassing is impractical
- ✅ When you need flexible alternative to subclassing
- ✅ When you want to add features that can be combined
- ✅ When you want to follow Open/Closed Principle

**Benefits**:
- ✅ **More flexible than inheritance**: Add/remove at runtime
- ✅ **Single Responsibility**: Each decorator has one feature
- ✅ **Open/Closed**: Add new decorators without changing existing code
- ✅ **Composable**: Mix and match decorators
- ✅ **Avoids subclass explosion**

**Drawbacks**:
- ❌ Many small objects (can be complex)
- ❌ Decorators aren't identical to component (type checking issues)
- ❌ Can be hard to debug (many layers)
- ❌ Order of decoration matters

**Decorator vs Proxy**:
| Aspect | Decorator | Proxy |
|--------|-----------|-------|
| **Purpose** | Add functionality | Control access |
| **Multiple layers** | Yes (chain decorators) | Usually no |
| **Creation** | Client wraps manually | Proxy creates object |
| **Focus** | Enhancement | Access control |

**Key Points**:
- Decorator **wraps** another object
- Decorator **has same interface** as component
- Can **chain multiple** decorators
- Each decorator adds **one feature**
- Component can be **decorated multiple times**
- Used in Java I/O, Streams API, Spring AOP

---

## **2.5 Facade** ⭐ **(Interview Imp - Java)**

**Intent**: Provide a simplified interface to a complex subsystem

**Problem**:
- Complex subsystem with many classes and interactions
- Clients need simple interface for common tasks
- Want to reduce coupling between clients and subsystem

**Solution**:
- Create a facade class that provides simple methods
- Facade delegates to appropriate subsystem classes
- Hides complexity from clients

**Real-World Examples**:
- Home theater system (one button to start movie: turns on projector, sound system, DVD player)
- Computer startup (single power button starts CPU, memory, hard drive, etc.)
- Library API wrapping complex framework
- Payment processing facade (handles multiple payment gateways)
- Database connection facade

**When to Use**:
- ✅ When you want simple interface to complex subsystem
- ✅ When there are many dependencies between clients and implementation classes
- ✅ To layer your subsystems

**Key Points**:
- Doesn't prevent clients from accessing subsystem directly
- Doesn't add functionality, just simplifies
- Reduces coupling

---

## **2.6 Flyweight** **(Interview Imp - Java)**

**Intent**: Use sharing to support large numbers of fine-grained objects efficiently

**Problem**:
- Application uses huge number of objects
- Storage costs are high due to sheer quantity
- Most object state can be made extrinsic (shared)

**Solution**:
- Separate intrinsic state (shared) from extrinsic state (unique)
- Store intrinsic state in flyweight objects
- Pass extrinsic state when needed
- Use factory to manage flyweight pool

**Real-World Examples**:
- Text editor (character objects - share font data, store only position)
- Game trees/terrain (share tree model, differ only in position)
- String pool in Java
- Connection pooling
- Thread pooling

**When to Use**:
- ✅ When application uses large number of objects
- ✅ When storage costs are high
- ✅ When most state can be made extrinsic

**Key Points**:
- **Intrinsic state**: Shared, stored in flyweight
- **Extrinsic state**: Unique, passed by client
- Trades computation time for space savings

---

## **2.7 Proxy** ⭐ **(Interview Imp - Java)**

**Intent**: Provide a surrogate or placeholder to control access to another object

**Problem**:
- Need to control access to an object
- Want to add functionality before/after accessing object
- Object creation is expensive or remote

**Solution**:
- Create a proxy with same interface as real object
- Proxy controls access to the real object
- Can add additional functionality

**Types of Proxy**:
1. **Virtual Proxy**: Lazy initialization of expensive objects
2. **Remote Proxy**: Represents object in different address space (RMI)
3. **Protection Proxy**: Controls access based on permissions
4. **Smart Reference**: Additional actions when object accessed (reference counting, locking)

**Real-World Examples**:
- Lazy loading images (placeholder until actual image loads)
- Spring AOP (method interception)
- Hibernate lazy loading
- Remote method invocation (RMI)
- Access control/security checks
- Caching proxy

**When to Use**:
- ✅ When you need lazy initialization
- ✅ When you need access control
- ✅ When you need local representative of remote object
- ✅ When you need logging, caching, or monitoring

**Difference from Decorator**:
- **Proxy**: Controls access, same interface, manages lifecycle
- **Decorator**: Adds functionality, wraps multiple objects

---

# **3. Behavioral Patterns** (11 Patterns)

> **Purpose**: Manage object communication - *HOW objects interact and distribute responsibility*

## **3.1 Chain of Responsibility** ⭐ **(Interview Imp - Java)**

**Intent**: Pass request along chain of handlers until one handles it

**Problem**:
- Multiple objects might handle a request
- Don't want to hardcode which object handles what
- Want to decouple sender from receiver

**Solution**:
- Create chain of handler objects
- Each handler decides to process request or pass to next
- Request travels until handled or chain ends

**Real-World Examples**:
- Exception handling (try-catch blocks)
- Servlet filters in Java web apps
- Logging frameworks (error, warn, info, debug)
- Customer support (Level 1 → Level 2 → Manager)
- Approval workflows (Employee → Manager → Director → CEO)

**When to Use**:
- ✅ When multiple objects might handle request
- ✅ When handler set should be dynamic
- ✅ When you want to decouple sender from receiver

**Key Points**:
- Request may not be handled (no guarantee)
- Can break Single Responsibility if handlers do too much
- Order of handlers matters

---

## **3.2 Command** ⭐ **(Interview Imp - Java)**

**Intent**: Encapsulate a request as an object, allowing parameterization and queuing

**Problem**:
- Need to parameterize objects with operations
- Want to queue operations, log them, or support undo
- Decouple invoker from executor

**Solution**:
- Encapsulate request as command object
- Command has execute() method
- Invoker calls execute() without knowing details

**Real-World Examples**:
- GUI buttons/menu items (each has command)
- Undo/Redo functionality
- Transaction systems
- Job queues
- Macro recording
- Remote control buttons

**When to Use**:
- ✅ When you need to parameterize objects with operations
- ✅ When you need undo/redo
- ✅ When you need to queue/log/schedule operations
- ✅ When you want to decouple invoker from receiver

**Key Points**:
- Supports undo by storing state
- Can composite commands (macro commands)
- Can log commands for crash recovery

---

## **3.3 Interpreter** **(Interview Imp - Java)**

**Intent**: Define a grammar for a language and an interpreter to interpret sentences

**Problem**:
- Need to interpret or evaluate language sentences
- Want to represent grammar rules as classes

**Solution**:
- Define grammar using class hierarchy
- Each grammar rule becomes a class
- Build abstract syntax tree and interpret it

**Real-World Examples**:
- Regular expressions
- SQL query parsing
- Mathematical expression evaluation
- Compiler/interpreter
- Configuration file parsing

**When to Use**:
- ✅ When you have a simple grammar to interpret
- ✅ When efficiency is not critical
- ✅ When grammar is stable

**Key Points**:
- Easy to change and extend grammar
- Complex grammars are hard to maintain
- Use parser generators for complex grammars

---

## **3.4 Iterator** ⭐ **(Interview Imp - Java)**

**Intent**: Access elements of collection sequentially without exposing underlying representation

**Problem**:
- Need to traverse collection without exposing internals
- Want multiple traversal algorithms
- Want uniform way to traverse different collections

**Solution**:
- Define iterator interface with hasNext() and next()
- Collection provides iterator
- Client uses iterator to traverse

**Real-World Examples**:
- Java Iterator, ListIterator
- Database cursor
- File directory traversal
- Menu navigation
- Playlist navigation

**When to Use**:
- ✅ When you need to access collection without exposing structure
- ✅ When you need multiple simultaneous traversals
- ✅ When you want uniform interface for different collections

**Key Points**:
- Part of Java Collections Framework
- Fail-fast vs fail-safe iterators
- Can have multiple iterators on same collection

---

## **3.5 Mediator** ⭐ **(Interview Imp - Java)**

**Intent**: Define object that encapsulates how objects interact, promoting loose coupling

**Problem**:
- Objects communicate in complex ways (many-to-many)
- Want to reduce dependencies between objects
- Reusing objects is difficult due to tight coupling

**Solution**:
- Create mediator object
- Objects communicate through mediator instead of directly
- Mediator encapsulates interaction logic

**Real-World Examples**:
- Air traffic control (mediates between planes)
- Chat room (mediates between users)
- UI dialog (mediates between form components)
- MVC controller (mediates between model and view)
- Event bus

**When to Use**:
- ✅ When objects communicate in complex ways
- ✅ When you want to reduce coupling
- ✅ When object behavior should be customizable without subclassing

**Key Points**:
- Reduces coupling between colleagues
- Centralizes control
- Mediator can become complex (God object)

---

## **3.6 Memento** ⭐ **(Interview Imp - Java)**

**Intent**: Capture and restore object's internal state without violating encapsulation

**Problem**:
- Need to save/restore object state (undo/redo)
- Don't want to expose internal structure
- Want to preserve encapsulation

**Solution**:
- Create memento object to store state
- Originator creates and restores from memento
- Caretaker stores mementos but doesn't modify them

**Real-World Examples**:
- Undo/Redo in text editors
- Game save points
- Database transaction rollback
- Browser back button
- Version control systems

**When to Use**:
- ✅ When you need to save/restore object state
- ✅ When you want to maintain encapsulation
- ✅ When direct interface to state would expose implementation

**Key Points**:
- Preserves encapsulation boundaries
- Can be expensive if state is large
- Caretaker responsible for memento lifecycle

---

## **3.7 Observer** ⭐ **(Interview Imp - Java)**

**Intent**: Define one-to-many dependency so when one object changes, dependents are notified

**Problem**:
- Need to notify multiple objects of state changes
- Don't want tight coupling between subject and observers
- Number of observers can change dynamically

**Real-World Scenario**:
You're building a **Stock Market Monitoring System**. When a stock price changes:
- Mobile app should update the UI
- Email alerts should be sent to subscribers
- SMS alerts for critical price changes
- Analytics system should log the change

All these components need to be notified, but the Stock shouldn't know details about each one.

**Java Implementation**:

### **Step 1: Define Observer Interface**
```java
/**
 * Observer interface - all observers must implement this
 */
public interface Observer {
    void update(String stockSymbol, double price);
}
```

### **Step 2: Define Subject Interface**
```java
/**
 * Subject interface - defines methods for managing observers
 */
public interface Subject {
    void registerObserver(Observer observer);
    void removeObserver(Observer observer);
    void notifyObservers();
}
```

### **Step 3: Implement Concrete Subject (Stock)**
```java
import java.util.ArrayList;
import java.util.List;

/**
 * Concrete Subject - Stock
 * Maintains list of observers and notifies them of price changes
 */
public class Stock implements Subject {
    private List<Observer> observers;
    private String stockSymbol;
    private double price;

    public Stock(String stockSymbol, double initialPrice) {
        this.stockSymbol = stockSymbol;
        this.price = initialPrice;
        this.observers = new ArrayList<>();
    }

    @Override
    public void registerObserver(Observer observer) {
        observers.add(observer);
        System.out.println("✓ New observer registered for " + stockSymbol);
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
        System.out.println("✗ Observer removed from " + stockSymbol);
    }

    @Override
    public void notifyObservers() {
        System.out.println("\n📢 Notifying all observers about " + stockSymbol + " price change...");
        for (Observer observer : observers) {
            observer.update(stockSymbol, price);
        }
    }

    // Business method - when price changes, notify observers
    public void setPrice(double newPrice) {
        System.out.println("\n" + stockSymbol + " price changing: $" + price + " → $" + newPrice);
        this.price = newPrice;
        notifyObservers();  // Automatically notify all observers
    }

    public double getPrice() {
        return price;
    }

    public String getStockSymbol() {
        return stockSymbol;
    }
}
```

### **Step 4: Implement Concrete Observers**
```java
/**
 * Concrete Observer 1 - Mobile App Display
 */
public class MobileAppDisplay implements Observer {
    private String userId;

    public MobileAppDisplay(String userId) {
        this.userId = userId;
    }

    @Override
    public void update(String stockSymbol, double price) {
        System.out.println("  📱 [Mobile App - " + userId + "] Updating display: " +
                         stockSymbol + " = $" + price);
        // Update UI logic here
        displayOnScreen(stockSymbol, price);
    }

    private void displayOnScreen(String symbol, double price) {
        // Simulate UI update
        System.out.println("     UI refreshed with latest price");
    }
}

/**
 * Concrete Observer 2 - Email Alert Service
 */
public class EmailAlertService implements Observer {
    private String emailAddress;

    public EmailAlertService(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    @Override
    public void update(String stockSymbol, double price) {
        System.out.println("  📧 [Email Service] Sending alert to " + emailAddress);
        sendEmail(stockSymbol, price);
    }

    private void sendEmail(String symbol, double price) {
        System.out.println("     Email sent: '" + symbol + " is now $" + price + "'");
    }
}

/**
 * Concrete Observer 3 - SMS Alert Service
 */
public class SMSAlertService implements Observer {
    private String phoneNumber;
    private double priceThreshold;  // Only alert if price crosses threshold

    public SMSAlertService(String phoneNumber, double priceThreshold) {
        this.phoneNumber = phoneNumber;
        this.priceThreshold = priceThreshold;
    }

    @Override
    public void update(String stockSymbol, double price) {
        if (price >= priceThreshold) {
            System.out.println("  📱 [SMS Service] Sending alert to " + phoneNumber);
            sendSMS(stockSymbol, price);
        } else {
            System.out.println("  📱 [SMS Service] Price below threshold, no SMS sent");
        }
    }

    private void sendSMS(String symbol, double price) {
        System.out.println("     SMS sent: 'ALERT: " + symbol + " reached $" + price + "'");
    }
}

/**
 * Concrete Observer 4 - Analytics Logger
 */
public class AnalyticsLogger implements Observer {

    @Override
    public void update(String stockSymbol, double price) {
        System.out.println("  📊 [Analytics] Logging price change");
        logToDatabase(stockSymbol, price);
    }

    private void logToDatabase(String symbol, double price) {
        String timestamp = java.time.LocalDateTime.now().toString();
        System.out.println("     DB Record: [" + timestamp + "] " + symbol + " = $" + price);
    }
}
```

### **Step 5: Client Code (Demo)**
```java
public class ObserverPatternDemo {
    public static void main(String[] args) {
        // Create stock (Subject)
        Stock appleStock = new Stock("AAPL", 150.00);

        System.out.println("=== Setting up observers ===");

        // Create observers
        Observer mobileApp1 = new MobileAppDisplay("user123");
        Observer mobileApp2 = new MobileAppDisplay("user456");
        Observer emailAlert = new EmailAlertService("investor@example.com");
        Observer smsAlert = new SMSAlertService("+1-555-1234", 160.00);  // Alert if >= $160
        Observer analytics = new AnalyticsLogger();

        // Register observers
        appleStock.registerObserver(mobileApp1);
        appleStock.registerObserver(mobileApp2);
        appleStock.registerObserver(emailAlert);
        appleStock.registerObserver(smsAlert);
        appleStock.registerObserver(analytics);

        // Simulate price changes
        System.out.println("\n" + "=".repeat(60));
        appleStock.setPrice(155.50);

        System.out.println("\n" + "=".repeat(60));
        appleStock.setPrice(162.75);  // This will trigger SMS alert

        System.out.println("\n" + "=".repeat(60));
        System.out.println("\n=== Removing an observer ===");
        appleStock.removeObserver(mobileApp2);

        System.out.println("\n" + "=".repeat(60));
        appleStock.setPrice(158.00);

        System.out.println("\n" + "=".repeat(60));
        System.out.println("\n=== Adding new observer dynamically ===");
        Observer newMobile = new MobileAppDisplay("user789");
        appleStock.registerObserver(newMobile);

        System.out.println("\n" + "=".repeat(60));
        appleStock.setPrice(165.25);
    }
}
```

**Output**:
```
=== Setting up observers ===
✓ New observer registered for AAPL
✓ New observer registered for AAPL
✓ New observer registered for AAPL
✓ New observer registered for AAPL
✓ New observer registered for AAPL

============================================================

AAPL price changing: $150.0 → $155.5

📢 Notifying all observers about AAPL price change...
  📱 [Mobile App - user123] Updating display: AAPL = $155.5
     UI refreshed with latest price
  📱 [Mobile App - user456] Updating display: AAPL = $155.5
     UI refreshed with latest price
  📧 [Email Service] Sending alert to investor@example.com
     Email sent: 'AAPL is now $155.5'
  📱 [SMS Service] Price below threshold, no SMS sent
  📊 [Analytics] Logging price change
     DB Record: [2026-06-19T...] AAPL = $155.5

============================================================

AAPL price changing: $155.5 → $162.75

📢 Notifying all observers about AAPL price change...
  📱 [Mobile App - user123] Updating display: AAPL = $162.75
     UI refreshed with latest price
  📱 [Mobile App - user456] Updating display: AAPL = $162.75
     UI refreshed with latest price
  📧 [Email Service] Sending alert to investor@example.com
     Email sent: 'AAPL is now $162.75'
  📱 [SMS Service] Sending alert to +1-555-1234
     SMS sent: 'ALERT: AAPL reached $162.75'
  📊 [Analytics] Logging price change
     DB Record: [2026-06-19T...] AAPL = $162.75

============================================================

=== Removing an observer ===
✗ Observer removed from AAPL

============================================================

AAPL price changing: $162.75 → $158.0

📢 Notifying all observers about AAPL price change...
  📱 [Mobile App - user123] Updating display: AAPL = $158.0
     UI refreshed with latest price
  📧 [Email Service] Sending alert to investor@example.com
     Email sent: 'AAPL is now $158.0'
  📱 [SMS Service] Price below threshold, no SMS sent
  📊 [Analytics] Logging price change
     DB Record: [2026-06-19T...] AAPL = $158.0

============================================================

=== Adding new observer dynamically ===
✓ New observer registered for AAPL

============================================================

AAPL price changing: $158.0 → $165.25

📢 Notifying all observers about AAPL price change...
  📱 [Mobile App - user123] Updating display: AAPL = $165.25
     UI refreshed with latest price
  📧 [Email Service] Sending alert to investor@example.com
     Email sent: 'AAPL is now $165.25'
  📱 [SMS Service] Sending alert to +1-555-1234
     SMS sent: 'ALERT: AAPL reached $165.25'
  📊 [Analytics] Logging price change
     DB Record: [2026-06-19T...] AAPL = $165.25
  📱 [Mobile App - user789] Updating display: AAPL = $165.25
     UI refreshed with latest price
```

### **Push vs Pull Model**

**Current Implementation: PUSH Model** (Subject pushes data to observers)
```java
// Subject pushes data in update call
void update(String stockSymbol, double price);  // Data is pushed
```

**Alternative: PULL Model** (Observers pull data from subject)
```java
// Observer interface for PULL model
public interface Observer {
    void update(Subject subject);  // Just notify, observer pulls data
}

// Observer implementation
public class MobileAppDisplay implements Observer {
    @Override
    public void update(Subject subject) {
        Stock stock = (Stock) subject;
        String symbol = stock.getStockSymbol();
        double price = stock.getPrice();  // Pull data when needed
        // Update UI...
    }
}
```

### **Java Built-in Observer (Deprecated since Java 9)**
```java
import java.util.Observable;
import java.util.Observer;

// Old way (deprecated)
class Stock extends Observable {
    private double price;

    public void setPrice(double price) {
        this.price = price;
        setChanged();           // Mark as changed
        notifyObservers(price); // Notify observers
    }
}

class Display implements Observer {
    public void update(Observable o, Object arg) {
        double price = (double) arg;
        // Update display
    }
}
```

### **Modern Java Alternative: PropertyChangeListener**
```java
import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;

public class Stock {
    private PropertyChangeSupport support;
    private double price;

    public Stock() {
        support = new PropertyChangeSupport(this);
    }

    public void addPropertyChangeListener(PropertyChangeListener listener) {
        support.addPropertyChangeListener(listener);
    }

    public void setPrice(double newPrice) {
        double oldPrice = this.price;
        this.price = newPrice;
        support.firePropertyChange("price", oldPrice, newPrice);
    }
}

// Usage
stock.addPropertyChangeListener(evt -> {
    System.out.println("Price changed: " + evt.getOldValue() + " -> " + evt.getNewValue());
});
```

**When to Use**:
- ✅ When change to one object requires changing others
- ✅ When you don't know how many objects need notification
- ✅ When object should notify without knowing who they are
- ✅ Event-driven systems, UI updates, pub-sub systems

**Benefits**:
- ✅ **Loose coupling**: Subject doesn't know concrete observers
- ✅ **Dynamic**: Add/remove observers at runtime
- ✅ **Broadcast communication**: One-to-many relationship
- ✅ **Open/Closed Principle**: Add new observers without changing subject

**Drawbacks**:
- ❌ Observers are notified in random order (unless you manage it)
- ❌ Can cause memory leaks if observers aren't removed
- ❌ Can cause unexpected cascading updates
- ❌ Difficult to debug when many observers exist

**Key Points**:
- Subject maintains list of observers
- Observers register/unregister dynamically
- Subject notifies all observers when state changes
- **Push model**: Subject sends data to observers
- **Pull model**: Observers query subject for data
- Used extensively in MVC, event systems, reactive programming

---

## **3.8 State** ⭐ **(Interview Imp - Java)**

**Intent**: Allow object to alter behavior when internal state changes

**Problem**:
- Object behavior depends on state
- Large conditional statements based on state
- Want to add new states easily

**Solution**:
- Encapsulate state-specific behavior in separate state classes
- Context delegates to current state object
- States can transition to other states

**Real-World Examples**:
- TCP connection (Established, Listening, Closed)
- Document workflow (Draft, Moderation, Published)
- Vending machine states
- Media player (Playing, Paused, Stopped)
- Order status (Pending, Confirmed, Shipped, Delivered)

**When to Use**:
- ✅ When object behavior depends on state
- ✅ When you have large conditional statements based on state
- ✅ When states need to transition based on events

**Key Points**:
- Eliminates large conditional statements
- Makes state transitions explicit
- Easy to add new states
- Can increase number of classes

---

## **3.9 Strategy** ⭐ **(Interview Imp - Java)**

**Intent**: Define family of algorithms, encapsulate each, and make them interchangeable

**Problem**:
- Need different variants of algorithm
- Want to switch algorithms at runtime
- Want to avoid conditional statements for algorithm selection

**Real-World Scenario**:
You're building an **E-commerce Payment System**. Customers can pay using:
- Credit Card
- PayPal
- Bitcoin
- UPI (India)

Each payment method has different processing logic, but you don't want `if-else` everywhere.

**❌ Without Strategy Pattern (Bad Approach)**:
```java
public class OrderProcessor {
    public void processPayment(String paymentType, double amount) {
        if (paymentType.equals("CREDIT_CARD")) {
            // Credit card logic
            System.out.println("Processing credit card payment...");
            // Validate card, charge, etc.
        } else if (paymentType.equals("PAYPAL")) {
            // PayPal logic
            System.out.println("Processing PayPal payment...");
            // OAuth, API call, etc.
        } else if (paymentType.equals("BITCOIN")) {
            // Bitcoin logic
            System.out.println("Processing Bitcoin payment...");
            // Blockchain transaction, etc.
        } else if (paymentType.equals("UPI")) {
            // UPI logic
            System.out.println("Processing UPI payment...");
        }
        // ❌ Violates Open/Closed Principle
        // ❌ Hard to test individual payment methods
        // ❌ Difficult to add new payment methods
    }
}
```

**✅ With Strategy Pattern**:

### **Step 1: Define Strategy Interface**
```java
/**
 * Strategy interface - defines payment algorithm contract
 */
public interface PaymentStrategy {
    void pay(double amount);
    boolean validate();
}
```

### **Step 2: Implement Concrete Strategies**
```java
/**
 * Concrete Strategy 1 - Credit Card Payment
 */
public class CreditCardPayment implements PaymentStrategy {
    private String cardNumber;
    private String cvv;
    private String expiryDate;
    private String cardHolderName;

    public CreditCardPayment(String cardNumber, String cvv, String expiryDate, String cardHolderName) {
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.expiryDate = expiryDate;
        this.cardHolderName = cardHolderName;
    }

    @Override
    public boolean validate() {
        System.out.println("Validating credit card details...");
        // Validate card number, CVV, expiry date
        if (cardNumber.length() != 16) {
            System.out.println("Invalid card number");
            return false;
        }
        System.out.println("✓ Credit card validated");
        return true;
    }

    @Override
    public void pay(double amount) {
        if (validate()) {
            System.out.println("💳 Processing Credit Card Payment");
            System.out.println("   Card: **** **** **** " + cardNumber.substring(12));
            System.out.println("   Amount: $" + amount);
            System.out.println("   Holder: " + cardHolderName);
            // Actual payment gateway integration
            System.out.println("✓ Payment successful via Credit Card\n");
        }
    }
}

/**
 * Concrete Strategy 2 - PayPal Payment
 */
public class PayPalPayment implements PaymentStrategy {
    private String email;
    private String password;

    public PayPalPayment(String email, String password) {
        this.email = email;
        this.password = password;
    }

    @Override
    public boolean validate() {
        System.out.println("Authenticating PayPal account...");
        // OAuth or password verification
        if (!email.contains("@")) {
            System.out.println("Invalid email");
            return false;
        }
        System.out.println("✓ PayPal account authenticated");
        return true;
    }

    @Override
    public void pay(double amount) {
        if (validate()) {
            System.out.println("💰 Processing PayPal Payment");
            System.out.println("   Email: " + email);
            System.out.println("   Amount: $" + amount);
            // PayPal API call
            System.out.println("✓ Payment successful via PayPal\n");
        }
    }
}

/**
 * Concrete Strategy 3 - Bitcoin Payment
 */
public class BitcoinPayment implements PaymentStrategy {
    private String walletAddress;

    public BitcoinPayment(String walletAddress) {
        this.walletAddress = walletAddress;
    }

    @Override
    public boolean validate() {
        System.out.println("Validating Bitcoin wallet...");
        // Validate blockchain address
        if (walletAddress.length() < 26) {
            System.out.println("Invalid wallet address");
            return false;
        }
        System.out.println("✓ Bitcoin wallet validated");
        return true;
    }

    @Override
    public void pay(double amount) {
        if (validate()) {
            System.out.println("₿ Processing Bitcoin Payment");
            System.out.println("   Wallet: " + walletAddress);
            System.out.println("   Amount: $" + amount + " (Converting to BTC...)");
            // Blockchain transaction
            System.out.println("✓ Payment successful via Bitcoin\n");
        }
    }
}

/**
 * Concrete Strategy 4 - UPI Payment (India)
 */
public class UPIPayment implements PaymentStrategy {
    private String upiId;

    public UPIPayment(String upiId) {
        this.upiId = upiId;
    }

    @Override
    public boolean validate() {
        System.out.println("Validating UPI ID...");
        if (!upiId.contains("@")) {
            System.out.println("Invalid UPI ID");
            return false;
        }
        System.out.println("✓ UPI ID validated");
        return true;
    }

    @Override
    public void pay(double amount) {
        if (validate()) {
            System.out.println("📱 Processing UPI Payment");
            System.out.println("   UPI ID: " + upiId);
            System.out.println("   Amount: ₹" + (amount * 83));  // Convert to INR
            // UPI API call
            System.out.println("✓ Payment successful via UPI\n");
        }
    }
}
```

### **Step 3: Create Context Class**
```java
/**
 * Context - Shopping Cart that uses payment strategy
 */
public class ShoppingCart {
    private List<Item> items;
    private PaymentStrategy paymentStrategy;

    public ShoppingCart() {
        this.items = new ArrayList<>();
    }

    public void addItem(Item item) {
        items.add(item);
    }

    public double calculateTotal() {
        return items.stream()
                .mapToDouble(Item::getPrice)
                .sum();
    }

    // Set payment strategy at runtime
    public void setPaymentStrategy(PaymentStrategy paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    public void checkout() {
        double total = calculateTotal();

        System.out.println("=== Checkout ===");
        System.out.println("Items in cart:");
        items.forEach(item -> System.out.println("  - " + item));
        System.out.println("Total: $" + total);
        System.out.println();

        if (paymentStrategy == null) {
            System.out.println("Please select a payment method!");
            return;
        }

        // Delegate to strategy
        paymentStrategy.pay(total);
    }
}

/**
 * Item class for shopping cart
 */
class Item {
    private String name;
    private double price;

    public Item(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public double getPrice() { return price; }

    @Override
    public String toString() {
        return name + " ($" + price + ")";
    }
}
```

### **Step 4: Client Code**
```java
public class StrategyPatternDemo {
    public static void main(String[] args) {
        // Create shopping cart
        ShoppingCart cart = new ShoppingCart();
        cart.addItem(new Item("Laptop", 999.99));
        cart.addItem(new Item("Mouse", 29.99));
        cart.addItem(new Item("Keyboard", 79.99));

        System.out.println("🛒 Customer 1: Paying with Credit Card");
        System.out.println("=".repeat(60));
        PaymentStrategy creditCard = new CreditCardPayment(
            "1234567812345678",
            "123",
            "12/25",
            "John Doe"
        );
        cart.setPaymentStrategy(creditCard);
        cart.checkout();

        System.out.println("\n🛒 Customer 2: Paying with PayPal");
        System.out.println("=".repeat(60));
        PaymentStrategy paypal = new PayPalPayment(
            "customer@example.com",
            "securePassword123"
        );
        cart.setPaymentStrategy(paypal);
        cart.checkout();

        System.out.println("\n🛒 Customer 3: Paying with Bitcoin");
        System.out.println("=".repeat(60));
        PaymentStrategy bitcoin = new BitcoinPayment(
            "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
        );
        cart.setPaymentStrategy(bitcoin);
        cart.checkout();

        System.out.println("\n🛒 Customer 4: Paying with UPI");
        System.out.println("=".repeat(60));
        PaymentStrategy upi = new UPIPayment("user@paytm");
        cart.setPaymentStrategy(upi);
        cart.checkout();

        // Demonstrate runtime strategy change
        System.out.println("\n🛒 Customer changing payment method");
        System.out.println("=".repeat(60));
        cart.setPaymentStrategy(new CreditCardPayment(
            "9876543298765432",
            "456",
            "06/26",
            "Jane Smith"
        ));
        cart.checkout();
    }
}
```

**Output**:
```
🛒 Customer 1: Paying with Credit Card
============================================================
=== Checkout ===
Items in cart:
  - Laptop ($999.99)
  - Mouse ($29.99)
  - Keyboard ($79.99)
Total: $1109.97

Validating credit card details...
✓ Credit card validated
💳 Processing Credit Card Payment
   Card: **** **** **** 5678
   Amount: $1109.97
   Holder: John Doe
✓ Payment successful via Credit Card


🛒 Customer 2: Paying with PayPal
============================================================
=== Checkout ===
Items in cart:
  - Laptop ($999.99)
  - Mouse ($29.99)
  - Keyboard ($79.99)
Total: $1109.97

Authenticating PayPal account...
✓ PayPal account authenticated
💰 Processing PayPal Payment
   Email: customer@example.com
   Amount: $1109.97
✓ Payment successful via PayPal


🛒 Customer 3: Paying with Bitcoin
============================================================
=== Checkout ===
Items in cart:
  - Laptop ($999.99)
  - Mouse ($29.99)
  - Keyboard ($79.99)
Total: $1109.97

Validating Bitcoin wallet...
✓ Bitcoin wallet validated
₿ Processing Bitcoin Payment
   Wallet: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
   Amount: $1109.97 (Converting to BTC...)
✓ Payment successful via Bitcoin


🛒 Customer 4: Paying with UPI
============================================================
=== Checkout ===
Items in cart:
  - Laptop ($999.99)
  - Mouse ($29.99)
  - Keyboard ($79.99)
Total: $1109.97

Validating UPI ID...
✓ UPI ID validated
📱 Processing UPI Payment
   UPI ID: user@paytm
   Amount: ₹92127.51
✓ Payment successful via UPI


🛒 Customer changing payment method
============================================================
=== Checkout ===
Items in cart:
  - Laptop ($999.99)
  - Mouse ($29.99)
  - Keyboard ($79.99)
Total: $1109.97

Validating credit card details...
✓ Credit card validated
💳 Processing Credit Card Payment
   Card: **** **** **** 5432
   Amount: $1109.97
   Holder: Jane Smith
✓ Payment successful via Credit Card
```

### **Real-World Example 2: Sorting Strategy**
```java
// Strategy interface
interface SortStrategy {
    void sort(int[] array);
}

// Concrete strategies
class BubbleSort implements SortStrategy {
    public void sort(int[] array) {
        System.out.println("Sorting using Bubble Sort");
        // Bubble sort implementation
    }
}

class QuickSort implements SortStrategy {
    public void sort(int[] array) {
        System.out.println("Sorting using Quick Sort");
        // Quick sort implementation
    }
}

class MergeSort implements SortStrategy {
    public void sort(int[] array) {
        System.out.println("Sorting using Merge Sort");
        // Merge sort implementation
    }
}

// Context
class SortContext {
    private SortStrategy strategy;

    public void setStrategy(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public void executeSort(int[] array) {
        strategy.sort(array);
    }
}

// Usage
SortContext context = new SortContext();

// Use bubble sort for small arrays
if (array.length < 10) {
    context.setStrategy(new BubbleSort());
} else if (array.length < 1000) {
    context.setStrategy(new QuickSort());
} else {
    context.setStrategy(new MergeSort());
}

context.executeSort(array);
```

### **Strategy vs State Pattern**

| Aspect | Strategy | State |
|--------|----------|-------|
| **Intent** | Choose algorithm | Change behavior based on state |
| **Who decides** | Client chooses strategy | Context changes state internally |
| **When changes** | Rarely changes | Changes frequently |
| **Transitions** | No transitions | States transition to other states |
| **Example** | Payment method selection | Order status (Pending→Shipped→Delivered) |

**When to Use**:
- ✅ When you have multiple algorithms for specific task
- ✅ When you want to switch algorithms at runtime
- ✅ When you want to isolate algorithm implementation
- ✅ When you want to avoid conditional statements
- ✅ When algorithms are independent and interchangeable

**Benefits**:
- ✅ **Open/Closed Principle**: Easy to add new strategies
- ✅ **No conditionals**: Eliminates if-else/switch statements
- ✅ **Runtime flexibility**: Switch strategies dynamically
- ✅ **Testability**: Each strategy can be tested independently
- ✅ **Single Responsibility**: Each strategy has one algorithm

**Drawbacks**:
- ❌ Clients must be aware of different strategies
- ❌ Increases number of classes
- ❌ Communication overhead between context and strategy

**Key Points**:
- Strategy defines a family of algorithms
- Each algorithm is encapsulated in a separate class
- Client selects appropriate strategy
- Context delegates to strategy
- Strategies are interchangeable
- Used extensively in Java (Comparator, LayoutManager, etc.)

---

## **3.10 Template Method** ⭐ **(Interview Imp - Java)**

**Intent**: Define skeleton of algorithm, letting subclasses override specific steps

**Problem**:
- Multiple classes with similar algorithms
- Want to avoid code duplication
- Want to control which steps can be customized

**Solution**:
- Define algorithm structure in base class method
- Make some steps abstract (must override)
- Make some steps with default implementation (can override - hooks)
- Subclasses implement/override specific steps

**Real-World Examples**:
- Framework lifecycle methods (Spring Bean initialization)
- Servlet doGet/doPost
- Data processing pipeline (read, process, write)
- Game AI (initialize, play, cleanup)
- Build processes
- Unit testing frameworks (setUp, test, tearDown)

**When to Use**:
- ✅ When you have algorithm with invariant parts
- ✅ When subclasses should customize certain steps
- ✅ When you want to avoid code duplication

**Key Points**:
- Uses inheritance (compile-time)
- Hollywood Principle: "Don't call us, we'll call you"
- Can use hooks for optional steps
- Less flexible than Strategy (Strategy uses composition)

---

## **3.11 Visitor** ⭐ **(Interview Imp - Java)**

**Intent**: Separate algorithm from object structure it operates on

**Problem**:
- Need to perform operations on object structure
- Don't want to change classes every time operation is added
- Operations should work on different class hierarchies

**Solution**:
- Define visitor interface with visit methods for each element type
- Elements accept visitors
- Visitor implements operations
- Easy to add new operations without changing elements

**Real-World Examples**:
- Compiler AST (syntax tree) operations (type checking, code generation)
- Tax calculation for different item types
- Export to different formats (XML, JSON)
- Shopping cart (price calculation, discount calculation)
- File system operations (search, compress, delete)

**When to Use**:
- ✅ When you need many unrelated operations on object structure
- ✅ When object structure rarely changes but operations change often
- ✅ When you want to avoid polluting classes with operations

**Key Points**:
- Easy to add new operations
- Hard to add new element types
- Violates encapsulation (needs access to element internals)
- Double dispatch technique

---

# **4. Additional LLD Patterns** (3 Patterns)

## **4.1 Null Object** ⭐ **(Interview Imp - Java)**

**Intent**: Provide default object instead of null to avoid null checks

**Problem**:
- Frequent null checks clutter code
- Null pointer exceptions
- Want default behavior instead of null

**Solution**:
- Create null object with default/no-op behavior
- Implements same interface as real object
- Returns null object instead of null

**Real-World Examples**:
- Empty logger (does nothing)
- Default customer (guest user)
- Empty collection
- Optional in Java 8+
- NullOutputStream

**When to Use**:
- ✅ When you have frequent null checks
- ✅ When null needs predictable default behavior
- ✅ When you want to avoid NullPointerException

---

## **4.2 Object Pool** ⭐ **(Interview Imp - Java)**

**Intent**: Reuse expensive objects instead of creating new ones

**Problem**:
- Object creation is expensive
- Need many short-lived objects
- Want to manage limited resources

**Solution**:
- Maintain pool of reusable objects
- Client requests object from pool
- Return object to pool when done
- Pool creates new objects if needed

**Real-World Examples**:
- Database connection pool
- Thread pool
- String pool in Java
- Game object pooling (bullets, particles)
- HTTP connection pool

**When to Use**:
- ✅ When object creation is expensive
- ✅ When you need many short-lived objects
- ✅ When managing limited resources

**Key Points**:
- Improves performance
- Must handle thread safety
- Must reset object state before reuse

---

## **4.3 Lazy Initialization** ⭐ **(Interview Imp - Java)**

**Intent**: Delay object creation until first use

**Problem**:
- Object creation is expensive
- Object might not be used
- Want to improve startup time

**Solution**:
- Initialize field as null
- Check if null before use
- Create on first access
- Cache for subsequent use

**Real-World Examples**:
- Singleton lazy initialization
- Hibernate lazy loading
- Spring bean lazy initialization
- Configuration loading
- Resource loading

**When to Use**:
- ✅ When object creation is expensive
- ✅ When object might not be used
- ✅ When you want to defer cost until needed

**Key Points**:
- Improves startup performance
- Must handle thread safety
- First access is slower

---

# **Quick Reference Guide**

## **Pattern Selection Flowchart**

```
Need to create objects?
  └─> CREATIONAL
      - One instance? → Singleton
      - Complex construction? → Builder
      - Clone existing? → Prototype
      - Create without knowing exact type? → Factory Method
      - Create families of objects? → Abstract Factory

Need to organize/compose objects?
  └─> STRUCTURAL
      - Incompatible interfaces? → Adapter
      - Separate abstraction from implementation? → Bridge
      - Tree structure? → Composite
      - Add functionality dynamically? → Decorator
      - Simplify complex interface? → Facade
      - Share objects efficiently? → Flyweight
      - Control access? → Proxy

Need objects to communicate?
  └─> BEHAVIORAL
      - Chain of handlers? → Chain of Responsibility
      - Encapsulate request as object? → Command
      - Parse language? → Interpreter
      - Traverse collection? → Iterator
      - Centralize communication? → Mediator
      - Save/restore state? → Memento
      - Notify multiple objects? → Observer
      - Behavior depends on state? → State
      - Switch algorithms? → Strategy
      - Define algorithm skeleton? → Template Method
      - Separate operation from structure? → Visitor
```

---

## **When to Use Each Pattern (at a Glance)**

### **Creational: "HOW to CREATE objects?"** 🏗️

| Pattern | When to Use | Example Scenario |
|---------|-------------|------------------|
| **Singleton** | Need exactly one instance | Database connection, Logger, Config manager |
| **Factory Method** | Don't know the exact type at compile time | Notification system (Email/SMS/Push) |
| **Abstract Factory** | Create families of related objects | UI toolkit (Windows/Mac components) |
| **Builder** | Many optional parameters | Computer configuration, Pizza ordering |
| **Prototype** | Clone existing objects | Copy game objects, document templates |

**Key Insight**: flexibility in object creation instead of direct `new` calls.

### **Structural: "HOW objects RELATE and COMPOSE?"** 🏛️

| Pattern | When to Use | Example Scenario |
|---------|-------------|------------------|
| **Adapter** | Make incompatible interfaces work | Legacy API integration |
| **Bridge** | Separate abstraction from implementation | Shape + Color combinations |
| **Composite** | Tree structures, part-whole hierarchy | File system (files/folders) |
| **Decorator** | Add features dynamically | Coffee with toppings, Java I/O streams |
| **Facade** | Simplify a complex subsystem | Home theater system control |
| **Flyweight** | Share objects to save memory | Text editor characters, `Integer.valueOf` cache |
| **Proxy** | Control access to objects | Lazy loading, access control, caching |

**Key Insight**: organise and compose objects efficiently.

### **Behavioral: "HOW objects COMMUNICATE and INTERACT?"** 🔄

| Pattern | When to Use | Example Scenario |
|---------|-------------|------------------|
| **Chain of Responsibility** | Multiple handlers for a request | Servlet filters, logging levels |
| **Command** | Encapsulate a request as an object | Undo/redo, job queues, button actions |
| **Interpreter** | Parse and interpret a language | Regular expressions, SQL parsing |
| **Iterator** | Traverse a collection sequentially | Java Collections, database cursor |
| **Mediator** | Centralise complex interactions | Chat room, air traffic control |
| **Memento** | Save/restore object state | Undo functionality, game saves |
| **Observer** | Notify many objects of changes | Stock price updates, event listeners |
| **State** | Behaviour depends on state | Order status, TCP connection states |
| **Strategy** | Switch algorithms at runtime | Payment methods, sorting algorithms |
| **Template Method** | Define an algorithm skeleton | Framework lifecycle, test setup/teardown |
| **Visitor** | Add operations without changing classes | AST operations, tax calculation |

**Key Insight**: define how objects collaborate and share responsibilities.

---

## **Common Confusions Clarified**

| vs | Difference |
|----|------------|
| **Factory Method vs Abstract Factory** | One product vs a family of products |
| **Decorator vs Proxy** | Add functionality (often chained) vs control access (usually one layer) |
| **Strategy vs State** | Client chooses the algorithm vs the context switches state internally |
| **Adapter vs Bridge** | Fix a mismatch after design vs plan the split during design |
| **Decorator vs Adapter** | Same interface + enhance vs convert to a different interface |

---

## **Where These Patterns Appear in Java**

1. **Singleton**: `Runtime.getRuntime()`, Spring beans (default singleton scope)
2. **Factory Method**: `Calendar.getInstance()`, `NumberFormat.getInstance()`
3. **Abstract Factory**: `DocumentBuilderFactory`, `TransformerFactory`
4. **Builder**: `StringBuilder`, `Stream.builder()`, `HttpRequest.newBuilder()`
5. **Prototype**: `Object.clone()`, `Cloneable`
6. **Adapter**: `Arrays.asList()`, `InputStreamReader`
7. **Decorator**: Java I/O (`BufferedReader` wrapping `FileReader`), `Collections.unmodifiableList()`
8. **Proxy**: `java.lang.reflect.Proxy`, Spring AOP, Hibernate lazy loading
9. **Iterator**: `java.util.Iterator`, `ListIterator`
10. **Observer**: `PropertyChangeListener`, Swing/AWT listeners (`java.util.Observer` is deprecated)
11. **Strategy**: `Comparator`, `LayoutManager`
12. **Template Method**: `AbstractList`, `HttpServlet` (`service()` calls `doGet()`/`doPost()`)

---

## **Most Important for Java Interviews**

### **Must Know (Top 10)**
1. **Singleton** - Most asked pattern
2. **Factory Method** - Very common
3. **Builder** - Popular in modern Java
4. **Adapter** - Integration scenarios
5. **Decorator** - Java I/O, Spring AOP
6. **Proxy** - Spring AOP, Hibernate
7. **Observer** - Event handling
8. **Strategy** - Algorithm selection
9. **Template Method** - Framework design
10. **Null Object** - Clean code

### **Should Know (Next 5)**
11. **Abstract Factory** - Factory of factories
12. **Facade** - Simplification
13. **Composite** - Tree structures
14. **State** - State machines
15. **Command** - Undo/redo, queuing

### **Good to Know**
- Chain of Responsibility (filtering)
- Iterator (Collections)
- Mediator (Complex interactions)
- Memento (State management)

---

## **Common Interview Questions**

0. **What are design patterns, and what are the three GoF categories?**
   - Reusable, named solutions to recurring design problems. Creational = object creation, Structural = object composition, Behavioral = object interaction

1. **Difference between Factory Method and Abstract Factory?**
   - Factory Method creates one product, Abstract Factory creates families

2. **Difference between Adapter and Decorator?**
   - Adapter changes interface, Decorator adds functionality

3. **Difference between Strategy and State?**
   - Strategy: external choice, State: internal transitions

4. **Difference between Proxy and Decorator?**
   - Proxy controls access, Decorator adds functionality

5. **How to make Singleton thread-safe?**
   - Double-checked locking, Enum, Static initialization

6. **When to use Builder pattern?**
   - Many optional parameters, immutable objects

7. **Give real example of Observer pattern in Java**
   - Event listeners, PropertyChangeListener, RxJava

---

## **Summary**

- **26 LLD Patterns Total**
  - 5 Creational (object creation)
  - 7 Structural (object composition)
  - 11 Behavioral (object interaction)
  - 3 Additional (common extensions)

- **Key Principle**: These patterns solve recurring design problems at the class/object level

- **Interview Tip**: Know the top 10 patterns with:
  - Intent
  - Problem/Solution
  - Real-world example
  - When to use
  - Code example in Java

---

**Happy Learning! 🚀**
