/**
 * A/B Test Dashboard — styled like Optimizely/VWO.
 * Shows fake conversion metrics proving each dark pattern "works."
 * Every test conclusively proves the anti-pattern is effective.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Test result data: each anti-pattern has an A/B test entry */
interface TestResult {
  id: string;
  name: string;
  control: string;
  variant: string;
  metric: string;
  controlRate: number;
  variantRate: number;
  lift: number;
  pValue: number;
  sampleSize: number;
  confidence: number;
  status: 'winner' | 'significant' | 'highly-significant';
  insight: string;
}

const TEST_RESULTS: TestResult[] = [
  {
    id: 'infinite-scroll',
    name: 'Infinite Scroll vs Pagination',
    control: 'Standard pagination with page numbers',
    variant: 'Infinite scroll with no way to reach footer',
    metric: 'User Rage Events',
    controlRate: 2.4,
    variantRate: 10.56,
    lift: 340,
    pValue: 0.001,
    sampleSize: 14892,
    confidence: 99.9,
    status: 'highly-significant',
    insight: 'Users scrolled for an average of 47 minutes trying to find the contact page.',
  },
  {
    id: 'cookie-banner',
    name: 'Cookie Banner Size Test',
    control: 'Small banner (10% viewport)',
    variant: 'Full-page overlay (98% viewport)',
    metric: '"Accept All" Clicks',
    controlRate: 12.3,
    variantRate: 108.24,
    lift: 780,
    pValue: 0.0001,
    sampleSize: 52341,
    confidence: 99.99,
    status: 'highly-significant',
    insight: 'Reject button at 3px font-size contributed to 99.7% acceptance rate.',
  },
  {
    id: 'escaping-btn',
    name: 'Escaping Button Distance',
    control: 'Static unsubscribe button',
    variant: 'Button flees cursor at 200px radius',
    metric: 'Successful Unsubscriptions',
    controlRate: 34.2,
    variantRate: 0.3,
    lift: -99.1,
    pValue: 0.00001,
    sampleSize: 8743,
    confidence: 99.999,
    status: 'winner',
    insight: 'One user caught the button after 23 minutes. We patched that.',
  },
  {
    id: 'captcha-difficulty',
    name: 'CAPTCHA Complexity Level',
    control: 'Standard "click all traffic lights"',
    variant: '"Count the atoms in this molecule" CAPTCHA',
    metric: 'Bot Prevention Rate',
    controlRate: 96.0,
    variantRate: 100.0,
    lift: 4.2,
    pValue: 0.005,
    sampleSize: 31205,
    confidence: 99.5,
    status: 'significant',
    insight: 'Also prevents 100% of humans. Security perfected.',
  },
  {
    id: 'newsletter-timing',
    name: 'Newsletter Popup Timing',
    control: 'After 30 seconds on page',
    variant: 'Before page finishes loading',
    metric: 'Email Submissions',
    controlRate: 3.1,
    variantRate: 0.8,
    lift: -74.2,
    pValue: 0.002,
    sampleSize: 19456,
    confidence: 99.8,
    status: 'significant',
    insight: 'Submission quality improved: 73% of emails were "stop@spamming.me".',
  },
  {
    id: 'form-reset',
    name: 'Self-Resetting Form Interval',
    control: 'No form resets',
    variant: 'Reset every 3 seconds',
    metric: 'Form Abandonment Rate',
    controlRate: 22.0,
    variantRate: 98.7,
    lift: 348.6,
    pValue: 0.0001,
    sampleSize: 6234,
    confidence: 99.99,
    status: 'highly-significant',
    insight: 'Average user typed their name 14 times before giving up.',
  },
  {
    id: 'dark-confirm',
    name: 'Confirmshaming Button Ratio',
    control: 'Equal-sized Yes/No buttons',
    variant: '400px Accept / 4px "No thanks, I hate savings"',
    metric: 'Opt-in Conversion',
    controlRate: 31.0,
    variantRate: 94.2,
    lift: 203.9,
    pValue: 0.0001,
    sampleSize: 27891,
    confidence: 99.99,
    status: 'highly-significant',
    insight: 'Most users couldn\'t physically click the 4px reject button on mobile.',
  },
  {
    id: 'auto-scroll',
    name: 'Auto-Scroll Speed',
    control: 'User-controlled scrolling',
    variant: 'Page auto-scrolls at 50px/sec',
    metric: 'Content "Engagement" Time',
    controlRate: 45.0,
    variantRate: 312.0,
    lift: 593.3,
    pValue: 0.00001,
    sampleSize: 11567,
    confidence: 99.999,
    status: 'winner',
    insight: 'Time on page increased 7x. Users were trying to scroll back up.',
  },
];

/* Significance badge component */
function SignificanceBadge({ status, confidence }: { status: string; confidence: number }) {
  const colors: Record<string, string> = {
    'winner': '#00e676',
    'significant': '#29b6f6',
    'highly-significant': '#ffab00',
  };
  const labels: Record<string, string> = {
    'winner': 'WINNER',
    'significant': 'SIGNIFICANT',
    'highly-significant': 'HIGHLY SIGNIFICANT',
  };
  return (
    <span
      className="ab-badge"
      style={{ borderColor: colors[status], color: colors[status] }}
    >
      {labels[status]} ({confidence}%)
    </span>
  );
}

export default function ABTestDashboard() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  /* Summary stats */
  const totalSamples = TEST_RESULTS.reduce((s, t) => s + t.sampleSize, 0);
  const avgLift = (TEST_RESULTS.reduce((s, t) => s + Math.abs(t.lift), 0) / TEST_RESULTS.length).toFixed(1);
  const winRate = ((TEST_RESULTS.filter(t => t.status === 'winner' || t.status === 'highly-significant').length / TEST_RESULTS.length) * 100).toFixed(0);

  return (
    <section className="ab-dashboard" id="ab-tests">
      {/* Dashboard header */}
      <div className="ab-header">
        <div className="ab-header-left">
          <span className="ab-section-label">A/B TEST RESULTS</span>
          <span className="ab-header-title">Anti-Pattern Experimentation Platform</span>
        </div>
        <div className="ab-header-right">
          <span className="ab-header-env">PRODUCTION</span>
          <span className="ab-header-org">UX DESTROYER LABS</span>
        </div>
      </div>

      {/* Summary cards */}
      <div className="ab-summary-row">
        <div className="ab-summary-card">
          <div className="ab-summary-value">{TEST_RESULTS.length}</div>
          <div className="ab-summary-label">ACTIVE TESTS</div>
        </div>
        <div className="ab-summary-card">
          <div className="ab-summary-value">{totalSamples.toLocaleString()}</div>
          <div className="ab-summary-label">TOTAL SAMPLE SIZE</div>
        </div>
        <div className="ab-summary-card">
          <div className="ab-summary-value">{avgLift}%</div>
          <div className="ab-summary-label">AVG ABSOLUTE LIFT</div>
        </div>
        <div className="ab-summary-card">
          <div className="ab-summary-value">{winRate}%</div>
          <div className="ab-summary-label">WIN RATE</div>
        </div>
      </div>

      {/* Test result rows */}
      <div className="ab-results-list">
        {TEST_RESULTS.map((test) => {
          const isExpanded = expandedId === test.id;
          const liftColor = test.lift > 0 ? '#00e676' : '#ff5252';
          const liftPrefix = test.lift > 0 ? '+' : '';

          return (
            <motion.div
              key={test.id}
              className={`ab-result-row${isExpanded ? ' expanded' : ''}`}
              onClick={() => setExpandedId(isExpanded ? null : test.id)}
              layout
            >
              {/* Row header */}
              <div className="ab-result-header">
                <div className="ab-result-name">{test.name}</div>
                <div className="ab-result-meta">
                  <SignificanceBadge status={test.status} confidence={test.confidence} />
                  <span className="ab-result-lift" style={{ color: liftColor }}>
                    {liftPrefix}{test.lift}%
                  </span>
                </div>
              </div>

              {/* Metric bar comparison */}
              <div className="ab-result-bars">
                <div className="ab-bar-row">
                  <span className="ab-bar-label">Control</span>
                  <div className="ab-bar-track">
                    <motion.div
                      className="ab-bar-fill control"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((test.controlRate / Math.max(test.controlRate, test.variantRate)) * 100, 100)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="ab-bar-value">{test.controlRate}%</span>
                </div>
                <div className="ab-bar-row">
                  <span className="ab-bar-label">Variant</span>
                  <div className="ab-bar-track">
                    <motion.div
                      className="ab-bar-fill variant"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((test.variantRate / Math.max(test.controlRate, test.variantRate)) * 100, 100)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="ab-bar-value">{test.variantRate}%</span>
                </div>
              </div>

              {/* Expanded detail */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="ab-result-detail"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="ab-detail-grid">
                      <div className="ab-detail-item">
                        <span className="ab-detail-label">METRIC</span>
                        <span className="ab-detail-value">{test.metric}</span>
                      </div>
                      <div className="ab-detail-item">
                        <span className="ab-detail-label">SAMPLE SIZE</span>
                        <span className="ab-detail-value">{test.sampleSize.toLocaleString()}</span>
                      </div>
                      <div className="ab-detail-item">
                        <span className="ab-detail-label">P-VALUE</span>
                        <span className="ab-detail-value">p &lt; {test.pValue}</span>
                      </div>
                      <div className="ab-detail-item">
                        <span className="ab-detail-label">CONFIDENCE</span>
                        <span className="ab-detail-value">{test.confidence}%</span>
                      </div>
                    </div>
                    <div className="ab-detail-variants">
                      <div className="ab-variant-box control">
                        <span className="ab-variant-label">CONTROL</span>
                        <span className="ab-variant-desc">{test.control}</span>
                      </div>
                      <div className="ab-variant-box variant">
                        <span className="ab-variant-label">VARIANT</span>
                        <span className="ab-variant-desc">{test.variant}</span>
                      </div>
                    </div>
                    <div className="ab-insight">
                      <span className="ab-insight-label">KEY INSIGHT</span>
                      <span className="ab-insight-text">{test.insight}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Dashboard footer disclaimer */}
      <div className="ab-footer">
        STATISTICAL METHODOLOGY: ALL TESTS USE A PROPRIETARY "CONFIRM MY BIAS" ALGORITHM. P-VALUES ADJUSTED UNTIL SIGNIFICANT. PEER REVIEW NOT APPLICABLE.
      </div>
    </section>
  );
}
