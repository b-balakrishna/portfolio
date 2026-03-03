"use client";

import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Spotlight } from "@/components/spotlight";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { MobileNav } from "@/components/mobile-nav"; // Added import for MobileNav

export default function Page() {
  return (
    <ThemeProvider>
      <Spotlight />

      {/* Game HUD top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2 sm:gap-4">
        <span
          className="text-[8px] sm:text-[10px] text-primary shrink-0"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          PORTFOLIO.EXE
        </span>
        <span
          className="text-[10px] text-muted-foreground hidden sm:inline"
          style={{ fontFamily: "var(--font-body)" }}
        >
          |
        </span>
        <span
          className="text-[10px] text-muted-foreground hidden sm:inline"
          style={{ fontFamily: "var(--font-body)" }}
        >
          HP: 999 | MP: 850 | LVL: 99
        </span>
        <span className="ml-auto flex items-center gap-2 sm:gap-4">
          <span
            className="text-[10px] text-muted-foreground hidden lg:inline"
            style={{ fontFamily: "var(--font-body)" }}
          >
            SECTOR: Internet
          </span>
          <ThemeSwitcher />
        </span>
      </header>

      <div className="mx-auto min-h-screen max-w-screen-xl pt-12 pb-10 sm:px-4 md:px-8 lg:px-16 xl:px-24 lg:pt-0 lg:pb-0">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-10">
          {/* Left column - sticky character panel (stacks on mobile) */}
          <aside className="pt-2 pb-4 lg:sticky lg:top-14 lg:flex lg:max-h-[calc(100vh-72px)] lg:w-[350px] xl:w-[350px] lg:shrink-0 lg:flex lg:flex-col lg:justify-center lg:items-center lg:py-6 lg:overflow-y-auto">
            <Hero />
          </aside>

          {/* Right column - scrollable game panels */}
          <main className="flex flex-col gap-8 sm:gap-12 lg:gap-16 lg:flex-1 lg:py-20">
            {/* Mobile nav */}
            <MobileNav />

            <About />
            <Experience />
            <Projects />
            <Contact />
            <Footer />
          </main>
        </div>
      </div>

      {/* Bottom HUD bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/90 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-1.5 flex items-center justify-between"
        aria-hidden="true"
      >
        <span
          className="text-[8px] sm:text-[10px] text-muted-foreground"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {">"} READY
          <span className="blink text-primary">_</span>
        </span>
        <span
          className="text-[8px] sm:text-[10px] text-muted-foreground hidden sm:block"
          style={{ fontFamily: "var(--font-body)" }}
        >
          [SCROLL] Navigate | [CLICK] Interact
        </span>
        <span
          className="text-[8px] sm:text-[10px] text-muted-foreground"
          style={{ fontFamily: "var(--font-body)" }}
        >
          v1.0.0
        </span>
      </div>
    </ThemeProvider>
  );
}
