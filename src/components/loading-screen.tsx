"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ShaderAnimation } from "./shader-animation";

const HOLD_MS = 2600; // shader + wordmark stay fully visible
const FADE_MS = 900; // everything fades to black before the page is revealed

/**
 * Mandatory full-screen intro: rainbow shader behind a pixel-font wordmark.
 * The wordmark simply fades out with the shader, then onComplete reveals
 * the page underneath.
 */
export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [out, setOut] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    let fadeTimer: ReturnType<typeof setTimeout>;
    let completeTimer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const run = async () => {
      try {
        await document.fonts?.ready;
      } catch {
        /* no-op */
      }
      if (cancelled) return;

      fadeTimer = setTimeout(() => {
        setOut(true);
        completeTimer = setTimeout(() => {
          if (!done.current) {
            done.current = true;
            onComplete();
          }
        }, FADE_MS);
      }, HOLD_MS);
    };

    run();

    return () => {
      cancelled = true;
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: out ? 0 : 1 }}
        transition={{ duration: FADE_MS / 1000, ease: "easeInOut" }}
      >
        <ShaderAnimation />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
        animate={
          out
            ? { opacity: 0, filter: "blur(6px)" }
            : { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        transition={{
          duration: out ? FADE_MS / 1000 : 0.8,
          ease: out ? "easeIn" : "easeOut",
        }}
        className="font-pixel relative z-10 px-6 text-center leading-[1.45] text-white text-[clamp(1.4rem,7vw,5rem)] [text-shadow:0_2px_40px_rgba(0,0,0,0.55)]"
      >
        Complete digital.
      </motion.h1>
    </div>
  );
}
