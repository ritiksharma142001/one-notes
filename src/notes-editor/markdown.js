/**
 * Markdown helpers for the notes editor: front matter, templates, toolbar
 * actions, smart typing (lists continue, fences close), "Tidy" (the house
 * Markdown style), checks before publishing, and the live preview.
 */
import { Marked } from 'marked';
import DOMPurify from 'dompurify';

// ------------------------------------------------------------ names & paths

export const slugify = (s) =>
  String(s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\+\+/g, 'pp')
    .replace(/#/g, 'sharp')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

export const prettyName = (seg) =>
  seg
    .replace(/\.mdx?$/, '')
    .replace(/^\d+[-_.]/, '')
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');

/** Site URL of a doc (docs/a/b.md → a/b/), following front-matter slug and number prefixes. */
export function docUrl(path, fm) {
  const slug = fmGet(fm || '', 'slug');
  if (slug) return slug.replace(/^\//, '').replace(/\/?$/, '/');
  const parts = path
    .replace(/^docs\//, '')
    .replace(/\.mdx?$/, '')
    .split('/')
    .map((p) => p.replace(/^\d+[-_.]/, ''));
  if (parts[parts.length - 1] === 'index' || parts[parts.length - 1] === 'README') parts.pop();
  return parts.length ? `${parts.join('/')}/` : '';
}

// ------------------------------------------------------------ front matter

export function splitDoc(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n?/.exec(text || '');
  if (!m) return { fm: '', body: text || '' };
  return { fm: m[1], body: (text || '').slice(m[0].length).replace(/^\r?\n/, '') };
}

export const joinDoc = (fm, body) =>
  fm.trim() ? `---\n${fm.trim()}\n---\n\n${body.replace(/^\n+/, '')}` : body;

const unquote = (v) => {
  if (/^".*"$/.test(v)) {
    try {
      return JSON.parse(v);
    } catch {
      return v.slice(1, -1);
    }
  }
  if (/^'.*'$/.test(v)) return v.slice(1, -1).replace(/''/g, "'");
  return v;
};

export function fmGet(fm, key) {
  const m = new RegExp(`^${key}:[ \\t]*(.*)$`, 'm').exec(fm);
  return m ? unquote(m[1].trim()) : '';
}

const yamlValue = (key, v) => {
  if (key === 'sidebar_position' && /^-?\d+(\.\d+)?$/.test(String(v))) return String(v);
  const s = String(v).replace(/\s*\n\s*/g, ' ');
  return /^[\s>|!&*%@`'"#?{[-]|[:#]\s|:$|\s$|^(true|false|null|yes|no|on|off|~|-?\d[\d.]*)$/i.test(s)
    ? JSON.stringify(s)
    : s;
};

/** Sets (or removes, with an empty value) a top-level front-matter key, keeping everything else. */
export function fmSet(fm, key, value) {
  const re = new RegExp(`^${key}:.*(?:\\n(?:[ \\t]+.*))*`, 'm');
  const empty = value === '' || value == null;
  if (re.test(fm)) return empty ? fm.replace(new RegExp(`${re.source}\\n?`, 'm'), '') : fm.replace(re, `${key}: ${yamlValue(key, value)}`);
  if (empty) return fm;
  const line = `${key}: ${yamlValue(key, value)}`;
  if (key === 'title') return fm.trim() ? `${line}\n${fm}` : line;
  return fm.trim() ? `${fm.replace(/\n+$/, '')}\n${line}` : line;
}

/** Plain-Markdown mode: `<` and `{` in text can't break the site build. */
export const isPlainMd = (fm) => /^mdx:\s*\n\s+format:\s*md\b/m.test(fm) || /^format:\s*md\b/m.test(fm);
export const withPlainMd = (fm) => (isPlainMd(fm) ? fm : `${fm.replace(/\n+$/, '')}${fm.trim() ? '\n' : ''}mdx:\n  format: md`);

export function newFrontMatter({ title, description, position }) {
  let fm = '';
  fm = fmSet(fm, 'title', title || 'Untitled');
  if (position !== '' && position != null) fm = fmSet(fm, 'sidebar_position', position);
  fm = fmSet(fm, 'description', description || '');
  return withPlainMd(fm);
}

// ------------------------------------------------------------ templates

export const TEMPLATES = [
  {
    id: 'concept',
    label: 'Concept note',
    hint: 'What it is, why, how it works, example, key points',
    body: (t) => `## What is ${t}?

One or two sentences in plain words.

## Why it matters

-

## How it works

1.

\`\`\`java
// example
\`\`\`

## Key points

-

:::tip Interview tip

What interviewers usually ask about ${t}.

:::
`,
  },
  {
    id: 'qa',
    label: 'Interview Q&A',
    hint: 'Questions with short answers and follow-ups',
    body: () => `## Q1. Question goes here?

**Answer:** Short, direct answer first, then detail.

<details>
<summary>Follow-up</summary>

A likely follow-up question and its answer.

</details>

## Q2. Next question?

**Answer:**
`,
  },
  {
    id: 'cheatsheet',
    label: 'Cheat sheet',
    hint: 'Commands / syntax tables for quick revision',
    body: () => `## Most used

| Command | What it does |
| --- | --- |
| \`example\` | Description |

## Examples

\`\`\`bash
# example
\`\`\`

## Gotchas

-
`,
  },
  {
    id: 'howto',
    label: 'How-to guide',
    hint: 'Steps to get something done',
    body: () => `## Goal

What you'll have at the end.

## Prerequisites

-

## Steps

1.
2.

## Check it works

## Troubleshooting

:::warning Common mistake

:::
`,
  },
  {
    id: 'compare',
    label: 'Comparison',
    hint: 'X vs Y with a table and when to use each',
    body: () => `## At a glance

| | Option A | Option B |
| --- | --- | --- |
| Speed | | |
| Use when | | |

## When to use Option A

## When to use Option B

## Summary
`,
  },
  {
    id: 'diagram',
    label: 'System design',
    hint: 'Requirements, diagram, components, trade-offs',
    body: () => `## Requirements

- Functional:
- Non-functional:

## High-level design

\`\`\`mermaid
flowchart LR
  C[Client] --> LB[Load balancer] --> S[Service] --> DB[(Database)]
\`\`\`

## Components

## Trade-offs

| Choice | Pros | Cons |
| --- | --- | --- |
| | | |
`,
  },
  { id: 'blank', label: 'Blank', hint: 'Just the title', body: () => `## Overview\n\n` },
];

// ------------------------------------------------------------ editing actions
// Each action gets { value, start, end } and returns the text to insert over
// [from, to] plus the new selection — applied with execCommand so Ctrl+Z works.

const lineStart = (v, i) => v.lastIndexOf('\n', i - 1) + 1;
const lineEnd = (v, i) => {
  const n = v.indexOf('\n', i);
  return n < 0 ? v.length : n;
};

export function wrap({ value, start, end }, before, after = before, placeholder = 'text') {
  const sel = value.slice(start, end) || placeholder;
  // Toggle off when already wrapped.
  if (value.slice(start - before.length, start) === before && value.slice(end, end + after.length) === after && end > start)
    return { from: start - before.length, to: end + after.length, text: sel, selStart: start - before.length, selEnd: end - before.length };
  return { from: start, to: end, text: `${before}${sel}${after}`, selStart: start + before.length, selEnd: start + before.length + sel.length };
}

/** Prefix every selected line (toggles; headings replace an existing level). */
export function prefixLines({ value, start, end }, prefix, { heading = false, numbered = false } = {}) {
  const from = lineStart(value, start);
  const to = lineEnd(value, end);
  const lines = value.slice(from, to).split('\n');
  const strip = heading ? /^#{1,6}\s+/ : numbered ? /^\s*\d+[.)]\s+/ : new RegExp(`^${prefix.replace(/[[\]().*+?^$\\|]/g, '\\$&')}`);
  const all = lines.every((l) => (heading ? l.startsWith(prefix) : strip.test(l)) || !l.trim());
  const text = lines
    .map((l, i) => {
      if (!l.trim() && lines.length > 1) return l;
      if (all) return l.replace(strip, '');
      const bare = heading ? l.replace(/^#{1,6}\s+/, '') : l;
      return `${numbered ? `${i + 1}. ` : prefix}${bare}`;
    })
    .join('\n');
  return { from, to, text, selStart: from, selEnd: from + text.length };
}

/** Inserts a block on its own lines with blank lines around it; `cursor` marks where the caret goes. */
export function block({ value, start, end }, snippet) {
  const sel = value.slice(start, end);
  let text = snippet.replace('$SEL', sel);
  const caret = text.indexOf('$|');
  text = text.replace('$|', '');
  const ls = lineStart(value, start);
  const before = value.slice(0, ls).replace(/[ \t]+$/, '');
  const atLineStart = value.slice(ls, start).trim() === '';
  const preNl = !before.length ? '' : before.endsWith('\n\n') ? '' : before.endsWith('\n') ? '\n' : '\n\n';
  const after = value.slice(end);
  const postNl = after.startsWith('\n\n') ? '' : after.startsWith('\n') ? '\n' : '\n\n';
  const from = atLineStart ? ls : start;
  const lead = atLineStart ? preNl : '\n\n';
  const full = `${lead}${text}${postNl}`;
  const pos = from + lead.length + (caret < 0 ? text.length : caret);
  return { from, to: end, text: full, selStart: pos, selEnd: pos };
}

export const SNIPPETS = {
  code: '```$|\n$SEL\n```',
  table: '| Column | Column |\n| --- | --- |\n| $|value | value |',
  mermaid: '```mermaid\nflowchart LR\n  A[Start] --> B[$|Next]\n```',
  details: '<details>\n<summary>$|Click to expand</summary>\n\n$SEL\n\n</details>',
  hr: '---\n$|',
  admonition: (type) => `:::${type}\n\n$|$SEL\n\n:::`,
};

/** Enter / Tab smartness. Returns an edit or null (let the browser handle it). */
export function smartKey(e, { value, start, end }) {
  const ls = lineStart(value, start);
  const line = value.slice(ls, lineEnd(value, start));
  const beforeCaret = value.slice(ls, start);
  const fencesAbove = (value.slice(0, ls).match(/^\s*```/gm) || []).length;
  const inFence = fencesAbove % 2 === 1;

  if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey && start === end) {
    // ``` + Enter → close the fence.
    const fence = /^(\s*)```[\w+-]*\s*$/.exec(line);
    if (fence && !inFence && start === ls + line.length) {
      const rest = value.slice(start);
      const closedLater = (rest.match(/^\s*```\s*$/gm) || []).length % 2 === 1;
      if (!closedLater) return { from: start, to: start, text: `\n${fence[1]}\n${fence[1]}\`\`\``, selStart: start + 1 + fence[1].length, selEnd: start + 1 + fence[1].length };
    }
    if (inFence) {
      const indent = /^\s*/.exec(line)[0];
      return indent ? { from: start, to: start, text: `\n${indent}`, selStart: start + 1 + indent.length, selEnd: start + 1 + indent.length } : null;
    }
    // Lists, task lists, quotes continue; an empty item ends the list.
    const m = /^(\s*)([-*+]|\d+[.)]|>)(\s+)(\[[ xX]\]\s+)?/.exec(line);
    if (m && beforeCaret.length >= m[0].length) {
      const rest = line.slice(m[0].length);
      if (!rest.trim() && start === ls + line.length) return { from: ls, to: ls + line.length, text: '', selStart: ls, selEnd: ls };
      const marker = /^\d+/.test(m[2]) ? `${Number.parseInt(m[2], 10) + 1}${m[2].slice(-1)}` : m[2];
      const ins = `\n${m[1]}${marker}${m[3]}${m[4] ? '[ ] ' : ''}`;
      return { from: start, to: start, text: ins, selStart: start + ins.length, selEnd: start + ins.length };
    }
    // Table row → new row with the same number of cells.
    if (/^\s*\|.*\|\s*$/.test(line) && start === ls + line.length && !/^\s*\|[\s:|-]+\|\s*$/.test(line)) {
      const cells = line.split('|').length - 2;
      const ins = `\n|${'  |'.repeat(cells)}`;
      return { from: start, to: start, text: ins, selStart: start + 3, selEnd: start + 3 };
    }
  }

  if (e.key === 'Tab' && !e.ctrlKey && !e.metaKey && !e.altKey) {
    const from = lineStart(value, start);
    const to = lineEnd(value, end);
    const multi = value.slice(start, end).includes('\n');
    const isList = /^\s*([-*+]|\d+[.)])\s/.test(line);
    if (!multi && !isList && !e.shiftKey) return { from: start, to: end, text: '  ', selStart: start + 2, selEnd: start + 2 };
    const lines = value.slice(from, to).split('\n');
    const text = lines.map((l) => (e.shiftKey ? l.replace(/^ {1,2}/, '') : `  ${l}`)).join('\n');
    const shift = text.length - (to - from);
    return multi
      ? { from, to, text, selStart: from, selEnd: from + text.length }
      : { from, to, text, selStart: Math.max(from, start + (e.shiftKey ? shift : 2)), selEnd: Math.max(from, start + (e.shiftKey ? shift : 2)) };
  }
  return null;
}

// ------------------------------------------------------------ Tidy (house style)

/** Formats Markdown: spacing around headings / lists / code / tables, `-` bullets, `# Heading` spacing, numbered lists, trailing spaces. Code blocks are left alone. */
export function tidy(body) {
  const lines = body.replace(/\r\n?/g, '\n').split('\n');
  const out = [];
  let fence = null;
  let num = [];
  const kind = (l) =>
    /^\s*#{1,6}\s/.test(l) ? 'h' : /^\s*([-*+]|\d+[.)])\s/.test(l) ? 'li' : /^\s*\|/.test(l) ? 'table' : /^\s*>/.test(l) ? 'quote' : /^:::/.test(l) ? 'adm' : !l.trim() ? 'blank' : /^\s+/.test(l) ? 'indent' : 'p';
  const needGap = (prev, cur) =>
    prev !== 'blank' &&
    cur !== 'blank' &&
    ((cur === 'h' || prev === 'h') ||
      (cur === 'fence' || prev === 'fenceEnd') ||
      (cur === 'li' && prev === 'p') ||
      (prev === 'li' && cur === 'p') ||
      (cur === 'table' && prev !== 'table') ||
      (prev === 'table' && cur !== 'table') ||
      cur === 'adm' ||
      prev === 'adm');
  let prev = 'blank';
  for (let raw of lines) {
    if (fence) {
      out.push(raw);
      if (new RegExp(`^\\s*${fence}\\s*$`).test(raw)) {
        fence = null;
        prev = 'fenceEnd';
      }
      continue;
    }
    const f = /^(\s*)(`{3,}|~{3,})(.*)$/.exec(raw);
    if (f) {
      if (needGap(prev, 'fence')) out.push('');
      out.push(`${f[1]}${f[2]}${f[3].trim()}`);
      fence = f[2];
      prev = 'fence';
      continue;
    }
    let l = raw.replace(/[ \t]+$/, (m) => (m === '  ' && raw.trim() ? '  ' : ''));
    l = l.replace(/^(\s*)(#{2,6})(?=[^#\s])/, '$1$2 ').replace(/^(\s*)(#{1,6})\s+(.*?)\s+#+\s*$/, '$1$2 $3');
    l = l.replace(/^(\s*)[*+](\s+)(?!\*)/, '$1-$2');
    if (/^\s*#{1,6}\s/.test(l)) l = l.replace(/\s+$/, '');
    const k = kind(l);
    // Renumber ordered lists per indent level.
    const ol = /^(\s*)(\d+)([.)])(\s+)/.exec(l);
    if (ol) {
      const depth = ol[1].length;
      num = num.filter((n) => n.depth <= depth);
      let cur = num.find((n) => n.depth === depth);
      if (!cur) num.push((cur = { depth, n: Number(ol[2]) - 1 }));
      cur.n += 1;
      l = `${ol[1]}${cur.n}${ol[3]}${ol[4]}${l.slice(ol[0].length)}`;
    } else if (k !== 'li' && k !== 'indent' && k !== 'blank') num = [];
    if (k === 'blank' && prev === 'blank') continue;
    if (needGap(prev, k)) out.push('');
    out.push(l);
    prev = k;
  }
  if (fence) out.push(fence);
  return `${out.join('\n').replace(/^\n+/, '').replace(/\n{3,}/g, '\n\n').replace(/\s*$/, '')}\n`;
}

// ------------------------------------------------------------ checks

/** Problems worth fixing before publishing: { level: 'error'|'warn'|'info', line, text, fix? }. */
export function check(fm, body, { exists } = {}) {
  const out = [];
  if (!fmGet(fm, 'title')) out.push({ level: 'error', line: 0, text: 'Add a title (it’s the page heading and sidebar label).' });
  if (!fmGet(fm, 'description')) out.push({ level: 'info', line: 0, text: 'Add a one-line description — it shows in search results and link previews.' });
  const lines = body.split('\n');
  let fence = null;
  let fenceLine = 0;
  let lastLevel = 1;
  let h1 = 0;
  lines.forEach((l, i) => {
    const n = i + 1;
    const f = /^\s*(`{3,}|~{3,})\s*([\w+-]*)/.exec(l);
    if (f) {
      if (!fence) {
        fence = f[1];
        fenceLine = n;
        if (!f[2]) out.push({ level: 'info', line: n, text: 'Code block without a language — add one (```java, ```bash …) for syntax colours.' });
      } else if (l.trim().startsWith(fence)) fence = null;
      return;
    }
    if (fence) return;
    const h = /^(#{1,6})\s+(.*)/.exec(l);
    if (h) {
      const lv = h[1].length;
      if (lv === 1) {
        h1++;
        if (h1 === 1) out.push({ level: 'warn', line: n, text: 'Use ## for sections — the page title already comes from the Title field.', fix: 'h1' });
      }
      if (lv > lastLevel + 1 && lastLevel > 0) out.push({ level: 'warn', line: n, text: `Heading jumps from level ${lastLevel} to ${lv} — use ${'#'.repeat(lastLevel + 1)} here.` });
      lastLevel = lv;
      if (!h[2].trim()) out.push({ level: 'error', line: n, text: 'Empty heading.' });
    }
    for (const m of l.matchAll(/!\[([^\]]*)\]\(([^)\s]+)/g)) if (!m[1].trim()) out.push({ level: 'info', line: n, text: 'Image without alt text — describe it inside the [ ].' });
    for (const m of l.matchAll(/\]\((?!https?:|mailto:|#|\/)([^)\s#]+\.mdx?)(#[^)]*)?\)/g))
      if (exists && !exists(m[1])) out.push({ level: 'warn', line: n, text: `Link to “${m[1]}” — no such note in this folder (the site build fails on broken links).` });
    if (/^:::\w+/.test(l)) {
      const close = lines.slice(i + 1).findIndex((x) => /^:::\s*$/.test(x));
      if (close < 0) out.push({ level: 'error', line: n, text: 'Callout (:::) is never closed — add a line with just :::.' });
    }
  });
  if (fence) out.push({ level: 'error', line: fenceLine, text: 'Code block is never closed — add ``` on its own line.' });
  if (!isPlainMd(fm)) {
    const prose = body.replace(/(`{3,}|~{3,})[\s\S]*?\1/g, '').replace(/`[^`\n]*`/g, '');
    if (/[{}]|<(?![a-zA-Z/!])|<(?!\/?(details|summary|br|b|i|em|strong|code|kbd|sub|sup|img|a|p|div|span|table|tr|td|th|thead|tbody|ul|ol|li|hr|mark)\b)[a-zA-Z]/.test(prose))
      out.push({ level: 'error', line: 0, text: 'This page is in MDX mode and has { } or < in text, which breaks the site build. Switch it to plain Markdown.', fix: 'plain' });
  }
  return out;
}

// ------------------------------------------------------------ preview

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
let resolveImage = (src) => src;
const md = new Marked({ gfm: true });
md.use({
  walkTokens(t) {
    if (t.type === 'image') t.href = resolveImage(t.href);
  },
  renderer: {
    code(t) {
      if ((t.lang || '').trim() === 'mermaid') return `<pre class="mermaid-src">${esc(t.text)}</pre>`;
      return false;
    },
  },
});

/** Admonitions (:::tip Title … :::) → boxes, then Markdown → sanitised HTML. */
export function renderPreview(body, imageResolver) {
  resolveImage = imageResolver || ((s) => s);
  const src = body.replace(/^:::(note|tip|info|warning|danger|caution|important|success)[ \t]*(.*)\n([\s\S]*?)^:::[ \t]*$/gm, (m, type, title, inner) => {
    const label = title.trim() || type[0].toUpperCase() + type.slice(1);
    return `<div class="admonition admonition-${type}"><div class="admonition-title">${esc(label)}</div>\n\n${inner}\n</div>\n`;
  });
  return DOMPurify.sanitize(md.parse(src));
}
