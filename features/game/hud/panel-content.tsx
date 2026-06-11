"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { useState } from "react";

import { GithubIcon } from "@/components/icons/github";
import { LeetcodeIcon } from "@/components/icons/leetcode";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { Badge } from "@/components/ui/badge";
import { credentials, roadmap, stats } from "@/features/dashboard/data";
import { roles } from "@/features/experience/data";
import { principles } from "@/features/philosophy/data";
import { projects } from "@/features/projects/data";
import { skillDomains } from "@/features/skills/data";
import { diagrams } from "@/features/system-design/data";
import { ArchitectureDiagram } from "@/features/system-design/diagram";
import { articles } from "@/features/writing/data";
import { site } from "@/lib/site";

import type { StationId } from "../stations";

function Label({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-indigo-300">
      {children}
    </p>
  );
}

function ExperienceContent() {
  return (
    <div className="space-y-6">
      {roles.map((role) => (
        <article key={role.company} className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-semibold text-white">
              {role.company}
              <span className="ml-2 text-xs font-normal text-zinc-400">{role.title}</span>
            </h3>
            <span className="font-mono text-[10px] text-zinc-500">{role.period}</span>
          </div>
          <ul className="mt-3 space-y-2">
            {role.highlights.map((h) => (
              <li key={h.text} className="flex flex-wrap gap-x-2 gap-y-1 text-xs leading-relaxed text-zinc-300">
                <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                <span className="flex-1">{h.text}</span>
                {h.metric ? <Badge variant="brand">{h.metric}</Badge> : null}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function ProjectsContent() {
  return (
    <div className="space-y-6">
      {projects.map((p) => (
        <article key={p.name} className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-semibold text-white">{p.name}</h3>
            <div className="flex gap-2">
              {p.links.github ? (
                <a
                  href={p.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.name} on GitHub`}
                  className="text-zinc-400 hover:text-white"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>
          <p className="mt-1 text-xs text-zinc-400">{p.tagline}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <Label>Problem</Label>
              <p className="text-xs leading-relaxed text-zinc-300">{p.problem}</p>
            </div>
            <div>
              <Label>Solution</Label>
              <p className="text-xs leading-relaxed text-zinc-300">{p.solution}</p>
            </div>
          </div>
          <div className="mt-3">
            <Label>Architecture</Label>
            <p className="text-xs leading-relaxed text-zinc-300">{p.architecture}</p>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {p.metrics.map((m) => (
              <span key={m.label} className="font-mono text-[11px] text-emerald-300">
                {m.value} <span className="text-zinc-500">{m.label}</span>
              </span>
            ))}
          </div>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {p.stack.map((tech) => (
              <li key={tech}>
                <Badge variant="outline">{tech}</Badge>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function SystemsContent() {
  const [activeId, setActiveId] = useState(diagrams[0].id);
  const active = diagrams.find((d) => d.id === activeId) ?? diagrams[0];
  return (
    <div>
      <div role="tablist" aria-label="Architectures" className="mb-4 flex flex-wrap gap-2">
        {diagrams.map((d) => (
          <button
            key={d.id}
            role="tab"
            type="button"
            aria-selected={d.id === active.id}
            onClick={() => setActiveId(d.id)}
            className={`rounded-md border px-3 py-1.5 font-mono text-[11px] ${
              d.id === active.id
                ? "border-indigo-400/60 bg-indigo-500/15 text-indigo-300"
                : "border-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>
      <p className="mb-3 text-xs leading-relaxed text-zinc-400">{active.context}</p>
      <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-3">
        <ArchitectureDiagram diagram={active} />
      </div>
      <ul className="mt-3 space-y-2">
        {active.decisions.map((d) => (
          <li key={d} className="flex gap-2 text-xs leading-relaxed text-zinc-300">
            <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillsContent() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {skillDomains.map((domain) => (
        <div key={domain.id} className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
          <h3 className="mb-1 text-sm font-semibold text-white">{domain.name}</h3>
          <p className="mb-3 text-xs text-zinc-400">{domain.blurb}</p>
          <ul className="flex flex-wrap gap-1.5">
            {domain.skills.map((skill) => (
              <li key={skill}>
                <Badge>{skill}</Badge>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function PhilosophyContent() {
  return (
    <div className="space-y-4">
      {principles.map((p, i) => (
        <div key={p.id} className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
          <p className="font-mono text-[10px] text-indigo-300">0{i + 1}</p>
          <h3 className="mt-0.5 text-sm font-semibold text-white">{p.title}</h3>
          <p className="mt-1 text-xs font-medium text-zinc-200">{p.thesis}</p>
          <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{p.practice}</p>
        </div>
      ))}
    </div>
  );
}

function WritingContent() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {articles.map((a) => (
        <a
          key={a.title}
          href={a.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-lg border border-zinc-800 bg-zinc-950/60 p-4 transition-colors hover:border-indigo-400/50"
        >
          <div className="flex items-center justify-between">
            <Badge variant="brand">{a.category}</Badge>
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-indigo-300" />
          </div>
          <h3 className="mt-2 text-sm font-semibold leading-snug text-white">{a.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-zinc-400">{a.description}</p>
          <p className="mt-2 font-mono text-[10px] text-zinc-500">→ {a.source}</p>
        </a>
      ))}
    </div>
  );
}

function DashboardContent() {
  return (
    <div className="space-y-5">
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-3">
            <dd className="font-mono text-xl font-semibold text-white">
              {s.value.toFixed(s.decimals ?? 0)}
              {s.suffix}
            </dd>
            <dt className="mt-1 text-[11px] leading-tight text-zinc-400">{s.label}</dt>
          </div>
        ))}
      </dl>
      <div>
        <Label>Learning roadmap</Label>
        <ol className="space-y-2">
          {roadmap.map((item) => (
            <li key={item.title} className="flex gap-2 text-xs leading-relaxed">
              <span
                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                  item.status === "done"
                    ? "bg-emerald-400"
                    : item.status === "active"
                      ? "animate-pulse bg-indigo-400"
                      : "bg-zinc-600"
                }`}
              />
              <span className="text-zinc-300">
                <span className="font-semibold text-white">{item.title}</span>{" "}
                <span className="font-mono text-[10px] text-zinc-500">{item.period}</span> —{" "}
                {item.description}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div>
        <Label>Credentials</Label>
        <ul className="space-y-1.5">
          {credentials.map((c) => (
            <li key={c.title} className="text-xs text-zinc-300">
              <span className="font-semibold text-white">{c.title}</span>{" "}
              <span className="font-mono text-[10px] text-zinc-500">{c.issuer}</span> — {c.detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="text-center">
      <p className="mx-auto max-w-md text-sm leading-relaxed text-zinc-300">
        Signal acquired. I'm open to roles where one engineer can own real product surface —
        frontend platforms, full-stack systems, or developer tooling. I reply within a day.
      </p>
      <a
        href={`mailto:${site.email}`}
        className="mt-5 inline-flex items-center gap-2 rounded-md bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:bg-indigo-400"
      >
        <Mail className="h-4 w-4" />
        {site.email}
      </a>
      <div className="mt-5 flex items-center justify-center gap-2">
        {(
          [
            { label: "GitHub", href: site.links.github, Icon: GithubIcon },
            { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedinIcon },
            { label: "LeetCode", href: site.links.leetcode, Icon: LeetcodeIcon },
          ] as const
        ).map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-700 text-zinc-400 hover:border-indigo-400/60 hover:text-white"
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
      <p className="mt-4 font-mono text-[10px] tracking-widest text-zinc-500">
        BENGALURU, INDIA · OPEN TO REMOTE
      </p>
    </div>
  );
}

export function PanelContent({ stationId }: Readonly<{ stationId: StationId }>) {
  switch (stationId) {
    case "experience":
      return <ExperienceContent />;
    case "projects":
      return <ProjectsContent />;
    case "systems":
      return <SystemsContent />;
    case "skills":
      return <SkillsContent />;
    case "philosophy":
      return <PhilosophyContent />;
    case "writing":
      return <WritingContent />;
    case "dashboard":
      return <DashboardContent />;
    case "contact":
      return <ContactContent />;
  }
}
