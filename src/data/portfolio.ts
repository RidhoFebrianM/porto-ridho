// Semua konten website ada di file ini. Edit di sini, komponen tidak perlu disentuh.
// Ikon skill diimpor dari react-icons (https://react-icons.github.io/react-icons) — tambah import baru kalau perlu.
import type { IconType } from "react-icons";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiLaravel,
  SiFlutter,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiFigma,
  SiTensorflow,
} from "react-icons/si";

export type SkillCategory =
  | "Programming"
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "Database"
  | "Tools"
  | "AI";

export type Skill = { name: string; category: SkillCategory; icon: IconType };

export type Project = {
  slug: string; // dipakai untuk URL /projects/[slug]
  title: string;
  category: string;
  description: string;
  longDescription: string; // tampil di halaman detail
  tech: string[];
  image: string; // path di /public
  github?: string;
  demo?: string;
};

export type Experience = {
  period: string;
  role: string;
  org: string;
  description: string;
  tags: string[];
};

export type Certificate = {
  title: string;
  issuer: string;
  year: string;
  image: string;
};

export const profile = {
  name: "Ridho Febrian", // TODO: ganti dengan nama lengkap
  nickname: "Ridho", // dipakai untuk logo "Ridho." dan tekstur tali lanyard
  roles: ["Informatics Engineering Student", "Web Developer"], // role/tagline (berganti otomatis di hero)
  description:
    // TODO: deskripsi singkat 2–3 kalimat
    "I build clean, fast, and accessible web experiences. Currently studying Informatics Engineering and exploring the intersection of design, data, and engineering.",
  about: [
    // TODO: cerita singkat untuk section About (tiap item = satu paragraf)
    "Hi! I'm a student who enjoys turning ideas into working products. I started with small web projects and grew into building full-stack applications.",
    "Outside of code, I like learning about UI design, data, and how technology can solve everyday problems.",
  ],
  cv: "/cv/cv.pdf",
  photo: "/images/ridho.jpg", // foto untuk kartu lanyard (akan dibuat grayscale). Ganti foto = ganti nama file juga, biar cache browser tidak menampilkan yang lama
  siteUrl: "https://porto-ridho.vercel.app", // TODO: ganti dengan domain Vercel kamu
  copyrightYear: 2026,
};

export const contact = {
  email: "your.email@example.com", // TODO
  github: "https://github.com/RidhoFebrianM", // TODO: cek
  linkedin: "https://www.linkedin.com/in/username", // TODO
  instagram: "https://www.instagram.com/username", // TODO
};

export const education = [
  { school: "Universitas Lancang Kuning", major: "Teknik Informatika — Fakultas Ilmu Komputer", period: "2024 — Present" },
  { school: "High School Name", major: "Science", period: "2021 — 2024" }, // TODO: isi SMA/SMK
];

export const interests = [
  // TODO
  "Web Development",
  "UI/UX Design",
  "Data Analysis",
  "Machine Learning",
  "Open Source",
];

export const skills: Skill[] = [
  // TODO: sesuaikan skill dan kategorinya
  { name: "Python", category: "Programming", icon: SiPython },
  { name: "JavaScript", category: "Programming", icon: SiJavascript },
  { name: "TypeScript", category: "Programming", icon: SiTypescript },
  { name: "React", category: "Frontend", icon: SiReact },
  { name: "Next.js", category: "Frontend", icon: SiNextdotjs },
  { name: "Tailwind CSS", category: "Frontend", icon: SiTailwindcss },
  { name: "Node.js", category: "Backend", icon: SiNodedotjs },
  { name: "Laravel", category: "Backend", icon: SiLaravel },
  { name: "Flutter", category: "Mobile", icon: SiFlutter },
  { name: "MySQL", category: "Database", icon: SiMysql },
  { name: "PostgreSQL", category: "Database", icon: SiPostgresql },
  { name: "Git", category: "Tools", icon: SiGit },
  { name: "Figma", category: "Tools", icon: SiFigma },
  { name: "TensorFlow", category: "AI", icon: SiTensorflow },
];

export const projects: Project[] = [
  // TODO: ganti dengan project asli. Taruh thumbnail di /public/images/projects/
  {
    slug: "project-one",
    title: "Project One",
    category: "Web App",
    description: "Short description of what this project does and why it matters.",
    longDescription:
      "Longer description for the detail page: the problem, your approach, your role, and the result. Write as many sentences as you like.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/images/projects/project-1.jpg",
    github: "https://github.com/username/project-one",
    demo: "https://project-one.vercel.app",
  },
  {
    slug: "project-two",
    title: "Project Two",
    category: "Mobile App",
    description: "Short description of what this project does and why it matters.",
    longDescription:
      "Longer description for the detail page: the problem, your approach, your role, and the result.",
    tech: ["Flutter", "Firebase"],
    image: "/images/projects/project-2.jpg",
    github: "https://github.com/username/project-two",
  },
  {
    slug: "project-three",
    title: "Project Three",
    category: "Machine Learning",
    description: "Short description of what this project does and why it matters.",
    longDescription:
      "Longer description for the detail page: the problem, your approach, your role, and the result.",
    tech: ["Python", "TensorFlow", "Pandas"],
    image: "/images/projects/project-3.jpg",
    github: "https://github.com/username/project-three",
  },
];

export const experiences: Experience[] = [
  // TODO: isi pengalaman (urut dari terbaru)
  {
    period: "2025 — Present",
    role: "Web Developer Intern",
    org: "Company Name",
    description: "What you built, what you learned, and the impact you made.",
    tags: ["Next.js", "TypeScript"],
  },
  {
    period: "2024 — 2025",
    role: "Organization Member",
    org: "Student Organization",
    description: "Your responsibilities and achievements.",
    tags: ["Leadership", "Event"],
  },
  {
    period: "2024",
    role: "Started University",
    org: "Universitas Lancang Kuning",
    description: "Began studying Informatics Engineering at the Faculty of Computer Science.",
    tags: ["Education"],
  },
];

export const certificates: Certificate[] = [
  // TODO: ganti dengan sertifikat asli. Taruh gambar di /public/images/certificates/
  { title: "Certificate One", issuer: "Issuer", year: "2025", image: "/images/certificates/cert-1.jpg" },
  { title: "Certificate Two", issuer: "Issuer", year: "2024", image: "/images/certificates/cert-2.jpg" },
  { title: "Certificate Three", issuer: "Issuer", year: "2024", image: "/images/certificates/cert-3.jpg" },
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];
