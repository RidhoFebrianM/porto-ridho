import { FiGithub, FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";
import type { contact } from "@/data/portfolio";

export default function SocialLinks({ links }: { links: typeof contact }) {
  const items = [
    { href: `mailto:${links.email}`, label: "Email", Icon: FiMail },
    { href: links.github, label: "GitHub", Icon: FiGithub },
    { href: links.linkedin, label: "LinkedIn", Icon: FiLinkedin },
    { href: links.instagram, label: "Instagram", Icon: FiInstagram },
  ];
  return (
    <ul className="flex gap-2">
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={label}
            className="glow grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg"
          >
            <Icon aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
