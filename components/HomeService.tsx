import ImageOrPlaceholder from "@/components/ImageOrPlaceholder";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";
import { waLink } from "@/lib/site";

const POINTS = [
  "Precision Installation",
  "Showroom Standard",
  "Zero Hassle",
  "On-Site Installation",
];

// TODO: confirm the real service flow with the owner.
const STEPS = [
  { title: "Konsultasi", desc: "Ceritakan kebutuhan dan kendaraan Anda via WhatsApp." },
  { title: "Penjadwalan", desc: "Tentukan waktu dan lokasi yang nyaman untuk Anda." },
  { title: "Instalasi", desc: "Teknisi kami datang dan memasang di garasi Anda." },
  { title: "Serah Terima", desc: "Cek hasil bersama, lalu mobil siap dipakai." },
];

export default function HomeService() {
  return (
    <section id="home-service" className="bg-surface py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line">
            <ImageOrPlaceholder
              src={IMAGES.homeService}
              alt="Instalasi LUXEN langsung di garasi pelanggan"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-center"
              label="Foto Home Service"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow">Home Service</p>
            <h2 className="section-heading mt-5">Exclusive Home Service</h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
              Kenyamanan paripurna tanpa harus meninggalkan rumah Anda. Tim
              teknisi ahli kami siap mendatangi garasi Anda untuk instalasi
              presisi tinggi dengan standar kualitas showroom.
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {POINTS.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-line px-4 py-2 text-xs text-silver-200"
                >
                  {p}
                </li>
              ))}
            </ul>

            <ol className="mt-10 border-t border-line">
              {STEPS.map((s, i) => (
                <li
                  key={s.title}
                  className="grid grid-cols-[auto_1fr] gap-5 border-b border-line py-5"
                >
                  <span className="font-display text-xl text-silver-500">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-silver-100">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/60">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Button
              href={waLink("Halo LUXEN, saya ingin booking Home Service.")}
              external
              className="mt-10"
            >
              Booking Home Service
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}