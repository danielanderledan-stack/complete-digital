"use client";

import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { SiteHeader } from "@/components/site-header";
import { BackgroundPaths } from "@/components/background-paths";
import { ContainerScroll } from "@/components/container-scroll";
import { IncludesSection } from "@/components/includes-section";
import { RobotSection } from "@/components/robot-section";

export default function Home() {
  const [revealed, setRevealed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // The intro is mandatory and always plays before the page is revealed.
    setMounted(true);
  }, []);

  return (
    <>
      <SiteHeader show={revealed} />

      {revealed && (
        <main>
          <div className="flex min-h-screen flex-col">
            <BackgroundPaths />
          </div>

          <ContainerScroll
            videoSrc="/placeholder.mp4"
            titleComponent={
              <div className="mb-4 md:mb-6">
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/55 md:text-base">
                  Totally free
                </p>
                <h2 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-7xl">
                  VISUAL EDITOR
                </h2>
              </div>
            }
          />

          <IncludesSection />

          <RobotSection />
        </main>
      )}

      {mounted && !revealed && (
        <LoadingScreen onComplete={() => setRevealed(true)} />
      )}
    </>
  );
}
