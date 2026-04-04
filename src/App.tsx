import { useState, useEffect } from 'react';
import { glitchText } from './utils/glitch';
import EscapingButton from './components/EscapingButton';
import InvisibleText from './components/InvisibleText';
import ImpossibleCaptcha from './components/ImpossibleCaptcha';
import SelfResettingForm from './components/SelfResettingForm';

const TABS = [
  { label: 'ESCAPING CTA', component: <EscapingButton /> },
  { label: 'INVISIBLE COPY', component: <InvisibleText /> },
  { label: 'CAPTCHA \u221E', component: <ImpossibleCaptcha /> },
  { label: 'SELF-RESET FORM', component: <SelfResettingForm /> },
];

const BADGES = [
  'NIELSEN CERTIFIED',
  "FITT'S LAW VIOLATOR",
  'GDPR NON-COMPLIANT',
  'ISO 9241 IGNORED',
];

export default function App() {
  const [titleText, setTitleText] = useState('UX DESTROYER PRO');
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const base = 'UX DESTROYER PRO';
    const iv = setInterval(() => {
      setTitleText(glitchText(base, 0.15));
      setTimeout(() => setTitleText(base), 120);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="app-root">
      {/* Scanline overlay */}
      <div className="overlay-scanlines" />
      {/* Vignette overlay */}
      <div className="overlay-vignette" />
      {/* Moving scan line */}
      <div className="overlay-scanbar" />

      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <div className="header-subtitle">
            WENDER MEDIA ANTI-CONVERSION SUITE
          </div>
          <h1 className="header-title">{titleText}</h1>
          <div className="header-version">
            v6.6.6 &mdash; GUARANTEED 0% CONVERSION RATE OR YOUR MONEY BACK*
          </div>
          <div className="header-disclaimer">
            *money not refundable. by reading this you agree to our terms.
          </div>
          <div className="header-badges">
            {BADGES.map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </header>

        {/* Tab bar */}
        <nav className="tab-bar">
          {TABS.map((t, i) => (
            <button
              key={i}
              onClick={() => setTab(i)}
              className={`tab${tab === i ? ' active' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* Active tab content */}
        <main className="tab-content">{TABS[tab].component}</main>

        {/* Footer */}
        <footer className="app-footer">
          <div>UX DESTROYER PRO &mdash; MAKING THE WEB WORSE SINCE 2026</div>
          <div>
            BUILT BY WENDER MEDIA &mdash; WE KNOW WHAT GOOD UX IS. THIS IS NOT
            IT.
          </div>
          <div className="footer-teapot">
            HTTP 418 &mdash; I AM A TEAPOT AND I HAVE BETTER UX THAN THIS
          </div>
        </footer>
      </div>
    </div>
  );
}
