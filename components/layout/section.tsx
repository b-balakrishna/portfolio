import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = Readonly<{
  id: string;
  children: ReactNode;
  className?: string;
}>;

/** Page section with consistent rhythm and a scroll-margin for anchor nav. */
export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-24 md:py-32", className)}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto w-full max-w-content px-6 md:px-10">{children}</div>
    </section>
  );
}

type SectionHeadingProps = Readonly<{
  /** Two-digit index rendered in mono, e.g. "03". */
  index: string;
  /** Mono eyebrow label, e.g. "SYSTEM DESIGN". */
  label: string;
  title: string;
  description?: string;
  /** id of the parent section, used for aria-labelledby wiring. */
  sectionId: string;
}>;

export function SectionHeading({ index, label, title, description, sectionId }: SectionHeadingProps) {
  return (
    <div className="mb-12 max-w-2xl md:mb-16">
      <p className="mb-3 font-mono text-xs tracking-[0.2em] text-primary">
        {index} — {label}
      </p>
      <h2
        id={`${sectionId}-heading`}
        className="text-balance text-3xl font-semibold tracking-tight md:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
