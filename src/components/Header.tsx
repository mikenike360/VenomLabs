import Link from "next/link";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  return (
    <header id="top" className="sticky top-0 z-20 border-b border-bone/15 bg-ink">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4 sm:px-8">
        <Link href="/" className="font-serif text-2xl tracking-tight text-bone">
          VenomLabs
        </Link>
        <nav aria-label="Page" className="flex gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-bone/80 hover:text-venom"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
