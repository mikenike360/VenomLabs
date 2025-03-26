"use client";
import Spline from "@splinetool/react-spline";
import Image from "next/image";

export default function Home() {
  return (
    <div className="scroll-smooth">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen w-full">
        <Spline
          scene="https://prod.spline.design/3CU0rFahMzOL1F2b/scene.splinecode"
          className="absolute inset-0 z-0"
        />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center">
          <button
            className="btn btn-primary mt-64"
            onClick={() =>
              document.getElementById("portfolio")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Enter Site
          </button>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">
            Recent Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="relative w-full h-48">
                <Image
                  src="/project1.png"
                  alt="Project One"
                  layout="fill"
                  objectFit="cover"
                />
              </figure>
              <div className="card-body text-primary">
                <h3 className="card-title">zKontract</h3>
                <p>
                  A decentralized bounty board, built on the Aleo blockchain. Currently live on the Aleo Mainnet!
                </p>
                <div className="card-actions justify-end">
                  <a
                    href="https://zkontract.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    View
                  </a>
                </div>
              </div>
            </div>
            {/* Project Card 2 */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="relative w-full h-48">
                <Image
                  src="/project2.png"
                  alt="Project Two"
                  layout="fill"
                  objectFit="cover"
                />
              </figure>
              <div className="card-body text-primary">
                <h3 className="card-title">Miller's Hill Farm</h3>
                <p>
                  A modern venue website built with React and Tailwind CSS. Includes a completely custom reservation and image gallery system with a backend DataBase built with SupaBase
                </p>
                <div className="card-actions justify-end">
                  <a
                    href="https://millers-farm-react-website.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    View
                  </a>
                </div>
              </div>
            </div>
            {/* Project Card 3 */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="relative w-full h-48">
                <Image
                  src="/project3.png"
                  alt="Project Three"
                  layout="fill"
                  objectFit="cover"
                />
              </figure>
              <div className="card-body text-primary">
                <h3 className="card-title ">zKoi</h3>
                <p>
                  An NFT framework built on the Aleo blockchain. Coming soon!
                </p>
                <div className="card-actions justify-end">
                  <a
                    href="https://zkoi.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    View
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="relative w-full h-80">
              <Image
                src="/labs.png"
                alt="About VenomLabs"
                layout="fill"
                objectFit="scale-down"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-4xl font-bold mb-4">About VenomLabs</h2>
            <p className="mb-4">
            At VenomLabs, we engineer digital solutions with precision and bite. We're a forward-thinking
            development studio specializing in crafting high-performance software, scalable infrastructure, and
            cutting-edge Web3 applications. Our mission is to simplify complex problems through elegant code,
            innovative design, and bulletproof security.
            </p>
            <p>
            We don’t just build — we experiment, iterate, and push the limits of what's possible. Whether it's
            decentralized apps, backend systems, or full-stack platforms, VenomLabs delivers code that's clean,
            efficient, and venomously effective.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-base-200 text-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
          <form
            action="https://formspree.io/f/mgvazgke"
            method="POST"
            className="max-w-lg mx-auto"
          >
            <div className="form-control mb-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mb-4">
              <input
                type="email"
                name="_replyto"
                placeholder="Your Email"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mb-4">
              <textarea
                name="message"
                placeholder="Your Message"
                className="textarea textarea-bordered w-full"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-white text-center">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} VenomLabs. All rights reserved.</p>
          <div className="mt-4 space-x-4">

          </div>
        </div>
      </footer>
    </div>
  );
}
