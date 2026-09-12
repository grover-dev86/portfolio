import SectionShell from "../SectionShell";
import {
  education,
  experience,
  designSkills,
  codeSkills,
} from "../../data/studies";

function TimelineItem({ entry }) {
  return (
    <article className="grid grid-cols-[80px_1fr] gap-4 pb-6">
      <div className="text-right">
        <p className="text-xs font-semibold text-ink-900 whitespace-nowrap">
          {entry.year}
        </p>
        <p className="text-[10px] uppercase tracking-wider text-ink-500 mt-1">
          {entry.school || entry.company}
        </p>
      </div>
      <div className="border-l-2 border-brand-100 dark:border-white/10 pl-4 -ml-2">
        <h4 className="font-semibold text-ink-900 text-sm">{entry.title}</h4>
        <p className="text-xs text-ink-500 mt-1 leading-relaxed">
          {entry.description}
        </p>
      </div>
    </article>
  );
}

function SkillBar({ skill }) {
  return (
    <div>
      <div className="flex justify-between items-center text-xs font-medium text-ink-700">
        <span>{skill.name}</span>
        <span className="text-ink-500">{skill.level}%</span>
      </div>
      <div className="mt-1.5 h-1.5 bg-brand-50 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-400 rounded-full animate-grow-bar"
          style={{ "--bar-width": `${skill.level}%`, width: `${skill.level}%` }}
        />
      </div>
    </div>
  );
}

export default function Studies() {
  return (
    <SectionShell>
      <h2 className="section-title">Estudios</h2>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="text-base font-semibold text-ink-900 mb-5">
            Formación
          </h3>
          {education.map((e, i) => (
            <TimelineItem key={i} entry={e} />
          ))}

          <h3 className="text-base font-semibold text-ink-900 mt-4 mb-5">
            Experiencia
          </h3>
          {experience.map((e, i) => (
            <TimelineItem key={i} entry={e} />
          ))}
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-base font-semibold text-ink-900 mb-5">
              Habilidades de <span className="text-brand-400">Diseño</span>
            </h3>
            <div className="space-y-4">
              {designSkills.map((s) => (
                <SkillBar key={s.name} skill={s} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-ink-900 mb-5">
              Habilidades de <span className="text-brand-400">Código</span>
            </h3>
            <div className="space-y-4">
              {codeSkills.map((s) => (
                <SkillBar key={s.name} skill={s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
