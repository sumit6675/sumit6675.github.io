import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile, marquee } from "../data/content";
import { EASE, Magnetic, Marquee, RevealLines } from "./primitives";
import Portrait from "./Portrait";

const meta = [
  ["Now", "Software Engineer II, udChalo"],
  ["Depth", "Nearly 4 years in production"],
  ["Base", profile.location],
  ["Stack", "Node · TypeScript · React · AWS"],
];

export default function Hero({ ready }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section
      id="index"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 pb-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(65% 55% at 50% 0%, rgba(224,27,34,0.22) 0%, rgba(0,0,0,0) 70%)",
        }}
      />
      <div aria-hidden className="seams pointer-events-none absolute inset-0 opacity-100" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage: "radial-gradient(72% 62% at 50% 40%, #000 0%, transparent 100%)",
        }}
      />

      <motion.div style={{ y, opacity, scale }} className="relative px-6 md:px-10">
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <div className="label !text-chalk">
            {profile.role}
            <span className="mx-2 text-accent">/</span>
            Available for hard problems
          </div>
        </motion.div>

        <div className="mt-10 grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <h1 className="display text-[13.5vw] leading-[0.85] lg:col-span-8 lg:text-[7.6vw]">
            <RevealLines lines={profile.statement} delay={0.2} play={ready} />
          </h1>

          <div className="flex justify-start lg:col-span-4 lg:justify-end">
            <Portrait ready={ready} />
          </div>
        </div>

        <motion.div
          className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4"
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ delay: 0.75, duration: 0.9, ease: EASE }}
        >
          {meta.map(([k, v]) => (
            <div key={k} className="border-t border-line pt-4">
              <div className="label text-accent">{k}</div>
              <div className="mt-2 text-[15px] text-chalk/80">{v}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ delay: 0.95, duration: 0.8 }}
        >
          <Magnetic strength={0.25}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full border border-chalk/25 px-7 py-3.5 text-sm transition-colors duration-500 hover:border-accent hover:bg-accent hover:text-white"
            >
              Get in touch
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a href={profile.resume} download className="label transition-colors hover:!text-accent">
              Download resume ↓
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 1.1, duration: 1 }}
      >
        <div className="rule" />
        <Marquee items={marquee} speed={55} className="label !text-chalk/70 py-4" />
        <div className="rule" />
        <div className="flex items-center justify-between px-6 pt-5 md:px-10">
          <span className="aside">Keep scrolling. The good part is further down.</span>
          <motion.span
            className="label !text-accent"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
