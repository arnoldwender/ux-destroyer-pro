/**
 * Achievement gallery — shows all unlocked achievements.
 */
import { type Achievement } from '../utils/achievements';
import { ACHIEVEMENTS } from '../utils/achievements';

interface Props {
  unlocked: Achievement[];
}

export default function AchievementList({ unlocked }: Props) {
  const unlockedIds = new Set(unlocked.map((a) => a.id));

  return (
    <div className="achievement-list">
      <div className="achievement-list-title">ACHIEVEMENTS</div>
      <div className="achievement-grid">
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = unlockedIds.has(ach.id);
          return (
            <div
              key={ach.id}
              className={`achievement-card${isUnlocked ? ' unlocked' : ''}`}
            >
              <div className="achievement-card-icon">{isUnlocked ? ach.icon : '?'}</div>
              <div className="achievement-card-title">
                {isUnlocked ? ach.title : '???'}
              </div>
              <div className="achievement-card-desc">
                {isUnlocked ? ach.description : 'Keep destroying UX to unlock'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
