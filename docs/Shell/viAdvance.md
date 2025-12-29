---
sidebar_position: 6
---


# Vim Advanced Cheat Sheet

---

## Modes (Quick Recap)

| Mode | Key |
|------|-----|
| Normal | `Esc` |
| Insert | `i`, `a`, `o` |
| Visual | `v`, `V`, `Ctrl+v` |
| Command | `:` |

---

## Advanced Navigation

| Command | Action |
|------|------|
| `gg` | Go to first line |
| `G` | Go to last line |
| `H` | Top of screen |
| `M` | Middle of screen |
| `L` | Bottom of screen |
| `Ctrl + d` | Half page down |
| `Ctrl + u` | Half page up |
| `Ctrl + f` | Full page down |
| `Ctrl + b` | Full page up |
| `%` | Jump to matching bracket |

---

## Search & Navigation

| Command | Action |
|------|------|
| `/text` | Search forward |
| `?text` | Search backward |
| `n` | Next result |
| `N` | Previous result |
| `*` | Search word under cursor |
| `#` | Reverse search word |

---

## Replace (Advanced)

| Command | Action |
|------|------|
| `:%s/a/b/g` | Replace all |
| `:%s/a/b/gc` | Replace with confirm |
| `:10,20s/a/b/g` | Replace in line range |
| `:%s/\<word\>/new/g` | Replace whole word |
| `:%s/a/b/gi` | Ignore case |

---

## Visual Mode Power

| Command | Action |
|------|------|
| `v` | Character select |
| `V` | Line select |
| `Ctrl+v` | Block select |
| `>` | Indent |
| `<` | Un-indent |
| `=` | Auto-indent |
| `y` | Copy |
| `d` | Delete |

---

## Editing Power Moves

| Command | Action |
|------|------|
| `ciw` | Change inner word |
| `ci"` | Change inside quotes |
| `di(` | Delete inside parentheses |
| `yi{` | Yank inside `{}` |
| `xp` | Swap characters |
| `J` | Join lines |

---

## Repeat & Undo

| Command | Action |
|------|------|
| `.` | Repeat last command |
| `u` | Undo |
| `Ctrl+r` | Redo |

---

## File & Buffer Management

| Command | Action |
|------|------|
| `:e file` | Open file |
| `:w` | Save |
| `:q` | Quit |
| `:wq` | Save & quit |
| `:ls` | List buffers |
| `:b 2` | Switch buffer |
| `:bd` | Delete buffer |

---

## Split Windows

| Command | Action |
|------|------|
| `:split` | Horizontal split |
| `:vsplit` | Vertical split |
| `Ctrl+w w` | Switch window |
| `Ctrl+w q` | Close window |

---

## Macros

| Command | Action |
|------|------|
| `qa` | Start recording macro `a` |
| `q` | Stop recording |
| `@a` | Run macro |
| `@@` | Repeat last macro |

---

## Registers

| Command | Action |
|------|------|
| `"ay` | Yank to register `a` |
| `"ap` | Paste from register `a` |
| `"+y` | Copy to system clipboard |
| `"+p` | Paste from clipboard |

---

## Productivity Tips

- `.` → repeat last command  
- `ciw` → fastest word edit  
- `:%s/foo/bar/gc` → safe replace  
- `gg=G` → auto-indent file  
- `:noh` → remove search highlight  

---


