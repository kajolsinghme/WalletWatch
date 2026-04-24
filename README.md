
---

# Vite CI/CD Project

A simple Vite frontend project with **CI (GitHub Actions)** and **CD (Vercel auto deployment)**.

---

## Live Demo

https://wallet-watch-three.vercel.app/

---

## Tech Stack

* ⚡ Vite
* ⚛️ React
* 🤖 GitHub Actions (CI)
* 🌐 Vercel (CD)

---

## CI/CD Flow

```text
GitHub Push
     ↓
GitHub Actions (CI)
- Install dependencies
- Lint check
- Build project
     ↓
Vercel (CD)
- Auto deploy
- Live website update
```

---

## Setup Locally

```bash
git clone https://github.com/kajolsinghme/WalletWatch.git
cd walletwatch
npm install
npm run dev
```

---

## Build Project

```bash
npm run build
```

---

## Lint Check

```bash
npm run lint
```

---

## Project Structure

```text
.
├── .github/workflows/ci.yml
├── src/
├── public/
├── index.html
├── package.json
└── vite.config.js
```

---

## CI Pipeline (GitHub Actions)

* Runs on every push to `main`
* Installs dependencies
* Runs ESLint
* Builds project

---

## Deployment

Deployed using Vercel

* Auto-deploy on every push to `main`
* Instant production updates

---

## Features

* ✔ Automated CI pipeline
* ✔ Linting integration
* ✔ Build verification
* ✔ Auto deployment (CD)
* ✔ Production-ready workflow


---

## 👨‍💻 Author

Kajol
