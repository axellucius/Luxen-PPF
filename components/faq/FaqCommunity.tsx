"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useI18n } from "@/lib/i18n/client";
import type { MsgKey } from "@/lib/i18n/dict";
import { checkText } from "@/lib/moderation";

type PublicItem = { id: string; name: string; question: string; answer: string; answeredAt: number };

const ERR: Record<string, MsgKey> = {
  profanity: "err.profanity",
  link: "err.link",
  contact: "err.contact",
  spam: "err.spam",
  length: "err.length",
  rate: "err.rate",
  disabled: "err.disabled",
};

const field =
  "w-full rounded-sm border border-line bg-ink px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-silver-300 focus:outline-none";

export default function FaqCommunity() {
  const { t, lang } = useI18n();
  const [items, setItems] = useState<PublicItem[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/faq", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { items?: PublicItem[] }) => alive && setItems(d.items ?? []))
      .catch(() => alive && setLoadError(true));
    return () => {
      alive = false;
    };
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const q = question.trim();
    if (q.length < 10 || q.length > 300) return setError(t("err.length"));
    for (const text of [name, q]) {
      const v = checkText(text);
      if (!v.ok) return setError(t(ERR[v.reason]));
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, question: q, website }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(t(ERR[data.error ?? ""] ?? "err.generic"));
        setStatus("idle");
        return;
      }
      setQuestion("");
      setName("");
      setStatus("done");
    } catch {
      setError(t("err.generic"));
      setStatus("idle");
    }
  };

  const fmt = (ts: number) =>
    new Date(ts).toLocaleDateString(lang === "id" ? "id-ID" : "en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
      <div>
        <h2 className="font-display text-3xl text-silver-50">{t("faqp.community")}</h2>

        <div className="mt-8 border-b border-line">
          {loadError && <p className="py-6 text-sm text-white/60">{t("faqp.loadError")}</p>}
          {!loadError && items === null && <p className="py-6 text-sm text-white/60">{t("faqp.loading")}</p>}
          {items?.length === 0 && <p className="py-6 text-sm text-white/60">{t("faqp.empty")}</p>}

          {items?.map((it) => (
            <details key={it.id} className="group border-t border-line">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="block font-display text-xl text-silver-100 sm:text-2xl">{it.question}</span>
                  <span className="mt-1 block text-xs text-white/50">
                    {it.name || t("faqp.anon")} · {fmt(it.answeredAt)}
                  </span>
                </span>
                <span aria-hidden="true" className="text-2xl leading-none text-silver-400 transition-transform duration-500 ease-luxe group-open:rotate-45">+</span>
              </summary>
              <div className="pb-6">
                <p className="eyebrow">{t("faqp.answer")}</p>
                <p className="mt-2 max-w-xl whitespace-pre-line text-sm leading-relaxed text-white/80">{it.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate className="h-fit border border-line bg-surface p-6 sm:p-8">
        <h2 className="font-display text-3xl text-silver-50">{t("faqp.askTitle")}</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/70">{t("faqp.askP")}</p>

        <label className="mt-6 block text-xs uppercase tracking-[0.18em] text-silver-400" htmlFor="faq-name">{t("faqp.name")}</label>
        <input id="faq-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} placeholder={t("faqp.namePh")} autoComplete="given-name" className={`${field} mt-2`} />

        <label className="mt-5 block text-xs uppercase tracking-[0.18em] text-silver-400" htmlFor="faq-q">{t("faqp.question")}</label>
        <textarea id="faq-q" value={question} onChange={(e) => setQuestion(e.target.value)} maxLength={300} rows={5} placeholder={t("faqp.questionPh")} className={`${field} mt-2 resize-y`} />
        <p className="mt-1 text-right text-[11px] text-white/40">{question.length}/300</p>

        {/* Honeypot: invisible to people, tempting to bots */}
        <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />

        <p className="mt-3 text-xs leading-relaxed text-white/50">{t("faqp.note")}</p>

        {error && <p role="alert" className="mt-4 border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}
        {status === "done" && <p role="status" className="mt-4 border border-silver-300/30 bg-white/5 p-3 text-sm text-silver-100">{t("faqp.success")}</p>}

        <button type="submit" disabled={status === "sending"} className="btn-chrome mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full px-7 text-sm font-semibold disabled:opacity-60">
          {status === "sending" ? t("faqp.sending") : t("faqp.submit")}
        </button>
      </form>
    </div>
  );
}