// The only file you need to edit. Replace every [PLACEHOLDER] with real content.
import type { Experience, Project, SkillGroup } from "../types";

export const portfolio = {
  name: "Joaquin A. Meroy",
  title: "Front-End Developer",
  intro:
    "I build responsive, reusable front-end interfaces for government information systems.",
  profileImage: "/profile-2.jpg", // URL or /path in /public; placeholder renders initials
  faceModel: "/profile-3d.glb",
  github: { username: "JoaquinMeroy", url: "https://github.com/JoaquinMeroy" },
  linkedin: "https://www.linkedin.com/in/joaquin-meroy-a5224a31a/",
  resume: "/resume.pdf",
  email: "joaquinameroy@gmail.com",
  location: "Dinalupihan, Bataan",
  about: {
    background:
      "Front-end developer specializing in Blazor WebAssembly and C#. I build reusable component libraries, integrate REST APIs and deliver UI modules for government information systems. I test features against edge cases and regressions before release, and I care about how systems are built and where they tend to break.",
    years: "2 Years",
    position: "Software Engineer at NSPIRE Inc.",
    philosophy: "No Pain No Gain",
  },
} as const;

export const skills: SkillGroup[] = [
  {
    label: "Frontend",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "C#",
      "Blazor WebAssembly",
      "React",
    ],
  },
  { label: "Backend", items: ["Node.js", "Express", "REST APIs"] },
  { label: "Database", items: ["PostgreSQL", "MongoDB", "Firebase"] },
  {
    label: "Tools",
    items: [
      "VS Code",
      "Visual Studio Community",
      "Git",
      "GitHub",
      "Figma",
      "Postman",
    ],
  },
];

// Leave githubUrl / liveUrl as "" for private or company projects: the link is hidden.
export const projects: Project[] = [
  {
    name: "Atom Design System",
    description:
      "A reusable component library based on atomic design principles, so developers don't rebuild the same UI for each system and all company systems stay consistent. Standardized UI patterns and EventCallback-based component communication to reduce duplicated code.",
    tech: ["Blazor WebAssembly", "C#"],
    image: "[PROJECT_IMAGE]",
    githubUrl: "",
    liveUrl: "",
  },
  {
    name: "System Parameters",
    description:
      "A global configuration module available to all company systems. Administrators change themes, logo, header, footer, content and landing page design from one page, without needing a developer for each change.",
    tech: ["Blazor WebAssembly", "C#", "REST APIs"],
    image: "[PROJECT_IMAGE]",
    githubUrl: "",
    liveUrl: "",
  },
  {
    name: "HYVE (DTAS) Document Tracking",
    description:
      "A real-time document tracking system where staff can see where a document is at any time. I built the UI, integrated the existing APIs, and tested data flow, edge cases and regressions to keep the monitoring accurate.",
    tech: ["Blazor WebAssembly", "C#", "REST APIs"],
    image: "[PROJECT_IMAGE]",
    githubUrl: "",
    liveUrl: "",
  },
  {
    name: "ESTANTE Drug Storage Visualization",
    description:
      "A personal project for a client. A storage visualization system that lets staff search for a drug and see its exact location (column and row), so items are found directly instead of searched for manually.",
    tech: ["React", "Firebase"],
    image: "[PROJECT_IMAGE]",
    githubUrl: "",
    liveUrl: "",
  },
];

export const experience: Experience[] = [
  {
    company: "NSPIRE Inc.",
    position: "Software Engineer",
    period: "Sep 2024 - Present",
    responsibilities: [
      "Built responsive UI components from Figma designs using Blazor WebAssembly and C#, and delivered front-end modules across multiple government systems (HYVE/DTAS, ELIS, CCC, HRMS, Learning and Development System).",
      "Built reusable component libraries to improve code efficiency and maintainability.",
      "Integrated APIs for CRUD operations, authentication and data management, verifying responses and data accuracy throughout.",
      "Collaborated with backend developers to ensure seamless API integration and optimal performance.",
      "Tested and debugged features across the development cycle, including edge case validation and regression checks; tracked bugs and work items in OpenProject.",
    ],
    tech: ["Blazor WebAssembly", "C#", "REST APIs", "Figma", "Postman"],
  },
  {
    company: "ScribbleCubes Creative Design Services",
    position: "OJT Web Designer",
    period: "6 months (OJT)",
    responsibilities: [
      "Planned and created wireframes and mockups to visualize website layouts before development, ensuring user-friendly navigation and functionality.",
    ],
    tech: ["Wireframing", "Mockups"],
  },
];

export const education = [
  {
    school: "Eastwoods Professional College of Science and Technology",
    degree: "BS in Information Technology",
    period: "Graduated July 2024",
  },
];
