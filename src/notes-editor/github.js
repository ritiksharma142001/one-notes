/**
 * GitHub access for the notes editor, in the browser. Anyone can sign in
 * with GitHub (through eritik.vercel.app, which holds the OAuth secret) or
 * paste a token. The owner's saves are single commits to main made with the
 * Git Data API, so a note, new folders and pasted images land together;
 * everyone else's become a pull request from their own fork for the owner
 * to review. Reads use blob SHAs, which never go stale after a commit.
 */

export const OWNER = 'ritiksharma142001';
export const REPO = 'one-notes';
export const BRANCH = 'main';
export const REPO_URL = `https://github.com/${OWNER}/${REPO}`;
const API = 'https://api.github.com';
const TOKEN_KEY = 'one-notes.editor.token';
/** "Sign in with GitHub": the portfolio's OAuth app sends the token back to /editor/#gh_token=… */
export const SIGN_IN_URL = 'https://eritik.vercel.app/api/studio/login?next=onenotes';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
    return 'GitHub didn’t allow this change with your sign-in. Sign out and sign in again with GitHub.';
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

  /** Writes blobs, a tree and a commit (not yet on any branch) in owner/repo. */
  async writeCommit(owner, repo, parent, baseTree, changes, message) {
    const tree = [];
    for (const c of changes) {
      if (c.delete) {
        tree.push({ path: c.path, mode: '100644', type: 'blob', sha: null });
        continue;
      }
      const blob = await this.req(`/repos/${owner}/${repo}/git/blobs`, {
        method: 'POST',
        body: c.base64 != null ? { content: c.base64, encoding: 'base64' } : { content: c.text, encoding: 'utf-8' },
      });
      tree.push({ path: c.path, mode: '100644', type: 'blob', sha: blob.sha });
    }
    const newTree = await this.req(`/repos/${owner}/${repo}/git/trees`, {
      method: 'POST',
      body: { base_tree: baseTree, tree },
    });
    const commit = await this.req(`/repos/${owner}/${repo}/git/commits`, {
      method: 'POST',
      body: { message, tree: newTree.sha, parents: [parent] },
    });
    return commit.sha;
  }

  /**
   * One commit with all changes: [{ path, text } | { path, base64 } | { path, delete: true }].
   * Retries once if someone pushed in between (it rebuilds on the new head).
   */
  async commit(changes, message, attempt = 0) {
    const ref = await this.req(`/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`);
    const parent = ref.object.sha;
    const base = await this.req(`/repos/${OWNER}/${REPO}/git/commits/${parent}`);
    const commit = { sha: await this.writeCommit(OWNER, REPO, parent, base.tree.sha, changes, message) };
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

  /**
   * For people who can't write to the repo: the same changes as a pull
   * request from their own fork (created on first use). Returns the PR link.
   */
  async propose(changes, title, body, onStep = () => {}) {
    onStep('Preparing your copy of the notes…');
    const fork = await this.req(`/repos/${OWNER}/${REPO}/forks`, {
      method: 'POST',
      body: { default_branch_only: true },
    });
    const fo = fork.owner.login;
    const fr = fork.name;
    // A new fork takes a few seconds to appear; an old one may be behind.
    for (let i = 0; ; i++) {
      try {
        await this.req(`/repos/${fo}/${fr}/git/ref/heads/${fork.default_branch || BRANCH}`);
        break;
      } catch (e) {
        if (i >= 20) throw new GitHubError('GitHub is still creating your copy of the notes — try again in a minute.', 0);
        await sleep(1500);
      }
    }
    await this.req(`/repos/${fo}/${fr}/merge-upstream`, {
      method: 'POST',
      body: { branch: fork.default_branch || BRANCH },
    }).catch(() => {});

    const head = (await this.req(`/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`)).object.sha;
    const base = await this.req(`/repos/${OWNER}/${REPO}/git/commits/${head}`);
    const branch = `notes-edit-${new Date().toISOString().slice(0, 19).replace(/[-:T]/g, '')}`;
    // The new branch starts at the owner's latest commit (the fork may need
    // a moment to receive it after syncing).
    for (let i = 0; ; i++) {
      try {
        await this.req(`/repos/${fo}/${fr}/git/refs`, {
          method: 'POST',
          body: { ref: `refs/heads/${branch}`, sha: head },
        });
        break;
      } catch (e) {
        if (i >= 8 || e.status !== 422) throw e;
        await sleep(2000);
      }
    }
    onStep('Saving your changes…');
    const sha = await this.writeCommit(fo, fr, head, base.tree.sha, changes, title);
    await this.req(`/repos/${fo}/${fr}/git/refs/heads/${branch}`, {
      method: 'PATCH',
      body: { sha, force: false },
    });
    onStep('Sending it for review…');
    const pr = await this.req(`/repos/${OWNER}/${REPO}/pulls`, {
      method: 'POST',
      body: { title, head: `${fo}:${branch}`, base: BRANCH, body, maintainer_can_modify: true },
    });
    return { url: pr.html_url, number: pr.number };
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
