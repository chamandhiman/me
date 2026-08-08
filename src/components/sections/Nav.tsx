import { useEffect, useState } from "react";
import { navLinks, person } from "@/data/portfolio";
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
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 md:px-6 nav-bar-pill",
          scrolled ? "nav-bar-scrolled w-[calc(100%-2rem)]" : "w-[calc(100%-3rem)]",
        )}
      >
        <a href="#hero" className="font-display text-base font-semibold tracking-tight nav-logo">
          {person.name}
          <span className="text-cyan-400">.</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link-animated text-sm font-medium tracking-tight"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={`mailto:${person.email}`}
            className="nav-cta-btn"
          >
            Get in touch
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden cursor-pointer"
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
          "nav-bar-pill mx-4 mt-3 rounded-2xl p-5 md:hidden transition-all duration-300 shadow-2xl",
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none absolute inset-x-0"
        )}
      >
        <ul className="space-y-3">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="nav-link-animated block text-base font-medium"
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
