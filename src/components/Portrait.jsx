import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { profile } from "../data/content";
import { EASE } from "./primitives";

/**
 * Hero portrait: masked reveal on load, scroll parallax, and a slowly rotating
 * caption ring. Kept to ~420px because the source image is 432px square.
 */
export default function Portrait({ ready }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [40, -60]);
  const y = useSpring(rawY, { stiffness: 120, damping: 24, mass: 0.4 });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <motion.div ref={ref} style={{ y }} className="relative w-full max-w-[340px]">
      {/* accent bloom behind the frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 opacity-70"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(224,27,34,0.28) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      <motion.div
        className="group relative aspect-[4/5] overflow-hidden border border-line bg-ink-soft"
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: ready ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
        transition={{ duration: 1.25, ease: EASE, delay: 0.35 }}
      >
        <motion.img
          src={profile.avatar}
          alt="Sumit Chimkar"
          style={{ scale: imageScale }}
          className="h-full w-full object-cover object-center grayscale contrast-[1.15] brightness-[0.92] transition-all duration-700 will-change-transform group-hover:grayscale-0 group-hover:brightness-100"
        />

        {/* duotone + fade so the frame melts into the page */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-color opacity-[0.18]"
          style={{ background: "linear-gradient(180deg,#e01b22 0%,#0a0a0a 100%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: "linear-gradient(to top, #000 0%, transparent 100%)" }}
        />

        {/* scanning highlight */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-24 opacity-0 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(255,255,255,0.09), transparent)",
          }}
          animate={{ y: ["-20%", "420%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
          <span className="label !text-chalk">Pune, IN</span>
          <span className="label !text-accent">EST. 2023</span>
        </div>
      </motion.div>

      {/* rotating caption ring */}
      <motion.div
        className="absolute -bottom-8 -left-28 hidden h-28 w-28 items-center justify-center rounded-full border border-line bg-ink lg:flex"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: ready ? 1 : 0, opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1.15 }}
      >
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <path
              id="ring"
              d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0"
              fill="none"
            />
          </defs>
          <text className="fill-ash" style={{ fontSize: "9px", letterSpacing: "0.22em" }}>
            <textPath href="#ring" startOffset="0%">
              OPEN TO WORK · BACKEND · DISTRIBUTED SYSTEMS ·
            </textPath>
          </text>
        </motion.svg>
        <span className="text-xl text-accent">↓</span>
      </motion.div>
    </motion.div>
  );
}
