"use client";

import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { GithubIcon } from "./icons/github";
import { LeetcodeIcon } from "./icons/leetcode";
import { LinkedinIcon } from "./icons/linkedin";

const navItems = [
  { label: "STATS", href: "#stats", key: "1" },
  { label: "QUEST LOG", href: "#quests", key: "2" },
  { label: "ACHIEVEMENTS", href: "#achievements", key: "3" },
  { label: "MAIL", href: "#mail", key: "4" },
];

const socialLinks = [
  {
    icon: GithubIcon,
    href: "https://github.com/b-balakrishna",
    label: "GitHub",
  },
  {
    icon: LeetcodeIcon,
    href: "https://leetcode.com/u/balakrishna_battula/",
    label: "LeetCode",
  },
  {
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/balakrishna-bbk/",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:battulabalakrishna063@gmail.com",
    label: "Email",
  },
];

// Image frames for idle animation — cycles through these
const spriteFrames = [
  "/png/eat-1.png",
  "/png/eat-2.png",
  "/png/eat-3.png",
  "/png/eat-4.png",
  "/png/code.png",
  "/png/sleep-1.png",
  "/png/sleep-2.png",
  "/png/sleep-3.png",
  "/png/sleep-4.png",
  "/png/code.png",
  "/png/repeat.png",
];

const frameOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function AnimatedPlayer() {
  const [frameIdx, setFrameIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIdx((prev) => (prev + 1) % frameOrder.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const frame = spriteFrames[frameOrder[frameIdx]];

  return (
    <div className="pixel-border bg-card px-2 py-1.5 sm:px-3 sm:py-2 overflow-hidden flex justify-center">
      <img
        src={frame}
        alt="Player animation"
        className="h-40 w-auto select-none"
      />
    </div>
  );
}

export function Hero() {
  return (
    <header className="flex flex-col gap-2 sm:gap-3">
      {/* Animated character display */}
      <AnimatedPlayer />

      <div>
        <h1
          id="name"
          className="text-sm sm:text-base font-bold tracking-tight text-[hsl(var(--heading))] lg:text-lg glow"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          BALAKRISHNA_BATTULA
        </h1>
        <p
          id="designation"
          className="mt-0.5 text-[10px] sm:text-[11px] uppercase tracking-widest text-primary"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {">"} Frontend Developer
        </p>
        <p
          className="text-[9px] sm:text-[10px] text-muted-foreground"
          style={{ fontFamily: "var(--font-body)" }}
        >
          LVL 99 &middot; CLASS: Full-Stack Mage
        </p>

        {/* Mini stat bars */}
        <div className="mt-2 flex flex-col gap-1">
          <div
            className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span className="text-[hsl(var(--hp))] w-4">HP</span>
            <div className="flex-1 h-1.5 bg-secondary pixel-border overflow-hidden">
              <div
                className="h-full bg-[hsl(var(--hp))]"
                style={{ width: "100%" }}
              />
            </div>
            <span className="text-muted-foreground tabular-nums w-12 sm:w-14 text-right">
              999/999
            </span>
          </div>
          <div
            className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span className="text-[hsl(var(--mp))] w-4">MP</span>
            <div className="flex-1 h-1.5 bg-secondary pixel-border overflow-hidden">
              <div
                className="h-full bg-[hsl(var(--mp))]"
                style={{ width: "85%" }}
              />
            </div>
            <span className="text-muted-foreground tabular-nums w-12 sm:w-14 text-right">
              850/999
            </span>
          </div>
          <div
            className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span className="text-[hsl(var(--xp))] w-4">XP</span>
            <div className="flex-1 h-1.5 bg-secondary pixel-border overflow-hidden">
              <div
                className="h-full bg-[hsl(var(--xp))]"
                style={{ width: "72%" }}
              />
            </div>
            <span className="text-muted-foreground tabular-nums w-12 sm:w-14 text-right">
              72,400
            </span>
          </div>
        </div>
      </div>

      {/* Navigation as game menu - desktop only */}
      <nav className="hidden lg:block" aria-label="In-page jump links">
        <div className="pixel-border bg-card p-1.5">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group flex items-center gap-2 px-2 py-1.5 text-[10px] xl:text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-[hsl(var(--heading))] hover:bg-secondary"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <span className="text-primary text-[10px]">[{item.key}]</span>
                  <span className="flex-1">{item.label}</span>
                  <span className="opacity-0 group-hover:opacity-100 text-primary transition-opacity">
                    {"<"}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Social links + status */}
      <div className="flex items-center justify-between gap-2">
        <ul
          className="flex items-center gap-2 sm:gap-3"
          aria-label="Social links"
        >
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground transition-colors hover:text-primary"
                aria-label={`${link.label} (opens in a new tab)`}
              >
                <link.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </a>
            </li>
          ))}
        </ul>
        <p
          className="text-[8px] sm:text-[9px] text-muted-foreground"
          style={{ fontFamily: "var(--font-body)" }}
        >
          ONLINE<span className="blink text-primary">_</span>
        </p>
      </div>
    </header>
  );
}
