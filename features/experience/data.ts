export type Role = Readonly<{
  company: string;
  title: string;
  period: string;
  location: string;
  current: boolean;
  summary: string;
  highlights: readonly Readonly<{ text: string; metric?: string }>[];
  stack: readonly string[];
}>;

export const roles: readonly Role[] = [
  {
    company: "Wind River Systems",
    title: "Engineer",
    period: "Apr 2026 — Present",
    location: "Bengaluru",
    current: true,
    summary:
      "Developer tooling for embedded systems at the platform level.",
    highlights: [
      {
        text: "Building Visual Studio Code extensions for VxWorks Next and the Helix Virtualization Platform (HVP), delivering integrated tooling used daily by embedded systems engineering teams.",
      },
    ],
    stack: ["TypeScript", "VS Code Extension API", "Node.js", "Electron"],
  },
  {
    company: "OPEN Financial Technologies",
    title: "Engineer",
    period: "Apr 2025 — Apr 2026",
    location: "Bengaluru",
    current: false,
    summary: "Large-scale fintech modules for India's leading business-banking platform.",
    highlights: [
      {
        text: "Designed and delivered 3 large-scale fintech modules with React, TypeScript, Zustand, ShadCN, and Spring Boot — shared UI libraries improved component reusability.",
        metric: "+25% reusability",
      },
      {
        text: "Built the OptoTax GST filing and reporting system with automated workflows and data exports, cutting manual CA work.",
        metric: "−30% manual work",
      },
      {
        text: "Developed notice-tracking workflows surfacing failures, alerts, and statuses across the pipeline.",
        metric: "−40% resolution time",
      },
      {
        text: "Implemented enterprise onboarding and RBAC dashboards, improving security visibility and audit control.",
      },
      {
        text: "Optimized critical screens with lazy loading and memoization on large datasets.",
        metric: "+20% render efficiency",
      },
    ],
    stack: ["React", "TypeScript", "Zustand", "ShadCN", "Node.js", "Express.js", "Spring Boot"],
  },
  {
    company: "Smart Food Safe",
    title: "Software Developer",
    period: "Jul 2022 — Mar 2025",
    location: "Bengaluru",
    current: false,
    summary: "Full-stack product engineering for food-safety compliance SaaS.",
    highlights: [
      {
        text: "Built and integrated REST APIs with Node.js and Express, improving microservice communication.",
        metric: "−30% integration time",
      },
      {
        text: "Accelerated MongoDB with indexing and aggregation pipelines on high-volume collections.",
        metric: "−40% query latency",
      },
      {
        text: "Developed responsive React + Material UI frontends with markedly fewer post-release defects.",
        metric: "−25% UI defects",
      },
      {
        text: "Shipped production Electron desktop apps automating workflow syncing for field teams.",
        metric: "−35% manual effort",
      },
    ],
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Electron", "Material UI", "AWS"],
  },
] as const;
