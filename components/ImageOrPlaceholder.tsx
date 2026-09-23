"use client";

import Image from "next/image";
import { useState } from "react";

type ImageOrPlaceholderProps = {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Shown inside the placeholder when the image hasn't been added yet */
  label?: string;
};

/**
 * Drop-in replacement for next/image's <Image>.
 * If `src` 404s (photo not uploaded yet), it quietly renders a branded
 * placeholder instead of a broken-image icon. As soon as a real file is
 * placed at that exact path in /public, this automatically shows the photo
 * — no code changes needed.
 */
export default function ImageOrPlaceholder({
  src,
  alt,
  fill,
  sizes,
  priority,
  className,
  label = "Foto belum ditambahkan",
}: ImageOrPlaceholderProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-line bg-surface text-white/25 ${
          className ?? ""
        }`}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          className="opacity-70"
        >
          <path
            d="M4 7h3l1.5-2h7L17 7h3a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="13" r="3.4" stroke="currentColor" strokeWidth="1.3" />
        </svg>
        <span className="px-3 text-center text-[10px] uppercase tracking-wide">
          {label}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}