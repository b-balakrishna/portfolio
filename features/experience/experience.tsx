import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";

import { roles } from "./data";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        sectionId="experience"
        index="01"
        label="EXPERIENCE"
        title="Three companies, three domains, one through-line: ownership."
        description="Embedded developer tooling, business banking at fintech scale, and compliance SaaS — every role measured in shipped outcomes, not tickets closed."
      />

      <ol className="relative space-y-12 border-l border-border pl-8 md:pl-12">
        {roles.map((role, i) => (
          <Reveal as="li" key={role.company} delay={i * 0.05} className="relative">
            {/* Timeline node */}
            <span
              aria-hidden
              className={`absolute -left-[2.65rem] top-1.5 h-3 w-3 rounded-full border-2 md:-left-[3.65rem] ${
                role.current
                  ? "border-primary bg-primary shadow-[0_0_12px_2px_hsl(var(--primary)/0.5)]"
                  : "border-border bg-background"
              }`}
            />

            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-semibold tracking-tight">
                {role.company}
                <span className="ml-3 text-sm font-normal text-muted-foreground">{role.title}</span>
              </h3>
              <p className="font-mono text-xs text-muted-foreground">
                {role.period} · {role.location}
              </p>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">{role.summary}</p>

            <ul className="mt-4 space-y-3">
              {role.highlights.map((h) => (
                <li key={h.text} className="flex flex-wrap items-start gap-x-3 gap-y-1 text-sm leading-relaxed">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  <span className="flex-1 text-pretty text-secondary-foreground">{h.text}</span>
                  {h.metric ? <Badge variant="brand">{h.metric}</Badge> : null}
                </li>
              ))}
            </ul>

            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${role.company} tech stack`}>
              {role.stack.map((tech) => (
                <li key={tech}>
                  <Badge variant="outline">{tech}</Badge>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
