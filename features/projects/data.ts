export type Project = Readonly<{
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  architecture: string;
  challenges: readonly string[];
  decisions: readonly string[];
  stack: readonly string[];
  metrics: readonly Readonly<{ value: string; label: string }>[];
  links: Readonly<{ github?: string; live?: string; npm?: string }>;
}>;

export const projects: readonly Project[] = [
  {
    name: "OptoTax — GST Filing Platform",
    tagline: "Automated tax compliance for thousands of Indian businesses",
    problem:
      "Chartered accountants were reconciling GST returns by hand across spreadsheets and government portals — slow, error-prone, and impossible to audit at scale.",
    solution:
      "A filing and reporting platform that automates the GSTR workflow end-to-end: ingestion, reconciliation, notice tracking, and downloadable exports — reducing manual CA work by 30% and issue-resolution time by 40%.",
    architecture:
      "React + Zustand frontend with module federation across 3 fintech modules; Node.js/Express BFF in front of Spring Boot services; report generation pipeline with async export jobs; RBAC enforced at route, component, and API layers.",
    challenges: [
      "Rendering very large reconciliation tables without jank — solved with virtualization, memoized selectors, and lazy-loaded routes (+20% render efficiency).",
      "Tracking notice lifecycles across government APIs with unreliable webhooks — modeled as an explicit state machine with retry + alerting.",
      "Shared UI across 3 modules without divergence — extracted a ShadCN-based component library (+25% reusability).",
    ],
    decisions: [
      "Zustand over Redux: subscription-level granularity removed re-render storms on bulk table updates.",
      "BFF layer to keep frontend contracts stable while backend services evolved independently.",
      "Server-driven exports instead of client CSV generation — consistent formatting and zero main-thread stalls.",
    ],
    stack: ["React", "TypeScript", "Zustand", "ShadCN", "Node.js", "Express.js", "Spring Boot"],
    metrics: [
      { value: "−30%", label: "manual CA work" },
      { value: "−40%", label: "issue resolution time" },
      { value: "+25%", label: "component reusability" },
    ],
    links: {},
  },
  {
    name: "react-phase",
    tagline: "Open-source lifecycle primitives for React",
    problem:
      "React gives you mount and unmount — but real UIs move through phases: entering, ready, syncing, leaving. Modeling those with useEffect spaghetti makes complex flows untestable.",
    solution:
      "An npm package providing a phase-first lifecycle abstraction: explicit, typed phases with predictable transitions, enabling clean state choreography for multi-step UI flows.",
    architecture:
      "Zero-dependency core, published with dual CJS/ESM builds via tsup, full TypeScript definitions, and a minimal composable API designed for tree-shaking and zero-config consumption.",
    challenges: [
      "Designing an API small enough to learn in minutes but expressive enough for real flows — iterated against actual product use cases.",
      "Dual-format packaging that works in every bundler and in RSC environments without footguns.",
    ],
    decisions: [
      "Phase-first instead of state-machine-first: meets React developers in their existing mental model, no DSL to learn.",
      "tsup over rollup config: convention over configuration for a package this size.",
      "Strict semver and typed public surface from v0 — types are the documentation.",
    ],
    stack: ["TypeScript", "React", "tsup", "npm"],
    metrics: [
      { value: "CJS+ESM", label: "dual builds" },
      { value: "100%", label: "typed public API" },
      { value: "0", label: "runtime dependencies" },
    ],
    links: {
      github: "https://github.com/b-balakrishna/react-phase",
      npm: "https://www.npmjs.com/package/react-phase",
    },
  },
  {
    name: "Electron Workflow Suite",
    tagline: "Desktop automation for food-safety field teams",
    problem:
      "Field auditors at Smart Food Safe worked in facilities with unreliable connectivity; web-only tooling meant lost work and hours of manual re-syncing.",
    solution:
      "Production Electron desktop applications with offline-first workflow syncing — automating data capture and reconciliation, reducing manual effort by 35%.",
    architecture:
      "Electron shell over a shared React codebase; local persistence with background sync queue; Node.js/Express REST APIs; MongoDB with aggregation pipelines and targeted indexes (−40% query latency).",
    challenges: [
      "Conflict resolution when offline edits met server truth — last-write-wins was unacceptable for audit data, so sync used field-level merge with operator review.",
      "Keeping the desktop and web UIs in lockstep — solved by sharing the React component layer and isolating platform code behind adapters.",
    ],
    decisions: [
      "Electron over PWA: auditors needed filesystem access, hardware integration, and guaranteed offline behavior.",
      "Queue-based sync over real-time sockets: simpler failure semantics in low-connectivity environments.",
      "MongoDB aggregation pipelines moved reporting compute to the database, off the API tier.",
    ],
    stack: ["Electron", "React", "Node.js", "Express.js", "MongoDB", "Material UI"],
    metrics: [
      { value: "−35%", label: "manual effort" },
      { value: "−40%", label: "query latency" },
      { value: "−25%", label: "UI defects post-release" },
    ],
    links: {},
  },
] as const;
