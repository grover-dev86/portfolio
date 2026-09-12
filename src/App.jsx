import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import NavRail from "./components/NavRail";
import MobileMenuButton from "./components/MobileMenuButton";
import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Studies from "./components/sections/Studies";
import Portfolio from "./components/sections/Portfolio";
import Blog from "./components/sections/Blog";
import Contact from "./components/sections/Contact";

const sectionMap = {
  home: Home,
  about: About,
  studies: Studies,
  portfolio: Portfolio,
  blog: Blog,
  contact: Contact,
};

const validSections = Object.keys(sectionMap);

function getInitialSection() {
  const hash = window.location.hash.replace("#", "");
  return validSections.includes(hash) ? hash : "home";
}

export default function App() {
  const [activeSection, setActiveSection] = useState(getInitialSection);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.location.hash = activeSection;
  }, [activeSection]);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (validSections.includes(hash)) setActiveSection(hash);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleNavigate = (id) => {
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  const ActiveSection = sectionMap[activeSection] ?? Home;

  return (
    <div className="bg-dots-tl min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <MobileMenuButton hidden={isMenuOpen} onClick={() => setIsMenuOpen(true)} />

      <div className="flex items-start gap-4 w-full max-w-[1400px] justify-center">
        <main
          className="
            relative z-10 w-full max-w-[1280px]
            bg-white shadow-card rounded-3xl
            flex overflow-hidden
            min-h-[720px] lg:h-[720px]
          "
        >
          <Sidebar
            isMobileOpen={isMenuOpen}
            onCloseMobile={() => setIsMenuOpen(false)}
            activeSection={activeSection}
            onNavigate={handleNavigate}
          />

          <section
            key={activeSection}
            className="flex-1 min-w-0 relative"
            aria-live="polite"
          >
            <ActiveSection />
          </section>
        </main>

        <div className="hidden lg:block relative z-20 shrink-0">
          <NavRail
            activeSection={activeSection}
            onNavigate={handleNavigate}
          />
        </div>
      </div>
    </div>
  );
}
