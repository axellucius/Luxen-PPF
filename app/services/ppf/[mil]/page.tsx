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
import ReadMore from "@/components/ui/ReadMore";
import DetailNav from "@/components/service-detail/DetailNav";
import { LevelMeter, ThicknessBars } from "@/components/ppf/Meters";
import { getI18n } from "@/lib/i18n/server";
import { getServiceBySlug } from "@/lib/services-data";
import { waLink } from "@/lib/site";
import { TIERS, getTierBySlug, toMm } from "@/lib/tiers";

type Params = { mil: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { mil } = await params;
  const { lang } = await getI18n();
  const tier = getTierBySlug(mil);
  if (!tier) return {};
  return { title: `PPF ${tier.label} — LUXEN`, description: tier.desc[lang] };
}

export default async function TierPage({ params }: { params: Promise<Params> }) {
  const { mil } = await params;
  const { t, lang } = await getI18n();
  const tier = getTierBySlug(mil);
  if (!tier) notFound();

  const idx = TIERS.findIndex((x) => x.slug === tier.slug);
  const prev = TIERS[(idx - 1 + TIERS.length) % TIERS.length];
  const next = TIERS[(idx + 1) % TIERS.length];
  const others = TIERS.filter((x) => x.slug !== tier.slug);
  const warranty = getServiceBySlug("ppf")?.specs.find((s) => s.label.en === "Warranty")?.value[lang];
  const consult = waLink(t("wa.tier", { tier: tier.label }));

  const sections = [
    { id: "overview", label: t("tp.overview") },
    { id: "highlights", label: t("tp.highlights") },
    { id: "specs", label: t("tp.specs") },
    { id: "compare", label: t("tp.compare") },
  ];

  const specs = [
    { label: t("spec.thickness"), value: tier.label },
    { label: t("spec.mm"), value: `≈ ${toMm(tier.mil)} mm` },
    { label: t("spec.material"), value: tier.material[lang] },
    ...(warranty ? [{ label: t("sd.warranty"), value: warranty }] : []),
  ];

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          image={tier.image}
          eyebrow={tier.name[lang]}
          title={`PPF ${tier.label}`}
          subtitle={tier.desc[lang]}
          breadcrumbs={[
            { label: t("crumb.home"), href: "/" },
            { label: t("crumb.services"), href: "/services" },
            { label: "PPF", href: "/services/ppf" },
            { label: tier.label },
          ]}
        />

        <DetailNav sections={sections} ctaHref={consult} ctaLabel={t("nav.consult")} />

        <section id="overview" className="scroll-mt-36 bg-ink py-24 sm:py-32">
          <Container>
            <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
              <Reveal className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line">
                <ImageOrPlaceholder src={tier.image} alt={`PPF ${tier.label}`} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-center" label={tier.label} />
              </Reveal>

              <Reveal delay={120}>
                <p className="eyebrow">{t("tp.about")}</p>
                <h2 className="section-heading mt-5">PPF {tier.label}</h2>

                <div className="mt-6 max-w-lg">
                  <ReadMore summary={<p className="text-sm leading-relaxed text-white/70">{tier.desc[lang]}</p>}>
                    {tier.long[lang].map((p) => (
                      <p key={p} className="text-sm leading-relaxed text-white/70">{p}</p>
                    ))}
                  </ReadMore>
                </div>

                <p className="eyebrow mt-8">{t("ppf.bestFor")}</p>
                <p className="mt-2 font-display text-2xl text-silver-100">{tier.bestFor[lang]}</p>

                <div className="mt-8 max-w-sm">
                  <p className="eyebrow mb-3">{t("ppf.level")}</p>
                  <LevelMeter level={tier.level} label={t("ppf.level")} />
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Button href={consult} external>{t("nav.consultWa")}</Button>
                  <Button href="/services/ppf" variant="outline">{t("tp.all")}</Button>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <section id="highlights" className="scroll-mt-36 bg-surface py-24 sm:py-32">
          <Container>
            <p className="eyebrow">{t("tp.highlights")}</p>
            <ol className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
              {tier.highlights[lang].map((h, i) => (
                <li key={h} className="bg-surface p-8">
                  <span className="font-display text-4xl text-silver-600">0{i + 1}</span>
                  <p className="mt-4 font-display text-2xl text-silver-50">{h}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section id="specs" className="scroll-mt-36 bg-ink py-24 sm:py-32">
          <Container>
            <div className="grid grid-cols-2 divide-y divide-line border-y border-line sm:grid-cols-4 sm:divide-x sm:divide-y-0">
              {specs.map((s) => (
                <div key={s.label} className="flex flex-col items-center justify-center gap-2 px-4 py-10 text-center">
                  <p className="eyebrow">{s.label}</p>
                  <p className="font-display text-2xl text-silver-50 sm:text-3xl">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="mx-auto mt-14 max-w-xl">
              <p className="eyebrow mb-4">{t("ppf.compareThickness")}</p>
              <ThicknessBars activeSlug={tier.slug} />
            </div>
          </Container>
        </section>

        <section id="compare" className="scroll-mt-36 bg-surface py-24 sm:py-32">
          <Container>
            <h2 className="section-heading">{t("tp.otherH")}</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {others.map((x) => (
                <Link key={x.slug} href={`/services/ppf/${x.slug}`} className="group border border-line p-6 transition-colors duration-500 hover:border-silver-300">
                  <p className="eyebrow">{x.name[lang]}</p>
                  <p className="mt-3 font-display text-5xl">
                    <span className="chrome-text">{x.mil}</span>
                    <span className="ml-2 text-lg italic text-silver-400">Mil</span>
                  </p>
                  <p className="mt-3 text-sm text-white/60">{x.bestFor[lang]}</p>
                </Link>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-xs uppercase tracking-[0.2em]">
              <Link href={`/services/ppf/${prev.slug}`} className="inline-flex min-h-11 items-center text-silver-300 hover:text-white">← {t("tp.prev")}: {prev.label}</Link>
              <Link href={`/services/ppf/${next.slug}`} className="inline-flex min-h-11 items-center text-silver-300 hover:text-white">{t("tp.next")}: {next.label} →</Link>
            </div>
          </Container>
        </section>

        <BookCta />
      </main>
      <Footer />
    </>
  );
}