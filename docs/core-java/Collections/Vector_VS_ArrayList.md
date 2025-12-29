---
sidebar_position: 6
---

# ArrayList vs. Vector in Java's Collection Framework

### **1. Overview**
Both `ArrayList` and `Vector` are resizable array implementations of the `List` interface in Java. They store dynamically sized collections of objects and allow fast read operations (`O(1)` for accessing elements).

### **2. Key Differences**
| Feature          | ArrayList                          | Vector                          |
|-----------------|----------------------------------|--------------------------------|
| Synchronization | Not synchronized (not thread-safe) | Synchronized (thread-safe)     |
| Performance     | Faster (No overhead of synchronization) | Slower (due to synchronization) |
| Growth Rate     | Increases capacity by 50%        | Increases capacity by 100% (doubles) |
| Thread-Safety   | Not thread-safe                   | Thread-safe                     |
| Usage Scenario  | Preferred in single-threaded applications | Suitable for multi-threaded applications |

### **3. Synchronization in ArrayList vs. Vector**
Synchronization ensures that multiple threads can access a shared resource safely.

#### **Example: Multi-threading Issue in ArrayList** (Not Synchronized)
```java
import java.util.ArrayList;

class MyThread extends Thread {
    static ArrayList<Integer> list = new ArrayList<>();

    public void run() {
        for (int i = 0; i < 5; i++) {
            list.add(i);
            try { Thread.sleep(10); } catch (InterruptedException e) { }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        MyThread t1 = new MyThread();
        MyThread t2 = new MyThread();
        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println("ArrayList: " + list);
    }
}
```
##### **Possible Output (Unpredictable due to Race Condition)**
```
ArrayList: [0, 0, 1, 2, 1, 3, 2, 4, 3, 4]  // Data corruption!
```

#### **Example: Using Vector (Synchronized)**
```java
import java.util.Vector;

class MyThreadVector extends Thread {
    static Vector<Integer> vec = new Vector<>();

    public void run() {
        for (int i = 0; i < 5; i++) {
            vec.add(i);
            try { Thread.sleep(10); } catch (InterruptedException e) { }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        MyThreadVector t1 = new MyThreadVector();
        MyThreadVector t2 = new MyThreadVector();
        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println("Vector: " + vec);
    }
}
```
##### **Output (Always Correct)**
```
Vector: [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
```
Since `Vector` is synchronized, only one thread modifies it at a time, ensuring data integrity.

#### **Making ArrayList Thread-Safe**
You can manually synchronize an `ArrayList` using:
```java
import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

List<Integer> syncList = Collections.synchronizedList(new ArrayList<>());
```

### **4. Understanding Capacity Growth: 50% vs. Doubling**
You might wonder if "Increasing by 50%" and "Doubling the capacity" are the same. They are different in how they affect memory usage.

#### **ArrayList Capacity Growth**
- Initial capacity: **10**
- When full, increases by **50%**.
- Example:
  - 10 → **15** → 22 → 33 → 49 → ...
- **Memory-efficient**, avoids excessive allocation.

#### **Vector Capacity Growth**
- Initial capacity: **10**
- When full, **doubles** (x2).
- Example:
  - 10 → **20** → 40 → 80 → 160 → ...
- **May waste memory** but reduces resizing operations.

### **5. Key Takeaways**
- **ArrayList** is faster, more memory-efficient but not thread-safe.
- **Vector** is thread-safe but slower and may waste memory due to aggressive growth.
- If synchronization is needed, prefer `Collections.synchronizedList(new ArrayList<>())` over `Vector`.

Use **ArrayList for single-threaded environments** and **Vector for multi-threaded environments** where automatic synchronization is needed.

