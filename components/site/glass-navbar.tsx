import { House } from "lucide-react";

/**
 * Apple-style frosted-glass pill navbar. Floats at the top of the hero.
 * Only a home icon for now — more items slot in beside it later.
 */
export function GlassNavbar() {
  return (
    <nav className="flex justify-center">
      <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-2 shadow-lg shadow-black/5 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/50">
        <a
          href="/"
          aria-label="Home"
          className="flex size-9 items-center justify-center rounded-full text-black transition-colors hover:bg-black/5 active:bg-black/10"
        >
          <House className="size-5" strokeWidth={2} />
        </a>
      </div>
    </nav>
  );
}
