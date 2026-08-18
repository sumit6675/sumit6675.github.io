import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "../data/content";
import { Magnetic, SectionLabel } from "./primitives";

function Card({ project, i, total, progress }) {
  const targetScale = 1 - (total - i - 1) * 0.04;
  const range = [i * (1 / total), 1];
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-0 flex h-[100svh] items-center justify-center px-6 md:px-10">
      <motion.article
        style={{ scale, top: `calc(-6vh + ${i * 22}px)` }}
        className="relative w-full max-w-6xl overflow-hidden border border-line bg-ink-soft md:min-h-[62vh]"
      >
        <div className="grid md:min-h-[62vh] md:grid-cols-2">
          <div className="flex flex-col justify-between gap-10 p-8 md:p-12">
            <div className="flex items-start justify-between">
              <span className="label text-accent">[ {project.index} ]</span>
              <span className="label">{project.kind}</span>
            </div>

            <div>
              <h3 className="display text-[12vw] leading-[0.9] md:text-[4.6vw]">
                {project.name}
              </h3>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ash">
                {project.blurb}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="label border border-line px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-8">
              <Magnetic>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="label !text-chalk transition-colors hover:!text-accent"
                >
                  Live ↗
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={project.code}
                  target="_blank"
                  rel="noreferrer"
                  className="label !text-chalk transition-colors hover:!text-accent"
                >
                  Source ↗
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="group/img relative min-h-[280px] overflow-hidden border-line md:border-l">
            <motion.img
              src={project.image}
              alt={project.name}
              loading="lazy"
              decoding="async"
              initial={{ scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full scale-[1.02] object-cover object-[center_52%] opacity-45 grayscale brightness-[0.8] contrast-[1.05] transition-all duration-700 group-hover/img:scale-[1.08] group-hover/img:opacity-95 group-hover/img:brightness-100 group-hover/img:grayscale-0"
            />

            {/* Curtain wipe. The image itself is never clipped, so it still
                lazy-loads and still registers with the viewport observer. */}
            <motion.div
              aria-hidden
              className="absolute inset-0 origin-top bg-ink"
              initial={{ scaleY: 1 }}
              whileInView={{ scaleY: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-700 group-hover/img:opacity-25"
              style={{ background: "linear-gradient(215deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 55%, #000 100%)" }}
            />
            <span className="display pointer-events-none absolute right-5 bottom-3 text-[7vw] leading-none text-chalk/10 md:text-[4vw]">
              {project.index}
            </span>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="px-6 md:px-10">
        <SectionLabel index={6}>Projects</SectionLabel>
        <p className="aside mt-4">Built at 2am, deployed at 3am, still up.</p>
        <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display max-w-[15ch] text-[11vw] leading-[0.9] md:text-[6.2vw]">
            Things built
            <br />
            outside the day job.
          </h2>
          <span className="label md:pb-4">
            {projects.length} selected — full-stack, shipped, live
          </span>
        </div>
      </div>

      <div ref={ref} className="relative mt-8">
        {projects.map((project, i) => (
          <Card
            key={project.name}
            project={project}
            i={i}
            total={projects.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
