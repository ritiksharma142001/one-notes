---
mdx:
  format: md
---

# GitHub Repository Setup using GitHub CLI

This guide explains how to:
- Install GitHub CLI
- Authenticate GitHub
- Create a repository directly from terminal
- Push local code to GitHub

---

# 1. Install GitHub CLI

Install GitHub CLI (`gh`) on Ubuntu:

```bash
sudo apt install gh -y
```

Verify installation:

```bash
gh --version
```

---

# 2. Login to GitHub

Run:

```bash
gh auth login
```

You will see prompts like:

```text
? What account do you want to log into?
> GitHub.com
```

Choose:
- `GitHub.com`

---

## Choose Git Protocol

```text
? What is your preferred protocol for Git operations on this host?
> SSH
```

Choose:
- `SSH`

SSH avoids entering username/password repeatedly.

---

## Upload SSH Key

```text
? Upload your SSH public key to your GitHub account?
> /home/eshu/.ssh/id_ed25519.pub
```

Choose:
- `Yes`

This automatically uploads your SSH key to GitHub.

---

## SSH Key Title

```text
? Title for your SSH key:
> GitHub CLI
```

Press:
- `Enter`

Default title is fine.

---

# 3. Authenticate using Browser

You will see:

```text
? How would you like to authenticate GitHub CLI?
> Login with a web browser
```

Choose:
- `Login with a web browser`

Then:

1. GitHub CLI generates a one-time code
2. Browser opens automatically
3. Enter the code
4. Click `Authorize GitHub CLI`

After successful login, terminal will show authentication success.

---

# 4. Create GitHub Repository from Local Folder

Move into your project:

```bash
cd ~/notes
```

Create and push repository directly:

```bash
gh repo create tech-wiki --public --source=. --remote=origin --push
```

---

# What this command does

```bash
gh repo create tech-wiki --public --source=. --remote=origin --push
```

This command automatically:

- Creates a GitHub repository named `tech-wiki`
- Connects local repo with GitHub remote (`origin`)
- Pushes local code to GitHub

---

# 5. Verify Remote Repository

Check configured remote:

```bash
git remote -v
```

Example output:

```text
origin  git@github.com:username/tech-wiki.git (fetch)
origin  git@github.com:username/tech-wiki.git (push)
```

---

# 6. Future Pushes

After initial setup, normal Git commands work:

```bash
git add .
git commit -m "Added notes"
git push
```

---

# 7. Check whether repository is public or private:

```bash
gh repo view --json visibility
```

## Output example:

```bash
{
  "visibility": "PUBLIC"
}
```

or
```bash
{
  "visibility": "PRIVATE"
}
```
    
---

# Useful Git Commands

## Check Current Branch

```bash
git branch
```

---

## Rename Branch to main

```bash
git branch -m main
```

---

## Check Git Status

```bash
git status
```

---

## You can also open repo in browser:

```bash
gh repo view --web
```

## If you want to make it private:

```bash
gh repo edit --visibility private
```

## Make public again:
```bash
gh repo edit --visibility public
```

# Recommended Repository Structure

```text
tech-wiki/
├── linux/
├── java/
├── system-design/
├── databases/
├── scripts/
├── interview/
└── README.md
```
