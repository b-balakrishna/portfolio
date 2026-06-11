"use client";

import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { SPAWN_Z } from "../stations";
import { controlMap } from "./controls";
import { World } from "./world";

export default function GameCanvas({ onReady }: Readonly<{ onReady: () => void }>) {
  return (
    <KeyboardControls map={controlMap}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 5, SPAWN_Z - 9], fov: 55, near: 0.1, far: 260 }}
        onCreated={onReady}
        className="touch-none"
        aria-label="3D driving portfolio. Use WASD or arrow keys to drive, E to interact with billboards."
      >
        <World />
      </Canvas>
    </KeyboardControls>
  );
}
