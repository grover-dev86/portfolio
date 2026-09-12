import { navigationItems } from "../data/navigation";

/**
 * Floating vertical icon rail on the right of the card (desktop).
 * Each item exposes a brand-colored tooltip on hover; the tooltip is
 * part of the same button so clicking on it also navigates.
 */
export default function NavRail({ activeSection, onNavigate }) {
  return (
    <nav
      aria-label="Navegación principal"
      className="hidden lg:flex flex-col items-center gap-1 bg-white dark:bg-night-card shadow-rail rounded-full py-4 px-2"
    >
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.id === activeSection;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            aria-label={item.label}
            className={[
              "group relative w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-200",
              isActive
                ? "text-brand-500"
                : "text-ink-500 hover:text-brand-500",
            ].join(" ")}
          >
            <Icon className="text-[26px] relative z-10" />

            <span
              aria-hidden="true"
              className={[
                "absolute right-full top-1/2 -translate-y-1/2 mr-1",
                "px-3 py-1.5 rounded-md",
                "bg-brand-400 text-white text-xs font-medium whitespace-nowrap",
                "shadow-md opacity-0 translate-x-2 scale-95",
                "transition-all duration-200 ease-out",
                "group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100",
                "group-focus-visible:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:scale-100",
              ].join(" ")}
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute left-full top-1/2 -translate-y-1/2 -ml-px w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-brand-400"
              />
            </span>
          </button>
        );
      })}
    </nav>
  );
}
