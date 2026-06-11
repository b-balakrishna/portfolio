"use client";

import { CloudRain, FileText, Moon, Sun, Sunset, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useGameStore, levelForXp, type Weather } from "../state/game-store";
import { sfx } from "../lib/sound";
import { BILLBOARD_X, ROAD_LENGTH, XP_PER_QUEST, stations } from "../stations";

const weatherIcon: Record<Weather, typeof Sun> = {
  day: Sun,
  sunset: Sunset,
  night: Moon,
  storm: CloudRain,
};

const weatherLabel: Record<Weather, string> = {
  day: "Clear day",
  sunset: "Sunset",
  night: "Night",
  storm: "Storm",
};

/** Vertical road-strip minimap. */
function Minimap() {
  const playerPos = useGameStore((s) => s.playerMapPos);
  const visited = useGameStore((s) => s.visited);

  const top = (z: number) => `${((z + ROAD_LENGTH / 2) / ROAD_LENGTH) * 92 + 4}%`;
  const left = (x: number) => `${50 + (x / (BILLBOARD_X + 4)) * 38}%`;

  return (
    <div
      aria-label="Road map"
      className="relative h-40 w-14 rounded-lg border border-indigo-500/30 bg-[#0a0a12]/80 backdrop-blur-sm"
    >
      {/* Road line */}
      <div className="absolute bottom-2 left-1/2 top-2 w-1.5 -translate-x-1/2 rounded-full bg-zinc-800" />
      {stations.map((s) => (
        <span
          key={s.id}
          className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: left(s.side * BILLBOARD_X),
            top: top(s.z),
            background: visited.includes(s.id) ? "#34d399" : s.color,
            boxShadow: `0 0 6px ${s.color}`,
          }}
        />
      ))}
      <span
        className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_#fff]"
        style={{ left: left(playerPos.x), top: top(playerPos.z) }}
      />
    </div>
  );
}

function QuestLog() {
  const visited = useGameStore((s) => s.visited);
  return (
    <div className="w-60 rounded-lg border border-indigo-500/30 bg-[#0a0a12]/85 p-3 backdrop-blur-sm">
      <p className="mb-2 font-mono text-[10px] tracking-[0.25em] text-indigo-300">
        QUEST LOG · {visited.length}/{stations.length}
      </p>
      <ul className="space-y-1.5">
        {stations.map((s) => {
          const done = visited.includes(s.id);
          return (
            <li
              key={s.id}
              className={`flex items-center gap-2 font-mono text-[11px] ${
                done ? "text-emerald-400 line-through opacity-70" : "text-zinc-300"
              }`}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: done ? "#34d399" : s.color }}
              />
              {s.quest}
            </li>
          );
        })}
      </ul>
      {visited.length === stations.length ? (
        <p className="mt-2 font-mono text-[10px] tracking-widest text-emerald-400">
          ★ HIGHWAY 100% EXPLORED
        </p>
      ) : null}
    </div>
  );
}

export function Hud() {
  const xp = useGameStore((s) => s.xp);
  const visited = useGameStore((s) => s.visited);
  const nearStation = useGameStore((s) => s.nearStation);
  const activePanel = useGameStore((s) => s.activePanel);
  const muted = useGameStore((s) => s.muted);
  const weather = useGameStore((s) => s.weather);
  const speed = useGameStore((s) => s.speed);
  const toggleMuted = useGameStore((s) => s.toggleMuted);
  const cycleWeather = useGameStore((s) => s.cycleWeather);
  const openPanel = useGameStore((s) => s.openPanel);

  const level = levelForXp(xp);
  const levelProgress = ((xp % (XP_PER_QUEST * 2)) / (XP_PER_QUEST * 2)) * 100;
  const near = stations.find((s) => s.id === nearStation);
  const WeatherIcon = weatherIcon[weather];
  const kmh = Math.round(Math.abs(speed) * 3.6);

  // Weather drifts on its own every 50s.
  useEffect(() => {
    const id = setInterval(() => useGameStore.getState().cycleWeather(), 50_000);
    return () => clearInterval(id);
  }, []);

  // "+XP" toast on quest completion.
  const [toast, setToast] = useState<string | null>(null);
  const prevCount = useRef(visited.length);
  useEffect(() => {
    if (visited.length > prevCount.current) {
      setToast(`QUEST COMPLETE · +${XP_PER_QUEST} XP`);
      const t = setTimeout(() => setToast(null), 2200);
      prevCount.current = visited.length;
      return () => clearTimeout(t);
    }
    prevCount.current = visited.length;
  }, [visited.length]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {/* Player chip + XP */}
      <div className="absolute left-4 top-4 rounded-lg border border-indigo-500/30 bg-[#0a0a12]/85 p-3 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-indigo-500/20 font-mono text-sm font-bold text-indigo-300">
            BB
          </div>
          <div>
            <p className="font-mono text-xs font-semibold tracking-wider text-white">
              BALAKRISHNA
            </p>
            <p className="font-mono text-[10px] text-indigo-300">
              LVL {level} · SOFTWARE ENGINEER
            </p>
          </div>
        </div>
        <div className="mt-2 h-1.5 w-44 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-400 transition-[width] duration-700"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
        <p className="mt-1 font-mono text-[10px] text-zinc-500">{xp} XP</p>
      </div>

      {/* Quest log + actions */}
      <div className="absolute right-4 top-4 hidden flex-col items-end gap-2 sm:flex">
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              cycleWeather();
              if (!muted) sfx.blip();
            }}
            aria-label={`Change weather (current: ${weatherLabel[weather]})`}
            title={weatherLabel[weather]}
            className="flex h-9 items-center gap-2 rounded-md border border-indigo-500/30 bg-[#0a0a12]/85 px-3 font-mono text-[11px] tracking-wider text-indigo-300 backdrop-blur-sm hover:bg-indigo-500/15"
          >
            <WeatherIcon className="h-4 w-4" />
            {weatherLabel[weather].toUpperCase()}
          </button>
          <button
            type="button"
            onClick={() => {
              toggleMuted();
              if (muted) sfx.blip();
            }}
            aria-label={muted ? "Unmute sound" : "Mute sound"}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-indigo-500/30 bg-[#0a0a12]/85 text-indigo-300 backdrop-blur-sm hover:bg-indigo-500/15"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <Link
            href="/resume"
            className="flex h-9 items-center gap-2 rounded-md border border-indigo-500/30 bg-[#0a0a12]/85 px-3 font-mono text-[11px] tracking-wider text-indigo-300 backdrop-blur-sm hover:bg-indigo-500/15"
          >
            <FileText className="h-3.5 w-3.5" />
            RECRUITER MODE
          </Link>
        </div>
        <QuestLog />
      </div>

      {/* Minimap + speedometer */}
      <div className="absolute bottom-4 right-4 flex items-end gap-3">
        <div className="rounded-lg border border-indigo-500/30 bg-[#0a0a12]/85 px-3 py-2 text-right backdrop-blur-sm">
          <p className="font-mono text-2xl font-bold leading-none text-white">{kmh}</p>
          <p className="font-mono text-[9px] tracking-[0.25em] text-zinc-500">KM/H</p>
        </div>
        <Minimap />
      </div>

      {/* Controls hint */}
      <p className="absolute bottom-4 left-4 hidden font-mono text-[11px] tracking-wider text-zinc-500 md:block">
        [W/S] DRIVE · [A/D] STEER · [E] INTERACT · [ESC] CLOSE
      </p>

      {/* Interaction prompt */}
      {near && !activePanel ? (
        <div className="pointer-events-auto absolute bottom-16 left-1/2 -translate-x-1/2">
          <button
            type="button"
            onClick={() => {
              const isNew = !useGameStore.getState().visited.includes(near.id);
              openPanel(near.id);
              if (!useGameStore.getState().muted) {
                sfx.open();
                if (isNew) sfx.quest();
              }
            }}
            className="animate-pulse rounded-lg border px-5 py-2.5 font-mono text-xs tracking-[0.2em] backdrop-blur-sm"
            style={{
              borderColor: `${near.color}88`,
              background: "rgba(10,10,18,0.85)",
              color: near.color,
              boxShadow: `0 0 24px ${near.color}44`,
            }}
          >
            [E] OPEN {near.label.toUpperCase()}
          </button>
        </div>
      ) : null}

      {/* XP toast */}
      {toast ? (
        <div className="absolute left-1/2 top-20 -translate-x-1/2 rounded-md border border-emerald-400/50 bg-[#0a0a12]/90 px-4 py-2 font-mono text-xs tracking-[0.2em] text-emerald-300 shadow-[0_0_30px_rgba(52,211,153,0.25)]">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
