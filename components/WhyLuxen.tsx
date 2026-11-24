import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ReadMore from "@/components/ui/ReadMore";
import { getI18n } from "@/lib/i18n/server";
import type { MsgKey } from "@/lib/i18n/dict";

const FEATURES: { t: MsgKey; d: MsgKey; m: MsgKey }[] = [
  { t: "why.f1t", d: "why.f1d", m: "why.f1m" },
  { t: "why.f2t", d: "why.f2d", m: "why.f2m" },
  { t: "why.f3t", d: "why.f3d", m: "why.f3m" },
];

export default async function WhyLuxen() {
  const { t } = await getI18n();

  return (
    <section id="why-luxen" className="bg-ink py-24 sm:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">{t("why.eyebrow")}</p>
            <h2 className="section-heading mt-5 max-w-xl">
              {t("why.hA")}
              <span className="chrome-text italic">{t("why.hAccent")}</span>
              {t("why.hB")}
            </h2>
          </Reveal>

          <ol className="flex flex-col">
            {FEATURES.map((f, i) => (
              <Reveal key={f.t} delay={i * 120}>
                <li className="grid grid-cols-[auto_1fr] gap-6 border-t border-line py-8 last:border-b">
                  <span className="font-display text-2xl text-silver-500">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl text-silver-50">{t(f.t)}</h3>
                    <ReadMore summary={<p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">{t(f.d)}</p>}>
                      <p className="max-w-md text-sm leading-relaxed text-white/70">{t(f.m)}</p>
                    </ReadMore>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}