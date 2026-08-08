import { Sparkles, Code2, GitBranch, Flame, KeyRound, Database, Palette, Wind } from "lucide-react";
import { ConnectedParticles, Vignette } from "@/components/backgrounds";
import { CharReveal, Eyebrow, Reveal, Section } from "@/components/motion-kit";
import { playUISound } from "@/lib/sound";


const devTechnologies = [
  { name: "React", icon: Code2 },
  { name: "JavaScript", icon: Code2 },
  { name: "HTML5", icon: Palette },
  { name: "CSS3", icon: Wind },
  { name: "Tailwind CSS", icon: Wind },
  { name: "GitHub", icon: GitBranch },
  { name: "Firebase", icon: Flame },
  { name: "Google Authentication", icon: KeyRound },
  { name: "Database Integration", icon: Database },
];

const aiTools = [
  {
    name: "Antigravity",
    icon: "✦",
    border: "border-cyan-400/60",
    bg: "bg-cyan-950/80",
    text: "text-cyan-200",
    iconColor: "text-cyan-400",
    shadow: "shadow-[0_0_18px_rgba(6,182,212,0.4)]",
    hoverBorder: "hover:border-cyan-300",
    hoverBg: "hover:bg-cyan-900/90",
  },
  {
    name: "Cursor",
    icon: "◉",
    border: "border-purple-400/60",
    bg: "bg-purple-950/80",
    text: "text-purple-200",
    iconColor: "text-purple-400",
    shadow: "shadow-[0_0_18px_rgba(168,85,247,0.4)]",
    hoverBorder: "hover:border-purple-300",
    hoverBg: "hover:bg-purple-900/90",
  },
  {
    name: "GitHub Copilot",
    icon: "⚡",
    border: "border-blue-400/60",
    bg: "bg-blue-950/80",
    text: "text-blue-200",
    iconColor: "text-blue-400",
    shadow: "shadow-[0_0_18px_rgba(59,130,246,0.4)]",
    hoverBorder: "hover:border-blue-300",
    hoverBg: "hover:bg-blue-900/90",
  },
  {
    name: "ChatGPT",
    icon: "◈",
    border: "border-teal-400/60",
    bg: "bg-teal-950/80",
    text: "text-teal-200",
    iconColor: "text-teal-400",
    shadow: "shadow-[0_0_18px_rgba(20,184,166,0.4)]",
    hoverBorder: "hover:border-teal-300",
    hoverBg: "hover:bg-teal-900/90",
  },
  {
    name: "Google Gemini",
    icon: "✧",
    border: "border-indigo-400/60",
    bg: "bg-indigo-950/80",
    text: "text-indigo-200",
    iconColor: "text-indigo-400",
    shadow: "shadow-[0_0_18px_rgba(99,102,241,0.4)]",
    hoverBorder: "hover:border-indigo-300",
    hoverBg: "hover:bg-indigo-900/90",
  },
  {
    name: "Claude",
    icon: "◐",
    border: "border-amber-400/60",
    bg: "bg-amber-950/80",
    text: "text-amber-200",
    iconColor: "text-amber-400",
    shadow: "shadow-[0_0_18px_rgba(251,191,36,0.4)]",
    hoverBorder: "hover:border-amber-300",
    hoverBg: "hover:bg-amber-900/90",
  },
  {
    name: "Google Stitch",
    icon: "⬡",
    border: "border-violet-400/60",
    bg: "bg-violet-950/80",
    text: "text-violet-200",
    iconColor: "text-violet-400",
    shadow: "shadow-[0_0_18px_rgba(139,92,246,0.4)]",
    hoverBorder: "hover:border-violet-300",
    hoverBg: "hover:bg-violet-900/90",
  },
];

const aiWorkflowSteps = ["IDEA", "EXPLORE", "PROTOTYPE", "CODE", "DEBUG", "REFINE"];

const aiUseCases = [
  "AI-assisted coding",
  "Rapid prototyping",
  "Debugging",
  "Code exploration",
  "Learning",
  "Problem solving",
  "UI experimentation",
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
      <Eyebrow>Workflow &amp; Stack</Eyebrow>
      <CharReveal
        text="Development & AI-Assisted Workflow"
        className="font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.05] font-semibold text-foreground"
      />
      <Reveal>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Building on a strong UI/UX foundation through personal development practice, modern React applications, and AI-assisted workflows.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-12 items-stretch">

        {/* CARD 01 — DEVELOPMENT & INTERESTS */}
        <div className="lg:col-span-6 flex">
          <Reveal className="w-full">
            <div
              className="neon-card group h-full rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs text-cyan-400 font-bold bg-cyan-950/60 rounded-lg px-2.5 py-1 border border-cyan-500/30 group-hover:shadow-[0_0_12px_rgba(0,220,255,0.4)] transition-all">
                    01
                  </span>
                  <span className="text-xs font-mono tracking-wider text-muted-foreground uppercase">
                    DEVELOPMENT &amp; INTERESTS
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight group-hover:text-cyan-200 transition-colors">
                  Building beyond the interface
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground group-hover:text-white/80 transition-colors">
                  I have a strong foundation in UI/UX and responsive front-end development, and I&apos;m expanding that foundation through hands-on personal work with modern React applications and web technologies.
                </p>
                <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-muted-foreground/80 group-hover:text-white/70 transition-colors">
                  My React and application-development experience currently comes through personal projects, experimentation, and independent implementation — continuously growing alongside my professional design work.
                </p>

                {/* Tech chips */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {devTechnologies.map((tech) => {
                    const Icon = tech.icon;
                    return (
                      <div key={tech.name} className="tech-badge">
                        <Icon className="h-3.5 w-3.5 text-cyan-400" />
                        <span>{tech.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cyan-400/70 font-bold block mb-1">
                  Personal Development &amp; Practice
                </span>
                <p className="text-xs sm:text-sm font-mono text-muted-foreground">
                  Hands-on personal projects · Independent experimentation · Continuous learning
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* CARD 02 — AI-ASSISTED DEVELOPMENT */}
        <div className="lg:col-span-6 flex">
          <Reveal className="w-full">
            <div
              className="animated-neon-border ai-neon-card relative group h-full rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
            >
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
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300 group-hover:text-white transition-colors">
                  I use AI tools as development companions for exploring ideas, prototyping interfaces, writing and reviewing code, debugging, learning unfamiliar concepts, and accelerating personal development projects.
                </p>

                {/* Google Stitch callout */}
                <div onMouseEnter={playUISound} className="mt-3 inline-flex items-center gap-2 rounded-lg border border-violet-400/30 bg-violet-950/40 px-3 py-1.5 text-xs text-violet-300 font-mono cursor-pointer hover:border-violet-400/60 transition-colors">
                  <span className="text-violet-400 font-bold">⬡</span>
                  <span>Google Stitch — AI-assisted UI exploration &amp; prototyping</span>
                </div>

                {/* AI Tool chips */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {aiTools.map((tool) => (
                    <div
                      key={tool.name}
                      onMouseEnter={playUISound}
                      className={`inline-flex items-center gap-1.5 rounded-xl border ${tool.border} ${tool.bg} px-3 py-1.5 text-xs font-semibold ${tool.text} ${tool.shadow} transition-all duration-200 ${tool.hoverBorder} hover:scale-105 ${tool.hoverBg} cursor-pointer`}
                    >
                      <span className={`${tool.iconColor} font-bold`}>{tool.icon}</span>
                      {tool.name}
                    </div>
                  ))}
                </div>

                {/* AI Workflow Pipeline — CSS only */}
                <div className="mt-6 pt-5 border-t border-cyan-500/20">
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-cyan-400/60 font-bold block mb-3">
                    How I use AI
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {aiWorkflowSteps.map((step, idx) => (
                      <div key={step} className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] font-bold bg-cyan-950/80 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                          {step}
                        </span>
                        {idx < aiWorkflowSteps.length - 1 && (
                          <span className="text-cyan-600 text-xs font-bold">↓</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer — AI use cases */}
              <div className="mt-6 pt-4 border-t border-cyan-500/30">
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {aiUseCases.map((useCase) => (
                    <span
                      key={useCase}
                      className="font-mono text-[11px] text-cyan-300/80 flex items-center gap-1"
                    >
                      <span className="text-cyan-500">•</span> {useCase}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

