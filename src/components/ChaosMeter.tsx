/**
 * Visual chaos gauge that fills as more anti-patterns activate.
 * Shows labels at milestones and triggers confetti at 100%.
 */
import { motion } from 'framer-motion';

interface Props {
  percent: number;
  label: string;
}

export default function ChaosMeter({ percent, label }: Props) {
  /* Color ramp from green to red */
  const hue = Math.max(0, 120 - percent * 1.2);

  return (
    <div className="chaos-meter">
      <div className="chaos-meter-header">
        <span className="chaos-meter-title">CHAOS METER</span>
        <span className="chaos-meter-pct">{percent}%</span>
      </div>
      <div className="chaos-meter-track">
        <motion.div
          className="chaos-meter-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          style={{ background: `hsl(${hue}, 100%, 50%)` }}
        />
      </div>
      <div className="chaos-meter-label">{label}</div>
    </div>
  );
}
