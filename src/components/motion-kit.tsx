import { type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

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
    <p className="mb-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-primary uppercase">
      <span className="inline-block h-px w-8 bg-primary/60" />
      {children}
    </p>
  );
}

/* Word-by-word reveal (Pure HTML/CSS) */
export function CharReveal({
  text,
  className,
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
          <span
            key={wi}
            className={cn("inline-block whitespace-nowrap mr-[0.25em]", gradient && "text-gradient-char")}
          >
            {word}
          </span>
        ))}
      </span>
    </Tag>
  );
}

/* Lightweight container (Pure HTML/CSS) */
export function Reveal({
  children,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

/* Magnetic button — Pure CSS Hover Button */
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
  const base =
    "group relative inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer";
  const look =
    variant === "solid"
      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(100,210,255,0.35)]"
      : "glass-panel text-foreground hover:text-primary hover:border-primary/50 hover:shadow-[0_0_25px_rgba(100,210,255,0.25)]";

  if (href) {
    return (
      <a href={href} onClick={onClick} className={cn(base, look, className)}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cn(base, look, className)}>
      {children}
    </button>
  );
}

/* 3D tilt card — Pure CSS Neon Glass Card */
export function TiltCard({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn("neon-glass-card relative overflow-hidden rounded-3xl", className)}
    >
      {children}
    </div>
  );
}

/* Parallax wrapper — Pure CSS layout container */
export function Parallax({
  children,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
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
