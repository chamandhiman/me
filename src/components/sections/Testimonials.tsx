import { Aurora, FloatingDots, Vignette } from "@/components/backgrounds";
import { CharReveal, Eyebrow, Marquee, Reveal, Section } from "@/components/motion-kit";
import { testimonials, heroMarquee } from "@/data/portfolio";

export function Testimonials() {
  return (
    <Section
      id="testimonials"
      backdrop={
        <>
          <Aurora intensity={0.75} />
          <FloatingDots />
          <Vignette />
        </>
      }
    >
      <Eyebrow>Kind words</Eyebrow>
      <CharReveal
        text="Feedback from the people I build with"
        className="max-w-3xl font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.05] font-semibold text-foreground"
      />
      <Reveal delay={0.1}>
        <p className="mt-5 max-w-xl text-xs text-muted-foreground">
          PLACEHOLDER SECTION — no testimonials exist on the current site. Replace the quotes and
          names below with real ones.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 0.09}>
            <blockquote
              className="glass-panel animated-border h-full rounded-2xl p-7"
              style={{ boxShadow: "var(--shadow-float)" }}
            >
              <p className="font-display text-4xl leading-none text-primary/70">&ldquo;</p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">{t.quote}</p>
              <footer className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{t.role}</p>
              </footer>
            </blockquote>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 border-y border-border/60 py-6">
        <Marquee items={heroMarquee} reverse duration={30} />
      </div>
    </Section>
  );
}
