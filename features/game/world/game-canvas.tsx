"use client";

import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { PLANET_R } from "../stations";
import { controlMap } from "./controls";
import { World } from "./world";

export default function GameCanvas({ onReady }: Readonly<{ onReady: () => void }>) {
  return (
    <KeyboardControls map={controlMap}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, PLANET_R + 5, -10], fov: 55, near: 0.1, far: 420 }}
        onCreated={onReady}
        className="touch-none"
        aria-label="3D racing portfolio on a tiny planet. Use WASD or arrow keys to drive, E to interact with billboards."
      >
        <World />
      </Canvas>
    </KeyboardControls>
  );
}
