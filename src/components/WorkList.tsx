import Image from "next/image";
import type { Project } from "@/content/site";

type WorkListProps = {
  title: string;
  projects: Project[];
  className?: string;
};

export default function WorkList({ title, projects, className = "" }: WorkListProps) {
  return (
    <section className={`mx-auto max-w-page px-5 sm:px-8 ${className}`}>
      {title ? (
        <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-bone/45">{title}</h2>
      ) : null}
      <ol className={`${title ? "mt-6" : ""} border-b border-bone/15`}>
        {projects.map((project, index) => (
          <li key={project.name} className="group border-t border-bone/15">
            <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-x-4 gap-y-5 py-8 md:grid-cols-[2.25rem_7.5rem_minmax(0,1fr)_auto] md:gap-x-8 md:py-10">
              <span className="font-mono text-xs tabular-nums text-venom">
                {String(index + 1).padStart(2, "0")}
              </span>
              {project.image ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative col-start-2 row-start-1 aspect-[4/3] w-28 overflow-hidden border border-bone/15 bg-ink md:col-start-2 md:w-full"
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt || `${project.name} preview`}
                    fill
                    sizes="120px"
                    className="object-cover object-top transition-opacity duration-200 group-hover:opacity-90"
                  />
                </a>
              ) : (
                <div className="hidden md:block" />
              )}
              <div className="col-span-2 col-start-1 md:col-span-1 md:col-start-3">
                <h3 className="font-serif text-[1.85rem] leading-none tracking-[-0.03em] text-bone transition-colors duration-200 group-hover:text-venom sm:text-4xl md:text-[2.75rem]">
                  {project.name}
                </h3>
                <p className="mt-4 max-w-[50ch] text-base leading-relaxed text-bone/70">{project.summary}</p>
                {project.note ? (
                  <p className="mt-3 font-mono text-xs text-bone/45">{project.note}</p>
                ) : null}
              </div>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="col-start-2 row-start-1 self-start justify-self-end font-mono text-[0.7rem] uppercase tracking-[0.14em] text-venom hover:text-bone md:col-start-4 md:row-start-auto md:justify-self-auto"
              >
                {project.linkLabel}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
