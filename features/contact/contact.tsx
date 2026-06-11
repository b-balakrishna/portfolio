import { Mail, MapPin } from "lucide-react";

import { GithubIcon } from "@/components/icons/github";
import { LeetcodeIcon } from "@/components/icons/leetcode";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const credibility = [
  "3.5+ years in production",
  "Fintech & compliance-grade systems",
  "Open-source author",
  "System design in public",
] as const;

export function Contact() {
  return (
    <Section id="contact" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[28rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--primary) / 0.5), hsl(var(--accent) / 0.2), transparent)",
        }}
      />

      <Reveal className="relative mx-auto max-w-2xl text-center">
        <p
          id="contact-heading"
          className="mb-3 font-mono text-xs tracking-[0.2em] text-primary"
        >
          08 — CONTACT
        </p>
        <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          Let's build something that <span className="text-gradient">matters.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          I'm open to roles where one engineer can own real product surface — frontend platforms,
          full-stack systems, or developer tooling. The fastest way to reach me is email; I reply
          within a day.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <a href={`mailto:${site.email}`}>
              <Mail aria-hidden />
              {site.email}
            </a>
          </Button>
          <ul className="flex items-center gap-1">
            {(
              [
                { label: "GitHub", href: site.links.github, Icon: GithubIcon },
                { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedinIcon },
                { label: "LeetCode", href: site.links.leetcode, Icon: LeetcodeIcon },
              ] as const
            ).map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          {site.location} · open to remote
        </p>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {credibility.map((item) => (
            <li key={item} className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
              <span aria-hidden className="h-1 w-1 rounded-full bg-success" />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
