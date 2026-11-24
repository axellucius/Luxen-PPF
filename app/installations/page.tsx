import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import BookCta from "@/components/BookCta";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import InstallationShowcase from "@/components/InstallationShowcase";
import { IMAGES } from "@/lib/images";
import { INSTALLATIONS } from "@/lib/installations";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: "Installation Showcase — LUXEN", description: t("show.pageSub") };
}

export default async function InstallationsPage() {
  const { t } = await getI18n();

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          image={IMAGES.servicesHero}
          eyebrow={t("show.eyebrow")}
          title={t("show.eyebrow")}
          subtitle={t("show.pageSub")}
          breadcrumbs={[{ label: t("crumb.home"), href: "/" }, { label: t("show.eyebrow") }]}
        />
        <section className="bg-ink py-24 sm:py-32">
          <Container>
            <InstallationShowcase items={INSTALLATIONS} variant="grid" />
          </Container>
        </section>
        <BookCta />
      </main>
      <Footer />
    </>
  );
}