import { CharReveal, MagneticButton, Marquee, Reveal } from "@/components/motion-kit";
import { person, heroMarquee, heroStats } from "@/data/portfolio";
import chamanImg from "@/assests/chaman.png";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-background px-6 pt-28 pb-16 md:px-10"
    >
      {/* Full background image with mobile text-contrast gradient overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={chamanImg}
          alt={person.name}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[85%_15%] sm:object-[82%_20%] lg:object-right"
        />
        {/* Responsive dark gradient overlay for text readability on mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/40 md:from-background/95 md:via-background/70 md:to-transparent md:w-3/4 lg:w-2/3" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <Reveal>
            <span className="glass-panel inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {person.location} — Available for Projects
            </span>
          </Reveal>

          <CharReveal
            as="h1"
            text={`Hi, I'm ${person.name.split(' ')[0]}`}
            className="mt-6 font-display text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.95] font-semibold text-foreground [text-shadow:0_0_50px_color-mix(in_oklab,var(--primary)_30%,transparent)]"
          />

          <Reveal>
            <p className="mt-4 font-display text-[clamp(1.1rem,2vw,1.65rem)] font-medium text-primary tracking-tight">
              {person.role}
            </p>
          </Reveal>

          <Reveal>
            <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
              {person.tagline}
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton href="#projects">
                View Selected Work
                <span aria-hidden className="ml-1">→</span>
              </MagneticButton>
              <MagneticButton href="#contact" variant="ghost">
                Start a Conversation
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal>
            <dl className="mt-10 grid grid-cols-2 gap-3.5 sm:grid-cols-4 max-w-2xl">
              {heroStats.map((s) => (
                <div
                  key={s.label}
                  className="neon-card rounded-2xl p-3.5"
                >
                  <dt className="font-display text-sm sm:text-base lg:text-xl font-bold text-foreground tracking-tight leading-tight">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-[10px] sm:text-[11px] text-muted-foreground font-mono uppercase tracking-wider leading-snug">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-border/50 py-3 bg-black/20">
        <Marquee items={heroMarquee} duration={38} />
      </div>
    </section>
  );
}
