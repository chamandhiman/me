import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { FloatingShapes, LightRays, MeshGradient, Vignette } from "@/components/backgrounds";
import {
  CharReveal,
  Eyebrow,
  Reveal,
  Section,
  TiltCard,
} from "@/components/motion-kit";
import { projectFilters, projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (activeModalIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModalIndex]);

  const shownProjects = projects.filter((p) => filter === "All" || p.cat === filter);

  const openModal = (index: number) => {
    setActiveModalIndex(index);
  };

  const closeModal = () => {
    setActiveModalIndex(null);
  };

  const nextModalProject = useCallback(() => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) => ((prev ?? 0) + 1) % shownProjects.length);
  }, [activeModalIndex, shownProjects.length]);

  const prevModalProject = useCallback(() => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) =>
      (prev ?? 0) === 0 ? shownProjects.length - 1 : (prev ?? 0) - 1
    );
  }, [activeModalIndex, shownProjects.length]);

  // Keyboard accessibility for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModalIndex === null) return;
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowRight") {
        nextModalProject();
      } else if (e.key === "ArrowLeft") {
        prevModalProject();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalIndex, nextModalProject, prevModalProject]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModalIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModalIndex]);

  const currentModalProject =
    activeModalIndex !== null ? shownProjects[activeModalIndex] : null;

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
          <div className="glass-panel flex flex-wrap gap-1 rounded-full p-1.5 border border-white/10">
            {projectFilters.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setActiveModalIndex(null);
                }}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium tracking-tight transition-colors duration-300",
                  filter === f ? "text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                )}
                aria-label={`Filter projects by ${f}`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-primary shadow-sm"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shownProjects.map((p, i) => (
            <motion.div
              key={p.src}
              layout
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (i % 6) * 0.04 }}
            >
              <TiltCard intensity={9}>
                <figure
                  onClick={() => openModal(i)}
                  className="glass-panel animated-border group relative overflow-hidden rounded-2xl cursor-pointer border border-white/10 bg-card/30 hover:border-primary/40 transition-all duration-300"
                  style={{ boxShadow: "var(--shadow-float)" }}
                >
                  {/* Image Stage Container - Fitting Height & Width nicely */}
                  <div className="relative aspect-16/10 sm:aspect-4/3 w-full overflow-hidden bg-black/40 flex items-center justify-center p-3">
                    <img
                      src={p.src}
                      alt={p.title}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.04] rounded-lg"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(to top, color-mix(in oklab, var(--ink) 95%, transparent), transparent 60%)",
                      }}
                    />

                    {/* Hover Click to View Full Badge */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 border border-white/20 text-white text-xs font-medium shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Maximize2 className="w-3.5 h-3.5 text-primary" />
                        <span>Click to View Full</span>
                      </div>
                    </div>
                  </div>

                  <figcaption className="p-4 bg-black/20 border-t border-white/5 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs tracking-[0.18em] text-primary uppercase font-bold">
                        {p.cat}
                      </p>
                      <p className="mt-0.5 text-base font-semibold text-foreground truncate max-w-[220px] sm:max-w-[260px]">
                        {p.title}
                      </p>
                    </div>
                    <span className="text-muted-foreground group-hover:text-primary transition-colors p-1.5 rounded-full bg-white/5 group-hover:bg-primary/20">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </figcaption>
                </figure>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* FULLSCREEN LIGHTBOX MODAL FOR FEATURED PROJECTS */}
      {isMounted &&
        activeModalIndex !== null &&
        currentModalProject &&
        createPortal(
          <AnimatePresence mode="wait">
            <motion.div
              key="projects-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeModal}
              className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-6 select-none"
              aria-modal="true"
              role="dialog"
              aria-label="Fullscreen project view"
            >
              {/* Modal Top Control Bar */}
              <div
                className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-10 flex items-center justify-between z-[1000000]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center space-x-3 bg-black/80 border border-white/15 rounded-full px-4 py-2 backdrop-blur-md shadow-2xl">
                  <span className="font-mono text-xs text-primary font-bold">
                    {activeModalIndex + 1} / {shownProjects.length}
                  </span>
                  <span className="text-white/30 text-xs">|</span>
                  <span className="text-xs font-medium text-white/90 truncate max-w-[200px] sm:max-w-md">
                    {currentModalProject.title}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeModal();
                  }}
                  className="rounded-full bg-white/20 hover:bg-white/30 text-white p-3 backdrop-blur-md transition-all duration-200 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-white border border-white/20 shadow-2xl cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Arrows inside Modal */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevModalProject();
                }}
                className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 rounded-full bg-black/80 hover:bg-primary text-white p-3 sm:p-3.5 backdrop-blur-md border border-white/15 transition-all duration-200 hover:scale-110 z-[1000000] focus:outline-none focus:ring-2 focus:ring-primary shadow-2xl cursor-pointer"
                aria-label="Previous project image"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextModalProject();
                }}
                className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 rounded-full bg-black/80 hover:bg-primary text-white p-3 sm:p-3.5 backdrop-blur-md border border-white/15 transition-all duration-200 hover:scale-110 z-[1000000] focus:outline-none focus:ring-2 focus:ring-primary shadow-2xl cursor-pointer"
                aria-label="Next project image"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              {/* Modal Image Box */}
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[85vh] max-w-[90vw] flex flex-col items-center justify-center rounded-2xl overflow-hidden mt-10 sm:mt-12"
              >
                <img
                  src={currentModalProject.src}
                  alt={currentModalProject.title}
                  className="max-h-[70vh] sm:max-h-[75vh] max-w-[88vw] w-auto h-auto object-contain rounded-xl shadow-2xl border border-white/10"
                />

                {/* Bottom Info Bar in Modal */}
                <div className="mt-3 text-center max-w-xl px-4">
                  <span className="inline-block rounded-full bg-primary/20 text-primary border border-primary/30 text-[10px] uppercase font-mono px-3 py-1 font-semibold mb-1">
                    {currentModalProject.cat}
                  </span>
                  <p className="text-xs sm:text-sm text-white/90 font-medium">
                    {currentModalProject.title}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </Section>
  );
}
