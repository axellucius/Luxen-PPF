import Link from "next/link";
import { LevelMeter } from "@/components/ppf/Meters";
import { getI18n } from "@/lib/i18n/server";
import { TIERS, toMm } from "@/lib/tiers";

export default async function TierCompare() {
  const { t, lang } = await getI18n();

  const rows = [
    { label: t("spec.thickness"), cell: (x: (typeof TIERS)[number]) => <span className="font-display text-2xl text-silver-50">{x.label}</span> },
    { label: t("spec.mm"), cell: (x: (typeof TIERS)[number]) => `≈ ${toMm(x.mil)} mm` },
    { label: t("spec.material"), cell: (x: (typeof TIERS)[number]) => x.material[lang] },
    { label: t("ppf.bestFor"), cell: (x: (typeof TIERS)[number]) => x.bestFor[lang] },
    { label: t("spec.level"), cell: (x: (typeof TIERS)[number]) => <LevelMeter level={x.level} label={t("spec.level")} /> },
  ];

  return (
    <div>
      <p className="mb-3 text-xs text-white/50 lg:hidden">{t("ppf.scrollHint")} →</p>
      <div className="overflow-x-auto border-y border-line [scrollbar-width:thin]">
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 w-36 bg-ink p-4" />
              {TIERS.map((x) => (
                <th key={x.slug} scope="col" className="p-4 align-bottom">
                  <Link href={`/services/ppf/${x.slug}`} className="group inline-block">
                    <span className="eyebrow block">{x.name[lang]}</span>
                    <span className="mt-1 block font-display text-xl text-silver-100 transition-colors group-hover:text-white">PPF {x.label} →</span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-line">
                <th scope="row" className="sticky left-0 bg-ink p-4 text-xs font-medium uppercase tracking-[0.15em] text-silver-400">{r.label}</th>
                {TIERS.map((x) => (
                  <td key={x.slug} className="p-4 align-middle text-white/70">{r.cell(x)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}