---
title: Frontend interview questions
sidebar_position: 2
description: Frequently asked HTML, CSS, JavaScript, React and browser questions with crisp answers and small code examples.
---

## JavaScript

<details>
<summary><b>Explain closures with a real use.</b></summary>

A function keeps access to variables from the scope where it was defined. Used for data privacy, factories, memoisation, debounce/throttle and React hooks.

```js
const makeId = (prefix) => { let n = 0; return () => `${prefix}-${++n}`; };
const nextUser = makeId("user"); nextUser(); // "user-1"
```
</details>

<details>
<summary><b>What does this print?</b></summary>

```js
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));
// 3 3 3 — one shared `var i`.  With `let i` → 0 1 2 (new binding per iteration)
```
</details>

<details>
<summary><b>Event loop: order of logs?</b></summary>

Synchronous code → all **microtasks** (promise callbacks) → one **macrotask** (setTimeout, events) → microtasks again… → [Event loop](../javascript/essentials.md#the-event-loop)
</details>

<details>
<summary><b>Debounce vs throttle?</b></summary>

Debounce: run once after the events **stop** for N ms (search box). Throttle: run at most once every N ms **while** events continue (scroll, resize).
</details>

<details>
<summary><b>Event bubbling, capturing and delegation?</b></summary>

Events travel down (capture) then up (bubble). **Delegation** = one listener on a parent handles events from many children via `event.target.closest(...)`. `stopPropagation()` stops the travel; `preventDefault()` stops the browser's default action.
</details>

<details>
<summary><b>Prototypal inheritance?</b></summary>

Every object has a hidden link (`[[Prototype]]`) to another object; property lookups walk this chain. `class` syntax is sugar over it.
</details>

<details>
<summary><b>Implement <code>Promise.all</code>.</b></summary>

```js
function all(promises) {
  return new Promise((resolve, reject) => {
    const results = []; let done = 0;
    if (promises.length === 0) return resolve(results);
    promises.forEach((p, i) =>
      Promise.resolve(p).then(v => {
        results[i] = v;
        if (++done === promises.length) resolve(results);
      }, reject));
  });
}
```
</details>

<details>
<summary><b>Deep clone an object?</b></summary>

`structuredClone(obj)` (handles Dates, Maps, cycles). `JSON.parse(JSON.stringify(obj))` loses functions, `undefined`, Dates and fails on cycles.
</details>

## React

<details>
<summary><b>What triggers a re-render?</b></summary>

State change, parent re-render, or a consumed context changing. Props changing is **not** required. → [Performance](../react/performance.md)
</details>

<details>
<summary><b>useEffect vs useLayoutEffect?</b></summary>

`useEffect` runs after paint (non-blocking) — almost always what you want. `useLayoutEffect` runs before paint — only for measuring the DOM to avoid flicker.
</details>

<details>
<summary><b>useMemo vs useCallback vs React.memo?</b></summary>

`useMemo` caches a computed value, `useCallback` caches a function, `React.memo` skips re-rendering a component when its props are shallow-equal. → [Hooks](../react/hooks.md#usememo--usecallback)
</details>

<details>
<summary><b>Why not use the array index as a key?</b></summary>

If items are inserted, removed or reordered, the index points to a different item, so React reuses the wrong component state/DOM (e.g. inputs keep the wrong text).
</details>

<details>
<summary><b>How do you manage global state?</b></summary>

Server data → TanStack Query. Small global UI state (theme, user) → Context. Larger client state → Zustand or Redux Toolkit. Keep most state local.
</details>

<details>
<summary><b>SSR vs CSR vs SSG?</b></summary>

CSR: browser renders everything from JS (slow first paint, poor SEO). SSR: server renders HTML per request (fast first paint, fresh data). SSG: HTML built at deploy time (fastest, static content). Next.js mixes all three per page.
</details>

## HTML & CSS

<details>
<summary><b>How do you center an element?</b></summary>

Parent: `display: grid; place-items: center;` — or flex with `justify-content` + `align-items: center`.
</details>

<details>
<summary><b>Flexbox vs Grid?</b></summary>

Flexbox: one dimension, content-driven. Grid: two dimensions, layout-driven. → [CSS](../web/css.md)
</details>

<details>
<summary><b>What is specificity?</b></summary>

The weight that decides which rule wins: inline > id > class/attribute/pseudo-class > element. Equal weight → the later rule wins.
</details>

<details>
<summary><b>How do you make a site responsive?</b></summary>

Mobile-first CSS, fluid units (`%`, `rem`, `clamp`), flex/grid with `auto-fill/minmax`, media and container queries, responsive images (`srcset`), and the viewport meta tag.
</details>

## Browser & web

<details>
<summary><b>localStorage vs sessionStorage vs cookies?</b></summary>

localStorage: persistent, ~5 MB, JS only. sessionStorage: per tab, cleared on close. Cookies: small (~4 KB), sent with every request, can be `HttpOnly` — best for auth sessions.
</details>

<details>
<summary><b>What is CORS?</b></summary>

A browser rule that blocks reading cross-origin responses unless the server sends `Access-Control-Allow-Origin`. → [Networks](../cs-fundamentals/networks.md#cors)
</details>

<details>
<summary><b>XSS vs CSRF?</b></summary>

XSS: attacker's script runs on your page — escape output, sanitise HTML, use CSP, `HttpOnly` cookies. CSRF: another site makes the user's browser send an authenticated request — `SameSite` cookies and CSRF tokens.
</details>

<details>
<summary><b>How do you improve page performance?</b></summary>

Measure with Lighthouse / Core Web Vitals (LCP, INP, CLS). Then: compress and size images, lazy-load below the fold, code-split, cache static assets with long `max-age`, use a CDN, preload key fonts, avoid layout shift with fixed dimensions.
</details>
