import { ConnectedParticles, Vignette } from "@/components/backgrounds";
import { CharReveal, Eyebrow, Reveal, Section } from "@/components/motion-kit";
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
      <Reveal>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          What I bring to digital products, teams, and software ecosystems.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {coreCapabilities.map((cap) => (
          <Reveal key={cap.title}>
            <div
              className="neon-card group h-full rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-cyan-400 font-bold bg-cyan-950/60 rounded-lg px-2.5 py-1 border border-cyan-500/30 group-hover:shadow-[0_0_12px_rgba(0,220,255,0.4)] transition-all">
                    {cap.num}
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-foreground tracking-tight group-hover:text-cyan-200 transition-colors">
                  {cap.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground group-hover:text-white/80 transition-colors">
                  {cap.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                {cap.tools.map((t) => (
                  <span
                    key={t}
                    className="tech-badge"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
