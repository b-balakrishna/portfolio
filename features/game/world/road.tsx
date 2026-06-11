"use client";

import { ROAD_HALF_WIDTH, ROAD_LENGTH } from "../stations";

const STRIPE_COUNT = Math.floor(ROAD_LENGTH / 8);

/** The highway: asphalt, lane stripes, glowing edge lines, guardrails, light poles. */
export function Road() {
  return (
    <group>
      {/* Asphalt */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[ROAD_HALF_WIDTH * 2, ROAD_LENGTH]} />
        <meshStandardMaterial color="#15151d" roughness={0.95} />
      </mesh>

      {/* Shoulders */}
      {[-1, 1].map((side) => (
        <mesh
          key={`shoulder${side}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[side * (ROAD_HALF_WIDTH + 2.5), -0.02, 0]}
        >
          <planeGeometry args={[5, ROAD_LENGTH]} />
          <meshStandardMaterial color="#0e0e15" roughness={1} />
        </mesh>
      ))}

      {/* Center dashed line */}
      {Array.from({ length: STRIPE_COUNT }, (_, i) => {
        const z = -ROAD_LENGTH / 2 + 4 + i * 8;
        return (
          <mesh key={`stripe${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, z]}>
            <planeGeometry args={[0.25, 3.4]} />
            <meshStandardMaterial color="#e7e7f0" emissive="#e7e7f0" emissiveIntensity={0.35} />
          </mesh>
        );
      })}

      {/* Neon edge lines */}
      {[-1, 1].map((side) => (
        <mesh
          key={`edge${side}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[side * (ROAD_HALF_WIDTH - 0.2), 0.01, 0]}
        >
          <planeGeometry args={[0.18, ROAD_LENGTH]} />
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={1.6} />
        </mesh>
      ))}

      {/* Guardrails */}
      {[-1, 1].map((side) => (
        <mesh key={`rail${side}`} position={[side * (ROAD_HALF_WIDTH + 0.45), 0.45, 0]}>
          <boxGeometry args={[0.12, 0.3, ROAD_LENGTH]} />
          <meshStandardMaterial color="#2a2a3a" metalness={0.7} roughness={0.4} />
        </mesh>
      ))}

      {/* Street light poles (emissive heads only — cheap at night) */}
      {Array.from({ length: Math.floor(ROAD_LENGTH / 26) }, (_, i) => {
        const z = -ROAD_LENGTH / 2 + 14 + i * 26;
        const side = i % 2 === 0 ? -1 : 1;
        const x = side * (ROAD_HALF_WIDTH + 1.4);
        return (
          <group key={`pole${i}`} position={[x, 0, z]}>
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
          </group>
        );
      })}

      {/* Start + finish gates */}
      {[
        { z: -ROAD_LENGTH / 2 + 8, text: true },
        { z: ROAD_LENGTH / 2 - 8, text: false },
      ].map(({ z }, i) => (
        <group key={`gate${i}`} position={[0, 0, z]}>
          {[-1, 1].map((side) => (
            <mesh key={side} position={[side * (ROAD_HALF_WIDTH + 0.8), 3, 0]}>
              <boxGeometry args={[0.25, 6, 0.25]} />
              <meshStandardMaterial color="#1f1f2c" metalness={0.6} />
            </mesh>
          ))}
          <mesh position={[0, 6.1, 0]}>
            <boxGeometry args={[(ROAD_HALF_WIDTH + 1) * 2, 0.5, 0.3]} />
            <meshStandardMaterial color="#16162a" emissive="#6366f1" emissiveIntensity={0.9} />
          </mesh>
        </group>
      ))}

      {/* Ground plane far below everything else */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]}>
        <planeGeometry args={[260, ROAD_LENGTH + 80]} />
        <meshStandardMaterial color="#0a0a11" roughness={1} />
      </mesh>
    </group>
  );
}
