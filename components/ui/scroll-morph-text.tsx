"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollMorphTextProps {
  from: string;
  to: string;
  /** Scroll progress (0 → 1) that drives the morph. */
  progress: MotionValue<number>;
  /** Progress window over which the morph happens; holds at both ends. */
  range?: [number, number];
  className?: string;
  textClassName?: string;
}

/**
 * Gooey blur/threshold morph between two strings — but driven by scroll
 * position instead of a timer. Same visual technique as the GooeyText
 * component (overlapping spans + SVG threshold filter), wired to a MotionValue.
 */
export function ScrollMorphText({
  from,
  to,
  progress,
  range = [0.2, 0.7],
  className,
  textClassName,
}: ScrollMorphTextProps) {
  const fromRef = useRef<HTMLSpanElement>(null);
  const toRef = useRef<HTMLSpanElement>(null);

  const setMorph = (fraction: number) => {
    const a = fromRef.current;
    const b = toRef.current;
    if (!a || !b) return;
    b.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    b.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
    const inv = 1 - fraction;
    a.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
    a.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;
  };

  const fractionFor = (p: number) => {
    const [start, end] = range;
    return Math.min(1, Math.max(0, (p - start) / (end - start)));
  };

  useMotionValueEvent(progress, "change", (p) => setMorph(fractionFor(p)));

  // Initialise to the current scroll position so it shows `from` before scrolling.
  useEffect(() => {
    setMorph(fractionFor(progress.get()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("relative", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="morph-threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="flex items-center justify-center"
        style={{ filter: "url(#morph-threshold)" }}
      >
        <span
          ref={fromRef}
          className={cn("absolute inline-block select-none text-center", textClassName)}
        >
          {from}
        </span>
        <span
          ref={toRef}
          style={{ opacity: 0 }}
          className={cn("absolute inline-block select-none text-center", textClassName)}
        >
          {to}
        </span>
      </div>
    </div>
  );
}
