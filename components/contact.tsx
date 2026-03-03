import { GameFrame } from "./game-frame";

export function Contact() {
  return (
    <section id="mail" className="scroll-mt-16 sm:scroll-mt-24">
      <GameFrame title="Mailbox">
        <div
          className="flex flex-col gap-3 sm:gap-4"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <div className="text-[10px] sm:text-xs leading-relaxed">
            <p className="text-muted-foreground">
              <span className="text-primary">FROM:</span> Player_Unknown
            </p>
            <p className="text-muted-foreground">
              <span className="text-primary">TO:</span>{" "}
              <span className="text-[hsl(var(--heading))] break-all">
                battulabalakrishna063@gmail.com
              </span>
            </p>
            <p className="text-muted-foreground">
              <span className="text-primary">SUBJ:</span> New Quest Proposal
            </p>
            <div className="border-t border-border mt-2 pt-2 sm:mt-3 sm:pt-3">
              <p className="text-foreground leading-relaxed">
                Greetings, adventurer! I am always accepting new quest
                proposals, guild invitations, and alliance requests. Whether you
                have a legendary project idea or just want to exchange tales at
                the tavern - my inbox is always open.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 sm:gap-2">
            <a
              href="mailto:battulabalakrishna063@gmail.com"
              className="block pixel-border bg-primary text-primary-foreground px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-xs text-center uppercase tracking-widest transition-all hover:brightness-110"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {">> SEND MESSAGE <<"}
            </a>
            <p className="text-[8px] sm:text-[10px] text-center text-muted-foreground">
              Response time: ~24h | Acceptance rate: 95%
            </p>
          </div>
        </div>
      </GameFrame>
    </section>
  );
}
