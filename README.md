# UX Destroyer Pro

**WENDER MEDIA ANTI-CONVERSION SUITE** — v6.6.6

> GUARANTEED 0% CONVERSION RATE OR YOUR MONEY BACK\*

A satirical React web application that showcases deliberately terrible UX patterns and anti-conversion design practices. Built as a humorous educational tool demonstrating **what NOT to do** when designing user interfaces.

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-8uap8cke)

## Features

The app presents four interactive demos via a tabbed interface, each violating core UX principles:

| Demo | Component | What It Does |
|------|-----------|-------------|
| **Escaping CTA** | `EscapingButton.tsx` | A "Buy Now" button that flees from your cursor. Tracks failed clicks and displays a rage meter. |
| **Invisible Copy** | `InvisibleText.tsx` | White text on white background — only revealed on hover. Hides a sales pitch in plain sight. |
| **Captcha Infinity** | `ImpossibleCaptcha.tsx` | Unsolvable CAPTCHA challenges with absurd prompts. Attempts remaining: always infinity. |
| **Self-Reset Form** | `SelfResettingForm.tsx` | A form that clears all inputs every 10 seconds. Submit button permanently disabled "for your protection." |

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 + TypeScript 5.5 |
| Build Tool | Vite 5.4 |
| Styling | Tailwind CSS 3.4 + custom CSS (retro CRT aesthetic) |
| Icons | Lucide React |
| PostCSS | Autoprefixer |
| Linting | ESLint 9 with TypeScript ESLint |

## Visual Design

Retro terminal / CRT monitor aesthetic with:

- Red (`#ff0000`) on black (`#000`) color scheme
- Monospace typography throughout
- Scanline overlay, vignette, and animated scan bar effects
- Glitch text animation on the title
- Satirical badges: "NIELSEN CERTIFIED", "FITT'S LAW VIOLATOR", "GDPR NON-COMPLIANT", "ISO 9241 IGNORED"

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

## Project Structure

```
src/
├── components/
│   ├── EscapingButton.tsx      # Fleeing CTA button
│   ├── InvisibleText.tsx       # Hidden text demo
│   ├── ImpossibleCaptcha.tsx   # Unsolvable CAPTCHA
│   └── SelfResettingForm.tsx   # Auto-clearing form
├── utils/
│   └── glitch.ts               # Text glitch effect utility
├── App.tsx                     # Main app with tabs and layout
├── main.tsx                    # React entry point
└── index.css                   # All styles (CRT retro theme)
```

## UX Principles Violated

This project intentionally breaks established usability standards for educational and comedic purposes:

- **Nielsen's Heuristics** — Visibility, user control, error prevention — all ignored
- **Fitt's Law** — Interactive targets that actively evade the cursor
- **GDPR** — Deceptive hidden content patterns
- **ISO 9241** — Ergonomic standards for human-computer interaction — completely disregarded
- **WCAG Accessibility** — Invisible text, moving targets, auto-clearing forms

## License

This project is for educational and entertainment purposes.

---

*\*Money not refundable. By reading this you agree to our terms.*
