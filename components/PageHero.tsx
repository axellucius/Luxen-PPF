import Link from "next/link";
import ImageOrPlaceholder from "@/components/ImageOrPlaceholder";
import Container from "@/components/ui/Container";

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
    <section className="relative flex min-h-[60svh] w-full items-end overflow-hidden bg-ink pb-16 pt-36 sm:items-center sm:pb-0">
      <div className="absolute inset-0">
        <ImageOrPlaceholder
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45"
          label="Foto banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/80" />
      </div>

      <Container className="relative z-10 text-center">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-xs text-white/60">
              {breadcrumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white/90">
                      {c.label}
                    </span>
                  )}
                  {i < breadcrumbs.length - 1 && (
                    <span aria-hidden="true" className="text-white/25">/</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && <p className="eyebrow">{eyebrow}</p>}

        <h1 className="animate-fadeUp mt-4 font-display text-5xl font-light leading-[1.02] tracking-tight text-silver-50 sm:text-7xl">
          {title}
        </h1>

        {subtitle && (
          <p
            className="animate-fadeUp mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base"
            style={{ animationDelay: "200ms" }}
          >
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}