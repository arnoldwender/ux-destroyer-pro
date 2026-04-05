/**
 * UX Destroyer Pro — Main app shell.
 * Wires together the toggle panel, chaos meter, boss mode,
 * achievements, share card, and all active anti-pattern effects.
 */
import { useState, useEffect } from 'react';
import { glitchText } from './utils/glitch';
import { useAntiPatterns } from './store/useAntiPatterns';

/* Components */
import TogglePanel from './components/TogglePanel';
import ChaosMeter from './components/ChaosMeter';
import BossMode from './components/BossMode';
import UXScore from './components/UXScore';
import GlobalCounter from './components/GlobalCounter';
import AchievementToast from './components/AchievementToast';
import AchievementList from './components/AchievementList';
import TutorialPopup from './components/TutorialPopup';
import PremiumTrap from './components/PremiumTrap';
import ShareCard from './components/ShareCard';
import ActiveEffects from './components/ActiveEffects';
import RickrollOverlay from './components/RickrollOverlay';
import ABTestDashboard from './components/ABTestDashboard';
import WCAGSpeedrun from './components/WCAGSpeedrun';
import DarkPatternBadge from './components/DarkPatternBadge';
import ChangelogProCLI from './components/ChangelogProCLI';

/* Badge labels in the header */
const BADGES = [
  'NIELSEN CERTIFIED',
  "FITT'S LAW VIOLATOR",
  'GDPR NON-COMPLIANT',
  'ISO 9241 IGNORED',
];

export default function App() {
  const [titleText, setTitleText] = useState('UX DESTROYER PRO');
  const state = useAntiPatterns();

  /* ── Glitch title effect ── */
  useEffect(() => {
    const base = 'UX DESTROYER PRO';
    const iv = setInterval(() => {
      setTitleText(glitchText(base, 0.15));
      setTimeout(() => setTitleText(base), 120);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  /* ── Rickroll state ── */
  const [showRickroll, setShowRickroll] = useState(false);
  useEffect(() => {
    if (state.titleClicks >= 10 && !showRickroll) {
      setShowRickroll(true);
    }
  }, [state.titleClicks, showRickroll]);

  return (
    <div className="app-root">
      {/* Scanline overlay */}
      <div className="overlay-scanlines" />
      {/* Vignette overlay */}
      <div className="overlay-vignette" />
      {/* Moving scan line */}
      <div className="overlay-scanbar" />

      {/* ── Active anti-pattern effects ── */}
      <ActiveEffects
        enabled={state.enabled}
        bumpTraumatized={state.bumpTraumatized}
      />

      <div className="app-container">
        {/* ── Global Counter Banner ── */}
        <GlobalCounter
          traumatized={state.totalTraumatized}
          deployed={state.totalDeployed}
        />

        {/* ── Header ── */}
        <header className="app-header">
          <div className="header-subtitle">
            ARNOLD WENDER ANTI-CONVERSION SUITE
          </div>
          <h1
            className="header-title"
            onClick={state.bumpTitleClick}
            style={{ cursor: 'pointer' }}
          >
            {titleText}
          </h1>
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

        {/* ── Chaos Meter ── */}
        <ChaosMeter percent={state.chaosPercent} label={state.chaosLabel} />

        {/* ── UX Score ── */}
        <UXScore score={state.uxScore} enabledCount={state.enabledCount} />

        {/* ── Toggle Panel (replaces old tabs) ── */}
        <TogglePanel state={state} />

        {/* ── Demo Section: Original components still available ── */}
        <section className="demo-section">
          <div className="demo-section-title">LIVE DEMO AREA</div>
          <div className="demo-section-desc">
            The anti-patterns above affect THIS page. Try typing below, hovering text,
            or catching the button while effects are active.
          </div>

          {/* Interactive demo content that gets affected by anti-patterns */}
          <div className="demo-content">
            <div className="demo-block">
              <p className="demo-text">
                This is sample content that will be affected by the anti-patterns you enable above.
                Try enabling "Invisible Text" and hovering over this paragraph. Or enable
                "Reading Mode Disabled" and watch the fonts go haywire.
              </p>
            </div>

            <div className="demo-block">
              <label className="demo-label">TRY TYPING HERE:</label>
              <input
                className="demo-input"
                placeholder="Enable 'Self-Resetting Form' and watch your text vanish..."
              />
            </div>

            <div className="demo-block">
              <button className="demo-cta">
                SAMPLE CTA BUTTON (enable "Escaping Buttons" and try to click me)
              </button>
            </div>
          </div>
        </section>

        {/* ── A/B Test Dashboard ── */}
        <ABTestDashboard />

        {/* ── WCAG Violation Speedrun ── */}
        <WCAGSpeedrun enabled={state.enabled} />

        {/* ── Dark Pattern Certification Badge ── */}
        <DarkPatternBadge enabledCount={state.enabledCount} uxScore={state.uxScore} />

        {/* ── Changelog, Pro Tier & CLI ── */}
        <ChangelogProCLI />

        {/* ── Share Card ── */}
        <ShareCard
          score={state.uxScore}
          enabledCount={state.enabledCount}
          bossTime={state.bossTime}
          achievementCount={state.achievements.length}
        />

        {/* ── Achievements ── */}
        <AchievementList unlocked={state.achievements} />

        {/* ── Footer ── */}
        <footer className="app-footer">
          <div>UX DESTROYER PRO &mdash; MAKING THE WEB WORSE SINCE 2026</div>
          <div>
            BUILT BY ARNOLD WENDER &mdash; WE KNOW WHAT GOOD UX IS. THIS IS NOT IT.
          </div>
          <div className="footer-teapot">
            HTTP 418 &mdash; I AM A TEAPOT AND I HAVE BETTER UX THAN THIS
          </div>
        </footer>
      </div>

      {/* ── Overlays ── */}
      <BossMode
        active={state.bossMode}
        time={state.bossTime}
        airlineMsg={state.airlineMsg}
        onStop={state.stopBoss}
      />

      <TutorialPopup
        patternId={state.tutorialId}
        onClose={state.closeTutorial}
      />

      <PremiumTrap
        show={state.premiumTrap}
        onClose={() => state.setPremiumTrap(false)}
      />

      <AchievementToast
        achievement={state.newAchievement}
        onDismiss={state.clearNewAchievement}
      />

      <RickrollOverlay
        show={showRickroll}
        onClose={() => setShowRickroll(false)}
      />
    </div>
  );
}
