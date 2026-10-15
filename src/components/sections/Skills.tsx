"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { skills, type SkillCategory } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

const categories = ["All", ...new Set(skills.map((s) => s.category))] as ("All" | SkillCategory)[];

export default function Skills() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const shown = filter === "All" ? skills : skills.filter((s) => s.category === filter);

  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 md:px-6">
      <SectionHeading label="02 — Skills" title="Skills & Technologies" />

      <div role="group" aria-label="Filter skills" className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={`relative rounded-full border px-4 py-1.5 font-mono text-xs transition-colors ${
              filter === c ? "border-fg text-bg" : "border-line text-muted hover:text-fg"
            }`}
          >
            {filter === c && <motion.span layoutId="skill-filter" className="absolute inset-0 -z-10 rounded-full bg-fg" />}
            {c}
          </button>
        ))}
      </div>

      <motion.ul layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <AnimatePresence mode="popLayout">
          {shown.map(({ name, category, icon: Icon }) => (
            <motion.li
              key={name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="glow group flex flex-col items-center gap-3 rounded-2xl border border-line bg-card p-5 text-center"
            >
              <Icon aria-hidden className="size-8 text-muted transition-colors group-hover:text-fg" />
              <span className="text-sm font-medium">{name}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{category}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
