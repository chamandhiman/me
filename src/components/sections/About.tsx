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
          <GlowOrbs />
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
          <h3 className="font-mono text-xs tracking-[0.25em] text-cyan-400 uppercase font-semibold mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Complete UI Implementation Workflow</span>
          </h3>

          {/* Desktop Horizontal Process Bar */}
          <div className="hidden lg:grid grid-cols-6 gap-3">
            {workflowIntro.steps.map((step, idx) => (
              <div
                key={step.label}
                className="neon-card rounded-2xl p-4 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-500/30 group-hover:shadow-[0_0_10px_rgba(0,220,255,0.4)] transition-all">
                      {step.num}
                    </span>
                    {idx < workflowIntro.steps.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    )}
                  </div>
                  <h4 className="font-display text-sm font-semibold text-foreground tracking-tight group-hover:text-cyan-200 transition-colors">
                    {step.label}
                  </h4>
                  <p className="mt-1 text-[11px] text-muted-foreground leading-snug group-hover:text-white/80 transition-colors">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile & Tablet Vertical Flow */}
          <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
            {workflowIntro.steps.map((step) => (
              <div
                key={step.label}
                className="neon-card rounded-2xl p-4 flex items-start gap-3.5"
              >
                <span className="font-mono text-sm text-cyan-400 font-bold bg-cyan-950/60 rounded-lg px-2.5 py-1 border border-cyan-500/30">
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
