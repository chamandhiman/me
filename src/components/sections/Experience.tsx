import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GradientLines, GlowOrbs, Vignette } from "@/components/backgrounds";
import { CharReveal, Eyebrow, Reveal, Section } from "@/components/motion-kit";
import { experience } from "@/data/portfolio";

export function Experience() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start 75%", "end 60%"],
  });
  const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section
      id="experience"
      backdrop={
        <>
          <GradientLines />
          <GlowOrbs count={2} />
          <Vignette />
        </>
      }
    >
      <Eyebrow>Journey</Eyebrow>
      <CharReveal
        text="Professional journey"
        className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.05] font-semibold text-foreground"
      />
      <Reveal delay={0.12}>
        <p className="mt-5 max-w-xl text-sm text-muted-foreground">
          10+ years of creating exceptional digital experiences.
        </p>
      </Reveal>

      <div ref={track} className="relative mt-16 pl-8 md:pl-14">
        <div className="absolute top-0 left-0 h-full w-px bg-border md:left-2" />
        <motion.div
          aria-hidden
          style={{ height: beamHeight }}
          className="absolute top-0 left-0 w-px md:left-2"
        >
          <div
            className="h-full w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--primary) 90%, transparent), color-mix(in oklab, var(--accent) 90%, transparent))",
              boxShadow: "0 0 22px 2px color-mix(in oklab, var(--primary) 45%, transparent)",
            }}
          />
        </motion.div>

        <div className="space-y-16">
          {experience.map((job, i) => (
            <Reveal key={job.role + job.period} delay={i * 0.1}>
              <div className="relative">
                <span
                  className="absolute top-2 -left-8 h-2.5 w-2.5 rounded-full bg-primary md:-left-[3.1rem]"
                  style={{
                    boxShadow: "0 0 0 5px color-mix(in oklab, var(--primary) 16%, transparent)",
                  }}
                />
                <p className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase">
                  {job.period}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-foreground md:text-3xl">
                  {job.role}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {job.companyHref ? (
                    <a
                      href={job.companyHref}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="transition-colors hover:text-primary"
                    >
                      {job.company} ↗
                    </a>
                  ) : (
                    job.company
                  )}
                </p>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-foreground/75">
                  {job.summary}
                </p>
                <ul className="mt-6 grid gap-3 md:grid-cols-2">
                  {job.points.map((pt) => (
                    <li
                      key={pt}
                      className="glass-panel rounded-xl px-4 py-3 text-xs leading-relaxed text-muted-foreground"
                    >
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
