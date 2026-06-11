"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { diagrams } from "./data";
import { ArchitectureDiagram } from "./diagram";

export function SystemDesign() {
  const [activeId, setActiveId] = useState<string>(diagrams[0].id);
  const reduce = useReducedMotion();
  const active = diagrams.find((d) => d.id === activeId) ?? diagrams[0];

  return (
    <Section id="systems">
      <SectionHeading
        sectionId="systems"
        index="03"
        label="SYSTEM DESIGN"
        title="Architectures I've shipped, drawn from memory."
        description="Not textbook diagrams — these are the production systems behind the metrics above, with the trade-offs that shaped them. 17 more case studies live in my system-design repository."
      />

      <Reveal>
        {/* Tabs */}
        <div role="tablist" aria-label="Architecture diagrams" className="mb-6 flex flex-wrap gap-2">
          {diagrams.map((d) => {
            const selected = d.id === active.id;
            return (
              <button
                key={d.id}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`panel-${d.id}`}
                id={`tab-${d.id}`}
                onClick={() => setActiveId(d.id)}
                className={cn(
                  "rounded-md border px-4 py-2 font-mono text-xs transition-colors",
                  selected
                    ? "border-primary/50 bg-primary/10 text-indigo-300"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                {d.name}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            role="tabpanel"
            id={`panel-${active.id}`}
            aria-labelledby={`tab-${active.id}`}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="grid gap-6 lg:grid-cols-[1fr_320px]"
          >
            <Card className="p-4 md:p-6">
              <p className="mb-4 text-pretty text-sm leading-relaxed text-muted-foreground">
                {active.context}
              </p>
              <ArchitectureDiagram diagram={active} />
              <p aria-hidden className="mt-3 text-right font-mono text-[10px] text-muted-foreground/60">
                UI client · SVC service · MQ queue · DB datastore · EXT external
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                Why it's built this way
              </h3>
              <ul className="space-y-4">
                {active.decisions.map((d) => (
                  <li key={d} className="flex gap-2.5 text-sm leading-relaxed text-secondary-foreground">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span className="text-pretty">{d}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </AnimatePresence>
      </Reveal>
    </Section>
  );
}
