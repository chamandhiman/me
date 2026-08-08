import { useEffect, useState } from "react";
import { navLinks, person } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { playUISound, toggleUISound, isSoundEnabled, onSoundToggle } from "@/lib/sound";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled);

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

  // Keep toggle button in sync with module state
  useEffect(() => {
    return onSoundToggle((enabled) => setSoundOn(enabled));
  }, []);

  const handleToggle = () => {
    toggleUISound();
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 px-6 md:px-10 transition-all duration-300 pointer-events-none",
        scrolled ? "py-3" : "py-6",
      )}
    >
      <div
        className={cn(
          "pointer-events-auto mx-auto flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 md:px-6 nav-bar-pill",
          scrolled && "nav-bar-scrolled",
        )}
      >
        <a href="#hero" className="font-display text-base font-semibold tracking-tight nav-logo" onMouseEnter={playUISound}>
          {person.name}
          <span className="text-cyan-400">.</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onMouseEnter={playUISound}
              className="nav-link-animated text-sm font-medium tracking-tight"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/* Sound toggle */}
          <button
            type="button"
            onClick={handleToggle}
            title={soundOn ? "UI Sounds: ON — click to disable" : "UI Sounds: OFF — click to enable"}
            aria-label={soundOn ? "Disable UI sounds" : "Enable UI sounds"}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider border transition-all duration-200 cursor-pointer select-none",
              soundOn
                ? "border-cyan-500/50 bg-cyan-950/60 text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                : "border-white/10 bg-white/5 text-slate-500 hover:border-white/20 hover:text-slate-400"
            )}
          >
            <span className="text-[11px]">{soundOn ? "🔊" : "🔇"}</span>
            <span>UI SOUNDS</span>
          </button>

          <a
            href={`mailto:${person.email}`}
            className="nav-cta-btn"
            onMouseEnter={playUISound}
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
                onMouseEnter={playUISound}
                className="nav-link-animated block text-base font-medium"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile sound toggle */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={handleToggle}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider border transition-all duration-200 cursor-pointer",
              soundOn
                ? "border-cyan-500/50 bg-cyan-950/60 text-cyan-300"
                : "border-white/10 bg-white/5 text-slate-500"
            )}
          >
            <span>{soundOn ? "🔊" : "🔇"}</span>
            <span>UI SOUNDS {soundOn ? "ON" : "OFF"}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
