import { Aurora, GridFloor, MouseSpotlight, WireGlobe, Vignette } from "@/components/backgrounds";
import { CharReveal, Eyebrow, MagneticButton, Reveal, Section } from "@/components/motion-kit";
import { person, socials } from "@/data/portfolio";

export function Contact() {
  return (
    <Section
      id="contact"
      className="py-32 md:py-44"
      backdrop={
        <>
          <Aurora intensity={0.9} />
          <WireGlobe />
          <GridFloor />
          <MouseSpotlight size={520} />
          <Vignette />
        </>
      }
    >
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Contact</Eyebrow>
        <CharReveal
          gradient
          text="Let's build something worth remembering"
          className="font-display text-[clamp(2.1rem,5.6vw,4.4rem)] leading-[1.02] font-semibold"
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Based in {person.location}, working with teams worldwide. Send a note and I'll get back
            to you.
          </p>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href={`mailto:${person.email}`}>
              {person.email}
              <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton href="#hero" variant="ghost">
              Back to top
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.44}>
          <dl className="mt-16 grid gap-4 sm:grid-cols-3">
            {[
              { k: "Location", v: person.location },
              { k: "Email", v: person.email },
              { k: "Phone", v: person.phone },
            ].map((row) => (
              <div key={row.k} className="glass-panel rounded-2xl px-5 py-6">
                <dt className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase">
                  {row.k}
                </dt>
                <dd className="mt-2.5 text-sm break-words text-foreground/85">{row.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.54}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                className="glass-panel rounded-full px-5 py-2.5 text-xs tracking-tight text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                {s.label}
                {s.placeholder ? " (PLACEHOLDER link)" : ""}
              </a>
            ))}
          </div>
          <p className="mt-6 font-mono text-[10px] tracking-[0.2em] text-muted-foreground/70 uppercase">
            {person.resumeNote}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
