import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/content";
import { CountUp, EASE, SectionLabel } from "./primitives";

/** Last-known values so the section never renders empty if the API is
 *  rate-limited or offline. */
const FALLBACK_STATS = { repos: 38, followers: 83, since: 2022 };
const FALLBACK_REPOS = [
  { name: "ApnaBazar", language: "JavaScript", stargazers_count: 1, description: "Full-stack MERN e-commerce platform." },
  { name: "Chargebee-Clone", language: "HTML", stargazers_count: 2, description: "Pixel-accurate marketing site rebuild." },
  { name: "Mailchimp-Clone", language: "JavaScript", stargazers_count: 0, description: "Responsive React build with Chakra UI." },
  { name: "rus-digital-api", language: "JavaScript", stargazers_count: 1, description: "REST API backing the Reliance Digital clone." },
];

export default function Activity() {
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [repos, setRepos] = useState(FALLBACK_REPOS);

  useEffect(() => {
    let cancelled = false;

    fetch("https://api.github.com/users/sumit6675")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => {
        if (cancelled) return;
        setStats({
          repos: d.public_repos ?? FALLBACK_STATS.repos,
          followers: d.followers ?? FALLBACK_STATS.followers,
          since: new Date(d.created_at).getFullYear() || FALLBACK_STATS.since,
        });
      })
      .catch(() => {});

    fetch("https://api.github.com/users/sumit6675/repos?per_page=100&sort=updated")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((list) => {
        if (cancelled || !Array.isArray(list)) return;
        const top = list
          .filter((r) => !r.fork)
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.updated_at) - new Date(a.updated_at)
          )
          .slice(0, 4);
        if (top.length) setRepos(top);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const tiles = [
    { value: stats.repos, label: "Public repositories" },
    { value: stats.followers, label: "Followers" },
    { value: stats.since, label: "On GitHub since", raw: true },
  ];

  return (
    <section id="activity" className="relative py-20 md:py-28">
      <div className="px-6 md:px-10">
        <SectionLabel index={7}>Activity</SectionLabel>

        <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display max-w-[15ch] text-[11vw] leading-[0.9] md:text-[6.2vw]">
            Commits, not
            <br />
            claims.
          </h2>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="label !text-accent md:pb-4"
          >
            github.com/sumit6675 ↗
          </a>
        </div>

        <div className="mt-16 grid gap-px bg-line md:grid-cols-3">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.label}
              className="bg-ink p-8 md:p-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: EASE }}
            >
              <div className="display text-[12vw] leading-none md:text-[3.8vw]">
                {tile.raw ? tile.value : <CountUp value={tile.value} />}
              </div>
              <div className="label mt-5">{tile.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex items-baseline justify-between">
          <span className="label">Public repositories</span>
          <span className="label">Live from the GitHub API</span>
        </div>

        <div className="mt-4">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={`https://github.com/sumit6675/${repo.name}`}
              target="_blank"
              rel="noreferrer"
              className="group rule flex items-center justify-between gap-8 py-6 transition-colors duration-500 hover:border-accent"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ delay: i * 0.06, duration: 0.55, ease: EASE }}
            >
              <div className="min-w-0">
                <div className="flex items-baseline gap-4">
                  <span className="text-xl transition-transform duration-500 group-hover:translate-x-2 md:text-2xl">
                    {repo.name}
                  </span>
                  <span className="label !text-accent">↗</span>
                </div>
                {repo.description && (
                  <p className="mt-2 max-w-2xl truncate text-[15px] text-ash">
                    {repo.description}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-6">
                <span className="label">{repo.language || "—"}</span>
                <span className="label !text-chalk">{repo.stargazers_count} ★</span>
              </div>
            </motion.a>
          ))}
          <div className="rule" />
        </div>

        <p className="mt-8 max-w-2xl text-[15px] text-ash">
          Public repositories are personal projects from 2022–2023. Everything
          since — payment orchestration, distributed services and the
          notification platform — ships to private repositories at udChalo.
        </p>
      </div>
    </section>
  );
}
