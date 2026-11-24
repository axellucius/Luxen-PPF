import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import BookCta from "@/components/BookCta";
import Footer from "@/components/Footer";
import ImageOrPlaceholder from "@/components/ImageOrPlaceholder";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { IMAGES } from "@/lib/images";
import { getI18n } from "@/lib/i18n/server";
import { SERVICES } from "@/lib/services-data";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: "Our Services — LUXEN", description: t("sp.meta") };
}

export default async function ServicesPage() {
  const { t, lang } = await getI18n();

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          image={IMAGES.servicesHero}
          eyebrow={t("sp.eyebrow")}
          title={t("sp.title")}
          subtitle={t("sp.sub")}
          breadcrumbs={[{ label: t("crumb.home"), href: "/" }, { label: t("crumb.services") }]}
        />

        <section className="bg-ink py-24 sm:py-32">
          <Container>
            <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2">
              {SERVICES.map((s, i) => (
                <Reveal key={s.slug} delay={(i % 2) * 120}>
                  <Link href={`/services/${s.slug}`} className={`group block ${i % 2 === 1 ? "sm:mt-16" : ""}`}>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line">
                      <ImageOrPlaceholder src={s.cardImage} alt={s.title} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover object-center transition-transform duration-[1200ms] ease-luxe group-hover:scale-105" label={s.shortTitle} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </div>
                    <div className="mt-6 flex items-start gap-5">
                      <span className="font-display text-xl text-silver-500">0{i + 1}</span>
                      <div>
                        <h2 className="font-display text-3xl text-silver-50 transition-colors group-hover:text-white">{s.title}</h2>
                        <p className="mt-2 text-sm text-white/60">{s.tagline[lang]}</p>
                        <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-silver-300 transition-all duration-500 ease-luxe group-hover:gap-4 group-hover:text-white">
                          {t("sd.viewDetails")}
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <BookCta />
      </main>
      <Footer />
    </>
  );
}