import type { MsgKey } from "@/lib/i18n/dict";

export const SITE = {
  name: "LUXEN",
  fullName: "LUXEN Paint Protection Film",
  tagline: "The Ultimate Shield For Your Masterpiece",
  // TODO: replace with the real production domain
  url: "https://luxen-ppf.vercel.app",
  // TODO: official WhatsApp number (format: 62xxxxxxxxxx, no "+")
  whatsapp: "6281235424229",
} as const;

export type Social = { label: "Instagram" | "TikTok" | "Facebook"; href: string };

// TODO: fill the real profile URLs. Empty href = hidden in the footer.
export const SOCIALS: Social[] = [
  { label: "Instagram", href: "https://www.instagram.com/luxen.ppf/" },
  { label: "TikTok", href: "https://www.tiktok.com/@luxen.ppf" },
  { label: "Facebook", href: "https://www.facebook.com/luxen.ppf" },
];

export const NAV_LINKS: { key: MsgKey; href: string }[] = [
  { key: "nav.services", href: "/services" },
  { key: "nav.tiers", href: "/services/ppf" },
  { key: "nav.installations", href: "/installations" },
  { key: "nav.faq", href: "/faq" },
  { key: "nav.contact", href: "/#kontak" },
];

export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}