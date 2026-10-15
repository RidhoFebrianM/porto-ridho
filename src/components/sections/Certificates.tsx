"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import { certificates, type Certificate } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

export default function Certificates() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<Certificate | null>(null);

  const open = (c: Certificate) => {
    setCurrent(c);
    dialog.current?.showModal(); // native modal: focus trap + Esc for free
  };

  return (
    <section id="certificates" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 md:px-6">
      <SectionHeading label="05 — Certificates" title="Certificates" />
      <Reveal stagger as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((c) => (
          <RevealItem as="li" key={c.title}>
            <button
              type="button"
              onClick={() => open(c)}
              className="glow group block w-full overflow-hidden rounded-2xl border border-line bg-card text-left"
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
                <Image
                  src={c.image}
                  alt={`${c.title} certificate`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold">{c.title}</h3>
                <p className="mt-1 font-mono text-xs text-muted">
                  {c.issuer} · {c.year}
                </p>
              </div>
            </button>
          </RevealItem>
        ))}
      </Reveal>

      <dialog
        ref={dialog}
        aria-label={current?.title}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        onClose={() => setCurrent(null)}
        className="m-auto w-[min(92vw,960px)] rounded-2xl border border-line bg-bg p-0 text-fg"
      >
        {current && (
          <figure>
            <div className="relative aspect-[4/3] w-full">
              <Image src={current.image} alt={`${current.title} certificate`} fill sizes="92vw" className="object-contain" />
            </div>
            <figcaption className="flex items-center justify-between gap-4 border-t border-line p-4">
              <span>
                <strong className="font-display">{current.title}</strong>
                <span className="ml-2 font-mono text-xs text-muted">
                  {current.issuer} · {current.year}
                </span>
              </span>
              <button
                type="button"
                autoFocus
                onClick={() => dialog.current?.close()}
                aria-label="Close preview"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-line"
              >
                <FiX aria-hidden />
              </button>
            </figcaption>
          </figure>
        )}
      </dialog>
    </section>
  );
}
