/**
 * One Notes editor: write or edit notes in the browser and publish them to
 * the GitHub repo (docs/…), which rebuilds the site. Folders and sub-folders,
 * templates, smart Markdown typing, Tidy, checks, live preview with callouts
 * and diagrams, pasted images, drafts saved in the browser, move / rename /
 * delete — each save is one commit.
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';
import { BRANCH, GitHub, OWNER, REPO, REPO_URL, SIGN_IN_URL, fileToBase64, tokenStore } from './github';
import * as M from './markdown';
import s from './editor.module.css';

const DRAFT_PREFIX = 'one-notes.draft:';
const OPEN_KEY = 'one-notes.editor.open';
const VIEW_KEY = 'one-notes.editor.view';
const local = {
  get(k) {
    try {
      return JSON.parse(localStorage.getItem(k) || 'null');
    } catch {
      return null;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {
      /* storage full or blocked */
    }
  },
  del(k) {
    try {
      localStorage.removeItem(k);
    } catch {
      /* ignore */
    }
  },
};
const RAW = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/`;
const SLUG_OK = /^[a-z0-9][a-z0-9-]*$/;
const folderOf = (path) => path.replace(/^docs\/?/, '').split('/').slice(0, -1).join('/');
const fileSlug = (path) => path.split('/').pop().replace(/\.mdx?$/, '');
const notePath = (folder, slug) => `docs/${folder ? `${folder}/` : ''}${slug}.md`;

// ---------------------------------------------------------------- small UI pieces

function Modal({ title, onClose, children, wide }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  return (
    <div className={s.overlay} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`${s.modal} ${wide ? s.modalWide : ''}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className={s.modalHead}>
          <h3>{title}</h3>
          <button type="button" className={s.iconBtn} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function FolderSelect({ folders, value, onChange, labelOf, id }) {
  return (
    <select id={id} className={s.input} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">(top level)</option>
      {folders.map((f) => (
        <option key={f} value={f}>
          {'  '.repeat(f.split('/').length - 1)}
          {labelOf(f)} — {f}
        </option>
      ))}
    </select>
  );
}

// ---------------------------------------------------------------- sign in

function SignIn({ onToken, onGuest, error }) {
  const [token, setToken] = useState('');
  const [remember, setRemember] = useState(true);
  return (
    <div className={s.signin}>
      <h2>Write &amp; publish notes</h2>
      <p>
        Anyone can sign in with their GitHub account. Your changes are sent to <a href={REPO_URL}>{OWNER}/{REPO}</a> as a
        suggestion (a pull request) for the owner to review; once accepted, the site updates itself.
      </p>
      <div className={s.row}>
        <a className="button button--primary" href={SIGN_IN_URL}>
          Sign in with GitHub
        </a>
        <button type="button" className="button button--secondary" onClick={onGuest}>
          Continue without signing in
        </button>
      </div>
      {error && <p className={s.error}>{error}</p>}
      <p className={s.muted}>
        No GitHub account? <a href="https://github.com/signup" target="_blank" rel="noreferrer">Create one free</a>. Without
        signing in you can still write notes, preview them and download the .md file.
      </p>
      <details className={s.help}>
        <summary>Use a token instead</summary>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (token.trim()) onToken(token.trim(), remember);
          }}
        >
          <label className={s.label} htmlFor="gh-token">
            GitHub token
          </label>
          <input
            id="gh-token"
            className={s.input}
            type="password"
            autoComplete="off"
            spellCheck={false}
            placeholder="github_pat_… or ghp_…"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <label className={s.check}>
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember on this
            device
          </label>
          <div className={s.row}>
            <button type="submit" className="button button--secondary" disabled={!token.trim()}>
              Sign in with token
            </button>
          </div>
        </form>
        <p className={s.muted}>
          A token from{' '}
          <a href="https://github.com/settings/tokens/new?scopes=public_repo&description=One%20Notes%20editor" target="_blank" rel="noreferrer">
            GitHub → Tokens
          </a>{' '}
          with the <code>public_repo</code> scope works. It stays in this browser and is only sent to api.github.com.
        </p>
      </details>
    </div>
  );
}

// ---------------------------------------------------------------- preview

function Preview({ title, body, resolveImage }) {
  const ref = useRef(null);
  const { colorMode } = useColorMode();
  const html = useMemo(() => M.renderPreview(body, resolveImage), [body, resolveImage]);
  useEffect(() => {
    const el = ref.current;
    const blocks = el ? [...el.querySelectorAll('pre.mermaid-src')] : [];
    if (!blocks.length) return undefined;
    let alive = true;
    const t = setTimeout(async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({ startOnLoad: false, theme: colorMode === 'dark' ? 'dark' : 'default', securityLevel: 'strict' });
        for (const [i, b] of blocks.entries()) {
          if (!alive) return;
          try {
            const { svg } = await mermaid.render(`mmd-${Date.now()}-${i}`, b.textContent || '');
            if (alive && b.isConnected) {
              const div = document.createElement('div');
              div.className = s.mermaid;
              div.innerHTML = svg;
              b.replaceWith(div);
            }
          } catch (err) {
            b.dataset.error = String(err && err.message ? err.message : err).split('\n')[0];
          }
        }
      } catch {
        /* diagram library unavailable: the code stays visible */
      }
    }, 250);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [html, colorMode]);
  return (
    <div className={`${s.preview} markdown`} ref={ref}>
      <h1>{title || 'Untitled'}</h1>
      {/* Sanitised with DOMPurify in renderPreview. */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

// ---------------------------------------------------------------- tree

function buildTree(folders, files) {
  const root = { name: '', path: '', folders: new Map(), files: [] };
  const node = (path) => {
    let n = root;
    if (!path) return n;
    let acc = '';
    for (const part of path.split('/')) {
      acc = acc ? `${acc}/${part}` : part;
      if (!n.folders.has(part)) n.folders.set(part, { name: part, path: acc, folders: new Map(), files: [] });
      n = n.folders.get(part);
    }
    return n;
  };
  folders.forEach(node);
  files.forEach((f) => node(folderOf(f)).files.push(f));
  return root;
}

function Tree({ node, depth, ctx }) {
  const { open, toggle, labelOf, posOf, active, onOpen, onNewNote, onNewFolder, filter, pending } = ctx;
  const sub = [...node.folders.values()].sort((a, b) => posOf(a.path) - posOf(b.path) || labelOf(a.path).localeCompare(labelOf(b.path)));
  const files = [...node.files].sort((a, b) => a.localeCompare(b));
  const q = filter.trim().toLowerCase();
  const matches = (p) => !q || p.toLowerCase().includes(q) || M.prettyName(fileSlug(p)).toLowerCase().includes(q);
  const hasMatch = (n) => n.files.some(matches) || [...n.folders.values()].some(hasMatch) || (q && labelOf(n.path).toLowerCase().includes(q));
  return (
    <ul className={s.tree} role={depth ? 'group' : 'tree'}>
      {sub.filter(hasMatch).map((f) => {
        const isOpen = q ? true : open.has(f.path);
        return (
          <li key={f.path} role="treeitem" aria-expanded={isOpen}>
            <div className={s.treeRow} style={{ paddingLeft: `${depth * 0.85 + 0.35}rem` }}>
              <button type="button" className={s.treeFolder} onClick={() => toggle(f.path)} title={`docs/${f.path}`}>
                <span className={s.caret}>{isOpen ? '▾' : '▸'}</span>
                <span className={s.folderIcon}>{isOpen ? '📂' : '📁'}</span>
                <span className={s.treeLabel}>{labelOf(f.path)}</span>
                {pending.has(f.path) && <span className={s.badge}>new</span>}
              </button>
              <span className={s.treeActions}>
                <button type="button" className={s.miniBtn} onClick={() => onNewNote(f.path)} title="New note here" aria-label={`New note in ${labelOf(f.path)}`}>
                  +
                </button>
                <button type="button" className={s.miniBtn} onClick={() => onNewFolder(f.path)} title="New sub-folder" aria-label={`New sub-folder in ${labelOf(f.path)}`}>
                  ⊞
                </button>
              </span>
            </div>
            {isOpen && <Tree node={f} depth={depth + 1} ctx={ctx} />}
          </li>
        );
      })}
      {files.filter(matches).map((p) => (
        <li key={p} role="treeitem">
          <button
            type="button"
            className={`${s.treeFile} ${active === p ? s.treeActive : ''}`}
            style={{ paddingLeft: `${depth * 0.85 + 1.55}rem` }}
            onClick={() => onOpen(p)}
            title={p}
          >
            <span className={s.fileIcon}>📄</span>
            <span className={s.treeLabel}>{M.prettyName(fileSlug(p))}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------- the editor

export default function Editor() {
  const siteBase = useBaseUrl('/');
  const [token, setToken] = useState(() => tokenStore.get());
  const [guest, setGuest] = useState(false);
  const gh = useMemo(() => (token ? new GitHub(token) : null), [token]);
  const [me, setMe] = useState(null);
  const [authError, setAuthError] = useState('');
  const [snap, setSnap] = useState(null);
  const [cats, setCats] = useState({});
  const [loading, setLoading] = useState(false);
  const [doc, setDoc] = useState(null);
  const [pendingFolders, setPendingFolders] = useState([]);
  const [images, setImages] = useState({});
  const [view, setView] = useState(() => local.get(VIEW_KEY) || 'split');
  const [dialog, setDialog] = useState(null);
  const [busy, setBusy] = useState('');
  const [deploy, setDeploy] = useState(null);
  const [toast, setToast] = useState('');
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(() => new Set(local.get(OPEN_KEY) || []));
  const [navOpen, setNavOpen] = useState(false);
  const [showChecks, setShowChecks] = useState(false);
  const ta = useRef(null);
  const fileInput = useRef(null);

  const flash = useCallback((msg) => {
    setToast(msg);
    window.clearTimeout(flash.t);
    flash.t = window.setTimeout(() => setToast(''), 3500);
  }, []);

  // Back from "Sign in with GitHub": the token arrives in the address's
  // #fragment (never sent to a server). Keep it and clean the address bar.
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const query = new URLSearchParams(window.location.search);
    const t = hash.get('gh_token');
    const err = query.get('error');
    if (!t && !err) return;
    if (t) {
      tokenStore.set(t, true);
      setToken(t);
      setGuest(false);
    }
    if (err)
      setAuthError(
        {
          state: 'Sign-in took too long or was opened in another tab. Please try again.',
          github: 'GitHub didn’t complete the sign-in. Please try again.',
          'not-configured': 'GitHub sign-in isn’t available right now. Use a token instead.',
        }[err] || 'Sign-in failed. Please try again.',
      );
    query.delete('error');
    const q = query.toString();
    window.history.replaceState(null, '', window.location.pathname + (q ? `?${q}` : ''));
  }, []);

  useEffect(() => local.set(VIEW_KEY, view), [view]);
  useEffect(() => local.set(OPEN_KEY, [...open]), [open]);

  // ------------------------------------------------------------ GitHub data

  const loadSnapshot = useCallback(
    async (commitSha) => {
      if (!gh) return null;
      const sn = await gh.snapshot(commitSha);
      setSnap(sn);
      const catFiles = sn.entries.filter((e) => e.type === 'blob' && /^docs\/(.+\/)?_category_\.json$/.test(e.path));
      const loaded = await Promise.all(
        catFiles.map(async (e) => {
          try {
            return [e.path.replace(/^docs\//, '').replace(/\/?_category_\.json$/, ''), JSON.parse(await gh.readBlob(e.sha))];
          } catch {
            return null;
          }
        }),
      );
      setCats(Object.fromEntries(loaded.filter(Boolean)));
      return sn;
    },
    [gh],
  );

  useEffect(() => {
    if (!gh) return;
    let alive = true;
    setLoading(true);
    gh.check()
      .then(async (who) => {
        if (!alive) return;
        setMe(who);
        setAuthError('');
        await loadSnapshot();
      })
      .catch((e) => {
        if (!alive) return;
        setAuthError(e.message);
        if (e.status === 401) {
          tokenStore.clear();
          setToken('');
        }
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [gh, loadSnapshot]);

  const entries = snap ? snap.entries : [];
  const files = useMemo(() => entries.filter((e) => e.type === 'blob' && /^docs\/.*\.mdx?$/.test(e.path) && !/\/_[^/]*$/.test(e.path)).map((e) => e.path), [entries]);
  const existingFolders = useMemo(() => entries.filter((e) => e.type === 'tree' && e.path.startsWith('docs/')).map((e) => e.path.slice(5)), [entries]);
  const pendingSet = useMemo(() => new Set(pendingFolders.map((f) => f.path)), [pendingFolders]);
  const folders = useMemo(() => [...new Set([...existingFolders, ...pendingFolders.map((f) => f.path)])].sort(), [existingFolders, pendingFolders]);
  const labelOf = useCallback(
    (path) => (cats[path] && cats[path].label) || (pendingFolders.find((f) => f.path === path) || {}).label || M.prettyName(path.split('/').pop() || 'Notes'),
    [cats, pendingFolders],
  );
  const posOf = useCallback((path) => (cats[path] && typeof cats[path].position === 'number' ? cats[path].position : 999), [cats]);
  const tree = useMemo(() => buildTree(folders, files), [folders, files]);

  // ------------------------------------------------------------ the open note

  const text = doc ? M.joinDoc(doc.fm, doc.body) : '';
  const target = doc ? notePath(doc.folder, doc.slug) : '';
  const moved = Boolean(doc && doc.path && doc.path !== target);
  const dirty = Boolean(doc && (text !== doc.baseText || moved || !doc.path));
  const title = doc ? M.fmGet(doc.fm, 'title') : '';

  const exists = useCallback(
    (rel) => {
      if (!doc) return true;
      const parts = `${doc.folder}/${rel}`.split('/').filter(Boolean);
      const stack = [];
      for (const p of parts) {
        if (p === '..') stack.pop();
        else if (p !== '.') stack.push(p);
      }
      return files.includes(`docs/${stack.join('/')}`) || !snap;
    },
    [doc, files, snap],
  );
  const problems = useMemo(() => (doc ? M.check(doc.fm, doc.body, { exists }) : []), [doc, exists]);

  // Drafts: saved in this browser while typing.
  useEffect(() => {
    if (!doc || !dirty) return undefined;
    const t = setTimeout(() => {
      local.set(DRAFT_PREFIX + (doc.path || 'new'), { text, base: doc.sha || null, folder: doc.folder, slug: doc.slug, at: Date.now() });
    }, 600);
    return () => clearTimeout(t);
  }, [doc, dirty, text]);

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const setUrl = (path) => {
    const u = new URL(window.location.href);
    if (path) u.searchParams.set('path', path);
    else u.searchParams.delete('path');
    u.searchParams.delete('new');
    window.history.replaceState(null, '', u);
  };

  const confirmLeave = () => !dirty || window.confirm('You have unpublished changes in this note. Leave it? (A draft stays saved in this browser.)');

  const openNote = useCallback(
    async (path) => {
      if (doc && doc.path === path) return;
      if (!confirmLeave()) return;
      setBusy('Opening…');
      try {
        const entry = entries.find((e) => e.path === path);
        let raw;
        if (gh && entry) raw = await gh.readBlob(entry.sha);
        else {
          const r = await fetch(`${RAW}${path.split('/').map(encodeURIComponent).join('/')}`, { cache: 'no-store' });
          if (!r.ok) throw new Error(`Couldn’t load ${path}`);
          raw = await r.text();
        }
        const { fm, body } = M.splitDoc(raw);
        const draft = local.get(DRAFT_PREFIX + path);
        setDoc({
          path,
          sha: entry ? entry.sha : null,
          folder: folderOf(path),
          slug: fileSlug(path),
          fm,
          body,
          baseText: M.joinDoc(fm, body),
          draft: draft && draft.text !== M.joinDoc(fm, body) ? draft : null,
          slugTouched: true,
        });
        setUrl(path);
        setNavOpen(false);
        const parts = folderOf(path).split('/');
        setOpen((o) => {
          const n = new Set(o);
          parts.forEach((_, i) => n.add(parts.slice(0, i + 1).join('/')));
          return n;
        });
      } catch (e) {
        flash(e.message);
      } finally {
        setBusy('');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [doc, entries, gh, dirty],
  );

  // ?path=docs/… opens that note (the "Edit this page" link on every note).
  const wanted = useRef(typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('path') : null);
  useEffect(() => {
    const p = wanted.current;
    if (!p || (gh && !snap)) return;
    if (!gh && !guest) return;
    wanted.current = null;
    openNote(p.startsWith('docs/') ? p : `docs/${p}`);
  }, [gh, guest, snap, openNote]);

  const newNote = ({ title: t, folder, slug, template, description, position }) => {
    const tpl = M.TEMPLATES.find((x) => x.id === template) || M.TEMPLATES[0];
    const fm = M.newFrontMatter({ title: t, description, position });
    const body = tpl.body(t || 'this');
    setDoc({ path: null, sha: null, folder, slug, fm, body, baseText: '', draft: null, slugTouched: Boolean(slug) });
    setUrl(null);
    setDialog(null);
    setNavOpen(false);
    setTimeout(() => ta.current && ta.current.focus(), 50);
  };

  const update = (patch) => setDoc((d) => ({ ...d, ...patch }));
  const setFm = (key, value) =>
    setDoc((d) => {
      const fm = M.fmSet(d.fm, key, value);
      const next = { ...d, fm };
      if (key === 'title' && !d.path && !d.slugTouched) next.slug = M.slugify(value);
      return next;
    });

  // ------------------------------------------------------------ editing

  const apply = (edit) => {
    const el = ta.current;
    if (!edit || !el) return;
    el.focus();
    el.setSelectionRange(edit.from, edit.to);
    let ok = false;
    try {
      ok = edit.text ? document.execCommand('insertText', false, edit.text) : edit.from === edit.to || document.execCommand('delete');
    } catch {
      ok = false;
    }
    if (!ok) {
      el.setRangeText(edit.text, edit.from, edit.to, 'end');
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }
    el.setSelectionRange(edit.selStart, edit.selEnd);
  };
  const sel = () => {
    const el = ta.current;
    return { value: el.value, start: el.selectionStart, end: el.selectionEnd };
  };
  const act = {
    h2: () => apply(M.prefixLines(sel(), '## ', { heading: true })),
    h3: () => apply(M.prefixLines(sel(), '### ', { heading: true })),
    bold: () => apply(M.wrap(sel(), '**', '**', 'bold text')),
    italic: () => apply(M.wrap(sel(), '_', '_', 'italic text')),
    strike: () => apply(M.wrap(sel(), '~~', '~~', 'text')),
    code: () => apply(M.wrap(sel(), '`', '`', 'code')),
    link: () => {
      const cur = sel();
      const picked = cur.value.slice(cur.start, cur.end);
      const url = /^https?:\/\//.test(picked) ? picked : 'https://';
      const label = url === picked ? 'link text' : picked || 'link text';
      const t = `[${label}](${url})`;
      const urlStart = cur.start + label.length + 3;
      apply({ from: cur.start, to: cur.end, text: t, selStart: url === picked ? cur.start + 1 : urlStart, selEnd: url === picked ? cur.start + 1 + label.length : urlStart + url.length });
    },
    ul: () => apply(M.prefixLines(sel(), '- ')),
    ol: () => apply(M.prefixLines(sel(), '', { numbered: true })),
    task: () => apply(M.prefixLines(sel(), '- [ ] ')),
    quote: () => apply(M.prefixLines(sel(), '> ')),
    codeblock: () => apply(M.block(sel(), M.SNIPPETS.code)),
    table: () => apply(M.block(sel(), M.SNIPPETS.table)),
    mermaid: () => apply(M.block(sel(), M.SNIPPETS.mermaid)),
    details: () => apply(M.block(sel(), M.SNIPPETS.details)),
    hr: () => apply(M.block(sel(), M.SNIPPETS.hr)),
    callout: (type) => apply(M.block(sel(), M.SNIPPETS.admonition(type))),
    tidy: () => {
      const el = ta.current;
      const next = M.tidy(el.value);
      if (next === el.value) return flash('Already tidy ✓');
      apply({ from: 0, to: el.value.length, text: next, selStart: Math.min(el.selectionStart, next.length), selEnd: Math.min(el.selectionStart, next.length) });
      flash('Tidied: spacing, bullets, numbering and headings');
    },
  };

  const addImages = async (fileList) => {
    const imgs = [...fileList].filter((f) => f.type.startsWith('image/'));
    if (!imgs.length) return false;
    for (const f of imgs) {
      if (f.size > 5 * 1024 * 1024) {
        flash(`${f.name} is over 5 MB — please shrink it first.`);
        continue;
      }
      const ext = (f.name.match(/\.(png|jpe?g|gif|webp|svg)$/i) || [, f.type.split('/')[1] || 'png'])[1].toLowerCase().replace('jpeg', 'jpg').replace('svg+xml', 'svg');
      const base = M.slugify(f.name.replace(/\.[^.]+$/, '')) || 'image';
      const name = `${base}-${Date.now().toString(36)}.${ext}`;
      const repoPath = `static/img/notes/${doc.folder || 'misc'}/${name}`;
      const base64 = await fileToBase64(f);
      setImages((m) => ({ ...m, [repoPath]: { base64, dataUrl: `data:${f.type};base64,${base64}` } }));
      const alt = M.prettyName(base) || 'Image';
      const cur = sel();
      apply({ from: cur.start, to: cur.end, text: `![${alt}](/${repoPath.replace(/^static\//, '')})`, selStart: cur.start + 2, selEnd: cur.start + 2 + alt.length });
    }
    return true;
  };

  const onKeyDown = (e) => {
    const mod = e.ctrlKey || e.metaKey;
    if (mod && !e.shiftKey && !e.altKey) {
      const k = e.key.toLowerCase();
      const map = { b: act.bold, i: act.italic, k: act.link, e: act.code };
      if (map[k]) {
        e.preventDefault();
        map[k]();
        return;
      }
    }
    if (e.shiftKey && e.altKey && (e.key === 'F' || e.key === 'f')) {
      e.preventDefault();
      act.tidy();
      return;
    }
    const edit = M.smartKey(e, sel());
    if (edit) {
      e.preventDefault();
      apply(edit);
    }
  };

  const onPaste = async (e) => {
    const cd = e.clipboardData;
    if (cd && cd.files && cd.files.length && [...cd.files].some((f) => f.type.startsWith('image/'))) {
      e.preventDefault();
      await addImages(cd.files);
      return;
    }
    const pasted = cd ? cd.getData('text/plain') : '';
    const cur = sel();
    if (/^https?:\/\/\S+$/.test(pasted.trim()) && cur.end > cur.start) {
      e.preventDefault();
      const label = cur.value.slice(cur.start, cur.end);
      apply({ from: cur.start, to: cur.end, text: `[${label}](${pasted.trim()})`, selStart: cur.start, selEnd: cur.start + label.length + pasted.trim().length + 4 });
    }
  };

  // Ctrl+S anywhere on the page → publish dialog.
  useEffect(() => {
    const k = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (doc) setDialog({ type: gh ? 'save' : 'download' });
      }
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [doc, gh]);

  const resolveImage = useCallback(
    (src) => {
      if (/^(https?:|data:)/.test(src)) return src;
      if (src.startsWith('/')) {
        const repoPath = `static${src}`;
        return images[repoPath] ? images[repoPath].dataUrl : `${RAW}${repoPath}`;
      }
      const folder = doc ? doc.folder : '';
      return `${RAW}docs/${folder ? `${folder}/` : ''}${src.replace(/^\.\//, '')}`;
    },
    [images, doc],
  );

  // ------------------------------------------------------------ publish

  const saveProblems = () => {
    const out = [];
    if (!title.trim()) out.push('Add a title.');
    if (!SLUG_OK.test(doc.slug)) out.push('File name: lowercase letters, numbers and dashes only (e.g. spring-security).');
    if (doc.folder && doc.slug === doc.folder.split('/').pop()) out.push('A note can’t have the same name as its folder — it would replace the folder’s overview page.');
    if ((!doc.path || moved) && files.includes(target)) out.push(`${target} already exists — pick another file name.`);
    if (problems.some((p) => p.fix === 'plain')) out.push('Switch this page to plain Markdown (see Checks) — otherwise the site build fails.');
    return out;
  };

  const categoryFile = (folder) => {
    const pf = pendingFolders.find((f) => f.path === folder);
    const top = !folder.includes('/');
    const siblings = folders.filter((f) => folderOf(`docs/${f}/x`) !== folder && f.split('/').length === folder.split('/').length && f.split('/').slice(0, -1).join('/') === folder.split('/').slice(0, -1).join('/'));
    const position = pf && pf.position ? Number(pf.position) : siblings.length + 1;
    const json = top
      ? { label: pf.label, position, link: { type: 'generated-index', ...(pf.description ? { description: pf.description } : {}), slug: `/${folder}` } }
      : { label: pf.label, position, ...(pf.description ? { link: { type: 'generated-index', description: pf.description } } : {}) };
    return { path: `docs/${folder}/_category_.json`, text: `${JSON.stringify(json, null, 2)}\n` };
  };

  /** Folder left with only its _category_.json after removing `gone` → delete that too. */
  const emptiedFolders = (gone) => {
    const out = [];
    let folder = folderOf(gone);
    const removed = new Set([gone]);
    while (folder) {
      const prefix = `docs/${folder}/`;
      const left = entries.filter((e) => e.type === 'blob' && e.path.startsWith(prefix) && !removed.has(e.path) && e.path !== `${prefix}_category_.json`);
      const keepsTarget = target.startsWith(prefix) && removed.size === 1 && moved;
      if (left.length || keepsTarget) break;
      const cat = `${prefix}_category_.json`;
      if (entries.some((e) => e.path === cat)) {
        out.push({ path: cat, delete: true });
        removed.add(cat);
      }
      folder = folder.split('/').slice(0, -1).join('/');
    }
    return out;
  };

  const plannedChanges = () => {
    const changes = [];
    // New folders on the way to this note.
    const parts = doc.folder ? doc.folder.split('/') : [];
    parts.forEach((_, i) => {
      const f = parts.slice(0, i + 1).join('/');
      if (pendingSet.has(f) && !existingFolders.includes(f)) changes.push(categoryFile(f));
    });
    for (const [path, img] of Object.entries(images)) if (doc.body.includes(`/${path.replace(/^static\//, '')}`)) changes.push({ path, base64: img.base64 });
    changes.push({ path: target, text: `${text.replace(/\s*$/, '')}\n` });
    if (moved) changes.push({ path: doc.path, delete: true }, ...emptiedFolders(doc.path));
    return changes;
  };

  const pollDeploy = useCallback(
    (sha, pageUrl) => {
      setDeploy({ sha, state: 'running', pageUrl, url: `${REPO_URL}/actions` });
      let tries = 0;
      const tick = async () => {
        tries++;
        try {
          const run = await gh.deployRun(sha);
          if (run && run.status === 'completed') {
            setDeploy({ sha, state: run.conclusion === 'success' ? 'live' : 'failed', pageUrl, url: run.url });
            return;
          }
          if (run) setDeploy((d) => (d && d.sha === sha ? { ...d, url: run.url } : d));
        } catch (e) {
          if (e.status === 403 || e.status === 404) {
            setDeploy({ sha, state: 'unknown', pageUrl, url: `${REPO_URL}/actions` });
            return;
          }
        }
        if (tries < 60) setTimeout(tick, 8000);
        else setDeploy((d) => (d && d.sha === sha ? { ...d, state: 'unknown' } : d));
      };
      setTimeout(tick, 6000);
    },
    [gh],
  );

  const publish = async (message) => {
    const blockers = saveProblems();
    if (blockers.length) return flash(blockers[0]);
    setBusy('Publishing…');
    try {
      // Changed on GitHub since it was opened?
      if (doc.path) {
        const fresh = await gh.snapshot();
        const now = fresh.entries.find((e) => e.path === doc.path);
        if (now && doc.sha && now.sha !== doc.sha && !window.confirm('This note was changed on GitHub after you opened it. Publish anyway and replace that version?')) {
          setBusy('');
          return;
        }
      }
      const changes = plannedChanges();
      if (!canPush) {
        const pr = await gh.propose(changes, message, prBody(), setBusy);
        local.del(DRAFT_PREFIX + (doc.path || 'new'));
        local.del(DRAFT_PREFIX + target);
        setDoc((d) => ({ ...d, baseText: M.joinDoc(d.fm, d.body), draft: null }));
        setDialog(null);
        setDeploy({ state: 'pr', url: pr.url, sha: `pr-${pr.number}` });
        flash(`Sent for review ✓ (pull request #${pr.number})`);
        return;
      }
      const sha = await gh.commit(changes, message);
      const sn = await loadSnapshot(sha);
      const entry = sn.entries.find((e) => e.path === target);
      local.del(DRAFT_PREFIX + (doc.path || 'new'));
      local.del(DRAFT_PREFIX + target);
      const used = new Set(changes.map((c) => c.path));
      setImages((m) => Object.fromEntries(Object.entries(m).filter(([p]) => !used.has(p))));
      setPendingFolders((pf) => pf.filter((f) => !used.has(`docs/${f.path}/_category_.json`)));
      setDoc((d) => ({ ...d, path: target, sha: entry ? entry.sha : null, baseText: M.joinDoc(d.fm, d.body), draft: null, slugTouched: true }));
      setUrl(target);
      setDialog(null);
      flash('Published to GitHub ✓ — the site is rebuilding');
      pollDeploy(sha, `${window.location.origin}${siteBase}${M.docUrl(target, doc.fm)}`);
    } catch (e) {
      flash(e.message || 'Publishing failed');
    } finally {
      setBusy('');
    }
  };

  const remove = async () => {
    setBusy('Deleting…');
    try {
      if (!canPush) {
        const pr = await gh.propose([{ path: doc.path, delete: true }, ...emptiedFolders(doc.path)], `Delete notes: ${title || fileSlug(doc.path)}`, prBody(), setBusy);
        setDialog(null);
        setDeploy({ state: 'pr', url: pr.url, sha: `pr-${pr.number}` });
        flash(`Deletion sent for review ✓ (pull request #${pr.number})`);
        return;
      }
      const sha = await gh.commit([{ path: doc.path, delete: true }, ...emptiedFolders(doc.path)], `Delete notes: ${title || fileSlug(doc.path)}`);
      await loadSnapshot(sha);
      local.del(DRAFT_PREFIX + doc.path);
      setDoc(null);
      setUrl(null);
      setDialog(null);
      flash('Deleted — the site is rebuilding');
      pollDeploy(sha, null);
    } catch (e) {
      flash(e.message);
    } finally {
      setBusy('');
    }
  };

  /** Owner (or a collaborator) publishes directly; everyone else suggests. */
  const canPush = Boolean(me && me.canPush);
  const prBody = () =>
    `Suggested from the [One Notes editor](${window.location.origin}${siteBase}editor/) by @${me ? me.login : 'someone'}.\n\nPage: \`${target || (doc && doc.path) || ''}\``;

  const download = () => {
    const blob = new Blob([`${text.replace(/\s*$/, '')}\n`], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${doc.slug || 'note'}.md`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  const signOut = () => {
    if (!confirmLeave()) return;
    tokenStore.clear();
    setToken('');
    setMe(null);
    setSnap(null);
    setDoc(null);
  };

  // ------------------------------------------------------------ render

  if (!gh && !guest)
    return (
      <div className={s.page}>
        <SignIn
          error={authError}
          onToken={(t, remember) => {
            tokenStore.set(t, remember);
            setAuthError('');
            setToken(t);
          }}
          onGuest={() => setGuest(true)}
        />
      </div>
    );

  const counts = problems.reduce((c, p) => ({ ...c, [p.level]: (c[p.level] || 0) + 1 }), {});
  const ctx = {
    open,
    toggle: (p) =>
      setOpen((o) => {
        const n = new Set(o);
        if (n.has(p)) n.delete(p);
        else n.add(p);
        return n;
      }),
    labelOf,
    posOf,
    active: doc && doc.path,
    onOpen: openNote,
    onNewNote: (folder) => confirmLeave() && setDialog({ type: 'new', folder }),
    onNewFolder: (parent) => setDialog({ type: 'folder', parent }),
    filter,
    pending: pendingSet,
  };

  return (
    <div className={s.page}>
      <div className={s.app}>
        {/* ---------------- sidebar */}
        <aside className={`${s.side} ${navOpen ? s.sideOpen : ''}`} aria-label="Notes">
          <div className={s.sideHead}>
            <button type="button" className="button button--primary button--sm" onClick={() => confirmLeave() && setDialog({ type: 'new', folder: doc ? doc.folder : '' })}>
              + New note
            </button>
            <button type="button" className="button button--secondary button--sm" onClick={() => setDialog({ type: 'folder', parent: doc ? doc.folder : '' })}>
              + Folder
            </button>
          </div>
          <input className={`${s.input} ${s.search}`} placeholder="Filter notes…" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter notes" />
          <div className={s.treeWrap}>
            {gh ? (
              loading && !snap ? (
                <p className={s.muted}>Loading notes from GitHub…</p>
              ) : (
                <Tree node={tree} depth={0} ctx={ctx} />
              )
            ) : (
              <p className={s.muted}>
                Writing without signing in: preview and download .md files.{' '}
                <button type="button" className={s.linkBtn} onClick={() => setGuest(false)}>
                  Sign in
                </button>{' '}
                to browse, edit and publish notes.
              </p>
            )}
          </div>
          <div className={s.sideFoot}>
            {me ? (
              <>
                <img src={me.avatar} alt="" width="22" height="22" />
                <span>{me.login}</span>
                <button type="button" className={s.linkBtn} onClick={signOut}>
                  Sign out
                </button>
              </>
            ) : (
              <span className={s.muted}>Guest</span>
            )}
          </div>
        </aside>
        {navOpen && <div className={s.scrim} onClick={() => setNavOpen(false)} aria-hidden="true" />}

        {/* ---------------- main */}
        <main className={s.main}>
          {!doc ? (
            <div className={s.empty}>
              <button type="button" className={`${s.iconBtn} ${s.navToggle}`} onClick={() => setNavOpen(true)} aria-label="Show notes">
                ☰ Notes
              </button>
              <h2>What do you want to write?</h2>
              <div className={s.cards}>
                <button type="button" className={s.card} onClick={() => setDialog({ type: 'new', folder: '' })}>
                  <b>📝 New note</b>
                  <span>Pick a folder and a template — concept, Q&amp;A, cheat sheet, how-to…</span>
                </button>
                <button type="button" className={s.card} onClick={() => setDialog({ type: 'folder', parent: '' })}>
                  <b>📁 New folder</b>
                  <span>A new section or sub-section in the sidebar.</span>
                </button>
                <button type="button" className={s.card} onClick={() => (gh ? setNavOpen(true) : setGuest(false))}>
                  <b>✏️ Edit a note</b>
                  <span>{gh ? 'Pick any note in the list — or use “Edit this page” on the site.' : 'Sign in to edit existing notes.'}</span>
                </button>
              </div>
              <p className={s.muted}>
                Shortcuts: <kbd>Ctrl</kbd>+<kbd>B</kbd> bold · <kbd>Ctrl</kbd>+<kbd>I</kbd> italic · <kbd>Ctrl</kbd>+<kbd>K</kbd> link ·{' '}
                <kbd>Ctrl</kbd>+<kbd>E</kbd> code · <kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>F</kbd> tidy · <kbd>Ctrl</kbd>+<kbd>S</kbd> publish. Lists, task lists
                and code blocks continue by themselves when you press Enter.
              </p>
              {deploy && <DeployChip deploy={deploy} />}
            </div>
          ) : (
            <>
              {/* note details */}
              <div className={s.meta}>
                <button type="button" className={`${s.iconBtn} ${s.navToggle}`} onClick={() => setNavOpen(true)} aria-label="Show notes">
                  ☰
                </button>
                <input className={`${s.input} ${s.titleInput}`} value={title} onChange={(e) => setFm('title', e.target.value)} placeholder="Title" aria-label="Title" />
                <div className={s.actions}>
                  {dirty ? <span className={s.unsaved}>{doc.path ? 'Unpublished changes' : 'New — not published'}</span> : <span className={s.saved}>Published</span>}
                  {gh ? (
                    <button type="button" className="button button--primary button--sm" onClick={() => setDialog({ type: 'save' })} disabled={!!busy || (!dirty && !!doc.path)}>
                      {busy || (canPush ? 'Publish' : 'Suggest changes')}
                    </button>
                  ) : (
                    <button type="button" className="button button--primary button--sm" onClick={download}>
                      Download .md
                    </button>
                  )}
                  <details className={s.more}>
                    <summary className={s.iconBtn} aria-label="More">
                      ⋯
                    </summary>
                    <div className={s.menu}>
                      <button type="button" onClick={download}>
                        Download .md
                      </button>
                      <button type="button" onClick={() => navigator.clipboard && navigator.clipboard.writeText(text).then(() => flash('Markdown copied'))}>
                        Copy Markdown
                      </button>
                      {doc.path && (
                        <a href={`${REPO_URL}/blob/${BRANCH}/${doc.path}`} target="_blank" rel="noreferrer">
                          Open on GitHub
                        </a>
                      )}
                      {doc.path && (
                        <a href={`${siteBase}${M.docUrl(doc.path, doc.fm)}`} target="_blank" rel="noreferrer">
                          View on the site
                        </a>
                      )}
                      {gh && doc.path && (
                        <button type="button" className={s.danger} onClick={() => setDialog({ type: 'delete' })}>
                          Delete note…
                        </button>
                      )}
                    </div>
                  </details>
                </div>
              </div>
              <div className={s.meta2}>
                <label>
                  <span>Folder</span>
                  <FolderSelect folders={folders} value={doc.folder} onChange={(v) => update({ folder: v })} labelOf={labelOf} />
                </label>
                <label>
                  <span>File name</span>
                  <span className={s.slugWrap}>
                    <input
                      className={s.input}
                      value={doc.slug}
                      onChange={(e) => update({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'), slugTouched: true })}
                      aria-invalid={!SLUG_OK.test(doc.slug)}
                    />
                    <i>.md</i>
                  </span>
                </label>
                <label className={s.grow}>
                  <span>Description</span>
                  <input className={s.input} value={M.fmGet(doc.fm, 'description')} onChange={(e) => setFm('description', e.target.value)} placeholder="One line for search results and link previews" />
                </label>
                <label className={s.narrow}>
                  <span>Order</span>
                  <input className={s.input} type="number" min="0" value={M.fmGet(doc.fm, 'sidebar_position')} onChange={(e) => setFm('sidebar_position', e.target.value)} title="Position in the sidebar (smaller = higher)" />
                </label>
              </div>
              {moved && (
                <p className={s.notice}>
                  Will move <code>{doc.path}</code> → <code>{target}</code> when you publish.
                </p>
              )}
              {doc.draft && (
                <p className={s.notice}>
                  You have an unpublished draft of this note from {new Date(doc.draft.at).toLocaleString()}.{' '}
                  <button
                    type="button"
                    className={s.linkBtn}
                    onClick={() => {
                      const { fm, body } = M.splitDoc(doc.draft.text);
                      update({ fm, body, folder: doc.draft.folder ?? doc.folder, slug: doc.draft.slug || doc.slug, draft: null });
                    }}
                  >
                    Restore draft
                  </button>{' '}
                  ·{' '}
                  <button
                    type="button"
                    className={s.linkBtn}
                    onClick={() => {
                      local.del(DRAFT_PREFIX + doc.path);
                      update({ draft: null });
                    }}
                  >
                    Discard
                  </button>
                </p>
              )}

              {/* toolbar */}
              <div className={s.toolbar} role="toolbar" aria-label="Formatting">
                <button type="button" onClick={act.h2} title="Section heading (##)">
                  H2
                </button>
                <button type="button" onClick={act.h3} title="Sub-heading (###)">
                  H3
                </button>
                <span className={s.sep} />
                <button type="button" onClick={act.bold} title="Bold (Ctrl+B)">
                  <b>B</b>
                </button>
                <button type="button" onClick={act.italic} title="Italic (Ctrl+I)">
                  <i>I</i>
                </button>
                <button type="button" onClick={act.strike} title="Strikethrough">
                  <s>S</s>
                </button>
                <button type="button" onClick={act.code} title="Inline code (Ctrl+E)">
                  {'</>'}
                </button>
                <button type="button" onClick={act.link} title="Link (Ctrl+K) — or paste a URL over selected text">
                  🔗
                </button>
                <button type="button" onClick={() => fileInput.current && fileInput.current.click()} title="Image — or paste / drop one into the editor">
                  🖼
                </button>
                <span className={s.sep} />
                <button type="button" onClick={act.ul} title="Bullet list">
                  •≡
                </button>
                <button type="button" onClick={act.ol} title="Numbered list">
                  1.
                </button>
                <button type="button" onClick={act.task} title="Checklist">
                  ☑
                </button>
                <button type="button" onClick={act.quote} title="Quote">
                  ❝
                </button>
                <span className={s.sep} />
                <button type="button" onClick={act.codeblock} title="Code block — type the language after ```">
                  {'{ }'}
                </button>
                <button type="button" onClick={act.table} title="Table">
                  ▦
                </button>
                <select
                  className={s.calloutSel}
                  value=""
                  onChange={(e) => {
                    if (e.target.value) act.callout(e.target.value);
                  }}
                  title="Callout box"
                  aria-label="Insert callout"
                >
                  <option value="">Callout…</option>
                  <option value="note">📝 Note</option>
                  <option value="tip">💡 Tip</option>
                  <option value="info">ℹ️ Info</option>
                  <option value="warning">⚠️ Warning</option>
                  <option value="danger">🔥 Danger</option>
                </select>
                <button type="button" onClick={act.details} title="Collapsible section">
                  ▸≡
                </button>
                <button type="button" onClick={act.mermaid} title="Diagram (Mermaid)">
                  ⧉
                </button>
                <button type="button" onClick={act.hr} title="Divider">
                  ―
                </button>
                <span className={s.sep} />
                <button type="button" onClick={act.tidy} title="Tidy Markdown (Shift+Alt+F)">
                  ✨ Tidy
                </button>
                <span className={s.spacer} />
                <button
                  type="button"
                  className={`${s.checks} ${counts.error ? s.checksErr : counts.warn ? s.checksWarn : ''}`}
                  onClick={() => setShowChecks((v) => !v)}
                  aria-pressed={showChecks}
                  title="Checks before publishing"
                >
                  {counts.error ? `✕ ${counts.error}` : counts.warn ? `⚠ ${counts.warn}` : '✓'} Checks
                </button>
                <span className={s.seg} role="group" aria-label="View">
                  {['write', 'split', 'preview'].map((v) => (
                    <button key={v} type="button" className={view === v ? s.segOn : ''} onClick={() => setView(v)} aria-pressed={view === v}>
                      {v[0].toUpperCase() + v.slice(1)}
                    </button>
                  ))}
                </span>
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={(e) => {
                    addImages(e.target.files);
                    e.target.value = '';
                  }}
                />
              </div>

              {showChecks && (
                <ul className={s.problems}>
                  {problems.length === 0 && <li className={s.ok}>✓ Looks good — ready to publish.</li>}
                  {problems.map((p, i) => (
                    <li key={i} className={s[p.level]}>
                      <span>{p.level === 'error' ? '✕' : p.level === 'warn' ? '⚠' : 'ℹ'}</span>
                      {p.line ? (
                        <button
                          type="button"
                          className={s.linkBtn}
                          onClick={() => {
                            const el = ta.current;
                            if (!el) return;
                            const lines = el.value.split('\n');
                            const pos = lines.slice(0, p.line - 1).join('\n').length + (p.line > 1 ? 1 : 0);
                            el.focus();
                            el.setSelectionRange(pos, pos + (lines[p.line - 1] || '').length);
                          }}
                        >
                          Line {p.line}
                        </button>
                      ) : null}{' '}
                      {p.text}
                      {p.fix === 'plain' && (
                        <button type="button" className={s.fixBtn} onClick={() => update({ fm: M.withPlainMd(doc.fm) })}>
                          Switch to plain Markdown
                        </button>
                      )}
                      {p.fix === 'h1' && (
                        <button type="button" className={s.fixBtn} onClick={() => update({ body: doc.body.replace(/^(#{1,5})(\s)/gm, (m, h, sp, off) => (doc.body.slice(0, off).split(/^```/m).length % 2 ? `#${h}${sp}` : m)) })}>
                          Shift all headings down one level
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              <div className={`${s.panes} ${s[`view_${view}`]}`}>
                <textarea
                  ref={ta}
                  className={s.textarea}
                  value={doc.body}
                  onChange={(e) => update({ body: e.target.value })}
                  onKeyDown={onKeyDown}
                  onPaste={onPaste}
                  onDragOver={(e) => e.dataTransfer && [...e.dataTransfer.items].some((i) => i.kind === 'file') && e.preventDefault()}
                  onDrop={(e) => {
                    if (e.dataTransfer && e.dataTransfer.files.length) {
                      e.preventDefault();
                      addImages(e.dataTransfer.files);
                    }
                  }}
                  spellCheck
                  aria-label="Note (Markdown)"
                  placeholder="Write in Markdown…  ## Heading,  - list,  ```java code```,  :::tip callout"
                />
                <Preview title={title} body={doc.body} resolveImage={resolveImage} />
              </div>
              {deploy && <DeployChip deploy={deploy} />}
            </>
          )}
        </main>
      </div>

      {busy && busy !== 'Publishing…' && <div className={s.busy}>{busy}</div>}
      {toast && (
        <div className={s.toast} role="status">
          {toast}
        </div>
      )}

      {dialog && dialog.type === 'new' && (
        <NewNoteDialog
          folders={folders}
          labelOf={labelOf}
          initialFolder={dialog.folder || ''}
          files={files}
          onClose={() => setDialog(null)}
          onCreate={newNote}
          onNewFolder={() => setDialog({ type: 'folder', parent: dialog.folder || '' })}
        />
      )}
      {dialog && dialog.type === 'folder' && (
        <NewFolderDialog
          folders={folders}
          labelOf={labelOf}
          parent={dialog.parent || ''}
          onClose={() => setDialog(null)}
          onCreate={(f) => {
            setPendingFolders((pf) => [...pf.filter((x) => x.path !== f.path), f]);
            setOpen((o) => new Set([...o, ...f.path.split('/').map((_, i, a) => a.slice(0, i + 1).join('/'))]));
            flash('Folder added — it appears on the site once its first note is published');
            setDialog({ type: 'new', folder: f.path });
          }}
        />
      )}
      {dialog && dialog.type === 'save' && doc && (
        <SaveDialog
          doc={doc}
          title={title}
          moved={moved}
          target={target}
          changes={plannedChanges()}
          blockers={saveProblems()}
          problems={problems}
          busy={!!busy}
          canPush={canPush}
          onClose={() => setDialog(null)}
          onPublish={publish}
        />
      )}
      {dialog && dialog.type === 'download' && doc && (
        <Modal title="Save this note" onClose={() => setDialog(null)}>
          <p>You’re not signed in, so the note can’t be published from here. Download the Markdown file, or sign in to publish it to GitHub.</p>
          <div className={s.row}>
            <button type="button" className="button button--primary" onClick={download}>
              Download .md
            </button>
            <button type="button" className="button button--secondary" onClick={() => setGuest(false)}>
              Sign in
            </button>
          </div>
        </Modal>
      )}
      {dialog && dialog.type === 'delete' && doc && (
        <Modal title="Delete this note?" onClose={() => setDialog(null)}>
          {canPush ? (
            <p>
              <code>{doc.path}</code> will be removed from GitHub and the site. You can still recover it from the repository’s
              history.
            </p>
          ) : (
            <p>
              A request to remove <code>{doc.path}</code> is sent to the owner for review. Nothing is deleted unless they accept
              it.
            </p>
          )}
          <div className={s.row}>
            <button type="button" className="button button--danger" onClick={remove} disabled={!!busy}>
              {busy || (canPush ? 'Delete' : 'Suggest deletion')}
            </button>
            <button type="button" className="button button--secondary" onClick={() => setDialog(null)}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- dialogs

function DeployChip({ deploy }) {
  const label = {
    running: '⏳ Site rebuilding… (about 2 min)',
    live: '✅ Live on the site',
    failed: '❌ Site build failed — open the log',
    unknown: 'ℹ️ Published — check GitHub Actions for the rebuild',
    pr: '📨 Sent for review — open your pull request',
  }[deploy.state];
  return (
    <div className={`${s.deploy} ${s[`deploy_${deploy.state}`]}`}>
      <a href={deploy.url} target="_blank" rel="noreferrer">
        {label}
      </a>
      {deploy.state === 'live' && deploy.pageUrl && (
        <a href={deploy.pageUrl} target="_blank" rel="noreferrer">
          Open the page →
        </a>
      )}
    </div>
  );
}

function NewNoteDialog({ folders, labelOf, initialFolder, files, onClose, onCreate, onNewFolder }) {
  const [title, setTitle] = useState('');
  const [folder, setFolder] = useState(initialFolder);
  const [slug, setSlug] = useState('');
  const [touched, setTouched] = useState(false);
  const [template, setTemplate] = useState('concept');
  const [description, setDescription] = useState('');
  const finalSlug = touched ? slug : M.slugify(title);
  const path = notePath(folder, finalSlug || 'file-name');
  const taken = files.includes(path);
  const sameAsFolder = folder && finalSlug === folder.split('/').pop();
  const siblings = files.filter((f) => folderOf(f) === folder).length + folders.filter((f) => f.split('/').slice(0, -1).join('/') === folder).length;
  const ok = title.trim() && SLUG_OK.test(finalSlug) && !taken && !sameAsFolder;
  return (
    <Modal title="New note" onClose={onClose} wide>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (ok) onCreate({ title: title.trim(), folder, slug: finalSlug, template, description: description.trim(), position: siblings + 1 });
        }}
      >
        <label className={s.label} htmlFor="nn-title">
          Title
        </label>
        <input id="nn-title" className={s.input} autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Spring Security" />
        <div className={s.two}>
          <div>
            <label className={s.label} htmlFor="nn-folder">
              Folder
            </label>
            <div className={s.row}>
              <FolderSelect id="nn-folder" folders={folders} value={folder} onChange={setFolder} labelOf={labelOf} />
              <button type="button" className="button button--secondary button--sm" onClick={onNewFolder} title="Create a folder or sub-folder">
                + Folder
              </button>
            </div>
          </div>
          <div>
            <label className={s.label} htmlFor="nn-slug">
              File name
            </label>
            <span className={s.slugWrap}>
              <input
                id="nn-slug"
                className={s.input}
                value={finalSlug}
                onChange={(e) => {
                  setTouched(true);
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
                }}
              />
              <i>.md</i>
            </span>
          </div>
        </div>
        <p className={s.muted}>
          Saved as <code>{path}</code>
          {taken && <b className={s.error}> — already exists</b>}
          {sameAsFolder && <b className={s.error}> — can’t match the folder name</b>}
        </p>
        <label className={s.label} htmlFor="nn-desc">
          Description <span className={s.muted}>(optional)</span>
        </label>
        <input id="nn-desc" className={s.input} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="One sentence about this page" />
        <p className={s.label}>Start from</p>
        <div className={s.templates}>
          {M.TEMPLATES.map((t) => (
            <button key={t.id} type="button" className={`${s.tpl} ${template === t.id ? s.tplOn : ''}`} onClick={() => setTemplate(t.id)} aria-pressed={template === t.id}>
              <b>{t.label}</b>
              <span>{t.hint}</span>
            </button>
          ))}
        </div>
        <div className={s.row}>
          <button type="submit" className="button button--primary" disabled={!ok}>
            Create note
          </button>
          <button type="button" className="button button--secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

function NewFolderDialog({ folders, labelOf, parent: initialParent, onClose, onCreate }) {
  const [parent, setParent] = useState(initialParent);
  const [label, setLabel] = useState('');
  const [slug, setSlug] = useState('');
  const [touched, setTouched] = useState(false);
  const [description, setDescription] = useState('');
  const finalSlug = touched ? slug : M.slugify(label);
  const path = parent ? `${parent}/${finalSlug}` : finalSlug;
  const taken = folders.includes(path);
  const ok = label.trim() && SLUG_OK.test(finalSlug) && !taken;
  return (
    <Modal title={parent ? 'New sub-folder' : 'New folder'} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (ok) onCreate({ path, label: label.trim(), description: description.trim() });
        }}
      >
        <label className={s.label} htmlFor="nf-parent">
          Inside
        </label>
        <FolderSelect id="nf-parent" folders={folders} value={parent} onChange={setParent} labelOf={labelOf} />
        <label className={s.label} htmlFor="nf-label">
          Name in the sidebar
        </label>
        <input id="nf-label" className={s.input} autoFocus value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Microservices" />
        <label className={s.label} htmlFor="nf-slug">
          Folder name
        </label>
        <input
          id="nf-slug"
          className={s.input}
          value={finalSlug}
          onChange={(e) => {
            setTouched(true);
            setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
          }}
        />
        <label className={s.label} htmlFor="nf-desc">
          Description <span className={s.muted}>(optional — shown on the folder’s overview page)</span>
        </label>
        <input id="nf-desc" className={s.input} value={description} onChange={(e) => setDescription(e.target.value)} />
        <p className={s.muted}>
          Creates <code>docs/{path || '…'}/</code>
          {taken && <b className={s.error}> — already exists</b>}. Next you’ll write its first note; the folder is published
          together with it.
        </p>
        <div className={s.row}>
          <button type="submit" className="button button--primary" disabled={!ok}>
            Create folder
          </button>
          <button type="button" className="button button--secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

function SaveDialog({ doc, title, moved, target, changes, blockers, problems, busy, canPush, onClose, onPublish }) {
  const verb = !doc.path ? 'Add' : moved ? 'Move' : 'Update';
  const [message, setMessage] = useState(`${verb} notes: ${title || doc.slug}`);
  const errors = problems.filter((p) => p.level === 'error' && p.fix !== 'plain');
  return (
    <Modal title={canPush ? 'Publish to GitHub' : 'Suggest these changes'} onClose={onClose}>
      {blockers.length ? (
        <ul className={s.problems}>
          {blockers.map((b) => (
            <li key={b} className={s.error}>
              ✕ {b}
            </li>
          ))}
        </ul>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onPublish(message.trim() || `${verb} notes`);
          }}
        >
          <p className={s.muted}>
            {canPush ? (
              <>One commit to the {BRANCH} branch:</>
            ) : (
              <>
                A pull request to {OWNER}/{REPO}, from your own copy on GitHub. The owner reviews it; once accepted, the site
                updates. Changes:
              </>
            )}
          </p>
          <ul className={s.changes}>
            {changes.map((c) => (
              <li key={c.path}>
                <span className={c.delete ? s.del : c.path === target && !doc.path ? s.add : c.path === target ? s.mod : s.add}>{c.delete ? '−' : c.path === target && doc.path && !moved ? '~' : '+'}</span> <code>{c.path}</code>
              </li>
            ))}
          </ul>
          {errors.length > 0 && (
            <p className={s.warnBox}>
              ⚠ {errors.length} problem{errors.length > 1 ? 's' : ''} in Checks (e.g. “{errors[0].text}”). The page will still publish.
            </p>
          )}
          <label className={s.label} htmlFor="commit-msg">
            {canPush ? 'Commit message' : 'Short description'}
          </label>
          <input id="commit-msg" className={s.input} autoFocus value={message} onChange={(e) => setMessage(e.target.value)} />
          <div className={s.row}>
            <button type="submit" className="button button--primary" disabled={busy}>
              {busy ? (canPush ? 'Publishing…' : 'Sending…') : canPush ? 'Publish' : 'Send for review'}
            </button>
            <button type="button" className="button button--secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
