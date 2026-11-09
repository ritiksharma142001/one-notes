---
title: Tailwind CSS
sidebar_position: 3
description: Utility-first styling with Tailwind v4 — setup, the class cheat sheet, responsive and state variants, dark mode, theming and keeping markup tidy.
---

Tailwind gives you small single-purpose classes (`flex`, `p-4`, `text-sm`) that you compose in markup. Only the classes you use end up in the CSS.

## Setup (Tailwind v4 + Vite)

```bash
npm i tailwindcss @tailwindcss/vite
```

```js
// vite.config.js
import tailwindcss from "@tailwindcss/vite";
export default { plugins: [tailwindcss()] };
```

```css
/* src/index.css */
@import "tailwindcss";

@theme {
  --color-brand: oklch(0.55 0.2 260);
  --font-display: "Inter", sans-serif;
}
```

v4 needs no `tailwind.config.js` — theme tokens live in CSS with `@theme`, and become classes like `bg-brand`, `font-display`.

## Cheat sheet

| Need | Classes |
|---|---|
| Layout | `flex` `grid` `block` `hidden` `container` `mx-auto` |
| Flex | `items-center` `justify-between` `gap-4` `flex-col` `flex-1` `flex-wrap` `shrink-0` |
| Grid | `grid-cols-3` `col-span-2` `grid-cols-[200px_1fr]` |
| Spacing | `p-4` `px-6` `py-2` `m-2` `mt-8` `space-y-4` (1 unit = 0.25rem) |
| Size | `w-full` `w-64` `max-w-prose` `h-screen` `min-h-dvh` `size-10` |
| Text | `text-sm` … `text-5xl` `font-semibold` `leading-tight` `tracking-wide` `truncate` `line-clamp-3` |
| Colour | `text-gray-700` `bg-white` `bg-brand/10` (10% opacity) `border-gray-200` |
| Border | `border` `border-2` `rounded-lg` `rounded-full` `ring-2 ring-brand` `divide-y` |
| Effects | `shadow-md` `opacity-50` `blur-sm` `backdrop-blur` |
| Position | `relative` `absolute` `inset-0` `top-4` `sticky top-0` `z-10` |
| Motion | `transition` `duration-200` `ease-out` `hover:-translate-y-0.5` `animate-spin` |

Arbitrary values when the scale doesn't fit: `w-[37rem]`, `bg-[#0f172a]`, `top-[117px]`.

## Variants

```html
<button class="bg-brand text-white px-4 py-2 rounded-lg
               hover:bg-brand/90 focus-visible:ring-2 focus-visible:ring-offset-2
               active:scale-95 disabled:opacity-50">
  Save
</button>
```

- **Responsive (mobile-first):** `sm:` 640px, `md:` 768px, `lg:` 1024px, `xl:` 1280px.
  `class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"`
- **State:** `hover:` `focus:` `focus-visible:` `active:` `disabled:` `invalid:` `first:` `last:` `odd:`
- **Parent/sibling state:** add `group` / `peer` → `group-hover:underline`, `peer-checked:bg-brand`
- **Dark mode:** `dark:bg-gray-900 dark:text-gray-100`

### Class-based dark mode in v4

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Then toggle `document.documentElement.classList.toggle("dark")`.

## A card component

```html
<article class="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm
                transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
  <img src="…" alt="…" class="aspect-video w-full rounded-xl object-cover" />
  <h3 class="mt-4 text-lg font-semibold group-hover:text-brand">Second Brain</h3>
  <p class="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">A writing and publishing platform…</p>
  <div class="mt-4 flex flex-wrap gap-2">
    <span class="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand">Next.js</span>
  </div>
</article>
```

## Keeping markup tidy

- Extract **components** (React/Vue), not CSS classes — the component is the abstraction.
- Merge conditional classes with `clsx` + `tailwind-merge`:

```js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...c) => twMerge(clsx(c));

<button className={cn("px-4 py-2", primary && "bg-brand text-white", className)} />
```

- Install the **Prettier plugin** (`prettier-plugin-tailwindcss`) to sort classes automatically.
- Use `@apply` sparingly (e.g. styling third-party HTML or markdown).

:::warning Dynamic class names
Tailwind scans source files as text. `bg-${color}-500` won't be generated — write the full class names (`color === "red" ? "bg-red-500" : "bg-blue-500"`).
:::

## Tailwind vs plain CSS

| Tailwind | Plain CSS / Modules |
|---|---|
| Fast to build, consistent spacing and colour scale | Clean markup, full control |
| No naming, no dead CSS | Better for complex, unique designs |
| Long class lists | Need discipline to avoid bloat |
