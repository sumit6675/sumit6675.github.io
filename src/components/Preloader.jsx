import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./primitives";

/** Black curtain with a loading counter; lifts once it reaches 100. */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let raf;
    const started = performance.now();
    const total = 1400;
    const tick = (now) => {
      const progress = Math.min((now - started) / total, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      setCount(Math.round(eased * 100));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setGone(true), 260);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!gone) return;
    document.body.style.overflow = "";
    const t = setTimeout(() => onDone?.(), 700);
    return () => clearTimeout(t);
  }, [gone, onDone]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink px-6 py-8 md:px-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="flex items-baseline justify-between">
            <span className="label">Sumit Chimkar — ©{new Date().getFullYear()}</span>
            <span className="label">Loading — and yes, this counter is real</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <span className="display text-[18vw] leading-none md:text-[12vw]">
              {String(count).padStart(3, "0")}
            </span>
            <span className="label mb-4 hidden md:block">
              Backend · Distributed Systems · Payments
            </span>
          </div>

          <div className="h-px w-full bg-line">
            <motion.div
              className="h-px bg-accent"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
