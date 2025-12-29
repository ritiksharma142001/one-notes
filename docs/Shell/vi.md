---
sidebar_position: 3
---

# Vim

---

## Starting & Exiting

| Command | Action |
|------|------|
| `vi file.txt` | Open file |
| `:q` | Quit |
| `:q!` | Quit without saving |
| `:w` | Save |
| `:wq` / `:x` | Save & quit |
| `ZZ` | Save & quit (fast) |

---

## Modes in VI

| Mode | Description |
|------|-------------|
| **Normal** | Default mode (navigation & commands) |
| **Insert** | Type text |
| **Visual** | Select text |
| **Command** | Run commands (`:`) |

### Switch modes:
- `i` → Insert mode  
- `Esc` → Normal mode  
- `v` → Visual mode  
- `:` → Command mode  

---

## Insert Mode Commands

| Command | Action |
|------|------|
| `i` | Insert before cursor |
| `I` | Insert at line start |
| `a` | Insert after cursor |
| `A` | Insert at end of line |
| `o` | New line below |
| `O` | New line above |

---

## Cursor Movement

| Key | Action |
|----|-------|
| `h` | Left |
| `l` | Right |
| `j` | Down |
| `k` | Up |
| `w` | Next word |
| `b` | Previous word |
| `0` | Line start |
| `$` | Line end |
| `gg` | First line |
| `G` | Last line |
| `:n` | Go to line n |

---

## Editing & Deleting

| Command | Action |
|------|------|
| `x` | Delete character |
| `dd` | Delete line |
| `dw` | Delete word |
| `D` | Delete till end of line |
| `yy` | Copy line |
| `yw` | Copy word |
| `p` | Paste after |
| `P` | Paste before |
| `u` | Undo |
| `Ctrl + r` | Redo |

---

## Search & Replace

| Command | Action |
|------|------|
| `/word` | Search forward |
| `?word` | Search backward |
| `n` | Next match |
| `N` | Previous match |

### Replace:
`:%s/old/new/gc` → replaces **all occurrences** of `old` with `new` **in the entire file**, asking for **confirmation before each change**  
(`:` = command mode, `%` = whole file, `s` = substitute, `g` = global, `c` = confirm).


---

## Visual Mode (Selection)

| Command | Action |
|------|------|
| `v` | Character select |
| `V` | Line select |
| `Ctrl + v` | Block select |
| `y` | Copy selection |
| `d` | Delete selection |

---

## File Operations

| Command | Action |
|------|------|
| `:e file` | Open file |
| `:w file` | Save as |
| `:r file` | Insert file content |
| `:!ls` | Run shell command |

---

## Useful Commands

| Command | Action |
|------|------|
| `:set number` | Show line numbers |
| `:set nonumber` | Hide line numbers |
| `:syntax on` | Enable syntax highlight |
| `:syntax off` | Disable syntax |

---

## Power Tips

- `.` → Repeat last command  
- `5dd` → Delete 5 lines  
- `3yy` → Copy 3 lines  
- `%` → Jump to matching bracket  
- `J` → Join lines  

---

## Memory Trick

- **d** → delete  
- **y** → yank (copy)  
- **p** → paste  
- **i** → insert  
- **Esc** → normal mode  

---

## Quick Summary

- `i` → insert  
- `Esc` → normal  
- `:wq` → save & quit  
- `dd` → delete line  
- `yy` → copy line  

---



