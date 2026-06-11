import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/layout/section";

import { projects } from "./data";
import { ProjectCard } from "./project-card";

export function Projects() {
  return (
    <Section id="projects" className="bg-secondary/20">
      <SectionHeading
        sectionId="projects"
        index="02"
        label="FEATURED WORK"
        title="Case studies, not screenshots."
        description="Each project documented the way real engineering is reviewed: the problem, the solution, the architecture, and the decisions that made the difference."
      />

      <div className="space-y-8">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.05}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
