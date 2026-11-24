"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ImageOrPlaceholder from "@/components/ImageOrPlaceholder";
import { useI18n } from "@/lib/i18n/client";
import { SERVICES } from "@/lib/services-data";
import type { InstallItem } from "@/lib/installations";

type Props = { items: InstallItem[]; variant: "carousel" | "grid" };

const thumb = (i: InstallItem) => (i.type === "video" ? i.poster : i.src);
const serviceName = (slug: string) => SERVICES.find((s) => s.slug === slug)?.shortTitle ?? "";

const chip = (active: boolean) =>
  `min-h-11 rounded-full border px-5 text-xs uppercase tracking-[0.18em] transition-colors duration-300 ${
    active ? "border-silver-100 bg-silver-100 text-ink" : "border-line text-white/70 hover:border-silver-300 hover:text-white"
  }`;

export default function InstallationShowcase({ items, variant }: Props) {
  const { t, lang } = useI18n();
  const [type, setType] = useState<"all" | "video" | "photo">("all");
  const [service, setService] = useState<string>("all");
  const [open, setOpen] = useState<number | null>(null);
  const rail = useRef<HTMLDivElement>(null);

  const list = useMemo(
    () =>
      items.filter(
        (i) => (type === "all" || i.type === type) && (service === "all" || i.service === service)
      ),
    [items, type, service]
  );

  const serviceSlugs = useMemo(() => [...new Set(items.map((i) => i.service))], [items]);
  const carousel = variant === "carousel";
  const step = (d: number) => setOpen((o) => (o === null ? 0 : (o + d + list.length) % list.length));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {(["all", "video", "photo"] as const).map((k) => (
            <button key={k} type="button" aria-pressed={type === k} onClick={() => setType(k)} className={chip(type === k)}>
              {t(k === "all" ? "show.all" : k === "video" ? "show.video" : "show.photo")}
            </button>
          ))}
        </div>

        {carousel && (
          <div className="hidden gap-2 sm:flex">
            {[-1, 1].map((d) => (
              <button
                key={d}
                type="button"
                aria-label={d < 0 ? t("show.prev") : t("show.next")}
                onClick={() => rail.current?.scrollBy({ left: d * (rail.current?.clientWidth ?? 600) * 0.8, behavior: "smooth" })}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-white transition-colors hover:border-silver-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d={d < 0 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        )}
      </div>

      {!carousel && serviceSlugs.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {["all", ...serviceSlugs].map((s) => (
            <button key={s} type="button" aria-pressed={service === s} onClick={() => setService(s)} className={chip(service === s)}>
              {s === "all" ? t("show.all") : serviceName(s)}
            </button>
          ))}
        </div>
      )}

      {list.length === 0 ? (
        <p className="mt-10 text-sm text-white/60">{t("show.empty")}</p>
      ) : (
        <div
          ref={rail}
          className={
            carousel
              ? "mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              : "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4"
          }
        >
          {list.map((item, idx) => {
            const title = item.title[lang];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setOpen(idx)}
                aria-label={t("show.open", { title })}
                className={`group relative aspect-[3/4] overflow-hidden rounded-sm border border-line bg-surface text-left ${
                  carousel ? "w-[68%] shrink-0 snap-start sm:w-[38%] lg:w-[24%]" : "w-full"
                }`}
              >
                <ImageOrPlaceholder
                  src={thumb(item)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 68vw"
                  className="object-cover object-center transition-transform duration-[1200ms] ease-luxe group-hover:scale-105"
                  label={item.type === "video" ? t("show.play") : t("show.photo")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                {item.type === "video" && (
                  <span className="btn-chrome absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                )}

                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="eyebrow block">{serviceName(item.service)}</span>
                  <span className="mt-1 block font-display text-lg leading-tight text-silver-50 sm:text-xl">{title}</span>
                  <span className="mt-0.5 block text-xs text-white/60">{item.vehicle}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      {open !== null && list[open] && (
        <Viewer items={list} index={open} onClose={() => setOpen(null)} onStep={step} />
      )}
    </div>
  );
}

function Viewer({
  items, index, onClose, onStep,
}: { items: InstallItem[]; index: number; onClose: () => void; onStep: (d: number) => void }) {
  const { t, lang } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const item = items[index];

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("button")?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("button");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  const round = "flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-silver-200";

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={t("show.dialog")}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-black/95 p-4"
      onClick={onClose}
    >
      <button type="button" aria-label={t("show.close")} onClick={onClose} className={`${round} absolute right-4 top-4 z-10`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
      </button>

      {items.length > 1 && (
        <>
          <button type="button" aria-label={t("show.prev")} onClick={(e) => { e.stopPropagation(); onStep(-1); }} className={`${round} absolute left-3 top-1/2 z-10 -translate-y-1/2 sm:left-8`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" aria-label={t("show.next")} onClick={(e) => { e.stopPropagation(); onStep(1); }} className={`${round} absolute right-3 top-1/2 z-10 -translate-y-1/2 sm:right-8`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </>
      )}

      {/* Portrait stage (9:16) that always fits the screen */}
      <div
        className="relative h-[80svh] overflow-hidden rounded-sm border border-line bg-black"
        style={{ width: "min(92vw, calc(80svh * 9 / 16))" }}
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "video" ? (
          failed === item.id ? (
            <ImageOrPlaceholder src={item.poster} alt="" fill sizes="90vw" className="object-contain" label={t("show.play")} />
          ) : (
            <video
              key={item.id}
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              playsInline
              loop
              onError={() => setFailed(item.id)}
              className="h-full w-full object-contain"
            />
          )
        ) : (
          <ImageOrPlaceholder src={item.src} alt={item.title[lang]} fill sizes="90vw" className="object-contain" label={t("show.photo")} />
        )}
      </div>

      <p className="text-center text-xs text-white/70" onClick={(e) => e.stopPropagation()}>
        <span className="text-silver-100">{item.title[lang]}</span> · {item.vehicle} · {index + 1} / {items.length}
      </p>
    </div>
  );
}