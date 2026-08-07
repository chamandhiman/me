import { MorphBlobs, GlowOrbs, Vignette } from "@/components/backgrounds";
import {
  CharReveal,
  Eyebrow,
  ImageReveal,
  Parallax,
  Reveal,
  Section,
  TiltCard,
} from "@/components/motion-kit";
import { about, mockups } from "@/data/portfolio";

export function About() {
  return (
    <Section
      id="about"
      backdrop={
        <>
          <MorphBlobs />
          <GlowOrbs count={2} />
          <Vignette />
        </>
      }
    >
      <Eyebrow>About</Eyebrow>
      <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <CharReveal
            text={about.sub}
            className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.05] font-semibold text-foreground"
          />
          <Reveal delay={0.15}>
            <p className="mt-7 text-base leading-relaxed text-muted-foreground">{about.intro}</p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10">
              <h3 className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase">
                Key project — {about.keyProject.title}
              </h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {about.keyProject.modules.map((m) => (
                  <li
                    key={m.name}
                    className="glass-panel animated-border rounded-xl px-4 py-3.5"
                  >
                    <p className="text-sm font-medium text-foreground">{m.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{m.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="space-y-5">
          {mockups.map((m, i) => (
            <Parallax key={m.title} distance={26 - i * 8}>
              <TiltCard intensity={7}>
                <a
                  href={m.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="glass-panel group block overflow-hidden rounded-2xl"
                  style={{ boxShadow: "var(--shadow-float)" }}
                >
                  <ImageReveal
                    src={m.src}
                    alt={`${m.title} interface mockup`}
                    className="aspect-16/10"
                    imgClassName="transition-transform duration-[1.4s] group-hover:scale-[1.05]"
                    delay={i * 0.08}
                  />
                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-sm font-medium text-foreground">{m.title}</span>
                    <span className="font-mono text-[10px] tracking-[0.25em] text-primary uppercase">
                      Live ↗
                    </span>
                  </div>
                </a>
              </TiltCard>
            </Parallax>
          ))}
        </div>
      </div>

      <div className="mt-24 grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="font-display text-2xl font-semibold text-foreground">
            My role &amp; responsibilities
          </h3>
          <div className="mt-6 space-y-5">
            {about.role.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="border-l border-border pl-5 text-sm leading-relaxed text-muted-foreground">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-display text-2xl font-semibold text-foreground">
            Featured website design
          </h3>
          <div className="mt-6 space-y-5">
            {about.websiteDesign.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="border-l border-border pl-5 text-sm leading-relaxed text-muted-foreground">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
