import { ConnectedParticles, OrbitRings, Vignette } from "@/components/backgrounds";
import { CharReveal, Eyebrow, Reveal, Section, TiltCard } from "@/components/motion-kit";
import { orbitSkills, skillGroups } from "@/data/portfolio";

export function Skills() {
  const tiers = ["Primary", "Secondary"] as const;
  return (
    <Section
      id="skills"
      backdrop={
        <>
          <ConnectedParticles />
          <OrbitRings labels={orbitSkills} />
          <Vignette />
        </>
      }
    >
      <Eyebrow>Capabilities</Eyebrow>
      <CharReveal
        text="Out of all my skills"
        className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.05] font-semibold text-foreground"
      />
      <Reveal delay={0.12}>
        <p className="mt-5 max-w-xl text-sm text-muted-foreground">
          Primary and secondary skills overview.
        </p>
      </Reveal>

      <div className="mt-14 space-y-12">
        {tiers.map((tier) => (
          <div key={tier}>
            <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-primary uppercase">
              {tier} skills
            </p>
            <div className="grid gap-5 md:grid-cols-3">
              {skillGroups
                .filter((g) => g.tier === tier)
                .map((group, i) => (
                  <Reveal key={group.title} delay={i * 0.09}>
                    <TiltCard intensity={8}>
                      <div
                        className="glass-panel animated-border h-full rounded-2xl p-6"
                        style={{ boxShadow: "var(--shadow-float)" }}
                      >
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {group.title}
                        </h3>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {group.items.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs text-foreground/85 transition-colors duration-300 hover:border-primary/50 hover:text-primary"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </TiltCard>
                  </Reveal>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
