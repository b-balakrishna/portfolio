"use client"

interface StatBarProps {
  label: string
  value: number
  max: number
  color?: "xp" | "hp" | "mp" | "primary"
}

export function StatBar({ label, value, max, color = "primary" }: StatBarProps) {
  const pct = Math.round((value / max) * 100)
  const colorVar = color === "primary" ? "--primary" : `--${color}`

  return (
    <div className="flex items-center gap-1.5 sm:gap-3">
      <span
        className="w-14 sm:w-20 md:w-24 shrink-0 text-right text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {label}
      </span>
      <div className="flex-1 h-3 sm:h-4 bg-secondary pixel-border relative overflow-hidden">
        <div
          className="stat-bar-fill h-full"
          style={{
            width: `${pct}%`,
            backgroundColor: `hsl(var(${colorVar}))`,
          }}
        />
        {/* Pixel segments */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r border-background/30"
            />
          ))}
        </div>
      </div>
      <span
        className="w-10 sm:w-12 text-[10px] sm:text-xs tabular-nums text-[hsl(var(--heading))]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {value}/{max}
      </span>
    </div>
  )
}
