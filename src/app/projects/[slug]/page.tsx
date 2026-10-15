import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowUpRight, FiGithub } from "react-icons/fi";
import { projects } from "@/data/portfolio";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.description, openGraph: { images: [p.image] } } : {};
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 pb-24 pt-28 md:px-6">
      <Link href="/#projects" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-fg">
        <FiArrowLeft aria-hidden /> Back to projects
      </Link>
      <p className="mt-10 font-mono text-xs uppercase tracking-widest text-muted">{p.category}</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">{p.title}</h1>
      <p className="mt-4 text-lg text-muted">{p.description}</p>

      <div className="group relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-line">
        <Image
          src={p.image}
          alt={`${p.title} preview`}
          fill
          priority
          sizes="(min-width: 896px) 896px, 100vw"
          className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
        />
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_220px]">
        <p className="whitespace-pre-line leading-relaxed text-muted">{p.longDescription}</p>
        <aside className="space-y-6">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Tech stack</h2>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <li key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            {p.github && (
              <a href={p.github} target="_blank" rel="noreferrer" className="glow inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm">
                <FiGithub aria-hidden /> Source code
              </a>
            )}
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noreferrer" className="glow inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm text-bg">
                <FiArrowUpRight aria-hidden /> Live demo
              </a>
            )}
          </div>
        </aside>
      </div>
    </article>
  );
}
