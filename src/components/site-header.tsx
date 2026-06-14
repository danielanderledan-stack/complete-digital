"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MENU_LINKS = [
  { label: "Website", href: "#" },
  { label: "See your website", href: "#" },
];

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 11.4 12 4l9 7.4" />
      <path d="M5.5 9.7V20h13V9.7" />
    </svg>
  );
}

/** Floating pill nav. Slides/fades in after the intro finishes. */
export function SiteHeader({ show }: { show: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: show ? 0.4 : 0 }}
      className="fixed inset-x-0 top-4 z-40 flex justify-center px-4"
    >
      <div className="relative">
        <nav className="flex items-center gap-1 rounded-full border border-white/12 bg-white/[0.06] px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <a
            href="#"
            aria-label="Home"
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10"
          >
            <HomeIcon className="h-5 w-5" />
          </a>

          {/* Desktop link */}
          <a
            href="#"
            className="hidden items-center rounded-full px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white md:inline-flex"
          >
            Website
          </a>

          {/* Burger (mobile) */}
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 md:hidden"
          >
            <span className="relative block h-[14px] w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </nav>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 top-[calc(100%+8px)] flex w-48 flex-col gap-1 rounded-2xl border border-white/12 bg-black/80 p-2 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl md:hidden"
            >
              {MENU_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
