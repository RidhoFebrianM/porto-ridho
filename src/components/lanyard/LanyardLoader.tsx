"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/lib/useMedia";
import StaticCard from "./StaticCard";

const Fallback = () => (
  <div className="flex h-full flex-col items-center" aria-hidden>
    <div className="h-1/3 w-px animate-pulse bg-line" />
    <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted">loading card</p>
  </div>
);

const Lanyard = dynamic(() => import("./Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="h-full lg:ml-auto lg:w-1/2">
      <Fallback />
    </div>
  ),
});

export default function LanyardLoader({ eventSource }: { eventSource: RefObject<HTMLElement | null> }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Wait for the browser to be idle so three.js + rapier don't compete with first paint
    const ric = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1));
    const id = ric(() => setReady(true), { timeout: 2000 });
    return () => (window.cancelIdleCallback ?? clearTimeout)(id);
  }, []);

  useEffect(() => {
    // Pause rendering + physics while the hero is off-screen
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full w-full touch-pan-y" role="img" aria-label="Interactive ID badge hanging from a lanyard">
      {reduced || !ready ? (
        // On desktop the wrapper spans the whole hero; keep 2D content in the right half
        <div className="h-full lg:ml-auto lg:w-1/2">{reduced ? <StaticCard /> : <Fallback />}</div>
      ) : (
        <Lanyard active={visible} eventSource={eventSource} />
      )}
    </div>
  );
}
