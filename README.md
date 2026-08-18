# sumit6675.github.io

Personal site for Sumit Chimkar — Software Engineer II (backend, distributed
systems, payments).

Live at **https://sumit6675.github.io**

## Stack

- **Vite** + **React 18**
- **Tailwind CSS v4** (CSS-first config; theme tokens live in `src/index.css`)
- **Framer Motion** for scroll-linked and in-view animation
- **Lenis** for inertial scrolling

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the built output
```

## Deploying

The site is served by GitHub Pages from the `gh-pages` branch:

```bash
npm run deploy   # builds, then pushes dist/ to gh-pages
```

`homepage` in `package.json` and `base` in `vite.config.js` both assume the
site is served from the domain root.

## Content

All copy, roles, metrics, projects and awards live in a single file —
`src/data/content.js`. Editing that file is enough to update the whole page;
no component changes needed.

## Résumé

`public/Sumit_Chimkar_Resume.pdf` is the master résumé PDF, served as-is. The
"Resume" links in the nav, hero and footer all point at it — replacing that one
file updates every link.

`resume/` holds an HTML version of the same content in case a rebuild is ever
wanted:

```bash
npm run resume   # renders resume/resume.html -> resume/build/Sumit_Chimkar_Resume.pdf
```

It writes to `resume/build/` on purpose, so it can never overwrite the master
PDF; copy it into `public/` yourself if you want to publish it. Targets a
single A4 page and needs Chrome (override with `CHROME_PATH`).

## Layout

```
src/
  components/     one file per section, plus shared primitives
    primitives.jsx  RevealWords / RevealLines / Marquee / CountUp / Magnetic / Parallax
  data/content.js all site copy and data
  hooks/          Lenis smooth scroll
resume/           résumé source + PDF build script
```
