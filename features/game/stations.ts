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
  /** Position along the highway: z coordinate of the billboard. */
  z: number;
  /** Which side of the road: -1 = left, 1 = right. */
  side: -1 | 1;
  /** Hex color used for the billboard glow + minimap dot. */
  color: string;
}>;

/** Distance (in world units) at which the car can interact with a billboard. */
export const INTERACT_RADIUS = 9;
export const XP_PER_QUEST = 120;

/** Highway dimensions. */
export const ROAD_HALF_WIDTH = 7;
export const ROAD_LENGTH = 320;
export const ROAD_MIN_Z = -ROAD_LENGTH / 2;
export const ROAD_MAX_Z = ROAD_LENGTH / 2;
/** x offset of billboards from the road center. */
export const BILLBOARD_X = 12.5;
/** Where the car spawns. */
export const SPAWN_Z = -ROAD_LENGTH / 2 + 18;

export const stations: readonly Station[] = [
  {
    id: "experience",
    label: "Experience",
    quest: "Review the career log",
    tagline: "Wind River · OPEN · Smart Food Safe — 3.5+ yrs of shipped outcomes",
    z: -110,
    side: -1,
    color: "#818cf8",
  },
  {
    id: "projects",
    label: "Projects",
    quest: "Inspect shipped builds",
    tagline: "OptoTax GST platform · react-phase on npm · Electron suite",
    z: -78,
    side: 1,
    color: "#f472b6",
  },
  {
    id: "systems",
    label: "System Design",
    quest: "Study the architectures",
    tagline: "Event-driven pipelines · BFF · offline-first sync — drawn from memory",
    z: -46,
    side: -1,
    color: "#22d3ee",
  },
  {
    id: "skills",
    label: "Skills",
    quest: "Scan the tech stack",
    tagline: "React · TypeScript · Node.js · AWS · 25+ technologies in production",
    z: -14,
    side: 1,
    color: "#a78bfa",
  },
  {
    id: "philosophy",
    label: "Philosophy",
    quest: "Decode the principles",
    tagline: "Scalability · maintainability · performance · security · DX",
    z: 18,
    side: -1,
    color: "#34d399",
  },
  {
    id: "writing",
    label: "Knowledge Hub",
    quest: "Open the knowledge base",
    tagline: "17 system design case studies · open-source · LinkedIn series",
    z: 50,
    side: 1,
    color: "#fbbf24",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    quest: "Check the telemetry",
    tagline: "The career, instrumented — XP, roadmap, credentials",
    z: 82,
    side: -1,
    color: "#60a5fa",
  },
  {
    id: "contact",
    label: "Contact",
    quest: "Transmit a message",
    tagline: "Open to opportunities — let's build something that matters",
    z: 114,
    side: 1,
    color: "#4ade80",
  },
] as const;
