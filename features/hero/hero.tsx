"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

import { GithubIcon } from "@/components/icons/github";
import { LeetcodeIcon } from "@/components/icons/leetcode";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

const heroMetrics = [
  { value: "3.5+", label: "years shipping production software" },
  { value: "3", label: "companies — embedded, fintech, SaaS" },
  { value: "17", label: "system design case studies authored" },
  { value: "1", label: "open-source npm package published" },
] as const;

const socials = [
  { label: "GitHub", href: site.links.github, Icon: GithubIcon },
  { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedinIcon },
  { label: "LeetCode", href: site.links.leetcode, Icon: LeetcodeIcon },
] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Layered background: dot grid + radial brand glow, masked to fade out */}
      <div aria-hidden className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-20%] h-[36rem] w-[60rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--primary) / 0.55), hsl(var(--accent) / 0.25), transparent)",
        }}
      />

      <motion.div
        className="relative mx-auto flex min-h-[100svh] w-full max-w-content flex-col justify-center px-6 pb-20 pt-32 md:px-10"
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="visible"
      >
        <motion.div variants={item} className="mb-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <span className="relative inline-flex h-2 w-2">
              <span className="availability-dot relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {site.availability}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {site.location}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
        >
          {site.name.split(" ")[0]} builds products{" "}
          <span className="text-gradient">end-to-end.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          Software engineer — frontend-focused, full-stack capable. From pixel-perfect React
          interfaces to Node.js services, event-driven backends, and AWS infrastructure: I own the
          whole surface of a product, and ship it with metrics to prove it.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <Button asChild size="lg">
            <Link href="#projects">
              View my work
              <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#contact">Contact me</Link>
          </Button>
          <ul className="ml-1 flex items-center gap-1">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.dl
          variants={item}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4"
        >
          {heroMetrics.map((metric) => (
            <div key={metric.label} className="bg-card px-5 py-4">
              <dt className="order-2 mt-1 block text-xs leading-snug text-muted-foreground">
                {metric.label}
              </dt>
              <dd className="font-mono text-2xl font-semibold tracking-tight text-foreground">
                {metric.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
