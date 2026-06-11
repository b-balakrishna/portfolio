"use client";

import { Stars } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  AmbientLight,
  Color,
  DirectionalLight,
  Fog,
  InstancedMesh,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  Object3D,
} from "three";

import { useGameStore, type Weather } from "../state/game-store";
import { ROAD_LENGTH } from "../stations";

type Palette = Readonly<{
  sky: string;
  fog: string;
  fogNear: number;
  fogFar: number;
  sun: string;
  sunIntensity: number;
  ambient: number;
  /** Sun/moon disc: position + look. */
  discColor: string;
  discY: number;
  stars: boolean;
  rain: boolean;
}>;

const palettes: Record<Weather, Palette> = {
  day: {
    sky: "#7da7d9",
    fog: "#9db8d9",
    fogNear: 60,
    fogFar: 190,
    sun: "#fff4e0",
    sunIntensity: 1.6,
    ambient: 0.75,
    discColor: "#fff7d6",
    discY: 80,
    stars: false,
    rain: false,
  },
  sunset: {
    sky: "#3b1f3f",
    fog: "#7a3a52",
    fogNear: 45,
    fogFar: 160,
    sun: "#ff9e64",
    sunIntensity: 1.0,
    ambient: 0.45,
    discColor: "#ff7a3c",
    discY: 18,
    stars: false,
    rain: false,
  },
  night: {
    sky: "#07070e",
    fog: "#0a0a14",
    fogNear: 35,
    fogFar: 150,
    sun: "#7c8ad9",
    sunIntensity: 0.22,
    ambient: 0.3,
    discColor: "#dfe6ff",
    discY: 60,
    stars: true,
    rain: false,
  },
  storm: {
    sky: "#0d1018",
    fog: "#141a26",
    fogNear: 22,
    fogFar: 110,
    sun: "#8b9bb8",
    sunIntensity: 0.35,
    ambient: 0.38,
    discColor: "#26303f",
    discY: 70,
    stars: false,
    rain: true,
  },
};

const RAIN_COUNT = 900;
const RAIN_AREA = 90;
const RAIN_HEIGHT = 30;

function RainField() {
  const mesh = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const drops = useMemo(
    () =>
      Array.from({ length: RAIN_COUNT }, (_, i) => ({
        x: (((i * 73) % 100) / 100 - 0.5) * RAIN_AREA,
        y: ((i * 37) % 100) / 100 * RAIN_HEIGHT,
        z: (((i * 151) % 100) / 100 - 0.5) * RAIN_AREA,
        speed: 26 + ((i * 17) % 10),
      })),
    []
  );

  useFrame((state, dt) => {
    const inst = mesh.current;
    if (!inst) return;
    const { x: px, z: pz } = useGameStore.getState().playerMapPos;
    drops.forEach((drop, i) => {
      drop.y -= drop.speed * dt;
      if (drop.y < 0) drop.y = RAIN_HEIGHT;
      dummy.position.set(px + drop.x, drop.y, pz + drop.z);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    });
    inst.instanceMatrix.needsUpdate = true;
    void state;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, RAIN_COUNT]} frustumCulled={false}>
      <boxGeometry args={[0.02, 0.55, 0.02]} />
      <meshBasicMaterial color="#9fb4d9" transparent opacity={0.5} />
    </instancedMesh>
  );
}

/** Lerps sky, fog, and lights toward the active weather palette every frame. */
export function WeatherSystem() {
  const weather = useGameStore((s) => s.weather);
  const scene = useThree((s) => s.scene);

  const sun = useRef<DirectionalLight>(null);
  const ambient = useRef<AmbientLight>(null);
  const disc = useRef<Mesh>(null);
  const flashUntil = useRef(0);
  const nextFlash = useRef(4);

  const skyColor = useMemo(() => new Color(palettes.night.sky), []);
  const fogColor = useMemo(() => new Color(palettes.night.fog), []);
  const target = palettes[weather];

  useFrame((state, dt) => {
    const k = 1 - Math.exp(-1.2 * dt);

    // Sky + fog
    skyColor.lerp(new Color(target.sky), k);
    fogColor.lerp(new Color(target.fog), k);
    scene.background = skyColor;
    if (!(scene.fog instanceof Fog)) {
      scene.fog = new Fog(fogColor.clone(), target.fogNear, target.fogFar);
    }
    scene.fog.color.copy(fogColor);
    scene.fog.near = MathUtils.lerp(scene.fog.near, target.fogNear, k);
    scene.fog.far = MathUtils.lerp(scene.fog.far, target.fogFar, k);

    // Lights
    if (sun.current) {
      sun.current.intensity = MathUtils.lerp(sun.current.intensity, target.sunIntensity, k);
      sun.current.color.lerp(new Color(target.sun), k);
    }
    if (ambient.current) {
      ambient.current.intensity = MathUtils.lerp(ambient.current.intensity, target.ambient, k);
    }

    // Sun/moon disc drifts to its palette height.
    if (disc.current) {
      disc.current.position.y = MathUtils.lerp(disc.current.position.y, target.discY, k);
      const mat = disc.current.material;
      if (mat instanceof MeshStandardMaterial) {
        mat.color.lerp(new Color(target.discColor), k);
        mat.emissive.lerp(new Color(target.discColor), k);
      }
    }

    // Storm lightning: brief ambient flash at random intervals.
    if (target.rain && ambient.current) {
      const t = state.clock.elapsedTime;
      if (t > nextFlash.current) {
        flashUntil.current = t + 0.12 + Math.random() * 0.1;
        nextFlash.current = t + 4 + Math.random() * 7;
      }
      if (t < flashUntil.current) {
        ambient.current.intensity = 1.6;
        scene.background = new Color("#2a3144");
      }
    }
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={0.3} />
      <directionalLight ref={sun} position={[40, 60, -30]} intensity={0.25} color="#7c8ad9" />
      <hemisphereLight args={["#312e81", "#08080d", 0.35]} />

      {/* Sun / moon disc on the horizon down the road */}
      <mesh ref={disc} position={[35, 60, ROAD_LENGTH / 2 + 60]}>
        <sphereGeometry args={[9, 24, 24]} />
        <meshStandardMaterial
          color="#dfe6ff"
          emissive="#dfe6ff"
          emissiveIntensity={1.4}
          fog={false}
        />
      </mesh>

      {target.stars ? (
        <Stars radius={140} depth={60} count={3000} factor={4} saturation={0} fade speed={0.5} />
      ) : null}

      {target.rain ? <RainField /> : null}
    </>
  );
}
