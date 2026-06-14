"use client";

import React, { useRef } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  motion,
  type MotionValue,
} from "framer-motion";

/**
 * 3D card that tilts as it scrolls into view, with a video inside whose
 * playback is scrubbed by scroll progress (currentTime = progress * duration).
 *
 * Mobile is made less scroll-sensitive two ways:
 *  - a softer spring (lower stiffness) damps fast flings
 *  - progress is smoothed before driving both the tilt and the video seek
 */
export const ContainerScroll = ({
  titleComponent,
  videoSrc,
  poster,
}: {
  titleComponent: string | React.ReactNode;
  videoSrc: string;
  poster?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Read device class synchronously so the spring is configured correctly
  // on the very first frame (avoids a desktop-config flash on mobile).
  const [isMobile] = React.useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches,
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(
    scrollYProgress,
    isMobile
      ? { stiffness: 45, damping: 20, restDelta: 0.0005 }
      : { stiffness: 90, damping: 24, restDelta: 0.0005 },
  );

  const rotate = useTransform(smooth, [0, 1], [22, 0]);
  const scale = useTransform(smooth, [0, 1], isMobile ? [0.8, 0.95] : [1.05, 1]);
  const translate = useTransform(smooth, [0, 1], [0, -100]);

  // Drive video playback from the smoothed scroll progress.
  useMotionValueEvent(smooth, "change", (p) => {
    const v = videoRef.current;
    if (!v) return;
    const d = v.duration;
    if (!d || Number.isNaN(d)) return;
    const t = Math.min(Math.max(p, 0), 1) * d;
    if (Math.abs(t - v.currentTime) > 0.01) {
      try {
        v.currentTime = t;
      } catch {
        /* seek not ready yet */
      }
    }
  });

  // Prime the decoder so seeking is responsive (helps iOS especially).
  const onLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play()
      .then(() => v.pause())
      .catch(() => {});
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-[70rem] items-center justify-center p-2 md:h-[80rem] md:p-20"
    >
      <div
        className="relative w-full py-10 md:py-40"
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate}>{titleComponent}</Header>
        <Card rotate={rotate} scale={scale}>
          <video
            ref={videoRef}
            src={videoSrc}
            poster={poster}
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={onLoadedMetadata}
            className="h-full w-full object-cover"
          />
        </Card>
      </div>
    </div>
  );
};

const Header = ({
  translate,
  children,
}: {
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => (
  <motion.div
    style={{ translateY: translate }}
    className="mx-auto max-w-5xl text-center"
  >
    {children}
  </motion.div>
);

const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      boxShadow:
        "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
    }}
    className="mx-auto -mt-12 h-[30rem] w-full max-w-5xl rounded-[30px] border-4 border-[#6C6C6C] bg-[#222222] p-2 shadow-2xl md:h-[40rem] md:p-6"
  >
    <div className="h-full w-full overflow-hidden rounded-2xl bg-zinc-900 md:rounded-2xl">
      {children}
    </div>
  </motion.div>
);
