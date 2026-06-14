"use client";

import { useEffect, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { LoadingScreen } from "@/components/loading-screen";
import { SiteHeader } from "@/components/site-header";
import { BackgroundPaths } from "@/components/background-paths";

export default function Home() {
  const [revealed, setRevealed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // The intro is mandatory: it must always appear and play through before
    // the page is revealed. We deliberately do NOT skip it for reduced motion
    // (framer-motion's default reducedMotion is "never", so it still plays).
    setMounted(true);
  }, []);

  return (
    <LayoutGroup>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader show={revealed} />

        {/* Wordmark settles here, just below the navbar */}
        <div className="flex justify-center px-6 pt-28 pb-2 md:pt-32">
          {revealed && (
            <motion.h1
              layoutId="brand"
              transition={{
                layout: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
              }}
              className="font-pixel text-center leading-[1.45] text-white text-[clamp(1rem,4.2vw,2.6rem)]"
            >
              Complete digital.
            </motion.h1>
          )}
        </div>

        {/* Section 1: pioneering web design over off-screen paths */}
        {revealed && <BackgroundPaths title="Pioneering Web Design" />}
      </div>

      {/* Intro overlay — unmounts on reveal, handing the wordmark to the page */}
      {mounted && !revealed && (
        <LoadingScreen onComplete={() => setRevealed(true)} />
      )}
    </LayoutGroup>
  );
}
