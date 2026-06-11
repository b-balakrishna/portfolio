"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, CheckCircle2, CircleDot, Circle } from "lucide-react";

import { Counter } from "@/components/motion/counter";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/layout/section";
import { Card } from "@/components/ui/card";

import { credentials, journey, roadmap, stats } from "./data";

const totalStudies = journey.reduce((sum, d) => sum + d.studies, 0);

function StatusIcon({ status }: Readonly<{ status: "done" | "active" | "next" }>) {
  if (status === "done") return <CheckCircle2 className="h-4 w-4 text-success" aria-hidden />;
  if (status === "active")
    return <CircleDot className="h-4 w-4 animate-pulse text-primary" aria-hidden />;
  return <Circle className="h-4 w-4 text-muted-foreground/50" aria-hidden />;
}

export function Dashboard() {
  const reduce = useReducedMotion();

  return (
    <Section id="dashboard">
      <SectionHeading
        sectionId="dashboard"
        index="07"
        label="ENGINEERING DASHBOARD"
        title="The career, instrumented."
        description="If you can't measure it, you can't improve it — so here's my own telemetry: delivery metrics, credentials, the learning roadmap, and the system design journey."
      />

      {/* Counters */}
      <Reveal>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card p-6">
              <dd className="font-mono text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
              </dd>
              <dt className="mt-2 text-sm font-medium text-foreground">{stat.label}</dt>
              <p className="mt-0.5 text-xs text-muted-foreground">{stat.detail}</p>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Learning roadmap */}
        <Reveal delay={0.05}>
          <Card className="h-full p-6 md:p-8">
            <h3 className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
              Learning roadmap
            </h3>
            <ol className="space-y-5">
              {roadmap.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-0.5 shrink-0">
                    <StatusIcon status={item.status} />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <h4 className="text-sm font-semibold">{item.title}</h4>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </Reveal>

        <div className="flex flex-col gap-6">
          {/* System design journey */}
          <Reveal delay={0.1}>
            <Card className="p-6 md:p-8">
              <div className="mb-6 flex items-baseline justify-between">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                  System design journey
                </h3>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {totalStudies} case studies
                </span>
              </div>
              <ul className="space-y-3.5">
                {journey.map((domain) => {
                  const pct = (domain.studies / totalStudies) * 100;
                  return (
                    <li key={domain.name}>
                      <div className="mb-1.5 flex items-baseline justify-between text-xs">
                        <span className="font-medium text-secondary-foreground">{domain.name}</span>
                        <span className="font-mono text-muted-foreground">{domain.studies}</span>
                      </div>
                      <div
                        className="h-1.5 overflow-hidden rounded-full bg-secondary"
                        role="img"
                        aria-label={`${domain.name}: ${domain.studies} of ${totalStudies} case studies`}
                      >
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-400"
                          initial={reduce ? { width: `${pct}%` } : { width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </Reveal>

          {/* Credentials */}
          <Reveal delay={0.15}>
            <Card className="p-6 md:p-8">
              <h3 className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                Credentials & recognition
              </h3>
              <Stagger className="space-y-4">
                {credentials.map((cred) => (
                  <StaggerItem key={cred.title} className="flex gap-3">
                    <Award className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                    <div>
                      <p className="text-sm font-semibold">
                        {cred.title}
                        <span className="ml-2 font-mono text-[11px] font-normal text-muted-foreground">
                          {cred.issuer}
                        </span>
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {cred.detail}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
