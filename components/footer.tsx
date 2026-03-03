export function Footer() {
  return (
    <footer
      className="pt-8 sm:pt-12 pb-10 sm:pb-8"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div className="border-t border-border pt-4 sm:pt-6">
        <div className="flex flex-col gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] text-muted-foreground text-center">
          <p>
            CRAFTED WITH <span className="text-primary">Next.js</span>
            {" + "}
            <span className="text-primary">Tailwind CSS</span>
            {" + "}
            <span className="text-primary">React 19</span>
          </p>
          <p>
            DEPLOYED ON{" "}
            <span className="text-primary">Github static pages</span>
          </p>
          <p className="text-muted-foreground/60 mt-2">
            {"// NO CHEAT CODES WERE USED IN THE MAKING OF THIS PORTFOLIO"}
          </p>
          <p className="text-primary mt-1">
            GAME OVER? NEVER.
            <span className="blink">_</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
