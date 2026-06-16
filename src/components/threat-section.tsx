"use client";

import { WebGLShader } from "@/components/webgl-shader";

export function ThreatSection() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <WebGLShader />

      <div className="relative z-10 flex min-h-[85vh] items-center justify-center px-6 text-center">
        <h2 className="font-pixel leading-[1.55] text-white text-[clamp(1rem,4.2vw,2.6rem)] [text-shadow:0_2px_30px_rgba(0,0,0,0.85)]">
          Threat protection,
          <br />
          from just $16.
        </h2>
      </div>
    </section>
  );
}
