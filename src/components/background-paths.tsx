"use client";

import { motion } from "framer-motion";
import { GooeyText } from "@/components/gooey-text";
import { GlassFilter, LiquidGlassButton } from "@/components/liquid-glass";

const TAGLINES = [
  "Pioneering Web Design",
  "Free, forever",
  "No card required",
  "Ready in 2 minutes",
  "One click, then wait",
];

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* slice = cover, so strokes bleed off every edge (no boxed cutoff) */}
      <svg
        className="h-full w-full text-white"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.025}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths() {
  return (
    <section className="relative flex w-full flex-1 items-center justify-center overflow-hidden">
      <GlassFilter />

      {/* Paths sit higher on mobile (≈3/4 up) and centre on larger screens */}
      <div className="absolute inset-0 -translate-y-[16%] sm:translate-y-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="w-full"
        >
          <GooeyText
            texts={TAGLINES}
            morphTime={1}
            cooldownTime={2.4}
            className="h-[clamp(4rem,18vw,10rem)]"
            textClassName="text-[clamp(1.4rem,7.5vw,76px)] font-bold tracking-tight"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
          className="mt-10"
        >
          <LiquidGlassButton>
            <span className="flex items-center text-base text-white sm:text-lg">
              See your website
              <span className="ml-3 transition-transform duration-300">→</span>
            </span>
          </LiquidGlassButton>
        </motion.div>
      </div>
    </section>
  );
}
