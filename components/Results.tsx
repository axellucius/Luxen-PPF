import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import BeforeAfter from "@/components/ui/BeforeAfter";
import { IMAGES } from "@/lib/images";

// TODO: replace with REAL before/after photos from LUXEN installs.
// The current slider uses a stock photo + CSS filter as an interactive demo only.
export default function Results() {
  return (
    <section id="hasil" className="bg-ink py-24 sm:py-32">
      <Container>
        <Reveal>
          <p className="eyebrow">Hasil</p>
          <h2 className="section-heading mt-5 max-w-2xl">
            Geser, lihat perbedaannya.
          </h2>
        </Reveal>

        <Reveal delay={150} className="mt-12">
          <BeforeAfter
            src={IMAGES.results}
            alt="Perbandingan kilau cat sebelum dan sesudah proteksi"
          />
          <p className="mt-4 text-xs text-white/50">
            Ilustrasi interaktif. Foto hasil pemasangan asli segera ditambahkan.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}