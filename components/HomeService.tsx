import Image from "next/image";

const POINTS = [
  {
    title: "Precision Installation",
    icon: (
      <path
        d="M12 2l1.6 4.6L18 8l-4.4 1.4L12 14l-1.6-4.6L6 8l4.4-1.4L12 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Showroom Standard",
    icon: (
      <path
        d="M4 21V9l8-5 8 5v12M4 21h16M9 21v-6h6v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Zero Hassle",
    icon: (
      <path
        d="M12 22c5.5-2 8-6 8-11V6l-8-3-8 3v5c0 5 2.5 9 8 11z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "On-Site Installation",
    icon: (
      <path
        d="M12 21s-7-4.5-7-10a7 7 0 0114 0c0 5.5-7 10-7 10z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function HomeService() {
  return (
    <section className="bg-ink py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="divider-gold mb-12" />

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Content */}
          <div>
            <h2 className="section-heading">Exclusive Home Service</h2>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">
              Kenyamanan paripurna tanpa harus meninggalkan rumah Anda. Tim
              teknisi ahli kami siap mendatangi garasi Anda untuk melakukan
              instalasi presisi tinggi dengan standar kualitas showroom kelas
              dunia.
            </p>

            {/* Service Points */}
            <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-5">
              {POINTS.map((p) => (
                <div key={p.title} className="group flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-gold-400 transition-colors duration-300 group-hover:border-gold-500/50 group-hover:bg-gold-500/10">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      {p.icon}
                    </svg>
                  </span>

                  <span className="text-sm text-white/80">{p.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="group relative h-72 w-full overflow-hidden sm:h-96">
            <div
              className="absolute inset-0"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
              }}
            >
              <Image
                src="/images/Home Service.png"
                alt="Exclusive home service"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center opacity-90 transition-transform duration-700 ease-luxe group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}