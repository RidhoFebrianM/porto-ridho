import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { projects } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 md:px-6">
      <SectionHeading label="03 — Projects" title="Selected Projects" />
      <Reveal stagger as="ul" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <RevealItem as="li" key={p.slug}>
            <TiltCard className="glow group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
                <Image
                  src={p.image}
                  alt={`${p.title} preview`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-mono text-xs uppercase tracking-widest text-muted">{p.category}</p>
                <h3 className="mt-2 font-display text-xl font-bold">
                  {/* Stretched link: whole card opens the detail page */}
                  <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <li key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="relative z-10 mt-5 flex gap-4 text-sm">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
                      <FiGithub aria-hidden /> Code
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
                      <FiArrowUpRight aria-hidden /> Live demo
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
