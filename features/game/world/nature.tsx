"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import {
  CanvasTexture,
  Color,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  RepeatWrapping,
} from "three";

import { PLANET_R } from "../stations";
import { PlanetItem } from "./planet-surface";

/* Biome layout (matches the climate zones):
 *   θ ∈ [0,  π/2)  day     → forest
 *   θ ∈ [π/2, π)   sunset  → mountains + waterfall
 *   θ ∈ [π, 3π/2)  night   → neon city (built in city.tsx)
 *   θ ∈ [3π/2, 2π) storm   → rocky badlands
 */

/** Deterministic pseudo-random in [0, 1). */
function rand(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

type Spot = Readonly<{ theta: number; lateral: number; scale: number }>;

/** World matrix that stands an object on the planet surface at (θ, lateral). */
function surfaceMatrix(spot: Spot, target: Matrix4, tmp: Matrix4): Matrix4 {
  const y = Math.sqrt(Math.max(PLANET_R * PLANET_R - spot.lateral * spot.lateral, 1));
  const tilt = -Math.atan2(spot.lateral, y);
  target.makeRotationX(spot.theta);
  target.multiply(tmp.makeTranslation(spot.lateral, y, 0));
  target.multiply(tmp.makeRotationZ(tilt));
  target.multiply(tmp.makeScale(spot.scale, spot.scale, spot.scale));
  return target;
}

/** Fills two instanced meshes (trunks + foliage) from tree spots. */
function useInstances(
  spots: readonly Spot[],
  localYOffsets: readonly number[],
  refs: readonly React.RefObject<InstancedMesh | null>[],
  colors?: readonly (readonly string[])[]
): void {
  useLayoutEffect(() => {
    const base = new Matrix4();
    const tmp = new Matrix4();
    const local = new Matrix4();
    const final = new Matrix4();
    const color = new Color();
    spots.forEach((spot, i) => {
      surfaceMatrix(spot, base, tmp);
      refs.forEach((ref, m) => {
        const inst = ref.current;
        if (!inst) return;
        final.copy(base).multiply(local.makeTranslation(0, localYOffsets[m], 0));
        inst.setMatrixAt(i, final);
        const palette = colors?.[m];
        if (palette && palette.length > 0) {
          inst.setColorAt(i, color.set(palette[Math.floor(rand(i * 7 + m) * palette.length)]));
        }
      });
    });
    refs.forEach((ref) => {
      const inst = ref.current;
      if (!inst) return;
      inst.instanceMatrix.needsUpdate = true;
      if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    });
  }, [spots, localYOffsets, refs, colors]);
}

const TREE_COUNT = 240;

function treeSpots(): readonly Spot[] {
  const spots: Spot[] = [];
  for (let i = 0; i < TREE_COUNT; i++) {
    const r1 = rand(i * 3 + 1);
    const r2 = rand(i * 3 + 2);
    const r3 = rand(i * 3 + 3);
    // 80% in the forest quadrant, 20% spill into the mountain quadrant.
    const theta =
      i % 5 === 4 ? Math.PI / 2 + r1 * (Math.PI / 2) : 0.04 * Math.PI + r1 * (0.46 * Math.PI);
    const side = i % 2 === 0 ? -1 : 1;
    const lateral = side * (9.5 + r2 * 32);
    spots.push({ theta, lateral, scale: 0.75 + r3 * 0.9 });
  }
  return spots;
}

function Forest() {
  const trunks = useRef<InstancedMesh>(null);
  const foliageLow = useRef<InstancedMesh>(null);
  const foliageHigh = useRef<InstancedMesh>(null);
  const spots = useMemo(treeSpots, []);
  const offsets = useMemo(() => [0.55, 2.0, 3.1] as const, []);
  const refs = useMemo(() => [trunks, foliageLow, foliageHigh] as const, []);
  const colors = useMemo(
    () =>
      [
        ["#3b2a1d", "#46311f", "#332419"],
        ["#1d4a2a", "#256033", "#173d22", "#2a6e3c"],
        ["#256033", "#2f7a42", "#1d4a2a", "#357f3f"],
      ] as const,
    []
  );

  useInstances(spots, offsets, refs, colors);

  return (
    <group>
      <instancedMesh ref={trunks} args={[undefined, undefined, TREE_COUNT]} frustumCulled={false}>
        <cylinderGeometry args={[0.14, 0.22, 1.2, 6]} />
        <meshStandardMaterial roughness={0.9} flatShading />
      </instancedMesh>
      <instancedMesh
        ref={foliageLow}
        args={[undefined, undefined, TREE_COUNT]}
        frustumCulled={false}
      >
        <coneGeometry args={[1.25, 2.6, 7]} />
        <meshStandardMaterial roughness={0.85} flatShading />
      </instancedMesh>
      <instancedMesh
        ref={foliageHigh}
        args={[undefined, undefined, TREE_COUNT]}
        frustumCulled={false}
      >
        <coneGeometry args={[0.8, 1.8, 7]} />
        <meshStandardMaterial roughness={0.85} flatShading />
      </instancedMesh>
    </group>
  );
}

const ROCK_COUNT = 80;

function rockSpots(): readonly Spot[] {
  const spots: Spot[] = [];
  for (let i = 0; i < ROCK_COUNT; i++) {
    const r1 = rand(i * 5 + 11);
    const r2 = rand(i * 5 + 12);
    const r3 = rand(i * 5 + 13);
    // Mostly in the storm-zone badlands, some everywhere off-road.
    const theta =
      i % 3 === 0 ? r1 * Math.PI * 2 : 1.5 * Math.PI + r1 * (0.48 * Math.PI);
    const side = i % 2 === 0 ? -1 : 1;
    const lateral = side * (9.5 + r2 * 38);
    spots.push({ theta, lateral, scale: 0.4 + r3 * 1.6 });
  }
  return spots;
}

function Rocks() {
  const rocks = useRef<InstancedMesh>(null);
  const spots = useMemo(rockSpots, []);
  const offsets = useMemo(() => [0.3] as const, []);
  const refs = useMemo(() => [rocks] as const, []);
  const colors = useMemo(() => [["#3a3d46", "#2e3138", "#454a55", "#383426"]] as const, []);

  useInstances(spots, offsets, refs, colors);

  return (
    <instancedMesh ref={rocks} args={[undefined, undefined, ROCK_COUNT]} frustumCulled={false}>
      <icosahedronGeometry args={[0.7, 0]} />
      <meshStandardMaterial roughness={0.95} flatShading />
    </instancedMesh>
  );
}

type Mountain = Readonly<{
  theta: number;
  lateral: number;
  r: number;
  h: number;
}>;

const mountains: readonly Mountain[] = Array.from({ length: 14 }, (_, i) => {
  const r1 = rand(i * 9 + 31);
  const r2 = rand(i * 9 + 32);
  const r3 = rand(i * 9 + 33);
  const side = i % 2 === 0 ? -1 : 1;
  return {
    // Mountain ranges flank the sunset quadrant, a couple loom in the storm zone.
    theta: i < 10 ? Math.PI * 0.52 + r1 * Math.PI * 0.45 : Math.PI * 1.55 + r1 * Math.PI * 0.35,
    lateral: side * (30 + r2 * 24),
    r: 9 + r3 * 7,
    h: 15 + r3 * 13,
  };
});

function Mountains() {
  return (
    <group>
      {mountains.map((m, i) => (
        <PlanetItem key={i} theta={m.theta} lateral={m.lateral}>
          <mesh position={[0, m.h / 2 - 0.5, 0]}>
            <coneGeometry args={[m.r, m.h, 6]} />
            <meshStandardMaterial color="#2c3038" roughness={0.95} flatShading />
          </mesh>
          {/* Snow cap */}
          <mesh position={[0, m.h * 0.78, 0]}>
            <coneGeometry args={[m.r * 0.32, m.h * 0.26, 6]} />
            <meshStandardMaterial color="#dfe7ee" roughness={0.6} flatShading />
          </mesh>
        </PlanetItem>
      ))}
    </group>
  );
}

/** Scrolling streak texture that sells the falling water. */
function makeWaterTexture(): CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 256;
  const ctx = c.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "rgba(150, 200, 235, 0.55)";
    ctx.fillRect(0, 0, 64, 256);
    for (let i = 0; i < 26; i++) {
      const x = rand(i * 13) * 64;
      const len = 30 + rand(i * 17) * 90;
      const y = rand(i * 19) * 256;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.25 + rand(i * 23) * 0.45})`;
      ctx.fillRect(x, y, 2 + rand(i * 29) * 3, len);
    }
  }
  const t = new CanvasTexture(c);
  t.wrapS = RepeatWrapping;
  t.wrapT = RepeatWrapping;
  return t;
}

const WATERFALL_THETA = Math.PI * 0.72;
const WATERFALL_LATERAL = -23;

function Waterfall() {
  const texture = useMemo(makeWaterTexture, []);
  const material = useRef<MeshStandardMaterial>(null);

  useFrame((_, dt) => {
    texture.offset.y -= dt * 0.9; // water falls
  });

  return (
    <PlanetItem theta={WATERFALL_THETA} lateral={WATERFALL_LATERAL} rotY={Math.PI / 2}>
      {/* Cliff */}
      <mesh position={[0, 5.5, -2.2]}>
        <coneGeometry args={[7.5, 13, 5]} />
        <meshStandardMaterial color="#33373f" roughness={0.95} flatShading />
      </mesh>
      <mesh position={[-4.5, 2.4, -1]}>
        <dodecahedronGeometry args={[2.6, 0]} />
        <meshStandardMaterial color="#2c3038" roughness={0.95} flatShading />
      </mesh>
      <mesh position={[4.2, 1.8, -0.6]}>
        <dodecahedronGeometry args={[2, 0]} />
        <meshStandardMaterial color="#383d46" roughness={0.95} flatShading />
      </mesh>

      {/* Falling water */}
      <mesh position={[0, 5.2, 1.15]} rotation={[0.06, 0, 0]}>
        <planeGeometry args={[3.4, 10.5]} />
        <meshStandardMaterial
          ref={material}
          map={texture}
          transparent
          opacity={0.85}
          roughness={0.2}
          depthWrite={false}
          emissive="#9cc8e8"
          emissiveIntensity={0.25}
          side={2}
        />
      </mesh>

      {/* Plunge pool */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 2.6]}>
        <circleGeometry args={[3.4, 24]} />
        <meshStandardMaterial
          color="#1e4a66"
          transparent
          opacity={0.9}
          roughness={0.15}
          emissive="#2a6e96"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.09, 1.4]}>
        <ringGeometry args={[0.6, 1.5, 20]} />
        <meshBasicMaterial color="#cfe6f5" transparent opacity={0.35} depthWrite={false} />
      </mesh>

      {/* Mist */}
      <mesh position={[0, 1.2, 2.2]}>
        <sphereGeometry args={[1.6, 10, 10]} />
        <meshBasicMaterial color="#cfe2f0" transparent opacity={0.12} depthWrite={false} />
      </mesh>
    </PlanetItem>
  );
}

/** Dark green ground bands beside the road soften the asphalt-to-planet edge. */
function GrassBands() {
  return (
    <group>
      {[-1, 1].map((side) => (
        <mesh key={side} rotation={[0, 0, Math.PI / 2]} position={[side * 14, 0, 0]}>
          <cylinderGeometry args={[PLANET_R - 0.18, PLANET_R - 0.18, 10, 140, 1, true]} />
          <meshStandardMaterial color="#0e1812" roughness={1} side={2} />
        </mesh>
      ))}
    </group>
  );
}

/** Everything that lives on the planet surface besides road + city. */
export function Nature() {
  return (
    <group>
      <GrassBands />
      <Forest />
      <Rocks />
      <Mountains />
      <Waterfall />
    </group>
  );
}
