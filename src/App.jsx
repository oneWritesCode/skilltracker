import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import HeroLogo from "./components/HeroLogo";
import Loader from "./components/Loader";
import Hero from "./sections/Hero";
import Numbers from "./sections/Numbers";
import Viral from "./sections/Viral";
import About from "./sections/About";
import Services from "./sections/Services";
import TeamSection from "./sections/TeamSection";
import Originals from "./sections/Originals";
import Clients from "./sections/Clients";
import BarAnimation from "./sections/BarAnimation";
import Footer from "./sections/Footer";
import Form from "./sections/Form";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [logoColor, setLogoColor] = useState("Yellow");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {

      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.01,
      duration: 3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 3,
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const colorMap = {
      White: "#FCFCFC",
      Yellow: "#F5FF8C",
      Dark: "#1A2027",
      Purple: "#AF9FFF",
      Gray: "#C8CDD5",
      Green: "#1F9270",
    };

    const sections = [
      { id: "#hero", color: colorMap.Yellow },
      { id: "#numbers-section", color: colorMap.Yellow },
      { id: "#bar-section", color: colorMap.Dark },
      { id: "#viral-section", color: colorMap.Dark },
      { id: "#about-section", color: colorMap.Green },
      { id: "#team-section", color: colorMap.Green },
      { id: "#services-section", color: colorMap.Yellow },
      { id: "#client-section", color: colorMap.Green },
      { id: "#originals-section", color: colorMap.Yellow },
      { id: "#footer-section", color: colorMap.Yellow },
      { id: "#form-section", color: colorMap.Yellow },
    ];

    sections.forEach((s) => {
      ScrollTrigger.create({
        trigger: s.id,
        start: "top 15%",
        end: "bottom 15%",
        onToggle: (self) => {
          if (self.isActive) {
            setLogoColor(s.color);
          }
        },
      });
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <>
      {/* <Loader isLoading={true} /> */}
      <Loader isLoading={isLoading} />
      <HeroLogo color={logoColor} />
      <Hero id="hero" />
      <Numbers id="numbers-section" />
      <BarAnimation id="bar-section" />
      <Viral id="viral-section" />
      <About id="about-section" />
      <TeamSection id="team-section" />
      <Services id="services-section" />
      <Clients id="client-section" />
      <Originals id="originals-section" />
      <Form id="form-section" />
      <Footer id="footer-section" />
    </>
  );
};

export default App;
