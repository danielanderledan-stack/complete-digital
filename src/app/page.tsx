"use client";

import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { SiteHeader } from "@/components/site-header";
import { BackgroundPaths } from "@/components/background-paths";

export default function Home() {
  const [revealed, setRevealed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // The intro is mandatory and always plays before the page is revealed.
    setMounted(true);
  }, []);

  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader show={revealed} />
        {revealed && <BackgroundPaths />}
      </div>

      {mounted && !revealed && (
        <LoadingScreen onComplete={() => setRevealed(true)} />
      )}
    </>
  );
}
