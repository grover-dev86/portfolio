import SectionShell from "../SectionShell";
import { profile } from "../../data/profile";

export default function Home() {
  return (
    <SectionShell className="flex items-center justify-center">
      <div className="text-center max-w-xl">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-ink-900">
          {profile.name}
        </h2>
        <p className="mt-4 text-lg text-ink-500">{profile.role}</p>
      </div>
    </SectionShell>
  );
}
