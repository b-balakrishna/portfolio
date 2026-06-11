"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = Readonly<{
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds, applied per item when used standalone. */
  delay?: number;
  /** Render as a different HTML tag. */
  as?: "div" | "section" | "li" | "span";
}>;

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Fade-and-rise entrance, triggered once when scrolled into view.
 * Collapses to a no-op transform for users preferring reduced motion.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </Tag>
  );
}

type StaggerProps = Readonly<{
  children: ReactNode;
  className?: string;
  /** Seconds between each child's entrance. */
  interval?: number;
}>;

/** Parent that staggers `StaggerItem` children as they enter the viewport. */
export function Stagger({ children, className, interval = 0.06 }: StaggerProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: interval }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <motion.div
      className={className}
      variants={variants}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
