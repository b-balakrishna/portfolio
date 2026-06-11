"use client";

import { useMemo } from "react";
import { CanvasTexture } from "three";

import { PlanetItem } from "./planet-surface";

/** Deterministic pseudo-random in [0, 1) — stable across renders. */
function rand(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/** One shared canvas texture of lit windows, reused by every tower. */
function makeWindowTexture(): CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 128;
  const ctx = c.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#05050a";
    ctx.fillRect(0, 0, 64, 128);
    for (let y = 4; y < 124; y += 10) {
      for (let x = 4; x < 60; x += 10) {
        const r = rand(x * 13 + y * 7);
        if (r > 0.45) {
          ctx.fillStyle = r > 0.9 ? "#c4b5fd" : r > 0.75 ? "#fef3c7" : "#8aa3c7";
          ctx.globalAlpha = 0.5 + r * 0.5;
          ctx.fillRect(x, y, 6, 6);
        }
      }
    }
    ctx.globalAlpha = 1;
  }
  return new CanvasTexture(c);
}

const SIGNS = [
  "REACT",
  "TYPESCRIPT",
  "NODE.JS",
  "AWS",
  "NEXT.JS",
  "MONGODB",
  "ELECTRON",
  "KAFKA",
  "DOCKER",
  "POSTGRES",
] as const;

const SIGN_COLORS = ["#818cf8", "#f472b6", "#34d399", "#fbbf24", "#22d3ee", "#a78bfa"] as const;

function makeSignTexture(text: string, color: string): CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 64;
  const ctx = c.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#08080f";
    ctx.fillRect(0, 0, 256, 64);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, 248, 56);
    ctx.fillStyle = color;
    ctx.font = "700 30px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 128, 34);
  }
  return new CanvasTexture(c);
}

type Tower = Readonly<{
  theta: number;
  lateral: number;
  w: number;
  h: number;
  d: number;
  sign?: Readonly<{ text: string; color: string }>;
}>;

const TOWERS_PER_ROW = 26;

function buildTowers(): readonly Tower[] {
  const towers: Tower[] = [];
  let signIdx = 0;
  for (let side = -1; side <= 1; side += 2) {
    for (let row = 0; row < 2; row++) {
      const baseLat = side * (20 + row * 13);
      for (let i = 0; i < TOWERS_PER_ROW; i++) {
        const seed = side * 1000 + row * 100 + i;
        // The city occupies the night/storm hemisphere; nature owns the other half.
        const theta = Math.PI + (i / TOWERS_PER_ROW) * Math.PI + rand(seed) * 0.08;
        const h = 7 + rand(seed + 1) * (row === 0 ? 14 : 22);
        const w = 5 + rand(seed + 2) * 5;
        const d = 5 + rand(seed + 3) * 5;
        const lateral = baseLat + (rand(seed + 4) - 0.5) * 6 * side;
        // Front-row towers occasionally carry a neon tech sign facing the road.
        const sign =
          row === 0 && rand(seed + 5) > 0.6
            ? {
                text: SIGNS[signIdx % SIGNS.length],
                color: SIGN_COLORS[signIdx % SIGN_COLORS.length],
              }
            : undefined;
        if (sign) signIdx++;
        towers.push({ theta, lateral, w, h, d, sign });
      }
    }
  }
  return towers;
}

/** Procedural skyline wrapped around the planet, with neon tech-stack signs. */
export function City() {
  const windowTexture = useMemo(makeWindowTexture, []);
  const towers = useMemo(buildTowers, []);
  const signTextures = useMemo(() => {
    const cache = new Map<string, CanvasTexture>();
    for (const t of towers) {
      if (t.sign && !cache.has(t.sign.text)) {
        cache.set(t.sign.text, makeSignTexture(t.sign.text, t.sign.color));
      }
    }
    return cache;
  }, [towers]);

  return (
    <group>
      {towers.map((t, i) => {
        const signRotY = t.lateral > 0 ? -Math.PI / 2 : Math.PI / 2;
        return (
          <PlanetItem key={i} theta={t.theta} lateral={t.lateral}>
            <mesh position={[0, t.h / 2, 0]}>
              <boxGeometry args={[t.w, t.h, t.d]} />
              <meshStandardMaterial
                color="#10101a"
                roughness={0.85}
                emissiveMap={windowTexture}
                emissive="#ffffff"
                emissiveIntensity={0.8}
              />
            </mesh>
            {/* Rooftop beacon on tall towers */}
            {t.h > 20 ? (
              <mesh position={[0, t.h + 0.3, 0]}>
                <sphereGeometry args={[0.18, 8, 8]} />
                <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={2.5} />
              </mesh>
            ) : null}
            {/* Neon sign facing the road */}
            {t.sign ? (
              <group rotation={[0, signRotY, 0]}>
                <mesh position={[0, t.h * 0.65, t.w / 2 + 0.05]}>
                  <planeGeometry args={[4.4, 1.1]} />
                  <meshStandardMaterial
                    map={signTextures.get(t.sign.text) ?? null}
                    emissiveMap={signTextures.get(t.sign.text) ?? null}
                    emissive="#ffffff"
                    emissiveIntensity={1.3}
                    toneMapped={false}
                    transparent
                  />
                </mesh>
              </group>
            ) : null}
          </PlanetItem>
        );
      })}
    </group>
  );
}
