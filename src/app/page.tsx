"use client";
import Spline from "@splinetool/react-spline";

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
          {/* <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg">
            VenomLabs
          </h1>
          <p className="text-xl md:text-2xl mt-4 drop-shadow">
            Web3 + Next.js + 3D = 💀🔥
          </p> */}
          {/* <button
            className="btn btn-primary mt-6"
            onClick={() =>
              document.getElementById("portfolio")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            View My Work
          </button> */}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            My Portfolio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow">
              <figure>
                <img
                  src="/project1.png"
                  alt="Project One"
                  className="object-cover w-full h-48"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Project One</h3>
                <p>
                  A modern web app using React, Next.js, and stunning 3D
                  interactions.
                </p>
                <div className="card-actions justify-end">
                  <a
                    href="https://example.com/project1"
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
              <figure>
                <img
                  src="/project2.png"
                  alt="Project Two"
                  className="object-cover w-full h-48"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Project Two</h3>
                <p>
                  An innovative web3 solution showcasing smart contract
                  integrations.
                </p>
                <div className="card-actions justify-end">
                  <a
                    href="https://example.com/project2"
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
              <figure>
                <img
                  src="/project3.png"
                  alt="Project Three"
                  className="object-cover w-full h-48"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Project Three</h3>
                <p>
                  A creative portfolio piece combining 3D animation and modern
                  UI design.
                </p>
                <div className="card-actions justify-end">
                  <a
                    href="https://example.com/project3"
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
            <img
              src="/about-image.jpg"
              alt="About me"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <p className="mb-4">
              I'm a passionate web developer who creates modern, interactive,
              and visually stunning web applications. My work blends creative
              design with the latest technology to deliver impactful digital
              experiences.
            </p>
            <p>
              From immersive 3D experiences to innovative web3 solutions, I bring
              a unique perspective to every project.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-base-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
          <form
            action="https://formspree.io/f/your-form-id"
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
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
