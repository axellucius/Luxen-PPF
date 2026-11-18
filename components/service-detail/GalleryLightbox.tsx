"use client";

import { useEffect, useRef, useState } from "react";
import ImageOrPlaceholder from "@/components/ImageOrPlaceholder";

type GalleryLightboxProps = {
  title: string;
  images: string[];
};

const iconBtn =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:border-silver-200 hover:text-silver-200";

export default function GalleryLightbox({ title, images }: GalleryLightboxProps) {
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const isOpen = open !== null;
  const count = images.length;

  // Lock scroll, move focus in, restore focus on close
  useEffect(() => {
    if (!isOpen) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    return () => {
      document.body.style.overflow = prev;
      lastFocus.current?.focus();
    };
  }, [isOpen]);

  // Keyboard: Esc / arrows / Tab trap
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? 0 : (o + 1) % count));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? 0 : (o - 1 + count) % count));

      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, count]);

  const step = (dir: 1 | -1) =>
    setOpen((o) => (o === null ? 0 : (o + dir + count) % count));

  return (
    <>
      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Perbesar foto ${i + 1}`}
            className="group relative h-64 w-[82%] shrink-0 snap-start overflow-hidden rounded-sm border border-line bg-surface text-left sm:w-[46%] lg:h-80 lg:w-[31%]"
          >
            <ImageOrPlaceholder
              src={src}
              alt={`${title} ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 82vw"
              className="object-cover object-center transition-transform duration-[900ms] ease-luxe group-hover:scale-105"
              label={`Foto ${i + 1}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Galeri ${title}`}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-5 sm:p-10"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            aria-label="Tutup"
            onClick={() => setOpen(null)}
            className={`${iconBtn} absolute right-5 top-5 sm:right-8 sm:top-8`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                aria-label="Foto sebelumnya"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className={`${iconBtn} absolute left-4 sm:left-8`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Foto berikutnya"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className={`${iconBtn} absolute right-4 sm:right-8`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative h-[64vh] w-full max-w-3xl overflow-hidden rounded-sm border border-line"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageOrPlaceholder
              src={images[open]}
              alt={`${title} ${open + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              label={`Foto ${open + 1}`}
            />
          </div>

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/60">
            {open + 1} / {count}
          </span>
        </div>
      )}
    </>
  );
}