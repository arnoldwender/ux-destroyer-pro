/**
 * Easter egg popup — appears when user tries to disable all anti-patterns.
 * "Disabling anti-patterns requires a premium subscription ($99/month)"
 */
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  show: boolean;
  onClose: () => void;
}

export default function PremiumTrap({ show, onClose }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="premium-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="premium-popup"
            initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="premium-icon">$99</div>
            <div className="premium-title">PREMIUM FEATURE</div>
            <div className="premium-body">
              Disabling anti-patterns requires a <strong>Premium Subscription</strong> ($99/month).
              <br /><br />
              Free users can only <em>add more</em> anti-patterns.
            </div>
            <div className="premium-actions">
              <button className="premium-accept">SUBSCRIBE NOW</button>
              <button className="premium-dismiss" onClick={onClose}>
                no thanks
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
