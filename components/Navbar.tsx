"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS, waLink } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close on Escape while the mobile overlay is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ease-luxe ${
          scrolled && !open
            ? "border-line bg-ink/80 backdrop-blur-xl"
            : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-6 sm:px-10">
          <Link href="/" onClick={() => setOpen(false)} className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="LUXEN"
              width={131}
              height={34}
              priority
              className="h-8 w-auto"
            />
          </Link>

          <nav aria-label="Navigasi utama" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group relative text-xs uppercase tracking-[0.2em] text-white/75 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                    <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-silver-200 transition-all duration-500 ease-luxe group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-chrome hidden min-h-11 items-center rounded-full px-6 text-xs font-semibold tracking-wide md:inline-flex"
            >
              Konsultasi
            </a>

            <button
              type="button"
              aria-label={open ? "Tutup menu" : "Buka menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
            >
              <span
                className={`h-px w-6 bg-white transition-transform duration-500 ease-luxe ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-6 bg-white transition-transform duration-500 ease-luxe ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile overlay (sibling of header so blur doesn't clip it) */}
      <div
        inert={!open}
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-ink/95 px-8 backdrop-blur-2xl transition-opacity duration-500 ease-luxe lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-2">
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.href}
              className="transition-all duration-700 ease-luxe"
              style={{
                transitionDelay: open ? `${120 + i * 70}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(16px)",
              }}
            >
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 font-display text-4xl text-silver-100 transition-colors hover:text-white sm:text-5xl"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-chrome mt-10 inline-flex min-h-12 w-fit items-center rounded-full px-8 text-sm font-semibold"
        >
          Konsultasi via WhatsApp
        </a>
      </div>
    </>
  );
}