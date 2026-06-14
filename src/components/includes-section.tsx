"use client";

import { motion } from "framer-motion";

const INCLUDES = ["images", "text", "colours", "details", "hours", "fonts"];
const COSTS = [
  "Bot blockers",
  "Ai spam filters",
  "Orbit, our (coming soon) Management Ai",
];

function DashItem({ children, delay }: { children: string; delay: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className="text-xl text-white/85 md:text-2xl"
    >
      <span className="mr-3 text-white/35">-</span>
      {children}
    </motion.li>
  );
}

export function IncludesSection() {
  return (
    <section className="relative w-full px-6 py-28 md:px-16 md:py-40 lg:px-24">
      <div className="max-w-3xl text-left">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold tracking-tight text-white md:text-5xl"
        >
          That includes:
        </motion.h2>

        <ul className="mt-8 flex flex-col gap-2 md:mt-10 md:gap-3">
          {INCLUDES.map((item, i) => (
            <DashItem key={item} delay={i * 0.08}>
              {item}
            </DashItem>
          ))}
        </ul>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="font-pixel mt-20 leading-[1.5] text-white text-[clamp(1.1rem,5vw,2.5rem)] md:mt-28"
        >
          Whats the catch?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="mt-8 max-w-xl space-y-6 md:mt-10"
        >
          <p className="text-base leading-relaxed text-white/70 md:text-lg">
            If it costs{" "}
            <span className="font-semibold text-white">us</span>{" "}money,
            it&apos;ll cost you money. At the end of the day, we&apos;re a
            business, but we&apos;re a fair business who rely on happy customers.
          </p>

          <div>
            <p className="text-base text-white/85 md:text-lg">
              Things that cost money include:
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {COSTS.map((item, i) => (
                <DashItem key={item} delay={i * 0.08}>
                  {item}
                </DashItem>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
