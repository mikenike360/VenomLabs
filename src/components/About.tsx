import { about } from "@/content/site";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-bone/15">
      <div className="mx-auto grid max-w-page gap-8 px-5 py-20 sm:px-8 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-16 md:py-28">
        <h2 className="font-serif text-4xl tracking-[-0.03em] text-bone md:text-5xl">About</h2>
        <div className="max-w-[62ch] space-y-5 text-base leading-relaxed text-bone/80 md:text-lg">
          {about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
