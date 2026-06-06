<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Shaman Technology — Agent Guide

This file is the single source of truth for AI coding agents (Claude Code, Cursor, Codex, etc.) working in this repository. `CLAUDE.md` imports it via `@AGENTS.md`.

## Repository Layout

This is the marketing site for **Shaman Technology** (shamantech.co). It is a Next.js app at the repo root — there is no subdirectory indirection for the app itself:

- `shaman-tech-web/` — the Next.js app. **Run all commands from inside this directory.**
- `stitch_shaman_tech_corporate_website/` — static HTML/PNG design mockups from Google Stitch used as visual reference (see `*/code.html`, `*/screen.png`, `*/DESIGN.md`). Not built or deployed.
- `logos/` — source logo/icon assets. The subset the site actually uses is copied into `public/logos/`.
- `project_brief_shaman_tech_website.txt` (under the stitch dir) — the original product brief.

## Commands

All commands run from `shaman-tech-web/`:

```bash
npm ci           # install dependencies (fresh clone)
npm run dev      # local dev server at http://localhost:3000
npm run build    # production build (Vercel-style: optimized images, server output)
npm run lint     # next lint (note: lint is also skipped during builds — see below)
npm start        # serve a production build

# Static export build (what CI deploys to GitHub Pages):
GITHUB_PAGES=true NEXT_PUBLIC_SITE_URL=https://shamantech.co npm run build
# → emits a fully static site to out/
```

There is no test suite. `next.config.ts` sets `eslint.ignoreDuringBuilds: true`, so a build will succeed even with lint errors — run `npm run lint` explicitly to catch them.

## Architecture

**Stack:** Next.js 15.3 (App Router) · React 19 · TypeScript · Tailwind CSS 3.4. Path alias `@/*` maps to the `shaman-tech-web/` root (e.g. `@/components/Header`, `@/lib/asset-path`).

### Dual build target (the key architectural constraint)
The same codebase builds two ways, switched by the `GITHUB_PAGES` env var in `next.config.ts`:
- **Default** — normal Next.js output with image optimization (avif/webp) to `.next/`.
- **`GITHUB_PAGES=true`** — `output: "export"` static export, `images.unoptimized`, `trailingSlash` enabled. Emits to `out/`. This is the production path used by CI.

Because of the static-export target, **do not add server-only features** (Route Handlers, Server Actions, dynamic SSR, `next/image` optimization assumptions, runtime env reads). Everything must work as a fully static site. Forms use a third-party endpoint instead of a backend (see below).

### Asset paths
The site is served at the root of a custom domain (`shamantech.co`), so `basePath` is currently `""`. All references to files in `public/` should still go through `assetPath()` in `lib/asset-path.ts`, which prefixes `NEXT_PUBLIC_BASE_PATH`. This keeps the site portable to a project-subpath deployment without editing every `src`. Use `assetPath("/logos/...")` rather than hardcoding `/logos/...`.

### Routing & metadata
App Router pages live in `app/`: `/` (home), `/products`, `/services`, `/info`, `/contact`.

**The layout.tsx metadata wrapper pattern:** Each non-home route has its own `layout.tsx` whose sole job is to export per-page `Metadata`. The actual page components are `"use client"`, which cannot export metadata directly — the server layout wrapper exists specifically to work around this. The root `layout.tsx` additionally wraps every page with global chrome (`<Header>`, `<Footer>`, `<ScanlinesOverlay>`, `<ImageProtection>`) and loads three Google fonts via `next/font` (Anybody, JetBrains Mono, Courier Prime) exposed as CSS variables.

### Design system (8-bit / neo-brutalist retro theme)
The visual identity is deliberate "8-bit power of the 21st century" retro-brutalism. It's encoded in two places, and changes should respect both:
- `tailwind.config.ts` — a custom token set using **Material-Design-style semantic color names** (`surface`, `on-surface`, `secondary`, `primary-container`, etc.), plus custom `fontFamily`/`fontSize` scales (`display-lg`, `headline-lg`, `label-sm`, `body-md`) and spacing tokens (`gutter`, `margin`, `unit`, `container-max`). Use these tokens — avoid raw hex/px.
- `app/globals.css` — reusable effect classes and keyframe animations. Hard-edged drop shadows are done inline as `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`.

**Key CSS utility classes** (use or extend these rather than reinventing):
- `.scanlines` — CRT scanline overlay (flicker animation)
- `.neo-brutal-btn` — brutalist button with hard shadow + press-down active state
- `.dither-bg` — checkerboard dot pattern background
- `.label-plate` — dark label badge with monospace uppercase text
- `.pixel-border` — 4px solid border
- `.crt-screen` — green phosphor terminal glow (green text, radial glow overlay)
- `.hero-screen` — dark hero section background with inner glow
- `.synthwave-grid` / `.hero-stars` — animated perspective grid and twinkling starfield
- `.terminal-scanlines` — dense horizontal line overlay for terminal interiors
- `.hard-shadow` / `.hard-shadow-hover` / `.hard-shadow-active` — interactive shadow states
- `.brutalist-card` — inset highlight + outer hard-shadow card style
- `.float-8bit` — stepped floating animation
- `.hover-glow` — hover lift + glow + pulse
- `.glitch-anim` — glitch-in reveal animation
- `.blink-cursor` — blinking block cursor pseudo-element
- `.boot-reveal` — CRT power-on scale animation
- `.reveal-item` — staggered slide-in reveal for lists

**Hero intro film:** The home hero (`components/HeroIntro.tsx`) is a CRT console that embeds the Shaman intro video (`public/video/shaman-intro.mp4` + poster). It has three modes — muted autoplay loop on first visit (ambient), sound + native controls via PRESS START (feature), and poster + welcome copy on return visits (poster). A "DON'T SHOW AGAIN" toggle (ticked by default) persists to `localStorage` (`shaman:intro-dismissed`); autoplay is skipped under `prefers-reduced-motion`.

**Pixel sprites:** Pixel-art sprite sheets live in `public/sprites/`. `shaman-idle-sheet.png` is a horizontal 4-frame idle sheet (124×124 per frame, 496×124 total). The footer gimmick (`components/FooterRunner.tsx`, `.footer-runner` in globals.css) is a decorative strip above the footer where the shaman sprints from the chasing cat, using tight-cropped 8-frame run sheets `shaman-run.png` (38×60/frame) and `cat-run.png` (51×31/frame) — each sprite cycles via stepped `background-position` while the shared `.runner-pack` translates across; hidden under `prefers-reduced-motion`. When replacing a sheet, keep the per-frame dimensions and the matching `background-size` / `steps()` / keyframe offsets in sync.

### Products
Product catalog data is defined inline in `app/products/page.tsx` (`dataMap` and `cartridges` arrays): CoinRoom, M-Factory, Magic Library, mYcutter, SellSnap, TalkTask. Product images are expected at `public/products/<id>.png`.

### Contact form
`app/contact/page.tsx` posts directly to **Web3Forms** (`api.web3forms.com`) — no backend. Behavior is gated on `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`: if unset, the form renders disabled with a "comm relay offline" notice. Configured via env (see `.env.example`); the access key is injected in CI from the `WEB3FORMS_ACCESS_KEY` GitHub secret.

## Environment

`.env.example` lists the two env vars:
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` — gates the contact form; without it the form is disabled
- `NEXT_PUBLIC_SITE_URL` — used in metadata and contact form redirect

## Deployment

`.github/workflows/deploy-pages.yml` builds the static export (`GITHUB_PAGES=true`) and deploys to GitHub Pages. It runs on push to `dev` and `main`, but **only `main` (or manual `workflow_dispatch`) actually deploys** — `dev` builds for validation only. `public/CNAME` pins the custom domain `shamantech.co`; `.nojekyll` is added so GitHub Pages serves the `_next/` directory.
