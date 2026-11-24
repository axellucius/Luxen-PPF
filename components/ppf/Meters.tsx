import { MAX_MIL, TIERS } from "@/lib/tiers";

export function LevelMeter({ level, label }: { level: number; label: string }) {
  return (
    <div role="img" aria-label={`${label}: ${level}/4`} className="flex gap-1.5">
      {[1, 2, 3, 4].map((n) => (
        <span key={n} className={`h-1 flex-1 transition-colors duration-500 ${n <= level ? "bg-silver-100" : "bg-white/10"}`} />
      ))}
    </div>
  );
}

export function ThicknessBars({ activeSlug }: { activeSlug?: string }) {
  return (
    <ul className="space-y-3">
      {TIERS.map((t) => (
        <li key={t.slug} className="grid grid-cols-[4.5rem_1fr] items-center gap-4">
          <span className={`text-xs uppercase tracking-[0.15em] ${t.slug === activeSlug ? "text-silver-50" : "text-white/50"}`}>{t.label}</span>
          <span className="h-2 bg-white/5">
            <span
              className={`block h-full transition-all duration-700 ease-luxe ${t.slug === activeSlug ? "btn-chrome" : "bg-white/25"}`}
              style={{ width: `${(t.mil / MAX_MIL) * 100}%` }}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}