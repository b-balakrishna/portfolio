import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { skillDomains } from "./data";

export function Skills() {
  return (
    <Section id="skills" className="bg-secondary/20">
      <SectionHeading
        sectionId="skills"
        index="04"
        label="CAPABILITIES"
        title="A T-shaped stack: deep in frontend, fluent across the system."
        description="No progress bars, no star ratings — just the tools I've shipped production software with, grouped by where they sit in the architecture."
      />

      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillDomains.map((domain) => {
          const Icon = domain.icon;
          return (
            <StaggerItem key={domain.id}>
              <Card className="card-glow h-full p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-indigo-300">
                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                  </span>
                  <h3 className="font-semibold tracking-tight">{domain.name}</h3>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{domain.blurb}</p>
                <ul className="flex flex-wrap gap-1.5" aria-label={`${domain.name} skills`}>
                  {domain.skills.map((skill) => (
                    <li key={skill}>
                      <Badge>{skill}</Badge>
                    </li>
                  ))}
                </ul>
              </Card>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
