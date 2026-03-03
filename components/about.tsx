import { GameFrame } from "./game-frame";
import { StatBar } from "./stat-bar";

const skills = [
  { label: "React js", value: 90, max: 99, color: "xp" as const },
  { label: "TypeScript", value: 90, max: 99, color: "xp" as const },
  { label: "Next.js", value: 80, max: 99, color: "xp" as const },
  { label: "JavaScript", value: 95, max: 99, color: "xp" as const },
  { label: "CSS/Tailwind", value: 90, max: 99, color: "mp" as const },
  { label: "Shadcn UI", value: 80, max: 99, color: "mp" as const },
  { label: "Material UI", value: 80, max: 99, color: "mp" as const },
  { label: "Zustand", value: 70, max: 99, color: "mp" as const },
  { label: "Redux", value: 65, max: 99, color: "mp" as const },
  { label: "Node.js", value: 82, max: 99, color: "mp" as const },
  { label: "Express js", value: 75, max: 99, color: "mp" as const },
  { label: "MongoDB", value: 78, max: 99, color: "mp" as const },
  { label: "GraphQL", value: 75, max: 99, color: "mp" as const },
  { label: "Testing", value: 50, max: 99, color: "hp" as const },
  { label: "A11y", value: 88, max: 99, color: "hp" as const },
  { label: "Performance", value: 85, max: 99, color: "hp" as const },
  {
    label: "AWS",
    value: 50,
    max: 99,
    color: "hp" as const,
  },
];

const inventory = [
  { name: "Storybook", rarity: "rare" },
  { name: "Figma", rarity: "epic" },
  { name: "Docker", rarity: "rare" },
  { name: "Git", rarity: "legendary" },
  { name: "Webpack", rarity: "rare" },
  { name: "Playwright", rarity: "epic" },
  { name: "Jest", rarity: "epic" },
  { name: "Vite", rarity: "rare" },
  { name: "ESLint", rarity: "rare" },
  { name: "Prettier", rarity: "rare" },
  { name: "VS Code", rarity: "legendary" },
  { name: "Linux", rarity: "legendary" },
];

const rarityColor: Record<string, string> = {
  legendary: "text-[hsl(var(--xp))]",
  epic: "text-[hsl(var(--mp))]",
  rare: "text-primary",
  common: "text-muted-foreground",
};

export function About() {
  return (
    <section
      id="stats"
      className="scroll-mt-16 sm:scroll-mt-24 flex flex-col gap-4 sm:gap-6"
    >
      {/* Character bio */}
      <GameFrame title="Character Bio">
        <div
          className="flex flex-col gap-2.5 sm:gap-3 text-xs sm:text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <p>
            <span className="text-primary">{">"}</span> Began quest in{" "}
            <span className="text-[hsl(var(--heading))]">2022</span>, building
            fan sites with raw HTML scrolls. That curiosity evolved into a
            career spanning{" "}
            <span className="text-[hsl(var(--heading))]">
              startups, guilds, and enterprise dungeons
            </span>
            .
          </p>
          <p>
            <span className="text-primary">{">"}</span> Specializes in crafting
            high-performance interfaces using the{" "}
            <span className="text-[hsl(var(--heading))]">
              React &amp; TypeScript
            </span>{" "}
            spell system. Obsessed with accessibility enchantments and
            performance optimization potions.
          </p>
          <p>
            <span className="text-primary">{">"}</span> Off-duty: experiments
            with UI mechanics, performance tricks, and unconventional
            engineering patterns just to see what breaks first.
          </p>
        </div>
      </GameFrame>

      {/* Skill stats */}
      <GameFrame title="Skill Points">
        <div className="flex flex-col gap-2.5">
          {skills.map((skill) => (
            <StatBar
              key={skill.label}
              label={skill.label}
              value={skill.value}
              max={skill.max}
              color={skill.color}
            />
          ))}
        </div>
        <p
          className="mt-2 sm:mt-3 text-[8px] sm:text-[10px] text-muted-foreground text-right"
          style={{ fontFamily: "var(--font-body)" }}
        >
          TOTAL: {skills.reduce((a, s) => a + s.value, 0)} /{" "}
          {skills.length * 99}
        </p>
      </GameFrame>

      {/* Inventory */}
      <GameFrame title="Inventory">
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          {inventory.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-1 sm:py-1.5 bg-secondary/50 pixel-border min-w-0"
            >
              <span
                className="text-[8px] sm:text-[10px] text-muted-foreground shrink-0"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {"[*]"}
              </span>
              <span
                className={`text-[10px] sm:text-xs truncate ${rarityColor[item.rarity]}`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>
        <div
          className="mt-2 sm:mt-3 flex flex-wrap gap-2 sm:gap-4 text-[8px] sm:text-[10px] text-muted-foreground"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span className={rarityColor.legendary}>* Legendary</span>
          <span className={rarityColor.epic}>* Epic</span>
          <span className={rarityColor.rare}>* Rare</span>
        </div>
      </GameFrame>
    </section>
  );
}
