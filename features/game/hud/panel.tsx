"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

import { sfx } from "../lib/sound";
import { useGameStore } from "../state/game-store";
import { stations } from "../stations";
import { PanelContent } from "./panel-content";

export function GamePanel() {
  const activePanel = useGameStore((s) => s.activePanel);
  const closePanel = useGameStore((s) => s.closePanel);
  const station = stations.find((s) => s.id === activePanel);

  // Esc closes (E/Enter/Space are handled by the player's interact binding).
  useEffect(() => {
    if (!station) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePanel();
        if (!useGameStore.getState().muted) sfx.close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [station, closePanel]);

  if (!station) return null;

  return (
    <div
      className="absolute inset-0 z-30 flex items-end justify-center bg-black/50 p-3 backdrop-blur-[2px] sm:items-center"
      role="presentation"
      onClick={() => {
        closePanel();
        if (!useGameStore.getState().muted) sfx.close();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={station.label}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border bg-[#0b0b13]/95 shadow-2xl"
        style={{ borderColor: `${station.color}55`, boxShadow: `0 0 60px ${station.color}22` }}
      >
        {/* Header */}
        <header
          className="flex items-center justify-between border-b px-5 py-3"
          style={{ borderColor: `${station.color}33` }}
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em]" style={{ color: station.color }}>
              ◆ {station.label.toUpperCase()}
            </p>
            <h2 className="text-sm font-semibold text-white">{station.quest}</h2>
          </div>
          <button
            type="button"
            onClick={() => {
              closePanel();
              if (!useGameStore.getState().muted) sfx.close();
            }}
            aria-label="Close panel"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-5">
          <PanelContent stationId={station.id} />
        </div>

        <footer
          className="border-t px-5 py-2 text-center font-mono text-[10px] tracking-widest text-zinc-500"
          style={{ borderColor: `${station.color}22` }}
        >
          [ESC] / [E] CLOSE · KEEP EXPLORING FOR MORE XP
        </footer>
      </div>
    </div>
  );
}
