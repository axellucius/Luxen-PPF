import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services-data";
import { TIERS } from "@/lib/tiers";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: "monthly" as const,
    priority,
  });

  return [
    page("", 1),
    page("/services", 0.8),
    ...SERVICES.map((s) => page(`/services/${s.slug}`, 0.7)),
    ...TIERS.map((t) => page(`/services/ppf/${t.slug}`, 0.6)),
    page("/installations", 0.6),
    page("/faq", 0.6),
  ];
}