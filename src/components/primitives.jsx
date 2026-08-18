import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

/** Mono section marker: `[ 03 / 09 ]  WORK` */
export function SectionLabel({ index, total = 9, children, className = "", tone = "chalk" }) {
  const onInk = tone === "ink";
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className={`label ${onInk ? "!text-ink" : "text-accent"}`}>
        [ {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")} ]
      </span>
      <span className={`label ${onInk ? "!text-ink/70" : ""}`}>{children}</span>
    </div>
  );
}

/** Deterministic per-word hash, so the same words stay red on every render
 *  instead of flickering to new ones. */
function isAccentWord(word, index, rate) {
  if (!rate) return false;
  let h = index * 2654435761;
  for (let i = 0; i < word.length; i++) h = (h ^ word.charCodeAt(i)) * 16777619;
  return ((h >>> 0) % 1000) / 1000 < rate;
}

/** Word-by-word rise-and-fade. One observer on the container drives every
 *  word, which is both cheaper and more reliable than an observer per word.
 *  `accentRate` scatters a fraction of the words into the accent colour. */
export function RevealWords({
  text,
  className = "",
  delay = 0,
  stagger = 0.022,
  accentRate = 0,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block ${
              isAccentWord(word, i, accentRate) ? "text-accent" : ""
            }`}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: delay + i * stagger }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Hairline that draws itself in from the left when it scrolls into view. */
export function Divider({ className = "" }) {
  return (
    <motion.div
      className={`h-px origin-left bg-line ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EASE }}
    />
  );
}

/** Whole lines masked behind their own overflow box, revealed in sequence.
 *  `play` gates the reveal so it can wait on the preloader. */
export function RevealLines({ lines, className = "", delay = 0, play = true }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "108%" }}
            animate={{ y: play ? "0%" : "108%" }}
            transition={{ duration: 1.1, ease: EASE, delay: play ? delay + i * 0.1 : 0 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Element leans toward the pointer while it is nearby, then springs back. */
export function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  const onMove = (event) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Counts from zero to `value` the first time it scrolls into view. */
export function CountUp({ value, suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const decimals = String(value).includes(".") ? 1 : 0;
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setShown(latest),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Seamless ticker; `speed` is px/second, negative reverses direction. */
export function Marquee({ items, speed = 60, className = "", separator = "◦", separatorClass = "text-accent" }) {
  const trackRef = useRef(null);
  const offset = useRef(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!trackRef.current) return;
    const measure = () => setWidth(trackRef.current.scrollWidth / 2);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items]);

  useAnimationFrame((_, delta) => {
    if (!trackRef.current || !width) return;
    offset.current = (offset.current + (speed * delta) / 1000) % width;
    const shift = speed > 0 ? -offset.current : offset.current - width;
    trackRef.current.style.transform = `translate3d(${shift}px,0,0)`;
  });

  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center whitespace-nowrap">
            {item}
            <span className={`mx-8 ${separatorClass}`}>{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Wraps children in a scroll-linked parallax translation. */
export function Parallax({ children, distance = 80, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export { EASE };
