import Image from "next/image";

export default function BookCta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ink py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="relative isolate overflow-hidden rounded-3xl border border-line bg-surface">
          <div className="absolute inset-0">
            <Image
              src="/images/Book Your Protection Today.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-right opacity-40"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20" />
          </div>

          <div className="relative z-10 flex min-h-[18rem] flex-col justify-center px-8 py-12 sm:px-14">
            <h2 className="max-w-md text-3xl font-semibold leading-tight sm:text-4xl">
              Book your protection today
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Klik tautan di bawah. Isi detailnya dan tim kami akan
              menghubungi Anda kembali dalam waktu kurang dari 24 jam.
            </p>

            <a
              href="https://wa.me/6280000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-medium text-ink transition-all duration-300 ease-luxe hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-[0_10px_30px_rgba(211,169,74,0.35)]"
            >
              Hubungi WhatsApp Sekarang
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}