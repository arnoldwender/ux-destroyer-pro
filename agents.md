# agents.md — AI Agent Guidelines

Guidelines for AI agents (Claude Code, Copilot, Cursor, Bolt, etc.) working on UX Destroyer Pro.

## Role & Context

You are working on a **satirical web application** that intentionally implements bad UX patterns. The application is fully functional — the terrible user experience IS the product.

## Key Rules

### Do NOT

- **Fix the intentionally bad UX** — The escaping buttons, invisible text, impossible CAPTCHAs, and auto-resetting forms are features, not bugs
- **Change the visual theme** — The red-on-black CRT retro aesthetic with scanlines, vignette, and glitch effects is intentional
- **Add external UI libraries** — Use only Tailwind CSS, custom CSS, and Lucide React for icons
- **Add a state management library** — React hooks are sufficient for this project
- **Remove satirical content** — The fake badges, absurd disclaimers, and humorous copy are part of the identity
- **Refactor for "better UX"** — The entire point is bad UX

### Do

- **Maintain TypeScript strict mode** — All code must pass `npm run typecheck`
- **Follow existing patterns** — Functional components, React hooks, Tailwind + custom CSS
- **Keep components self-contained** — Each demo manages its own state
- **Preserve the retro CRT aesthetic** — Monospace fonts, scanlines, red/black color scheme
- **Run checks before committing** — `npm run lint` and `npm run typecheck`

## Architecture

| Layer | Details |
|-------|---------|
| Framework | React 18 + TypeScript 5.5 (strict) |
| Build | Vite 5.4 |
| Styling | Tailwind CSS 3.4 + custom CSS in `src/index.css` |
| Icons | Lucide React |
| State | Local React hooks (no global store) |
| Entry | `src/main.tsx` → `src/App.tsx` |

## Adding New Demos

1. Create `src/components/YourDemo.tsx` (PascalCase)
2. Import and add to the `TABS` array in `src/App.tsx`
3. Keep state local to the component
4. Match the existing retro/CRT visual style
5. Make the UX intentionally terrible in a creative, humorous way
6. Ensure `npm run typecheck` and `npm run lint` pass

## File Conventions

- Components: `src/components/PascalCase.tsx`
- Utilities: `src/utils/camelCase.ts`
- Styles: `src/index.css` (single stylesheet for the CRT theme)
- Config: Root-level (`vite.config.ts`, `tsconfig.*.json`, `tailwind.config.js`)
