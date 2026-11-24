"use client";

import { useId, useState, type ReactNode } from "react";
import { useI18n } from "@/lib/i18n/client";

export default function ReadMore({
  summary,
  children,
}: {
  summary: ReactNode;
  children: ReactNode;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div>
      {summary}

      <div
        id={id}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-700 ease-luxe ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 pt-4">{children}</div>
        </div>
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="mt-4 inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-[0.2em] text-silver-300 transition-colors hover:text-white"
      >
        {open ? t("rm.less") : t("rm.more")}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-500 ease-luxe ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}