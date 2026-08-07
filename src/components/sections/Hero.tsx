import { motion, useScroll, useTransform } from "framer-motion";
import {
  Aurora,
  MeshGradient,
  AnimatedGrid,
  ParticleField,
  MouseSpotlight,
  GlowOrbs,
  Vignette,
} from "@/components/backgrounds";
import { CharReveal, MagneticButton, Marquee, Reveal } from "@/components/motion-kit";
import { person, heroMarquee, stats } from "@/data/portfolio";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-background px-6 pt-32 pb-24 md:px-10"
    >
      <Aurora />
      <MeshGradient />
      <AnimatedGrid size={64} opacity={0.35} />
      <ParticleField />
      <GlowOrbs count={3} />
      <MouseSpotlight />
      <Vignette />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto w-full max-w-6xl"
      >
        <Reveal>
          <span className="glass-panel inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 font-mono text-[10px] tracking-[0.28em] text-muted-foreground uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            {person.location} — Available for work
          </span>
        </Reveal>

        <CharReveal
          as="h1"
          delay={0.1}
          text={`Hi, I'm ${person.name}`}
          className="mt-8 font-display text-[clamp(2.75rem,9vw,7.5rem)] leading-[0.92] font-semibold text-foreground [text-shadow:0_0_60px_color-mix(in_oklab,var(--primary)_35%,transparent)]"
        />

        <Reveal delay={0.35}>
          <p className="mt-6 font-display text-[clamp(1.1rem,2.4vw,1.9rem)] font-light tracking-tight text-foreground/80">
            {person.role}
          </p>
        </Reveal>

        <Reveal delay={0.45}>
          <p className="mt-6 max-w-2xl text-[0.98rem] leading-relaxed text-muted-foreground">
            {person.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.6}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href="#projects">
              View selected work
              <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Start a conversation
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.75}>
          <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl font-semibold text-foreground md:text-4xl">
                  {s.value}
                </dt>
                <dd className="mt-1.5 text-xs leading-snug text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-border/60 py-5">
        <Marquee items={heroMarquee} duration={38} />
      </div>
    </section>
  );
}
