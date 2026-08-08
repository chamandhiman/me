import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { useRef, useEffect, useState, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Section shell: full-bleed backdrop slot + content container */
export function Section({
  id,
  backdrop,
  className,
  children,
}: {
  id?: string;
  backdrop?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate overflow-hidden bg-background px-6 py-24 md:px-10 md:py-32",
        className,
      )}
    >
      {backdrop}
      <div className="relative z-10 mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="mb-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-primary uppercase"
    >
      <span className="inline-block h-px w-8 bg-primary/60" />
      {children}
    </motion.p>
  );
}

/* Word-by-word reveal optimized for zero GPU blur overhead */
export function CharReveal({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
  gradient = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
  gradient?: boolean;
}) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-block">
        {words.map((word, wi) => (
          <motion.span
            key={wi}
            initial={{ opacity: 0, y: "0.4em" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.65,
              ease: EASE,
              delay: delay + wi * 0.04,
            }}
            className={cn("inline-block whitespace-nowrap mr-[0.25em]", gradient && "text-gradient-char")}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}

/* Lightweight reveal */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: MotionStyle;
}) {
  return (
    <motion.div
      className={className}
      {...(style ? { style } : {})}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* Magnetic button — pulls toward cursor on desktop, plain button on touch */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "solid",
  className,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768 && !("ontouchstart" in window));
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    if (!isDesktop) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 20);
    y.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 16);
  };

  const reset = () => {
    if (!isDesktop) return;
    x.set(0);
    y.set(0);
  };

  const base =
    "animated-border group relative inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300";
  const look =
    variant === "solid"
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "glass-panel text-foreground hover:text-primary";

  const MotionTag = (href ? motion.a : motion.button) as typeof motion.a;

  return (
    <MotionTag
      ref={ref as never}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={isDesktop ? { x, y } : {}}
      whileTap={{ scale: 0.96 }}
      className={cn(base, look, className)}
    >
      {children}
      <span
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: "var(--shadow-glow)" }}
        aria-hidden
      />
    </MotionTag>
  );
}

/* 3D tilt card — enabled on desktop, lightweight glass card on mobile */
export function TiltCard({
  children,
  className,
  intensity = 8,
  style,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768 && !("ontouchstart" in window));
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (!isDesktop) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * intensity * 1.5);
    rx.set(-(py - 0.5) * intensity * 1.5);
  };

  const reset = () => {
    if (!isDesktop) return;
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={
        isDesktop
          ? ({ rotateX: rx, rotateY: ry, transformPerspective: 900, ...style } as MotionStyle)
          : (style as MotionStyle)
      }
      className={cn("relative [transform-style:preserve-3d]", className)}
    >
      {children}
    </motion.div>
  );
}

/* Parallax wrapper — disabled on mobile for lag-free touch scrolling */
export function Parallax({
  children,
  distance = 50,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div ref={ref} style={isDesktop ? { y } : {}} className={className}>
      {children}
    </motion.div>
  );
}

export function Marquee({
  items,
  reverse = false,
  duration = 32,
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className="relative flex overflow-hidden"
      style={{
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <div
        className="flex w-max shrink-0 items-center gap-10"
        style={{
          animation: `marquee-x ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-lg tracking-tight text-muted-foreground whitespace-nowrap"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
