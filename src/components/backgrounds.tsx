import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ *
 * Shared canvas hook — rAF loop with DPR handling + auto teardown.
 * ------------------------------------------------------------------ */
type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;

function useCanvas(draw: DrawFn, init?: (w: number, h: number) => void) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);
  const initRef = useRef(init);
  drawRef.current = draw;
  initRef.current = init;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = Math.max(rect.width, 1);
      h = Math.max(rect.height, 1);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initRef.current?.(w, h);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const start = performance.now();
    const loop = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      drawRef.current(ctx, w, h, (now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return ref;
}

const layer = "pointer-events-none absolute inset-0 overflow-hidden";

/* ------------------------------------------------------------------ *
 * Aurora — animated multi-orb gradient wash (CSS, GPU cheap)
 * ------------------------------------------------------------------ */
export function Aurora({ intensity = 1 }: { intensity?: number }) {
  return (
    <div className={layer} aria-hidden style={{ opacity: intensity }}>
      <div
        className="absolute -inset-[30%] blur-[90px]"
        style={{
          background: "var(--gradient-aurora)",
          animation: "aurora-drift 26s var(--ease-lux) infinite",
        }}
      />
      <div
        className="absolute -inset-[20%] blur-[110px] opacity-70"
        style={{
          background: "var(--gradient-aurora)",
          animation: "aurora-drift 38s var(--ease-lux) infinite reverse",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Mesh gradient — slow-moving conic mesh
 * ------------------------------------------------------------------ */
export function MeshGradient() {
  return (
    <div className={layer} aria-hidden>
      <div
        className="absolute -inset-1/4 opacity-45 blur-[70px]"
        style={{
          background:
            "conic-gradient(from 0deg at 30% 40%, color-mix(in oklab, var(--aurora-1) 60%, transparent), transparent 40%), conic-gradient(from 180deg at 72% 62%, color-mix(in oklab, var(--aurora-2) 55%, transparent), transparent 42%)",
          animation: "orbit-spin 55s linear infinite",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Animated grid — perspective-free scrolling grid
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
 * Grid floor — 3D perspective floor for the contact section
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
 * Glow orbs — soft floating light sources
 * ------------------------------------------------------------------ */
export function GlowOrbs({ count = 4 }: { count?: number }) {
  const orbs = Array.from({ length: count }, (_, i) => ({
    left: `${(i * 29 + 12) % 88}%`,
    top: `${(i * 41 + 18) % 76}%`,
    size: 220 + ((i * 97) % 260),
    delay: i * 1.7,
    hue: i % 3,
  }));
  return (
    <div className={layer} aria-hidden>
      {orbs.map((o, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-[80px]"
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
 * Floating particles (canvas)
 * ------------------------------------------------------------------ */
type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };

export function ParticleField({ density = 0.00009 }: { density?: number }) {
  const particles = useRef<P[]>([]);
  const ref = useCanvas(
    (ctx, w, h) => {
      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190, 225, 255, ${p.a})`;
        ctx.fill();
      }
    },
    (w, h) => {
      const n = Math.min(180, Math.max(40, Math.round(w * h * density)));
      particles.current = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: -0.06 - Math.random() * 0.28,
        r: Math.random() * 1.6 + 0.3,
        a: Math.random() * 0.5 + 0.12,
      }));
    },
  );
  return <canvas ref={ref} className={`${layer} h-full w-full`} aria-hidden />;
}

/* ------------------------------------------------------------------ *
 * Connected particles / constellation (canvas)
 * ------------------------------------------------------------------ */
export function ConnectedParticles({ nodes = 58 }: { nodes?: number }) {
  const pts = useRef<P[]>([]);
  const ref = useCanvas(
    (ctx, w, h) => {
      const list = pts.current;
      for (const p of list) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < list.length; i++) {
        const a = list[i]!;
        for (let j = i + 1; j < list.length; j++) {
          const b = list[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(140, 210, 255, ${(1 - d / 130) * 0.16})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 235, 255, ${a.a})`;
        ctx.fill();
      }
    },
    (w, h) => {
      pts.current = Array.from({ length: nodes }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.6,
        a: Math.random() * 0.4 + 0.25,
      }));
    },
  );
  return <canvas ref={ref} className={`${layer} h-full w-full`} aria-hidden />;
}

/* ------------------------------------------------------------------ *
 * Animated waves (canvas) — footer horizon
 * ------------------------------------------------------------------ */
export function WaveField() {
  const ref = useCanvas((ctx, w, h, t) => {
    const bands = 5;
    for (let b = 0; b < bands; b++) {
      ctx.beginPath();
      const baseY = h * (0.45 + b * 0.1);
      for (let x = 0; x <= w; x += 8) {
        const y =
          baseY +
          Math.sin(x * 0.006 + t * (0.5 + b * 0.16) + b) * (14 + b * 6) +
          Math.sin(x * 0.013 - t * 0.4 + b) * 7;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(${120 + b * 14}, ${200 - b * 10}, 255, ${0.22 - b * 0.03})`;
      ctx.lineWidth = 1.1;
      ctx.stroke();
    }
  });
  return <canvas ref={ref} className={`${layer} h-full w-full`} aria-hidden />;
}

/* ------------------------------------------------------------------ *
 * Interactive wireframe globe (canvas, contact)
 * ------------------------------------------------------------------ */
export function WireGlobe() {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const ref = useCanvas((ctx, w, h, t) => {
    const cx = w / 2;
    const cy = h / 2;
    const R = Math.min(w, h) * 0.34;
    const rotY = t * 0.28 + mouse.current.x * 0.8;
    const tilt = 0.42 + mouse.current.y * 0.25;

    const project = (lat: number, lon: number) => {
      const x = Math.cos(lat) * Math.cos(lon + rotY);
      const y = Math.sin(lat);
      const z = Math.cos(lat) * Math.sin(lon + rotY);
      const y2 = y * Math.cos(tilt) - z * Math.sin(tilt);
      const z2 = y * Math.sin(tilt) + z * Math.cos(tilt);
      return { x: cx + x * R, y: cy + y2 * R, z: z2 };
    };

    ctx.lineWidth = 0.8;
    for (let i = 1; i < 10; i++) {
      const lat = -Math.PI / 2 + (i * Math.PI) / 10;
      ctx.beginPath();
      for (let lon = 0; lon <= Math.PI * 2 + 0.1; lon += 0.12) {
        const p = project(lat, lon);
        const alpha = p.z > 0 ? 0.3 : 0.09;
        ctx.strokeStyle = `rgba(150, 215, 255, ${alpha})`;
        if (lon === 0) ctx.moveTo(p.x, p.y);
        else {
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
        }
      }
    }
    for (let j = 0; j < 18; j++) {
      const lon = (j * Math.PI * 2) / 18;
      ctx.beginPath();
      for (let lat = -Math.PI / 2; lat <= Math.PI / 2 + 0.05; lat += 0.12) {
        const p = project(lat, lon);
        ctx.strokeStyle = `rgba(190, 160, 255, ${p.z > 0 ? 0.22 : 0.07})`;
        if (lat === -Math.PI / 2) ctx.moveTo(p.x, p.y);
        else {
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
        }
      }
    }
    // Chandigarh marker (approx 30.7N, 76.8E)
    const marker = project((30.7 * Math.PI) / 180, (76.8 * Math.PI) / 180);
    if (marker.z > -0.2) {
      const pulse = 3 + Math.sin(t * 3) * 1.6;
      ctx.beginPath();
      ctx.arc(marker.x, marker.y, pulse, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(170, 240, 255, 0.9)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(marker.x, marker.y, pulse * 3.2, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(170, 240, 255, 0.28)";
      ctx.stroke();
    }
  });
  return <canvas ref={ref} className={`${layer} h-full w-full`} aria-hidden />;
}

/* ------------------------------------------------------------------ *
 * Mouse spotlight — follows cursor inside its container
 * ------------------------------------------------------------------ */
export function MouseSpotlight({ size = 620 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    let raf = 0;
    const target = { x: 0.5, y: 0.4 };
    const pos = { x: 0.5, y: 0.4 };
    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = (e.clientY - r.top) / r.height;
    };
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      el.style.transform = `translate3d(calc(${pos.x * 100}% - 50%), calc(${pos.y * 100}% - 50%), 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className={layer} aria-hidden>
      <div
        ref={ref}
        className="absolute left-0 top-0 rounded-full blur-[60px]"
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
 * Morphing blobs / liquid shapes
 * ------------------------------------------------------------------ */
export function MorphBlobs() {
  const blobs = [
    { left: "-8%", top: "6%", size: 420, hue: 1, dur: 22 },
    { left: "62%", top: "-6%", size: 360, hue: 2, dur: 28 },
    { left: "38%", top: "58%", size: 480, hue: 3, dur: 34 },
  ];
  return (
    <div className={layer} aria-hidden>
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute blur-[70px] opacity-55"
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
 * Rotating rings + orbiting chips
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
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[50px]"
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
 * Light rays + glass reflections
 * ------------------------------------------------------------------ */
export function LightRays({ count = 4 }: { count?: number }) {
  return (
    <div className={layer} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="absolute -top-1/3 h-[170%] w-[14%] blur-2xl"
          style={{
            left: `${i * 26 - 10}%`,
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

export function FloatingShapes({ count = 7 }: { count?: number }) {
  return (
    <div className={layer} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="glass-panel absolute opacity-40"
          style={{
            left: `${(i * 37 + 6) % 92}%`,
            top: `${(i * 53 + 9) % 84}%`,
            width: 40 + ((i * 31) % 90),
            height: 40 + ((i * 23) % 90),
            borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "22%" : "6px",
            animation: `float-y ${9 + (i % 5) * 2.4}s ease-in-out ${i * 1.3}s infinite`,
            transform: `rotate(${i * 24}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export function FloatingDots({ count = 40 }: { count?: number }) {
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
 * Moving gradient lines — experience section
 * ------------------------------------------------------------------ */
export function GradientLines({ count = 5 }: { count?: number }) {
  return (
    <div className={layer} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="absolute left-0 w-full overflow-hidden"
          style={{ top: `${12 + i * 19}%`, height: 1 }}
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

/* Vignette to keep every backdrop cinematic rather than flat. */
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
