export const site = {
  name: "Balakrishna Battula",
  shortName: "bk.dev",
  role: "Software Engineer",
  headline: "I build products end-to-end — from React pixels to AWS infrastructure.",
  location: "Bengaluru, India",
  email: "battulabalakrishna063@gmail.com",
  url: "https://b-balakrishna.vercel.app",
  availability: "Open to opportunities",
  links: {
    github: "https://github.com/b-balakrishna",
    linkedin: "https://linkedin.com/in/balakrishna-bbk",
    leetcode: "https://leetcode.com/u/balakrishna_battula",
  },
} as const;

export type NavItem = Readonly<{ label: string; href: `#${string}` }>;

export const navItems: readonly NavItem[] = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Systems", href: "#systems" },
  { label: "Skills", href: "#skills" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Writing", href: "#writing" },
  { label: "Dashboard", href: "#dashboard" },
] as const;
