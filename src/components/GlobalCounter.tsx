/**
 * Global counter banner — "X users traumatized, X anti-patterns deployed"
 * Numbers tick up slowly for effect.
 */
import { useEffect, useState } from 'react';

interface Props {
  traumatized: number;
  deployed: number;
}

function useAnimatedNumber(target: number, duration = 1000): number {
  const [value, setValue] = useState(target);
  useEffect(() => {
    const start = value;
    const diff = target - start;
    if (diff === 0) return;
    const startTime = performance.now();
    let raf: number;
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(start + diff * progress));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return value;
}

export default function GlobalCounter({ traumatized, deployed }: Props) {
  const t = useAnimatedNumber(traumatized);
  const d = useAnimatedNumber(deployed);

  return (
    <div className="global-counter">
      <span>{t.toLocaleString()} users traumatized</span>
      <span className="counter-sep">&bull;</span>
      <span>{d.toLocaleString()} anti-patterns deployed</span>
    </div>
  );
}
