import type { L } from "@/lib/i18n/config";

type Base = {
  id: string;
  title: L;
  /** Car name, e.g. "Toyota Alphard" */
  vehicle: string;
  service: "ppf" | "window-film" | "wrapping-pet" | "ppf-color";
  /** true = also shown in the homepage carousel (keep to ~8) */
  featured?: boolean;
};

export type InstallItem =
  | (Base & { type: "photo"; src: string })
  | (Base & { type: "video"; src: string; poster: string });

/**
 * HOW TO ADD CONTENT: copy one block, change id/src/title/vehicle/service.
 * Put files in /public/installations/... and use paths that start with "/installations/".
 * Videos MUST have a poster (cover image). Until the file exists, a placeholder is shown.
 * TODO: replace the sample entries below with your real content.
 */
export const INSTALLATIONS: InstallItem[] = [
  { id: "v01", type: "video", src: "/installations/videos/video-01.mp4", poster: "/installations/posters/video-01.webp", title: { en: "Full-body PPF installation", id: "Pemasangan PPF seluruh bodi" }, vehicle: "Vehicle name", service: "ppf", featured: true },
  { id: "p01", type: "photo", src: "/installations/photos/photo-01.webp", title: { en: "Flawless gloss, finished", id: "Kilau sempurna, selesai" }, vehicle: "Vehicle name", service: "ppf", featured: true },
  { id: "v02", type: "video", src: "/installations/videos/video-02.mp4", poster: "/installations/posters/video-02.webp", title: { en: "Window film, step by step", id: "Window film, langkah demi langkah" }, vehicle: "Vehicle name", service: "window-film", featured: true },
  { id: "p02", type: "photo", src: "/installations/photos/photo-02.webp", title: { en: "Satin wrap detail", id: "Detail wrap satin" }, vehicle: "Vehicle name", service: "wrapping-pet", featured: true },
  { id: "v03", type: "video", src: "/installations/videos/video-03.mp4", poster: "/installations/posters/video-03.webp", title: { en: "PPF Color transformation", id: "Transformasi PPF Color" }, vehicle: "Vehicle name", service: "ppf-color", featured: true },
  { id: "p03", type: "photo", src: "/installations/photos/photo-03.webp", title: { en: "Home service, on site", id: "Home service di lokasi" }, vehicle: "Vehicle name", service: "ppf", featured: true },
];