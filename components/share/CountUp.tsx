'use client'
import  { useEffect, useRef, useState } from "react";

type CountUpProps = {
  start?: number; // starting value (default 0)
  end: number; // final value to reach
  duration?: number; // ms, default 2000
  decimals?: number; // decimal places
  prefix?: string;
  suffix?: string;
  separator?: string; // thousands separator, default ','
  playOnView?: boolean; // start when element scrolls into view
  className?: string; // wrapper class (Tailwind-friendly)
  easing?: (t: number) => number; // optional custom easing
  onComplete?: () => void; // callback when animation completes
};

// Default easing (easeOutCubic)
const defaultEasing = (t: number) => 1 - Math.pow(1 - t, 3);

export default function CountUp({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ",",
  playOnView = true,
  className = "",
  easing = defaultEasing,
  onComplete,
}: CountUpProps) {
  const [value, setValue] = useState(start);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const playedRef = useRef(false);

  // Formatter that respects decimals and a custom thousands separator
  const formatNumber = (n: number) => {
    const fixed = n.toFixed(decimals);
    if (!separator) return fixed;
    const parts = fixed.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join(".");
  };

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const t = Math.min(1, duration <= 0 ? 1 : elapsed / duration);
    const eased = (easing || defaultEasing)(t);
    const current = start + (end - start) * eased;
    setValue(current);
    if (t < 1) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      // finish exactly at `end`
      setValue(end);
      startTimeRef.current = null;
      if (onComplete) onComplete();
    }
  };

  const startAnimation = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startTimeRef.current = null;
    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // If playOnView is false, start immediately
    if (!playOnView) {
      startAnimation();
      playedRef.current = true;
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }

    // Otherwise, use IntersectionObserver to trigger when visible
    const node = nodeRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !playedRef.current) {
            startAnimation();
            playedRef.current = true;
          }
        });
      },
      { threshold: 0.25 }
    );

    io.observe(node);

    return () => {
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, start, duration, playOnView, easing]);

  // In case `end` changes and you want to replay when in view later,
  // you could add logic to reset playedRef.current = false when appropriate.

  return (
    <div ref={nodeRef} className={className} aria-live="polite">
      {prefix}
      {formatNumber(value)}
      {suffix}
    </div>
  );
}

/*
Usage notes (copy into your Next.js project):
- Save this file as `components/CountUp.tsx`.
- Import and use: `import CountUp from '@/components/CountUp'` (or your path).

Props summary:
- start?: number (default 0)
- end: number **(required)**
- duration?: number in ms (default 2000)
- decimals?: number (default 0)
- prefix?: string
- suffix?: string
- separator?: string (default ",")
- playOnView?: boolean (default true) -> uses IntersectionObserver
- className?: string -> Tailwind-friendly styling
- easing?: (t:number)=>number -> custom easing function
- onComplete?: () => void

Example (text):
- Show a counter: end=1500, duration=1800, suffix='+' -> displays "1,500+"
- Use with Tailwind: className="text-5xl font-extrabold text-indigo-600"
*/
