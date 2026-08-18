import { motion } from "framer-motion";
import { stack, marquee } from "../data/content";
import { EASE, Marquee, SectionLabel } from "./primitives";

export default function Stack() {
  return (
    <section id="stack" className="relative py-20 md:py-28">
      <div className="px-6 md:px-10">
        <SectionLabel index={5}>Stack</SectionLabel>
        <p className="aside mt-4">Yes, every portfolio has this section. Mine is at least honest.</p>
        <h2 className="display mt-14 max-w-4xl text-[11vw] leading-[0.9] md:text-[6.2vw]">
          Tools are cheap.
          <br />
          <span className="text-ash">Knowing when not to use them isn't.</span>
        </h2>
      </div>

      <div className="seams mt-16 border-y border-accent bg-accent py-5 text-ink">
        <Marquee
          items={marquee}
          speed={-70}
          className="display text-[8vw] leading-none md:text-[3.4vw]"
          separator="/"
          separatorClass="text-ink/45"
        />
      </div>

      <div className="mt-16 px-6 md:px-10">
        <div className="grid gap-px bg-line md:grid-cols-2">
          {stack.map((group, i) => (
            <motion.div
              key={group.group}
              className="group bg-ink p-8 md:p-10"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: (i % 2) * 0.06, duration: 0.6, ease: EASE }}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl text-chalk">{group.group}</h3>
                <span className="label">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="label rounded-full border border-line px-3 py-1.5 transition-colors duration-300 hover:border-accent hover:!text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="rule mt-10 pt-6">
          <span className="label">
            AI-assisted development —
            <span className="text-accent"> Claude Code</span>, OpenAI Codex, Cursor
          </span>
        </div>
      </div>
    </section>
  );
}
