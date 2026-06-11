"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Mesh } from "three";

import { PLANET_R } from "../stations";

/** Deterministic pseudo-random in [0, 1). */
function rand(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function Bird({ phase }: Readonly<{ phase: number }>) {
  const leftWing = useRef<Mesh>(null);
  const rightWing = useRef<Mesh>(null);

  useFrame((state) => {
    const flap = Math.sin(state.clock.elapsedTime * 9 + phase) * 0.65;
    if (leftWing.current) leftWing.current.rotation.z = flap;
    if (rightWing.current) rightWing.current.rotation.z = -flap;
  });

  return (
    <group>
      {/* Body — nose points +z, the direction of orbit */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.12, 0.7, 5]} />
        <meshStandardMaterial color="#16161e" roughness={0.8} />
      </mesh>
      {/* Wings pivot at the body */}
      <mesh ref={leftWing} position={[-0.05, 0, 0]}>
        <planeGeometry args={[1.1, 0.32]} />
        <meshStandardMaterial color="#1c1c26" roughness={0.8} side={2} />
      </mesh>
      <mesh ref={rightWing} position={[0.05, 0, 0]}>
        <planeGeometry args={[1.1, 0.32]} />
        <meshStandardMaterial color="#1c1c26" roughness={0.8} side={2} />
      </mesh>
    </group>
  );
}

type Flock = Readonly<{
  speed: number;
  startAngle: number;
  lateral: number;
  altitude: number;
  count: number;
}>;

const flocks: readonly Flock[] = Array.from({ length: 3 }, (_, i) => ({
  speed: 0.05 + rand(i * 7 + 1) * 0.05,
  startAngle: rand(i * 7 + 2) * Math.PI * 2,
  lateral: (i % 2 === 0 ? -1 : 1) * (4 + rand(i * 7 + 3) * 14),
  altitude: PLANET_R + 9 + rand(i * 7 + 4) * 8,
  count: 3 + Math.floor(rand(i * 7 + 5) * 3),
}));

function FlockGroup({ flock, index }: Readonly<{ flock: Flock; index: number }>) {
  const group = useRef<Group>(null);

  useFrame((state, dt) => {
    if (!group.current) return;
    // Orbit the planet independently of the car, with a gentle weave.
    group.current.rotation.x += flock.speed * dt;
    group.current.position.x = Math.sin(state.clock.elapsedTime * 0.3 + index * 2) * 2.5;
  });

  return (
    <group ref={group} rotation-x={flock.startAngle}>
      {Array.from({ length: flock.count }, (_, i) => {
        // Loose V formation: trail behind the leader, alternate sides.
        const row = Math.ceil(i / 2);
        const side = i % 2 === 0 ? 1 : -1;
        return (
          <group key={i} rotation-x={-row * 0.022}>
            <group
              position={[
                flock.lateral + side * row * 1.4,
                flock.altitude + rand(index * 31 + i) * 1.5,
                0,
              ]}
            >
              <Bird phase={index * 2.1 + i * 0.7} />
            </group>
          </group>
        );
      })}
    </group>
  );
}

/** Bird flocks orbiting the planet — they pass overhead even when you're parked. */
export function Birds() {
  return (
    <>
      {flocks.map((flock, i) => (
        <FlockGroup key={i} flock={flock} index={i} />
      ))}
    </>
  );
}

type Cloud = Readonly<{
  speed: number;
  startAngle: number;
  lateral: number;
  altitude: number;
  scale: number;
}>;

const clouds: readonly Cloud[] = Array.from({ length: 7 }, (_, i) => ({
  speed: 0.008 + rand(i * 11 + 1) * 0.012,
  startAngle: rand(i * 11 + 2) * Math.PI * 2,
  lateral: (i % 2 === 0 ? -1 : 1) * (6 + rand(i * 11 + 3) * 30),
  altitude: PLANET_R + 24 + rand(i * 11 + 4) * 14,
  scale: 1.6 + rand(i * 11 + 5) * 2.4,
}));

function CloudPuff({ cloud }: Readonly<{ cloud: Cloud }>) {
  const group = useRef<Group>(null);

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.x += cloud.speed * dt;
  });

  return (
    <group ref={group} rotation-x={cloud.startAngle}>
      <group position={[cloud.lateral, cloud.altitude, 0]} scale={cloud.scale}>
        {(
          [
            [0, 0, 0, 1.4],
            [1.5, -0.25, 0.3, 1.0],
            [-1.4, -0.2, -0.2, 1.1],
            [0.4, 0.5, -0.4, 0.85],
          ] as const
        ).map(([x, y, z, s], i) => (
          <mesh key={i} position={[x, y, z]} scale={[s * 1.4, s * 0.7, s]}>
            <sphereGeometry args={[1, 10, 8]} />
            <meshStandardMaterial
              color="#aeb8c6"
              transparent
              opacity={0.5}
              roughness={1}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** Soft cloud puffs drifting around the planet at altitude. */
export function Clouds() {
  return (
    <>
      {clouds.map((cloud, i) => (
        <CloudPuff key={i} cloud={cloud} />
      ))}
    </>
  );
}
