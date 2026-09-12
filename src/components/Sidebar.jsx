import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { HiSun, HiMoon } from "react-icons/hi2";
import { profile } from "../data/profile";
import { navigationItems } from "../data/navigation";

const socialIcons = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
};

/**
 * Profile sidebar — visible always on desktop (>=lg).
 * On mobile it becomes a slide-in drawer with full nav links.
 */
export default function Sidebar({
  isMobileOpen,
  onCloseMobile,
  activeSection,
  onNavigate,
  theme,
  onToggleTheme,
}) {
  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={onCloseMobile}
          className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm z-30 lg:hidden animate-fade-in"
        />
      )}

      <aside
        className={[
          "bg-brand-400 dark:bg-brand-600 text-white flex flex-col items-center",
          "px-6 py-8 lg:rounded-l-3xl",
          "fixed lg:static top-0 right-0 h-full w-80 max-w-[85%] z-40",
          "transition-transform duration-300 ease-out",
          "lg:translate-x-0 lg:w-72 lg:h-auto lg:self-stretch",
          isMobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
          title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
          className="absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/15 transition"
        >
          {theme === "dark" ? <HiSun className="text-lg" /> : <HiMoon className="text-lg" />}
        </button>

        {isMobileOpen && (
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={onCloseMobile}
            className="absolute top-4 right-4 text-white/90 hover:text-white text-2xl lg:hidden"
          >
            ×
          </button>
        )}

        <div className="flex-1 flex flex-col items-center justify-center text-center w-full">
          <div className="relative">
            <span className="absolute -inset-2 rounded-full border-2 border-dashed border-white/40 animate-[spin_24s_linear_infinite]" />
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-32 h-32 lg:w-36 lg:h-36 rounded-full object-cover ring-4 ring-white/60 shadow-lg"
            />
          </div>

          <h1 className="mt-5 text-2xl text-white/85 font-semibold tracking-tight">
            {profile.name}
          </h1>
          <p className="mt-1 text-sm text-white/85 font-light">
            {profile.role}
          </p>

          {/* Mobile-only nav list */}
          <nav className="lg:hidden mt-6 flex flex-col items-center gap-3 text-base">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={[
                  "transition-colors",
                  activeSection === item.id
                    ? "text-white font-medium"
                    : "text-white/75 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <ul className="mt-5 flex items-center gap-4">
            {profile.social.map((s) => {
              const Icon = socialIcons[s.id];
              return (
                <li key={s.id}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="text-white/90 hover:text-white transition-colors text-lg"
                  >
                    {Icon && <Icon />}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href={profile.cvUrl}
            download
            className="pill-btn mt-8"
          >
            Descargar CV
          </a>
        </div>

        <p className="text-[11px] text-white/75 tracking-wide mt-8">
          {profile.footer}
        </p>
      </aside>
    </>
  );
}
