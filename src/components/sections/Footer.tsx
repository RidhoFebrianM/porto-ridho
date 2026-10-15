import { contact, profile } from "@/data/portfolio";
import SocialLinks from "@/components/ui/SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
        <p className="font-mono text-xs text-muted">
          © {profile.copyrightYear} {profile.name}. All rights reserved.
        </p>
        <SocialLinks links={contact} />
      </div>
    </footer>
  );
}
