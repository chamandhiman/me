import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { useRef, type ReactNode, type CSSProperties } from "react";
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
        "relative isolate overflow-hidden bg-background px-6 py-28 md:px-10 md:py-36",
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
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="mb-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-primary uppercase"
    >
      <span className="inline-block h-px w-8 bg-primary/60" />
      {children}
    </motion.p>
  );
}

/* Character-by-character reveal with blur-to-sharp */
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
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.split("").map((ch, ci) => (
              <motion.span
                key={ci}
                className={cn("inline-block", gradient && "text-gradient-char")}
                initial={{ opacity: 0, y: "0.5em", filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  ease: EASE,
                  delay: delay + (wi * 3 + ci) * 0.018,
                }}
              >
                {ch}
              </motion.span>
            ))}
            {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </span>
    </Tag>
  );
}

/* Generic staggered reveal */
export function Reveal({
  children,
  delay = 0,
  y = 26,
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
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* Magnetic button — pulls toward the cursor */
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
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 26);
    y.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 20);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "animated-border group relative inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-500";
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
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      className={cn(base, look, className)}
    >
      {children}
      <span
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "var(--shadow-glow)" }}
        aria-hidden
      />
    </MotionTag>
  );
}

/* 3D tilt card with a moving glare */
export function TiltCard({
  children,
  className,
  intensity = 10,
  style,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 });
  const gx = useSpring(useMotionValue(50), { stiffness: 140, damping: 20 });
  const gy = useSpring(useMotionValue(50), { stiffness: 140, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * intensity * 2);
    rx.set(-(py - 0.5) * intensity * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  };

  const glare = useTransform(
    [gx, gy],
    ([a, b]) =>
      `radial-gradient(closest-side circle at ${a}% ${b}%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 72%)`,
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={
        { rotateX: rx, rotateY: ry, transformPerspective: 900, ...style } as MotionStyle
      }
      className={cn("relative [transform-style:preserve-3d]", className)}
    >
      {children}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 hover:opacity-100"
        style={{ backgroundImage: glare, opacity: 0.7 }}
      />
    </motion.div>
  );
}

/* Parallax wrapper driven by scroll progress */
export function Parallax({
  children,
  distance = 70,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* Image reveal: clip-path wipe + blur-to-sharp + slow zoom */
export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.14, filter: "blur(14px)" }}
        animate={
          inView ? { clipPath: "inset(0 0 0% 0)", scale: 1, filter: "blur(0px)" } : {}
        }
        transition={{ duration: 1.2, ease: EASE, delay }}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
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
