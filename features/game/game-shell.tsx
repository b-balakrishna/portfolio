"use client";

import { FileText, Gamepad2 } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

import { sfx } from "./lib/sound";
import { useGameStore } from "./state/game-store";
import { Hud } from "./hud/hud";
import { MobileControls } from "./hud/mobile-controls";
import { GamePanel } from "./hud/panel";

const GameCanvas = dynamic(() => import("./world/game-canvas"), { ssr: false });

function StartScreen({ onStart }: Readonly<{ onStart: () => void }>) {
  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#08080d] px-6 text-center">
      {/* Backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_45%,black,transparent)]"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, hsl(243 90% 66% / 0.6), hsl(262 88% 70% / 0.25), transparent)",
        }}
      />

      <div className="relative">
        <p className="font-mono text-xs tracking-[0.4em] text-indigo-300">DEV HIGHWAY v2.0</p>
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-white md:text-7xl">
          BALAKRISHNA<span className="text-gradient">.EXE</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-zinc-400 md:text-base">
          A neon highway through a software engineer's career. Drive past 8 billboards, watch the
          weather turn, and discover 3.5+ years of shipped products — or skip straight to the
          resume.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onStart}
            className="group inline-flex h-12 items-center gap-2 rounded-md bg-indigo-500 px-7 font-mono text-sm font-semibold tracking-widest text-white shadow-[0_0_40px_rgba(99,102,241,0.45)] transition-transform hover:scale-[1.03] hover:bg-indigo-400"
          >
            <Gamepad2 className="h-4 w-4" />
            PRESS START
          </button>
          <Link
            href="/resume"
            className="inline-flex h-12 items-center gap-2 rounded-md border border-zinc-700 px-6 font-mono text-xs tracking-widest text-zinc-300 transition-colors hover:border-indigo-400/60 hover:text-white"
          >
            <FileText className="h-4 w-4" />
            RECRUITER MODE
          </Link>
        </div>

        <p className="mt-8 font-mono text-[11px] tracking-wider text-zinc-600">
          W/S — DRIVE · A/D — STEER · E — INTERACT · TOUCH SUPPORTED
        </p>
      </div>
    </div>
  );
}

export function GameShell() {
  const phase = useGameStore((s) => s.phase);
  const start = useGameStore((s) => s.start);
  const muted = useGameStore((s) => s.muted);
  const [ready, setReady] = useState(false);

  if (phase === "start") {
    return (
      <StartScreen
        onStart={() => {
          start();
          if (!muted) sfx.start();
        }}
      />
    );
  }

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-[#08080d]">
      <GameCanvas onReady={() => setReady(true)} />

      {/* Boot overlay until the first frame */}
      {!ready ? (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#08080d]">
          <p className="font-mono text-xs tracking-[0.4em] text-indigo-300">LOADING HIGHWAY</p>
          <div className="mt-4 h-1 w-48 overflow-hidden rounded-full bg-zinc-800">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-indigo-500" />
          </div>
        </div>
      ) : null}

      <Hud />
      <MobileControls />
      <GamePanel />
    </div>
  );
}
