import { IoCalendarClearOutline } from "react-icons/io5";
import { motion } from "motion/react";
import Sfs from "../assets/Sfs.png";
import Open from "../assets/Open.svg";
import ScrollReveal from "./ScrollReveal";

const experiences = [
  {
    icon: Open,
    title: "Frontend Engineer",
    company: "Open Financial Technologies",
    period: "Apr 2025 - Present",
    description: [
      "Designed and delivered 3 large-scale fintech modules using React, TypeScript, Zustand, and ShadCN, improving component reusability by 25% through shared UI libraries.",
      "Built GST filing and reporting systems (OptoTax) enabling automated workflows and downloadable data exports, reducing manual CA work by 30%.",
      "Developed notice tracking workflows that exposed failures, alerts, and statuses, reducing issue resolution time by 40%.",
      "Implemented enterprise onboarding + RBAC dashboards enhancing adoption and improving security visibility and audit control.",
      "Optimized performance across critical screens using lazy loading + memoization improving render efficiency by 20% on large datasets.",
    ],
  },
  {
    icon: Sfs,
    title: "Software Developer",
    company: "Smart Food Safe",
    period: "Jan 2023 - Mar 2025",
    description: [
      "Built and integrated REST APIs using Node.js + Express, improving microservice communication and cutting backend integration time by 30%.",
      "Accelerated MongoDB performance using indexing + aggregation pipelines, reducing query latency by 40%.",
      "Developed UI frontends in React + MUI improving responsiveness and reducing UI defects by 25% post-release.",
      "Shipped production Electron desktop apps, automating workflow status syncing and reducing manual effort by 35%.",
      "Built templated EJS + Bootstrap PDF engine, enabling dynamic reporting and reducingdocument creation time by 50%.",
    ],
  },
];

export default function Timeline() {
  return (
    <div className="w-full mx-auto py-12 md:py-20 px-6 sm:px-6 lg:px-8">
      <div className="relative ml-3 sm:ml-6 md:ml-10">
        {/* Timeline line */}
        <motion.div
          className="absolute left-0 top-[18px] bottom-0 border-l-2 border-primary/40"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          style={{ originY: 0 }}
        />

        {experiences.map(
          ({ company, description, period, title, icon }, index) => (
            <ScrollReveal>
              <motion.div
                key={index}
                className="relative pl-8 sm:pl-12 md:pl-16 pb-12 last:pb-0"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                {/* Timeline dot */}
                <div className="absolute h-3 w-3 -translate-x-1/2 left-px sm:left-1 top-3 rounded-full border-2 border-primary bg-background" />

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="shrink-0 h-8 w-8 sm:h-9 sm:w-9 bg-accent rounded-full flex items-center justify-center">
                      <img src={icon} className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <span className="text-sm sm:text-base font-medium">
                      {company}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold tracking-[-0.01em]">
                      {title}
                    </h3>

                    <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm opacity-80">
                      <IoCalendarClearOutline className="h-4 w-4" />
                      <span>{period}</span>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                    {description.map((point, idx) => (
                      <span key={idx} className="block mb-1">
                        • {point}
                      </span>
                    ))}
                  </div>
                </div>

                {index !== experiences.length - 1 && <hr className="my-4" />}
              </motion.div>
            </ScrollReveal>
          )
        )}
      </div>
    </div>
  );
}
