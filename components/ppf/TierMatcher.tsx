"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/client";
import type { MsgKey } from "@/lib/i18n/dict";
import { getTierBySlug } from "@/lib/tiers";

// TODO: owner should confirm these recommendations.
const OPTIONS: { key: MsgKey; slug: string }[] = [
  { key: "ppf.u1", slug: "6-5-mil" },
  { key: "ppf.u2", slug: "7-5-mil" },
  { key: "ppf.u3", slug: "8-5-mil" },
  { key: "ppf.u4", slug: "10-mil" },
];

export default function TierMatcher() {
  const { t, lang } = useI18n();
  const [pick, setPick] = useState<number | null>(null);
  const tier = pick === null ? null : getTierBySlug(OPTIONS[pick].slug);

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
      <div>
        <p className="font-display text-2xl text-silver-100">{t("ppf.mQ")}</p>
        <div role="radiogroup" aria-label={t("ppf.mQ")} className="mt-6 grid gap-3">
          {OPTIONS.map((o, idx) => (
            <button
              key={o.key}
              type="button"
              role="radio"
              aria-checked={pick === idx}
              onClick={() => setPick(idx)}
              className={`flex min-h-14 items-center justify-between gap-4 rounded-sm border px-5 text-left text-sm transition-colors duration-300 ${
                pick === idx ? "border-silver-100 bg-white/5 text-white" : "border-line text-white/70 hover:border-silver-300"
              }`}
            >
              {t(o.key)}
              <span aria-hidden="true" className={`h-3 w-3 rounded-full border ${pick === idx ? "border-silver-100 bg-silver-100" : "border-white/30"}`} />
            </button>
          ))}
        </div>
      </div>

      <div aria-live="polite" className="flex min-h-56 flex-col justify-center border border-line bg-ink p-8">
        {tier ? (
          <>
            <p className="eyebrow">{t("ppf.mResult")}</p>
            <p className="mt-3 font-display text-6xl">
              <span className="chrome-text">{tier.mil}</span>
              <span className="ml-2 text-xl italic text-silver-400">Mil · {tier.name[lang]}</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{tier.desc[lang]}</p>
            <p className="mt-4 text-xs text-white/50">{t("ppf.mNote")}</p>
            <Link href={`/services/ppf/${tier.slug}`} className="mt-5 inline-flex min-h-11 items-center text-xs uppercase tracking-[0.2em] text-silver-300 transition-colors hover:text-white">
              {t("ppf.full")} →
            </Link>
          </>
        ) : (
          <p className="text-sm text-white/50">{t("ppf.mNote")}</p>
        )}
      </div>
    </div>
  );
}