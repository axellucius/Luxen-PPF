import { IMAGES } from "@/lib/images";

export type Tier = {
  mil: number;
  label: string;
  desc: string;
  image: string;
};

// TODO: confirm product claims (Estane, Instant Self-Healing) with the owner.
export const TIERS: Tier[] = [
  {
    mil: 6.5,
    label: "6.5 Mil",
    desc: "Pilihan esensial dengan material TPU berkualitas untuk perlindungan harian kendaraan Anda dari goresan ringan dan paparan cuaca.",
    image: IMAGES.tiers[0],
  },
  {
    mil: 7.5,
    label: "7.5 Mil",
    desc: "Perlindungan tingkat lanjut dengan ketebalan ekstra untuk meredam benturan jalanan dan menjaga kilau mobil lebih lama.",
    image: IMAGES.tiers[1],
  },
  {
    mil: 8.5,
    label: "8.5 Mil",
    desc: "Menggunakan material premium Estane dengan teknologi Instant Self-Healing untuk ketahanan maksimal tanpa kompromi.",
    image: IMAGES.tiers[2],
  },
  {
    mil: 10,
    label: "10 Mil",
    desc: "Varian tertinggi dan terkuat dari LUXEN, memberikan proteksi tingkat mutlak dengan kejernihan maksimal dan daya tahan jangka panjang.",
    image: IMAGES.tiers[3],
  },
];