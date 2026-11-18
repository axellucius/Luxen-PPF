import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

// TODO: owner must confirm these product claims.
const FEATURES = [
  {
    title: "Pure Aliphatic TPU",
    desc: "Material TPU murni kelas dunia dengan proteksi maksimal dari sinar UV serta jaminan bebas menguning dalam jangka panjang.",
  },
  {
    title: "Ketebalan 7.5 Mil",
    desc: "Ketebalan optimal untuk meredam benturan kerikil dan goresan halus, dilengkapi kemampuan pulih otomatis.",
  },
  {
    title: "Self-Healing",
    desc: "Goresan halus pada permukaan film hilang dengan sendirinya saat terkena sinar matahari.",
  },
];

export default function WhyLuxen() {
  return (
    <section id="why-luxen" className="bg-ink py-24 sm:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">Keunggulan</p>
            <h2 className="section-heading mt-5 max-w-xl">
              Cat mobil Anda layak mendapat{" "}
              <span className="chrome-text italic">perisai</span> terbaik.
            </h2>
          </Reveal>

          <ol className="flex flex-col">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 120}>
                <li className="grid grid-cols-[auto_1fr] gap-6 border-t border-line py-8 last:border-b">
                  <span className="font-display text-2xl text-silver-500">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-silver-50">
                      {f.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
                      {f.desc}
                    </p>
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