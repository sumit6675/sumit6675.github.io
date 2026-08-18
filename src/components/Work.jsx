import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { experience } from "../data/content";
import { EASE, RevealWords, SectionLabel } from "./primitives";

function Role({ role, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rule py-8">
      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-start justify-between gap-8 text-left"
      >
        <div className="flex-1">
          <div className="label">{role.period}</div>
          <h3 className="display mt-3 text-[9vw] leading-[0.95] transition-colors duration-500 group-hover:text-accent md:text-[4.2vw]">
            {role.role}
          </h3>
          <div className="mt-4 max-w-xl text-[15px] text-ash">{role.summary}</div>
        </div>
        <div className="flex items-center gap-6">
          <span className="label hidden md:block">{role.company}</span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="text-2xl leading-none text-accent"
          >
            +
          </motion.span>
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="overflow-hidden"
      >
        <ul className="mt-8 grid gap-x-12 gap-y-5 md:grid-cols-2">
          {role.highlights.map((point, i) => (
            <motion.li
              key={point}
              initial={{ opacity: 0, y: 14 }}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ delay: open ? i * 0.04 : 0, duration: 0.5, ease: EASE }}
              className="flex gap-4 text-[15px] leading-relaxed text-chalk/75"
            >
              <span className="label mt-1 shrink-0 !text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function Work() {
  const ref = useRef(null);

  return (
    <section id="work" ref={ref} className="relative py-20 md:py-28">
      <div className="px-6 md:px-10">
        <SectionLabel index={3}>Work</SectionLabel>
        <p className="aside mt-4">Click a role. The bullet points do not bite.</p>

        <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display max-w-[16ch] text-[11vw] leading-[0.9] md:text-[6.2vw]">
            <RevealWords text="One product. Nearly four years. Always live." accentRate={0.25} />
          </h2>
          <div className="label md:pb-4">udChalo · Travel-tech & Fintech</div>
        </div>

        <div className="mt-20">
          {experience.map((role, i) => (
            <Role key={role.period} role={role} defaultOpen={i === 0} />
          ))}
          <div className="rule" />
        </div>
      </div>
    </section>
  );
}
