"use client"

const navItems = [
  { label: "STATS", href: "#stats", key: "1" },
  { label: "QUESTS", href: "#quests", key: "2" },
  { label: "ACHIEVEMENTS", href: "#achievements", key: "3" },
  { label: "MAIL", href: "#mail", key: "4" },
]

export function MobileNav() {
  return (
    <nav className="lg:hidden pixel-border bg-card p-1.5" aria-label="Section navigation">
      <div className="grid grid-cols-4 gap-1">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-0.5 px-1 py-2 text-muted-foreground transition-colors hover:text-[hsl(var(--heading))] hover:bg-secondary text-center"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span className="text-primary text-[8px]">[{item.key}]</span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-wider">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}
