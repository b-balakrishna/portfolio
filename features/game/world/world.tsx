"use client";

import { stations } from "../stations";
import { Billboard } from "./billboard";
import { Car } from "./car";
import { City } from "./city";
import { Road } from "./road";
import { WeatherSystem } from "./weather";

export function World() {
  return (
    <>
      <WeatherSystem />
      <Road />
      <City />
      {stations.map((station) => (
        <Billboard key={station.id} station={station} />
      ))}
      <Car />
    </>
  );
}
