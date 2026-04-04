# instructions.md — Development Guide

## Quick Start

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (usually http://localhost:5173)
```

## Development Workflow

### Running the App

```bash
npm run dev          # Vite dev server with hot reload
npm run preview      # Preview production build locally
```

### Code Quality

```bash
npm run lint         # ESLint with TypeScript rules
npm run typecheck    # TypeScript strict mode type checking
npm run build        # Full production build (catches build errors)
```

Run `npm run typecheck` and `npm run lint` before committing.

### Building for Production

```bash
npm run build        # Outputs to dist/
npm run preview      # Serves the built files locally
```

## Project Architecture

### Entry Points

- `index.html` — HTML shell with root div
- `src/main.tsx` — React DOM render entry
- `src/App.tsx` — Root component with tab navigation, header, and footer

### Components

Each demo is a self-contained component in `src/components/`:

| Component | Purpose |
|-----------|---------|
| `EscapingButton.tsx` | CTA button that moves away from cursor; tracks rage level |
| `InvisibleText.tsx` | White-on-white hidden text revealed on hover |
| `ImpossibleCaptcha.tsx` | Unsolvable CAPTCHA with absurd challenges |
| `SelfResettingForm.tsx` | Form that auto-clears every 10s; submit is disabled |

### Utilities

- `src/utils/glitch.ts` — Replaces random characters with glitch symbols at configurable intensity

### Styling

All styles live in `src/index.css`:

- Base layout and typography
- CRT retro effects: scanlines, vignette, scan bar animation
- Tab bar and component styling
- Glitch/glow effects
- Responsive design via Tailwind's `clamp()` utilities

### Configuration

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite config with React plugin; excludes lucide-react from dep optimization |
| `tsconfig.app.json` | TypeScript config: ES2020 target, strict mode, react-jsx |
| `tsconfig.node.json` | TypeScript config for Node tooling (Vite config) |
| `tailwind.config.js` | Tailwind content paths |
| `postcss.config.js` | PostCSS with Tailwind and Autoprefixer |
| `eslint.config.js` | ESLint 9 flat config with TypeScript and React plugins |

## Adding a New Anti-UX Demo

1. **Create the component:**
   ```bash
   # src/components/YourNewDemo.tsx
   ```

2. **Implement with local state:**
   ```tsx
   import { useState } from 'react';

   export default function YourNewDemo() {
     const [state, setState] = useState(initialValue);
     return (
       <div className="demo-container">
         {/* Your intentionally terrible UX here */}
       </div>
     );
   }
   ```

3. **Register in App.tsx:**
   ```tsx
   import YourNewDemo from './components/YourNewDemo';

   const TABS = [
     // ...existing tabs
     { label: 'YOUR DEMO', component: <YourNewDemo /> },
   ];
   ```

4. **Verify:**
   ```bash
   npm run typecheck && npm run lint
   ```

## Dependencies

### Production

| Package | Purpose |
|---------|---------|
| `react` / `react-dom` | UI framework |
| `lucide-react` | Icon library |
| `@supabase/supabase-js` | Backend SDK (currently unused) |

### Development

- TypeScript, ESLint, Vite, Tailwind CSS, PostCSS, Autoprefixer
- See `package.json` for full list and versions

## Notes

- The bad UX is intentional — this is a satirical educational project
- TypeScript strict mode is enforced — no implicit `any`
- No external state management or UI component libraries needed
- The CRT retro theme (scanlines, red/black, glitch text) should be preserved
