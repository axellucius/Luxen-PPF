"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import ImageOrPlaceholder from "@/components/ImageOrPlaceholder";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { TIERS } from "@/lib/tiers";
import { waLink } from "@/lib/site";

const MAX_MIL = 10;

export default function CollectionTiers() {
  const [i, setI] = useState(1);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tier = TIERS[i];

  const onKeyDown = (e: KeyboardEvent) => {
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % TIERS.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + TIERS.length) % TIERS.length;
    else return;
    e.preventDefault();
    setI(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="tier" className="bg-surface py-24 sm:py-32">
      <Container>
        <p className="eyebrow">Tier Ketebalan</p>
        <h2 className="section-heading mt-5 max-w-2xl">
          Pilih tingkat proteksi yang sesuai kendaraan Anda.
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <div
              role="tablist"
              aria-label="Pilih ketebalan PPF"
              onKeyDown={onKeyDown}
              className="flex gap-6 border-b border-line"
            >
              {TIERS.map((t, idx) => (
                <button
                  key={t.label}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  role="tab"
                  id={`tier-tab-${idx}`}
                  aria-selected={idx === i}
                  aria-controls="tier-panel"
                  tabIndex={idx === i ? 0 : -1}
                  onClick={() => setI(idx)}
                  className={`relative min-h-11 pb-3 text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                    idx === i ? "text-silver-50" : "text-white/50 hover:text-white"
                  }`}
                >
                  {t.mil}
                  <span
                    className={`absolute -bottom-px left-0 h-px bg-silver-200 transition-all duration-500 ease-luxe ${
                      idx === i ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div
              id="tier-panel"
              role="tabpanel"
              aria-labelledby={`tier-tab-${i}`}
              className="pt-10"
            >
              <p className="font-display text-8xl leading-none sm:text-9xl">
                <span className="chrome-text">{tier.mil}</span>
                <span className="ml-3 text-3xl italic text-silver-400">Mil</span>
              </p>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
                {tier.desc}
              </p>

              {/* Relative thickness indicator (thickness / 10 mil) */}
              <div className="mt-8 max-w-md">
                <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] text-silver-400">
                  <span>Ketebalan relatif</span>
                  <span>{tier.label}</span>
                </div>
                <div className="mt-3 h-px w-full bg-white/10">
                  <div
                    className="h-px bg-silver-100 transition-all duration-700 ease-luxe"
                    style={{ width: `${(tier.mil / MAX_MIL) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  href={waLink(`Halo LUXEN, saya tertarik dengan PPF ${tier.label}.`)}
                  external
                >
                  Tanya Tier Ini
                </Button>
                <Link
                  href="/services/ppf"
                  className="inline-flex min-h-11 items-center text-xs uppercase tracking-[0.2em] text-silver-300 transition-colors hover:text-white"
                >
                  Detail PPF →
                </Link>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line lg:aspect-[4/5]">
            {TIERS.map((t, idx) => (
              <div
                key={t.label}
                className={`absolute inset-0 transition-opacity duration-700 ease-luxe ${
                  idx === i ? "opacity-100" : "opacity-0"
                }`}
              >
                <ImageOrPlaceholder
                  src={t.image}
                  alt={`Ilustrasi PPF ${t.label}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-center"
                  label={t.label}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        </div>
      </Container>
    </section>
  );
}