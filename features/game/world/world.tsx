"use client";

import { PlanetScene } from "./planet-scene";
import { WeatherSystem } from "./weather";

export function World() {
  return (
    <>
      <WeatherSystem />
      <PlanetScene />
    </>
  );
}
