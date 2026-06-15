"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Msg = { from: "ai" | "user"; text: string };

const CHAT: Msg[] = [
  { from: "ai", text: "Hey! I'm Orbit. How can I help?" },
  { from: "user", text: "Add an image gallery page" },
  { from: "ai", text: "Ok, I'm on it." },
  { from: "ai", text: "Done — let me know what you think" },
  { from: "user", text: "Great, thanks!" },
];

const MAX_VISIBLE = 3;
const STEP_MS = 2200;

/**
 * Looping chat demo. New bubbles fade in at the bottom; as each one arrives
 * the stack slides up and the oldest flies up and fades out. Purely on a
 * timer (not scroll-driven) so it always animates while the robot is pinned.
 */
export function ChatOverlay() {
  const [items, setItems] = useState<{ id: number; msg: Msg }[]>([]);

  useEffect(() => {
    let step = 0;
    let id = 0;
    const advance = () => {
      setItems((prev) => {
        const next = [...prev, { id: id++, msg: CHAT[step % CHAT.length] }];
        step++;
        while (next.length > MAX_VISIBLE) next.shift();
        return next;
      });
    };
    advance();
    const t = setInterval(advance, STEP_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-[12%] bottom-[42%] z-30 mx-auto flex max-w-md flex-col justify-end px-4">
      <AnimatePresence initial={false}>
        {items.map(({ id, msg }) => (
          <motion.div
            key={id}
            layout
            initial={{ opacity: 0, y: 28, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -56, scale: 0.95 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "mb-3 flex w-full",
              msg.from === "user" ? "justify-end" : "justify-start",
            )}
          >
            <span
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-lg md:text-base",
                msg.from === "user"
                  ? "rounded-br-sm bg-white text-black"
                  : "rounded-bl-sm border border-white/10 bg-white/10 text-white backdrop-blur-md",
              )}
            >
              {msg.text}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
