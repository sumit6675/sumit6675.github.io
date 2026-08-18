import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { sections, profile } from "../data/content";
import { EASE, Magnetic } from "./primitives";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const menu = sections.filter((s) => s.id !== "index");

  // Fade a dark scrim in after the hero so the bar stays legible over the
  // red panels without difference-blending into odd colours.
  const scrim = useTransform(scrollYProgress, [0, 0.04], [0, 1]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-10 border-b border-line/60 bg-ink/70 backdrop-blur-md"
          style={{ opacity: scrim }}
        />
        <div className="flex items-start justify-between px-6 py-6 md:px-10">
          <a href="#index" className="label !text-chalk leading-relaxed">
            SUMIT—
            <br />
            ©{new Date().getFullYear()}
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {menu.slice(0, 5).map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group relative overflow-hidden py-1"
              >
                <span className="label block !text-chalk transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                  {section.label}
                </span>
                <span className="label absolute inset-x-0 top-full block !text-chalk transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                  {section.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href={profile.resume}
              download
              className="label hidden !text-chalk transition-opacity hover:opacity-50 md:block"
            >
              Resume
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="label !text-chalk md:hidden"
              aria-label="Toggle menu"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
        <motion.div
          className="h-px origin-left bg-accent"
          style={{ scaleX: progress }}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-ink px-6"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {menu.map((section, i) => (
              <motion.a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setOpen(false)}
                className="display text-[13vw] leading-[1.05] text-chalk"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: EASE }}
              >
                {section.label}
              </motion.a>
            ))}
            <Magnetic className="mt-10">
              <a href={profile.resume} download className="label !text-accent">
                Download Resume ↓
              </a>
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
