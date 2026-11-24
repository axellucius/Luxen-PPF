export const LANGS = ["en", "id"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";
export const LANG_COOKIE = "luxen-lang";

/** Localized string / paragraph list */
export type L = { en: string; id: string };
export type LL = { en: string[]; id: string[] };

export const same = (v: string): L => ({ en: v, id: v });
export const isLang = (v: unknown): v is Lang => v === "en" || v === "id";

export function format(s: string, vars?: Record<string, string | number>) {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}