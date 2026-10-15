import { FiBookOpen } from "react-icons/fi";
import { education, interests, profile } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 md:px-6">
      <SectionHeading label="01 — About" title="About Me" />
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal className="space-y-4 text-lg leading-relaxed text-muted">
          {profile.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <h3 className="pt-6 font-mono text-xs uppercase tracking-[0.25em] text-fg">Interests</h3>
          <ul className="flex flex-wrap gap-2">
            {interests.map((it) => (
              <li key={it} className="rounded-full border border-line px-3 py-1 text-sm text-fg">
                {it}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal stagger as="ul" className="space-y-4">
          {education.map((e) => (
            <RevealItem as="li" key={e.school} className="glow flex gap-4 rounded-2xl border border-line bg-card p-6">
              <FiBookOpen aria-hidden className="mt-1 shrink-0 text-muted" />
              <div>
                <p className="font-mono text-xs text-muted">{e.period}</p>
                <h3 className="mt-1 font-display text-xl font-bold">{e.school}</h3>
                <p className="text-muted">{e.major}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
