/**
 * UX Score badge — inverted scoring: worse UX = higher score.
 * Shows a "Certified UX Criminal" badge.
 */
interface Props {
  score: number;
  enabledCount: number;
}

function getRating(score: number): string {
  if (score === 0) return 'Innocent Bystander';
  if (score <= 26) return 'UX Misdemeanor';
  if (score <= 52) return 'UX Offender';
  if (score <= 78) return 'UX Felon';
  if (score <= 104) return 'UX Criminal';
  return 'Certified UX War Criminal';
}

export default function UXScore({ score, enabledCount }: Props) {
  const rating = getRating(score);

  return (
    <div className="ux-score">
      <div className="ux-score-badge">
        <div className="ux-score-number">{score}</div>
        <div className="ux-score-unit">UX DESTRUCTION POINTS</div>
      </div>
      <div className="ux-score-rating">{rating}</div>
      <div className="ux-score-patterns">{enabledCount} anti-patterns active</div>
    </div>
  );
}
