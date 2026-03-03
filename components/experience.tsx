import { GameFrame } from "./game-frame";

interface Quest {
  period: string;
  title: string;
  guild: string;
  status: "active" | "complete";
  xpReward: string;
  description: string;
  loot: string[];
}

const quests: Quest[] = [
  {
    period: "April 2025 - PRESENT",
    title: "Architect of the Frontend Realm",
    guild: "Open Financial Technologies",
    status: "active",
    xpReward: "+12,000 XP",
    description:
      "Designed and delivered 3 large-scale fintech modules using React, TypeScript, Zustand, and ShadCN, improving component reusability.",
    loot: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "ShadCN UI",
      "AWS",
    ],
  },
  {
    period: "January 2023 - March 2025",
    title: "Archmage of Code",
    guild: "Smart food safe",
    status: "complete",
    xpReward: "+8,500 XP",
    description:
      "Built and maintained the sacred component library powering 3 customer-facing products. Introduced automated visual regression wards, cutting UI bugs by 60%. Forged a unified design system.",
    loot: [
      "React js",
      "TypeScript",
      "Styled Components",
      "Storybook",
      "Material UI",
      "Node js",
      "Express js",
      "MongoDB",
      "MySQL",
      "AWS",
      "Kafka",
    ],
  },
];

export function Experience() {
  return (
    <section
      id="quests"
      className="scroll-mt-16 sm:scroll-mt-24 flex flex-col gap-3 sm:gap-4"
    >
      {quests.map((quest) => (
        <QuestCard key={quest.guild} quest={quest} />
      ))}
      <div className="mt-2 sm:mt-4 text-center">
        <a
          href="https://drive.google.com/file/d/13QZrMyE_PgjiFc6jt2C8OHHfvd12YIcJ/view?usp=drive_link"
          target="_blank"
          className="inline-block pixel-border bg-primary text-primary-foreground px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-xs uppercase tracking-widest transition-all hover:brightness-110"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {">> FULL QUEST LOG <<"}
        </a>
      </div>
    </section>
  );
}

function QuestCard({ quest }: { quest: Quest }) {
  return (
    <GameFrame
      title={quest.status === "active" ? "Active Quest" : "Completed Quest"}
    >
      <div className="flex flex-col gap-2 sm:gap-3">
        {/* Quest header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <div className="min-w-0">
            <h4
              className="text-[10px] sm:text-sm text-[hsl(var(--heading))] glow"
              style={{ fontFamily: "var(--font-heading)", lineHeight: "1.6" }}
            >
              {quest.title}
            </h4>
            <p
              className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Guild: <span className="text-primary">{quest.guild}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-1 shrink-0">
            <span
              className={`text-[8px] sm:text-[10px] uppercase tracking-widest px-1.5 sm:px-2 py-0.5 ${
                quest.status === "active"
                  ? "bg-primary/20 text-primary"
                  : "bg-secondary text-muted-foreground"
              }`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {quest.status === "active" ? "[ACTIVE]" : "[DONE]"}
            </span>
            <span
              className="text-[8px] sm:text-[10px] text-[hsl(var(--xp))]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {quest.xpReward}
            </span>
          </div>
        </div>

        {/* Period */}
        <p
          className="text-[8px] sm:text-[10px] text-muted-foreground"
          style={{ fontFamily: "var(--font-body)" }}
        >
          DURATION: {quest.period}
        </p>

        {/* Description */}
        <p
          className="text-[10px] sm:text-xs leading-relaxed text-foreground"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {quest.description}
        </p>

        {/* Loot */}
        <div>
          <p
            className="text-[8px] sm:text-[10px] text-muted-foreground mb-1 sm:mb-1.5"
            style={{ fontFamily: "var(--font-body)" }}
          >
            LOOT ACQUIRED:
          </p>
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {quest.loot.map((item) => (
              <span
                key={item}
                className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 bg-primary/10 text-primary border border-primary/30"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </GameFrame>
  );
}
