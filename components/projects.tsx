import { GameFrame } from "./game-frame";

interface Achievement {
  title: string;
  rarity: "legendary" | "epic" | "rare";
  description: string;
  url: string;
  stars?: number;
  powers: string[];
  unlocked: boolean;
}

const achievements: Achievement[] = [
  {
    title: "Password Generator",
    rarity: "legendary",
    description:
      "Crafted a secure password generator that creates strong, random passwords with customizable options. Features include length selection, character type toggles, and entropy calculation.",
    url: "https://github.com/b-balakrishna/password-generator",
    stars: 150,
    powers: ["React", "TypeScript", "Tailwind CSS", "React hook form"],
    unlocked: true,
  },
  {
    title: "Resume Builder",
    rarity: "epic",
    description:
      "Built a resume builder application that allows users to create professional resumes with customizable templates. Supports PDF export and LinkedIn integration.",
    url: "https://github.com/b-balakrishna/resume-builder",
    stars: 80,
    powers: ["React.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    unlocked: true,
  },
  // {
  //   title: "ReactFlow UI",
  //   rarity: "legendary",
  //   description:
  //     "Forged an open-source library of composable, headless UI primitives for React. Wielded by 2,000+ developers across the realm. Features tree-shaking enchantments and WAI-ARIA compliance wards.",
  //   url: "#",
  //   stars: 2400,
  //   powers: ["React", "TypeScript", "Rollup", "Testing Library"],
  //   unlocked: true,
  // },
  // {
  //   title: "DevBoard",
  //   rarity: "epic",
  //   description:
  //     "Conjured a real-time developer dashboard that aggregates GitHub activity, CI/CD pipelines, and project metrics into a single scrying glass. Powered by streaming SSR and WebSocket magic.",
  //   url: "#",
  //   stars: 860,
  //   powers: ["Next.js", "TypeScript", "Tailwind CSS", "WebSockets"],
  //   unlocked: true,
  // },
  // {
  //   title: "MotionKit",
  //   rarity: "epic",
  //   description:
  //     "Crafted a lightweight animation spell library built on the Web Animations API. Provides spring physics, gesture recognition, and layout animations with minimal mana cost.",
  //   url: "#",
  //   stars: 1200,
  //   powers: ["React", "TypeScript", "Web Animations API"],
  //   unlocked: true,
  // },
  // {
  //   title: "Palette",
  //   rarity: "rare",
  //   description:
  //     "Designed a token generator and theme builder artifact for design systems. Exports tokens to CSS custom properties, Tailwind config, and Figma. Equipped by three product teams.",
  //   url: "#",
  //   powers: ["TypeScript", "Node.js", "Figma API", "CLI"],
  //   unlocked: true,
  // },
];

const rarityStyles: Record<
  string,
  { border: string; label: string; glow: string }
> = {
  legendary: {
    border: "border-[hsl(var(--xp))]",
    label: "text-[hsl(var(--xp))]",
    glow: "shadow-[0_0_12px_hsl(var(--xp)/0.15)]",
  },
  epic: {
    border: "border-[hsl(var(--mp))]",
    label: "text-[hsl(var(--mp))]",
    glow: "shadow-[0_0_12px_hsl(var(--mp)/0.15)]",
  },
  rare: {
    border: "border-primary",
    label: "text-primary",
    glow: "shadow-[0_0_12px_hsl(var(--primary)/0.15)]",
  },
};

export function Projects() {
  return (
    <section
      id="achievements"
      className="scroll-mt-16 sm:scroll-mt-24 flex flex-col gap-3 sm:gap-4"
    >
      {achievements.map((ach) => (
        <AchievementCard key={ach.title} achievement={ach} />
      ))}

      <p
        className="text-[10px] text-center text-muted-foreground mt-4"
        style={{ fontFamily: "var(--font-body)" }}
      >
        ACHIEVEMENTS UNLOCKED: {achievements.filter((a) => a.unlocked).length}/
        {achievements.length}
      </p>
    </section>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const style = rarityStyles[achievement.rarity];

  return (
    <div
      className={`pixel-border bg-card border ${style.border} ${style.glow} p-0.5 sm:p-1 transition-all hover:brightness-110`}
    >
      {/* Rarity banner */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-0 sm:justify-between px-2 sm:px-3 py-1 sm:py-1.5 border-b border-border">
        <span
          className={`text-[8px] sm:text-[10px] uppercase tracking-widest ${style.label}`}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          [{achievement.rarity}]
        </span>
        {achievement.stars && (
          <span
            className="text-[8px] sm:text-[10px] text-[hsl(var(--xp))]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {"*".repeat(Math.min(5, Math.floor(achievement.stars / 500) + 1))}{" "}
            {achievement.stars.toLocaleString()}
          </span>
        )}
        <span
          className="text-[8px] sm:text-[10px] text-primary"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {achievement.unlocked ? "[UNLOCKED]" : "[LOCKED]"}
        </span>
      </div>

      {/* Content */}
      <div className="p-2 sm:p-3 flex flex-col gap-2 sm:gap-2.5">
        <a
          href={achievement.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <h4
            className={`text-[10px] sm:text-sm ${style.label} glow transition-all group-hover:brightness-125`}
            style={{ fontFamily: "var(--font-heading)", lineHeight: "1.6" }}
          >
            {achievement.title}
            <span className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-1">
              {"->"}
            </span>
          </h4>
        </a>

        <p
          className="text-[10px] sm:text-xs leading-relaxed text-foreground"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {achievement.description}
        </p>

        {/* Powers / tech */}
        <div>
          <p
            className="text-[8px] sm:text-[10px] text-muted-foreground mb-1"
            style={{ fontFamily: "var(--font-body)" }}
          >
            POWERS:
          </p>
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {achievement.powers.map((p) => (
              <span
                key={p}
                className={`text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 border ${style.border} ${style.label} bg-background/50`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
