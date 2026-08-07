import { createFileRoute } from "@tanstack/react-router";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { PortfolioShowcase } from "@/components/sections/PortfolioShowcase";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { person } from "@/data/portfolio";

const title = "Chaman Lal — UI/UX Designer & Responsive Front-End Developer";
const description =
  "Portfolio of Chaman Lal, Sr. UI/UX Designer and Front-End Developer with 8+ years of continuous product experience across driving school software ecosystems, enterprise dashboards, and responsive web platforms.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: person.name,
          jobTitle: person.role,
          email: `mailto:${person.email}`,
          address: { "@type": "PostalAddress", addressLocality: person.location },
          knowsAbout: ["UX Design", "UI Design", "Front-End Development", "Responsive Design", "Legacy Modernization"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  useSmoothScroll();

  return (
    <div className="dark relative bg-ink text-foreground">
      <Nav />
      <main>
        {/* 1. HERO */}
        <Hero />

        {/* 2. COMPACT EXPERIENCE INTRO */}
        <About />

        {/* 3. SELECTED WORK / FEATURED PROJECTS (MAIN VISUAL CENTERPIECE) */}
        <PortfolioShowcase />

        {/* 4. CORE CAPABILITIES */}
        <Skills />

        {/* 5. PROFESSIONAL JOURNEY */}
        <Experience />

        {/* 6. COMPACT CTA & CONTACT */}
        <Contact />
      </main>
      {/* 7. FOOTER */}
      <Footer />
    </div>
  );
}
