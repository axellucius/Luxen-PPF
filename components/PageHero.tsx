import Link from "next/link";
import ImageOrPlaceholder from "@/components/ImageOrPlaceholder";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
};

export default function PageHero({
  image,
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[56vh] w-full items-center overflow-hidden bg-ink pt-24 sm:min-h-[62vh]">
      <div className="absolute inset-0">
        <ImageOrPlaceholder
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-45"
          label="Foto banner belum ditambahkan"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(211,169,74,0.14),transparent_65%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center sm:px-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-5 flex items-center justify-center gap-2 text-xs text-white/50">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors duration-200 hover:text-gold-400"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/70">{crumb.label}</span>
                )}
                {i < breadcrumbs.length - 1 && (
                  <span className="text-white/25">/</span>
                )}
              </span>
            ))}
          </div>
        )}

        {eyebrow && <p className="eyebrow">{eyebrow}</p>}

        <h1 className="animate-fadeSlide mt-3 text-4xl font-semibold uppercase leading-tight tracking-tight sm:text-6xl">
          {title}
        </h1>

        {subtitle && (
          <p className="animate-fadeSlide mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}