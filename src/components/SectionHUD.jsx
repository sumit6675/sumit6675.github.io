import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sections } from "../data/content";

/** Bottom-right readout of the section currently filling the viewport. */
export default function SectionHUD() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = sections.findIndex((s) => s.id === entry.target.id);
          if (i >= 0) setActive(i);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const current = sections[active];

  return (
    <motion.div
      className="pointer-events-none fixed right-6 bottom-6 z-40 hidden items-center gap-3 rounded-full border border-line bg-ink/85 px-4 py-2.5 backdrop-blur-md md:flex"
      animate={{ opacity: active === 0 ? 0 : 1, y: active === 0 ? 12 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="label !text-chalk">
        [ {String(active + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")} ]
      </span>
      <div className="h-3 w-px bg-chalk/40" />
      <div className="relative h-4 w-28 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={current.id}
            className="label absolute inset-0 !text-chalk"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {current.label}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
