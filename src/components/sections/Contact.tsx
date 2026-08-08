import { Aurora, GridFloor, MouseSpotlight, WireGlobe, Vignette } from "@/components/backgrounds";
import { Eyebrow, MagneticButton, Reveal, Section } from "@/components/motion-kit";
import { person, socials } from "@/data/portfolio";
import { Mail, MapPin } from "lucide-react";

export function Contact() {
  return (
    <Section
      id="contact"
      className="py-20 md:py-28"
      backdrop={
        <>
          <Aurora intensity={0.6} />
          <WireGlobe />
          <Vignette />
        </>
      }
    >
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Contact</Eyebrow>
        <Reveal>
          <h2 className="text-gradient font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] font-semibold">
            Let&rsquo;s build something worth remembering
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Based in {person.location}. Open for UI/UX design, responsive web projects, and product modernization collaborations.
          </p>
        </Reveal>

        <Reveal delay={0.28}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href={`mailto:${person.email}`}>
              {person.email}
              <span aria-hidden className="ml-1">→</span>
            </MagneticButton>
            <MagneticButton href="#hero" variant="ghost">
              Back to Top
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 max-w-xl mx-auto">
            <div className="glass-panel rounded-2xl p-5 border border-white/10 flex items-center justify-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div className="text-left">
                <dt className="font-mono text-[10px] tracking-[0.25em] text-primary uppercase font-bold">
                  Location
                </dt>
                <dd className="text-sm text-foreground font-medium">{person.location}</dd>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-white/10 flex items-center justify-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <div className="text-left">
                <dt className="font-mono text-[10px] tracking-[0.25em] text-primary uppercase font-bold">
                  Email
                </dt>
                <dd className="text-sm text-foreground font-medium truncate max-w-[200px] sm:max-w-xs">{person.email}</dd>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {socials.filter(s => !s.placeholder).map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                className="glass-panel rounded-full px-5 py-2 text-xs font-medium tracking-tight text-muted-foreground transition-colors duration-300 hover:text-primary border border-white/10"
              >
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
