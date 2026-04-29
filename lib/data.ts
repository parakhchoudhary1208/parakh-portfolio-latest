export const experiences = [
  {
    role: "Junior Frontend Developer",
    company: "Stuvio Digital Pvt. Ltd.",
    location: "Navi Mumbai",
    period: "April 2025 – Present",
    startDate: new Date("2025-04-01"),
    endDate: new Date(), // Using current date for Present
    current: true,
    color: "#06b6d4",
    highlights: [
      "Developed RRP Drones, Electronic, Defense, and Vimananu; built a reusable TSX product template system for scalable page generation.",
      "Engineered SVG path animations and GSAP transitions for RRP Drones, leading to its submission for the Kyoorius Creative Awards.",
      "Built a custom Next.js EMI calculator and interactive, state-driven \"Loan Journey\" modules for Jayostute.",
      "Developed & integrated Custom CMS for RRP-Electronic and RRP Defense, enabling dynamic management of newsrooms & careers data.",
      "Implemented WCAG accessibility standards and resolved complex Marathi-to-English script-rendering issues for MITL and Jayostute.",
      "Owned full \"Go-Live\" cycles for JPS Technologies and Vimananu, including terminal-based SMTP mail configuration and form validation.",
      "Managed Vercel deployments and Git workflows, ensuring pixel-perfect design through rigorous cross-browser and multi-device testing.",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "Pixel6 Web Studio",
    location: "Pune",
    period: "Dec 2022 – Aug 2024",
    startDate: new Date("2022-12-01"),
    endDate: new Date("2024-08-31"),
    current: false,
    color: "#7c3aed",
    highlights: [
      "Developed dynamic and reusable components using React with JSX & TSX",
      "Managed global state efficiently using Redux Toolkit",
      "Built responsive, interactive UI components focusing on performance and reusability",
      "Created HTML, SCSS, and JavaScript templates for WordPress themes",
      "Used GSAP for smooth animations across React and WordPress projects",
      "Ensured SEO optimisation, W3C guidelines and performance optimisation",
    ],
  },
];

export const education = [
  {
    degree: "Bachelor of Technology — Computer Science",
    institution: "IPS Academy, Indore",
    period: "Aug 2018 – June 2022",
    detail: "7.2 CGPA",
  },
  {
    degree: "12th Standard",
    institution: "St. Raphael Co-Ed School, Bhopal",
    period: "Apr 2017 – Apr 2018",
    detail: "61%",
  },
  {
    degree: "10th Standard",
    institution: "St. Raphael Co-Ed School, Bhopal",
    period: "Apr 2015 – Apr 2016",
    detail: "80%",
  },
];

export const projects = [
  {
    num: "01",
    title: "MITL",
    company: "Stuvio Digital",
    category: "Public Sector / Governance",
    tags: ["Next.js", "WCAG", "Marathi Script", "Accessibility"],
    desc: "Implemented WCAG accessibility standards and resolved complex Marathi-to-English script-rendering issues for Maharashtra Information Technology Ltd.",
    url: "https://mitl.org.in",
    color: "#3b82f6",
  },
  {
    num: "02",
    title: "RRP Electronics",
    company: "Stuvio Digital",
    category: "Enterprise / Manufacturing",
    tags: ["Next.js", "Custom CMS", "Dynamics Data", "TypeScript"],
    desc: "Developed and integrated a custom CMS for dynamic management of newsrooms and careers data for a leading electronics manufacturer.",
    url: "https://rrpelectronics.com",
    color: "#10b981",
  },
  {
    num: "03",
    title: "RRP Defense",
    company: "Stuvio Digital",
    category: "Enterprise / Defense",
    tags: ["Next.js", "Custom CMS", "Newsroom", "GSAP"],
    desc: "Engineered a scalable CMS platform for defense sector operations, enabling real-time updates and career management.",
    url: "https://rrpdefense.com",
    color: "#f43f5e",
  },
  {
    num: "04",
    title: "RRP Drones",
    company: "Stuvio Digital",
    category: "Interactive / Award Nominated",
    tags: ["Next.js", "GSAP", "SVG Animation", "TSX"],
    desc: "Engineered SVG path animations and GSAP transitions that led to a Kyoorius Creative Awards submission. Built a reusable TSX product template system.",
    url: "https://rrpdrones.com",
    color: "#7c3aed",
  },
  {
    num: "05",
    title: "RRP Drones Experience",
    company: "Stuvio Digital",
    category: "Immersive Web",
    tags: ["Three.js", "WebGL", "GSAP", "React"],
    desc: "An immersive 3D experience page for RRP Drones featuring WebGL interactions and scroll-driven storytelling.",
    url: "https://rrpdrones.com/experience",
    color: "#06b6d4",
  },
  {
    num: "06",
    title: "JPS Technologies",
    company: "Stuvio Digital",
    category: "Corporate / Consultancy",
    tags: ["WordPress", "SCSS", "SEO", "SMTP"],
    desc: "Managed the end-to-end deployment and configuration, ensuring pixel-perfect design and optimized performance.",
    url: "https://jpstechnologies.co.uk",
    color: "#8b5cf6",
  },
  {
    num: "07",
    title: "Pixel6",
    company: "Pixel6 Studio",
    category: "Studio Website",
    tags: ["React", "GSAP", "Tailwind", "Framer Motion"],
    desc: "Contributed to the development of the primary studio website, focusing on high-performance animations and responsive design.",
    url: "https://pixel6.co",
    color: "#e11d48",
  },
  {
    num: "08",
    title: "RMS Landing Page",
    company: "Pixel6 Studio",
    category: "Resource Management",
    tags: ["React", "SCSS", "Frontend Architecture"],
    desc: "Built a sleek, data-driven landing page for a Resource Management System focusing on clarity and user flow.",
    url: "https://lab.pixel6.co/rms",
    color: "#f59e0b",
  },
  {
    num: "09",
    title: "Fishler",
    company: "Pixel6 Studio",
    category: "E-Commerce / Branding",
    tags: ["Next.js", "UI/UX", "Mobile First"],
    desc: "Developed a modern, visual-heavy landing page for a premium brand, ensuring seamless across-device performance.",
    url: "https://fishler.co",
    color: "#14b8a6",
  },
];

export function calculateTotalExperience() {
  let totalMonths = 0;
  experiences.forEach((exp) => {
    const end = exp.endDate || new Date();
    const start = exp.startDate;
    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    totalMonths += diffMonths;
  });
  return (totalMonths / 12).toFixed(1);
}
