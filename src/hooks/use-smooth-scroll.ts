import { useEffect } from "react";

/**
 * 100% Native smooth scrolling anchor handler.
 * Completely eliminates Lenis desync & scroll locking bugs when image modals open/close.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

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

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);
}
