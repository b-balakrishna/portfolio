"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type MutableRefObject } from "react";
import { Group, MathUtils, Mesh } from "three";

/** Mutable car dynamics shared between the physics loop and the car visuals. */
export type CarDyn = {
  speed: number;
  latVel: number;
  steerIn: number;
};

/** The car mesh: yaw/lean/wheel-spin react to the shared dynamics ref. */
export function CarBody({ dyn }: Readonly<{ dyn: MutableRefObject<CarDyn> }>) {
  const body = useRef<Group>(null);
  const wheels = useRef<(Mesh | null)[]>([null, null, null, null]);

  useFrame((_, dt) => {
    const d = dyn.current;
    if (body.current) {
      // Yaw into the drift, roll with lateral g, pitch under throttle.
      body.current.rotation.y = MathUtils.lerp(
        body.current.rotation.y,
        MathUtils.clamp(d.latVel * 0.045, -0.5, 0.5),
        1 - Math.exp(-10 * dt)
      );
      body.current.rotation.z = MathUtils.lerp(
        body.current.rotation.z,
        MathUtils.clamp(-d.latVel * 0.018, -0.18, 0.18),
        1 - Math.exp(-8 * dt)
      );
    }
    for (const wheel of wheels.current) {
      if (wheel) wheel.rotation.x += d.speed * dt * 1.6;
    }
  });

  const tire = "#0c0c12";
  const paint = "#4338ca";

  return (
    <group ref={body}>
      {/* Chassis */}
      <mesh position={[0, 0.64, 0]}>
        <boxGeometry args={[1.7, 0.42, 3.4]} />
        <meshStandardMaterial color={paint} metalness={0.7} roughness={0.25} />
      </mesh>
      {/* Cabin */}
      <mesh position={[0, 1.04, -0.25]}>
        <boxGeometry args={[1.35, 0.5, 1.7]} />
        <meshStandardMaterial color="#0f0f1c" metalness={0.4} roughness={0.15} />
      </mesh>
      {/* Rear wing — it's a racer now */}
      <mesh position={[0, 1.15, -1.55]}>
        <boxGeometry args={[1.7, 0.07, 0.45]} />
        <meshStandardMaterial color="#1b1b2e" metalness={0.6} roughness={0.3} />
      </mesh>
      {[-0.7, 0.7].map((x) => (
        <mesh key={`wing${x}`} position={[x, 0.97, -1.55]}>
          <boxGeometry args={[0.08, 0.32, 0.3]} />
          <meshStandardMaterial color="#1b1b2e" metalness={0.6} />
        </mesh>
      ))}
      {/* Hood accent stripe */}
      <mesh position={[0, 0.86, 1.1]}>
        <boxGeometry args={[0.5, 0.02, 1.1]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={1.4} />
      </mesh>
      {/* Headlights */}
      {[-0.55, 0.55].map((x) => (
        <mesh key={`h${x}`} position={[x, 0.67, 1.71]}>
          <boxGeometry args={[0.3, 0.12, 0.04]} />
          <meshStandardMaterial color="#fff7d6" emissive="#fff7d6" emissiveIntensity={3} />
        </mesh>
      ))}
      {/* Taillight bar */}
      <mesh position={[0, 0.72, -1.71]}>
        <boxGeometry args={[1.5, 0.1, 0.04]} />
        <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={2.6} />
      </mesh>
      {/* Underglow */}
      <pointLight position={[0, 0.15, 0]} intensity={4} distance={4} color="#6366f1" />
      {/* Headlight beam */}
      <spotLight
        position={[0, 0.9, 1.6]}
        target-position={[0, 0, 16]}
        angle={0.55}
        penumbra={0.7}
        intensity={70}
        distance={48}
        color="#e8ecff"
      />

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
