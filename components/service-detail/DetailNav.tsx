"use client";

import { useEffect, useState } from "react";

type Section = { id: string; label: string };

export default function DetailNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="sticky top-[92px] z-30 hidden border-b border-line bg-ink/90 backdrop-blur-xl lg:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-10 py-3.5">
        <ul className="flex items-center gap-8">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`text-xs font-medium tracking-wide transition-colors duration-200 ${
                  active === s.id
                    ? "text-gold-400"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://wa.me/6280000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-shine inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2 text-xs font-medium text-ink transition-all duration-300 ease-luxe hover:-translate-y-0.5 hover:bg-gold-400"
        >
          Konsultasi
        </a>
      </div>
    </div>
  );
}