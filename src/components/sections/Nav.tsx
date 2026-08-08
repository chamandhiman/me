import { useEffect, useState } from "react";
import { navLinks, person } from "@/data/portfolio";
import { MagneticButton } from "@/components/motion-kit";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let currentScrolled = false;
    const onScroll = () => {
      const isNextScrolled = window.scrollY > 40;
      if (currentScrolled !== isNextScrolled) {
        currentScrolled = isNextScrolled;
        setScrolled(isNextScrolled);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "py-3" : "py-6",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 md:px-6",
          scrolled ? "glass-panel neon-glass-card w-[calc(100%-2rem)]" : "w-[calc(100%-3rem)] bg-transparent",
        )}
      >
        <a href="#hero" className="font-display text-base font-semibold tracking-tight">
          {person.name}
          <span className="text-primary">.</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm font-medium tracking-tight text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <MagneticButton href={`mailto:${person.email}`} variant="ghost" className="px-5 py-2 text-sm font-medium">
            Get in touch
          </MagneticButton>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={cn(
              "h-px w-5 bg-foreground transition-transform duration-300",
              open && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-px w-5 bg-foreground transition-transform duration-300",
              open && "-translate-y-[3.5px] -rotate-45",
            )}
          />
        </button>
      </div>

      <nav
        className={cn(
          "glass-panel neon-glass-card mx-4 mt-3 rounded-2xl p-5 md:hidden transition-all duration-300",
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none absolute inset-x-0"
        )}
      >
        <ul className="space-y-3">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-base font-medium text-foreground/90 hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
