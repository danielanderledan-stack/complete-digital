"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ShaderAnimation } from "./shader-animation";

const HOLD_MS = 2600; // shader stays fully visible
const FADE_MS = 900; // shader fades to black before the page is revealed

/**
 * Full-screen intro: rainbow shader behind a pixel-font wordmark.
 * The wordmark carries layoutId="brand" so it hands off to the page title.
 * Calls onComplete once the shader has faded to black.
 */
export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [shaderOut, setShaderOut] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    let fadeTimer: ReturnType<typeof setTimeout>;
    let completeTimer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const run = async () => {
      // Wait for the pixel font so the wordmark matches its handoff target.
      try {
        await document.fonts?.ready;
      } catch {
        /* no-op */
      }
      if (cancelled) return;

      fadeTimer = setTimeout(() => {
        setShaderOut(true);
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
        animate={{ opacity: shaderOut ? 0 : 1 }}
        transition={{ duration: FADE_MS / 1000, ease: "easeInOut" }}
      >
        <ShaderAnimation />
      </motion.div>

      <motion.h1
        layoutId="brand"
        initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-pixel relative z-10 px-6 text-center leading-[1.45] text-white text-[clamp(1.4rem,7vw,5rem)] [text-shadow:0_2px_40px_rgba(0,0,0,0.55)]"
      >
        Complete digital.
      </motion.h1>
    </div>
  );
}
