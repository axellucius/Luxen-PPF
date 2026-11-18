import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

// TODO: owner must confirm every answer before production.
const FAQS = [
  {
    q: "Apa itu Paint Protection Film (PPF)?",
    a: "PPF adalah lapisan pelindung transparan berbahan TPU yang dipasang pada cat kendaraan untuk menahan goresan halus, kerikil jalanan, dan paparan sinar UV.",
  },
  {
    q: "Apa bedanya ketebalan 6.5, 7.5, 8.5, dan 10 Mil?",
    a: "Semakin tebal film, semakin besar kemampuannya meredam benturan. Lihat bagian Tier Ketebalan di atas, atau konsultasikan via WhatsApp untuk memilih yang paling sesuai dengan penggunaan Anda.",
  },
  {
    q: "Apakah PPF LUXEN bisa menguning?",
    a: "LUXEN memakai material aliphatic TPU yang diformulasikan agar tahan menguning dalam jangka panjang.",
  },
  {
    q: "Apakah pemasangan bisa dilakukan di rumah?",
    a: "Bisa. Layanan Home Service kami mendatangi garasi Anda. Hubungi kami untuk memastikan jangkauan area Anda.",
  },
  {
    q: "Berapa lama pemasangan dan garansinya?",
    a: "Estimasi waktu dan garansi berbeda tiap layanan. Lihat halaman detail layanan, atau tanyakan langsung via WhatsApp.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-ink py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2 className="section-heading mt-5">Pertanyaan yang sering diajukan.</h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="border-b border-line">
              {FAQS.map((f) => (
                <details key={f.q} className="group border-t border-line">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-xl text-silver-100 sm:text-2xl">
                      {f.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-2xl leading-none text-silver-400 transition-transform duration-500 ease-luxe group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-xl pb-6 text-sm leading-relaxed text-white/70">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}