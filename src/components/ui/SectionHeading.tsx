import { Reveal } from "./Reveal";

export default function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <Reveal className="mb-12">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">{label}</p>
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
    </Reveal>
  );
}
