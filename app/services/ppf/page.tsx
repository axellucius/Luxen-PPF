import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import BookCta from "@/components/BookCta";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ReadMore from "@/components/ui/ReadMore";
import TierExplorer from "@/components/ppf/TierExplorer";
import TierMatcher from "@/components/ppf/TierMatcher";
import TierCompare from "@/components/ppf/TierCompare";
import { getI18n } from "@/lib/i18n/server";
import { getServiceBySlug } from "@/lib/services-data";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  const ppf = getServiceBySlug("ppf");
  return { title: "Paint Protection Film — LUXEN", description: ppf?.tagline[lang] };
}

export default async function PpfPage() {
  const { t, lang } = await getI18n();
  const ppf = getServiceBySlug("ppf");
  if (!ppf) return null;

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          image={ppf.heroImage}
          eyebrow={t("sd.eyebrow")}
          title={ppf.title}
          subtitle={ppf.tagline[lang]}
          breadcrumbs={[
            { label: t("crumb.home"), href: "/" },
            { label: t("crumb.services"), href: "/services" },
            { label: ppf.shortTitle },
          ]}
        />

        <section className="bg-ink py-24 sm:py-32">
          <Container>
            <Reveal className="max-w-2xl">
              <p className="eyebrow">{t("ppf.intro")}</p>
              <div className="mt-6">
                <ReadMore summary={<p className="text-sm leading-relaxed text-white/70">{ppf.description[lang]}</p>}>
                  {ppf.extra[lang].map((p) => (
                    <p key={p} className="text-sm leading-relaxed text-white/70">{p}</p>
                  ))}
                </ReadMore>
              </div>
            </Reveal>
          </Container>
        </section>

        <section id="explorer" className="scroll-mt-24 bg-surface py-24 sm:py-32">
          <Container>
            <p className="eyebrow">{t("ppf.exEyebrow")}</p>
            <h2 className="section-heading mt-5 max-w-2xl">{t("ppf.exHeading")}</h2>
            <div className="mt-14"><TierExplorer /></div>
          </Container>
        </section>

        <section className="bg-ink py-24 sm:py-32">
          <Container>
            <p className="eyebrow">{t("ppf.mEyebrow")}</p>
            <h2 className="section-heading mt-5 max-w-2xl">{t("ppf.mHeading")}</h2>
            <div className="mt-14"><TierMatcher /></div>
          </Container>
        </section>

        <section className="bg-surface py-24 sm:py-32">
          <Container>
            <p className="eyebrow">{t("ppf.cEyebrow")}</p>
            <h2 className="section-heading mt-5 max-w-2xl">{t("ppf.cHeading")}</h2>
            <div className="mt-14"><TierCompare /></div>
          </Container>
        </section>

        <BookCta />
      </main>
      <Footer />
    </>
  );
}