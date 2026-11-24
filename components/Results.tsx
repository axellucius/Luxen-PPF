import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import BeforeAfter from "@/components/ui/BeforeAfter";
import { IMAGES } from "@/lib/images";
import { getI18n } from "@/lib/i18n/server";

// TODO: replace with REAL before/after photos (this is a stock photo + CSS filter demo).
export default async function Results() {
  const { t } = await getI18n();

  return (
    <section id="results" className="bg-ink py-24 sm:py-32">
      <Container>
        <Reveal>
          <p className="eyebrow">{t("res.eyebrow")}</p>
          <h2 className="section-heading mt-5 max-w-2xl">{t("res.heading")}</h2>
        </Reveal>
        <Reveal delay={150} className="mt-12">
          <BeforeAfter src={IMAGES.results} />
          <p className="mt-4 text-xs text-white/50">{t("res.caption")}</p>
        </Reveal>
      </Container>
    </section>
  );
}