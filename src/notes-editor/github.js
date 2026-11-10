/**
 * GitHub access for the notes editor. Everything happens in the browser with
 * the owner's fine-grained token (Contents: read & write on one-notes).
 * Saves are single commits made with the Git Data API, so a note, any new
 * folders and pasted images land together; reads use blob SHAs, which never
 * go stale after a commit.
 */

export const OWNER = 'ritiksharma142001';
export const REPO = 'one-notes';
export const BRANCH = 'main';
export const REPO_URL = `https://github.com/${OWNER}/${REPO}`;
const API = 'https://api.github.com';
const TOKEN_KEY = 'one-notes.editor.token';

export const tokenStore = {
  get() {
    try {
      return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || '';
    } catch {
      return '';
    }
  },
  set(token, remember) {
    try {
      (remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, token);
      (remember ? sessionStorage : localStorage).removeItem(TOKEN_KEY);
    } catch {
      /* storage blocked: the token lives only for this page */
    }
  },
  clear() {
    try {
      localStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
  },
};

export class GitHubError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

/** Turns GitHub's errors into something the editor can show. */
function explain(status, body, path) {
  const msg = (body && body.message) || '';
  if (status === 401) return 'GitHub rejected the token — it may be expired or mistyped. Sign in again.';
  if (status === 403 && /rate limit/i.test(msg)) return 'GitHub rate limit reached — try again in a few minutes.';
  if (status === 403 || (status === 404 && /^(POST|PATCH) /.test(path)))
    return 'This token can read but not write. Give it “Contents: Read and write” on the one-notes repository.';
  if (status === 404) return `Not found on GitHub (${path}). Does the token have access to ${OWNER}/${REPO}?`;
  if (status === 409) return 'The repository is empty or busy — try again.';
  if (status === 422) return msg || 'GitHub refused the change.';
  return msg || `GitHub error ${status}`;
}

const enc = encodeURIComponent;

export class GitHub {
  constructor(token) {
    this.token = token;
  }

  async req(path, { method = 'GET', body, accept } = {}) {
    const r = await fetch(`${API}${path}`, {
      method,
      cache: 'no-store',
      headers: {
        Accept: accept || 'application/vnd.github+json',
        Authorization: `Bearer ${this.token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!r.ok) {
      let data = null;
      try {
        data = await r.json();
      } catch {
        /* no body */
      }
      throw new GitHubError(explain(r.status, data, `${method} ${path}`), r.status);
    }
    return r.status === 204 ? null : r.json();
  }

  /** Who is signed in, and can the token see the repo? */
  async check() {
    const user = await this.req('/user');
    const repo = await this.req(`/repos/${OWNER}/${REPO}`);
    return { login: user.login, avatar: user.avatar_url, canPush: repo.permissions ? repo.permissions.push : true };
  }

  /** Latest commit on the branch and every file / folder under docs/ and static/img/. */
  async snapshot(commitSha) {
    const head = commitSha || (await this.req(`/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`)).object.sha;
    const commit = await this.req(`/repos/${OWNER}/${REPO}/git/commits/${head}`);
    const tree = await this.req(`/repos/${OWNER}/${REPO}/git/trees/${commit.tree.sha}?recursive=1`);
    const entries = tree.tree
      .filter((e) => e.path.startsWith('docs/') || e.path.startsWith('static/img/'))
      .map((e) => ({ path: e.path, sha: e.sha, type: e.type }));
    return { head, treeSha: commit.tree.sha, entries, truncated: Boolean(tree.truncated) };
  }

  /** A file's text by its blob SHA. */
  async readBlob(sha) {
    const b = await this.req(`/repos/${OWNER}/${REPO}/git/blobs/${sha}`);
    const bin = atob(b.content.replace(/\n/g, ''));
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  /**
   * One commit with all changes: [{ path, text } | { path, base64 } | { path, delete: true }].
   * Retries once if someone pushed in between (it rebuilds on the new head).
   */
  async commit(changes, message, attempt = 0) {
    const ref = await this.req(`/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`);
    const parent = ref.object.sha;
    const base = await this.req(`/repos/${OWNER}/${REPO}/git/commits/${parent}`);
    const tree = [];
    for (const c of changes) {
      if (c.delete) {
        tree.push({ path: c.path, mode: '100644', type: 'blob', sha: null });
        continue;
      }
      const blob = await this.req(`/repos/${OWNER}/${REPO}/git/blobs`, {
        method: 'POST',
        body: c.base64 != null ? { content: c.base64, encoding: 'base64' } : { content: c.text, encoding: 'utf-8' },
      });
      tree.push({ path: c.path, mode: '100644', type: 'blob', sha: blob.sha });
    }
    const newTree = await this.req(`/repos/${OWNER}/${REPO}/git/trees`, {
      method: 'POST',
      body: { base_tree: base.tree.sha, tree },
    });
    const commit = await this.req(`/repos/${OWNER}/${REPO}/git/commits`, {
      method: 'POST',
      body: { message, tree: newTree.sha, parents: [parent] },
    });
    try {
      await this.req(`/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
        method: 'PATCH',
        body: { sha: commit.sha, force: false },
      });
    } catch (e) {
      if (e.status === 422 && attempt < 1) return this.commit(changes, message, attempt + 1);
      throw e;
    }
    return commit.sha;
  }

  /** The GitHub Pages deploy run for a commit: { status, conclusion, url } or null. */
  async deployRun(sha) {
    const d = await this.req(`/repos/${OWNER}/${REPO}/actions/runs?head_sha=${enc(sha)}&per_page=5`);
    const run = (d.workflow_runs || [])[0];
    return run ? { status: run.status, conclusion: run.conclusion, url: run.html_url } : null;
  }
}

/** base64 of a File (for image uploads). */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(',')[1] || '');
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });
}
