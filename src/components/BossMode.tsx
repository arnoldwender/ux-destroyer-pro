/**
 * Boss Mode overlay — timer counting how long the user survives.
 * Shows survival time, airline message at 30s.
 */
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  active: boolean;
  time: number;
  airlineMsg: boolean;
  onStop: () => void;
}

export default function BossMode({ active, time, airlineMsg, onStop }: Props) {
  if (!active) return null;

  const mins = Math.floor(time / 60);
  const secs = time % 60;
  const display = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return (
    <AnimatePresence>
      <motion.div
        className="boss-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="boss-timer-container">
          <div className="boss-label">BOSS MODE ACTIVE</div>
          <div className="boss-timer">{display}</div>
          <div className="boss-sublabel">SURVIVAL TIME</div>
          {airlineMsg && (
            <motion.div
              className="boss-airline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Congratulations, you've experienced the average airline booking website
            </motion.div>
          )}
          <button className="boss-abort" onClick={onStop}>
            I GIVE UP
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
