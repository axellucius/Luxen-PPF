"use client";

import { useEffect, useState } from "react";
import ImageOrPlaceholder from "@/components/ImageOrPlaceholder";

type GalleryLightboxProps = {
  title: string;
  images: string[];
};

export default function GalleryLightbox({ title, images }: GalleryLightboxProps) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight")
        setOpen((o) => (o === null ? 0 : (o + 1) % images.length));
      if (e.key === "ArrowLeft")
        setOpen((o) => (o === null ? 0 : (o - 1 + images.length) % images.length));
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  return (
    <>
      <div className="flex gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative h-64 w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-surface text-left sm:w-[46%] lg:h-80 lg:w-[31%]"
          >
            <ImageOrPlaceholder
              src={src}
              alt={`${title} ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 82vw"
              className="object-cover object-center transition-transform duration-700 ease-luxe group-hover:scale-110"
              label={`Foto ${i + 1}`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 3H3v6M21 9V3h-6M3 15v6h6M15 21h6v-6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/92 p-5 sm:p-10"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            aria-label="Tutup"
            onClick={() => setOpen(null)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:border-gold-400 hover:text-gold-400 sm:right-8 sm:top-8"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Foto sebelumnya"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((o) => (o === null ? 0 : (o - 1 + images.length) % images.length));
                }}
                className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:border-gold-400 hover:text-gold-400 sm:left-8"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Foto berikutnya"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((o) => (o === null ? 0 : (o + 1) % images.length));
                }}
                className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:border-gold-400 hover:text-gold-400 sm:right-8"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative h-[64vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-line"
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

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/40">
            {open + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}