import { House } from "lucide-react";

/**
 * Apple-style frosted-glass pill navbar. Floats at the top of the hero.
 * Home icon + the Complete Digital wordmark.
 */
export function GlassNavbar() {
  return (
    <nav className="flex justify-center">
      <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 py-2 pl-2 pr-4 shadow-lg shadow-black/30 backdrop-blur-xl backdrop-saturate-150">
        <a
          href="/"
          aria-label="Home"
          className="flex size-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 active:bg-white/20"
        >
          <House className="size-5" strokeWidth={2} />
        </a>
        <span className="text-sm font-medium tracking-tight text-white">
          Complete digital.
        </span>
      </div>
    </nav>
  );
}
