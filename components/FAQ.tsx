import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { FAQS } from "@/lib/faq";
import { getI18n } from "@/lib/i18n/server";

export default async function FAQ() {
  const { t, lang } = await getI18n();

  return (
    <section id="faq" className="bg-surface py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">{t("faq.eyebrow")}</p>
            <h2 className="section-heading mt-5">{t("faq.heading")}</h2>
            <Link href="/faq" className="mt-8 inline-flex min-h-11 items-center text-xs uppercase tracking-[0.2em] text-silver-300 transition-colors hover:text-white">
              {t("faq.seeAll")}
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <div className="border-b border-line">
              {FAQS.map((f) => (
                <details key={f.q.en} className="group border-t border-line">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-xl text-silver-100 sm:text-2xl">{f.q[lang]}</span>
                    <span aria-hidden="true" className="text-2xl leading-none text-silver-400 transition-transform duration-500 ease-luxe group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-xl pb-6 text-sm leading-relaxed text-white/70">{f.a[lang]}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}