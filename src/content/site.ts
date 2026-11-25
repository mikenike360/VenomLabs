export const opening = {
  lead: "Things for the internet.",
  accent: "",
  accentHref: "https://www.tekmor.online/",
  rest: "",
  deck: "Browser games, three.js scenes, web3 tools, privacy tools, and websites when somebody needs one done right.",
};

export const tekmor = {
  name: "Tekmor",
  href: "https://www.tekmor.online/",
  summary:
    "A multiplayer fantasy world that runs in the browser. Gather what you find, craft what you need, fight, trade, and wander the same map with other people.",
  note: "Still cooking",
  cta: "Play",
  image: "/tekmor.webp",
  imageAlt: "A forest clearing in Tekmor, with a cottage, deer, a wolf, and a pond.",
  caption: "A clearing in Tekmor. Cottage, pond, company.",
};

export type Project = {
  name: string;
  summary: string;
  note?: string;
  href: string;
  linkLabel: string;
  image?: string;
  imageAlt?: string;
};

export const scenesTitle = "Scenes";
export const scenesIntro = "Small three.js rooms you can walk into for a minute.";

export const scenes: Project[] = [
  {
    name: "Christmas Wish",
    summary:
      "A living-room Christmas tree you can orbit. Hang wishes on it. The countdown sits in the corner.",
    note: "Three.js",
    href: "https://christmaswish.xyz/",
    linkLabel: "Open it",
    image: "/christmaswish.png",
    imageAlt: "A Christmas living room scene with a tree and gift tags.",
  },
];

export const workTitle = "Also made";
export const workIntro = "Tools, experiments, and sites that left the desk.";

export const projects: Project[] = [
  {
    name: "zKontract",
    summary: "Post a bounty. Prove the work. Paid on Aleo, live on mainnet.",
    note: "First place, Aleo Code Sprint 2",
    href: "https://zkontract.app",
    linkLabel: "Open",
    image: "/project1.png",
    imageAlt: "Screenshot of the zKontract bounty board.",
  },
  {
    name: "ZK Escrow",
    summary: "Two people park funds on Aleo until both are ready. No middleman in the middle.",
    note: "Second place, Aleo Code Sprint 3",
    href: "https://zkescrow.vercel.app/",
    linkLabel: "Open",
    image: "/project3.png",
    imageAlt: "Screenshot of ZK Escrow.",
  },
  {
    name: "WhisperWaffle",
    summary:
      "A private exchange on Aleo — what you trade stays between the people trading.",
    note: "Finalist, Aleo Code Sprint 4",
    href: "https://github.com/mikenike360/WhisperWaffle",
    linkLabel: "GitHub",
    image: "/project4.png",
    imageAlt: "Screenshot of WhisperWaffle.",
  },
  {
    name: "Aleo Quest",
    summary: "A terminal quest that teaches zero-knowledge proofs without a lecture.",
    href: "https://aleo-quest.vercel.app/",
    linkLabel: "Play",
    image: "/project5.png",
    imageAlt: "Screenshot of Aleo Quest.",
  },
  {
    name: "Miller's Hill Farm",
    summary: "Venue site with reservations and a photo gallery that actually shows the place.",
    href: "https://millers-farm-react-website.vercel.app/",
    linkLabel: "Visit",
    image: "/project2.png",
    imageAlt: "Screenshot of Miller's Hill Farm.",
  },
  {
    name: "Ground Folk",
    summary: "Site for a hand-drawn cartoon: episodes, characters, and a shop off the couch.",
    href: "https://groundfolk-website.vercel.app/",
    linkLabel: "Visit",
    image: "/groundfolk.png",
    imageAlt: "Ground Folk characters gathered in a hand-drawn apartment.",
  },
  {
    name: "Sandy Point Lawn Care",
    summary:
      "Lawn care in Sandy Point — services, pricing, and a clean front door on the web.",
    href: "https://www.sandypointlawncare.com/",
    linkLabel: "Visit",
    image: "/sandypoint.png",
    imageAlt: "Sandy Point Lawn Care homepage with a mower on a business card.",
  },
  {
    name: "Whatcom Shine Co",
    summary: "Cleaning company site for Whatcom County. Still getting its shine.",
    note: "In progress",
    href: "https://github.com/mikenike360/whatcom_shine_co",
    linkLabel: "GitHub",
    image: "/project6.png",
    imageAlt: "Screenshot of Whatcom Shine Co.",
  },
];

export const aboutHeading = "About";

export const about = [
  "VenomLabs is a small studio that makes things for the internet. Sometimes that is a multiplayer world. Sometimes it is a three.js scene, a web3 tool, a privacy tool, or a website that needs to be clear and last.",
  "Right now most of the attention goes to Tekmor — a fantasy world that never leaves the browser. The smaller projects and client sites happen in the gaps, when the fit is right.",
  "When something ships, we stay with it. Maintenance and the next version are part of the job.",
];

export const contact = {
  action: "https://formspree.io/f/mgvazgke",
  heading: "Contact",
  intro: "A strange idea, a normal website, or something in between. Send it over.",
  nameLabel: "Name",
  emailLabel: "Email",
  messageLabel: "Message",
  namePlaceholder: "What should we call you?",
  emailPlaceholder: "Where should we reply?",
  messagePlaceholder: "What's on your mind?",
  button: "Send it",
};

export const footerLine = "Making things for the internet.";

export const social = [
  { label: "GitHub", href: "https://github.com/mikenike360" },
  { label: "X", href: "https://x.com/venomlabsxyz" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/michaelvenema/" },
  { label: "Discord", href: "https://discord.gg/BXUTyRf5Jb" },
];
