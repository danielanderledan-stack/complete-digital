"use client";

import { motion } from "motion/react";

const CAPABILITIES = [
  "Book quotes",
  "Message customers",
  "Manage your website",
  "Follow up",
  "Adapt",
];

export function AssistantSection() {
  return (
    <section className="flex min-h-svh flex-col justify-center bg-black px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="font-[family-name:var(--font-pixel)] text-[clamp(2rem,9vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-white"
      >
        Your personal assistant
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-6 text-base text-white/50"
      >
        He can:
      </motion.p>

      <ul className="mt-6 space-y-3">
        {CAPABILITIES.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
            className="flex items-baseline gap-3 text-2xl font-medium text-white sm:text-3xl"
          >
            <span className="text-white/30">—</span>
            {item}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
