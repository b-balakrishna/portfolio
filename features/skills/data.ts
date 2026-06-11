import {
  Boxes,
  Cloud,
  Database,
  GitBranch,
  MonitorSmartphone,
  Server,
  type LucideIcon,
} from "lucide-react";

export type SkillDomain = Readonly<{
  id: string;
  name: string;
  icon: LucideIcon;
  blurb: string;
  skills: readonly string[];
}>;

export const skillDomains: readonly SkillDomain[] = [
  {
    id: "frontend",
    name: "Frontend",
    icon: MonitorSmartphone,
    blurb: "Where I'm deepest — architecture, state, and performance at scale.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Zustand",
      "Redux",
      "Tailwind CSS",
      "ShadCN UI",
      "Material UI",
      "Framer Motion",
      "Angular",
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: Server,
    blurb: "Services and APIs that the frontend can trust.",
    skills: ["Node.js", "Express.js", "Java", "Spring Boot", "REST APIs", "GraphQL"],
  },
  {
    id: "cloud",
    name: "Cloud",
    icon: Cloud,
    blurb: "AWS primitives composed into real product infrastructure.",
    skills: ["AWS S3", "EC2", "IAM", "SES", "SQS", "Kafka", "Docker"],
  },
  {
    id: "databases",
    name: "Databases",
    icon: Database,
    blurb: "Schema design, indexing, and query pipelines under load.",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Aggregation Pipelines", "Indexing"],
  },
  {
    id: "devops",
    name: "DevOps & Tooling",
    icon: GitBranch,
    blurb: "Shipping pipelines and the modern AI-assisted toolchain.",
    skills: ["Git", "Vite", "Webpack", "CI/CD", "GitHub Copilot", "Claude Code", "Cursor"],
  },
  {
    id: "architecture",
    name: "Architecture",
    icon: Boxes,
    blurb: "The patterns behind the sections above.",
    skills: [
      "Microservices",
      "Event-Driven Architecture",
      "Message Queues",
      "System Design",
      "Electron.js",
      "Offline-First Sync",
    ],
  },
] as const;
