import { createFileRoute } from "@tanstack/react-router";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { person } from "@/data/portfolio";

const title = "Chaman Lal — Sr. UX/UI Designer & Front-End Developer";
const description =
  "Portfolio of Chaman Lal, Sr. UX/UI Designer and Front-End Developer in Chandigarh with 10+ years of experience in UX/UI design, responsive web development and brand identity.";

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
          knowsAbout: ["UX Design", "UI Design", "Front-End Development", "Responsive Design", "SEO"],
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
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
