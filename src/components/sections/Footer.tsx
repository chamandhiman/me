import { ParticleField, WaveField } from "@/components/backgrounds";
import { navLinks, person } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-background px-6 pt-24 pb-10 md:px-10">
      <WaveField />
      <ParticleField density={0.00006} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 blur-[70px]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, color-mix(in oklab, var(--primary) 32%, transparent), transparent 72%)",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <p className="font-display text-[clamp(2rem,7vw,5.5rem)] leading-none font-semibold text-foreground/12">
          {person.name}
        </p>
        <div className="hairline mt-10" />
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs tracking-tight text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground/70 uppercase">
            © {new Date().getFullYear()} {person.name} — {person.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
