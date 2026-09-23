
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import BookCta from "@/components/BookCta";
import Footer from "@/components/Footer";
import ImageOrPlaceholder from "@/components/ImageOrPlaceholder";
import DetailNav from "@/components/service-detail/DetailNav";
import GalleryLightbox from "@/components/service-detail/GalleryLightbox";

import { SERVICES, getServiceBySlug } from "@/lib/services-data";

type Params = {
  slug: string;
};

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "fitur", label: "Fitur" },
  { id: "spesifikasi", label: "Spesifikasi" },
  { id: "galeri", label: "Galeri" },
  { id: "layanan-lain", label: "Layanan Lain" },
];

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;

  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.title} — LUXEN`,
    description: service.tagline,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const otherServices = SERVICES.filter(
    (s) => s.slug !== service.slug
  );

  const warranty = service.specs.find(
    (s) => s.label === "Garansi"
  )?.value;

  return (
    <>
      <Navbar />

      <main>
        <PageHero
          image={service.heroImage}
          eyebrow="Our Services"
          title={service.title}
          subtitle={service.tagline}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.shortTitle },
          ]}
        />

        <DetailNav sections={SECTIONS} />

        {/* Overview */}
        <section
          id="overview"
          className="scroll-mt-32 bg-ink py-20 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            <div className="divider-gold mb-14" />

            <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
              {/* Photo */}
              <div className="relative">
                <div className="relative h-80 w-full overflow-hidden rounded-[2rem] border border-line sm:h-[26rem]">
                  <ImageOrPlaceholder
                    src={service.cardImage}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover object-center"
                    label="Foto Produk"
                  />
                </div>

                {warranty && (
                  <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl border border-gold-500/30 bg-ink/95 px-5 py-4 shadow-[0_20px_45px_rgba(0,0,0,0.5)] backdrop-blur">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-white/40">
                        Garansi
                      </p>

                      <p className="text-sm font-semibold text-white">
                        {warranty}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Copy */}
              <div>
                <p className="eyebrow">Tentang Layanan</p>

                <h2 className="section-heading mt-3">
                  {service.title}
                </h2>

                <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/60">
                  {service.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  {service.specs.slice(0, 2).map((spec) => (
                    <div
                      key={spec.label}
                      className="rounded-full border border-line bg-surface px-4 py-2 text-xs text-white/60"
                    >
                      {spec.label}:{" "}
                      <span className="font-medium text-gold-300">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/6280000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shine inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-medium text-ink transition-all duration-300 ease-luxe hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-[0_10px_30px_rgba(211,169,74,0.35)]"
                  >
                    Konsultasi via WhatsApp
                  </a>

                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all duration-300 ease-luxe hover:border-white hover:bg-white hover:text-ink"
                  >
                    Lihat Layanan Lain
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fitur */}
        <section
          id="fitur"
          className="scroll-mt-32 bg-ink py-20 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            <div className="text-center">
              <p className="eyebrow">Keunggulan</p>

              <h2 className="section-heading mt-3">
                Fitur {service.shortTitle}
              </h2>
            </div>

            <div className="mt-16 flex flex-col gap-16 lg:gap-20">
              {service.features.map((feature, i) => (
                <div
                  key={feature.title}
                  className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                    i % 2 === 1
                      ? "lg:[&>*:first-child]:order-2"
                      : ""
                  }`}
                >
                  <div className="relative h-64 overflow-hidden rounded-2xl border border-line sm:h-80">
                    <ImageOrPlaceholder
                      src={`/images/services/${service.slug}-fitur-${i + 1}.png`}
                      alt={feature.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover object-center"
                      label={`Foto ${feature.title}`}
                    />
                  </div>

                  <div>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/10 text-gold-400">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    <h3 className="mt-4 text-xl font-semibold text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spesifikasi */}
        <section
          id="spesifikasi"
          className="scroll-mt-32 bg-ink py-16 sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            <div className="divider-gold mb-12" />

            <div className="grid grid-cols-2 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-surface sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
              {service.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-col items-center justify-center gap-1.5 px-4 py-8 text-center"
                >
                  <p className="text-[11px] uppercase tracking-wide text-white/40">
                    {spec.label}
                  </p>

                  <p className="text-base font-semibold text-gold-300 sm:text-lg">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Galeri */}
        <section
          id="galeri"
          className="scroll-mt-32 bg-ink py-20 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Galeri</p>

                <h2 className="section-heading mt-3">
                  Hasil {service.shortTitle}
                </h2>
              </div>

              <p className="max-w-xs text-xs text-white/40">
                Geser untuk melihat lebih banyak, atau klik foto untuk
                memperbesar.
              </p>
            </div>

            <div className="mt-10">
              <GalleryLightbox
                title={service.title}
                images={service.gallery}
              />
            </div>
          </div>
        </section>

        {/* Layanan Lainnya */}
        <section
          id="layanan-lain"
          className="scroll-mt-32 bg-ink py-16 sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            <div className="divider-gold mb-12" />

            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="section-heading">
                Layanan Lainnya
              </h2>

              <Link
                href="/services"
                className="text-xs font-medium text-gold-400 transition-colors hover:text-gold-300"
              >
                Lihat Semua →
              </Link>
            </div>

            <div className="mt-8 flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group relative flex h-56 w-[82%] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-2xl border border-line p-6 transition-all duration-300 ease-luxe hover:border-gold-500/40 sm:w-[46%] lg:w-[31%]"
                >
                  <ImageOrPlaceholder
                    src={s.cardImage}
                    alt={s.title}
                    fill
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 82vw"
                    className="object-cover object-center transition-transform duration-700 ease-luxe group-hover:scale-110"
                    label={s.shortTitle}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                  <div className="relative z-10">
                    <h3 className="text-lg font-semibold text-white">
                      {s.title}
                    </h3>

                    <p className="mt-1 text-xs text-white/50">
                      {s.tagline}
                    </p>
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
