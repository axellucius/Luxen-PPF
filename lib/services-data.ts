import { IMAGES } from "@/lib/images";
import { same, type L, type LL } from "@/lib/i18n/config";

export type ServiceFeature = { title: L; desc: L };
export type ServiceSpec = { label: L; value: L };

export type ServiceDetail = {
  slug: string;
  shortTitle: string;
  title: string;
  tagline: L;
  cardImage: string;
  heroImage: string;
  description: L;
  /** Extra paragraphs revealed by "Read more" */
  extra: LL;
  features: ServiceFeature[];
  specs: ServiceSpec[];
  gallery: string[];
};

const SP = {
  material: { en: "Material", id: "Material" },
  thickness: { en: "Thickness", id: "Ketebalan" },
  warranty: { en: "Warranty", id: "Garansi" },
  install: { en: "Install time", id: "Estimasi Pasang" },
  heat: { en: "Heat rejection", id: "Penolakan Panas" },
  finish: { en: "Finish", id: "Finishing" },
} satisfies Record<string, L>;

// TODO: owner must confirm every claim (warranty, thickness, "99% IR", install estimates, materials).
export const SERVICES: ServiceDetail[] = [
  {
    slug: "ppf",
    shortTitle: "PPF",
    title: "Paint Protection Film",
    tagline: {
      en: "A transparent shield protecting your paint from scratches",
      id: "Perisai transparan pelindung cat dari goresan",
    },
    cardImage: IMAGES.ppf,
    heroImage: IMAGES.ppf,
    description: {
      en: "Paint Protection Film (PPF) is a transparent protective layer made of premium TPU, applied directly to your vehicle's paint. Designed to resist fine scratches, road stones and UV exposure, PPF keeps your car's original finish glossy like new for years.",
      id: "Paint Protection Film (PPF) adalah lapisan pelindung transparan berbahan TPU premium yang diaplikasikan langsung pada permukaan cat kendaraan Anda. Dirancang untuk menahan goresan halus, kerikil jalanan, serta paparan sinar UV, PPF menjaga tampilan orisinal mobil Anda tetap mengkilap seperti baru untuk jangka waktu yang lama.",
    },
    extra: {
      en: [
        "Every installation starts with careful preparation of the surface, so the film bonds cleanly and the result looks like part of the car.",
        "LUXEN offers PPF in several thicknesses. Explore each tier to see which protection level suits the way you drive.",
      ],
      id: [
        "Setiap instalasi diawali persiapan permukaan yang teliti, agar film menempel rapi dan hasilnya terlihat menyatu dengan mobil.",
        "LUXEN menyediakan PPF dalam beberapa ketebalan. Jelajahi tiap tier untuk melihat tingkat proteksi yang cocok dengan cara Anda berkendara.",
      ],
    },
    features: [
      { title: { en: "Self-Healing", id: "Self-Healing" }, desc: { en: "Fine scratches fade away on their own under the sun's heat.", id: "Goresan halus memudar sendiri saat terkena panas matahari." } },
      { title: { en: "Anti Yellowing", id: "Anti Yellowing" }, desc: { en: "Pure aliphatic formulation that doesn't yellow over time.", id: "Formulasi aliphatic murni yang tidak menguning seiring waktu." } },
      { title: { en: "Installation Precision", id: "Presisi Instalasi" }, desc: { en: "Installed by certified technicians to showroom standards.", id: "Dipasang oleh teknisi bersertifikat dengan standar showroom." } },
    ],
    specs: [
      { label: SP.material, value: same("TPU Aliphatic") },
      { label: SP.thickness, value: same("6.5 – 10 Mil") },
      { label: SP.warranty, value: { en: "5 Years", id: "5 Tahun" } },
      { label: SP.install, value: { en: "1–2 Days", id: "1–2 Hari" } },
    ],
    gallery: [...IMAGES.gallery],
  },
  {
    slug: "window-film",
    shortTitle: "Window Film",
    title: "Window Car Film",
    tagline: { en: "Maximum heat rejection for cabin comfort", id: "Tolak panas maksimal demi kenyamanan kabin" },
    cardImage: IMAGES.windowFilm,
    heroImage: IMAGES.windowFilm,
    description: {
      en: "LUXEN Window Car Film is formulated to reject heat and UV rays at their best without reducing clarity of vision. The cabin stays cool, the AC works easier, and your privacy is protected while the glass stays elegant.",
      id: "Window Car Film LUXEN diformulasikan khusus untuk menolak panas dan sinar UV secara maksimal tanpa mengurangi kejernihan pandangan. Kabin tetap sejuk, AC lebih ringan bekerja, dan privasi Anda terjaga dengan tampilan kaca yang tetap elegan.",
    },
    extra: {
      en: [
        "A cooler cabin means more comfortable trips for everyone on board, and less strain on the interior materials over time.",
        "Our team will help you choose a shade that balances comfort, privacy and the look of your vehicle.",
      ],
      id: [
        "Kabin yang lebih sejuk berarti perjalanan lebih nyaman bagi semua penumpang, dan interior lebih terjaga dari waktu ke waktu.",
        "Tim kami membantu memilih tingkat kegelapan yang menyeimbangkan kenyamanan, privasi, dan tampilan kendaraan Anda.",
      ],
    },
    features: [
      { title: { en: "High Heat Rejection", id: "Penolakan Panas Tinggi" }, desc: { en: "Significantly reduces the heat entering the cabin.", id: "Mengurangi hawa panas yang masuk ke dalam kabin secara signifikan." } },
      { title: { en: "UV Protection", id: "Proteksi UV" }, desc: { en: "Blocks UV radiation that damages interiors and passengers' skin.", id: "Menahan radiasi UV yang merusak interior dan kulit penumpang." } },
      { title: { en: "Optimal Clarity", id: "Kejernihan Optimal" }, desc: { en: "Clear visibility without colour distortion.", id: "Visibilitas tetap jernih tanpa distorsi warna." } },
    ],
    specs: [
      { label: SP.material, value: same("Nano Ceramic") },
      { label: SP.heat, value: { en: "Up to 99% IR", id: "Hingga 99% IR" } },
      { label: SP.warranty, value: { en: "5 Years", id: "5 Tahun" } },
      { label: SP.install, value: { en: "3–4 Hours", id: "3–4 Jam" } },
    ],
    gallery: [IMAGES.gallery[2], IMAGES.gallery[1], IMAGES.gallery[0]],
  },
  {
    slug: "wrapping-pet",
    shortTitle: "Wrapping PET",
    title: "Wrapping PET",
    tagline: { en: "Change your car's style and colour with precision", id: "Ubah gaya dan warna bodi mobil dengan presisi" },
    cardImage: IMAGES.wrappingPet,
    heroImage: IMAGES.wrappingPet,
    description: {
      en: "Wrapping PET gives you the freedom to express your style through new colours and textures on the body, without touching the original paint. High-quality PET material delivers a precise finish with neat detail on every panel.",
      id: "Wrapping PET memberikan Anda kebebasan untuk mengekspresikan gaya melalui warna dan tekstur baru pada bodi kendaraan, tanpa menyentuh cat orisinal. Material PET berkualitas tinggi menghasilkan hasil akhir presisi dengan detail rapi di setiap sudut bodi.",
    },
    extra: {
      en: [
        "Because the wrap sits on top of the factory paint, you can change your mind later and return to the original look.",
        "Share the style you have in mind and we'll suggest finishes that suit your vehicle.",
      ],
      id: [
        "Karena wrap menempel di atas cat pabrik, Anda bisa berubah pikiran nanti dan kembali ke tampilan semula.",
        "Ceritakan gaya yang Anda inginkan, dan kami akan menyarankan finishing yang cocok untuk kendaraan Anda.",
      ],
    },
    features: [
      { title: { en: "Wide Choice of Colours", id: "Beragam Pilihan Warna" }, desc: { en: "Gloss, matte and satin finishes to match your character.", id: "Finishing gloss, matte, hingga satin sesuai karakter Anda." } },
      { title: { en: "Reversible", id: "Reversibel" }, desc: { en: "Can be removed without damaging the original paint.", id: "Dapat dilepas tanpa merusak cat asli kendaraan." } },
      { title: { en: "Precise Result", id: "Hasil Presisi" }, desc: { en: "Neat installation with no visible bubbles or cut lines.", id: "Pemasangan rapi tanpa gelembung atau garis potong yang terlihat." } },
    ],
    specs: [
      { label: SP.material, value: same("PET Premium") },
      { label: SP.finish, value: same("Gloss / Matte / Satin") },
      { label: SP.warranty, value: { en: "3 Years", id: "3 Tahun" } },
      { label: SP.install, value: { en: "2–3 Days", id: "2–3 Hari" } },
    ],
    gallery: [IMAGES.gallery[1], IMAGES.gallery[0], IMAGES.gallery[2]],
  },
  {
    slug: "ppf-color",
    shortTitle: "PPF Color",
    title: "Paint Protection Film Color",
    tagline: { en: "Maximum protection with a new body colour", id: "Proteksi maksimal sekaligus ubah warna bodi mobil" },
    cardImage: IMAGES.ppfColor,
    heroImage: IMAGES.ppfColor,
    description: {
      en: "Combining PPF protection with a touch of colour, PPF Color protects the original paint while giving your car a fresh, characterful look. Ideal if you want full protection without compromising on aesthetics.",
      id: "Menggabungkan proteksi PPF dengan sentuhan warna, PPF Color melindungi cat orisinal sekaligus memberikan tampilan baru yang berkarakter. Pilihan ini ideal bagi Anda yang menginginkan perlindungan penuh tanpa berkompromi dengan estetika.",
    },
    extra: {
      en: [
        "You get the protective benefits of PPF and a new colour in a single installation.",
        "Talk to our team about available colours and which thickness fits your goals.",
      ],
      id: [
        "Anda mendapat manfaat proteksi PPF sekaligus warna baru dalam satu kali pemasangan.",
        "Konsultasikan pilihan warna yang tersedia dan ketebalan yang sesuai dengan tujuan Anda.",
      ],
    },
    features: [
      { title: { en: "Two Functions in One", id: "Dua Fungsi Sekaligus" }, desc: { en: "Protection on par with standard PPF, plus colour options.", id: "Proteksi setara PPF standar dengan tambahan pilihan warna." } },
      { title: { en: "Long-Lasting Colour", id: "Warna Tahan Lama" }, desc: { en: "High-quality pigments that resist fading.", id: "Pigmen berkualitas tinggi yang tahan terhadap pemudaran." } },
      { title: { en: "Full Protection", id: "Perlindungan Penuh" }, desc: { en: "The original paint stays preserved beneath the film.", id: "Cat asli tetap terjaga di bawah lapisan film." } },
    ],
    specs: [
      { label: SP.material, value: same("TPU Color") },
      { label: SP.thickness, value: same("7.5 – 8.5 Mil") },
      { label: SP.warranty, value: { en: "5 Years", id: "5 Tahun" } },
      { label: SP.install, value: { en: "2–3 Days", id: "2–3 Hari" } },
    ],
    gallery: [IMAGES.gallery[0], IMAGES.gallery[2], IMAGES.gallery[1]],
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}