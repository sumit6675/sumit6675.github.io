import { motion } from "framer-motion";
import { awards } from "../data/content";
import { EASE, SectionLabel } from "./primitives";

export default function Awards() {
  return (
    <section id="awards" className="relative py-20 md:py-28">
      <div className="px-6 md:px-10">
        <SectionLabel index={8}>Awards</SectionLabel>
        <p className="aside mt-4">Bragging, but with dates attached.</p>

        <h2 className="display mt-14 max-w-4xl text-[11vw] leading-[0.9] md:text-[6.2vw]">
          Recognised five times
          <br />
          <span className="text-ash">in three years.</span>
        </h2>

        <div className="mt-16">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              className="group rule flex items-center justify-between gap-6 py-7 transition-colors duration-500 hover:border-accent"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: EASE }}
            >
              <div className="flex items-baseline gap-6">
                <span className="label !text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-2xl transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                  {award.title}
                </span>
              </div>
              <span className="label">{award.year}</span>
            </motion.div>
          ))}
          <div className="rule" />
        </div>
      </div>
    </section>
  );
}
