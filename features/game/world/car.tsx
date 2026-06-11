"use client";

import { useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group, MathUtils, Mesh, Vector3 } from "three";

import { sfx } from "../lib/sound";
import { useGameStore } from "../state/game-store";
import {
  BILLBOARD_X,
  INTERACT_RADIUS,
  ROAD_HALF_WIDTH,
  ROAD_MAX_Z,
  ROAD_MIN_Z,
  SPAWN_Z,
  stations,
  type StationId,
} from "../stations";
import type { Controls } from "./controls";

const MAX_SPEED = 26;
const MAX_REVERSE = -7;
const ACCEL = 18;
const BRAKE = 30;
const DRAG = 1.1;
const STEER_RATE = 1.9;

export function Car() {
  const group = useRef<Group>(null);
  const body = useRef<Group>(null);
  const wheels = useRef<(Mesh | null)[]>([null, null, null, null]);
  const camera = useThree((s) => s.camera);
  const [subscribeKeys, getKeys] = useKeyboardControls<Controls>();

  const speed = useRef(0);
  const heading = useRef(0);
  const camPos = useRef(new Vector3());
  const lookTarget = useRef(new Vector3(0, 1, SPAWN_Z + 6));
  const hudTimer = useRef(0);

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

  useFrame((state, rawDt) => {
    const car = group.current;
    if (!car) return;
    const dt = Math.min(rawDt, 0.05);

    const { activePanel, mobileDir, setNearStation, setPlayerMapPos, setSpeed } =
      useGameStore.getState();
    const keys = getKeys();

    // Input: keyboard + touch. Frozen while a panel is open.
    const throttleIn = activePanel ? 0 : (keys.forward ? 1 : 0) - (keys.back ? 1 : 0) - mobileDir.z;
    const steerIn = activePanel ? 0 : (keys.right ? 1 : 0) - (keys.left ? 1 : 0) + mobileDir.x;

    // Longitudinal physics: accelerate, brake/reverse, natural drag.
    if (throttleIn > 0) {
      speed.current += ACCEL * throttleIn * dt;
    } else if (throttleIn < 0) {
      speed.current -= (speed.current > 0 ? BRAKE : ACCEL) * -throttleIn * dt;
    }
    speed.current -= speed.current * DRAG * dt;
    speed.current = MathUtils.clamp(speed.current, MAX_REVERSE, MAX_SPEED);
    if (Math.abs(speed.current) < 0.02 && throttleIn === 0) speed.current = 0;

    // Steering scales with speed (no spinning in place).
    const steerStrength = MathUtils.clamp(speed.current / 8, -1, 1);
    heading.current -= steerIn * STEER_RATE * steerStrength * dt;

    // Integrate position.
    car.position.x += Math.sin(heading.current) * speed.current * dt;
    car.position.z += Math.cos(heading.current) * speed.current * dt;

    // Road bounds: soft bounce off guardrails and highway ends.
    const maxX = ROAD_HALF_WIDTH - 0.9;
    if (Math.abs(car.position.x) > maxX) {
      car.position.x = Math.sign(car.position.x) * maxX;
      speed.current *= 0.55;
    }
    if (car.position.z < ROAD_MIN_Z + 4 || car.position.z > ROAD_MAX_Z - 4) {
      car.position.z = MathUtils.clamp(car.position.z, ROAD_MIN_Z + 4, ROAD_MAX_Z - 4);
      speed.current *= -0.3;
    }

    car.rotation.y = heading.current;

    // Body lean + wheel spin.
    if (body.current) {
      body.current.rotation.z = MathUtils.lerp(
        body.current.rotation.z,
        steerIn * steerStrength * -0.06,
        1 - Math.exp(-8 * dt)
      );
      body.current.rotation.x = MathUtils.lerp(
        body.current.rotation.x,
        -throttleIn * 0.025,
        1 - Math.exp(-6 * dt)
      );
    }
    for (const wheel of wheels.current) {
      if (wheel) wheel.rotation.x += speed.current * dt * 1.6;
    }

    // Chase camera.
    const camDist = 8.5 + Math.abs(speed.current) * 0.12;
    camPos.current.set(
      car.position.x - Math.sin(heading.current) * camDist,
      4.6 + Math.abs(speed.current) * 0.04,
      car.position.z - Math.cos(heading.current) * camDist
    );
    camera.position.lerp(camPos.current, 1 - Math.exp(-3.5 * dt));
    lookTarget.current.lerp(
      new Vector3(
        car.position.x + Math.sin(heading.current) * 5,
        1.2,
        car.position.z + Math.cos(heading.current) * 5
      ),
      1 - Math.exp(-5 * dt)
    );
    camera.lookAt(lookTarget.current);

    // Billboard proximity (update store only on change).
    let nearest: StationId | null = null;
    let best = INTERACT_RADIUS;
    for (const station of stations) {
      const d = Math.hypot(
        car.position.x - station.side * BILLBOARD_X * 0.7,
        car.position.z - station.z
      );
      if (d < best) {
        best = d;
        nearest = station.id;
      }
    }
    if (useGameStore.getState().nearStation !== nearest) {
      setNearStation(nearest);
      if (nearest && !useGameStore.getState().muted) sfx.blip();
    }

    // Low-frequency HUD sync (minimap + speedometer).
    hudTimer.current += dt;
    if (hudTimer.current > 0.12) {
      hudTimer.current = 0;
      setPlayerMapPos(car.position.x, car.position.z);
      setSpeed(speed.current);
    }

    void state;
  });

  const tire = "#0c0c12";
  const paint = "#4338ca";

  return (
    <group ref={group} position={[0, 0, SPAWN_Z]}>
      <group ref={body} position={[0, 0.42, 0]}>
        {/* Chassis */}
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[1.7, 0.42, 3.4]} />
          <meshStandardMaterial color={paint} metalness={0.7} roughness={0.25} />
        </mesh>
        {/* Cabin */}
        <mesh position={[0, 0.62, -0.25]}>
          <boxGeometry args={[1.35, 0.5, 1.7]} />
          <meshStandardMaterial color="#0f0f1c" metalness={0.4} roughness={0.15} />
        </mesh>
        {/* Hood accent stripe */}
        <mesh position={[0, 0.44, 1.1]}>
          <boxGeometry args={[0.5, 0.02, 1.1]} />
          <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={1.4} />
        </mesh>
        {/* Headlights */}
        {[-0.55, 0.55].map((x) => (
          <mesh key={`h${x}`} position={[x, 0.25, 1.71]}>
            <boxGeometry args={[0.3, 0.12, 0.04]} />
            <meshStandardMaterial color="#fff7d6" emissive="#fff7d6" emissiveIntensity={3} />
          </mesh>
        ))}
        {/* Taillight bar */}
        <mesh position={[0, 0.3, -1.71]}>
          <boxGeometry args={[1.5, 0.1, 0.04]} />
          <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={2.6} />
        </mesh>
        {/* Underglow */}
        <pointLight position={[0, -0.25, 0]} intensity={4} distance={4} color="#6366f1" />
        {/* Headlight beams */}
        <spotLight
          position={[0, 0.5, 1.6]}
          target-position={[0, -0.4, 14]}
          angle={0.55}
          penumbra={0.7}
          intensity={60}
          distance={42}
          color="#e8ecff"
        />
      </group>

      {/* Wheels */}
      {(
        [
          [-0.85, 1.15],
          [0.85, 1.15],
          [-0.85, -1.15],
          [0.85, -1.15],
        ] as const
      ).map(([x, z], i) => (
        <mesh
          key={`${x},${z}`}
          ref={(el) => {
            wheels.current[i] = el;
          }}
          position={[x, 0.34, z]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.34, 0.34, 0.26, 18]} />
          <meshStandardMaterial color={tire} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}
