import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Two-part cursor: a small dot that tracks exactly, and a lagging ring that
 * inflates over anything interactive.
 */
export default function Cursor() {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const interactive = event.target.closest(
        "a, button, [data-cursor='hover']"
      );
      setActive(Boolean(interactive));
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: active ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, rotate: active ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        <motion.div
          className="relative rounded-full border"
          animate={{
            width: active ? 54 : 26,
            height: active ? 54 : 26,
            borderColor: active ? "rgba(224,27,34,0.95)" : "rgba(242,242,240,0.45)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          {/* reticle ticks, only while locked on */}
          <motion.span
            className="absolute top-1/2 -left-2 h-px w-2 bg-accent"
            animate={{ opacity: active ? 1 : 0 }}
          />
          <motion.span
            className="absolute top-1/2 -right-2 h-px w-2 bg-accent"
            animate={{ opacity: active ? 1 : 0 }}
          />
          <motion.span
            className="absolute -top-2 left-1/2 h-2 w-px bg-accent"
            animate={{ opacity: active ? 1 : 0 }}
          />
          <motion.span
            className="absolute -bottom-2 left-1/2 h-2 w-px bg-accent"
            animate={{ opacity: active ? 1 : 0 }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
