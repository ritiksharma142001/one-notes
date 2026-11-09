---
title: HTML
sidebar_position: 1
description: Page skeleton, semantic elements, text, links, images, tables, forms and validation, meta tags for SEO and accessibility basics.
---

## Page skeleton

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Omnifood — healthy meals delivered</title>
  <meta name="description" content="Fresh, healthy meals delivered to your door every day." />
  <link rel="icon" href="/favicon.svg" />
  <link rel="stylesheet" href="/styles.css" />
  <script src="/app.js" defer></script>
</head>
<body>
  ...
</body>
</html>
```

`defer` downloads the script in parallel and runs it after the HTML is parsed (in order). `async` runs as soon as it arrives (order not guaranteed) — fine for analytics.

## Semantic layout

```html
<header>
  <nav aria-label="Main">…</nav>
</header>
<main>
  <article>
    <h1>Post title</h1>
    <section>…</section>
  </article>
  <aside>Related links</aside>
</main>
<footer>© 2026</footer>
```

Semantic tags give **meaning** — screen readers, search engines and your future self understand the page. Use `<div>`/`<span>` only for styling hooks. Exactly **one `<h1>`** per page; don't skip heading levels.

## Text

```html
<p>Paragraph with <strong>importance</strong>, <em>emphasis</em>, <code>code</code>
and <mark>highlight</mark>.</p>
<blockquote cite="https://…">Quote</blockquote>
<ul><li>unordered</li></ul>   <ol start="3"><li>ordered</li></ol>
<dl><dt>Term</dt><dd>Definition</dd></dl>
<time datetime="2026-11-09">9 Nov</time>
<abbr title="HyperText Markup Language">HTML</abbr>
```

## Links & media

```html
<a href="/about">About</a>
<a href="https://github.com/…" target="_blank" rel="noopener noreferrer">GitHub</a>
<a href="mailto:me@example.com">Email</a>   <a href="tel:+919999999999">Call</a>
<a href="#pricing">Jump to pricing</a>
<a href="/resume.pdf" download>Download CV</a>

<img src="hero.webp" alt="Bowl of salad with avocado" width="800" height="600" loading="lazy" />

<picture>
  <source srcset="hero.avif" type="image/avif" />
  <source srcset="hero.webp" type="image/webp" />
  <img src="hero.jpg" alt="…" />
</picture>

<img srcset="small.webp 480w, large.webp 1200w" sizes="(max-width: 600px) 480px, 1200px" src="large.webp" alt="…" />

<video src="demo.mp4" controls muted playsinline poster="poster.jpg"></video>
```

Always set `width` and `height` on images to prevent layout shift (CLS).

## Tables

```html
<table>
  <caption>Monthly plans</caption>
  <thead><tr><th scope="col">Plan</th><th scope="col">Price</th></tr></thead>
  <tbody><tr><th scope="row">Basic</th><td>₹399</td></tr></tbody>
</table>
```

Tables are for **tabular data**, never for layout.

## Forms

```html
<form action="/signup" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required autocomplete="email" />

  <label for="pwd">Password</label>
  <input id="pwd" name="password" type="password" minlength="8" required />

  <label for="city">City</label>
  <select id="city" name="city">
    <option value="">Choose…</option>
    <option>Bengaluru</option>
  </select>

  <fieldset>
    <legend>Plan</legend>
    <label><input type="radio" name="plan" value="basic" checked /> Basic</label>
    <label><input type="radio" name="plan" value="pro" /> Pro</label>
  </fieldset>

  <label><input type="checkbox" name="terms" required /> I agree</label>
  <textarea name="notes" rows="4"></textarea>
  <button type="submit">Create account</button>
</form>
```

Useful input types: `email`, `tel`, `url`, `number`, `date`, `time`, `range`, `color`, `file`, `search`, `password`.
Built-in validation: `required`, `min`, `max`, `minlength`, `maxlength`, `pattern`, `step`. Style with `:invalid` / `:user-invalid`.

:::tip
A `<button>` inside a form defaults to `type="submit"`. Use `type="button"` for buttons that shouldn't submit.
:::

## Handy built-in elements

```html
<details><summary>FAQ question</summary>Answer hidden until clicked.</details>
<dialog id="modal"><form method="dialog"><button>Close</button></form></dialog>
<progress value="70" max="100"></progress>
<input list="langs" /><datalist id="langs"><option>Java</option><option>JavaScript</option></datalist>
```

## SEO & social meta

```html
<link rel="canonical" href="https://example.com/page" />
<meta property="og:title" content="…" />
<meta property="og:description" content="…" />
<meta property="og:image" content="https://example.com/og.png" />
<meta name="twitter:card" content="summary_large_image" />
```

## Accessibility essentials

- Meaningful `alt` text; `alt=""` for decorative images.
- Every form control has a label.
- Use `<button>` for actions and `<a>` for navigation — they're keyboard-accessible for free.
- ARIA only when no native element fits: *"No ARIA is better than bad ARIA."*
- Add a "Skip to content" link for keyboard users.

## Interview quick answers

- **Block vs inline elements?** Block starts on a new line and takes full width (`div`, `p`, `section`); inline flows with text (`span`, `a`, `strong`).
- **`<section>` vs `<article>` vs `<div>`?** Article = self-contained (a post); section = themed group with a heading; div = no meaning.
- **What does `<!doctype html>` do?** Puts the browser in standards mode.
- **`localStorage` vs `sessionStorage` vs cookies?** Persistent per origin vs per tab vs sent to the server with every request.
