import { ArrowUpRight } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { articles } from "./data";

export function Writing() {
  return (
    <Section id="writing" className="bg-secondary/20">
      <SectionHeading
        sectionId="writing"
        index="06"
        label="KNOWLEDGE HUB"
        title="I write down what I learn, in public."
        description="A 17-case-study system design repository, an open-source package, and a steady stream of frontend engineering content on LinkedIn."
      />

      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <StaggerItem key={article.title}>
            <a
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full focus-visible:outline-none"
            >
              <Card className="card-glow flex h-full flex-col p-6">
                <div className="mb-3 flex items-center justify-between">
                  <Badge variant="brand">{article.category}</Badge>
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </div>
                <h3 className="text-balance font-semibold leading-snug tracking-tight">
                  {article.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {article.description}
                </p>
                <p className="mt-4 font-mono text-[11px] text-muted-foreground">
                  → {article.source}
                </p>
              </Card>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
