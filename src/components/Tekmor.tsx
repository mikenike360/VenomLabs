import Image from "next/image";
import { tekmor } from "@/content/site";

export default function Tekmor() {
  return (
    <section id="work" className="scroll-mt-24">
      <div className="mx-auto max-w-page px-5 pt-12 sm:px-8 md:pt-16">
        <div className="grid items-end gap-8 border-t border-bone/15 pt-8 md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-venom">Now</p>
            <h2 className="mt-3 font-serif text-[clamp(3.25rem,7vw,6rem)] italic leading-none tracking-[-0.045em] text-bone">
              {tekmor.name}
            </h2>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-bone/75">{tekmor.summary}</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-bone/45">{tekmor.note}</p>
          </div>
          <a
            href={tekmor.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit bg-venom px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-ink hover:bg-bone"
          >
            Play
          </a>
        </div>
        <figure className="mt-8 md:mt-10">
          <Image
            src={tekmor.image}
            alt={tekmor.imageAlt}
            width={1920}
            height={1065}
            priority
            className="h-auto w-full border border-bone/15"
          />
          <figcaption className="mt-3 font-mono text-xs text-bone/45">{tekmor.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
