import { useState } from 'react';

const QUESTIONS = [
  {
    q: 'Select all images containing a teapot that is NOT a teapot',
    a: '42',
  },
  {
    q: 'Type the 7th word of our Terms of Service (hint: we change it every 3 seconds)',
    a: 'please',
  },
  {
    q: 'Solve: (\u221E \u00D7 0) + your credit card number',
    a: '0',
  },
  {
    q: 'Are you a robot? (Yes/No/Maybe/Depends on your definition of robot)',
    a: 'no',
  },
];

export default function ImpossibleCaptcha() {
  const [answer, setAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [question, setQuestion] = useState(0);

  const current = QUESTIONS[question % QUESTIONS.length];

  function check() {
    setAttempts((a) => a + 1);
    setQuestion((q) => q + 1);
    setAnswer('');
  }

  return (
    <div className="captcha-container">
      <div className="captcha-header">
        SECURITY VERIFICATION #{attempts + 1} of &infin;
      </div>
      <div className="captcha-question">{current.q}</div>
      <div className="captcha-input-row">
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter answer..."
          className="captcha-input"
        />
        <button onClick={check} className="captcha-btn">
          VERIFY
        </button>
      </div>
      {attempts > 0 && (
        <div className="captcha-error">
          &#10007; WRONG. Attempts remaining: &infin; &mdash; {attempts} = still
          &infin;. Please try again.
        </div>
      )}
    </div>
  );
}
