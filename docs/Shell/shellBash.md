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

## `.bashrc` vs `.bash_profile`

1. `.bash_profile` runs **once when you log in** to your system.  
2. `.bashrc` runs **every time you open a new terminal**.  
3. `.bash_profile` is used for **login setup and environment variables**.  
4. `.bashrc` is used for **aliases, shortcuts, and terminal behavior**.  
5. Usually, `.bash_profile` loads `.bashrc` using `source ~/.bashrc`.


## `source` vs `.` (dot)

1. `source` and `.` do the **same thing** — they run a file in the **current shell**.  
2. `source file.sh` and `. file.sh` are **completely equivalent**.  
3. Changes (variables, aliases) remain active after execution.  
4. `source` is more readable; `.` is shorter and POSIX-standard.  
5. Example:  
   ```bash
   source ~/.bashrc
   . ~/.bashrc
6. `source` is a bash built-in command.
7. The file must be readable.
    ```bash
    chmod +r file.sh
    ```
