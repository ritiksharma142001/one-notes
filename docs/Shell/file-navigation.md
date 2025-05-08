---
sidebar_position: 1
---

# File Navigation


## File System Navigation & Directory Shortcuts

### Special Symbols

- `/` — **Root directory**  
  - The **top level** of the entire file system  
  - Think of it as the **front door** of the house

- `~` — **Home directory**  
  - Your personal workspace  
  - Like your **bedroom** in the house

- `./` — **Current directory**  
  - Refers to where you are **right now** in the file system

### Commands

- `cd /` — Go to the **root** directory  
- `ls -l` — List files and directories in **long** format  
- `cd ~` — Go to your **home** directory  
- `ls -l` — List contents of the current (home) directory in long format

### Path Examples & Analogies

- `/kitchen/fridge` — Start at the **root**, go to the `kitchen`, and look for the `fridge`  
- `./fridge` — If you're **already in the kitchen**, just look for the `fridge` in your current location  

### Tip

Avoid starting paths with `/` unless the folder **actually exists in the root directory**. Otherwise, prefer `./` or relative paths from your current location.
