/**
 * WCAG Violation Speedrun — real-time counter styled like a speedrun timer.
 * Shows live WCAG violations as anti-patterns are toggled.
 * References real WCAG criteria numbers.
 */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* WCAG violations mapped to anti-patterns */
interface WCAGViolation {
  criterion: string;
  level: 'A' | 'AA' | 'AAA';
  title: string;
  principle: 'perceivable' | 'operable' | 'understandable' | 'robust';
}

/* Each anti-pattern maps to specific WCAG violations */
const PATTERN_VIOLATIONS: Record<string, WCAGViolation[]> = {
  escaping: [
    { criterion: '2.1.1', level: 'A', title: 'Keyboard', principle: 'operable' },
    { criterion: '2.4.7', level: 'AA', title: 'Focus Visible', principle: 'operable' },
    { criterion: '2.5.1', level: 'A', title: 'Pointer Gestures', principle: 'operable' },
    { criterion: '2.5.2', level: 'A', title: 'Pointer Cancellation', principle: 'operable' },
    { criterion: '3.2.1', level: 'A', title: 'On Focus', principle: 'understandable' },
    { criterion: '3.2.2', level: 'A', title: 'On Input', principle: 'understandable' },
    { criterion: '2.1.4', level: 'A', title: 'Character Key Shortcuts', principle: 'operable' },
    { criterion: '2.5.4', level: 'A', title: 'Motion Actuation', principle: 'operable' },
  ],
  invisible: [
    { criterion: '1.1.1', level: 'A', title: 'Non-text Content', principle: 'perceivable' },
    { criterion: '1.3.1', level: 'A', title: 'Info and Relationships', principle: 'perceivable' },
    { criterion: '1.4.1', level: 'A', title: 'Use of Color', principle: 'perceivable' },
    { criterion: '1.4.3', level: 'AA', title: 'Contrast (Minimum)', principle: 'perceivable' },
    { criterion: '1.4.6', level: 'AAA', title: 'Contrast (Enhanced)', principle: 'perceivable' },
    { criterion: '1.4.8', level: 'AAA', title: 'Visual Presentation', principle: 'perceivable' },
    { criterion: '1.4.11', level: 'AA', title: 'Non-text Contrast', principle: 'perceivable' },
    { criterion: '1.3.3', level: 'A', title: 'Sensory Characteristics', principle: 'perceivable' },
  ],
  captcha: [
    { criterion: '1.1.1', level: 'A', title: 'Non-text Content', principle: 'perceivable' },
    { criterion: '2.2.1', level: 'A', title: 'Timing Adjustable', principle: 'operable' },
    { criterion: '3.3.2', level: 'A', title: 'Labels or Instructions', principle: 'understandable' },
    { criterion: '3.3.3', level: 'AA', title: 'Error Suggestion', principle: 'understandable' },
    { criterion: '1.3.5', level: 'AA', title: 'Identify Input Purpose', principle: 'perceivable' },
    { criterion: '3.3.4', level: 'AA', title: 'Error Prevention', principle: 'understandable' },
    { criterion: '3.3.7', level: 'A', title: 'Redundant Entry', principle: 'understandable' },
  ],
  resetting: [
    { criterion: '3.2.2', level: 'A', title: 'On Input', principle: 'understandable' },
    { criterion: '3.3.1', level: 'A', title: 'Error Identification', principle: 'understandable' },
    { criterion: '3.3.4', level: 'AA', title: 'Error Prevention (Legal)', principle: 'understandable' },
    { criterion: '2.2.1', level: 'A', title: 'Timing Adjustable', principle: 'operable' },
    { criterion: '2.2.5', level: 'AAA', title: 'Re-authenticating', principle: 'operable' },
    { criterion: '3.3.7', level: 'A', title: 'Redundant Entry', principle: 'understandable' },
    { criterion: '2.2.6', level: 'AAA', title: 'Timeouts', principle: 'operable' },
  ],
  newsletter: [
    { criterion: '2.2.4', level: 'AAA', title: 'Interruptions', principle: 'operable' },
    { criterion: '3.2.5', level: 'AAA', title: 'Change on Request', principle: 'understandable' },
    { criterion: '2.4.3', level: 'A', title: 'Focus Order', principle: 'operable' },
    { criterion: '3.2.1', level: 'A', title: 'On Focus', principle: 'understandable' },
    { criterion: '1.3.2', level: 'A', title: 'Meaningful Sequence', principle: 'perceivable' },
    { criterion: '2.1.2', level: 'A', title: 'No Keyboard Trap', principle: 'operable' },
  ],
  cookie: [
    { criterion: '1.3.1', level: 'A', title: 'Info and Relationships', principle: 'perceivable' },
    { criterion: '2.4.3', level: 'A', title: 'Focus Order', principle: 'operable' },
    { criterion: '1.4.4', level: 'AA', title: 'Resize Text', principle: 'perceivable' },
    { criterion: '1.4.10', level: 'AA', title: 'Reflow', principle: 'perceivable' },
    { criterion: '2.1.2', level: 'A', title: 'No Keyboard Trap', principle: 'operable' },
    { criterion: '3.2.5', level: 'AAA', title: 'Change on Request', principle: 'understandable' },
    { criterion: '2.4.11', level: 'AA', title: 'Focus Not Obscured', principle: 'operable' },
  ],
  cursor: [
    { criterion: '1.4.1', level: 'A', title: 'Use of Color', principle: 'perceivable' },
    { criterion: '2.5.1', level: 'A', title: 'Pointer Gestures', principle: 'operable' },
    { criterion: '3.2.4', level: 'AA', title: 'Consistent Identification', principle: 'understandable' },
    { criterion: '2.5.4', level: 'A', title: 'Motion Actuation', principle: 'operable' },
    { criterion: '1.3.3', level: 'A', title: 'Sensory Characteristics', principle: 'perceivable' },
  ],
  autoscroll: [
    { criterion: '2.2.2', level: 'A', title: 'Pause, Stop, Hide', principle: 'operable' },
    { criterion: '2.3.1', level: 'A', title: 'Three Flashes or Below', principle: 'operable' },
    { criterion: '1.4.4', level: 'AA', title: 'Resize Text', principle: 'perceivable' },
    { criterion: '2.2.1', level: 'A', title: 'Timing Adjustable', principle: 'operable' },
    { criterion: '1.4.13', level: 'AA', title: 'Content on Hover or Focus', principle: 'perceivable' },
    { criterion: '2.3.3', level: 'AAA', title: 'Animation from Interactions', principle: 'operable' },
  ],
  darkconfirm: [
    { criterion: '1.4.3', level: 'AA', title: 'Contrast (Minimum)', principle: 'perceivable' },
    { criterion: '2.5.5', level: 'AAA', title: 'Target Size (Enhanced)', principle: 'operable' },
    { criterion: '2.5.8', level: 'AA', title: 'Target Size (Minimum)', principle: 'operable' },
    { criterion: '3.3.2', level: 'A', title: 'Labels or Instructions', principle: 'understandable' },
    { criterion: '1.4.12', level: 'AA', title: 'Text Spacing', principle: 'perceivable' },
    { criterion: '3.2.4', level: 'AA', title: 'Consistent Identification', principle: 'understandable' },
  ],
  fontchaos: [
    { criterion: '1.4.4', level: 'AA', title: 'Resize Text', principle: 'perceivable' },
    { criterion: '1.4.8', level: 'AAA', title: 'Visual Presentation', principle: 'perceivable' },
    { criterion: '1.4.12', level: 'AA', title: 'Text Spacing', principle: 'perceivable' },
    { criterion: '3.1.5', level: 'AAA', title: 'Reading Level', principle: 'understandable' },
    { criterion: '1.3.4', level: 'AA', title: 'Orientation', principle: 'perceivable' },
  ],
};

/* Principle colors */
const PRINCIPLE_COLORS: Record<string, string> = {
  perceivable: '#ff5252',
  operable: '#ffab00',
  understandable: '#29b6f6',
  robust: '#69f0ae',
};

interface Props {
  enabled: Record<string, boolean>;
}

export default function WCAGSpeedrun({ enabled }: Props) {
  /* Calculate active violations */
  const activeViolations: WCAGViolation[] = [];
  const seen = new Set<string>();
  for (const [patternId, isOn] of Object.entries(enabled)) {
    if (!isOn) continue;
    const violations = PATTERN_VIOLATIONS[patternId] ?? [];
    for (const v of violations) {
      const key = v.criterion;
      if (!seen.has(key)) {
        seen.add(key);
        activeViolations.push(v);
      }
    }
  }

  /* Count by principle */
  const byCat: Record<string, number> = { perceivable: 0, operable: 0, understandable: 0, robust: 0 };
  for (const v of activeViolations) {
    byCat[v.principle]++;
  }

  /* Speedrun timer */
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalViolations = activeViolations.length;

  useEffect(() => {
    if (totalViolations > 0 && !timerRef.current) {
      timerRef.current = setInterval(() => setElapsed(e => e + 10), 10);
    } else if (totalViolations === 0 && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setElapsed(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [totalViolations]);

  /* Format timer as MM:SS.mmm */
  const mins = Math.floor(elapsed / 60000);
  const secs = Math.floor((elapsed % 60000) / 1000);
  const ms = elapsed % 1000;
  const timerStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;

  /* Leaderboard (fake) */
  const leaderboard = [
    { rank: 1, name: 'DarkPatternLord', time: '00:04.210', violations: 67 },
    { rank: 2, name: 'CookieBanditXX', time: '00:06.890', violations: 67 },
    { rank: 3, name: 'WCAG_Nemesis', time: '00:08.320', violations: 67 },
    { rank: 4, name: 'A11yVillain', time: '00:11.540', violations: 67 },
    { rank: 5, name: 'YOU', time: timerStr, violations: totalViolations },
  ];

  return (
    <section className="wcag-speedrun" id="wcag-speedrun">
      <div className="wcag-header">
        <span className="wcag-section-label">WCAG VIOLATION SPEEDRUN</span>
        <span className="wcag-header-sub">FASTEST TIME TO MAXIMUM VIOLATIONS</span>
      </div>

      {/* Speedrun timer */}
      <div className="wcag-timer-container">
        <div className="wcag-timer">{timerStr}</div>
        <div className="wcag-violation-total">
          <motion.span
            key={totalViolations}
            initial={{ scale: 1.5, color: '#ff0000' }}
            animate={{ scale: 1, color: '#ff5252' }}
          >
            {totalViolations}
          </motion.span>
          <span className="wcag-violation-label"> UNIQUE VIOLATIONS</span>
        </div>
      </div>

      {/* Principle breakdown */}
      <div className="wcag-principles">
        {(['perceivable', 'operable', 'understandable', 'robust'] as const).map((p) => (
          <div key={p} className="wcag-principle-card">
            <div className="wcag-principle-count" style={{ color: PRINCIPLE_COLORS[p] }}>
              <motion.span key={byCat[p]} initial={{ scale: 1.3 }} animate={{ scale: 1 }}>
                {p === 'robust' && totalViolations > 0 ? '???' : byCat[p]}
              </motion.span>
            </div>
            <div className="wcag-principle-name" style={{ color: PRINCIPLE_COLORS[p] }}>
              {p.toUpperCase()}
            </div>
            <div className="wcag-principle-note">
              {p === 'robust' && totalViolations > 0 ? 'concept not found' : `${byCat[p]} violations`}
            </div>
          </div>
        ))}
      </div>

      {/* Live violation feed */}
      <AnimatePresence>
        {totalViolations > 0 && (
          <motion.div
            className="wcag-feed"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="wcag-feed-header">LIVE VIOLATION FEED</div>
            <div className="wcag-feed-list">
              {activeViolations.slice(0, 12).map((v) => (
                <div key={v.criterion} className="wcag-feed-item">
                  <span className="wcag-feed-criterion" style={{ color: PRINCIPLE_COLORS[v.principle] }}>
                    {v.criterion}
                  </span>
                  <span className="wcag-feed-title">{v.title}</span>
                  <span className="wcag-feed-level">{v.level}</span>
                </div>
              ))}
              {activeViolations.length > 12 && (
                <div className="wcag-feed-more">
                  +{activeViolations.length - 12} more violations...
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Leaderboard */}
      <div className="wcag-leaderboard">
        <div className="wcag-leaderboard-header">SPEEDRUN LEADERBOARD: FASTEST TO 1000 VIOLATIONS</div>
        <div className="wcag-leaderboard-list">
          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={`wcag-leaderboard-row${entry.name === 'YOU' ? ' you' : ''}`}
            >
              <span className="wcag-lb-rank">#{entry.rank}</span>
              <span className="wcag-lb-name">{entry.name}</span>
              <span className="wcag-lb-time">{entry.time}</span>
              <span className="wcag-lb-violations">{entry.violations} violations</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
