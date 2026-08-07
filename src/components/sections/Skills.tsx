import { ConnectedParticles, Vignette } from "@/components/backgrounds";
import { CharReveal, Eyebrow, Reveal, Section, TiltCard } from "@/components/motion-kit";
import { coreCapabilities } from "@/data/portfolio";

export function Skills() {
  return (
    <Section
      id="capabilities"
      backdrop={
        <>
          <ConnectedParticles />
          <Vignette />
        </>
      }
    >
      <Eyebrow>Capabilities</Eyebrow>
      <CharReveal
        text="Core Capabilities"
        className="font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.05] font-semibold text-foreground"
      />
      <Reveal delay={0.12}>
        <p className="mt-4 max-w-xl text-base text-muted-foreground">
          What I bring to digital products, teams, and software ecosystems.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {coreCapabilities.map((cap, i) => (
          <Reveal key={cap.title} delay={i * 0.08}>
            <TiltCard intensity={7}>
              <div className="glass-panel animated-border h-full rounded-2xl p-6 border border-white/10 backdrop-blur-md hover:border-primary/40 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-primary font-bold bg-primary/10 rounded-lg px-2.5 py-1 border border-primary/20">
                      {cap.num}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground tracking-tight">
                    {cap.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {cap.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                  {cap.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-foreground/80 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
