---
sidebar_position: 5
---

# Java Collections and Algorithms

## 1. Custom Classes
Custom classes are user-defined classes created based on specific requirements. These classes encapsulate data and behavior, often representing real-world entities.

Example:
```java
class Car {
    String model;
    int year;
    
    Car(String model, int year) {
        this.model = model;
        this.year = year;
    }
}
```
✅ Implementing user-defined classes.

---

## 2. Collection Interface
### a. List Interface
Lists maintain order and allow duplicate elements.

- **ArrayList** – Implements a dynamic array that grows as needed.
  ```java
  ArrayList<String> list = new ArrayList<>();
  list.add("Apple");
  ```
  ✅ Dynamic array implementation.

- **LinkedList** – Doubly linked list providing efficient insertions and deletions.
  ```java
  LinkedList<Integer> numbers = new LinkedList<>();
  numbers.add(10);
  ```
  ✅ Efficient for frequent insertions/deletions.

- **Stack** – Last In, First Out (LIFO) data structure.
  ```java
  Stack<Integer> stack = new Stack<>();
  stack.push(5);
  ```
  ✅ Used for recursion and backtracking.

- **Vector** – Thread-safe version of ArrayList.
  ```java
  Vector<String> vector = new Vector<>();
  vector.add("Data");
  ```
  ✅ Ensures synchronization.

---

### b. Set
Sets store unique elements and do not maintain insertion order.

- **HashSet** – Uses hashing for quick lookups (O(1)).
  ```java
  HashSet<Integer> set = new HashSet<>();
  set.add(100);
  ```
  ✅ Fast lookup time.

- **TreeSet** – Maintains sorted order (O(log N)).
  ```java
  TreeSet<Integer> sortedSet = new TreeSet<>();
  sortedSet.add(50);
  ```
  ✅ Sorted elements.

---

### c. Queue (FIFO)
Queues follow First In, First Out (FIFO) order.

- **ArrayDeque** – A resizable deque (double-ended queue).
  ```java
  ArrayDeque<Integer> deque = new ArrayDeque<>();
  deque.add(20);
  ```
  ✅ Fast insertions/removals.

- **LinkedList** – Implements Queue interface.
  ```java
  Queue<String> queue = new LinkedList<>();
  queue.add("Task");
  ```
  ✅ Can function as a queue or list.

- **PriorityQueue** – Implements a min-heap.
  ```java
  PriorityQueue<Integer> pq = new PriorityQueue<>();
  pq.add(10);
  ```
  ✅ Elements are sorted in natural order.

---

## 3. Map
Maps store key-value pairs.

- **HashMap** – Fast key-based retrieval (O(1) lookup).
  ```java
  HashMap<String, Integer> map = new HashMap<>();
  map.put("Alice", 25);
  ```
  ✅ Efficient key-value storage.

- **TreeMap** – Sorted key-value pairs (O(log N) lookup).
  ```java
  TreeMap<String, Integer> treeMap = new TreeMap<>();
  treeMap.put("Bob", 30);
  ```
  ✅ Maintains sorted keys.

---

## 4. Iterator
Iterators allow traversal of collections.

- **ListIterator** – Allows bi-directional traversal.
  ```java
  ListIterator<String> it = list.listIterator();
  while(it.hasNext()) {
      System.out.println(it.next());
  }
  ```
  ✅ Useful for modifying collections during iteration.

---

## 5. Custom Comparator
Comparators define custom sorting logic.
```java
class AgeComparator implements Comparator<Person> {
    public int compare(Person p1, Person p2) {
        return p1.age - p2.age;
    }
}
```
✅ Enables sorting by different criteria.

---

## 6. Common Algorithms
### Sorting
- `Collections.sort(list);`
- `Arrays.sort(array);`
✅ Efficient sorting.

### Max/Min
- `Collections.max(list);`
- `Collections.min(list);`
✅ Finds maximum/minimum values.

### Reversing
- `Collections.reverse(list);`
✅ Reverses order of elements.

### Frequency
- `Collections.frequency(list, element);`
✅ Counts occurrences.

### Binary Search
- `Collections.binarySearch(list, key);`
✅ Efficient search in sorted lists.

### Math Power
- `Math.pow(base, exponent);`
✅ Computes power values.

---
This document provides a comprehensive overview of Java Collections and algorithms with examples.

![Collections-in-Java](https://github.com/user-attachments/assets/b89fd1fd-488f-4725-ab6d-cca9f4354b38)



