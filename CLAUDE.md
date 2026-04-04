# CLAUDE.md — Instructions for Claude Code

This file provides context and guidelines for Claude Code (and other AI assistants) when working on the UX Destroyer Pro codebase.

## Project Overview

UX Destroyer Pro is a **satirical React application** that deliberately implements terrible UX patterns for educational and comedic purposes. It is NOT broken — the bad UX is intentional. Do not "fix" the UX anti-patterns unless explicitly asked.

## Tech Stack

- **React 18** with **TypeScript 5.5** (strict mode)
- **Vite 5.4** for dev server and builds
- **Tailwind CSS 3.4** for utility classes + custom CSS for the CRT retro theme
- **Lucide React** for icons
- **ESLint 9** with TypeScript ESLint for linting
- **PostCSS** with Autoprefixer

## Project Structure

```
src/
├── components/         # One file per demo component
│   ├── EscapingButton.tsx
│   ├── InvisibleText.tsx
│   ├── ImpossibleCaptcha.tsx
│   └── SelfResettingForm.tsx
├── utils/
│   └── glitch.ts       # Text glitch utility function
├── App.tsx             # Root component (tabs, header, footer)
├── main.tsx            # React DOM entry point
└── index.css           # All styles (CRT/retro theme, scanlines, etc.)
```

## Commands

```bash
npm run dev         # Start dev server
npm run build       # Production build
npm run preview     # Preview production build
npm run lint        # Run ESLint
npm run typecheck   # TypeScript type checking (tsc --noEmit)
```

## Code Conventions

- **TypeScript strict mode** is enabled — no implicit `any`, unused locals/parameters are errors
- **Functional components only** — use React hooks (`useState`, `useEffect`)
- **Tailwind CSS** for layout and utility styling; custom CSS in `index.css` for the retro/CRT theme effects
- **No external state management** — local component state via hooks is sufficient for this project
- **No external UI libraries** — only Lucide React for icons; avoid adding new UI packages
- Component files are PascalCase (e.g., `EscapingButton.tsx`)
- Utility files are camelCase (e.g., `glitch.ts`)

## Important Context

- The deliberately bad UX (escaping buttons, invisible text, impossible CAPTCHAs, auto-resetting forms) is the **core feature**, not a bug. Do not refactor these behaviors unless asked.
- The retro CRT visual theme (scanlines, vignette, glitch text, red-on-black) is intentional. Preserve this aesthetic.
- The satirical tone (fake badges, absurd disclaimers, "v6.6.6") is part of the project identity.
- `@supabase/supabase-js` is listed as a dependency but is not actively used in current components.

## When Adding New Anti-UX Demos

1. Create a new component in `src/components/`
2. Add it to the `TABS` array in `src/App.tsx`
3. Follow the existing pattern: self-contained component with local state
4. Keep the retro/CRT aesthetic consistent
5. Ensure TypeScript strict checks pass (`npm run typecheck`)
