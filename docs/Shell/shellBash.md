---
sidebar_position: 5
---

# Shell vs Bash

## Shell
- **Shell** is a program that acts as an interface between you and the Linux OS.  
- It takes your commands and tells the **kernel** what to do.  
- There are many types of shells.

### Examples of shells:
- `sh` (Bourne Shell)  
- `bash` (Bourne Again Shell)  
- `zsh`  
- `fish`  
- `ksh`  

**Think of Shell as a category.**

---

## Bash (Bourne Again Shell)
- **Bash** is one type of shell.  
- It is the **most commonly used shell in Linux**.  
- Default shell in most Linux distributions (Ubuntu, Debian, etc.).  
- Has more features than older shells.

**Think of Bash as a specific shell inside the shell family.**

---

## Difference Table

| Feature | Shell | Bash |
|------|------|------|
| Meaning | Interface to OS | A type of shell |
| Type | General concept | Specific implementation |
| Examples | `sh`, `bash`, `zsh`, `fish` | `bash` only |
| Default in Linux | Depends on distro | Usually default |
| Script support | Basic | Advanced (arrays, loops, history) |
| File | `/bin/sh` | `/bin/bash` |

---

## Simple Analogy

- **Shell = Vehicle**  
- **Bash = Car**

*(A car is a type of vehicle, just like Bash is a type of shell.)*

---

## Check what shell you are using

```bash
echo $SHELL
```

```bash
ps -p $$
```

## To see all available shells on your system

```
cat /etc/shells
```