"use client"

import { type ReactNode } from "react"

export function GameFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="pixel-border bg-card p-0.5 sm:p-1">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 border-b border-border px-2 py-1.5 sm:px-3 sm:py-2">
        <span className="text-primary text-[8px] sm:text-[10px]" style={{ fontFamily: "var(--font-heading)" }}>
          {">>>"} 
        </span>
        <h2
          className="text-[10px] sm:text-xs uppercase tracking-widest text-[hsl(var(--heading))] truncate"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h2>
        <span className="ml-auto text-[8px] sm:text-[10px] text-muted-foreground hidden sm:inline shrink-0">
          {"[ESC] CLOSE"}
        </span>
      </div>
      {/* Content */}
      <div className="p-2.5 sm:p-4">
        {children}
      </div>
    </div>
  )
}
