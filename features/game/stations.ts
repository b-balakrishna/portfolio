export type StationId =
  | "experience"
  | "projects"
  | "systems"
  | "skills"
  | "philosophy"
  | "writing"
  | "dashboard"
  | "contact";

export type Station = Readonly<{
  id: StationId;
  /** Name shown on the billboard and in the quest log. */
  label: string;
  quest: string;
  /** Short lines rendered on the billboard face. */
  tagline: string;
  /** Position around the planet's ring road, in radians [0, 2π). */
  theta: number;
  /** Which side of the road: -1 = left, 1 = right. */
  side: -1 | 1;
  /** Hex color used for the billboard glow + minimap dot. */
  color: string;
}>;

/** Planet geometry. */
export const PLANET_R = 70;
export const ROAD_HALF_WIDTH = 7;
/** Lateral offset of billboards from the road center. */
export const BILLBOARD_X = 11.5;
/** Ring road circumference — one lap. */
export const LAP_LENGTH = 2 * Math.PI * PLANET_R;

/** Arc distance (world units) at which the car can interact with a billboard. */
export const INTERACT_RADIUS = 10;
export const XP_PER_QUEST = 120;

const STEP = (2 * Math.PI) / 8;
/** First billboard sits a third of a segment ahead of spawn (θ = 0). */
const OFFSET = STEP / 3;

export const stations: readonly Station[] = [
  {
    id: "experience",
    label: "Experience",
    quest: "Review the career log",
    tagline: "Wind River · OPEN · Smart Food Safe — 3.5+ yrs of shipped outcomes",
    theta: OFFSET,
    side: -1,
    color: "#818cf8",
  },
  {
    id: "projects",
    label: "Projects",
    quest: "Inspect shipped builds",
    tagline: "OptoTax GST platform · react-phase on npm · Electron suite",
    theta: OFFSET + STEP,
    side: 1,
    color: "#f472b6",
  },
  {
    id: "systems",
    label: "System Design",
    quest: "Study the architectures",
    tagline: "Event-driven pipelines · BFF · offline-first sync — drawn from memory",
    theta: OFFSET + STEP * 2,
    side: -1,
    color: "#22d3ee",
  },
  {
    id: "skills",
    label: "Skills",
    quest: "Scan the tech stack",
    tagline: "React · TypeScript · Node.js · AWS · 25+ technologies in production",
    theta: OFFSET + STEP * 3,
    side: 1,
    color: "#a78bfa",
  },
  {
    id: "philosophy",
    label: "Philosophy",
    quest: "Decode the principles",
    tagline: "Scalability · maintainability · performance · security · DX",
    theta: OFFSET + STEP * 4,
    side: -1,
    color: "#34d399",
  },
  {
    id: "writing",
    label: "Knowledge Hub",
    quest: "Open the knowledge base",
    tagline: "17 system design case studies · open-source · LinkedIn series",
    theta: OFFSET + STEP * 5,
    side: 1,
    color: "#fbbf24",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    quest: "Check the telemetry",
    tagline: "The career, instrumented — XP, roadmap, credentials",
    theta: OFFSET + STEP * 6,
    side: -1,
    color: "#60a5fa",
  },
  {
    id: "contact",
    label: "Contact",
    quest: "Transmit a message",
    tagline: "Open to opportunities — let's build something that matters",
    theta: OFFSET + STEP * 7,
    side: 1,
    color: "#4ade80",
  },
] as const;

/** Wraps an angle to [0, 2π). */
export function wrapAngle(a: number): number {
  const t = a % (2 * Math.PI);
  return t < 0 ? t + 2 * Math.PI : t;
}

/** Signed shortest angular difference a−b in (−π, π]. */
export function angleDelta(a: number, b: number): number {
  let d = wrapAngle(a) - wrapAngle(b);
  if (d > Math.PI) d -= 2 * Math.PI;
  if (d <= -Math.PI) d += 2 * Math.PI;
  return d;
}
