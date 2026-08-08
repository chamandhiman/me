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
import { person, heroMarquee, heroStats } from "@/data/portfolio";
import { useRef } from "react";
import chamanImg from "@/assests/chaman.png";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-background px-6 pt-28 pb-16 md:px-10"
    >
      <Aurora />
      <MeshGradient />
      <AnimatedGrid size={64} opacity={0.3} />
      <ParticleField />
      <GlowOrbs count={3} />
      <MouseSpotlight />
      <Vignette />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto w-full max-w-7xl grid grid-cols-1 items-center gap-10 lg:grid-cols-12"
      >
        <div className="lg:col-span-7">
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
            delay={0.1}
            text={`Hi, I'm ${person.name}`}
            className="mt-6 font-display text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.95] font-semibold text-foreground [text-shadow:0_0_50px_color-mix(in_oklab,var(--primary)_30%,transparent)]"
          />

          <Reveal delay={0.25}>
            <p className="mt-4 font-display text-[clamp(1.1rem,2vw,1.65rem)] font-medium text-primary tracking-tight">
              {person.role}
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
              {person.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton href="#work">
                View Selected Work
                <span aria-hidden className="ml-1">→</span>
              </MagneticButton>
              <MagneticButton href="#contact" variant="ghost">
                Start a Conversation
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.65}>
            <dl className="mt-10 grid grid-cols-2 gap-3.5 sm:grid-cols-4 max-w-2xl">
              {heroStats.map((s) => (
                <div
                  key={s.label}
                  className="glass-panel rounded-2xl p-3.5 border border-white/10 backdrop-blur-md hover:border-primary/30 transition-colors"
                >
                  <dt className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-[11px] text-muted-foreground font-mono uppercase tracking-wider">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="relative col-span-1 flex justify-center lg:col-span-5 lg:justify-end">
          <Reveal delay={0.3}>
            <div className="relative group max-w-md lg:max-w-none">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/30 to-accent/30 blur-2xl opacity-50 group-hover:opacity-80 transition duration-700" />
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl shadow-2xl">
                <img
                  src={chamanImg}
                  alt={person.name}
                  className="h-auto w-full object-cover max-h-[520px] object-top transition duration-500 hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-30" />
              </div>
            </div>
          </Reveal>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-border/50 py-3 bg-black/20 backdrop-blur-sm">
        <Marquee items={heroMarquee} duration={38} />
      </div>
    </section>
  );
}
