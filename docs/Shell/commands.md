---
sidebar_position: 2
---

# Commands Shortcut

## Advanced Keyboard Tricks

- `Ctrl + A` — Move cursor to the **beginning** of the line  
- `Ctrl + E` — Move cursor to the **end** of the line  
- `Ctrl + F` — Move **forward** one character  
- `Ctrl + B` — Move **backward** one character  
- `Alt + F` — Move **forward** one word  
- `Alt + B` — Move **backward** one word  
- `Ctrl + L` — **Clear** the screen  


## Text Editing Commands

- `Ctrl + D` — **Delete** the character just after the cursor  
- `Ctrl + T` — **Swap** (transpose) the character just before and after the cursor  
- `Alt + T` — **Swap** the word at the cursor location with the **preceding** word  
- `Alt + L` — Convert the character from the current position to the **end of the word** to **lowercase**  
- `Alt + U` — Same as `Alt + L`, but converts to **UPPERCASE**  


## Cut and Paste (Kill and Yank) Commands

In Linux and Unix-like systems, instead of traditional *cut* and *paste*, we often refer to:
- **Killing** (cutting text),
- **Yanking** (pasting text),
- And the **Kill Ring**, which is a buffer storing killed (cut) text.

### Kill Commands

- `Ctrl + K` — Kill text from the **cursor** location to the **end of the line**  
- `Ctrl + U` — Kill text from the **cursor** location to the **beginning of the line**  
- `Alt + D` — Kill text from the **cursor** to the **end of the current word**  
- `Alt + Backspace` — Kill text from the **cursor** to the **beginning of the current word**  
  - If the cursor is at the **beginning** of a word, it kills the **previous** word  

### Yank (Paste) Command

- `Ctrl + Y` — Yank (paste) the **last killed text** from the kill ring and insert it at the cursor location  


## Command Line History

- `history` — Show the list of previously executed commands  
- `history -c` — **Clear** the command history  
