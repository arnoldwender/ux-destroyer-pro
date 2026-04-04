/**
 * Web Audio API sound system for UX Destroyer Pro.
 * Generates annoying synth sounds that layer as more anti-patterns activate.
 */

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

/** Short error "buzz" for CAPTCHA failures */
export function playError() {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(120, ctx.currentTime);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.3);
}

/** Notification "ding" for popups */
export function playNotification() {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.2);
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.2);
}

/** Achievement unlock fanfare */
export function playAchievement() {
  const ctx = getCtx();
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
    gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.15);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime + i * 0.1);
    osc.stop(ctx.currentTime + i * 0.1 + 0.15);
  });
}

/** Boss mode alarm siren */
export function playAlarm() {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.5);
  osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + 1);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 1);
}

/** Annoying drone that represents ambient chaos — returns a stop function */
export function startDrone(intensity: number): () => void {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();

  /* Low rumble with LFO modulation */
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(55 + intensity * 2, ctx.currentTime);

  lfo.type = 'sine';
  lfo.frequency.setValueAtTime(3 + intensity * 0.5, ctx.currentTime);
  lfoGain.gain.setValueAtTime(20 + intensity * 3, ctx.currentTime);

  lfo.connect(lfoGain).connect(osc.frequency);
  gain.gain.setValueAtTime(Math.min(0.04, intensity * 0.005), ctx.currentTime);
  osc.connect(gain).connect(ctx.destination);

  osc.start();
  lfo.start();

  return () => {
    try {
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.stop(ctx.currentTime + 0.35);
      lfo.stop(ctx.currentTime + 0.35);
    } catch {
      /* already stopped */
    }
  };
}

/** Confetti red burst */
export function playConfetti() {
  const ctx = getCtx();
  /* White noise burst */
  const bufferSize = ctx.sampleRate * 0.3;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.06, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  src.connect(gain).connect(ctx.destination);
  src.start();
}
