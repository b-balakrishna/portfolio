import { GithubIcon } from "@/components/icons/github";
import { LeetcodeIcon } from "@/components/icons/leetcode";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { site } from "@/lib/site";

const socials = [
  { label: "GitHub", href: site.links.github, Icon: GithubIcon },
  { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedinIcon },
  { label: "LeetCode", href: site.links.leetcode, Icon: LeetcodeIcon },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-content flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row md:px-10">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name} · Built with Next.js, TypeScript & Framer Motion
        </p>
        <ul className="flex items-center gap-4">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
