export const opening = {
  label: "Development studio",
  lead: "VenomLabs builds games and software for the browser, led by",
  accent: "Tekmor",
  accentHref: "https://www.tekmor.online/",
  rest: ", a multiplayer fantasy world.",
  deck: "The studio also ships three.js scenes, zero-knowledge tools on Aleo, and websites for clients.",
};

export const tekmor = {
  name: "Tekmor",
  href: "https://www.tekmor.online/",
  summary:
    "A shared fantasy world in the browser. Players gather resources, craft gear, fight, trade, and explore together.",
  note: "In development",
  image: "/tekmor.webp",
  imageAlt: "A forest clearing in Tekmor, with a cottage, deer, a wolf, and a pond.",
  caption: "A forest in Tekmor.",
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

export const scenes: Project[] = [
  {
    name: "Christmas Wish",
    summary: "A family Christmas wishlist built as a three.js scene around a tree.",
    note: "Three.js",
    href: "https://christmaswish.xyz/",
    linkLabel: "Visit",
    image: "/christmaswish.png",
    imageAlt: "A Christmas living room scene with a tree and gift tags.",
  },
];

export const projects: Project[] = [
  {
    name: "zKontract",
    summary: "A bounty board on Aleo, live on mainnet.",
    note: "First place, Aleo Code Sprint 2",
    href: "https://zkontract.app",
    linkLabel: "Visit",
    image: "/project1.png",
    imageAlt: "Screenshot of the zKontract bounty board.",
  },
  {
    name: "ZK Escrow",
    summary: "Escrow on Aleo so two parties can hold funds without a middleman.",
    note: "Second place, Aleo Code Sprint 3",
    href: "https://zkescrow.vercel.app/",
    linkLabel: "Visit",
    image: "/project3.png",
    imageAlt: "Screenshot of ZK Escrow.",
  },
  {
    name: "WhisperWaffle",
    summary: "A private exchange on Aleo.",
    note: "Finalist, Aleo Code Sprint 4",
    href: "https://github.com/mikenike360/WhisperWaffle",
    linkLabel: "GitHub",
    image: "/project4.png",
    imageAlt: "Screenshot of WhisperWaffle.",
  },
  {
    name: "Aleo Quest",
    summary: "A terminal quest that teaches zero-knowledge proofs.",
    href: "https://aleo-quest.vercel.app/",
    linkLabel: "Visit",
    image: "/project5.png",
    imageAlt: "Screenshot of Aleo Quest.",
  },
  {
    name: "Miller's Hill Farm",
    summary: "A venue website with reservations and a photo gallery.",
    href: "https://millers-farm-react-website.vercel.app/",
    linkLabel: "Visit",
    image: "/project2.png",
    imageAlt: "Screenshot of Miller's Hill Farm.",
  },
  {
    name: "Ground Folk",
    summary: "A website for a hand-drawn cartoon, with episodes, characters, and a shop.",
    href: "https://groundfolk-website.vercel.app/",
    linkLabel: "Visit",
    image: "/groundfolk.png",
    imageAlt: "Ground Folk characters gathered in a hand-drawn apartment.",
  },
  {
    name: "Sandy Point Lawn Care",
    summary: "A website for a lawn care business in Sandy Point, with services and pricing.",
    href: "https://www.sandypointlawncare.com/",
    linkLabel: "Visit",
    image: "/sandypoint.png",
    imageAlt: "Sandy Point Lawn Care homepage with a mower on a business card.",
  },
  {
    name: "Whatcom Shine Co",
    summary: "A website for a cleaning company in Whatcom County.",
    note: "In development",
    href: "https://github.com/mikenike360/whatcom_shine_co",
    linkLabel: "GitHub",
    image: "/project6.png",
    imageAlt: "Screenshot of Whatcom Shine Co.",
  },
];

export const about = [
  "VenomLabs is a development studio specializing in browser games, interactive three.js experiences, and zero-knowledge software on Aleo. The studio also builds websites for clients who need a clear, durable product.",
  "The current focus is Tekmor, a multiplayer fantasy world that runs entirely in the browser. Alongside that work, VenomLabs designs smaller scenes and tools, and takes on client sites when the project is a strong fit.",
  "When a product ships, the studio stays involved to maintain and extend it.",
];

export const contact = {
  action: "https://formspree.io/f/mgvazgke",
  intro: "Interested in working with VenomLabs? Send a note.",
};

export const social = [
  { label: "GitHub", href: "https://github.com/mikenike360" },
  { label: "X", href: "https://x.com/venomlabsxyz" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/michaelvenema/" },
  { label: "Discord", href: "https://discord.gg/BXUTyRf5Jb" },
];
