import Image from "next/image";

const SERVICES = [
  {
    title: "Paint Protection\nFilm",
    image: "/images/PPF.png",
    href: "#ppf",
  },
  {
    title: "Window Car\nFilm",
    image: "/images/Window Car Film.png",
    href: "#window-film",
  },
  {
    title: "Wrapping\nPET",
    image: "/images/Wrapping PET.png",
    href: "#wrapping",
  },
  {
    title: "Paint Protection\nFilm Color",
    image: "/images/PPF Color.png",
    href: "#ppf-color",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <p className="eyebrow text-center">OUR SERVICES</p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <a
              key={s.title}
              href={s.href}
              className="group relative isolate flex h-72 flex-col justify-end overflow-hidden rounded-2xl border border-line p-7"
            >
              <Image
                src={s.image}
                alt={s.title.replace("\n", " ")}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-luxe group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 transition-colors duration-500 group-hover:from-black/95" />

              <div className="relative z-10">
                <h3 className="whitespace-pre-line text-2xl font-semibold leading-tight text-white">
                  {s.title}
                </h3>

                <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-medium text-ink transition-all duration-300 ease-luxe group-hover:gap-3 group-hover:bg-gold-400">
                  Detail

                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}