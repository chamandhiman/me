import { MorphBlobs, GlowOrbs, Vignette } from "@/components/backgrounds";
import { CharReveal, Eyebrow, Reveal, Section } from "@/components/motion-kit";
import { workflowIntro } from "@/data/portfolio";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function About() {
  return (
    <Section
      id="about"
      backdrop={
        <>
          <MorphBlobs />
          <GlowOrbs count={2} />
          <Vignette />
        </>
      }
    >
      <Eyebrow>What I Do</Eyebrow>

      <div className="max-w-4xl">
        <CharReveal
          text={workflowIntro.heading}
          className="font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.08] font-semibold text-foreground"
        />
        <Reveal>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl">
            {workflowIntro.sub}
          </p>
        </Reveal>
      </div>

      {/* Horizontal Workflow Process Bar */}
      <Reveal>
        <div className="mt-12">
          <h3 className="font-mono text-xs tracking-[0.25em] text-primary uppercase font-semibold mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>Complete UI Implementation Workflow</span>
          </h3>

          {/* Desktop Horizontal Process Bar */}
          <div className="hidden lg:grid grid-cols-6 gap-3">
            {workflowIntro.steps.map((step, idx) => (
              <div
                key={step.label}
                className="relative glass-panel neon-glass-card rounded-xl p-4 border border-white/10 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-primary font-bold">{step.num}</span>
                  {idx < workflowIntro.steps.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  )}
                </div>
                <h4 className="font-display text-sm font-semibold text-foreground tracking-tight">
                  {step.label}
                </h4>
                <p className="mt-1 text-[11px] text-muted-foreground leading-snug">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile & Tablet Vertical Flow */}
          <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
            {workflowIntro.steps.map((step) => (
              <div
                key={step.label}
                className="glass-panel neon-glass-card rounded-xl p-4 border border-white/10 flex items-start gap-3.5"
              >
                <span className="font-mono text-sm text-primary font-bold bg-primary/10 rounded-lg px-2.5 py-1 border border-primary/20">
                  {step.num}
                </span>
                <div>
                  <h4 className="font-display text-sm font-semibold text-foreground">
                    {step.label}
                  </h4>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
