import { site } from "@/lib/site";

export type Article = Readonly<{
  title: string;
  category: "System Design" | "React" | "Node.js" | "AWS" | "AI Engineering" | "Architecture";
  description: string;
  href: string;
  source: "GitHub" | "LinkedIn" | "npm";
}>;

export const systemDesignRepo = "https://github.com/b-balakrishna/system-design";

export const articles: readonly Article[] = [
  {
    title: "Frontend System Design: Client-Server Architecture",
    category: "System Design",
    description:
      "How rendering strategy, state ownership, and the network boundary shape frontend architecture — from the 17-case-study repository.",
    href: systemDesignRepo,
    source: "GitHub",
  },
  {
    title: "Distributed Systems: Queues, Events & Back-Pressure",
    category: "Architecture",
    description:
      "Case studies on event-driven architecture, message queues, and the failure modes that only show up in production.",
    href: systemDesignRepo,
    source: "GitHub",
  },
  {
    title: "react-phase: Rethinking the React Lifecycle",
    category: "React",
    description:
      "Why mount/unmount isn't enough, and how a phase-first abstraction makes complex UI flows testable.",
    href: "https://github.com/b-balakrishna/react-phase",
    source: "GitHub",
  },
  {
    title: "Cloud & Scalability Patterns on AWS",
    category: "AWS",
    description:
      "S3, SQS, SES, and IAM composed into real product infrastructure — deep dives from the knowledge repo.",
    href: systemDesignRepo,
    source: "GitHub",
  },
  {
    title: "AI/ML Systems: Engineering Around the Model",
    category: "AI Engineering",
    description:
      "What changes (and what doesn't) when LLMs enter the architecture — pipelines, evals, and AI-assisted development.",
    href: systemDesignRepo,
    source: "GitHub",
  },
  {
    title: "Frontend Engineering Carousels",
    category: "React",
    description:
      "Ongoing LinkedIn series on React patterns, ShadCN, Zustand, Tailwind, and frontend performance.",
    href: site.links.linkedin,
    source: "LinkedIn",
  },
] as const;
