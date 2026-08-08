/* ------------------------------------------------------------------ *
 * Pure CSS Ambient Backdrops — 0 JavaScript, 0 rAF loops.
 * Lightweight, GPU-accelerated cinematic dark neon atmospheres.
 * ------------------------------------------------------------------ */

const layer = "pointer-events-none absolute inset-0 overflow-hidden";

/* ------------------------------------------------------------------ *
 * Aurora — animated multi-orb gradient wash (Pure CSS)
 * ------------------------------------------------------------------ */
export function Aurora({ intensity = 1 }: { intensity?: number }) {
  return (
    <div className={layer} aria-hidden style={{ opacity: intensity }}>
      <div
        className="absolute -inset-[30%] blur-[80px]"
        style={{
          background: "var(--gradient-aurora)",
          animation: "aurora-drift 26s var(--ease-lux) infinite",
        }}
      />
      <div
        className="absolute -inset-[20%] blur-[90px] opacity-70"
        style={{
          background: "var(--gradient-aurora)",
          animation: "aurora-drift 38s var(--ease-lux) infinite reverse",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Mesh gradient — slow-moving conic mesh (Pure CSS)
 * ------------------------------------------------------------------ */
export function MeshGradient({ opacity = 0.45 }: { opacity?: number }) {
  return (
    <div className={layer} aria-hidden>
      <div
        className="absolute -inset-1/4 blur-[60px]"
        style={{
          opacity,
          background:
            "conic-gradient(from 0deg at 30% 40%, color-mix(in oklab, var(--aurora-1) 60%, transparent), transparent 40%), conic-gradient(from 180deg at 72% 62%, color-mix(in oklab, var(--aurora-2) 55%, transparent), transparent 42%)",
          animation: "orbit-spin 55s linear infinite",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Animated grid — perspective-free scrolling grid (Pure CSS)
 * ------------------------------------------------------------------ */
export function AnimatedGrid({
  size = 56,
  opacity = 0.4,
  mask = "radial-gradient(120% 90% at 50% 0%, #000 10%, transparent 78%)",
}: {
  size?: number;
  opacity?: number;
  mask?: string;
}) {
  return (
    <div className={layer} aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          opacity,
          backgroundImage:
            "linear-gradient(to right, var(--glass-border) 1px, transparent 1px), linear-gradient(to bottom, var(--glass-border) 1px, transparent 1px)",
          backgroundSize: `${size}px ${size}px`,
          ["--grid-size" as string]: `${size}px`,
          animation: "grid-scroll 7s linear infinite",
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Grid floor — 3D perspective floor (Pure CSS)
 * ------------------------------------------------------------------ */
export function GridFloor() {
  return (
    <div className={layer} aria-hidden>
      <div className="absolute inset-x-0 bottom-0 h-[62%] [perspective:520px]">
        <div
          className="absolute inset-0 origin-bottom [transform:rotateX(72deg)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklab, var(--primary) 34%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--accent) 28%, transparent) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
            ["--grid-size" as string]: "70px",
            animation: "grid-scroll 3.4s linear infinite",
            WebkitMaskImage: "linear-gradient(to top, #000, transparent 82%)",
            maskImage: "linear-gradient(to top, #000, transparent 82%)",
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Glow orbs — soft floating light sources (Pure CSS)
 * ------------------------------------------------------------------ */
export function GlowOrbs({ count = 3 }: { count?: number }) {
  const orbs = Array.from({ length: count }, (_, i) => ({
    left: `${(i * 29 + 12) % 88}%`,
    top: `${(i * 41 + 18) % 76}%`,
    size: 200 + ((i * 97) % 220),
    delay: i * 1.7,
    hue: i % 3,
  }));
  return (
    <div className={layer} aria-hidden>
      {orbs.map((o, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-[65px]"
          style={{
            left: o.left,
            top: o.top,
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle, color-mix(in oklab, var(--aurora-${o.hue + 1}) 45%, transparent), transparent 70%)`,
            animation: `float-y ${11 + i * 2.5}s ease-in-out ${o.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Floating dots / Particle field — Pure CSS float
 * ------------------------------------------------------------------ */
export function ParticleField() {
  return <FloatingDots count={25} />;
}

export function ConnectedParticles() {
  return (
    <div className={layer} aria-hidden>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--primary) 20%, transparent), transparent 70%)",
        }}
      />
      <FloatingDots count={20} />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Animated waves — Pure CSS gradient lines
 * ------------------------------------------------------------------ */
export function WaveField() {
  return <GradientLines count={3} />;
}

/* ------------------------------------------------------------------ *
 * Pure CSS Wire Globe / Chandigarh Marker
 * ------------------------------------------------------------------ */
export function WireGlobe() {
  return (
    <div className={layer} aria-hidden>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-primary/20 bg-primary/5 shadow-[0_0_50px_rgba(100,200,255,0.15)] flex items-center justify-center">
        <div className="w-[240px] h-[240px] rounded-full border border-accent/20 animate-[orbit-spin_40s_linear_infinite]" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Mouse spotlight — Static ambient gradient spotlight (Pure CSS)
 * ------------------------------------------------------------------ */
export function MouseSpotlight({ size = 620 }: { size?: number }) {
  return (
    <div className={layer} aria-hidden>
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[50px] opacity-60"
        style={{
          width: size,
          height: size,
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 26%, transparent), transparent 68%)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Morphing blobs / liquid shapes (Pure CSS)
 * ------------------------------------------------------------------ */
export function MorphBlobs() {
  const blobs = [
    { left: "-8%", top: "6%", size: 360, hue: 1, dur: 22 },
    { left: "62%", top: "-6%", size: 300, hue: 2, dur: 28 },
    { left: "38%", top: "58%", size: 400, hue: 3, dur: 34 },
  ];
  return (
    <div className={layer} aria-hidden>
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute blur-[60px] opacity-55"
          style={{
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle at 35% 35%, color-mix(in oklab, var(--aurora-${b.hue}) 62%, transparent), transparent 68%)`,
            animation: `blob-morph ${b.dur}s var(--ease-lux) ${i * 2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Rotating rings + orbiting chips (Pure CSS)
 * ------------------------------------------------------------------ */
export function OrbitRings({ labels }: { labels: string[] }) {
  const rings = [
    { r: 30, dur: 34, items: labels.slice(0, 4) },
    { r: 42, dur: 46, items: labels.slice(4, 8) },
    { r: 54, dur: 62, items: labels.slice(8, 12) },
  ];
  return (
    <div className={layer} aria-hidden>
      <div className="absolute left-1/2 top-1/2 aspect-square w-[min(92vw,900px)] -translate-x-1/2 -translate-y-1/2">
        {rings.map((ring, ri) => (
          <div
            key={ri}
            className="absolute inset-0"
            style={{ animation: `orbit-spin ${ring.dur}s linear infinite ${ri % 2 ? "reverse" : ""}` }}
          >
            <div
              className="absolute rounded-full border"
              style={{
                inset: `${50 - ring.r}%`,
                borderColor: "var(--glass-border)",
              }}
            />
            {ring.items.map((label, i) => {
              const angle = (i / Math.max(ring.items.length, 1)) * 360;
              return (
                <div
                  key={label}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: `rotate(${angle}deg) translateY(-${ring.r}%)` }}
                >
                  <span
                    className="glass-panel block rounded-full px-3 py-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase"
                    style={{
                      transform: `rotate(${-angle}deg)`,
                      animation: `orbit-spin ${ring.dur}s linear infinite ${ri % 2 ? "" : "reverse"}`,
                    }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
        <div
          className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[40px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--primary) 45%, transparent), transparent 70%)",
            animation: "pulse-soft 6s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Light rays + glass reflections (Pure CSS)
 * ------------------------------------------------------------------ */
export function LightRays({ count = 3 }: { count?: number }) {
  return (
    <div className={layer} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="absolute -top-1/3 h-[170%] w-[14%] blur-xl"
          style={{
            left: `${i * 32 - 5}%`,
            ["--tilt" as string]: `${12 + i * 4}deg`,
            background:
              "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--primary) 18%, transparent), transparent)",
            animation: `ray-sweep ${13 + i * 3}s ease-in-out ${i * 2.4}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function FloatingShapes({ count = 5 }: { count?: number }) {
  return (
    <div className={layer} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="glass-panel absolute opacity-30"
          style={{
            left: `${(i * 37 + 6) % 92}%`,
            top: `${(i * 53 + 9) % 84}%`,
            width: 36 + ((i * 31) % 80),
            height: 36 + ((i * 23) % 80),
            borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "22%" : "6px",
            animation: `float-y ${9 + (i % 5) * 2.4}s ease-in-out ${i * 1.3}s infinite`,
            transform: `rotate(${i * 24}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export function FloatingDots({ count = 25 }: { count?: number }) {
  return (
    <div className={layer} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${(i * 61) % 100}%`,
            top: `${(i * 43) % 100}%`,
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            opacity: 0.15 + (i % 5) * 0.08,
            animation: `float-y ${7 + (i % 6) * 1.8}s ease-in-out ${i * 0.25}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Moving gradient lines — experience section (Pure CSS)
 * ------------------------------------------------------------------ */
export function GradientLines({ count = 4 }: { count?: number }) {
  return (
    <div className={layer} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="absolute left-0 w-full overflow-hidden"
          style={{ top: `${15 + i * 22}%`, height: 1 }}
        >
          <div
            className="hairline absolute inset-0"
            style={{ animation: `marquee-x ${18 + i * 5}s linear infinite`, width: "200%" }}
          />
        </div>
      ))}
    </div>
  );
}

/* Vignette to keep backdrop cinematic */
export function Vignette() {
  return (
    <div className={layer} aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 50% 40%, transparent 40%, color-mix(in oklab, var(--ink) 88%, transparent) 100%)",
        }}
      />
      <div className="noise-overlay" />
    </div>
  );
}
