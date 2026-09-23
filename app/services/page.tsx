import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import BookCta from "@/components/BookCta";
import Footer from "@/components/Footer";
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
          image="/images/services/services-hero.png"
          title="Our Services"
          subtitle="Solusi perlindungan dan estetika premium untuk kemewahan kendaraan Anda."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        />

        <section className="bg-ink py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            <div className="divider-gold mb-14" />

            <div className="text-center">
              <p className="eyebrow">Layanan Kami</p>
              <h2 className="section-heading mt-3">Our Services</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/55">
                Jaga kilau dan proteksi mobil mewah Anda dengan standar
                tertinggi. Pilih layanan yang sesuai dengan kebutuhan
                kendaraan Anda.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 ease-luxe hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={service.cardImage}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-center transition-transform duration-700 ease-luxe group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-semibold text-white">
                      {service.title}
                    </h3>

                    <p className="mt-2 flex-1 text-xs leading-relaxed text-white/50">
                      {service.tagline}
                    </p>

                    <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-gold-500 px-4 py-2 text-xs font-medium text-ink transition-all duration-300 ease-luxe group-hover:gap-2.5 group-hover:bg-gold-400">
                      Detail
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <BookCta />
      </main>

      <Footer />
    </>
  );
}