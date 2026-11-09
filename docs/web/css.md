---
title: CSS
sidebar_position: 2
description: Selectors and specificity, the box model, Flexbox, Grid, positioning, responsive design, custom properties, transitions and a modern reset.
---

## Selectors

```css
p {}                 /* element */
.card {}             /* class */
#app {}              /* id */
.card p {}           /* descendant */
.card > p {}         /* direct child */
h2 + p {}            /* next sibling */
a[target="_blank"] {}/* attribute */
a:hover, a:focus-visible {}
li:nth-child(odd) {}
li:not(:last-child) {}
.card:has(img) {}    /* parent selector! */
p::first-line {}  .btn::before { content: "→ "; }
```

## Cascade & specificity

Which rule wins? **Importance → specificity → order** (later wins).

| Selector | Specificity |
|---|---|
| `style=""` | 1,0,0,0 |
| `#id` | 0,1,0,0 |
| `.class`, `[attr]`, `:hover` | 0,0,1,0 |
| `div`, `::before` | 0,0,0,1 |
| `*`, `:where()` | 0 |

Keep specificity low (classes only); avoid `!important` and IDs for styling.

## Box model

```css
*, *::before, *::after { box-sizing: border-box; }   /* width includes padding + border */
```

`content → padding → border → margin`. Vertical margins between blocks **collapse** (the larger wins); they don't inside flex/grid containers.

## Units

| Unit | Relative to | Use for |
|---|---|---|
| `px` | — | borders, shadows |
| `rem` | root font size (16px) | font sizes, spacing |
| `em` | current font size | padding that scales with text |
| `%` | parent | widths |
| `vw` / `vh` / `dvh` | viewport | full-screen sections (`dvh` handles mobile toolbars) |
| `ch` | width of "0" | readable line length: `max-width: 65ch` |

`clamp(1.5rem, 4vw, 3rem)` → fluid size with a min and max.

## Flexbox — one dimension

```css
.row {
  display: flex;
  gap: 1rem;
  justify-content: space-between;   /* main axis */
  align-items: center;              /* cross axis */
  flex-wrap: wrap;
}
.row > .grow { flex: 1; }           /* take the remaining space */
.row > .fixed { flex: 0 0 200px; }  /* grow shrink basis */
```

To center a child on both axes with flex: `justify-content: center; align-items: center;` (or use Grid below).

## Grid — two dimensions

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));   /* responsive, no media query */
  gap: 1.5rem;
}

.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-areas:
    "side header"
    "side main";
  min-height: 100dvh;
}
.layout > header { grid-area: header; }
```

**Flex or grid?** Flex for a row/column of items whose size drives the layout; Grid when you define the layout and place items into it.

## Positioning

| `position` | Behaviour |
|---|---|
| `static` | normal flow (default) |
| `relative` | offset from itself; anchor for absolute children |
| `absolute` | removed from flow; placed relative to nearest positioned ancestor |
| `fixed` | relative to the viewport |
| `sticky` | normal until it hits `top: 0`, then sticks |

`z-index` only works on positioned / flex / grid items and inside its **stacking context**.

## Responsive design

```css
/* mobile first: base styles for phones, then grow */
.nav { flex-direction: column; }
@media (min-width: 768px) { .nav { flex-direction: row; } }

/* container queries: respond to the parent's width */
.card-wrap { container-type: inline-size; }
@container (min-width: 400px) { .card { display: flex; } }

@media (prefers-color-scheme: dark) { … }
@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
```

## Custom properties & theming

```css
:root {
  --bg: #fff; --text: #111; --brand: hsl(230 80% 50%);
  --radius: 12px;
}
[data-theme="dark"] { --bg: #0b0d12; --text: #e7e9ee; }
body { background: var(--bg); color: var(--text); }
.btn { background: var(--brand); border-radius: var(--radius); }
.btn:hover { background: color-mix(in oklab, var(--brand), black 15%); }
```

## Transitions & animations

```css
.btn { transition: transform .15s ease, box-shadow .15s ease; }
.btn:hover { transform: translateY(-2px); }

@keyframes fade-in { from { opacity: 0; translate: 0 8px; } }
.toast { animation: fade-in .3s ease-out; }
```

Animate `transform` and `opacity` — they don't trigger layout and stay smooth.

## Modern CSS worth knowing

- **Nesting:** `.card { & h2 { … } &:hover { … } }` — native, no Sass needed.
- `aspect-ratio: 16 / 9;` — responsive media boxes.
- `object-fit: cover;` — crop images to fill.
- `text-wrap: balance;` — nicer headings.
- `scroll-behavior: smooth;` and `scroll-margin-top` for anchor links under a sticky header.
- `@layer reset, base, components;` — control the cascade order.

## A small reset

```css
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
body { line-height: 1.5; -webkit-font-smoothing: antialiased; }
img, picture, video, svg { display: block; max-width: 100%; }
input, button, textarea, select { font: inherit; }
```

## Interview quick answers

- **`display: none` vs `visibility: hidden`?** Removed from layout vs invisible but still takes space.
- **`em` vs `rem`?** Relative to the element's font size vs the root's.
- **What creates a stacking context?** `position` + `z-index`, `opacity < 1`, `transform`, `filter`, `isolation: isolate`…
- **How do you center a div?** `display: grid; place-items: center;` on the parent.
