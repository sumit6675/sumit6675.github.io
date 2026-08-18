import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis-driven inertial scrolling. Anchor clicks are routed through Lenis so
 * nav jumps share the same easing as a normal wheel scroll.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onAnchorClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    };

    document.addEventListener("click", onAnchorClick);
    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}
