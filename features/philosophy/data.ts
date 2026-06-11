export type Principle = Readonly<{
  id: string;
  title: string;
  thesis: string;
  practice: string;
}>;

export const principles: readonly Principle[] = [
  {
    id: "scalability",
    title: "Scalability",
    thesis: "Scale is a product decision before it's an infrastructure one.",
    practice:
      "I design for the load we'll have in 18 months, not 18 years: queues to decouple producers from consumers, stateless services that scale horizontally, and pagination/virtualization in the UI from day one. The OptoTax export pipeline survived a 10× filing-season spike because reports were async jobs, not request handlers.",
  },
  {
    id: "maintainability",
    title: "Maintainability",
    thesis: "Code is read 10× more than it's written; optimize for the reader.",
    practice:
      "Feature-based structure, types as documentation, and boring patterns over clever ones. The +25% reusability metric at OPEN came from extracting a shared component library only after three modules proved the patterns — abstraction extracted from repetition, never speculated.",
  },
  {
    id: "performance",
    title: "Performance",
    thesis: "Performance is a feature users feel before any other.",
    practice:
      "Measure, then optimize the critical path: lazy-loaded routes, memoized selectors, virtualized tables on the client; indexes and aggregation pipelines on the database. Every performance claim on this page came from before/after measurement, not intuition.",
  },
  {
    id: "security",
    title: "Security",
    thesis: "Security is layered, or it's theater.",
    practice:
      "RBAC enforced at the route, component, and API layers — never trusting the client; IAM with least privilege on AWS; audit logs as first-class data. Building tax and banking software teaches you that compliance isn't a checkbox, it's an architecture constraint.",
  },
  {
    id: "dx",
    title: "Developer Experience",
    thesis: "Team velocity is a system you can engineer.",
    practice:
      "Strict TypeScript so refactors are mechanical, dual CJS/ESM packaging so consumers never fight the build, and AI tooling (Claude Code, Copilot, Cursor) wired into the loop. I build VS Code extensions for a living now — DX literally is the product.",
  },
] as const;
