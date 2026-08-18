import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile, education } from "../data/content";
import { RevealWords, SectionLabel } from "./primitives";

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section id="about" ref={ref} className="relative pt-20 pb-8 md:pt-28 md:pb-10">
      <div className="px-6 md:px-10">
        <SectionLabel index={2}>About</SectionLabel>
        <p className="aside mt-4">The part where I talk about myself in the third person. Almost.</p>

        <p className="display mt-14 max-w-6xl text-[8vw] leading-[1.02] md:text-[4.6vw]">
          <RevealWords
            text="Ten thousand feet up or ten thousand rupees moving — the failure modes are the same. I design for them."
            accentRate={0.22}
          />
        </p>

        <div className="mt-20 grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="label">Profile</div>
            <div className="rule mt-3 pt-6 text-[15px] leading-relaxed text-ash">
              <RevealWords text={profile.about} stagger={0.006} />
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-8">
            <div className="label">Education</div>
            <div className="rule mt-3 pt-6">
              <div className="text-2xl text-chalk">{education.degree}</div>
              <div className="mt-2 text-[15px] text-ash">{education.school}</div>
              <div className="label mt-4">
                {education.period} · {education.score}
              </div>
            </div>

            <div className="label mt-12">Currently</div>
            <div className="rule mt-3 space-y-3 pt-6 text-[15px] text-ash">
              <p>Payment orchestration and reconciliation at scale.</p>
              <p>Event-driven notification infrastructure on AWS.</p>
              <p>Cutting the cost of knowing what production is doing.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Oversized drifting wordmark */}
      <motion.div
        aria-hidden
        style={{ x }}
        className="display pointer-events-none mt-16 whitespace-nowrap text-[13vw] leading-[0.85] text-chalk/[0.07]"
      >
        SUMIT CHIMKAR — SUMIT CHIMKAR
      </motion.div>
    </section>
  );
}
