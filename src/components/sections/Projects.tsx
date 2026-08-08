import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { LightRays, MeshGradient, Vignette } from "@/components/backgrounds";
import {
  CharReveal,
  Eyebrow,
  Reveal,
  Section,
} from "@/components/motion-kit";
import { projectFilters, projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Projects() {
  const [filter, setFilter] = useState<string>("All Work");
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (activeModalIndex !== null) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [activeModalIndex]);

  const shownProjects = projects.filter((p) => {
    if (filter === "All Work" || filter === "All") return true;
    return p.cat === filter;
  });

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
    setActiveModalIndex((prev) => ((prev ?? 0) - 1 + shownProjects.length) % shownProjects.length);
  }, [activeModalIndex, shownProjects.length]);

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

  const currentModalProject =
    activeModalIndex !== null && shownProjects[activeModalIndex]
      ? shownProjects[activeModalIndex]
      : null;

  return (
    <Section
      id="projects"
      backdrop={
        <>
          <LightRays count={2} />
          <MeshGradient opacity={0.2} />
          <Vignette />
        </>
      }
    >
      <Eyebrow>Portfolio</Eyebrow>
      <CharReveal
        text="All Featured Solutions"
        className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.05] font-semibold text-foreground"
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {projectFilters.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 cursor-pointer border",
              filter === cat
                ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(100,210,255,0.4)]"
                : "glass-panel text-muted-foreground hover:text-foreground hover:border-primary/40"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shownProjects.map((p, i) => (
          <Reveal key={p.title + i}>
            <div
              onClick={() => openModal(i)}
              className="glass-panel neon-glass-card group relative overflow-hidden rounded-3xl cursor-pointer border border-white/10"
            >
              <figure className="relative h-full flex flex-col justify-between">
                <div className="relative aspect-16/10 w-full overflow-hidden bg-black/40 p-3 flex items-center justify-center">
                  <img
                    src={p.src}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
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
                </figcaption>
              </figure>
            </div>
          </Reveal>
        ))}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL FOR FEATURED PROJECTS */}
      {isMounted &&
        activeModalIndex !== null &&
        currentModalProject &&
        createPortal(
          <div
            onClick={closeModal}
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 p-4 sm:p-6 select-none animate-in fade-in-0 transition-opacity duration-200"
            aria-modal="true"
            role="dialog"
            aria-label="Fullscreen project view"
          >
            {/* Modal Top Control Bar */}
            <div
              className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-10 flex items-center justify-between z-[1000000]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 bg-black/90 border border-white/15 rounded-full px-4 py-2 shadow-2xl">
                <span className="font-mono text-xs text-primary font-bold">
                  {activeModalIndex + 1} / {shownProjects.length}
                </span>
                <span className="text-white/30 text-xs">|</span>
                <span className="text-xs font-medium text-white/90 truncate max-w-[200px] sm:max-w-md">
                  {currentModalProject?.title}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
                className="rounded-full bg-white/20 hover:bg-white/30 text-white p-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white border border-white/20 shadow-2xl cursor-pointer"
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
              className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 rounded-full bg-black/90 hover:bg-primary text-white p-3 sm:p-3.5 border border-white/15 transition-all duration-200 hover:scale-110 z-[1000000] focus:outline-none focus:ring-2 focus:ring-primary shadow-2xl cursor-pointer"
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
              className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 rounded-full bg-black/90 hover:bg-primary text-white p-3 sm:p-3.5 border border-white/15 transition-all duration-200 hover:scale-110 z-[1000000] focus:outline-none focus:ring-2 focus:ring-primary shadow-2xl cursor-pointer"
              aria-label="Next project image"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Modal Image Box */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-[90vw] flex flex-col items-center justify-center rounded-2xl overflow-hidden mt-10 sm:mt-12"
            >
              <img
                src={currentModalProject?.src}
                alt={currentModalProject?.title}
                loading="eager"
                decoding="async"
                className="max-h-[70vh] sm:max-h-[75vh] max-w-[88vw] w-auto h-auto object-contain rounded-xl shadow-2xl border border-white/10"
              />

              {/* Bottom Info Bar in Modal */}
              <div className="mt-3 text-center max-w-xl px-4">
                <span className="inline-block rounded-full bg-primary/20 text-primary border border-primary/30 text-[10px] uppercase font-mono px-3 py-1 font-semibold mb-1">
                  {currentModalProject?.cat}
                </span>
                <p className="text-xs sm:text-sm text-white/90 font-medium">
                  {currentModalProject?.title}
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </Section>
  );
}
