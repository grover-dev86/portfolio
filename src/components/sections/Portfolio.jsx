import { useMemo, useState } from "react";
import SectionShell from "../SectionShell";
import { portfolioFilters, portfolioItems } from "../../data/portfolio";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = useMemo(() => {
    if (activeFilter === "all") return portfolioItems;
    return portfolioItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <SectionShell>
      <h2 className="section-title">Portafolio</h2>

      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-b border-ink-300/30 pb-3">
        {portfolioFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActiveFilter(f.id)}
            className={[
              "filter-chip",
              activeFilter === f.id ? "is-active" : "",
            ].join(" ")}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-ink-500 text-sm">
          No hay proyectos en esta categoría todavía.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <a
              key={item.id}
              href={item.url}
              className="group block animate-fade-up"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-brand-50">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h4 className="mt-3 text-sm font-medium text-ink-900 group-hover:text-brand-500 transition-colors">
                {item.title}
              </h4>
            </a>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
