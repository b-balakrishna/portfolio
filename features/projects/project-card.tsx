"use client";

import { ChevronDown, ExternalLink, Package } from "lucide-react";
import { useId, useState } from "react";

import { GithubIcon } from "@/components/icons/github";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { Project } from "./data";

function Block({ label, children }: Readonly<{ label: string; children: React.ReactNode }>) {
  return (
    <div>
      <h4 className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
        {label}
      </h4>
      <div className="text-sm leading-relaxed text-secondary-foreground">{children}</div>
    </div>
  );
}

export function ProjectCard({ project }: Readonly<{ project: Project }>) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();

  return (
    <Card className="card-glow overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{project.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>
          </div>
          <ul className="flex items-center gap-2">
            {project.links.github ? (
              <li>
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} on GitHub`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              </li>
            ) : null}
            {project.links.npm ? (
              <li>
                <a
                  href={project.links.npm}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} on npm`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  <Package className="h-4 w-4" />
                </a>
              </li>
            ) : null}
            {project.links.live ? (
              <li>
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} live demo`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        {/* Metrics strip */}
        <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-border bg-border">
          {project.metrics.map((m) => (
            <div key={m.label} className="bg-secondary/40 px-3 py-2.5">
              <dd className="font-mono text-base font-semibold text-foreground md:text-lg">
                {m.value}
              </dd>
              <dt className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{m.label}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Block label="Problem">{project.problem}</Block>
          <Block label="Solution">{project.solution}</Block>
        </div>

        <div className="mt-6">
          <Block label="Architecture">{project.architecture}</Block>
        </div>

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={`${project.name} tech stack`}>
          {project.stack.map((tech) => (
            <li key={tech}>
              <Badge variant="outline">{tech}</Badge>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={detailsId}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-indigo-300"
        >
          Engineering decisions & challenges
          <ChevronDown
            aria-hidden
            className={cn("h-4 w-4 transition-transform duration-300", expanded && "rotate-180")}
          />
        </button>

        <div
          id={detailsId}
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-out",
            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="grid gap-6 pt-6 md:grid-cols-2">
              <Block label="Challenges solved">
                <ul className="space-y-2">
                  {project.challenges.map((c) => (
                    <li key={c} className="flex gap-2">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span className="text-pretty">{c}</span>
                    </li>
                  ))}
                </ul>
              </Block>
              <Block label="Key decisions">
                <ul className="space-y-2">
                  {project.decisions.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      <span className="text-pretty">{d}</span>
                    </li>
                  ))}
                </ul>
              </Block>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
