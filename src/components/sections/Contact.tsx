"use client";

import { useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiSend } from "react-icons/fi";
import { contact } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Magnetic from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

const cards = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}`, Icon: FiMail },
  { label: "GitHub", value: contact.github.replace(/^https?:\/\/(www\.)?/, ""), href: contact.github, Icon: FiGithub },
  { label: "LinkedIn", value: contact.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: contact.linkedin, Icon: FiLinkedin },
];

const input =
  "w-full rounded-xl border border-line bg-card px-4 py-3 text-fg placeholder:text-muted/70 transition-colors focus:border-fg focus:outline-none";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!FORMSPREE_ID) {
      // No form backend configured: fall back to the visitor's mail client
      const d = new FormData(form);
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Portfolio message from ${d.get("name")}`)}&body=${encodeURIComponent(String(d.get("message")))}`;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 md:px-6">
      <SectionHeading label="06 — Contact" title="Let's work together" />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="space-y-3">
          {cards.map(({ label, value, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="glow flex items-center gap-4 rounded-2xl border border-line bg-card p-5"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line">
                <Icon aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-xs uppercase tracking-widest text-muted">{label}</span>
                <span className="block truncate">{value}</span>
              </span>
            </a>
          ))}
        </Reveal>

        <Reveal>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm">Name</span>
                <input name="name" required autoComplete="name" maxLength={100} className={input} placeholder="Your name" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm">Email</span>
                <input name="email" type="email" required autoComplete="email" maxLength={200} className={input} placeholder="you@example.com" />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm">Message</span>
              <textarea name="message" required rows={6} maxLength={5000} className={`${input} resize-y`} placeholder="Tell me about your project..." />
            </label>
            <div className="flex flex-wrap items-center gap-4">
              <Magnetic>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="glow inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg disabled:opacity-60"
                >
                  <FiSend aria-hidden /> {status === "sending" ? "Sending..." : "Send message"}
                </button>
              </Magnetic>
              <p role="status" className="text-sm text-muted">
                {status === "sent" && "Thanks! Your message has been sent."}
                {status === "error" && "Something went wrong. Please email me directly."}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
