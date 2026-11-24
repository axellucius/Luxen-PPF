"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { format, type Lang } from "@/lib/i18n/config";
import type { MsgKey, Messages } from "@/lib/i18n/dict";

type Ctx = {
  lang: Lang;
  t: (key: MsgKey, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({
  lang,
  messages,
  children,
}: {
  lang: Lang;
  messages: Messages;
  children: ReactNode;
}) {
  const value = useMemo<Ctx>(
    () => ({ lang, t: (key, vars) => format(messages[key], vars) }),
    [lang, messages]
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): Ctx {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}