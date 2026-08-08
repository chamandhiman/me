import { Sparkles, Code2, GitBranch, Flame, KeyRound, Database, Webhook, Layout, Cpu } from "lucide-react";
import { ConnectedParticles, Vignette } from "@/components/backgrounds";
import { CharReveal, Eyebrow, Reveal, Section, TiltCard } from "@/components/motion-kit";

const devTechnologies = [
  { name: "React", icon: Code2 },
  { name: "GitHub", icon: GitBranch },
  { name: "Firebase", icon: Flame },
  { name: "Google Authentication", icon: KeyRound },
  { name: "Database Management", icon: Database },
  { name: "API Integration", icon: Webhook },
  { name: "Responsive Applications", icon: Layout },
  { name: "Modern JavaScript", icon: Cpu },
];

export function DevAiWorkflow() {
  return (
    <Section
      id="dev-workflow"
      backdrop={
        <>
          <ConnectedParticles />
          <Vignette />
        </>
      }
    >
      <Eyebrow>Workflow & Stack</Eyebrow>
      <CharReveal
        text="Development & AI-Assisted Workflow"
        className="font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.05] font-semibold text-foreground"
      />
      <Reveal delay={0.12}>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          Combining UI/UX design foundation with modern React application development and AI-accelerated workflows.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-12 items-stretch">
        {/* Left Area: Development & Interests */}
        <div className="lg:col-span-6 flex">
          <Reveal delay={0.2} className="w-full">
            <TiltCard intensity={5} className="h-full">
              <div className="glass-panel animated-border h-full rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-md hover:border-primary/40 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs text-primary font-bold bg-primary/10 rounded-lg px-2.5 py-1 border border-primary/20">
                      01
                    </span>
                    <span className="text-xs font-mono tracking-wider text-muted-foreground uppercase">
                      DEVELOPMENT & INTERESTS
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                    Building beyond the interface
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Alongside UI/UX and responsive front-end development, I&apos;m continuously expanding my development skills by building React applications and exploring modern web technologies.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {devTechnologies.map((tech) => {
                      const Icon = tech.icon;
                      return (
                        <div
                          key={tech.name}
                          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:text-sm font-medium text-foreground/90 transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-foreground hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                        >
                          <Icon className="h-3.5 w-3.5 text-primary" />
                          <span>{tech.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 text-xs font-mono text-muted-foreground">
                  Working knowledge of modern application development & web ecosystems
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        {/* Right Area: AI-Assisted Development */}
        <div className="lg:col-span-6 flex">
          <Reveal delay={0.3} className="w-full">
            <TiltCard intensity={6} className="h-full">
              <div className="relative group h-full rounded-2xl p-6 sm:p-8 overflow-hidden bg-gradient-to-br from-cyan-950/40 via-slate-900/90 to-purple-950/40 border border-cyan-500/35 backdrop-blur-xl shadow-[0_0_35px_rgba(6,182,212,0.15)] transition-all duration-500 hover:border-cyan-400/60 hover:shadow-[0_0_45px_rgba(6,182,212,0.25)] flex flex-col justify-between">
                {/* Slow moving ambient radial glow */}
                <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl group-hover:bg-cyan-400/30 transition-all duration-700 pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl group-hover:bg-purple-400/30 transition-all duration-700 pointer-events-none" />

                {/* Border shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs text-cyan-300 font-bold bg-cyan-500/20 rounded-lg px-2.5 py-1 border border-cyan-400/30 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                      02
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-cyan-300 uppercase">
                      <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                      AI-ASSISTED DEVELOPMENT
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                    Building faster with AI
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    I use AI-assisted coding tools as development companions for exploring ideas, writing code faster, debugging, learning unfamiliar concepts, and accelerating implementation.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2.5">
                    <div className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-950/60 px-3.5 py-2 text-xs sm:text-sm font-semibold text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.2)] transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-900/70 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                      <span className="text-cyan-400 font-bold">✦</span> Antigravity
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-xl border border-purple-400/40 bg-purple-950/60 px-3.5 py-2 text-xs sm:text-sm font-semibold text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.2)] transition-all duration-300 hover:border-purple-300 hover:bg-purple-900/70 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                      <span className="text-purple-400 font-bold">◉</span> Cursor
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-xl border border-blue-400/40 bg-blue-950/60 px-3.5 py-2 text-xs sm:text-sm font-semibold text-blue-200 shadow-[0_0_12px_rgba(59,130,246,0.2)] transition-all duration-300 hover:border-blue-300 hover:bg-blue-900/70 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                      <span className="text-blue-400 font-bold">⚡</span> GitHub Copilot
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-cyan-500/20 text-[11px] sm:text-xs font-mono text-cyan-300/90 flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>AI-assisted coding • Faster prototyping • Debugging • Learning • Problem solving</span>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
