/**
 * Share Card — generates a shareable "UX Destruction Score" image.
 * Uses html2canvas to capture a styled div.
 */
import { useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';

interface Props {
  score: number;
  enabledCount: number;
  bossTime: number;
  achievementCount: number;
}

export default function ShareCard({ score, enabledCount, bossTime, achievementCount }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#000',
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = 'ux-destruction-score.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch {
      /* Fallback: copy text to clipboard */
      const text = `My UX Destruction Score: ${score} points | ${enabledCount} anti-patterns | Boss Mode: ${bossTime}s | ${achievementCount} achievements | UX Destroyer Pro`;
      navigator.clipboard.writeText(text);
    }
  }, [score, enabledCount, bossTime, achievementCount]);

  return (
    <div className="share-section">
      <div className="share-card" ref={cardRef}>
        <div className="share-card-header">MY UX DESTRUCTION SCORE</div>
        <div className="share-card-score">{score}</div>
        <div className="share-card-stats">
          <span>{enabledCount} anti-patterns</span>
          <span>Boss: {bossTime}s</span>
          <span>{achievementCount} achievements</span>
        </div>
        <div className="share-card-footer">UX DESTROYER PRO v6.6.6</div>
      </div>
      <button className="share-btn" onClick={handleShare}>
        DOWNLOAD SHARE CARD
      </button>
    </div>
  );
}
