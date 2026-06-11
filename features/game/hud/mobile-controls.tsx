"use client";

import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import type { ReactNode } from "react";

import { useGameStore } from "../state/game-store";

function DirButton({
  label,
  dx,
  dz,
  children,
  className,
}: Readonly<{ label: string; dx: number; dz: number; children: ReactNode; className?: string }>) {
  const setMobileDir = useGameStore((s) => s.setMobileDir);

  const press = () => setMobileDir(dx, dz);
  const release = () => setMobileDir(0, 0);

  return (
    <button
      type="button"
      aria-label={label}
      className={`flex h-12 w-12 items-center justify-center rounded-md border border-indigo-500/40 bg-[#0a0a12]/80 text-indigo-300 backdrop-blur-sm active:bg-indigo-500/25 ${className ?? ""}`}
      onPointerDown={press}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
    </button>
  );
}

/** Touch d-pad, only rendered on coarse-pointer devices via CSS. */
export function MobileControls() {
  return (
    <div className="absolute bottom-5 left-4 z-20 select-none touch-none [@media(pointer:fine)]:hidden">
      <div className="grid grid-cols-3 gap-1.5">
        <div />
        <DirButton label="Accelerate" dx={0} dz={-1}>
          <ChevronUp className="h-6 w-6" />
        </DirButton>
        <div />
        <DirButton label="Steer left" dx={-1} dz={0}>
          <ChevronLeft className="h-6 w-6" />
        </DirButton>
        <DirButton label="Brake / reverse" dx={0} dz={1}>
          <ChevronDown className="h-6 w-6" />
        </DirButton>
        <DirButton label="Steer right" dx={1} dz={0}>
          <ChevronRight className="h-6 w-6" />
        </DirButton>
      </div>
    </div>
  );
}
