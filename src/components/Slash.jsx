import { motion } from "framer-motion";
import { EASE } from "./primitives";

/**
 * A diagonal cut that draws itself across the page — the transition between
 * sections. Purely decorative.
 */
export default function Slash({ flip = false }) {
  return (
    <div aria-hidden className="relative h-16 overflow-hidden md:h-24">
      <motion.div
        className="absolute top-1/2 left-0 h-px w-full origin-left"
        style={{
          rotate: flip ? -1.2 : 1.2,
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-accent) 18%, var(--color-accent-soft) 50%, var(--color-accent) 82%, transparent 100%)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.75, ease: EASE }}
      />
      <motion.div
        className="absolute top-1/2 left-0 h-6 w-full origin-left blur-md"
        style={{
          rotate: flip ? -1.2 : 1.2,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(224,27,34,0.35) 50%, transparent 100%)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: [0, 1, 0.35] }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1.1, ease: EASE }}
      />
    </div>
  );
}
