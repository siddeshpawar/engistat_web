# Engistat — Deployment Guide

## Local Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

Output goes into `dist/`.

## Deploy to Cloudflare Pages

1. Push this repo to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Connect your GitHub repo
4. Set:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 18+
5. Click **Save and Deploy**

The `_redirects` file handles SPA routing on Cloudflare Pages.

## Custom Domain (engistat.com)

1. In Cloudflare Pages → Custom domains → Add `engistat.com`
2. Routes: `engistat.com/real-estate`, `engistat.com/training`, `engistat.com/about`

## Tech Stack

- **React 18** + React Router v6
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **GSAP-ready** (add `import gsap from 'gsap'` in any component)
- **Cloudflare Pages** (hosting)
