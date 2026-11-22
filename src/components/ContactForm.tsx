import { contact } from "@/content/site";

const fieldClass =
  "mt-2 w-full border border-bone/25 bg-transparent px-3 py-3 text-base text-bone";

export default function ContactForm() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-bone/15">
      <div className="mx-auto grid max-w-page gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:gap-16 md:py-28">
        <div>
          <h2 className="font-serif text-4xl tracking-[-0.03em] text-bone md:text-5xl">Contact</h2>
          <p className="mt-5 max-w-[26ch] text-lg leading-relaxed text-bone/75">{contact.intro}</p>
        </div>
        <form action={contact.action} method="POST" className="space-y-6">
          <div>
            <label htmlFor="name" className="block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-bone/50">
              Name
            </label>
            <input id="name" name="name" type="text" autoComplete="name" required className={fieldClass} />
          </div>
          <div>
            <label htmlFor="email" className="block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-bone/50">
              Email
            </label>
            <input
              id="email"
              name="_replyto"
              type="email"
              autoComplete="email"
              required
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-bone/50">
              Message
            </label>
            <textarea id="message" name="message" rows={6} required className={`${fieldClass} resize-y`} />
          </div>
          <button
            type="submit"
            className="bg-venom px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-ink hover:bg-bone"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
