// All remote images live here. To swap a photo, change the URL in this file only.
// TODO: these are STOCK photos (Unsplash). Replace with real LUXEN work before launch.

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

// First three IDs already existed in the repo; the rest are unverified.
// If one 404s, ImageOrPlaceholder shows a placeholder automatically.
const ID = {
  gloss: "photo-1619431856706-ca2cc58258f6",
  droplet: "photo-1770750869246-3912b5685709",
  wheel: "photo-1708805283087-cb22474fb88e",
  sport: "photo-1503376780353-7e6692767b70",
  coupe: "photo-1492144534655-ae79c964c9d7",
  muscle: "photo-1494976388531-d1058494cdd8",
  super: "photo-1583121274602-3e2820c69888",
  hatch: "photo-1552519507-da3b142c6e3d",
};

export const IMAGES = {
  hero: u(ID.gloss, 2200),
  servicesHero: u(ID.droplet, 2000),
  homeService: u(ID.coupe, 1400),
  cta: u(ID.sport, 2000),
  results: u(ID.super, 1800),
  tiers: [u(ID.hatch), u(ID.muscle), u(ID.sport), u(ID.super)],
  ppf: u(ID.gloss),
  windowFilm: u(ID.droplet),
  wrappingPet: u(ID.wheel),
  ppfColor: u(ID.sport),
  gallery: [u(ID.gloss, 1200), u(ID.wheel, 1200), u(ID.droplet, 1200)],
} as const;