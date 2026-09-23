const FEATURES = [
  {
    title: "Pure Aliphatic TPU Technology",
    desc: "Material TPU murni kelas dunia yang memberikan proteksi maksimal dari sinar UV serta jaminan bebas menguning dalam jangka panjang.",
    icon: (
      <path
        d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "7.5mil",
    desc: "Ketebalan optimal untuk meredam benturan kerikil dan goresan halus, dilengkapi kemampuan pulih otomatis.",
    icon: (
      <path
        d="M12 3l8 4-8 4-8-4 8-4zM4 11l8 4 8-4M4 15l8 4 8-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Self-Healing Property",
    desc: "Teknologi pemulihan otomatis yang membuat goresan-goresan halus pada permukaan film hilang seketika secara mandiri saat terkena sinar matahari.",
    icon: (
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    ),
  },
];

export default function WhyLuxen() {
  return (
    <section id="why-luxen" className="relative bg-ink py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="divider-gold mb-14" />

        <div className="text-center">
          <p className="eyebrow">Keunggulan</p>
          <h2 className="section-heading mt-3">Kenapa Luxen?</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-line bg-surface p-8 text-left transition-all duration-300 ease-luxe hover:-translate-y-1.5 hover:border-gold-500/40 hover:bg-surface-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/10 text-gold-400 transition-colors duration-300 group-hover:bg-gold-500/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  {f.icon}
                </svg>
              </div>

              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}