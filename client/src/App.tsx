import { useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ThreeScene from "./components/ThreeScene";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { isDarkMode } = useTheme();
  const topRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`${isDarkMode ? 'matrix-bg' : 'bg-gray-50'} min-h-screen relative`}>
      <div ref={topRef} id="top"></div>
      <Navbar 
        onLogoClick={scrollToTop}
        onAboutClick={() => scrollToSection(aboutRef)}
        onExperienceClick={() => scrollToSection(experienceRef)}
        onProjectsClick={() => scrollToSection(projectsRef)}
        onContactClick={() => scrollToSection(contactRef)}
      />
      <ThreeScene />
      <Hero onContactClick={() => scrollToSection(contactRef)} onProjectsClick={() => scrollToSection(projectsRef)} />
      <div ref={aboutRef}>
        <About />
      </div>
      <div ref={experienceRef}>
        <Experience />
      </div>
      <div ref={projectsRef}>
        <Projects />
      </div>
      <Blog />
      <div ref={contactRef}>
        <Contact />
      </div>
      <Footer onLogoClick={scrollToTop} />
    </div>
  );
}

export default App;
