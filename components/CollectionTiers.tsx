import Image from "next/image";

const TIERS = [
  {
    name: "6.5 Mil",
    image: "/images/6,5 Mil.png",
    desc: "Pilihan esensial dengan material TPU berkualitas untuk perlindungan harian kendaraan Anda dari goresan ringan dan paparan cuaca.",
  },
  {
    name: "7.5 Mil",
    image: "/images/7,5 Mil.png",
    desc: "Perlindungan tingkat lanjut dengan ketebalan ekstra untuk meredam benturan jalanan dan menjaga kilau mobil lebih lama.",
  },
  {
    name: "8.5 Mil",
    image: "/images/8,5 Mil.png",
    desc: "Menggunakan material premium Estane dengan teknologi Instant Self-Healing untuk ketahanan maksimal tanpa kompromi.",
  },
  {
    name: "10 Mil",
    image: "/images/10 Mil.png",
    desc: "Varian tertinggi dan terkuat dari LUXEN, memberikan proteksi tingkat mutlak dengan kejernihan maksimal dan daya tahan jangka panjang.",
  },
];

export default function CollectionTiers() {
  return (
    <section id="collection" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 sm:px-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-10">
        <div className="flex flex-col justify-center">
          <h2 className="section-heading">Our Collection Tiers</h2>

          <p className="mt-4 text-sm leading-relaxed text-white/55">
            Empat pilihan tingkat proteksi eksklusif, dirancang khusus untuk
            memenuhi standar ketahanan dan estetika tertinggi kendaraan Anda.
          </p>

          <a
            href="#services"
            className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-medium text-ink transition-all duration-300 ease-luxe hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-[0_10px_30px_rgba(211,169,74,0.3)]"
          >
            Explore Product
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 ease-luxe hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={tier.image}
                  alt={tier.name}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-luxe group-hover:scale-110"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold text-white">
                  {tier.name}
                </h3>

                <p className="mt-2 flex-1 text-xs leading-relaxed text-white/50">
                  {tier.desc}
                </p>

                <a
                  href="#contact"
                  className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-gold-500 px-4 py-2 text-xs font-medium text-ink transition-all duration-300 ease-luxe group-hover:gap-2.5 group-hover:bg-gold-400"
                >
                  Detail

                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}