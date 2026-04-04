/**
 * Tutorial Mode — sarcastic explainer popup for each anti-pattern.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { ANTI_PATTERNS } from '../store/useAntiPatterns';

interface Props {
  patternId: string | null;
  onClose: () => void;
}

export default function TutorialPopup({ patternId, onClose }: Props) {
  const pattern = ANTI_PATTERNS.find((p) => p.id === patternId);

  return (
    <AnimatePresence>
      {pattern && (
        <motion.div
          className="tutorial-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="tutorial-popup"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="tutorial-header">HOW TO RUIN UX</div>
            <div className="tutorial-title">{pattern.label}</div>
            <div className="tutorial-body">{pattern.description}</div>
            <button className="tutorial-close" onClick={onClose}>
              I'VE LEARNED NOTHING
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
