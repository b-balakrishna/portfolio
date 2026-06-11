import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/layout/section";

import { principles } from "./data";

export function Philosophy() {
  return (
    <Section id="philosophy">
      <SectionHeading
        sectionId="philosophy"
        index="05"
        label="ENGINEERING PHILOSOPHY"
        title="How I think when nobody's watching the sprint board."
        description="Five principles, each grounded in something I've actually shipped — because philosophy without receipts is just vibes."
      />

      <div className="space-y-px overflow-hidden rounded-lg border border-border bg-border">
        {principles.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.04}>
            <article className="grid gap-4 bg-card p-6 transition-colors hover:bg-secondary/40 md:grid-cols-[200px_1fr] md:gap-10 md:p-8">
              <div>
                <p className="font-mono text-xs text-primary">0{i + 1}</p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight">{p.title}</h3>
              </div>
              <div>
                <p className="font-medium text-foreground">{p.thesis}</p>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {p.practice}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
