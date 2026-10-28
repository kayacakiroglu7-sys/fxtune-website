# FxTune Marketing Website

Astro + Tailwind CSS marketing site for FxTune — Platinum Studio Audio Production.

## Tech Stack

- [Astro](https://astro.build/) — Static site generator
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [MDX](https://mdxjs.com/) — Markdown with JSX components

## Structure

```
fxtune-website/
├── public/              # Static assets (favicon, images)
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Landing page layout
│   │   └── DocsLayout.astro    # Documentation site layout
│   └── pages/
│       ├── index.astro         # Landing page
│       └── docs/
│           ├── getting-started/
│           ├── architecture-overview/
│           ├── master-blueprint/
│           ├── ghosthand-ai/
│           ├── ghosthand-training/
│           ├── phase-vocoder/
│           ├── cpp-performance/
│           └── brand-guidelines/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── tsconfig.json
```

## Setup

```bash
cd fxtune-website
npm install
npm run dev
```

The site will be available at `http://localhost:4321`.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Lint source files |
| `npm run format` | Format with Prettier |

## Content

The docs site mirrors content from `android-native/app/src/main/assets/ai/`:

- **Architecture Overview** — Component topology and data flow
- **Master Blueprint** — Complete engineering specification
- **GhostHand AI** — The AI assistant system prompt
- **GhostHand Training** — Training and optimization prompts
- **Phase Vocoder** — BPM sync integration runbook
- **C++ Performance** — DSP engine internals and benchmarks
- **Brand Guidelines** — Colors, typography, and messaging

## Deployment

The site builds to static HTML and can be deployed to any static hosting provider:

```bash
npm run build
# Output in dist/
```

Recommended: Deploy via Vercel, Netlify, or Cloudflare Pages.
