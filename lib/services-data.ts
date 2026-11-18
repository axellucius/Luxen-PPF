import { IMAGES } from "@/lib/images";

export type ServiceFeature = {
  title: string;
  desc: string;
};

export type ServiceSpec = {
  label: string;
  value: string;
};

export type ServiceDetail = {
  slug: string;
  shortTitle: string;
  title: string;
  tagline: string;
  /** Photo used on cards and the services list */
  cardImage: string;
  /** Wide banner photo behind the detail page hero */
  heroImage: string;
  description: string;
  features: ServiceFeature[];
  /** Quick facts shown as a spec strip on the detail page */
  specs: ServiceSpec[];
  /** Gallery photos (stock for now, see lib/images.ts) */
  gallery: string[];
};

// TODO: owner must confirm every claim below (warranty, thickness, "99% IR",
// install estimates, materials) before production.
export const SERVICES: ServiceDetail[] = [
  {
    slug: "ppf",
    shortTitle: "PPF",
    title: "Paint Protection Film",
    tagline: "Perisai transparan pelindung cat dari goresan",
    cardImage: IMAGES.ppf,
    heroImage: IMAGES.ppf,
    description:
      "Paint Protection Film (PPF) adalah lapisan pelindung transparan berbahan TPU premium yang diaplikasikan langsung pada permukaan cat kendaraan Anda. Dirancang untuk menahan goresan halus, kerikil jalanan, serta paparan sinar UV, PPF menjaga tampilan orisinal mobil Anda tetap mengkilap seperti baru untuk jangka waktu yang lama.",
    features: [
      { title: "Self-Healing", desc: "Goresan halus memudar sendiri saat terkena panas matahari." },
      { title: "Anti Yellowing", desc: "Formulasi aliphatic murni yang tidak menguning seiring waktu." },
      { title: "Presisi Instalasi", desc: "Dipasang oleh teknisi bersertifikat dengan standar showroom." },
    ],
    specs: [
      { label: "Material", value: "TPU Aliphatic" },
      { label: "Ketebalan", value: "6.5 – 10 Mil" },
      { label: "Garansi", value: "5 Tahun" },
      { label: "Estimasi Pasang", value: "1–2 Hari" },
    ],
    gallery: [...IMAGES.gallery],
  },
  {
    slug: "window-film",
    shortTitle: "Window Film",
    title: "Window Car Film",
    tagline: "Tolak panas maksimal demi kenyamanan kabin",
    cardImage: IMAGES.windowFilm,
    heroImage: IMAGES.windowFilm,
    description:
      "Window Car Film LUXEN diformulasikan khusus untuk menolak panas dan sinar UV secara maksimal tanpa mengurangi kejernihan pandangan. Kabin tetap sejuk, AC lebih ringan bekerja, dan privasi Anda terjaga dengan tampilan kaca yang tetap elegan.",
    features: [
      { title: "Penolakan Panas Tinggi", desc: "Mengurangi hawa panas yang masuk ke dalam kabin secara signifikan." },
      { title: "Proteksi UV", desc: "Menahan radiasi UV yang merusak interior dan kulit penumpang." },
      { title: "Kejernihan Optimal", desc: "Visibilitas tetap jernih tanpa distorsi warna." },
    ],
    specs: [
      { label: "Material", value: "Nano Ceramic" },
      { label: "Penolakan Panas", value: "Hingga 99% IR" },
      { label: "Garansi", value: "5 Tahun" },
      { label: "Estimasi Pasang", value: "3–4 Jam" },
    ],
    gallery: [IMAGES.gallery[2], IMAGES.gallery[1], IMAGES.gallery[0]],
  },
  {
    slug: "wrapping-pet",
    shortTitle: "Wrapping PET",
    title: "Wrapping PET",
    tagline: "Ubah gaya dan warna bodi mobil dengan presisi",
    cardImage: IMAGES.wrappingPet,
    heroImage: IMAGES.wrappingPet,
    description:
      "Wrapping PET memberikan Anda kebebasan untuk mengekspresikan gaya melalui warna dan tekstur baru pada bodi kendaraan, tanpa menyentuh cat orisinal. Material PET berkualitas tinggi menghasilkan hasil akhir presisi dengan detail rapi di setiap sudut bodi.",
    features: [
      { title: "Beragam Pilihan Warna", desc: "Finishing gloss, matte, hingga satin sesuai karakter Anda." },
      { title: "Reversibel", desc: "Dapat dilepas tanpa merusak cat asli kendaraan." },
      { title: "Hasil Presisi", desc: "Pemasangan rapi tanpa gelembung atau garis potong yang terlihat." },
    ],
    specs: [
      { label: "Material", value: "PET Premium" },
      { label: "Finishing", value: "Gloss / Matte / Satin" },
      { label: "Garansi", value: "3 Tahun" },
      { label: "Estimasi Pasang", value: "2–3 Hari" },
    ],
    gallery: [IMAGES.gallery[1], IMAGES.gallery[0], IMAGES.gallery[2]],
  },
  {
    slug: "ppf-color",
    shortTitle: "PPF Color",
    title: "Paint Protection Film Color",
    tagline: "Proteksi maksimal sekaligus ubah warna bodi mobil",
    cardImage: IMAGES.ppfColor,
    heroImage: IMAGES.ppfColor,
    description:
      "Menggabungkan proteksi PPF dengan sentuhan warna, PPF Color melindungi cat orisinal sekaligus memberikan tampilan baru yang berkarakter. Pilihan ini ideal bagi Anda yang menginginkan perlindungan penuh tanpa berkompromi dengan estetika.",
    features: [
      { title: "Dua Fungsi Sekaligus", desc: "Proteksi setara PPF standar dengan tambahan pilihan warna." },
      { title: "Warna Tahan Lama", desc: "Pigmen berkualitas tinggi yang tahan terhadap pemudaran." },
      { title: "Perlindungan Penuh", desc: "Cat asli tetap terjaga di bawah lapisan film." },
    ],
    specs: [
      { label: "Material", value: "TPU Color" },
      { label: "Ketebalan", value: "7.5 – 8.5 Mil" },
      { label: "Garansi", value: "5 Tahun" },
      { label: "Estimasi Pasang", value: "2–3 Hari" },
    ],
    gallery: [IMAGES.gallery[0], IMAGES.gallery[2], IMAGES.gallery[1]],
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}