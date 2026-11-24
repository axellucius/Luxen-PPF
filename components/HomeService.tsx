import ImageOrPlaceholder from "@/components/ImageOrPlaceholder";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";
import { getI18n } from "@/lib/i18n/server";
import { waLink } from "@/lib/site";

export default async function HomeService() {
  const { t } = await getI18n();
  const points = [t("hs.p1"), t("hs.p2"), t("hs.p3"), t("hs.p4")];
  // TODO: confirm the real service flow with the owner.
  const steps = [
    { title: t("hs.s1t"), desc: t("hs.s1d") },
    { title: t("hs.s2t"), desc: t("hs.s2d") },
    { title: t("hs.s3t"), desc: t("hs.s3d") },
    { title: t("hs.s4t"), desc: t("hs.s4d") },
  ];

  return (
    <section id="home-service" className="bg-ink py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line">
            <ImageOrPlaceholder src={IMAGES.homeService} alt={t("hs.alt")} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-center" label="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow">{t("hs.eyebrow")}</p>
            <h2 className="section-heading mt-5">{t("hs.heading")}</h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">{t("hs.p")}</p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {points.map((p) => (
                <li key={p} className="rounded-full border border-line px-4 py-2 text-xs text-silver-200">{p}</li>
              ))}
            </ul>

            <ol className="mt-10 border-t border-line">
              {steps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[auto_1fr] gap-5 border-b border-line py-5">
                  <span className="font-display text-xl text-silver-500">0{i + 1}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-silver-100">{s.title}</h3>
                    <p className="mt-1 text-sm text-white/60">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Button href={waLink(t("wa.homeService"))} external className="mt-10">{t("hs.cta")}</Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}