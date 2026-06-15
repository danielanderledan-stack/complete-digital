"use client";

import { useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { SplineScene } from "@/components/spline-scene";
import { ScrollMorphText } from "@/components/scroll-morph-text";
import { ChatOverlay } from "@/components/chat-overlay";
import { ASSISTANT_NAME } from "@/lib/brand";

const ROBOT_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SplineObj = any;

/**
 * Tall wrapper gives the inner panel scroll distance to "stick" full-screen.
 * The robot's head is driven by scroll position (the canvas has pointer events
 * disabled so the scene's built-in mouse-look never fires), and the headline
 * morphs from "Meet <name>" to "Your website assistant" as you scroll through.
 */
export function RobotSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const headRef = useRef<SplineObj>(null);
  const topRef = useRef<SplineObj>(null);

  const applyScroll = (p: number) => {
    const t = Math.min(1, Math.max(0, p));
    const pitch = -0.18 + t * 0.5; // look up → down as you scroll
    const yaw = (0.5 - t) * 0.5; // gentle turn one way → the other
    const head = headRef.current;
    if (head) {
      head.rotation.x = pitch;
      head.rotation.y = yaw;
    }
    const top = topRef.current;
    if (top) top.rotation.y = yaw * 0.5;
  };

  useMotionValueEvent(scrollYProgress, "change", applyScroll);

  const onLoad = (spline: SplineObj) => {
    try {
      headRef.current = spline.findObjectByName("Head");
      topRef.current = spline.findObjectByName("Top part");
      applyScroll(scrollYProgress.get());
    } catch {
      /* scene shape changed — fall back to whatever the scene does by default */
    }
  };

  return (
    <section ref={wrapRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {/* Robot — pointer-events disabled so only scroll drives the head */}
        <div className="pointer-events-none absolute inset-0">
          <SplineScene
            scene={ROBOT_SCENE}
            className="h-full w-full"
            onLoad={onLoad}
          />
        </div>

        {/* Looping chat demo, layered above the robot and the headline */}
        <ChatOverlay />

        {/* Scroll-driven morphing headline, at the robot's head */}
        <div className="absolute inset-x-0 top-[14%] z-20 flex justify-center px-4">
          <ScrollMorphText
            from={`Meet ${ASSISTANT_NAME}`}
            to="Your website assistant"
            progress={scrollYProgress}
            className="h-[120px] w-full"
            textClassName="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-bold tracking-tight text-white text-[clamp(1.5rem,6vw,68px)]"
          />
        </div>
      </div>
    </section>
  );
}
