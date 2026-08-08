import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Lenis smooth scrolling for desktop browsers.
 * Automatically disabled on mobile/touch devices and reduced motion for max performance & native touch responsiveness.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth < 768 || "ontouchstart" in window;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Anchor links smooth scroll handler (works on both mobile & desktop)
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = anchor?.getAttribute("href");
      if (!anchor || !hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();

      target.scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("click", onClick);

    // Disable Lenis on mobile/touch devices to preserve 100% native lag-free touch scrolling
    if (isMobile || isReducedMotion) {
      return () => {
        document.removeEventListener("click", onClick);
      };
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}
