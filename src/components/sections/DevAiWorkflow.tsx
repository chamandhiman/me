import { Sparkles, Code2, GitBranch, Flame, KeyRound, Database, Webhook, Layout, Cpu } from "lucide-react";
import { ConnectedParticles, Vignette } from "@/components/backgrounds";
import { CharReveal, Eyebrow, Reveal, Section } from "@/components/motion-kit";

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
      <Reveal>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          Combining UI/UX design foundation with modern React application development and AI-accelerated workflows.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-12 items-stretch">
        {/* Left Area: Development & Interests */}
        <div className="lg:col-span-6 flex">
          <Reveal className="w-full">
            <div className="neon-card group h-full rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs text-cyan-400 font-bold bg-cyan-950/60 rounded-lg px-2.5 py-1 border border-cyan-500/30 group-hover:shadow-[0_0_12px_rgba(0,220,255,0.4)] transition-all">
                    01
                  </span>
                  <span className="text-xs font-mono tracking-wider text-muted-foreground uppercase">
                    DEVELOPMENT & INTERESTS
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight group-hover:text-cyan-200 transition-colors">
                  Building beyond the interface
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground group-hover:text-white/80 transition-colors">
                  Alongside UI/UX and responsive front-end development, I&apos;m continuously expanding my development skills by building React applications and exploring modern web technologies.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {devTechnologies.map((tech) => {
                    const Icon = tech.icon;
                    return (
                      <div
                        key={tech.name}
                        className="tech-badge"
                      >
                        <Icon className="h-3.5 w-3.5 text-cyan-400" />
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
          </Reveal>
        </div>

        {/* Right Area: AI-Assisted Development (STRONGEST ANIMATED NEON CARD) */}
        <div className="lg:col-span-6 flex">
          <Reveal className="w-full">
            <div className="animated-neon-border ai-neon-card relative group h-full rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs text-cyan-300 font-bold bg-cyan-500/20 rounded-lg px-2.5 py-1 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    02
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-cyan-300 uppercase">
                    <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                    AI-ASSISTED DEVELOPMENT
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight group-hover:text-cyan-100 transition-colors">
                  Building faster with AI
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 group-hover:text-white transition-colors">
                  I use AI-assisted coding tools as development companions for exploring ideas, writing code faster, debugging, learning unfamiliar concepts, and accelerating implementation.
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/60 bg-cyan-950/80 px-3.5 py-2 text-xs sm:text-sm font-semibold text-cyan-200 shadow-[0_0_18px_rgba(6,182,212,0.4)] transition-all duration-200 hover:border-cyan-300 hover:scale-105 hover:bg-cyan-900/90">
                    <span className="text-cyan-400 font-bold">✦</span> Antigravity
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-xl border border-purple-400/60 bg-purple-950/80 px-3.5 py-2 text-xs sm:text-sm font-semibold text-purple-200 shadow-[0_0_18px_rgba(168,85,247,0.4)] transition-all duration-200 hover:border-purple-300 hover:scale-105 hover:bg-purple-900/90">
                    <span className="text-purple-400 font-bold">◉</span> Cursor
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-xl border border-blue-400/60 bg-blue-950/80 px-3.5 py-2 text-xs sm:text-sm font-semibold text-blue-200 shadow-[0_0_18px_rgba(59,130,246,0.4)] transition-all duration-200 hover:border-blue-300 hover:scale-105 hover:bg-blue-900/90">
                    <span className="text-blue-400 font-bold">⚡</span> GitHub Copilot
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-cyan-500/30 text-[11px] sm:text-xs font-mono text-cyan-300 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8]" />
                <span>AI-assisted coding • Faster prototyping • Debugging • Learning • Problem solving</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
