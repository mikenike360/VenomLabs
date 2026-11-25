import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

type Credit = {
  id: string;
  title: string;
  creator: string;
  licence: string;
};

export const metadata: Metadata = {
  title: "Credits · VenomLabs",
  description: "Models used in the VenomLabs hero scene, with creator and licence.",
};

function licenceHref(licence: string) {
  if (licence.startsWith("CC-BY") || licence.startsWith("CC BY")) {
    return "https://creativecommons.org/licenses/by/3.0/";
  }
  return "https://creativecommons.org/publicdomain/zero/1.0/";
}

export default function CreditsPage() {
  const credits = JSON.parse(
    readFileSync(join(process.cwd(), "public/grove/credits.json"), "utf8"),
  ) as Credit[];

  return (
    <>
      <Header />
      <main className="mx-auto max-w-page px-5 py-16 sm:px-8 md:py-24">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-venom">Model</p>
      <h1 className="mt-4 font-serif text-5xl tracking-[-0.03em] text-bone md:text-6xl">Credits</h1>
      <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-bone/75">
        The hero scene uses this model. CC BY work is used as published, with credit back to the maker.
      </p>
      <ul className="mt-12 divide-y divide-bone/15 border-y border-bone/15">
        {credits.map((credit) => (
          <li key={credit.id} className="grid gap-2 py-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-baseline">
            <p className="font-serif text-2xl text-bone">
              <a
                href={`https://poly.pizza/m/${credit.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-venom"
              >
                {credit.title}
              </a>
              <span className="text-bone/55"> by {credit.creator}</span>
            </p>
            <a
              href={licenceHref(credit.licence)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.14em] text-bone/50 hover:text-venom"
            >
              {credit.licence}
            </a>
          </li>
        ))}
      </ul>
    </main>
      <Footer />
    </>
  );
}
