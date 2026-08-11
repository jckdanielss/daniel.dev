export const PROJECTS = [
  {
    slug: "cavite-moto-tech",
    title: "Cavite Moto-Tech Hub",
    desc: "Motorcycle-shop ERP with roles, bookings, service records, parts, billing, and a 3D CVT configurator.",
    stack: "Vue 3 · Laravel · PHP · MySQL · Three.js · Capacitor",
    year: "2025 to present",
    href: "https://cavitemototech.ogm1.com",
    art: "img",
    imgSrc: "gallery/cavite_mototech/dashboard.png",
    gallery: "cavitemototech",
    caseFile: {
      problem: "Motorcycle shops often track bookings, service work, inventory, staff, and payments in separate places.",
      decisions: [
        "Model seven roles with explicit permission boundaries.",
        "Keep web and Android on one product codebase.",
        "Let customers inspect CVT components in Three.js before buying.",
      ],
      result: "The platform follows a job from booking through service, parts, billing, staff, and reporting.",
      screens: [
        { src: "/gallery/cavite_mototech/dashboard.png", alt: "Cavite Moto-Tech Hub dashboard", width: 1912, height: 996 },
        { src: "/gallery/cavite_mototech/services_page2.png", alt: "Cavite Moto-Tech service management", width: 1918, height: 999 },
        { src: "/gallery/cavite_mototech/3d_customization.png", alt: "Cavite Moto-Tech 3D CVT customizer", width: 1918, height: 1002 },
      ],
    },
  },
  {
    slug: "dc-transport",
    title: "D.C. Transport Services",
    desc: "Van-rental booking flow with OTP verification, map pinning, route-aware pricing, and an admin quote calendar.",
    stack: "Vue 3 · Laravel · PHP · MySQL · Leaflet",
    year: "2026",
    href: "https://dctransport.ogm1.com",
    art: "img",
    imgSrc: "gallery/dc_transpo/dashboard.png",
    gallery: "dctranspo",
    caseFile: {
      problem: "The owner needed one request that carried the customer, route, dates, pricing context, and verified contact details.",
      decisions: [
        "Use map pins and address lookup for clear pickup details.",
        "Verify guest requests before they enter the admin queue.",
        "Encode 27 distance bands while leaving final quotes reviewable.",
      ],
      result: "Each booking now moves from route request to verified quote with the context the owner needs.",
      screens: [
        { src: "/gallery/dc_transpo/dashboard.png", alt: "D.C. Transport service home", width: 1893, height: 996 },
        { src: "/gallery/dc_transpo/booking2.png", alt: "D.C. Transport booking form", width: 1896, height: 994 },
        { src: "/gallery/dc_transpo/loc_preview.png", alt: "D.C. Transport route preview", width: 1891, height: 990 },
      ],
    },
  },
  {
    slug: "den-portfolio",
    title: "Den · VA Portfolio",
    desc: "A focused portfolio site for my sister’s virtual-assistant work, from design through deployment.",
    stack: "HTML · CSS · JavaScript · Figma · Vercel",
    year: "2026",
    href: "https://den-portfolio-plum.vercel.app",
    art: "portfolio",
    imgSrc: null,
    gallery: null,
    caseFile: {
      problem: "My sister needed a straightforward way for potential clients to understand her services and get in touch.",
      decisions: [
        "Keep the information architecture focused on services and contact.",
        "Make the portfolio easy to scan before a client reaches out.",
      ],
      result: "A deployed portfolio she can use as the home for her virtual-assistant work.",
    },
  },
  {
    slug: "klori",
    title: "Klori",
    desc: "Flutter calorie tracker for daily meals, macros, hydration, recipes, and nutrition goals.",
    stack: "Flutter · Dart · Riverpod · Laravel · MySQL",
    year: "2026",
    href: null,
    art: "img",
    imgSrc: "klori_logo.png",
    gallery: "klori",
    caseFile: {
      problem: "Daily calorie tracking gets slow when meals, macros, recipes, hydration, and goals live in separate places.",
      decisions: [
        "Keep calories, macros, hydration, and meals on one daily view.",
        "Update nutrition totals while someone builds a recipe.",
        "Use one flow for email and social sign-in.",
      ],
      result: "The current build covers onboarding, targets, meal logging, hydration, profile settings, and recipes.",
      screens: [
        { src: "/gallery/klori/home.png", alt: "Klori daily nutrition view", width: 499, height: 1071 },
        { src: "/gallery/klori/meal_log.png", alt: "Klori meal log", width: 499, height: 1102 },
        { src: "/gallery/klori/recipe.png", alt: "Klori recipe builder", width: 501, height: 1057 },
      ],
    },
  },
];

export const shippedCount = PROJECTS.length;
export const liveCount = PROJECTS.filter((project) => Boolean(project.href)).length;
