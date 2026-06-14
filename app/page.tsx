import { GlassNavbar } from "@/components/site/glass-navbar";
import { LocationMap } from "@/components/site/location-map";

export default function Home() {
  return (
    <main className="flex h-svh w-full flex-col gap-4 bg-white px-4 pb-6 pt-4">
      {/* Floating glass pill navbar */}
      <GlassNavbar />

      {/* Map embed — Victoria, points driven by data/locations.json */}
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-3xl border border-black/10 shadow-sm">
        <LocationMap />
      </div>

      {/* Pixel headline */}
      <h1 className="font-[family-name:var(--font-pixel)] text-[clamp(2.25rem,12vw,5.5rem)] font-semibold leading-[1.05] tracking-tight text-black">
        <span className="block">Pioneering</span>
        <span className="block">The Web Space.</span>
      </h1>
    </main>
  );
}
