"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const HERO_IMAGES: string[] = [
  "/images/hero/Homepage hero.png",
  "/images/hero/Homepage hero 2.png",
  // "/images/hero/hero-3.png",
];

const SLIDE_DURATION = 6000;

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (HERO_IMAGES.length <= 1) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[86vh] w-full items-center overflow-hidden bg-ink"
    >
      <div className="absolute inset-0">
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-luxe ${
              i === active ? "opacity-60" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-20 sm:px-10">
        <div className="max-w-xl animate-fadeSlide sm:ml-auto sm:text-right">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            The <span className="text-gold-400">Ultimate Shield</span> For
            Your Masterpiece
          </h1>

          <p className="mt-5 text-sm leading-relaxed text-white/60 sm:text-base">
            Perlindungan tanpa kompromi untuk mahakarya otomotif Anda. Standar
            kualitas global yang dipadukan dengan presisi tingkat tinggi.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 sm:justify-end">
            <a
              href="#contact"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition-all duration-300 ease-luxe hover:border-white hover:bg-white hover:text-ink"
            >
              Whatsapp kami
            </a>

            <a
              href="#services"
              className="btn-shine rounded-full bg-gold-500 px-6 py-3 text-sm font-medium text-ink transition-all duration-300 ease-luxe hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-[0_10px_30px_rgba(211,169,74,0.35)]"
            >
              Explore Product
            </a>
          </div>
        </div>
      </div>

      {HERO_IMAGES.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-6 bg-gold-400"
                  : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}