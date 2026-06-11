"use client";

import { useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group, MathUtils, Vector3 } from "three";

import { sfx } from "../lib/sound";
import { useGameStore, weatherOrder } from "../state/game-store";
import {
  BILLBOARD_X,
  INTERACT_RADIUS,
  PLANET_R,
  ROAD_HALF_WIDTH,
  angleDelta,
  stations,
  wrapAngle,
  type StationId,
} from "../stations";
import { Billboard } from "./billboard";
import { Birds, Clouds } from "./birds";
import { CarBody, type CarDyn } from "./car-body";
import { City } from "./city";
import type { Controls } from "./controls";
import { Nature } from "./nature";
import { PlanetSurface } from "./planet-surface";

/* Racing-tuned constants: quick off the line, high top speed, drift-y steering. */
const MAX_SPEED = 46;
const MAX_REVERSE = -8;
const ACCEL = 30;
const BRAKE = 48;
const DRAG = 0.45;
const LAT_ACCEL = 46;
const LAT_FRICTION = 5.5;
const MAX_LAT = 16;

/** Each planet quadrant is a climate zone. */
const ZONES = weatherOrder; // day → sunset → night → storm

export function PlanetScene() {
  const planet = useRef<Group>(null);
  const carGroup = useRef<Group>(null);
  const camera = useThree((s) => s.camera);
  const [subscribeKeys, getKeys] = useKeyboardControls<Controls>();

  const theta = useRef(0); // distance around the planet, radians (unwrapped)
  const lateral = useRef(0); // lateral position on the road
  const dyn = useRef<CarDyn>({ speed: 0, latVel: 0, steerIn: 0 });
  const camPos = useRef(new Vector3(0, PLANET_R + 5, -10));
  const lookTarget = useRef(new Vector3(0, PLANET_R + 1, 6));
  const hudTimer = useRef(0);
  const lastZone = useRef(-1);

  // Interact key opens the panel for the billboard we're next to.
  useEffect(() => {
    return subscribeKeys(
      (state) => state.interact,
      (pressed) => {
        if (!pressed) return;
        const { nearStation, activePanel, openPanel, closePanel, muted, visited } =
          useGameStore.getState();
        if (activePanel) {
          closePanel();
          if (!muted) sfx.close();
        } else if (nearStation) {
          const isNew = !visited.includes(nearStation);
          openPanel(nearStation);
          if (!muted) {
            sfx.open();
            if (isNew) sfx.quest();
          }
        }
      }
    );
  }, [subscribeKeys]);

  useFrame((_, rawDt) => {
    const planetGroup = planet.current;
    const car = carGroup.current;
    if (!planetGroup || !car) return;
    const dt = Math.min(rawDt, 0.05);
    const d = dyn.current;

    const { activePanel, mobileDir, setNearStation, setPlayerMapPos, setSpeed, setWeather } =
      useGameStore.getState();
    const keys = getKeys();

    // Inputs (frozen while a panel is open).
    const throttleIn = activePanel ? 0 : (keys.forward ? 1 : 0) - (keys.back ? 1 : 0) - mobileDir.z;
    // Camera looks along +z, so world +x is screen-left: steer right = negative x.
    const steerIn = activePanel ? 0 : (keys.left ? 1 : 0) - (keys.right ? 1 : 0) - mobileDir.x;
    d.steerIn = steerIn;

    // Longitudinal: racing accel, hard brakes, light drag.
    if (throttleIn > 0) {
      d.speed += ACCEL * throttleIn * dt;
    } else if (throttleIn < 0) {
      d.speed -= (d.speed > 0 ? BRAKE : ACCEL * 0.6) * -throttleIn * dt;
    }
    d.speed -= d.speed * DRAG * dt;
    d.speed = MathUtils.clamp(d.speed, MAX_REVERSE, MAX_SPEED);
    if (Math.abs(d.speed) < 0.02 && throttleIn === 0) d.speed = 0;

    // Lateral: arcade drift — steering builds lateral velocity, friction bleeds it.
    const grip = MathUtils.clamp(Math.abs(d.speed) / 10, 0, 1);
    d.latVel += steerIn * LAT_ACCEL * grip * dt * Math.sign(d.speed || 1);
    d.latVel -= d.latVel * LAT_FRICTION * dt;
    d.latVel = MathUtils.clamp(d.latVel, -MAX_LAT, MAX_LAT);
    lateral.current += d.latVel * dt;

    // Guardrail bounce: scrub speed, reflect lateral velocity.
    const maxX = ROAD_HALF_WIDTH - 0.95;
    if (Math.abs(lateral.current) > maxX) {
      lateral.current = Math.sign(lateral.current) * maxX;
      d.latVel *= -0.35;
      d.speed *= 0.9;
    }

    // Advance around the planet — the endless loop.
    theta.current += (d.speed * dt) / PLANET_R;
    planetGroup.rotation.x = -theta.current;

    // Car sits on top of the globe.
    car.position.set(lateral.current, PLANET_R, 0);

    // Chase camera: pulls back + rises with speed.
    const back = 8.5 + Math.abs(d.speed) * 0.1;
    camPos.current.set(
      lateral.current * 0.55,
      PLANET_R + 4.4 + Math.abs(d.speed) * 0.05,
      -back
    );
    camera.position.lerp(camPos.current, 1 - Math.exp(-3.8 * dt));
    lookTarget.current.lerp(
      new Vector3(lateral.current, PLANET_R + 1.1, 6),
      1 - Math.exp(-6 * dt)
    );
    camera.lookAt(lookTarget.current);

    // Billboard proximity by arc distance.
    let nearest: StationId | null = null;
    let best = INTERACT_RADIUS;
    for (const station of stations) {
      const arc = Math.abs(angleDelta(station.theta, theta.current)) * PLANET_R;
      const lat = Math.abs(lateral.current - station.side * BILLBOARD_X * 0.55);
      const dist = Math.hypot(arc, lat * 0.6);
      if (dist < best) {
        best = dist;
        nearest = station.id;
      }
    }
    if (useGameStore.getState().nearStation !== nearest) {
      setNearStation(nearest);
      if (nearest && !useGameStore.getState().muted) sfx.blip();
    }

    // Climate zones: each quadrant of the planet has its own weather.
    const zone = Math.floor(wrapAngle(theta.current) / (Math.PI / 2)) % ZONES.length;
    if (zone !== lastZone.current) {
      lastZone.current = zone;
      setWeather(ZONES[zone]);
    }

    // Low-frequency HUD sync (orbit map, speedometer, laps).
    hudTimer.current += dt;
    if (hudTimer.current > 0.12) {
      hudTimer.current = 0;
      setPlayerMapPos(lateral.current, theta.current);
      setSpeed(d.speed);
    }
  });

  return (
    <>
      <group ref={planet}>
        <PlanetSurface />
        <Nature />
        <City />
        {stations.map((station) => (
          <Billboard key={station.id} station={station} />
        ))}
      </group>

      {/* Birds and clouds orbit independently of the car */}
      <Birds />
      <Clouds />

      <group ref={carGroup} position={[0, PLANET_R, 0]}>
        <CarBody dyn={dyn} />
      </group>
    </>
  );
}
