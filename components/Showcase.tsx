import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import InstallationShowcase from "@/components/InstallationShowcase";
import { INSTALLATIONS } from "@/lib/installations";
import { getI18n } from "@/lib/i18n/server";

export default async function Showcase() {
  const { t } = await getI18n();
  const featured = INSTALLATIONS.filter((i) => i.featured).slice(0, 8);

  return (
    <section id="showcase" className="bg-surface py-24 sm:py-32">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{t("show.eyebrow")}</p>
            <h2 className="section-heading mt-5 max-w-2xl">{t("show.heading")}</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">{t("show.intro")}</p>
          </div>
          <Link href="/installations" className="inline-flex min-h-11 items-center text-xs uppercase tracking-[0.2em] text-silver-300 transition-colors hover:text-white">
            {t("show.viewAll")}
          </Link>
        </Reveal>

        <div className="mt-10">
          <InstallationShowcase items={featured} variant="carousel" />
        </div>
      </Container>
    </section>
  );
}