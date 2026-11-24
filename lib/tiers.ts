import { IMAGES } from "@/lib/images";
import type { L, LL } from "@/lib/i18n/config";

export type Tier = {
  slug: string;
  mil: number;
  label: string;
  name: L;
  /** 1-4, relative protection derived from thickness */
  level: 1 | 2 | 3 | 4;
  image: string;
  desc: L;
  long: LL;
  bestFor: L;
  highlights: LL;
  material: L;
};

/** 1 mil = 0.0254 mm */
export const toMm = (mil: number) => (mil * 0.0254).toFixed(2);

// TODO: owner must confirm every product claim (Estane, Instant Self-Healing, materials).
export const TIERS: Tier[] = [
  {
    slug: "6-5-mil",
    mil: 6.5,
    label: "6.5 Mil",
    name: { en: "Essential", id: "Esensial" },
    level: 1,
    image: IMAGES.tiers[0],
    desc: {
      en: "The essential choice: quality TPU for everyday protection against light scratches and weather exposure.",
      id: "Pilihan esensial dengan material TPU berkualitas untuk perlindungan harian kendaraan Anda dari goresan ringan dan paparan cuaca.",
    },
    long: {
      en: [
        "Our entry tier protects the original paint from the small things that wear it down day after day: light scratches, road dust and everyday weather.",
        "A sensible fit for vehicles that mostly stay in the city, giving a clean, glossy finish while keeping the investment accessible.",
      ],
      id: [
        "Tier awal kami melindungi cat orisinal dari hal-hal kecil yang menggerusnya setiap hari: goresan ringan, debu jalanan, dan cuaca harian.",
        "Cocok untuk kendaraan yang lebih banyak dipakai di dalam kota, dengan hasil akhir bersih dan mengkilap serta investasi yang tetap terjangkau.",
      ],
    },
    bestFor: { en: "Daily city driving", id: "Berkendara harian dalam kota" },
    highlights: {
      en: ["Guards against light scratches", "Shields from everyday weather", "Clear, glossy finish"],
      id: ["Melindungi dari goresan ringan", "Menahan cuaca harian", "Hasil jernih dan mengkilap"],
    },
    material: { en: "TPU Aliphatic", id: "TPU Aliphatic" },
  },
  {
    slug: "7-5-mil",
    mil: 7.5,
    label: "7.5 Mil",
    name: { en: "Advanced", id: "Lanjutan" },
    level: 2,
    image: IMAGES.tiers[1],
    desc: {
      en: "Advanced protection with extra thickness to absorb road impacts and keep your car's shine for longer.",
      id: "Perlindungan tingkat lanjut dengan ketebalan ekstra untuk meredam benturan jalanan dan menjaga kilau mobil lebih lama.",
    },
    long: {
      en: [
        "Extra thickness absorbs more of the knocks that city and highway driving deliver, such as small stones and road debris.",
        "It keeps your car's gloss looking fresh for longer, a balanced step up for owners who want stronger protection.",
      ],
      id: [
        "Ketebalan ekstra meredam lebih banyak benturan dari berkendara di kota maupun tol, seperti batu kecil dan serpihan jalan.",
        "Menjaga kilau mobil tetap segar lebih lama, peningkatan yang seimbang bagi pemilik yang menginginkan proteksi lebih kuat.",
      ],
    },
    bestFor: { en: "Frequent highway & long trips", id: "Sering lewat tol & luar kota" },
    highlights: {
      en: ["Extra cushioning against road impacts", "Keeps gloss fresh for longer", "Balanced step up in protection"],
      id: ["Peredam ekstra terhadap benturan jalan", "Kilau terjaga lebih lama", "Peningkatan proteksi yang seimbang"],
    },
    material: { en: "TPU Aliphatic", id: "TPU Aliphatic" },
  },
  {
    slug: "8-5-mil",
    mil: 8.5,
    label: "8.5 Mil",
    name: { en: "Premium", id: "Premium" },
    level: 3,
    image: IMAGES.tiers[2],
    desc: {
      en: "Premium Estane material with Instant Self-Healing technology for maximum durability without compromise.",
      id: "Menggunakan material premium Estane dengan teknologi Instant Self-Healing untuk ketahanan maksimal tanpa kompromi.",
    },
    long: {
      en: [
        "Built from premium Estane material, this tier adds Instant Self-Healing technology so fine marks on the surface recover on their own.",
        "A strong choice for owners who want near-maximum durability without compromising on appearance.",
      ],
      id: [
        "Dibuat dari material premium Estane, tier ini menambahkan teknologi Instant Self-Healing sehingga goresan halus pada permukaan pulih dengan sendirinya.",
        "Pilihan kuat bagi pemilik yang menginginkan ketahanan mendekati maksimal tanpa mengorbankan tampilan.",
      ],
    },
    bestFor: { en: "New or high-value vehicles", id: "Mobil baru atau bernilai tinggi" },
    highlights: {
      en: ["Premium Estane material", "Instant Self-Healing technology", "High durability, clear finish"],
      id: ["Material premium Estane", "Teknologi Instant Self-Healing", "Ketahanan tinggi, hasil jernih"],
    },
    material: { en: "Premium Estane", id: "Premium Estane" },
  },
  {
    slug: "10-mil",
    mil: 10,
    label: "10 Mil",
    name: { en: "Ultimate", id: "Puncak" },
    level: 4,
    image: IMAGES.tiers[3],
    desc: {
      en: "LUXEN's highest and strongest variant: absolute protection with maximum clarity and long-term durability.",
      id: "Varian tertinggi dan terkuat dari LUXEN, memberikan proteksi tingkat mutlak dengan kejernihan maksimal dan daya tahan jangka panjang.",
    },
    long: {
      en: [
        "Our thickest and strongest variant, designed for those who want absolute protection, maximum clarity and long-term durability.",
        "If your vehicle is a prized possession, whether a collector's piece or a daily luxury, this is the tier built for it.",
      ],
      id: [
        "Varian paling tebal dan terkuat dari kami, dirancang untuk Anda yang menginginkan proteksi mutlak, kejernihan maksimal, dan daya tahan jangka panjang.",
        "Jika kendaraan Anda adalah barang kesayangan, baik koleksi maupun kemewahan harian, inilah tier yang dibuat untuknya.",
      ],
    },
    bestFor: { en: "Collectors & maximum protection", id: "Kolektor & proteksi maksimal" },
    highlights: {
      en: ["Our thickest, strongest film", "Maximum clarity", "Long-term durability"],
      id: ["Film tertebal dan terkuat kami", "Kejernihan maksimal", "Daya tahan jangka panjang"],
    },
    material: { en: "TPU Aliphatic", id: "TPU Aliphatic" },
  },
];

export const MAX_MIL = Math.max(...TIERS.map((t) => t.mil));

export function getTierBySlug(slug: string) {
  return TIERS.find((t) => t.slug === slug);
}