export type Controls = "forward" | "back" | "left" | "right" | "interact";

export const controlMap: { name: Controls; keys: string[] }[] = [
  { name: "forward", keys: ["KeyW", "ArrowUp"] },
  { name: "back", keys: ["KeyS", "ArrowDown"] },
  { name: "left", keys: ["KeyA", "ArrowLeft"] },
  { name: "right", keys: ["KeyD", "ArrowRight"] },
  { name: "interact", keys: ["KeyE", "Enter", "Space"] },
];
