import { cache } from "react";
import { cookies } from "next/headers";
import { DEFAULT_LANG, LANG_COOKIE, format, isLang, type Lang } from "@/lib/i18n/config";
import { DICT, type MsgKey } from "@/lib/i18n/dict";

export const getLang = cache(async (): Promise<Lang> => {
  const store = await cookies();
  const v = store.get(LANG_COOKIE)?.value;
  return isLang(v) ? v : DEFAULT_LANG;
});

export async function getI18n() {
  const lang = await getLang();
  const messages = DICT[lang];
  const t = (key: MsgKey, vars?: Record<string, string | number>) =>
    format(messages[key], vars);
  return { lang, messages, t };
}