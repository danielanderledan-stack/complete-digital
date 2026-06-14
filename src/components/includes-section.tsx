"use client";

import { motion } from "framer-motion";

const ITEMS = ["images", "text", "colours", "details", "hours", "fonts"];

export function IncludesSection() {
  return (
    <section className="relative w-full px-6 py-28 md:py-40">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold tracking-tight text-white md:text-5xl"
        >
          That includes:
        </motion.h2>

        <ul className="mt-8 flex flex-col gap-2 text-left md:mt-10 md:gap-3">
          {ITEMS.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
              className="text-xl text-white/85 md:text-2xl"
            >
              <span className="mr-3 text-white/35">-</span>
              {item}
            </motion.li>
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
      </div>
    </section>
  );
}
