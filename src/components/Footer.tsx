import { social } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-bone/15">
      <div className="mx-auto flex max-w-page flex-col gap-4 px-5 py-8 sm:px-8 md:flex-row md:items-baseline md:justify-between">
        <p className="text-sm text-bone/45">© {new Date().getFullYear()} VenomLabs</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {social.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-bone hover:text-venom"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
