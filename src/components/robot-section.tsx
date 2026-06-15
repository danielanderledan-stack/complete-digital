"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { SplineScene } from "@/components/spline-scene";
import { ScrollMorphText } from "@/components/scroll-morph-text";
import { ASSISTANT_NAME } from "@/lib/brand";

// Cursor-following Spline robot.
const ROBOT_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

/**
 * Tall wrapper gives the inner panel scroll distance to "stick" full-screen.
 * While pinned, the robot fills the screen and the headline morphs from
 * "Meet <name>" to "Your time-saver" — driven by how far you've scrolled
 * through the pinned region (not a timer). The pin releases as you scroll past.
 */
export function RobotSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={wrapRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {/* Robot */}
        <div className="absolute inset-0">
          <SplineScene scene={ROBOT_SCENE} className="h-full w-full" />
        </div>

        {/* Scroll-driven morphing headline */}
        <div className="absolute inset-x-0 top-[14%] z-20 flex justify-center px-4">
          <ScrollMorphText
            from={`Meet ${ASSISTANT_NAME}`}
            to="Your time-saver"
            progress={scrollYProgress}
            className="h-[140px] w-full"
            textClassName="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl"
          />
        </div>
      </div>
    </section>
  );
}
