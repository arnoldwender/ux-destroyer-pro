/**
 * Dark Pattern Certification Badge — generates a downloadable
 * certification badge styled like SSL/Norton security badges.
 * Includes fake testimonials and tier system.
 */
import { useRef, useCallback, useState } from 'react';
import html2canvas from 'html2canvas';

interface Props {
  enabledCount: number;
  uxScore: number;
}

/* Badge tier based on score */
function getTier(enabledCount: number): { name: string; color: string; border: string } {
  if (enabledCount >= 10) return { name: 'PLATINUM', color: '#e0e0e0', border: '#b0bec5' };
  if (enabledCount >= 7) return { name: 'GOLD', color: '#ffd700', border: '#ffab00' };
  if (enabledCount >= 4) return { name: 'SILVER', color: '#90a4ae', border: '#78909c' };
  if (enabledCount >= 1) return { name: 'BRONZE', color: '#a1887f', border: '#8d6e63' };
  return { name: 'UNCERTIFIED', color: '#424242', border: '#616161' };
}

/* Fake testimonials */
const TESTIMONIALS = [
  {
    quote: 'Thanks to UX Destroyer Pro, our bounce rate went from 40% to 99%. Incredible ROI.',
    author: 'Sandra M.',
    role: 'VP of Marketing, DarkCorp Inc.',
  },
  {
    quote: 'Our support tickets increased 1200%. That means engagement, right?',
    author: 'Tobias K.',
    role: 'CEO, ConfuseUI Labs',
  },
  {
    quote: 'Users now spend 47 minutes trying to close our cookie banner. Time on site is through the roof.',
    author: 'Klaus D.',
    role: 'Growth Hacker, FrustrateTech',
  },
  {
    quote: 'We A/B tested a 4px close button vs no close button. The 4px version was more "compliant."',
    author: 'Lisa S.',
    role: 'Legal & UX Lead, ShadyPatterns AG',
  },
];

export default function DarkPatternBadge({ enabledCount, uxScore }: Props) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const tier = getTier(enabledCount);
  const testimonial = TESTIMONIALS[testimonialIdx];

  /* Download badge as image */
  const downloadBadge = useCallback(async () => {
    if (!badgeRef.current || downloading) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(badgeRef.current, {
        backgroundColor: '#000',
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = `ux-destroyer-badge-${tier.name.toLowerCase()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch {
      /* silent fail */
    }
    setDownloading(false);
  }, [downloading, tier.name]);

  /* Cycle testimonial */
  const nextTestimonial = () => {
    setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);
  };

  /* Frustration index label */
  const frustrationLabel = enabledCount >= 10 ? 'MAXIMUM' : enabledCount >= 7 ? 'SEVERE' : enabledCount >= 4 ? 'MODERATE' : enabledCount >= 1 ? 'MILD' : 'NONE';

  return (
    <section className="dp-badge-section" id="certification">
      <div className="dp-badge-header">
        <span className="dp-section-label">DARK PATTERN CERTIFICATION</span>
        <span className="dp-badge-header-sub">OFFICIAL COMPLIANCE BADGE</span>
      </div>

      {/* The badge itself */}
      <div className="dp-badge-wrapper">
        <div className="dp-badge" ref={badgeRef} style={{ borderColor: tier.border }}>
          {/* Shield shape top */}
          <div className="dp-badge-shield" style={{ borderColor: tier.border }}>
            <div className="dp-badge-shield-inner" style={{ color: tier.color }}>
              {enabledCount >= 1 ? 'CERTIFIED' : '- - -'}
            </div>
          </div>

          <div className="dp-badge-tier" style={{ color: tier.color }}>
            {tier.name} TIER
          </div>

          <div className="dp-badge-title">
            {enabledCount >= 1 ? 'CERTIFIED TERRIBLE' : 'NOT YET CERTIFIED'}
          </div>

          <div className="dp-badge-org">by UX Destroyer Pro</div>

          <div className="dp-badge-divider" style={{ borderColor: tier.border }} />

          <div className="dp-badge-stats">
            <div className="dp-badge-stat">
              <span className="dp-badge-stat-value">{enabledCount}</span>
              <span className="dp-badge-stat-label">DARK PATTERNS</span>
            </div>
            <div className="dp-badge-stat">
              <span className="dp-badge-stat-value">{uxScore}</span>
              <span className="dp-badge-stat-label">DESTRUCTION SCORE</span>
            </div>
          </div>

          <div className="dp-badge-compliance" style={{ color: tier.color }}>
            Dark Pattern Compliance: {tier.name}
          </div>

          <div className="dp-badge-frustration">
            User Frustration Index: <span style={{ color: '#ff0000' }}>{frustrationLabel}</span>
          </div>

          <div className="dp-badge-serial">
            CERT #{String(Math.floor(Math.random() * 900000 + 100000))} | VALID: FOREVER (NON-REVOCABLE)
          </div>
        </div>
      </div>

      {/* Download button */}
      <div className="dp-badge-actions">
        <button className="dp-download-btn" onClick={downloadBadge} disabled={downloading}>
          {downloading ? 'GENERATING...' : 'DOWNLOAD BADGE (PNG)'}
        </button>
        <div className="dp-embed-hint">
          EMBED ON YOUR SITE TO SHOW VISITORS YOU MEAN BUSINESS
        </div>
      </div>

      {/* Fake testimonial */}
      <div className="dp-testimonial" onClick={nextTestimonial}>
        <div className="dp-testimonial-quote">"{testimonial.quote}"</div>
        <div className="dp-testimonial-author">
          <span className="dp-testimonial-name">{testimonial.author}</span>
          <span className="dp-testimonial-role">{testimonial.role}</span>
        </div>
        <div className="dp-testimonial-nav">CLICK FOR MORE TESTIMONIALS</div>
      </div>
    </section>
  );
}
