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
import { SERVICES } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Our Services — LUXEN",
  description:
    "Solusi perlindungan dan estetika premium untuk kemewahan kendaraan Anda: Paint Protection Film, Window Car Film, Wrapping PET, dan PPF Color.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main>
        <PageHero
          image={IMAGES.servicesHero}
          eyebrow="Layanan Kami"
          title="Our Services"
          subtitle="Solusi perlindungan dan estetika premium untuk kemewahan kendaraan Anda."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        />

        <section className="bg-ink py-24 sm:py-32">
          <Container>
            <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2">
              {SERVICES.map((s, i) => (
                <Reveal key={s.slug} delay={(i % 2) * 120}>
                  <Link
                    href={`/services/${s.slug}`}
                    className={`group block ${i % 2 === 1 ? "sm:mt-16" : ""}`}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line">
                      <ImageOrPlaceholder
                        src={s.cardImage}
                        alt={s.title}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover object-center transition-transform duration-[1200ms] ease-luxe group-hover:scale-105"
                        label={s.shortTitle}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </div>

                    <div className="mt-6 flex items-start gap-5">
                      <span className="font-display text-xl text-silver-500">
                        0{i + 1}
                      </span>
                      <div>
                        <h2 className="font-display text-3xl text-silver-50 transition-colors group-hover:text-white">
                          {s.title}
                        </h2>
                        <p className="mt-2 text-sm text-white/60">{s.tagline}</p>
                        <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-silver-300 transition-all duration-500 ease-luxe group-hover:gap-4 group-hover:text-white">
                          Lihat Detail →
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