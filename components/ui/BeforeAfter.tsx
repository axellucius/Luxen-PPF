"use client";

import { useState } from "react";
import ImageOrPlaceholder from "@/components/ImageOrPlaceholder";

export default function BeforeAfter({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-sm border border-line sm:aspect-[16/9]">
      {/* After: original image */}
      <ImageOrPlaceholder
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 1000px, 100vw"
        className="object-cover object-center"
        label="Foto sesudah"
      />

      {/* Before: dulled version, clipped from the left */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <ImageOrPlaceholder
          src={src}
          alt=""
          fill
          sizes="(min-width: 1024px) 1000px, 100vw"
          className="object-cover object-center [filter:saturate(0.45)_brightness(0.72)_contrast(0.9)]"
          label="Foto sebelum"
        />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/80 backdrop-blur">
        Sebelum
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/80 backdrop-blur">
        Sesudah
      </span>

      {/* Divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-silver-100"
        style={{ left: `${pos}%` }}
      >
        <span className="btn-chrome absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9 6l-6 6 6 6M15 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {/* Invisible range input handles mouse, touch and keyboard */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Geser untuk membandingkan sebelum dan sesudah"
        className="absolute inset-0 h-full w-full cursor-ew-resize touch-pan-y opacity-0"
      />
    </div>
  );
}