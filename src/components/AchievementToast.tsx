/**
 * Achievement toast popup — slides in when a new achievement unlocks.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { type Achievement } from '../utils/achievements';

interface Props {
  achievement: Achievement | null;
  onDismiss: () => void;
}

export default function AchievementToast({ achievement, onDismiss }: Props) {
  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          className="achievement-toast"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          onClick={onDismiss}
        >
          <div className="achievement-icon">{achievement.icon}</div>
          <div className="achievement-text">
            <div className="achievement-unlocked">ACHIEVEMENT UNLOCKED</div>
            <div className="achievement-title">{achievement.title}</div>
            <div className="achievement-desc">{achievement.description}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
