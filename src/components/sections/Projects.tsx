import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FloatingShapes, LightRays, MeshGradient, Vignette } from "@/components/backgrounds";
import {
  CharReveal,
  Eyebrow,
  ImageReveal,
  Reveal,
  Section,
  TiltCard,
} from "@/components/motion-kit";
import { projectFilters, projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const shown = projects.filter((p) => filter === "All" || p.cat === filter);

  return (
    <Section
      id="projects"
      backdrop={
        <>
          <MeshGradient />
          <LightRays />
          <FloatingShapes count={6} />
          <Vignette />
        </>
      }
    >
      <Eyebrow>Selected work</Eyebrow>
      <div className="flex flex-wrap items-end justify-between gap-8">
        <CharReveal
          text="Featured projects"
          className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.05] font-semibold text-foreground"
        />
        <Reveal delay={0.1}>
          <div className="glass-panel flex flex-wrap gap-1 rounded-full p-1.5">
            {projectFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-xs font-medium tracking-tight transition-colors duration-300",
                  filter === f ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {filter === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <motion.div layout className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.div
              key={p.src}
              layout
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 6) * 0.05 }}
            >
              <TiltCard intensity={9}>
                <figure
                  className="glass-panel animated-border group relative overflow-hidden rounded-2xl"
                  style={{ boxShadow: "var(--shadow-float)" }}
                >
                  <ImageReveal
                    src={p.src}
                    alt={p.title}
                    className="aspect-4/3 bg-secondary/30"
                    imgClassName="object-cover transition-transform duration-[1.3s] group-hover:scale-[1.06]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(to top, color-mix(in oklab, var(--ink) 92%, transparent), transparent 62%)",
                    }}
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-mono text-[10px] tracking-[0.28em] text-primary uppercase">
                      {p.cat}
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-foreground">{p.title}</p>
                  </figcaption>
                </figure>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
