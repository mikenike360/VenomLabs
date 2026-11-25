import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import GroveLoader from "@/components/GroveLoader";
import Header from "@/components/Header";
import Tekmor from "@/components/Tekmor";
import WorkList from "@/components/WorkList";
import {
  opening,
  projects,
  scenes,
  scenesIntro,
  scenesTitle,
  workIntro,
  workTitle,
} from "@/content/site";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="relative min-h-[78vh] overflow-hidden">
          <GroveLoader />
          <div className="relative z-10 mx-auto max-w-page px-5 pb-28 pt-14 sm:px-8 md:pt-24">
            <h1 className="max-w-[12em] font-serif text-[clamp(2.55rem,5.6vw,5.5rem)] leading-[0.96] tracking-[-0.035em] text-bone">
              {opening.lead}
              {opening.accent ? (
                <>
                  {" "}
                  <a
                    href={opening.accentHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="italic text-venom hover:text-bone"
                  >
                    {opening.accent}
                  </a>
                  {opening.rest}
                </>
              ) : null}
            </h1>
            <p className="mt-8 max-w-[36ch] text-base leading-relaxed text-bone/70 md:text-lg">
              {opening.deck}
            </p>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent to-ink" />
        </section>
        <Tekmor />
        <WorkList
          title={scenesTitle}
          intro={scenesIntro}
          projects={scenes}
          className="pb-4 pt-16 md:pt-24"
        />
        <WorkList
          title={workTitle}
          intro={workIntro}
          projects={projects}
          className="pb-8 pt-14 md:pt-20"
        />
        <About />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
