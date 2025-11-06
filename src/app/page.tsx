"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ThemeSwitcher from "./components/ThemeSwitcher";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const tagline = "Engineering digital solutions with precision and bite";
  
  // Typing animation
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= tagline.length) {
        setTypedText(tagline.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Calculate scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "luxury";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="scroll-smooth bg-base-100 transition-colors duration-300">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="custom-cursor hidden md:block"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      />
      <div
        className="custom-cursor-trail hidden md:block"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-base-200 z-[60]">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation Bar */}
      <nav
        className={`fixed top-1 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-base-100/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            VenomLabs
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {["Portfolio", "About", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  document
                    .getElementById(item.toLowerCase())
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`transition-colors hover:text-primary font-medium ${
                  scrolled 
                    ? "text-base-content" 
                    : "text-base-100"
                }`}
              >
                {item}
              </button>
            ))}
            
            {/* Theme Switcher */}
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                } ${scrolled ? "text-base-content" : "text-base-100"}`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                } ${scrolled ? "text-base-content" : "text-base-100"}`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                } ${scrolled ? "text-base-content" : "text-base-100"}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-base-100 z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {["Portfolio", "About", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => {
                document
                  .getElementById(item.toLowerCase())
                  ?.scrollIntoView({ behavior: "smooth" });
                setMobileMenuOpen(false);
              }}
              className="text-3xl font-bold text-base-content hover:text-primary transition-colors"
            >
              {item}
            </button>
          ))}
          <ThemeSwitcher />
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-primary/80 via-secondary/60 to-primary/80">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 animate-gradient"></div>
        
        {/* Particles Background */}
        <div className="particles-container absolute inset-0 z-[1]">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 20}s`,
              }}
            />
          ))}
        </div>

        {/* Geometric shapes for visual interest */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-base-100 text-center px-4">
          <div className="space-y-6 animate-fadeIn">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
              VenomLabs
            </h1>
            <p className="text-xl md:text-2xl text-base-100/90 max-w-2xl mx-auto flex items-center justify-center">
              {typedText}
              <span className="animate-pulse ml-1">|</span>
            </p>
            <button
              className="btn btn-primary mt-8 rounded-full text-lg shadow-2xl hover:scale-105 transition-all duration-300"
              onClick={() =>
                document.getElementById("portfolio")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Explore Projects
            </button>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-gradient-to-b from-base-200 to-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate opacity-0">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Recent Projects
            </h2>
            <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
              Cutting-edge solutions built with modern technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <div className="group relative bg-base-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 scroll-animate opacity-0">
              <figure className="relative w-full h-56 overflow-hidden bg-base-200">
                <Image
                  src="/project1.png"
                  alt="Project One"
                  layout="fill"
                  objectFit="contain"
                  className="group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </figure>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-base-content mb-3">zKontract</h3>
                <p className="text-base-content/70 mb-4 line-clamp-3">
                  A decentralized bounty board, built on the Aleo blockchain. Currently live on the Aleo Mainnet!
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="badge badge-primary">Blockchain</span>
                  <span className="badge badge-secondary">Web3</span>
                </div>
                <a
                  href="https://zkontract.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm rounded-full"
                >
                  View Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Project Card 2 */}
            <div className="group relative bg-base-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 scroll-animate opacity-0">
              <figure className="relative w-full h-56 overflow-hidden bg-base-200">
                <Image
                  src="/project2.png"
                  alt="Project Two"
                  layout="fill"
                  objectFit="contain"
                  className="group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </figure>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-base-content mb-3">Miller&apos;s Hill Farm</h3>
                <p className="text-base-content/70 mb-4 line-clamp-3">
                  A modern venue website built with React and Tailwind CSS. Includes a completely custom reservation and image gallery system with a backend DataBase built with SupaBase
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="badge badge-primary">React</span>
                  <span className="badge badge-secondary">SupaBase</span>
                </div>
                <a
                  href="https://millers-farm-react-website.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm rounded-full"
                >
                  View Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Project Card 3 */}
            <div className="group relative bg-base-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 scroll-animate opacity-0">
              <figure className="relative w-full h-56 overflow-hidden bg-base-200">
                <Image
                  src="/project3.png"
                  alt="ZK Escrow"
                  layout="fill"
                  objectFit="contain"
                  className="group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </figure>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-base-content mb-3">ZK Escrow</h3>
                <p className="text-base-content/70 mb-4 line-clamp-3">
                  A trustless escrow service on Aleo using zero-knowledge proofs. Securely hold funds between parties with no intermediaries required.
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="badge badge-primary">Escrow</span>
                  <span className="badge badge-secondary">Aleo</span>
                </div>
                <a
                  href="https://www.zkescrow.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm rounded-full"
                >
                  View Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Project Card 4 */}
            <div className="group relative bg-base-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 scroll-animate opacity-0">
              <figure className="relative w-full h-56 overflow-hidden bg-base-200">
                <Image
                  src="/project4.png"
                  alt="WhisperWaffle"
                  layout="fill"
                  objectFit="contain"
                  className="group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </figure>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-base-content mb-3">WhisperWaffle</h3>
                <p className="text-base-content/70 mb-4 line-clamp-3">
                  A decentralized exchange (DEX) built on the Aleo blockchain, enabling secure and private token swaps with zero-knowledge proofs.
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="badge badge-primary">DEX</span>
                  <span className="badge badge-secondary">Aleo</span>
                </div>
                <a
                  href="https://whisper-waffle.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm rounded-full"
                >
                  View Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Project Card 5 */}
            <div className="group relative bg-base-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 scroll-animate opacity-0">
              <figure className="relative w-full h-56 overflow-hidden bg-base-200">
                <Image
                  src="/project5.png"
                  alt="Aleo Quest"
                  layout="fill"
                  objectFit="contain"
                  className="group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </figure>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-base-content mb-3">Aleo Quest</h3>
                <p className="text-base-content/70 mb-4 line-clamp-3">
                  An interactive education platform to learn about zero-knowledge concepts. Features an interactive terminal quest for hands-on learning.
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="badge badge-primary">Education</span>
                  <span className="badge badge-secondary">ZK</span>
                </div>
                <a
                  href="https://aleo-quest.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm rounded-full"
                >
                  View Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Project Card 6 */}
            <div className="group relative bg-base-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 scroll-animate opacity-0">
              <figure className="relative w-full h-56 overflow-hidden bg-base-200">
                <Image
                  src="/project6.png"
                  alt="Whatcom Shine Co"
                  layout="fill"
                  objectFit="contain"
                  className="group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </figure>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-base-content mb-3">Whatcom Shine Co</h3>
                <p className="text-base-content/70 mb-4 line-clamp-3">
                  A website for a company providing residential and commercial cleaning services in Whatcom County and surrounding areas.
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="badge badge-primary">Web Design</span>
                  <span className="badge badge-secondary">In Development</span>
                </div>
                <div className="btn btn-disabled btn-sm rounded-full">
                  In Development
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate opacity-0">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Tech Stack
            </h2>
            <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
              Building with cutting-edge technologies
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 scroll-animate opacity-0 max-w-4xl mx-auto">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "Node.js",
              "Web3",
              "PostgreSQL",
              "Docker",
              "AWS",
              "GraphQL"
            ].map((tech) => (
              <div
                key={tech}
                className="badge badge-primary badge-lg px-6 py-3 hover:scale-105 transition-all duration-300"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 bg-gradient-to-b from-base-200 to-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate opacity-0">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Expertise
            </h2>
            <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
              Specialized knowledge across the modern tech landscape
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 scroll-animate opacity-0">
            {[
              {
                title: "Full-Stack Development",
                description: "End-to-end application development with modern frameworks and best practices"
              },
              {
                title: "Web3 & Blockchain",
                description: "Smart contracts, dApps, and decentralized systems on multiple chains"
              },
              {
                title: "UI/UX Design",
                description: "User-centered design with a focus on accessibility and performance"
              },
              {
                title: "Cloud Architecture",
                description: "Scalable infrastructure design and deployment on AWS, Azure, and GCP"
              },
              {
                title: "DevOps & CI/CD",
                description: "Automated pipelines, containerization, and infrastructure as code"
              },
              {
                title: "API Development",
                description: "RESTful and GraphQL APIs with comprehensive documentation"
              },
              {
                title: "Vulnerability Management",
                description: "Identifying, assessing, and remediating security vulnerabilities across applications and infrastructure"
              },
              {
                title: "Infrastructure Engineering",
                description: "Designing and implementing scalable, reliable infrastructure solutions for modern applications"
              },
            ].map((skill) => (
              <div
                key={skill.title}
                className="p-6 bg-base-100 rounded-xl border-2 border-transparent hover:border-primary transition-all duration-300 group"
              >
                <h3 className="text-xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors">
                  {skill.title}
                </h3>
                <p className="text-base-content/70">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Badges */}
      <section className="py-24 bg-gradient-to-b from-base-200 to-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate opacity-0">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Achievements
            </h2>
            <p className="text-base-content/70 text-lg">
              Competition wins and milestones
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto scroll-animate opacity-0">
            {[
              { 
                icon: "🥇", 
                title: "1st Place", 
                desc: "zKontract - Aleo Code Sprint 2",
                highlight: true
              },
              { 
                icon: "🥈", 
                title: "2nd Place", 
                desc: "ZK Escrow - Aleo Code Sprint 3",
                highlight: true
              },
            ].map((badge) => (
              <div
                key={badge.title}
                className={`bg-base-100 rounded-2xl p-8 text-center hover:scale-105 hover:shadow-2xl transition-all duration-300 ${
                  badge.highlight ? 'border-2 border-primary' : 'border-2 border-transparent'
                }`}
              >
                <div className="text-6xl mb-4">{badge.icon}</div>
                <div className="text-2xl font-bold text-base-content mb-2">{badge.title}</div>
                <div className="text-lg text-base-content/70">{badge.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-base-200 to-base-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 scroll-animate opacity-0">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative bg-base-100 rounded-2xl p-8 flex items-center justify-center">
                  <div className="relative w-full max-w-sm">
                    <Image
                      src="/labs.png"
                      alt="About VenomLabs"
                      width={400}
                      height={400}
                      className="rounded-lg w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 space-y-6 scroll-animate opacity-0">
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                About VenomLabs
              </h2>
              <div className="space-y-4 text-base-content text-lg leading-relaxed">
                <p>
                  At VenomLabs, we engineer digital solutions with precision and bite. We&apos;re a forward-thinking
                  development studio specializing in crafting high-performance software, scalable infrastructure, and
                  cutting-edge Web3 applications.
                </p>
                <p>
                  Our mission is to simplify complex problems through elegant code, innovative design, and bulletproof security.
                </p>
                <p>
                  We don&apos;t just build — we experiment, iterate, and push the limits of what&apos;s possible. Whether it&apos;s
                  decentralized apps, backend systems, or full-stack platforms, VenomLabs delivers code that&apos;s clean,
                  efficient, and venomously effective.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-base-100 scroll-animate opacity-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Stay in the Loop
            </h2>
            <p className="text-lg mb-8 text-base-100/80">
              Get the latest updates on projects, tech insights, and exclusive content
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered flex-1 rounded-full bg-base-100 text-base-content"
                required
              />
              <button
                type="submit"
                className="btn btn-base-100 rounded-full whitespace-nowrap"
              >
                Subscribe 🚀
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-base-200 to-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate opacity-0">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Get in Touch
            </h2>
            <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
              Have a project in mind? Let&apos;s build something amazing together
            </p>
          </div>
          <form
            action="https://formspree.io/f/mgvazgke"
            method="POST"
            className="max-w-2xl mx-auto scroll-animate opacity-0"
          >
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered w-full rounded-xl"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="_replyto"
                  placeholder="Your Email"
                  className="input input-bordered w-full rounded-xl"
                  required
                />
              </div>
              <div className="relative">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={6}
                  className="textarea textarea-bordered w-full rounded-xl resize-none"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full rounded-xl text-lg"
              >
                Send Message
              </button>
            </div>
          </form>
          
          {/* Easter Egg */}
          <div className="text-center mt-12">
            <button
              onClick={() => alert("🐍 You found the secret! VenomLabs appreciates curious minds. Use code VENOM10 for 10% off your first project!")}
              className="text-xs text-base-content/40 hover:text-primary transition-colors"
            >
              .
            </button>
          </div>
        </div>
      </section>

      {/* Floating Contact Button */}
      <button
        onClick={() =>
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
        }
        className="btn btn-primary fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
        aria-label="Contact us"
      >
        <svg
          className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </button>

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-r from-base-300 to-base-200 text-base-content">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                VenomLabs
              </div>
              <p className="text-base-content/70">
                &copy; {new Date().getFullYear()} VenomLabs. All rights reserved.
              </p>
              <p className="text-xs text-base-content/50 mt-2">
                Built with 💜 using Next.js & TypeScript
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
            <div className="flex gap-6">
              <a
                href="https://github.com/mikenike360"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://twitter.com/zkontract"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle"
                aria-label="Twitter/X"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/michaelvenema/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
              <div className="text-xs text-base-content/50">
                🐍 Crafted with Venom
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
