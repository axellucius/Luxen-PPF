import ImageOrPlaceholder from "@/components/ImageOrPlaceholder";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";
import { waLink } from "@/lib/site";

export default function BookCta() {
  return (
    <section id="kontak" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <Container>
        <div className="relative isolate overflow-hidden rounded-sm border border-line bg-surface">
          <div className="absolute inset-0">
            <ImageOrPlaceholder
              src={IMAGES.cta}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center opacity-35"
              label=""
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
          </div>

          <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-24">
            <p className="eyebrow">Kontak</p>
            <h2 className="section-heading mt-5 max-w-xl">
              Book your protection today.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              Klik tombol di bawah, ceritakan kebutuhan Anda, dan tim kami akan
              menghubungi Anda kembali.
            </p>
            <Button href={waLink()} external className="mt-9">
              Hubungi WhatsApp Sekarang
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}