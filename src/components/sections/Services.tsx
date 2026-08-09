import { FloatingShapes, GlowOrbs, Vignette } from "@/components/backgrounds";
import { CharReveal, Eyebrow, Reveal, Section, TiltCard } from "@/components/motion-kit";
import { services } from "@/data/portfolio";

export function Services() {
  return (
    <Section
      id="services"
      backdrop={
        <>
          <GlowOrbs count={3} />
          <FloatingShapes count={8} />
          <Vignette />
        </>
      }
    >
      <Eyebrow>Services</Eyebrow>
      <CharReveal
        text="What I do, end to end"
        className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.05] font-semibold text-foreground"
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <TiltCard intensity={7}>
              <article
                className="glass-panel animated-border group relative h-full overflow-hidden rounded-3xl p-8"
                style={{ boxShadow: "var(--shadow-float)" }}
              >
                <span
                  aria-hidden
                  className="absolute -top-24 -right-16 h-56 w-56 rounded-full blur-[60px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, color-mix(in oklab, var(--accent) 40%, transparent), transparent 70%)",
                  }}
                />
                <p className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase">
                  0{i + 1}
                </p>
                <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
                <div className="hairline mt-8" />
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
