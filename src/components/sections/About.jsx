import {
  HiCodeBracket,
  HiServerStack,
  HiPaintBrush,
  HiRocketLaunch,
} from "react-icons/hi2";
import SectionShell from "../SectionShell";
import { personalInfo, services } from "../../data/profile";

const iconMap = {
  code: HiCodeBracket,
  backend: HiServerStack,
  design: HiPaintBrush,
  performance: HiRocketLaunch,
};

function InfoRow({ label, value }) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="font-semibold text-ink-900">{label}:</span>
      <span className="text-ink-500">{value}</span>
    </div>
  );
}

export default function About() {
  return (
    <SectionShell>
      <h2 className="section-title">
        Sobre <span className="accent">Mí</span>
      </h2>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <p className="text-ink-500 leading-relaxed text-sm md:text-[15px]">
          {personalInfo.bio}
        </p>

        <div className="space-y-3">
          <InfoRow label="Ciudad" value={personalInfo.city} />
          <InfoRow label="País" value={personalInfo.country} />
          <InfoRow label="Correo" value={personalInfo.email} />
          <InfoRow label="Teléfono" value={personalInfo.phone} />
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-semibold text-ink-900">
          Lo que <span className="text-brand-400">hago</span>
        </h3>

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {services.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <article key={s.id} className="flex gap-4">
                <span className="shrink-0 w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center text-xl">
                  {Icon && <Icon />}
                </span>
                <div>
                  <h4 className="font-semibold text-ink-900">{s.title}</h4>
                  <p className="mt-1 text-sm text-ink-500 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
