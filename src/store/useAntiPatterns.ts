/**
 * Central state hook for all anti-pattern toggles, chaos meter, boss mode,
 * achievements, and global counters.
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import { Achievement, ACHIEVEMENTS } from '../utils/achievements';
import { playAchievement, playAlarm, startDrone, playConfetti as playConfettiSound } from '../utils/sound';
import confetti from 'canvas-confetti';

/* ── Anti-pattern definitions ── */
export interface AntiPattern {
  id: string;
  label: string;
  description: string;        /* Sarcastic tutorial text */
}

export const ANTI_PATTERNS: AntiPattern[] = [
  {
    id: 'escaping',
    label: 'Escaping Buttons',
    description: 'The escaping button ensures users really want to click it. If they can catch it.',
  },
  {
    id: 'invisible',
    label: 'Invisible Text',
    description: 'Why show content when you can make users work for it? Engagement!',
  },
  {
    id: 'captcha',
    label: 'Impossible CAPTCHA',
    description: 'Security so strong, even humans can\'t pass it. That\'s the point.',
  },
  {
    id: 'resetting',
    label: 'Self-Resetting Form',
    description: 'Forms that reset teach users to type faster. It\'s a feature, not a bug.',
  },
  {
    id: 'newsletter',
    label: 'Newsletter Popup',
    description: 'This popup appears before the user has read a single word. Engagement!',
  },
  {
    id: 'cookie',
    label: 'Cookie Wall',
    description: 'Cover 90% of the screen with a cookie banner. The remaining 10% is also a cookie banner.',
  },
  {
    id: 'cursor',
    label: 'Random Cursor',
    description: 'Changing the cursor every 2 seconds keeps users guessing. Literally.',
  },
  {
    id: 'autoscroll',
    label: 'Auto-Scroll',
    description: 'Why let users read at their own pace when you can scroll for them?',
  },
  {
    id: 'darkconfirm',
    label: 'Dark Pattern Confirm',
    description: 'The dismiss button is 4px. The accept button is 400px. Choice architecture!',
  },
  {
    id: 'fontchaos',
    label: 'Reading Mode Disabled',
    description: 'Randomly changing font sizes ensures users never get too comfortable reading.',
  },
];

/* ── Chaos level labels ── */
function getChaosLabel(pct: number): string {
  if (pct === 0) return 'Pristine UX';
  if (pct <= 20) return 'Slightly Annoying';
  if (pct <= 40) return 'Mildly Infuriating';
  if (pct <= 60) return 'Actively Hostile';
  if (pct <= 80) return 'Dangerously Unusable';
  if (pct < 100) return 'Approaching Madness';
  return 'Certifiably Unusable';
}

/* ── Hook ── */
export interface AntiPatternState {
  enabled: Record<string, boolean>;
  toggle: (id: string) => void;
  enableAll: () => void;
  disableAll: () => void;
  enabledCount: number;
  chaosPercent: number;
  chaosLabel: string;

  /* Boss mode */
  bossMode: boolean;
  bossTime: number;                 /* seconds survived */
  startBoss: () => void;
  stopBoss: () => void;

  /* Achievements */
  achievements: Achievement[];
  newAchievement: Achievement | null;
  clearNewAchievement: () => void;

  /* Global counters */
  totalTraumatized: number;
  totalDeployed: number;
  bumpTraumatized: () => void;

  /* Tutorial */
  tutorialId: string | null;
  showTutorial: (id: string) => void;
  closeTutorial: () => void;

  /* Easter eggs */
  titleClicks: number;
  bumpTitleClick: () => void;
  premiumTrap: boolean;
  setPremiumTrap: (v: boolean) => void;
  airlineMsg: boolean;

  /* UX Score (inverted — worse = higher) */
  uxScore: number;
}

export function useAntiPatterns(): AntiPatternState {
  /* ── Toggles ── */
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    ANTI_PATTERNS.forEach((p) => (init[p.id] = false));
    return init;
  });

  /* ── Achievements ── */
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const unlockedRef = useRef<Set<string>>(new Set());

  const unlock = useCallback((id: string) => {
    if (unlockedRef.current.has(id)) return;
    const ach = ACHIEVEMENTS.find((a) => a.id === id);
    if (!ach) return;
    unlockedRef.current.add(id);
    setAchievements((prev) => [...prev, ach]);
    setNewAchievement(ach);
    playAchievement();
  }, []);

  const clearNewAchievement = useCallback(() => setNewAchievement(null), []);

  /* ── Counters ── */
  const [totalTraumatized, setTotalTraumatized] = useState(
    () => Math.floor(Math.random() * 50000) + 10000
  );
  const [totalDeployed, setTotalDeployed] = useState(
    () => Math.floor(Math.random() * 200000) + 50000
  );
  const bumpTraumatized = useCallback(() => {
    setTotalTraumatized((n) => n + 1);
    setTotalDeployed((n) => n + 1);
  }, []);

  /* ── Derived ── */
  const enabledCount = Object.values(enabled).filter(Boolean).length;
  const chaosPercent = Math.round((enabledCount / ANTI_PATTERNS.length) * 100);
  const chaosLabel = getChaosLabel(chaosPercent);
  const uxScore = enabledCount * 13 + (enabledCount >= ANTI_PATTERNS.length ? 30 : 0);

  /* ── Toggle logic ── */
  const toggle = useCallback((id: string) => {
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const enableAll = useCallback(() => {
    setEnabled((prev) => {
      const next = { ...prev };
      ANTI_PATTERNS.forEach((p) => (next[p.id] = true));
      return next;
    });
  }, []);

  const [premiumTrap, setPremiumTrap] = useState(false);

  const disableAll = useCallback(() => {
    /* Easter egg: trying to disable all shows premium trap */
    const count = Object.values(enabled).filter(Boolean).length;
    if (count > 0) {
      setPremiumTrap(true);
      unlock('premium_trap');
      return;
    }
    setEnabled((prev) => {
      const next = { ...prev };
      ANTI_PATTERNS.forEach((p) => (next[p.id] = false));
      return next;
    });
  }, [enabled, unlock]);

  /* ── Boss mode ── */
  const [bossMode, setBossMode] = useState(false);
  const [bossTime, setBossTime] = useState(0);
  const bossTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [airlineMsg, setAirlineMsg] = useState(false);

  const startBoss = useCallback(() => {
    enableAll();
    setBossMode(true);
    setBossTime(0);
    setAirlineMsg(false);
    playAlarm();
    bossTimerRef.current = setInterval(() => {
      setBossTime((t) => t + 1);
    }, 1000);
  }, [enableAll]);

  const stopBoss = useCallback(() => {
    setBossMode(false);
    if (bossTimerRef.current) clearInterval(bossTimerRef.current);
    bossTimerRef.current = null;
    setEnabled((prev) => {
      const next = { ...prev };
      ANTI_PATTERNS.forEach((p) => (next[p.id] = false));
      return next;
    });
  }, []);

  /* ── Achievement triggers ── */
  useEffect(() => {
    if (enabledCount >= 1) unlock('first_pattern');
    if (enabledCount >= 5) unlock('ux_criminal');
    if (chaosPercent >= 100) {
      unlock('full_chaos');
      /* Red confetti burst */
      confetti({
        particleCount: 200,
        spread: 120,
        colors: ['#ff0000', '#ff3300', '#cc0000', '#990000', '#ff6600'],
        origin: { y: 0.6 },
      });
      playConfettiSound();
    }
  }, [enabledCount, chaosPercent, unlock]);

  /* Boss mode achievements */
  useEffect(() => {
    if (bossMode && bossTime >= 30) {
      unlock('boss_survivor');
      setAirlineMsg(true);
      unlock('airline');
    }
  }, [bossMode, bossTime, unlock]);

  /* Drone sound based on chaos */
  const droneStopRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    if (droneStopRef.current) {
      droneStopRef.current();
      droneStopRef.current = null;
    }
    if (enabledCount > 0) {
      droneStopRef.current = startDrone(enabledCount);
    }
    return () => {
      if (droneStopRef.current) {
        droneStopRef.current();
        droneStopRef.current = null;
      }
    };
  }, [enabledCount]);

  /* ── Tutorial ── */
  const [tutorialId, setTutorialId] = useState<string | null>(null);
  const showTutorial = useCallback((id: string) => setTutorialId(id), []);
  const closeTutorial = useCallback(() => setTutorialId(null), []);

  /* ── Easter egg: title clicks ── */
  const [titleClicks, setTitleClicks] = useState(0);
  const bumpTitleClick = useCallback(() => {
    setTitleClicks((c) => {
      const next = c + 1;
      if (next >= 10) unlock('rickrolled');
      return next;
    });
  }, [unlock]);

  return {
    enabled,
    toggle,
    enableAll,
    disableAll,
    enabledCount,
    chaosPercent,
    chaosLabel,
    bossMode,
    bossTime,
    startBoss,
    stopBoss,
    achievements,
    newAchievement,
    clearNewAchievement,
    totalTraumatized,
    totalDeployed,
    bumpTraumatized,
    tutorialId,
    showTutorial,
    closeTutorial,
    titleClicks,
    bumpTitleClick,
    premiumTrap,
    setPremiumTrap,
    airlineMsg,
    uxScore,
  };
}
