"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin } from "react-icons/fi";
import { contact, profile } from "@/data/portfolio";
import Magnetic from "@/components/ui/Magnetic";
import LanyardLoader from "@/components/lanyard/LanyardLoader";

const ease = [0.22, 1, 0.36, 1] as const;

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom" aria-live="off">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease }}
          className="block"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const btn =
  "glow inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors";

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const words = `Hi, I'm ${profile.name}`.split(" ");

  return (
    <section ref={section} id="home" className="relative overflow-hidden pt-16">
      <div aria-hidden className="dots pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-4 px-4 md:px-6 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-2">
        <div className="order-2 pb-16 lg:order-1 lg:pb-0">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted"
          >
            <span className="size-1.5 rounded-full bg-fg" /> Welcome to my portfolio
          </motion.p>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl" aria-label={words.join(" ")}>
            {words.map((w, i) => (
              <span key={i} aria-hidden className="mr-[0.25em] inline-block overflow-hidden pb-1 align-top">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}>
            <p className="mt-4 font-mono text-lg text-muted md:text-xl">
              <span aria-hidden>{"> "}</span>
              <span className="sr-only">{profile.roles.join(", ")}</span>
              <span aria-hidden>
                <RotatingRole />
              </span>
            </p>
            <p className="mt-6 max-w-lg leading-relaxed text-muted">{profile.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a href={profile.cv} download className={`${btn} border-fg bg-fg text-bg`}>
                  <FiDownload aria-hidden /> Download CV
                </a>
              </Magnetic>
              <Magnetic>
                <a href={contact.github} target="_blank" rel="noreferrer" className={`${btn} hover:text-fg`}>
                  <FiGithub aria-hidden /> GitHub
                </a>
              </Magnetic>
              <Magnetic>
                <a href={contact.linkedin} target="_blank" rel="noreferrer" className={btn}>
                  <FiLinkedin aria-hidden /> LinkedIn
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className={btn}>
                  Contact Me <FiArrowRight aria-hidden />
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* Desktop: the 3D canvas spans the whole hero (click-through) so the card can be thrown anywhere */}
        <div className="order-1 h-[340px] lg:pointer-events-none lg:absolute lg:inset-0 lg:h-auto">
          <LanyardLoader eventSource={section} />
        </div>
      </div>
    </section>
  );
}
