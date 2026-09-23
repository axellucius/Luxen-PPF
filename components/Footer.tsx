import Image from "next/image";
import Link from "next/link";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "Keunggulan", href: "/#why-luxen" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "6.5 Mil", href: "/#collection" },
      { label: "7.5 Mil", href: "/#collection" },
      { label: "8.5 Mil", href: "/#collection" },
      { label: "10 Mil", href: "/#collection" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "Facebook", href: "#" },
];

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Instagram: (
    <path
      d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm5.5-.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"
      fill="currentColor"
    />
  ),

  TikTok: (
    <path
      d="M14 2h3.2c.3 1.9 1.6 3.4 3.8 3.6v3.1c-1.4 0-2.7-.4-3.8-1.2v6.9a5.6 5.6 0 11-5.6-5.6c.3 0 .6 0 .9.1v3.2a2.4 2.4 0 102 2.4V2z"
      fill="currentColor"
    />
  ),

  Facebook: (
    <path
      d="M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.1c0-.8.2-1.4 1.4-1.4h1.5V5.2c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7v2.1H8.3v2.8h2.4V21h2.8z"
      fill="currentColor"
    />
  ),
};

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink pt-12">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="LUXEN"
                width={130}
                height={38}
                className="h-9 w-auto"
              />
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              The Ultimate Shield For Your Masterpiece. Safeguarding your
              luxury vehicle with precision craftsmanship.
            </p>
          </div>

          {/* Navigation Columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">
                {col.title}
              </h4>

              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors duration-200 hover:text-gold-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Media */}
          <div>
            <h4 className="text-sm font-semibold text-white">Connect</h4>

            <div className="mt-4 flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-white/60 transition-all duration-300 ease-luxe hover:-translate-y-0.5 hover:border-gold-500/50 hover:text-gold-400"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    {SOCIAL_ICONS[social.label]}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-line py-5 text-center text-xs text-white/40">
          ©2026 LUXEN Paint Protection Film. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}