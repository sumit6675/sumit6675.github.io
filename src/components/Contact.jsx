import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/content";
import { Magnetic, RevealWords, SectionLabel } from "./primitives";

const socials = [
  { label: "LinkedIn", href: profile.linkedin },
  { label: "GitHub", href: profile.github },
  { label: "Twitter", href: profile.twitter },
];

export default function Contact() {
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden pt-20 md:pt-28">
      <div className="px-6 md:px-10">
        <SectionLabel index={9}>Contact</SectionLabel>
        <p className="aside mt-4">Still here? Then you may as well say hello.</p>

        <h2 className="display mt-14 max-w-[16ch] text-[12vw] leading-[0.9] md:text-[6.8vw]">
          <RevealWords text="Got something hard to build? Let's talk." accentRate={0.25} />
        </h2>

        <Magnetic strength={0.15} className="mt-16 inline-block">
          <a
            href={`mailto:${profile.email}`}
            className="display group inline-flex items-baseline gap-4 text-[7.5vw] leading-none text-chalk transition-colors duration-500 hover:text-accent md:text-[4vw]"
          >
            {profile.email}
            <span className="text-accent transition-transform duration-500 group-hover:translate-x-2">
              ↗
            </span>
          </a>
        </Magnetic>

        <div className="mt-8 flex flex-wrap items-center gap-8">
          <button onClick={copyEmail} className="label transition-colors hover:!text-accent">
            {copied ? "Copied ✓" : "Copy address"}
          </button>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="label transition-colors hover:!text-accent">
            {profile.phone}
          </a>
          <a href={profile.resume} download className="label transition-colors hover:!text-accent">
            Resume ↓
          </a>
        </div>

        <div className="mt-24 grid gap-10 md:grid-cols-4">
          <div>
            <div className="label">Elsewhere</div>
            <div className="rule mt-3 flex flex-col gap-2 pt-5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between text-[15px] text-chalk/80 transition-colors hover:text-accent"
                >
                  {social.label}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="label">Based in</div>
            <div className="rule mt-3 pt-5 text-[15px] text-chalk/80">
              {profile.location}
              <div className="label mt-3">IST — {time}</div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="label">Open to</div>
            <div className="rule mt-3 pt-5 text-[15px] text-chalk/80">
              Backend and full-stack roles with real distributed-systems
              problems — payments, high-throughput APIs, event-driven
              infrastructure and the reliability work around them.
            </div>
          </div>
        </div>
      </div>

      <motion.div
        aria-hidden
        className="display mt-16 select-none text-center text-[16vw] leading-[0.8] text-chalk/[0.07]"
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        SUMIT CHIMKAR
      </motion.div>

      <div className="rule mx-6 flex flex-wrap items-center justify-between gap-4 py-6 md:mx-10">
        <span className="label">© {new Date().getFullYear()} Sumit Chimkar</span>
        <span className="label">Built with React, Vite & Framer Motion</span>
        <a href="#index" className="label transition-colors hover:!text-accent">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
