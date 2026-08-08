import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { navLinks, person } from "@/data/portfolio";
import { MagneticButton } from "@/components/motion-kit";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

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
    <>
      <motion.div
        className="fixed top-0 left-0 z-50 h-[2px] w-full origin-left"
        style={{
          scaleX: progress,
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--primary) 90%, transparent), color-mix(in oklab, var(--accent) 90%, transparent))",
        }}
        aria-hidden
      />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-700",
          scrolled ? "py-3" : "py-6",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-700 md:px-6",
            scrolled ? "glass-panel w-[calc(100%-2rem)]" : "w-[calc(100%-3rem)] bg-transparent",
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
                className="relative text-sm font-medium tracking-tight text-muted-foreground transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:text-foreground hover:after:origin-left hover:after:scale-x-100"
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

        <motion.nav
          initial={false}
          animate={open ? { opacity: 1, y: 0, pointerEvents: "auto" } : { opacity: 0, y: -12, pointerEvents: "none" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel mx-4 mt-3 rounded-2xl p-5 md:hidden"
        >
          <ul className="space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-base font-medium text-foreground/90"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      </header>
    </>
  );
}
