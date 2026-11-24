"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useI18n } from "@/lib/i18n/client";
import { LANGS, LANG_COOKIE, type Lang } from "@/lib/i18n/config";

export default function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, t } = useI18n();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const choose = (next: Lang) => {
    if (next === lang) return;
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  };

  return (
    <div
      role="group"
      aria-label={t("lang.label")}
      className={`inline-flex items-center rounded-full border border-white/15 p-0.5 text-[11px] font-semibold tracking-[0.15em] ${
        pending ? "opacity-60" : ""
      } ${className}`}
    >
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={l === lang}
          onClick={() => choose(l)}
          className={`min-h-9 min-w-10 rounded-full px-3 transition-colors duration-300 ${
            l === lang ? "bg-silver-100 text-ink" : "text-white/70 hover:text-white"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}