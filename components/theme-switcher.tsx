"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme, themes, type ThemeName } from "./theme-provider";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const current = themes.find((t) => t.name === theme);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={ref} className="relative">
      {showTooltip && (
        <div
          className="absolute -bottom-8 right-0 text-[8px] text-muted-foreground bg-secondary border border-border px-2 py-1 whitespace-nowrap z-40 jump"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Click to change theme
        </div>
      )}
      <button
        onClick={() => {
          setOpen(!open);
          setShowTooltip(false);
        }}
        className="flex items-center gap-1.5 text-[10px] text-primary hover:brightness-125 transition-all"
        style={{ fontFamily: "var(--font-body)" }}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Change theme"
      >
        <span>{current?.icon}</span>
        <span className="hidden sm:inline">{current?.label}</span>
        <span className="text-muted-foreground">{open ? "[-]" : "[+]"}</span>
      </button>

      {open && (
        <div
          className="absolute top-full right-0 mt-2 pixel-border bg-card p-1 z-50 min-w-[160px]"
          role="radiogroup"
          aria-label="Theme selector"
        >
          <p
            className="text-[8px] text-muted-foreground px-3 py-1.5 uppercase tracking-widest border-b border-border"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            SELECT THEME
          </p>
          {themes.map((t) => (
            <button
              key={t.name}
              role="radio"
              aria-checked={theme === t.name}
              onClick={() => {
                setTheme(t.name as ThemeName);
                setOpen(false);
              }}
              className={`flex items-center gap-2 w-full px-3 py-2 text-[11px] transition-colors ${
                theme === t.name
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span className="text-[10px] font-bold">{t.icon}</span>
              <span className="flex-1 text-left">{t.label}</span>
              {theme === t.name && <span>{"<"}</span>}
            </button>
          ))}
          <p
            className="text-[8px] text-muted-foreground px-3 py-1 border-t border-border"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {current?.description}
          </p>
        </div>
      )}
    </div>
  );
}
