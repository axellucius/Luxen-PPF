"use client";

import { useState } from "react";

type Item = {
  id: string;
  name: string;
  question: string;
  answer: string | null;
  status: "pending" | "answered";
  createdAt: number;
};

const box = "w-full rounded-sm border border-white/15 bg-black px-4 py-3 text-sm text-white focus:border-white/50 focus:outline-none";

export default function AdminFaq() {
  const [key, setKey] = useState("");
  const [items, setItems] = useState<Item[] | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<"pending" | "answered">("pending");
  const [msg, setMsg] = useState<string | null>(null);

  const call = async (method: string, path = "", body?: unknown) => {
    const res = await fetch(`/api/admin/faq${path}`, {
      method,
      headers: { "x-admin-key": key, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = (await res.json()) as { error?: string; items?: Item[] };
    if (!res.ok) throw new Error(data.error ?? "Gagal.");
    return data;
  };

  const load = async () => {
    setMsg(null);
    try {
      const d = await call("GET");
      setItems(d.items ?? []);
    } catch (e) {
      setItems(null);
      setMsg(e instanceof Error ? e.message : "Gagal.");
    }
  };

  const save = async (id: string) => {
    setMsg(null);
    try {
      await call("PATCH", "", { id, answer: drafts[id] ?? "" });
      await load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Gagal.");
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Hapus pertanyaan ini?")) return;
    try {
      await call("DELETE", `?id=${encodeURIComponent(id)}`);
      await load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Gagal.");
    }
  };

  if (items === null) {
    return (
      <main className="mx-auto flex min-h-[100svh] max-w-sm flex-col justify-center gap-4 px-6">
        <h1 className="font-display text-3xl">Admin FAQ</h1>
        <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Password admin" autoComplete="current-password" className={box} />
        <button type="button" onClick={load} className="btn-chrome min-h-12 rounded-full text-sm font-semibold">Masuk</button>
        {msg && <p role="alert" className="text-sm text-red-300">{msg}</p>}
      </main>
    );
  }

  const shown = items.filter((i) => i.status === filter);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-4xl">Admin FAQ</h1>
        <div className="flex gap-2">
          {(["pending", "answered"] as const).map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)} aria-pressed={filter === f}
              className={`min-h-11 rounded-full border px-5 text-xs uppercase tracking-widest ${filter === f ? "border-white bg-white text-black" : "border-white/20 text-white/70"}`}>
              {f === "pending" ? `Menunggu (${items.filter((i) => i.status === "pending").length})` : `Terjawab (${items.filter((i) => i.status === "answered").length})`}
            </button>
          ))}
        </div>
      </div>

      {msg && <p role="alert" className="mt-4 text-sm text-red-300">{msg}</p>}
      {shown.length === 0 && <p className="mt-10 text-sm text-white/60">Kosong.</p>}

      <ul className="mt-8 space-y-6">
        {shown.map((it) => (
          <li key={it.id} className="border border-white/10 p-5">
            <p className="text-xs text-white/50">{it.name || "Anonim"} · {new Date(it.createdAt).toLocaleString("id-ID")}</p>
            <p className="mt-2 whitespace-pre-line text-base">{it.question}</p>
            <textarea
              rows={4}
              maxLength={1000}
              value={drafts[it.id] ?? it.answer ?? ""}
              onChange={(e) => setDrafts((d) => ({ ...d, [it.id]: e.target.value }))}
              placeholder="Tulis jawaban resmi di sini…"
              className={`${box} mt-4`}
            />
            <div className="mt-3 flex gap-3">
              <button type="button" onClick={() => save(it.id)} className="btn-chrome min-h-11 rounded-full px-6 text-xs font-semibold">
                {it.status === "answered" ? "Simpan perubahan" : "Jawab & tampilkan"}
              </button>
              <button type="button" onClick={() => remove(it.id)} className="min-h-11 rounded-full border border-red-300/40 px-6 text-xs text-red-200">Hapus</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}