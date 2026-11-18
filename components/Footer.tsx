import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { NAV_LINKS, SITE, SOCIALS, waLink } from "@/lib/site";
import { SERVICES } from "@/lib/services-data";

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

const linkCls =
  "text-sm text-white/60 transition-colors duration-300 hover:text-silver-50";

export default function Footer() {
  const socials = SOCIALS.filter((s) => s.href);

  return (
    <footer className="border-t border-line bg-ink pt-16">
      <Container>
        <div className="grid gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="LUXEN beranda">
              <Image
                src="/images/logo.png"
                alt="LUXEN"
                width={131}
                height={34}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-xs font-display text-xl italic leading-snug text-silver-300">
              {SITE.tagline}
            </p>
          </div>

          <div>
            <h4 className="eyebrow">Navigasi</h4>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow">Layanan</h4>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={linkCls}>
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow">Terhubung</h4>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkCls}
                >
                  WhatsApp
                </a>
              </li>
            </ul>
            {socials.length > 0 && (
              <div className="mt-5 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-white/60 transition-all duration-500 ease-luxe hover:-translate-y-0.5 hover:border-silver-300 hover:text-silver-50"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      {SOCIAL_ICONS[s.label]}
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-line py-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} {SITE.fullName}. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
}