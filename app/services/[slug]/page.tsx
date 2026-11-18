import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import BookCta from "@/components/BookCta";
import Footer from "@/components/Footer";
import ImageOrPlaceholder from "@/components/ImageOrPlaceholder";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import DetailNav from "@/components/service-detail/DetailNav";
import GalleryLightbox from "@/components/service-detail/GalleryLightbox";

import { SERVICES, getServiceBySlug } from "@/lib/services-data";
import { waLink } from "@/lib/site";

type Params = { slug: string };

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "fitur", label: "Fitur" },
  { id: "spesifikasi", label: "Spesifikasi" },
  { id: "galeri", label: "Galeri" },
  { id: "layanan-lain", label: "Layanan Lain" },
];

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

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
  if (!service) notFound();

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);
  const warranty = service.specs.find((s) => s.label === "Garansi")?.value;
  const consultHref = waLink(
    `Halo LUXEN, saya tertarik dengan layanan ${service.title}.`
  );

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

        <DetailNav sections={SECTIONS} serviceTitle={service.title} />

        {/* Overview */}
        <section id="overview" className="scroll-mt-36 bg-ink py-24 sm:py-32">
          <Container>
            <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
              <Reveal className="relative">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-line">
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
                  <div className="absolute -bottom-5 left-5 border border-line bg-ink/95 px-6 py-4 backdrop-blur">
                    <p className="eyebrow">Garansi</p>
                    <p className="mt-1 font-display text-2xl text-silver-50">
                      {warranty}
                    </p>
                  </div>
                )}
              </Reveal>

              <Reveal delay={120}>
                <p className="eyebrow">Tentang Layanan</p>
                <h2 className="section-heading mt-5">{service.title}</h2>
                <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/70">
                  {service.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {service.specs.slice(0, 2).map((spec) => (
                    <span
                      key={spec.label}
                      className="rounded-full border border-line px-4 py-2 text-xs text-white/70"
                    >
                      {spec.label}:{" "}
                      <span className="font-semibold text-silver-100">
                        {spec.value}
                      </span>
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Button href={consultHref} external>
                    Konsultasi via WhatsApp
                  </Button>
                  <Button href="/services" variant="outline">
                    Lihat Layanan Lain
                  </Button>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Fitur */}
        <section id="fitur" className="scroll-mt-36 bg-surface py-24 sm:py-32">
          <Container>
            <Reveal className="text-center">
              <p className="eyebrow">Keunggulan</p>
              <h2 className="section-heading mt-5">Fitur {service.shortTitle}</h2>
            </Reveal>

            <div className="mt-20 flex flex-col gap-20 lg:gap-28">
              {service.features.map((feature, i) => (
                <Reveal key={feature.title}>
                  <div
                    className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-20 ${
                      i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line">
                      <ImageOrPlaceholder
                        src={service.gallery[i % service.gallery.length]}
                        alt={feature.title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover object-center"
                        label={feature.title}
                      />
                    </div>

                    <div>
                      <span className="font-display text-5xl text-silver-600">
                        0{i + 1}
                      </span>
                      <h3 className="mt-3 font-display text-3xl text-silver-50">
                        {feature.title}
                      </h3>
                      <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Spesifikasi */}
        <section id="spesifikasi" className="scroll-mt-36 bg-ink py-24 sm:py-32">
          <Container>
            <div className="grid grid-cols-2 divide-y divide-line border-y border-line sm:grid-cols-4 sm:divide-x sm:divide-y-0">
              {service.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-col items-center justify-center gap-2 px-4 py-10 text-center"
                >
                  <p className="eyebrow">{spec.label}</p>
                  <p className="font-display text-2xl text-silver-50 sm:text-3xl">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Galeri */}
        <section id="galeri" className="scroll-mt-36 bg-ink pb-24 sm:pb-32">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Galeri</p>
                <h2 className="section-heading mt-5">
                  Hasil {service.shortTitle}
                </h2>
              </div>
              <p className="max-w-xs text-xs text-white/60">
                Geser untuk melihat lebih banyak, atau pilih foto untuk
                memperbesar.
              </p>
            </div>

            <div className="mt-10">
              {/* TODO: gallery uses stock photos; replace with real LUXEN work */}
              <GalleryLightbox title={service.title} images={service.gallery} />
            </div>
          </Container>
        </section>

        {/* Layanan Lainnya */}
        <section id="layanan-lain" className="scroll-mt-36 bg-surface py-24 sm:py-32">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="section-heading">Layanan Lainnya</h2>
              <Link
                href="/services"
                className="inline-flex min-h-11 items-center text-xs uppercase tracking-[0.2em] text-silver-300 transition-colors hover:text-white"
              >
                Lihat Semua →
              </Link>
            </div>

            <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group relative flex h-72 w-[82%] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-sm border border-line p-6 sm:w-[46%] lg:w-[31%]"
                >
                  <ImageOrPlaceholder
                    src={s.cardImage}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 82vw"
                    className="object-cover object-center transition-transform duration-[1200ms] ease-luxe group-hover:scale-105"
                    label={s.shortTitle}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                  <div className="relative z-10">
                    <h3 className="font-display text-2xl text-silver-50">{s.title}</h3>
                    <p className="mt-1 text-xs text-white/70">{s.tagline}</p>
                  </div>
                </Link>
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