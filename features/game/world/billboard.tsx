"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { CanvasTexture, Mesh } from "three";

import { useGameStore } from "../state/game-store";
import { BILLBOARD_X, type Station } from "../stations";
import { PlanetItem } from "./planet-surface";

const TEX_W = 640;
const TEX_H = 360;

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current === "" ? word : `${current} ${word}`;
    if (ctx.measureText(candidate).width > maxWidth && current !== "") {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current !== "") lines.push(current);
  return lines;
}

/** Draws the billboard face onto a canvas — system fonts, no asset loading. */
function drawBillboard(canvas: HTMLCanvasElement, station: Station, visited: boolean): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#0b0b15";
  ctx.fillRect(0, 0, TEX_W, TEX_H);

  ctx.strokeStyle = station.color;
  ctx.lineWidth = 10;
  ctx.strokeRect(8, 8, TEX_W - 16, TEX_H - 16);
  ctx.strokeStyle = `${station.color}44`;
  ctx.lineWidth = 22;
  ctx.strokeRect(16, 16, TEX_W - 32, TEX_H - 32);

  ctx.fillStyle = station.color;
  ctx.font = "600 22px monospace";
  ctx.textAlign = "center";
  ctx.fillText(visited ? "✓ QUEST COMPLETE" : "◆ NEW QUEST", TEX_W / 2, 70);

  ctx.fillStyle = "#f4f4f8";
  ctx.font = "700 58px system-ui, sans-serif";
  ctx.fillText(station.label.toUpperCase(), TEX_W / 2, 140);

  ctx.fillStyle = "#9d9db2";
  ctx.font = "400 24px system-ui, sans-serif";
  const lines = wrapText(ctx, station.tagline, TEX_W - 110);
  lines.forEach((line, i) => {
    ctx.fillText(line, TEX_W / 2, 195 + i * 34);
  });

  ctx.fillStyle = visited ? "#34d399" : station.color;
  ctx.font = "600 20px monospace";
  ctx.fillText(visited ? "DRIVE ON, RACER" : "SLOW DOWN · PRESS E", TEX_W / 2, TEX_H - 42);
}

export function Billboard({ station }: Readonly<{ station: Station }>) {
  const near = useGameStore((s) => s.nearStation === station.id);
  const visited = useGameStore((s) => s.visited.includes(station.id));
  const glowRing = useRef<Mesh>(null);

  const { canvas, texture } = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = TEX_W;
    c.height = TEX_H;
    const t = new CanvasTexture(c);
    return { canvas: c, texture: t };
  }, []);

  useEffect(() => {
    drawBillboard(canvas, station, visited);
    texture.needsUpdate = true;
  }, [canvas, texture, station, visited]);

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((state) => {
    if (!glowRing.current) return;
    const pulse = near ? 1 + Math.sin(state.clock.elapsedTime * 5) * 0.07 : 1;
    glowRing.current.scale.setScalar(pulse);
  });

  // Face the road center.
  const rotY = station.side === 1 ? -Math.PI / 2 : Math.PI / 2;

  return (
    <PlanetItem theta={station.theta} lateral={station.side * BILLBOARD_X} rotY={rotY}>
      {/* Posts */}
      {[-2.6, 2.6].map((off) => (
        <mesh key={off} position={[off, 2.2, -0.25]}>
          <cylinderGeometry args={[0.14, 0.18, 4.4, 10]} />
          <meshStandardMaterial color="#1d1d2a" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}

      {/* Panel frame */}
      <mesh position={[0, 6, -0.3]}>
        <boxGeometry args={[7.6, 4.5, 0.3]} />
        <meshStandardMaterial color="#14141f" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Screen — emissive so it stays readable at night and in storms */}
      <mesh position={[0, 6, -0.1]}>
        <planeGeometry args={[7.2, 4.05]} />
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive="#ffffff"
          emissiveIntensity={near ? 1.15 : 0.85}
          toneMapped={false}
        />
      </mesh>

      {/* Billboard floodlight */}
      <pointLight
        position={[0, 6, 2]}
        intensity={near ? 16 : 7}
        distance={13}
        color={station.color}
      />

      {/* Pull-over marker on the shoulder */}
      <mesh ref={glowRing} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 3.6]}>
        <ringGeometry args={[1.5, 1.78, 40]} />
        <meshBasicMaterial
          color={visited ? "#34d399" : station.color}
          transparent
          opacity={near ? 0.95 : 0.4}
        />
      </mesh>
    </PlanetItem>
  );
}
