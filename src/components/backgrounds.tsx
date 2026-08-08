/* ------------------------------------------------------------------ *
 * Static Ambient Backdrops — 0 Heavy Blur Animations, 0 GPU Thrashing.
 * Pure static radial gradients for maximum performance & 60fps scrolling.
 * ------------------------------------------------------------------ */

const layer = "pointer-events-none absolute inset-0 overflow-hidden";

type ComponentProps = {
  intensity?: number;
  opacity?: number;
  size?: number;
  mask?: string;
  count?: number;
  density?: number;
  labels?: string[];
};

export function Aurora({ intensity = 1 }: ComponentProps = {}) {
  return (
    <div className={layer} aria-hidden style={{ opacity: intensity }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 20%, color-mix(in oklab, var(--aurora-1) 25%, transparent), transparent 70%), radial-gradient(50% 50% at 80% 30%, color-mix(in oklab, var(--aurora-2) 20%, transparent), transparent 70%)",
        }}
      />
    </div>
  );
}

export function MeshGradient({ opacity = 0.3 }: ComponentProps = {}) {
  return (
    <div className={layer} aria-hidden style={{ opacity }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--aurora-3) 20%, transparent), transparent 65%)",
        }}
      />
    </div>
  );
}

export function AnimatedGrid({
  size = 56,
  opacity = 0.25,
  mask = "radial-gradient(120% 90% at 50% 0%, #000 10%, transparent 78%)",
}: ComponentProps = {}) {
  return (
    <div className={layer} aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          opacity,
          backgroundImage:
            "linear-gradient(to right, var(--glass-border) 1px, transparent 1px), linear-gradient(to bottom, var(--glass-border) 1px, transparent 1px)",
          backgroundSize: `${size}px ${size}px`,
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
    </div>
  );
}

export function GridFloor() {
  return (
    <div className={layer} aria-hidden>
      <div className="absolute inset-x-0 bottom-0 h-[60%] [perspective:500px]">
        <div
          className="absolute inset-0 origin-bottom [transform:rotateX(70deg)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklab, var(--primary) 20%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--accent) 15%, transparent) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
            WebkitMaskImage: "linear-gradient(to top, #000, transparent 80%)",
            maskImage: "linear-gradient(to top, #000, transparent 80%)",
          }}
        />
      </div>
    </div>
  );
}

export function GlowOrbs(_props: ComponentProps = {}) {
  return (
    <div className={layer} aria-hidden>
      <div
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--aurora-1) 18%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--aurora-2) 15%, transparent), transparent 70%)",
        }}
      />
    </div>
  );
}

export function ParticleField(_props: ComponentProps = {}) {
  return null;
}

export function ConnectedParticles(_props: ComponentProps = {}) {
  return (
    <div className={layer} aria-hidden>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--primary) 15%, transparent), transparent 70%)",
        }}
      />
    </div>
  );
}

export function WaveField(_props: ComponentProps = {}) {
  return null;
}

export function WireGlobe() {
  return (
    <div className={layer} aria-hidden>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-primary/15 bg-primary/5 shadow-[0_0_30px_rgba(100,200,255,0.08)]" />
    </div>
  );
}

export function MouseSpotlight({ size = 600 }: ComponentProps = {}) {
  return (
    <div className={layer} aria-hidden>
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        style={{
          width: size,
          height: size,
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 20%, transparent), transparent 70%)",
        }}
      />
    </div>
  );
}

export function MorphBlobs(_props: ComponentProps = {}) {
  return (
    <div className={layer} aria-hidden>
      <div
        className="absolute left-10 top-10 h-80 w-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--aurora-1) 20%, transparent), transparent 70%)",
        }}
      />
    </div>
  );
}

export function OrbitRings(_props: ComponentProps = {}) {
  return null;
}

export function LightRays(_props: ComponentProps = {}) {
  return null;
}

export function FloatingShapes(_props: ComponentProps = {}) {
  return null;
}

export function FloatingDots(_props: ComponentProps = {}) {
  return null;
}

export function GradientLines(_props: ComponentProps = {}) {
  return null;
}

export function Vignette() {
  return (
    <div className={layer} aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 50% 40%, transparent 40%, color-mix(in oklab, var(--ink) 85%, transparent) 100%)",
        }}
      />
    </div>
  );
}
