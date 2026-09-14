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

// La página de inicio vive en "/"; el resto en "/about", "/contact", etc.
function pathToSection(pathname) {
  const seg = pathname.replace(/^\/+|\/+$/g, "");
  if (seg === "") return "home";
  return validSections.includes(seg) ? seg : "home";
}

function sectionToPath(section) {
  return section === "home" ? "/" : `/${section}`;
}

function getInitialSection() {
  return pathToSection(window.location.pathname);
}

function getInitialTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    // localStorage no disponible
  }
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

export default function App() {
  const [activeSection, setActiveSection] = useState(getInitialSection);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // localStorage no disponible
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  useEffect(() => {
    const path = sectionToPath(activeSection);
    if (window.location.pathname !== path) {
      window.history.pushState(null, "", path);
    }
  }, [activeSection]);

  useEffect(() => {
    const onPopState = () => {
      setActiveSection(pathToSection(window.location.pathname));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
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
            bg-white dark:bg-night-card shadow-card rounded-3xl
            flex overflow-hidden
            min-h-[720px] lg:h-[720px]
          "
        >
          <Sidebar
            isMobileOpen={isMenuOpen}
            onCloseMobile={() => setIsMenuOpen(false)}
            activeSection={activeSection}
            onNavigate={handleNavigate}
            theme={theme}
            onToggleTheme={toggleTheme}
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
