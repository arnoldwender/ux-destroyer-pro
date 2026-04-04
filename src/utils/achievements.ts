/**
 * Achievement definitions for UX Destroyer Pro.
 * Tracks unlocked achievements in session state.
 */

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_pattern',
    title: 'First Blood',
    description: 'Enabled your first anti-pattern',
    icon: '1',
  },
  {
    id: 'ux_criminal',
    title: 'UX Criminal',
    description: 'Enabled 5 anti-patterns simultaneously',
    icon: '5',
  },
  {
    id: 'boss_survivor',
    title: 'Boss Mode Survivor',
    description: 'Survived Boss Mode for 30 seconds',
    icon: '30',
  },
  {
    id: 'full_chaos',
    title: 'Certified Chaos Agent',
    description: 'Reached 100% on the Chaos Meter',
    icon: 'MAX',
  },
  {
    id: 'rickrolled',
    title: 'Never Gonna Give You Up',
    description: 'Clicked the title 10 times',
    icon: 'RICK',
  },
  {
    id: 'premium_trap',
    title: 'Premium Subscriber',
    description: 'Tried to disable all anti-patterns',
    icon: '$99',
  },
  {
    id: 'airline',
    title: 'Frequent Flyer',
    description: 'Survived Boss Mode for 30 seconds and saw the airline message',
    icon: 'FLY',
  },
];
