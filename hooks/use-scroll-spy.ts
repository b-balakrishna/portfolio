"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently in view using a single
 * IntersectionObserver (no scroll listeners, no layout thrash).
 */
export function useScrollSpy(ids: readonly string[], rootMargin = "-40% 0px -55% 0px"): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return activeId;
}
