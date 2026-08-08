import {
  ExternalLink,
  Globe,
  ArrowRight,
  CheckCircle2,
  Layers,
  Users,
} from "lucide-react";
import { LightRays, Vignette } from "@/components/backgrounds";
import { CharReveal, Eyebrow, Reveal, Section } from "@/components/motion-kit";
import { playUISound } from "@/lib/sound";


// ─────────────────────────────────────────────────────
// ASSET IMPORTS
// ─────────────────────────────────────────────────────
import template1 from "@/assests/school-websites/template1.png";
import template2 from "@/assests/school-websites/template2.png";
import template3 from "@/assests/school-websites/template3.png";
import template4 from "@/assests/school-websites/template4.png";
import template5 from "@/assests/school-websites/template5.png";
import template6 from "@/assests/school-websites/template6.png";

// ─────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────
interface SchoolWebsite {
  id: string;
  name: string;
  image: string;
  liveUrl: string;
  tag: string;
}

const schoolWebsites: SchoolWebsite[] = [
  {
    id: "myivy",
    name: "My Ivy School",
    image: template1,
    liveUrl: "http://myivyschool.com/",
    tag: "Theme Customization",
  },
  {
    id: "drivesmart",
    name: "DriveSmart Academy 360",
    image: template2,
    liveUrl: "https://www.drivesmartacademy360.com/",
    tag: "Theme Customization",
  },
  {
    id: "louisiana",
    name: "Louisiana Driving School",
    image: template3,
    liveUrl: "https://www.louisianadrivingschool.com/",
    tag: "Theme Customization",
  },
  {
    id: "mtpleasant",
    name: "Mt. Pleasant Driving School",
    image: template4,
    liveUrl: "https://www.mtpleasantdrivingschool.com/",
    tag: "Theme Customization",
  },
  {
    id: "driveforward",
    name: "Drive Forward Academy LLC",
    image: template5,
    liveUrl: "https://www.driveforwardacademyllc.com/",
    tag: "Theme Customization",
  },
  {
    id: "excel",
    name: "Excel Driving Academy LA",
    image: template6,
    liveUrl: "https://www.exceldrivingacademyla.com/",
    tag: "Theme Customization",
  },
];

const contributions = [
  {
    num: "01",
    title: "THEME & UI DESIGN",
    desc: "Designed customer-facing website layouts using shared structures while adapting the visual experience to individual school brands.",
  },
  {
    num: "02",
    title: "RESPONSIVE FRONT-END",
    desc: "Developed clean responsive HTML/CSS implementations for desktop, tablet and mobile experiences.",
  },
  {
    num: "03",
    title: "BRAND CUSTOMIZATION",
    desc: "Adapted layouts, colors, imagery, typography and content according to individual customer requirements.",
  },
  {
    num: "04",
    title: "REUSABLE STRUCTURES",
    desc: "Worked within common theme structures and reusable patterns to efficiently support a large customer website ecosystem.",
  },
  {
    num: "05",
    title: "SEO & ACCESSIBILITY",
    desc: "Designed and developed websites with attention to usability, accessibility and SEO fundamentals.",
  },
];

const ecosystemSteps = [
  "CUSTOMER WEBSITE",
  "ONLINE ENROLLMENT",
  "STUDENT PORTAL",
  "DRIVING SCHOOL SOFTWARE",
];

// ─────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────
export function CustomerWebsites() {
  return (
    <Section
      id="customer-websites"
      backdrop={
        <>
          <LightRays />
          <Vignette />
        </>
      }
    >
      {/* ── HEADER ─────────────────────────────────── */}
      <Eyebrow>Customer Website Ecosystem</Eyebrow>
      <CharReveal
        text="Driving School Customer Websites"
        className="font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.05] font-semibold text-foreground"
      />
      <Reveal>
        <div className="mt-3 flex items-center gap-3">
          <span className="font-mono text-xs text-purple-400 font-bold bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/30">
            03 • CUSTOMER WEBSITE ECOSYSTEM
          </span>
        </div>
        <p className="mt-5 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Alongside the core Driving School Software platform, I design and develop customer-facing websites for individual driving schools. These websites share a common theme foundation while allowing each school to have its own branding, content, imagery and visual identity.
        </p>
        <p className="mt-3 max-w-3xl text-sm sm:text-base text-muted-foreground/80 leading-relaxed">
          Working across a large customer ecosystem means balancing reusable structures and efficient delivery with the flexibility required by individual businesses.
        </p>
      </Reveal>

      {/* ── SCALE CALLOUT ──────────────────────────── */}
      <Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {/* 1,000+ stat */}
          <div className="neon-card rounded-2xl p-5 border border-purple-500/30 bg-purple-950/20 flex flex-col items-center text-center">
            <Users className="w-5 h-5 text-purple-400 mb-2" />
            <span className="font-display text-3xl font-bold text-foreground">1,000+</span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-purple-300 uppercase font-bold mt-1">Customer Schools</span>
          </div>

          {/* Shared themes */}
          <div className="neon-card rounded-2xl p-5 border border-cyan-500/30 bg-cyan-950/20 flex flex-col items-center text-center">
            <Layers className="w-5 h-5 text-cyan-400 mb-2" />
            <span className="font-display text-lg font-bold text-foreground leading-tight">Shared Themes</span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-300 uppercase font-bold mt-1">+ Reusable Structures</span>
          </div>

          {/* Individual brand */}
          <div className="neon-card rounded-2xl p-5 border border-teal-500/30 bg-teal-950/20 flex flex-col items-center text-center">
            <Globe className="w-5 h-5 text-teal-400 mb-2" />
            <span className="font-display text-lg font-bold text-foreground leading-tight">Individual</span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-teal-300 uppercase font-bold mt-1">Brand Experiences</span>
          </div>
        </div>
      </Reveal>

      {/* ── ALL 6 CUSTOMER EXPERIENCES GRID ─────── */}
      <Reveal>
        <div className="mt-14 pt-8 border-t border-white/10">
          <h4 className="font-mono text-sm sm:text-base tracking-[0.2em] text-purple-400 uppercase font-bold mb-6 flex items-center gap-2.5">
            <Globe className="w-4 sm:w-5 h-4 sm:h-5 text-purple-400" />
            Customer Websites
          </h4>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {schoolWebsites.map((site) => (
              <div
                key={site.id}
                className="neon-card group rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col"
              >
                {/* Screenshot */}
                <a
                  href={site.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden cursor-pointer block w-full"
                  aria-label={`Visit ${site.name} website`}
                >
                  <img
                    src={site.image}
                    alt={`${site.name} customer website`}
                    className="w-full h-48 sm:h-52 object-cover object-top transition-transform duration-400 group-hover:scale-[1.025]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-black/80 px-3.5 py-1.5 rounded-full border border-cyan-400/50 shadow-lg">
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Visit Website ↗</span>
                    </span>
                  </div>
                </a>

                {/* Card body */}
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-purple-400 uppercase font-bold block mb-1">
                      Customer Website
                    </span>
                    <h5 className="font-display text-sm sm:text-base font-bold text-foreground group-hover:text-cyan-200 transition-colors">
                      {site.name}
                    </h5>
                    <p className="mt-0.5 text-xs text-muted-foreground font-mono">
                      Theme / UI Customization
                    </p>
                  </div>

                  <a
                    href={site.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playUISound}
                    className="mt-2 pt-3 border-t border-white/10 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-200 hover:drop-shadow-[0_0_6px_rgba(0,220,255,0.6)] transition-all duration-200 group/link"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>View Live Website</span>
                    <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── PRODUCT ECOSYSTEM CONNECTION (Text above, Pipeline below) ── */}
      <Reveal>
        <div className="mt-10">
          <div className="neon-card rounded-2xl p-6 sm:p-8 border border-purple-500/30 bg-purple-950/20 backdrop-blur-sm">
            {/* Top Text Section */}
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-purple-400 font-bold bg-purple-950/80 px-3 py-1 rounded-full border border-purple-500/40 inline-block mb-3">
                Part of a Larger Product Ecosystem
              </span>
              <h5 className="font-display text-base sm:text-xl font-bold text-foreground">
                Customer websites are not isolated marketing pages.
              </h5>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                They connect customers and students to the wider software ecosystem through enrollment and student-facing experiences — serving as the primary digital entry point into the full platform.
              </p>
            </div>

            {/* Bottom Pipeline Section */}
            <div className="mt-6 pt-6 border-t border-purple-500/20">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 items-center">
                {ecosystemSteps.map((step, idx) => (
                  <div key={step} className="flex items-center gap-2 sm:gap-4">
                    <div
                      className={`w-full text-center rounded-xl px-3 sm:px-4 py-2.5 border font-mono text-[10px] sm:text-xs font-bold tracking-wider transition-colors ${
                        idx === 0
                          ? "bg-purple-900/60 border-purple-400/60 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                          : idx === ecosystemSteps.length - 1
                          ? "bg-cyan-950/80 border-cyan-400/60 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                          : "bg-slate-900/80 border-white/15 text-slate-300"
                      }`}
                    >
                      {step}
                    </div>
                    {idx < ecosystemSteps.length - 1 && (
                      <span className="hidden sm:inline text-purple-400 text-sm font-bold shrink-0">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── MY CONTRIBUTION ────────────────────────── */}
      <Reveal>
        <div className="mt-14 pt-8 border-t border-white/10">
          <h4 className="font-mono text-sm sm:text-base tracking-[0.2em] text-cyan-400 uppercase font-bold mb-6 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-400" />
            My Contribution
          </h4>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {contributions.map((c) => (
              <div
                key={c.num}
                className="neon-card group rounded-xl p-4 border border-white/10 bg-slate-900/50 hover:border-cyan-500/30 transition-colors"
              >
                <span className="font-mono text-xs font-bold text-cyan-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 block w-fit mb-2">
                  {c.num}
                </span>
                <h5 className="font-display text-xs sm:text-sm font-bold text-foreground group-hover:text-cyan-200 transition-colors">
                  {c.title}
                </h5>
                <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Tech footer */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <p className="font-mono text-xs text-muted-foreground tracking-wide">
              <span className="text-cyan-400 font-bold mr-2">TOOLS &amp; SKILLS</span>
              HTML5 · CSS3 · JavaScript · Responsive Design · Figma · Theme Development · SEO · Accessibility
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
