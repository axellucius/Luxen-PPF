"use client";

import { useEffect, useState } from "react";

type Section = { id: string; label: string };

export default function DetailNav({
  sections,
  ctaHref,
  ctaLabel,
}: {
  sections: Section[];
  ctaHref: string;
  ctaLabel: string;
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="sticky top-[72px] z-30 border-b border-line bg-ink/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 sm:px-10">
        <ul className="flex gap-7 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={`flex min-h-11 items-center text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${active === s.id ? "text-silver-50" : "text-white/50 hover:text-white"}`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="btn-chrome hidden min-h-10 shrink-0 items-center rounded-full px-5 text-xs font-semibold lg:inline-flex">
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}