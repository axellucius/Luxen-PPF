"use client";

import Link from "next/link";
import { useState } from "react";
import ImageOrPlaceholder from "@/components/ImageOrPlaceholder";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/services-data";

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="bg-ink py-24 sm:py-32">
      <Container>
        <Reveal>
          <p className="eyebrow">Layanan Kami</p>
          <h2 className="section-heading mt-5 max-w-2xl">
            Empat cara menjaga kemewahan kendaraan Anda.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <ul className="border-b border-line">
            {SERVICES.map((s, i) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-t border-line py-7 transition-colors duration-500 ease-luxe hover:bg-white/[0.02] sm:gap-8"
                >
                  <span className="font-display text-xl text-silver-500 transition-colors group-hover:text-silver-200">
                    0{i + 1}
                  </span>

                  <span className="flex items-center gap-4">
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm lg:hidden">
                      <ImageOrPlaceholder
                        src={s.cardImage}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover"
                        label=""
                      />
                    </span>
                    <span>
                      <span className="block font-display text-2xl text-silver-100 transition-transform duration-500 ease-luxe group-hover:translate-x-2 sm:text-4xl">
                        {s.title}
                      </span>
                      <span className="mt-1 block text-sm text-white/60">
                        {s.tagline}
                      </span>
                    </span>
                  </span>

                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="text-silver-500 transition-all duration-500 ease-luxe group-hover:translate-x-1 group-hover:text-silver-100"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop preview that follows hover/focus */}
          <div className="relative hidden lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-sm border border-line">
              {SERVICES.map((s, i) => (
                <div
                  key={s.slug}
                  className={`absolute inset-0 transition-opacity duration-700 ease-luxe ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <ImageOrPlaceholder
                    src={s.cardImage}
                    alt={s.title}
                    fill
                    sizes="40vw"
                    className="object-cover object-center"
                    label={s.shortTitle}
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}