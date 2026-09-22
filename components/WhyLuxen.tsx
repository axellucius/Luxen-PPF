const FEATURES = [
  {
    title: "Pure Aliphatic TPU Technology",
    desc: "Material TPU murni kelas dunia yang memberikan proteksi maksimal dari sinar UV serta jaminan bebas menguning dalam jangka panjang.",
  },
  {
    title: "7.5mil",
    desc: "Ketebalan optimal untuk meredam benturan kerikil dan goresan halus, dilengkapi kemampuan pulih otomatis.",
  },
  {
    title: "Self-Healing Property",
    desc: "Teknologi pemulihan otomatis yang membuat goresan-goresan halus pada permukaan film hilang seketika secara mandiri saat terkena sinar matahari.",
  },
];

export default function WhyLuxen() {
  return (
    <section id="why-luxen" className="relative bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 text-center sm:px-10">
        <p className="eyebrow">KEUNGGULAN</p>
        <h2 className="section-heading mt-3">Kenapa Luxen?</h2>

        <div className="mt-14 flex flex-wrap justify-center gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group w-full max-w-sm rounded-2xl border border-line bg-surface p-8 text-left transition-all duration-300 ease-luxe hover:-translate-y-2 hover:border-gold-500/40 hover:bg-surface-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/10 transition-colors duration-300 group-hover:bg-gold-500/20">
                <span className="h-3 w-3 rounded-full bg-gold-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}