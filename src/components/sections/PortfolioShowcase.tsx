import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { LightRays, MeshGradient, Vignette } from "@/components/backgrounds";
import { CharReveal, Eyebrow, Reveal, Section } from "@/components/motion-kit";
import { projectFilters, projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function PortfolioShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Work");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === "All Work" || selectedCategory === "All") return true;
    return p.cat === selectedCategory;
  });

  const total = filteredProjects.length;

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const currentItem = filteredProjects[currentIndex] || filteredProjects[0];

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") {
        setIsModalOpen(false);
      } else if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, nextSlide, prevSlide]);

  useEffect(() => {
    if (isModalOpen) {
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
  }, [isModalOpen]);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 40;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    if (e.targetTouches && e.targetTouches[0]) {
      setTouchStart(e.targetTouches[0].clientX);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.targetTouches && e.targetTouches[0]) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  return (
    <Section
      id="work"
      backdrop={
        <>
          <LightRays count={2} />
          <MeshGradient opacity={0.25} />
          <Vignette />
        </>
      }
    >
      <Eyebrow>Selected Works</Eyebrow>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <CharReveal
            text="Driving School Platform Ecosystem"
            className="font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.05] font-semibold text-foreground"
          />
          <Reveal>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              Production web applications, centralized admin modules, staff iPad portals, and student iOS interfaces designed and integrated over 8+ years.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-primary font-semibold uppercase tracking-wider bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
              {total} Projects Filtered
            </span>
          </div>
        </Reveal>
      </div>

      {/* FILTER TABS */}
      <Reveal>
        <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
          {projectFilters.map((tab) => {
            const active = selectedCategory === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedCategory(tab)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 cursor-pointer border",
                  active
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(100,210,255,0.4)]"
                    : "glass-panel text-muted-foreground hover:text-foreground hover:border-primary/40"
                )}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* PRIMARY FEATURED SHOWCASE STAGE */}
      {currentItem && (
        <Reveal>
          <div className="mt-8 neon-card rounded-2xl p-4 sm:p-6 lg:p-8 relative">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
              <div>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30 mb-2">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  {currentItem.cat}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                  {currentItem.title}
                </h3>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-950/70 hover:bg-cyan-900/80 text-cyan-300 px-3.5 py-2 text-xs font-semibold transition-all duration-200 border border-cyan-500/40 hover:shadow-[0_0_15px_rgba(0,220,255,0.4)] cursor-pointer"
                aria-label="Expand screenshot to full resolution modal"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>View Fullscreen</span>
              </button>
            </div>

            {/* Large Screenshot Stage */}
            <div className="relative min-h-[300px] sm:min-h-[420px] lg:min-h-[520px] w-full flex items-center justify-center overflow-hidden rounded-xl bg-black/60 group border border-white/10">
              <div
                onClick={() => setIsModalOpen(true)}
                className="relative w-full h-full flex items-center justify-center cursor-pointer select-none p-2 sm:p-4"
              >
                <img
                  src={currentItem.src}
                  alt={currentItem.title}
                  className="max-h-[280px] sm:max-h-[400px] lg:max-h-[490px] w-auto max-w-full object-contain rounded-lg shadow-2xl transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-105"
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* Stage Left Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/80 hover:bg-cyan-500 text-white p-2.5 sm:p-3 border border-white/15 transition-all duration-200 hover:scale-110 z-10 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-xl cursor-pointer"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Stage Right Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/80 hover:bg-cyan-500 text-white p-2.5 sm:p-3 border border-white/15 transition-all duration-200 hover:scale-110 z-10 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-xl cursor-pointer"
                aria-label="Next screenshot"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Controls & Info */}
            <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {currentItem.desc || "Interactive screenshot from Driving School Software platform ecosystem."}
                </p>
                {currentItem.tags && (
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {currentItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="tech-badge"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {(currentItem as { href?: string }).href && (
                  <a
                    href={(currentItem as { href?: string }).href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:underline"
                  >
                    <span>Visit Live Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <div className="flex items-center gap-1.5">
                  {filteredProjects.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={cn(
                        "h-2.5 rounded-full transition-all duration-200 focus:outline-none cursor-pointer",
                        idx === currentIndex
                          ? "w-8 bg-cyan-400 shadow-[0_0_10px_rgba(0,220,255,0.6)]"
                          : "w-2.5 bg-white/20 hover:bg-white/40"
                      )}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* SECONDARY COMPACT THUMBNAIL GRID */}
      <div className="mt-12 max-w-6xl mx-auto">
        <h4 className="font-mono text-xs tracking-[0.25em] text-cyan-400 uppercase font-bold mb-6">
          Other Selected Work ({total})
        </h4>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProjects.map((proj, idx) => (
            <div
              key={proj.id || proj.title}
              onClick={() => {
                setCurrentIndex(idx);
                setIsModalOpen(true);
              }}
              className={cn(
                "neon-card group relative overflow-hidden rounded-xl border border-white/10 cursor-pointer p-2.5 bg-card/20 transition-all duration-200",
                idx === currentIndex && "border-cyan-400 bg-cyan-950/40 shadow-[0_0_15px_rgba(0,220,255,0.3)]"
              )}
            >
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg bg-black/50 flex items-center justify-center p-2">
                <img
                  src={proj.src}
                  alt={proj.title}
                  className="max-h-full max-w-full object-contain transition-all duration-500 ease-out group-hover:scale-[1.04] group-hover:brightness-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="mt-2.5 px-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-400 font-semibold block">
                  {proj.cat}
                </span>
                <h5 className="text-xs font-semibold text-foreground truncate mt-0.5 group-hover:text-cyan-200 transition-colors">
                  {proj.title}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL (Pure CSS & React State) */}
      {isMounted &&
        isModalOpen &&
        currentItem &&
        createPortal(
          <div
            onClick={() => setIsModalOpen(false)}
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
                  {currentIndex + 1} / {total}
                </span>
                <span className="text-white/30 text-xs">|</span>
                <span className="text-xs font-medium text-white/90 truncate max-w-[200px] sm:max-w-md">
                  {currentItem.title}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(false);
                }}
                className="rounded-full bg-white/20 hover:bg-white/30 text-white p-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white border border-white/20 shadow-2xl cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Left Nav Arrow in Modal */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 rounded-full bg-black/90 hover:bg-primary text-white p-3 sm:p-3.5 border border-white/15 transition-all duration-200 hover:scale-110 z-[1000000] focus:outline-none focus:ring-2 focus:ring-primary shadow-2xl cursor-pointer"
              aria-label="Previous project image"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Right Nav Arrow in Modal */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 rounded-full bg-black/90 hover:bg-primary text-white p-3 sm:p-3.5 border border-white/15 transition-all duration-200 hover:scale-110 z-[1000000] focus:outline-none focus:ring-2 focus:ring-primary shadow-2xl cursor-pointer"
              aria-label="Next project image"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Modal Content Box */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-[90vw] flex flex-col items-center justify-center rounded-2xl overflow-hidden mt-10 sm:mt-12"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <img
                src={currentItem.src}
                alt={currentItem.title}
                loading="eager"
                decoding="async"
                className="max-h-[70vh] sm:max-h-[75vh] max-w-[88vw] w-auto h-auto object-contain rounded-xl shadow-2xl border border-white/10"
              />

              <div className="mt-3 text-center max-w-xl px-4">
                <span className="inline-block rounded-full bg-primary/20 text-primary border border-primary/30 text-[10px] uppercase font-mono px-3 py-1 font-semibold mb-1">
                  {currentItem.cat}
                </span>
                <p className="text-xs sm:text-sm text-white/90 font-medium">
                  {currentItem.title}
                </p>
                {currentItem.desc && (
                  <p className="text-[11px] sm:text-xs text-white/70 mt-0.5">
                    {currentItem.desc}
                  </p>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </Section>
  );
}
