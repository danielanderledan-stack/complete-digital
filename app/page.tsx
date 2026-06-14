import { GlassNavbar } from "@/components/site/glass-navbar";
import { LocationMap } from "@/components/site/location-map";
import { RobotSection } from "@/components/site/robot-section";
import { AssistantSection } from "@/components/site/assistant-section";
import { CrmSection } from "@/components/site/crm-section";

export default function Home() {
  return (
    <main className="bg-black">
      {/* Hero — full viewport on mobile */}
      <section className="flex h-svh w-full flex-col gap-4 px-4 pb-6 pt-4">
        {/* Floating glass pill navbar */}
        <GlassNavbar />

        {/* Map embed — Victoria, points driven by data/locations.json */}
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-3xl border border-white/10 shadow-sm">
          <LocationMap />
        </div>

        {/* Pixel headline + tagline */}
        <div>
          <h1 className="font-[family-name:var(--font-pixel)] text-[clamp(2.25rem,12vw,5.5rem)] font-semibold leading-[1.05] tracking-tight text-white">
            <span className="block">Pioneering</span>
            <span className="block">The Web Space.</span>
          </h1>
          <p className="mt-3 text-sm text-white/55 sm:text-base">
            Automating B2B, leveraging AI and autonomous backend.
          </p>
        </div>
      </section>

      {/* Sticky robot + gooey morph headline */}
      <RobotSection />

      {/* Personal assistant capabilities */}
      <AssistantSection />

      {/* CRM scroll-animation showcase */}
      <CrmSection />
    </main>
  );
}
