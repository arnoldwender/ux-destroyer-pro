/**
 * ActiveEffects — applies enabled anti-patterns as real effects on the page.
 * Renders overlays (cookie wall, newsletter popup, dark confirm dialog)
 * and injects CSS side-effects (random cursor, font chaos, auto-scroll).
 */
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playNotification, playError } from '../utils/sound';

/* ── Cursor list for random cursor effect ── */
const CURSORS = [
  'crosshair', 'help', 'wait', 'cell', 'move', 'not-allowed',
  'grab', 'grabbing', 'col-resize', 'row-resize', 'zoom-in',
  'zoom-out', 'text', 'vertical-text', 'alias', 'copy', 'no-drop',
  'progress', 'context-menu', 'pointer',
];

interface Props {
  enabled: Record<string, boolean>;
  bumpTraumatized: () => void;
}

export default function ActiveEffects({ enabled, bumpTraumatized }: Props) {
  /* ── Random cursor ── */
  useEffect(() => {
    if (!enabled.cursor) {
      document.body.style.cursor = '';
      return;
    }
    const iv = setInterval(() => {
      const cursor = CURSORS[Math.floor(Math.random() * CURSORS.length)];
      document.body.style.cursor = cursor;
    }, 2000);
    return () => {
      clearInterval(iv);
      document.body.style.cursor = '';
    };
  }, [enabled.cursor]);

  /* ── Auto-scroll ── */
  useEffect(() => {
    if (!enabled.autoscroll) return;
    const iv = setInterval(() => {
      const amount = (Math.random() - 0.5) * 600;
      window.scrollBy({ top: amount, behavior: 'smooth' });
    }, 3000);
    return () => clearInterval(iv);
  }, [enabled.autoscroll]);

  /* ── Font chaos (reading mode disabled) ── */
  useEffect(() => {
    if (!enabled.fontchaos) return;
    const iv = setInterval(() => {
      const paragraphs = document.querySelectorAll('p, span, div, button, label');
      const target = paragraphs[Math.floor(Math.random() * paragraphs.length)] as HTMLElement;
      if (target) {
        const size = 0.5 + Math.random() * 2;
        target.style.fontSize = `${size}rem`;
        /* Reset after a moment */
        setTimeout(() => {
          target.style.fontSize = '';
        }, 2000);
      }
    }, 1500);
    return () => clearInterval(iv);
  }, [enabled.fontchaos]);

  /* ── Invisible text (random text becomes invisible on hover) ── */
  useEffect(() => {
    if (!enabled.invisible) return;
    function handleMouseOver(e: MouseEvent) {
      const el = e.target as HTMLElement;
      if (el.tagName === 'BUTTON' || el.tagName === 'INPUT') return;
      if (el.classList.contains('invisible-effect')) return;
      el.classList.add('invisible-effect');
      setTimeout(() => el.classList.remove('invisible-effect'), 1500);
    }
    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, [enabled.invisible]);

  /* ── Escaping buttons ── */
  useEffect(() => {
    if (!enabled.escaping) return;
    function handleMouseEnter(e: MouseEvent) {
      const el = e.target as HTMLElement;
      if (el.tagName !== 'BUTTON') return;
      if (el.closest('.toggle-panel') || el.closest('.boss-overlay')) return;
      const dx = (Math.random() - 0.5) * 200;
      const dy = (Math.random() - 0.5) * 100;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      el.style.transition = 'transform 0.15s';
      setTimeout(() => {
        el.style.transform = '';
      }, 2000);
    }
    document.addEventListener('mouseenter', handleMouseEnter, true);
    return () => document.removeEventListener('mouseenter', handleMouseEnter, true);
  }, [enabled.escaping]);

  /* ── Newsletter popup (every 15s) ── */
  const [showNewsletter, setShowNewsletter] = useState(false);
  const newsletterTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!enabled.newsletter) {
      setShowNewsletter(false);
      if (newsletterTimer.current) clearInterval(newsletterTimer.current);
      return;
    }
    /* Show immediately, then every 15s */
    setShowNewsletter(true);
    playNotification();
    bumpTraumatized();
    newsletterTimer.current = setInterval(() => {
      setShowNewsletter(true);
      playNotification();
      bumpTraumatized();
    }, 15000);
    return () => {
      if (newsletterTimer.current) clearInterval(newsletterTimer.current);
    };
  }, [enabled.newsletter, bumpTraumatized]);

  /* ── Cookie wall ── */
  const [showCookie, setShowCookie] = useState(false);
  useEffect(() => {
    if (enabled.cookie) {
      setShowCookie(true);
      bumpTraumatized();
    } else {
      setShowCookie(false);
    }
  }, [enabled.cookie, bumpTraumatized]);

  /* ── Dark pattern confirm ── */
  const [showDarkConfirm, setShowDarkConfirm] = useState(false);
  useEffect(() => {
    if (enabled.darkconfirm) {
      setShowDarkConfirm(true);
    } else {
      setShowDarkConfirm(false);
    }
  }, [enabled.darkconfirm]);

  /* ── CAPTCHA blocking ── */
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaQ, setCaptchaQ] = useState('');
  const [captchaAttempts, setCaptchaAttempts] = useState(0);
  const captchaQuestions = useRef([
    'How many pixels are in a megapixel?',
    'Type the square root of -1 as a real number',
    'Click all images containing feelings',
    'What is the airspeed velocity of an unladen swallow?',
    'Prove P=NP in this text field',
    'Type your password backwards (we promise not to look)',
  ]);

  const nextCaptchaQ = useCallback(() => {
    const qs = captchaQuestions.current;
    setCaptchaQ(qs[Math.floor(Math.random() * qs.length)]);
  }, []);

  useEffect(() => {
    if (enabled.captcha) {
      setShowCaptcha(true);
      setCaptchaAttempts(0);
      nextCaptchaQ();
    } else {
      setShowCaptcha(false);
    }
  }, [enabled.captcha, nextCaptchaQ]);

  /* ── Self-resetting: handled via CSS animation class ── */
  useEffect(() => {
    if (enabled.resetting) {
      document.body.classList.add('form-reset-active');
    } else {
      document.body.classList.remove('form-reset-active');
    }
    return () => document.body.classList.remove('form-reset-active');
  }, [enabled.resetting]);

  /* ── Input reset timer ── */
  useEffect(() => {
    if (!enabled.resetting) return;
    const iv = setInterval(() => {
      const inputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
        'input:not(.toggle-panel input):not(.captcha-overlay input), textarea'
      );
      inputs.forEach((input) => {
        if (input.value) {
          input.value = '';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });
    }, 3000);
    return () => clearInterval(iv);
  }, [enabled.resetting]);

  return (
    <>
      {/* ── Newsletter Popup ── */}
      <AnimatePresence>
        {showNewsletter && (
          <motion.div
            className="newsletter-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="newsletter-popup"
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="newsletter-title">WAIT! DON'T LEAVE!</div>
              <div className="newsletter-body">
                Subscribe to our newsletter that you'll never read but will clog your inbox for eternity.
              </div>
              <input className="newsletter-input" placeholder="your@email.com" />
              <button className="newsletter-submit">SUBSCRIBE FOREVER</button>
              <button
                className="newsletter-dismiss"
                onClick={() => setShowNewsletter(false)}
              >
                No thanks, I hate saving money
              </button>
              <div className="newsletter-timer">Next popup in 15 seconds...</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Cookie Wall ── */}
      <AnimatePresence>
        {showCookie && (
          <motion.div
            className="cookie-wall"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="cookie-content">
              <div className="cookie-title">WE USE COOKIES</div>
              <div className="cookie-body">
                We use cookies, tracking pixels, browser fingerprinting, soul harvesting,
                and 847 third-party trackers to "enhance your experience."
                <br /><br />
                By existing on this page, you've already agreed to everything.
              </div>
              <div className="cookie-actions">
                <button
                  className="cookie-accept"
                  onClick={() => setShowCookie(false)}
                >
                  ACCEPT ALL (INCLUDING YOUR FATE)
                </button>
                <button className="cookie-customize">
                  Customize (leads to 47-page form)
                </button>
                <button className="cookie-reject" onClick={() => setShowCookie(false)}>
                  reject
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Dark Pattern Confirm ── */}
      <AnimatePresence>
        {showDarkConfirm && (
          <motion.div
            className="dark-confirm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="dark-confirm-popup"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <div className="dark-confirm-title">SPECIAL OFFER!</div>
              <div className="dark-confirm-body">
                Would you like to enable our Premium Anti-Pattern Bundle for only $999/month?
              </div>
              <button className="dark-confirm-accept">
                YES, TAKE MY MONEY AND MY DIGNITY
              </button>
              <button
                className="dark-confirm-reject"
                onClick={() => setShowDarkConfirm(false)}
              >
                no
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Impossible CAPTCHA Overlay ── */}
      <AnimatePresence>
        {showCaptcha && (
          <motion.div
            className="captcha-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="captcha-overlay-popup"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
            >
              <div className="captcha-overlay-header">
                SECURITY VERIFICATION #{captchaAttempts + 1} of &infin;
              </div>
              <div className="captcha-overlay-question">{captchaQ}</div>
              <div className="captcha-overlay-row">
                <input className="captcha-overlay-input" placeholder="Your answer..." />
                <button
                  className="captcha-overlay-btn"
                  onClick={() => {
                    playError();
                    setCaptchaAttempts((a) => a + 1);
                    nextCaptchaQ();
                  }}
                >
                  VERIFY
                </button>
              </div>
              {captchaAttempts > 0 && (
                <div className="captcha-overlay-error">
                  WRONG. Attempts remaining: &infin; - {captchaAttempts} = still &infin;
                </div>
              )}
              <button
                className="captcha-overlay-skip"
                onClick={() => setShowCaptcha(false)}
              >
                skip (cheater)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
