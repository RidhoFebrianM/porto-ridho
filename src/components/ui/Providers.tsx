"use client";

import { MotionConfig } from "motion/react";
import { ReactLenis } from "lenis/react";
import CustomCursor from "./CustomCursor";
import Preloader from "./Preloader";
import { useReducedMotion } from "@/lib/useMedia";

export default function Providers({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    // reducedMotion="user" makes every motion animation skip transforms when the OS asks for it
    <MotionConfig reducedMotion="user">
      {!reduced && <ReactLenis root options={{ anchors: true, lerp: 0.1 }} />}
      <Preloader />
      <CustomCursor />
      {children}
    </MotionConfig>
  );
}
