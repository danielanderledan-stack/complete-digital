"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type Msg = { from: "ai" | "user"; text: string };

// Orbit only has access to the website — every task is a site change, and the
// one out-of-scope request gets politely declined.
const CHAT: Msg[] = [
  { from: "ai", text: "Hey! I'm Orbit. How can I help?" },
  { from: "user", text: "Add an image gallery page" },
  { from: "ai", text: "On it…" },
  { from: "ai", text: "Done — take a look" },
  { from: "user", text: "Change the main heading to navy" },
  { from: "ai", text: "Updated the heading colour" },
  { from: "user", text: "Add a contact form to the homepage" },
  { from: "ai", text: "Added — it'll email you on every submit" },
  { from: "user", text: "Can you reply to those emails too?" },
  {
    from: "ai",
    text: "I can only make changes to your website — email's outside my reach",
  },
  { from: "user", text: "Fair enough. Speed it up on mobile?" },
  { from: "ai", text: "Optimised the images and scripts — about 40% faster" },
  { from: "user", text: "Amazing, thanks!" },
  { from: "ai", text: "Anytime" },
];

const MAX_VISIBLE = 3;
const STEP_MS = 2200;

/**
 * Looping chat demo. Only starts once the overlay is actually in view, and
 * pauses when scrolled away. New bubbles fade in at the bottom; as each one
 * arrives the stack slides up and the oldest flies up and fades out.
 */
export function ChatOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  const [items, setItems] = useState<{ id: number; msg: Msg }[]>([]);
  const stepRef = useRef(0);
  const idRef = useRef(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView) return;

    const advance = () => {
      setItems((prev) => {
        const next = [...prev, { id: idRef.current++, msg: CHAT[stepRef.current % CHAT.length] }];
        stepRef.current++;
        while (next.length > MAX_VISIBLE) next.shift();
        return next;
      });
    };

    // Show the first message immediately the first time it comes into view.
    if (!startedRef.current) {
      startedRef.current = true;
      advance();
    }

    const t = setInterval(advance, STEP_MS);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-x-0 top-[32%] bottom-[16%] z-30 mx-auto flex max-w-md flex-col justify-end px-4"
    >
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
