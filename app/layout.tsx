import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { I18nProvider } from "@/lib/i18n/client";
import { getI18n } from "@/lib/i18n/server";
import { SITE } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { lang, t } = await getI18n();
  const title = `${SITE.name} — ${SITE.tagline}`;
  return {
    metadataBase: new URL(SITE.url),
    title: { default: title, template: "%s" },
    description: t("hero.sub"),
    openGraph: {
      type: "website",
      locale: lang === "id" ? "id_ID" : "en_US",
      siteName: SITE.name,
      title,
      description: t("hero.sub"),
    },
    twitter: { card: "summary_large_image", title, description: t("hero.sub") },
  };
}

export const viewport: Viewport = { themeColor: "#050506" };

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { lang, messages, t } = await getI18n();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.fullName,
    url: SITE.url,
    description: t("hero.sub"),
    // TODO: upgrade to LocalBusiness once address & hours are confirmed
  };

  return (
    <html lang={lang} className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="bg-ink font-sans text-white antialiased">
        <I18nProvider lang={lang} messages={messages}>
          {children}
          <FloatingWhatsApp message={t("wa.default")} label={t("wa.floating")} />
        </I18nProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
