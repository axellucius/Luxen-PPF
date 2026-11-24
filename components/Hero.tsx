import ImageOrPlaceholder from "@/components/ImageOrPlaceholder";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";
import { getI18n } from "@/lib/i18n/server";
import { waLink } from "@/lib/site";

export default async function Hero() {
  const { t } = await getI18n();

  return (
    <section id="home" className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink pb-24 pt-32 sm:items-center sm:pb-0">
      <div className="absolute inset-0">
        <div className="absolute inset-0 animate-slowZoom">
          <ImageOrPlaceholder src={IMAGES.hero} alt="" fill priority sizes="100vw" className="object-cover object-center opacity-55" label="" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/20 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl">
          <p className="eyebrow animate-fadeUp" style={{ animationDelay: "150ms" }}>{t("hero.eyebrow")}</p>

          <h1 className="animate-fadeUp mt-6 font-display text-5xl font-light leading-[1] tracking-tight text-silver-50 sm:text-7xl lg:text-8xl" style={{ animationDelay: "300ms" }}>
            {t("hero.t1")} <span className="chrome-text font-normal">{t("hero.accent")}</span> {t("hero.t2")}
          </h1>

          <p className="animate-fadeUp mt-7 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base" style={{ animationDelay: "500ms" }}>
            {t("hero.sub")}
          </p>

          <div className="animate-fadeUp mt-10 flex flex-wrap gap-4" style={{ animationDelay: "700ms" }}>
            <Button href="/services">{t("hero.explore")}</Button>
            <Button href={waLink(t("wa.default"))} external variant="outline">{t("hero.wa")}</Button>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex">
        <span className="eyebrow">{t("hero.scroll")}</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/15">
          <span className="scroll-line absolute inset-0 bg-silver-200" />
        </span>
      </div>
    </section>
  );
}