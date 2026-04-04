import { useState } from 'react';

export default function InvisibleText() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="invisible-wrapper">
      <div
        onMouseEnter={() => setRevealed(true)}
        onMouseLeave={() => setRevealed(false)}
        className="invisible-box"
        style={{
          background: revealed ? '#1a0000' : '#fff',
          color: revealed ? '#ff6600' : '#fff',
        }}
      >
        {revealed
          ? '\u26A0 YOU FOUND THE HIDDEN TEXT. CONGRATULATIONS. IT SAYS NOTHING USEFUL. PLEASE BUY OUR PREMIUM PLAN TO READ THE ACTUAL CONTENT. PRICE: YOUR SOUL + $99/MONTH.'
          : 'Hover to reveal our incredible value proposition that will change your life forever and make you a better person overall.'}
      </div>
      {!revealed && (
        <div className="invisible-hint">HOVER TO READ</div>
      )}
    </div>
  );
}
