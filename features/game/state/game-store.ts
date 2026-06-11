import { create } from "zustand";

import { SPAWN_Z, XP_PER_QUEST, type StationId } from "../stations";

export type GamePhase = "start" | "playing";

export type Weather = "day" | "sunset" | "night" | "storm";

export const weatherOrder: readonly Weather[] = ["day", "sunset", "night", "storm"] as const;

type GameState = Readonly<{
  phase: GamePhase;
  /** Billboard the car is currently next to, if any. */
  nearStation: StationId | null;
  /** Station whose panel is open, if any. */
  activePanel: StationId | null;
  visited: readonly StationId[];
  xp: number;
  muted: boolean;
  weather: Weather;
  /** Touch input: x = steering, z = throttle (-1 forward, +1 brake/reverse). */
  mobileDir: Readonly<{ x: number; z: number }>;
  /** Car position mirrored at low frequency for the minimap. */
  playerMapPos: Readonly<{ x: number; z: number }>;
  /** Car speed in world units/s, mirrored at low frequency for the speedometer. */
  speed: number;

  start: () => void;
  setNearStation: (id: StationId | null) => void;
  openPanel: (id: StationId) => void;
  closePanel: () => void;
  toggleMuted: () => void;
  cycleWeather: () => void;
  setMobileDir: (x: number, z: number) => void;
  setPlayerMapPos: (x: number, z: number) => void;
  setSpeed: (speed: number) => void;
}>;

export const useGameStore = create<GameState>()((set) => ({
  phase: "start",
  nearStation: null,
  activePanel: null,
  visited: [],
  xp: 0,
  muted: false,
  weather: "night",
  mobileDir: { x: 0, z: 0 },
  playerMapPos: { x: 0, z: SPAWN_Z },
  speed: 0,

  start: () => set({ phase: "playing" }),
  setNearStation: (id) => set({ nearStation: id }),
  openPanel: (id) =>
    set((state) => ({
      activePanel: id,
      visited: state.visited.includes(id) ? state.visited : [...state.visited, id],
      xp: state.visited.includes(id) ? state.xp : state.xp + XP_PER_QUEST,
    })),
  closePanel: () => set({ activePanel: null }),
  toggleMuted: () => set((state) => ({ muted: !state.muted })),
  cycleWeather: () =>
    set((state) => ({
      weather: weatherOrder[(weatherOrder.indexOf(state.weather) + 1) % weatherOrder.length],
    })),
  setMobileDir: (x, z) => set({ mobileDir: { x, z } }),
  setPlayerMapPos: (x, z) => set({ playerMapPos: { x, z } }),
  setSpeed: (speed) => set({ speed }),
}));

export function levelForXp(xp: number): number {
  return 1 + Math.floor(xp / (XP_PER_QUEST * 2));
}
