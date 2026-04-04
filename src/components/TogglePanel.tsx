/**
 * Anti-Pattern Toggle Panel — replaces the old tab bar.
 * Each toggle enables an anti-pattern that affects the page itself.
 */
import { motion } from 'framer-motion';
import { ANTI_PATTERNS, type AntiPatternState } from '../store/useAntiPatterns';

interface Props {
  state: AntiPatternState;
}

export default function TogglePanel({ state }: Props) {
  return (
    <div className="toggle-panel">
      <div className="toggle-panel-header">
        <span className="toggle-panel-title">ANTI-PATTERN CONTROL PANEL</span>
        <span className="toggle-panel-count">
          {state.enabledCount}/{ANTI_PATTERNS.length} ACTIVE
        </span>
      </div>
      <div className="toggle-grid">
        {ANTI_PATTERNS.map((pattern) => {
          const isOn = state.enabled[pattern.id];
          return (
            <motion.div
              key={pattern.id}
              className={`toggle-item${isOn ? ' active' : ''}`}
              layout
              whileTap={{ scale: 0.97 }}
            >
              <div className="toggle-item-row">
                <button
                  className={`toggle-switch${isOn ? ' on' : ''}`}
                  onClick={() => state.toggle(pattern.id)}
                  aria-label={`Toggle ${pattern.label}`}
                >
                  <motion.div
                    className="toggle-knob"
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
                <span className="toggle-label">{pattern.label}</span>
                <button
                  className="toggle-info-btn"
                  onClick={() => state.showTutorial(pattern.id)}
                  aria-label={`Info about ${pattern.label}`}
                >
                  ?
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom actions */}
      <div className="toggle-actions">
        <button
          className="action-btn boss"
          onClick={state.bossMode ? state.stopBoss : state.startBoss}
        >
          {state.bossMode ? 'ABORT BOSS MODE' : 'BOSS MODE'}
        </button>
        <button className="action-btn reset" onClick={state.disableAll}>
          DISABLE ALL
        </button>
      </div>
    </div>
  );
}
