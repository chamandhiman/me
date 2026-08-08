import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { FloatingShapes, LightRays, MeshGradient, Vignette } from "@/components/backgrounds";
import { CharReveal, Eyebrow, Reveal, Section } from "@/components/motion-kit";
import {
  projectFilters,
  projects,
} from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function PortfolioShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Work");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filter projects by category
  const filteredProjects = projects.filter(
    (item) => selectedCategory === "All Work" || item.cat === selectedCategory
  );

  const total = filteredProjects.length;

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setDirection(0);
  };

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const currentItem = filteredProjects[currentIndex] || filteredProjects[0];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
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

  // Lock body scroll when modal active
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Touch Swipe Handlers
  const minSwipeDistance = 40;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
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

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 240 : -240,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 240 : -240,
      opacity: 0,
      scale: 0.96,
    }),
  };

  return (
    <Section
      id="work"
      backdrop={
        <>
          <MeshGradient />
          <LightRays />
          <FloatingShapes count={8} />
          <Vignette />
        </>
      }
    >
      {/* Header */}
      <Eyebrow>Selected Work</Eyebrow>
      <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
        <div>
          <CharReveal
            text="Interfaces I've designed, built and helped bring to life."
            className="font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.08] font-semibold text-foreground max-w-3xl"
          />
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl">
            From enterprise dashboards and workshop management systems to responsive customer websites and mobile experiences.
          </p>
        </div>

        {/* Category Filters */}
        <Reveal delay={0.1}>
          <div className="glass-panel flex flex-wrap gap-1 rounded-full p-1.5 border border-white/10 backdrop-blur-md">
            {projectFilters.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium tracking-tight transition-colors duration-300",
                  selectedCategory === cat
                    ? "text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-label={`Filter by ${cat}`}
              >
                {selectedCategory === cat && (
                  <motion.span
                    layoutId="work-filter-pill"
                    className="absolute inset-0 rounded-full bg-primary shadow-md"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* MAIN FEATURED PROJECT STAGE */}
      <div
        ref={stageRef}
        className="relative mx-auto w-full max-w-6xl focus:outline-none"
        tabIndex={0}
        aria-label="Featured Project Showcase Stage"
      >
        <div
          className="relative overflow-hidden rounded-2xl border border-white/15 bg-card/30 backdrop-blur-xl shadow-2xl p-4 sm:p-6 lg:p-8"
          style={{
            boxShadow:
              "0 30px 60px -15px rgba(0, 0, 0, 0.7), 0 0 50px rgba(59, 130, 246, 0.12)",
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Subtle Light Reflection Sweep */}
          <div className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 transition-transform duration-1000" />

          {/* Stage Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-primary uppercase tracking-wider font-bold">
                {currentItem?.cat}
              </span>
              <span className="text-muted-foreground text-xs">•</span>
              <span className="text-xs text-muted-foreground font-mono">
                {currentIndex + 1} of {total}
              </span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 text-xs font-semibold transition-colors border border-primary/25"
              aria-label="Expand screenshot to full resolution modal"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>View Fullscreen</span>
            </button>
          </div>

          {/* Large Screenshot Stage */}
          <div className="relative min-h-[300px] sm:min-h-[420px] lg:min-h-[520px] w-full flex items-center justify-center overflow-hidden rounded-xl bg-black/50 group border border-white/5">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentItem?.id || currentItem?.title}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                }}
                onClick={() => setIsModalOpen(true)}
                className="relative w-full h-full flex items-center justify-center cursor-pointer select-none p-2 sm:p-4"
              >
                <img
                  src={currentItem?.src}
                  alt={currentItem?.title}
                  className="max-h-[280px] sm:max-h-[400px] lg:max-h-[490px] w-auto max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-[1.015]"
                  loading="lazy"
                />

                {/* Hover Click to Expand Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg backdrop-blur-[2px]">
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/85 border border-white/20 text-white text-sm font-medium shadow-2xl backdrop-blur-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Maximize2 className="w-4 h-4 text-primary" />
                    <span>Click to View Fullscreen</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Stage Left Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/70 hover:bg-primary text-white p-3 backdrop-blur-md border border-white/15 opacity-80 hover:opacity-100 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary shadow-xl z-20"
              aria-label="Previous project slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Stage Right Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/70 hover:bg-primary text-white p-3 backdrop-blur-md border border-white/15 opacity-80 hover:opacity-100 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary shadow-xl z-20"
              aria-label="Next project slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Project Details Footer */}
          <div className="mt-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="space-y-1 max-w-2xl">
              <h3 className="text-lg sm:text-xl font-bold text-foreground">
                {currentItem?.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentItem?.desc}
              </p>
              {currentItem?.tags && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentItem.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-white/5 border border-white/10 px-2.5 py-0.5 font-mono text-[10px] text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Stage Pagination Dots */}
            <div className="flex items-center gap-1.5 self-center md:self-auto overflow-x-auto max-w-full py-1">
              {filteredProjects.map((item, idx) => (
                <button
                  key={item.id || item.title}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300 focus:outline-none",
                    idx === currentIndex
                      ? "w-8 bg-primary shadow-sm"
                      : "w-2.5 bg-white/20 hover:bg-white/40"
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECONDARY COMPACT THUMBNAIL GRID */}
      <div className="mt-14 max-w-6xl mx-auto">
        <h4 className="font-mono text-xs tracking-[0.25em] text-primary uppercase font-bold mb-6">
          Other Selected Work ({total})
        </h4>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProjects.map((proj, idx) => (
            <motion.div
              key={proj.id || proj.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (idx % 4) * 0.05 }}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
                setIsModalOpen(true);
              }}
              className={cn(
                "glass-panel group relative overflow-hidden rounded-xl border border-white/10 cursor-pointer p-2.5 bg-card/20 hover:border-primary/50 transition-all duration-300",
                idx === currentIndex && "border-primary bg-primary/5 shadow-md"
              )}
            >
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg bg-black/40 flex items-center justify-center p-2">
                <img
                  src={proj.src}
                  alt={proj.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <Maximize2 className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="mt-2.5 px-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-primary font-semibold block">
                  {proj.cat}
                </span>
                <h5 className="text-xs font-semibold text-foreground truncate mt-0.5">
                  {proj.title}
                </h5>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isMounted &&
        isModalOpen &&
        currentItem &&
        createPortal(
          <AnimatePresence mode="wait">
            <motion.div
              key="lightbox-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsModalOpen(false)}
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
                  className="rounded-full bg-white/20 hover:bg-white/30 text-white p-3 backdrop-blur-md transition-all duration-200 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-white border border-white/20 shadow-2xl cursor-pointer"
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
                className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 rounded-full bg-black/80 hover:bg-primary text-white p-3 sm:p-3.5 backdrop-blur-md border border-white/15 transition-all duration-200 hover:scale-110 z-[1000000] focus:outline-none focus:ring-2 focus:ring-primary shadow-2xl cursor-pointer"
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
                className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 rounded-full bg-black/80 hover:bg-primary text-white p-3 sm:p-3.5 backdrop-blur-md border border-white/15 transition-all duration-200 hover:scale-110 z-[1000000] focus:outline-none focus:ring-2 focus:ring-primary shadow-2xl cursor-pointer"
                aria-label="Next project image"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              {/* Modal Content Box */}
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[85vh] max-w-[90vw] flex flex-col items-center justify-center rounded-2xl overflow-hidden mt-10 sm:mt-12"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <img
                  src={currentItem.src}
                  alt={currentItem.title}
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
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </Section>
  );
}
