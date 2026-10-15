"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { experiences } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 50%"] });

  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 md:px-6">
      <SectionHeading label="04 — Journey" title="Experience & Journey" />
      <ol ref={ref} className="relative">
        {/* Track + fill that grows with scroll */}
        <div aria-hidden className="absolute bottom-0 left-3 top-0 w-px bg-line md:left-1/2" />
        <motion.div aria-hidden style={{ scaleY: scrollYProgress }} className="absolute bottom-0 left-3 top-0 w-px origin-top bg-fg md:left-1/2" />

        {experiences.map((x, i) => {
          const left = i % 2 === 0;
          return (
            <li key={`${x.period}-${x.role}`} className="relative mb-10 pl-10 last:mb-0 md:grid md:grid-cols-2 md:pl-0">
              <span aria-hidden className="absolute left-3 top-6 size-3 -translate-x-1/2 rounded-full border-2 border-fg bg-bg md:left-1/2" />
              <motion.div
                initial={{ opacity: 0, x: left ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`glow rounded-2xl border border-line bg-card p-6 ${left ? "md:col-start-1 md:mr-10" : "md:col-start-2 md:ml-10"}`}
              >
                <p className="font-mono text-xs text-muted">{x.period}</p>
                <h3 className="mt-2 font-display text-xl font-bold">{x.role}</h3>
                <p className="text-sm text-muted">{x.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{x.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {x.tags.map((t) => (
                    <li key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
