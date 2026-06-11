export type Stat = Readonly<{
  label: string;
  value: number;
  suffix: string;
  decimals?: number;
  detail: string;
}>;

export const stats: readonly Stat[] = [
  { label: "Years of experience", value: 3.5, suffix: "+", decimals: 1, detail: "production software since Jul 2022" },
  { label: "Major modules delivered", value: 12, suffix: "+", detail: "fintech, SaaS, desktop & dev tooling" },
  { label: "Technologies in production", value: 25, suffix: "+", detail: "across frontend, backend & cloud" },
  { label: "System design case studies", value: 17, suffix: "", detail: "authored in the public repo" },
] as const;

export type Credential = Readonly<{
  title: string;
  issuer: string;
  detail: string;
}>;

export const credentials: readonly Credential[] = [
  {
    title: "Architecture Builder Badge",
    issuer: "LeetCode",
    detail: "Awarded for completing the System & Software Design quest.",
  },
  {
    title: "Open-Source Author",
    issuer: "npm",
    detail: "react-phase — phase-first lifecycle primitives for React.",
  },
  {
    title: "Developer Content Creator",
    issuer: "LinkedIn",
    detail: "Frontend engineering posts & carousels: React, ShadCN, Zustand, performance.",
  },
  {
    title: "B.Tech, CGPA 8.7/10",
    issuer: "Geethanjali Institute of Science & Technology",
    detail: "2019 — 2022, Nellore, AP.",
  },
] as const;

export type RoadmapItem = Readonly<{
  period: string;
  title: string;
  description: string;
  status: "done" | "active" | "next";
}>;

export const roadmap: readonly RoadmapItem[] = [
  {
    period: "2022 — 2024",
    title: "Full-stack foundations",
    description: "React, Node.js, MongoDB, Electron — shipping across the whole stack at Smart Food Safe.",
    status: "done",
  },
  {
    period: "2024 — 2025",
    title: "Scale & architecture",
    description: "Fintech-grade systems: event-driven design, Kafka, RBAC, performance under real load.",
    status: "done",
  },
  {
    period: "2025 — 2026",
    title: "Systems depth & OSS",
    description: "17 system design case studies, react-phase on npm, LeetCode architecture quest.",
    status: "done",
  },
  {
    period: "2026 — now",
    title: "Developer platforms",
    description: "VS Code extensions for embedded tooling at Wind River; deepening Electron & platform engineering.",
    status: "active",
  },
  {
    period: "Next",
    title: "AI-native engineering",
    description: "AI/ML system architecture, agentic developer tooling, and distributed systems at larger scale.",
    status: "next",
  },
] as const;

export type JourneyDomain = Readonly<{ name: string; studies: number }>;

/** Distribution of the 17 case studies across domains in the system-design repo. */
export const journey: readonly JourneyDomain[] = [
  { name: "Foundations & LLD", studies: 3 },
  { name: "Backend", studies: 3 },
  { name: "Distributed Systems", studies: 3 },
  { name: "Frontend", studies: 4 },
  { name: "Cloud & Scalability", studies: 2 },
  { name: "AI/ML Systems", studies: 2 },
] as const;
