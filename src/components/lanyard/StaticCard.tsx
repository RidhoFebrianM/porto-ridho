import Image from "next/image";
import { contact, profile } from "@/data/portfolio";

/** Non-animated badge for prefers-reduced-motion. */
export default function StaticCard() {
  return (
    <div className="flex h-full flex-col items-center">
      <div aria-hidden className="h-1/4 w-3 bg-[repeating-linear-gradient(180deg,#0a0a0a_0_8px,#fafafa_8px_9px)] ring-1 ring-line" />
      <div aria-hidden className="h-4 w-12 rounded-sm bg-gradient-to-b from-neutral-300 to-neutral-500" />
      <figure className="w-[min(60%,260px)] rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-black p-4 text-neutral-50 shadow-2xl">
        <p className="font-display text-lg font-bold">{profile.nickname}.</p>
        <div className="relative mt-3 aspect-[416/370] overflow-hidden rounded-lg bg-neutral-800">
          <Image src={profile.photo} alt={profile.name} fill sizes="260px" className="object-cover grayscale" />
        </div>
        <figcaption className="mt-3">
          <p className="font-display font-bold">{profile.name}</p>
          <p className="font-mono text-xs text-neutral-400">{profile.roles[0]}</p>
          <p className="mt-2 truncate border-t border-neutral-800 pt-2 font-mono text-[10px] text-neutral-500">
            {contact.github.replace(/^https?:\/\//, "")}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
