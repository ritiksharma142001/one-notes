# 1-Note Documentation Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

---

# Prerequisites

Before running the project, make sure you have:

- Node.js >= 18 installed
- npm or yarn installed
- Git installed

Check versions:

```bash
node -v
npm -v
git --version
```

Recommended:

- Node.js 20+
- npm 10+

---

# Clone Repository

Using SSH:

```bash
git clone git@github.com:ritiksharma142001/one-notes.git
```

Using HTTPS:

```bash
git clone https://github.com/ritiksharma142001/one-notes.git
```

Move into project:

```bash
cd one-notes
```

---

# Installation

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn
```

---

# Local Development

Using npm:

```bash
npm run start
```

Using yarn:

```bash
yarn start
```

This starts a local development server.

Open:

```txt
http://localhost:3000
```

Features:

- Hot reload
- Live preview
- Instant updates while editing docs

---

# Build Production Website

Using npm:

```bash
npm run build
```

Using yarn:

```bash
yarn build
```

This generates optimized static files inside:

```txt
build/
```

---

# Test Production Build Locally

Using npm:

```bash
npm run serve
```

Using yarn:

```bash
yarn serve
```

This serves the production build locally.

---

# Deployment

## Deploy Using SSH (Recommended)

Make sure:

- SSH key is added to GitHub
- Git remote uses SSH

Check remote:

```bash
git remote -v
```

Expected:

```txt
origin  git@github.com:ritiksharma142001/one-notes.git
```

Deploy:

Using npm:

```bash
USE_SSH=true npm run deploy
```

Using yarn:

```bash
USE_SSH=true yarn deploy
```

---

## Deploy Using HTTPS

Using npm:

```bash
GIT_USER=ritiksharma142001 npm run deploy
```

Using yarn:

```bash
GIT_USER=ritiksharma142001 yarn deploy
```

You may need a GitHub Personal Access Token instead of password.

---

# Custom Domain

Website URL:

```txt
https://es-notes.ritik.dev
```

Recommended Docusaurus config:

```js
url: 'https://es-notes.ritik.dev',
baseUrl: '/',
```

---

# Important Scripts

| Command | Description |
|---|---|
| `npm run start` | Start development server |
| `npm run build` | Build production website |
| `npm run serve` | Serve production build locally |
| `npm run deploy` | Deploy website |
| `npm run clear` | Clear Docusaurus cache |
| `npm run swizzle` | Customize theme components |
| `npm run write-translations` | Generate translation files |
| `npm run write-heading-ids` | Generate heading IDs |
| `npm run build:search` | Build search index |

---

# Troubleshooting

## Clear Cache

```bash
npm run clear
```

---

## Reinstall Dependencies

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Port Already In Use

Run on another port:

```bash
npm run start -- --port 3001
```

---

# Project Structure

```txt
one-notes/
├── docs/
├── src/
├── static/
├── build/
├── docusaurus.config.js
├── sidebars.js
├── package.json
└── README.md
```

---

# Tech Stack

- Docusaurus
- React
- MDX
- Algolia Search
- GitHub Pages
- Custom Domain

---

# License

MIT License

---

# Author

Ritik Sharma

- GitHub: https://github.com/ritiksharma142001
- Portfolio: https://eritik.vercel.app/
- Website: https://es-notes.ritik.dev
