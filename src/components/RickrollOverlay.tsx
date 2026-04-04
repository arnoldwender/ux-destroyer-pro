/**
 * Rickroll Easter egg — triggered when clicking the title 10 times.
 */
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  show: boolean;
  onClose: () => void;
}

export default function RickrollOverlay({ show, onClose }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="rickroll-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="rickroll-popup"
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 180, scale: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rickroll-title">YOU'VE BEEN RICKROLLED</div>
            <div className="rickroll-lyrics">
              Never gonna give you up<br />
              Never gonna let you down<br />
              Never gonna run around and desert you<br />
              Never gonna make you cry<br />
              Never gonna say goodbye<br />
              Never gonna tell a lie and hurt you
            </div>
            <div className="rickroll-subtitle">
              This anti-pattern is now permanently enabled*
            </div>
            <div className="rickroll-fine-print">
              *until you close this popup
            </div>
            <button className="rickroll-close" onClick={onClose}>
              I DESERVED THIS
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
