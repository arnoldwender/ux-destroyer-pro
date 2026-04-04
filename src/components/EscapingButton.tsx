import { useState } from 'react';

const MESSAGES = [
  'BUY NOW',
  'NO WAIT',
  'CLICK ME',
  'ARE YOU SURE?',
  'THINK AGAIN',
  'LAST CHANCE',
  'MAYBE LATER',
  'JUST DO IT',
  "OR DON'T",
  'YOUR LOSS',
  'FINE WHATEVER',
];

export default function EscapingButton() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [clicks, setClicks] = useState(0);
  const [rage, setRage] = useState(0);

  function escape() {
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;
    setPos({ x, y });
    setRage((r) => Math.min(100, r + 10));
  }

  function handleClick() {
    setClicks((c) => c + 1);
    setRage((r) => Math.min(100, r + 20));
  }

  return (
    <div className="escaping-container">
      <div className="escaping-label left">
        CONVERSION OPTIMIZER&trade; &mdash; RAGE LEVEL: {rage}%
      </div>
      <div className="escaping-label right">FAILED CLICKS: {clicks}</div>

      <div className="rage-track">
        <div
          className="rage-fill"
          style={{
            width: `${rage}%`,
            background: `hsl(${120 - rage}, 100%, 50%)`,
          }}
        />
      </div>

      <button
        onMouseEnter={escape}
        onTouchStart={escape}
        onClick={handleClick}
        className="escaping-btn"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
        }}
      >
        {MESSAGES[clicks % MESSAGES.length]}
      </button>
    </div>
  );
}
