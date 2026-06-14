"use client";

import { motion } from "framer-motion";

const LINKS = ["Work", "Services", "About"];

/** Fixed navbar. Slides/fades in after the wordmark settles into place. */
export function SiteHeader({ show }: { show: boolean }) {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: show ? 0.45 : 0 }}
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-10"
    >
      <a
        href="#"
        className="flex items-center gap-2.5 text-sm font-medium tracking-tight text-white"
        aria-label="Complete Digital home"
      >
        <span className="inline-flex items-center gap-1" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        </span>
        Complete Digital
      </a>

      <nav className="hidden items-center gap-8 md:flex">
        {LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="text-sm text-white/65 transition-colors hover:text-white"
          >
            {link}
          </a>
        ))}
      </nav>

      <a
        href="#"
        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white backdrop-blur transition-colors hover:bg-white/10"
      >
        Contact
      </a>
    </motion.header>
  );
}
