"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import ImageOrPlaceholder from "@/components/ImageOrPlaceholder";
import Button from "@/components/ui/Button";
import ReadMore from "@/components/ui/ReadMore";
import { LevelMeter, ThicknessBars } from "@/components/ppf/Meters";
import { useI18n } from "@/lib/i18n/client";
import { waLink } from "@/lib/site";
import { TIERS, toMm } from "@/lib/tiers";

export default function TierExplorer() {
  const { t, lang } = useI18n();
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const tier = TIERS[i];

  const onKeyDown = (e: KeyboardEvent) => {
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % TIERS.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + TIERS.length) % TIERS.length;
    else return;
    e.preventDefault();
    setI(next);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={t("ppf.tabs")} onKeyDown={onKeyDown} className="grid grid-cols-4 border-b border-line">
        {TIERS.map((x, idx) => (
          <button
            key={x.slug}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            role="tab"
            id={`ex-tab-${idx}`}
            aria-selected={idx === i}
            aria-controls="ex-panel"
            tabIndex={idx === i ? 0 : -1}
            onClick={() => setI(idx)}
            className={`relative min-h-14 px-2 pb-3 pt-2 text-center transition-colors duration-300 ${idx === i ? "text-silver-50" : "text-white/50 hover:text-white"}`}
          >
            <span className="block font-display text-2xl sm:text-3xl">{x.mil}</span>
            <span className="eyebrow hidden sm:block">{x.name[lang]}</span>
            <span className={`absolute -bottom-px left-0 h-px bg-silver-200 transition-all duration-500 ease-luxe ${idx === i ? "w-full" : "w-0"}`} />
          </button>
        ))}
      </div>

      <div id="ex-panel" role="tabpanel" aria-labelledby={`ex-tab-${i}`} className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <p className="font-display text-7xl leading-none sm:text-8xl">
            <span className="chrome-text">{tier.mil}</span>
            <span className="ml-3 text-2xl italic text-silver-400">Mil</span>
          </p>
          <p className="eyebrow mt-4">{tier.name[lang]} · ≈ {toMm(tier.mil)} mm</p>

          <div className="mt-6 max-w-lg">
            <ReadMore summary={<p className="text-sm leading-relaxed text-white/70">{tier.desc[lang]}</p>}>
              {tier.long[lang].map((p) => (
                <p key={p} className="text-sm leading-relaxed text-white/70">{p}</p>
              ))}
            </ReadMore>
          </div>

          <p className="eyebrow mt-8">{t("ppf.bestFor")}</p>
          <p className="mt-2 font-display text-2xl text-silver-100">{tier.bestFor[lang]}</p>

          <p className="eyebrow mt-8">{t("ppf.highlights")}</p>
          <ul className="mt-3 space-y-2">
            {tier.highlights[lang].map((h) => (
              <li key={h} className="flex items-center gap-3 text-sm text-white/80">
                <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-silver-300" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-8 max-w-sm">
            <p className="eyebrow mb-3">{t("ppf.level")}</p>
            <LevelMeter level={tier.level} label={t("ppf.level")} />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href={waLink(t("wa.tier", { tier: tier.label }))} external>{t("tier.ask")}</Button>
            <Link href={`/services/ppf/${tier.slug}`} className="inline-flex min-h-11 items-center text-xs uppercase tracking-[0.2em] text-silver-300 transition-colors hover:text-white">
              {t("ppf.full")} →
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line">
            {TIERS.map((x, idx) => (
              <div key={x.slug} className={`absolute inset-0 transition-opacity duration-700 ease-luxe ${idx === i ? "opacity-100" : "opacity-0"}`}>
                <ImageOrPlaceholder src={x.image} alt={`PPF ${x.label}`} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-center" label={x.label} />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          <div>
            <p className="eyebrow mb-4">{t("ppf.compareThickness")}</p>
            <ThicknessBars activeSlug={tier.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}