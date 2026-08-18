import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { metrics } from "../data/content";
import { CountUp, EASE, SectionLabel } from "./primitives";

export default function Impact() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.22, 0.05]);

  return (
    <section id="impact" ref={ref} className="relative overflow-hidden bg-accent py-20 text-ink md:py-28">
      <motion.div
        aria-hidden
        className="seams pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-multiply"
        style={{ opacity: glow }}
      />

      <div className="relative px-6 md:px-10">
        <SectionLabel index={4} tone="ink">Impact</SectionLabel>
        <p className="aside mt-4 !text-ink/70">Numbers from production. Not from a pitch deck.</p>

        <div className="mt-12 grid gap-px border border-ink/25 bg-ink/25 md:grid-cols-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              className="group bg-accent p-8 transition-colors duration-500 hover:bg-accent-deep md:p-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: EASE }}
            >
              <div className="label !text-ink/70">
                [ {String(i + 1).padStart(2, "0")} ]
              </div>
              <div className="display mt-8 text-[17vw] leading-none md:text-[5.4vw]">
                <CountUp value={metric.value} suffix={metric.suffix} />
              </div>
              <div className="mt-6 text-[15px] text-ink/75 transition-colors duration-500 group-hover:text-chalk">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 text-[15px] text-ink/80 md:grid-cols-3">
          <p>
            <span className="font-semibold text-ink">$3,000</span> saved annually by
            replacing the observability stack with Prometheus and Dash0.
          </p>
          <p>
            <span className="font-semibold text-ink">$1,000</span> saved monthly through a
            Redis Enterprise migration and platform-wide Node.js upgrades.
          </p>
          <p>
            <span className="font-semibold text-ink">15%</span> fewer booking failures after
            reworking airline session handling and retry logic.
          </p>
        </div>
      </div>
    </section>
  );
}
