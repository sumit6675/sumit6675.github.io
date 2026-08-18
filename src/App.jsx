import { useState } from "react";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Grain from "./components/Grain";
import SectionHUD from "./components/SectionHUD";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Impact from "./components/Impact";
import Stack from "./components/Stack";
import Projects from "./components/Projects";
import Activity from "./components/Activity";
import Awards from "./components/Awards";
import Contact from "./components/Contact";
import Slash from "./components/Slash";

export default function App() {
  const [ready, setReady] = useState(false);
  useSmoothScroll();

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <Grain />
      <Nav />
      <SectionHUD />
      <main>
        <Hero ready={ready} />
        <About />
        <Slash />
        <Work />
        <Impact />
        <Slash flip />
        <Stack />
        <Projects />
        <Slash />
        <Activity />
        <Awards />
        <Contact />
      </main>
    </>
  );
}
