"use client";

import { motion, type Variants } from "motion/react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

/** Fade + slide up when scrolled into view. With `stagger`, direct <RevealItem> children animate in sequence. */
export function Reveal({
  children,
  className,
  stagger: isStagger,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  as?: "div" | "ul";
}) {
  const Tag = as === "ul" ? motion.ul : motion.div;
  return (
    <Tag
      className={className}
      variants={isStagger ? stagger : fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "li" }) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag className={className} variants={fadeUp}>
      {children}
    </Tag>
  );
}
