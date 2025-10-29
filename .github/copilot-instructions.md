<!-- .github/copilot-instructions.md - Guidance for AI coding agents working on this Next.js portfolio -->

# Repository quick context

This is a personal portfolio built with Next.js (app router) and TypeScript. Key folders:

- `src/app/` — top-level Next.js pages and layouts (app router). Examples: `page.tsx`, `layout.tsx`.
- `src/components/` — presentational React components (e.g. `Navbar.tsx`, `Footer.tsx`, `ProjectPreview.tsx`).
- `public/` — static assets (fonts, PDFs, images) referenced from components and CSS.
- `src/app/global.css` — global CSS; this project uses hand-authored CSS (no Tailwind classes in CSS file). `package.json` includes Tailwind as a devDependency but the stylesheet is plain CSS.

# Big-picture architecture notes

- Next.js app router is used. `src/app/layout.tsx` defines the root layout and imports `Navbar` globally.
- Components are client or server depending on the presence of `"use client"` at the top of the file. For example, `Navbar.tsx` is a client component (it uses `useRouter` and DOM APIs to trigger a CV download).
- Styling: global CSS lives in `src/app/global.css` and fonts are loaded via `@font-face` referencing files in `public/fonts/`. Maintain class names in CSS and components in sync (e.g. `.navbar`, `.home`, `.home-links`).

# Build / dev / lint workflows

- Development: `npm run dev` (uses `next dev --turbopack`).
- Build: `npm run build` (uses `next build --turbopack`).
- Start (production local): `npm run start`.
- Lint: `npm run lint` (runs `eslint`).

Notes for agents: prefer to use existing npm scripts; don't assume additional scripts or tools exist. The project has `next` v15 and React 19 — when making changes be mindful of latest APIs but validate imports and usage against these package versions.

# Project-specific conventions and patterns

- File naming: routes use `page.tsx` within folders under `src/app/` (standard Next.js app router). Some subfolders include `about/`, `contact/`, `projects/`, etc.
- Components typically export default React functions and use TypeScript interfaces for props (see `ProjectPreview.tsx`). Keep prop typings minimal and consistent with present code style.
- CSS: class names are plain semantic names (e.g. `.navbar`, `.logo`, `.home-links`); avoid introducing Tailwind-first styles unless adding Tailwind consistently across project — the repo currently mixes a Tailwind devDependency but not the utility-first classes in CSS files.
- Client vs Server components: if a component accesses `window`, DOM APIs, or React hooks like `useRouter`, mark it as client with `"use client"` at the top (see `Navbar.tsx`).

# Integration points & external deps

- Fonts: `public/fonts/*` are loaded with `@font-face` in `src/app/global.css`.
- Static CV: `public/assets/home/CORENTIN CHANTEREAU.pdf` is linked/downloaded from `Navbar.tsx` and `Footer.tsx`. When editing links, preserve the relative path under `public/`.
- Icons: `lucide-react` is included — use it for vector icons if adding new UI elements.

# Typical change rules for agents

- Keep changes minimal and localized. This is a small portfolio site — prefer small, reversible commits.
- Preserve existing CSS class names unless intentionally renaming across components and CSS files together.
- When adding client behavior, follow existing pattern: add `"use client"`, use `next/navigation` hooks, and avoid direct manipulation of server-only modules.
- Static assets should be placed under `public/` and referenced with absolute paths starting with `/` (e.g. `/assets/home/...` or `/fonts/...`).

# Examples from the codebase (copy/paste friendly)

- Download CV link (Navbar.tsx):

  const cvPath = "/assets/home/CORENTIN CHANTEREAU.pdf";

- Project preview props (ProjectPreview.tsx):

  interface ProjectPreviewProps { title: string; description: string; link: string }

# Files to consult when making changes

- `src/app/layout.tsx` — root layout, global imports
- `src/app/page.tsx` — home page
- `src/app/global.css` — fonts and site-wide styles
- `src/components/Navbar.tsx` — example client component using `useRouter` and DOM API
- `src/components/ProjectPreview.tsx` — example typed presentational component
- `package.json` — dev and build scripts; note Next/Turbopack usage

# What NOT to change

- Do not relocate or rename files in `public/` without updating all references (e.g. CV path in `Navbar.tsx` and `Footer.tsx`).
- Avoid introducing global CSS resets that differ from the current file — keep the existing reset and root colors unless explicitly asked.

# If you need to run tests or type checks

- There are no tests in the repository. For a quick type/lint check run:

  npm run lint

or run TypeScript checking in your environment (the repo uses `noEmit: true`).

# If you're unsure

- Ask for the intended visual/UX change before refactoring styles. Small portfolio sites often rely on tight CSS; refactors can break layout.

---

If anything here is unclear or you'd like more details on a specific area (routing, fonts, adding a project entry, or deployment), tell me which part to expand and I'll update this file.
