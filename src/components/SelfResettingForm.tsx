import { useState, useEffect } from 'react';

const FIELDS = [
  { label: 'YOUR NAME', ph: 'John Doe' },
  { label: 'EMAIL', ph: 'john@example.com' },
];

export default function SelfResettingForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [countdown, setCountdown] = useState(10);
  const [resets, setResets] = useState(0);

  const hasContent = name || email || msg;
  const values = [
    { val: name, set: setName },
    { val: email, set: setEmail },
  ];

  useEffect(() => {
    if (!name && !email && !msg) return;
    const iv = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          setName('');
          setEmail('');
          setMsg('');
          setResets((r) => r + 1);
          clearInterval(iv);
          return 10;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [name, email, msg]);

  return (
    <div className="form-container">
      {hasContent && (
        <div className="form-warning">
          &#9888; Form resets in {countdown}s &mdash; Times reset: {resets}
        </div>
      )}
      <div className="form-grid">
        {FIELDS.map((f, i) => (
          <div key={f.label}>
            <div className="form-label">{f.label}</div>
            <input
              value={values[i].val}
              onChange={(e) => values[i].set(e.target.value)}
              placeholder={f.ph}
              className="form-input"
            />
          </div>
        ))}
        <div>
          <div className="form-label">MESSAGE</div>
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Tell us your hopes and dreams..."
            className="form-textarea"
          />
        </div>
        <button className="form-submit">
          SUBMIT (disabled for your protection)
        </button>
      </div>
    </div>
  );
}
