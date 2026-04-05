/**
 * Changelog + Pro Tier + CLI Mode — three panels in one section.
 * - Fake changelog with absurd version history
 * - Pro tier pricing with enterprise anti-UX features
 * - CLI mode toggle with terminal aesthetic
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Changelog entries */
interface ChangelogEntry {
  version: string;
  date: string;
  tag: 'feature' | 'fix' | 'breaking' | 'security';
  entries: string[];
}

const CHANGELOG: ChangelogEntry[] = [
  {
    version: 'v6.6.6',
    date: '2026-04-04',
    tag: 'breaking',
    entries: [
      'Added GDPR non-compliance mode',
      'Now supports frustrating users in 47 languages',
      'Cookie banner now covers 103% of viewport (scrollbar included)',
      'BREAKING: Removed all accessibility. On purpose.',
    ],
  },
  {
    version: 'v6.6.5',
    date: '2026-03-15',
    tag: 'feature',
    entries: [
      'New: "Accept All or Else" cookie consent variant',
      'Escaping buttons now predict cursor movement using ML',
      'Auto-scroll speed increased to "nauseating"',
      'Added 14 new cursor shapes including "confused helicopter"',
    ],
  },
  {
    version: 'v6.6.4',
    date: '2026-02-28',
    tag: 'feature',
    entries: [
      'Newsletter popup now appears during page unload',
      'Form reset interval reduced from 5s to 3s for "agility"',
      'Added confirmshaming in 12 new guilt-trip templates',
      'Dark mode removed. Light mode also removed. Only chaos mode.',
    ],
  },
  {
    version: 'v6.6.3',
    date: '2026-01-20',
    tag: 'fix',
    entries: [
      'Fixed bug where users could occasionally read text',
      'Fixed: Close button was accidentally 5px. Reduced to 3px.',
      'Fixed: Some users completed forms. Added more resets.',
      'Hotfix: CAPTCHA was solvable by 0.003% of PhDs. Patched.',
    ],
  },
  {
    version: 'v6.6.2',
    date: '2025-12-01',
    tag: 'security',
    entries: [
      'Security: Made reject button immune to keyboard navigation',
      'Security: Password field now shows characters to everyone nearby',
      'Patched vulnerability that allowed users to have a good experience',
      'Added "entropy mode" where buttons randomly swap positions',
    ],
  },
  {
    version: 'v6.6.1',
    date: '2025-10-15',
    tag: 'feature',
    entries: [
      'Initial release: 10 anti-patterns, boss mode, achievements',
      'Chaos meter calibrated to maximum suffering',
      'Rickroll easter egg for the persistent ones',
      'Share card for proving your destruction score to friends',
    ],
  },
];

/* Pro tier features */
interface ProFeature {
  name: string;
  description: string;
}

const PRO_FEATURES: ProFeature[] = [
  { name: 'Enterprise Dark Pattern Engine', description: 'A/B test which dark pattern annoys users most, at scale. Supports 10M concurrent frustrations.' },
  { name: 'AI-Powered Rage Detection', description: 'Detect when users are about to rage-quit and show them another popup.' },
  { name: 'Cross-Platform Misery Sync', description: 'Sync anti-patterns across web, mobile, and smart fridge. Frustration everywhere.' },
  { name: 'Compliance Theater Mode', description: 'Generate fake accessibility reports that technically pass automated testing.' },
  { name: 'Infinite Scroll as a Service (ISaaS)', description: 'Hide the footer behind a paywall. Users scroll forever. Engagement = infinity.' },
  { name: 'Confirmshaming Template Library', description: '500+ guilt-trip messages. "No thanks, I prefer being uninformed and ugly."' },
  { name: 'Priority Support', description: 'Our support team will respond with the same energy as a cookie banner reject button.' },
  { name: 'Custom Cursor NFTs', description: 'Mint your worst cursor designs as NFTs. Truly digital suffering.' },
];

/* CLI commands */
const CLI_COMMANDS = [
  { cmd: 'ux-destroyer init --chaos-level=maximum', output: 'Initializing anti-pattern engine... Done. All users will now suffer.' },
  { cmd: 'ux-destroyer deploy --target=production --skip-a11y', output: 'Deploying 10 anti-patterns to production. Accessibility? Never heard of her.' },
  { cmd: 'ux-destroyer test --metric=rage --confidence=99.9', output: 'Running A/B test... Variant B (more popups) wins. User rage up 340%.' },
  { cmd: 'ux-destroyer audit --standard=WCAG --mode=violate', output: 'WCAG audit complete: 67 violations found. Achievement unlocked: Speed Runner.' },
  { cmd: 'ux-destroyer cookie-banner --size=viewport --reject=invisible', output: 'Cookie banner deployed. Reject button size: 2px. Color: transparent.' },
  { cmd: 'ux-destroyer generate-badge --tier=platinum', output: 'Badge generated: CERTIFIED TERRIBLE. Embed code copied to clipboard.' },
  { cmd: 'npm install ux-destroyer-pro', output: 'added 666 packages in 6.66s\n  13 vulnerabilities (13 critical)\n  "npm audit fix" will make things worse' },
];

/* Tag colors */
const TAG_COLORS: Record<string, string> = {
  feature: '#00e676',
  fix: '#29b6f6',
  breaking: '#ff1744',
  security: '#ffab00',
};

export default function ChangelogProCLI() {
  const [activeTab, setActiveTab] = useState<'changelog' | 'pro' | 'cli'>('changelog');
  const [cliHistory, setCliHistory] = useState<Array<{ cmd: string; output: string }>>([]);
  const [cliIndex, setCliIndex] = useState(0);

  /* Run next CLI command */
  const runNextCommand = () => {
    if (cliIndex < CLI_COMMANDS.length) {
      setCliHistory(prev => [...prev, CLI_COMMANDS[cliIndex]]);
      setCliIndex(i => i + 1);
    }
  };

  return (
    <section className="clpc-section" id="changelog-pro-cli">
      {/* Tab bar */}
      <div className="clpc-tabs">
        <button
          className={`clpc-tab${activeTab === 'changelog' ? ' active' : ''}`}
          onClick={() => setActiveTab('changelog')}
        >
          CHANGELOG
        </button>
        <button
          className={`clpc-tab${activeTab === 'pro' ? ' active' : ''}`}
          onClick={() => setActiveTab('pro')}
        >
          PRO TIER
        </button>
        <button
          className={`clpc-tab${activeTab === 'cli' ? ' active' : ''}`}
          onClick={() => setActiveTab('cli')}
        >
          CLI MODE
        </button>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === 'changelog' && (
          <motion.div
            key="changelog"
            className="clpc-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="cl-header">
              <span className="cl-header-title">RELEASE HISTORY</span>
              <span className="cl-header-sub">EACH UPDATE MAKES THINGS MEASURABLY WORSE</span>
            </div>
            {CHANGELOG.map((entry) => (
              <div key={entry.version} className="cl-entry">
                <div className="cl-entry-header">
                  <span className="cl-version">{entry.version}</span>
                  <span className="cl-tag" style={{ color: TAG_COLORS[entry.tag], borderColor: TAG_COLORS[entry.tag] }}>
                    {entry.tag.toUpperCase()}
                  </span>
                  <span className="cl-date">{entry.date}</span>
                </div>
                <ul className="cl-changes">
                  {entry.entries.map((e, i) => (
                    <li key={i} className="cl-change">{e}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'pro' && (
          <motion.div
            key="pro"
            className="clpc-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="pro-header">
              <div className="pro-header-badge">ENTERPRISE</div>
              <div className="pro-header-title">Anti-UX Suite</div>
              <div className="pro-header-subtitle">A/B test which dark pattern annoys users most, at scale</div>
            </div>

            <div className="pro-pricing">
              <div className="pro-price">
                <span className="pro-currency">$</span>
                <span className="pro-amount">666</span>
                <span className="pro-period">/month</span>
              </div>
              <div className="pro-price-note">billed annually | no refunds | no cancellation</div>
            </div>

            <div className="pro-features">
              {PRO_FEATURES.map((f) => (
                <div key={f.name} className="pro-feature">
                  <div className="pro-feature-name">{f.name}</div>
                  <div className="pro-feature-desc">{f.description}</div>
                </div>
              ))}
            </div>

            <button className="pro-cta">
              SUBSCRIBE NOW (YOUR CARD WILL BE CHARGED IMMEDIATELY AND ALSO YESTERDAY)
            </button>
            <div className="pro-disclaimer">
              *Cancellation requires a notarized letter, blood sample, and a 90-day interpretive dance waiting period.
            </div>
          </motion.div>
        )}

        {activeTab === 'cli' && (
          <motion.div
            key="cli"
            className="clpc-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="cli-terminal">
              <div className="cli-terminal-header">
                <div className="cli-terminal-dots">
                  <span className="cli-dot red" />
                  <span className="cli-dot yellow" />
                  <span className="cli-dot green" />
                </div>
                <span className="cli-terminal-title">ux-destroyer-pro -- zsh</span>
              </div>
              <div className="cli-terminal-body">
                <div className="cli-welcome">
                  UX Destroyer Pro CLI v6.6.6{'\n'}
                  Type commands or click "Run Next" to simulate.{'\n'}
                  {'\n'}
                </div>
                {cliHistory.map((entry, i) => (
                  <div key={i} className="cli-entry">
                    <div className="cli-prompt">
                      <span className="cli-prompt-user">destroyer</span>
                      <span className="cli-prompt-at">@</span>
                      <span className="cli-prompt-host">chaos</span>
                      <span className="cli-prompt-sep">:</span>
                      <span className="cli-prompt-dir">~</span>
                      <span className="cli-prompt-dollar">$</span>
                      <span className="cli-cmd">{entry.cmd}</span>
                    </div>
                    <div className="cli-output">{entry.output}</div>
                  </div>
                ))}
                {cliIndex < CLI_COMMANDS.length && (
                  <div className="cli-prompt">
                    <span className="cli-prompt-user">destroyer</span>
                    <span className="cli-prompt-at">@</span>
                    <span className="cli-prompt-host">chaos</span>
                    <span className="cli-prompt-sep">:</span>
                    <span className="cli-prompt-dir">~</span>
                    <span className="cli-prompt-dollar">$</span>
                    <span className="cli-cursor">_</span>
                  </div>
                )}
              </div>
              <div className="cli-terminal-actions">
                <button
                  className="cli-run-btn"
                  onClick={runNextCommand}
                  disabled={cliIndex >= CLI_COMMANDS.length}
                >
                  {cliIndex >= CLI_COMMANDS.length ? 'ALL COMMANDS EXECUTED' : 'RUN NEXT COMMAND'}
                </button>
                {cliIndex >= CLI_COMMANDS.length && (
                  <button
                    className="cli-reset-btn"
                    onClick={() => { setCliHistory([]); setCliIndex(0); }}
                  >
                    RESET TERMINAL
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
