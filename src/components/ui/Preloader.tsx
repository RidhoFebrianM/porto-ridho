"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/data/portfolio";

const DURATION = 1200;

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Once per tab session, and never for reduced-motion users
    let seen = false;
    let raf = 0;
    try {
      seen = sessionStorage.getItem("preloaded") === "1";
      sessionStorage.setItem("preloaded", "1");
    } catch {}
    if (seen || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setDone(true));
      return () => cancelAnimationFrame(raf);
    }
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 150);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden
          className="preloader fixed inset-0 z-[80] flex items-end justify-between bg-bg p-6 md:p-10"
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <span className="font-display text-2xl font-bold">{profile.nickname}.</span>
          <span className="font-mono text-6xl tabular-nums md:text-8xl">{count}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
