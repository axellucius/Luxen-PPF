"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "PPF", href: "#collection" },
  { label: "About", href: "#why-luxen" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed left-1/2 top-4 z-50 w-[92%] max-w-3xl -translate-x-1/2 sm:top-6">
      <nav
        className={`flex items-center justify-between gap-6 rounded-full border border-white/10 bg-black/60 px-5 py-3 backdrop-blur-xl transition-shadow duration-300 sm:px-8 ${
          scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.45)]" : ""
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          className="shrink-0 text-lg font-semibold tracking-wide"
        >
          LU<span className="text-gold-400">X</span>EN
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-sm text-white/80 transition-colors duration-200 hover:text-white"
              >
                {link.label}

                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-400 transition-all duration-300 ease-luxe group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-5 bg-white transition-transform duration-300 ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />

          <span
            className={`h-px w-5 bg-white transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />

          <span
            className={`h-px w-5 bg-white transition-transform duration-300 ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`mt-2 overflow-hidden rounded-2xl border border-white/10 bg-black/85 backdrop-blur-xl transition-all duration-300 ease-luxe md:hidden ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col divide-y divide-white/5 px-5 py-2">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm text-white/80 transition-colors hover:text-gold-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}