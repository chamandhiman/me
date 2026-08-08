import { GradientLines, GlowOrbs, Vignette } from "@/components/backgrounds";
import { CharReveal, Eyebrow, Reveal, Section } from "@/components/motion-kit";
import { experience } from "@/data/portfolio";
import { ArrowRight } from "lucide-react";


export function Experience() {
  return (
    <Section
      id="journey"
      backdrop={
        <>
          <GradientLines />
          <GlowOrbs count={2} />
          <Vignette />
        </>
      }
    >
      <Eyebrow>Journey</Eyebrow>
      <CharReveal
        text="10+ Years of Professional Product Experience"
        className="font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.05] font-semibold text-foreground max-w-3xl"
      />
      <Reveal>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          Long-term product experience driving UI design, responsive HTML handoffs, and software modernization.
        </p>
      </Reveal>

      {/* Progression Banner */}
      <Reveal>
        <div
          className="mt-8 glass-panel neon-glass-card rounded-xl p-4 border border-white/10 flex flex-wrap items-center gap-2 text-xs font-mono text-primary font-semibold"
        >
          <span className="text-foreground">Product Progression:</span>
          <span>UI/UX Wireframes</span>
          <ArrowRight className="w-3 h-3 text-muted-foreground" />
          <span>Responsive HTML</span>
          <ArrowRight className="w-3 h-3 text-muted-foreground" />
          <span>Developer Handoff</span>
          <ArrowRight className="w-3 h-3 text-muted-foreground" />
          <span>Integration QA</span>
          <ArrowRight className="w-3 h-3 text-muted-foreground" />
          <span>Staging Release</span>
        </div>
      </Reveal>

      <div className="relative mt-12 pl-6 md:pl-10">
        <div className="absolute top-0 left-0 h-full w-px bg-primary/40 md:left-2 shadow-[0_0_10px_rgba(100,210,255,0.5)]" />

        <div className="space-y-12">
          {experience.map((job) => (
            <Reveal key={job.role + job.period}>
              <div className="relative">
                <span
                  className="absolute top-1.5 -left-[1.85rem] h-3 w-3 rounded-full bg-primary md:-left-[2.35rem] border-2 border-background shadow-[0_0_12px_rgba(100,210,255,0.8)]"
                />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs tracking-wider text-primary uppercase font-bold">
                    {job.period}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {job.company}
                  </span>
                </div>

                <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold text-foreground">
                  {job.role}
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/80">
                  {job.summary}
                </p>

                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {job.points.map((pt) => (
                    <li
                      key={pt}
                      className="neon-card rounded-xl px-3.5 py-2.5 text-xs text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-primary font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
