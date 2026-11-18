// Single source of truth for site-wide constants.

export const SITE = {
  name: "LUXEN",
  fullName: "LUXEN Paint Protection Film",
  tagline: "The Ultimate Shield For Your Masterpiece",
  description:
    "Perlindungan tanpa kompromi untuk mahakarya otomotif Anda. Paint Protection Film, Window Car Film, dan Wrapping PET dengan standar kualitas global.",
  // TODO: replace with the real production domain
  url: "https://luxen-ppf.vercel.app",
  // TODO: replace with the official WhatsApp number (format: 62xxxxxxxxxx, no "+")
  whatsapp: "6280000000000",
} as const;

export type Social = { label: "Instagram" | "TikTok" | "Facebook"; href: string };

// TODO: fill the real profile URLs. Empty href = hidden in the footer.
export const SOCIALS: Social[] = [
  { label: "Instagram", href: "" },
  { label: "TikTok", href: "" },
  { label: "Facebook", href: "" },
];

export const NAV_LINKS = [
  { label: "Layanan", href: "/services" },
  { label: "Tier PPF", href: "/#tier" },
  { label: "Home Service", href: "/#home-service" },
  { label: "FAQ", href: "/#faq" },
  { label: "Kontak", href: "/#kontak" },
];

export function waLink(
  message = "Halo LUXEN, saya ingin konsultasi tentang proteksi kendaraan saya."
): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}