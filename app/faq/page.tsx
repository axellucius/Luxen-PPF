import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import BookCta from "@/components/BookCta";
import Container from "@/components/ui/Container";
import FaqCommunity from "@/components/faq/FaqCommunity";
import { FAQS } from "@/lib/faq";
import { IMAGES } from "@/lib/images";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: "FAQ — LUXEN", description: t("faqp.sub") };
}

export default async function FaqPage() {
  const { t, lang } = await getI18n();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q[lang],
      acceptedAnswer: { "@type": "Answer", text: f.a[lang] },
    })),
  };

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          image={IMAGES.servicesHero}
          eyebrow={t("faq.eyebrow")}
          title={t("faqp.title")}
          subtitle={t("faqp.sub")}
          breadcrumbs={[{ label: t("crumb.home"), href: "/" }, { label: "FAQ" }]}
        />

        <section className="bg-ink py-24 sm:py-32">
          <Container>
            <h2 className="font-display text-3xl text-silver-50">{t("faqp.official")}</h2>
            <div className="mt-8 border-b border-line">
              {FAQS.map((f) => (
                <details key={f.q.en} className="group border-t border-line">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-xl text-silver-100 sm:text-2xl">{f.q[lang]}</span>
                    <span aria-hidden="true" className="text-2xl leading-none text-silver-400 transition-transform duration-500 ease-luxe group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-2xl pb-6 text-sm leading-relaxed text-white/70">{f.a[lang]}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-surface py-24 sm:py-32">
          <Container>
            <FaqCommunity />
          </Container>
        </section>

        <BookCta />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}