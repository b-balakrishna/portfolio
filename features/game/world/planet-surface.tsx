"use client";

import type { ReactNode } from "react";

import { PLANET_R, ROAD_HALF_WIDTH } from "../stations";

/**
 * Places children on the planet surface at ring angle `theta` and lateral
 * offset `lateral`, tilted so "up" matches the surface normal.
 */
export function PlanetItem({
  theta,
  lateral,
  rotY = 0,
  children,
}: Readonly<{ theta: number; lateral: number; rotY?: number; children: ReactNode }>) {
  const y = Math.sqrt(Math.max(PLANET_R * PLANET_R - lateral * lateral, 1));
  // Negative: rotation must map local +y onto the outward surface normal (lateral, y, 0)/R.
  const tilt = -Math.atan2(lateral, y);
  return (
    <group rotation-x={theta}>
      <group position={[lateral, y, 0]} rotation-z={tilt}>
        <group rotation-y={rotY}>{children}</group>
      </group>
    </group>
  );
}

const STRIPES = 64;
const LIGHTS = 22;

/** The planet body, the equatorial ring road, and roadside furniture. */
export function PlanetSurface() {
  return (
    <group>
      {/* Planet body — dark earthy tone so forests and rock read naturally */}
      <mesh>
        <sphereGeometry args={[PLANET_R - 0.35, 64, 48]} />
        <meshStandardMaterial color="#0e1410" roughness={0.95} />
      </mesh>

      {/* Asphalt ring band (open cylinder, axis along X) */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry
          args={[PLANET_R, PLANET_R, ROAD_HALF_WIDTH * 2, 160, 1, true]}
        />
        <meshStandardMaterial color="#15151d" roughness={0.95} side={2} />
      </mesh>

      {/* Shoulders */}
      {[-1, 1].map((side) => (
        <mesh key={`sh${side}`} rotation={[0, 0, Math.PI / 2]} position={[side * (ROAD_HALF_WIDTH + 2.4), 0, 0]}>
          <cylinderGeometry args={[PLANET_R - 0.08, PLANET_R - 0.08, 4.8, 160, 1, true]} />
          <meshStandardMaterial color="#0e0e15" roughness={1} side={2} />
        </mesh>
      ))}

      {/* Neon edge lines */}
      {[-1, 1].map((side) => (
        <mesh key={`edge${side}`} rotation={[0, 0, Math.PI / 2]} position={[side * (ROAD_HALF_WIDTH - 0.25), 0, 0]}>
          <cylinderGeometry args={[PLANET_R + 0.02, PLANET_R + 0.02, 0.18, 160, 1, true]} />
          <meshStandardMaterial
            color="#6366f1"
            emissive="#6366f1"
            emissiveIntensity={1.6}
            side={2}
          />
        </mesh>
      ))}

      {/* Center dashed line */}
      {Array.from({ length: STRIPES }, (_, i) => (
        <PlanetItem key={`stripe${i}`} theta={(i / STRIPES) * Math.PI * 2} lateral={0}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
            <planeGeometry args={[0.25, 3.2]} />
            <meshStandardMaterial color="#e7e7f0" emissive="#e7e7f0" emissiveIntensity={0.35} />
          </mesh>
        </PlanetItem>
      ))}

      {/* Street lights (emissive heads — cheap) */}
      {Array.from({ length: LIGHTS }, (_, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        return (
          <PlanetItem
            key={`pole${i}`}
            theta={(i / LIGHTS) * Math.PI * 2}
            lateral={side * (ROAD_HALF_WIDTH + 1.6)}
          >
            <mesh position={[0, 2.6, 0]}>
              <cylinderGeometry args={[0.07, 0.1, 5.2, 8]} />
              <meshStandardMaterial color="#1f1f2c" />
            </mesh>
            <mesh position={[-side * 0.9, 5.1, 0]} rotation={[0, 0, side * 0.5]}>
              <cylinderGeometry args={[0.05, 0.05, 2, 6]} />
              <meshStandardMaterial color="#1f1f2c" />
            </mesh>
            <mesh position={[-side * 1.7, 5.4, 0]}>
              <boxGeometry args={[0.7, 0.12, 0.3]} />
              <meshStandardMaterial color="#fde68a" emissive="#fde68a" emissiveIntensity={2.2} />
            </mesh>
          </PlanetItem>
        );
      })}

      {/* Start / finish gate at θ = 0 */}
      <PlanetItem theta={0} lateral={0}>
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * (ROAD_HALF_WIDTH + 0.9), 3, 0]}>
            <boxGeometry args={[0.25, 6, 0.25]} />
            <meshStandardMaterial color="#1f1f2c" metalness={0.6} />
          </mesh>
        ))}
        <mesh position={[0, 6.1, 0]}>
          <boxGeometry args={[(ROAD_HALF_WIDTH + 1.2) * 2, 0.5, 0.3]} />
          <meshStandardMaterial color="#16162a" emissive="#6366f1" emissiveIntensity={1.1} />
        </mesh>
        {/* Checker strip on the road */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <planeGeometry args={[ROAD_HALF_WIDTH * 2 - 1, 1.6]} />
          <meshStandardMaterial color="#e7e7f0" emissive="#e7e7f0" emissiveIntensity={0.5} />
        </mesh>
      </PlanetItem>
    </group>
  );
}
